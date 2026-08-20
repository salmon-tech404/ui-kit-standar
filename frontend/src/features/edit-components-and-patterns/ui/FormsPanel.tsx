import React from 'react';
import { useDesignStore, SelectedToken } from '@/entities/design-token';
import { PanelSection, TokenSliderControl, PanelCallout } from '@/shared/ui';
import { CheckSquare, ToggleLeft } from 'lucide-react';

export const FormsPanel: React.FC = () => {
  const { tokens, updateToken, selectedToken, setSelectedToken } = useDesignStore();
  const { forms } = tokens.components;
  const project = tokens.project;

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* 1. INPUT & SELECT SIZING */}
      <PanelSection title="1. CHIỀU CAO & BO GÓC Ô NHẬP LIỆU">
        <div className="space-y-3">
          <TokenSliderControl
            label="input-height (md)"
            value={forms.input.heightMd}
            min={32}
            max={56}
            step={2}
            isSelected={selectedToken.key === 'forms.input.heightMd'}
            description="Chiều cao chuẩn công thái học = (Padding-Y * 2) + Line-Height + Border (40px standard)."
            onSelect={() =>
              handleSelectToken({
                type: 'component',
                category: 'forms',
                key: 'forms.input.heightMd',
                path: 'components.forms.input.heightMd',
                name: 'Input Field Height (MD)',
                value: `${forms.input.heightMd}px`,
                cssVar: `${project.prefix}input-height`,
                description: 'Height = (Padding-Y * 2) + Line-Height + Border (40px standard).',
                impactComponents: ['Form Input', 'Select Dropdown', 'Search Bar'],
              })
            }
            onChange={(val) => updateToken('components.forms.input.heightMd', val)}
          />

          <TokenSliderControl
            label="input-radius"
            value={forms.input.radius}
            min={0}
            max={24}
            isSelected={selectedToken.key === 'forms.input.radius'}
            description="Bo góc áp dụng đồng nhất cho ô nhập văn bản và dropdown select."
            onSelect={() =>
              handleSelectToken({
                type: 'component',
                category: 'forms',
                key: 'forms.input.radius',
                path: 'components.forms.input.radius',
                name: 'Input Corner Radius',
                value: `${forms.input.radius}px`,
                cssVar: `${project.prefix}input-radius`,
                description: 'Corner rounding applied to all text inputs and select elements.',
                impactComponents: ['Form Input', 'Select', 'Textarea'],
              })
            }
            onChange={(val) => updateToken('components.forms.input.radius', val)}
          />
        </div>
      </PanelSection>

      {/* 2. SELECTION CONTROLS */}
      <PanelSection title="2. ĐIỀU KHIỂN CHỌN LỰA (SELECTION)">
        <div className="grid grid-cols-2 gap-2">
          <TokenSliderControl
            label="Checkbox"
            value={forms.checkbox.size}
            min={14}
            max={24}
            icon={<CheckSquare className="w-3.5 h-3.5 text-indigo-500 shrink-0" />}
            onChange={(val) => updateToken('components.forms.checkbox.size', val)}
          />

          <TokenSliderControl
            label="Switch"
            value={forms.toggleSwitch.width}
            min={32}
            max={52}
            icon={<ToggleLeft className="w-3.5 h-3.5 text-indigo-500 shrink-0" />}
            onChange={(val) => updateToken('components.forms.toggleSwitch.width', val)}
          />
        </div>
      </PanelSection>

      {/* Contextual Description Callout */}
      <PanelCallout
        title="Quy Chuẩn Biểu Mẫu Nhập Liệu"
        description={`Biểu mẫu nhập liệu (Forms) được thiết kế theo tỷ lệ công thái học:
• Chiều cao tiêu chuẩn 40px tạo diện tích chạm bấm thoải mái trên cả điện thoại và chuột máy tính.
• Trạng thái viền Focus và Error tự động liên kết với bảng màu Semantic.`}
      />
    </div>
  );
};
