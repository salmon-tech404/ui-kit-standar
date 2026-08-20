import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { useDesignStore } from '@/entities/design-token';
import { ProjectInfoPanel, ThemeModesPanel } from '@/features/edit-project-info';
import { ColorsPanel } from '@/features/edit-colors';
import { TypographyPanel } from '@/features/edit-typography';
import { SpacingPanel } from '@/features/edit-spacing';
import {
  RadiusPanel,
  IconsPanel,
  BreakpointsPanel,
  MotionPanel,
  LayersPanel,
  AccessibilityPanel,
} from '@/features/edit-foundations';
import {
  ActionsPanel,
  FormsPanel,
  DataDisplayPanel,
  FeedbackPanel,
  OverlaysPanel,
  NavigationPanel,
  LayoutPanel,
  PatternsPanel,
  BrandPanel,
} from '@/features/edit-components-and-patterns';
import {
  SystemTokensPanel,
  SystemRulesPanel,
  SystemXmlPanel,
} from '@/features/edit-system-output';

export const SubConfigDrawer: React.FC = () => {
  const {
    activeCategory,
    isSubpanelOpen,
    closeSubpanel,
    resetToDefaultTokens,
  } = useDesignStore();

  if (!isSubpanelOpen) return null;

  const categoryTitles: Record<string, string> = {
    project_info: 'Thông Tin Dự Án',
    theme_modes: 'Chế Độ Giao Diện',
    colors: 'Màu Sắc & Lớp Nền',
    typography: 'Kiểu Chữ & Cỡ Chữ',
    spacing: 'Khoảng Cách & Kích Thước',
    radius: 'Bo Góc & Đổ Bóng',
    icons: 'Cấu Hình Biểu Tượng',
    breakpoints: 'Điểm Ngắt Màn Hình',
    motion: 'Chuyển Động & Hoạt Ảnh',
    layers: '7 Lớp Hiển Thị (Z-Index)',
    accessibility: 'Khả Năng Tiếp Cận (A11y)',
    comp_actions: 'Nút Bấm & Hành Động',
    comp_forms: 'Biểu Mẫu Nhập Liệu',
    comp_data_display: 'Hiển Thị Dữ Liệu',
    comp_feedback: 'Thông Báo & Phản Hồi',
    comp_overlays: 'Lớp Phủ & Hộp Thoại',
    comp_navigation: 'Thanh Điều Hướng',
    comp_layout: 'Bố Cục Khung Lưới',
    pat_templates: 'Mẫu Trang Giao Diện',
    pat_sections: 'Khối Nội Dung',
    pat_usecases: 'Luồng Thao Tác',
    brand_logo: 'Logo & Nhận Diện',
    brand_icons: 'Bộ Biểu Tượng Thương Hiệu',
    brand_illustrations: 'Hình Minh Họa',
    brand_images: 'Hình Ảnh & Media',
    sys_tokens: 'Design Tokens JSON',
    sys_rules: 'Quy Tắc RFC 2119',
    sys_ai_directives: 'Chỉ Thị AI',
    sys_xml_spec: 'Đặc Tả Master XML',
    sys_import_export: 'Xuất / Nhập Mã Nguồn',
  };

  const title = categoryTitles[activeCategory] || activeCategory.replace(/_/g, ' ');

  return (
    <section className="w-[290px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 h-full shadow-xl z-20 transition-all duration-300 animate-in slide-in-from-left-4">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between select-none">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white font-heading truncate">
          {title}
        </h2>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => resetToDefaultTokens()}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title="Khôi phục mặc định"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={closeSubpanel}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title="Đóng bảng cấu hình"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dynamic Content Panel Mapping for 25 Categories */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {/* Tier 1: Project & Theme */}
        {activeCategory === 'project_info' && <ProjectInfoPanel />}
        {activeCategory === 'theme_modes' && <ThemeModesPanel />}

        {/* Tier 2: Foundations */}
        {activeCategory === 'colors' && <ColorsPanel />}
        {activeCategory === 'typography' && <TypographyPanel />}
        {activeCategory === 'spacing' && <SpacingPanel />}
        {activeCategory === 'radius' && <RadiusPanel />}
        {activeCategory === 'icons' && <IconsPanel />}
        {activeCategory === 'breakpoints' && <BreakpointsPanel />}
        {activeCategory === 'motion' && <MotionPanel />}
        {activeCategory === 'layers' && <LayersPanel />}
        {activeCategory === 'accessibility' && <AccessibilityPanel />}

        {/* Tier 3: Components */}
        {activeCategory === 'comp_actions' && <ActionsPanel />}
        {activeCategory === 'comp_forms' && <FormsPanel />}
        {activeCategory === 'comp_data_display' && <DataDisplayPanel />}
        {activeCategory === 'comp_feedback' && <FeedbackPanel />}
        {activeCategory === 'comp_overlays' && <OverlaysPanel />}
        {activeCategory === 'comp_navigation' && <NavigationPanel />}
        {activeCategory === 'comp_layout' && <LayoutPanel />}

        {/* Tier 4: Patterns */}
        {(activeCategory === 'pat_templates' ||
          activeCategory === 'pat_sections' ||
          activeCategory === 'pat_usecases') && <PatternsPanel />}

        {/* Tier 5: Brand & Assets */}
        {(activeCategory === 'brand_logo' ||
          activeCategory === 'brand_icons' ||
          activeCategory === 'brand_illustrations' ||
          activeCategory === 'brand_images') && <BrandPanel />}

        {/* Tier 6: System Output */}
        {activeCategory === 'sys_tokens' && <SystemTokensPanel />}
        {(activeCategory === 'sys_rules' || activeCategory === 'sys_ai_directives') && <SystemRulesPanel />}
        {(activeCategory === 'sys_xml_spec' || activeCategory === 'sys_import_export') && <SystemXmlPanel />}
      </div>
    </section>
  );
};
