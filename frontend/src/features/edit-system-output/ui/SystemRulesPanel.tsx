import React, { useState } from 'react';
import { useDesignStore } from '@/entities/design-token';
import { PanelSection } from '@/shared/ui';
import { ShieldAlert, Bot, CheckCircle2, AlertTriangle } from 'lucide-react';

export const SystemRulesPanel: React.FC = () => {
  const { tokens } = useDesignStore();
  const [activeTab, setActiveTab] = useState<'must' | 'must_not' | 'should'>('must');

  const mustRules = [
    'MUST use CSS custom properties (--ui-*) exclusively for colors, spacing, and radius.',
    'MUST maintain concentric border radius: R_inner = max(0, R_outer - Padding).',
    'MUST ensure WCAG 2.1 AA (4.5:1) minimum contrast for all foreground text.',
    'MUST optical-align all icons with text cap-height in buttons and inputs.',
  ];

  const mustNotRules = [
    'MUST NOT declare arbitrary inline hex codes (#123456) or fixed pixel padding in components.',
    'MUST NOT use z-indexes outside the 7 standardized decimal tiers (0, 10, 20, 30, 40, 50, 60).',
    'MUST NOT introduce non-standard intermediate breakpoints (e.g. 850px).',
    'MUST NOT exceed 500ms duration on standard UI micro-interactions.',
  ];

  const shouldRules = [
    'SHOULD prioritize semantic color tokens (Primary, Success, Error) over raw grayscale.',
    'SHOULD leverage 8-point spatial multiples (8px, 16px, 24px, 32px) for layout grid gaps.',
    'SHOULD provide aria-labels for all icon-only interactive action buttons.',
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Tab Filter */}
      <div className="grid grid-cols-3 gap-1 text-[11px]">
        {[
          { key: 'must', label: 'MUST (Bắt buộc)' },
          { key: 'must_not', label: 'MUST NOT (Cấm)' },
          { key: 'should', label: 'SHOULD (Nên dùng)' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`py-1.5 px-2 rounded-lg font-bold transition text-center truncate cursor-pointer ${
              activeTab === tab.key
                ? tab.key === 'must_not'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Rules List */}
      <PanelSection title={`DANH SÁCH CHỈ THỊ RFC 2119 (${activeTab.toUpperCase()})`}>
        <div className="space-y-2">
          {activeTab === 'must' &&
            mustRules.map((rule, idx) => (
              <div key={idx} className="p-2.5 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Rule #{idx + 1}</span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">{rule}</p>
              </div>
            ))}

          {activeTab === 'must_not' &&
            mustNotRules.map((rule, idx) => (
              <div key={idx} className="p-2.5 bg-red-50/70 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-red-700 dark:text-red-300">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>Constraint #{idx + 1}</span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">{rule}</p>
              </div>
            ))}

          {activeTab === 'should' &&
            shouldRules.map((rule, idx) => (
              <div key={idx} className="p-2.5 bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-300">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Guideline #{idx + 1}</span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">{rule}</p>
              </div>
            ))}
        </div>
      </PanelSection>

      {/* Contextual Description Callout */}
      <div className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5 bg-transparent mt-4">
        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          Chỉ Thị RFC 2119 Cho AI & LLMs
        </div>
        <p className="text-xs font-normal text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
          Các từ khóa RFC 2119 (MUST, MUST NOT, SHOULD) là khung pháp lý bất biến hướng dẫn các AI Agent (Cursor, Claude, Copilot) viết code tuân thủ 100% tiêu chuẩn thiết kế, triệt tiêu hoàn toàn lỗi tự bịa CSS (Hallucination).
        </p>
      </div>
    </div>
  );
};
