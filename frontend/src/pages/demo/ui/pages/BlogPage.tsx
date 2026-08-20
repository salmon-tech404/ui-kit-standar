import React, { useState } from 'react';
import { DemoPageId } from '../../types';
import { useDesignStore } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';
import { Tooltip } from '@/shared/ui';
import {
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Code2,
  Layers,
  Terminal,
  FileText,
  AlertCircle,
  Copy,
  Check,
  Search,
} from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: DemoPageId) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>('article_01');
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { tokens } = useDesignStore();
  const { t } = useI18n();

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const articles = [
    {
      id: 'article_01',
      title: 'Why AI Hallucinates UI — And How RFC 2119 Solves It',
      date: 'Oct 14, 2026',
      readTime: '6 min read',
      tag: 'Vibe Coding',
      author: 'Elena Rostova',
      authorRole: 'Principal Systems Architect',
      authorAvatar: '/images/blog_author_elena.jpg',
      heroImage: '/images/blog_vibe_coding_hero.jpg',
      summary: 'Explore the mathematical differences between probabilistic code generation and deterministic token constraints compiled for Cursor and Claude 3.7.',
      isDemoActive: true,
    },
    {
      id: 'article_02',
      title: 'The Concentric Radius Formula: R_inner = max(0, R_outer - Padding)',
      date: 'Oct 02, 2026',
      readTime: '4 min read',
      tag: 'Architecture',
      author: 'Kenji Sato',
      authorRole: 'VP of Product',
      authorAvatar: '/images/blog_author_elena.jpg',
      heroImage: '/images/blog_concentric_math.jpg',
      summary: 'Why modern design systems like Apple and Linear look crisp, and how to automate inner radiuses.',
      isDemoActive: false,
    },
    {
      id: 'article_03',
      title: 'Vibe Coding with Cursor & Claude 3.7: Production Guide',
      date: 'Sep 24, 2026',
      readTime: '8 min read',
      tag: 'AI Directives',
      author: 'Alex Thorne',
      authorRole: 'AI Engineering Lead',
      authorAvatar: '/images/blog_author_elena.jpg',
      heroImage: '/images/blog_cursor_guide.jpg',
      summary: 'Best practices for organizing Master XML tokens into .cursorrules for flawless fullstack execution.',
      isDemoActive: false,
    },
    {
      id: 'article_04',
      title: 'WCAG 2.1 AAA Accessibility in Dynamic Dark Themes',
      date: 'Sep 10, 2026',
      readTime: '5 min read',
      tag: 'A11y',
      author: 'Elena Rostova',
      authorRole: 'Principal Systems Architect',
      authorAvatar: '/images/blog_author_elena.jpg',
      heroImage: '/images/blog_a11y_guide.jpg',
      summary: 'Perceptual lightness contrast equations across elevated surface layers.',
      isDemoActive: false,
    },
  ];

  const currentArticle = articles.find((a) => a.id === selectedArticleId) || articles[0];

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-xs">
      {/* Blog Hub Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <button onClick={() => onNavigate('home')} className="hover:text-indigo-600">
              {t(d => d.demo.navbar.home)}
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {t(d => d.demo.blog.breadcrumb)}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            {t(d => d.demo.blog.hubTitle)}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t(d => d.demo.blog.searchPlaceholder)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <article className="lg:col-span-8 space-y-8">
          {currentArticle.isDemoActive ? (
            <div
              style={{
                borderRadius: 'var(--ui-radius-card, var(--radius-xl, 16px))',
                backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
                borderColor: 'var(--ui-color-border-default, #E2E8F0)',
              }}
              className="demo-card-interactive p-6 sm:p-10 border space-y-8"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    style={{
                      backgroundColor: 'var(--ui-color-primary, #FF4F00)',
                      borderRadius: 'var(--radius-full, 9999px)',
                    }}
                    className="text-[10px] font-extrabold text-white px-2.5 py-0.5 uppercase tracking-wider font-mono"
                  >
                    {currentArticle.tag}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{currentArticle.date}</span>
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{currentArticle.readTime}</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading leading-tight">
                  {currentArticle.title}
                </h2>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {currentArticle.summary}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <img
                        src={currentArticle.authorAvatar}
                        alt={currentArticle.author}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80';
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-white">
                        {currentArticle.author}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {currentArticle.authorRole}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? t(d => d.common.copied) : t(d => d.common.copy)}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Featured Hero Banner Image Container */}
              <div
                style={{ borderRadius: 'var(--radius-lg, 12px)' }}
                className="w-full h-64 sm:h-80 overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-slate-200 dark:border-slate-800 relative flex items-center justify-center shadow-inner"
              >
                <img
                  src={currentArticle.heroImage}
                  alt={currentArticle.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="font-mono text-[10px] text-indigo-400 font-bold bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                      RFC 2119 COMPILER
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xl font-extrabold text-white font-heading">
                      RAKU Master XML Token Engine
                    </div>
                    <div className="font-mono text-xs text-indigo-300">
                      &lt;directives priority="MUST" scope="components.button" /&gt;
                    </div>
                  </div>
                </div>
              </div>

              {/* Rich Typography Body Content */}
              <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                <p>
                  When Large Language Models (LLMs) like Claude 3.7 or GPT-4o generate frontend user interfaces, they rely on statistical next-token prediction. Without rigid guardrails, this inevitably produces styling drift: non-standard paddings (e.g. <code className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono text-indigo-600">p-[13px]</code>), arbitrary hex codes, and broken radius hierarchies.
                </p>

                {/* Key Insight Highlight Callout */}
                <div
                  style={{ borderRadius: 'var(--radius-md, 8px)' }}
                  className="p-4 bg-indigo-50/70 dark:bg-indigo-950/40 border-l-4 border-indigo-600 text-slate-800 dark:text-slate-200 space-y-1.5"
                >
                  <div className="font-bold flex items-center gap-1.5 text-indigo-700 dark:text-indigo-400">
                    <Sparkles className="w-4 h-4" />
                    <span>The Axiom of Vibe Coding</span>
                  </div>
                  <p className="text-xs italic leading-relaxed">
                    "A Design System is not just a UI library for humans; it is a mathematical constraint contract that eliminates degrees of freedom for autonomous AI agents."
                  </p>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading pt-2">
                  1. The 3 RFC 2119 Directives Every AI Prompt Must Include
                </h3>

                <p>
                  To convert probabilistic models into deterministic code generators, RAKU compiles the design tokens into strict RFC 2119 keywords:
                </p>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">
                      [MUST NOT] No Raw Hexadecimal Literals
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      All color tokens MUST resolve directly to CSS Custom Properties (e.g. <code className="text-indigo-500">var(--ui-color-primary)</code>).
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                    <div className="font-bold text-indigo-600 dark:text-indigo-400">
                      [MUST] Strict 8-Point Spatial System
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      Paddings, margins, and gaps MUST be chosen exclusively from the discrete scale: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px.
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                    <div className="font-bold text-violet-600 dark:text-violet-400">
                      [MUST] Concentric Radius Formula
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      Nested elements must calculate inner border radius via: <code className="text-indigo-500 font-bold">R_inner = max(0, R_outer - Padding)</code>.
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading pt-2">
                  2. Real-World Code Comparison
                </h3>

                <p>
                  Notice how the Master XML specification enforces structural consistency compared to raw prompting:
                </p>

                {/* Code Block Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 font-mono text-[11px]">
                  {/* Before / Bad */}
                  <div className="p-4 bg-red-50/40 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-xl space-y-2">
                    <div className="text-red-600 font-bold flex items-center justify-between">
                      <span>Without RAKU (Hallucinated)</span>
                      <span className="text-[10px] uppercase">Broken</span>
                    </div>
                    <pre className="text-slate-600 dark:text-slate-400 overflow-x-auto whitespace-pre">
{`<button className="
  bg-[#6366f1]
  px-[15px] py-[7px]
  rounded-[11px]
  hover:bg-[#4f46e5]
">
  Submit
</button>`}
                    </pre>
                  </div>

                  {/* After / Good */}
                  <div className="p-4 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl space-y-2">
                    <div className="text-emerald-600 font-bold flex items-center justify-between">
                      <span>With RAKU Master XML</span>
                      <span className="text-[10px] uppercase">100% Token Valid</span>
                    </div>
                    <pre className="text-slate-800 dark:text-slate-200 overflow-x-auto whitespace-pre">
{`<button
  style={{
    height: 'var(--control-height-md)',
    borderRadius: 'var(--ui-radius-md)',
    backgroundColor: 'var(--ui-color-primary)'
  }}
  className="px-4 text-white font-bold"
>
  Submit
</button>`}
                    </pre>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading pt-2">
                  Conclusion
                </h3>

                <p>
                  By treating your design tokens as a single source of truth and compiling them into machine-verifiable directives, teams can safely deploy autonomous AI agents without human styling corrections.
                </p>
              </div>

              {/* Bottom Post Actions & CTA */}
              <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">
                    Ready to enforce zero-hallucination UI?
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Get started with RAKU v1.1.0 today and export your Master XML in 1 click.
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('signup')}
                  style={{
                    borderRadius: 'var(--radius-md, 8px)',
                    backgroundColor: 'var(--ui-color-primary, #FF4F00)',
                  }}
                  className="px-4 py-2 text-white font-bold shadow-md hover:opacity-90 transition whitespace-nowrap self-start sm:self-auto"
                >
                  {t(d => d.demo.navbar.startFree)}
                </button>
              </div>
            </div>
          ) : (
            /* DRAFT / UPCOMING DISPATCH STATE */
            <div
              style={{
                borderRadius: 'var(--ui-radius-card, var(--radius-xl, 16px))',
                backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
                borderColor: 'var(--ui-color-border-default, #E2E8F0)',
              }}
              className="demo-card-interactive p-10 border text-center space-y-5"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-inner">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-600 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded">
                  {t(d => d.demo.blog.draftBadge)}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                  {currentArticle.title}
                </h3>
                <p
                  style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
                  className="text-xs leading-relaxed"
                >
                  {t(d => d.demo.blog.draftDesc)}
                </p>
              </div>
              <button
                onClick={() => setSelectedArticleId('article_01')}
                style={{
                  backgroundColor: 'var(--ui-color-primary, #FF4F00)',
                  borderRadius: 'var(--radius-md, 8px)',
                }}
                className="px-5 py-2 text-white font-bold shadow-md inline-flex items-center gap-1.5 hover:opacity-90 transition"
              >
                <span>{t(d => d.demo.blog.readDemoBtn)}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </article>

        {/* =========================================================================
            RIGHT / SIDEBAR DISPATCHES LIST (Col span 4)
        ========================================================================= */}
        <aside className="lg:col-span-4 space-y-6">
          <div
            style={{
              borderRadius: 'var(--ui-radius-card, var(--radius-xl, 16px))',
              backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
              borderColor: 'var(--ui-color-border-default, #E2E8F0)',
            }}
            className="demo-card-interactive p-5 border space-y-4"
          >
            <div
              style={{ borderColor: 'var(--ui-color-border-subtle, #E2E8F0)' }}
              className="flex items-center justify-between border-b pb-3"
            >
              <h3 className="font-bold text-sm text-slate-900 dark:text-white font-heading">
                {t(d => d.demo.blog.recentDispatches)}
              </h3>
              <span className="text-[10px] font-mono text-slate-400 font-bold">
                {t(d => d.demo.blog.articlesCount, { count: filteredArticles.length })}
              </span>
            </div>

            <div className="space-y-2.5">
              {filteredArticles.map((art) => {
                const isSelected = art.id === selectedArticleId;
                return (
                  <div
                    key={art.id}
                    onClick={() => setSelectedArticleId(art.id)}
                    style={{ borderRadius: 'var(--radius-lg, 12px)' }}
                    className={`p-3.5 border transition cursor-pointer space-y-1.5 ${
                      isSelected
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/60 border-indigo-500 shadow-xs'
                        : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {art.tag}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{art.readTime}</span>
                    </div>

                    <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-snug">
                      {art.title}
                    </h4>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>{art.author}</span>
                      {art.isDemoActive ? (
                        <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded">
                          {t(d => d.demo.blog.liveDemoBadge)}
                        </span>
                      ) : (
                        <span className="text-[9px] text-slate-400">{t(d => d.demo.blog.draftBadge)}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image Asset Directory Checklist Callout for User */}
          <div
            style={{ borderRadius: 'var(--radius-xl, 16px)' }}
            className="p-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-md space-y-3"
          >
            <div className="flex items-center gap-2 font-bold text-xs text-indigo-300">
              <FileText className="w-4 h-4" />
              <span>{t(d => d.demo.blog.directoryCalloutTitle)}</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {t(d => d.demo.blog.directoryCalloutDesc)}
            </p>
            <ul className="space-y-1 font-mono text-[10px] text-slate-400">
              <li>• <span className="text-emerald-300">blog_vibe_coding_hero.jpg</span></li>
              <li>• <span className="text-emerald-300">blog_author_elena.jpg</span></li>
              <li>• <span className="text-emerald-300">blog_diagram_tokens.jpg</span></li>
              <li>• <span className="text-emerald-300">blog_concentric_math.jpg</span></li>
              <li>• <span className="text-emerald-300">blog_cursor_guide.jpg</span></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};
