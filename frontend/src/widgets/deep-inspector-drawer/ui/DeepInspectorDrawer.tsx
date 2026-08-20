import React, { useState } from 'react';
import {
  Sliders,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  X,
} from 'lucide-react';
import { useDesignStore } from '@/entities/design-token';
import { ColorInspector } from '@/features/edit-colors';
import { TypographyInspector } from '@/features/edit-typography';
import { SpacingInspector } from '@/features/edit-spacing';
import { GenericInspector } from '@/features/edit-foundations';
import { TokenBadge } from '@/shared/ui';

export const DeepInspectorDrawer: React.FC = () => {
  const { selectedToken, isInspectorOpen, toggleInspector } = useDesignStore();
  const [activeTab, setActiveTab] = useState<'properties' | 'guidelines' | 'xml'>('properties');
  const [copied, setCopied] = useState(false);

  if (!isInspectorOpen || !selectedToken) return null;

  const handleCopyVar = () => {
    navigator.clipboard.writeText(`var(${selectedToken.cssVar})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderGuidelinesView = () => {
    const doRules = selectedToken.guidelines?.do || [
      'Use this token consistently across all layout components.',
      'Maintain visual optical alignment and WCAG contrast.',
    ];
    const dontRules = selectedToken.guidelines?.dont || [
      'Do not override with arbitrary inline styles.',
      'Do not combine with conflicting background colors.',
    ];

    return (
      <div className="space-y-4 text-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>DO (Recommended Usage)</span>
          </div>
          <div className="space-y-1.5">
            {doRules.map((rule, idx) => (
              <div key={idx} className="p-2.5 bg-emerald-50/60 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                {rule}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 font-bold text-red-600 dark:text-red-400">
            <XCircle className="w-4 h-4" />
            <span>DON'T (Strict Constraints)</span>
          </div>
          <div className="space-y-1.5">
            {dontRules.map((rule, idx) => (
              <div key={idx} className="p-2.5 bg-red-50/60 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                {rule}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderXmlView = () => {
    const snippet = `<token type="${selectedToken.type}" name="${selectedToken.key}" css_var="${selectedToken.cssVar}">
  <value>${typeof selectedToken.value === 'object' ? JSON.stringify(selectedToken.value) : selectedToken.value}</value>
  <description>${selectedToken.description}</description>
</token>`;

    return (
      <div className="space-y-3 text-xs">
        <div className="text-[11px] font-bold text-slate-400 uppercase">Master XML Fragment</div>
        <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed select-text">
          {snippet}
        </pre>
        <button
          onClick={() => {
            navigator.clipboard.writeText(snippet);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-lg font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied Fragment!' : 'Copy XML Fragment'}</span>
        </button>
      </div>
    );
  };

  return (
    <aside className="w-[320px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col shrink-0 h-full overflow-y-auto overflow-x-hidden transition-all duration-300 animate-in slide-in-from-right-4 z-20 shadow-xl">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-orange-500" />
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white font-heading">Token Properties</h2>
        </div>
        <button
          onClick={toggleInspector}
          className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded transition cursor-pointer"
          title="Close Inspector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="px-4 border-b border-slate-200 dark:border-slate-800 flex gap-4 text-xs font-medium">
        {[
          { key: 'properties', label: 'Properties' },
          { key: 'guidelines', label: "DO / DON'T" },
          { key: 'xml', label: 'XML Fragment' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`py-2.5 border-b-2 transition cursor-pointer ${
              activeTab === tab.key
                ? 'border-orange-500 text-orange-600 dark:text-orange-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4 space-y-5">
        {/* Token Title Card */}
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{selectedToken.type} TOKEN</div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white">{selectedToken.name}</div>
          </div>
          <TokenBadge variant="primary" size="sm">
            {selectedToken.category}
          </TokenBadge>
        </div>

        {/* Tab 1: Properties */}
        {activeTab === 'properties' && (
          <>
            {selectedToken.type === 'color' && <ColorInspector />}
            {selectedToken.type === 'typography' && <TypographyInspector />}
            {selectedToken.type === 'spacing' && <SpacingInspector />}
            {selectedToken.type !== 'color' && selectedToken.type !== 'typography' && selectedToken.type !== 'spacing' && (
              <GenericInspector />
            )}

            {/* CSS Variable */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">CSS Variable</div>
              <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-orange-600 dark:text-orange-400">
                <span className="truncate max-w-[200px]">{selectedToken.cssVar}</span>
                <button onClick={handleCopyVar} className="p-1 hover:text-slate-900 dark:hover:text-white transition cursor-pointer">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Impact Tracing */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Impact Tracing ({selectedToken.impactComponents?.length || 4} Components)
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(selectedToken.impactComponents || ['Button', 'Card', 'Input', 'Modal']).map((comp) => (
                  <span
                    key={comp}
                    className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-[11px] font-medium border border-slate-200 dark:border-slate-700"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Tab 2: Guidelines */}
        {activeTab === 'guidelines' && renderGuidelinesView()}

        {/* Tab 3: XML Fragment */}
        {activeTab === 'xml' && renderXmlView()}
      </div>
    </aside>
  );
};
