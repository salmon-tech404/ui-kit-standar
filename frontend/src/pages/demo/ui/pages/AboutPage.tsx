import React, { useState } from 'react';
import { DemoPageId } from '../../types';
import { useDesignStore } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';
import {
  Sparkles,
  Shield,
  Award,
  Globe2,
  ChevronDown,
  Star,
  Send,
  Github,
  Twitter,
  Linkedin,
  Cpu,
  Zap,
  Building2,
  Quote,
  Target,
  Compass,
  CheckCircle2,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: DemoPageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { tokens } = useDesignStore();
  const { t } = useI18n();

  // Interactive states
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [appliedJob, setAppliedJob] = useState<string | null>(null);

  const toggleAccordion = (idx: number) => {
    setActiveAccordion(activeAccordion === idx ? null : idx);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setFeedbackText('');
    }, 3500);
  };

  const teamMembers = [
    {
      name: 'Dr. Alex Vance',
      role: 'Principal Systems Architect & Co-Founder',
      department: 'Core Compiler & Math Engine',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'Pioneered RFC 2119 algorithmic constraint models for neural code generators. Ph.D. in Computer Science from MIT, formerly Principal Engineer at Google DeepMind and Bell Labs.',
      skills: ['Concentric Math', 'RFC 2119 Directives', 'Compiler AST', 'Rust/WASM'],
      status: 'online',
    },
    {
      name: 'Elena Rostova',
      role: 'Head of Design Systems & Ergonomics',
      department: 'Design Tokens & Spatial Harmony',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      bio: 'Creator of the 5-Tier Spatial Hierarchy and WCAG 2.1 AAA Perceptual Lightness Engine. 12+ years leading design systems at Shopify Polaris and Figma Community.',
      skills: ['WCAG 2.1 AAA', '8-Point Spatial Grid', 'Fluid Typography', 'Color Science'],
      status: 'online',
    },
    {
      name: 'Marcus Chen',
      role: 'VP of Machine Intelligence & Security',
      department: 'Autonomous Agent Safety',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      bio: 'Architected prompt injection defense layers and deterministic token sandboxes. Former AI Safety Researcher at Stanford and Senior Security Lead at Cloudflare.',
      skills: ['Agent Runtime', 'AST Validation', 'Prompt Shield', 'SOC2 Compliance'],
      status: 'busy',
    },
    {
      name: 'Sarah Jenkins',
      role: 'Staff Infrastructure & Performance Engineer',
      department: 'Edge CDN & Hot-Reload',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      bio: 'Built sub-millisecond CSS variable invalidation pipeline and distributed CDN replication for global enterprises with 99.999% SLA.',
      skills: ['Edge Workers', 'DOM Invalidation', 'WebAssembly', 'Distributed Cache'],
      status: 'online',
    },
  ];

  const milestones = [
    {
      year: '2023',
      quarter: 'Q3',
      title: 'Genesis: The Zero-Hallucination Hypothesis',
      desc: 'Formulated the mathematical RFC 2119 design token grammar at DeepMind to resolve AI layout degradation in autonomous web generation.',
      tag: 'Research & Genesis',
    },
    {
      year: '2024',
      quarter: 'Q2',
      title: 'Seed Round & Concentric Math Engine',
      desc: 'Raised $14M seed round from Tier-1 venture funds. Open-sourced the Concentric Radius formulation R_inner = max(0, R_outer - Padding).',
      tag: 'Core Geometry',
    },
    {
      year: '2025',
      quarter: 'Q4',
      title: 'Enterprise Tier & Fortune 500 Adoption',
      desc: 'Deployed across 4,200+ enterprise engineering organizations. Achieved SOC2 Type II and ISO 27001 certifications with 100% telemetry compliance.',
      tag: 'Enterprise Scale',
    },
    {
      year: '2026',
      quarter: 'Q1',
      title: 'Autonomous Multi-Agent Studio v2.4',
      desc: 'Launched real-time CSS variable synchronization, multi-format compiler (XML, Tailwind, CSS), and high-velocity stress-testing sandbox.',
      tag: 'Production v2.4',
    },
  ];

  const testimonials = [
    {
      quote: 'Antigravity has completely transformed how our 400+ frontend engineers collaborate with AI agents. We reduced visual regressions by 84% in the first quarter of adoption.',
      author: 'David Sterling',
      role: 'VP of Engineering at FinScale Global',
      company: 'FinScale (Fintech Unicorn)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      metric: '84% Fewer UI Bugs',
    },
    {
      quote: 'The Concentric Radius mathematics and 5-tier spatial scale gave our design system the precision of Apple products with zero manual CSS tuning.',
      author: 'Aria Montgomery',
      role: 'Principal Design Technologist',
      company: 'OmniHealth SaaS',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      metric: '3.2x Faster Ship Velocity',
    },
  ];

  const openCareers = [
    {
      title: 'Staff Rust & WebAssembly Compiler Engineer',
      department: 'Core Engine',
      location: 'Remote (Global)',
      type: 'Full-Time',
      desc: 'Optimize the sub-millisecond AST parser and RFC 2119 constraint solver for cross-platform token emission.',
    },
    {
      title: 'Senior Design Systems Architect',
      department: 'Design Ergonomics',
      location: 'San Francisco, CA / Remote',
      type: 'Full-Time',
      desc: 'Spearhead next-gen typographic modular scales, fluid responsive breakpoints, and accessibility algorithms.',
    },
    {
      title: 'AI Safety & Prompt Injection Researcher',
      department: 'Security & Guardrails',
      location: 'London, UK / Remote',
      type: 'Full-Time',
      desc: 'Build defensive AST verification harnesses ensuring LLM output is 100% compliant with design specifications.',
    },
  ];

  const faqs = [
    {
      q: 'Tại sao lại sử dụng Chỉ thị RFC 2119 (MUST / MUST NOT) thay vì tài liệu hướng dẫn truyền thống?',
      a: 'Tài liệu hướng dẫn bằng lời văn thường bị các mô hình ngôn ngữ lớn (LLM) diễn giải sai hoặc bỏ qua. Bằng cách mã hóa quy tắc thành các chỉ thị RFC 2119 có cấu trúc XML, AI được lập trình để tuân thủ 100% giới hạn toán học mà không được phép tự ý bịa đặt (hallucinate) CSS.',
    },
    {
      q: 'Công thức Concentric Radius hoạt động như thế nào trong thực tế?',
      a: 'Khi một phần tử con (như nút bấm hoặc thẻ bên trong) nằm trong một thẻ cha có bo góc, nếu cả hai dùng cùng một bán kính bo góc thì phần viền sẽ bị méo mó. Công thức Concentric Radius tự động tính: Bán kính con = max(0, Bán kính cha - Padding), mang lại vẻ ngoài hoàn hảo và sắc sảo như chuẩn Apple/Linear.',
    },
    {
      q: 'Hệ thống Khoảng cách 5 Tầng Ngữ Nghĩa giải quyết bài toán gì cho dự án lớn?',
      a: 'Nó phân biệt rạch ròi giữa Padding nội bộ, Khoảng hở con (Micro-gaps như Icon ↔ Text), Khoảng cách luồng (Flow gaps như Form field ↔ Field), và Bố cục vĩ mô Responsive. Nhờ đó, thay đổi một token ở cấp vĩ mô sẽ không làm vỡ các thành phần vi mô bên trong.',
    },
    {
      q: 'Làm thế nào để Antigravity bảo đảm tính tương thích ngược với hệ thống CSS / Tailwind hiện tại của doanh nghiệp?',
      a: 'Hệ thống xuất bản đồng thời 4 định dạng: Master XML Spec, tailwind.config.js, tokens.css, và Style-Dictionary JSON. Doanh nghiệp chỉ cần import file config hoặc biến CSS vào dự án có sẵn mà không cần viết lại mã nguồn giao diện.',
    },
  ];

  return (
    <div
      style={{
        rowGap: 'var(--ui-gap-sections, 64px)',
      }}
      className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col transition-all duration-300"
    >
      {/* -------------------------------------------------------------
          1. HERO STORYTELLING & GLOBAL IMPACT METRICS
      ------------------------------------------------------------- */}
      <section className="space-y-8 text-center sm:text-left">
        {/* Breadcrumbs */}
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-500 font-mono">
          <span className="hover:text-indigo-600 cursor-pointer">
            {t((d) => d.demo.about.breadcrumbCompany)}
          </span>
          <span>/</span>
          <span className="hover:text-indigo-600 cursor-pointer">
            {t((d) => d.demo.about.breadcrumbMission)}
          </span>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-bold">
            {t((d) => d.demo.about.breadcrumbVision)}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <Building2 className="w-3.5 h-3.5 text-indigo-500" />
              <span>{t((d) => d.demo.about.badge)}</span>
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
              {t((d) => d.demo.about.heroTitle)}
            </h1>
            <p
              style={{
                color: 'var(--ui-color-text-secondary, #64748B)',
                fontSize: 'var(--ui-font-size-body, 14px)',
                lineHeight: 'var(--ui-line-height-body, 1.5)',
              }}
              className="leading-relaxed"
            >
              {t((d) => d.demo.about.heroSubtitle)}
            </p>
          </div>

          {/* Quick Credibility Badge */}
          <div className="shrink-0 flex items-center justify-center">
            <div
              style={{
                borderRadius: 'var(--radius-xl, 16px)',
                backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
                borderColor: 'var(--ui-color-border-default, #E2E8F0)',
                padding: 'var(--ui-padding-card, 20px)',
              }}
              className="demo-card-interactive border flex items-center gap-3"
            >
              <div className="flex -space-x-2 overflow-hidden">
                {teamMembers.map((m, i) => (
                  <img
                    key={i}
                    src={m.avatar}
                    alt={m.name}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                  />
                ))}
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-slate-900 dark:text-white">
                  {t((d) => d.demo.about.teamBadgeTitle)}
                </div>
                <div className="text-[10px] text-slate-400">
                  {t((d) => d.demo.about.teamBadgeSub)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Global Impact Metric Cards */}
        <div
          style={{
            gap: 'var(--ui-gap-card-grid, 24px)',
          }}
          className="grid grid-cols-2 md:grid-cols-4"
        >
          {[
            { label: t((d) => d.demo.about.stat1Label), val: '1.4B+', sub: t((d) => d.demo.about.stat1Sub), icon: Cpu },
            { label: t((d) => d.demo.about.stat2Label), val: '99.99%', sub: t((d) => d.demo.about.stat2Sub), icon: Shield },
            { label: t((d) => d.demo.about.stat3Label), val: '4,200+', sub: t((d) => d.demo.about.stat3Sub), icon: Globe2 },
            { label: t((d) => d.demo.about.stat4Label), val: '<0.2ms', sub: t((d) => d.demo.about.stat4Sub), icon: Zap },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                style={{
                  borderRadius: 'var(--radius-xl, 16px)',
                  backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
                  borderColor: 'var(--ui-color-border-default, #E2E8F0)',
                  padding: 'var(--ui-padding-card, 20px)',
                  gap: 'var(--ui-gap-card-compound, 16px)',
                }}
                className="demo-card-interactive border flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">{stat.label}</span>
                  <Icon className="w-4 h-4 text-indigo-500" />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 'var(--ui-font-size-h1, 36px)',
                      lineHeight: 'var(--ui-line-height-h1, 1.2)',
                      fontWeight: 'var(--ui-font-weight-h1, 700)',
                    }}
                    className="text-slate-900 dark:text-white font-mono font-bold"
                  >
                    {stat.val}
                  </div>
                  <div className="text-[11px] text-slate-500">{stat.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. CORE ENGINEERING PRINCIPLES (DEEP PHILOSOPHY)
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
            {t((d) => d.demo.about.principlesTitle)}
          </h2>
          <span className="text-xs font-mono text-slate-400">
            {t((d) => d.demo.about.principlesSubtitle)}
          </span>
        </div>

        <div
          style={{
            gap: 'var(--ui-gap-card-grid, 24px)',
          }}
          className="grid grid-cols-1 md:grid-cols-2"
        >
          {[
            {
              title: t((d) => d.demo.about.principle1Title),
              desc: t((d) => d.demo.about.principle1Desc),
              icon: Compass,
              tag: 'Ground Truth',
            },
            {
              title: t((d) => d.demo.about.principle2Title),
              desc: t((d) => d.demo.about.principle2Desc),
              icon: Target,
              tag: 'Zero Hallucination',
            },
            {
              title: t((d) => d.demo.about.principle3Title),
              desc: t((d) => d.demo.about.principle3Desc),
              icon: Shield,
              tag: 'A11y Guarantee',
            },
            {
              title: t((d) => d.demo.about.principle4Title),
              desc: t((d) => d.demo.about.principle4Desc),
              icon: Zap,
              tag: 'Pure Performance',
            },
          ].map((principle, idx) => {
            const Icon = principle.icon;
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
                className="demo-card-interactive border flex flex-col justify-between"
              >
                <div className="space-y-2">
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
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-xs text-slate-900 dark:text-white font-heading">
                        {principle.title}
                      </h3>
                    </div>
                    <span
                      style={{
                        borderRadius: 'var(--radius-sm, 4px)',
                      }}
                      className="px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      {principle.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-10">
                    {principle.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* -------------------------------------------------------------
          3. COMPOUND TEAM CARDS & AVATAR MATRIX
      ------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h2
              style={{
                fontSize: 'var(--ui-font-size-h2, 24px)',
                lineHeight: 'var(--ui-line-height-h2, 1.25)',
                fontWeight: 'var(--ui-font-weight-h2, 700)',
              }}
              className="text-slate-900 dark:text-white font-heading"
            >
              {t((d) => d.demo.about.leadershipTitle)}
            </h2>
            <p className="text-xs text-slate-500">
              {t((d) => d.demo.about.leadershipSubtitle)}
            </p>
          </div>
        </div>

        <div
          style={{
            gap: 'var(--ui-gap-card-grid, 24px)',
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {teamMembers.map((member, i) => (
            <div
              key={i}
              style={{
                borderRadius: 'var(--radius-xl, 16px)',
                backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
                borderColor: 'var(--ui-color-border-default, #E2E8F0)',
                padding: 'var(--ui-padding-card, 20px)',
                gap: 'var(--ui-gap-card-compound, 16px)',
              }}
              className="demo-card-interactive border flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div
                  style={{
                    gap: 'var(--ui-gap-avatar-user, 12px)',
                  }}
                  className="flex items-center"
                >
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      style={{
                        borderRadius: 'var(--radius-full, 9999px)',
                      }}
                      className="w-12 h-12 object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                        member.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white">
                      {member.name}
                    </div>
                    <div className="text-[11px] text-slate-400">{member.role}</div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((skill, si) => (
                    <span
                      key={si}
                      style={{
                        borderRadius: 'var(--radius-sm, 4px)',
                      }}
                      className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-mono">{member.department}</span>
                <div className="flex items-center gap-2 text-slate-400">
                  <button className="hover:text-indigo-600 dark:hover:text-indigo-400 p-1 cursor-pointer">
                    <Github className="w-3.5 h-3.5" />
                  </button>
                  <button className="hover:text-indigo-600 dark:hover:text-indigo-400 p-1 cursor-pointer">
                    <Twitter className="w-3.5 h-3.5" />
                  </button>
                  <button className="hover:text-indigo-600 dark:hover:text-indigo-400 p-1 cursor-pointer">
                    <Linkedin className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          4. EVOLUTIONARY MILESTONES TIMELINE
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
        <div>
          <h2
            style={{
              fontSize: 'var(--ui-font-size-h2, 24px)',
              lineHeight: 'var(--ui-line-height-h2, 1.25)',
              fontWeight: 'var(--ui-font-weight-h2, 700)',
            }}
            className="text-slate-900 dark:text-white font-heading"
          >
            {t((d) => d.demo.about.milestonesTitle)}
          </h2>
          <p className="text-xs text-slate-500">
            {t((d) => d.demo.about.milestonesSubtitle)}
          </p>
        </div>

        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 space-y-8 pl-6">
          {milestones.map((item, idx) => (
            <div key={idx} className="relative group">
              <div
                style={{
                  backgroundColor: 'var(--ui-color-primary, #6366F1)',
                  borderRadius: 'var(--radius-full, 9999px)',
                }}
                className="absolute -left-[31px] top-0 w-3.5 h-3.5 ring-4 ring-white dark:ring-slate-900"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">
                    {item.year} {item.quarter}
                  </span>
                  <span
                    style={{
                      borderRadius: 'var(--radius-sm, 4px)',
                    }}
                    className="px-1.5 py-0.2 text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          5. CUSTOMER VOICES & ENTERPRISE TESTIMONIALS
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
            {t((d) => d.demo.about.testimonialsTitle)}
          </h2>
          <span className="text-xs font-mono text-slate-400">
            {t((d) => d.demo.about.testimonialsSubtitle)}
          </span>
        </div>

        <div
          style={{
            gap: 'var(--ui-gap-card-grid, 24px)',
          }}
          className="grid grid-cols-1 md:grid-cols-2"
        >
          {testimonials.map((tItem, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: 'var(--radius-xl, 16px)',
                backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
                borderColor: 'var(--ui-color-border-default, #E2E8F0)',
                padding: 'var(--ui-padding-card, 20px)',
                gap: 'var(--ui-gap-card-compound, 16px)',
              }}
              className="demo-card-interactive border flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-indigo-500/40" />
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{tItem.quote}"
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <img
                    src={tItem.avatar}
                    alt={tItem.author}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white">{tItem.author}</div>
                    <div className="text-[10px] text-slate-400">{tItem.role}</div>
                  </div>
                </div>
                <span
                  style={{
                    borderRadius: 'var(--radius-md, 8px)',
                  }}
                  className="px-2 py-1 text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                >
                  {tItem.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          6. CAREERS & OPEN ENGINEERING POSITIONS
      ------------------------------------------------------------- */}
      <section
        style={{
          borderRadius: 'var(--radius-xl, 16px)',
          backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
          borderColor: 'var(--ui-color-border-default, #E2E8F0)',
          padding: 'var(--ui-padding-card, 20px)',
          gap: 'var(--ui-gap-card-compound, 16px)',
        }}
        className="demo-card-interactive border flex flex-col space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h2
              style={{
                fontSize: 'var(--ui-font-size-h2, 24px)',
                lineHeight: 'var(--ui-line-height-h2, 1.25)',
                fontWeight: 'var(--ui-font-weight-h2, 700)',
              }}
              className="text-slate-900 dark:text-white font-heading"
            >
              {t((d) => d.demo.about.careersTitle)}
            </h2>
            <p className="text-xs text-slate-500">
              {t((d) => d.demo.about.careersSubtitle)}
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
            {t((d) => d.demo.about.openPositions, { count: openCareers.length })}
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {openCareers.map((job, idx) => (
            <div
              key={idx}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                    {job.title}
                  </h3>
                  <span
                    style={{
                      borderRadius: 'var(--radius-sm, 4px)',
                    }}
                    className="px-1.5 py-0.2 text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400"
                  >
                    {job.department}
                  </span>
                </div>
                <p className="text-xs text-slate-500 max-w-xl">{job.desc}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] font-mono text-slate-400">{job.location}</span>
                <button
                  type="button"
                  onClick={() => setAppliedJob(job.title)}
                  style={{
                    borderRadius: 'var(--radius-md, 8px)',
                    paddingLeft: 'var(--ui-padding-button-md-x, 16px)',
                    paddingRight: 'var(--ui-padding-button-md-x, 16px)',
                    paddingTop: 'var(--ui-padding-button-md-y, 8px)',
                    paddingBottom: 'var(--ui-padding-button-md-y, 8px)',
                  }}
                  className={`text-xs font-bold transition cursor-pointer select-none ${
                    appliedJob === job.title
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-indigo-600 hover:text-white'
                  }`}
                >
                  {appliedJob === job.title
                    ? t((d) => d.demo.about.applied)
                    : t((d) => d.demo.about.applyNow)}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          7. INTERACTIVE ACCORDION / FAQ
      ------------------------------------------------------------- */}
      <section
        style={{
          borderRadius: 'var(--radius-xl, 16px)',
          backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
          borderColor: 'var(--ui-color-border-default, #E2E8F0)',
          padding: 'var(--ui-padding-card, 20px)',
          gap: 'var(--ui-gap-card-compound, 16px)',
        }}
        className="demo-card-interactive border flex flex-col space-y-4"
      >
        <div>
          <h2
            style={{
              fontSize: 'var(--ui-font-size-h2, 24px)',
              lineHeight: 'var(--ui-line-height-h2, 1.25)',
              fontWeight: 'var(--ui-font-weight-h2, 700)',
            }}
            className="text-slate-900 dark:text-white font-heading"
          >
            {t((d) => d.demo.about.faqTitle)}
          </h2>
          <p className="text-xs text-slate-500">
            {t((d) => d.demo.about.faqSubtitle)}
          </p>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {faqs.map((faq, idx) => {
            const isOpen = activeAccordion === idx;
            return (
              <div key={idx} className="py-3">
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between text-left font-bold text-xs text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer select-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    style={{
                      transitionDuration: 'var(--motion-duration-fast, 150ms)',
                    }}
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-indigo-600' : 'text-slate-400'
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    style={{
                      transitionDuration: 'var(--motion-duration-normal, 250ms)',
                    }}
                    className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed pr-6 animate-in fade-in duration-200"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* -------------------------------------------------------------
          8. INTERACTIVE EVALUATION & RATING SANDBOX
      ------------------------------------------------------------- */}
      <section
        style={{
          borderRadius: 'var(--radius-xl, 16px)',
          backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
          borderColor: 'var(--ui-color-border-default, #E2E8F0)',
          padding: 'var(--ui-padding-card, 20px)',
          gap: 'var(--ui-gap-card-compound, 16px)',
        }}
        className="demo-card-interactive border flex flex-col space-y-4"
      >
        <div>
          <h2
            style={{
              fontSize: 'var(--ui-font-size-h2, 24px)',
              lineHeight: 'var(--ui-line-height-h2, 1.25)',
              fontWeight: 'var(--ui-font-weight-h2, 700)',
            }}
            className="text-slate-900 dark:text-white font-heading"
          >
            {t((d) => d.demo.about.ratingTitle)}
          </h2>
          <p className="text-xs text-slate-500">
            {t((d) => d.demo.about.ratingSubtitle)}
          </p>
        </div>

        {!feedbackSent ? (
          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {t((d) => d.demo.about.ratingLabel)}
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-slate-300 hover:scale-110 transition cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        (hoverRating || rating) >= star
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-300 dark:text-slate-700'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono font-bold text-slate-500 ml-2">
                  {t((d) => d.demo.about.ratingStars, { count: rating })}
                </span>
              </div>
            </div>

            <div
              style={{
                rowGap: 'var(--ui-gap-label-input, 6px)',
              }}
              className="flex flex-col"
            >
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {t((d) => d.demo.about.feedbackLabel)}
              </label>
              <textarea
                rows={3}
                required
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder={t((d) => d.demo.about.feedbackPlaceholder)}
                style={{
                  borderRadius: 'var(--radius-md, 8px)',
                  paddingLeft: 'var(--ui-padding-input-x, 12px)',
                  paddingRight: 'var(--ui-padding-input-x, 12px)',
                  paddingTop: 'var(--ui-padding-input-y, 8px)',
                  paddingBottom: 'var(--ui-padding-input-y, 8px)',
                  borderColor: 'var(--ui-color-border-default, #E2E8F0)',
                }}
                className="w-full text-xs bg-slate-50 dark:bg-slate-900 border outline-none text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 transition font-sans"
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: 'var(--ui-color-primary, #6366F1)',
                borderRadius: 'var(--radius-md, 8px)',
                paddingLeft: 'var(--ui-padding-button-md-x, 16px)',
                paddingRight: 'var(--ui-padding-button-md-x, 16px)',
                paddingTop: 'var(--ui-padding-button-md-y, 8px)',
                paddingBottom: 'var(--ui-padding-button-md-y, 8px)',
                gap: 'var(--ui-gap-icon-text, 8px)',
              }}
              className="text-white font-bold text-xs inline-flex items-center shadow-md hover:opacity-90 transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t((d) => d.demo.about.submitEvaluation)}</span>
            </button>
          </form>
        ) : (
          <div className="py-6 text-center space-y-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <div className="font-bold text-slate-900 dark:text-white">
              {t((d) => d.demo.about.evaluationRecorded)}
            </div>
            <div className="text-slate-500">
              {t((d) => d.demo.about.evaluationThankYou)}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
