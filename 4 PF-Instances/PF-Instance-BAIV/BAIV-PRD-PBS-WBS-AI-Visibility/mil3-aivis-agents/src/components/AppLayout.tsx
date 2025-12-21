import { ReactNode } from 'react';
import { LeftNavigation } from './LeftNavigation';
import { Toaster } from './ui/sonner';
import { AICoach } from './AICoach';

interface AppLayoutProps {
  userName: string;
  currentPage: string;
  onNavigate: (page: any) => void;
  children: ReactNode;
  showAICoach?: boolean;
  jwtToken?: string;
  tenantId?: string;
  onLogout?: () => void;
}

export function AppLayout({ userName, currentPage, onNavigate, children, showAICoach = true, jwtToken = '', tenantId = '', onLogout }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Left Sidebar Navigation */}
      <LeftNavigation 
        userName={userName} 
        currentPage={currentPage} 
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          {children}
        </div>
      </div>
      
      {/* AI Coach Widget */}
      {showAICoach && jwtToken && tenantId && (
        <AICoach jwtToken={jwtToken} tenantId={tenantId} />
      )}
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}