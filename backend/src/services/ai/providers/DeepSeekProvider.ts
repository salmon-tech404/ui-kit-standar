import { IAIProvider } from '../IAIProvider.js';
import { AIPromptInput, ThemeTokensOutput } from '../../../schemas/ai.schema.js';

export class DeepSeekProvider implements IAIProvider {
  readonly name = 'deepseek';

  isAvailable(): boolean {
    return Boolean(process.env.DEEPSEEK_API_KEY);
  }

  async generateTheme(input: AIPromptInput): Promise<ThemeTokensOutput> {
    if (!this.isAvailable()) {
      return this.generateAlgorithmicFallback(input);
    }

    try {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          response_format: { type: 'json_object' },
          temperature: 0.7,
          messages: [
            {
              role: 'system',
              content: `You are an elite Design Systems Architect. Generate a production-ready UI theme conforming strictly to this JSON format:
{
  "themeName": "String",
  "brand": {
    "primary": "#HEX",
    "primaryHover": "#HEX",
    "primaryFocus": "#HEX",
    "secondary": "#HEX",
    "accent": "#HEX"
  },
  "semantic": {
    "success": "#HEX",
    "warning": "#HEX",
    "error": "#HEX",
    "info": "#HEX"
  },
  "surface": {
    "background": "#HEX",
    "foreground": "#HEX",
    "surface": "#HEX",
    "surfaceSubtle": "#HEX",
    "border": "#HEX"
  },
  "typography": {
    "fontHeading": "Plus Jakarta Sans",
    "fontBody": "Inter",
    "fontMono": "JetBrains Mono"
  },
  "radius": {
    "base": 8
  }
}
Ensure high WCAG 2.1 AA contrast ratio (>= 4.5:1) between text and background. Output ONLY pure valid JSON.`,
            },
            {
              role: 'user',
              content: `Generate design system theme for product concept: "${input.prompt}" in visual style "${input.style || 'modern'}".`,
            },
          ],
        }),
      });

      const data = await response.json();
      if (!data.choices || !data.choices[0]?.message?.content) {
        throw new Error('Invalid response from DeepSeek API');
      }

      const rawJson = JSON.parse(data.choices[0].message.content);
      return rawJson;
    } catch (err: any) {
      console.warn('DeepSeek API call failed, falling back to algorithmic theme engine:', err.message);
      return this.generateAlgorithmicFallback(input);
    }
  }

  private generateAlgorithmicFallback(input: AIPromptInput): ThemeTokensOutput {
    const p = input.prompt.toLowerCase();

    if (p.includes('fintech') || p.includes('bank') || p.includes('finance') || p.includes('crypto')) {
      return {
        themeName: 'DeepSeek Fintech Ocean',
        brand: { primary: '#0284C7', primaryHover: '#0369A1', secondary: '#0EA5E9', accent: '#10B981' },
        semantic: { success: '#10B981', warning: '#F59E0B', error: '#EF4444', info: '#0284C7' },
        surface: { background: '#FFFFFF', foreground: '#0F172A', surface: '#F8FAFC', border: '#E2E8F0' },
        typography: { fontHeading: 'Plus Jakarta Sans', fontBody: 'Inter', fontMono: 'JetBrains Mono' },
        radius: { base: 6 },
      };
    } else if (p.includes('cyber') || p.includes('dark') || p.includes('neon') || p.includes('game')) {
      return {
        themeName: 'DeepSeek Cyberpunk Neon',
        brand: { primary: '#8B5CF6', primaryHover: '#7C3AED', secondary: '#EC4899', accent: '#06B6D4' },
        semantic: { success: '#10B981', warning: '#F59E0B', error: '#F43F5E', info: '#8B5CF6' },
        surface: { background: '#090D16', foreground: '#F8FAFC', surface: '#0F172A', border: '#1E293B' },
        typography: { fontHeading: 'Plus Jakarta Sans', fontBody: 'Inter', fontMono: 'JetBrains Mono' },
        radius: { base: 8 },
      };
    }

    return {
      themeName: 'DeepSeek Modern Studio',
      brand: { primary: '#6366F1', primaryHover: '#4F46E5', secondary: '#EC4899', accent: '#10B981' },
      semantic: { success: '#10B981', warning: '#F59E0B', error: '#EF4444', info: '#3B82F6' },
      surface: { background: '#FFFFFF', foreground: '#0F172A', surface: '#FFFFFF', border: '#E2E8F0' },
      typography: { fontHeading: 'Plus Jakarta Sans', fontBody: 'Inter', fontMono: 'JetBrains Mono' },
      radius: { base: 8 },
    };
  }
}
