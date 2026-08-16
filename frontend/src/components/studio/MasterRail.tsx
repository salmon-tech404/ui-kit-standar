import React, { useState } from 'react';
import { useDesignStore } from '../../store/useDesignStore';
import {
  FolderKanban,
  SunMoon,
  Palette,
  Type,
  Ruler,
  Square,
  Sparkles,
  Maximize2,
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
  Layers3,
  SplitSquareVertical,
  Workflow,
  Image,
  Paintbrush,
  BookOpen,
  FileText,
  DownloadCloud,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

interface MasterRailProps {
  onOpenXmlExport: () => void;
}

export const MasterRail: React.FC<MasterRailProps> = ({ onOpenXmlExport }) => {
  const {
    activeCategory,
    isRailCollapsed,
    isSubpanelOpen,
    setActiveCategory,
    toggleRail,
    openSubpanel,
    setThemeMode,
    tokens,
  } = useDesignStore();

  const [isDarkMode, setIsDarkMode] = useState(tokens.project.themeMode === 'dark');

  const toggleStudioTheme = (dark: boolean) => {
    setIsDarkMode(dark);
    setThemeMode(dark ? 'dark' : 'light');
    if (dark) {
      document.documentElement.setAttribute('data-studio-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-studio-theme');
    }
  };

  const handleCategoryClick = (key: string) => {
    setActiveCategory(key);
    openSubpanel(key);
  };

  // Full 6 Master Tiers matching the 2006-line Specification
  const masterTiers = [
    {
      title: 'PROJECT & THEME',
      items: [
        { key: 'project_info', label: 'Project Info & Prefix', icon: FolderKanban, badge: 'v1.0' },
        { key: 'theme_modes', label: 'Theme Modes', icon: SunMoon, badge: '3' },
      ],
    },
    {
      title: 'FOUNDATIONS',
      items: [
        { key: 'colors', label: 'Colors', icon: Palette },
        { key: 'typography', label: 'Typography', icon: Type },
        { key: 'spacing', label: 'Spacing & Sizing', icon: Ruler },
        { key: 'radius', label: 'Radius & Shadow', icon: Square },
        { key: 'icons', label: 'Icons', icon: Sparkles },
        { key: 'breakpoints', label: 'Breakpoints', icon: Maximize2 },
        { key: 'motion', label: 'Motion & Transition', icon: Zap },
        { key: 'zindex', label: 'Z-Index Layers', icon: Layers },
        { key: 'accessibility', label: 'Accessibility (A11y)', icon: Eye },
      ],
    },
    {
      title: 'COMPONENTS',
      items: [
        { key: 'comp_actions', label: 'Actions', icon: Box, badge: '3' },
        { key: 'comp_forms', label: 'Forms', icon: FileCode, badge: '6' },
        { key: 'comp_data_display', label: 'Data Display', icon: FileSpreadsheet, badge: '4' },
        { key: 'comp_feedback', label: 'Feedback', icon: BellRing, badge: '5' },
        { key: 'comp_overlays', label: 'Overlays & Modals', icon: AppWindow, badge: '4' },
        { key: 'comp_navigation', label: 'Navigation', icon: Compass, badge: '5' },
        { key: 'comp_layout', label: 'Layout & Grid', icon: Layout, badge: '3' },
      ],
    },
    {
      title: 'PATTERNS',
      items: [
        { key: 'pat_templates', label: 'Page Templates', icon: Layers3, badge: '5' },
        { key: 'pat_sections', label: 'Sections (Hero, FAQ)', icon: SplitSquareVertical, badge: '6' },
        { key: 'pat_usecases', label: 'Use Cases & Flows', icon: Workflow, badge: '4' },
      ],
    },
    {
      title: 'BRAND & ASSETS',
      items: [
        { key: 'brand_logo', label: 'Logo & Brand Identity', icon: Paintbrush },
        { key: 'brand_icons', label: 'Icon Library', icon: Sparkles },
        { key: 'brand_illustrations', label: 'Illustrations', icon: Image },
        { key: 'brand_images', label: 'Images & Media', icon: Image },
      ],
    },
    {
      title: 'SYSTEM & OUTPUT',
      items: [
        { key: 'sys_tokens', label: 'Design Tokens JSON', icon: FileCode },
        { key: 'sys_rules', label: 'Rules & Guidelines', icon: BookOpen },
        { key: 'sys_ai_directives', label: 'AI Directives (RFC)', icon: Sparkles },
        { key: 'sys_xml_spec', label: 'XML Specification', icon: FileText },
        { key: 'sys_import_export', label: 'Import / Export Engine', icon: DownloadCloud },
      ],
    },
  ];

  return (
    <aside
      className={`bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 h-full transition-all duration-300 select-none z-30 ${
        isRailCollapsed ? 'w-[56px]' : 'w-[250px]'
      }`}
    >
      {/* Header bar with collapse button */}
      <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        {!isRailCollapsed && (
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-heading">
            Design Standards Studio
          </span>
        )}
        <button
          onClick={toggleRail}
          className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded transition mx-auto"
          title={isRailCollapsed ? 'Mở rộng thanh Foundation' : 'Thu nhỏ thanh Foundation'}
        >
          {isRailCollapsed ? <PanelLeftOpen className="w-4 h-4 text-indigo-600" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 py-3 px-2 space-y-4 overflow-y-auto">
        {masterTiers.map((tier) => (
          <div key={tier.title} className="space-y-1">
            {!isRailCollapsed && (
              <div className="flex items-center justify-between px-2 py-0.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                <span>{tier.title}</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            )}
            <div className="space-y-0.5">
              {tier.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeCategory === item.key && isSubpanelOpen;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleCategoryClick(item.key)}
                    className={`w-full flex items-center ${
                      isRailCollapsed ? 'justify-center px-0 py-2' : 'justify-between px-2.5 py-1.5'
                    } rounded-lg text-xs font-medium transition ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900'
                    }`}
                    title={isRailCollapsed ? item.label : undefined}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                      {!isRailCollapsed && <span className="truncate">{item.label}</span>}
                    </div>
                    {!isRailCollapsed && (item as any).badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full">
                        {(item as any).badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer: Export XML Specification & Studio Theme Toggle */}
      <div className="p-2.5 border-t border-slate-200 dark:border-slate-800 space-y-2 bg-slate-50/50 dark:bg-slate-900/50">
        <button
          onClick={onOpenXmlExport}
          className={`w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-indigo-500/25 transition ${
            isRailCollapsed ? 'px-0' : 'px-3'
          }`}
          title="Export XML Specification"
        >
          <FileText className="w-4 h-4 shrink-0" />
          {!isRailCollapsed && <span>Export Master XML</span>}
        </button>

        {!isRailCollapsed && (
          <div className="flex items-center justify-between px-1 text-[11px] text-slate-500">
            <span>Theme Mode</span>
            <div className="flex items-center p-0.5 bg-slate-200 dark:bg-slate-800 rounded-full">
              <button
                onClick={() => toggleStudioTheme(false)}
                className={`p-1 rounded-full ${!isDarkMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                title="Light Mode"
              >
                <SunMoon className="w-3 h-3" />
              </button>
              <button
                onClick={() => toggleStudioTheme(true)}
                className={`p-1 rounded-full ${isDarkMode ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400'}`}
                title="Dark Mode"
              >
                <SunMoon className="w-3 h-3 rotate-180" />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
