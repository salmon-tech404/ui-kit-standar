import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Github,
  Twitter,
  Linkedin,
  MessageSquare,
} from 'lucide-react';
import { useDesignStore } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';
import { Tooltip } from '@/shared/ui';
import { DemoPageId } from '@/pages/demo/types';

interface DemoFooterProps {
  onNavigate: (page: DemoPageId) => void;
}

export const DemoFooter: React.FC<DemoFooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { tokens } = useDesignStore();
  const { t } = useI18n();

  const logoUrl = tokens.brandAssets.logo.urlLight || '/icons/raku_FF4F00_logo_128.png';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Info & Newsletter (Col span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-white p-0.5 shadow-sm">
                <img
                  src={logoUrl}
                  alt="RAKU Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/icons/raku_FF4F00_logo_128.png';
                  }}
                />
              </div>
              <span className="font-extrabold text-lg text-white font-heading tracking-tight">
                RAKU
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {t((d) => d.demo.footer.description)}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 max-w-sm">
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                {t((d) => d.demo.footer.newsletterTitle)}
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder={t((d) => d.demo.footer.newsletterPlaceholder)}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 transition"
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'var(--ui-color-primary, #6366F1)',
                    borderRadius: 'var(--radius-md, 8px)',
                  }}
                  className="px-3.5 py-2 text-white font-bold text-xs shadow-sm hover:opacity-90 transition flex items-center gap-1 cursor-pointer"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-semibold">
                  {t((d) => d.demo.footer.subscribedMsg)}
                </p>
              )}
            </form>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider font-heading">
              {t((d) => d.demo.footer.product)}
            </h4>
            <ul className="space-y-2">
              {[
                { label: t((d) => d.demo.navbar.home), id: 'home' },
                { label: t((d) => d.demo.navbar.features), id: 'features' },
                { label: t((d) => d.demo.navbar.pricing), id: 'pricing' },
                { label: t((d) => d.demo.navbar.dashboard), id: 'dashboard' },
                { label: 'Design Tokens', id: 'home' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(item.id as DemoPageId)}
                    className="hover:text-white transition cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider font-heading">
              {t((d) => d.demo.footer.company)}
            </h4>
            <ul className="space-y-2">
              {[
                { label: t((d) => d.demo.navbar.about), id: 'about' },
                { label: t((d) => d.demo.navbar.blog), id: 'blog' },
                { label: t((d) => d.demo.navbar.contact), id: 'contact' },
                { label: 'Careers', id: 'about' },
                { label: 'Brand Assets', id: 'home' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(item.id as DemoPageId)}
                    className="hover:text-white transition cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider font-heading">
              {t((d) => d.demo.footer.resources)}
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Documentation', id: 'home' },
                { label: 'Master XML Spec', id: 'home' },
                { label: 'Cursor Rules', id: 'home' },
                { label: 'Tailwind Config', id: 'home' },
                { label: 'Help Center', id: 'contact' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(item.id as DemoPageId)}
                    className="hover:text-white transition cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider font-heading">
              {t((d) => d.demo.footer.legal)}
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Privacy Policy', id: 'about' },
                { label: 'Terms of Service', id: 'about' },
                { label: 'Security Overview', id: 'about' },
                { label: 'Cookie Settings', id: 'about' },
                { label: '404 Page Demo', id: '404' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(item.id as DemoPageId)}
                    className="hover:text-white transition cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 text-[11px]">
            {t((d) => d.demo.footer.copyright, { year: new Date().getFullYear() })}
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <Tooltip content="GitHub" position="top">
              <a href="#github" className="hover:text-white transition">
                <Github className="w-4 h-4" />
              </a>
            </Tooltip>
            <Tooltip content="Twitter / X" position="top">
              <a href="#twitter" className="hover:text-white transition">
                <Twitter className="w-4 h-4" />
              </a>
            </Tooltip>
            <Tooltip content="Discord Community" position="top">
              <a href="#discord" className="hover:text-white transition">
                <MessageSquare className="w-4 h-4" />
              </a>
            </Tooltip>
            <Tooltip content="LinkedIn" position="top">
              <a href="#linkedin" className="hover:text-white transition">
                <Linkedin className="w-4 h-4" />
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
    </footer>
  );
};
