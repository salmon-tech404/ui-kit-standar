import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

export const OptionSettingsPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-y-auto">
      {/* Header */}
      <div className="h-12 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between bg-white dark:bg-slate-900 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <h1 className="text-sm font-bold font-heading">
            Option Settings
          </h1>
        </div>
      </div>

      {/* Empty Page Body */}
      <div className="flex-1 p-8 flex items-center justify-center">
        {/* Trang để trống không có gì */}
      </div>
    </div>
  );
};
