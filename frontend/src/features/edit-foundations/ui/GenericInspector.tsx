import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Layers,
  ShieldCheck,
  Play,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Tv,
  ChevronDown,
  X,
  ExternalLink,
  CheckCircle2,
  Sliders,
  MousePointer,
  Maximize2,
  FormInput,
  CreditCard,
  Info,
  MessageSquare,
} from 'lucide-react';
import { useDesignStore, ViewportSize } from '@/entities/design-token';
import { ConcentricRadiusDiagram, F12BoxModelDiagram } from '@/shared/ui';

export const GenericInspector: React.FC = () => {
  const { tokens, selectedToken, setSelectedToken, updateToken, setViewport, viewport } = useDesignStore();

  // State for Motion Sandbox in Pane 4
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // 1. COMPONENT-BASED RADIUS & SHADOW INSPECTOR
  if (selectedToken.type === 'radius' || selectedToken.type === 'shadow') {
    const meta = (selectedToken as any).meta || {};
    const radiusVal = typeof selectedToken.value === 'number' ? selectedToken.value : 16;
    
    // Resolve live shadow value dynamically from store
    let shadowCss = 'none';
    if (meta.shadowPath) {
      const keys = meta.shadowPath.split('.');
      let target: any = tokens;
      for (const k of keys) {
        if (target) target = target[k];
      }
      if (typeof target === 'string') shadowCss = target;
      else if (target?.css) shadowCss = target.css;
      else shadowCss = meta.shadowVal || 'none';
    } else {
      shadowCss = meta.shadowVal || (typeof selectedToken.value === 'string' ? selectedToken.value : '0 4px 6px -1px rgba(0,0,0,0.1)');
    }

    const shadowPresets = [
      { id: 'none', label: 'Không bóng', css: 'none' },
      { id: 'soft', label: 'Mềm mại', css: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.08)' },
      { id: 'medium', label: 'Tiêu chuẩn', css: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)' },
      { id: 'elevated', label: 'Nổi bật', css: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' },
    ];

    return (
      <div className="space-y-4 text-xs">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          <span>Component Radius & Shadow</span>
          <span className="font-mono text-[10px] text-indigo-500 lowercase">{radiusVal}px</span>
        </div>

        {/* Live Interactive Component Box Preview */}
        <div className="p-5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-3">
          <div
            style={{
              borderRadius: `${radiusVal}px`,
              boxShadow: shadowCss === 'none' ? 'none' : shadowCss,
            }}
            className="w-44 h-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-3 text-center transition-all"
          >
            <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">
              {selectedToken.name}
            </span>
            <span className="text-[10px] text-slate-400 font-mono mt-1">
              r: {radiusVal}px | s: {shadowCss === 'none' ? 'none' : 'active'}
            </span>
          </div>
        </div>

        {/* 1. Border Radius Dual Control (Slider + Manual Input) */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px]">
              Border Radius (Bo góc)
            </span>
            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-1.5 py-0.5 shadow-2xs">
              <input
                type="number"
                min={0}
                max={48}
                value={radiusVal}
                onChange={(e) => {
                  const raw = e.target.value;
                  const val = raw === '' ? 0 : parseInt(raw, 10) || 0;
                  setSelectedToken({ ...selectedToken, value: val });
                  updateToken(selectedToken.path, val);
                }}
                className="w-10 text-right font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-transparent outline-none text-xs"
              />
              <span className="text-[10px] text-slate-400 font-mono pl-0.5">px</span>
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={48}
            value={radiusVal}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10) || 0;
              setSelectedToken({ ...selectedToken, value: val });
              updateToken(selectedToken.path, val);
            }}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        {/* 2. Box Shadow Presets & Custom Control */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5">
          <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px]">
            Box Shadow (Mức độ đổ bóng)
          </span>

          <div className="grid grid-cols-2 gap-1.5">
            {shadowPresets.map((preset) => {
              const isActive = shadowCss === preset.css;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    if (meta.shadowPath) {
                      updateToken(meta.shadowPath, preset.css);
                    }
                    setSelectedToken({
                      ...selectedToken,
                      meta: { ...meta, shadowVal: preset.css },
                    });
                  }}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition cursor-pointer border ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs font-bold'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          <div className="space-y-1 pt-1">
            <span className="text-[10px] text-slate-400 font-mono">Custom Shadow CSS</span>
            <input
              type="text"
              value={shadowCss}
              onChange={(e) => {
                const newCss = e.target.value;
                if (meta.shadowPath) {
                  updateToken(meta.shadowPath, newCss);
                }
                setSelectedToken({
                  ...selectedToken,
                  meta: { ...meta, shadowVal: newCss },
                });
              }}
              className="w-full p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-[10px] text-slate-700 dark:text-slate-300 select-all"
            />
          </div>
        </div>

        {/* Concentric Radius Diagram */}
        <ConcentricRadiusDiagram
          radiusOuter={radiusVal}
          padding={tokens.foundations.spacing.padding?.card?.p ?? 16}
          isConcentricEnabled={tokens.foundations.radius.concentricFormulaEnabled}
        />
      </div>
    );
  }

  // 2. BREAKPOINT (MODERN RESPONSIVE VIEWPORT CARD)
  if (selectedToken.type === 'breakpoint') {
    const bpVal = typeof selectedToken.value === 'number' ? selectedToken.value : 640;
    const bpKey = selectedToken.key.replace('breakpoints.', '');

    const bpDeviceMap: Record<string, { label: string; icon: React.ReactNode; previewWidth: string; columns: string }> = {
      sm: { label: 'Mobile Device (Large)', icon: <Smartphone className="w-5 h-5 text-emerald-500" />, previewWidth: '45%', columns: '1 Cột dọc' },
      md: { label: 'Tablet Device (iPad)', icon: <Tablet className="w-5 h-5 text-blue-500" />, previewWidth: '60%', columns: '2 Cột lưới' },
      lg: { label: 'Laptop Display (Standard)', icon: <Laptop className="w-5 h-5 text-indigo-500" />, previewWidth: '78%', columns: '3 Cột + Sidebar' },
      xl: { label: 'Desktop Screen (High-Res)', icon: <Monitor className="w-5 h-5 text-purple-500" />, previewWidth: '90%', columns: '4 Cột đầy đủ' },
      '2xl': { label: 'Widescreen Display (4K)', icon: <Tv className="w-5 h-5 text-orange-500" />, previewWidth: '100%', columns: 'Mở rộng Full-bleed' },
    };

    const deviceInfo = bpDeviceMap[bpKey] || { label: 'Viewport Target', icon: <Monitor className="w-5 h-5 text-indigo-500" />, previewWidth: '70%', columns: 'Đa cột' };

    return (
      <div className="space-y-4 text-xs">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          <span>Responsive Viewport Inspector</span>
          <span className="font-mono text-[10px] text-indigo-500 lowercase">@media query</span>
        </div>

        {/* Modern Device Viewport Card */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs">
                {deviceInfo.icon}
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-xs">{selectedToken.name}</div>
                <div className="text-[10px] text-slate-500">{deviceInfo.label}</div>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 rounded font-mono text-[10px] font-bold">
              ≥ {bpVal}px
            </span>
          </div>

          {/* Interactive Screen Bezel Simulation */}
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-2">
            <div
              style={{ width: deviceInfo.previewWidth }}
              className="h-16 bg-indigo-50 dark:bg-indigo-950/60 border-2 border-dashed border-indigo-400 rounded-md flex flex-col items-center justify-between p-1.5 transition-all shadow-inner"
            >
              <div className="w-full h-2 bg-indigo-200 dark:bg-indigo-800 rounded-xs" />
              <div className="text-[10px] font-mono font-bold text-indigo-700 dark:text-indigo-300">
                {bpVal}px ({deviceInfo.columns})
              </div>
              <div className="flex gap-1 w-full">
                <div className="flex-1 h-1.5 bg-indigo-200 dark:bg-indigo-800 rounded-xs" />
                <div className="flex-1 h-1.5 bg-indigo-200 dark:bg-indigo-800 rounded-xs" />
              </div>
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              @media (min-width: {bpVal}px)
            </div>
          </div>

          {/* Technical Code Fragment */}
          <div className="p-2.5 bg-slate-900 text-slate-200 rounded-lg font-mono text-[10px] space-y-0.5 overflow-x-auto border border-slate-800 select-text">
            <div className="text-slate-400 font-semibold text-[9px]">// CSS Media Query (Mobile-First)</div>
            <div>
              <span className="text-purple-400">@media</span> (<span className="text-indigo-300">min-width</span>: <span className="text-emerald-400">{bpVal}px</span>) &#123;
            </div>
            <div className="pl-3 text-slate-300">
              .container &#123; <span className="text-blue-300">max-width</span>: <span className="text-amber-300">{bpVal}px</span>; &#125;
            </div>
            <div>&#125;</div>
          </div>

          {/* Action: Test in Canvas */}
          <button
            onClick={() => setViewport(bpKey as ViewportSize)}
            className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs text-xs"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Chuyển Live Canvas sang {bpKey.toUpperCase()}</span>
          </button>
        </div>
      </div>
    );
  }

  // 3. MOTION (INTERACTIVE MOTION SANDBOX DIRECTLY IN PROPERTIES)
  if (selectedToken.type === 'motion') {
    const rawVal = parseInt(String(selectedToken.value), 10) || tokens.foundations.motion.durations.normal;
    const easing = tokens.foundations.motion.easings.default;

    return (
      <div className="space-y-4 text-xs">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          <span>Live Motion Sandbox</span>
          <span className="font-mono text-[10px] text-indigo-500 lowercase">{rawVal}ms</span>
        </div>

        {/* Interactive Scenario 1: Button Hover Reaction */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px] flex items-center gap-1.5">
              <MousePointer className="w-3.5 h-3.5 text-indigo-500" />
              <span>1. Thử Nghiệm Nút Hover</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400">{rawVal}ms</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center">
            <button
              style={{
                transitionDuration: `${rawVal}ms`,
                transitionTimingFunction: easing,
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 hover:scale-105 hover:shadow-lg text-white rounded-lg font-bold text-xs shadow-xs cursor-pointer select-none"
            >
              Rê chuột vào tôi (Hover Me)
            </button>
          </div>
        </div>

        {/* Interactive Scenario 2: Dropdown Menu Trigger */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-purple-500" />
              <span>2. Thử Nghiệm Dropdown Menu</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400">{rawVal}ms</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 relative flex flex-col items-center">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-lg font-semibold text-xs flex items-center justify-between cursor-pointer"
            >
              <span>{dropdownOpen ? 'Đóng Menu' : 'Mở Dropdown Menu'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div
                style={{
                  transitionDuration: `${rawVal}ms`,
                  transitionTimingFunction: easing,
                }}
                className="w-full mt-1.5 p-1.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-md space-y-1 animate-in fade-in slide-in-from-top-2"
              >
                <div className="p-1 text-[11px] hover:bg-indigo-50 dark:hover:bg-slate-700 rounded cursor-pointer text-slate-700 dark:text-slate-300">
                  Tùy chọn 1: Lưu thay đổi
                </div>
                <div className="p-1 text-[11px] hover:bg-indigo-50 dark:hover:bg-slate-700 rounded cursor-pointer text-slate-700 dark:text-slate-300">
                  Tùy chọn 2: Sao chép mã
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Scenario 3: Modal Enter Trigger */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>3. Thử Nghiệm Modal Enter (Popup)</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400">{rawVal}ms</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center">
            <button
              onClick={() => setModalOpen(!modalOpen)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs cursor-pointer shadow-xs"
            >
              {modalOpen ? 'Đóng Modal' : 'Mở Modal Dialog'}
            </button>

            {modalOpen && (
              <div
                style={{
                  transitionDuration: `${rawVal}ms`,
                  transitionTimingFunction: easing,
                }}
                className="w-full mt-2 p-3 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-300 dark:border-indigo-700 rounded-lg text-center space-y-1.5 animate-in zoom-in-95 fade-in"
              >
                <div className="font-bold text-indigo-900 dark:text-indigo-200 text-xs">
                  Modal Enter Animation
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  Scale 0.95 ➔ 1.0 với thời lượng {rawVal}ms
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 4. Z-INDEX (3D STACKING LAYER CARD WITH DIRECT NUMBER INPUT & DETAILED EXPLANATION)
  if (selectedToken.type === 'zindex') {
    const currentZ = typeof selectedToken.value === 'number' ? selectedToken.value : parseInt(String(selectedToken.value), 10) || 0;
    const layerKey = selectedToken.key.replace('zindex.layers.', '');

    const layerExplanations: Record<string, { role: string; why: string; components: string }> = {
      base: {
        role: 'Mặt đất (Tầng 0)',
        why: 'Luồng tài liệu canvas và các thẻ card thông thường, nằm ở đáy để mọi lớp tương tác có thể nổi lên trên.',
        components: 'Nội dung bài viết, Thẻ Card, Biểu đồ thống kê, Bảng dữ liệu',
      },
      dropdown: {
        role: 'Menu Flyout Thả Xuống (Tầng 10)',
        why: 'Cần nổi hơn nội dung trang bài viết nhưng phải nằm dưới thanh Header cố định khi cuộn trang.',
        components: 'Dropdown Select, Autocomplete, Action Menu, Bộ lọc ngày',
      },
      sticky: {
        role: 'Thanh Header Cố Định (Tầng 20)',
        why: 'Ghim trên cùng màn hình khi cuộn, phải che đè lên nội dung và dropdown của trang khi người dùng cuộn xuống.',
        components: 'DemoNavbar, Fixed Topbar, Sub-navigation Bar',
      },
      drawer: {
        role: 'Ngăn Kéo Cạnh Bên (Tầng 30)',
        why: 'Trượt từ cạnh màn hình ra để cấu hình, cần đè lên cả thanh Header và nội dung trang.',
        components: 'SubConfigDrawer, Giỏ hàng trượt, Sidebar Mobile Drawer',
      },
      modal: {
        role: 'Hộp Thoại Popup (Tầng 40)',
        why: 'Phủ toàn màn hình bắt người dùng tập trung, phải đè lên Drawer và Header.',
        components: 'Modal Dialog, Popup xác nhận xóa, Khung xem ảnh Lightbox',
      },
      toast: {
        role: 'Thông Báo Nổi (Tầng 50)',
        why: 'Thông báo hoàn thành tác vụ ở góc màn hình, kể cả khi đang mở Modal vẫn phải nhìn thấy.',
        components: 'Toast Notification, Alert Snackbar, Trạng thái đồng bộ',
      },
      tooltip: {
        role: 'Bong Bóng Chú Thích (Tầng 60)',
        why: 'Gợi ý vi mô khi rê chuột, luôn nằm ở tầng khí quyển cao nhất để không bao giờ bị bất kỳ thứ gì che khuất.',
        components: 'Tooltip Hover, Hint badge, Help popover',
      },
    };

    const info = layerExplanations[layerKey] || {
      role: 'Z-Index Layer',
      why: 'Kiểm soát thứ tự xếp chồng trong không gian 3D.',
      components: 'Các linh kiện giao diện tương ứng',
    };

    const layers = [
      { key: 'base', name: 'Base Plane', z: tokens.foundations.zindex.layers?.base ?? 0 },
      { key: 'dropdown', name: 'Dropdown', z: tokens.foundations.zindex.layers?.dropdown ?? 10 },
      { key: 'sticky', name: 'Sticky Header', z: tokens.foundations.zindex.layers?.sticky ?? 20 },
      { key: 'drawer', name: 'Drawer Sidebar', z: tokens.foundations.zindex.layers?.drawer ?? 30 },
      { key: 'modal', name: 'Modal Dialog', z: tokens.foundations.zindex.layers?.modal ?? 40 },
      { key: 'toast', name: 'Toast Notification', z: tokens.foundations.zindex.layers?.toast ?? 50 },
      { key: 'tooltip', name: 'Tooltip Bubble', z: tokens.foundations.zindex.layers?.tooltip ?? 60 },
    ];

    return (
      <div className="space-y-4 text-xs">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          <span>3D Stacking Layer Inspector</span>
          <span className="font-mono text-[10px] text-indigo-500 lowercase">z-index: {currentZ}</span>
        </div>

        {/* 1. Value Customizer (Direct Number Input + Range Slider) */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-700 dark:text-slate-300 text-xs">
              Tùy chỉnh Z-Index cho {selectedToken.name}
            </span>
            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-1.5 py-0.5 shadow-2xs">
              <input
                type="number"
                min={0}
                max={2000}
                value={currentZ}
                onChange={(e) => {
                  const raw = e.target.value;
                  const val = raw === '' ? 0 : parseInt(raw, 10) || 0;
                  setSelectedToken({ ...selectedToken, value: val });
                  updateToken(selectedToken.path, val);
                }}
                className="w-12 text-right font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-transparent outline-none text-xs"
              />
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={currentZ}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10) || 0;
              setSelectedToken({ ...selectedToken, value: val });
              updateToken(selectedToken.path, val);
            }}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        {/* 2. 3D Layer Stacking Visualizer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px] block">
            Vị Trí Trong Không Gian 7 Tầng:
          </span>

          <div className="space-y-1.5">
            {layers
              .slice()
              .reverse()
              .map((layer) => {
                const isCurrent = layer.key === layerKey || layer.z === currentZ;
                return (
                  <div
                    key={layer.key}
                    onClick={() => {
                      setSelectedToken({
                        ...selectedToken,
                        key: `zindex.layers.${layer.key}`,
                        path: `foundations.zindex.layers.${layer.key}`,
                        name: layer.name,
                        value: layer.z,
                        cssVar: `--ui-zindex-${layer.key}`,
                      });
                    }}
                    className={`p-2 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                      isCurrent
                        ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-md ring-2 ring-indigo-500/30'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Layers className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-slate-400'}`} />
                      <span className="text-xs">{layer.name}</span>
                    </div>
                    <span className={`font-mono text-[11px] ${isCurrent ? 'text-white font-bold' : 'text-slate-400'}`}>
                      z: {layer.z}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* 3. Detailed Technical Explanation & Impact */}
        <div className="p-3.5 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800/60 space-y-2 select-text">
          <div className="font-bold text-indigo-900 dark:text-indigo-200 text-xs flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>Giải Thích: {info.role}</span>
          </div>
          <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
            {info.why}
          </p>
          <div className="pt-1.5 border-t border-indigo-200/60 dark:border-indigo-800/60 text-[10px]">
            <span className="font-bold text-slate-500 dark:text-slate-400">Linh kiện đang áp dụng: </span>
            <span className="text-indigo-700 dark:text-indigo-300 font-medium">{info.components}</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. ACCESSIBILITY (MODERN FOCUS RING & WCAG CARD)
  if (selectedToken.type === 'accessibility') {
    const focusWidth = tokens.foundations.accessibility.focusRingWidth ?? 2;
    const focusOffset = tokens.foundations.accessibility.focusRingOffset ?? 2;
    const focusColor = tokens.foundations.accessibility.focusRingColor ?? '#FF4F00';

    return (
      <div className="space-y-4 text-xs">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          <span>Focus Ring & A11y Inspector</span>
          <span className="font-mono text-[10px] text-indigo-500 lowercase">outline</span>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3 text-center">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-3">
            <button
              style={{
                outline: `${focusWidth}px solid ${focusColor}`,
                outlineOffset: `${focusOffset}px`,
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-xs shadow-xs"
            >
              Interactive Focus Target
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="text-[10px] text-slate-400">Ring Width</div>
              <div className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-xs">{focusWidth}px</div>
            </div>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="text-[10px] text-slate-400">Ring Offset</div>
              <div className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-xs">{focusOffset}px</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 6. ICONS
  if (selectedToken.type === 'icon') {
    const icons = tokens.foundations.icons;
    const activeColor =
      icons.colorMode === 'primary'
        ? tokens.foundations.colors.brand.primary
        : icons.colorMode === 'muted'
        ? '#64748B'
        : icons.customColor || '#6366F1';

    return (
      <div className="space-y-4 text-xs">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          <span>Lucide Icon Preview</span>
          <span className="font-mono text-[10px] text-indigo-500 lowercase">{icons.defaultSize}px</span>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-4">
          <div
            style={{ color: activeColor }}
            className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs transition-all"
          >
            <Sparkles style={{ width: `${icons.defaultSize}px`, height: `${icons.defaultSize}px`, strokeWidth: icons.strokeWidth }} />
          </div>
          <div
            style={{ color: activeColor }}
            className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs transition-all"
          >
            <Zap style={{ width: `${icons.defaultSize}px`, height: `${icons.defaultSize}px`, strokeWidth: icons.strokeWidth }} />
          </div>
          <div
            style={{ color: activeColor }}
            className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs transition-all"
          >
            <Layers style={{ width: `${icons.defaultSize}px`, height: `${icons.defaultSize}px`, strokeWidth: icons.strokeWidth }} />
          </div>
        </div>
      </div>
    );
  }

  // 7. COMPONENT (e.g. Buttons, Forms, Overlays, Card)
  if (selectedToken.type === 'component') {
    return (
      <div className="space-y-4 text-xs">
        {/* F12 Box Model for Components */}
        <F12BoxModelDiagram
          componentName={selectedToken.name}
          paddingX={tokens.foundations.spacing.padding?.card?.p ?? 16}
          paddingY={tokens.foundations.spacing.padding?.card?.p ?? 12}
          marginX={0}
          marginY={0}
          borderWidth={1}
          contentWidth="auto"
          contentHeight="36px"
        />

        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            State Machine Compliance
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {['Default', 'Hover', 'Focus-Visible', 'Active', 'Disabled'].map((st) => (
              <div key={st} className="p-2 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">{st}</span>
                <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                  Compliant
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Fallback generic property visualizer
  return (
    <div className="space-y-3 text-xs">
      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
        <div className="text-slate-500 font-semibold text-[11px]">Token Value</div>
        <pre className="p-2 bg-white dark:bg-slate-900 rounded font-mono text-[11px] overflow-x-auto text-slate-800 dark:text-slate-200">
          {typeof selectedToken.value === 'object'
            ? JSON.stringify(selectedToken.value, null, 2)
            : String(selectedToken.value)}
        </pre>
      </div>
    </div>
  );
};
