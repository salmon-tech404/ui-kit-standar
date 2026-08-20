import React from 'react';
import {
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Tv,
  Undo2,
  Redo2,
  Sparkles,
  Sliders,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Settings,
  Sun,
  Moon,
} from 'lucide-react';
import { useDesignStore, ViewportSize } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';
import { Tooltip } from '@/shared/ui';

interface TopbarProps {
  onOpenAiModal: () => void;
  onOpenXmlExport: () => void;
  userCredits?: number;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenAiModal, onOpenXmlExport: _onOpenXmlExport, userCredits = 50 }) => {
  const {
    viewport,
    tokens,
    isRailCollapsed,
    isSubpanelOpen,
    isInspectorOpen,
    setViewport,
    toggleRail,
    toggleSubpanel,
    toggleInspector,
    undo,
    redo,
    historyIndex,
    history,
    setIsSettingsModalOpen,
    setThemeMode,
  } = useDesignStore();

  const { t, language, setLanguage } = useI18n();

  const isDark = tokens.project.themeMode === 'dark';
  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    setThemeMode(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.setAttribute('data-studio-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.removeAttribute('data-studio-theme');
      document.documentElement.classList.remove('dark');
    }
  };

  const viewports: { key: ViewportSize; icon: React.ComponentType<{ className?: string }>; label: string }[] = [
    { key: 'sm', icon: Smartphone, label: 'Mobile (640px)' },
    { key: 'md', icon: Tablet, label: 'Tablet (768px)' },
    { key: 'lg', icon: Laptop, label: 'Laptop (1024px)' },
    { key: 'xl', icon: Monitor, label: 'Desktop (1280px)' },
    { key: '2xl', icon: Tv, label: 'Wide (1536px)' },
  ];

  return (
    <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 flex items-center justify-between shrink-0 select-none relative z-50 shadow-xs overflow-visible">
      {/* Left controls & Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 pr-1">
          <img
            src={tokens.brandAssets.logo.urlLight || '/icons/raku_FF4F00_logo_128.png'}
            alt="RAKU Logo"
            className="w-7 h-7 object-contain shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/icons/raku_FF4F00_logo_128.png';
            }}
          />
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white font-heading">
              {t((d) => d.studio.brandName)}
            </span>
            <span className="text-[11px] font-semibold px-1.5 py-0.2 rounded bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 font-mono tracking-wider">
              {t((d) => d.studio.studioBadge)}
            </span>
          </div>
        </div>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
        <div className="flex items-center gap-1">
          <Tooltip content={isRailCollapsed ? t((d) => d.studio.topbar.expandSidebar) : t((d) => d.studio.topbar.collapseSidebar)} hotkey="[" position="bottom">
            <button
              onClick={toggleRail}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              {isRailCollapsed ? <PanelLeftOpen className="w-4 h-4 text-indigo-600" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>
          </Tooltip>

          <Tooltip content={t((d) => d.studio.topbar.toggleSubpanel)} hotkey="\" position="bottom">
            <button
              onClick={toggleSubpanel}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                isSubpanelOpen
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Sliders className="w-4 h-4" />
            </button>
          </Tooltip>
        </div>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
          <Tooltip content={t((d) => d.studio.topbar.undo)} hotkey="Ctrl+Z" position="bottom" disabled={historyIndex <= 0}>
            <button
              onClick={undo}
              disabled={historyIndex <= 0}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
            >
              <Undo2 className="w-4 h-4" />
            </button>
          </Tooltip>

          <Tooltip content={t((d) => d.studio.topbar.redo)} hotkey="Ctrl+Y" position="bottom" disabled={historyIndex >= history.length - 1}>
            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Center Viewport Switcher */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
        {viewports.map((vp) => {
          const Icon = vp.icon;
          const isActive = viewport === vp.key;
          return (
            <Tooltip key={vp.key} content={vp.label} position="bottom">
              <button
                onClick={() => setViewport(vp.key)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="uppercase text-[11px]">{vp.key}</span>
              </button>
            </Tooltip>
          );
        })}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 gap-1">
          <Tooltip content="Tiếng Việt (VI)" position="bottom">
            <button
              onClick={() => setLanguage('vi')}
              className={`px-1.5 py-0.5 text-[11px] font-bold rounded-lg transition flex items-center justify-center cursor-pointer ${
                language === 'vi'
                  ? 'bg-white dark:bg-slate-900 shadow-sm ring-1.5 ring-orange-500 text-orange-600 dark:text-orange-400'
                  : 'opacity-60 hover:opacity-100 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              VI
            </button>
          </Tooltip>

          <Tooltip content="English (US)" position="bottom">
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 text-[11px] font-bold rounded-lg transition flex items-center justify-center cursor-pointer ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-900 shadow-sm ring-1.5 ring-orange-500 text-orange-600 dark:text-orange-400'
                  : 'opacity-60 hover:opacity-100 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              EN
            </button>
          </Tooltip>

          <Tooltip content="日本語 (JA)" position="bottom">
            <button
              onClick={() => setLanguage('ja')}
              className={`px-1.5 py-0.5 text-[11px] font-bold rounded-lg transition flex items-center justify-center cursor-pointer ${
                language === 'ja'
                  ? 'bg-white dark:bg-slate-900 shadow-sm ring-1.5 ring-orange-500 text-orange-600 dark:text-orange-400'
                  : 'opacity-60 hover:opacity-100 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              JA
            </button>
          </Tooltip>
        </div>

        {/* Settings & Custom Rules */}
        <button
          onClick={() => setIsSettingsModalOpen(true)}
          className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-lg text-xs transition cursor-pointer"
          aria-label="Studio Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Switch Theme Sáng / Tối */}
        <button
          onClick={toggleTheme}
          className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs transition flex items-center justify-center cursor-pointer"
          aria-label="Switch Theme Mode"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-500" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </button>

        {/* AI Theme Prompt Generator */}
        <Tooltip content={t((d) => d.studio.topbar.aiThemePrompt)} position="bottom">
          <button
            onClick={onOpenAiModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-lg text-xs font-semibold shadow-md shadow-orange-500/20 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>DeepSeek ({userCredits})</span>
          </button>
        </Tooltip>

        {/* Toggle Right Inspector */}
        <button
          onClick={toggleInspector}
          className={`p-1.5 rounded-lg transition cursor-pointer ${
            isInspectorOpen
              ? 'bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-semibold'
              : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          aria-label="Toggle Inspector"
        >
          {isInspectorOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
