import { IAIProvider } from './IAIProvider.js';
import { AIPromptInput, ThemeTokensOutput } from '../../schemas/ai.schema.js';

export class ClaudeProvider implements IAIProvider {
  readonly name = 'claude';

  isAvailable(): boolean {
    return Boolean(process.env.ANTHROPIC_API_KEY);
  }

  async generateTheme(input: AIPromptInput): Promise<ThemeTokensOutput> {
    return {
      themeName: `Claude 3.7 Editorial — ${input.style || 'Warm'}`,
      brand: { primary: '#D97706', primaryHover: '#B45309', secondary: '#4F46E5', accent: '#10B981' },
      semantic: { success: '#10B981', warning: '#F59E0B', error: '#EF4444', info: '#3B82F6' },
      surface: { background: '#FFFDF9', foreground: '#1C1917', surface: '#FAF7F2', border: '#E7E5E4' },
      typography: { fontHeading: 'Plus Jakarta Sans', fontBody: 'Inter', fontMono: 'JetBrains Mono' },
      radius: { base: 6 },
    };
  }
}
