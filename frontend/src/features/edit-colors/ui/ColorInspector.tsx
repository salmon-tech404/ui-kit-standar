import React from 'react';
import { useDesignStore } from '@/entities/design-token';
import { ColorEngine } from '@/shared/lib';

export const ColorInspector: React.FC = () => {
  const { tokens, selectedToken, updateToken } = useDesignStore();

  const getTokenValue = (path?: string) => {
    if (!path) return selectedToken?.value || '#6366F1';
    const parts = path.split('.');
    let curr: any = tokens;
    for (const p of parts) {
      if (curr === undefined || curr === null) return selectedToken?.value || '#6366F1';
      curr = curr[p];
    }
    return typeof curr === 'string' ? curr : selectedToken?.value || '#6366F1';
  };

  const hex = getTokenValue(selectedToken?.path);
  const bgHex = tokens.foundations.colors.surface.background || '#FFFFFF';
  const shades = ColorEngine.generateShades(hex);
  const contrastRatio = ColorEngine.getContrastRatio(hex, bgHex);
  const a11y = ColorEngine.evaluateA11y(contrastRatio);
  const hsv = ColorEngine.hexToHsv(hex);

  const handlePointerColor = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    const s = Math.round((x / rect.width) * 100);
    const v = Math.round((1 - y / rect.height) * 100);
    const newHex = ColorEngine.hsvToHex(hsv.h, s, v);
    updateToken(selectedToken.path, newHex);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    handlePointerColor(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons === 1) {
      handlePointerColor(e);
    }
  };

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = parseInt(e.target.value);
    const newHex = ColorEngine.hsvToHex(newHue, hsv.s, hsv.v);
    updateToken(selectedToken.path, newHex);
  };

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.trim();
    if (!val.startsWith('#')) val = '#' + val;
    if (/^#[0-9A-F]{6}$/i.test(val)) {
      updateToken(selectedToken.path, val);
    }
  };

  return (
    <div className="space-y-4">
      {/* Color Hex & Preview */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Color Hex
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={hex.toUpperCase()}
            onChange={handleHexInput}
            className="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-semibold outline-none focus:border-indigo-500 dark:text-white"
          />
          <div
            className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-700 shadow-inner shrink-0"
            style={{ backgroundColor: hex }}
          />
        </div>
      </div>

      {/* 2D Visual Color Canvas */}
      <div className="space-y-2">
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          className="w-full h-28 rounded-xl relative overflow-hidden shadow-inner cursor-pointer touch-none select-none border border-slate-200 dark:border-slate-700"
          style={{
            background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hsv.h}, 100%, 50%))`,
          }}
        >
          <div
            className="w-4 h-4 rounded-full border-2 border-white shadow-lg ring-1 ring-black/40 absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-none"
            style={{
              left: `clamp(8px, ${hsv.s}%, calc(100% - 8px))`,
              top: `clamp(8px, ${100 - hsv.v}%, calc(100% - 8px))`,
            }}
          />
        </div>

        <input
          type="range"
          min="0"
          max="360"
          value={hsv.h}
          onChange={handleHueChange}
          className="w-full h-2.5 rounded-full appearance-none cursor-pointer"
          style={{
            background:
              'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
          }}
        />
      </div>

      {/* 11 Computed Shades */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          11 Computed Shades (50 - 950)
        </div>
        <div className="flex h-7 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
          {Object.entries(shades).map(([k, val]) => (
            <div
              key={k}
              onClick={() => updateToken(selectedToken.path, val)}
              className="flex-1 cursor-pointer hover:scale-y-125 transition-transform relative"
              style={{ backgroundColor: val }}
              title={`Shade ${k}: ${val}`}
            />
          ))}
        </div>
      </div>

      {/* Contrast Ratio */}
      <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">Contrast vs Background:</span>
          <span className="font-mono font-bold text-slate-900 dark:text-white">{a11y.formattedRatio}</span>
        </div>
        <div className="flex gap-2">
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 ${
              a11y.passAA
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                : 'bg-red-50 text-red-600 border border-red-200'
            }`}
          >
            {a11y.passAA ? '✔' : '✕'} AA (4.5:1)
          </span>
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 ${
              a11y.passAAA
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                : 'bg-slate-100 text-slate-400 border border-slate-200'
            }`}
          >
            {a11y.passAAA ? '✔' : '✕'} AAA (7.0:1)
          </span>
        </div>
      </div>
    </div>
  );
};
