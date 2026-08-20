import React, { useState } from 'react';
import { Sparkles, X, Wand2, AlertCircle } from 'lucide-react';
import { aiApi } from '../api/aiApi';
import { useAuthStore } from '@/entities/user-session';
import { useDesignStore } from '@/entities/design-token';
import { useProjectStore } from '@/entities/project';
import { FormSelect } from '@/shared/ui';

interface AiGenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuthModal: () => void;
}

export const AiGenerateModal: React.FC<AiGenerateModalProps> = ({ isOpen, onClose, onOpenAuthModal }) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('modern');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated, user, setAuth, accessToken } = useAuthStore();
  const { setTokens, tokens } = useDesignStore();
  const { saveCurrentTokens } = useProjectStore();

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      onOpenAuthModal();
      return;
    }

    if (!prompt.trim()) return;

    setError(null);
    setLoading(true);

    try {
      const data = await aiApi.generateTheme({ prompt, style });
      const theme = data.theme;

      // Update current tokens in design store
      const newTokens = JSON.parse(JSON.stringify(tokens));
      newTokens.foundations.colors.brand.primary = theme.brand.primary;
      newTokens.foundations.colors.brand.primaryHover = theme.brand.primaryHover || theme.brand.primary;
      newTokens.foundations.colors.brand.secondary = theme.brand.secondary;
      newTokens.foundations.colors.brand.accent = theme.brand.accent;
      newTokens.foundations.colors.surface.background = theme.surface.background;
      newTokens.foundations.colors.surface.foreground = theme.surface.foreground;
      newTokens.foundations.colors.surface.surface = theme.surface.surface;
      newTokens.foundations.typography.fontHeading = theme.typography.fontHeading;
      newTokens.foundations.typography.fontBody = theme.typography.fontBody;
      newTokens.foundations.radius.md = theme.radius.base;
      newTokens.foundations.radius.lg = theme.radius.base + 4;

      setTokens(newTokens);
      saveCurrentTokens();

      // Update remaining user credits in Auth Store
      if (user && accessToken) {
        setAuth(accessToken, { ...user, credits: data.remainingCredits });
      }

      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.error || 'AI generation failed');
    } finally {
      setLoading(false);
    }
  };

  const presetPrompts = [
    { label: 'Fintech Banking', prompt: 'Enterprise banking platform with trustworthy deep ocean blues and vibrant emerald metrics' },
    { label: 'Cyberpunk Neon', prompt: 'Dark futuristic gaming portal with glowing ultraviolet and electric cyan accents' },
    { label: 'Eco Sustainable', prompt: 'Modern organic grocery and climate analytics tool with natural sage green tones' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                AI Design System Generator
              </h2>
              <p className="text-xs text-slate-500">
                {isAuthenticated ? `${user?.credits ?? 0} Credits Remaining` : 'Sign in to generate themes'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white transition cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Describe your product or brand identity:
            </label>
            <textarea
              required
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A sleek B2B SaaS analytics platform with modern indigo accents and ultra-clean typography"
              className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-indigo-500 dark:text-white resize-none"
            />
          </div>

          {/* Quick Presets */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold text-slate-400">Popular Presets:</div>
            <div className="flex flex-wrap gap-1.5">
              {presetPrompts.map((preset) => (
                <button
                  type="button"
                  key={preset.label}
                  onClick={() => setPrompt(preset.prompt)}
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-slate-600 dark:text-slate-300 hover:text-indigo-600 text-xs rounded-lg border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <FormSelect
                label="Style Direction"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                options={[
                  { value: 'modern', label: 'Modern SaaS' },
                  { value: 'minimalist', label: 'Minimalist' },
                  { value: 'brutalist', label: 'Neo-Brutalist' },
                  { value: 'enterprise', label: 'Enterprise Trust' },
                  { value: 'vibrant', label: 'Vibrant Consumer' },
                ]}
              />
            </div>

            <div className="flex flex-col justify-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-md shadow-indigo-500/25 transition flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>{loading ? 'Generating...' : 'Generate Theme (1 Credit)'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
