import React from 'react';
import { useDesignStore, SelectedToken, ViewportSize } from '@/entities/design-token';
import { PanelSection, TokenSliderControl, PanelCallout } from '@/shared/ui';
import { Monitor, Smartphone, Tablet, Laptop, Tv, Code2 } from 'lucide-react';

export const BreakpointsPanel: React.FC = () => {
  const { tokens, updateToken, setViewport, viewport, selectedToken, setSelectedToken } = useDesignStore();
  const { breakpoints } = tokens.foundations;
  const project = tokens.project;

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  const bpIcons: Record<string, React.ReactNode> = {
    sm: <Smartphone className="w-4 h-4 text-emerald-500 shrink-0" />,
    md: <Tablet className="w-4 h-4 text-blue-500 shrink-0" />,
    lg: <Laptop className="w-4 h-4 text-indigo-500 shrink-0" />,
    xl: <Monitor className="w-4 h-4 text-purple-500 shrink-0" />,
    '2xl': <Tv className="w-4 h-4 text-orange-500 shrink-0" />,
  };

  const bpList = [
    { key: 'sm', label: 'sm (Mobile 640px)', min: breakpoints.sm, behavior: breakpoints.behaviors.sm, minRange: 320, maxRange: 767 },
    { key: 'md', label: 'md (Tablet 768px)', min: breakpoints.md, behavior: breakpoints.behaviors.md, minRange: 768, maxRange: 1023 },
    { key: 'lg', label: 'lg (Laptop 1024px)', min: breakpoints.lg, behavior: breakpoints.behaviors.lg, minRange: 1024, maxRange: 1279 },
    { key: 'xl', label: 'xl (Desktop 1280px)', min: breakpoints.xl, behavior: breakpoints.behaviors.xl, minRange: 1280, maxRange: 1535 },
    { key: '2xl', label: '2xl (Widescreen 1536px)', min: breakpoints['2xl'], behavior: breakpoints.behaviors['2xl'], minRange: 1536, maxRange: 2560 },
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* 1. BREAKPOINT LIST WITH 2-WAY BINDING */}
      <PanelSection title="1. ĐIỂM NGẮT MÀN HÌNH CHUẨN">
        <div className="space-y-2.5">
          {bpList.map((bp) => (
            <TokenSliderControl
              key={bp.key}
              label={bp.label}
              value={bp.min}
              min={bp.minRange}
              max={bp.maxRange}
              isSelected={selectedToken.key === `breakpoints.${bp.key}`}
              description={bp.behavior}
              icon={bpIcons[bp.key]}
              actionSlot={
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewport(bp.key as ViewportSize);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                    viewport === bp.key
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-emerald-500 hover:text-white'
                  }`}
                  title={`Chuyển Live Canvas sang ${bp.key}`}
                >
                  {viewport === bp.key ? 'Active' : 'Test'}
                </button>
              }
              onSelect={() =>
                handleSelectToken({
                  type: 'breakpoint',
                  category: 'breakpoints',
                  key: `breakpoints.${bp.key}`,
                  path: `foundations.breakpoints.${bp.key}`,
                  name: bp.label,
                  value: bp.min,
                  cssVar: `${project.prefix}breakpoint-${bp.key}`,
                  description: bp.behavior,
                  impactComponents: ['Grid System', 'Navbar Drawer', 'Card Columns', 'Spacing Layout'],
                  guidelines: {
                    do: [`Mục tiêu viewport tối thiểu ${bp.min}px với @media (min-width: ${bp.min}px).`],
                    dont: ['Không khai báo điểm ngắt trung gian tùy tiện như 843px.'],
                  },
                })
              }
              onChange={(val) => updateToken(`foundations.breakpoints.${bp.key}`, val)}
            />
          ))}
        </div>
      </PanelSection>

      {/* Technical & Accessible Contextual Callout */}
      <PanelCallout
        title="Bản Chất Kỹ Thuật Của Điểm Ngắt (Responsive Breakpoints)"
        description={`Breakpoint là 'Vạch mốc chiều rộng Viewport' (tính bằng px). Khi kích thước màn hình vượt qua vạch mốc này, CSS @media (min-width: ...px) sẽ kích hoạt để tự động biến đổi bố cục:
• Mặc định (< 640px): Bố cục 1 cột (Mobile-First), thanh menu thu gọn vào icon Drawer ☰.
• md (≥ 768px): Màn hình Tablet ➔ Bố cục mở rộng thành 2 cột.
• lg (≥ 1024px): Màn hình Laptop ➔ Mở rộng thành 3 cột và hiển thị cố định thanh Sidebar.
• xl & 2xl (≥ 1280px): Màn hình Desktop / 4K ➔ Bố cục 4 cột rộng rãi tối đa.`}
      />
    </div>
  );
};
