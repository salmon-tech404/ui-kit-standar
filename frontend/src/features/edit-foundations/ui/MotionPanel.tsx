import React from 'react';
import { useDesignStore, SelectedToken } from '@/entities/design-token';
import { PanelSection, TokenSliderControl, TokenToggleCard, PanelCallout } from '@/shared/ui';
import { Zap, Sparkles } from 'lucide-react';

export const MotionPanel: React.FC = () => {
  const { tokens, updateToken, selectedToken, setSelectedToken } = useDesignStore();
  const { motion } = tokens.foundations;
  const project = tokens.project;

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  const durationList = [
    { key: 'fast', label: 'duration-fast', val: motion.durations.fast, min: 50, max: 300 },
    { key: 'normal', label: 'duration-normal', val: motion.durations.normal, min: 100, max: 600 },
    { key: 'slow', label: 'duration-slow', val: motion.durations.slow, min: 200, max: 1000 },
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* 1. CORE DURATION TIERS */}
      <PanelSection title="1. THỜI LƯỢNG CHUYỂN ĐỘNG CHUẨN">
        <div className="space-y-2.5">
          {durationList.map((item) => (
            <TokenSliderControl
              key={item.key}
              label={item.label}
              value={item.val}
              unit="ms"
              min={item.min}
              max={item.max}
              step={25}
              isSelected={selectedToken.key === `motion.durations.${item.key}`}
              onSelect={() =>
                handleSelectToken({
                  type: 'motion',
                  category: 'motion',
                  key: `motion.durations.${item.key}`,
                  path: `foundations.motion.durations.${item.key}`,
                  name: item.label,
                  value: `${item.val}ms`,
                  cssVar: `${project.prefix}motion-duration-${item.key}`,
                  description: `Thời lượng chuyển động ${item.label} (${item.val}ms).`,
                  impactComponents: ['Button', 'Modal', 'Drawer', 'Accordion', 'Dropdown'],
                  guidelines: {
                    do: ['Giữ phản hồi hover nút bấm dưới 200ms để đảm bảo độ mượt.'],
                    dont: ['Không vượt quá 500ms đối với các vi tương tác thông thường.'],
                  },
                })
              }
              onChange={(val) => updateToken(`foundations.motion.durations.${item.key}`, val)}
            />
          ))}
        </div>
      </PanelSection>

      {/* 2. MICRO-INTERACTION DURATIONS */}
      <PanelSection title="2. TƯƠNG TÁC VI MÔ (MICRO-INTERACTIONS)">
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(motion.microInteractions).map(([k, ms]) => {
            const isSelected = selectedToken.key === `motion.micro.${k}`;
            return (
              <div
                key={k}
                onClick={() =>
                  handleSelectToken({
                    type: 'motion',
                    category: 'motion',
                    key: `motion.micro.${k}`,
                    path: `foundations.motion.microInteractions.${k}`,
                    name: `${k.toUpperCase()} Duration`,
                    value: `${ms}ms`,
                    cssVar: `${project.prefix}motion-${k}`,
                    description: `Timing curve chuyên dụng cho tương tác ${k}.`,
                    impactComponents: [k.toUpperCase(), 'Canvas'],
                  })
                }
                className={`p-2.5 rounded-xl border transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-semibold shadow-xs ring-1 ring-indigo-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700 hover:border-indigo-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate capitalize text-[11px]">
                    {k}
                  </span>
                  <Zap className="w-3 h-3 text-indigo-500 shrink-0" />
                </div>

                <input
                  type="range"
                  min={50}
                  max={600}
                  step={25}
                  value={ms}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => updateToken(`foundations.motion.microInteractions.${k}`, parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 my-0.5"
                />

                {/* Bottom subtle millisecond readout */}
                <div className="flex justify-end items-center">
                  <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-900/40 px-1.5 py-0.5 rounded">
                    {ms}ms
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </PanelSection>

      {/* 3. ACCESSIBILITY TOGGLE */}
      <TokenToggleCard
        title="Prefers Reduced Motion"
        description="Tự động vô hiệu hóa hoạt ảnh cho người dùng nhạy cảm thị giác"
        checked={motion.reducedMotion}
        onChange={(checked) => updateToken('foundations.motion.reducedMotion', checked)}
      />

      {/* Contextual Description Callout */}
      <PanelCallout
        title="Quy Chuẩn Chuyển Động & Hoạt Ảnh Giao Diện"
        description={`Hệ thống chuyển động đảm bảo tính tự nhiên, linh hoạt và phản hồi tức thì:
• Fast (150ms): Chuyển cảnh chuẩn nhất cho hiệu ứng rê chuột (Hover) và bấm nút (Active).
• Normal (250ms): Chuyển cảnh chuẩn nhất cho dropdown menu, tooltip và tabs.
• Slow (400ms): Chuyển cảnh chuẩn cho hộp thoại Modal (modalEnter), ngăn kéo Drawer và chuyển trang.`}
      />
    </div>
  );
};
