import React, { useState, useEffect, useRef } from 'react';
import { useDesignStore, ViewportSize } from '@/entities/design-token';
import { DemoApp } from '@/pages/demo';
import { ArrowLeft, ArrowRight, RotateCcw, Lock, Globe, Sparkles } from 'lucide-react';

interface LiveCanvasProps {
  onOpenXmlExport?: () => void;
  onOpenAiModal?: () => void;
}

export const LiveCanvas: React.FC<LiveCanvasProps> = () => {
  const { viewport, closeSubpanel } = useDesignStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [currentRoute, setCurrentRoute] = useState('home');
  const [reloadKey, setReloadKey] = useState(0);

  const targetWidths: Record<ViewportSize, number> = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  };

  const isFullBleed = viewport === 'xl' || viewport === '2xl';
  const targetWidth = targetWidths[viewport];

  // Listen to hash changes from DemoApp
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#/demo/')) {
        const route = hash.replace('#/demo/', '');
        if (route) setCurrentRoute(route);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth;
        if (availableWidth < targetWidth && !isFullBleed) {
          setScale(Math.max(0.4, (availableWidth - 16) / targetWidth));
        } else {
          setScale(1);
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewport, targetWidth, isFullBleed]);

  const handleBack = () => {
    window.history.back();
  };

  const handleForward = () => {
    window.history.forward();
  };

  const handleReload = () => {
    setReloadKey((prev) => prev + 1);
  };

  return (
    <div
      ref={containerRef}
      onClick={closeSubpanel}
      className={`flex-1 bg-slate-100 dark:bg-slate-950 flex flex-col h-full overflow-hidden relative ${
        isFullBleed ? 'p-0' : 'p-2 sm:p-4'
      } justify-center items-center`}
    >
      {/* Real Website Canvas Frame with Browser Chrome Bar */}
      <div
        style={{
          width: isFullBleed ? '100%' : `${targetWidth}px`,
          maxWidth: '100%',
          transform: !isFullBleed && scale !== 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'top center',
          transition: 'width 250ms ease, transform 250ms ease',
        }}
        className={`bg-white dark:bg-slate-900 flex flex-col h-full w-full mx-auto overflow-hidden ${
          isFullBleed
            ? 'border-0 shadow-none'
            : 'border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl'
        }`}
      >
        {/* Virtual Browser URL Omnibox Header Bar */}
        <div className="bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 px-3 py-1.5 flex items-center justify-between gap-3 text-xs shrink-0 z-30">
          {/* Browser Navigation Buttons */}
          <div className="flex items-center gap-1.5 select-none">
            <div className="flex items-center gap-1 mr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 dark:bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 dark:bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 dark:bg-emerald-500/80 inline-block" />
            </div>

            <button
              onClick={handleBack}
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Back"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleForward}
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Forward"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleReload}
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Reload Demo Frame"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Omnibox Address Input */}
          <div className="flex-1 max-w-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 flex items-center gap-2 shadow-2xs select-text">
            <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
            <span className="font-mono text-[11px] text-slate-600 dark:text-slate-300 truncate select-all">
              https://raku.design/demo/<strong className="text-orange-600 dark:text-orange-400">{currentRoute}</strong>
            </span>
          </div>

          {/* Viewport Indicator Badge */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 shrink-0 select-none">
            <span className="hidden sm:inline">Viewport:</span>
            <span className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded font-bold uppercase">
              {viewport} ({targetWidth}px)
            </span>
          </div>
        </div>

        {/* Demo Website App */}
        <div key={reloadKey} className="flex-1 overflow-hidden flex flex-col select-text">
          <DemoApp initialPage={currentRoute as any} />
        </div>
      </div>
    </div>
  );
};
