import React from 'react';
import { useDesignStore, SelectedToken } from '../../store/useDesignStore';
import {
  RotateCcw,
  Plus,
  X,
  Type,
  Ruler,
  Square,
  Sparkles,
  Zap,
  Layers,
  Eye,
  Box,
  FileCode,
  FileSpreadsheet,
  BellRing,
  AppWindow,
  Compass,
  Layout,
  SunMoon,
  FolderKanban,
  CheckCircle2,
} from 'lucide-react';

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
    setThemeMode,
  } = useDesignStore();

  if (!isSubpanelOpen) return null;

  const { project, foundations, components, patterns } = tokens;
  const { colors, typography, radius, spacing, icons, breakpoints, motion, zindex, accessibility } = foundations;
  const { brand, semantic, neutral } = colors;

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  /* -------------------------------------------------------------
     1. PROJECT & THEME PANELS
  ------------------------------------------------------------- */
  const renderProjectInfoPanel = () => (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <label className="font-semibold text-slate-700 dark:text-slate-300">Project Name</label>
        <input
          type="text"
          value={project.name}
          onChange={(e) => updateToken('project.name', e.target.value)}
          className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-medium dark:text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Version</label>
          <input
            type="text"
            value={project.version}
            onChange={(e) => updateToken('project.version', e.target.value)}
            className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-mono text-xs dark:text-white"
          />
        </div>
        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Token Prefix</label>
          <input
            type="text"
            value={project.prefix}
            onChange={(e) => updateToken('project.prefix', e.target.value)}
            placeholder="--ui- or --vx-"
            className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold"
          />
        </div>
      </div>

      <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-xl space-y-1 text-slate-600 dark:text-slate-400">
        <div className="font-bold text-indigo-600 dark:text-indigo-400">Metadata in Master XML</div>
        <p className="text-[11px] leading-relaxed">
          Prefix <code>{project.prefix}</code> ensures all exported CSS variables and AI prompt rules avoid namespace collisions.
        </p>
      </div>
    </div>
  );

  const renderThemeModesPanel = () => (
    <div className="space-y-4 text-xs">
      <div className="space-y-2">
        <label className="font-semibold text-slate-700 dark:text-slate-300">Active Theme Mode</label>
        <div className="grid grid-cols-3 gap-1.5">
          {(['light', 'dark', 'high_contrast'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setThemeMode(mode)}
              className={`py-2 px-1 text-center rounded-lg border font-semibold capitalize transition ${
                project.themeMode === mode
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {mode.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
        <div className="font-bold text-slate-800 dark:text-slate-200">Semantic Color Binding</div>
        <div className="flex justify-between items-center text-[11px] text-slate-500">
          <span>Surface Background:</span>
          <span className="font-mono">{foundations.colors.surface.background}</span>
        </div>
        <div className="flex justify-between items-center text-[11px] text-slate-500">
          <span>Surface Foreground:</span>
          <span className="font-mono">{foundations.colors.surface.foreground}</span>
        </div>
      </div>
    </div>
  );

  /* -------------------------------------------------------------
     2. FOUNDATIONS PANELS
  ------------------------------------------------------------- */
  const renderColorRows = () => (
    <div className="space-y-4">
      {/* Brand Colors */}
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
                onClick={() =>
                  handleSelectToken({
                    type: 'color',
                    category: 'brand',
                    key: item.key,
                    path: item.path,
                    name: item.label,
                    value: item.val,
                    cssVar: `${project.prefix}color-${item.key.toLowerCase()}`,
                    description: `Core brand token synced across all component blueprints.`,
                    impactComponents: ['Button', 'Link', 'Tabs', 'Badge', 'Focus Ring', 'Hero CTA'],
                  })
                }
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition border ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-semibold'
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
            );
          })}
        </div>
      )}

      {/* Semantic Colors */}
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
              onClick={() =>
                handleSelectToken({
                  type: 'color',
                  category: 'semantic',
                  key: item.key,
                  path: item.path,
                  name: item.label,
                  value: item.val,
                  cssVar: `${project.prefix}color-${item.key}`,
                  description: `Status indicator token for ${item.label.toLowerCase()} states and notifications.`,
                  impactComponents: ['Alert', 'Toast', 'Badge', 'Input Validation', 'Status Dot'],
                })
              }
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

      {/* Neutral Grayscale */}
      {(activeFilterTab === 'all' || activeFilterTab === 'neutral') && (
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Neutral Grayscale (50–900)
          </div>
          {Object.entries(neutral).map(([k, val]) => (
            <div
              key={k}
              onClick={() =>
                handleSelectToken({
                  type: 'color',
                  category: 'neutral',
                  key: k,
                  path: `foundations.colors.neutral.${k}`,
                  name: k.replace('gray', 'Gray '),
                  value: val,
                  cssVar: `${project.prefix}color-${k}`,
                  description: `Neutral grayscale tone for backgrounds, borders, and muted text.`,
                  impactComponents: ['Card', 'Table Border', 'Skeleton', 'Divider', 'Muted Text'],
                })
              }
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
    </div>
  );

  const renderTypographyPanel = () => (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <label className="font-semibold text-slate-700 dark:text-slate-300">Heading Font</label>
        <select
          value={typography.fontHeading}
          onChange={(e) => updateToken('foundations.typography.fontHeading', e.target.value)}
          className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none dark:text-white"
        >
          <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
          <option value="Inter">Inter</option>
          <option value="Roboto">Roboto</option>
          <option value="Geist">Geist</option>
          <option value="Cabinet Grotesk">Cabinet Grotesk</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="font-semibold text-slate-700 dark:text-slate-300">Body Font</label>
        <select
          value={typography.fontBody}
          onChange={(e) => updateToken('foundations.typography.fontBody', e.target.value)}
          className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none dark:text-white"
        >
          <option value="Inter">Inter</option>
          <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
          <option value="Roboto">Roboto</option>
          <option value="Geist">Geist</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="font-semibold text-slate-700 dark:text-slate-300">Modular Scale Ratio</label>
        <select
          value={typography.scaleRatio}
          onChange={(e) => updateToken('foundations.typography.scaleRatio', parseFloat(e.target.value))}
          className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none dark:text-white font-mono"
        >
          <option value={1.2}>1.200 - Minor Third</option>
          <option value={1.25}>1.250 - Major Third (Standard)</option>
          <option value={1.333}>1.333 - Perfect Fourth</option>
          <option value={1.414}>1.414 - Augmented Fourth</option>
        </select>
      </div>

      {/* Semantic Type Styles */}
      <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
        <div className="text-[11px] font-bold text-slate-400 uppercase">Semantic Type Styles</div>
        {Object.entries(typography.styles).map(([k, style]) => (
          <div
            key={k}
            onClick={() =>
              handleSelectToken({
                type: 'typography',
                category: 'typography',
                key: k,
                path: `foundations.typography.styles.${k}`,
                name: `Typography: ${k.toUpperCase()}`,
                value: style,
                cssVar: `${project.prefix}font-${k}`,
                description: `${k.toUpperCase()} style formatted at ${style.fontSize}px / ${style.fontWeight} weight.`,
                impactComponents: ['Heading', 'Hero Title', 'Card Header', 'Modal Title'],
              })
            }
            className={`p-2 rounded-lg cursor-pointer flex items-center justify-between border ${
              selectedToken.key === k ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500' : 'bg-slate-50 dark:bg-slate-800/60 border-transparent'
            }`}
          >
            <div className="flex items-center gap-2">
              <Type className="w-3.5 h-3.5 text-indigo-500" />
              <span className="font-bold text-slate-800 dark:text-slate-200 uppercase text-[11px]">{k}</span>
            </div>
            <span className="font-mono text-[10px] text-slate-500">{style.fontSize}px • {style.fontWeight}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSpacingPanel = () => (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <div className="font-semibold text-slate-700 dark:text-slate-300">8-Point Grid Spacing Scale</div>
        <div className="grid grid-cols-4 gap-1.5">
          {spacing.scale.map((s) => (
            <button
              key={s}
              onClick={() =>
                handleSelectToken({
                  type: 'spacing',
                  category: 'spacing',
                  key: `space-${s}`,
                  path: 'foundations.spacing.scale',
                  name: `Spacing: ${s}px`,
                  value: s,
                  cssVar: `${project.prefix}space-${s}`,
                  description: `${s}px spacing step on 8-point geometric scale.`,
                  impactComponents: ['Container Padding', 'Card Gap', 'Button Margin'],
                })
              }
              className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-center font-mono hover:border-indigo-500"
            >
              {s}px
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
        <div className="font-bold text-slate-800 dark:text-slate-200">Component Heights (Row Alignment)</div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'SM', val: spacing.componentHeights.sm, path: 'foundations.spacing.componentHeights.sm' },
            { label: 'MD (Std)', val: spacing.componentHeights.md, path: 'foundations.spacing.componentHeights.md' },
            { label: 'LG', val: spacing.componentHeights.lg, path: 'foundations.spacing.componentHeights.lg' },
          ].map((h) => (
            <div key={h.label} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[10px] text-slate-400">{h.label}</div>
              <div className="font-bold text-slate-900 dark:text-white font-mono text-sm">{h.val}px</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRadiusPanel = () => (
    <div className="space-y-4 text-xs">
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Border Radius Scale</div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: 'None', key: 'none', val: radius.none },
            { label: 'SM (4px)', key: 'sm', val: radius.sm },
            { label: 'MD (8px)', key: 'md', val: radius.md },
            { label: 'LG (12px)', key: 'lg', val: radius.lg },
            { label: 'XL (16px)', key: 'xl', val: radius.xl },
            { label: 'Full', key: 'full', val: radius.full },
          ].map((r) => (
            <button
              key={r.key}
              onClick={() =>
                handleSelectToken({
                  type: 'radius',
                  category: 'radius',
                  key: `radius-${r.key}`,
                  path: `foundations.radius.${r.key}`,
                  name: `Radius: ${r.label}`,
                  value: r.val,
                  cssVar: `${project.prefix}radius-${r.key}`,
                  description: `${r.label} radius token for geometric consistency.`,
                  impactComponents: ['Button', 'Card', 'Input', 'Modal', 'Badge'],
                })
              }
              className={`p-2 rounded-lg border font-semibold transition ${
                selectedToken.key === `radius-${r.key}`
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-1">
        <div className="font-bold text-indigo-600 dark:text-indigo-400">Concentric Radius Rule</div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
          Formula: <code>R_inner = max(0, R_outer - Padding)</code> is automatically enforced in Master XML directives.
        </p>
      </div>
    </div>
  );

  const renderMotionPanel = () => (
    <div className="space-y-4 text-xs">
      <div className="space-y-2">
        <div className="font-semibold text-slate-700 dark:text-slate-300">Duration Scale</div>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(motion.durations).map(([k, ms]) => (
            <button
              key={k}
              onClick={() =>
                handleSelectToken({
                  type: 'motion',
                  category: 'motion',
                  key: k,
                  path: `foundations.motion.durations.${k}`,
                  name: `Motion: ${k} (${ms}ms)`,
                  value: ms,
                  cssVar: `${project.prefix}motion-duration-${k}`,
                  description: `${k} transition duration for snappy micro-interactions.`,
                  impactComponents: ['Button Hover', 'Dropdown Menu', 'Modal Open', 'Toast Notification'],
                })
              }
              className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center hover:border-indigo-500"
            >
              <div className="text-[10px] text-slate-400 uppercase">{k}</div>
              <div className="font-mono font-bold text-slate-900 dark:text-white">{ms}ms</div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="font-semibold text-slate-700 dark:text-slate-300">Default Easing Curve</div>
        <input
          type="text"
          value={motion.easings.default}
          onChange={(e) => updateToken('foundations.motion.easings.default', e.target.value)}
          className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-mono text-xs dark:text-white"
        />
      </div>
    </div>
  );

  const renderZIndexPanel = () => (
    <div className="space-y-2 text-xs">
      <div className="font-semibold text-slate-700 dark:text-slate-300">Semantic Layer Stack</div>
      {Object.entries(zindex.layers).map(([layer, val]) => (
        <div
          key={layer}
          onClick={() =>
            handleSelectToken({
              type: 'zindex',
              category: 'zindex',
              key: layer,
              path: `foundations.zindex.layers.${layer}`,
              name: `Z-Index: ${layer}`,
              value: val,
              cssVar: `${project.prefix}z-${layer}`,
              description: `Semantic z-index layer for ${layer} overlays to prevent visual collision.`,
              impactComponents: [layer],
            })
          }
          className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-500"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            <span className="font-semibold capitalize text-slate-800 dark:text-slate-200">{layer}</span>
          </div>
          <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold">{val}</span>
        </div>
      ))}
    </div>
  );

  /* -------------------------------------------------------------
     3. COMPONENT PANELS (7 Groups)
  ------------------------------------------------------------- */
  const renderComponentsPanel = (groupKey: string) => {
    return (
      <div className="space-y-4 text-xs">
        <div className="text-xs text-slate-500">
          Configuring tokens & matrix for <strong>{groupKey.replace('comp_', '').toUpperCase()}</strong> components.
        </div>

        <div className="space-y-2">
          {['Primary Variant', 'Secondary Variant', 'Ghost Variant', 'Destructive Variant'].map((v) => (
            <div
              key={v}
              onClick={() =>
                handleSelectToken({
                  type: 'component',
                  category: groupKey,
                  key: v,
                  path: `components.${groupKey}.${v}`,
                  name: v,
                  value: { height: 40, radius: 8, padding: 16 },
                  cssVar: `${project.prefix}component-${v.toLowerCase().replace(' ', '-')}`,
                  description: `Component blueprint for ${v} with 6-state interactive matrix.`,
                  impactComponents: [v],
                })
              }
              className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between cursor-pointer hover:border-indigo-500"
            >
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-500" />
                <span className="font-bold text-slate-900 dark:text-white">{v}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">6 States</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="w-[290px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 h-full select-none shadow-xl z-20 transition-all duration-300 animate-in slide-in-from-left-4">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white capitalize font-heading">
          {activeCategory.replace('comp_', '').replace('sys_', '').replace('brand_', '').replace('pat_', '').replace('_', ' ')}
        </h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => updateToken('foundations.colors.brand.primary', '#6366F1')}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded transition"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={closeSubpanel}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded transition"
            title="Close Drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs for Colors */}
      {activeCategory === 'colors' && (
        <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800 flex gap-1 overflow-x-auto">
          {['all', 'semantic', 'neutral'].map((tab) => (
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

      {/* Body Content */}
      <div className="flex-1 p-3.5 overflow-y-auto">
        {activeCategory === 'project_info' && renderProjectInfoPanel()}
        {activeCategory === 'theme_modes' && renderThemeModesPanel()}
        {activeCategory === 'colors' && renderColorRows()}
        {activeCategory === 'typography' && renderTypographyPanel()}
        {activeCategory === 'spacing' && renderSpacingPanel()}
        {activeCategory === 'radius' && renderRadiusPanel()}
        {activeCategory === 'motion' && renderMotionPanel()}
        {activeCategory === 'zindex' && renderZIndexPanel()}
        {activeCategory.startsWith('comp_') && renderComponentsPanel(activeCategory)}
        {!['project_info', 'theme_modes', 'colors', 'typography', 'spacing', 'radius', 'motion', 'zindex'].includes(
          activeCategory
        ) &&
          !activeCategory.startsWith('comp_') && (
            <div className="text-xs text-slate-500 leading-relaxed space-y-2">
              <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Configured in Master Spec</span>
              </div>
              <p>
                All mathematical tokens for <strong>{activeCategory}</strong> are dynamically synced to CSS variables and outputted in the Master XML Specification.
              </p>
            </div>
          )}
      </div>
    </section>
  );
};
