import { AIPromptInput, ThemeTokensOutput } from '../../schemas/ai.schema.js';

export interface IAIProvider {
  readonly name: string;
  isAvailable(): boolean;
  generateTheme(input: AIPromptInput): Promise<ThemeTokensOutput>;
}
