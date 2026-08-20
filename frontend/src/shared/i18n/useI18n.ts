import { create } from 'zustand';
import { en, LocaleDictionary } from './locales/en';
import { vi } from './locales/vi';
import { ja } from './locales/ja';
import { Language, RecursiveKeyOf } from './types';

export type TranslationKey = RecursiveKeyOf<typeof en>;

interface I18nState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (
    keyOrSelector: TranslationKey | ((dict: LocaleDictionary) => string),
    params?: Record<string, string | number>
  ) => string;
}

const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('raku_language') as Language;
      if (saved === 'vi' || saved === 'en' || saved === 'ja') return saved;
    } catch {
      // ignore
    }
  }
  return 'vi'; // Default to Vietnamese
};

const dictionaries: Record<Language, LocaleDictionary> = {
  en,
  vi,
  ja,
};

export const useI18n = create<I18nState>((set, get) => ({
  language: getInitialLanguage(),

  setLanguage: (lang: Language) => {
    try {
      localStorage.setItem('raku_language', lang);
    } catch {
      // ignore
    }
    set({ language: lang });
  },

  t: (keyOrSelector, params) => {
    const currentLang = get().language;
    const dict = dictionaries[currentLang] || dictionaries.vi;

    let result = '';

    if (typeof keyOrSelector === 'function') {
      try {
        result = keyOrSelector(dict);
      } catch {
        result = '';
      }
    } else if (typeof keyOrSelector === 'string') {
      const keys = keyOrSelector.split('.');
      let current: any = dict;
      for (const k of keys) {
        if (current && typeof current === 'object' && k in current) {
          current = current[k];
        } else {
          current = undefined;
          break;
        }
      }
      result = typeof current === 'string' ? current : keyOrSelector;
    }

    // Interpolation replacement: {{count}}, {{year}}, etc.
    if (params && typeof result === 'string') {
      Object.entries(params).forEach(([key, val]) => {
        result = result.replace(new RegExp(`{{${key}}}`, 'g'), String(val));
      });
    }

    return result || (typeof keyOrSelector === 'string' ? keyOrSelector : '');
  },
}));
