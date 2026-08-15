import { Request, Response } from 'express';
import { aiProviderRegistry } from '../services/ai/AIProviderRegistry.js';
import { AIPromptInput } from '../schemas/ai.schema.js';
import { User } from '../models/User.model.js';

export class AIController {
  public static async generateTheme(req: Request<{}, {}, AIPromptInput>, res: Response): Promise<void> {
    try {
      const themeOutput = await aiProviderRegistry.generateThemeWithGuardrails(req.body);

      // Fetch remaining credits
      const user = await User.findById(req.user!.userId).select('credits');

      res.json({
        theme: themeOutput,
        remainingCredits: user?.credits ?? 0,
      });
    } catch (error: any) {
      console.error('AI Generation Controller Error:', error);
      res.status(500).json({
        error: 'AI Generation Failed',
        message: error.message || 'Unable to generate theme at this time.',
      });
    }
  }
}
