import React from 'react';
import { useDesignStore, SelectedToken } from '@/entities/design-token';
import { PanelSection, TokenBadge, TokenSliderControl, TokenSelectCard, PanelCallout } from '@/shared/ui';

export const ActionsPanel: React.FC = () => {
  const { tokens, updateToken, selectedToken, setSelectedToken } = useDesignStore();
  const btn = tokens.components.actions.button;
  const iconBtn = tokens.components.actions.iconButton;
  const project = tokens.project;

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* 1. BUTTON VARIANTS */}
      <PanelSection title="1. 5 BIẾN THỂ NÚT BẤM (BUTTON VARIANTS)">
        <div className="space-y-2">
          {Object.entries(btn.variants).map(([vKey, vSpec]) => (
            <TokenSelectCard
              key={vKey}
              label={`${vKey.toUpperCase()} Variant`}
              description={`Mã 6 trạng thái chuẩn cho nút ${vKey}.`}
              isSelected={selectedToken.key === `actions.button.variants.${vKey}`}
              icon={
                <div
                  className="w-4 h-4 rounded border border-black/10 shrink-0"
                  style={{ backgroundColor: vSpec.bg || '#6366F1' }}
                />
              }
              previewSlot={<TokenBadge size="sm">6 States</TokenBadge>}
              onSelect={() =>
                handleSelectToken({
                  type: 'component',
                  category: 'actions',
                  key: `actions.button.variants.${vKey}`,
                  path: `components.actions.button.variants.${vKey}`,
                  name: `Button (${vKey.toUpperCase()})`,
                  value: vSpec,
                  cssVar: `${project.prefix}btn-${vKey}`,
                  description: `Full 6-state component specification for ${vKey} button with background, hover, focus-ring, and disabled states.`,
                  impactComponents: [`Button (${vKey})`],
                  guidelines: {
                    do: [`Use for ${vKey === 'primary' ? 'the main page action' : 'secondary or auxiliary actions'}.`],
                    dont: [`Do not use more than one primary button per card container.`],
                  },
                })
              }
            />
          ))}
        </div>
      </PanelSection>

      {/* 2. BUTTON HEIGHTS */}
      <PanelSection title="2. CHIỀU CAO NÚT BẤM (BUTTON HEIGHTS)">
        <div className="space-y-2.5">
          <TokenSliderControl
            label="button-height (sm)"
            value={btn.heightSm}
            min={24}
            max={36}
            step={2}
            isSelected={selectedToken.key === 'actions.button.heightSm'}
            onSelect={() =>
              handleSelectToken({
                type: 'component',
                category: 'actions',
                key: 'actions.button.heightSm',
                path: 'components.actions.button.heightSm',
                name: 'Button Height SM',
                value: `${btn.heightSm}px`,
                cssVar: `${project.prefix}btn-height-sm`,
                description: 'Compact button height for dense tables and toolbars.',
                impactComponents: ['Button SM', 'Table Actions'],
              })
            }
            onChange={(val) => updateToken('components.actions.button.heightSm', val)}
          />

          <TokenSliderControl
            label="button-height (md)"
            value={btn.heightMd}
            min={32}
            max={48}
            step={2}
            isSelected={selectedToken.key === 'actions.button.heightMd'}
            onSelect={() =>
              handleSelectToken({
                type: 'component',
                category: 'actions',
                key: 'actions.button.heightMd',
                path: 'components.actions.button.heightMd',
                name: 'Button Height MD',
                value: `${btn.heightMd}px`,
                cssVar: `${project.prefix}btn-height-md`,
                description: 'Standard ergonomic button height for all primary page actions.',
                impactComponents: ['Button MD', 'Forms'],
              })
            }
            onChange={(val) => updateToken('components.actions.button.heightMd', val)}
          />

          <TokenSliderControl
            label="button-height (lg)"
            value={btn.heightLg}
            min={40}
            max={60}
            step={2}
            isSelected={selectedToken.key === 'actions.button.heightLg'}
            onSelect={() =>
              handleSelectToken({
                type: 'component',
                category: 'actions',
                key: 'actions.button.heightLg',
                path: 'components.actions.button.heightLg',
                name: 'Button Height LG',
                value: `${btn.heightLg}px`,
                cssVar: `${project.prefix}btn-height-lg`,
                description: 'Prominent CTA button height for hero banners and marketing pages.',
                impactComponents: ['Button LG', 'Hero CTA'],
              })
            }
            onChange={(val) => updateToken('components.actions.button.heightLg', val)}
          />
        </div>
      </PanelSection>

      {/* Contextual Description Callout */}
      <PanelCallout
        title="Quy Chuẩn Nút Bấm & Hành Động"
        description={`Hệ thống nút bấm (Actions):
• 5 biến thể chuẩn: Primary, Secondary, Outline, Ghost, Destructive hỗ trợ đầy đủ 6 trạng thái (Default, Hover, Focus, Active, Disabled, Loading).
• Chiều cao tỷ lệ công thái học 32px (SM) ➔ 40px (MD) ➔ 48px (LG).`}
      />
    </div>
  );
};
