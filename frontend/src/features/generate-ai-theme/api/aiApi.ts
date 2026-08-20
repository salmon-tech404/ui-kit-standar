import { apiClient } from '@/shared/api';

export interface ThemeTokensResponse {
  theme: {
    themeName: string;
    brand: { primary: string; primaryHover?: string; primaryFocus?: string; secondary: string; accent: string };
    semantic: { success: string; warning: string; error: string; info: string };
    surface: { background: string; foreground: string; surface: string; border: string };
    typography: { fontHeading: string; fontBody: string };
    radius: { base: number };
  };
  remainingCredits: number;
}

export const aiApi = {
  generateTheme: async (payload: { prompt: string; style?: string; provider?: string }) => {
    const { data } = await apiClient.post<ThemeTokensResponse>('/ai/generate-theme', payload);
    return data;
  },
};
