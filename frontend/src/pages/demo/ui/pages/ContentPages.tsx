import React, { useState } from 'react';
import { DemoPageId } from '../../types';
import { useDesignStore } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';
import { FeaturesPage } from './FeaturesPage';
import { AboutPage } from './AboutPage';
import {
  Sparkles,
  Send,
  CheckCircle2,
  Mail,
  MessageSquare,
  BookOpen,
  ArrowRight,
  Shield,
  Layers,
  Terminal,
} from 'lucide-react';

interface ContentPageProps {
  onNavigate: (page: DemoPageId) => void;
  page: 'features' | 'pricing' | 'about' | 'blog' | 'contact';
}

export const ContentPages: React.FC<ContentPageProps> = ({ onNavigate, page }) => {
  const [contactSent, setContactSent] = useState(false);
  const { tokens } = useDesignStore();
  const { t } = useI18n();

  if (page === 'features') {
    return <FeaturesPage onNavigate={onNavigate} />;
  }

  if (page === 'about') {
    return <AboutPage onNavigate={onNavigate} />;
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => setContactSent(false), 3000);
  };

  if (page === 'contact') {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-8 text-xs">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            Get in Touch with RAKU Engineers
          </h1>
          <p className="text-slate-500 text-xs">
            Have questions about RFC 2119 directives, custom enterprise tokens, or vibe coding workflows?
          </p>
        </div>

        <div
          style={{
            borderRadius: 'var(--ui-radius-card, var(--radius-xl, 16px))',
            backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
            borderColor: 'var(--ui-color-border-default, #E2E8F0)',
          }}
          className="demo-card-interactive p-8 border space-y-5"
        >
          {!contactSent ? (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold">{t(d => d.demo.auth.fullName)}</label>
                  <input
                    type="text"
                    required
                    placeholder="Elena Rostova"
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold">{t(d => d.demo.auth.workEmail)}</label>
                  <input
                    type="email"
                    required
                    placeholder="elena@company.com"
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Inquiry regarding Enterprise Design System Integration"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help your team ship with zero UI hallucinations?"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: 'var(--ui-color-primary, #FF4F00)',
                  borderRadius: 'var(--radius-md, 8px)',
                }}
                className="w-full py-2.5 text-white font-bold shadow-md hover:opacity-90 flex items-center justify-center gap-2 transition"
              >
                <Send className="w-4 h-4" />
                <span>{t(d => d.common.submit)}</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2
                style={{ color: 'var(--ui-color-success, #10B981)' }}
                className="w-12 h-12 mx-auto"
              />
              <h3 className="text-lg font-bold">Message Delivered!</h3>
              <p
                style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
                className="text-xs max-w-sm mx-auto"
              >
                Thank you for contacting us. A RAKU systems engineer will respond within 2 business hours.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // About Page View
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12 text-xs">
      <div className="text-center space-y-4">
        <span
          style={{ color: 'var(--ui-color-primary, #FF4F00)' }}
          className="text-[10px] font-bold uppercase tracking-widest font-mono"
        >
          The Origin of RAKU
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading">
          Engineering the Mathematical Bridge Between AI & UI
        </h1>
        <p
          style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
          className="text-sm max-w-2xl mx-auto leading-relaxed"
        >
          RAKU was created with a simple thesis: As AI writes 90% of the world's frontend code, design systems must evolve from human documentation into deterministic compiler constraints.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          style={{
            borderRadius: 'var(--ui-radius-card, var(--radius-xl, 16px))',
            backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
            borderColor: 'var(--ui-color-border-default, #E2E8F0)',
          }}
          className="demo-card-interactive p-6 border space-y-3"
        >
          <div
            style={{
              backgroundColor: 'color-mix(in srgb, var(--ui-color-primary, #FF4F00) 12%, transparent)',
              color: 'var(--ui-color-primary, #FF4F00)',
            }}
            className="w-10 h-10 rounded-xl flex items-center justify-center"
          >
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm font-heading">Deterministic Directives</h3>
          <p
            style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
            className="leading-relaxed"
          >
            By compiling design tokens into strict RFC 2119 XML rules (MUST, MUST NOT), AI agents are constrained mathematically.
          </p>
        </div>

        <div
          style={{
            borderRadius: 'var(--ui-radius-card, var(--radius-xl, 16px))',
            backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
            borderColor: 'var(--ui-color-border-default, #E2E8F0)',
          }}
          className="demo-card-interactive p-6 border space-y-3"
        >
          <div
            style={{
              backgroundColor: 'color-mix(in srgb, var(--ui-color-accent, #10B981) 12%, transparent)',
              color: 'var(--ui-color-accent, #10B981)',
            }}
            className="w-10 h-10 rounded-xl flex items-center justify-center"
          >
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm font-heading">WCAG 2.1 AAA Contrast</h3>
          <p
            style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
            className="leading-relaxed"
          >
            Our embedded perceptually uniform lightness calculator guarantees that dark and light themes never suffer from unreadable text.
          </p>
        </div>

        <div
          style={{
            borderRadius: 'var(--ui-radius-card, var(--radius-xl, 16px))',
            backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
            borderColor: 'var(--ui-color-border-default, #E2E8F0)',
          }}
          className="demo-card-interactive p-6 border space-y-3"
        >
          <div
            style={{
              backgroundColor: 'color-mix(in srgb, var(--ui-color-accent, #6366F1) 12%, transparent)',
              color: '#6366F1',
            }}
            className="w-10 h-10 rounded-xl flex items-center justify-center"
          >
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm font-heading">Concentric Hierarchy</h3>
          <p
            style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
            className="leading-relaxed"
          >
            Automating inner radiuses using dynamic padding formulas eliminates ugly clipping and creates an Apple/Linear polish.
          </p>
        </div>
      </div>
    </div>
  );
};
