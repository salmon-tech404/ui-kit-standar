import React, { useState } from 'react';
import { DemoPageId, DemoUser } from '../types';
import { useDesignStore } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';
import { Tooltip } from '@/shared/ui';
import {
  LayoutDashboard,
  FolderKanban,
  Bot,
  Settings,
  CreditCard,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Zap,
} from 'lucide-react';

interface DashboardAppLayoutProps {
  currentPage: DemoPageId;
  onNavigate: (page: DemoPageId) => void;
  user: DemoUser;
  children: React.ReactNode;
}

export const DashboardAppLayout: React.FC<DashboardAppLayoutProps> = ({
  currentPage,
  onNavigate,
  user,
  children,
}) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const { tokens } = useDesignStore();
  const { t } = useI18n();

  const navItems: { id: DemoPageId; label: string; icon: any; badge?: string }[] = [
    { id: 'dashboard', label: t((d) => d.demo.navbar.dashboard), icon: LayoutDashboard },
    { id: 'pricing', label: 'Bảng giá & Gói cước', icon: Sparkles, badge: 'PRO' },
    { id: 'profile', label: 'My Projects', icon: FolderKanban },
    { id: 'settings', label: 'AI Agents', icon: Bot, badge: '42' },
    { id: 'billing', label: t((d) => d.demo.navbar.billing), icon: CreditCard },
    { id: 'settings', label: t((d) => d.demo.navbar.settings), icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-6 min-h-[680px] text-xs">
        {/* PERSISTENT APP SHELL SIDEBAR */}
        <aside
          style={{
            borderRadius: 'var(--ui-radius-card, var(--ui-radius-xl, 16px))',
            backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
            borderColor: 'var(--ui-color-border-default, #E2E8F0)',
            width: sidebarExpanded ? 'var(--ui-sidebar-width, 250px)' : '64px',
            padding: 'var(--ui-padding-card, 16px)',
            boxShadow: 'var(--ui-shadow-card, var(--shadow-card))',
          }}
          className="border space-y-6 shrink-0 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="space-y-6">
            {/* Workspace Brand Header */}
            <div className="flex items-center justify-between px-1">
              {sidebarExpanded && (
                <div className="flex items-center gap-2">
                  <span
                    style={{ backgroundColor: 'var(--ui-color-success, #10B981)' }}
                    className="w-2.5 h-2.5 rounded-full animate-pulse"
                  />
                  <span className="font-bold text-xs font-heading text-slate-900 dark:text-white">
                    Enterprise Workspace
                  </span>
                </div>
              )}
              <Tooltip content="Toggle Sidebar" position="right">
                <button
                  onClick={() => setSidebarExpanded(!sidebarExpanded)}
                  className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-white transition cursor-pointer"
                >
                  {sidebarExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </Tooltip>
            </div>

            {/* Navigation Item List */}
            <nav className="space-y-1">
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={`${item.id}-${idx}`}
                    onClick={() => onNavigate(item.id)}
                    style={
                      isActive
                        ? {
                            backgroundColor: 'color-mix(in srgb, var(--ui-color-primary, #FF4F00) 12%, transparent)',
                            color: 'var(--ui-color-primary, #FF4F00)',
                          }
                        : undefined
                    }
                    className={`w-full flex items-center ${
                      sidebarExpanded ? 'justify-between px-3 py-2' : 'justify-center py-2.5'
                    } rounded-xl font-semibold transition cursor-pointer ${
                      isActive
                        ? 'font-bold shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      {sidebarExpanded && <span className="truncate">{item.label}</span>}
                    </div>
                    {sidebarExpanded && item.badge && (
                      <span
                        style={{
                          backgroundColor: 'var(--ui-color-primary, #FF4F00)',
                          borderRadius: 'var(--ui-radius-full, 9999px)',
                        }}
                        className="text-[9px] px-1.5 py-0.2 font-mono font-bold text-white uppercase"
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quota Usage Box */}
          {sidebarExpanded && (
            <div
              style={{
                borderRadius: 'var(--ui-radius-lg, 12px)',
                borderColor: 'var(--ui-color-border-subtle, #E2E8F0)',
                backgroundColor: 'color-mix(in srgb, var(--ui-color-primary, #FF4F00) 5%, transparent)',
              }}
              className="p-3 border space-y-2"
            >
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-orange-500" />
                <span className="font-bold text-[11px] text-slate-800 dark:text-slate-200">
                  Hạn Mức Tiêu Thụ Token
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                Đồng bộ với Claude 3.7 & Cursor Engine
              </p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div
                  style={{
                    width: '74.2%',
                    backgroundColor: 'var(--ui-color-primary, #FF4F00)',
                  }}
                  className="h-full rounded-full"
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>74,250</span>
                <span>100,000 credits</span>
              </div>
            </div>
          )}
        </aside>

        {/* MAIN PAGE VIEW AREA */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
};
