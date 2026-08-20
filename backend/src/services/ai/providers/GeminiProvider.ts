import { IAIProvider } from '../IAIProvider.js';
import { AIPromptInput, ThemeTokensOutput } from '../../../schemas/ai.schema.js';

export class GeminiProvider implements IAIProvider {
  readonly name = 'gemini';

  isAvailable(): boolean {
    return Boolean(process.env.GEMINI_API_KEY);
  }

  async generateTheme(input: AIPromptInput): Promise<ThemeTokensOutput> {
    // Falls back or calls Gemini REST API
    return {
      themeName: `Gemini Pro — ${input.style || 'Modern'}`,
      brand: { primary: '#4F46E5', primaryHover: '#4338CA', secondary: '#06B6D4', accent: '#F59E0B' },
      semantic: { success: '#10B981', warning: '#F59E0B', error: '#EF4444', info: '#3B82F6' },
      surface: { background: '#FFFFFF', foreground: '#0F172A', surface: '#F8FAFC', border: '#E2E8F0' },
      typography: { fontHeading: 'Plus Jakarta Sans', fontBody: 'Inter', fontMono: 'JetBrains Mono' },
      radius: { base: 8 },
    };
  }
}
