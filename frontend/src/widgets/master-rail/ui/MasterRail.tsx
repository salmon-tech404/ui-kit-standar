import React from 'react';
import {
  SlidersHorizontal,
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
import { useDesignStore } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';
import { Tooltip } from '@/shared/ui';

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

  const { t } = useI18n();

  const handleCategoryClick = (key: string) => {
    setActiveCategory(key);
    if (key !== 'option_settings') {
      openSubpanel(key);
    }
  };

  const masterTiers = [
    {
      title: t((d) => d.studio.rail.projectTheme),
      items: [
        { key: 'option_settings', label: t((d) => d.studio.rail.items.option_settings), icon: SlidersHorizontal },
        { key: 'project_info', label: t((d) => d.studio.rail.items.project_info), icon: FolderKanban },
        { key: 'theme_modes', label: t((d) => d.studio.rail.items.theme_modes), icon: SunMoon },
      ],
    },
    {
      title: t((d) => d.studio.rail.foundations),
      items: [
        { key: 'colors', label: t((d) => d.studio.rail.items.colors), icon: Palette },
        { key: 'typography', label: t((d) => d.studio.rail.items.typography), icon: Type },
        { key: 'spacing', label: t((d) => d.studio.rail.items.spacing), icon: Ruler },
        { key: 'radius', label: t((d) => d.studio.rail.items.radius), icon: Square },
        { key: 'icons', label: t((d) => d.studio.rail.items.icons), icon: Sparkles },
        { key: 'breakpoints', label: t((d) => d.studio.rail.items.breakpoints), icon: Maximize2 },
        { key: 'motion', label: t((d) => d.studio.rail.items.motion), icon: Zap },
        { key: 'layers', label: t((d) => d.studio.rail.items.layers), icon: Layers },
        { key: 'accessibility', label: t((d) => d.studio.rail.items.accessibility), icon: Eye },
      ],
    },
    {
      title: t((d) => d.studio.rail.components),
      items: [
        { key: 'comp_actions', label: t((d) => d.studio.rail.items.comp_actions), icon: Box },
        { key: 'comp_forms', label: t((d) => d.studio.rail.items.comp_forms), icon: FileCode },
        { key: 'comp_data_display', label: t((d) => d.studio.rail.items.comp_data_display), icon: FileSpreadsheet },
        { key: 'comp_feedback', label: t((d) => d.studio.rail.items.comp_feedback), icon: BellRing },
        { key: 'comp_overlays', label: t((d) => d.studio.rail.items.comp_overlays), icon: AppWindow },
        { key: 'comp_navigation', label: t((d) => d.studio.rail.items.comp_navigation), icon: Compass },
        { key: 'comp_layout', label: t((d) => d.studio.rail.items.comp_layout), icon: Layout },
      ],
    },
    {
      title: t((d) => d.studio.rail.patterns),
      items: [
        { key: 'pat_templates', label: t((d) => d.studio.rail.items.pat_templates), icon: Layers3 },
        { key: 'pat_sections', label: t((d) => d.studio.rail.items.pat_sections), icon: SplitSquareVertical },
        { key: 'pat_usecases', label: t((d) => d.studio.rail.items.pat_usecases), icon: Workflow },
      ],
    },
    {
      title: t((d) => d.studio.rail.brandAssets),
      items: [
        { key: 'brand_logo', label: t((d) => d.studio.rail.items.brand_logo), icon: Paintbrush },
        { key: 'brand_icons', label: t((d) => d.studio.rail.items.brand_icons), icon: Sparkles },
        { key: 'brand_illustrations', label: t((d) => d.studio.rail.items.brand_illustrations), icon: Image },
        { key: 'brand_images', label: t((d) => d.studio.rail.items.brand_images), icon: Image },
      ],
    },
    {
      title: t((d) => d.studio.rail.systemOutput),
      items: [
        { key: 'sys_tokens', label: t((d) => d.studio.rail.items.sys_tokens), icon: FileCode },
        { key: 'sys_rules', label: t((d) => d.studio.rail.items.sys_rules), icon: BookOpen },
        { key: 'sys_ai_directives', label: t((d) => d.studio.rail.items.sys_ai_directives), icon: Sparkles },
        { key: 'sys_xml_spec', label: t((d) => d.studio.rail.items.sys_xml_spec), icon: FileText },
        { key: 'sys_import_export', label: t((d) => d.studio.rail.items.sys_import_export), icon: DownloadCloud },
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
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 font-heading">
            {t((d) => d.studio.standardsTitle)}
          </span>
        )}
        <Tooltip
          content={isRailCollapsed ? t((d) => d.studio.topbar.expandSidebar) : t((d) => d.studio.topbar.collapseSidebar)}
          position="right"
        >
          <button
            onClick={toggleRail}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded transition mx-auto cursor-pointer"
          >
            {isRailCollapsed ? <PanelLeftOpen className="w-4 h-4 text-orange-500" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </Tooltip>
      </div>

      {/* Nav List */}
      <div className="flex-1 py-3 px-2 space-y-4 overflow-y-auto">
        {masterTiers.map((tier) => (
          <div key={tier.title} className="space-y-1">
            {!isRailCollapsed && (
              <div className="flex items-center justify-between px-2 py-0.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                <span>{tier.title}</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            )}
            <div className="space-y-0.5">
              {tier.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeCategory === item.key && (isSubpanelOpen || item.key === 'option_settings');
                return (
                  <Tooltip
                    key={item.key}
                    content={isRailCollapsed ? item.label : undefined}
                    position="right"
                    disabled={!isRailCollapsed}
                  >
                    <button
                      onClick={() => handleCategoryClick(item.key)}
                      className={`w-full flex items-center ${
                        isRailCollapsed ? 'justify-center px-0 py-2' : 'justify-start px-2.5 py-1.5'
                      } rounded-lg text-xs font-medium transition cursor-pointer ${
                        isActive
                          ? 'bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-semibold shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-orange-600 dark:text-orange-400' : 'text-slate-400'}`} />
                        {!isRailCollapsed && <span className="truncate">{item.label}</span>}
                      </div>
                    </button>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer: Export XML Button */}
      <div className="p-2.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <button
          onClick={onOpenXmlExport}
          className={`w-full py-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition cursor-pointer ${
            isRailCollapsed ? 'px-0' : 'px-3'
          }`}
          title="Export XML"
        >
          <FileText className="w-4 h-4 shrink-0" />
          {!isRailCollapsed && <span>Export XML</span>}
        </button>
      </div>
    </aside>
  );
};
