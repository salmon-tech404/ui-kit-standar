import React from 'react';
import { useDesignStore, SelectedToken } from '@/entities/design-token';
import { PanelSection, TokenSliderControl, PanelCallout } from '@/shared/ui';

export const LayoutPanel: React.FC = () => {
  const { tokens, updateToken, selectedToken, setSelectedToken } = useDesignStore();
  const { layout } = tokens.components;
  const project = tokens.project;

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* 1. CONTAINER PADDING */}
      <PanelSection title="1. KHOẢNG ĐỆM KHUNG CHỨA (CONTAINER)">
        <div className="space-y-3">
          <TokenSliderControl
            label="container-padding-x (desktop)"
            value={layout.container.paddingX}
            min={16}
            max={64}
            step={4}
            isSelected={selectedToken.key === 'layout.container.paddingX'}
            description="Khoảng đệm an toàn 2 bên cho container nội dung trên desktop."
            onSelect={() =>
              handleSelectToken({
                type: 'component',
                category: 'layout',
                key: 'layout.container.paddingX',
                path: 'components.layout.container.paddingX',
                name: 'Container Padding (Desktop)',
                value: `${layout.container.paddingX}px`,
                cssVar: `${project.prefix}container-padding-x`,
                description: 'Horizontal padding on main content layout containers.',
                impactComponents: ['Page Shell', 'Grid System', 'Hero Banner'],
              })
            }
            onChange={(val) => updateToken('components.layout.container.paddingX', val)}
          />

          <TokenSliderControl
            label="container-padding-x (mobile)"
            value={layout.container.paddingXMobile}
            min={8}
            max={32}
            step={4}
            isSelected={selectedToken.key === 'layout.container.paddingXMobile'}
            description="Khoảng đệm an toàn 2 bên trên màn hình điện thoại di động."
            onSelect={() =>
              handleSelectToken({
                type: 'component',
                category: 'layout',
                key: 'layout.container.paddingXMobile',
                path: 'components.layout.container.paddingXMobile',
                name: 'Container Padding (Mobile)',
                value: `${layout.container.paddingXMobile}px`,
                cssVar: `${project.prefix}container-padding-mobile`,
                description: 'Safe margin on mobile viewport screens.',
                impactComponents: ['Mobile Page Shell'],
              })
            }
            onChange={(val) => updateToken('components.layout.container.paddingXMobile', val)}
          />
        </div>
      </PanelSection>

      {/* 2. 12-COLUMN GRID GAP */}
      <PanelSection title="2. LƯỚI BỐ CỤC 12 CỘT (GRID)">
        <div className="space-y-3">
          <TokenSliderControl
            label="grid-gap"
            value={layout.grid.gap}
            min={12}
            max={48}
            step={4}
            isSelected={selectedToken.key === 'layout.grid.gap'}
            description="Khoảng hở giữa các cột trong hệ thống khung lưới responsive 12 cột."
            onSelect={() =>
              handleSelectToken({
                type: 'component',
                category: 'layout',
                key: 'layout.grid.gap',
                path: 'components.layout.grid.gap',
                name: '12-Column Grid Gap',
                value: `${layout.grid.gap}px`,
                cssVar: `${project.prefix}grid-gap`,
                description: 'Inter-column spacing in 12-column responsive layout grid.',
                impactComponents: ['Bento Grid', 'Cards Grid', 'Feature Columns'],
              })
            }
            onChange={(val) => updateToken('components.layout.grid.gap', val)}
          />
        </div>
      </PanelSection>

      {/* Contextual Description Callout */}
      <PanelCallout
        title="Quy Chuẩn Bố Cục Khung Lưới"
        description={`Hệ thống lưới (Layout & Grid):
• Khung chứa 12 cột tự động thích ứng chuyển thành 4 cột trên Mobile và 12 cột trên Desktop.
• Khoảng đệm an toàn 2 bên (Safe padding) chống tràn màn hình.`}
      />
    </div>
  );
};
