import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ColorEngine, loadActiveFoundationFonts } from '@/shared/lib';
import { POPULAR_COLOR_THEMES } from '@/entities/popular-theme';

export type ViewportSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ThemeMode = 'light' | 'dark' | 'high_contrast';
export type DemoTemplateType = 'landing' | 'dashboard' | 'table' | 'settings' | 'billing' | 'auth' | 'kitchen_sink';

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

export type SupportedThemeMode = 'light' | 'dark' | 'system';

export interface ProjectMetadata {
  name: string;
  version: string;
  prefix: string;
  author: string;
  themeMode: ThemeMode;
  supportedThemeModes: SupportedThemeMode[];
  completenessScore: number;
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
      maxMeasureCharacters: number;
      styles: Record<string, TypographyToken>;
    };
    spacing: {
      base: number;
      scale: number[];
      padding: {
        buttonSm: { px: number; py: number };
        buttonMd: { px: number; py: number };
        buttonLg: { px: number; py: number };
        input: { px: number; py: number };
        card: { p: number };
        modal: { p: number };
        badge: { px: number; py: number };
        tableCell: { px: number; py: number };
      };
      microGaps: {
        iconText: number;
        labelInput: number;
        inputError: number;
        checkboxLabel: number;
        avatarUser: number;
      };
      flowGaps: {
        formFields: number;
        buttonGroup: number;
        cardGrid: number;
        listRows: number;
      };
      layout: {
        sectionGapMobile: number;
        sectionGapDesktop: number;
        containerPaddingMobile: number;
        containerPaddingDesktop: number;
      };
      compound: {
        cardHeaderBody: number;
        modalHeaderBody: number;
      };
      gaps: {
        iconText: number;
        formFields: number;
        sections: number;
        buttonGroup: number;
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
      input?: string;
      card: string;
      infobox?: string;
      modal: string;
      dropdown: string;
    };
    icons: {
      library: 'lucide-react' | 'heroicons' | 'tabler';
      defaultSize: number;
      strokeWidth: number;
      opticalAlignmentWithText: boolean;
      colorMode: 'primary' | 'muted' | 'custom';
      customColor: string;
      sizes: {
        inline: number;
        button: number;
        navigation: number;
        feature: number;
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
        hover: number;
        dropdown: number;
        modalEnter: number;
        pageTransition: number;
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
        iconGap: number;
        variants: {
          primary: ButtonVariantSpec;
          secondary: ButtonVariantSpec;
          outline: ButtonVariantSpec;
          ghost: ButtonVariantSpec;
          destructive: ButtonVariantSpec;
        };
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
      alert: {
        radius: number;
        padding: number;
        styles: {
          info: { bg: string; border: string; text: string };
          success: { bg: string; border: string; text: string };
          warning: { bg: string; border: string; text: string };
          error: { bg: string; border: string; text: string };
        };
      };
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
      card: {
        radius: number;
        padding: number;
        styles: {
          basic: { bg: string; border: string; shadow: string };
          elevated: { bg: string; border: string; shadow: string };
          outlined: { bg: string; border: string; shadow: string };
        };
      };
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
  meta?: any;
}

interface DesignStoreState {
  tokens: TokenState;
  selectedToken: SelectedToken;
  activeCategory: string;
  activeFilterTab: string;
  activeColorThemeId: string;
  applyPopularColorTheme: (themeId: string) => void;

  // Active Demo Page Template in LiveCanvas
  activeDemoTemplate: DemoTemplateType;
  setActiveDemoTemplate: (template: DemoTemplateType) => void;

  viewport: ViewportSize;
  viewMode: 'live' | 'wireframe';
  showGridOverlay: boolean;

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
  toggleSupportedThemeMode: (mode: SupportedThemeMode) => void;

  addCustomRule: (priority: 'MUST' | 'MUST_NOT' | 'SHOULD' | 'SHOULD_NOT', instruction: string) => void;
  toggleCustomRule: (id: string) => void;
  deleteCustomRule: (id: string) => void;

  toggleRail: () => void;
  openSubpanel: (cat?: string) => void;
  closeSubpanel: () => void;
  toggleSubpanel: () => void;
  toggleInspector: () => void;
  closeAllDrawers: () => void;

  undo: () => void;
  redo: () => void;
  resetToDefaultTokens: () => void;
  calculateCompletenessScore: () => number;
  injectCssTokens: () => void;
}

const getInitialLogoUrl = (): string => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('raku_custom_logo');
      if (saved) return saved;
    } catch {
      // ignore
    }
  }
  return '/icons/raku_FF4F00_logo_128.png';
};

const initialLogo = getInitialLogoUrl();

const defaultInitialTokens: TokenState = {
  project: {
    name: 'RAKU — The Design System for Vibe Coding',
    version: '1.1.0',
    prefix: '--ui-',
    author: 'Design Systems Architect',
    themeMode: 'light',
    supportedThemeModes: ['light', 'dark', 'system'],
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
    { id: 'R09', priority: 'MUST_NOT', instruction: 'Do not use font-bold (700) for body text, table cells, form values, or secondary labels. MUST use font-medium (500) for data and font-semibold (600) for buttons and card headers.', enabled: true },
    { id: 'R10', priority: 'MUST', instruction: 'MUST follow standard typographic scale (11px, 12px, 14px, 16px, 18px, 24px, 36px, 48px). Avoid arbitrary ad-hoc font sizes.', enabled: true },
    { id: 'R11', priority: 'MUST', instruction: 'Headings >= 24px MUST have tracking-tight (-0.01em to -0.03em) and leading-tight (1.1 to 1.25). Uppercase badges MUST have tracking-wider (+0.04em).', enabled: true },
    { id: 'R12', priority: 'MUST', instruction: 'Long body text paragraphs MUST be constrained to max-w-prose (45-75 characters per line).', enabled: true },
  ],
  foundations: {
    colors: {
      brand: {
        primary: '#FF4F00',
        primaryHover: '#E04500',
        primaryFocus: '#FF7333',
        secondary: '#1E293B',
        accent: '#06B6D4',
      },
      semantic: {
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      neutral: {
        gray100: '#F3F4F6',
        gray200: '#E5E7EB',
        gray500: '#6B7280',
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
        link: '#FF4F00',
      },
      borders: {
        subtle: '#F1F5F9',
        default: '#E2E8F0',
        strong: '#CBD5E1',
        focus: '#FF4F00',
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
        h2: { fontFamily: 'Plus Jakarta Sans', fontSize: 24, fontSizeMobile: 20, fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.01em', semanticLevel: 'h2' },
        h3: { fontFamily: 'Plus Jakarta Sans', fontSize: 18, fontSizeMobile: 16, fontWeight: 600, lineHeight: 1.3, letterSpacing: '0em', semanticLevel: 'h3' },
        h4: { fontFamily: 'Plus Jakarta Sans', fontSize: 16, fontSizeMobile: 15, fontWeight: 600, lineHeight: 1.35, letterSpacing: '0em', semanticLevel: 'h4' },
        body: { fontFamily: 'Inter', fontSize: 14, fontSizeMobile: 14, fontWeight: 400, lineHeight: 1.5, letterSpacing: '0em', semanticLevel: 'body' },
        label: { fontFamily: 'Inter', fontSize: 12, fontSizeMobile: 12, fontWeight: 600, lineHeight: 1.4, letterSpacing: '0.02em', semanticLevel: 'label' },
        caption: { fontFamily: 'Inter', fontSize: 12, fontSizeMobile: 12, fontWeight: 400, lineHeight: 1.4, letterSpacing: '0em', semanticLevel: 'caption' },
        code: { fontFamily: 'JetBrains Mono', fontSize: 13, fontSizeMobile: 12, fontWeight: 500, lineHeight: 1.6, letterSpacing: '0em', semanticLevel: 'code' },
      },
    },
    spacing: {
      base: 8,
      scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64],
      padding: {
        buttonSm: { px: 12, py: 6 },
        buttonMd: { px: 16, py: 8 },
        buttonLg: { px: 20, py: 12 },
        input: { px: 12, py: 8 },
        card: { p: 20 },
        modal: { p: 24 },
        badge: { px: 8, py: 2 },
        tableCell: { px: 16, py: 12 },
      },
      microGaps: {
        iconText: 8,
        labelInput: 6,
        inputError: 4,
        checkboxLabel: 8,
        avatarUser: 12,
      },
      flowGaps: {
        formFields: 16,
        buttonGroup: 12,
        cardGrid: 24,
        listRows: 8,
      },
      layout: {
        sectionGapMobile: 48,
        sectionGapDesktop: 80,
        containerPaddingMobile: 16,
        containerPaddingDesktop: 32,
      },
      compound: {
        cardHeaderBody: 16,
        modalHeaderBody: 20,
      },
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
      input: 'none',
      card: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
      infobox: 'none',
      modal: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      dropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.08)',
    },
    icons: {
      library: 'lucide-react',
      defaultSize: 20,
      strokeWidth: 1.5,
      opticalAlignmentWithText: true,
      colorMode: 'primary',
      customColor: '#6366F1',
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
      focusRingColor: '#FF4F00',
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
            bg: '#FF4F00',
            text: '#FFFFFF',
            border: 'transparent',
            hoverBg: '#E04500',
            hoverText: '#FFFFFF',
            activeBg: '#C73E00',
            focusRing: '#FF4F00',
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
      urlLight: '/icons/raku_FF4F00_logo_128.png',
      urlDark: '/icons/raku_FF4F00_logo_128.png',
      aspectRatio: '16:4',
      minHeight: 28,
      safeZonePadding: 16,
    },
    illustrations: { style: 'minimal_line' },
    images: { defaultBorderRadius: 8, aspectRatios: ['16:9', '4:3', '1:1'] },
  },
};

export const useDesignStore = create<DesignStoreState>()(
  persist(
    (set, get) => ({
      tokens: defaultInitialTokens,
      selectedToken: {
        type: 'color',
        category: 'brand',
        key: 'primary',
        path: 'foundations.colors.brand.primary',
        name: 'Primary Brand Color',
        value: '#FF4F00',
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
      activeColorThemeId: 'raku-orange',

      resetToDefaultTokens: () => {
        const freshTokens = JSON.parse(JSON.stringify(defaultInitialTokens));
        set({
          tokens: freshTokens,
          activeColorThemeId: 'raku-orange',
          history: [freshTokens],
          historyIndex: 0,
          selectedToken: {
            type: 'color',
            category: 'brand',
            key: 'primary',
            path: 'foundations.colors.brand.primary',
            name: 'Primary Brand Color',
            value: '#FF4F00',
            cssVar: '--ui-color-primary',
            description: 'Primary brand color used for main CTA actions, active navigation states, and focus rings.',
            impactComponents: ['Button (Primary)', 'Link (Active)', 'Tabs (Active Pill)', 'Badge (Primary)', 'Focus Visible Outline'],
            guidelines: {
              do: ['Use for the single most important action per view.', 'Ensure at least 4.5:1 contrast against surface background.'],
              dont: ['Do not use for destructive actions (use Error color).', 'Do not place primary buttons side-by-side without hierarchy.'],
            },
          },
        });
        get().injectCssTokens();
      },

      applyPopularColorTheme: (themeId: string) => {
        const theme = POPULAR_COLOR_THEMES.find((t) => t.id === themeId);
        if (!theme) return;
        const currentTokens = JSON.parse(JSON.stringify(get().tokens));
        currentTokens.foundations.colors.brand.primary = theme.colors.primary;
        currentTokens.foundations.colors.brand.primaryHover = theme.colors.primaryHover;
        currentTokens.foundations.colors.brand.primaryFocus = theme.colors.primaryFocus;
        currentTokens.foundations.colors.brand.secondary = theme.colors.secondary;
        currentTokens.foundations.colors.brand.accent = theme.colors.accent;
        if (theme.colors.textLink) {
          currentTokens.foundations.colors.text.link = theme.colors.textLink;
        }
        currentTokens.foundations.colors.borders.focus = theme.colors.primary;
        currentTokens.foundations.accessibility.focusRingColor = theme.colors.primary;
        currentTokens.components.actions.button.variants.primary.bg = theme.colors.primary;
        currentTokens.components.actions.button.variants.primary.hoverBg = theme.colors.primaryHover;
        currentTokens.components.actions.button.variants.primary.focusRing = theme.colors.primary;

        const newHistory = get().history.slice(0, get().historyIndex + 1);
        newHistory.push(currentTokens);

        set({
          tokens: currentTokens,
          activeColorThemeId: themeId,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });

        get().injectCssTokens();
      },

      activeDemoTemplate: 'landing',
      setActiveDemoTemplate: (template) => set({ activeDemoTemplate: template }),

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

        if (path === 'brandAssets.logo.urlLight' || path === 'brandAssets.logo.urlDark') {
          try {
            localStorage.setItem('raku_custom_logo', value);
          } catch (e) {}
        }

        const newHistory = get().history.slice(0, get().historyIndex + 1);
        newHistory.push(currentTokens);

        const currentSelected = get().selectedToken;
        const updatedSelected = currentSelected && currentSelected.path === path
          ? { ...currentSelected, value }
          : currentSelected;

        set({
          tokens: currentTokens,
          selectedToken: updatedSelected,
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

      toggleSupportedThemeMode: (mode) => {
        const currentTokens = JSON.parse(JSON.stringify(get().tokens));
        const current: SupportedThemeMode[] = currentTokens.project.supportedThemeModes || ['light', 'dark', 'system'];
        let next: SupportedThemeMode[];
        if (current.includes(mode)) {
          if (current.length <= 1) return; // Retain at least 1 mode
          next = current.filter((m) => m !== mode);
        } else {
          next = [...current, mode];
        }
        currentTokens.project.supportedThemeModes = next;
        set({ tokens: currentTokens });
      },

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
        const { foundations, components, project } = get().tokens;
        const { colors, typography, spacing, radius, shadows, icons, motion, zindex, accessibility } = foundations;
        const { brand, semantic, surface, text, borders, backgroundLayers, neutral } = colors;
        const prefix = project.prefix || '--ui-';

        // Automatically load active Google Fonts
        if (typeof document !== 'undefined') {
          loadActiveFoundationFonts(typography);
        }

        const resolvedIconColor =
          icons.colorMode === 'primary'
            ? brand.primary
            : icons.colorMode === 'muted'
            ? text.secondary
            : icons.customColor || '#6366F1';

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

            ${prefix}color-neutral-gray100: ${neutral?.gray100 || '#F3F4F6'};
            ${prefix}color-neutral-gray200: ${neutral?.gray200 || '#E5E7EB'};
            ${prefix}color-neutral-gray500: ${neutral?.gray500 || '#6B7280'};
            ${prefix}color-neutral-gray700: ${neutral?.gray700 || '#374151'};
            ${prefix}color-neutral-gray800: ${neutral?.gray800 || '#1F2937'};
            ${prefix}color-neutral-gray900: ${neutral?.gray900 || '#111827'};

            ${prefix}color-border-subtle: ${borders.subtle};
            ${prefix}color-border-default: ${borders.default};
            ${prefix}color-border-strong: ${borders.strong};
            ${prefix}color-border-focus: ${borders.focus || brand.primary};

            ${prefix}icon-color: ${resolvedIconColor};
            ${prefix}icon-size: ${icons.defaultSize}px;
            ${prefix}icon-stroke: ${icons.strokeWidth};

            --color-primary: ${brand.primary};
            --color-primary-hover: ${brand.primaryHover};
            --color-background: ${surface.background};
            --color-foreground: ${surface.foreground};
            --color-surface: ${surface.surface};
            --color-border: ${surface.border};

            --font-heading: '${typography.fontHeading}', sans-serif;
            --font-body: '${typography.fontBody}', sans-serif;
            --font-mono: '${typography.fontMono}', monospace;
            ${prefix}font-family-heading: '${typography.fontHeading}', sans-serif;
            ${prefix}font-family-body: '${typography.fontBody}', sans-serif;
            ${prefix}font-family-mono: '${typography.fontMono}', monospace;

            /* Semantic Typography Sizing & Metrics Tokens */
            ${prefix}font-size-display: ${typography.styles?.display?.fontSize || 48}px;
            ${prefix}font-size-display-mobile: ${typography.styles?.display?.fontSizeMobile || 36}px;
            ${prefix}font-weight-display: ${typography.styles?.display?.fontWeight || 800};
            ${prefix}line-height-display: ${typography.styles?.display?.lineHeight || 1.1};
            ${prefix}letter-spacing-display: ${typography.styles?.display?.letterSpacing || '-0.03em'};

            ${prefix}font-size-h1: ${typography.styles?.h1?.fontSize || 36}px;
            ${prefix}font-size-h1-mobile: ${typography.styles?.h1?.fontSizeMobile || 28}px;
            ${prefix}font-weight-h1: ${typography.styles?.h1?.fontWeight || 700};
            ${prefix}line-height-h1: ${typography.styles?.h1?.lineHeight || 1.2};
            ${prefix}letter-spacing-h1: ${typography.styles?.h1?.letterSpacing || '-0.02em'};

            ${prefix}font-size-h2: ${typography.styles?.h2?.fontSize || 24}px;
            ${prefix}font-size-h2-mobile: ${typography.styles?.h2?.fontSizeMobile || 20}px;
            ${prefix}font-weight-h2: ${typography.styles?.h2?.fontWeight || 700};
            ${prefix}line-height-h2: ${typography.styles?.h2?.lineHeight || 1.25};
            ${prefix}letter-spacing-h2: ${typography.styles?.h2?.letterSpacing || '-0.01em'};

            ${prefix}font-size-h3: ${typography.styles?.h3?.fontSize || 18}px;
            ${prefix}font-size-h3-mobile: ${typography.styles?.h3?.fontSizeMobile || 16}px;
            ${prefix}font-weight-h3: ${typography.styles?.h3?.fontWeight || 600};
            ${prefix}line-height-h3: ${typography.styles?.h3?.lineHeight || 1.3};

            ${prefix}font-size-h4: ${typography.styles?.h4?.fontSize || 16}px;
            ${prefix}font-size-h4-mobile: ${typography.styles?.h4?.fontSizeMobile || 15}px;
            ${prefix}font-weight-h4: ${typography.styles?.h4?.fontWeight || 600};

            ${prefix}font-size-body: ${typography.styles?.body?.fontSize || 14}px;
            ${prefix}font-size-body-mobile: ${typography.styles?.body?.fontSizeMobile || 14}px;
            ${prefix}font-weight-body: ${typography.styles?.body?.fontWeight || 400};
            ${prefix}line-height-body: ${typography.styles?.body?.lineHeight || 1.5};

            ${prefix}font-size-label: ${typography.styles?.label?.fontSize || 12}px;
            ${prefix}font-weight-label: ${typography.styles?.label?.fontWeight || 600};

            ${prefix}font-size-caption: ${typography.styles?.caption?.fontSize || 12}px;
            ${prefix}font-size-code: ${typography.styles?.code?.fontSize ?? 13}px;

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

            /* 1. Component Padding */
            ${prefix}padding-button-md-x: ${spacing.padding?.buttonMd?.px ?? 16}px;
            ${prefix}padding-button-md-y: ${spacing.padding?.buttonMd?.py ?? 8}px;
            ${prefix}padding-input-x: ${spacing.padding?.input?.px ?? 12}px;
            ${prefix}padding-input-y: ${spacing.padding?.input?.py ?? 8}px;
            ${prefix}padding-card: ${spacing.padding?.card?.p ?? 20}px;
            ${prefix}padding-modal: ${spacing.padding?.modal?.p ?? 24}px;
            ${prefix}padding-badge-x: ${spacing.padding?.badge?.px ?? 8}px;
            ${prefix}padding-badge-y: ${spacing.padding?.badge?.py ?? 2}px;

            /* 2. Micro Gaps */
            --gap-icon-text: ${spacing.microGaps?.iconText ?? spacing.gaps?.iconText ?? 8}px;
            ${prefix}gap-icon-text: ${spacing.microGaps?.iconText ?? spacing.gaps?.iconText ?? 8}px;
            ${prefix}gap-label-input: ${spacing.microGaps?.labelInput ?? 6}px;
            ${prefix}gap-input-error: ${spacing.microGaps?.inputError ?? 4}px;
            ${prefix}gap-checkbox-label: ${spacing.microGaps?.checkboxLabel ?? 8}px;
            ${prefix}gap-avatar-user: ${spacing.microGaps?.avatarUser ?? 12}px;

            /* 3. Flow Gaps */
            --gap-form-fields: ${spacing.flowGaps?.formFields ?? spacing.gaps?.formFields ?? 16}px;
            ${prefix}gap-form-fields: ${spacing.flowGaps?.formFields ?? spacing.gaps?.formFields ?? 16}px;
            ${prefix}gap-button-group: ${spacing.flowGaps?.buttonGroup ?? 12}px;
            ${prefix}gap-card-grid: ${spacing.flowGaps?.cardGrid ?? 24}px;
            ${prefix}gap-list-rows: ${spacing.flowGaps?.listRows ?? 8}px;

            /* 4. Layout Spacing */
            --gap-sections: ${spacing.layout?.sectionGapDesktop ?? spacing.gaps?.sections ?? 64}px;
            ${prefix}gap-sections: ${spacing.layout?.sectionGapDesktop ?? spacing.gaps?.sections ?? 64}px;
            ${prefix}gap-sections-mobile: ${spacing.layout?.sectionGapMobile ?? 48}px;
            ${prefix}gap-sections-desktop: ${spacing.layout?.sectionGapDesktop ?? 80}px;
            ${prefix}padding-container-mobile: ${spacing.layout?.containerPaddingMobile ?? 16}px;
            ${prefix}padding-container-desktop: ${spacing.layout?.containerPaddingDesktop ?? 32}px;

            /* 5. Compound Gaps */
            ${prefix}gap-card-compound: ${spacing.compound?.cardHeaderBody ?? 16}px;
            ${prefix}gap-modal-compound: ${spacing.compound?.modalHeaderBody ?? 20}px;

            --radius-none: 0px;
            --radius-sm: ${radius.sm}px;
            --radius-md: ${radius.md}px;
            --radius-lg: ${radius.lg}px;
            --radius-xl: ${radius.xl}px;
            --radius-full: ${radius.full}px;
            ${prefix}radius-none: 0px;
            ${prefix}radius-sm: ${radius.sm}px;
            ${prefix}radius-md: ${radius.md}px;
            ${prefix}radius-lg: ${radius.lg}px;
            ${prefix}radius-xl: ${radius.xl}px;
            ${prefix}radius-full: ${radius.full}px;

            /* Component Group Radius & Shadow Bindings */
            ${prefix}radius-input: ${radius.md ?? 8}px;
            ${prefix}shadow-input: ${shadows.input ?? shadows.sm?.css ?? 'none'};
            ${prefix}radius-card: ${radius.lg ?? 16}px;
            ${prefix}shadow-card: ${shadows.card ?? shadows.md?.css ?? '0 4px 6px -1px rgba(0, 0, 0, 0.1)'};
            ${prefix}radius-infobox: ${radius.md ?? 12}px;
            ${prefix}shadow-infobox: ${shadows.infobox ?? 'none'};
            ${prefix}radius-modal: ${radius.xl ?? 20}px;
            ${prefix}shadow-modal: ${shadows.modal ?? shadows.xl?.css ?? '0 20px 25px -5px rgba(0, 0, 0, 0.15)'};

            --shadow-card: ${shadows.card ?? shadows.md?.css ?? '0 4px 6px -1px rgba(0, 0, 0, 0.1)'};
            --shadow-modal: ${shadows.modal ?? shadows.xl?.css ?? '0 20px 25px -5px rgba(0, 0, 0, 0.15)'};
            --shadow-dropdown: ${shadows.dropdown};
            ${prefix}shadow-sm: ${shadows.sm?.css ?? '0 1px 2px 0 rgba(0, 0, 0, 0.05)'};
            ${prefix}shadow-md: ${shadows.md?.css ?? '0 4px 6px -1px rgba(0, 0, 0, 0.1)'};
            ${prefix}shadow-lg: ${shadows.lg?.css ?? '0 10px 15px -3px rgba(0, 0, 0, 0.1)'};
            ${prefix}shadow-xl: ${shadows.xl?.css ?? '0 20px 25px -5px rgba(0, 0, 0, 0.15)'};

            /* 7-Tier Z-Index Hierarchy */
            ${prefix}zindex-base: ${zindex.layers?.base ?? 0};
            ${prefix}zindex-dropdown: ${zindex.layers?.dropdown ?? 10};
            ${prefix}zindex-sticky: ${zindex.layers?.sticky ?? 20};
            ${prefix}zindex-drawer: ${zindex.layers?.drawer ?? 30};
            ${prefix}zindex-modal: ${zindex.layers?.modal ?? 40};
            ${prefix}zindex-toast: ${zindex.layers?.toast ?? 50};
            ${prefix}zindex-tooltip: ${zindex.layers?.tooltip ?? 60};

            --motion-duration-fast: ${motion.durations.fast}ms;
            --motion-duration-normal: ${motion.durations.normal}ms;
            --motion-duration-slow: ${motion.durations.slow}ms;
            ${prefix}motion-duration-fast: ${motion.durations.fast}ms;
            ${prefix}motion-duration-normal: ${motion.durations.normal}ms;
            ${prefix}motion-duration-slow: ${motion.durations.slow}ms;

            --focus-ring-width: ${accessibility.focusRingWidth}px;
            --focus-ring-offset: ${accessibility.focusRingOffset}px;
            --focus-ring-color: ${accessibility.focusRingColor};
            ${prefix}focus-ring-width: ${accessibility.focusRingWidth}px;
            ${prefix}focus-ring-offset: ${accessibility.focusRingOffset}px;
            ${prefix}focus-ring-color: ${accessibility.focusRingColor};

            --control-height-sm: ${spacing.componentHeights.sm}px;
            --control-height-md: ${spacing.componentHeights.md}px;
            --control-height-lg: ${spacing.componentHeights.lg}px;

            /* Component Blueprints */
            ${prefix}header-height: ${components.navigation?.header?.height ?? 56}px;
            ${prefix}sidebar-width: ${components.navigation?.sidebar?.widthExpanded ?? 250}px;
            ${prefix}input-height: ${components.forms?.input?.heightMd ?? 40}px;
            ${prefix}input-radius: ${components.forms?.input?.radius ?? radius.md ?? 8}px;
            ${prefix}btn-height-sm: ${components.actions?.button?.heightSm ?? 32}px;
            ${prefix}btn-height-md: ${components.actions?.button?.heightMd ?? 40}px;
            ${prefix}btn-height-lg: ${components.actions?.button?.heightLg ?? 48}px;
            ${prefix}modal-radius: ${components.overlays?.modal?.radius ?? radius.xl ?? 16}px;
            ${prefix}modal-max-width: ${components.overlays?.modal?.maxWidthMd ?? 540}px;
            ${prefix}table-row-height: ${components.dataDisplay?.table?.rowHeightComfortable ?? 52}px;
            ${prefix}padding-table-cell-x: ${spacing.padding?.tableCell?.px ?? 12}px;
            ${prefix}padding-table-cell-y: ${spacing.padding?.tableCell?.py ?? 8}px;
            ${prefix}grid-gap: ${components.layout?.grid?.gap ?? 24}px;
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
    }),
    {
      name: 'raku_design_tokens',
      partialize: (state) => ({
        tokens: state.tokens,
        activeColorThemeId: state.activeColorThemeId,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.injectCssTokens();
        }
      },
    }
  )
);
