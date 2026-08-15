import React, { useState } from 'react';
import { useDesignStore } from '../../store/useDesignStore';
import { ColorEngine } from '../../utils/colorEngine';
import { Copy, Check, Info, X } from 'lucide-react';

export const DeepInspector: React.FC = () => {
  const { selectedToken, tokens, updateToken, isInspectorOpen, toggleInspector } = useDesignStore();
  const [copied, setCopied] = useState(false);

  if (!isInspectorOpen) {
    return null;
  }

  const hex = selectedToken.value || '#6366F1';
  const bgHex = tokens.foundations.colors.surface.background || '#FFFFFF';
  const shades = ColorEngine.generateShades(hex);
  const contrastRatio = ColorEngine.getContrastRatio(hex, bgHex);
  const a11y = ColorEngine.evaluateA11y(contrastRatio);
  const hsl = ColorEngine.hexToHsl(hex);

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = parseInt(e.target.value);
    const newHex = ColorEngine.hslToHex(newHue, hsl.s, hsl.l);
    updateToken(selectedToken.path, newHex);
  };

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.trim();
    if (!val.startsWith('#')) val = '#' + val;
    if (/^#[0-9A-F]{6}$/i.test(val)) {
      updateToken(selectedToken.path, val);
    }
  };

  const handleCopyVar = () => {
    navigator.clipboard.writeText(selectedToken.cssVar);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="w-[300px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col shrink-0 h-full overflow-y-auto select-none transition-all duration-300 animate-in slide-in-from-right-4 z-20 shadow-xl">
      {/* Header with Close */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white font-heading">Token Properties</h2>
        <button
          onClick={toggleInspector}
          className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded transition"
          title="Đóng Inspector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 p-4 space-y-5">
        {/* 1. Selected Token Header */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Selected Token
          </div>
          <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg border border-black/10 shadow-inner" style={{ backgroundColor: hex }} />
              <span className="text-xs font-bold text-slate-800 dark:text-white">{selectedToken.name}</span>
            </div>
            <span className="font-mono text-xs text-slate-500 font-semibold">{hex.toUpperCase()}</span>
          </div>
        </div>

        {/* 2. Color Value & Input */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Color Value
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              defaultValue={hex.toUpperCase()}
              key={hex}
              onChange={handleHexInput}
              className="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-semibold outline-none focus:border-indigo-500 dark:text-white"
            />
            <span className="text-xs font-mono text-slate-500 px-2 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              100%
            </span>
            <div className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-700 shadow-inner" style={{ backgroundColor: hex }} />
          </div>
        </div>

        {/* 3. 2D Visual Color Box & Hue Slider */}
        <div className="space-y-2">
          <div
            className="w-full h-36 rounded-xl relative overflow-hidden shadow-inner cursor-crosshair"
            style={{
              background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hsl.h}, 100%, 50%))`,
            }}
          >
            <div
              className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-md absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${hsl.s}%`, top: `${100 - hsl.l}%` }}
            />
          </div>

          <input
            type="range"
            min="0"
            max="360"
            value={hsl.h}
            onChange={handleHueChange}
            className="w-full h-3 rounded-full appearance-none cursor-pointer"
            style={{
              background:
                'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
            }}
          />
        </div>

        {/* 4. 11 Perceptual Shades */}
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
          <div className="flex justify-between text-[10px] text-slate-400 px-1">
            <span>50</span>
            <span>200</span>
            <span>500</span>
            <span>800</span>
            <span>950</span>
          </div>
        </div>

        {/* 5. Usage in Components */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Usage
          </div>
          <div className="text-xs text-slate-500 mb-1">Applied in 24 component blueprints</div>
          <div className="flex flex-wrap gap-1.5">
            {['Button', 'Link', 'Badge', 'Tabs', 'Focus Ring', 'Hero CTA'].map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded text-[11px] font-medium border border-slate-200 dark:border-slate-700">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 6. WCAG 2.1 Contrast Meter */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Accessibility (WCAG 2.1)
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Contrast Ratio</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{a11y.formattedRatio}</span>
            </div>
            <div className="flex gap-2">
              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 ${a11y.passAA ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                {a11y.passAA ? '✔' : '✕'} Passes AA
              </span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 ${a11y.passAAA ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                {a11y.passAAA ? '✔' : '✕'} Passes AAA
              </span>
            </div>
          </div>
        </div>

        {/* 7. CSS Variable Snippet */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            CSS Variable
          </div>
          <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-indigo-600 dark:text-indigo-400">
            <span>{selectedToken.cssVar}</span>
            <button onClick={handleCopyVar} className="p-1 hover:text-slate-900 dark:hover:text-white transition">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* 8. Semantic Description */}
        <div className="space-y-1 text-xs text-slate-500">
          <div className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
            <Info className="w-3.5 h-3.5" />
            <span>Description</span>
          </div>
          <p className="leading-relaxed">{selectedToken.description}</p>
        </div>
      </div>
    </aside>
  );
};
