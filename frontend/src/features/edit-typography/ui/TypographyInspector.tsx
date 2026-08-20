import React from 'react';
import { useDesignStore, TypographyToken } from '@/entities/design-token';

export const TypographyInspector: React.FC = () => {
  const { tokens, selectedToken, setSelectedToken, updateToken } = useDesignStore();

  const key = selectedToken.key;
  const currentStyle: TypographyToken = (tokens.foundations.typography.styles as any)[key] || {
    fontFamily: 'Inter',
    fontSize: 16,
    fontSizeMobile: 14,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0em',
    semanticLevel: 'body',
  };

  const handleUpdateTypo = (field: keyof TypographyToken, val: any) => {
    const updated = { ...currentStyle, [field]: val };
    setSelectedToken({ ...selectedToken, value: updated });
    updateToken(`foundations.typography.styles.${key}`, updated);
  };

  return (
    <div className="space-y-4">
      {/* Live Scaled Typography Sample Preview */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Typographic Preview
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 min-h-[80px] flex items-center justify-center text-center overflow-hidden">
          <div
            style={{
              fontFamily: currentStyle.fontFamily || tokens.foundations.typography.fontHeading,
              fontSize: `${Math.min(currentStyle.fontSize, 40)}px`,
              fontWeight: currentStyle.fontWeight,
              lineHeight: currentStyle.lineHeight,
              letterSpacing: currentStyle.letterSpacing,
              color: 'var(--ui-color-text-primary, #0F172A)',
            }}
            className="transition-all select-text font-heading truncate max-w-full"
          >
            Aa Quick Brown Fox
          </div>
        </div>
        {currentStyle.fontSize > 40 && (
          <div className="text-[10px] text-slate-400 text-center font-mono">
            Preview scaled to 40px (Actual CSS: {currentStyle.fontSize}px)
          </div>
        )}
      </div>

      {/* Font Sizes: Desktop & Mobile Inputs */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Desktop (px)</label>
            <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold text-xs">{currentStyle.fontSize}px</span>
          </div>
          <input
            type="number"
            min="8"
            max="256"
            value={currentStyle.fontSize}
            onChange={(e) => handleUpdateTypo('fontSize', parseInt(e.target.value) || 16)}
            className="w-full p-1.5 text-xs font-mono font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-slate-900 dark:text-white text-center focus:border-indigo-500"
          />
        </div>

        <div className="space-y-1.5 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Mobile (px)</label>
            <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold text-xs">
              {currentStyle.fontSizeMobile || currentStyle.fontSize}px
            </span>
          </div>
          <input
            type="number"
            min="8"
            max="160"
            value={currentStyle.fontSizeMobile || currentStyle.fontSize}
            onChange={(e) => handleUpdateTypo('fontSizeMobile', parseInt(e.target.value) || 14)}
            className="w-full p-1.5 text-xs font-mono font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-slate-900 dark:text-white text-center focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Font Weight & Line Height */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">Font Weight</label>
          <select
            value={currentStyle.fontWeight}
            onChange={(e) => handleUpdateTypo('fontWeight', parseInt(e.target.value))}
            className="w-full p-1.5 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none cursor-pointer"
          >
            <option value="400">400 (Regular)</option>
            <option value="500">500 (Medium)</option>
            <option value="600">600 (SemiBold)</option>
            <option value="700">700 (Bold)</option>
            <option value="800">800 (ExtraBold)</option>
            <option value="900">900 (Black)</option>
          </select>
        </div>

        <div className="space-y-1.5 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Line Height</label>
            <span className="font-mono text-xs text-slate-500 font-semibold">{currentStyle.lineHeight}</span>
          </div>
          <input
            type="number"
            step="0.05"
            min="0.8"
            max="2.5"
            value={currentStyle.lineHeight}
            onChange={(e) => handleUpdateTypo('lineHeight', parseFloat(e.target.value) || 1.2)}
            className="w-full p-1.5 text-xs font-mono font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-slate-900 dark:text-white text-center focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Letter Spacing */}
      <div className="space-y-1.5 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center">
          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Letter Spacing</label>
          <span className="font-mono text-xs text-slate-500">{currentStyle.letterSpacing}</span>
        </div>
        <div className="flex gap-1.5">
          {['-0.04em', '-0.03em', '-0.02em', '0em', '0.02em', '0.05em'].map((sp) => (
            <button
              key={sp}
              type="button"
              onClick={() => handleUpdateTypo('letterSpacing', sp)}
              className={`flex-1 py-1 text-[10px] font-mono rounded border transition ${
                currentStyle.letterSpacing === sp
                  ? 'bg-indigo-600 text-white font-bold border-indigo-600'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400'
              }`}
            >
              {sp}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
