import React from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { useDesignStore, SupportedThemeMode } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';

export const ThemeModesPanel: React.FC = () => {
  const { tokens, toggleSupportedThemeMode } = useDesignStore();
  const { project } = tokens;
  const { t } = useI18n();

  const supported: SupportedThemeMode[] = project.supportedThemeModes || ['light', 'dark', 'system'];

  const themeOptions: {
    key: SupportedThemeMode;
    label: string;
    sub: string;
    icon: React.ComponentType<{ className?: string }>;
    iconColor: string;
  }[] = [
    {
      key: 'light',
      label: 'Light Mode',
      sub: 'Giao diện sáng tiêu chuẩn',
      icon: Sun,
      iconColor: 'text-amber-500',
    },
    {
      key: 'dark',
      label: 'Dark Mode',
      sub: 'Giao diện tối chống mỏi mắt',
      icon: Moon,
      iconColor: 'text-indigo-400',
    },
    {
      key: 'system',
      label: 'System Mode',
      sub: 'Tự động nhận diện theo OS',
      icon: Laptop,
      iconColor: 'text-slate-500 dark:text-slate-400',
    },
  ];

  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Chế Độ Giao Diện Hỗ Trợ
          </label>
          <span className="text-[11px] text-slate-400 font-mono">
            {supported.length}/3 đã chọn
          </span>
        </div>

        <div className="space-y-2">
          {themeOptions.map((opt) => {
            const isChecked = supported.includes(opt.key);
            const IconComp = opt.icon;

            return (
              <div
                key={opt.key}
                onClick={() => toggleSupportedThemeMode(opt.key)}
                className="py-2 px-1.5 flex items-center justify-between cursor-pointer transition select-none hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg"
              >
                <div className="flex items-center gap-2.5">
                  <IconComp className={`w-4 h-4 shrink-0 ${opt.iconColor}`} />
                  <div>
                    <div className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <span>{opt.label}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {opt.sub}
                    </div>
                  </div>
                </div>

                <div
                  className={`w-4.5 h-4.5 rounded flex items-center justify-center transition ${
                    isChecked
                      ? 'bg-orange-600 text-white'
                      : 'border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5 bg-transparent">
        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          {t((d) => d.studio.descriptions.themeModes.title)}
        </div>
        <p className="text-xs font-normal text-slate-600 dark:text-slate-400 leading-relaxed">
          {t((d) => d.studio.descriptions.themeModes.content)}
        </p>
      </div>
    </div>
  );
};
