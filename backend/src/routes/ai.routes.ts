import { Router } from 'express';
import { AIController } from '../controllers/ai.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { creditGuard } from '../middlewares/creditGuard.middleware.js';
import { aiGenerateLimiter } from '../middlewares/rateLimiter.middleware.js';
import { aiPromptSchema } from '../schemas/ai.schema.js';

const router = Router();

router.post(
  '/generate-theme',
  requireAuth,
  aiGenerateLimiter,
  validate(aiPromptSchema),
  creditGuard,
  AIController.generateTheme
);

export default router;
