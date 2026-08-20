import React from 'react';

export interface TokenSliderControlProps {
  label: string;
  value: number;
  unit?: string;
  min: number;
  max: number;
  step?: number;
  isSelected?: boolean;
  description?: string;
  icon?: React.ReactNode;
  actionSlot?: React.ReactNode;
  onSelect?: () => void;
  onChange: (val: number) => void;
}

export const TokenSliderControl: React.FC<TokenSliderControlProps> = ({
  label,
  value,
  unit = 'px',
  min,
  max,
  step = 1,
  isSelected = false,
  description,
  icon,
  actionSlot,
  onSelect,
  onChange,
}) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === '') {
      onChange(0);
      return;
    }
    const parsed = parseInt(raw, 10);
    onChange(isNaN(parsed) ? 0 : parsed);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value, 10);
    onChange(isNaN(parsed) ? 0 : parsed);
  };

  return (
    <div
      onClick={onSelect}
      className={`p-2.5 rounded-xl border transition cursor-pointer space-y-2 ${
        isSelected
          ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-semibold shadow-xs ring-1 ring-indigo-500/20'
          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {icon}
          <span className="font-semibold text-slate-800 dark:text-slate-200 truncate text-xs">{label}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-1.5 py-0.5 shadow-2xs">
            <input
              type="number"
              min={min}
              max={max}
              step={step}
              value={value}
              onClick={(e) => e.stopPropagation()}
              onChange={handleNumberChange}
              className="w-11 text-right font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-transparent outline-none text-xs"
            />
            {unit && <span className="text-[10px] text-slate-400 font-mono pl-0.5">{unit}</span>}
          </div>
          {actionSlot}
        </div>
      </div>

      {description && (
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      )}

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onClick={(e) => e.stopPropagation()}
        onChange={handleSliderChange}
        className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
    </div>
  );
};
