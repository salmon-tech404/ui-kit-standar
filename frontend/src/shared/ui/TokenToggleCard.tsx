import React from 'react';

export interface TokenToggleCardProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: React.ReactNode;
}

export const TokenToggleCard: React.FC<TokenToggleCardProps> = ({
  title,
  description,
  checked,
  onChange,
  icon,
}) => {
  return (
    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-3">
      <div className="space-y-0.5">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 text-xs">
          {icon}
          <span>{title}</span>
        </div>
        <div className="text-[11px] text-slate-500 leading-relaxed">{description}</div>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`px-3 py-1 rounded-full text-xs font-bold transition shrink-0 cursor-pointer ${
          checked
            ? 'bg-indigo-600 text-white shadow-xs'
            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600'
        }`}
      >
        {checked ? 'Bật' : 'Tắt'}
      </button>
    </div>
  );
};
