import React from 'react';
import { useDesignStore, SelectedToken } from '@/entities/design-token';
import { FormSelect, PanelSection } from '@/shared/ui';
import { Sparkles, SlidersHorizontal, Check } from 'lucide-react';

export const IconsPanel: React.FC = () => {
  const { tokens, updateToken, selectedToken, setSelectedToken } = useDesignStore();
  const { icons, colors } = tokens.foundations;
  const { brand, text } = colors;
  const project = tokens.project;

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  const colorModes = [
    {
      key: 'primary',
      label: 'Primary Brand',
      color: brand.primary,
      path: 'foundations.colors.brand.primary',
      name: 'Primary Brand Color',
      desc: 'Màu thương hiệu chính dùng cho icon active, nút bấm và badge.',
    },
    {
      key: 'muted',
      label: 'Muted Gray',
      color: text.secondary || '#64748B',
      path: 'foundations.colors.text.secondary',
      name: 'Muted Gray Color',
      desc: 'Màu xám trung tính dùng cho icon phụ, văn bản gợi ý và trạng thái bình thường.',
    },
    {
      key: 'custom',
      label: 'Custom Hex',
      color: icons.customColor || '#6366F1',
      path: 'foundations.icons.customColor',
      name: 'Custom Icon Hex Color',
      desc: 'Màu tùy chỉnh độc lập áp dụng riêng biệt cho hệ thống icon.',
    },
  ];

  const activeColor =
    icons.colorMode === 'primary'
      ? brand.primary
      : icons.colorMode === 'muted'
      ? text.secondary || '#64748B'
      : icons.customColor || '#6366F1';

  return (
    <div className="space-y-4 text-xs">
      {/* Icon Library Selector */}
      <FormSelect
        label="Icon Library Engine"
        value={icons.library}
        onChange={(e) => updateToken('foundations.icons.library', e.target.value)}
        options={[
          { value: 'lucide-react', label: 'lucide-react (Standard System)' },
          { value: 'heroicons', label: 'heroicons (Tailwind Icons)' },
          { value: 'tabler', label: 'tabler-icons (Vector SVG)' },
        ]}
      />

      {/* 1. COLOR MODE */}
      <PanelSection title="1. CHẾ ĐỘ MÀU BIỂU TƯỢNG (CLICK ĐỂ ĐỔI & CHỈNH MÀU Ở BẢNG PHẢI)">
        <div className="grid grid-cols-3 gap-1.5">
          {colorModes.map((mode) => {
            const isSelected = icons.colorMode === mode.key;
            return (
              <button
                key={mode.key}
                type="button"
                onClick={() => {
                  updateToken('foundations.icons.colorMode', mode.key);
                  handleSelectToken({
                    type: 'color',
                    category: 'icons',
                    key: mode.path,
                    path: mode.path,
                    name: mode.name,
                    value: mode.color,
                    cssVar: `${project.prefix}icon-color`,
                    description: mode.desc,
                    impactComponents: ['Icons', 'Buttons', 'Nav Items', 'Feature Cards'],
                    guidelines: {
                      do: ['Đảm bảo độ tương phản tối thiểu 4.5:1 (WCAG AA) so với màu nền.'],
                      dont: ['Không dùng màu quá nhạt làm chìm biểu tượng.'],
                    },
                  });
                }}
                className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1.5 cursor-pointer relative ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-bold shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div
                  className="w-5 h-5 rounded-full border border-black/10 shadow-xs transition-transform transform active:scale-95"
                  style={{ backgroundColor: mode.color }}
                />
                <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">{mode.label}</span>
                <span className="font-mono text-[9px] text-slate-500 uppercase">{mode.color}</span>
              </button>
            );
          })}
        </div>

        {/* Informative Hint */}
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 flex items-center gap-2 text-slate-600 dark:text-slate-400 text-[11px]">
          <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          <span>Bấm chọn bất kỳ chế độ nào ở trên để tinh chỉnh mã màu ở bảng <b>Token Properties</b> bên phải.</span>
        </div>
      </PanelSection>

      {/* 2. ICON SIZING TIERS */}
      <PanelSection title="2. THANG ĐO KÍCH THƯỚC ICON">
        <div className="grid grid-cols-2 gap-2">
          <FormSelect
            label="Stroke Width"
            value={icons.strokeWidth}
            onChange={(e) => updateToken('foundations.icons.strokeWidth', parseFloat(e.target.value))}
            options={[
              { value: 1.5, label: '1.5px (Refined)' },
              { value: 2.0, label: '2.0px (Bold Standard)' },
              { value: 2.5, label: '2.5px (Heavy)' },
            ]}
          />
          <FormSelect
            label="Default Size"
            value={icons.defaultSize}
            onChange={(e) => updateToken('foundations.icons.defaultSize', parseInt(e.target.value))}
            options={[
              { value: 16, label: '16px (Inline sm)' },
              { value: 20, label: '20px (Standard md)' },
              { value: 24, label: '24px (Navbar lg)' },
              { value: 32, label: '32px (Feature xl)' },
            ]}
          />
        </div>
      </PanelSection>

      {/* Optical Alignment Callout */}
      <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800/60 space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-indigo-700 dark:text-indigo-300">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Quy Tắc Gióng Hàng Thị Giác (Optical Alignment)</span>
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
          Màu Icon đang dùng:{' '}
          <span className="font-mono font-bold" style={{ color: activeColor }}>
            {activeColor}
          </span>
          . Mọi icon trong nút bấm và ô nhập liệu đều tự động căn giữa theo chiều cao chữ (Cap-height).
        </p>
      </div>

      {/* Contextual Description Callout */}
      <div className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5 bg-transparent mt-4">
        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          Quy Chuẩn Biểu Tượng Giao Diện
        </div>
        <p className="text-xs font-normal text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
          Hệ thống Icon đồng bộ nét vẽ và kích thước toán học:
          {'\n'}• Thư viện tiêu chuẩn Lucide Icons với hơn 1000+ biểu tượng vector sắc nét.
          {'\n'}• Độ dày nét (Stroke Width) cố định 2.0px đảm bảo tương phản rõ ràng trên màn hình Retina.
        </p>
      </div>
    </div>
  );
};
