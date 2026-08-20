import React, { useState, useEffect } from 'react';
import { Topbar } from '@/widgets/studio-topbar';
import { MasterRail } from '@/widgets/master-rail';
import { SubConfigDrawer } from '@/widgets/sub-config-drawer';
import { LiveCanvas } from '@/widgets/live-canvas';
import { DeepInspectorDrawer } from '@/widgets/deep-inspector-drawer';
import { XmlExportModal } from '@/features/export-xml-spec';
import { AiGenerateModal } from '@/features/generate-ai-theme';
import { SettingsModal } from '@/features/manage-settings';
import { AuthModal } from '@/features/auth-by-email';
import { useDesignStore } from '@/entities/design-token';
import { useProjectStore } from '@/entities/project';
import { OptionSettingsPage } from '@/pages/option-settings';

export const StudioPage: React.FC = () => {
  const [isXmlModalOpen, setIsXmlModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { activeCategory, injectCssTokens } = useDesignStore();
  const { fetchProjects } = useProjectStore();

  useEffect(() => {
    injectCssTokens();
    fetchProjects().catch(() => {});
  }, [injectCssTokens, fetchProjects]);

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-100 dark:bg-slate-950 overflow-hidden font-sans text-slate-900 dark:text-slate-100 antialiased">
      {/* 1. TOPBAR */}
      <Topbar
        onOpenXmlExport={() => setIsXmlModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* 2. 4-PANE STUDIO LAYOUT OR STANDALONE OPTION SETTINGS PAGE */}
      <main className="flex-1 flex overflow-hidden relative z-0">
        {/* PANE 1: MASTER RAIL */}
        <MasterRail onOpenXmlExport={() => setIsXmlModalOpen(true)} />

        {activeCategory === 'option_settings' ? (
          /* OPTION SETTINGS PAGE (TRANG TRỐNG, KHÔNG HIỂN THỊ UI DEMO) */
          <OptionSettingsPage />
        ) : (
          <>
            {/* PANE 2: SUB-CONFIG DRAWER */}
            <SubConfigDrawer />

            {/* PANE 3: LIVE STRESS-TEST CANVAS */}
            <LiveCanvas
              onOpenXmlExport={() => setIsXmlModalOpen(true)}
              onOpenAiModal={() => setIsAiModalOpen(true)}
            />

            {/* PANE 4: DEEP TOKEN INSPECTOR */}
            <DeepInspectorDrawer />
          </>
        )}
      </main>

      {/* MODALS */}
      <XmlExportModal isOpen={isXmlModalOpen} onClose={() => setIsXmlModalOpen(false)} />
      <AiGenerateModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />
      <SettingsModal />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};
