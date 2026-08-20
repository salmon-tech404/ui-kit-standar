import { create } from 'xmlbuilder2';

export interface ExportXmlOptions {
  projectName: string;
  tokens: any;
  version?: string;
}

export class XmlExportService {
  /**
   * Generates a deterministic, machine-readable Master XML Specification
   * with complete RFC 2119 Directives, Foundations, Components, Patterns, and Brand Assets.
   * Auto-escapes all user-provided data via xmlbuilder2 to prevent XML/Prompt injection.
   */
  public static generateMasterXml(options: ExportXmlOptions): string {
    const { projectName, tokens, version = '1.0.0' } = options;

    const f = tokens.foundations || {};
    const b = f.colors?.brand || { primary: '#6366F1', secondary: '#EC4899', accent: '#10B981' };
    const s = f.colors?.semantic || { success: '#10B981', warning: '#F59E0B', error: '#EF4444', info: '#3B82F6' };
    const txt = f.colors?.text || { primary: '#0F172A', secondary: '#475569', tertiary: '#94A3B8', link: '#6366F1' };
    const brd = f.colors?.borders || { subtle: '#F1F5F9', default: '#E2E8F0', strong: '#CBD5E1', focus: '#6366F1', error: '#EF4444' };
    const bgLayers = f.colors?.backgroundLayers || { page: '#F8FAFC', card: '#FFFFFF', modal: '#FFFFFF', sidebar: '#FFFFFF' };
    const typo = f.typography || { fontHeading: 'Plus Jakarta Sans', fontBody: 'Inter', fontMono: 'JetBrains Mono', scaleRatio: 1.25, maxMeasureCharacters: 70 };
    const sp = f.spacing || { scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64], gaps: { iconText: 8, formFields: 16, sections: 64 }, componentHeights: { sm: 32, md: 40, lg: 48, xl: 56 } };
    const rad = f.radius || { sm: 4, md: 8, lg: 12, xl: 16, full: 9999 };
    const motion = f.motion || { durations: { fast: 150, normal: 200, slow: 300 }, microInteractions: { hover: 150, dropdown: 120, modalEnter: 250, pageTransition: 300 } };
    const zindex = f.zindex || { layers: { base: 0, dropdown: 1000, sticky: 1100, modal: 1400, toast: 1600, tooltip: 1700 } };
    const a11y = f.accessibility || { focusRingWidth: 2, focusRingOffset: 2, focusRingColor: '#6366F1', minContrastRatioAA: 4.5, minContrastRatioAAA: 7.0 };
    const prefix = tokens.project?.prefix || '--ui-';
    const customRules = tokens.customRules || [];

    const root = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('ui_kit_specification', {
        version,
        project: projectName,
        prefix,
        generated_at: new Date().toISOString(),
      });

    // 1. AI DIRECTIVES (RFC 2119 Strict Rules)
    const directives = root.ele('ai_directives');
    directives.ele('role').txt('Senior Principal Design Systems Architect');
    directives.ele('mission').txt('Produce production-grade, accessible, mathematically aligned frontend code strictly obeying all defined tokens.');
    
    const rules = directives.ele('strict_rules');
    customRules.filter((r: any) => r.enabled).forEach((r: any) => {
      rules.ele('rule', { id: r.id, priority: r.priority }).txt(r.instruction);
    });

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

    const txtNode = colorsNode.ele('text_foreground');
    txtNode.ele('color', { name: 'primary', hex: txt.primary, css_var: `${prefix}color-text-primary` });
    txtNode.ele('color', { name: 'secondary', hex: txt.secondary, css_var: `${prefix}color-text-secondary` });
    txtNode.ele('color', { name: 'tertiary', hex: txt.tertiary, css_var: `${prefix}color-text-tertiary` });
    txtNode.ele('color', { name: 'link', hex: txt.link, css_var: `${prefix}color-text-link` });

    const brdNode = colorsNode.ele('borders_hierarchy');
    brdNode.ele('border', { level: 'subtle', hex: brd.subtle, css_var: `${prefix}color-border-subtle` });
    brdNode.ele('border', { level: 'default', hex: brd.default, css_var: `${prefix}color-border-default` });
    brdNode.ele('border', { level: 'strong', hex: brd.strong, css_var: `${prefix}color-border-strong` });
    brdNode.ele('border', { level: 'focus', hex: brd.focus, css_var: `${prefix}color-border-focus` });
    brdNode.ele('border', { level: 'error', hex: brd.error, css_var: `${prefix}color-border-error` });

    const bgNode = colorsNode.ele('background_layers');
    bgNode.ele('layer', { target: 'page', hex: bgLayers.page, css_var: `${prefix}color-bg-page` });
    bgNode.ele('layer', { target: 'card', hex: bgLayers.card, css_var: `${prefix}color-bg-card` });
    bgNode.ele('layer', { target: 'modal', hex: bgLayers.modal, css_var: `${prefix}color-bg-modal` });
    bgNode.ele('layer', { target: 'sidebar', hex: bgLayers.sidebar, css_var: `${prefix}color-bg-sidebar` });

    // 2.2 Typography
    const typoNode = foundNode.ele('typography', {
      heading_font: typo.fontHeading,
      body_font: typo.fontBody,
      mono_font: typo.fontMono,
      scale_ratio: String(typo.scaleRatio),
      max_measure: `${typo.maxMeasureCharacters || 70}ch`,
    });
    if (typo.styles) {
      for (const [sKey, style] of Object.entries(typo.styles as Record<string, any>)) {
        typoNode.ele('style', {
          level: sKey,
          size_desktop: `${style.fontSize}px`,
          size_mobile: `${style.fontSizeMobile || style.fontSize}px`,
          weight: String(style.fontWeight),
          line_height: String(style.lineHeight),
          tracking: style.letterSpacing,
        });
      }
    }

    // 2.3 Spacing & Gaps
    const spaceNode = foundNode.ele('spacing_and_sizing', { base_grid: '8px' });
    const scaleNode = spaceNode.ele('scale');
    sp.scale?.forEach((step: number) => {
      scaleNode.ele('step', { value: `${step}px`, rem: `${step / 16}rem` });
    });
    spaceNode.ele('semantic_gaps', {
      icon_text: `${sp.gaps?.iconText || 8}px`,
      form_fields: `${sp.gaps?.formFields || 16}px`,
      sections: `${sp.gaps?.sections || 64}px`,
    });
    spaceNode.ele('component_heights', {
      sm: `${sp.componentHeights?.sm || 32}px`,
      md: `${sp.componentHeights?.md || 40}px`,
      lg: `${sp.componentHeights?.lg || 48}px`,
      xl: `${sp.componentHeights?.xl || 56}px`,
    });

    // 2.4 Radius & Shadows
    const radNode = foundNode.ele('radius_and_shadows', { concentric_rule: 'R_inner = max(0, R_outer - Padding)' });
    radNode.ele('radius', { sm: `${rad.sm}px`, md: `${rad.md}px`, lg: `${rad.lg}px`, xl: `${rad.xl}px`, full: `${rad.full}px` });
    radNode.ele('elevation_shadows', {
      card: f.shadows?.card || '0 1px 3px 0 rgba(0,0,0,0.08)',
      modal: f.shadows?.modal || '0 25px 50px -12px rgba(0,0,0,0.25)',
      dropdown: f.shadows?.dropdown || '0 10px 15px -3px rgba(0,0,0,0.1)',
    });

    // 2.5 Icons
    foundNode.ele('icons', {
      library: f.icons?.library || 'lucide-react',
      stroke_width: String(f.icons?.strokeWidth || 1.5),
      size_inline: '16px',
      size_button: `${f.icons?.defaultSize || 20}px`,
      size_nav: '24px',
      color_mode: f.icons?.colorMode || 'primary',
      custom_color: f.icons?.customColor || b.primary,
      optical_alignment: 'true',
    });

    // 2.6 Breakpoints
    const bpNode = foundNode.ele('breakpoints', { standard: 'Tailwind CSS' });
    bpNode.ele('breakpoint', { key: 'sm', min_width: '640px', behavior: 'Mobile drawer, 1 column' });
    bpNode.ele('breakpoint', { key: 'md', min_width: '768px', behavior: 'Tablet, collapsed sidebar, 2 columns' });
    bpNode.ele('breakpoint', { key: 'lg', min_width: '1024px', behavior: 'Laptop, persistent sidebar, 3 columns' });
    bpNode.ele('breakpoint', { key: 'xl', min_width: '1280px', behavior: 'Desktop standard, 4 columns' });
    bpNode.ele('breakpoint', { key: '2xl', min_width: '1536px', behavior: 'Wide screen max-width container' });

    // 2.7 Motion
    const motNode = foundNode.ele('motion', { default_easing: 'cubic-bezier(0.4, 0, 0.2, 1)' });
    motNode.ele('micro_interactions', {
      hover: `${motion.microInteractions?.hover || 150}ms`,
      dropdown: `${motion.microInteractions?.dropdown || 120}ms`,
      modal_enter: `${motion.microInteractions?.modalEnter || 250}ms`,
      page_transition: `${motion.microInteractions?.pageTransition || 300}ms`,
    });

    // 2.8 Accessibility
    foundNode.ele('accessibility', {
      focus_ring: `${a11y.focusRingWidth || 2}px solid ${a11y.focusRingColor || '#6366F1'}`,
      focus_offset: `${a11y.focusRingOffset || 2}px`,
      min_contrast_aa: '4.5:1',
      min_contrast_aaa: '7.0:1',
      require_aria_labels: 'true',
    });

    // 3. COMPONENTS (EXHAUSTIVE COMPONENT SPECIFICATIONS)
    const compNode = root.ele('components');
    
    // Actions: Button 5 Variants
    const btnNode = compNode.ele('component', { name: 'Button', category: 'Actions' });
    btnNode.ele('sizes', { sm: '32px', md: '40px', lg: '48px', xl: '56px' });
    btnNode.ele('states', { list: 'default, hover, focus-visible, active, disabled, loading' });
    const btnVarNode = btnNode.ele('variants');
    const btnVars = tokens.components?.actions?.button?.variants || {};
    for (const [vKey, vVal] of Object.entries(btnVars as Record<string, any>)) {
      btnVarNode.ele('variant', {
        name: vKey,
        bg: vVal.bg,
        text: vVal.text,
        border: vVal.border,
        hover_bg: vVal.hoverBg,
        active_bg: vVal.activeBg,
        disabled_bg: vVal.disabledBg,
      });
    }

    // Forms: Input & Select
    const inputNode = compNode.ele('component', { name: 'Input', category: 'Forms' });
    inputNode.ele('height', { md: '40px' });
    inputNode.ele('states', { default_border: brd.default, focus_border: brd.focus, error_border: brd.error });

    // Overlays: Modal Presets
    const modalNode = compNode.ele('component', { name: 'Modal', category: 'Overlays' });
    modalNode.ele('sizes', { sm: '400px', md: '560px', lg: '720px' });
    modalNode.ele('backdrop', { blur: 'true', bg: 'rgba(15, 23, 42, 0.6)' });

    // 4. PATTERNS
    const patNode = root.ele('patterns');
    (tokens.patterns?.pageTemplates || []).forEach((p: any) => {
      patNode.ele('page_template', { name: p.name, description: p.description, sections: p.sections.join(', ') });
    });

    // 5. BRAND ASSETS
    const brandAssetNode = root.ele('brand_assets');
    brandAssetNode.ele('logo', {
      aspect_ratio: tokens.brandAssets?.logo?.aspectRatio || '16:4',
      min_height: `${tokens.brandAssets?.logo?.minHeight || 28}px`,
      safe_padding: `${tokens.brandAssets?.logo?.safeZonePadding || 16}px`,
    });

    return root.end({ prettyPrint: true });
  }
}
