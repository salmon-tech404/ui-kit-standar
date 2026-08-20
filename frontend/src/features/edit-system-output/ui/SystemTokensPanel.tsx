import React, { useState } from 'react';
import { useDesignStore } from '@/entities/design-token';
import { PanelSection } from '@/shared/ui';
import { Code, Copy, Download, Check, Search } from 'lucide-react';

export const SystemTokensPanel: React.FC = () => {
  const { tokens } = useDesignStore();
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const jsonString = JSON.stringify(tokens, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `raku-tokens-${tokens.project.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Search & Actions Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm token key..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
          />
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 px-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-bold flex items-center gap-1 transition cursor-pointer"
          title="Sao chép toàn bộ JSON"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Đã chép' : 'Copy'}</span>
        </button>
        <button
          onClick={handleDownload}
          className="p-1.5 px-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold flex items-center gap-1 transition cursor-pointer"
          title="Tải xuống file JSON"
        >
          <Download className="w-3.5 h-3.5" />
          <span>JSON</span>
        </button>
      </div>

      {/* JSON Viewer */}
      <PanelSection title="1. CÂY CẤU TRÚC JSON DESIGN TOKENS">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto max-h-[360px] select-text">
          <pre className="font-mono text-[11px] text-emerald-400 leading-relaxed">
            {jsonString}
          </pre>
        </div>
      </PanelSection>

      {/* Contextual Description Callout */}
      <div className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5 bg-transparent mt-4">
        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          Quy Chuẩn W3C Design Tokens JSON
        </div>
        <p className="text-xs font-normal text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
          Toàn bộ token của hệ thống tuân thủ đặc tả định dạng W3C Design Tokens Community Group (DTCG). Dễ dàng tích hợp với Style Dictionary, Figma Tokens Studio và các công cụ CI/CD tự động.
        </p>
      </div>
    </div>
  );
};
