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
  | 'pattern'
  | 'brand'
  | 'project_info';

export interface ProjectMetadata {
  name: string;
  version: string;
  prefix: string; // e.g. "--ui-"
  author: string;
  themeMode: ThemeMode;
  completenessScore: number; // 0-100%
}

export interface CustomRfcRule {
  id: string;
  priority: 'MUST' | 'MUST_NOT' | 'SHOULD' | 'SHOULD_NOT';
  instruction: string;
  enabled: boolean;
}

export interface TypographyToken {
  fontFamily: string;
  fontSize: number;
  fontSizeMobile?: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: string;
  semanticLevel: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'label' | 'caption' | 'code';
}

export interface ButtonVariantSpec {
  bg: string;
  text: string;
  border: string;
  hoverBg: string;
  hoverText: string;
  activeBg: string;
  focusRing: string;
  disabledBg: string;
  disabledText: string;
}

export interface TokenState {
  project: ProjectMetadata;
  customRules: CustomRfcRule[];
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
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
        disabled: string;
        inverse: string;
        link: string;
      };
      borders: {
        subtle: string;
        default: string;
        strong: string;
        focus: string;
        error: string;
      };
      backgroundLayers: {
        page: string;
        card: string;
        modal: string;
        sidebar: string;
        subtle: string;
      };
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
      maxMeasureCharacters: number; // 65-75ch
      styles: Record<string, TypographyToken>;
    };
    spacing: {
      base: number;
      scale: number[];
      gaps: {
        iconText: number; // 6-8px
        formFields: number; // 16px
        sections: number; // 48-64px
        buttonGroup: number; // 8px
      };
      componentHeights: {
        sm: number;
        md: number;
        lg: number;
        xl: number;
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
      sm: { x: number; y: number; blur: number; spread: number; opacity: number; css: string };
      md: { x: number; y: number; blur: number; spread: number; opacity: number; css: string };
      lg: { x: number; y: number; blur: number; spread: number; opacity: number; css: string };
      xl: { x: number; y: number; blur: number; spread: number; opacity: number; css: string };
      card: string;
      modal: string;
      dropdown: string;
    };
    icons: {
      library: 'lucide-react' | 'heroicons' | 'tabler';
      defaultSize: number;
      strokeWidth: number;
      opticalAlignmentWithText: boolean;
      sizes: {
        inline: number; // 16px
        button: number; // 20px
        navigation: number; // 24px
        feature: number; // 32px
      };
      aliases: Record<string, string>;
    };
    breakpoints: {
      sm: number;
      md: number;
      lg: number;
      xl: number;
      '2xl': number;
      behaviors: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
      };
    };
    motion: {
      durations: {
        fast: number;
        normal: number;
        slow: number;
      };
      microInteractions: {
        hover: number; // 150ms
        dropdown: number; // 120ms
        modalEnter: number; // 250ms
        pageTransition: number; // 300ms
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
      minContrastRatioAA: number;
      minContrastRatioAAA: number;
      keyboardNavEnabled: boolean;
      requireAriaLabels: boolean;
    };
  };
  components: {
    actions: {
      button: {
        heightSm: number;
        heightMd: number;
        heightLg: number;
        radius: number;
        variants: {
          primary: ButtonVariantSpec;
          secondary: ButtonVariantSpec;
          outline: ButtonVariantSpec;
          ghost: ButtonVariantSpec;
          destructive: ButtonVariantSpec;
        };
        iconGap: number;
      };
      iconButton: { sizeSm: number; sizeMd: number; sizeLg: number };
      buttonGroup: { spacing: number };
    };
    forms: {
      input: { heightMd: number; radius: number; borderDefault: string; borderFocus: string; borderError: string };
      select: { heightMd: number; radius: number };
      checkbox: { size: number; radius: number };
      radio: { size: number };
      toggleSwitch: { width: number; height: number };
      textarea: { minHeight: number; radius: number };
    };
    feedback: {
      alert: { radius: number; padding: number; styles: Record<string, { bg: string; border: string; text: string }> };
      toast: { radius: number; duration: number; position: 'top-right' | 'bottom-right' | 'bottom-center' };
      progress: { height: number; radius: number };
      skeleton: { animationSpeed: number; radius: number };
      spinner: { size: number };
    };
    overlays: {
      modal: { maxWidthSm: number; maxWidthMd: number; maxWidthLg: number; radius: number; shadow: string; backdropBlur: boolean };
      drawer: { width: number; position: 'right' | 'left' };
      dropdown: { radius: number; shadow: string };
      tooltip: { radius: number; delay: number; bg: string; text: string };
    };
    navigation: {
      header: { height: number; sticky: boolean; bg: string };
      sidebar: { widthExpanded: number; widthCollapsed: number; style: 'A-Slim' | 'B-Standard' | 'C-Floating' | 'D-Grouped' };
      breadcrumb: { separator: string };
      tabs: { height: number; style: 'pill' | 'underline' };
      pagination: { buttonSize: number };
    };
    dataDisplay: {
      table: { headerHeight: number; rowHeightCompact: number; rowHeightComfortable: number; rowHeightSpacious: number };
      badge: { height: number; radius: number };
      card: { radius: number; padding: number; styles: Record<string, { bg: string; border: string; shadow: string }> };
      avatar: { sizeSm: number; sizeMd: number; sizeLg: number };
    };
    layout: {
      container: { paddingX: number; paddingXMobile: number };
      grid: { columnsDesktop: number; columnsMobile: number; gap: number };
      divider: { thickness: number; color: string };
    };
  };
  patterns: {
    pageTemplates: Array<{ name: string; description: string; sections: string[] }>;
    sections: Array<{ name: string; purpose: string; components: string[] }>;
    useCases: Array<{ name: string; flowSteps: string[] }>;
  };
  brandAssets: {
    logo: {
      urlLight: string;
      urlDark: string;
      aspectRatio: string;
      minHeight: number;
      safeZonePadding: number;
    };
    illustrations: { style: 'minimal_line' | 'flat_colored' | 'isometric' };
    images: { defaultBorderRadius: number; aspectRatios: string[] };
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
  guidelines?: {
    do: string[];
    dont: string[];
  };
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

  // Drawers & Modals
  isRailCollapsed: boolean;
  isSubpanelOpen: boolean;
  isInspectorOpen: boolean;
  isSettingsModalOpen: boolean;

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
  setIsSettingsModalOpen: (open: boolean) => void;

  // Custom RFC Rules
  addCustomRule: (priority: 'MUST' | 'MUST_NOT' | 'SHOULD' | 'SHOULD_NOT', instruction: string) => void;
  toggleCustomRule: (id: string) => void;
  deleteCustomRule: (id: string) => void;

  // Drawer Controls
  toggleRail: () => void;
  openSubpanel: (cat?: string) => void;
  closeSubpanel: () => void;
  toggleSubpanel: () => void;
  toggleInspector: () => void;
  closeAllDrawers: () => void;

  undo: () => void;
  redo: () => void;
  calculateCompletenessScore: () => number;
  injectCssTokens: () => void;
}

const defaultInitialTokens: TokenState = {
  project: {
    name: 'Nuxt UI Master Standard',
    version: '1.0.0',
    prefix: '--ui-',
    author: 'Design Systems Architect',
    themeMode: 'light',
    completenessScore: 98,
  },
  customRules: [
    { id: 'R01', priority: 'MUST_NOT', instruction: 'Do not write raw hex colors. All colors MUST resolve to defined CSS variables.', enabled: true },
    { id: 'R02', priority: 'MUST_NOT', instruction: 'Do not use arbitrary spacing. MUST use the 8-point spacing scale (0, 4, 8, 12, 16, 24, 32, 40, 48, 64px).', enabled: true },
    { id: 'R03', priority: 'MUST', instruction: 'Buttons, Inputs, and Dropdowns on the same row MUST have identical control heights (MD = 40px).', enabled: true },
    { id: 'R04', priority: 'MUST', instruction: 'Nested containers MUST obey concentric radius formula: R_inner = max(0, R_outer - Padding).', enabled: true },
    { id: 'R05', priority: 'MUST', instruction: 'Import icons ONLY from "lucide-react" with stroke-width: 1.5.', enabled: true },
    { id: 'R06', priority: 'MUST', instruction: 'Interactive elements MUST support 6 states: Default, Hover, Focus-Visible, Active, Disabled, and Loading.', enabled: true },
    { id: 'R07', priority: 'MUST', instruction: 'All motion transitions MUST respect @media (prefers-reduced-motion: reduce).', enabled: true },
    { id: 'R08', priority: 'MUST_NOT', instruction: 'Do not use more than 1 primary, 1 secondary, and 1 accent color in a single interface.', enabled: true },
  ],
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
      text: {
        primary: '#0F172A',
        secondary: '#475569',
        tertiary: '#94A3B8',
        disabled: '#CBD5E1',
        inverse: '#FFFFFF',
        link: '#6366F1',
      },
      borders: {
        subtle: '#F1F5F9',
        default: '#E2E8F0',
        strong: '#CBD5E1',
        focus: '#6366F1',
        error: '#EF4444',
      },
      backgroundLayers: {
        page: '#F8FAFC',
        card: '#FFFFFF',
        modal: '#FFFFFF',
        sidebar: '#FFFFFF',
        subtle: '#F1F5F9',
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
      maxMeasureCharacters: 70,
      styles: {
        display: { fontFamily: 'Plus Jakarta Sans', fontSize: 48, fontSizeMobile: 36, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', semanticLevel: 'display' },
        h1: { fontFamily: 'Plus Jakarta Sans', fontSize: 36, fontSizeMobile: 28, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', semanticLevel: 'h1' },
        h2: { fontFamily: 'Plus Jakarta Sans', fontSize: 28, fontSizeMobile: 24, fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.01em', semanticLevel: 'h2' },
        h3: { fontFamily: 'Plus Jakarta Sans', fontSize: 22, fontSizeMobile: 20, fontWeight: 600, lineHeight: 1.3, letterSpacing: '0em', semanticLevel: 'h3' },
        h4: { fontFamily: 'Plus Jakarta Sans', fontSize: 18, fontSizeMobile: 16, fontWeight: 600, lineHeight: 1.35, letterSpacing: '0em', semanticLevel: 'h4' },
        body: { fontFamily: 'Inter', fontSize: 16, fontSizeMobile: 15, fontWeight: 400, lineHeight: 1.5, letterSpacing: '0em', semanticLevel: 'body' },
        label: { fontFamily: 'Inter', fontSize: 14, fontSizeMobile: 13, fontWeight: 600, lineHeight: 1.4, letterSpacing: '0.01em', semanticLevel: 'label' },
        caption: { fontFamily: 'Inter', fontSize: 12, fontSizeMobile: 12, fontWeight: 400, lineHeight: 1.4, letterSpacing: '0.02em', semanticLevel: 'caption' },
        code: { fontFamily: 'JetBrains Mono', fontSize: 13, fontSizeMobile: 12, fontWeight: 500, lineHeight: 1.6, letterSpacing: '0em', semanticLevel: 'code' },
      },
    },
    spacing: {
      base: 8,
      scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64],
      gaps: {
        iconText: 8,
        formFields: 16,
        sections: 64,
        buttonGroup: 8,
      },
      componentHeights: {
        sm: 32,
        md: 40,
        lg: 48,
        xl: 56,
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
      sm: { x: 0, y: 1, blur: 2, spread: 0, opacity: 0.05, css: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
      md: { x: 0, y: 4, blur: 6, spread: -1, opacity: 0.08, css: '0 4px 6px -1px rgba(0, 0, 0, 0.08)' },
      lg: { x: 0, y: 10, blur: 15, spread: -3, opacity: 0.1, css: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' },
      xl: { x: 0, y: 20, blur: 25, spread: -5, opacity: 0.15, css: '0 20px 25px -5px rgba(0, 0, 0, 0.15)' },
      card: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
      modal: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      dropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.08)',
    },
    icons: {
      library: 'lucide-react',
      defaultSize: 20,
      strokeWidth: 1.5,
      opticalAlignmentWithText: true,
      sizes: {
        inline: 16,
        button: 20,
        navigation: 24,
        feature: 32,
      },
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
        sm: 'Mobile drawer navigation, 1-column layout, touch-optimized tap targets (44px min)',
        md: 'Tablet layout, collapsed sidebar rail, 2-column cards grid',
        lg: 'Laptop layout, persistent expanded sidebar, 3-column cards grid',
        xl: 'Standard desktop, full 4-pane studio view, 4-column cards grid',
        '2xl': 'Wide screen layout, max-width 1536px centered canvas with ambient padding',
      },
    },
    motion: {
      durations: {
        fast: 150,
        normal: 200,
        slow: 300,
      },
      microInteractions: {
        hover: 150,
        dropdown: 120,
        modalEnter: 250,
        pageTransition: 300,
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
      requireAriaLabels: true,
    },
  },
  components: {
    actions: {
      button: {
        heightSm: 32,
        heightMd: 40,
        heightLg: 48,
        radius: 8,
        iconGap: 8,
        variants: {
          primary: {
            bg: '#6366F1',
            text: '#FFFFFF',
            border: 'transparent',
            hoverBg: '#4F46E5',
            hoverText: '#FFFFFF',
            activeBg: '#4338CA',
            focusRing: '#6366F1',
            disabledBg: '#E2E8F0',
            disabledText: '#94A3B8',
          },
          secondary: {
            bg: '#F1F5F9',
            text: '#0F172A',
            border: 'transparent',
            hoverBg: '#E2E8F0',
            hoverText: '#0F172A',
            activeBg: '#CBD5E1',
            focusRing: '#6366F1',
            disabledBg: '#F8FAFC',
            disabledText: '#CBD5E1',
          },
          outline: {
            bg: 'transparent',
            text: '#0F172A',
            border: '#E2E8F0',
            hoverBg: '#F8FAFC',
            hoverText: '#0F172A',
            activeBg: '#F1F5F9',
            focusRing: '#6366F1',
            disabledBg: 'transparent',
            disabledText: '#CBD5E1',
          },
          ghost: {
            bg: 'transparent',
            text: '#475569',
            border: 'transparent',
            hoverBg: '#F1F5F9',
            hoverText: '#0F172A',
            activeBg: '#E2E8F0',
            focusRing: '#6366F1',
            disabledBg: 'transparent',
            disabledText: '#CBD5E1',
          },
          destructive: {
            bg: '#EF4444',
            text: '#FFFFFF',
            border: 'transparent',
            hoverBg: '#DC2626',
            hoverText: '#FFFFFF',
            activeBg: '#B91C1C',
            focusRing: '#EF4444',
            disabledBg: '#FEE2E2',
            disabledText: '#FCA5A5',
          },
        },
      },
      iconButton: { sizeSm: 32, sizeMd: 40, sizeLg: 48 },
      buttonGroup: { spacing: 1 },
    },
    forms: {
      input: { heightMd: 40, radius: 8, borderDefault: '#E2E8F0', borderFocus: '#6366F1', borderError: '#EF4444' },
      select: { heightMd: 40, radius: 8 },
      checkbox: { size: 18, radius: 4 },
      radio: { size: 18 },
      toggleSwitch: { width: 44, height: 24 },
      textarea: { minHeight: 80, radius: 8 },
    },
    feedback: {
      alert: {
        radius: 8,
        padding: 16,
        styles: {
          info: { bg: '#EFF6FF', border: '#BFDBFE', text: '#1D4ED8' },
          success: { bg: '#ECFDF5', border: '#A7F3D0', text: '#047857' },
          warning: { bg: '#FFFBEB', border: '#FDE68A', text: '#B45309' },
          error: { bg: '#FEF2F2', border: '#FECACA', text: '#B91C1C' },
        },
      },
      toast: { radius: 8, duration: 4000, position: 'bottom-right' },
      progress: { height: 8, radius: 9999 },
      skeleton: { animationSpeed: 1.5, radius: 6 },
      spinner: { size: 24 },
    },
    overlays: {
      modal: { maxWidthSm: 400, maxWidthMd: 560, maxWidthLg: 720, radius: 16, shadow: '0 25px 50px -12px rgba(0,0,0,0.25)', backdropBlur: true },
      drawer: { width: 380, position: 'right' },
      dropdown: { radius: 8, shadow: '0 10px 15px -3px rgba(0,0,0,0.1)' },
      tooltip: { radius: 6, delay: 200, bg: '#0F172A', text: '#FFFFFF' },
    },
    navigation: {
      header: { height: 64, sticky: true, bg: '#FFFFFF' },
      sidebar: { widthExpanded: 250, widthCollapsed: 56, style: 'B-Standard' },
      breadcrumb: { separator: '/' },
      tabs: { height: 40, style: 'pill' },
      pagination: { buttonSize: 36 },
    },
    dataDisplay: {
      table: { headerHeight: 44, rowHeightCompact: 36, rowHeightComfortable: 48, rowHeightSpacious: 60 },
      badge: { height: 22, radius: 9999 },
      card: {
        radius: 12,
        padding: 24,
        styles: {
          basic: { bg: '#FFFFFF', border: '#E2E8F0', shadow: 'none' },
          elevated: { bg: '#FFFFFF', border: 'transparent', shadow: '0 4px 6px -1px rgba(0,0,0,0.08)' },
          outlined: { bg: '#FFFFFF', border: '#CBD5E1', shadow: 'none' },
        },
      },
      avatar: { sizeSm: 32, sizeMd: 40, sizeLg: 56 },
    },
    layout: {
      container: { paddingX: 24, paddingXMobile: 16 },
      grid: { columnsDesktop: 12, columnsMobile: 4, gap: 24 },
      divider: { thickness: 1, color: '#E2E8F0' },
    },
  },
  patterns: {
    pageTemplates: [
      { name: 'Dashboard Analytics', description: 'Enterprise telemetry dashboard', sections: ['Header', 'Sidebar', 'KPI 4-Grid', 'Chart Section', 'Table'] },
      { name: 'User Settings', description: 'Account and security management', sections: ['Header', 'Tab Navigation', 'Form Cards', 'Sticky Action Bar'] },
      { name: 'Authentication Login/Signup', description: 'Split or centered auth portal', sections: ['Brand Header', 'Social Auth', 'Form Fields', 'Footer Terms'] },
      { name: 'SaaS Pricing Tier', description: 'Multi-tier subscription matrix', sections: ['Hero Title', 'Billing Toggle', 'Pricing 3-Cards', 'Feature Comparison'] },
    ],
    sections: [
      { name: 'Hero Header', purpose: 'Value proposition & CTA', components: ['Headline H1', 'Subtitle Body', 'Primary Button', 'Social Proof'] },
      { name: 'Feature Bento Grid', purpose: 'Visual capability breakdown', components: ['Bento Cards', 'Icons', 'Badges', 'Micro-interactions'] },
      { name: 'FAQ Accordion', purpose: 'Customer query resolution', components: ['Accordion Rows', 'Support CTA'] },
    ],
    useCases: [
      { name: 'Authentication Flow', flowSteps: ['User arrives at login', 'Fills credentials with real-time validation', 'Submits form (Loading state)', 'Redirects with toast notification'] },
      { name: 'Checkout & Billing Flow', flowSteps: ['Selects tier plan', 'Enters payment info', 'Applies coupon code', 'Completes order & generates invoice'] },
    ],
  },
  brandAssets: {
    logo: {
      urlLight: '/assets/logo-light.svg',
      urlDark: '/assets/logo-dark.svg',
      aspectRatio: '16:4',
      minHeight: 28,
      safeZonePadding: 16,
    },
    illustrations: { style: 'minimal_line' },
    images: { defaultBorderRadius: 8, aspectRatios: ['16:9', '4:3', '1:1'] },
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
    cssVar: '--ui-color-primary',
    description: 'Primary brand color used for main CTA actions, active navigation states, and focus rings.',
    impactComponents: ['Button (Primary)', 'Link (Active)', 'Tabs (Active Pill)', 'Badge (Primary)', 'Focus Visible Outline'],
    guidelines: {
      do: ['Use for the single most important action per view.', 'Ensure at least 4.5:1 contrast against surface background.'],
      dont: ['Do not use for destructive actions (use Error color).', 'Do not place primary buttons side-by-side without hierarchy.'],
    },
  },
  activeCategory: 'colors',
  activeFilterTab: 'all',

  viewport: 'xl',
  viewMode: 'live',
  showGridOverlay: false,

  isRailCollapsed: false,
  isSubpanelOpen: false,
  isInspectorOpen: true,
  isSettingsModalOpen: false,

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
      currentTokens.components.actions.button.variants.primary.bg = value;
      currentTokens.components.actions.button.variants.primary.hoverBg = shades['600'];
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
      updated.foundations.colors.surface.background = '#090D16';
      updated.foundations.colors.surface.foreground = '#F8FAFC';
      updated.foundations.colors.surface.surface = '#0F172A';
      updated.foundations.colors.surface.border = '#1E293B';
      updated.foundations.colors.backgroundLayers.page = '#090D16';
      updated.foundations.colors.backgroundLayers.card = '#0F172A';
      updated.foundations.colors.backgroundLayers.modal = '#131B2E';
      updated.foundations.colors.text.primary = '#F8FAFC';
      updated.foundations.colors.text.secondary = '#94A3B8';
      updated.foundations.colors.borders.default = '#1E293B';
    } else {
      updated.foundations.colors.surface.background = '#FFFFFF';
      updated.foundations.colors.surface.foreground = '#0F172A';
      updated.foundations.colors.surface.surface = '#FFFFFF';
      updated.foundations.colors.surface.border = '#E2E8F0';
      updated.foundations.colors.backgroundLayers.page = '#F8FAFC';
      updated.foundations.colors.backgroundLayers.card = '#FFFFFF';
      updated.foundations.colors.backgroundLayers.modal = '#FFFFFF';
      updated.foundations.colors.text.primary = '#0F172A';
      updated.foundations.colors.text.secondary = '#475569';
      updated.foundations.colors.borders.default = '#E2E8F0';
    }
    set({ tokens: updated });
    get().injectCssTokens();
  },
  toggleGridOverlay: () => set((s) => ({ showGridOverlay: !s.showGridOverlay })),
  setIsSettingsModalOpen: (open) => set({ isSettingsModalOpen: open }),

  // Custom RFC Rule Management
  addCustomRule: (priority, instruction) => {
    const newRule: CustomRfcRule = {
      id: `CUSTOM_${Date.now().toString().slice(-4)}`,
      priority,
      instruction,
      enabled: true,
    };
    const updated = JSON.parse(JSON.stringify(get().tokens));
    updated.customRules = [newRule, ...updated.customRules];
    set({ tokens: updated });
  },

  toggleCustomRule: (id) => {
    const updated = JSON.parse(JSON.stringify(get().tokens));
    const target = updated.customRules.find((r: CustomRfcRule) => r.id === id);
    if (target) target.enabled = !target.enabled;
    set({ tokens: updated });
  },

  deleteCustomRule: (id) => {
    const updated = JSON.parse(JSON.stringify(get().tokens));
    updated.customRules = updated.customRules.filter((r: CustomRfcRule) => r.id !== id);
    set({ tokens: updated });
  },

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

  calculateCompletenessScore: () => {
    const { foundations, components, customRules } = get().tokens;
    let score = 100;
    if (!foundations.colors.semantic.error) score -= 5;
    if (!foundations.typography.styles.h1) score -= 5;
    if (!components.actions.button.variants.primary) score -= 10;
    if (!components.actions.button.variants.destructive) score -= 5;
    if (customRules.filter((r) => r.enabled).length < 5) score -= 5;
    return Math.max(70, score);
  },

  injectCssTokens: () => {
    const { colors, typography, spacing, radius, shadows, motion, zindex, accessibility } = get().tokens.foundations;
    const { brand, semantic, surface, text, borders, backgroundLayers } = colors;
    const prefix = get().tokens.project.prefix || '--ui-';

    const css = `
      :root, .demo-website {
        ${prefix}color-primary: ${brand.primary};
        ${prefix}color-primary-hover: ${brand.primaryHover};
        ${prefix}color-primary-focus: ${brand.primaryFocus};
        ${prefix}color-secondary: ${brand.secondary};
        ${prefix}color-accent: ${brand.accent};

        ${prefix}color-success: ${semantic.success};
        ${prefix}color-warning: ${semantic.warning};
        ${prefix}color-error: ${semantic.error};
        ${prefix}color-info: ${semantic.info};

        ${prefix}color-text-primary: ${text.primary};
        ${prefix}color-text-secondary: ${text.secondary};
        ${prefix}color-text-tertiary: ${text.tertiary};
        ${prefix}color-text-link: ${text.link};

        ${prefix}color-bg-page: ${backgroundLayers.page};
        ${prefix}color-bg-card: ${backgroundLayers.card};
        ${prefix}color-bg-modal: ${backgroundLayers.modal};

        ${prefix}color-border-subtle: ${borders.subtle};
        ${prefix}color-border-default: ${borders.default};
        ${prefix}color-border-strong: ${borders.strong};

        --color-primary: ${brand.primary};
        --color-primary-hover: ${brand.primaryHover};
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
        --space-6: ${spacing.scale[6]}px;
        --space-8: ${spacing.scale[7]}px;
        --space-10: ${spacing.scale[8]}px;
        --space-12: ${spacing.scale[9]}px;
        --space-16: ${spacing.scale[10]}px;

        --gap-icon-text: ${spacing.gaps.iconText}px;
        --gap-form-fields: ${spacing.gaps.formFields}px;
        --gap-sections: ${spacing.gaps.sections}px;

        --radius-none: 0px;
        --radius-sm: ${radius.sm}px;
        --radius-md: ${radius.md}px;
        --radius-lg: ${radius.lg}px;
        --radius-xl: ${radius.xl}px;
        --radius-full: ${radius.full}px;

        --shadow-card: ${shadows.card};
        --shadow-modal: ${shadows.modal};
        --shadow-dropdown: ${shadows.dropdown};

        --motion-duration-fast: ${motion.durations.fast}ms;
        --motion-duration-normal: ${motion.durations.normal}ms;
        --motion-duration-slow: ${motion.durations.slow}ms;

        --focus-ring-width: ${accessibility.focusRingWidth}px;
        --focus-ring-offset: ${accessibility.focusRingOffset}px;
        --focus-ring-color: ${accessibility.focusRingColor};

        --control-height-sm: ${spacing.componentHeights.sm}px;
        --control-height-md: ${spacing.componentHeights.md}px;
        --control-height-lg: ${spacing.componentHeights.lg}px;
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
