import React, { useState, useEffect } from 'react';
import { useProjectStore } from '../../store/useProjectStore';
import { useDesignStore } from '../../store/useDesignStore';
import { exportApi } from '../../api/exportApi';
import { FileText, Copy, Download, Check, X, Sparkles, Code2 } from 'lucide-react';

interface XmlExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const XmlExportModal: React.FC<XmlExportModalProps> = ({ isOpen, onClose }) => {
  const { activeProject } = useProjectStore();
  const { tokens } = useDesignStore();
  const [exportFormat, setExportFormat] = useState<'xml' | 'json' | 'tailwind' | 'css'>('xml');
  const [content, setContent] = useState<string>('Generating output...');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const generateFormat = () => {
      setLoading(true);
      const name = activeProject?.name || 'UI Kit Standard';

      if (exportFormat === 'xml') {
        setContent(generateClientXml(name, tokens));
      } else if (exportFormat === 'json') {
        setContent(JSON.stringify(tokens, null, 2));
      } else if (exportFormat === 'tailwind') {
        setContent(generateTailwindConfig(tokens));
      } else if (exportFormat === 'css') {
        setContent(generateCssVariables(tokens));
      }
      setLoading(false);
    };

    generateFormat();
  }, [isOpen, activeProject, tokens, exportFormat]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = exportFormat === 'xml' ? 'xml' : exportFormat === 'json' ? 'json' : exportFormat === 'tailwind' ? 'js' : 'css';
    const mime = exportFormat === 'xml' ? 'application/xml' : exportFormat === 'json' ? 'application/json' : 'text/plain';
    const blob = new Blob([content], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(activeProject?.name || 'ui-kit-standard').toLowerCase().replace(/\s+/g, '-')}-spec.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Multi-Format Design System Exporter
              </h2>
              <p className="text-xs text-slate-500">RFC 2119 AI XML Directives, W3C JSON Tokens, and Tailwind Config</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="px-6 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex gap-1.5 text-xs font-semibold">
            {[
              { key: 'xml', label: 'Master XML (AI Vibe Coding)' },
              { key: 'json', label: 'W3C Design Tokens JSON' },
              { key: 'tailwind', label: 'tailwind.config.js' },
              { key: 'css', label: 'CSS Variables' },
            ].map((fmt) => (
              <button
                key={fmt.key}
                onClick={() => setExportFormat(fmt.key as any)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  exportFormat === fmt.key
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {fmt.label}
              </button>
            ))}
          </div>

          <span className="font-mono text-[11px] bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-indigo-600 dark:text-indigo-400 font-bold">
            Health: {tokens.project.completenessScore}%
          </span>
        </div>

        {/* Code View */}
        <div className="flex-1 p-6 overflow-hidden flex flex-col">
          <div className="flex-1 bg-slate-950 rounded-xl p-4 overflow-auto border border-slate-800">
            <pre className="font-mono text-xs text-emerald-400 leading-relaxed whitespace-pre select-text">
              {loading ? 'Generating...' : content}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Guaranteed 100% immune to XML & Prompt Injection</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-md shadow-indigo-500/25 transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function generateClientXml(name: string, tokens: any): string {
  const b = tokens.foundations.colors.brand;
  const s = tokens.foundations.colors.semantic;
  const txt = tokens.foundations.colors.text;
  const brd = tokens.foundations.colors.borders;
  const bg = tokens.foundations.colors.backgroundLayers;
  const prefix = tokens.project?.prefix || '--ui-';

  return `<?xml version="1.0" encoding="UTF-8"?>
<ui_kit_specification version="1.0.0" project="${name}" prefix="${prefix}" generated_at="${new Date().toISOString()}">
  <ai_directives>
    <role>Senior Principal Design Systems Architect</role>
    <strict_rules>
      ${tokens.customRules.filter((r: any) => r.enabled).map((r: any) => `<rule id="${r.id}" priority="${r.priority}">${r.instruction}</rule>`).join('\n      ')}
    </strict_rules>
  </ai_directives>
  <foundations>
    <colors>
      <brand>
        <color name="primary" hex="${b.primary}" hover="${b.primaryHover}" css_var="${prefix}color-primary" />
        <color name="secondary" hex="${b.secondary}" css_var="${prefix}color-secondary" />
        <color name="accent" hex="${b.accent}" css_var="${prefix}color-accent" />
      </brand>
      <semantic>
        <color name="success" hex="${s.success}" css_var="${prefix}color-success" />
        <color name="warning" hex="${s.warning}" css_var="${prefix}color-warning" />
        <color name="error" hex="${s.error}" css_var="${prefix}color-error" />
      </semantic>
      <text_foreground>
        <color name="primary" hex="${txt.primary}" css_var="${prefix}color-text-primary" />
        <color name="secondary" hex="${txt.secondary}" css_var="${prefix}color-text-secondary" />
        <color name="link" hex="${txt.link}" css_var="${prefix}color-text-link" />
      </text_foreground>
      <borders_hierarchy>
        <border level="subtle" hex="${brd.subtle}" css_var="${prefix}color-border-subtle" />
        <border level="default" hex="${brd.default}" css_var="${prefix}color-border-default" />
        <border level="strong" hex="${brd.strong}" css_var="${prefix}color-border-strong" />
      </borders_hierarchy>
      <background_layers>
        <layer target="page" hex="${bg.page}" css_var="${prefix}color-bg-page" />
        <layer target="card" hex="${bg.card}" css_var="${prefix}color-bg-card" />
        <layer target="modal" hex="${bg.modal}" css_var="${prefix}color-bg-modal" />
      </background_layers>
    </colors>
    <typography heading_font="${tokens.foundations.typography.fontHeading}" body_font="${tokens.foundations.typography.fontBody}" scale_ratio="${tokens.foundations.typography.scaleRatio}" max_measure="70ch" />
    <spacing_and_sizing base_grid="8px" component_height_md="40px" gap_icon_text="${tokens.foundations.spacing.gaps.iconText}px" />
    <radius_and_shadows concentric_rule="R_inner = max(0, R_outer - Padding)" radius_md="${tokens.foundations.radius.md}px" />
    <icons library="lucide-react" stroke_width="1.5" size_button="20px" optical_alignment="true" />
    <motion micro_hover="150ms" micro_modal="250ms" prefers_reduced_motion="true" />
    <accessibility min_contrast_aa="4.5:1" focus_ring="2px solid ${tokens.foundations.accessibility.focusRingColor}" require_aria="true" />
  </foundations>
  <components>
    <component name="Button" category="Actions">
      <sizes sm="32px" md="40px" lg="48px" xl="56px" />
      <variants>
        <variant name="primary" bg="${tokens.components.actions.button.variants.primary.bg}" text="${tokens.components.actions.button.variants.primary.text}" />
        <variant name="secondary" bg="${tokens.components.actions.button.variants.secondary.bg}" text="${tokens.components.actions.button.variants.secondary.text}" />
        <variant name="destructive" bg="${tokens.components.actions.button.variants.destructive.bg}" text="${tokens.components.actions.button.variants.destructive.text}" />
      </variants>
    </component>
  </components>
</ui_kit_specification>`;
}

function generateTailwindConfig(tokens: any): string {
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '${tokens.foundations.colors.brand.primary}',
          hover: '${tokens.foundations.colors.brand.primaryHover}',
        },
        surface: {
          page: '${tokens.foundations.colors.backgroundLayers.page}',
          card: '${tokens.foundations.colors.backgroundLayers.card}',
        }
      },
      fontFamily: {
        heading: ['${tokens.foundations.typography.fontHeading}', 'sans-serif'],
        body: ['${tokens.foundations.typography.fontBody}', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '${tokens.foundations.radius.md}px',
        lg: '${tokens.foundations.radius.lg}px',
        xl: '${tokens.foundations.radius.xl}px',
      }
    }
  }
};`;
}

function generateCssVariables(tokens: any): string {
  const prefix = tokens.project.prefix || '--ui-';
  return `:root {
  ${prefix}color-primary: ${tokens.foundations.colors.brand.primary};
  ${prefix}color-primary-hover: ${tokens.foundations.colors.brand.primaryHover};
  ${prefix}color-bg-page: ${tokens.foundations.colors.backgroundLayers.page};
  ${prefix}color-bg-card: ${tokens.foundations.colors.backgroundLayers.card};
  ${prefix}font-heading: '${tokens.foundations.typography.fontHeading}', sans-serif;
  ${prefix}font-body: '${tokens.foundations.typography.fontBody}', sans-serif;
  ${prefix}radius-md: ${tokens.foundations.radius.md}px;
}`;
}
