import { IAIProvider } from '../IAIProvider.js';
import { AIPromptInput, ThemeTokensOutput } from '../../../schemas/ai.schema.js';

export class OpenAIProvider implements IAIProvider {
  readonly name = 'openai';

  isAvailable(): boolean {
    return Boolean(process.env.OPENAI_API_KEY);
  }

  async generateTheme(input: AIPromptInput): Promise<ThemeTokensOutput> {
    if (!this.isAvailable()) {
      return this.generateAlgorithmicFallback(input);
    }

    // Actual OpenAI API Call logic (GPT-4o mini)
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content: 'You are a master design systems engineer. Output a valid JSON design system theme based on user prompt.',
            },
            {
              role: 'user',
              content: `Generate theme for: "${input.prompt}" in style "${input.style || 'modern'}". Format as JSON with themeName, brand (primary, primaryHover, secondary, accent), semantic (success, warning, error, info), surface (background, foreground, surface, border), typography (fontHeading, fontBody), radius (base).`,
            },
          ],
        }),
      });

      const data = (await response.json()) as any;
      const rawJson = JSON.parse(data.choices[0].message.content);
      return rawJson;
    } catch (err) {
      console.warn('OpenAI API call failed, falling back to algorithmic theme engine:', err);
      return this.generateAlgorithmicFallback(input);
    }
  }

  private generateAlgorithmicFallback(input: AIPromptInput): ThemeTokensOutput {
    const p = input.prompt.toLowerCase();
    
    if (p.includes('fintech') || p.includes('bank') || p.includes('finance')) {
      return {
        themeName: 'Fintech Trust Blue',
        brand: { primary: '#0284C7', primaryHover: '#0369A1', secondary: '#0EA5E9', accent: '#10B981' },
        semantic: { success: '#10B981', warning: '#F59E0B', error: '#EF4444', info: '#0284C7' },
        surface: { background: '#FFFFFF', foreground: '#0F172A', surface: '#F8FAFC', border: '#E2E8F0' },
        typography: { fontHeading: 'Plus Jakarta Sans', fontBody: 'Inter', fontMono: 'JetBrains Mono' },
        radius: { base: 6 },
      };
    } else if (p.includes('cyber') || p.includes('dark') || p.includes('game') || p.includes('neon')) {
      return {
        themeName: 'Cyberpunk Neon Dark',
        brand: { primary: '#8B5CF6', primaryHover: '#7C3AED', secondary: '#EC4899', accent: '#06B6D4' },
        semantic: { success: '#10B981', warning: '#F59E0B', error: '#F43F5E', info: '#8B5CF6' },
        surface: { background: '#090D16', foreground: '#F8FAFC', surface: '#0F172A', border: '#1E293B' },
        typography: { fontHeading: 'Plus Jakarta Sans', fontBody: 'Inter', fontMono: 'JetBrains Mono' },
        radius: { base: 8 },
      };
    } else if (p.includes('eco') || p.includes('nature') || p.includes('green') || p.includes('health')) {
      return {
        themeName: 'Eco Vitality Green',
        brand: { primary: '#059669', primaryHover: '#047857', secondary: '#10B981', accent: '#D97706' },
        semantic: { success: '#10B981', warning: '#F59E0B', error: '#EF4444', info: '#3B82F6' },
        surface: { background: '#FFFFFF', foreground: '#064E3B', surface: '#F0FDF4', border: '#DCFCE7' },
        typography: { fontHeading: 'Plus Jakarta Sans', fontBody: 'Inter', fontMono: 'JetBrains Mono' },
        radius: { base: 12 },
      };
    }

    // Default Vibrant Indigo Theme
    return {
      themeName: 'Modern Studio Indigo',
      brand: { primary: '#6366F1', primaryHover: '#4F46E5', secondary: '#EC4899', accent: '#10B981' },
      semantic: { success: '#10B981', warning: '#F59E0B', error: '#EF4444', info: '#3B82F6' },
      surface: { background: '#FFFFFF', foreground: '#0F172A', surface: '#FFFFFF', border: '#E2E8F0' },
      typography: { fontHeading: 'Plus Jakarta Sans', fontBody: 'Inter', fontMono: 'JetBrains Mono' },
      radius: { base: 8 },
    };
  }
}
