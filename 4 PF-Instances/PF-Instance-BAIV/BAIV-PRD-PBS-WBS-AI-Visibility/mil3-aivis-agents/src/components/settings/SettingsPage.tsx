import { useState, useEffect } from 'react';
import { ProfileSettings } from './ProfileSettings';
import { CompanySettings } from './CompanySettings';
import { ICPSettings } from './ICPSettings';
import { IntegrationsSettings } from './IntegrationsSettings';
import { NotificationSettings } from './NotificationSettings';
import { TeamSettings } from './TeamSettings';
import { PlatformSettings } from './PlatformSettings';
import { User, Building2, Target, Sparkles, Plug, Settings, Users, CreditCard, Bell, Key, Shield } from 'lucide-react';

type SettingsTab = 
  | 'profile'
  | 'company'
  | 'icp'
  | 'ai-assistant'
  | 'integrations'
  | 'platform'
  | 'team'
  | 'billing'
  | 'notifications'
  | 'api'
  | 'privacy';

interface UserProfile {
  user_id: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  full_name: string;
  email: string;
}

interface SettingsPageProps {
  initialTab?: SettingsTab;
  tenantId?: string;
  jwtToken?: string;
}

export function SettingsPage({ initialTab = 'profile', tenantId, jwtToken }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();
  }, []);

  // Update active tab when initialTab prop changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const loadUserProfile = async () => {
    // In production, this would fetch from API
    // For now, using mock data
    setUserProfile({
      user_id: 'user-001',
      role: 'owner',
      full_name: 'Sarah Chen',
      email: 'sarah.chen@eccoai.com'
    });
    setLoading(false);
  };

  const hasAccess = (requiredRoles: string[]) => {
    if (!userProfile) return false;
    return requiredRoles.includes(userProfile.role);
  };

  const menuItems = [
    {
      id: 'profile' as SettingsTab,
      label: 'Profile',
      icon: User,
      access: ['owner', 'admin', 'member', 'viewer'],
      badge: null
    },
    {
      id: 'company' as SettingsTab,
      label: 'Company & Brand',
      icon: Building2,
      access: ['owner', 'admin'],
      badge: null
    },
    {
      id: 'icp' as SettingsTab,
      label: 'ICP Definition',
      icon: Target,
      access: ['owner', 'admin'],
      badge: null
    },
    {
      id: 'ai-assistant' as SettingsTab,
      label: 'AI Assistant',
      icon: Sparkles,
      access: ['owner', 'admin'],
      badge: 'NEW'
    },
    {
      id: 'integrations' as SettingsTab,
      label: 'Integrations',
      icon: Plug,
      access: ['owner', 'admin'],
      badge: null
    },
    {
      id: 'platform' as SettingsTab,
      label: 'Platform Config',
      icon: Settings,
      access: ['owner'],
      badge: null
    },
    {
      id: 'team' as SettingsTab,
      label: 'Team Members',
      icon: Users,
      access: ['owner', 'admin', 'member', 'viewer'],
      badge: null
    },
    {
      id: 'billing' as SettingsTab,
      label: 'Billing',
      icon: CreditCard,
      access: ['owner'],
      badge: null
    },
    {
      id: 'notifications' as SettingsTab,
      label: 'Notifications',
      icon: Bell,
      access: ['owner', 'admin', 'member', 'viewer'],
      badge: null
    },
    {
      id: 'api' as SettingsTab,
      label: 'API Access',
      icon: Key,
      access: ['owner', 'admin'],
      badge: null
    },
    {
      id: 'privacy' as SettingsTab,
      label: 'Privacy & Security',
      icon: Shield,
      access: ['owner', 'admin', 'member', 'viewer'],
      badge: null
    }
  ];

  const visibleMenuItems = menuItems.filter(item => 
    userProfile && hasAccess(item.access)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2990C6] mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: 'Open Sans' }}>Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto p-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px', color: '#000000' }}>
            Settings
          </h1>
          <p className="text-gray-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '15px' }}>
            Manage your account, team, and platform configuration
          </p>
        </div>

        {/* Settings Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Left Sidebar Navigation */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <nav className="space-y-1">
              {visibleMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-[#2990C6]' : 'text-gray-400'}`} />
                      <span style={{ fontFamily: 'Open Sans', fontWeight: isActive ? 600 : 400, fontSize: '15px' }}>
                        {item.label}
                      </span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 bg-[#2990C6] text-white rounded text-xs" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Content Area */}
          <div className="bg-white rounded-xl shadow-sm">
            {activeTab === 'profile' && <ProfileSettings userProfile={userProfile!} />}
            {activeTab === 'company' && <CompanySettings />}
            {activeTab === 'icp' && <ICPSettings />}
            {activeTab === 'integrations' && <IntegrationsSettings tenantId={tenantId} jwtToken={jwtToken} />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'team' && <TeamSettings userRole={userProfile!.role} />}
            {activeTab === 'platform' && <PlatformSettings />}
            
            {/* Placeholder for other tabs */}
            {!['profile', 'company', 'icp', 'integrations', 'notifications', 'team', 'platform'].includes(activeTab) && (
              <div className="p-8">
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🚧</div>
                  <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '24px', color: '#1a1a1a' }} className="mb-2">
                    Coming Soon
                  </h2>
                  <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
                    The {menuItems.find(item => item.id === activeTab)?.label} settings page is under development.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}