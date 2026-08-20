import React from 'react';
import { useDesignStore, SelectedToken } from '@/entities/design-token';
import { PanelSection, TokenBadge, TokenSelectCard, PanelCallout } from '@/shared/ui';
import { Layout, Layers, Workflow, CheckCircle2 } from 'lucide-react';

export const PatternsPanel: React.FC = () => {
  const { tokens, selectedToken, setSelectedToken } = useDesignStore();
  const { patterns, project } = tokens;

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* 1. PAGE TEMPLATES */}
      <PanelSection title="1. MẪU BỐ CỤC TRANG (PAGE TEMPLATES)">
        <div className="space-y-2">
          {patterns.pageTemplates.map((p) => (
            <TokenSelectCard
              key={p.name}
              label={p.name}
              description={p.description}
              isSelected={selectedToken.key === `patterns.pageTemplates.${p.name}`}
              icon={<Layout className="w-4 h-4 text-indigo-500 shrink-0" />}
              previewSlot={<TokenBadge variant="primary" size="sm">Template</TokenBadge>}
              onSelect={() =>
                handleSelectToken({
                  type: 'pattern',
                  category: 'patterns',
                  key: `patterns.pageTemplates.${p.name}`,
                  path: `patterns.pageTemplates`,
                  name: p.name,
                  value: p.sections.join(', '),
                  cssVar: `${project.prefix}template-${p.name.toLowerCase().replace(/\s+/g, '-')}`,
                  description: p.description,
                  impactComponents: p.sections,
                })
              }
            />
          ))}
        </div>
      </PanelSection>

      {/* 2. CORE SECTIONS */}
      <PanelSection title="2. KHỐI NỘI DUNG (SECTIONS)">
        <div className="space-y-2">
          {patterns.sections.map((sec) => (
            <TokenSelectCard
              key={sec.name}
              label={sec.name}
              description={sec.purpose}
              isSelected={selectedToken.key === `patterns.sections.${sec.name}`}
              icon={<Layers className="w-4 h-4 text-emerald-500 shrink-0" />}
              previewSlot={<TokenBadge size="sm">Section</TokenBadge>}
              onSelect={() =>
                handleSelectToken({
                  type: 'pattern',
                  category: 'patterns',
                  key: `patterns.sections.${sec.name}`,
                  path: `patterns.sections`,
                  name: sec.name,
                  value: sec.components.join(', '),
                  cssVar: `${project.prefix}section-${sec.name.toLowerCase().replace(/\s+/g, '-')}`,
                  description: sec.purpose,
                  impactComponents: sec.components,
                })
              }
            />
          ))}
        </div>
      </PanelSection>

      {/* 3. USE CASES */}
      <PanelSection title="3. LUỒNG THAO TÁC (USE CASES)">
        <div className="space-y-2">
          {patterns.useCases.map((uc) => (
            <TokenSelectCard
              key={uc.name}
              label={uc.name}
              description={uc.flowSteps.join(' ➔ ')}
              isSelected={selectedToken.key === `patterns.useCases.${uc.name}`}
              icon={<Workflow className="w-4 h-4 text-orange-500 shrink-0" />}
              previewSlot={<TokenBadge size="sm">Flow</TokenBadge>}
              onSelect={() =>
                handleSelectToken({
                  type: 'pattern',
                  category: 'patterns',
                  key: `patterns.useCases.${uc.name}`,
                  path: `patterns.useCases`,
                  name: uc.name,
                  value: uc.flowSteps.join(' ➔ '),
                  cssVar: `${project.prefix}flow-${uc.name.toLowerCase().replace(/\s+/g, '-')}`,
                  description: `Flow architecture mapping: ${uc.flowSteps.join(' ➔ ')}`,
                  impactComponents: uc.flowSteps,
                })
              }
            />
          ))}
        </div>
      </PanelSection>

      {/* Contextual Description Callout */}
      <PanelCallout
        title="Quy Chuẩn Mẫu Bố Cục & Luồng Thao Tác"
        description={`Mẫu bố cục và khối nội dung (Patterns):
• Cung cấp các cấu trúc trang SaaS, E-Commerce, Báo cáo hoàn chỉnh.
• Mỗi khối Section tự động kế thừa khoảng cách section-gap và container-padding của hệ thống.`}
      />
    </div>
  );
};
