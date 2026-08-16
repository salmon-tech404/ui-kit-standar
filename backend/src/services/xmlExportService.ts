import { create } from 'xmlbuilder2';

export interface ExportXmlOptions {
  projectName: string;
  tokens: any;
  version?: string;
}

export class XmlExportService {
  /**
   * Generates a deterministic, machine-readable Master XML Specification
   * with complete RFC 2119 Directives, Foundations, Components, and Patterns.
   * Auto-escapes all user-provided data via xmlbuilder2 to prevent XML/Prompt injection.
   */
  public static generateMasterXml(options: ExportXmlOptions): string {
    const { projectName, tokens, version = '1.0.0' } = options;

    const f = tokens.foundations || {};
    const b = f.colors?.brand || { primary: '#6366F1', secondary: '#EC4899', accent: '#10B981' };
    const s = f.colors?.semantic || { success: '#10B981', warning: '#F59E0B', error: '#EF4444', info: '#3B82F6' };
    const surf = f.colors?.surface || { background: '#FFFFFF', foreground: '#0F172A', surface: '#FFFFFF', border: '#E2E8F0' };
    const typo = f.typography || { fontHeading: 'Plus Jakarta Sans', fontBody: 'Inter', fontMono: 'JetBrains Mono', scaleRatio: 1.25 };
    const sp = f.spacing || { scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64], componentHeights: { sm: 32, md: 40, lg: 48 } };
    const rad = f.radius || { sm: 4, md: 8, lg: 12, xl: 16, full: 9999 };
    const motion = f.motion || { durations: { fast: 150, normal: 200, slow: 300 }, easings: { default: 'cubic-bezier(0.4, 0, 0.2, 1)' } };
    const zindex = f.zindex || { layers: { base: 0, dropdown: 1000, sticky: 1100, modal: 1400, toast: 1600, tooltip: 1700 } };
    const a11y = f.accessibility || { focusRingWidth: 2, focusRingOffset: 2, focusRingColor: '#6366F1', minContrastRatioAA: 4.5 };
    const prefix = tokens.project?.prefix || '--ui-';

    const root = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('ui_kit_specification', {
        version,
        project: projectName,
        prefix,
        generated_at: new Date().toISOString(),
      });

    // 1. AI DIRECTIVES (RFC 2119 Strict Rules)
    const directives = root.ele('ai_directives');
    directives.ele('role').txt('Senior Frontend Architect & Design Systems Engineer');
    const rules = directives.ele('strict_rules');
    rules.ele('rule', { id: 'R01', priority: 'MUST_NOT' }).txt('Do not write raw hex colors. All colors MUST resolve to defined CSS variables.');
    rules.ele('rule', { id: 'R02', priority: 'MUST_NOT' }).txt('Do not use arbitrary spacing. MUST use the 8-point spacing scale (0, 4, 8, 12, 16, 24, 32, 40, 48, 64px).');
    rules.ele('rule', { id: 'R03', priority: 'MUST' }).txt('Buttons, Inputs, and Dropdowns on the same row MUST have identical control heights (MD = 40px).');
    rules.ele('rule', { id: 'R04', priority: 'MUST' }).txt('Nested containers MUST obey concentric radius formula: R_inner = max(0, R_outer - Padding).');
    rules.ele('rule', { id: 'R05', priority: 'MUST' }).txt('Import icons ONLY from "lucide-react" with stroke-width: 1.5.');
    rules.ele('rule', { id: 'R06', priority: 'MUST' }).txt('Interactive elements MUST support 6 states: Default, Hover, Focus-Visible, Active, Disabled, and Loading.');
    rules.ele('rule', { id: 'R07', priority: 'MUST' }).txt('All motion transitions MUST respect @media (prefers-reduced-motion: reduce).');

    // 2. FOUNDATIONS
    const foundNode = root.ele('foundations');

    // 2.1 Colors
    const colorsNode = foundNode.ele('colors');
    const brandNode = colorsNode.ele('brand');
    brandNode.ele('color', { name: 'primary', hex: b.primary, hover: b.primaryHover || b.primary, css_var: `${prefix}color-primary` });
    brandNode.ele('color', { name: 'secondary', hex: b.secondary, css_var: `${prefix}color-secondary` });
    brandNode.ele('color', { name: 'accent', hex: b.accent, css_var: `${prefix}color-accent` });

    const semNode = colorsNode.ele('semantic');
    semNode.ele('color', { name: 'success', hex: s.success, css_var: `${prefix}color-success` });
    semNode.ele('color', { name: 'warning', hex: s.warning, css_var: `${prefix}color-warning` });
    semNode.ele('color', { name: 'error', hex: s.error, css_var: `${prefix}color-error` });
    semNode.ele('color', { name: 'info', hex: s.info, css_var: `${prefix}color-info` });

    const surfNode = colorsNode.ele('surface');
    surfNode.ele('color', { name: 'background', hex: surf.background, css_var: `${prefix}color-background` });
    surfNode.ele('color', { name: 'foreground', hex: surf.foreground, css_var: `${prefix}color-foreground` });
    surfNode.ele('color', { name: 'surface', hex: surf.surface, css_var: `${prefix}color-surface` });
    surfNode.ele('color', { name: 'border', hex: surf.border, css_var: `${prefix}color-border` });

    // 2.2 Typography
    const typoNode = foundNode.ele('typography', { heading_font: typo.fontHeading, body_font: typo.fontBody, mono_font: typo.fontMono, scale_ratio: String(typo.scaleRatio) });
    if (typo.styles) {
      for (const [sKey, style] of Object.entries(typo.styles as Record<string, any>)) {
        typoNode.ele('style', { level: sKey, size: `${style.fontSize}px`, weight: String(style.fontWeight), line_height: String(style.lineHeight), tracking: style.letterSpacing });
      }
    }

    // 2.3 Spacing & Sizing
    const spaceNode = foundNode.ele('spacing_and_sizing', { base_grid: '8px' });
    const scaleNode = spaceNode.ele('scale');
    sp.scale?.forEach((step: number) => {
      scaleNode.ele('step', { value: `${step}px`, rem: `${step / 16}rem` });
    });
    spaceNode.ele('component_heights', { sm: `${sp.componentHeights?.sm || 32}px`, md: `${sp.componentHeights?.md || 40}px`, lg: `${sp.componentHeights?.lg || 48}px` });

    // 2.4 Radius & Shadows
    const radNode = foundNode.ele('radius_and_shadows', { concentric_rule: 'R_inner = max(0, R_outer - Padding)' });
    radNode.ele('radius', { sm: `${rad.sm}px`, md: `${rad.md}px`, lg: `${rad.lg}px`, xl: `${rad.xl}px`, full: `${rad.full}px` });
    radNode.ele('shadows', { card: f.shadows?.card || 'sm', modal: f.shadows?.modal || 'xl', dropdown: f.shadows?.dropdown || 'md' });

    // 2.5 Icons
    foundNode.ele('icons', { library: 'lucide-react', stroke_width: '1.5', default_size: '20px' });

    // 2.6 Breakpoints
    const bpNode = foundNode.ele('breakpoints', { standard: 'Tailwind CSS' });
    bpNode.ele('breakpoint', { key: 'sm', min_width: '640px', behavior: 'Mobile drawer, 1 column' });
    bpNode.ele('breakpoint', { key: 'md', min_width: '768px', behavior: 'Tablet, collapsed sidebar, 2 columns' });
    bpNode.ele('breakpoint', { key: 'lg', min_width: '1024px', behavior: 'Laptop, persistent sidebar, 3 columns' });
    bpNode.ele('breakpoint', { key: 'xl', min_width: '1280px', behavior: 'Desktop standard, 4 columns' });
    bpNode.ele('breakpoint', { key: '2xl', min_width: '1536px', behavior: 'Large screen max-width container' });

    // 2.7 Motion
    const motNode = foundNode.ele('motion', { default_easing: motion.easings?.default || 'cubic-bezier(0.4, 0, 0.2, 1)' });
    motNode.ele('durations', { fast: `${motion.durations?.fast || 150}ms`, normal: `${motion.durations?.normal || 200}ms`, slow: `${motion.durations?.slow || 300}ms` });

    // 2.8 Z-Index
    const zNode = foundNode.ele('z_index_layers');
    if (zindex.layers) {
      for (const [lKey, val] of Object.entries(zindex.layers as Record<string, any>)) {
        zNode.ele('layer', { name: lKey, value: String(val) });
      }
    }

    // 2.9 Accessibility
    foundNode.ele('accessibility', {
      focus_ring: `${a11y.focusRingWidth || 2}px solid ${a11y.focusRingColor || '#6366F1'}`,
      focus_offset: `${a11y.focusRingOffset || 2}px`,
      min_contrast_aa: '4.5:1',
      min_contrast_aaa: '7.0:1',
    });

    // 3. COMPONENTS (7 Groups with 6-State Matrices)
    const compNode = root.ele('components');
    const compGroups = ['actions', 'forms', 'feedback', 'overlays', 'navigation', 'data_display', 'layout'];
    compGroups.forEach((cg) => {
      const gNode = compNode.ele('group', { name: cg });
      gNode.ele('state_matrix', { states: 'default, hover, focus-visible, active, disabled, loading' });
    });

    // 4. PATTERNS
    const patNode = root.ele('patterns');
    patNode.ele('page_templates', { items: 'Dashboard Analytics, User Settings, Auth Flow, SaaS Pricing' });
    patNode.ele('sections', { items: 'Hero Header, Bento Feature Grid, Testimonials, FAQ Accordion' });

    // 5. GUIDELINES (DO & DONT)
    const guideNode = root.ele('guidelines');
    const doNode = guideNode.ele('do');
    doNode.ele('item').txt('Use CSS variable tokens for all spacing, colors, and radii.');
    doNode.ele('item').txt('Ensure all buttons have visible focus-ring outlines for keyboard navigation.');
    doNode.ele('item').txt('Maintain optical alignment with uniform 40px component heights.');

    const dontNode = guideNode.ele('dont');
    dontNode.ele('item').txt('Do not use arbitrary margin/padding values outside the 8pt scale.');
    dontNode.ele('item').txt('Do not write inline hex colors.');
    dontNode.ele('item').txt('Do not use nested cards with mismatched inner border-radii.');

    return root.end({ prettyPrint: true });
  }
}
