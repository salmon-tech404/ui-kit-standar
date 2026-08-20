import React, { useState } from 'react';
import { useDesignStore, SelectedToken } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';
import { PanelSection } from '@/shared/ui';

type SpacingFilterTab = 'all' | 'padding' | 'micro' | 'flow' | 'layout' | 'compound';

export const SpacingPanel: React.FC = () => {
  const { tokens, selectedToken, setSelectedToken } = useDesignStore();
  const { t } = useI18n();
  const [activeSpacingFilter, setActiveSpacingFilter] = useState<SpacingFilterTab>('all');

  const { spacing } = tokens.foundations;
  const project = tokens.project;

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Filter Tabs */}
      <div className="grid grid-cols-3 gap-1 text-[11px]">
        {[
          { key: 'all', label: t((d) => d.studio.spacingTokens.tabs.all) },
          { key: 'padding', label: t((d) => d.studio.spacingTokens.tabs.padding) },
          { key: 'micro', label: t((d) => d.studio.spacingTokens.tabs.micro) },
          { key: 'flow', label: t((d) => d.studio.spacingTokens.tabs.flow) },
          { key: 'layout', label: t((d) => d.studio.spacingTokens.tabs.layout) },
          { key: 'compound', label: t((d) => d.studio.spacingTokens.tabs.compound) },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveSpacingFilter(tab.key as SpacingFilterTab)}
            className={`py-1 px-1 rounded-lg font-medium transition text-center truncate ${
              activeSpacingFilter === tab.key
                ? 'bg-orange-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. COMPONENT PADDING */}
      {(activeSpacingFilter === 'all' || activeSpacingFilter === 'padding') && (
        <PanelSection title={t((d) => d.studio.spacingTokens.sections.padding)}>
          {[
            {
              label: t((d) => d.studio.spacingTokens.items.buttonMd),
              key: 'padding.buttonMd',
              val: spacing.padding?.buttonMd ?? { px: 16, py: 8 },
              displayVal: `px: ${spacing.padding?.buttonMd?.px ?? 16}px | py: ${spacing.padding?.buttonMd?.py ?? 8}px`,
              meta: { kind: 'padding2d', target: t((d) => d.studio.spacingTokens.items.buttonMd) },
            },
            {
              label: t((d) => d.studio.spacingTokens.items.input),
              key: 'padding.input',
              val: spacing.padding?.input ?? { px: 12, py: 8 },
              displayVal: `px: ${spacing.padding?.input?.px ?? 12}px | py: ${spacing.padding?.input?.py ?? 8}px`,
              meta: { kind: 'padding2d', target: t((d) => d.studio.spacingTokens.items.input) },
            },
            {
              label: t((d) => d.studio.spacingTokens.items.card),
              key: 'padding.card',
              val: spacing.padding?.card?.p ?? 20,
              displayVal: `${spacing.padding?.card?.p ?? 20}px`,
              meta: { kind: 'padding1d', target: t((d) => d.studio.spacingTokens.items.card) },
            },
            {
              label: t((d) => d.studio.spacingTokens.items.modal),
              key: 'padding.modal',
              val: spacing.padding?.modal?.p ?? 24,
              displayVal: `${spacing.padding?.modal?.p ?? 24}px`,
              meta: { kind: 'padding1d', target: t((d) => d.studio.spacingTokens.items.modal) },
            },
            {
              label: t((d) => d.studio.spacingTokens.items.badge),
              key: 'padding.badge',
              val: spacing.padding?.badge ?? { px: 8, py: 2 },
              displayVal: `px: ${spacing.padding?.badge?.px ?? 8}px | py: ${spacing.padding?.badge?.py ?? 2}px`,
              meta: { kind: 'padding2d', target: t((d) => d.studio.spacingTokens.items.badge) },
            },
          ].map((item) => (
            <div
              key={item.key}
              onClick={() =>
                handleSelectToken({
                  type: 'spacing',
                  category: 'padding',
                  key: item.key,
                  path: `foundations.spacing.${item.key}`,
                  name: item.label,
                  value: item.val,
                  cssVar: `${project.prefix}${item.key.replace('.', '-')}`,
                  description: `Component padding token defining internal boundary space.`,
                  impactComponents: [item.label, 'Layout Canvas'],
                  meta: item.meta,
                })
              }
              className={`p-2 rounded-lg cursor-pointer flex items-center justify-between border transition ${
                selectedToken.key === item.key
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-semibold ring-1 ring-indigo-500/20'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
              }`}
            >
              <span className="font-semibold text-slate-800 dark:text-slate-200">{item.label}</span>
              <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded">{item.displayVal}</span>
            </div>
          ))}
        </PanelSection>
      )}

      {/* 2. MICRO GAPS */}
      {(activeSpacingFilter === 'all' || activeSpacingFilter === 'micro') && (
        <PanelSection title={t((d) => d.studio.spacingTokens.sections.micro)}>
          {[
            { label: t((d) => d.studio.spacingTokens.items.iconText), key: 'microGaps.iconText', val: spacing.microGaps?.iconText ?? 8, from: 'Icon', to: 'Text' },
            { label: t((d) => d.studio.spacingTokens.items.labelInput), key: 'microGaps.labelInput', val: spacing.microGaps?.labelInput ?? 6, from: 'Label', to: 'Input' },
            { label: t((d) => d.studio.spacingTokens.items.inputError), key: 'microGaps.inputError', val: spacing.microGaps?.inputError ?? 4, from: 'Input', to: 'Error Text' },
            { label: t((d) => d.studio.spacingTokens.items.checkboxLabel), key: 'microGaps.checkboxLabel', val: spacing.microGaps?.checkboxLabel ?? 8, from: 'Control', to: 'Label' },
            { label: t((d) => d.studio.spacingTokens.items.avatarUser), key: 'microGaps.avatarUser', val: spacing.microGaps?.avatarUser ?? 12, from: 'Avatar', to: 'User Info' },
          ].map((item) => (
            <div
              key={item.key}
              onClick={() =>
                handleSelectToken({
                  type: 'spacing',
                  category: 'micro_gap',
                  key: item.key,
                  path: `foundations.spacing.${item.key}`,
                  name: item.label,
                  value: item.val,
                  cssVar: `${project.prefix}${item.key.replace('.', '-')}`,
                  description: `Inline proximity gap between connected sub-elements.`,
                  impactComponents: [item.label, 'Form', 'Button'],
                  meta: { kind: 'gap1d', from: item.from, to: item.to },
                })
              }
              className={`p-2 rounded-lg cursor-pointer flex items-center justify-between border transition ${
                selectedToken.key === item.key
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-semibold ring-1 ring-indigo-500/20'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
              }`}
            >
              <span className="font-semibold text-slate-800 dark:text-slate-200">{item.label}</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded">{item.val}px</span>
            </div>
          ))}
        </PanelSection>
      )}

      {/* 3. FLOW GAPS */}
      {(activeSpacingFilter === 'all' || activeSpacingFilter === 'flow') && (
        <PanelSection title={t((d) => d.studio.spacingTokens.sections.flow)}>
          {[
            { label: t((d) => d.studio.spacingTokens.items.formFields), key: 'flowGaps.formFields', val: spacing.flowGaps?.formFields ?? 16, from: 'Field A', to: 'Field B' },
            { label: t((d) => d.studio.spacingTokens.items.buttonGroup), key: 'flowGaps.buttonGroup', val: spacing.flowGaps?.buttonGroup ?? 12, from: 'Cancel', to: 'Confirm' },
            { label: t((d) => d.studio.spacingTokens.items.cardGrid), key: 'flowGaps.cardGrid', val: spacing.flowGaps?.cardGrid ?? 24, from: 'Card 1', to: 'Card 2' },
            { label: t((d) => d.studio.spacingTokens.items.listRows), key: 'flowGaps.listRows', val: spacing.flowGaps?.listRows ?? 8, from: 'Row A', to: 'Row B' },
          ].map((item) => (
            <div
              key={item.key}
              onClick={() =>
                handleSelectToken({
                  type: 'spacing',
                  category: 'flow_gap',
                  key: item.key,
                  path: `foundations.spacing.${item.key}`,
                  name: item.label,
                  value: item.val,
                  cssVar: `${project.prefix}${item.key.replace('.', '-')}`,
                  description: `Distance separating adjacent components in lists and grids.`,
                  impactComponents: [item.label, 'Form', 'Card Grid'],
                  meta: { kind: 'gap1d', from: item.from, to: item.to },
                })
              }
              className={`p-2 rounded-lg cursor-pointer flex items-center justify-between border transition ${
                selectedToken.key === item.key
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-semibold ring-1 ring-indigo-500/20'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
              }`}
            >
              <span className="font-semibold text-slate-800 dark:text-slate-200">{item.label}</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded">{item.val}px</span>
            </div>
          ))}
        </PanelSection>
      )}

      {/* 4. LAYOUT & RESPONSIVE */}
      {(activeSpacingFilter === 'all' || activeSpacingFilter === 'layout') && (
        <PanelSection title={t((d) => d.studio.spacingTokens.sections.layout)}>
          {[
            {
              label: t((d) => d.studio.spacingTokens.items.sectionGap),
              key: 'layout.sectionGap',
              val: {
                mobile: spacing.layout?.sectionGapMobile ?? 48,
                desktop: spacing.layout?.sectionGapDesktop ?? 80,
              },
              displayVal: `M: ${spacing.layout?.sectionGapMobile ?? 48}px | D: ${spacing.layout?.sectionGapDesktop ?? 80}px`,
              meta: { kind: 'responsive', type: 'section' },
            },
            {
              label: t((d) => d.studio.spacingTokens.items.containerPadding),
              key: 'layout.containerPadding',
              val: {
                mobile: spacing.layout?.containerPaddingMobile ?? 16,
                desktop: spacing.layout?.containerPaddingDesktop ?? 32,
              },
              displayVal: `M: ${spacing.layout?.containerPaddingMobile ?? 16}px | D: ${spacing.layout?.containerPaddingDesktop ?? 32}px`,
              meta: { kind: 'responsive', type: 'container' },
            },
          ].map((item) => (
            <div
              key={item.key}
              onClick={() =>
                handleSelectToken({
                  type: 'spacing',
                  category: 'layout',
                  key: item.key,
                  path: `foundations.spacing.${item.key}`,
                  name: item.label,
                  value: item.val,
                  cssVar: `${project.prefix}${item.key.replace('.', '-')}`,
                  description: `Macro layout breakpoint spacing token.`,
                  impactComponents: ['Page Shell', 'Sections', 'Grid'],
                  meta: item.meta,
                })
              }
              className={`p-2 rounded-lg cursor-pointer flex items-center justify-between border transition ${
                selectedToken.key === item.key
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-semibold ring-1 ring-indigo-500/20'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
              }`}
            >
              <span className="font-semibold text-slate-800 dark:text-slate-200">{item.label}</span>
              <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded">{item.displayVal}</span>
            </div>
          ))}
        </PanelSection>
      )}

      {/* 5. COMPOUND BLOCKS */}
      {(activeSpacingFilter === 'all' || activeSpacingFilter === 'compound') && (
        <PanelSection title={t((d) => d.studio.spacingTokens.sections.compound)}>
          {[
            { label: t((d) => d.studio.spacingTokens.items.cardHeaderBody), key: 'compound.cardHeaderBody', val: spacing.compound?.cardHeaderBody ?? 16, from: 'Header', to: 'Body' },
            { label: t((d) => d.studio.spacingTokens.items.modalHeaderBody), key: 'compound.modalHeaderBody', val: spacing.compound?.modalHeaderBody ?? 20, from: 'Header', to: 'Body' },
          ].map((item) => (
            <div
              key={item.key}
              onClick={() =>
                handleSelectToken({
                  type: 'spacing',
                  category: 'compound',
                  key: item.key,
                  path: `foundations.spacing.${item.key}`,
                  name: item.label,
                  value: item.val,
                  cssVar: `${project.prefix}${item.key.replace('.', '-')}`,
                  description: `Internal division gap for compound nested components.`,
                  impactComponents: ['Card', 'Modal', 'Drawer'],
                  meta: { kind: 'gap1d', from: item.from, to: item.to },
                })
              }
              className={`p-2 rounded-lg cursor-pointer flex items-center justify-between border transition ${
                selectedToken.key === item.key
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-semibold ring-1 ring-indigo-500/20'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
              }`}
            >
              <span className="font-semibold text-slate-800 dark:text-slate-200">{item.label}</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded">{item.val}px</span>
            </div>
          ))}
        </PanelSection>
      )}

      {/* Contextual Description Callout */}
      <div className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5 bg-transparent mt-4 select-text">
        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          {t((d) => d.studio.descriptions.spacing.title)}
        </div>
        <p className="text-xs font-normal text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line select-text">
          {t((d) => d.studio.descriptions.spacing.content)}
        </p>
      </div>
    </div>
  );
};
