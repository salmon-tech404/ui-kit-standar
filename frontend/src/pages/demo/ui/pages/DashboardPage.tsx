import React, { useState } from 'react';
import { DemoPageId, DemoUser } from '../../types';
import { useDesignStore } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';
import { Tooltip } from '@/shared/ui';
import {
  Bot,
  TrendingUp,
  Search,
  Plus,
  MoreVertical,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: DemoPageId) => void;
  user: DemoUser;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, user }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'coding' | 'devops' | 'design'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { tokens } = useDesignStore();
  const { t } = useI18n();

  const kpis = [
    {
      label: t(d => d.demo.dashboard.kpis.processedTasks),
      value: '128,450',
      change: '+18.4%',
      up: true,
      sub: 'vs. 108,200 last month',
    },
    {
      label: t(d => d.demo.dashboard.kpis.activeAgents),
      value: `42 ${t(d => d.demo.dashboard.kpis.runningSuffix)}`,
      change: '+12.0%',
      up: true,
      sub: '99.98% task completion rate',
    },
    {
      label: t(d => d.demo.dashboard.kpis.compilationSpeed),
      value: '14.2 ms',
      change: '+4.1%',
      up: true,
      sub: 'Average RFC 2119 generation',
    },
    {
      label: t(d => d.demo.dashboard.kpis.hallucinationRate),
      value: '0.00%',
      change: '-100%',
      up: true,
      sub: 'Zero arbitrary Tailwind values',
    },
  ];

  const tasks = [
    {
      id: 'TSK-8921',
      title: 'Generate Master XML for Stripe Billing Module',
      agent: 'Claude 3.7 Vibe',
      category: 'coding',
      status: t(d => d.common.completed),
      time: '4 mins ago',
      tokensUsed: '2,450',
    },
    {
      id: 'TSK-8920',
      title: 'Audit WCAG 2.1 Contrast for Dark Surface Layers',
      agent: 'RAKU A11y Sentinel',
      category: 'design',
      status: t(d => d.common.completed),
      time: '18 mins ago',
      tokensUsed: '1,120',
    },
    {
      id: 'TSK-8919',
      title: 'Compile Tailwind config & inject 8pt spatial gaps',
      agent: 'DeepSeek-V3 Engine',
      category: 'devops',
      status: t(d => d.common.inProgress),
      time: '32 mins ago',
      tokensUsed: '3,800',
    },
    {
      id: 'TSK-8918',
      title: 'Refactor Button 5-Variant System across studio',
      agent: 'RAKU Core Bot',
      category: 'coding',
      status: t(d => d.common.completed),
      time: '1 hour ago',
      tokensUsed: '4,100',
    },
  ];

  const filteredTasks = tasks.filter((tItem) => {
    const matchesTab = activeTab === 'all' || tItem.category === activeTab;
    const matchesSearch =
      tItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tItem.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 text-xs">
      {/* 1. DASHBOARD HEADER TITLE & ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            style={{
              fontSize: 'var(--ui-font-size-h1, 28px)',
              lineHeight: 'var(--ui-line-height-h1, 1.2)',
              fontWeight: 'var(--ui-font-weight-h1, 800)',
            }}
            className="text-slate-900 dark:text-white font-heading"
          >
            {t(d => d.demo.dashboard.telemetryTitle)}
          </h1>
          <p
            style={{
              color: 'var(--ui-color-text-secondary, #475569)',
              fontSize: 'var(--ui-font-size-body, 13px)',
            }}
            className="mt-1 font-body"
          >
            {t(d => d.demo.dashboard.telemetrySubtitle)}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            style={{
              borderRadius: 'var(--ui-radius-lg, 12px)',
              borderColor: 'var(--ui-color-border-default, #E2E8F0)',
              backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
            }}
            className="px-3.5 py-2 border font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            {t(d => d.demo.dashboard.exportReport)}
          </button>
          <button
            style={{
              borderRadius: 'var(--ui-radius-lg, 12px)',
              backgroundColor: 'var(--ui-color-primary, #FF4F00)',
            }}
            className="px-4 py-2 text-white font-bold transition flex items-center gap-1.5 shadow-md shadow-orange-500/20 hover:brightness-105 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t(d => d.demo.dashboard.deployAgent)}</span>
          </button>
        </div>
      </div>

      {/* 2. 4 KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            style={{
              borderRadius: 'var(--ui-radius-card, var(--ui-radius-xl, 16px))',
              backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
              borderColor: 'var(--ui-color-border-default, #E2E8F0)',
              padding: 'var(--ui-padding-card, 20px)',
            }}
            className="demo-card-interactive border space-y-2"
          >
            <div
              style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
              className="font-medium text-xs"
            >
              {kpi.label}
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                {kpi.value}
              </div>
              <span
                style={{
                  color: kpi.up
                    ? 'var(--ui-color-success, #10B981)'
                    : 'var(--ui-color-error, #EF4444)',
                }}
                className="text-xs font-semibold flex items-center gap-0.5"
              >
                <TrendingUp className="w-3 h-3" />
                {kpi.change}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              {kpi.sub}
            </div>
          </div>
        ))}
      </div>

      {/* 3. CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Token Compilation Speed Chart */}
        <div
          style={{
            borderRadius: 'var(--ui-radius-card, var(--ui-radius-xl, 16px))',
            backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
            borderColor: 'var(--ui-color-border-default, #E2E8F0)',
            padding: 'var(--ui-padding-card, 20px)',
          }}
          className="demo-card-interactive lg:col-span-2 border space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm font-heading text-slate-900 dark:text-white">
                {t(d => d.demo.dashboard.charts.velocityTitle)}
              </h3>
              <p
                style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
                className="text-[11px]"
              >
                {t(d => d.demo.dashboard.charts.velocitySubtitle)}
              </p>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px]">
              <span className="flex items-center gap-1 text-slate-500">
                <span
                  style={{ backgroundColor: 'var(--ui-color-primary, #FF4F00)' }}
                  className="w-2 h-2 rounded-full"
                />
                Deterministic XML
              </span>
            </div>
          </div>

          <div className="h-44 w-full flex items-end justify-between pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--ui-color-primary, #FF4F00)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="var(--ui-color-primary, #FF4F00)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,90 Q50,40 100,65 T200,45 T300,75 T400,30 L400,120 L0,120 Z"
                fill="url(#chartGrad)"
              />
              <path
                d="M0,90 Q50,40 100,65 T200,45 T300,75 T400,30"
                fill="none"
                stroke="var(--ui-color-primary, #FF4F00)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Donut Task Distribution Chart */}
        <div
          style={{
            borderRadius: 'var(--ui-radius-card, var(--ui-radius-xl, 16px))',
            backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
            borderColor: 'var(--ui-color-border-default, #E2E8F0)',
            padding: 'var(--ui-padding-card, 20px)',
          }}
          className="demo-card-interactive border space-y-4 flex flex-col justify-between"
        >
          <div>
            <h3 className="font-bold text-sm font-heading text-slate-900 dark:text-white">
              {t(d => d.demo.dashboard.charts.distributionTitle)}
            </h3>
            <p
              style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
              className="text-[11px]"
            >
              {t(d => d.demo.dashboard.charts.distributionSubtitle)}
            </p>
          </div>

          <div className="flex items-center justify-center py-2">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100 dark:text-slate-800"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  stroke="var(--ui-color-primary, #FF4F00)"
                  strokeWidth="4"
                  strokeDasharray="50, 100"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  stroke="var(--ui-color-accent, #10B981)"
                  strokeWidth="4"
                  strokeDasharray="30, 100"
                  strokeDashoffset="-50"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-base font-extrabold font-mono text-slate-900 dark:text-white">100%</div>
                <div
                  style={{ color: 'var(--ui-color-text-tertiary, #94A3B8)' }}
                  className="text-[9px] uppercase font-bold"
                >
                  {t(d => d.demo.dashboard.charts.reliability)}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{ borderColor: 'var(--ui-color-border-subtle, #E2E8F0)' }}
            className="space-y-1.5 pt-2 border-t text-[11px]"
          >
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5">
                <span
                  style={{ backgroundColor: 'var(--ui-color-primary, #FF4F00)' }}
                  className="w-2 h-2 rounded-full"
                />
                Frontend & Tokens (50%)
              </span>
              <span className="font-mono font-bold">64.2k</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5">
                <span
                  style={{ backgroundColor: 'var(--ui-color-accent, #10B981)' }}
                  className="w-2 h-2 rounded-full"
                />
                A11y & Audits (30%)
              </span>
              <span className="font-mono font-bold">38.5k</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. RECENT ACTIVITY DATA TABLE */}
      <div
        style={{
          borderRadius: 'var(--ui-radius-card, var(--ui-radius-xl, 16px))',
          backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
          borderColor: 'var(--ui-color-border-default, #E2E8F0)',
        }}
        className="demo-card-interactive border overflow-hidden"
      >
        {/* Table Header Controls */}
        <div
          style={{ borderColor: 'var(--ui-color-border-subtle, #E2E8F0)' }}
          className="p-4 border-b flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
            {['all', 'coding', 'design', 'devops'].map((tTab) => (
              <button
                key={tTab}
                onClick={() => setActiveTab(tTab as any)}
                style={
                  activeTab === tTab
                    ? {
                        backgroundColor: 'var(--ui-color-primary, #FF4F00)',
                        color: '#FFFFFF',
                      }
                    : undefined
                }
                className={`px-3 py-1 rounded-lg capitalize font-semibold transition cursor-pointer ${
                  activeTab === tTab
                    ? 'shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tTab === 'all' ? t(d => d.common.all) : tTab}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t(d => d.demo.dashboard.table.searchPlaceholder)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Table Element */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-b border-slate-200 dark:border-slate-800 font-semibold uppercase text-[11px] tracking-wider">
              <tr>
                <th style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 14px)' }}>{t(d => d.demo.dashboard.table.taskId)}</th>
                <th style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 14px)' }}>{t(d => d.demo.dashboard.table.description)}</th>
                <th style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 14px)' }}>{t(d => d.demo.dashboard.table.agent)}</th>
                <th style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 14px)' }}>{t(d => d.demo.dashboard.table.status)}</th>
                <th style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 14px)' }}>{t(d => d.demo.dashboard.table.tokensUsed)}</th>
                <th style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 14px)' }} className="text-right">{t(d => d.demo.dashboard.table.actions)}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTasks.map((tItem) => (
                <tr key={tItem.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 14px)' }} className="font-mono font-semibold text-orange-600 dark:text-orange-400">
                    {tItem.id}
                  </td>
                  <td style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 14px)' }} className="font-medium text-slate-900 dark:text-white">
                    {tItem.title}
                  </td>
                  <td style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 14px)' }} className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                    <Bot className="w-3.5 h-3.5 text-orange-500" />
                    <span>{tItem.agent}</span>
                  </td>
                  <td style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 14px)' }}>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wider ${
                        tItem.status === t(d => d.common.completed)
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                      }`}
                    >
                      {tItem.status}
                    </span>
                  </td>
                  <td style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 14px)' }} className="font-mono text-slate-700 dark:text-slate-300">
                    {tItem.tokensUsed}
                  </td>
                  <td style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 14px)' }} className="text-right">
                    <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition cursor-pointer">
                      <MoreVertical className="w-4 h-4 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
