import React from 'react';
import { useDesignStore, SelectedToken } from '@/entities/design-token';
import { PanelSection, TokenSliderControl, PanelCallout } from '@/shared/ui';
import { Layers } from 'lucide-react';

export const LayersPanel: React.FC = () => {
  const { tokens, updateToken, selectedToken, setSelectedToken } = useDesignStore();
  const { zindex } = tokens.foundations;
  const project = tokens.project;

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  // 7 Z-Index Layers with Mini Wireframe Thumbnails
  const layersList = [
    {
      key: 'base',
      label: 'Base (0)',
      val: zindex.layers?.base ?? 0,
      desc: 'Mặt đất: Luồng nội dung tài liệu, bài viết và thẻ card thông thường.',
      thumbnail: (
        <div className="w-9 h-7 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-600 p-1 flex flex-col justify-between shrink-0 shadow-2xs">
          <div className="w-full h-1 bg-slate-300 dark:bg-slate-600 rounded-xs" />
          <div className="w-3/4 h-1 bg-slate-300 dark:bg-slate-600 rounded-xs" />
          <div className="w-1/2 h-1 bg-slate-300 dark:bg-slate-600 rounded-xs" />
        </div>
      ),
    },
    {
      key: 'dropdown',
      label: 'Dropdown (10)',
      val: zindex.layers?.dropdown ?? 10,
      desc: 'Thực đơn flyout tương tác thả xuống từ nút bấm và select.',
      thumbnail: (
        <div className="w-9 h-7 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-600 p-1 flex flex-col justify-between shrink-0 shadow-2xs relative">
          <div className="w-4 h-1.5 bg-indigo-400 rounded-xs" />
          <div className="w-7 h-3.5 bg-white dark:bg-slate-900 rounded border border-indigo-500 shadow-xs flex flex-col justify-center p-0.5 gap-0.5">
            <div className="w-full h-0.5 bg-indigo-300 dark:bg-indigo-600 rounded-xs" />
            <div className="w-2/3 h-0.5 bg-indigo-300 dark:bg-indigo-600 rounded-xs" />
          </div>
        </div>
      ),
    },
    {
      key: 'sticky',
      label: 'Sticky Header (20)',
      val: zindex.layers?.sticky ?? 20,
      desc: 'Thanh điều hướng cố định trên đỉnh trang khi cuộn nội dung.',
      thumbnail: (
        <div className="w-9 h-7 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-600 flex flex-col justify-between shrink-0 shadow-2xs overflow-hidden">
          <div className="w-full h-2 bg-orange-500 dark:bg-orange-600 shadow-xs" />
          <div className="p-1 space-y-1">
            <div className="w-full h-1 bg-slate-300 dark:bg-slate-700 rounded-xs" />
            <div className="w-2/3 h-1 bg-slate-300 dark:bg-slate-700 rounded-xs" />
          </div>
        </div>
      ),
    },
    {
      key: 'drawer',
      label: 'Drawer (30)',
      val: zindex.layers?.drawer ?? 30,
      desc: 'Ngăn kéo trượt cấu hình cạnh bên đè lên thanh header.',
      thumbnail: (
        <div className="w-9 h-7 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-600 flex justify-between shrink-0 shadow-2xs overflow-hidden relative">
          <div className="p-1 space-y-1 w-4">
            <div className="w-full h-1 bg-slate-300 dark:bg-slate-700 rounded-xs" />
          </div>
          <div className="w-4 h-full bg-purple-500 dark:bg-purple-600 shadow-md" />
        </div>
      ),
    },
    {
      key: 'modal',
      label: 'Modal Dialog (40)',
      val: zindex.layers?.modal ?? 40,
      desc: 'Hộp thoại popup phủ toàn màn hình bắt người dùng xác nhận.',
      thumbnail: (
        <div className="w-9 h-7 bg-slate-700 dark:bg-slate-950 rounded border border-slate-600 flex items-center justify-center shrink-0 shadow-2xs relative">
          <div className="w-6 h-4.5 bg-white dark:bg-slate-800 rounded border border-indigo-500 shadow-lg flex flex-col items-center justify-center p-0.5 gap-0.5">
            <div className="w-4 h-1 bg-indigo-500 rounded-xs" />
            <div className="w-3 h-0.5 bg-slate-300 rounded-xs" />
          </div>
        </div>
      ),
    },
    {
      key: 'toast',
      label: 'Toast (50)',
      val: zindex.layers?.toast ?? 50,
      desc: 'Thông báo nổi góc màn hình thông báo hoàn thành tác vụ.',
      thumbnail: (
        <div className="w-9 h-7 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-600 flex flex-col justify-end items-end p-0.5 shrink-0 shadow-2xs relative">
          <div className="w-6 h-2.5 bg-emerald-500 rounded-xs shadow-md border border-emerald-600 flex items-center px-1">
            <div className="w-3 h-0.5 bg-white rounded-xs" />
          </div>
        </div>
      ),
    },
    {
      key: 'tooltip',
      label: 'Tooltip (60)',
      val: zindex.layers?.tooltip ?? 60,
      desc: 'Bong bóng chú thích nhỏ luôn nằm trên cùng tuyệt đối.',
      thumbnail: (
        <div className="w-9 h-7 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center shrink-0 shadow-2xs relative p-0.5">
          <div className="w-5 h-2 bg-slate-900 dark:bg-white rounded-xs shadow-md flex items-center justify-center">
            <div className="w-3 h-0.5 bg-white dark:bg-slate-900 rounded-xs" />
          </div>
          <div className="w-0 h-0 border-l-[2px] border-l-transparent border-r-[2px] border-r-transparent border-t-[3px] border-t-slate-900 dark:border-t-white" />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Modern Light/Dark 7 Z-Index Stack Visualization */}
      <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
            <Layers className="w-4 h-4 text-indigo-500" />
            <span>7 Tầng Phân Lớp Không Gian (Z-Index)</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Bước nhảy 10</span>
        </div>

        <div className="space-y-1">
          {layersList
            .slice()
            .reverse()
            .map((layer, idx) => (
              <div
                key={layer.key}
                style={{ opacity: 1 - idx * 0.08 }}
                onClick={() =>
                  handleSelectToken({
                    type: 'zindex',
                    category: 'zindex',
                    key: `zindex.layers.${layer.key}`,
                    path: `foundations.zindex.layers.${layer.key}`,
                    name: layer.label,
                    value: layer.val,
                    cssVar: `${project.prefix}zindex-${layer.key}`,
                    description: layer.desc,
                    impactComponents: ['Modal', 'Drawer', 'Header', 'Tooltip', 'Dropdown', 'Toast'],
                  })
                }
                className={`p-1.5 px-3 rounded-lg border flex items-center justify-between text-[11px] cursor-pointer transition ${
                  selectedToken.key === `zindex.layers.${layer.key}`
                    ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{layer.label}</span>
                </div>
                <span className="font-mono font-bold">z: {layer.val}</span>
              </div>
            ))}
        </div>
      </div>

      {/* 1. LAYER VALUE EDITORS WITH MINI WIREFRAME THUMBNAILS */}
      <PanelSection title="1. THIẾT LẬP THỨ TỰ LỚP HIỂN THỊ">
        <div className="space-y-2.5">
          {layersList.map((layer) => (
            <TokenSliderControl
              key={layer.key}
              label={layer.label}
              value={layer.val}
              unit=""
              min={0}
              max={100}
              step={5}
              isSelected={selectedToken.key === `zindex.layers.${layer.key}`}
              description={layer.desc}
              icon={layer.thumbnail}
              onSelect={() =>
                handleSelectToken({
                  type: 'zindex',
                  category: 'zindex',
                  key: `zindex.layers.${layer.key}`,
                  path: `foundations.zindex.layers.${layer.key}`,
                  name: layer.label,
                  value: layer.val,
                  cssVar: `${project.prefix}zindex-${layer.key}`,
                  description: layer.desc,
                  impactComponents: ['Modal', 'Drawer', 'Header', 'Tooltip', 'Dropdown', 'Toast'],
                  guidelines: {
                    do: ['Tăng dần z-index theo bước nhảy cơ số 10 (0, 10, 20, 30, 40, 50, 60) để triệt tiêu hiện tượng che khuất.'],
                    dont: ['Tuyệt đối không gán z-index tùy tiện như 9999 hay 1000000.'],
                  },
                })
              }
              onChange={(val) => updateToken(`foundations.zindex.layers.${layer.key}`, val)}
            />
          ))}
        </div>
      </PanelSection>

      {/* Contextual Callout */}
      <PanelCallout
        title="Quy Chuẩn Phân Tầng Z-Index Chống Xung Đột"
        description={`Hệ thống 7 tầng Z-Index áp đặt bước nhảy cơ số 10 nhằm loại bỏ triệt để hiện tượng che khuất hoặc đè lớp sai thứ tự:
• Base (0): Mặt đất: Luồng nội dung tài liệu và thẻ card thông thường.
• Dropdown (10) ➔ Sticky Header (20) ➔ Drawer (30) ➔ Modal Dialog (40) ➔ Toast (50) ➔ Tooltip (60).`}
      />
    </div>
  );
};
