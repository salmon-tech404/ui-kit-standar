import React from 'react';
import { useDesignStore, SelectedToken } from '@/entities/design-token';
import { PanelSection, TokenSliderControl, PanelCallout } from '@/shared/ui';
import { CreditCard, User } from 'lucide-react';

export const DataDisplayPanel: React.FC = () => {
  const { tokens, updateToken, selectedToken, setSelectedToken } = useDesignStore();
  const { dataDisplay } = tokens.components;
  const project = tokens.project;

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  const tableRows = [
    { key: 'rowHeightCompact', label: 'row-compact', val: dataDisplay.table.rowHeightCompact, min: 32, max: 48, desc: 'Mật độ dày cho bảng số liệu tài chính' },
    { key: 'rowHeightComfortable', label: 'row-comfortable', val: dataDisplay.table.rowHeightComfortable, min: 40, max: 64, desc: 'Mật độ tiêu chuẩn cho bảng quản trị' },
    { key: 'rowHeightSpacious', label: 'row-spacious', val: dataDisplay.table.rowHeightSpacious, min: 48, max: 80, desc: 'Mật độ thoáng rộng cho danh sách người dùng' },
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* 1. TABLE ROW HEIGHTS */}
      <PanelSection title="1. CHIỀU CAO HÀNG BẢNG DỮ LIỆU (TABLE)">
        <div className="space-y-2.5">
          {tableRows.map((row) => (
            <TokenSliderControl
              key={row.key}
              label={row.label}
              value={row.val}
              min={row.min}
              max={row.max}
              isSelected={selectedToken.key === `dataDisplay.table.${row.key}`}
              description={row.desc}
              onSelect={() =>
                handleSelectToken({
                  type: 'component',
                  category: 'dataDisplay',
                  key: `dataDisplay.table.${row.key}`,
                  path: `components.dataDisplay.table.${row.key}`,
                  name: row.label,
                  value: `${row.val}px`,
                  cssVar: `${project.prefix}table-${row.key.toLowerCase()}`,
                  description: `Row height density tier for data grid tables.`,
                  impactComponents: ['Data Table', 'List Rows', 'Logs Viewer'],
                })
              }
              onChange={(val) => updateToken(`components.dataDisplay.table.${row.key}`, val)}
            />
          ))}
        </div>
      </PanelSection>

      {/* 2. CARD & AVATAR SIZING */}
      <PanelSection title="2. KHUNG THẺ (CARD) & AVATAR">
        <div className="grid grid-cols-2 gap-2">
          <TokenSliderControl
            label="card-padding"
            value={dataDisplay.card.padding}
            min={12}
            max={36}
            icon={<CreditCard className="w-3.5 h-3.5 text-indigo-500 shrink-0" />}
            onChange={(val) => updateToken('components.dataDisplay.card.padding', val)}
          />

          <TokenSliderControl
            label="avatar-md"
            value={dataDisplay.avatar.sizeMd}
            min={24}
            max={56}
            icon={<User className="w-3.5 h-3.5 text-indigo-500 shrink-0" />}
            onChange={(val) => updateToken('components.dataDisplay.avatar.sizeMd', val)}
          />
        </div>
      </PanelSection>

      {/* Contextual Description Callout */}
      <PanelCallout
        title="Quy Chuẩn Hiển Thị Dữ Liệu"
        description={`Hệ thống cấu hình hiển thị dữ liệu (Data Display):
• 3 chế độ độ dày bảng (Compact, Comfortable, Spacious) tối ưu cho báo cáo tài chính và danh sách quản trị.
• Khung thẻ (Card) áp dụng khoảng đệm đồng đều giúp nội dung bên trong luôn cân đối.`}
      />
    </div>
  );
};
