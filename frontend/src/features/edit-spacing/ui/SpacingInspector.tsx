import React from 'react';
import { useDesignStore } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';
import { F12BoxModelDiagram } from '@/shared/ui';
import { Smartphone, Monitor } from 'lucide-react';

export const SpacingInspector: React.FC = () => {
  const { selectedToken, setSelectedToken, updateToken } = useDesignStore();
  const { t } = useI18n();

  const key = selectedToken.key;
  const meta = (selectedToken as any).meta || {};
  const kind = meta.kind || 'gap1d';

  const pxVal = typeof selectedToken.value === 'object' ? (selectedToken.value?.px ?? 16) : (typeof selectedToken.value === 'number' ? selectedToken.value : 16);
  const pyVal = typeof selectedToken.value === 'object' ? (selectedToken.value?.py ?? 8) : (typeof selectedToken.value === 'number' ? selectedToken.value : 8);

  const mobileVal = typeof selectedToken.value === 'object' ? (selectedToken.value?.mobile ?? 16) : (typeof selectedToken.value === 'number' ? selectedToken.value : 16);
  const desktopVal = typeof selectedToken.value === 'object' ? (selectedToken.value?.desktop ?? 32) : (typeof selectedToken.value === 'number' ? selectedToken.value : 32);

  return (
    <div className="space-y-4 text-xs">
      {/* F12 DevTools Box-Model Diagram */}
      <F12BoxModelDiagram
        componentName={selectedToken.name}
        paddingX={kind === 'responsive' ? desktopVal : pxVal}
        paddingY={kind === 'responsive' ? desktopVal : pyVal}
        marginX={0}
        marginY={0}
        borderWidth={1}
        contentWidth={kind === 'padding2d' ? 120 : 'auto'}
        contentHeight={kind === 'padding2d' ? 36 : 'auto'}
      />

      {/* CASE 1: 2D Padding (Button, Input, Badge, TableCell) */}
      {kind === 'padding2d' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {/* Padding X */}
            <div className="space-y-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  {t((d) => d.studio.spacingTokens.inspector.paddingX)}
                </label>
                <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-1.5 py-0.5">
                  <input
                    type="number"
                    min={0}
                    max={64}
                    value={pxVal}
                    onChange={(e) => {
                      const raw = e.target.value;
                      const px = raw === '' ? 0 : parseInt(raw, 10) || 0;
                      const py = typeof selectedToken.value === 'object' ? (selectedToken.value?.py ?? 8) : 8;
                      const newVal = { px, py };
                      setSelectedToken({ ...selectedToken, value: newVal });
                      updateToken(`foundations.spacing.${key}`, newVal);
                    }}
                    className="w-9 text-right font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-transparent outline-none text-xs"
                  />
                  <span className="text-[10px] text-slate-400 font-mono pl-0.5">px</span>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={64}
                value={pxVal}
                onChange={(e) => {
                  const px = parseInt(e.target.value, 10) || 0;
                  const py = typeof selectedToken.value === 'object' ? (selectedToken.value?.py ?? 8) : 8;
                  const newVal = { px, py };
                  setSelectedToken({ ...selectedToken, value: newVal });
                  updateToken(`foundations.spacing.${key}`, newVal);
                }}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* Padding Y */}
            <div className="space-y-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  {t((d) => d.studio.spacingTokens.inspector.paddingY)}
                </label>
                <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-1.5 py-0.5">
                  <input
                    type="number"
                    min={0}
                    max={48}
                    value={pyVal}
                    onChange={(e) => {
                      const raw = e.target.value;
                      const py = raw === '' ? 0 : parseInt(raw, 10) || 0;
                      const px = typeof selectedToken.value === 'object' ? (selectedToken.value?.px ?? 16) : 16;
                      const newVal = { px, py };
                      setSelectedToken({ ...selectedToken, value: newVal });
                      updateToken(`foundations.spacing.${key}`, newVal);
                    }}
                    className="w-9 text-right font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-transparent outline-none text-xs"
                  />
                  <span className="text-[10px] text-slate-400 font-mono pl-0.5">px</span>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={48}
                value={pyVal}
                onChange={(e) => {
                  const py = parseInt(e.target.value, 10) || 0;
                  const px = typeof selectedToken.value === 'object' ? (selectedToken.value?.px ?? 16) : 16;
                  const newVal = { px, py };
                  setSelectedToken({ ...selectedToken, value: newVal });
                  updateToken(`foundations.spacing.${key}`, newVal);
                }}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          {/* Computed Height Info */}
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-400">{t((d) => d.studio.spacingTokens.inspector.computedHeight)}</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              {(pyVal * 2) + 20 + 2}px
            </span>
          </div>
        </div>
      )}

      {/* CASE 2: Responsive Dual Sizing (Section Gap, Container Padding) */}
      {kind === 'responsive' && (
        <div className="space-y-3">
          {/* Mobile (M) */}
          <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                <span>Mobile (M)</span>
              </div>
              <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-1.5 py-0.5">
                <input
                  type="number"
                  min={0}
                  max={96}
                  value={mobileVal}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const mobile = raw === '' ? 0 : parseInt(raw, 10) || 0;
                    const newVal = { mobile, desktop: desktopVal };
                    setSelectedToken({ ...selectedToken, value: newVal });
                    const subProp = key === 'layout.sectionGap' ? 'sectionGapMobile' : 'containerPaddingMobile';
                    updateToken(`foundations.spacing.layout.${subProp}`, mobile);
                  }}
                  className="w-10 text-right font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-transparent outline-none text-xs"
                />
                <span className="text-[10px] text-slate-400 font-mono pl-0.5">px</span>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={96}
              step={4}
              value={mobileVal}
              onChange={(e) => {
                const mobile = parseInt(e.target.value, 10) || 0;
                const newVal = { mobile, desktop: desktopVal };
                setSelectedToken({ ...selectedToken, value: newVal });
                const subProp = key === 'layout.sectionGap' ? 'sectionGapMobile' : 'containerPaddingMobile';
                updateToken(`foundations.spacing.layout.${subProp}`, mobile);
              }}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Desktop (D) */}
          <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                <Monitor className="w-3.5 h-3.5 text-blue-500" />
                <span>Desktop (D)</span>
              </div>
              <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-1.5 py-0.5">
                <input
                  type="number"
                  min={0}
                  max={128}
                  value={desktopVal}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const desktop = raw === '' ? 0 : parseInt(raw, 10) || 0;
                    const newVal = { mobile: mobileVal, desktop };
                    setSelectedToken({ ...selectedToken, value: newVal });
                    const subProp = key === 'layout.sectionGap' ? 'sectionGapDesktop' : 'containerPaddingDesktop';
                    updateToken(`foundations.spacing.layout.${subProp}`, desktop);
                  }}
                  className="w-10 text-right font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-transparent outline-none text-xs"
                />
                <span className="text-[10px] text-slate-400 font-mono pl-0.5">px</span>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={128}
              step={4}
              value={desktopVal}
              onChange={(e) => {
                const desktop = parseInt(e.target.value, 10) || 0;
                const newVal = { mobile: mobileVal, desktop };
                setSelectedToken({ ...selectedToken, value: newVal });
                const subProp = key === 'layout.sectionGap' ? 'sectionGapDesktop' : 'containerPaddingDesktop';
                updateToken(`foundations.spacing.layout.${subProp}`, desktop);
              }}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>
      )}

      {/* CASE 3: 1D Scalar (Card, Modal, Gaps) */}
      {kind !== 'padding2d' && kind !== 'responsive' && (
        <div className="space-y-3">
          <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                {selectedToken.name}
              </label>
              <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-1.5 py-0.5">
                <input
                  type="number"
                  min={0}
                  max={120}
                  value={typeof selectedToken.value === 'number' ? selectedToken.value : 0}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const val = raw === '' ? 0 : parseInt(raw, 10) || 0;
                    setSelectedToken({ ...selectedToken, value: val });
                    updateToken(`foundations.spacing.${key}`, val);
                  }}
                  className="w-10 text-right font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-transparent outline-none text-xs"
                />
                <span className="text-[10px] text-slate-400 font-mono pl-0.5">px</span>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={120}
              step={2}
              value={typeof selectedToken.value === 'number' ? selectedToken.value : 0}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10) || 0;
                setSelectedToken({ ...selectedToken, value: val });
                updateToken(`foundations.spacing.${key}`, val);
              }}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>
      )}
    </div>
  );
};
