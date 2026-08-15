import React, { useRef, useState, useEffect } from 'react';
import { useDesignStore } from '../../store/useDesignStore';
import { Undo2, Redo2, RotateCcw, FileText, Sparkles, Check, Flame } from 'lucide-react';

interface LiveCanvasProps {
  onOpenXmlExport: () => void;
  onOpenAiModal: () => void;
}

export const LiveCanvas: React.FC<LiveCanvasProps> = ({ onOpenXmlExport, onOpenAiModal }) => {
  const {
    viewport,
    viewMode,
    undo,
    redo,
    setSelectedToken,
    tokens,
    updateToken,
    closeSubpanel,
  } = useDesignStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);

  // Target widths in px according to standard Tailwind breakpoints
  const targetWidths: Record<string, number> = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  };

  const currentTargetWidth = targetWidths[viewport] || 1280;

  // Auto-scale to fit canvas when screen is narrow
  useEffect(() => {
    const handleCalculateScale = () => {
      if (!containerRef.current) return;
      const padding = 64; // 32px padding on each side
      const availableWidth = containerRef.current.clientWidth - padding;

      if (availableWidth < currentTargetWidth) {
        const calculatedScale = Math.max(0.4, Math.min(1, availableWidth / currentTargetWidth));
        setScale(calculatedScale);
      } else {
        setScale(1);
      }
    };

    handleCalculateScale();
    window.addEventListener('resize', handleCalculateScale);
    return () => window.removeEventListener('resize', handleCalculateScale);
  }, [viewport, currentTargetWidth]);

  const handleInspectPrimary = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedToken({
      type: 'color',
      category: 'brand',
      key: 'primary',
      path: 'foundations.colors.brand.primary',
      name: 'Primary',
      value: tokens.foundations.colors.brand.primary,
      cssVar: '--color-primary',
      description: 'Primary brand color used for main actions and highlights.',
    });
  };

  const handleRandomPalette = (e: React.MouseEvent) => {
    e.stopPropagation();
    const palettes = ['#6366F1', '#EC4899', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4', '#F97316'];
    const randomHex = palettes[Math.floor(Math.random() * palettes.length)];
    updateToken('foundations.colors.brand.primary', randomHex);
  };

  return (
    <section
      ref={containerRef}
      onClick={closeSubpanel} // Clicking canvas closes subpanel drawer
      className="flex-1 bg-slate-100 dark:bg-slate-950 flex flex-col h-full overflow-hidden relative select-none"
    >
      {/* Floating Canvas Action Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-full shadow-lg"
      >
        <button onClick={undo} className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white transition" title="Undo (Ctrl+Z)">
          <Undo2 className="w-3.5 h-3.5" />
        </button>
        <button onClick={redo} className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white transition" title="Redo (Ctrl+Y)">
          <Redo2 className="w-3.5 h-3.5" />
        </button>

        <div className="h-3.5 w-px bg-slate-200 dark:bg-slate-700" />

        <div className="flex items-center gap-1.5 px-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Auto Save</span>
        </div>

        {scale < 1 && (
          <>
            <div className="h-3.5 w-px bg-slate-200 dark:bg-slate-700" />
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-full">
              Fit {Math.round(scale * 100)}%
            </span>
          </>
        )}

        <div className="h-3.5 w-px bg-slate-200 dark:bg-slate-700" />

        <button
          onClick={() => updateToken('foundations.colors.brand.primary', '#6366F1')}
          className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
          title="Revert Tokens"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onOpenXmlExport}
          className="p-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition"
          title="Export XML"
        >
          <FileText className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 overflow-auto p-6 pt-16 flex items-start justify-center">
        <div
          style={{
            width: `${currentTargetWidth}px`,
            transform: scale < 1 ? `scale(${scale})` : undefined,
            transformOrigin: 'top center',
            backgroundImage: viewMode === 'wireframe' ? 'radial-gradient(#CBD5E1 1px, transparent 1px)' : undefined,
            backgroundSize: viewMode === 'wireframe' ? '16px 16px' : undefined,
          }}
          className="transition-all duration-300 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 min-h-[850px] relative shrink-0"
        >
          {/* 1. Header / Navbar */}
          <header className={`h-16 px-6 border-b flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur z-20 ${viewMode === 'wireframe' ? 'border-dashed border-slate-400' : 'border-slate-200 dark:border-slate-800'}`}>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 font-heading font-bold text-slate-900 dark:text-white text-base cursor-pointer" onClick={handleInspectPrimary}>
                <div className="w-7 h-7 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center font-black text-xs shadow-sm">
                  N
                </div>
                <span>Nuxt UI</span>
              </div>
              <nav className="hidden md:flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                <a href="#docs" className="hover:text-[var(--color-primary)]">Docs</a>
                <a href="#components" className="hover:text-[var(--color-primary)]">Components</a>
                <a href="#blocks" className="hover:text-[var(--color-primary)]">Blocks</a>
                <a href="#templates" className="hover:text-[var(--color-primary)]">Templates</a>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900">
                Sign in
              </button>
              <button
                onClick={handleInspectPrimary}
                className="px-3.5 py-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-semibold rounded-lg shadow-sm transition"
              >
                Get Started
              </button>
            </div>
          </header>

          {/* 2. Hero Section */}
          <section className="px-6 py-16 flex flex-col items-center text-center max-w-2xl mx-auto">
            <div
              onClick={handleInspectPrimary}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[var(--color-primary)] text-xs font-semibold border border-indigo-200 dark:border-indigo-800 mb-6 cursor-pointer"
            >
              <span>✨</span>
              <span>Tailwind Standard • {viewport.toUpperCase()} ({currentTargetWidth}px)</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
              The visual theme editor <br />
              <span className="text-[var(--color-primary)]">for Nuxt UI.</span>
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
              Pick colors. Tweak tokens. Preview live. Export Master XML for AI vibe coding.
            </p>

            <div className="flex items-center gap-3 flex-wrap justify-center mb-6">
              <button
                onClick={(e) => { e.stopPropagation(); onOpenXmlExport(); }}
                className="px-5 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-semibold rounded-lg shadow-md transition flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Export XML Spec</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onOpenAiModal(); }}
                className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-sm font-semibold rounded-lg shadow-sm transition flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>Try AI Generation</span>
              </button>
              <button
                onClick={handleRandomPalette}
                className="px-3.5 py-2.5 text-slate-500 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition flex items-center gap-1.5"
              >
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Random Palette</span>
              </button>
            </div>
          </section>

          {/* 3. Comparison Cards */}
          <section className="px-6 py-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center font-bold text-sm">
                    ✕
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm font-heading">Without Theme Standard</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Endless trial and error, mismatched border-radii across pages, broken vertical rhythms, and random hex colors.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm font-heading">With UI Kit Standard</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Concentric radii formula and 8pt spacing grid automatically enforce mathematical perfection and export XML for AI coding.
                </p>
              </div>
            </div>

            {/* 4. Controls Stress Test */}
            <div className="mt-8 p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Interactive Controls & Vertical Alignment Test (MD = 40px)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Search components or tokens..."
                  className="px-3 h-10 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs outline-none focus:border-[var(--color-primary)]"
                />
                <select className="px-3 h-10 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs outline-none">
                  <option>Active Presets</option>
                  <option>Fintech SaaS</option>
                  <option>Minimalist</option>
                </select>
                <select className="px-3 h-10 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs outline-none">
                  <option>12 Columns Grid</option>
                  <option>8 Columns Grid</option>
                </select>
                <button className="h-10 px-4 bg-[var(--color-primary)] text-white text-xs font-semibold rounded-lg shadow-sm">
                  Apply Filters
                </button>
              </div>
            </div>
          </section>

          {/* 5. Footer */}
          <footer className="mt-12 px-6 py-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between text-xs text-slate-400">
            <div>© 2026 UI Kit Standard. All tokens mathematically calibrated.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Documentation</a>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
};
