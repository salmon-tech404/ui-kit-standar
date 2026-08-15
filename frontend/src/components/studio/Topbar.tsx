import React, { useEffect, useState } from 'react';
import { useDesignStore, ViewportSize } from '../../store/useDesignStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useProjectStore } from '../../store/useProjectStore';
import {
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Tv,
  Sparkles,
  FolderKanban,
  LogOut,
  User,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
} from 'lucide-react';

interface TopbarProps {
  onOpenAiModal: () => void;
  onOpenAuthModal: () => void;
  onOpenDashboard: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenAiModal, onOpenAuthModal, onOpenDashboard }) => {
  const {
    viewport,
    viewMode,
    isRailCollapsed,
    isInspectorOpen,
    setViewport,
    setViewMode,
    toggleRail,
    toggleInspector,
  } = useDesignStore();

  const { user, isAuthenticated, logout } = useAuthStore();
  const { activeProject } = useProjectStore();

  // Track user window width in real-time
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1440);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const breakpoints: Array<{ key: ViewportSize; minWidth: number; label: string; icon: any }> = [
    { key: 'sm', minWidth: 640, label: 'sm (640px)', icon: Smartphone },
    { key: 'md', minWidth: 768, label: 'md (768px)', icon: Tablet },
    { key: 'lg', minWidth: 1024, label: 'lg (1024px)', icon: Laptop },
    { key: 'xl', minWidth: 1280, label: 'xl (1280px)', icon: Monitor },
    { key: '2xl', minWidth: 1536, label: '2xl (1536px)', icon: Tv },
  ];

  return (
    <header className="h-[56px] px-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between z-40 shrink-0 select-none">
      {/* Left: Brand & Sidebar Toggle */}
      <div className="flex items-center gap-3">
        {/* Toggle Master Rail */}
        <button
          onClick={toggleRail}
          className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition"
          title={isRailCollapsed ? 'Mở thanh Foundation (Pane 1)' : 'Đóng thanh Foundation (Pane 1)'}
        >
          {isRailCollapsed ? <PanelLeftOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-500/20">
            N
          </div>
          <span className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            UI Kit Standard
            <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-200 dark:border-indigo-800">
              v1.0.0
            </span>
          </span>
        </div>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

        <button
          onClick={onOpenDashboard}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition"
        >
          <FolderKanban className="w-3.5 h-3.5 text-indigo-500" />
          <span className="max-w-[130px] truncate">{activeProject?.name || 'Default Project'}</span>
        </button>
      </div>

      {/* Center: Standard Tailwind Viewports (sm, md, lg, xl, 2xl) */}
      <div className="flex items-center gap-2">
        <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
          {breakpoints.map((bp) => {
            const Icon = bp.icon;
            const isActive = viewport === bp.key;
            // When user screen is smaller than breakpoint min-width, mark as inactive / scaled
            const isScreenTooSmall = windowWidth < bp.minWidth;

            return (
              <button
                key={bp.key}
                onClick={() => setViewport(bp.key)}
                className={`relative px-2.5 py-1.5 flex items-center gap-1.5 rounded-md text-xs transition ${
                  isActive
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm font-bold'
                    : isScreenTooSmall
                    ? 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium'
                }`}
                title={
                  isScreenTooSmall
                    ? `${bp.label} (Màn hình hiện tại ${windowWidth}px nhỏ hơn ${bp.minWidth}px - Canvas sẽ tự scale)`
                    : bp.label
                }
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                <span className="text-[11px] uppercase">{bp.key}</span>
                {isScreenTooSmall && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 -mr-1" title="Screen smaller than breakpoint" />
                )}
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle: Live vs Wireframe */}
        <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium">
          <button
            onClick={() => setViewMode('live')}
            className={`px-2.5 py-1 rounded-md transition ${viewMode === 'live' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-900'}`}
          >
            👁️ Live
          </button>
          <button
            onClick={() => setViewMode('wireframe')}
            className={`px-2.5 py-1 rounded-md transition ${viewMode === 'wireframe' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-900'}`}
          >
            📐 Wireframe
          </button>
        </div>
      </div>

      {/* Right: AI Generate, AA Pass Pill, Inspector Toggle, Auth */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenAiModal}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-lg text-xs font-semibold shadow-sm transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>AI Generate</span>
          {isAuthenticated && (
            <span className="ml-1 px-1.5 py-0.2 bg-indigo-600 text-white rounded-full text-[10px]">
              {user?.credits ?? 0}
            </span>
          )}
        </button>

        <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 rounded-full text-xs font-semibold">
          <span>⚡</span>
          <span>98% AA Pass</span>
        </div>

        {/* Toggle Deep Inspector */}
        <button
          onClick={toggleInspector}
          className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition"
          title={isInspectorOpen ? 'Đóng bảng Inspector' : 'Mở bảng Inspector'}
        >
          {isInspectorOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
        </button>

        {isAuthenticated ? (
          <div className="flex items-center gap-2 pl-1">
            <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300" title={user?.email}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <button onClick={logout} className="p-1 text-slate-400 hover:text-red-500 transition" title="Logout">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <User className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};
