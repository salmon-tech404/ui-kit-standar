import React from 'react';
import { useDesignStore, SelectedToken } from '@/entities/design-token';
import { PanelSection, TokenSliderControl, PanelCallout } from '@/shared/ui';
import { ShieldCheck } from 'lucide-react';

export const AccessibilityPanel: React.FC = () => {
  const { tokens, updateToken, selectedToken, setSelectedToken } = useDesignStore();
  const { accessibility } = tokens.foundations;
  const project = tokens.project;

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* 1. FOCUS RING CONTROLS */}
      <PanelSection title="1. VÒNG VIỀN TIÊU ĐIỂM (FOCUS RING)">
        <div className="space-y-3">
          {/* Interactive Focus Test Component */}
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-center">
            <span className="text-[11px] text-slate-400">Bấm nút bên dưới để thử vòng viền Focus:</span>
            <div>
              <button
                type="button"
                style={{
                  outline: `${accessibility.focusRingWidth}px solid ${accessibility.focusRingColor}`,
                  outlineOffset: `${accessibility.focusRingOffset}px`,
                }}
                className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg font-bold text-xs shadow-md transition cursor-pointer"
              >
                Focus Target Test
              </button>
            </div>
          </div>

          {/* Width Slider */}
          <TokenSliderControl
            label="focus-ring-width"
            value={accessibility.focusRingWidth}
            min={1}
            max={6}
            isSelected={selectedToken.key === 'accessibility.focusRingWidth'}
            description="Độ dày vòng viền focus-visible khi duyệt phím Tab."
            onSelect={() =>
              handleSelectToken({
                type: 'accessibility',
                category: 'accessibility',
                key: 'accessibility.focusRingWidth',
                path: 'foundations.accessibility.focusRingWidth',
                name: 'Focus Ring Width',
                value: `${accessibility.focusRingWidth}px`,
                cssVar: `${project.prefix}focus-ring-width`,
                description: 'Width of focus-visible outline for keyboard navigation.',
                impactComponents: ['Button', 'Input', 'Link', 'Checkbox', 'Radio'],
              })
            }
            onChange={(val) => updateToken('foundations.accessibility.focusRingWidth', val)}
          />

          {/* Offset Slider */}
          <TokenSliderControl
            label="focus-ring-offset"
            value={accessibility.focusRingOffset}
            min={0}
            max={6}
            isSelected={selectedToken.key === 'accessibility.focusRingOffset'}
            description="Khoảng cách đệm giữa viền component và vòng outline focus."
            onSelect={() =>
              handleSelectToken({
                type: 'accessibility',
                category: 'accessibility',
                key: 'accessibility.focusRingOffset',
                path: 'foundations.accessibility.focusRingOffset',
                name: 'Focus Ring Offset',
                value: `${accessibility.focusRingOffset}px`,
                cssVar: `${project.prefix}focus-ring-offset`,
                description: 'Offset gap between component boundary and focus outline.',
                impactComponents: ['Button', 'Input', 'Link'],
              })
            }
            onChange={(val) => updateToken('foundations.accessibility.focusRingOffset', val)}
          />
        </div>
      </PanelSection>

      {/* 2. WCAG CONTRAST THRESHOLDS */}
      <PanelSection title="2. TIÊU CHUẨN TƯƠNG PHẢN WCAG 2.1">
        <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>WCAG AA & AAA Compliance</span>
          </div>
          <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed space-y-1">
            <div>• Tiêu chuẩn AA: Tối thiểu <span className="font-bold text-emerald-600">4.5:1</span> cho văn bản thông thường.</div>
            <div>• Tiêu chuẩn AAA: Tối thiểu <span className="font-bold text-emerald-600">7.0:1</span> cho độ tương phản nâng cao.</div>
          </div>
        </div>
      </PanelSection>

      {/* Contextual Description Callout */}
      <PanelCallout
        title="Quy Chuẩn Khả Năng Tiếp Cận (A11y)"
        description={`Hệ thống đảm bảo mọi người dùng đều có thể thao tác thuận tiện:
• Vòng viền tiêu điểm (Focus Ring): Rõ nét, không bị che khuất khi duyệt phím Tab.
• Độ tương phản màu sắc được kiểm toán toán học tự động trước khi xuất Master XML.`}
      />
    </div>
  );
};
