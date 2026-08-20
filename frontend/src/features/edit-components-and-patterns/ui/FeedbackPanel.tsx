import React from 'react';
import { Sparkles, Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { useDesignStore, SelectedToken } from '@/entities/design-token';
import { PanelSection, TokenBadge, TokenSliderControl, TokenSelectCard, PanelCallout } from '@/shared/ui';

export const FeedbackPanel: React.FC = () => {
  const { tokens, updateToken, selectedToken, setSelectedToken } = useDesignStore();
  const feedback = tokens.components.feedback;
  const project = tokens.project;

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  const alertList = [
    { key: 'info', label: 'Alert Info', icon: <Info className="w-4 h-4 text-blue-500 shrink-0" />, color: feedback.alert?.styles?.info?.bg || '#EFF6FF', desc: 'Thông báo ngữ cảnh thông tin' },
    { key: 'success', label: 'Alert Success', icon: <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />, color: feedback.alert?.styles?.success?.bg || '#ECFDF5', desc: 'Thông báo thao tác thành công' },
    { key: 'warning', label: 'Alert Warning', icon: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />, color: feedback.alert?.styles?.warning?.bg || '#FFFBEB', desc: 'Cảnh báo rủi ro người dùng' },
    { key: 'error', label: 'Alert Error', icon: <XCircle className="w-4 h-4 text-red-500 shrink-0" />, color: feedback.alert?.styles?.error?.bg || '#FEF2F2', desc: 'Báo lỗi hệ thống nghiêm trọng' },
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* 1. ALERT COMPONENT STYLES */}
      <PanelSection title="1. THÔNG BÁO CẢNH BÁO (ALERTS)">
        <div className="space-y-2">
          {alertList.map((alert) => (
            <TokenSelectCard
              key={alert.key}
              label={alert.label}
              description={alert.desc}
              isSelected={selectedToken.key === `feedback.alert.${alert.key}`}
              icon={alert.icon}
              previewSlot={
                <div
                  className="w-5 h-5 rounded border border-black/10 shrink-0"
                  style={{ backgroundColor: alert.color }}
                />
              }
              onSelect={() =>
                handleSelectToken({
                  type: 'component',
                  category: 'feedback',
                  key: `feedback.alert.${alert.key}`,
                  path: `components.feedback.alert.styles.${alert.key}`,
                  name: alert.label,
                  value: alert.color,
                  cssVar: `${project.prefix}alert-${alert.key}`,
                  description: alert.desc,
                  impactComponents: ['Alert Banner', 'Feedback Notification'],
                })
              }
            />
          ))}
        </div>
      </PanelSection>

      {/* 2. PROGRESS & SKELETON */}
      <PanelSection title="2. TIẾN ĐỘ & KHUNG CHỜ (PROGRESS & SKELETON)">
        <div className="space-y-2.5">
          <TokenSliderControl
            label="progress-height"
            value={feedback.progress?.height || 8}
            min={4}
            max={20}
            step={2}
            isSelected={selectedToken.key === 'feedback.progress.height'}
            onSelect={() =>
              handleSelectToken({
                type: 'component',
                category: 'feedback',
                key: 'feedback.progress.height',
                path: 'components.feedback.progress.height',
                name: 'Progress Bar Height',
                value: `${feedback.progress?.height || 8}px`,
                cssVar: `${project.prefix}progress-height`,
                description: 'Height of linear progress tracking indicator.',
                impactComponents: ['Progress Bar'],
              })
            }
            onChange={(val) => updateToken('components.feedback.progress.height', val)}
          />

          <TokenSliderControl
            label="toast-duration"
            value={feedback.toast?.duration || 3000}
            unit="ms"
            min={1000}
            max={8000}
            step={500}
            isSelected={selectedToken.key === 'feedback.toast.duration'}
            onSelect={() =>
              handleSelectToken({
                type: 'component',
                category: 'feedback',
                key: 'feedback.toast.duration',
                path: 'components.feedback.toast.duration',
                name: 'Toast Duration',
                value: `${feedback.toast?.duration || 3000}ms`,
                cssVar: `${project.prefix}toast-duration`,
                description: 'Auto-dismiss timeout for floating toast notifications.',
                impactComponents: ['Toast Notifications'],
              })
            }
            onChange={(val) => updateToken('components.feedback.toast.duration', val)}
          />
        </div>
      </PanelSection>

      {/* Contextual Description Callout */}
      <PanelCallout
        title="Quy Chuẩn Thông Báo & Phản Hồi"
        description={`Hệ thống thông báo (Feedback):
• Alert 4 trạng thái ngữ nghĩa (Info, Success, Warning, Error) đồng bộ màu nền và viền.
• Thời gian hiển thị Toast tiêu chuẩn 3000ms giúp người dùng đọc trọn vẹn thông điệp.`}
      />
    </div>
  );
};
