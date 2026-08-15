import React, { useState } from 'react';
import { useDesignStore } from '../../store/useDesignStore';
import {
  Palette,
  Type,
  Ruler,
  Square,
  Sparkles,
  Maximize2,
  Zap,
  Layers,
  Eye,
  FileCode,
  Box,
  Layout,
  BookOpen,
  FileText,
  FileSpreadsheet,
  Sun,
  Moon,
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
  } = useDesignStore();

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleStudioTheme = (dark: boolean) => {
    setIsDarkMode(dark);
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

  const sections = [
    {
      title: 'FOUNDATIONS',
      items: [
        { key: 'colors', label: 'Colors', icon: Palette },
        { key: 'typography', label: 'Typography', icon: Type },
        { key: 'spacing', label: 'Spacing & Sizing', icon: Ruler },
        { key: 'radius', label: 'Radius & Shadow', icon: Square },
        { key: 'icons', label: 'Icons', icon: Sparkles },
        { key: 'breakpoints', label: 'Breakpoints', icon: Maximize2 },
        { key: 'motion', label: 'Motion', icon: Zap },
        { key: 'zindex', label: 'Z-Index', icon: Layers },
        { key: 'accessibility', label: 'Accessibility', icon: Eye },
      ],
    },
    {
      title: 'COMPONENTS',
      items: [
        { key: 'actions', label: 'Actions', icon: Box, badge: '3' },
        { key: 'forms', label: 'Forms', icon: FileCode, badge: '8' },
        { key: 'datadisplay', label: 'Data Display', icon: FileSpreadsheet, badge: '5' },
        { key: 'layout', label: 'Layout', icon: Layout, badge: '3' },
      ],
    },
    {
      title: 'BRAND & ASSETS',
      items: [
        { key: 'logo_brand', label: 'Logo & Brand', icon: Box },
        { key: 'icon_library', label: 'Icon Library', icon: Sparkles },
      ],
    },
    {
      title: 'SYSTEM & OUTPUT',
      items: [
        { key: 'design_tokens', label: 'Design Tokens', icon: FileCode },
        { key: 'rules_guidelines', label: 'Rules & Guidelines', icon: BookOpen },
        { key: 'ai_instructions', label: 'AI Directives (RFC)', icon: Sparkles },
        { key: 'xml_spec', label: 'XML Specification', icon: FileText },
      ],
    },
  ];

  return (
    <aside
      className={`bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 h-full transition-all duration-300 select-none z-30 ${
        isRailCollapsed ? 'w-[56px]' : 'w-[240px]'
      }`}
    >
      {/* Header bar with collapse button */}
      <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        {!isRailCollapsed && (
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-heading">
            Design Standards
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

      <div className="flex-1 py-3 px-2 space-y-4 overflow-y-auto">
        {sections.map((sec) => (
          <div key={sec.title} className="space-y-1">
            {!isRailCollapsed && (
              <div className="flex items-center justify-between px-2 py-0.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                <span>{sec.title}</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            )}
            <div className="space-y-0.5">
              {sec.items.map((item) => {
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
                      {!isRailCollapsed && <span>{item.label}</span>}
                    </div>
                    {!isRailCollapsed && item.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full">
                        {item.badge}
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
          {!isRailCollapsed && <span>Export XML</span>}
        </button>

        {!isRailCollapsed && (
          <div className="flex items-center justify-between px-1 text-[11px] text-slate-500">
            <span>Studio Mode</span>
            <div className="flex items-center p-0.5 bg-slate-200 dark:bg-slate-800 rounded-full">
              <button
                onClick={() => toggleStudioTheme(false)}
                className={`p-1 rounded-full ${!isDarkMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                title="Light"
              >
                <Sun className="w-3 h-3" />
              </button>
              <button
                onClick={() => toggleStudioTheme(true)}
                className={`p-1 rounded-full ${isDarkMode ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400'}`}
                title="Dark"
              >
                <Moon className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
