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
  Check,
  Shield,
  Layers3,
  SplitSquareVertical,
  Workflow,
  Image,
  Paintbrush,
  BookOpen,
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

  const { project, foundations, components, patterns, brandAssets, customRules } = tokens;
  const { colors, typography, radius, spacing, shadows, icons, breakpoints, motion, zindex, accessibility } = foundations;
  const { brand, semantic, neutral, text, borders, backgroundLayers } = colors;

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  /* -------------------------------------------------------------
     1. PROJECT INFO PANEL
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
        <div className="font-bold text-indigo-600 dark:text-indigo-400">Deterministic AI Scope</div>
        <p className="text-[11px] leading-relaxed">
          Prefix <code>{project.prefix}</code> ensures zero variable naming conflicts across full-stack applications.
        </p>
      </div>
    </div>
  );

  /* -------------------------------------------------------------
     2. COLORS (BRAND, SEMANTIC, NEUTRAL, TEXT, BORDERS, LAYERS)
  ------------------------------------------------------------- */
  const renderColorsPanel = () => (
    <div className="space-y-4">
      {/* Tab Filter */}
      <div className="flex gap-1 pb-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto text-[11px]">
        {['all', 'text_layers', 'semantic', 'neutral'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilterTab(tab)}
            className={`px-2.5 py-0.5 rounded-full capitalize font-medium transition ${
              activeFilterTab === tab
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Text & Background Layer Tokens (NEW) */}
      {(activeFilterTab === 'all' || activeFilterTab === 'text_layers') && (
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Text & Foreground Tokens
          </div>
          {[
            { label: 'Text Primary', key: 'textPrimary', path: 'foundations.colors.text.primary', val: text.primary },
            { label: 'Text Secondary', key: 'textSecondary', path: 'foundations.colors.text.secondary', val: text.secondary },
            { label: 'Text Tertiary', key: 'textTertiary', path: 'foundations.colors.text.tertiary', val: text.tertiary },
            { label: 'Text Link', key: 'textLink', path: 'foundations.colors.text.link', val: text.link },
          ].map((item) => (
            <div
              key={item.key}
              onClick={() =>
                handleSelectToken({
                  type: 'color',
                  category: 'text',
                  key: item.key,
                  path: item.path,
                  name: item.label,
                  value: item.val,
                  cssVar: `${project.prefix}color-${item.key.toLowerCase()}`,
                  description: `Dedicated typographic foreground color token.`,
                  impactComponents: ['Heading', 'Body Paragraph', 'Table Row', 'Card Text'],
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

          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pt-2">
            Background Layer Tokens
          </div>
          {[
            { label: 'Page Background', key: 'bgPage', path: 'foundations.colors.backgroundLayers.page', val: backgroundLayers.page },
            { label: 'Card Background', key: 'bgCard', path: 'foundations.colors.backgroundLayers.card', val: backgroundLayers.card },
            { label: 'Modal Background', key: 'bgModal', path: 'foundations.colors.backgroundLayers.modal', val: backgroundLayers.modal },
          ].map((item) => (
            <div
              key={item.key}
              onClick={() =>
                handleSelectToken({
                  type: 'color',
                  category: 'background_layer',
                  key: item.key,
                  path: item.path,
                  name: item.label,
                  value: item.val,
                  cssVar: `${project.prefix}color-${item.key.toLowerCase()}`,
                  description: `Layered background tone preventing flat, textureless containers.`,
                  impactComponents: ['App Shell', 'Card', 'Modal Overlay', 'Sidebar'],
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

      {/* Brand Colors */}
      {(activeFilterTab === 'all' || activeFilterTab === 'semantic') && (
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Brand Palette
          </div>
          {[
            { label: 'Primary', key: 'primary', path: 'foundations.colors.brand.primary', val: brand.primary },
            { label: 'Primary Hover', key: 'primaryHover', path: 'foundations.colors.brand.primaryHover', val: brand.primaryHover },
            { label: 'Secondary', key: 'secondary', path: 'foundations.colors.brand.secondary', val: brand.secondary },
            { label: 'Accent', key: 'accent', path: 'foundations.colors.brand.accent', val: brand.accent },
          ].map((item) => (
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

      {/* Semantic Colors */}
      {(activeFilterTab === 'all' || activeFilterTab === 'semantic') && (
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Semantic Palette
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
    </div>
  );

  /* -------------------------------------------------------------
     3. TYPOGRAPHY PANEL (MODULAR RATIO + RESPONSIVE)
  ------------------------------------------------------------- */
  const renderTypographyPanel = () => (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <label className="font-semibold text-slate-700 dark:text-slate-300">Heading Font</label>
        <select
          value={typography.fontHeading}
          onChange={(e) => updateToken('foundations.typography.fontHeading', e.target.value)}
          className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none dark:text-white font-medium"
        >
          <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
          <option value="Inter">Inter</option>
          <option value="Cabinet Grotesk">Cabinet Grotesk</option>
          <option value="Geist">Geist</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="font-semibold text-slate-700 dark:text-slate-300">Body Font</label>
        <select
          value={typography.fontBody}
          onChange={(e) => updateToken('foundations.typography.fontBody', e.target.value)}
          className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none dark:text-white font-medium"
        >
          <option value="Inter">Inter</option>
          <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
          <option value="Geist">Geist</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Scale Ratio</label>
          <select
            value={typography.scaleRatio}
            onChange={(e) => updateToken('foundations.typography.scaleRatio', parseFloat(e.target.value))}
            className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono"
          >
            <option value={1.2}>1.200 (Minor 3rd)</option>
            <option value={1.25}>1.250 (Major 3rd)</option>
            <option value={1.333}>1.333 (4th)</option>
          </select>
        </div>
        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Max Measure</label>
          <input
            type="number"
            value={typography.maxMeasureCharacters}
            onChange={(e) => updateToken('foundations.typography.maxMeasureCharacters', parseInt(e.target.value))}
            className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-center"
          />
        </div>
      </div>

      <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
        <div className="text-[11px] font-bold text-slate-400 uppercase">Semantic Typography Scale</div>
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
                description: `${k.toUpperCase()} style formatted at ${style.fontSize}px desktop / ${style.fontSizeMobile || style.fontSize}px mobile.`,
                impactComponents: ['Heading', 'Hero Title', 'Card Header', 'Modal Title'],
              })
            }
            className={`p-2 rounded-lg cursor-pointer flex items-center justify-between border ${
              selectedToken.key === k ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-semibold' : 'bg-slate-50 dark:bg-slate-800/60 border-transparent'
            }`}
          >
            <div className="flex items-center gap-2">
              <Type className="w-3.5 h-3.5 text-indigo-500" />
              <span className="uppercase text-[11px] font-bold text-slate-800 dark:text-slate-200">{k}</span>
            </div>
            <span className="font-mono text-[10px] text-slate-500">
              {style.fontSize}px (M: {style.fontSizeMobile}px)
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  /* -------------------------------------------------------------
     4. SPACING & SIZING PANEL (WITH GAP SEMANTICS)
  ------------------------------------------------------------- */
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

      {/* Semantic Gaps (NEW) */}
      <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
        <div className="font-bold text-slate-800 dark:text-slate-200">Semantic Gap Rules</div>
        <div className="space-y-1.5">
          {[
            { label: 'Icon ↔ Text Gap', val: spacing.gaps.iconText, path: 'foundations.spacing.gaps.iconText' },
            { label: 'Form Fields Gap', val: spacing.gaps.formFields, path: 'foundations.spacing.gaps.formFields' },
            { label: 'Page Sections Gap', val: spacing.gaps.sections, path: 'foundations.spacing.gaps.sections' },
          ].map((gap) => (
            <div key={gap.label} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <span className="text-slate-700 dark:text-slate-300">{gap.label}</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{gap.val}px</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* -------------------------------------------------------------
     5. ICONS PANEL (NEW FULL UI)
  ------------------------------------------------------------- */
  const renderIconsPanel = () => (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <label className="font-semibold text-slate-700 dark:text-slate-300">Icon Library</label>
        <select
          value={icons.library}
          onChange={(e) => updateToken('foundations.icons.library', e.target.value)}
          className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold"
        >
          <option value="lucide-react">lucide-react (Strict Standard)</option>
          <option value="heroicons">heroicons (Tailwind)</option>
          <option value="tabler">tabler-icons</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Stroke Width</label>
          <select
            value={icons.strokeWidth}
            onChange={(e) => updateToken('foundations.icons.strokeWidth', parseFloat(e.target.value))}
            className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-center"
          >
            <option value={1.5}>1.5px (Refined)</option>
            <option value={2.0}>2.0px (Bold)</option>
          </select>
        </div>
        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Default Size</label>
          <select
            value={icons.defaultSize}
            onChange={(e) => updateToken('foundations.icons.defaultSize', parseInt(e.target.value))}
            className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-center"
          >
            <option value={16}>16px</option>
            <option value={20}>20px (Std)</option>
            <option value={24}>24px</option>
          </select>
        </div>
      </div>

      <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-1">
        <div className="font-bold text-indigo-600 dark:text-indigo-400">Optical Baseline Alignment</div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400">
          Enforced: Icons in buttons and inputs are always vertically centered and optical-aligned with text cap-height.
        </p>
      </div>
    </div>
  );

  /* -------------------------------------------------------------
     6. BREAKPOINTS PANEL (NEW FULL UI WITH BEHAVIORS)
  ------------------------------------------------------------- */
  const renderBreakpointsPanel = () => (
    <div className="space-y-3 text-xs">
      <div className="font-bold text-slate-800 dark:text-slate-200">Tailwind Standard Breakpoints & Behaviors</div>
      {[
        { key: 'sm', min: breakpoints.sm, behavior: breakpoints.behaviors.sm },
        { key: 'md', min: breakpoints.md, behavior: breakpoints.behaviors.md },
        { key: 'lg', min: breakpoints.lg, behavior: breakpoints.behaviors.lg },
        { key: 'xl', min: breakpoints.xl, behavior: breakpoints.behaviors.xl },
        { key: '2xl', min: breakpoints['2xl'], behavior: breakpoints.behaviors['2xl'] },
      ].map((bp) => (
        <div key={bp.key} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
          <div className="flex justify-between items-center font-bold">
            <span className="font-mono text-indigo-600 dark:text-indigo-400 uppercase">{bp.key} ({bp.min}px)</span>
            <span className="text-[10px] text-slate-400">Min Width</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">{bp.behavior}</p>
        </div>
      ))}
    </div>
  );

  /* -------------------------------------------------------------
     7. MOTION PANEL (WITH REDUCED-MOTION TOGGLE)
  ------------------------------------------------------------- */
  const renderMotionPanel = () => (
    <div className="space-y-4 text-xs">
      <div className="space-y-2">
        <div className="font-semibold text-slate-700 dark:text-slate-300">Micro-Interaction Durations</div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(motion.microInteractions).map(([k, ms]) => (
            <div key={k} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="text-[10px] text-slate-400 capitalize">{k}</div>
              <div className="font-mono font-bold text-slate-900 dark:text-white">{ms}ms</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div>
          <div className="font-bold text-slate-800 dark:text-slate-200">Prefers Reduced Motion</div>
          <div className="text-[11px] text-slate-500">Auto-disable animations for accessibility</div>
        </div>
        <button
          onClick={() => updateToken('foundations.motion.reducedMotion', !motion.reducedMotion)}
          className={`px-3 py-1 rounded-full text-xs font-bold transition ${
            motion.reducedMotion ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
          }`}
        >
          {motion.reducedMotion ? 'Enabled' : 'Disabled'}
        </button>
      </div>
    </div>
  );

  /* -------------------------------------------------------------
     8. ACCESSIBILITY PANEL (NEW FULL UI)
  ------------------------------------------------------------- */
  const renderAccessibilityPanel = () => (
    <div className="space-y-4 text-xs">
      <div className="space-y-2">
        <div className="font-semibold text-slate-700 dark:text-slate-300">Focus-Visible Ring Spec</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-[10px] text-slate-400">Ring Width</div>
            <div className="font-mono font-bold">{accessibility.focusRingWidth}px</div>
          </div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-[10px] text-slate-400">Ring Offset</div>
            <div className="font-mono font-bold">{accessibility.focusRingOffset}px</div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1 text-slate-700 dark:text-slate-300">
        <div className="font-bold text-emerald-600 dark:text-emerald-400">WCAG 2.1 Contrast Standards</div>
        <p className="text-[11px] leading-relaxed">
          Enforces minimum 4.5:1 (AA) for regular text and 7.0:1 (AAA) for high contrast mode in Master XML output.
        </p>
      </div>
    </div>
  );

  /* -------------------------------------------------------------
     9. COMPONENTS PANEL: ACTIONS (BUTTON 5 VARIANTS × 6 STATES)
  ------------------------------------------------------------- */
  const renderActionsPanel = () => {
    const btn = components.actions.button;

    return (
      <div className="space-y-4 text-xs">
        <div className="font-bold text-slate-800 dark:text-slate-200">Button 5-Variant System</div>
        <div className="space-y-2">
          {Object.entries(btn.variants).map(([vKey, vSpec]) => (
            <div
              key={vKey}
              onClick={() =>
                handleSelectToken({
                  type: 'component',
                  category: 'Button Variant',
                  key: vKey,
                  path: `components.actions.button.variants.${vKey}`,
                  name: `Button (${vKey.toUpperCase()})`,
                  value: vSpec,
                  cssVar: `${project.prefix}btn-${vKey}`,
                  description: `Full 6-state component specification for ${vKey} button with background, hover, focus-ring, and disabled states.`,
                  impactComponents: [`Button (${vKey})`],
                  guidelines: {
                    do: [`Use for ${vKey === 'primary' ? 'the main page action' : 'secondary or auxiliary actions'}.`],
                    dont: [`Do not use more than one primary button per card container.`],
                  },
                })
              }
              className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                selectedToken.key === vKey
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-semibold'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: vSpec.bg || '#6366F1' }} />
                <span className="font-bold capitalize text-slate-800 dark:text-slate-200">{vKey} Variant</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">6 States</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* -------------------------------------------------------------
     10. PATTERNS PANEL
  ------------------------------------------------------------- */
  const renderPatternsPanel = () => (
    <div className="space-y-3 text-xs">
      <div className="font-bold text-slate-800 dark:text-slate-200">Pre-Built Layout Blueprints</div>
      {patterns.pageTemplates.map((p) => (
        <div key={p.name} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
          <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>{p.name}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 rounded">
              Template
            </span>
          </div>
          <p className="text-[11px] text-slate-500">{p.description}</p>
          <div className="flex flex-wrap gap-1 pt-1">
            {p.sections.map((s) => (
              <span key={s} className="px-1.5 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-[10px] text-slate-600 dark:text-slate-400">
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  /* -------------------------------------------------------------
     11. BRAND & ASSETS PANEL
  ------------------------------------------------------------- */
  const renderBrandPanel = () => (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <label className="font-semibold text-slate-700 dark:text-slate-300">Logo Aspect Ratio & Safe Padding</label>
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Aspect Ratio:</span>
            <span className="font-mono font-bold">{brandAssets.logo.aspectRatio}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Min Height:</span>
            <span className="font-mono font-bold">{brandAssets.logo.minHeight}px</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Safe Zone:</span>
            <span className="font-mono font-bold">{brandAssets.logo.safeZonePadding}px</span>
          </div>
        </div>
      </div>
    </div>
  );

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

      {/* Dynamic Content Body */}
      <div className="flex-1 p-3.5 overflow-y-auto">
        {activeCategory === 'project_info' && renderProjectInfoPanel()}
        {activeCategory === 'colors' && renderColorsPanel()}
        {activeCategory === 'typography' && renderTypographyPanel()}
        {activeCategory === 'spacing' && renderSpacingPanel()}
        {activeCategory === 'icons' && renderIconsPanel()}
        {activeCategory === 'breakpoints' && renderBreakpointsPanel()}
        {activeCategory === 'motion' && renderMotionPanel()}
        {activeCategory === 'accessibility' && renderAccessibilityPanel()}
        {activeCategory === 'comp_actions' && renderActionsPanel()}
        {activeCategory.startsWith('pat_') && renderPatternsPanel()}
        {activeCategory.startsWith('brand_') && renderBrandPanel()}
        {!['project_info', 'colors', 'typography', 'spacing', 'icons', 'breakpoints', 'motion', 'accessibility', 'comp_actions'].includes(
          activeCategory
        ) &&
          !activeCategory.startsWith('pat_') &&
          !activeCategory.startsWith('brand_') && (
            <div className="text-xs text-slate-500 leading-relaxed space-y-2">
              <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Deterministic Blueprint Configured</span>
              </div>
              <p>
                Tokens and layout constraints for <strong>{activeCategory}</strong> are strictly serialized in the Master XML Specification.
              </p>
            </div>
          )}
      </div>
    </section>
  );
};
