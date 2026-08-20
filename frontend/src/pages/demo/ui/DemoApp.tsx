import React, { useState, useRef, useEffect } from 'react';
import { DemoPageId, DemoUser } from '../types';
import { DemoNavbar } from '@/widgets/demo-navbar';
import { DemoFooter } from '@/widgets/demo-footer';
import { HomePage } from './pages/HomePage';
import { AuthPages } from './pages/AuthPages';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { BillingPage } from './pages/BillingPage';
import { ProfilePage } from './pages/ProfilePage';
import { ContentPages } from './pages/ContentPages';
import { BlogPage } from './pages/BlogPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { DashboardAppLayout } from './DashboardAppLayout';

interface DemoAppProps {
  initialPage?: DemoPageId;
}

export const DemoApp: React.FC<DemoAppProps> = ({ initialPage = 'home' }) => {
  const [currentPage, setCurrentPage] = useState<DemoPageId>(initialPage);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [user] = useState<DemoUser>({
    name: 'Elena Rostova',
    email: 'elena@enterprise.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    role: 'Principal Systems Architect',
    organization: 'Acme Enterprise',
    plan: 'Pro',
  });

  // Sync with window.location.hash for URL history
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#/demo/')) {
      const pageFromHash = hash.replace('#/demo/', '') as DemoPageId;
      if (pageFromHash) {
        setCurrentPage(pageFromHash);
      }
    }

    const handleHashChange = () => {
      const currentHash = window.location.hash;
      if (currentHash && currentHash.startsWith('#/demo/')) {
        const page = currentHash.replace('#/demo/', '') as DemoPageId;
        if (page) {
          setCurrentPage(page);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: DemoPageId) => {
    setCurrentPage(page);
    window.location.hash = `#/demo/${page}`;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    handleNavigate('home');
  };

  const isAppShellPage = ['dashboard', 'settings', 'billing', 'profile'].includes(currentPage);

  return (
    <div
      style={{
        fontFamily: 'var(--font-body)',
        backgroundColor: 'var(--ui-color-bg-page, #F8FAFC)',
        color: 'var(--ui-color-text-primary, #0F172A)',
      }}
      className="w-full h-full flex flex-col overflow-hidden font-sans transition-colors relative"
    >
      {/* 1. RAKU APPLICATION FIXED HEADER */}
      <div className="shrink-0 z-40">
        <DemoNavbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={handleLogout}
          onLogin={() => setIsAuthenticated(true)}
        />
      </div>

      {/* 2. INNER WEBSITE SCROLLABLE CONTAINER */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col scroll-smooth"
      >
        <main className="flex-1">
          {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}

          {['login', 'signup', 'forgot_password', 'reset_password'].includes(currentPage) && (
            <AuthPages
              view={currentPage as any}
              onNavigate={handleNavigate}
              onLoginSuccess={handleLoginSuccess}
            />
          )}

          {/* Persistent App Shell for internal management pages */}
          {isAppShellPage && (
            <DashboardAppLayout currentPage={currentPage} onNavigate={handleNavigate} user={user}>
              {currentPage === 'dashboard' && <DashboardPage onNavigate={handleNavigate} user={user} />}
              {currentPage === 'settings' && <SettingsPage onNavigate={handleNavigate} user={user} />}
              {currentPage === 'billing' && <BillingPage onNavigate={handleNavigate} user={user} />}
              {currentPage === 'profile' && <ProfilePage onNavigate={handleNavigate} user={user} />}
            </DashboardAppLayout>
          )}

          {currentPage === 'blog' && <BlogPage onNavigate={handleNavigate} />}

          {['features', 'pricing', 'about', 'contact'].includes(currentPage) && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <ContentPages onNavigate={handleNavigate} page={currentPage as any} />
            </div>
          )}

          {currentPage === '404' && <NotFoundPage onNavigate={handleNavigate} />}
        </main>

        {/* 3. MULTI-COLUMN ENTERPRISE FOOTER */}
        <DemoFooter onNavigate={handleNavigate} />
      </div>
    </div>
  );
};
