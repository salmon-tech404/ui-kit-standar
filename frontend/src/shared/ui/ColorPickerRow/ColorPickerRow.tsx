import React from 'react';

export interface ColorPickerRowProps {
  label: string;
  value: string;
  isSelected?: boolean;
  onClick: () => void;
  className?: string;
}

export const ColorPickerRow: React.FC<ColorPickerRowProps> = ({
  label,
  value,
  isSelected = false,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition border ${
        isSelected
          ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-semibold'
          : 'bg-slate-50 dark:bg-slate-800/60 border-transparent hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200'
      } ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="w-5 h-5 rounded border border-black/10 shadow-inner shrink-0"
          style={{ backgroundColor: value }}
        />
        <span className="text-xs">{label}</span>
      </div>
      <span className="font-mono text-[10px] text-slate-500 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
        {value.toUpperCase()}
      </span>
    </div>
  );
};
