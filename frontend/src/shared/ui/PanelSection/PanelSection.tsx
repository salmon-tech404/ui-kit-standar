import React from 'react';

export interface PanelSectionProps {
  title?: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
}

export const PanelSection: React.FC<PanelSectionProps> = ({
  title,
  badge,
  children,
  className = '',
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {title && (
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {title}
          </span>
          {badge && (
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded">
              {badge}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
