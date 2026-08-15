import rateLimit from 'express-rate-limit';

export const generalApiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

export const aiGenerateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Max 10 AI generate calls per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'AI generation rate limit reached (max 10 requests/minute). Please slow down.' },
});
