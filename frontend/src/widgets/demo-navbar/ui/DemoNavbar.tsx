import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  User,
  Settings,
  CreditCard,
  LogOut,
  LayoutDashboard,
  Bell,
  ChevronDown,
  Sparkles,
  Globe,
} from 'lucide-react';
import { useDesignStore } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';
import { Tooltip, FormSelect } from '@/shared/ui';
import { DemoPageId, DemoUser } from '@/pages/demo/types';
import { NotificationDropdown } from './NotificationDropdown';

interface DemoNavbarProps {
  currentPage: DemoPageId;
  onNavigate: (page: DemoPageId) => void;
  isAuthenticated: boolean;
  user: DemoUser;
  onLogout: () => void;
  onLogin: () => void;
}

export const DemoNavbar: React.FC<DemoNavbarProps> = ({
  currentPage,
  onNavigate,
  isAuthenticated,
  user,
  onLogout,
  onLogin: _onLogin,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [demoLanguage, setDemoLanguage] = useState('vi');
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const { tokens } = useDesignStore();
  const { t } = useI18n();

  const logoUrl = tokens.brandAssets.logo.urlLight || '/icons/raku_FF4F00_logo_128.png';

  // 5 Main Navigation Links
  const navLinks: { id: DemoPageId; label: string }[] = [
    { id: 'home', label: t((d) => d.demo.navbar.home) },
    { id: 'features', label: t((d) => d.demo.navbar.features) },
    { id: 'about', label: t((d) => d.demo.navbar.about) },
    { id: 'blog', label: t((d) => d.demo.navbar.blog) },
    { id: 'contact', label: t((d) => d.demo.navbar.contact) },
  ];

  // Auto-close User Menu & Notifications on click outside or Escape key press
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsUserMenuOpen(false);
        setIsNotificationsOpen(false);
      }
    };

    if (isUserMenuOpen || isNotificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isUserMenuOpen]);

  return (
    <header
      style={{
        height: 'var(--ui-header-height, 56px)',
      }}
      className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shrink-0 z-40 relative overflow-visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4 relative overflow-visible">
        {/* Logo & Brand Identity */}
        <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => onNavigate('home')}>
          <img
            src={logoUrl}
            alt="RAKU Logo"
            className="w-8 h-8 object-contain shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/icons/raku_FF4F00_logo_128.png';
            }}
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white font-heading">
                RAKU
              </span>
              <span
                style={{
                  backgroundColor: 'var(--ui-color-primary, #FF4F00)',
                  borderRadius: 'var(--radius-full, 9999px)',
                }}
                className="text-[10px] font-semibold text-white px-2 py-0.5 uppercase tracking-wider font-mono"
              >
                {t((d) => d.demo.navbar.vibeBadge)}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap hidden lg:inline max-w-[220px] truncate">
              {t((d) => d.studio.brandTagline)}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 shrink-0">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              style={
                currentPage === link.id
                  ? {
                      color: 'var(--ui-color-primary, #FF4F00)',
                      backgroundColor: 'color-mix(in srgb, var(--ui-color-primary, #FF4F00) 12%, transparent)',
                    }
                  : undefined
              }
              className={`px-4 py-2 rounded-xl text-[13px] font-bold tracking-tight whitespace-nowrap transition shrink-0 cursor-pointer ${
                currentPage === link.id
                  ? 'font-extrabold shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:opacity-80'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3 shrink-0">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => onNavigate('login')}
                className="px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg transition whitespace-nowrap cursor-pointer"
              >
                {t((d) => d.demo.navbar.signIn)}
              </button>
              <button
                onClick={() => onNavigate('signup')}
                style={{
                  height: 'var(--control-height-sm, 32px)',
                  borderRadius: 'var(--radius-md, 8px)',
                  backgroundColor: 'var(--ui-color-primary, #FF4F00)',
                }}
                className="px-4 text-white text-xs font-bold shadow-sm hover:opacity-90 active:scale-95 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t((d) => d.demo.navbar.startFree)}</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <div ref={notifRef} className="relative">
                <Tooltip content="Notifications" position="bottom">
                  <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg relative hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  >
                    <Bell className="w-4 h-4" />
                    <span
                      style={{ backgroundColor: 'var(--ui-color-error, #EF4444)' }}
                      className="w-2 h-2 rounded-full absolute top-1.5 right-1.5"
                    />
                  </button>
                </Tooltip>

                <NotificationDropdown
                  isOpen={isNotificationsOpen}
                  onClose={() => setIsNotificationsOpen(false)}
                />
              </div>

              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  style={{ borderColor: 'var(--ui-color-border-subtle, #E2E8F0)' }}
                  className="flex items-center gap-2 p-1 pl-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition border cursor-pointer"
                >
                  <span className="text-xs font-bold hidden sm:inline whitespace-nowrap">
                    {user.name}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{ borderColor: 'var(--ui-color-border-default, #CBD5E1)' }}
                    className="w-7 h-7 rounded-full object-cover border"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
                </button>

                {isUserMenuOpen && (
                  <div
                    style={{
                      borderRadius: 'var(--radius-xl, 16px)',
                      backgroundColor: 'var(--ui-color-bg-modal, #FFFFFF)',
                      borderColor: 'var(--ui-color-border-subtle, #E2E8F0)',
                      boxShadow: 'var(--shadow-dropdown)',
                    }}
                    className="absolute right-0 mt-2.5 w-64 border py-1.5 z-50 text-xs animate-in fade-in zoom-in-95"
                  >
                    <div
                      style={{ borderColor: 'var(--ui-color-border-subtle, #E2E8F0)' }}
                      className="px-3.5 py-2.5 border-b"
                    >
                      <div className="font-bold text-xs">{user.name}</div>
                      <div
                        style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
                        className="text-[11px] truncate"
                      >
                        {user.email}
                      </div>
                      <span
                        style={{
                          backgroundColor: 'color-mix(in srgb, var(--ui-color-primary, #FF4F00) 15%, transparent)',
                          color: 'var(--ui-color-primary, #FF4F00)',
                        }}
                        className="inline-block mt-1 px-2 py-0.5 rounded-full font-mono text-[10px] font-bold"
                      >
                        {user.plan} Plan
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          onNavigate('profile');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-left font-medium cursor-pointer"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>{t((d) => d.demo.navbar.myProfile)}</span>
                      </button>

                      <button
                        onClick={() => {
                          onNavigate('dashboard');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-left font-medium cursor-pointer"
                      >
                        <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                        <span className="font-bold text-slate-900 dark:text-white">{t((d) => d.demo.navbar.dashboard)}</span>
                      </button>

                      <button
                        onClick={() => {
                          onNavigate('settings');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-left font-medium cursor-pointer"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span>{t((d) => d.demo.navbar.settings)}</span>
                      </button>

                      <button
                        onClick={() => {
                          onNavigate('billing');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-left font-medium cursor-pointer"
                      >
                        <CreditCard className="w-4 h-4 text-slate-400" />
                        <span>{t((d) => d.demo.navbar.billing)}</span>
                      </button>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 px-3.5 py-2.5 space-y-1.5 bg-slate-50/50 dark:bg-slate-800/40">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <Globe className="w-3 h-3 text-indigo-500" />
                        <span>Language / Ngôn Ngữ Demo</span>
                      </div>
                      <FormSelect
                        value={demoLanguage}
                        onChange={(e) => setDemoLanguage(e.target.value)}
                        options={[
                          { value: 'vi', label: '🇻🇳 Vietnamese (Tiếng Việt)' },
                          { value: 'en', label: '🇬🇧 English (United States)' },
                          { value: 'ja', label: '🇯🇵 Japanese (日本語)' },
                          { value: 'ko', label: '🇰🇷 Korean (한국어)' },
                          { value: 'fr', label: '🇫🇷 French (Français)' },
                          { value: 'de', label: '🇩🇪 German (Deutsch)' },
                          { value: 'es', label: '🇪🇸 Spanish (Español)' },
                        ]}
                      />
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                    <button
                      onClick={() => {
                        onLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-left font-semibold cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t((d) => d.demo.navbar.signOut)}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer ${
                currentPage === link.id
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 font-bold'
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              {link.label}
            </button>
          ))}
          {isAuthenticated && (
            <button
              onClick={() => {
                onNavigate('dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 flex items-center gap-2 cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t((d) => d.demo.navbar.dashboard)}</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
