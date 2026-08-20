import React, { useState } from 'react';
import { DemoPageId } from '../../types';
import { useDesignStore } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';
import {
  Sparkles,
  Search,
  CheckCircle2,
  Sliders,
  Bell,
  Command,
  ShieldCheck,
  Zap,
  Layers,
  Check,
  X,
  Maximize2,
  Copy,
  Terminal,
  Activity,
  Cpu,
  Lock,
  FileCode,
  Compass,
} from 'lucide-react';

interface FeaturesPageProps {
  onNavigate: (page: DemoPageId) => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onNavigate }) => {
  const { tokens } = useDesignStore();
  const { t } = useI18n();

  // Interactive sandbox states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'tokens' | 'ai' | 'security' | 'infra'>('all');
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'ingest' | 'compile' | 'export' | 'runtime'>('ingest');
  const [strictModeEnabled, setStrictModeEnabled] = useState(true);
  const [sliderValue, setSliderValue] = useState(75);
  const [segmentedValue, setSegmentedValue] = useState<'fast' | 'balanced' | 'precise'>('balanced');
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>(['TOK-01', 'TOK-02', 'TOK-04', 'TOK-07']);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const triggerToast = () => {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 4000);
  };

  const toggleRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((r) => r !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const tableFeatures = [
    {
      id: 'TOK-01',
      name: 'Deterministic Token Engine',
      category: 'tokens',
      badge: 'Core RFC 2119',
      badgeVariant: 'primary',
      coverage: 100,
      latency: '0.4ms',
      status: 'Production',
      sla: '99.99%',
      platforms: ['React', 'Vue', 'iOS', 'Android'],
    },
    {
      id: 'TOK-02',
      name: 'Concentric Radius Automation',
      category: 'tokens',
      badge: 'Geometry Math',
      badgeVariant: 'success',
      coverage: 98.4,
      latency: '0.1ms',
      status: 'Production',
      sla: '99.99%',
      platforms: ['CSS', 'Tailwind', 'SwiftUI'],
    },
    {
      id: 'TOK-03',
      name: 'Perceptual WCAG 2.1 AAA Contrast',
      category: 'security',
      badge: 'Accessibility',
      badgeVariant: 'warning',
      coverage: 99.8,
      latency: '1.2ms',
      status: 'Production',
      sla: '100.0%',
      platforms: ['All Engines'],
    },
    {
      id: 'TOK-04',
      name: 'Real-Time CSS Variable Sync',
      category: 'tokens',
      badge: 'Hot Invalidation',
      badgeVariant: 'primary',
      coverage: 100,
      latency: '0.2ms',
      status: 'Production',
      sla: '99.99%',
      platforms: ['DOM Runtime', 'Vite', 'Next.js'],
    },
    {
      id: 'TOK-05',
      name: 'Prompt Injection Defense Shield',
      category: 'security',
      badge: 'Zero Hallucination',
      badgeVariant: 'danger',
      coverage: 96.5,
      latency: '2.4ms',
      status: 'Production',
      sla: '99.95%',
      platforms: ['LLM Gateway', 'API'],
    },
    {
      id: 'TOK-06',
      name: 'Multi-Agent Collaborative Sandbox',
      category: 'ai',
      badge: 'Autonomous Pair',
      badgeVariant: 'secondary',
      coverage: 92.0,
      latency: '3.1ms',
      status: 'Beta v2.4',
      sla: '99.9%',
      platforms: ['Antigravity Studio'],
    },
    {
      id: 'TOK-07',
      name: 'Modular 5-Tier Spatial Scale',
      category: 'tokens',
      badge: '8-Point System',
      badgeVariant: 'primary',
      coverage: 100,
      latency: '0.1ms',
      status: 'Production',
      sla: '99.99%',
      platforms: ['Tailwind', 'SCSS', 'Style-Dictionary'],
    },
    {
      id: 'TOK-08',
      name: 'Dynamic Google Fonts Loader',
      category: 'infra',
      badge: '60+ Fonts Catalog',
      badgeVariant: 'success',
      coverage: 97.2,
      latency: '12ms',
      status: 'Production',
      sla: '99.9%',
      platforms: ['CDN', 'Edge Cache'],
    },
    {
      id: 'TOK-09',
      name: 'SOC2 Type II Telemetry Audit',
      category: 'security',
      badge: 'Enterprise Compliance',
      badgeVariant: 'warning',
      coverage: 100,
      latency: '0.8ms',
      status: 'Certified',
      sla: '100.0%',
      platforms: ['AWS GovCloud', 'GCP EU'],
    },
  ];

  const filteredFeatures = tableFeatures.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div
      style={{
        rowGap: 'var(--ui-gap-sections, 64px)',
      }}
      className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col transition-all duration-300"
    >
      {/* -------------------------------------------------------------
          1. HERO HEADER WITH ENTERPRISE VALUE PROP & ACTION BAR
      ------------------------------------------------------------- */}
      <section className="space-y-6 text-center sm:text-left">
        {/* Breadcrumbs */}
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-500 font-mono">
          <span className="hover:text-indigo-600 cursor-pointer">
            {t((d) => d.demo.features.breadcrumbPlatform)}
          </span>
          <span>/</span>
          <span className="hover:text-indigo-600 cursor-pointer">
            {t((d) => d.demo.features.breadcrumbEnterprise)}
          </span>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-bold">
            {t((d) => d.demo.features.breadcrumbEngine)}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>{t((d) => d.demo.features.badge)}</span>
            </div>
            <h1
              style={{
                fontSize: 'var(--ui-font-size-display, 48px)',
                lineHeight: 'var(--ui-line-height-display, 1.1)',
                fontWeight: 'var(--ui-font-weight-display, 800)',
                letterSpacing: 'var(--ui-letter-spacing-display, -0.03em)',
              }}
              className="text-slate-900 dark:text-white font-heading"
            >
              {t((d) => d.demo.features.heroTitle)}
            </h1>
            <p
              style={{
                color: 'var(--ui-color-text-secondary, #64748B)',
                fontSize: 'var(--ui-font-size-body, 14px)',
                lineHeight: 'var(--ui-line-height-body, 1.5)',
              }}
              className="leading-relaxed"
            >
              {t((d) => d.demo.features.heroSubtitle)}
            </p>
          </div>

          {/* Quick Action Button Group */}
          <div
            style={{ columnGap: 'var(--ui-gap-button-group, 12px)' }}
            className="flex flex-wrap items-center justify-center sm:justify-end shrink-0 gap-2"
          >
            <button
              type="button"
              onClick={triggerToast}
              style={{
                borderRadius: 'var(--radius-md, 8px)',
                paddingLeft: 'var(--ui-padding-button-md-x, 16px)',
                paddingRight: 'var(--ui-padding-button-md-x, 16px)',
                paddingTop: 'var(--ui-padding-button-md-y, 8px)',
                paddingBottom: 'var(--ui-padding-button-md-y, 8px)',
                gap: 'var(--ui-gap-icon-text, 8px)',
                transitionDuration: 'var(--motion-duration-fast, 150ms)',
              }}
              className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs inline-flex items-center shadow-xs cursor-pointer select-none"
            >
              <Bell className="w-3.5 h-3.5 text-indigo-500" />
              <span>{t((d) => d.demo.features.testToastBtn)}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              style={{
                backgroundColor: 'var(--ui-color-primary, #6366F1)',
                borderRadius: 'var(--radius-md, 8px)',
                paddingLeft: 'var(--ui-padding-button-md-x, 16px)',
                paddingRight: 'var(--ui-padding-button-md-x, 16px)',
                paddingTop: 'var(--ui-padding-button-md-y, 8px)',
                paddingBottom: 'var(--ui-padding-button-md-y, 8px)',
                gap: 'var(--ui-gap-icon-text, 8px)',
                transitionDuration: 'var(--motion-duration-fast, 150ms)',
              }}
              className="text-white font-bold text-xs inline-flex items-center shadow-md hover:opacity-90 cursor-pointer select-none"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{t((d) => d.demo.features.openModalBtn)}</span>
            </button>
          </div>
        </div>

        {/* Interactive Search & Multi-Module Filter Bar */}
        <div
          style={{
            borderRadius: 'var(--radius-xl, 16px)',
            backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
            borderColor: 'var(--ui-color-border-default, #E2E8F0)',
            padding: 'var(--ui-padding-card, 20px)',
            columnGap: 'var(--ui-gap-form-fields, 16px)',
            rowGap: 'var(--ui-gap-form-fields, 16px)',
          }}
          className="demo-card-interactive border flex flex-col md:flex-row items-stretch md:items-center justify-between"
        >
          {/* Search Input with Shortcut Badge */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t((d) => d.demo.features.searchPlaceholder)}
              style={{
                borderRadius: 'var(--radius-md, 8px)',
                paddingLeft: '36px',
                paddingRight: '64px',
                paddingTop: 'var(--ui-padding-input-y, 8px)',
                paddingBottom: 'var(--ui-padding-input-y, 8px)',
                borderColor: 'var(--ui-color-border-default, #E2E8F0)',
              }}
              className="w-full text-xs bg-slate-50 dark:bg-slate-900 border outline-none text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 transition font-sans"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono text-slate-500">
              <Command className="w-2.5 h-2.5" />
              <span>K</span>
            </div>
          </div>

          {/* Filter Tabs */}
          <div
            style={{ columnGap: 'var(--ui-gap-button-group, 12px)' }}
            className="flex items-center flex-wrap gap-1"
          >
            {[
              { key: 'all', label: t((d) => d.demo.features.filterAll) },
              { key: 'tokens', label: t((d) => d.demo.features.filterTokens) },
              { key: 'ai', label: t((d) => d.demo.features.filterAi) },
              { key: 'security', label: t((d) => d.demo.features.filterSecurity) },
              { key: 'infra', label: t((d) => d.demo.features.filterInfra) },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveCategory(tab.key as any)}
                style={{
                  borderRadius: 'var(--radius-md, 8px)',
                  paddingLeft: '12px',
                  paddingRight: '12px',
                  paddingTop: '6px',
                  paddingBottom: '6px',
                  transitionDuration: 'var(--motion-duration-fast, 150ms)',
                }}
                className={`text-xs font-semibold select-none transition cursor-pointer ${
                  activeCategory === tab.key
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. FOUR CORE PLATFORM PILLARS (BENTO ARCHITECTURE)
      ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <h2
            style={{
              fontSize: 'var(--ui-font-size-h2, 24px)',
              lineHeight: 'var(--ui-line-height-h2, 1.25)',
              fontWeight: 'var(--ui-font-weight-h2, 700)',
            }}
            className="text-slate-900 dark:text-white font-heading"
          >
            {t((d) => d.demo.features.pillarsTitle)}
          </h2>
          <span className="text-xs font-mono text-slate-400">
            {t((d) => d.demo.features.pillarsSubtitle)}
          </span>
        </div>

        <div
          style={{
            gap: 'var(--ui-gap-card-grid, 24px)',
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              title: t((d) => d.demo.features.pillar1Title),
              desc: t((d) => d.demo.features.pillar1Desc),
              icon: Layers,
              metric: t((d) => d.demo.features.pillar1Metric),
              badge: t((d) => d.demo.features.pillar1Badge),
            },
            {
              title: t((d) => d.demo.features.pillar2Title),
              desc: t((d) => d.demo.features.pillar2Desc),
              icon: ShieldCheck,
              metric: t((d) => d.demo.features.pillar2Metric),
              badge: t((d) => d.demo.features.pillar2Badge),
            },
            {
              title: t((d) => d.demo.features.pillar3Title),
              desc: t((d) => d.demo.features.pillar3Desc),
              icon: Terminal,
              metric: t((d) => d.demo.features.pillar3Metric),
              badge: t((d) => d.demo.features.pillar3Badge),
            },
            {
              title: t((d) => d.demo.features.pillar4Title),
              desc: t((d) => d.demo.features.pillar4Desc),
              icon: Zap,
              metric: t((d) => d.demo.features.pillar4Metric),
              badge: t((d) => d.demo.features.pillar4Badge),
            },
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                style={{
                  borderRadius: 'var(--radius-xl, 16px)',
                  backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
                  borderColor: 'var(--ui-color-border-default, #E2E8F0)',
                  padding: 'var(--ui-padding-card, 20px)',
                  gap: 'var(--ui-gap-card-compound, 16px)',
                }}
                className="demo-card-interactive border flex flex-col justify-between transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--ui-color-primary, #6366F1) 12%, transparent)',
                        color: 'var(--ui-color-primary, #6366F1)',
                        borderRadius: 'var(--radius-md, 8px)',
                      }}
                      className="w-10 h-10 flex items-center justify-center font-bold group-hover:scale-105 transition"
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      style={{
                        borderRadius: 'var(--radius-full, 9999px)',
                        paddingLeft: 'var(--ui-padding-badge-x, 8px)',
                        paddingRight: 'var(--ui-padding-badge-x, 8px)',
                        paddingTop: 'var(--ui-padding-badge-y, 2px)',
                        paddingBottom: 'var(--ui-padding-badge-y, 2px)',
                      }}
                      className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white font-heading">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-400">Benchmark:</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{pillar.metric}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* -------------------------------------------------------------
          3. INTERACTIVE BENTO STRESS-TEST GRID
      ------------------------------------------------------------- */}
      <section
        style={{
          gap: 'var(--ui-gap-card-grid, 24px)',
        }}
        className="grid grid-cols-1 md:grid-cols-3"
      >
        {/* Card A: Form Controls & Inputs Stress-Test */}
        <div
          style={{
            borderRadius: 'var(--radius-xl, 16px)',
            backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
            borderColor: 'var(--ui-color-border-default, #E2E8F0)',
            padding: 'var(--ui-padding-card, 20px)',
            gap: 'var(--ui-gap-card-compound, 16px)',
          }}
          className="demo-card-interactive border flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--ui-color-primary, #6366F1) 12%, transparent)',
                    color: 'var(--ui-color-primary, #6366F1)',
                    borderRadius: 'var(--radius-md, 8px)',
                  }}
                  className="w-8 h-8 flex items-center justify-center font-bold"
                >
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                    {t((d) => d.demo.features.formControlsTitle)}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {t((d) => d.demo.features.formControlsSubtitle)}
                  </p>
                </div>
              </div>
              <span
                style={{
                  borderRadius: 'var(--radius-full, 9999px)',
                  paddingLeft: 'var(--ui-padding-badge-x, 8px)',
                  paddingRight: 'var(--ui-padding-badge-x, 8px)',
                  paddingTop: 'var(--ui-padding-badge-y, 2px)',
                  paddingBottom: 'var(--ui-padding-badge-y, 2px)',
                }}
                className="text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
              >
                LIVE
              </span>
            </div>

            {/* Input with Label & Error Gaps */}
            <div
              style={{
                rowGap: 'var(--ui-gap-label-input, 6px)',
              }}
              className="flex flex-col"
            >
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {t((d) => d.demo.features.prefixTokenLabel)}
              </label>
              <input
                type="text"
                defaultValue="--ui-"
                style={{
                  borderRadius: 'var(--radius-md, 8px)',
                  paddingLeft: 'var(--ui-padding-input-x, 12px)',
                  paddingRight: 'var(--ui-padding-input-x, 12px)',
                  paddingTop: 'var(--ui-padding-input-y, 8px)',
                  paddingBottom: 'var(--ui-padding-input-y, 8px)',
                  borderColor: 'var(--ui-color-border-default, #E2E8F0)',
                }}
                className="w-full text-xs bg-slate-50 dark:bg-slate-900 border outline-none text-slate-900 dark:text-white focus:border-indigo-500 font-mono transition"
              />
              <div
                style={{
                  marginTop: 'var(--ui-gap-input-error, 4px)',
                }}
                className="text-[11px] text-slate-400 flex items-center gap-1"
              >
                <Activity className="w-3 h-3 text-indigo-500" />
                <span>{t((d) => d.demo.features.prefixTokenHelper)}</span>
              </div>
            </div>

            {/* Toggle Switch */}
            <div
              style={{
                gap: 'var(--ui-gap-checkbox-label, 8px)',
              }}
              className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800"
            >
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {t((d) => d.demo.features.strictModeTitle)}
                </div>
                <div className="text-[10px] text-slate-400">
                  {t((d) => d.demo.features.strictModeDesc)}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStrictModeEnabled(!strictModeEnabled)}
                style={{
                  backgroundColor: strictModeEnabled ? 'var(--ui-color-primary, #6366F1)' : '#94A3B8',
                  borderRadius: 'var(--radius-full, 9999px)',
                  transitionDuration: 'var(--motion-duration-fast, 150ms)',
                }}
                className="w-10 h-5.5 relative inline-flex items-center p-0.5 cursor-pointer select-none"
              >
                <span
                  style={{
                    borderRadius: 'var(--radius-full, 9999px)',
                    transform: strictModeEnabled ? 'translateX(18px)' : 'translateX(2px)',
                    transitionDuration: 'var(--motion-duration-fast, 150ms)',
                  }}
                  className="w-4.5 h-4.5 bg-white shadow-sm inline-block"
                />
              </button>
            </div>

            {/* Slider Range */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {t((d) => d.demo.features.densityLabel)}
                </span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{sliderValue}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(parseInt(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Card B: Concentric Radius & Nested Depth */}
        <div
          style={{
            borderRadius: 'var(--radius-xl, 16px)',
            backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
            borderColor: 'var(--ui-color-border-default, #E2E8F0)',
            padding: 'var(--ui-padding-card, 20px)',
            gap: 'var(--ui-gap-card-compound, 16px)',
          }}
          className="demo-card-interactive border flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--ui-color-success, #10B981) 12%, transparent)',
                    color: 'var(--ui-color-success, #10B981)',
                    borderRadius: 'var(--radius-md, 8px)',
                  }}
                  className="w-8 h-8 flex items-center justify-center font-bold"
                >
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                    {t((d) => d.demo.features.concentricTitle)}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {t((d) => d.demo.features.concentricSubtitle)}
                  </p>
                </div>
              </div>
              <span
                style={{
                  borderRadius: 'var(--radius-full, 9999px)',
                  paddingLeft: 'var(--ui-padding-badge-x, 8px)',
                  paddingRight: 'var(--ui-padding-badge-x, 8px)',
                  paddingTop: 'var(--ui-padding-badge-y, 2px)',
                  paddingBottom: 'var(--ui-padding-badge-y, 2px)',
                }}
                className="text-[10px] font-mono font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400"
              >
                MATHEMATICAL
              </span>
            </div>

            {/* Outer Nested Card */}
            <div
              style={{
                borderRadius: 'var(--radius-lg, 12px)',
                padding: 'var(--ui-padding-card, 20px)',
                borderColor: 'var(--ui-color-border-subtle, #F1F5F9)',
              }}
              className="bg-slate-50 dark:bg-slate-900/80 border space-y-3 relative overflow-hidden"
            >
              <div className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                {t((d) => d.demo.features.outerLayerLabel)}
              </div>

              {/* Inner Nested Card */}
              <div
                style={{
                  borderRadius: 'var(--radius-md, 8px)',
                  padding: '12px',
                  boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05))',
                  borderColor: 'var(--ui-color-border-default, #E2E8F0)',
                }}
                className="bg-white dark:bg-slate-800 border flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {t((d) => d.demo.features.innerLayerLabel)}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  {t((d) => d.demo.features.innerRadiusLabel)}
                </span>
              </div>
            </div>

            {/* Segmented Control */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {t((d) => d.demo.features.executionModeLabel)}
              </label>
              <div className="grid grid-cols-3 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px]">
                {(['fast', 'balanced', 'precise'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSegmentedValue(mode)}
                    style={{
                      borderRadius: 'var(--radius-sm, 4px)',
                      transitionDuration: 'var(--motion-duration-fast, 150ms)',
                    }}
                    className={`py-1 text-center font-semibold capitalize transition select-none cursor-pointer ${
                      segmentedValue === mode
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card C: Real-Time Feedback, Badges & Overlays */}
        <div
          style={{
            borderRadius: 'var(--radius-xl, 16px)',
            backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
            borderColor: 'var(--ui-color-border-default, #E2E8F0)',
            padding: 'var(--ui-padding-card, 20px)',
            gap: 'var(--ui-gap-card-compound, 16px)',
          }}
          className="demo-card-interactive border flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--ui-color-warning, #F59E0B) 12%, transparent)',
                    color: 'var(--ui-color-warning, #F59E0B)',
                    borderRadius: 'var(--radius-md, 8px)',
                  }}
                  className="w-8 h-8 flex items-center justify-center font-bold"
                >
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                    {t((d) => d.demo.features.feedbackTitle)}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {t((d) => d.demo.features.feedbackSubtitle)}
                  </p>
                </div>
              </div>
              <span
                style={{
                  borderRadius: 'var(--radius-full, 9999px)',
                  paddingLeft: 'var(--ui-padding-badge-x, 8px)',
                  paddingRight: 'var(--ui-padding-badge-x, 8px)',
                  paddingTop: 'var(--ui-padding-badge-y, 2px)',
                  paddingBottom: 'var(--ui-padding-badge-y, 2px)',
                }}
                className="text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400"
              >
                INTERACTIVE
              </span>
            </div>

            {/* Dismissible Alert Banner */}
            {!alertDismissed ? (
              <div
                style={{
                  borderRadius: 'var(--radius-md, 8px)',
                  gap: 'var(--ui-gap-icon-text, 8px)',
                }}
                className="p-3 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex items-start justify-between text-xs text-emerald-800 dark:text-emerald-300"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-bold">{t((d) => d.demo.features.alertTitle)}</div>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400">
                      {t((d) => d.demo.features.alertDesc)}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAlertDismissed(true)}
                  className="p-0.5 hover:bg-emerald-200/60 dark:hover:bg-emerald-900/60 rounded cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAlertDismissed(false)}
                className="w-full py-1.5 text-center text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer"
              >
                {t((d) => d.demo.features.alertReset)}
              </button>
            )}

            {/* Badges & Chips Collection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {t((d) => d.demo.features.badgeShowcaseLabel)}
              </label>
              <div className="flex flex-wrap gap-1.5">
                <span
                  style={{
                    borderRadius: 'var(--radius-full, 9999px)',
                    paddingLeft: 'var(--ui-padding-badge-x, 8px)',
                    paddingRight: 'var(--ui-padding-badge-x, 8px)',
                    paddingTop: 'var(--ui-padding-badge-y, 2px)',
                    paddingBottom: 'var(--ui-padding-badge-y, 2px)',
                    backgroundColor: 'var(--ui-color-primary, #6366F1)',
                  }}
                  className="text-[10px] font-bold text-white shadow-xs"
                >
                  {t((d) => d.demo.features.badgePrimary)}
                </span>
                <span
                  style={{
                    borderRadius: 'var(--radius-full, 9999px)',
                    paddingLeft: 'var(--ui-padding-badge-x, 8px)',
                    paddingRight: 'var(--ui-padding-badge-x, 8px)',
                    paddingTop: 'var(--ui-padding-badge-y, 2px)',
                    paddingBottom: 'var(--ui-padding-badge-y, 2px)',
                    borderColor: 'var(--ui-color-border-default, #E2E8F0)',
                  }}
                  className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border"
                >
                  {t((d) => d.demo.features.badgeSubtle)}
                </span>
                <span
                  style={{
                    borderRadius: 'var(--radius-full, 9999px)',
                    paddingLeft: 'var(--ui-padding-badge-x, 8px)',
                    paddingRight: 'var(--ui-padding-badge-x, 8px)',
                    paddingTop: 'var(--ui-padding-badge-y, 2px)',
                    paddingBottom: 'var(--ui-padding-badge-y, 2px)',
                  }}
                  className="text-[10px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400"
                >
                  {t((d) => d.demo.features.badgeDestructive)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          4. INTERACTIVE WORKFLOW COMPILER SIMULATOR
      ------------------------------------------------------------- */}
      <section
        style={{
          borderRadius: 'var(--radius-xl, 16px)',
          backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
          borderColor: 'var(--ui-color-border-default, #E2E8F0)',
          padding: 'var(--ui-padding-card, 20px)',
          gap: 'var(--ui-gap-card-compound, 16px)',
        }}
        className="demo-card-interactive border flex flex-col space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2
              style={{
                fontSize: 'var(--ui-font-size-h2, 24px)',
                lineHeight: 'var(--ui-line-height-h2, 1.25)',
                fontWeight: 'var(--ui-font-weight-h2, 700)',
              }}
              className="text-slate-900 dark:text-white font-heading"
            >
              {t((d) => d.demo.features.pipelineTitle)}
            </h2>
            <p className="text-xs text-slate-500">
              {t((d) => d.demo.features.pipelineSubtitle)}
            </p>
          </div>

          {/* Workflow Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
            {[
              { key: 'ingest', label: t((d) => d.demo.features.stage1Tab), icon: Compass },
              { key: 'compile', label: t((d) => d.demo.features.stage2Tab), icon: Cpu },
              { key: 'export', label: t((d) => d.demo.features.stage3Tab), icon: FileCode },
              { key: 'runtime', label: t((d) => d.demo.features.stage4Tab), icon: Zap },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveWorkflowTab(tab.key as any)}
                  style={{
                    borderRadius: 'var(--radius-sm, 4px)',
                    transitionDuration: 'var(--motion-duration-fast, 150ms)',
                  }}
                  className={`px-3 py-1.5 font-semibold inline-flex items-center gap-1.5 transition select-none cursor-pointer ${
                    activeWorkflowTab === tab.key
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Workflow Content Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {activeWorkflowTab === 'ingest' && (
              <>
                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-indigo-500" />
                  <span>{t((d) => d.demo.features.stage1Title)}</span>
                </div>
                <p>{t((d) => d.demo.features.stage1Desc)}</p>
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-[11px] space-y-1">
                  <div className="text-slate-400">// Ingestion Validation Summary</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold">✓ 38 Color Tokens validated (WCAG AAA)</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold">✓ 9 Semantic Typography tiers mapped</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold">✓ 11 Spacing increments generated</div>
                </div>
              </>
            )}

            {activeWorkflowTab === 'compile' && (
              <>
                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-500" />
                  <span>{t((d) => d.demo.features.stage2Title)}</span>
                </div>
                <p>{t((d) => d.demo.features.stage2Desc)}</p>
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-[11px] space-y-1">
                  <div className="text-slate-400">// Compiler Optimization Pass</div>
                  <div className="text-indigo-600 dark:text-indigo-400 font-bold">⚡ Concentric radiuses bound: 5 tiers</div>
                  <div className="text-indigo-600 dark:text-indigo-400 font-bold">⚡ Zero hardcoded dimensions constraint applied</div>
                </div>
              </>
            )}

            {activeWorkflowTab === 'export' && (
              <>
                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-indigo-500" />
                  <span>{t((d) => d.demo.features.stage3Title)}</span>
                </div>
                <p>{t((d) => d.demo.features.stage3Desc)}</p>
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-[11px] space-y-1">
                  <div className="text-slate-400">// Export Formats Available</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold">✓ master_ui_spec.xml (RFC 2119 Compliant)</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold">✓ tailwind.config.js</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold">✓ tokens.css & design_tokens.json</div>
                </div>
              </>
            )}

            {activeWorkflowTab === 'runtime' && (
              <>
                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-indigo-500" />
                  <span>{t((d) => d.demo.features.stage4Title)}</span>
                </div>
                <p>{t((d) => d.demo.features.stage4Desc)}</p>
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-[11px] space-y-1">
                  <div className="text-slate-400">// Live Invalidation Telemetry</div>
                  <div className="text-indigo-600 dark:text-indigo-400 font-bold">⚡ Total Latency: 0.2ms (Zero re-render penalty)</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Full DOM Tree Synchronized</div>
                </div>
              </>
            )}
          </div>

          {/* Live Code Preview Box */}
          <div className="p-4 bg-slate-950 text-slate-200 rounded-xl border border-slate-800 font-mono text-xs space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="text-[11px]">compiled_spec_preview.xml</span>
              <button
                type="button"
                onClick={() =>
                  handleCopyCode(
                    `<spacing_and_sizing base="8px" height_formula="Height = (Padding_Y * 2) + LineHeight" />`
                  )
                }
                className="hover:text-white transition flex items-center gap-1 text-[10px] cursor-pointer"
              >
                {copiedSnippet ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSnippet ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="text-[11px] text-emerald-400 overflow-x-auto leading-relaxed">
              {`<!-- Deterministic RFC 2119 Directives -->
<ui_kit_specification version="1.0.0">
  <foundations>
    <colors brand_primary="${tokens.foundations.colors.brand.primary}" />
    <typography heading_font="${tokens.foundations.typography.fontHeading}" />
    <spacing_and_sizing base_grid="8px" 
      padding_button_x="${tokens.foundations.spacing.padding?.buttonMd?.px || 16}px"
      gap_icon_text="${tokens.foundations.spacing.microGaps?.iconText || 8}px" />
  </foundations>
</ui_kit_specification>`}
            </pre>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          5. FULL-WIDTH DATA DISPLAY & COMPARISON TABLE
      ------------------------------------------------------------- */}
      <section
        style={{
          borderRadius: 'var(--radius-xl, 16px)',
          backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
          borderColor: 'var(--ui-color-border-default, #E2E8F0)',
          padding: 'var(--ui-padding-card, 20px)',
          gap: 'var(--ui-gap-card-compound, 16px)',
        }}
        className="demo-card-interactive border flex flex-col space-y-4 overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2
              style={{
                fontSize: 'var(--ui-font-size-h2, 24px)',
                lineHeight: 'var(--ui-line-height-h2, 1.25)',
                fontWeight: 'var(--ui-font-weight-h2, 700)',
              }}
              className="text-slate-900 dark:text-white font-heading"
            >
              {t((d) => d.demo.features.matrixTitle)}
            </h2>
            <p className="text-xs text-slate-500">
              {t((d) => d.demo.features.matrixSubtitle)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">
              Selected: <strong className="text-indigo-600 dark:text-indigo-400">{selectedRows.length}</strong> / {tableFeatures.length}
            </span>
          </div>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-500 font-semibold font-mono text-[11px]">
                <th style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 12px)' }} className="w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === tableFeatures.length}
                    onChange={() => {
                      if (selectedRows.length === tableFeatures.length) {
                        setSelectedRows([]);
                      } else {
                        setSelectedRows(tableFeatures.map((t) => t.id));
                      }
                    }}
                    className="accent-indigo-600 cursor-pointer"
                  />
                </th>
                <th style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 12px)' }}>{t((d) => d.demo.features.colModule)}</th>
                <th style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 12px)' }}>{t((d) => d.demo.features.colDirective)}</th>
                <th style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 12px)' }}>{t((d) => d.demo.features.colCoverage)}</th>
                <th style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 12px)' }}>{t((d) => d.demo.features.colLatency)}</th>
                <th style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 12px)' }}>{t((d) => d.demo.features.colSla)}</th>
                <th style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 12px)' }}>{t((d) => d.demo.features.colStatus)}</th>
              </tr>
            </thead>
            <tbody
              style={{
                rowGap: 'var(--ui-gap-list-rows, 8px)',
              }}
              className="divide-y divide-slate-100 dark:divide-slate-800/60"
            >
              {filteredFeatures.map((row) => {
                const isSelected = selectedRows.includes(row.id);
                return (
                  <tr
                    key={row.id}
                    onClick={() => toggleRow(row.id)}
                    style={{
                      transitionDuration: 'var(--motion-duration-fast, 150ms)',
                    }}
                    className={`cursor-pointer transition select-none ${
                      isSelected
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/40 font-semibold'
                        : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <td style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 12px)' }} className="text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(row.id)}
                        className="accent-indigo-600 cursor-pointer"
                      />
                    </td>
                    <td style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 12px)' }}>
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{row.name}</span>
                        <span className="text-[10px] font-mono text-slate-400 font-normal">({row.id})</span>
                      </div>
                    </td>
                    <td style={{ padding: 'calc(var(--ui-table-row-height, 52px) / 4) var(--ui-padding-table-cell-x, 12px)' }}>
                      <span
                        style={{
                          borderRadius: 'var(--radius-sm, 4px)',
                          paddingLeft: '6px',
                          paddingRight: '6px',
                          paddingTop: '2px',
                          paddingBottom: '2px',
                        }}
                        className="font-mono text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {row.badge}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            style={{
                              width: `${row.coverage}%`,
                              backgroundColor: 'var(--ui-color-primary, #6366F1)',
                            }}
                            className="h-full rounded-full"
                          />
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          {row.coverage}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-500 font-bold">{row.latency}</td>
                    <td className="py-3 px-3 font-mono text-slate-500">{row.sla}</td>
                    <td className="py-3 px-3">
                      <span
                        style={{
                          borderRadius: 'var(--radius-full, 9999px)',
                          paddingLeft: 'var(--ui-padding-badge-x, 8px)',
                          paddingRight: 'var(--ui-padding-badge-x, 8px)',
                          paddingTop: 'var(--ui-padding-badge-y, 2px)',
                          paddingBottom: 'var(--ui-padding-badge-y, 2px)',
                        }}
                        className="text-[10px] font-bold inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                      >
                        <Check className="w-3 h-3" />
                        <span>{row.status}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* -------------------------------------------------------------
          6. ENTERPRISE COMPLIANCE & SECURITY BANNER
      ------------------------------------------------------------- */}
      <section
        style={{
          borderRadius: 'var(--radius-xl, 16px)',
          backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
          borderColor: 'var(--ui-color-border-default, #E2E8F0)',
          padding: 'var(--ui-padding-card, 20px)',
          gap: 'var(--ui-gap-card-compound, 16px)',
        }}
        className="demo-card-interactive border flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Lock className="w-4 h-4 text-emerald-500" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white font-heading">
              {t((d) => d.demo.features.complianceTitle)}
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            {t((d) => d.demo.features.complianceDesc)}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {['SOC2 TYPE II', 'ISO 27001', 'GDPR COMPLIANT', 'HIPAA READY', '99.99% SLA'].map((cert) => (
            <span
              key={cert}
              style={{
                borderRadius: 'var(--radius-md, 8px)',
              }}
              className="px-3 py-1.5 text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              {cert}
            </span>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          7. FLOATING TOAST NOTIFICATION OVERLAY (TESTING)
      ------------------------------------------------------------- */}
      {toastVisible && (
        <div
          style={{
            borderRadius: 'var(--radius-lg, 12px)',
            backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
            borderColor: 'var(--ui-color-border-default, #E2E8F0)',
            boxShadow: 'var(--shadow-dropdown, 0 10px 15px rgba(0,0,0,0.1))',
            padding: '16px',
            gap: 'var(--ui-gap-icon-text, 8px)',
            transitionDuration: 'var(--motion-duration-fast, 150ms)',
          }}
          className="fixed bottom-6 right-6 z-50 border flex items-center max-w-sm animate-in slide-in-from-bottom-5 duration-200"
        >
          <div
            style={{
              backgroundColor: 'color-mix(in srgb, var(--ui-color-success, #10B981) 15%, transparent)',
              color: 'var(--ui-color-success, #10B981)',
              borderRadius: 'var(--radius-full, 9999px)',
            }}
            className="w-8 h-8 flex items-center justify-center shrink-0"
          >
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="space-y-0.5 flex-1 pr-2">
            <div className="text-xs font-bold text-slate-900 dark:text-white">
              {t((d) => d.demo.features.toastSuccessTitle)}
            </div>
            <div className="text-[11px] text-slate-500">
              {t((d) => d.demo.features.toastSuccessDesc)}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setToastVisible(false)}
            className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* -------------------------------------------------------------
          8. MODAL DIALOG SANDBOX OVERLAY (TESTING)
      ------------------------------------------------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            style={{
              borderRadius: 'var(--radius-xl, 16px)',
              backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
              borderColor: 'var(--ui-color-border-default, #E2E8F0)',
              boxShadow: 'var(--shadow-modal, 0 25px 50px -12px rgba(0,0,0,0.25))',
              padding: 'var(--ui-padding-modal, 24px)',
              gap: 'var(--ui-gap-modal-compound, 20px)',
            }}
            className="w-full max-w-md border flex flex-col space-y-4 animate-in zoom-in-95 duration-150"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--ui-color-primary, #6366F1) 12%, transparent)',
                    color: 'var(--ui-color-primary, #6366F1)',
                    borderRadius: 'var(--radius-md, 8px)',
                  }}
                  className="w-8 h-8 flex items-center justify-center font-bold"
                >
                  <Terminal className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {t((d) => d.demo.features.modalTitle)}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>{t((d) => d.demo.features.modalDesc)}</p>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-[11px] space-y-1">
                <div className="text-slate-500">Active Compound Metrics:</div>
                <div className="text-indigo-600 dark:text-indigo-400 font-bold">
                  {t((d) => d.demo.features.modalPaddingInfo)} {tokens.foundations.spacing.padding?.modal?.p || 24}px
                </div>
                <div className="text-indigo-600 dark:text-indigo-400 font-bold">
                  {t((d) => d.demo.features.modalGapInfo)} {tokens.foundations.spacing.compound?.modalHeaderBody || 20}px
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div
              style={{
                columnGap: 'var(--ui-gap-button-group, 12px)',
              }}
              className="flex items-center justify-end pt-3 border-t border-slate-100 dark:border-slate-800"
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  borderRadius: 'var(--radius-md, 8px)',
                  paddingLeft: 'var(--ui-padding-button-md-x, 16px)',
                  paddingRight: 'var(--ui-padding-button-md-x, 16px)',
                  paddingTop: 'var(--ui-padding-button-md-y, 8px)',
                  paddingBottom: 'var(--ui-padding-button-md-y, 8px)',
                }}
                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 transition cursor-pointer"
              >
                {t((d) => d.demo.features.closeSandboxBtn)}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  triggerToast();
                }}
                style={{
                  backgroundColor: 'var(--ui-color-primary, #6366F1)',
                  borderRadius: 'var(--radius-md, 8px)',
                  paddingLeft: 'var(--ui-padding-button-md-x, 16px)',
                  paddingRight: 'var(--ui-padding-button-md-x, 16px)',
                  paddingTop: 'var(--ui-padding-button-md-y, 8px)',
                  paddingBottom: 'var(--ui-padding-button-md-y, 8px)',
                }}
                className="text-white font-bold text-xs shadow-md hover:opacity-90 transition cursor-pointer"
              >
                {t((d) => d.demo.features.confirmToastBtn)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
