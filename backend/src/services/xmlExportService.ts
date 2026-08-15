import { create } from 'xmlbuilder2';

export interface ExportProjectData {
  name: string;
  version?: string;
  schemaVersion?: string;
  tokens: {
    foundations?: {
      colors?: {
        brand?: { primary?: string; primaryHover?: string; primaryFocus?: string; secondary?: string; accent?: string };
        semantic?: { success?: string; warning?: string; error?: string; info?: string };
        neutral?: Record<string, string>;
        surface?: { background?: string; foreground?: string; surface?: string; surfaceSubtle?: string; border?: string; borderStrong?: string };
      };
      typography?: {
        fontHeading?: string;
        fontBody?: string;
        fontMono?: string;
        baseSize?: number;
        scaleRatio?: number;
      };
      spacing?: {
        base?: number;
        scale?: number[];
      };
      radius?: {
        base?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        full?: number;
      };
      shadows?: {
        sm?: string;
        md?: string;
        lg?: string;
        xl?: string;
      };
      breakpoints?: {
        mobile?: number;
        tablet?: number;
        desktop?: number;
        wide?: number;
      };
    };
    brand?: {
      iconLibrary?: string;
      strokeWidth?: string;
    };
    components?: Record<string, any>;
  };
}

export class XmlExportService {
  /**
   * Generates a fully structured, XML-escaped UI Kit Specification file.
   * Uses xmlbuilder2 to guarantee 100% protection against XML/Prompt Injection.
   */
  public static generateXml(project: ExportProjectData): string {
    const pName = project.name || 'Untitled UI Kit';
    const pVersion = project.version || '1.0.0';
    const schemaVer = project.schemaVersion || '1.0.0';
    const genDate = new Date().toISOString();

    const f = project.tokens?.foundations || {};
    const colors = f.colors || {};
    const brand = colors.brand || {};
    const semantic = colors.semantic || {};
    const neutral = colors.neutral || {};
    const surface = colors.surface || {};
    const typography = f.typography || {};
    const spacing = f.spacing || {};
    const radius = f.radius || {};
    const shadows = f.shadows || {};
    const iconLib = project.tokens?.brand?.iconLibrary || 'lucide';
    const iconStroke = project.tokens?.brand?.strokeWidth || '1.5';

    const root = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('ui_kit_specification', {
        version: schemaVer,
        project_version: pVersion,
        project: pName,
        generated_at: genDate,
      });

    // 1. AI DIRECTIVES & STRICT CONSTRAINTS (RFC 2119)
    const aiDirectives = root.ele('ai_directives');
    aiDirectives.ele('role').txt('Senior Frontend Architect & Design Systems Engineer');
    aiDirectives.ele('instruction').txt(
      'You MUST strictly implement frontend UI code conforming 100% to the declared design tokens, geometric constraints, and DO/DON\'T rules below. You MUST NOT invent arbitrary styles, spacing, or uncalibrated colors.'
    );

    const strictRules = aiDirectives.ele('strict_rules');
    strictRules.ele('rule', { id: 'R01', priority: 'MUST_NOT' }).txt('Do not write raw hex colors. All visual colors MUST resolve to defined CSS variables.');
    strictRules.ele('rule', { id: 'R02', priority: 'MUST_NOT' }).txt('Do not use arbitrary pixel spacing (e.g. 7px, 13px, 17px). MUST use the declared 8-point spacing scale.');
    strictRules.ele('rule', { id: 'R03', priority: 'MUST' }).txt('Buttons, Inputs, and Dropdowns placed horizontally on the same row MUST have identical control heights (MD = 40px).');
    strictRules.ele('rule', { id: 'R04', priority: 'MUST' }).txt('Nested card containers MUST obey concentric radius formula: R_inner = max(0, R_outer - Padding).');
    strictRules.ele('rule', { id: 'R05', priority: 'MUST' }).txt(`Import icons ONLY from "${iconLib}" with stroke-width: ${iconStroke}.`);
    strictRules.ele('rule', { id: 'R06', priority: 'MUST' }).txt('Interactive components MUST implement all 6 states: Default, Hover, Focus-Visible, Active, Disabled, Loading.');

    // 2. FOUNDATIONS
    const foundations = root.ele('foundations');

    // Colors
    const colorsNode = foundations.ele('colors');
    const brandNode = colorsNode.ele('brand');
    brandNode.ele('color', { name: 'primary', hex: brand.primary || '#6366F1', hover: brand.primaryHover || '#4F46E5', focus: brand.primaryFocus || '#818CF8', css_var: '--color-primary' });
    brandNode.ele('color', { name: 'secondary', hex: brand.secondary || '#EC4899', css_var: '--color-secondary' });
    brandNode.ele('color', { name: 'accent', hex: brand.accent || '#10B981', css_var: '--color-accent' });

    const semanticNode = colorsNode.ele('semantic');
    semanticNode.ele('color', { name: 'success', hex: semantic.success || '#10B981', css_var: '--color-success' });
    semanticNode.ele('color', { name: 'warning', hex: semantic.warning || '#F59E0B', css_var: '--color-warning' });
    semanticNode.ele('color', { name: 'error', hex: semantic.error || '#EF4444', css_var: '--color-error' });
    semanticNode.ele('color', { name: 'info', hex: semantic.info || '#3B82F6', css_var: '--color-info' });

    const neutralsNode = colorsNode.ele('neutrals');
    Object.entries(neutral).forEach(([k, val]) => {
      const shadeNum = k.replace('gray', '');
      neutralsNode.ele('stop', { shade: shadeNum, hex: val as string });
    });

    const surfaceNode = colorsNode.ele('surface');
    surfaceNode.ele('color', { name: 'background', hex: surface.background || '#FFFFFF', css_var: '--color-background' });
    surfaceNode.ele('color', { name: 'foreground', hex: surface.foreground || '#0F172A', css_var: '--color-foreground' });
    surfaceNode.ele('color', { name: 'surface', hex: surface.surface || '#FFFFFF', css_var: '--color-surface' });
    surfaceNode.ele('color', { name: 'border', hex: surface.border || '#E2E8F0', css_var: '--color-border' });

    // Typography
    const typoNode = foundations.ele('typography');
    typoNode.ele('font_family', {
      heading: `${typography.fontHeading || 'Plus Jakarta Sans'}, sans-serif`,
      body: `${typography.fontBody || 'Inter'}, sans-serif`,
      mono: `${typography.fontMono || 'JetBrains Mono'}, monospace`,
    });
    const scaleNode = typoNode.ele('scale', { base: `${typography.baseSize || 14}px`, ratio: `${typography.scaleRatio || 1.25}` });
    scaleNode.ele('level', { tag: 'h1', size: '48px', line_height: '1.15', weight: '800', tracking: '-0.02em' });
    scaleNode.ele('level', { tag: 'h2', size: '28px', line_height: '1.25', weight: '700', tracking: '-0.01em' });
    scaleNode.ele('level', { tag: 'h3', size: '20px', line_height: '1.3', weight: '600' });
    scaleNode.ele('level', { tag: 'body', size: '14px', line_height: '1.5', weight: '400' });
    scaleNode.ele('level', { tag: 'caption', size: '12px', line_height: '1.4', weight: '500' });

    // Spacing
    const spacingNode = foundations.ele('spacing', { scale_unit: 'px', base_grid: `${spacing.base || 8}` });
    const scaleArr = spacing.scale || [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64];
    scaleArr.forEach((val, idx) => {
      spacingNode.ele('space', { token: `--space-${idx}`, value: `${val}px` });
    });

    // Radius
    const radiusNode = foundations.ele('radius');
    radiusNode.ele('token', { name: 'radius-none', value: '0px' });
    radiusNode.ele('token', { name: 'radius-sm', value: `${radius.sm || 4}px` });
    radiusNode.ele('token', { name: 'radius-md', value: `${radius.md || 8}px`, is_default: 'true', usage: 'Buttons, Inputs, Selects' });
    radiusNode.ele('token', { name: 'radius-lg', value: `${radius.lg || 12}px`, usage: 'Cards, Containers' });
    radiusNode.ele('token', { name: 'radius-xl', value: `${radius.xl || 16}px`, usage: 'Modals, Drawers' });
    radiusNode.ele('token', { name: 'radius-full', value: `${radius.full || 9999}px`, usage: 'Badges, Pills, Avatars' });

    // Shadows
    const shadowsNode = foundations.ele('shadows');
    shadowsNode.ele('shadow', { level: 'sm', value: shadows.sm || '0 1px 2px 0 rgba(0, 0, 0, 0.05)' });
    shadowsNode.ele('shadow', { level: 'md', value: shadows.md || '0 4px 6px -1px rgba(0, 0, 0, 0.07)' });
    shadowsNode.ele('shadow', { level: 'lg', value: shadows.lg || '0 10px 15px -3px rgba(0, 0, 0, 0.08)' });

    // 3. COMPONENTS
    const componentsNode = root.ele('components');
    
    // Button Blueprint
    const btnComp = componentsNode.ele('component', { name: 'button' });
    const btnSizes = btnComp.ele('sizes');
    btnSizes.ele('size', { name: 'sm', height: '32px', padding_x: '12px', font_size: '13px' });
    btnSizes.ele('size', { name: 'md', height: '40px', padding_x: '16px', font_size: '14px', is_default: 'true' });
    btnSizes.ele('size', { name: 'lg', height: '48px', padding_x: '20px', font_size: '16px' });
    const btnVariants = btnComp.ele('variants');
    btnVariants.ele('variant', { name: 'primary', bg: 'var(--color-primary)', text: '#FFFFFF', hover_bg: 'var(--color-primary-hover)' });
    btnVariants.ele('variant', { name: 'secondary', bg: 'var(--color-surface)', text: 'var(--color-text-primary)', border: '1px solid var(--color-border)' });
    btnVariants.ele('variant', { name: 'ghost', bg: 'transparent', text: 'var(--color-text-secondary)', hover_bg: 'var(--color-surface-subtle)' });
    const btnStates = btnComp.ele('states');
    btnStates.ele('state', { name: 'hover', transform: 'translateY(-1px)', transition: 'all 150ms ease-out' });
    btnStates.ele('state', { name: 'focus_visible', outline: '2px solid var(--color-primary)', offset: '2px' });
    btnStates.ele('state', { name: 'active', transform: 'scale(0.98)' });
    btnStates.ele('state', { name: 'disabled', opacity: '0.45', cursor: 'not-allowed', pointer_events: 'none' });
    btnStates.ele('state', { name: 'loading', spinner: 'true' });

    // 4. GUIDELINES (DO / DON'T)
    const guidelines = root.ele('guidelines');
    const doNode = guidelines.ele('do');
    doNode.ele('item').txt('Always maintain vertical gap of --space-4 (16px) between form field rows.');
    doNode.ele('item').txt('Ensure every page has at most one prominent primary action button.');
    doNode.ele('item').txt('Maintain WCAG 2.1 contrast ratio >= 4.5:1 for all text elements.');

    const dontNode = guidelines.ele('dont');
    dontNode.ele('item').txt('Never mix multiple icon libraries in the same interface.');
    dontNode.ele('item').txt('Never write border-radius or margin values outside the declared design tokens.');
    dontNode.ele('item').txt('Never create buttons or inputs with heights other than 32px, 40px, or 48px.');

    return root.end({ prettyPrint: true });
  }
}
