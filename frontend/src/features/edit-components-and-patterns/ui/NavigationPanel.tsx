import React from 'react';
import { useDesignStore, SelectedToken } from '@/entities/design-token';
import { FormSelect, PanelSection, TokenSliderControl, TokenToggleCard, PanelCallout } from '@/shared/ui';

export const NavigationPanel: React.FC = () => {
  const { tokens, updateToken, selectedToken, setSelectedToken } = useDesignStore();
  const { navigation } = tokens.components;
  const project = tokens.project;

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* 1. HEADER SPECIFICATIONS */}
      <PanelSection title="1. THANH ĐẦU TRANG (HEADER / NAVBAR)">
        <div className="space-y-3">
          <TokenSliderControl
            label="header-height"
            value={navigation.header.height}
            min={48}
            max={80}
            step={2}
            isSelected={selectedToken.key === 'navigation.header.height'}
            description="Chiều cao cố định cho thanh điều hướng topbar trên cùng."
            onSelect={() =>
              handleSelectToken({
                type: 'component',
                category: 'navigation',
                key: 'navigation.header.height',
                path: 'components.navigation.header.height',
                name: 'Navbar Header Height',
                value: `${navigation.header.height}px`,
                cssVar: `${project.prefix}header-height`,
                description: 'Fixed height for top application navigation header.',
                impactComponents: ['DemoNavbar', 'Studio Topbar'],
              })
            }
            onChange={(val) => updateToken('components.navigation.header.height', val)}
          />

          <TokenToggleCard
            title="Sticky Navbar"
            description="Cố định thanh điều hướng khi cuộn trang"
            checked={navigation.header.sticky}
            onChange={(checked) => updateToken('components.navigation.header.sticky', checked)}
          />
        </div>
      </PanelSection>

      {/* 2. SIDEBAR RAIL STYLES */}
      <PanelSection title="2. THANH BÊN ĐIỀU HƯỚNG (SIDEBAR)">
        <div className="space-y-3">
          <FormSelect
            label="Phong Cách Thanh Bên (Sidebar Style)"
            value={navigation.sidebar.style}
            onChange={(e) => updateToken('components.navigation.sidebar.style', e.target.value)}
            options={[
              { value: 'B-Standard', label: 'B-Standard (250px Classic Rail)' },
              { value: 'A-Slim', label: 'A-Slim (64px Icon Only)' },
              { value: 'C-Floating', label: 'C-Floating (Floating Pill Island)' },
              { value: 'D-Grouped', label: 'D-Grouped (Accordion Groups)' },
            ]}
          />

          <TokenSliderControl
            label="sidebar-width (expanded)"
            value={navigation.sidebar.widthExpanded}
            min={200}
            max={320}
            step={10}
            isSelected={selectedToken.key === 'navigation.sidebar.widthExpanded'}
            description="Độ rộng khi mở rộng của thanh bên điều hướng."
            onSelect={() =>
              handleSelectToken({
                type: 'component',
                category: 'navigation',
                key: 'navigation.sidebar.widthExpanded',
                path: 'components.navigation.sidebar.widthExpanded',
                name: 'Sidebar Width Expanded',
                value: `${navigation.sidebar.widthExpanded}px`,
                cssVar: `${project.prefix}sidebar-width`,
                description: 'Width of persistent left sidebar in expanded state.',
                impactComponents: ['MasterRail', 'Studio Layout'],
              })
            }
            onChange={(val) => updateToken('components.navigation.sidebar.widthExpanded', val)}
          />
        </div>
      </PanelSection>

      {/* Contextual Description Callout */}
      <PanelCallout
        title="Quy Chuẩn Thanh Điều Hướng"
        description={`Hệ thống điều hướng (Navigation):
• Chiều cao Header đồng bộ giữa Desktop (56px) và Mobile với menu hamburger thu gọn.
• 4 kiểu kiến trúc Sidebar phục vụ linh hoạt cho Dashboard, Studio hoặc trang Landing.`}
      />
    </div>
  );
};
