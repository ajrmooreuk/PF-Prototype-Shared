import { useState } from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Home, 
  Search, 
  TrendingUp, 
  Lightbulb, 
  Target, 
  Share2, 
  PenTool, 
  Users, 
  Mic, 
  ClipboardCheck, 
  Settings as SettingsIcon,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  LogOut
} from 'lucide-react';
import logoImage from 'figma:asset/b801bd4090f4eac107789031e2ec2d4ee861af08.png';
// import { useAuth } from './auth/AuthContext';

interface LeftNavigationProps {
  userName: string;
  currentPage?: string;
  onNavigate?: (page: any) => void;
  onLogout?: () => void;
}

export function LeftNavigation({ userName, currentPage = 'dashboard', onNavigate, onLogout }: LeftNavigationProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['content-studio', 'social-media', 'leads', 'podcast', 'ambassadors', 'pmf']);
  const [showUserMenu, setShowUserMenu] = useState(false);
  // const { signOut } = useAuth();

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isActive = (page: string) => currentPage === page;
  const isSectionActive = (pages: string[]) => pages.includes(currentPage || '');

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      page: 'dashboard'
    },
    {
      id: 'discovery-audit',
      label: 'Visibility Audit',
      icon: Search,
      page: 'discovery-audit',
      badge: 'Next: Nov 1'
    },
    {
      id: 'icp-discovery',
      label: 'ICP Discovery',
      icon: Users,
      page: 'icp-discovery'
    },
    {
      id: 'content-studio',
      label: 'Content Studio',
      icon: PenTool,
      expandable: true,
      children: [
        { label: 'Blog Creator', page: 'content-studio' },
        { label: 'FAQ Generator', page: 'faq-generator' },
        { label: 'Meta Generator', page: 'meta-generator' },
        { label: 'Schema Generator', page: 'schema-generator' },
        { label: 'Link Suggester', page: 'link-suggester' },
        { label: 'Image Generator', page: 'image-generator' }
      ]
    },
    {
      id: 'social-media',
      label: 'Social Media',
      icon: Share2,
      expandable: true,
      children: [
        { label: 'Post Creator', page: 'social-media' },
        { label: 'Content Discovery', page: 'social-listening' },
        { label: 'Publishing Calendar', page: 'publishing-calendar' },
        { label: 'Ideas Library', page: 'ideas-library' }
      ]
    },
    {
      id: 'leads',
      label: 'Leads',
      icon: Target,
      expandable: true,
      children: [
        { label: 'Dashboard', page: 'leads-dashboard' },
        { label: 'Campaigns', page: 'campaigns-list' },
        { label: 'New Campaign', page: 'new-campaign' }
      ]
    },
    {
      id: 'podcast',
      label: 'Podcast System',
      icon: Mic,
      expandable: true,
      children: [
        { label: 'Overview', page: 'podcast-overview' },
        { label: 'Campaigns', page: 'podcast-campaigns' },
        { label: 'Leads', page: 'podcast-leads' },
        { label: 'Outreach', page: 'podcast-outreach' },
        { label: 'Bookings', page: 'podcast-bookings' }
      ]
    },
    {
      id: 'ambassadors',
      label: 'Brand Ambassadors',
      icon: Users,
      expandable: true,
      children: [
        { label: 'Discovery', page: 'ambassador-discovery' },
        { label: 'Ambassador List', page: 'ambassador-list' },
        { label: 'Campaigns', page: 'ambassador-campaigns' },
        { label: 'Content Approval', page: 'content-approval' }
      ]
    },
    {
      id: 'pmf',
      label: 'PMF',
      icon: ClipboardCheck,
      badge: 'NEW',
      expandable: true,
      children: [
        { label: 'Overview', page: 'pmf-overview' },
        { label: 'Surveys', page: 'pmf-surveys' },
        { label: 'Interviews', page: 'pmf-interviews' }
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <div className="w-64 border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <img src={logoImage} alt="BAIV Logo" className="h-8" />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedSections.includes(item.id);
              const hasChildren = item.expandable && item.children;
              const childPages = item.children?.map(c => c.page) || [];
              const sectionActive = isSectionActive(childPages);

              return (
                <div key={item.id}>
                  {/* Main Menu Item */}
                  <button
                    onClick={() => {
                      if (hasChildren) {
                        toggleSection(item.id);
                      } else if (item.page) {
                        onNavigate?.(item.page);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive(item.page || '') || sectionActive
                        ? 'bg-teal-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 text-left text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        isActive(item.page || '') || sectionActive
                          ? 'bg-white/20 text-white'
                          : 'bg-blue-100 text-blue-700'
                      }`} style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                        {item.badge}
                      </span>
                    )}
                    {hasChildren && (
                      isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                    )}
                  </button>

                  {/* Submenu Items */}
                  {hasChildren && isExpanded && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children?.map((child) => (
                        <button
                          key={child.page}
                          onClick={() => onNavigate?.(child.page)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                            isActive(child.page)
                              ? 'bg-teal-50 text-teal-700'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          style={{ fontFamily: 'Open Sans', fontWeight: isActive(child.page) ? 600 : 400 }}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Settings at Bottom of Menu */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => onNavigate?.('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive('settings')
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <SettingsIcon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1 text-left text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
                Settings
              </span>
            </button>
          </div>
        </nav>

        {/* User Profile at Bottom */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10 bg-teal-600">
              <AvatarFallback className="text-white" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm truncate" style={{ fontFamily: 'Open Sans', fontWeight: 600, color: '#1a1a1a' }}>
                {userName}
              </div>
              <div className="text-xs text-gray-500" style={{ fontFamily: 'Open Sans' }}>
                Admin
              </div>
            </div>
          </div>
          
          {/* Logout Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-all"
              style={{ fontFamily: 'Open Sans', fontWeight: 500 }}
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}