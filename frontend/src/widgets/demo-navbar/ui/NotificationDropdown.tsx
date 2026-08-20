import React, { useState } from 'react';
import { Bell, CheckCheck, Clock, ShieldCheck, Sparkles, CheckCircle2, X } from 'lucide-react';
import { useI18n } from '@/shared/i18n';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: 'success' | 'info' | 'audit';
}

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif_1',
      title: 'Biên dịch Token thành công sang RFC 2119',
      description: 'Toàn bộ 25 danh mục Design Token đã được đồng bộ với Claude 3.7 và Cursor.',
      time: '10 phút trước',
      unread: true,
      type: 'success',
    },
    {
      id: 'notif_2',
      title: 'Kiểm toán WCAG 2.1 Contrast đạt điểm tuyệt đối AAA',
      description: 'Màu nền Dark Surface và Focus Ring đáp ứng độ tương phản 7.4:1.',
      time: '1 giờ trước',
      unread: true,
      type: 'audit',
    },
    {
      id: 'notif_3',
      title: 'Elena Rostova đã phê duyệt bản phát hành v2.4',
      description: 'Hệ thống Button 5-Variant System đã sẵn sàng triển khai môi trường Production.',
      time: 'Hôm qua',
      unread: false,
      type: 'info',
    },
  ]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'success':
        return <Sparkles className="w-4 h-4 text-orange-500 shrink-0" />;
      case 'audit':
        return <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />;
      case 'info':
      default:
        return <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />;
    }
  };

  return (
    <div
      style={{
        borderRadius: 'var(--ui-radius-xl, 16px)',
        backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
        borderColor: 'var(--ui-color-border-default, #E2E8F0)',
        boxShadow: 'var(--ui-shadow-xl, 0 20px 25px -5px rgba(0,0,0,0.15))',
      }}
      className="absolute right-0 top-12 w-80 sm:w-96 border p-0 z-50 animate-in fade-in slide-in-from-top-2 overflow-hidden select-none"
    >
      {/* Header */}
      <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-orange-500" />
          <span className="font-bold text-xs text-slate-900 dark:text-white font-heading">
            Thông Báo Hệ Thống
          </span>
          {unreadCount > 0 && (
            <span
              style={{
                backgroundColor: 'var(--ui-color-primary, #FF4F00)',
                borderRadius: 'var(--ui-radius-full, 9999px)',
              }}
              className="text-[9px] font-mono px-1.5 py-0.2 text-white font-bold"
            >
              {unreadCount} mới
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-[11px] text-orange-600 dark:text-orange-400 hover:underline font-semibold flex items-center gap-1 p-1 cursor-pointer"
            >
              <CheckCheck className="w-3 h-3" />
              <span>Đọc tất cả</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-3 transition flex items-start gap-3 ${
              item.unread
                ? 'bg-orange-50/40 dark:bg-orange-950/20'
                : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <div className="p-1.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200/80 dark:border-slate-700 shadow-2xs mt-0.5">
              {getIcon(item.type)}
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between gap-1">
                <span className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                  {item.title}
                </span>
                {item.unread && (
                  <span
                    style={{ backgroundColor: 'var(--ui-color-primary, #FF4F00)' }}
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                  />
                )}
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>

              <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                <Clock className="w-2.5 h-2.5" />
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 text-center">
        <span className="text-[10px] text-slate-400 font-medium">
          Tất cả thông báo được đồng bộ thời gian thực với RAKU Hub
        </span>
      </div>
    </div>
  );
};
