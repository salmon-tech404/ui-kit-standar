import React from 'react';
import { DemoPageId } from '../../types';
import { useDesignStore } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';
import { AlertCircle, ArrowLeft, Home, LayoutDashboard } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: DemoPageId) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const { t } = useI18n();

  return (
    <div className="min-h-[500px] flex items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-inner">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-6xl font-extrabold font-mono text-slate-900 dark:text-white">
            404
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
            {t(d => d.demo.notFound.title)}
          </h2>
          <p className="text-slate-500 text-xs leading-relaxed">
            {t(d => d.demo.notFound.description)}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2 text-xs font-bold">
          <button
            onClick={() => onNavigate('home')}
            style={{
              backgroundColor: 'var(--ui-color-primary, #6366F1)',
              borderRadius: 'var(--radius-md, 8px)',
            }}
            className="px-5 py-2.5 text-white shadow-md shadow-indigo-500/25 flex items-center gap-1.5 hover:opacity-90 transition"
          >
            <Home className="w-4 h-4" />
            <span>{t(d => d.demo.notFound.returnHome)}</span>
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-lg transition flex items-center gap-1.5"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{t(d => d.demo.notFound.goDashboard)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
