import React from 'react';

export interface TokenSelectCardProps {
  label: string;
  value?: string | number;
  description?: string;
  isSelected?: boolean;
  icon?: React.ReactNode;
  previewSlot?: React.ReactNode;
  onSelect?: () => void;
}

export const TokenSelectCard: React.FC<TokenSelectCardProps> = ({
  label,
  value,
  description,
  isSelected = false,
  icon,
  previewSlot,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-between gap-2 ${
        isSelected
          ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-semibold shadow-xs'
          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <div className="space-y-0.5">
          <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">{label}</span>
          {description && (
            <p className="text-[10px] text-slate-500 dark:text-slate-400">{description}</p>
          )}
        </div>
      </div>
      {previewSlot || (value !== undefined && (
        <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold">
          {value}
        </span>
      ))}
    </div>
  );
};
