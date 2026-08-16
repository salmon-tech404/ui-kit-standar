import React from 'react';
import { useDesignStore, ViewportSize } from '../../store/useDesignStore';
import {
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Tv,
  Undo2,
  Redo2,
  Grid,
  FileCode,
  Sparkles,
  Sliders,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Settings,
  ShieldCheck,
} from 'lucide-react';

interface TopbarProps {
  onOpenAiModal: () => void;
  onOpenXmlExport: () => void;
  userCredits?: number;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenAiModal, onOpenXmlExport, userCredits = 50 }) => {
  const {
    viewport,
    viewMode,
    showGridOverlay,
    isRailCollapsed,
    isSubpanelOpen,
    isInspectorOpen,
    tokens,
    setViewport,
    setViewMode,
    toggleGridOverlay,
    toggleRail,
    toggleSubpanel,
    toggleInspector,
    undo,
    redo,
    historyIndex,
    history,
    setIsSettingsModalOpen,
    calculateCompletenessScore,
  } = useDesignStore();

  const score = calculateCompletenessScore();

  const viewports: { key: ViewportSize; icon: any; label: string; width: number }[] = [
    { key: 'sm', icon: Smartphone, label: 'Mobile (640px)', width: 640 },
    { key: 'md', icon: Tablet, label: 'Tablet (768px)', width: 768 },
    { key: 'lg', icon: Laptop, label: 'Laptop (1024px)', width: 1024 },
    { key: 'xl', icon: Monitor, label: 'Desktop (1280px)', width: 1280 },
    { key: '2xl', icon: Tv, label: 'Wide (1536px)', width: 1536 },
  ];

  return (
    <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 flex items-center justify-between shrink-0 select-none z-40 shadow-xs">
      {/* Left controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <button
            onClick={toggleRail}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title={isRailCollapsed ? 'Mở rộng sidebar' : 'Thu nhỏ sidebar'}
          >
            {isRailCollapsed ? <PanelLeftOpen className="w-4 h-4 text-indigo-600" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleSubpanel}
            className={`p-1.5 rounded-lg transition ${
              isSubpanelOpen
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Đóng / Mở Sub-config drawer"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition"
            title="Undo"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition"
            title="Redo"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Viewport Switcher */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
        {viewports.map((vp) => {
          const Icon = vp.icon;
          const isActive = viewport === vp.key;
          return (
            <button
              key={vp.key}
              onClick={() => setViewport(vp.key)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title={vp.label}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="uppercase text-[11px]">{vp.key}</span>
            </button>
          );
        })}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Completeness Health Audit Badge */}
        <button
          onClick={() => setIsSettingsModalOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-bold transition hover:opacity-90"
          title="Design System Health Audit"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Health: {score}%</span>
        </button>

        {/* Settings & Custom Rules */}
        <button
          onClick={() => setIsSettingsModalOpen(true)}
          className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-lg text-xs transition"
          title="Studio Settings & Custom RFC Rules"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* AI Theme Prompt Generator */}
        <button
          onClick={onOpenAiModal}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg text-xs font-bold shadow-md shadow-indigo-500/20 transition"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>DeepSeek AI ({userCredits})</span>
        </button>

        {/* XML Export */}
        <button
          onClick={onOpenXmlExport}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-bold shadow-sm transition hover:opacity-90"
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>Master XML</span>
        </button>

        {/* Toggle Right Inspector */}
        <button
          onClick={toggleInspector}
          className={`p-1.5 rounded-lg transition ${
            isInspectorOpen
              ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title="Đóng / Mở Token Properties"
        >
          {isInspectorOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
