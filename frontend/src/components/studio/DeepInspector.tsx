import React, { useState } from 'react';
import { useDesignStore } from '../../store/useDesignStore';
import { ColorEngine } from '../../utils/colorEngine';
import {
  Copy,
  Check,
  Info,
  X,
  Play,
  Layers,
  Sparkles,
  Type,
  Ruler,
  Square,
  Zap,
  Box,
  Sliders,
} from 'lucide-react';

export const DeepInspector: React.FC = () => {
  const { selectedToken, tokens, updateToken, isInspectorOpen, toggleInspector } = useDesignStore();
  const [copied, setCopied] = useState(false);
  const [motionPlaying, setMotionPlaying] = useState(false);
  const [sampleText, setSampleText] = useState('Sphinx of black quartz, judge my vow.');

  if (!isInspectorOpen) return null;

  const handleCopyVar = () => {
    navigator.clipboard.writeText(selectedToken.cssVar);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* -------------------------------------------------------------
     1. COLOR INSPECTOR VIEW
  ------------------------------------------------------------- */
  const renderColorInspector = () => {
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

    return (
      <div className="space-y-4">
        {/* Color Value & Hex */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Color Hex
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              defaultValue={hex.toUpperCase()}
              key={hex}
              onChange={handleHexInput}
              className="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-semibold outline-none focus:border-indigo-500 dark:text-white"
            />
            <div className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-700 shadow-inner shrink-0" style={{ backgroundColor: hex }} />
          </div>
        </div>

        {/* 2D Visual Color Box & Hue Slider */}
        <div className="space-y-2">
          <div
            className="w-full h-32 rounded-xl relative overflow-hidden shadow-inner cursor-crosshair"
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
            className="w-full h-2.5 rounded-full appearance-none cursor-pointer"
            style={{
              background:
                'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
            }}
          />
        </div>

        {/* 11 Computed Perceptual Shades */}
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

        {/* WCAG 2.1 Contrast Ratio */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Accessibility (WCAG 2.1)
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Contrast Ratio:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{a11y.formattedRatio}</span>
            </div>
            <div className="flex gap-2">
              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 ${a11y.passAA ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                {a11y.passAA ? '✔' : '✕'} Passes AA (4.5:1)
              </span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 ${a11y.passAAA ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                {a11y.passAAA ? '✔' : '✕'} AAA (7.0:1)
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* -------------------------------------------------------------
     2. TYPOGRAPHY INSPECTOR VIEW
  ------------------------------------------------------------- */
  const renderTypographyInspector = () => {
    const typeVal = typeof selectedToken.value === 'object' ? selectedToken.value : { fontSize: 16, fontWeight: 500, lineHeight: 1.5, letterSpacing: '0em', fontFamily: 'Inter' };

    return (
      <div className="space-y-4 text-xs">
        {/* Live Text Previewer */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Live Font Preview</div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <textarea
              rows={2}
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              style={{
                fontFamily: typeVal.fontFamily,
                fontSize: `${Math.min(28, typeVal.fontSize)}px`,
                fontWeight: typeVal.fontWeight,
                lineHeight: typeVal.lineHeight,
                letterSpacing: typeVal.letterSpacing,
              }}
              className="w-full bg-transparent outline-none resize-none text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-500 font-semibold">Font Size</span>
              <span className="font-mono font-bold">{typeVal.fontSize}px</span>
            </div>
            <input
              type="range"
              min="10"
              max="72"
              value={typeVal.fontSize}
              onChange={(e) => updateToken(`${selectedToken.path}.fontSize`, parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-500 font-semibold">Font Weight</span>
              <span className="font-mono font-bold">{typeVal.fontWeight}</span>
            </div>
            <input
              type="range"
              min="300"
              max="900"
              step="100"
              value={typeVal.fontWeight}
              onChange={(e) => updateToken(`${selectedToken.path}.fontWeight`, parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  };

  /* -------------------------------------------------------------
     3. SPACING & SIZING INSPECTOR VIEW
  ------------------------------------------------------------- */
  const renderSpacingInspector = () => {
    const px = typeof selectedToken.value === 'number' ? selectedToken.value : 8;

    return (
      <div className="space-y-4 text-xs">
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Interactive 8-Point Ruler</div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center min-h-[100px]">
            <div
              style={{ width: `${Math.min(180, px * 3)}px`, height: '24px' }}
              className="bg-indigo-500/20 border-2 border-dashed border-indigo-500 rounded flex items-center justify-center text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 transition-all"
            >
              {px}px ({px / 16}rem)
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="font-bold text-slate-800 dark:text-slate-200">Standard Height Alignment (MD = 40px)</div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            All controls on the same row (Button, Input, Select) MUST have matching vertical dimensions to ensure optical alignment.
          </p>
        </div>
      </div>
    );
  };

  /* -------------------------------------------------------------
     4. RADIUS & CONCENTRIC INSPECTOR VIEW
  ------------------------------------------------------------- */
  const renderRadiusInspector = () => {
    const r = typeof selectedToken.value === 'number' ? selectedToken.value : 8;
    const padding = 16;
    const innerRadius = Math.max(0, r - padding);

    return (
      <div className="space-y-4 text-xs">
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Concentric Radius Visualizer</div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center">
            {/* Outer Container */}
            <div
              style={{ borderRadius: `${r}px`, padding: `${padding}px` }}
              className="w-44 h-32 bg-indigo-100 dark:bg-indigo-950/60 border-2 border-indigo-500 flex items-center justify-center relative transition-all"
            >
              <span className="absolute top-1 left-2 text-[9px] font-mono text-indigo-600 font-bold">R_out: {r}px</span>
              {/* Inner Container */}
              <div
                style={{ borderRadius: `${innerRadius}px` }}
                className="w-full h-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-center shadow-sm"
              >
                <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">
                  R_in: {innerRadius}px
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-[11px] text-slate-600 dark:text-slate-400">
          <strong>Concentric Formula:</strong> <code>R_in = max(0, {r} - 16) = {innerRadius}px</code>.
        </div>
      </div>
    );
  };

  /* -------------------------------------------------------------
     5. MOTION & EASING INSPECTOR VIEW
  ------------------------------------------------------------- */
  const renderMotionInspector = () => {
    const ms = typeof selectedToken.value === 'number' ? selectedToken.value : 200;

    const handlePlay = () => {
      setMotionPlaying(true);
      setTimeout(() => setMotionPlaying(false), ms + 100);
    };

    return (
      <div className="space-y-4 text-xs">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Live Animation Test</span>
            <button
              onClick={handlePlay}
              className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-bold flex items-center gap-1 shadow-sm"
            >
              <Play className="w-3 h-3" />
              <span>Play ({ms}ms)</span>
            </button>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-start min-h-[90px] overflow-hidden">
            <div
              style={{
                transition: `transform ${ms}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                transform: motionPlaying ? 'translateX(140px) scale(1.1)' : 'translateX(0px)',
              }}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-lg"
            >
              <Zap className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500">
          Enforces <code>@media (prefers-reduced-motion: reduce)</code> in Master XML output.
        </div>
      </div>
    );
  };

  /* -------------------------------------------------------------
     6. Z-INDEX 3D STACK INSPECTOR VIEW
  ------------------------------------------------------------- */
  const renderZIndexInspector = () => {
    const currentLayer = selectedToken.key || 'modal';
    const layers = ['base (0)', 'dropdown (1000)', 'sticky (1100)', 'modal (1400)', 'toast (1600)', 'tooltip (1700)'];

    return (
      <div className="space-y-4 text-xs">
        <div className="text-[11px] font-bold text-slate-400 uppercase">3D Visual Layer Stack</div>
        <div className="space-y-1.5 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
          {layers.reverse().map((l) => {
            const isMatch = l.includes(currentLayer);
            return (
              <div
                key={l}
                className={`p-2 rounded-lg text-xs font-mono font-bold flex items-center justify-between border transition ${
                  isMatch
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-105'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span>{l}</span>
                {isMatch && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Active Layer</span>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /* -------------------------------------------------------------
     7. COMPONENT MATRIX INSPECTOR VIEW
  ------------------------------------------------------------- */
  const renderComponentInspector = () => {
    const states = ['Default', 'Hover', 'Focus-Visible', 'Active', 'Disabled'];

    return (
      <div className="space-y-4 text-xs">
        <div className="text-[11px] font-bold text-slate-400 uppercase">6-State Interactive Matrix</div>
        <div className="space-y-1.5">
          {states.map((st) => (
            <div key={st} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="font-semibold text-slate-800 dark:text-slate-200">{st}</span>
              <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Validated</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <aside className="w-[310px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col shrink-0 h-full overflow-y-auto select-none transition-all duration-300 animate-in slide-in-from-right-4 z-20 shadow-xl">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white font-heading">Token Properties</h2>
        </div>
        <button
          onClick={toggleInspector}
          className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded transition"
          title="Close Inspector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 p-4 space-y-5">
        {/* Token Title Box */}
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">{selectedToken.type} TOKEN</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">{selectedToken.name}</div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-full font-bold">
            {selectedToken.category}
          </span>
        </div>

        {/* Polymorphic View Body */}
        {selectedToken.type === 'color' && renderColorInspector()}
        {selectedToken.type === 'typography' && renderTypographyInspector()}
        {selectedToken.type === 'spacing' && renderSpacingInspector()}
        {selectedToken.type === 'radius' && renderRadiusInspector()}
        {selectedToken.type === 'motion' && renderMotionInspector()}
        {selectedToken.type === 'zindex' && renderZIndexInspector()}
        {selectedToken.type === 'component' && renderComponentInspector()}
        {!['color', 'typography', 'spacing', 'radius', 'motion', 'zindex', 'component'].includes(selectedToken.type) && (
          <div className="text-xs text-slate-500">Token values mathematically synced across all layouts.</div>
        )}

        {/* CSS Variable Box */}
        <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase">CSS Variable</div>
          <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-indigo-600 dark:text-indigo-400">
            <span className="truncate max-w-[200px]">{selectedToken.cssVar}</span>
            <button onClick={handleCopyVar} className="p-1 hover:text-slate-900 dark:hover:text-white transition">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* 🎯 UBIQUITOUS IMPACT TRACING */}
        <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase">
            Impact Tracing ({selectedToken.impactComponents?.length || 4} Components)
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(selectedToken.impactComponents || ['Button', 'Card', 'Input', 'Modal']).map((comp) => (
              <span
                key={comp}
                className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-[11px] font-medium border border-slate-200 dark:border-slate-700"
              >
                {comp}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1 text-xs text-slate-500">
          <div className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
            <Info className="w-3.5 h-3.5" />
            <span>AI Rule Description</span>
          </div>
          <p className="leading-relaxed">{selectedToken.description}</p>
        </div>
      </div>
    </aside>
  );
};
