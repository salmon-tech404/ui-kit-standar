import { IAIProvider } from './IAIProvider.js';
import { DeepSeekProvider } from './providers/DeepSeekProvider.js';
import { OpenAIProvider } from './providers/OpenAIProvider.js';
import { GeminiProvider } from './providers/GeminiProvider.js';
import { ClaudeProvider } from './providers/ClaudeProvider.js';
import { AIPromptInput, ThemeTokensOutput, themeTokensOutputSchema } from '../../schemas/ai.schema.js';
import crypto from 'crypto';

export class AIProviderRegistry {
  private providers: Map<string, IAIProvider> = new Map();
  private cache: Map<string, { data: ThemeTokensOutput; expiresAt: number }> = new Map();
  private readonly CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

  constructor() {
    // DeepSeek is registered as the primary default AI provider
    this.register(new DeepSeekProvider());
    this.register(new OpenAIProvider());
    this.register(new GeminiProvider());
    this.register(new ClaudeProvider());
  }

  public register(provider: IAIProvider): void {
    this.providers.set(provider.name.toLowerCase(), provider);
  }

  public getProvider(name?: string): IAIProvider {
    if (name && this.providers.has(name.toLowerCase())) {
      const p = this.providers.get(name.toLowerCase())!;
      if (p.isAvailable()) return p;
    }

    // Default to DeepSeek if available
    const deepseek = this.providers.get('deepseek');
    if (deepseek && deepseek.isAvailable()) return deepseek;

    // Otherwise check other available providers
    for (const p of this.providers.values()) {
      if (p.isAvailable()) return p;
    }

    return this.providers.get('deepseek')!; // Fallback
  }

  private hashPrompt(input: AIPromptInput): string {
    const key = `${input.prompt.trim().toLowerCase()}_${input.style || 'modern'}`;
    return crypto.createHash('md5').update(key).digest('hex');
  }

  /**
   * Generates theme tokens with prompt caching & strict Zod response validation.
   */
  public async generateThemeWithGuardrails(input: AIPromptInput): Promise<ThemeTokensOutput> {
    const cacheKey = this.hashPrompt(input);
    const cached = this.cache.get(cacheKey);

    if (cached && cached.expiresAt > Date.now()) {
      console.log('⚡ Returning theme from Prompt Hash Cache.');
      return cached.data;
    }

    // Prioritize DeepSeek first
    const providerOrder = input.provider && input.provider !== 'auto'
      ? [input.provider, 'deepseek', 'openai', 'gemini', 'claude']
      : ['deepseek', 'openai', 'gemini', 'claude'];

    let lastError: Error | null = null;

    for (const pName of providerOrder) {
      const provider = this.providers.get(pName);
      if (!provider) continue;

      try {
        const rawOutput = await provider.generateTheme(input);
        
        // Strict Guardrail: Zod Output Validation
        const validatedOutput = themeTokensOutputSchema.parse(rawOutput);

        // Cache the successful validated result
        this.cache.set(cacheKey, {
          data: validatedOutput,
          expiresAt: Date.now() + this.CACHE_TTL_MS,
        });

        return validatedOutput;
      } catch (err: any) {
        console.warn(`Provider ${pName} failed or returned invalid schema, trying fallback:`, err.message);
        lastError = err;
      }
    }

    throw new Error(`All AI Providers failed to generate a valid theme: ${lastError?.message}`);
  }
}

export const aiProviderRegistry = new AIProviderRegistry();
