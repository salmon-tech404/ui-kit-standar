import React, { useState } from 'react';
import { Palette, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { useDesignStore, SelectedToken } from '@/entities/design-token';
import { POPULAR_COLOR_THEMES } from '@/entities/popular-theme';
import { useI18n } from '@/shared/i18n';
import { PanelSection, ColorPickerRow, Tooltip } from '@/shared/ui';

export const ColorsPanel: React.FC = () => {
  const {
    tokens,
    selectedToken,
    setSelectedToken,
    activeFilterTab,
    setActiveFilterTab,
    activeColorThemeId,
    applyPopularColorTheme,
  } = useDesignStore();

  const { t } = useI18n();
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);

  const { colors } = tokens.foundations;
  const { brand, semantic, text, borders, backgroundLayers, neutral } = colors;
  const project = tokens.project;

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  const descKey =
    activeFilterTab === 'text_layers'
      ? 'textLayers'
      : activeFilterTab === 'semantic'
      ? 'semantic'
      : activeFilterTab === 'neutral'
      ? 'neutral'
      : 'colorsAll';

  return (
    <div className="space-y-4 text-xs">
      {/* 4 Filter Sub-tabs */}
      <div className="grid grid-cols-4 gap-1 text-[11px]">
        {[
          { key: 'all', label: 'Tất cả' },
          { key: 'text_layers', label: 'Text & Nền' },
          { key: 'semantic', label: 'Brand & Trạng thái' },
          { key: 'neutral', label: 'Neutral & Viền' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveFilterTab(tab.key)}
            className={`py-1 px-1 rounded-lg font-medium transition text-center truncate ${
              activeFilterTab === tab.key
                ? 'bg-orange-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 0. THEME MÀU PHỔ BIẾN */}
      {(activeFilterTab === 'all' || activeFilterTab === 'semantic') && (
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500 font-mono">
            {t((d) => d.studio.colorTokens.popularThemes)}
          </label>

          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-3 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <button
              onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
              className="w-full flex items-center justify-between text-left select-none"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <Palette className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="font-bold text-slate-900 dark:text-white text-xs truncate">
                  {POPULAR_COLOR_THEMES.find((t) => t.id === activeColorThemeId)?.name || 'RAKU Orange (Mặc định)'}
                </span>
              </div>
              {isThemeDropdownOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              )}
            </button>

            {isThemeDropdownOpen && (
              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-0.5 pt-1">
                {POPULAR_COLOR_THEMES.map((theme) => {
                  const isSelected = activeColorThemeId === theme.id || (!activeColorThemeId && theme.id === 'raku-orange');
                  return (
                    <Tooltip key={theme.id} content={theme.name} position="left" className="w-full block">
                      <div
                        onClick={() => applyPopularColorTheme(theme.id)}
                        className="w-full py-2 px-1.5 flex items-center justify-between gap-3 cursor-pointer transition select-none hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg"
                      >
                        <div className="flex items-center h-5 flex-1 rounded-none overflow-hidden">
                          {theme.palette.map((colorHex, idx) => (
                            <div
                              key={idx}
                              style={{ backgroundColor: colorHex }}
                              className="flex-1 h-full transition hover:opacity-90"
                            />
                          ))}
                        </div>

                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition shrink-0 ${
                            isSelected
                              ? 'border-orange-500 bg-orange-500 text-white shadow-xs'
                              : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 hover:border-slate-400'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Text & Background Layer Tokens */}
      {(activeFilterTab === 'all' || activeFilterTab === 'text_layers') && (
        <div className="space-y-3">
          <PanelSection title={t((d) => d.studio.colorTokens.textForegroundSection)}>
            {[
              { label: t((d) => d.studio.colorTokens.textPrimary), key: 'textPrimary', path: 'foundations.colors.text.primary', val: text.primary },
              { label: t((d) => d.studio.colorTokens.textSecondary), key: 'textSecondary', path: 'foundations.colors.text.secondary', val: text.secondary },
              { label: t((d) => d.studio.colorTokens.textTertiary), key: 'textTertiary', path: 'foundations.colors.text.tertiary', val: text.tertiary },
              { label: t((d) => d.studio.colorTokens.textLink), key: 'textLink', path: 'foundations.colors.text.link', val: text.link },
            ].map((item) => (
              <ColorPickerRow
                key={item.key}
                label={item.label}
                value={item.val}
                isSelected={selectedToken.key === item.key}
                onClick={() =>
                  handleSelectToken({
                    type: 'color',
                    category: 'text',
                    key: item.key,
                    path: item.path,
                    name: item.label,
                    value: item.val,
                    cssVar: `${project.prefix}color-${item.key.toLowerCase()}`,
                    description: `Dedicated typographic foreground color token.`,
                    impactComponents: ['Heading', 'Body Paragraph', 'Table Row', 'Card Text'],
                  })
                }
              />
            ))}
          </PanelSection>

          <PanelSection title={t((d) => d.studio.colorTokens.backgroundLayersSection)}>
            {[
              { label: t((d) => d.studio.colorTokens.bgPage), key: 'bgPage', path: 'foundations.colors.backgroundLayers.page', val: backgroundLayers.page },
              { label: t((d) => d.studio.colorTokens.bgCard), key: 'bgCard', path: 'foundations.colors.backgroundLayers.card', val: backgroundLayers.card },
              { label: t((d) => d.studio.colorTokens.bgModal), key: 'bgModal', path: 'foundations.colors.backgroundLayers.modal', val: backgroundLayers.modal },
            ].map((item) => (
              <ColorPickerRow
                key={item.key}
                label={item.label}
                value={item.val}
                isSelected={selectedToken.key === item.key}
                onClick={() =>
                  handleSelectToken({
                    type: 'color',
                    category: 'background_layer',
                    key: item.key,
                    path: item.path,
                    name: item.label,
                    value: item.val,
                    cssVar: `${project.prefix}color-${item.key.toLowerCase()}`,
                    description: `Layered background tone preventing flat, textureless containers.`,
                    impactComponents: ['App Shell', 'Card', 'Modal Overlay', 'Sidebar'],
                  })
                }
              />
            ))}
          </PanelSection>
        </div>
      )}

      {/* Brand Palette */}
      {(activeFilterTab === 'all' || activeFilterTab === 'semantic') && (
        <PanelSection title={t((d) => d.studio.colorTokens.brandSection)}>
          {[
            { label: 'Primary', key: 'primary', path: 'foundations.colors.brand.primary', val: brand.primary },
            { label: 'Primary Hover', key: 'primaryHover', path: 'foundations.colors.brand.primaryHover', val: brand.primaryHover },
            { label: 'Secondary', key: 'secondary', path: 'foundations.colors.brand.secondary', val: brand.secondary },
            { label: 'Accent', key: 'accent', path: 'foundations.colors.brand.accent', val: brand.accent },
          ].map((item) => (
            <ColorPickerRow
              key={item.key}
              label={item.label}
              value={item.val}
              isSelected={selectedToken.key === item.key}
              onClick={() =>
                handleSelectToken({
                  type: 'color',
                  category: 'brand',
                  key: item.key,
                  path: item.path,
                  name: item.label,
                  value: item.val,
                  cssVar: `${project.prefix}color-${item.key.toLowerCase()}`,
                  description: `Core brand token synced across all component blueprints.`,
                  impactComponents: ['Button', 'Link', 'Tabs', 'Badge', 'Focus Ring', 'Hero CTA'],
                })
              }
            />
          ))}
        </PanelSection>
      )}

      {/* Semantic Palette */}
      {(activeFilterTab === 'all' || activeFilterTab === 'semantic') && (
        <PanelSection title={t((d) => d.studio.colorTokens.semanticSection)}>
          {[
            { label: 'Success', key: 'success', path: 'foundations.colors.semantic.success', val: semantic.success },
            { label: 'Warning', key: 'warning', path: 'foundations.colors.semantic.warning', val: semantic.warning },
            { label: 'Error', key: 'error', path: 'foundations.colors.semantic.error', val: semantic.error },
            { label: 'Info', key: 'info', path: 'foundations.colors.semantic.info', val: semantic.info },
          ].map((item) => (
            <ColorPickerRow
              key={item.key}
              label={item.label}
              value={item.val}
              isSelected={selectedToken.key === item.key}
              onClick={() =>
                handleSelectToken({
                  type: 'color',
                  category: 'semantic',
                  key: item.key,
                  path: item.path,
                  name: item.label,
                  value: item.val,
                  cssVar: `${project.prefix}color-${item.key}`,
                  description: `Status indicator token for ${item.label.toLowerCase()} states.`,
                  impactComponents: ['Alert', 'Toast', 'Badge', 'Input Validation', 'Status Dot'],
                })
              }
            />
          ))}
        </PanelSection>
      )}

      {/* Neutral & Grayscale Palette */}
      {(activeFilterTab === 'all' || activeFilterTab === 'neutral') && (
        <PanelSection title={t((d) => d.studio.colorTokens.neutralSection)}>
          {[
            { label: 'Gray 900 (Darkest)', key: 'gray900', path: 'foundations.colors.neutral.gray900', val: neutral?.gray900 || '#111827' },
            { label: 'Gray 800 (Dark Surface)', key: 'gray800', path: 'foundations.colors.neutral.gray800', val: neutral?.gray800 || '#1F2937' },
            { label: 'Gray 700 (Muted Text)', key: 'gray700', path: 'foundations.colors.neutral.gray700', val: neutral?.gray700 || '#374151' },
            { label: 'Gray 500 (Subtle Icon)', key: 'gray500', path: 'foundations.colors.neutral.gray500', val: neutral?.gray500 || '#6B7280' },
            { label: 'Gray 200 (Subtle Divider)', key: 'gray200', path: 'foundations.colors.neutral.gray200', val: neutral?.gray200 || '#E5E7EB' },
            { label: 'Gray 100 (Soft Chip/Badge)', key: 'gray100', path: 'foundations.colors.neutral.gray100', val: neutral?.gray100 || '#F3F4F6' },
          ].map((item) => (
            <ColorPickerRow
              key={item.key}
              label={item.label}
              value={item.val}
              isSelected={selectedToken.key === item.key}
              onClick={() =>
                handleSelectToken({
                  type: 'color',
                  category: 'neutral',
                  key: item.key,
                  path: item.path,
                  name: item.label,
                  value: item.val,
                  cssVar: `${project.prefix}color-neutral-${item.key.toLowerCase()}`,
                  description: `Neutral grayscale foundation token for subtle contrast.`,
                  impactComponents: ['Borders', 'Dividers', 'Chips', 'Muted Text', 'Card Surfaces'],
                })
              }
            />
          ))}
        </PanelSection>
      )}

      {/* Border Hierarchy Tokens */}
      {(activeFilterTab === 'all' || activeFilterTab === 'neutral') && (
        <PanelSection title={t((d) => d.studio.colorTokens.bordersSection)}>
          {[
            { label: 'Border Subtle', key: 'borderSubtle', path: 'foundations.colors.borders.subtle', val: borders.subtle },
            { label: 'Border Default', key: 'borderDefault', path: 'foundations.colors.borders.default', val: borders.default },
            { label: 'Border Strong', key: 'borderStrong', path: 'foundations.colors.borders.strong', val: borders.strong },
            { label: 'Border Focus', key: 'borderFocus', path: 'foundations.colors.borders.focus', val: borders.focus },
          ].map((item) => (
            <ColorPickerRow
              key={item.key}
              label={item.label}
              value={item.val}
              isSelected={selectedToken.key === item.key}
              onClick={() =>
                handleSelectToken({
                  type: 'color',
                  category: 'border',
                  key: item.key,
                  path: item.path,
                  name: item.label,
                  value: item.val,
                  cssVar: `${project.prefix}color-${item.key.toLowerCase()}`,
                  description: `Structured boundary outline token for visual containment.`,
                  impactComponents: ['Inputs', 'Cards', 'Tables', 'Separators', 'Focus Outline'],
                })
              }
            />
          ))}
        </PanelSection>
      )}

      {/* Contextual Description Callout */}
      <div className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5 bg-transparent">
        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          {t((d) => (d.studio.descriptions as any)[descKey]?.title || '')}
        </div>
        <p className="text-xs font-normal text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
          {t((d) => (d.studio.descriptions as any)[descKey]?.content || '')}
        </p>
      </div>
    </div>
  );
};
