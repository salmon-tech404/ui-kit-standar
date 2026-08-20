import React, { useState } from 'react';
import { DemoPageId } from '../../types';
import { useDesignStore } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';
import {
  Lock,
  Mail,
  User,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Github,
  KeyRound,
} from 'lucide-react';

interface AuthPageProps {
  onNavigate: (page: DemoPageId) => void;
  onLoginSuccess: () => void;
  view: 'login' | 'signup' | 'forgot_password' | 'reset_password';
}

export const AuthPages: React.FC<AuthPageProps> = ({ onNavigate, onLoginSuccess, view }) => {
  const { tokens } = useDesignStore();
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const logoUrl = tokens.brandAssets.logo.urlLight || '/icons/raku_FF4F00_logo_128.png';

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
      onNavigate('dashboard');
    }, 800);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
      onNavigate('dashboard');
    }, 900);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForgotSent(true);
    }, 600);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResetSuccess(true);
    }, 600);
  };

  return (
    <div className="min-h-[580px] flex items-center justify-center py-12 px-4">
      <div
        style={{
          borderRadius: 'var(--ui-radius-modal, var(--radius-xl, 16px))',
          backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
          borderColor: 'var(--ui-color-border-default, #E2E8F0)',
          boxShadow: 'var(--ui-shadow-modal, var(--shadow-modal))',
        }}
        className="w-full max-w-md border p-8 space-y-6 text-xs transition-all"
      >
        {/* Header with Logo */}
        <div className="text-center space-y-2">
          <div
            onClick={() => onNavigate('home')}
            style={{
              borderRadius: 'var(--ui-radius-input, var(--radius-lg, 12px))',
              borderColor: 'var(--ui-color-border-subtle, #E2E8F0)',
            }}
            className="w-12 h-12 mx-auto flex items-center justify-center overflow-hidden cursor-pointer border"
          >
            <img src={logoUrl} alt="RAKU Logo" className="w-full h-full object-contain p-1" />
          </div>

          <h2 className="text-xl font-bold font-heading">
            {view === 'login' && t(d => d.demo.auth.loginTitle)}
            {view === 'signup' && t(d => d.demo.auth.signupTitle)}
            {view === 'forgot_password' && t(d => d.demo.auth.forgotTitle)}
            {view === 'reset_password' && t(d => d.demo.auth.resetTitle)}
          </h2>

          <p
            style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
            className="text-[11px]"
          >
            {view === 'login' && t(d => d.demo.auth.loginSubtitle)}
            {view === 'signup' && t(d => d.demo.auth.signupSubtitle)}
            {view === 'forgot_password' && t(d => d.demo.auth.forgotSubtitle)}
            {view === 'reset_password' && t(d => d.demo.auth.resetSubtitle)}
          </p>
        </div>

        {/* 1. LOGIN FORM */}
        {view === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-semibold">{t(d => d.demo.auth.workEmail)}</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-semibold">{t(d => d.demo.auth.password)}</label>
                <button
                  type="button"
                  onClick={() => onNavigate('forgot_password')}
                  style={{ color: 'var(--ui-color-text-link, var(--ui-color-primary, #FF4F00))' }}
                  className="text-[11px] hover:underline"
                >
                  {t(d => d.demo.auth.forgotPasswordLink)}
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-[11px] cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>{t(d => d.demo.auth.rememberMe)}</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                height: 'var(--control-height-md, 40px)',
                borderRadius: 'var(--radius-md, 8px)',
                backgroundColor: 'var(--ui-color-primary, #FF4F00)',
              }}
              className="w-full text-white font-bold shadow-md hover:opacity-90 active:scale-95 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>{t(d => d.common.loading)}</span>
              ) : (
                <>
                  <span>{t(d => d.demo.auth.signInBtn)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="relative py-2 text-center">
              <div className="absolute inset-0 flex items-center">
                <div
                  style={{ borderColor: 'var(--ui-color-border-subtle, #E2E8F0)' }}
                  className="w-full border-t"
                />
              </div>
              <span
                style={{
                  backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
                  color: 'var(--ui-color-text-tertiary, #94A3B8)',
                }}
                className="relative px-2 text-[10px] uppercase font-bold"
              >
                {t(d => d.demo.auth.orContinueWith)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="py-2 px-3 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center gap-2 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </button>
              <button
                type="button"
                className="py-2 px-3 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center gap-2 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <span>Google</span>
              </button>
            </div>

            <div className="text-center pt-2 text-slate-500">
              {t(d => d.demo.auth.noAccount)}{' '}
              <button
                type="button"
                onClick={() => onNavigate('signup')}
                style={{ color: 'var(--ui-color-text-link, var(--ui-color-primary, #FF4F00))' }}
                className="font-bold hover:underline"
              >
                {t(d => d.demo.auth.signUpFree)}
              </button>
            </div>
          </form>
        )}

        {/* 2. SIGNUP FORM */}
        {view === 'signup' && (
          <form onSubmit={handleSignUpSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-semibold">{t(d => d.demo.auth.fullName)}</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold">{t(d => d.demo.auth.workEmail)}</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold">{t(d => d.demo.auth.password)}</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 text-[11px] cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded mt-0.5"
              />
              <span>{t(d => d.demo.auth.agreeTerms)}</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              style={{
                height: 'var(--control-height-md, 40px)',
                borderRadius: 'var(--radius-md, 8px)',
                backgroundColor: 'var(--ui-color-primary, #FF4F00)',
              }}
              className="w-full text-white font-bold shadow-md hover:opacity-90 active:scale-95 transition flex items-center justify-center gap-2"
            >
              {loading ? <span>{t(d => d.common.loading)}</span> : <span>{t(d => d.demo.auth.signUpBtn)}</span>}
            </button>

            <div className="text-center pt-2 text-slate-500">
              {t(d => d.demo.auth.haveAccount)}{' '}
              <button
                type="button"
                onClick={() => onNavigate('login')}
                style={{ color: 'var(--ui-color-text-link, var(--ui-color-primary, #FF4F00))' }}
                className="font-bold hover:underline"
              >
                {t(d => d.demo.navbar.signIn)}
              </button>
            </div>
          </form>
        )}

        {/* 3. FORGOT PASSWORD */}
        {view === 'forgot_password' && (
          <div className="space-y-4">
            {!forgotSent ? (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-semibold">{t(d => d.demo.auth.workEmail)}</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    height: 'var(--control-height-md, 40px)',
                    borderRadius: 'var(--radius-md, 8px)',
                    backgroundColor: 'var(--ui-color-primary, #FF4F00)',
                  }}
                  className="w-full text-white font-bold shadow-md hover:opacity-90 transition"
                >
                  {loading ? t(d => d.common.loading) : t(d => d.demo.auth.sendResetLinkBtn)}
                </button>
              </form>
            ) : (
              <div
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--ui-color-success, #10B981) 10%, transparent)',
                  borderColor: 'var(--ui-color-success, #10B981)',
                }}
                className="text-center p-4 rounded-xl border space-y-2"
              >
                <CheckCircle2
                  style={{ color: 'var(--ui-color-success, #10B981)' }}
                  className="w-8 h-8 mx-auto"
                />
                <div
                  style={{ color: 'var(--ui-color-success, #10B981)' }}
                  className="font-bold text-sm"
                >
                  {t(d => d.demo.auth.linkSentSuccess)}
                </div>
                <p
                  style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
                  className="text-xs"
                >
                  {t(d => d.demo.auth.linkSentDesc)}
                </p>
              </div>
            )}

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => onNavigate('login')}
                style={{ color: 'var(--ui-color-text-link, var(--ui-color-primary, #FF4F00))' }}
                className="font-bold hover:underline"
              >
                ← {t(d => d.common.back)} to {t(d => d.demo.navbar.signIn)}
              </button>
            </div>
          </div>
        )}

        {/* 4. RESET PASSWORD */}
        {view === 'reset_password' && (
          <div className="space-y-4">
            {!resetSuccess ? (
              <form onSubmit={handleResetSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-semibold">New Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold">{t(d => d.demo.auth.confirmPassword)}</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    height: 'var(--control-height-md, 40px)',
                    borderRadius: 'var(--radius-md, 8px)',
                    backgroundColor: 'var(--ui-color-primary, #FF4F00)',
                  }}
                  className="w-full text-white font-bold shadow-md hover:opacity-90 transition"
                >
                  {loading ? t(d => d.common.loading) : t(d => d.demo.auth.saveNewPasswordBtn)}
                </button>
              </form>
            ) : (
              <div
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--ui-color-success, #10B981) 10%, transparent)',
                  borderColor: 'var(--ui-color-success, #10B981)',
                }}
                className="text-center p-4 rounded-xl border space-y-3"
              >
                <CheckCircle2
                  style={{ color: 'var(--ui-color-success, #10B981)' }}
                  className="w-8 h-8 mx-auto"
                />
                <div
                  style={{ color: 'var(--ui-color-success, #10B981)' }}
                  className="font-bold text-sm"
                >
                  {t(d => d.demo.auth.passwordUpdatedSuccess)}
                </div>
                <p
                  style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
                  className="text-xs"
                >
                  {t(d => d.demo.auth.passwordUpdatedDesc)}
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  style={{
                    backgroundColor: 'var(--ui-color-primary, #FF4F00)',
                    borderRadius: 'var(--radius-md, 8px)',
                  }}
                  className="px-4 py-2 text-white font-bold shadow-sm hover:opacity-90 transition"
                >
                  {t(d => d.demo.navbar.signIn)}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
