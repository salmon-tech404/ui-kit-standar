import React, { useState } from 'react';
import { DemoPageId } from '../../types';
import { useDesignStore } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Boxes,
  Zap,
  ShieldCheck,
  Code2,
  Terminal,
  Cpu,
  Layers,
  ChevronDown,
  Star,
  Play,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: DemoPageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { tokens } = useDesignStore();
  const { t } = useI18n();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const features = [
    {
      icon: Terminal,
      title: 'Vibe Coding Intelligence',
      desc: 'Inject deterministic RFC 2119 directives straight into Claude 3.7 & Cursor .cursorrules to completely eliminate UI hallucinations.',
    },
    {
      icon: Layers,
      title: 'Single Source of Truth',
      desc: 'All colors, typographies, and 8-point spatial gaps originate from a unified schema, updating entire web apps in 0ms.',
    },
    {
      icon: ShieldCheck,
      title: 'WCAG 2.1 AAA Accessibility',
      desc: 'Built-in color engine automatically evaluates contrast ratios and guarantees full keyboard navigation support.',
    },
    {
      icon: Zap,
      title: 'Concentric Radius Math',
      desc: 'Inner containers calculate their border radius dynamically: R_inner = max(0, R_outer - Padding).',
    },
    {
      icon: Code2,
      title: 'Multi-Format Export',
      desc: 'Export effortlessly to Master XML, W3C Design Tokens JSON, tailwind.config.js, and native CSS Variables.',
    },
    {
      icon: Cpu,
      title: 'DeepSeek-V3 Engine',
      desc: 'Generate complete, harmonious theme token palettes in seconds with AI prompt understanding and JSON validation.',
    },
  ];

  const testimonials = [
    {
      quote: 'RAKU changed how our engineering team builds with AI. We went from fixing broken Tailwind layouts to shipping 5x faster with zero styling bugs.',
      name: 'Kenji Sato',
      role: 'VP of Product at Vercel Partner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    {
      quote: 'The Master XML specification is the missing bridge between LLMs and real UI engineering. AI literally cannot create ugly layouts anymore.',
      name: 'Elena Rostova',
      role: 'Lead Systems Architect at Stripe Ecosystem',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    {
      quote: 'The 8-point spatial grid and concentric radius formula make every card and modal look like Apple and Linear designed them.',
      name: 'Alex Thorne',
      role: 'Founder at Kantan Flow',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    },
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever free',
      desc: 'For solo developers and indie hackers experimenting with vibe coding.',
      features: ['Up to 3 design projects', 'Master XML export', 'Standard CSS Variables', 'Community Discord support'],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Pro Standard',
      price: billingPeriod === 'monthly' ? '$29' : '$24',
      period: 'per month, billed ' + billingPeriod,
      desc: 'For professional engineers and startups shipping production SaaS apps.',
      features: [
        'Unlimited design projects',
        'DeepSeek AI Theme Generator',
        'W3C JSON & Tailwind export',
        'Custom RFC 2119 Rule Builder',
        'Real-time Multi-tenant sync',
        'Priority email & chat support',
      ],
      cta: 'Get Started with Pro',
      popular: true,
    },
    {
      name: 'Enterprise Scale',
      price: billingPeriod === 'monthly' ? '$99' : '$79',
      period: 'per workspace / month',
      desc: 'For scale-ups and enterprises requiring strict brand governance.',
      features: [
        'Dedicated design systems architect',
        'Unlimited AI token credits',
        'Custom Token namespace prefix',
        'SAML SSO & Role-based access',
        '99.99% SLA uptime guarantee',
      ],
      cta: 'Contact Enterprise',
      popular: false,
    },
  ];

  const faqs = [
    {
      q: 'What is RAKU and why is it called "The Design System for Vibe Coding"?',
      a: 'RAKU (meaning "Easy" in Japanese) is a design system generator designed specifically to guide AI coding assistants (Claude 3.7, Cursor, ChatGPT). By compiling your design tokens into strict RFC 2119 XML rules, AI models obey exact spacing, colors, and typography instead of hallucinating arbitrary styles.',
    },
    {
      q: 'How does RAKU integrate with Cursor and Claude?',
      a: 'You simply export the Master XML specification with 1-click and drop it into your project as .cursorrules or system prompt. The AI immediately writes mathematically aligned frontend code.',
    },
    {
      q: 'Can I export to Tailwind CSS and W3C JSON tokens?',
      a: 'Yes! RAKU features a Multi-Format Exporter supporting Master XML, W3C Design Tokens JSON, tailwind.config.js, and raw CSS Variables.',
    },
    {
      q: 'Is RAKU suitable for large team collaboration?',
      a: 'Absolutely. With MongoDB-backed multi-tenant project synchronization, role-based access control, and IDOR-immune security, teams can collaborate on tokens seamlessly.',
    },
  ];

  return (
    <div
      style={{
        rowGap: 'var(--ui-gap-sections, 64px)',
      }}
      className="flex flex-col py-6"
    >
      {/* 1. HERO SECTION */}
      <section className="text-center space-y-6 max-w-4xl mx-auto px-4">
        <div
          style={{
            backgroundColor: 'color-mix(in srgb, var(--ui-color-primary, #6366F1) 10%, transparent)',
            color: 'var(--ui-color-primary, #6366F1)',
            borderColor: 'color-mix(in srgb, var(--ui-color-primary, #6366F1) 25%, transparent)',
          }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border animate-in fade-in"
        >
          <Sparkles className="w-4 h-4" />
          <span>{t(d => d.demo.home.badge)}</span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--ui-font-size-display, 48px)',
            lineHeight: 'var(--ui-line-height-display, 1.1)',
            fontWeight: 'var(--ui-font-weight-display, 800)',
            letterSpacing: 'var(--ui-letter-spacing-display, -0.03em)',
          }}
          className="tracking-tight transition-all"
        >
          {t(d => d.demo.home.heroTitleLine1)} <br />
          <span style={{ color: 'var(--ui-color-primary, #6366F1)' }}>
            {t(d => d.demo.home.heroTitleHighlight)}
          </span>
        </h1>

        <p
          style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
          className="text-base sm:text-lg font-normal max-w-2xl mx-auto leading-relaxed"
        >
          {t(d => d.demo.home.heroSubtitle)}
        </p>

        <div
          style={{
            columnGap: 'var(--ui-gap-button-group, 12px)',
            rowGap: 'var(--ui-gap-button-group, 12px)',
          }}
          className="flex flex-col sm:flex-row items-center justify-center pt-2"
        >
          <button
            onClick={() => onNavigate('signup')}
            style={{
              paddingLeft: 'var(--ui-padding-button-md-x, 16px)',
              paddingRight: 'var(--ui-padding-button-md-x, 16px)',
              paddingTop: 'var(--ui-padding-button-md-y, 8px)',
              paddingBottom: 'var(--ui-padding-button-md-y, 8px)',
              borderRadius: 'var(--radius-md, 8px)',
              backgroundColor: 'var(--ui-color-primary, #6366F1)',
              gap: 'var(--ui-gap-icon-text, 8px)',
            }}
            className="w-full sm:w-auto text-white font-semibold text-sm shadow-lg hover:opacity-95 active:scale-95 transition flex items-center justify-center cursor-pointer select-none"
          >
            <span>{t(d => d.demo.home.startFreeCta)}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            style={{
              paddingLeft: 'var(--ui-padding-button-md-x, 16px)',
              paddingRight: 'var(--ui-padding-button-md-x, 16px)',
              paddingTop: 'var(--ui-padding-button-md-y, 8px)',
              paddingBottom: 'var(--ui-padding-button-md-y, 8px)',
              borderRadius: 'var(--radius-md, 8px)',
              borderColor: 'var(--ui-color-border-default, #E2E8F0)',
              backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
              gap: 'var(--ui-gap-icon-text, 8px)',
            }}
            className="w-full sm:w-auto font-semibold text-sm border transition flex items-center justify-center hover:opacity-85 cursor-pointer select-none"
          >
            <Play
              style={{
                color: 'var(--ui-color-primary, #6366F1)',
                fill: 'var(--ui-color-primary, #6366F1)',
              }}
              className="w-3.5 h-3.5"
            />
            <span>{t(d => d.demo.home.exploreDashboardCta)}</span>
          </button>
        </div>

        {/* Interactive Workspace Preview Mockup */}
        <div
          style={{ borderRadius: 'var(--radius-2xl, 24px)' }}
          className="relative mt-12 bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden p-3 sm:p-6 text-left"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[11px] text-slate-500">raku-runtime-terminal</span>
            </div>
            <span className="font-mono text-emerald-400 text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
              {t(d => d.demo.home.previewTokensCompliant)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
              <div className="text-[11px] text-slate-400">{t(d => d.demo.home.activeTokensCard)}</div>
              <div className="text-2xl font-bold font-mono text-white">412</div>
              <div className="text-[10px] text-indigo-400">Master XML v1.1.0</div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
              <div className="text-[11px] text-slate-400">{t(d => d.demo.home.rfcDirectivesCard)}</div>
              <div className="text-2xl font-bold font-mono text-white">24 MUST</div>
              <div className="text-[10px] text-emerald-400">Deterministic Enforcement</div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
              <div className="text-[11px] text-slate-400">{t(d => d.demo.home.hallucinationRateCard)}</div>
              <div className="text-2xl font-bold font-mono text-emerald-400">0.00%</div>
              <div className="text-[10px] text-slate-400">Cursor & Claude Sync</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 6 BENTO FEATURE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--ui-font-size-h1, 36px)',
              lineHeight: 'var(--ui-line-height-h1, 1.2)',
              fontWeight: 'var(--ui-font-weight-h1, 700)',
              letterSpacing: 'var(--ui-letter-spacing-h1, -0.02em)',
            }}
            className="transition-all"
          >
            {t(d => d.demo.home.bentoTitle)}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {t(d => d.demo.home.bentoSubtitle)}
          </p>
        </div>

        <div
          style={{
            gap: 'var(--ui-gap-card-grid, 24px)',
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                style={{
                  borderRadius: 'var(--ui-radius-card)',
                  backgroundColor: 'var(--ui-color-bg-card)',
                  borderColor: 'var(--ui-color-border-default)',
                  padding: 'var(--ui-padding-card)',
                  gap: 'var(--ui-gap-card-compound)',
                }}
                className="demo-card-interactive border flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-3">
                  <div
                    style={{
                      borderRadius: 'var(--ui-radius-input)',
                      backgroundColor: 'color-mix(in srgb, var(--ui-color-primary) 12%, transparent)',
                      color: 'var(--ui-color-primary)',
                    }}
                    className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition"
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-heading">
                    {f.title}
                  </h3>
                  <p
                    style={{ color: 'var(--ui-color-text-secondary)' }}
                    className="text-xs leading-relaxed"
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. TESTIMONIALS */}
      <section
        style={{ borderColor: 'var(--ui-color-border-subtle, #E2E8F0)' }}
        className="py-16 border-y"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--ui-font-size-h1, 36px)',
                lineHeight: 'var(--ui-line-height-h1, 1.2)',
                fontWeight: 'var(--ui-font-weight-h1, 700)',
                letterSpacing: 'var(--ui-letter-spacing-h1, -0.02em)',
              }}
              className="transition-all"
            >
              {t(d => d.demo.home.testimonialsTitle)}
            </h2>
            <p
              style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
              className="text-sm"
            >
              {t(d => d.demo.home.testimonialsSubtitle)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: 'var(--ui-radius-card)',
                  backgroundColor: 'var(--ui-color-bg-card)',
                  borderColor: 'var(--ui-color-border-default)',
                }}
                className="demo-card-interactive p-6 border flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p
                    style={{ color: 'var(--ui-color-text-secondary)' }}
                    className="text-xs italic leading-relaxed"
                  >
                    "{test.quote}"
                  </p>
                </div>
                <div
                  style={{ borderColor: 'var(--ui-color-border-subtle)' }}
                  className="flex items-center gap-3 pt-2 border-t"
                >
                  <img src={test.avatar} alt={test.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-xs">{test.name}</div>
                    <div
                      style={{ color: 'var(--ui-color-text-tertiary)' }}
                      className="text-[11px]"
                    >
                      {test.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRICING TIERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--ui-font-size-h1)',
              lineHeight: 'var(--ui-line-height-h1)',
              fontWeight: 'var(--ui-font-weight-h1)',
              letterSpacing: 'var(--ui-letter-spacing-h1)',
            }}
            className="transition-all"
          >
            {t(d => d.demo.home.pricingTitle)}
          </h2>
          <p
            style={{ color: 'var(--ui-color-text-secondary)' }}
            className="text-sm"
          >
            {t(d => d.demo.home.pricingSubtitle)}
          </p>

          {/* Monthly / Annual Toggle */}
          <div
            style={{
              borderColor: 'var(--ui-color-border-subtle)',
              backgroundColor: 'color-mix(in srgb, var(--ui-color-bg-card) 50%, transparent)',
            }}
            className="inline-flex items-center p-1 rounded-xl border text-xs font-semibold"
          >
            <button
              onClick={() => setBillingPeriod('monthly')}
              style={
                billingPeriod === 'monthly'
                  ? {
                      backgroundColor: 'var(--ui-color-primary)',
                      color: '#FFFFFF',
                    }
                  : undefined
              }
              className="px-4 py-1.5 rounded-lg transition font-bold"
            >
              {t(d => d.demo.home.monthlyBilling)}
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              style={
                billingPeriod === 'annual'
                  ? {
                      backgroundColor: 'var(--ui-color-primary)',
                      color: '#FFFFFF',
                    }
                  : undefined
              }
              className="px-4 py-1.5 rounded-lg transition font-bold flex items-center gap-1.5"
            >
              <span>{t(d => d.demo.home.annualBilling)}</span>
              <span
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--ui-color-success) 15%, transparent)',
                  color: 'var(--ui-color-success)',
                }}
                className="text-[10px] font-bold px-1.5 py-0.2 rounded-full"
              >
                {t(d => d.demo.home.saveBadge)}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: 'var(--ui-radius-card)',
                backgroundColor: 'var(--ui-color-bg-card)',
                borderColor: tier.popular
                  ? 'var(--ui-color-primary)'
                  : 'var(--ui-color-border-default)',
              }}
              className="demo-card-interactive p-8 border flex flex-col justify-between relative"
            >
              {tier.popular && (
                <span
                  style={{
                    backgroundColor: 'var(--ui-color-primary, #FF4F00)',
                    borderRadius: 'var(--radius-full, 9999px)',
                  }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-extrabold text-white px-3 py-0.5 uppercase tracking-wider font-mono shadow-sm"
                >
                  {t(d => d.demo.home.popularBadge)}
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold font-heading">
                    {tier.name}
                  </h3>
                  <p
                    style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
                    className="text-xs mt-1"
                  >
                    {tier.desc}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold font-mono">
                    {tier.price}
                  </span>
                  <span
                    style={{ color: 'var(--ui-color-text-tertiary, #94A3B8)' }}
                    className="text-xs font-medium"
                  >
                    /{tier.period}
                  </span>
                </div>

                <ul
                  style={{ borderColor: 'var(--ui-color-border-subtle, #E2E8F0)' }}
                  className="space-y-2.5 pt-2 border-t text-xs"
                >
                  {tier.features.map((ft, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <CheckCircle2
                        style={{ color: 'var(--ui-color-success, #10B981)' }}
                        className="w-4 h-4 shrink-0"
                      />
                      <span>{ft}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => onNavigate('signup')}
                  style={{
                    borderRadius: 'var(--radius-md, 8px)',
                    backgroundColor: tier.popular
                      ? 'var(--ui-color-primary, #FF4F00)'
                      : 'color-mix(in srgb, var(--ui-color-primary, #FF4F00) 10%, transparent)',
                    color: tier.popular ? '#FFFFFF' : 'var(--ui-color-primary, #FF4F00)',
                  }}
                  className="w-full py-2.5 text-xs font-bold transition hover:opacity-90 active:scale-95"
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FAQ ACCORDION */}
      <section className="max-w-3xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--ui-font-size-h1, 36px)',
              lineHeight: 'var(--ui-line-height-h1, 1.2)',
              fontWeight: 'var(--ui-font-weight-h1, 700)',
              letterSpacing: 'var(--ui-letter-spacing-h1, -0.02em)',
            }}
            className="transition-all"
          >
            {t(d => d.demo.home.faqTitle)}
          </h2>
          <p
            style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
            className="text-sm"
          >
            {t(d => d.demo.home.faqSubtitle)}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: 'var(--radius-lg, 12px)',
                backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
                borderColor: 'var(--ui-color-border-default, #E2E8F0)',
              }}
              className="border overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold transition"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  style={openFaq === idx ? { color: 'var(--ui-color-primary, #FF4F00)' } : undefined}
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div
                  style={{
                    color: 'var(--ui-color-text-secondary, #475569)',
                    borderColor: 'var(--ui-color-border-subtle, #E2E8F0)',
                  }}
                  className="px-4 pb-4 text-xs leading-relaxed border-t pt-3"
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          style={{ borderRadius: 'var(--radius-2xl, 24px)' }}
          className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
              {t(d => d.demo.home.ctaBannerTitle)}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
              {t(d => d.demo.home.ctaBannerSubtitle)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('signup')}
              style={{
                backgroundColor: 'var(--ui-color-primary, #6366F1)',
                borderRadius: 'var(--radius-md, 8px)',
              }}
              className="w-full sm:w-auto px-7 py-2.5 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:opacity-95 transition"
            >
              {t(d => d.demo.home.startFreeCta)}
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-lg transition"
            >
              {t(d => d.demo.home.talkToSales)}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
