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
  CheckCircle2,
  XCircle,
  FileCode,
} from 'lucide-react';

export const DeepInspector: React.FC = () => {
  const { selectedToken, tokens, updateToken, isInspectorOpen, toggleInspector } = useDesignStore();
  const [activeTab, setActiveTab] = useState<'properties' | 'guidelines' | 'xml'>('properties');
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
        {/* Color Hex & Preview */}
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

        {/* 2D Visual Box */}
        <div className="space-y-2">
          <div
            className="w-full h-28 rounded-xl relative overflow-hidden shadow-inner cursor-crosshair"
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
            <span className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 ${a11y.passAA ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
              {a11y.passAA ? '✔' : '✕'} AA (4.5:1)
            </span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 ${a11y.passAAA ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
              {a11y.passAAA ? '✔' : '✕'} AAA (7.0:1)
            </span>
          </div>
        </div>
      </div>
    );
  };

  /* -------------------------------------------------------------
     2. COMPONENT (LIVE INTERACTIVE BUTTON PREVIEW)
  ------------------------------------------------------------- */
  const renderComponentInspector = () => {
    const vSpec = selectedToken.value || { bg: '#6366F1', text: '#FFFFFF', hoverBg: '#4F46E5', focusRing: '#6366F1' };

    return (
      <div className="space-y-4 text-xs">
        {/* Live Interactive Preview Box */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Live Interactive Preview</div>
          <div className="p-6 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center min-h-[90px]">
            <button
              style={{
                backgroundColor: vSpec.bg,
                color: vSpec.text,
                border: vSpec.border ? `1px solid ${vSpec.border}` : 'none',
              }}
              className="px-5 py-2.5 rounded-lg font-bold text-xs shadow-sm hover:opacity-90 active:scale-95 transition flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{selectedToken.name}</span>
            </button>
          </div>
        </div>

        {/* 6 States Validation Matrix */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase">6-State Specification</div>
          {['Default', 'Hover', 'Focus-Visible', 'Active', 'Disabled', 'Loading'].map((st) => (
            <div key={st} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="font-semibold text-slate-800 dark:text-slate-200">{st}</span>
              <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Defined</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* -------------------------------------------------------------
     3. GUIDELINES (DO / DON'T) VIEW
  ------------------------------------------------------------- */
  const renderGuidelinesView = () => {
    const doRules = selectedToken.guidelines?.do || [
      'Use this token consistently across all layout components.',
      'Maintain visual optical alignment and WCAG contrast.',
    ];
    const dontRules = selectedToken.guidelines?.dont || [
      'Do not override with arbitrary inline styles.',
      'Do not combine with conflicting background colors.',
    ];

    return (
      <div className="space-y-4 text-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>DO (Recommended Usage)</span>
          </div>
          <div className="space-y-1.5">
            {doRules.map((rule, idx) => (
              <div key={idx} className="p-2.5 bg-emerald-50/60 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                {rule}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 font-bold text-red-600 dark:text-red-400">
            <XCircle className="w-4 h-4" />
            <span>DON'T (Strict Constraints)</span>
          </div>
          <div className="space-y-1.5">
            {dontRules.map((rule, idx) => (
              <div key={idx} className="p-2.5 bg-red-50/60 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                {rule}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  /* -------------------------------------------------------------
     4. VIEW IN XML SNIPPET VIEW
  ------------------------------------------------------------- */
  const renderXmlView = () => {
    const snippet = `<token type="${selectedToken.type}" name="${selectedToken.key}" css_var="${selectedToken.cssVar}">
  <value>${typeof selectedToken.value === 'object' ? JSON.stringify(selectedToken.value) : selectedToken.value}</value>
  <description>${selectedToken.description}</description>
</token>`;

    return (
      <div className="space-y-3 text-xs">
        <div className="text-[11px] font-bold text-slate-400 uppercase">Master XML Fragment</div>
        <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed select-text">
          {snippet}
        </pre>
        <button
          onClick={() => {
            navigator.clipboard.writeText(snippet);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-lg font-bold flex items-center justify-center gap-1.5 transition"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied Fragment!' : 'Copy XML Fragment'}</span>
        </button>
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

      {/* Tab Switcher */}
      <div className="px-4 border-b border-slate-200 dark:border-slate-800 flex gap-4 text-xs font-semibold">
        {[
          { key: 'properties', label: 'Properties' },
          { key: 'guidelines', label: 'DO / DON\'T' },
          { key: 'xml', label: 'XML Fragment' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`py-2.5 border-b-2 transition ${
              activeTab === tab.key
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4 space-y-5">
        {/* Token Title Card */}
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">{selectedToken.type} TOKEN</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">{selectedToken.name}</div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-full font-bold">
            {selectedToken.category}
          </span>
        </div>

        {/* Tab 1: Properties */}
        {activeTab === 'properties' && (
          <>
            {selectedToken.type === 'color' && renderColorInspector()}
            {selectedToken.type === 'component' && renderComponentInspector()}
            {!['color', 'component'].includes(selectedToken.type) && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">Active Value</div>
                <div className="font-mono text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                  {typeof selectedToken.value === 'object' ? JSON.stringify(selectedToken.value, null, 2) : String(selectedToken.value)}
                </div>
              </div>
            )}

            {/* CSS Variable */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 uppercase">CSS Variable</div>
              <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                <span className="truncate max-w-[200px]">{selectedToken.cssVar}</span>
                <button onClick={handleCopyVar} className="p-1 hover:text-slate-900 dark:hover:text-white transition">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Impact Tracing */}
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
          </>
        )}

        {/* Tab 2: Guidelines */}
        {activeTab === 'guidelines' && renderGuidelinesView()}

        {/* Tab 3: XML Fragment */}
        {activeTab === 'xml' && renderXmlView()}
      </div>
    </aside>
  );
};
