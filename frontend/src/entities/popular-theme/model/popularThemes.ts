export interface PopularColorTheme {
  id: string;
  name: string;
  tag: string;
  palette: [string, string, string, string, string]; // 5-color visual swatch strip
  colors: {
    primary: string;
    primaryHover: string;
    primaryFocus: string;
    secondary: string;
    accent: string;
    textLink?: string;
  };
}

export const POPULAR_COLOR_THEMES: PopularColorTheme[] = [
  {
    id: 'raku-orange',
    name: 'RAKU Orange (Mặc định)',
    tag: 'Signature Brand',
    palette: ['#FF4F00', '#E04500', '#FF7A33', '#1E293B', '#06B6D4'],
    colors: {
      primary: '#FF4F00',
      primaryHover: '#E04500',
      primaryFocus: '#FF7333',
      secondary: '#1E293B',
      accent: '#06B6D4',
      textLink: '#FF4F00',
    },
  },
  {
    id: 'royal-indigo',
    name: 'Royal Indigo',
    tag: 'Material M2',
    palette: ['#6366F1', '#4F46E5', '#818CF8', '#EC4899', '#10B981'],
    colors: {
      primary: '#6366F1',
      primaryHover: '#4F46E5',
      primaryFocus: '#818CF8',
      secondary: '#EC4899',
      accent: '#10B981',
      textLink: '#6366F1',
    },
  },
  {
    id: 'emerald-forest',
    name: 'Emerald Forest',
    tag: 'Realtime SaaS',
    palette: ['#10B981', '#059669', '#34D399', '#047857', '#F59E0B'],
    colors: {
      primary: '#10B981',
      primaryHover: '#059669',
      primaryFocus: '#34D399',
      secondary: '#047857',
      accent: '#F59E0B',
      textLink: '#10B981',
    },
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon',
    tag: 'Futuristic Vibe',
    palette: ['#8B5CF6', '#EC4899', '#F472B6', '#FBBF24', '#CBD5E1'],
    colors: {
      primary: '#8B5CF6',
      primaryHover: '#7C3AED',
      primaryFocus: '#A78BFA',
      secondary: '#EC4899',
      accent: '#F59E0B',
      textLink: '#8B5CF6',
    },
  },
  {
    id: 'sunset-horizon',
    name: 'Sunset Horizon',
    tag: 'Warm Gradient',
    palette: ['#EF4444', '#F97316', '#FBBF24', '#FDE047', '#06B6D4'],
    colors: {
      primary: '#EF4444',
      primaryHover: '#DC2626',
      primaryFocus: '#F87171',
      secondary: '#F97316',
      accent: '#06B6D4',
      textLink: '#EF4444',
    },
  },
  {
    id: 'electric-violet',
    name: 'Electric Violet',
    tag: 'Deep Tech',
    palette: ['#7C3AED', '#6D28D9', '#C084FC', '#38BDF8', '#F1F5F9'],
    colors: {
      primary: '#7C3AED',
      primaryHover: '#6D28D9',
      primaryFocus: '#A78BFA',
      secondary: '#C084FC',
      accent: '#38BDF8',
      textLink: '#7C3AED',
    },
  },
  {
    id: 'ocean-deep',
    name: 'Ocean Deep',
    tag: 'Enterprise Navy',
    palette: ['#0284C7', '#0369A1', '#38BDF8', '#0F172A', '#14B8A6'],
    colors: {
      primary: '#0284C7',
      primaryHover: '#0369A1',
      primaryFocus: '#38BDF8',
      secondary: '#0F172A',
      accent: '#14B8A6',
      textLink: '#0284C7',
    },
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold Luxe',
    tag: 'Modern Elegance',
    palette: ['#F43F5E', '#E11D48', '#FB7185', '#FDA4AF', '#D97706'],
    colors: {
      primary: '#F43F5E',
      primaryHover: '#E11D48',
      primaryFocus: '#FB7185',
      secondary: '#FB7185',
      accent: '#D97706',
      textLink: '#F43F5E',
    },
  },
  {
    id: 'slate-minimal',
    name: 'Slate Minimalist',
    tag: 'Monochrome Pro',
    palette: ['#0F172A', '#1E293B', '#475569', '#94A3B8', '#F8FAFC'],
    colors: {
      primary: '#0F172A',
      primaryHover: '#1E293B',
      primaryFocus: '#334155',
      secondary: '#475569',
      accent: '#FF4F00',
      textLink: '#0F172A',
    },
  },
  {
    id: 'crimson-flame',
    name: 'Crimson Flame',
    tag: 'Material Bold',
    palette: ['#DC2626', '#B91C1C', '#EF4444', '#7F1D1D', '#F59E0B'],
    colors: {
      primary: '#DC2626',
      primaryHover: '#B91C1C',
      primaryFocus: '#EF4444',
      secondary: '#7F1D1D',
      accent: '#F59E0B',
      textLink: '#DC2626',
    },
  },
  {
    id: 'amber-gold',
    name: 'Amber Gold',
    tag: 'FinTech Premium',
    palette: ['#D97706', '#B45309', '#FBBF24', '#451A03', '#10B981'],
    colors: {
      primary: '#D97706',
      primaryHover: '#B45309',
      primaryFocus: '#FBBF24',
      secondary: '#451A03',
      accent: '#10B981',
      textLink: '#D97706',
    },
  },
  {
    id: 'teal-vanguard',
    name: 'Teal Vanguard',
    tag: 'Material Teal',
    palette: ['#0D9488', '#0F766E', '#2DD4BF', '#115E59', '#F43F5E'],
    colors: {
      primary: '#0D9488',
      primaryHover: '#0F766E',
      primaryFocus: '#2DD4BF',
      secondary: '#115E59',
      accent: '#F43F5E',
      textLink: '#0D9488',
    },
  },
  {
    id: 'midnight-berry',
    name: 'Midnight Berry',
    tag: 'Night SaaS',
    palette: ['#4C1D95', '#831843', '#A855F7', '#EC4899', '#06B6D4'],
    colors: {
      primary: '#4C1D95',
      primaryHover: '#3B0764',
      primaryFocus: '#7C3AED',
      secondary: '#831843',
      accent: '#06B6D4',
      textLink: '#4C1D95',
    },
  },
  {
    id: 'nordic-glacier',
    name: 'Nordic Glacier',
    tag: 'Clean Minimal',
    palette: ['#0EA5E9', '#0284C7', '#7DD3FC', '#BAE6FD', '#10B981'],
    colors: {
      primary: '#0EA5E9',
      primaryHover: '#0284C7',
      primaryFocus: '#38BDF8',
      secondary: '#334155',
      accent: '#10B981',
      textLink: '#0EA5E9',
    },
  },
  {
    id: 'sakura-blossom',
    name: 'Sakura Blossom',
    tag: 'Soft Creative',
    palette: ['#EC4899', '#DB2777', '#F472B6', '#FBCFE8', '#8B5CF6'],
    colors: {
      primary: '#EC4899',
      primaryHover: '#DB2777',
      primaryFocus: '#F472B6',
      secondary: '#F472B6',
      accent: '#8B5CF6',
      textLink: '#EC4899',
    },
  },
  {
    id: 'copper-bronze',
    name: 'Copper Bronze',
    tag: 'Earthy Industrial',
    palette: ['#C2410C', '#9A3412', '#EA580C', '#78350F', '#0D9488'],
    colors: {
      primary: '#C2410C',
      primaryHover: '#9A3412',
      primaryFocus: '#EA580C',
      secondary: '#78350F',
      accent: '#0D9488',
      textLink: '#C2410C',
    },
  },
  {
    id: 'dark-velvet',
    name: 'Dark Velvet',
    tag: 'High Contrast',
    palette: ['#18181B', '#27272A', '#3F3F46', '#A1A1AA', '#FF4F00'],
    colors: {
      primary: '#18181B',
      primaryHover: '#27272A',
      primaryFocus: '#3F3F46',
      secondary: '#A1A1AA',
      accent: '#FF4F00',
      textLink: '#FF4F00',
    },
  },
  {
    id: 'aurora-borealis',
    name: 'Aurora Borealis',
    tag: 'Northern Light',
    palette: ['#059669', '#10B981', '#34D399', '#0284C7', '#A855F7'],
    colors: {
      primary: '#059669',
      primaryHover: '#047857',
      primaryFocus: '#10B981',
      secondary: '#0284C7',
      accent: '#A855F7',
      textLink: '#059669',
    },
  },
];
