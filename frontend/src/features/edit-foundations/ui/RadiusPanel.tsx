import React from 'react';
import { useDesignStore, SelectedToken } from '@/entities/design-token';
import { PanelSection, TokenSliderControl, PanelCallout } from '@/shared/ui';
import { Sparkles, FormInput, CreditCard, Info, MessageSquare, Layers } from 'lucide-react';

export const RadiusPanel: React.FC = () => {
  const { tokens, updateToken, selectedToken, setSelectedToken } = useDesignStore();
  const { radius, shadows } = tokens.foundations;
  const project = tokens.project;

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  // 4 Component-Based Radius & Shadow Groups
  const componentGroups = [
    {
      id: 'input',
      name: 'Inputs & Controls',
      desc: 'Ô nhập liệu (Username, Password, Search), Textarea, Select, Nút bấm',
      radiusVal: radius.md ?? 8,
      shadowVal: shadows.input ?? 'none',
      radiusPath: 'foundations.radius.md',
      shadowPath: 'foundations.shadows.input',
      icon: <FormInput className="w-4 h-4 text-blue-500 shrink-0" />,
      impact: ['Input Fields', 'Textarea', 'Select Dropdowns', 'Action Buttons'],
    },
    {
      id: 'card',
      name: 'Cards & Containers',
      desc: 'Thẻ Card thống kê, Bảng dữ liệu (Table container), Thẻ bảng giá',
      radiusVal: radius.lg ?? 16,
      shadowVal: shadows.card ?? shadows.md?.css ?? '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      radiusPath: 'foundations.radius.lg',
      shadowPath: 'foundations.shadows.card',
      icon: <CreditCard className="w-4 h-4 text-amber-500 shrink-0" />,
      impact: ['Dashboard Cards', 'Data Tables', 'Pricing Cards', 'Feature Cards'],
    },
    {
      id: 'infobox',
      name: 'Info Boxes & Badges',
      desc: 'Khung thông tin cá nhân, Hộp Callout giải thích, Badge trạng thái',
      radiusVal: radius.md ?? 12,
      shadowVal: shadows.infobox ?? 'none',
      radiusPath: 'foundations.radius.md',
      shadowPath: 'foundations.shadows.infobox',
      icon: <Info className="w-4 h-4 text-emerald-500 shrink-0" />,
      impact: ['Profile Card', 'Callout Box', 'Status Badges', 'Quota Card'],
    },
    {
      id: 'overlay',
      name: 'Overlays & Dialogs',
      desc: 'Hộp thoại Modal, Menu Dropdown nổi, Ngăn kéo Drawer, Tooltips',
      radiusVal: radius.xl ?? 20,
      shadowVal: shadows.modal ?? shadows.xl?.css ?? '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
      radiusPath: 'foundations.radius.xl',
      shadowPath: 'foundations.shadows.modal',
      icon: <MessageSquare className="w-4 h-4 text-purple-500 shrink-0" />,
      impact: ['Modal Dialogs', 'Dropdown Menus', 'Drawer Panels', 'Popovers'],
    },
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Concentric Radius Formula Toggle */}
      <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800/60 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-indigo-700 dark:text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Concentric Radius Formula</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={radius.concentricFormulaEnabled}
              onChange={(e) => updateToken('foundations.radius.concentricFormulaEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-8 h-4 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
        <div className="font-mono text-[11px] text-indigo-900 dark:text-indigo-200 bg-white/70 dark:bg-slate-900/70 p-2 rounded-lg border border-indigo-100 dark:border-indigo-900">
          R_inner = max(0, R_outer - Padding)
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400">
          Tự động co nhỏ bán kính góc trong để song song tuyệt đối với đường viền ngoài.
        </p>
      </div>

      {/* 1. COMPONENT-BASED RADIUS & SHADOW GROUPS */}
      <PanelSection title="1. QUY CHUẨN BO GÓC & ĐỔ BÓNG THEO NHÓM LINH KIỆN">
        <div className="space-y-2.5">
          {componentGroups.map((group) => {
            const isSelected = selectedToken.key === `component_radius.${group.id}`;
            return (
              <div
                key={group.id}
                onClick={() =>
                  handleSelectToken({
                    type: 'radius',
                    category: 'component_group',
                    key: `component_radius.${group.id}`,
                    path: group.radiusPath,
                    name: group.name,
                    value: group.radiusVal,
                    cssVar: `${project.prefix}radius-${group.id}`,
                    description: group.desc,
                    impactComponents: group.impact,
                    meta: {
                      groupId: group.id,
                      shadowVal: group.shadowVal,
                      shadowPath: group.shadowPath,
                      shadowCssVar: `${project.prefix}shadow-${group.id}`,
                    },
                    guidelines: {
                      do: ['Đồng bộ hóa bo góc và bóng đổ trên tất cả các thành phần cùng nhóm.'],
                      dont: ['Không kết hợp các thành phần cùng nhóm với bo góc lệch nhau quá 12px.'],
                    },
                  })
                }
                className={`p-3 rounded-xl border transition cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-semibold shadow-xs ring-1 ring-indigo-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700 hover:border-indigo-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                      {group.icon}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-xs">{group.name}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[170px]">{group.desc}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold text-xs bg-indigo-50 dark:bg-indigo-900/40 px-1.5 py-0.5 rounded">
                      {group.radiusVal}px
                    </span>
                  </div>
                </div>

                {/* Mini visual representation */}
                <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-200/50 dark:border-slate-700/50">
                  <span>Radius: {group.radiusVal}px</span>
                  <span className="truncate max-w-[120px] text-slate-500">
                    Shadow: {!group.shadowVal || group.shadowVal === 'none' ? 'Không bóng' : 'Đang bật'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </PanelSection>

      {/* Contextual Callout */}
      <PanelCallout
        title="Quy Chuẩn Bo Góc & Đổ Bóng Theo Nhóm Linh Kiện"
        description={`Hệ thống gom nhóm các vị trí có cùng bản chất hình học để đảm bảo tính nhất quán trên toàn bộ website:
• Inputs & Controls (8px): Bo góc gọn gàng cho trường nhập liệu, nút bấm và dropdown select.
• Cards & Containers (16px): Bo góc êm ái cho thẻ card thống kê và container bảng dữ liệu.
• Info Boxes & Badges (12px): Bo góc thanh lịch cho khung thông tin nhân sự và callout.
• Overlays & Dialogs (20px): Bo góc nổi bật kèm bóng đổ sâu cho Modal Popup và Drawer.`}
      />
    </div>
  );
};
