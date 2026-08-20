import React from 'react';
import { useDesignStore, SelectedToken } from '@/entities/design-token';
import { PanelSection, TokenSliderControl, PanelCallout } from '@/shared/ui';
import { Maximize2, MessageSquare } from 'lucide-react';

export const OverlaysPanel: React.FC = () => {
  const { tokens, updateToken, selectedToken, setSelectedToken } = useDesignStore();
  const { overlays } = tokens.components;
  const project = tokens.project;

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* 1. MODAL SPECIFICATIONS */}
      <PanelSection title="1. HỘP THOẠI NỔI (MODALS)">
        <div className="space-y-3">
          <TokenSliderControl
            label="modal-max-width (md)"
            value={overlays.modal.maxWidthMd}
            min={400}
            max={900}
            step={20}
            isSelected={selectedToken.key === 'overlays.modal.maxWidthMd'}
            description="Độ rộng tối đa cho hộp thoại modal đặt ở giữa màn hình."
            onSelect={() =>
              handleSelectToken({
                type: 'component',
                category: 'overlays',
                key: 'overlays.modal.maxWidthMd',
                path: 'components.overlays.modal.maxWidthMd',
                name: 'Modal Max Width (MD)',
                value: `${overlays.modal.maxWidthMd}px`,
                cssVar: `${project.prefix}modal-max-width`,
                description: 'Maximum width constraint for standard centered modal dialogs.',
                impactComponents: ['Modal Dialog', 'Confirmation Alert', 'Auth Popup'],
              })
            }
            onChange={(val) => updateToken('components.overlays.modal.maxWidthMd', val)}
          />

          <TokenSliderControl
            label="modal-radius"
            value={overlays.modal.radius}
            min={4}
            max={32}
            isSelected={selectedToken.key === 'overlays.modal.radius'}
            description="Bo góc cho khung nền backdrop của modal."
            onSelect={() =>
              handleSelectToken({
                type: 'component',
                category: 'overlays',
                key: 'overlays.modal.radius',
                path: 'components.overlays.modal.radius',
                name: 'Modal Corner Radius',
                value: `${overlays.modal.radius}px`,
                cssVar: `${project.prefix}modal-radius`,
                description: 'Corner rounding for modal backdrop cards.',
                impactComponents: ['Modal Dialog'],
              })
            }
            onChange={(val) => updateToken('components.overlays.modal.radius', val)}
          />
        </div>
      </PanelSection>

      {/* 2. DRAWER & TOOLTIP */}
      <PanelSection title="2. NGĂN KÉO (DRAWER) & GỢI Ý (TOOLTIP)">
        <div className="grid grid-cols-2 gap-2">
          <TokenSliderControl
            label="Drawer Width"
            value={overlays.drawer.width}
            min={240}
            max={480}
            step={10}
            icon={<Maximize2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />}
            onChange={(val) => updateToken('components.overlays.drawer.width', val)}
          />

          <TokenSliderControl
            label="Tooltip Delay"
            value={overlays.tooltip.delay}
            unit="ms"
            min={0}
            max={600}
            step={50}
            icon={<MessageSquare className="w-3.5 h-3.5 text-indigo-500 shrink-0" />}
            onChange={(val) => updateToken('components.overlays.tooltip.delay', val)}
          />
        </div>
      </PanelSection>

      {/* Contextual Description Callout */}
      <PanelCallout
        title="Quy Chuẩn Lớp Phủ & Hộp Thoại"
        description={`Hệ thống lớp phủ (Overlays):
• Hộp thoại Modal tự động khóa cuộn trang nền và áp dụng hiệu ứng mờ kính Backdrop Blur.
• Gợi ý Tooltip có độ trễ 200ms tránh hiện tượng nhấp nháy khi lướt chuột nhanh.`}
      />
    </div>
  );
};
