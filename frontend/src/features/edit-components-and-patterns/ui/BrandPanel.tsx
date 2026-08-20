import React from 'react';
import { Upload, RotateCcw, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { useDesignStore, SelectedToken } from '@/entities/design-token';
import { PanelSection, FormInput, TokenSliderControl, TokenSelectCard, PanelCallout } from '@/shared/ui';

export const BrandPanel: React.FC = () => {
  const { tokens, updateToken, selectedToken, setSelectedToken } = useDesignStore();
  const { brandAssets, project } = tokens;

  const currentLogoUrl = brandAssets.logo.urlLight || '/icons/raku_FF4F00_logo_128.png';

  const handleSelectToken = (token: SelectedToken) => {
    setSelectedToken(token);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        updateToken('brandAssets.logo.urlLight', base64);
        updateToken('brandAssets.logo.urlDark', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetDefault = () => {
    updateToken('brandAssets.logo.urlLight', '/icons/raku_FF4F00_logo_128.png');
    updateToken('brandAssets.logo.urlDark', '/icons/raku_FF4F00_logo_128.png');
    try {
      localStorage.removeItem('raku_custom_logo');
    } catch (err) {}
  };

  const presetLogos = [
    { label: 'RAKU 128px (Default)', path: '/icons/raku_FF4F00_logo_128.png' },
    { label: 'RAKU 500px (HD)', path: '/icons/raku_FF4F00_logo_500.png' },
    { label: 'RAKU 48px', path: '/icons/raku_FF4F00_logo_48.png' },
    { label: 'RAKU 32px', path: '/icons/raku_FF4F00_logo_32.png' },
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* 1. ACTIVE LOGO PREVIEW */}
      <PanelSection title="1. BIỂU TRƯNG THƯƠNG HIỆU (LOGO PREVIEW)">
        <div
          onClick={() =>
            handleSelectToken({
              type: 'brand',
              category: 'brand',
              key: 'brandAssets.logo.urlLight',
              path: 'brandAssets.logo.urlLight',
              name: 'Brand Logo Asset',
              value: currentLogoUrl,
              cssVar: `${project.prefix}brand-logo`,
              description: 'Primary vector/raster brand logo displayed across navigation headers.',
              impactComponents: ['Navbar Logo', 'Auth Header', 'Footer'],
            })
          }
          className={`p-4 rounded-xl border transition cursor-pointer flex flex-col items-center justify-center gap-3 ${
            selectedToken.key === 'brandAssets.logo.urlLight'
              ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-semibold'
              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
          }`}
        >
          <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center overflow-hidden p-2">
            <img
              src={currentLogoUrl}
              alt="Brand Logo Preview"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/icons/raku_FF4F00_logo_128.png';
              }}
            />
          </div>
          <div className="text-center">
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Live Navbar & Studio Logo
            </div>
            <div className="text-[10px] text-slate-400 font-mono truncate max-w-[220px]">
              {currentLogoUrl.startsWith('data:') ? 'Custom Uploaded Image' : currentLogoUrl}
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleResetDefault();
            }}
            className="px-2.5 py-1 bg-white dark:bg-slate-700 hover:bg-slate-100 text-slate-600 dark:text-slate-300 rounded text-[11px] font-semibold border border-slate-200 dark:border-slate-600 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Default Logo</span>
          </button>
        </div>
      </PanelSection>

      {/* 2. UPLOAD & PRESETS */}
      <PanelSection title="2. TẢI LÊN & LOGO MẪU CÓ SẴN">
        <label className="p-3 bg-indigo-50/50 dark:bg-indigo-950/30 border-2 border-dashed border-indigo-300 dark:border-indigo-800 hover:border-indigo-500 rounded-xl flex flex-col items-center justify-center gap-1.5 cursor-pointer transition">
          <Upload className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
            Upload Local Image File
          </span>
          <span className="text-[10px] text-slate-400">PNG, SVG, JPG, WebP</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>

        <div className="space-y-1.5 mt-2">
          {presetLogos.map((preset) => (
            <TokenSelectCard
              key={preset.path}
              label={preset.label}
              isSelected={currentLogoUrl === preset.path}
              icon={<img src={preset.path} alt={preset.label} className="w-4 h-4 object-contain shrink-0" />}
              previewSlot={currentLogoUrl === preset.path ? <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> : undefined}
              onSelect={() => {
                updateToken('brandAssets.logo.urlLight', preset.path);
                updateToken('brandAssets.logo.urlDark', preset.path);
                handleSelectToken({
                  type: 'brand',
                  category: 'brand',
                  key: `brandAssets.logo.preset.${preset.label}`,
                  path: 'brandAssets.logo.urlLight',
                  name: `Logo (${preset.label})`,
                  value: preset.path,
                  cssVar: `${project.prefix}brand-logo`,
                  description: `Preset logo asset: ${preset.label}`,
                  impactComponents: ['Navbar Logo', 'Footer'],
                });
              }}
            />
          ))}
        </div>
      </PanelSection>

      {/* 3. GEOMETRIC CONSTRAINTS */}
      <PanelSection title="3. RÀNG BUỘC KÍCH THƯỚC TOÁN HỌC">
        <div className="space-y-2.5">
          <TokenSliderControl
            label="logo-min-height"
            value={brandAssets.logo.minHeight}
            min={20}
            max={64}
            step={2}
            isSelected={selectedToken.key === 'brandAssets.logo.minHeight'}
            onSelect={() =>
              handleSelectToken({
                type: 'brand',
                category: 'brand',
                key: 'brandAssets.logo.minHeight',
                path: 'brandAssets.logo.minHeight',
                name: 'Logo Minimum Height',
                value: `${brandAssets.logo.minHeight}px`,
                cssVar: `${project.prefix}logo-min-height`,
                description: 'Minimum rendered height for brand logo vector container.',
                impactComponents: ['Navbar', 'Studio Header'],
              })
            }
            onChange={(val) => updateToken('brandAssets.logo.minHeight', val)}
          />

          <TokenSliderControl
            label="safe-zone-padding"
            value={brandAssets.logo.safeZonePadding}
            min={4}
            max={24}
            step={2}
            isSelected={selectedToken.key === 'brandAssets.logo.safeZonePadding'}
            onSelect={() =>
              handleSelectToken({
                type: 'brand',
                category: 'brand',
                key: 'brandAssets.logo.safeZonePadding',
                path: 'brandAssets.logo.safeZonePadding',
                name: 'Logo Safe Zone Padding',
                value: `${brandAssets.logo.safeZonePadding}px`,
                cssVar: `${project.prefix}logo-safe-padding`,
                description: 'Clear margin boundary surrounding brand logo.',
                impactComponents: ['Navbar Brand Container'],
              })
            }
            onChange={(val) => updateToken('brandAssets.logo.safeZonePadding', val)}
          />
        </div>
      </PanelSection>

      {/* Contextual Description Callout */}
      <PanelCallout
        title="Quy Chuẩn Nhận Diện Thương Hiệu"
        description={`Hệ thống nhận diện thương hiệu (Brand Assets):
• Logo tự động điều chỉnh theo kích thước tối thiểu (min-height: 24px) và vùng an toàn (safe-zone).
• Hỗ trợ tệp vector SVG và định dạng ảnh raster độ nét cao.`}
      />
    </div>
  );
};
