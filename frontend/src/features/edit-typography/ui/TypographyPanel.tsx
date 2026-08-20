import React from 'react';
import { Type } from 'lucide-react';
import { useDesignStore, SelectedToken } from '@/entities/design-token';
import { GOOGLE_FONTS_CATALOG } from '@/shared/config';
import { useI18n } from '@/shared/i18n';
import { FormInput, FormSelect, PanelSection } from '@/shared/ui';

export const TypographyPanel: React.FC = () => {
  const { tokens, selectedToken, setSelectedToken, updateToken } = useDesignStore();
  const { t } = useI18n();

  const { typography } = tokens.foundations;
  const project = tokens.project;

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  return (
    <div className="space-y-4 text-xs">
      <FormSelect
        label={t((d) => d.studio.typographyTokens.headingFont)}
        searchable
        searchPlaceholder="Search fonts (e.g. Plus Jakarta Sans, Inter, Roboto)..."
        value={typography.fontHeading}
        onChange={(e) => updateToken('foundations.typography.fontHeading', e.target.value)}
        options={GOOGLE_FONTS_CATALOG.map((f) => ({
          value: f.name,
          label: f.name,
        }))}
      />

      <FormSelect
        label={t((d) => d.studio.typographyTokens.bodyFont)}
        searchable
        searchPlaceholder="Search fonts (e.g. Inter, Roboto, Plus Jakarta Sans)..."
        value={typography.fontBody}
        onChange={(e) => updateToken('foundations.typography.fontBody', e.target.value)}
        options={GOOGLE_FONTS_CATALOG.map((f) => ({
          value: f.name,
          label: f.name,
        }))}
      />

      <div className="grid grid-cols-2 gap-2">
        <FormSelect
          label={t((d) => d.studio.typographyTokens.scaleRatio)}
          value={typography.scaleRatio}
          onChange={(e) => updateToken('foundations.typography.scaleRatio', parseFloat(e.target.value))}
          options={[
            { value: 1.2, label: '1.200 (Minor 3rd)' },
            { value: 1.25, label: '1.250 (Major 3rd)' },
            { value: 1.333, label: '1.333 (4th)' },
          ]}
        />
        <FormInput
          label={t((d) => d.studio.typographyTokens.maxMeasure)}
          type="number"
          value={typography.maxMeasureCharacters}
          onChange={(e) => updateToken('foundations.typography.maxMeasureCharacters', parseInt(e.target.value))}
          className="font-mono text-center"
        />
      </div>

      <PanelSection title={t((d) => d.studio.typographyTokens.scaleSection)} className="pt-2 border-t border-slate-200 dark:border-slate-800">
        {Object.entries(typography.styles).map(([k, style]) => (
          <div
            key={k}
            onClick={() =>
              handleSelectToken({
                type: 'typography',
                category: 'typography',
                key: k,
                path: `foundations.typography.styles.${k}`,
                name: `Typography: ${k.toUpperCase()}`,
                value: style,
                cssVar: `${project.prefix}font-${k}`,
                description: `${k.toUpperCase()} style formatted at ${style.fontSize}px desktop / ${style.fontSizeMobile || style.fontSize}px mobile.`,
                impactComponents: ['Heading', 'Hero Title', 'Card Header', 'Modal Title'],
              })
            }
            className={`p-2 rounded-lg cursor-pointer flex items-center justify-between border transition ${
              selectedToken.key === k
                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-semibold'
                : 'bg-slate-50 dark:bg-slate-800/60 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Type className="w-3.5 h-3.5 text-indigo-500" />
              <span className="uppercase text-[11px] font-bold text-slate-800 dark:text-slate-200">{k}</span>
            </div>
            <span className="font-mono text-[10px] text-slate-500">
              {style.fontSize}px (M: {style.fontSizeMobile}px)
            </span>
          </div>
        ))}
      </PanelSection>

      {/* Contextual Description Callout */}
      <div className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5 bg-transparent mt-4">
        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          {t((d) => d.studio.descriptions.typography.title)}
        </div>
        <p className="text-xs font-normal text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
          {t((d) => d.studio.descriptions.typography.content)}
        </p>
      </div>
    </div>
  );
};
