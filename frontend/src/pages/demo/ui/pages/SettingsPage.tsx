import React, { useState } from 'react';
import { DemoPageId, DemoUser } from '../../types';
import { useDesignStore } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';
import { Tooltip, FormSelect } from '@/shared/ui';
import {
  User,
  Building,
  Bell,
  Shield,
  Key,
  Copy,
  Check,
  Plus,
  Trash2,
  Lock,
  Save,
  AlertTriangle,
  Languages,
} from 'lucide-react';

interface SettingsPageProps {
  onNavigate: (page: DemoPageId) => void;
  user: DemoUser;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigate, user }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'workspace' | 'notifications' | 'security'>('profile');
  const [saved, setSaved] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [demoLanguage, setDemoLanguage] = useState('vi');
  const { tokens } = useDesignStore();
  const { t } = useI18n();

  const [notificationSettings, setNotificationSettings] = useState({
    taskComplete: { email: true, push: true, slack: true },
    quotaAlerts: { email: true, push: true, slack: false },
    billingInvoices: { email: true, push: false, slack: false },
    securityAlerts: { email: true, push: true, slack: true },
  });

  const [apiKeys, setApiKeys] = useState([
    { id: 'key_live_raku_89f92a10', name: 'Production Agent Runner', created: 'Oct 12, 2026', lastUsed: '2 mins ago' },
    { id: 'key_test_raku_77a102bc', name: 'Local Cursor IDE Sync', created: 'Oct 08, 2026', lastUsed: '3 hours ago' },
  ]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCreateKey = () => {
    const newKey = {
      id: `key_live_raku_${Math.random().toString(36).substring(2, 10)}`,
      name: `Agent Key #${apiKeys.length + 1}`,
      created: 'Just now',
      lastUsed: 'Never',
    };
    setApiKeys([...apiKeys, newKey]);
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-xs py-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
          {t(d => d.demo.settings.pageTitle)}
        </h1>
        <p className="text-slate-500 text-xs">
          {t(d => d.demo.settings.pageSubtitle)}
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {[
          { key: 'profile', label: t(d => d.demo.settings.tabs.profile), icon: User },
          { key: 'workspace', label: t(d => d.demo.settings.tabs.workspace), icon: Building },
          { key: 'notifications', label: t(d => d.demo.settings.tabs.notifications), icon: Bell },
          { key: 'security', label: t(d => d.demo.settings.tabs.security), icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition ${
                activeTab === tab.key
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. PROFILE TAB */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSave} className="space-y-6">
          <div
            style={{
              borderRadius: 'var(--ui-radius-card, var(--radius-xl, 16px))',
              backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
              borderColor: 'var(--ui-color-border-default, #E2E8F0)',
            }}
            className="demo-card-interactive p-6 border space-y-5"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                style={{ borderColor: 'var(--ui-color-primary, #FF4F00)' }}
                className="w-16 h-16 rounded-full object-cover border-2 shadow-md"
              />
              <div className="space-y-1">
                <h3 className="font-bold text-sm font-heading">{user.name}</h3>
                <p
                  style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
                  className="text-[11px]"
                >
                  Primary Workspace Administrator
                </p>
                <button
                  type="button"
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold"
                >
                  Change Avatar Photo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="font-semibold">{t(d => d.demo.auth.fullName)}</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold">{t(d => d.demo.auth.workEmail)}</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold">Bio & Technical Role</label>
              <textarea
                rows={3}
                defaultValue="Senior Principal Design Systems Architect. Specializing in RFC 2119 directives and AI vibe coding integration."
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              style={{
                backgroundColor: 'var(--ui-color-primary, #FF4F00)',
                borderRadius: 'var(--radius-md, 8px)',
              }}
              className="px-5 py-2 text-white font-bold shadow-md flex items-center gap-1.5"
            >
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{saved ? t(d => d.common.success) : t(d => d.common.save)}</span>
            </button>
          </div>
        </form>
      )}

      {/* 2. WORKSPACE TAB */}
      {activeTab === 'workspace' && (
        <div className="space-y-6">
          <div
            style={{
              borderRadius: 'var(--ui-radius-card, var(--radius-xl, 16px))',
              backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
              borderColor: 'var(--ui-color-border-default, #E2E8F0)',
            }}
            className="demo-card-interactive p-6 border space-y-4"
          >
            <h3 className="font-bold text-sm font-heading">Workspace Parameters</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold">Workspace Name</label>
                <input
                  type="text"
                  defaultValue="RAKU Studio Production"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <FormSelect
                  label="Language / Ngôn Ngữ Demo"
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
            </div>
          </div>

          {/* Danger Zone */}
          <div
            style={{
              borderRadius: 'var(--radius-xl, 16px)',
              borderColor: 'var(--ui-color-error, #EF4444)',
              backgroundColor: 'color-mix(in srgb, var(--ui-color-error, #EF4444) 6%, transparent)',
            }}
            className="p-6 border space-y-3"
          >
            <div
              style={{ color: 'var(--ui-color-error, #EF4444)' }}
              className="flex items-center gap-2 font-bold text-sm"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{t(d => d.demo.settings.dangerZone)}</span>
            </div>
            <p
              style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
              className="text-xs"
            >
              {t(d => d.demo.settings.dangerDesc)}
            </p>
            <button
              style={{
                backgroundColor: 'var(--ui-color-error, #EF4444)',
                borderRadius: 'var(--radius-md, 8px)',
              }}
              className="px-4 py-2 hover:opacity-90 text-white font-bold transition shadow-sm"
            >
              {t(d => d.demo.settings.deleteWorkspaceBtn)}
            </button>
          </div>
        </div>
      )}

      {/* 3. NOTIFICATIONS TAB */}
      {activeTab === 'notifications' && (
        <div
          style={{
            borderRadius: 'var(--radius-xl, 16px)',
            backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
            borderColor: 'var(--ui-color-border-default, #E2E8F0)',
          }}
          className="p-6 border shadow-sm space-y-6"
        >
          <div>
            <h3 className="font-bold text-sm font-heading">
              Notification Delivery Channels
            </h3>
            <p
              style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
              className="text-xs"
            >
              Configure which channels receive real-time telemetry updates.
            </p>
          </div>

          <table className="w-full text-left text-xs">
            <thead
              style={{ borderColor: 'var(--ui-color-border-subtle, #E2E8F0)' }}
              className="border-b font-bold uppercase text-[10px]"
            >
              <tr>
                <th className="py-2.5">Event Category</th>
                <th className="py-2.5 text-center">Email</th>
                <th className="py-2.5 text-center">Push Mobile</th>
                <th className="py-2.5 text-center">Slack Webhook</th>
              </tr>
            </thead>
            <tbody
              style={{ borderColor: 'var(--ui-color-border-subtle, #E2E8F0)' }}
              className="divide-y"
            >
              {[
                { key: 'taskComplete', title: 'Agent Task Completed Successfully' },
                { key: 'quotaAlerts', title: 'Token & Compute Quota Warning (80%)' },
                { key: 'billingInvoices', title: 'Monthly Billing & Invoices Receipt' },
                { key: 'securityAlerts', title: 'New API Key or Suspicious Session' },
              ].map((row) => (
                <tr key={row.key} className="hover:opacity-80">
                  <td className="py-3 font-semibold">{row.title}</td>
                  <td className="py-3 text-center">
                    <input type="checkbox" defaultChecked className="rounded cursor-pointer" />
                  </td>
                  <td className="py-3 text-center">
                    <input type="checkbox" defaultChecked className="rounded cursor-pointer" />
                  </td>
                  <td className="py-3 text-center">
                    <input type="checkbox" className="rounded cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. SECURITY & API KEYS TAB */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          {/* Active API Keys */}
          <div
            style={{
              borderRadius: 'var(--radius-xl, 16px)',
              backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
              borderColor: 'var(--ui-color-border-default, #E2E8F0)',
            }}
            className="p-6 border shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm font-heading">
                  {t(d => d.demo.settings.apiKeySectionTitle)}
                </h3>
                <p
                  style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
                  className="text-xs"
                >
                  {t(d => d.demo.settings.apiKeySectionSubtitle)}
                </p>
              </div>
              <button
                onClick={handleCreateKey}
                style={{
                  backgroundColor: 'var(--ui-color-primary, #6366F1)',
                  borderRadius: 'var(--radius-md, 8px)',
                }}
                className="px-3.5 py-1.5 text-white font-bold shadow-sm hover:opacity-90 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t(d => d.demo.settings.generateKeyBtn)}</span>
              </button>
            </div>

            <div className="space-y-2">
              {apiKeys.map((k) => (
                <div
                  key={k.id}
                  className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 dark:text-white">{k.name}</div>
                    <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                      <span>{k.id}</span>
                      <Tooltip content={copiedKey === k.id ? t(d => d.common.copied) : t(d => d.common.copy)} position="top">
                        <button
                          onClick={() => handleCopyKey(k.id)}
                          className="text-slate-400 hover:text-indigo-600"
                        >
                          {copiedKey === k.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                  <Tooltip content={t(d => d.common.delete)} position="left">
                    <button
                      onClick={() => handleDeleteKey(k.id)}
                      className="p-1 text-slate-400 hover:text-red-600 rounded transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
