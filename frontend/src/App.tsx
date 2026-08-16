import React, { useState, useEffect } from 'react';
import { Topbar } from './components/studio/Topbar';
import { MasterRail } from './components/studio/MasterRail';
import { SubConfigPanel } from './components/studio/SubConfigPanel';
import { LiveCanvas } from './components/studio/LiveCanvas';
import { DeepInspector } from './components/studio/DeepInspector';
import { XmlExportModal } from './components/modals/XmlExportModal';
import { AiGenerateModal } from './components/modals/AiGenerateModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { AuthModal } from './components/auth/AuthModal';
import { useDesignStore } from './store/useDesignStore';
import { useProjectStore } from './store/useProjectStore';

export const App: React.FC = () => {
  const [isXmlModalOpen, setIsXmlModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { injectCssTokens } = useDesignStore();
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

      {/* 2. 4-PANE STUDIO LAYOUT */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* PANE 1: MASTER RAIL */}
        <MasterRail onOpenXmlExport={() => setIsXmlModalOpen(true)} />

        {/* PANE 2: SUB-CONFIG DRAWER */}
        <SubConfigPanel />

        {/* PANE 3: LIVE STRESS-TEST CANVAS */}
        <LiveCanvas
          onOpenXmlExport={() => setIsXmlModalOpen(true)}
          onOpenAiModal={() => setIsAiModalOpen(true)}
        />

        {/* PANE 4: DEEP TOKEN INSPECTOR */}
        <DeepInspector />
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

export default App;
