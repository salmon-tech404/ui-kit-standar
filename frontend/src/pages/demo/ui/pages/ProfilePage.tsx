import React, { useState } from 'react';
import { DemoPageId, DemoUser } from '../../types';
import { useDesignStore } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';
import { Tooltip } from '@/shared/ui';
import {
  User,
  Mail,
  Building,
  Calendar,
  CheckCircle2,
  Sparkles,
  Edit3,
  Save,
  Award,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface ProfilePageProps {
  onNavigate: (page: DemoPageId) => void;
  user: DemoUser;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const { tokens } = useDesignStore();
  const { t } = useI18n();

  const activities = [
    { title: 'Compiled Master XML specification v1.1.0', time: '2 hours ago', type: 'system' },
    { title: 'Configured 5-Variant Button System with 6 states', time: 'Yesterday at 4:30 PM', type: 'component' },
    { title: 'Audited WCAG 2.1 AAA Contrast on Surface Layers', time: 'Aug 14, 2026', type: 'a11y' },
    { title: 'Upgraded Workspace Subscription to Pro Tier', time: 'Aug 01, 2026', type: 'billing' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-xs py-4">
      {/* Profile Header Banner */}
      <div
        style={{
          borderRadius: 'var(--radius-xl, 16px)',
          backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
          borderColor: 'var(--ui-color-border-default, #E2E8F0)',
        }}
        className="border overflow-hidden shadow-sm"
      >
        {/* Cover Gradient */}
        <div
          style={{
            background: 'linear-gradient(to right, var(--ui-color-primary, #FF4F00), var(--ui-color-accent, #10B981))',
          }}
          className="h-32 w-full opacity-85"
        />

        <div className="px-6 pb-6 pt-0 relative">
          <div
            style={{ borderColor: 'var(--ui-color-border-subtle, #E2E8F0)' }}
            className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 gap-4 pb-4 border-b"
          >
            <div className="flex items-end gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                style={{ borderColor: 'var(--ui-color-bg-card, #FFFFFF)' }}
                className="w-24 h-24 rounded-2xl object-cover border-4 shadow-lg"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold font-heading">
                    {name}
                  </h1>
                  <span
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--ui-color-primary, #FF4F00) 15%, transparent)',
                      color: 'var(--ui-color-primary, #FF4F00)',
                    }}
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono"
                  >
                    {user.plan} Member
                  </span>
                </div>
                <p
                  style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
                  className="text-xs"
                >
                  {role} at {user.organization}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              style={{ borderRadius: 'var(--radius-md, 8px)' }}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? t(d => d.demo.profile.cancelEdit) : t(d => d.demo.profile.editProfile)}</span>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-4 pt-4 text-center">
            <div
              style={{
                borderColor: 'var(--ui-color-border-subtle, #E2E8F0)',
                backgroundColor: 'color-mix(in srgb, var(--ui-color-bg-card, #FFFFFF) 40%, transparent)',
              }}
              className="p-3 border rounded-xl"
            >
              <div className="text-lg font-bold font-mono">128</div>
              <div
                style={{ color: 'var(--ui-color-text-tertiary, #94A3B8)' }}
                className="text-[11px]"
              >
                {t(d => d.demo.profile.activeTokensCount)}
              </div>
            </div>
            <div
              style={{
                borderColor: 'var(--ui-color-border-subtle, #E2E8F0)',
                backgroundColor: 'color-mix(in srgb, var(--ui-color-primary, #FF4F00) 8%, transparent)',
              }}
              className="p-3 border rounded-xl"
            >
              <div
                style={{ color: 'var(--ui-color-primary, #FF4F00)' }}
                className="text-lg font-bold font-mono"
              >
                42
              </div>
              <div
                style={{ color: 'var(--ui-color-text-tertiary, #94A3B8)' }}
                className="text-[11px]"
              >
                {t(d => d.demo.profile.autonomousAgentsCount)}
              </div>
            </div>
            <div
              style={{
                borderColor: 'var(--ui-color-border-subtle, #E2E8F0)',
                backgroundColor: 'color-mix(in srgb, var(--ui-color-accent, #10B981) 8%, transparent)',
              }}
              className="p-3 border rounded-xl"
            >
              <div
                style={{ color: 'var(--ui-color-accent, #10B981)' }}
                className="text-lg font-bold font-mono"
              >
                99.98%
              </div>
              <div
                style={{ color: 'var(--ui-color-text-tertiary, #94A3B8)' }}
                className="text-[11px]"
              >
                {t(d => d.demo.profile.accuracyPercent)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div
        style={{
          borderRadius: 'var(--radius-xl, 16px)',
          backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
          borderColor: 'var(--ui-color-border-default, #E2E8F0)',
        }}
        className="p-6 border shadow-sm space-y-4"
      >
        <h3 className="font-bold text-sm font-heading">
          {t(d => d.demo.profile.recentContributions)}
        </h3>

        <div className="space-y-3">
          {activities.map((act, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">{act.title}</div>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
