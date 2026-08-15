import { z } from 'zod';

export const aiPromptSchema = z.object({
  prompt: z.string().min(3, 'Prompt must be at least 3 characters').max(500, 'Prompt must be at most 500 characters').trim(),
  style: z.enum(['modern', 'minimalist', 'brutalist', 'enterprise', 'vibrant', 'cyberpunk', 'warm_editorial']).optional().default('modern'),
  provider: z.enum(['openai', 'gemini', 'claude', 'auto']).optional().default('auto'),
});

// Hex color validator regex
const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;

export const themeTokensOutputSchema = z.object({
  themeName: z.string().min(1),
  brand: z.object({
    primary: z.string().regex(hexRegex, 'Invalid primary hex color'),
    primaryHover: z.string().regex(hexRegex).optional(),
    primaryFocus: z.string().regex(hexRegex).optional(),
    secondary: z.string().regex(hexRegex, 'Invalid secondary hex color'),
    accent: z.string().regex(hexRegex, 'Invalid accent hex color'),
  }),
  semantic: z.object({
    success: z.string().regex(hexRegex),
    warning: z.string().regex(hexRegex),
    error: z.string().regex(hexRegex),
    info: z.string().regex(hexRegex),
  }),
  surface: z.object({
    background: z.string().regex(hexRegex),
    foreground: z.string().regex(hexRegex),
    surface: z.string().regex(hexRegex),
    surfaceSubtle: z.string().regex(hexRegex).optional(),
    border: z.string().regex(hexRegex),
  }),
  typography: z.object({
    fontHeading: z.string(),
    fontBody: z.string(),
    fontMono: z.string().optional().default('JetBrains Mono'),
  }),
  radius: z.object({
    base: z.number().min(0).max(32).default(8),
  }),
});

export type AIPromptInput = z.infer<typeof aiPromptSchema>;
export type ThemeTokensOutput = z.infer<typeof themeTokensOutputSchema>;
