import React from 'react';
import { useDesignStore } from '../../store/useDesignStore';
import { RotateCcw, Plus, X } from 'lucide-react';

export const SubConfigPanel: React.FC = () => {
  const {
    activeCategory,
    activeFilterTab,
    tokens,
    selectedToken,
    isSubpanelOpen,
    closeSubpanel,
    setActiveFilterTab,
    setSelectedToken,
    updateToken,
  } = useDesignStore();

  const { colors, typography, radius, spacing } = tokens.foundations;
  const { brand, semantic, neutral, surface } = colors;

  if (!isSubpanelOpen) {
    return null;
  }

  const handleSelectColorToken = (
    name: string,
    key: string,
    path: string,
    value: string,
    category: string
  ) => {
    setSelectedToken({
      type: 'color',
      category,
      key,
      path,
      name,
      value,
      cssVar: `--color-${key.toLowerCase()}`,
      description: `${name} token synced across all component blueprints.`,
    });
  };

  const renderColorRows = () => (
    <div className="space-y-4">
      {/* 1. Brand Colors */}
      {(activeFilterTab === 'all' || activeFilterTab === 'semantic') && (
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Brand Colors
          </div>
          {[
            { label: 'Primary', key: 'primary', path: 'foundations.colors.brand.primary', val: brand.primary },
            { label: 'Primary Hover', key: 'primaryHover', path: 'foundations.colors.brand.primaryHover', val: brand.primaryHover },
            { label: 'Primary Focus', key: 'primaryFocus', path: 'foundations.colors.brand.primaryFocus', val: brand.primaryFocus },
            { label: 'Secondary', key: 'secondary', path: 'foundations.colors.brand.secondary', val: brand.secondary },
            { label: 'Accent', key: 'accent', path: 'foundations.colors.brand.accent', val: brand.accent },
          ].map((item) => {
            const isSelected = selectedToken.key === item.key;
            return (
              <div
                key={item.key}
                onClick={() => handleSelectColorToken(item.label, item.key, item.path, item.val, 'brand')}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition border ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-transparent hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-5 h-5 rounded border border-black/10 shadow-inner"
                    style={{ backgroundColor: item.val }}
                  />
                  <span className="text-xs">{item.label}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                  {item.val.toUpperCase()}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. Semantic Colors */}
      {(activeFilterTab === 'all' || activeFilterTab === 'semantic') && (
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Semantic Colors
          </div>
          {[
            { label: 'Success', key: 'success', path: 'foundations.colors.semantic.success', val: semantic.success },
            { label: 'Warning', key: 'warning', path: 'foundations.colors.semantic.warning', val: semantic.warning },
            { label: 'Error', key: 'error', path: 'foundations.colors.semantic.error', val: semantic.error },
            { label: 'Info', key: 'info', path: 'foundations.colors.semantic.info', val: semantic.info },
          ].map((item) => (
            <div
              key={item.key}
              onClick={() => handleSelectColorToken(item.label, item.key, item.path, item.val, 'semantic')}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition border ${
                selectedToken.key === item.key
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-semibold'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-transparent hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded border border-black/10 shadow-inner" style={{ backgroundColor: item.val }} />
                <span className="text-xs">{item.label}</span>
              </div>
              <span className="font-mono text-[10px] text-slate-500 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                {item.val.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 3. Neutral Colors */}
      {(activeFilterTab === 'all' || activeFilterTab === 'neutral') && (
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Neutral Grayscale
          </div>
          {Object.entries(neutral).map(([k, val]) => (
            <div
              key={k}
              onClick={() => handleSelectColorToken(k.replace('gray', 'Gray '), k, `foundations.colors.neutral.${k}`, val, 'neutral')}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition border ${
                selectedToken.key === k
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-semibold'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-transparent hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded border border-black/10 shadow-inner" style={{ backgroundColor: val }} />
                <span className="text-xs capitalize">{k.replace('gray', 'Gray ')}</span>
              </div>
              <span className="font-mono text-[10px] text-slate-500 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                {val.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Custom Color Button */}
      {(activeFilterTab === 'all' || activeFilterTab === 'custom') && (
        <button className="w-full py-2 border border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition">
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom Color</span>
        </button>
      )}
    </div>
  );

  const renderTypographyPanel = () => (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <label className="font-semibold text-slate-700 dark:text-slate-300">Heading Font Family</label>
        <select
          value={typography.fontHeading}
          onChange={(e) => updateToken('foundations.typography.fontHeading', e.target.value)}
          className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none"
        >
          <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
          <option value="Inter">Inter</option>
          <option value="Roboto">Roboto</option>
          <option value="Geist">Geist</option>
        </select>
      </div>
      <div className="space-y-1.5">
        <label className="font-semibold text-slate-700 dark:text-slate-300">Body Font Family</label>
        <select
          value={typography.fontBody}
          onChange={(e) => updateToken('foundations.typography.fontBody', e.target.value)}
          className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none"
        >
          <option value="Inter">Inter</option>
          <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
          <option value="Roboto">Roboto</option>
        </select>
      </div>
    </div>
  );

  const renderRadiusPanel = () => (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Global Border Radius</div>
      <div className="grid grid-cols-4 gap-1.5">
        {[0, 4, 8, 16].map((r) => (
          <button
            key={r}
            onClick={() => {
              updateToken('foundations.radius.md', r);
              updateToken('foundations.radius.lg', r + 4);
            }}
            className={`py-1.5 text-xs font-semibold rounded-lg border transition ${
              radius.md === r
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            {r}px
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section className="w-[280px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 h-full select-none shadow-xl z-20 transition-all duration-300 animate-in slide-in-from-left-4">
      {/* Subpanel Header with Close Button */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white capitalize font-heading">
            {activeCategory.replace('_', ' ')}
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => updateToken('foundations.colors.brand.primary', '#6366F1')}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded transition"
            title="Reset to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={closeSubpanel}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded transition"
            title="Đóng bảng cấu hình"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs for Colors */}
      {activeCategory === 'colors' && (
        <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800 flex gap-1 overflow-x-auto">
          {['all', 'semantic', 'neutral', 'custom'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilterTab(tab)}
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize transition ${
                activeFilterTab === tab
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Content Body */}
      <div className="flex-1 p-3.5 overflow-y-auto">
        {activeCategory === 'colors' && renderColorRows()}
        {activeCategory === 'typography' && renderTypographyPanel()}
        {activeCategory === 'radius' && renderRadiusPanel()}
        {!['colors', 'typography', 'radius'].includes(activeCategory) && (
          <div className="text-xs text-slate-500 leading-relaxed">
            All tokens in <strong>{activeCategory}</strong> are mathematically synced across all components and exported to the Master XML Specification.
          </div>
        )}
      </div>
    </section>
  );
};
