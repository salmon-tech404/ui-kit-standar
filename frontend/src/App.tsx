import React, { useEffect, useState } from 'react';
import { useAuthStore } from './store/useAuthStore';
import { useDesignStore } from './store/useDesignStore';
import { useProjectStore } from './store/useProjectStore';

import { Topbar } from './components/studio/Topbar';
import { MasterRail } from './components/studio/MasterRail';
import { SubConfigPanel } from './components/studio/SubConfigPanel';
import { LiveCanvas } from './components/studio/LiveCanvas';
import { DeepInspector } from './components/studio/DeepInspector';

import { AuthModal } from './components/auth/AuthModal';
import { ProjectDashboard } from './components/dashboard/ProjectDashboard';
import { XmlExportModal } from './components/modals/XmlExportModal';
import { AiGenerateModal } from './components/modals/AiGenerateModal';

export const App: React.FC = () => {
  const { checkAuth } = useAuthStore();
  const { injectCssTokens } = useDesignStore();
  const { fetchProjects } = useProjectStore();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isXmlExportOpen, setIsXmlExportOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  useEffect(() => {
    // 1. Initial CSS Tokens injection
    injectCssTokens();

    // 2. Check auth session via secure httpOnly cookie
    checkAuth();

    // 3. Fetch user projects
    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans">
      {/* 1. Global Studio Topbar */}
      <Topbar
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
      />

      {/* 2. Master 4-Pane Studio Layout */}
      <main className="flex flex-1 h-[calc(100vh-56px)] overflow-hidden relative">
        {/* Pane 1: Master Navigation Rail (250px) */}
        <MasterRail onOpenXmlExport={() => setIsXmlExportOpen(true)} />

        {/* Pane 2: Sub-Config Drawer (290px) */}
        <SubConfigPanel />

        {/* Pane 3: Center Main Live Canvas (Flexible) */}
        <LiveCanvas
          onOpenXmlExport={() => setIsXmlExportOpen(true)}
          onOpenAiModal={() => setIsAiModalOpen(true)}
        />

        {/* Pane 4: Right Deep Property Inspector (320px) */}
        <DeepInspector />
      </main>

      {/* Modals & Dialogs */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <ProjectDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        onOpenAuthModal={() => {
          setIsDashboardOpen(false);
          setIsAuthModalOpen(true);
        }}
      />
      <XmlExportModal isOpen={isXmlExportOpen} onClose={() => setIsXmlExportOpen(false)} />
      <AiGenerateModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onOpenAuthModal={() => {
          setIsAiModalOpen(false);
          setIsAuthModalOpen(true);
        }}
      />
    </div>
  );
};
