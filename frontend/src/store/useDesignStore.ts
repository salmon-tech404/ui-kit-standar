import { create } from 'zustand';
import { ColorEngine } from '../utils/colorEngine';

export type ViewportSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ThemeMode = 'light' | 'dark' | 'high_contrast';
export type TokenType =
  | 'color'
  | 'typography'
  | 'spacing'
  | 'radius'
  | 'shadow'
  | 'icon'
  | 'breakpoint'
  | 'motion'
  | 'zindex'
  | 'accessibility'
  | 'component'
  | 'project_info';

export interface ProjectMetadata {
  name: string;
  version: string;
  prefix: string; // e.g. "--ui-" or "--vx-"
  author: string;
  themeMode: ThemeMode;
}

export interface TypographyToken {
  fontFamily: string;
  fontSize: number; // px
  fontWeight: number; // 400, 500, 600, 700
  lineHeight: number; // e.g. 1.2, 1.5
  letterSpacing: string; // e.g. "-0.02em"
  semanticLevel: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'label' | 'caption' | 'code';
}

export interface MotionToken {
  name: string;
  duration: number; // ms
  easing: string; // cubic-bezier or ease-in-out
  cssVar: string;
  description: string;
}

export interface ZIndexToken {
  layer: string;
  value: number;
  description: string;
  cssVar: string;
}

export interface ComponentStateMatrix {
  default: Record<string, string>;
  hover: Record<string, string>;
  focusVisible: Record<string, string>;
  active: Record<string, string>;
  disabled: Record<string, string>;
  loading?: Record<string, string>;
}

export interface TokenState {
  project: ProjectMetadata;
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
      scaleRatio: number; // 1.25 Major Third
      styles: Record<string, TypographyToken>;
    };
    spacing: {
      base: number;
      scale: number[];
      componentHeights: {
        sm: number;
        md: number;
        lg: number;
      };
      containerMaxWidths: {
        sm: number;
        md: number;
        lg: number;
        xl: number;
        '2xl': number;
      };
    };
    radius: {
      base: number;
      none: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      full: number;
      concentricFormulaEnabled: boolean;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      card: string;
      modal: string;
      dropdown: string;
    };
    icons: {
      library: string; // "lucide-react"
      defaultSize: number;
      strokeWidth: number; // 1.5
      aliases: Record<string, string>;
    };
    breakpoints: {
      sm: number;
      md: number;
      lg: number;
      xl: number;
      '2xl': number;
      behaviors: Record<string, string>;
    };
    motion: {
      durations: {
        fast: number;
        normal: number;
        slow: number;
      };
      easings: {
        default: string;
        in: string;
        out: string;
        inOut: string;
        spring: string;
      };
      reducedMotion: boolean;
    };
    zindex: {
      layers: Record<string, number>;
    };
    accessibility: {
      focusRingWidth: number;
      focusRingOffset: number;
      focusRingColor: string;
      minContrastRatioAA: number; // 4.5
      minContrastRatioAAA: number; // 7.0
      keyboardNavEnabled: boolean;
    };
  };
  components: {
    actions: {
      button: { heightSm: number; heightMd: number; heightLg: number; radius: number };
      iconButton: { sizeSm: number; sizeMd: number; sizeLg: number };
      buttonGroup: { spacing: number };
    };
    forms: {
      input: { heightMd: number; radius: number };
      select: { heightMd: number; radius: number };
      checkbox: { size: number; radius: number };
      radio: { size: number };
      toggleSwitch: { width: number; height: number };
      textarea: { minHeight: number; radius: number };
    };
    feedback: {
      alert: { radius: number; padding: number };
      toast: { radius: number; duration: number };
      progress: { height: number; radius: number };
      skeleton: { animationSpeed: number };
      spinner: { size: number };
    };
    overlays: {
      modal: { maxWidth: number; radius: number; shadow: string };
      drawer: { width: number; position: 'right' | 'left' };
      dropdown: { radius: number; shadow: string };
      tooltip: { radius: number; delay: number };
    };
    navigation: {
      header: { height: number; sticky: boolean };
      sidebar: { widthExpanded: number; widthCollapsed: number };
      breadcrumb: { separator: string };
      tabs: { height: number; style: 'pill' | 'underline' };
      pagination: { buttonSize: number };
    };
    dataDisplay: {
      table: { headerHeight: number; rowHeight: number };
      badge: { height: number; radius: number };
      card: { radius: number; padding: number };
      avatar: { sizeSm: number; sizeMd: number; sizeLg: number };
    };
    layout: {
      container: { paddingX: number };
      grid: { columnsDesktop: number; columnsMobile: number; gap: number };
      divider: { thickness: number };
    };
  };
  patterns: {
    pageTemplates: string[];
    sections: string[];
    useCases: string[];
  };
}

export interface SelectedToken {
  type: TokenType;
  category: string;
  key: string;
  path: string;
  name: string;
  value: any;
  cssVar: string;
  description: string;
  impactComponents?: string[];
}

interface DesignStoreState {
  tokens: TokenState;
  selectedToken: SelectedToken;
  activeCategory: string;
  activeFilterTab: string;

  // Responsive & Studio View
  viewport: ViewportSize;
  viewMode: 'live' | 'wireframe';
  showGridOverlay: boolean;

  // Drawers
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
  setThemeMode: (mode: ThemeMode) => void;
  toggleGridOverlay: () => void;

  // Drawer Controls
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
  project: {
    name: 'Nuxt UI Master Standard',
    version: '1.0.0',
    prefix: '--ui-',
    author: 'Design Systems Architect',
    themeMode: 'light',
  },
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
      baseSize: 16,
      scaleRatio: 1.25,
      styles: {
        display: { fontFamily: 'Plus Jakarta Sans', fontSize: 48, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', semanticLevel: 'display' },
        h1: { fontFamily: 'Plus Jakarta Sans', fontSize: 36, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', semanticLevel: 'h1' },
        h2: { fontFamily: 'Plus Jakarta Sans', fontSize: 28, fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.01em', semanticLevel: 'h2' },
        h3: { fontFamily: 'Plus Jakarta Sans', fontSize: 22, fontWeight: 600, lineHeight: 1.3, letterSpacing: '0em', semanticLevel: 'h3' },
        h4: { fontFamily: 'Plus Jakarta Sans', fontSize: 18, fontWeight: 600, lineHeight: 1.35, letterSpacing: '0em', semanticLevel: 'h4' },
        body: { fontFamily: 'Inter', fontSize: 16, fontWeight: 400, lineHeight: 1.5, letterSpacing: '0em', semanticLevel: 'body' },
        label: { fontFamily: 'Inter', fontSize: 14, fontWeight: 600, lineHeight: 1.4, letterSpacing: '0.01em', semanticLevel: 'label' },
        caption: { fontFamily: 'Inter', fontSize: 12, fontWeight: 400, lineHeight: 1.4, letterSpacing: '0.02em', semanticLevel: 'caption' },
        code: { fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 500, lineHeight: 1.6, letterSpacing: '0em', semanticLevel: 'code' },
      },
    },
    spacing: {
      base: 8,
      scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64],
      componentHeights: {
        sm: 32,
        md: 40, // Strict standard
        lg: 48,
      },
      containerMaxWidths: {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1536,
      },
    },
    radius: {
      base: 8,
      none: 0,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      full: 9999,
      concentricFormulaEnabled: true,
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
      modal: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      dropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    },
    icons: {
      library: 'lucide-react',
      defaultSize: 20,
      strokeWidth: 1.5,
      aliases: {
        search: 'Search',
        delete: 'Trash2',
        edit: 'Pencil',
        close: 'X',
        check: 'Check',
        menu: 'Menu',
        user: 'User',
        settings: 'Settings',
        notification: 'Bell',
      },
    },
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
      behaviors: {
        sm: 'Mobile drawer navigation, 1-column layout, touch-optimized padding',
        md: 'Tablet layout, collapsed sidebar rail, 2-column cards',
        lg: 'Laptop layout, persistent sidebar, 3-column cards',
        xl: 'Standard desktop, full 4-pane studio view, 4-column cards',
        '2xl': 'Wide screen layout, max-width centered canvas',
      },
    },
    motion: {
      durations: {
        fast: 150,
        normal: 200,
        slow: 300,
      },
      easings: {
        default: 'cubic-bezier(0.4, 0, 0.2, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      reducedMotion: true,
    },
    zindex: {
      layers: {
        base: 0,
        card: 1,
        dropdown: 1000,
        sticky: 1100,
        banner: 1200,
        drawer: 1300,
        modal: 1400,
        popover: 1500,
        toast: 1600,
        tooltip: 1700,
      },
    },
    accessibility: {
      focusRingWidth: 2,
      focusRingOffset: 2,
      focusRingColor: '#6366F1',
      minContrastRatioAA: 4.5,
      minContrastRatioAAA: 7.0,
      keyboardNavEnabled: true,
    },
  },
  components: {
    actions: {
      button: { heightSm: 32, heightMd: 40, heightLg: 48, radius: 8 },
      iconButton: { sizeSm: 32, sizeMd: 40, sizeLg: 48 },
      buttonGroup: { spacing: 1 },
    },
    forms: {
      input: { heightMd: 40, radius: 8 },
      select: { heightMd: 40, radius: 8 },
      checkbox: { size: 18, radius: 4 },
      radio: { size: 18 },
      toggleSwitch: { width: 44, height: 24 },
      textarea: { minHeight: 80, radius: 8 },
    },
    feedback: {
      alert: { radius: 8, padding: 16 },
      toast: { radius: 8, duration: 4000 },
      progress: { height: 8, radius: 9999 },
      skeleton: { animationSpeed: 1.5 },
      spinner: { size: 24 },
    },
    overlays: {
      modal: { maxWidth: 560, radius: 16, shadow: '0 25px 50px -12px rgba(0,0,0,0.25)' },
      drawer: { width: 380, position: 'right' },
      dropdown: { radius: 8, shadow: '0 10px 15px -3px rgba(0,0,0,0.1)' },
      tooltip: { radius: 6, delay: 200 },
    },
    navigation: {
      header: { height: 64, sticky: true },
      sidebar: { widthExpanded: 240, widthCollapsed: 56 },
      breadcrumb: { separator: '/' },
      tabs: { height: 40, style: 'pill' },
      pagination: { buttonSize: 36 },
    },
    dataDisplay: {
      table: { headerHeight: 44, rowHeight: 48 },
      badge: { height: 22, radius: 9999 },
      card: { radius: 12, padding: 24 },
      avatar: { sizeSm: 32, sizeMd: 40, sizeLg: 56 },
    },
    layout: {
      container: { paddingX: 24 },
      grid: { columnsDesktop: 12, columnsMobile: 4, gap: 24 },
      divider: { thickness: 1 },
    },
  },
  patterns: {
    pageTemplates: ['Dashboard Analytics', 'User Settings', 'Authentication Login/Signup', 'SaaS Pricing Tier', 'Landing Hero Showcase'],
    sections: ['Hero Header', 'Feature Bento Grid', 'Testimonials Carousel', 'Pricing Comparison Table', 'FAQ Accordion', 'CTA Banner'],
    useCases: ['Authentication Flow', 'Checkout & Billing Flow', 'Global Search & Filter Matrix', 'Data Export Pipeline'],
  },
};

export const useDesignStore = create<DesignStoreState>((set, get) => ({
  tokens: defaultInitialTokens,
  selectedToken: {
    type: 'color',
    category: 'brand',
    key: 'primary',
    path: 'foundations.colors.brand.primary',
    name: 'Primary Brand Color',
    value: '#6366F1',
    cssVar: '--color-primary',
    description: 'Primary brand color used for key actions, CTA buttons, active tabs, and brand accents.',
    impactComponents: ['Button', 'Link', 'Tabs', 'Badge', 'Focus Ring', 'Hero CTA'],
  },
  activeCategory: 'colors',
  activeFilterTab: 'all',

  viewport: 'xl',
  viewMode: 'live',
  showGridOverlay: false,

  isRailCollapsed: false,
  isSubpanelOpen: false,
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

    // Auto-compute shades for primary color
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
    if (vp === '2xl' || vp === 'xl') {
      set({ viewport: vp, isSubpanelOpen: false });
    } else {
      set({ viewport: vp });
    }
  },
  setViewMode: (mode) => set({ viewMode: mode }),
  setThemeMode: (mode) => {
    const updated = JSON.parse(JSON.stringify(get().tokens));
    updated.project.themeMode = mode;
    if (mode === 'dark') {
      updated.foundations.colors.surface.background = '#0F172A';
      updated.foundations.colors.surface.foreground = '#F8FAFC';
      updated.foundations.colors.surface.surface = '#1E293B';
      updated.foundations.colors.surface.border = '#334155';
    } else {
      updated.foundations.colors.surface.background = '#FFFFFF';
      updated.foundations.colors.surface.foreground = '#0F172A';
      updated.foundations.colors.surface.surface = '#FFFFFF';
      updated.foundations.colors.surface.border = '#E2E8F0';
    }
    set({ tokens: updated });
    get().injectCssTokens();
  },
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
    const { colors, typography, spacing, radius, shadows, motion, zindex, accessibility } = get().tokens.foundations;
    const { brand, semantic, surface } = colors;
    const prefix = get().tokens.project.prefix || '--ui-';

    const css = `
      :root, .demo-website {
        ${prefix}color-primary: ${brand.primary};
        ${prefix}color-primary-hover: ${brand.primaryHover};
        ${prefix}color-primary-focus: ${brand.primaryFocus};
        ${prefix}color-primary-light: ${brand.primary}18;
        ${prefix}color-primary-foreground: #FFFFFF;
        
        ${prefix}color-secondary: ${brand.secondary};
        ${prefix}color-accent: ${brand.accent};

        ${prefix}color-success: ${semantic.success};
        ${prefix}color-warning: ${semantic.warning};
        ${prefix}color-error: ${semantic.error};
        ${prefix}color-info: ${semantic.info};

        ${prefix}color-background: ${surface.background};
        ${prefix}color-foreground: ${surface.foreground};
        ${prefix}color-surface: ${surface.surface};
        ${prefix}color-surface-subtle: ${surface.surfaceSubtle};
        ${prefix}color-border: ${surface.border};
        ${prefix}color-border-strong: ${surface.borderStrong};

        --color-primary: ${brand.primary};
        --color-primary-hover: ${brand.primaryHover};
        --color-primary-focus: ${brand.primaryFocus};
        --color-background: ${surface.background};
        --color-foreground: ${surface.foreground};
        --color-surface: ${surface.surface};
        --color-border: ${surface.border};

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
        --shadow-card: ${shadows.card};
        --shadow-modal: ${shadows.modal};
        --shadow-dropdown: ${shadows.dropdown};

        --motion-duration-fast: ${motion.durations.fast}ms;
        --motion-duration-normal: ${motion.durations.normal}ms;
        --motion-duration-slow: ${motion.durations.slow}ms;
        --motion-ease-default: ${motion.easings.default};

        --z-dropdown: ${zindex.layers.dropdown};
        --z-modal: ${zindex.layers.modal};
        --z-toast: ${zindex.layers.toast};
        --z-tooltip: ${zindex.layers.tooltip};

        --focus-ring-width: ${accessibility.focusRingWidth}px;
        --focus-ring-offset: ${accessibility.focusRingOffset}px;
        --focus-ring-color: ${accessibility.focusRingColor};

        --control-height-sm: ${get().tokens.components.actions.button.heightSm}px;
        --control-height-md: ${get().tokens.components.actions.button.heightMd}px;
        --control-height-lg: ${get().tokens.components.actions.button.heightLg}px;
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
