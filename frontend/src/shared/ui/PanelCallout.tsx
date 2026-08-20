import React from 'react';
import { Sparkles, Info, ShieldCheck, AlertTriangle } from 'lucide-react';

export interface PanelCalloutProps {
  title: string;
  description: string;
  variant?: 'neutral' | 'info' | 'success' | 'warning';
  icon?: React.ReactNode;
  className?: string;
}

export const PanelCallout: React.FC<PanelCalloutProps> = ({
  title,
  description,
  variant = 'neutral',
  icon,
  className = '',
}) => {
  const variantStyles = {
    neutral: 'border-slate-200 dark:border-slate-800 bg-transparent text-slate-800 dark:text-slate-200',
    info: 'border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300',
    success: 'border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300',
    warning: 'border-amber-200 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300',
  };

  const defaultIcons = {
    neutral: null,
    info: <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />,
    success: <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />,
    warning: <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />,
  };

  return (
    <div
      className={`p-3.5 border rounded-xl space-y-1.5 text-xs select-text ${variantStyles[variant]} ${className}`}
    >
      <div className="flex items-center gap-1.5 font-semibold">
        {icon || defaultIcons[variant]}
        <span>{title}</span>
      </div>
      <p className="font-normal text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line text-xs select-text">
        {description}
      </p>
    </div>
  );
};
