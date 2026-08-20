import React, { useState } from 'react';
import { useDesignStore } from '@/entities/design-token';
import { PanelSection } from '@/shared/ui';
import { FileCode2, Copy, Download, Check, UploadCloud } from 'lucide-react';

export const SystemXmlPanel: React.FC = () => {
  const { tokens } = useDesignStore();
  const [copied, setCopied] = useState(false);

  const xmlPreview = `<?xml version="1.0" encoding="UTF-8"?>
<design_system name="${tokens.project.name}" prefix="${tokens.project.prefix}" version="1.0.0">
  <metadata>
    <version>${tokens.project.version}</version>
    <author>${tokens.project.author}</author>
    <spec_format>RAKU-RFC-2119-MASTER</spec_format>
  </metadata>
  <foundations>
    <colors primary="${tokens.foundations.colors.brand.primary}" secondary="${tokens.foundations.colors.brand.secondary}" />
    <typography heading="${tokens.foundations.typography.fontHeading}" body="${tokens.foundations.typography.fontBody}" />
    <spacing base="${tokens.foundations.spacing.base}px" />
    <radius base="${tokens.foundations.radius.base}px" concentric="${tokens.foundations.radius.concentricFormulaEnabled}" />
  </foundations>
</design_system>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlPreview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([xmlPreview], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `raku-master-spec-${tokens.project.name.toLowerCase().replace(/\s+/g, '-')}.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleCopy}
          className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Đã sao chép' : 'Sao chép XML'}</span>
        </button>
        <button
          onClick={handleDownload}
          className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Tải File .XML</span>
        </button>
      </div>

      {/* XML Code Preview */}
      <PanelSection title="ĐOẠN MÃ ĐẶC TẢ MASTER XML">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto max-h-[300px] select-text">
          <pre className="font-mono text-[11px] text-amber-400 leading-relaxed">
            {xmlPreview}
          </pre>
        </div>
      </PanelSection>

      {/* Contextual Description Callout */}
      <div className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5 bg-transparent mt-4">
        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          Đặc Tả Master XML & Xuất Bản Đa Nền Tảng
        </div>
        <p className="text-xs font-normal text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
          Bản đặc tả Master XML có khả năng miễn nhiễm 100% trước Prompt Injection, cung cấp cấu trúc ngữ cảnh chặt chẽ cho LLMs tự động sinh mã nguồn React, Tailwind CSS và mobile native.
        </p>
      </div>
    </div>
  );
};
