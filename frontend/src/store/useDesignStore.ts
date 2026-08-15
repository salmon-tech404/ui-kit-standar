import { create } from 'zustand';
import { ColorEngine } from '../utils/colorEngine';

export type ViewportSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface TokenState {
  foundations: {
    colors: {
      brand: {
        primary: string;
        primaryHover: string;
        primaryFocus: string;
        secondary: string;
        accent: string;
      };
      semantic: {
        success: string;
        warning: string;
        error: string;
        info: string;
      };
      neutral: Record<string, string>;
      surface: {
        background: string;
        foreground: string;
        surface: string;
        surfaceSubtle: string;
        border: string;
        borderStrong: string;
      };
    };
    typography: {
      fontHeading: string;
      fontBody: string;
      fontMono: string;
      baseSize: number;
      scaleRatio: number;
    };
    spacing: {
      base: number;
      scale: number[];
    };
    radius: {
      base: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      full: number;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    breakpoints: {
      sm: number;
      md: number;
      lg: number;
      xl: number;
      '2xl': number;
    };
  };
  brand: {
    iconLibrary: string;
    strokeWidth: string;
  };
  components: {
    buttons: { heightSm: number; heightMd: number; heightLg: number; radius: number };
    inputs: { heightMd: number; radius: number };
    cards: { radius: number; padding: number };
  };
}

export interface SelectedToken {
  type: string;
  category: string;
  key: string;
  path: string;
  name: string;
  value: string;
  cssVar: string;
  description: string;
}

interface DesignStoreState {
  tokens: TokenState;
  selectedToken: SelectedToken;
  activeCategory: string;
  activeFilterTab: string;
  
  // Responsive Viewports (Tailwind Standards: sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)
  viewport: ViewportSize;
  viewMode: 'live' | 'wireframe';
  showGridOverlay: boolean;

  // Sidebar Drawers State
  isRailCollapsed: boolean;
  isSubpanelOpen: boolean;
  isInspectorOpen: boolean;

  history: TokenState[];
  historyIndex: number;

  updateToken: (path: string, value: any) => void;
  setTokens: (tokens: TokenState) => void;
  setSelectedToken: (token: SelectedToken) => void;
  setActiveCategory: (cat: string) => void;
  setActiveFilterTab: (tab: string) => void;
  setViewport: (vp: ViewportSize) => void;
  setViewMode: (mode: 'live' | 'wireframe') => void;
  toggleGridOverlay: () => void;

  // Drawer Actions
  toggleRail: () => void;
  openSubpanel: (cat?: string) => void;
  closeSubpanel: () => void;
  toggleSubpanel: () => void;
  toggleInspector: () => void;
  closeAllDrawers: () => void;

  undo: () => void;
  redo: () => void;
  injectCssTokens: () => void;
}

const defaultInitialTokens: TokenState = {
  foundations: {
    colors: {
      brand: {
        primary: '#6366F1',
        primaryHover: '#4F46E5',
        primaryFocus: '#818CF8',
        secondary: '#EC4899',
        accent: '#10B981',
      },
      semantic: {
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      neutral: {
        gray50: '#FAFAFA',
        gray100: '#F3F4F6',
        gray200: '#E5E7EB',
        gray300: '#D1D5DB',
        gray400: '#9CA3AF',
        gray500: '#6B7280',
        gray600: '#4B5563',
        gray700: '#374151',
        gray800: '#1F2937',
        gray900: '#111827',
      },
      surface: {
        background: '#FFFFFF',
        foreground: '#0F172A',
        surface: '#FFFFFF',
        surfaceSubtle: '#F8FAFC',
        border: '#E2E8F0',
        borderStrong: '#CBD5E1',
      },
    },
    typography: {
      fontHeading: 'Plus Jakarta Sans',
      fontBody: 'Inter',
      fontMono: 'JetBrains Mono',
      baseSize: 14,
      scaleRatio: 1.25,
    },
    spacing: {
      base: 8,
      scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64],
    },
    radius: {
      base: 8,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      full: 9999,
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
    },
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
  },
  brand: {
    iconLibrary: 'lucide',
    strokeWidth: '1.5px',
  },
  components: {
    buttons: { heightSm: 32, heightMd: 40, heightLg: 48, radius: 8 },
    inputs: { heightMd: 40, radius: 8 },
    cards: { radius: 12, padding: 24 },
  },
};

export const useDesignStore = create<DesignStoreState>((set, get) => ({
  tokens: defaultInitialTokens,
  selectedToken: {
    type: 'color',
    category: 'brand',
    key: 'primary',
    path: 'foundations.colors.brand.primary',
    name: 'Primary',
    value: '#6366F1',
    cssVar: '--color-primary',
    description: 'Primary brand color used for key actions and highlights.',
  },
  activeCategory: 'colors',
  activeFilterTab: 'all',
  
  viewport: 'xl', // default laptop/desktop 1280px
  viewMode: 'live',
  showGridOverlay: false,

  isRailCollapsed: false,
  isSubpanelOpen: false, // Starts closed, opens on click, closes when clicking canvas
  isInspectorOpen: true,

  history: [defaultInitialTokens],
  historyIndex: 0,

  updateToken: (path, value) => {
    const currentTokens = JSON.parse(JSON.stringify(get().tokens));
    const keys = path.split('.');
    let target: any = currentTokens;
    for (let i = 0; i < keys.length - 1; i++) {
      target = target[keys[i]];
    }
    target[keys[keys.length - 1]] = value;

    if (path === 'foundations.colors.brand.primary') {
      const shades = ColorEngine.generateShades(value);
      currentTokens.foundations.colors.brand.primaryHover = shades['600'];
      currentTokens.foundations.colors.brand.primaryFocus = shades['400'];
    }

    const newHistory = get().history.slice(0, get().historyIndex + 1);
    newHistory.push(currentTokens);

    set({
      tokens: currentTokens,
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });

    get().injectCssTokens();
  },

  setTokens: (tokens) => {
    set({
      tokens,
      history: [tokens],
      historyIndex: 0,
    });
    get().injectCssTokens();
  },

  setSelectedToken: (token) => set({ selectedToken: token, isInspectorOpen: true }),
  setActiveCategory: (cat) => set({ activeCategory: cat, isSubpanelOpen: true }),
  setActiveFilterTab: (tab) => set({ activeFilterTab: tab }),
  setViewport: (vp) => {
    // If switching to very large screens (xl / 2xl), auto-close subpanel to give canvas space
    if (vp === '2xl' || vp === 'xl') {
      set({ viewport: vp, isSubpanelOpen: false });
    } else {
      set({ viewport: vp });
    }
  },
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleGridOverlay: () => set((s) => ({ showGridOverlay: !s.showGridOverlay })),

  // Drawer Controls
  toggleRail: () => set((s) => ({ isRailCollapsed: !s.isRailCollapsed })),
  openSubpanel: (cat) => set((s) => ({ isSubpanelOpen: true, activeCategory: cat || s.activeCategory })),
  closeSubpanel: () => set({ isSubpanelOpen: false }),
  toggleSubpanel: () => set((s) => ({ isSubpanelOpen: !s.isSubpanelOpen })),
  toggleInspector: () => set((s) => ({ isInspectorOpen: !s.isInspectorOpen })),
  closeAllDrawers: () => set({ isSubpanelOpen: false }),

  undo: () => {
    const { historyIndex, history } = get();
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      set({ tokens: prev, historyIndex: historyIndex - 1 });
      get().injectCssTokens();
    }
  },

  redo: () => {
    const { historyIndex, history } = get();
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      set({ tokens: next, historyIndex: historyIndex + 1 });
      get().injectCssTokens();
    }
  },

  injectCssTokens: () => {
    const { colors, typography, spacing, radius, shadows } = get().tokens.foundations;
    const { brand, semantic, surface } = colors;

    const css = `
      :root, .demo-website {
        --color-primary: ${brand.primary};
        --color-primary-hover: ${brand.primaryHover};
        --color-primary-focus: ${brand.primaryFocus};
        --color-primary-light: ${brand.primary}18;
        --color-primary-foreground: #FFFFFF;
        
        --color-secondary: ${brand.secondary};
        --color-accent: ${brand.accent};

        --color-success: ${semantic.success};
        --color-warning: ${semantic.warning};
        --color-error: ${semantic.error};
        --color-info: ${semantic.info};

        --color-background: ${surface.background};
        --color-foreground: ${surface.foreground};
        --color-surface: ${surface.surface};
        --color-surface-subtle: ${surface.surfaceSubtle};
        --color-border: ${surface.border};
        --color-border-strong: ${surface.borderStrong};

        --color-text-primary: ${surface.foreground};
        --color-text-secondary: #475569;
        --color-text-muted: #94A3B8;

        --font-heading: '${typography.fontHeading}', sans-serif;
        --font-body: '${typography.fontBody}', sans-serif;
        --font-mono: '${typography.fontMono}', monospace;

        --space-0: ${spacing.scale[0]}px;
        --space-1: ${spacing.scale[1]}px;
        --space-2: ${spacing.scale[2]}px;
        --space-3: ${spacing.scale[3]}px;
        --space-4: ${spacing.scale[4]}px;
        --space-5: ${spacing.scale[5]}px;
        --space-6: ${spacing.scale[6]}px;
        --space-8: ${spacing.scale[7]}px;
        --space-10: ${spacing.scale[8]}px;
        --space-12: ${spacing.scale[9]}px;
        --space-16: ${spacing.scale[10]}px;

        --radius-none: 0px;
        --radius-sm: ${radius.sm}px;
        --radius-md: ${radius.md}px;
        --radius-lg: ${radius.lg}px;
        --radius-xl: ${radius.xl}px;
        --radius-full: ${radius.full}px;

        --shadow-sm: ${shadows.sm};
        --shadow-md: ${shadows.md};
        --shadow-lg: ${shadows.lg};
        --shadow-xl: ${shadows.xl};

        --control-height-sm: ${get().tokens.components.buttons.heightSm}px;
        --control-height-md: ${get().tokens.components.buttons.heightMd}px;
        --control-height-lg: ${get().tokens.components.buttons.heightLg}px;
      }
    `;

    let styleEl = document.getElementById('frontend-dynamic-tokens');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'frontend-dynamic-tokens';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = css;
  },
}));
