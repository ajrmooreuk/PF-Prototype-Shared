import { Avatar, AvatarFallback } from './ui/avatar';
import { Bell, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import logoImage from 'figma:asset/b801bd4090f4eac107789031e2ec2d4ee861af08.png';

interface NavigationProps {
  userName: string;
  currentPage?: 'dashboard' | 'discovery-audit' | 'content-studio' | 'faq-generator' | 'meta-generator' | 'schema-generator' | 'link-suggester' | 'image-generator' | 'social-media' | 'social-listening' | 'publishing-calendar' | 'ideas-library' | 'leads-dashboard' | 'campaigns-list' | 'campaign-results' | 'new-campaign' | 'podcast-overview' | 'podcast-campaigns' | 'podcast-leads' | 'podcast-outreach' | 'podcast-bookings' | 'ambassador-discovery' | 'ambassador-list' | 'ambassador-campaigns' | 'content-approval' | 'pmf-overview' | 'pmf-surveys' | 'pmf-create-survey' | 'pmf-interviews';
  onNavigate?: (page: 'dashboard' | 'discovery-audit' | 'content-studio' | 'faq-generator' | 'meta-generator' | 'schema-generator' | 'link-suggester' | 'image-generator' | 'social-media' | 'social-listening' | 'publishing-calendar' | 'ideas-library' | 'leads-dashboard' | 'campaigns-list' | 'campaign-results' | 'new-campaign' | 'podcast-overview' | 'podcast-campaigns' | 'podcast-leads' | 'podcast-outreach' | 'podcast-bookings' | 'ambassador-discovery' | 'ambassador-list' | 'ambassador-campaigns' | 'content-approval' | 'pmf-overview' | 'pmf-surveys' | 'pmf-create-survey' | 'pmf-interviews') => void;
}

export function Navigation({ userName, currentPage = 'dashboard', onNavigate }: NavigationProps) {
  const contentStudioItems = [
    { label: 'Blog Creator', page: 'content-studio' as const },
    { label: 'FAQ Generator', page: 'faq-generator' as const },
    { label: 'Meta Generator', page: 'meta-generator' as const },
    { label: 'Schema Generator', page: 'schema-generator' as const },
    { label: 'Link Suggester', page: 'link-suggester' as const },
    { label: 'Image Generator', page: 'image-generator' as const }
  ];

  const socialMediaItems = [
    { label: 'Post Creator', page: 'social-media' as const },
    { label: 'Content Discovery', page: 'social-listening' as const },
    { label: 'Publishing Calendar', page: 'publishing-calendar' as const },
    { label: 'Ideas Library', page: 'ideas-library' as const }
  ];

  const leadsItems = [
    { label: 'Dashboard', page: 'leads-dashboard' as const },
    { label: 'Campaigns', page: 'campaigns-list' as const },
    { label: 'Campaign Results', page: 'campaign-results' as const },
    { label: 'New Campaign', page: 'new-campaign' as const }
  ];

  const podcastItems = [
    { label: 'Overview', page: 'podcast-overview' as const },
    { label: 'Campaigns', page: 'podcast-campaigns' as const },
    { label: 'Leads', page: 'podcast-leads' as const },
    { label: 'Outreach', page: 'podcast-outreach' as const },
    { label: 'Bookings', page: 'podcast-bookings' as const }
  ];

  const ambassadorItems = [
    { label: 'Discovery', page: 'ambassador-discovery' as const },
    { label: 'List', page: 'ambassador-list' as const },
    { label: 'Campaigns', page: 'ambassador-campaigns' as const },
    { label: 'Content Approval', page: 'content-approval' as const }
  ];

  const pmfItems = [
    { label: 'Overview', page: 'pmf-overview' as const },
    { label: 'Surveys', page: 'pmf-surveys' as const },
    { label: 'Create Survey', page: 'pmf-create-survey' as const },
    { label: 'Interviews', page: 'pmf-interviews' as const }
  ];

  const navItems = [
    { label: 'Dashboard', page: 'dashboard' as const },
    { label: 'Discovery Audit', page: 'discovery-audit' as const },
    { label: 'Settings', page: 'settings' as const }
  ];

  const initials = userName.split(' ').map(n => n[0]).join('');

  const handleNavClick = (page: string) => {
    if (onNavigate && (page === 'dashboard' || page === 'discovery-audit' || page === 'content-studio' || page === 'faq-generator' || page === 'meta-generator' || page === 'schema-generator' || page === 'link-suggester' || page === 'image-generator' || page === 'social-media' || page === 'social-listening' || page === 'publishing-calendar' || page === 'ideas-library' || page === 'leads-dashboard' || page === 'campaigns-list' || page === 'campaign-results' || page === 'new-campaign' || page === 'podcast-overview' || page === 'podcast-campaigns' || page === 'podcast-leads' || page === 'podcast-outreach' || page === 'podcast-bookings' || page === 'ambassador-discovery' || page === 'ambassador-list' || page === 'ambassador-campaigns' || page === 'content-approval' || page === 'pmf-overview' || page === 'pmf-surveys' || page === 'pmf-create-survey' || page === 'pmf-interviews')) {
      onNavigate(page);
    }
  };

  const isContentStudioActive = currentPage === 'content-studio' || currentPage === 'faq-generator' || currentPage === 'meta-generator' || currentPage === 'schema-generator' || currentPage === 'link-suggester' || currentPage === 'image-generator';
  const isSocialMediaActive = currentPage === 'social-media' || currentPage === 'social-listening' || currentPage === 'publishing-calendar' || currentPage === 'ideas-library';
  const isLeadsActive = currentPage === 'leads-dashboard' || currentPage === 'campaigns-list' || currentPage === 'campaign-results' || currentPage === 'new-campaign';
  const isPodcastActive = currentPage === 'podcast-overview' || currentPage === 'podcast-campaigns' || currentPage === 'podcast-leads' || currentPage === 'podcast-outreach' || currentPage === 'podcast-bookings';
  const isAmbassadorActive = currentPage === 'ambassador-discovery' || currentPage === 'ambassador-list' || currentPage === 'ambassador-campaigns' || currentPage === 'content-approval';
  const isPMFActive = currentPage === 'pmf-overview' || currentPage === 'pmf-surveys' || currentPage === 'pmf-create-survey' || currentPage === 'pmf-interviews';

  return (
    <nav className="bg-white shadow-sm h-16 sticky top-0 z-40">
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('dashboard')}>
          <img src={logoImage} alt="BAIV Logo" className="h-12 w-12" />
        </div>

        {/* Navigation Menu */}
        <div className="hidden xl:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = item.page === currentPage;
            
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page)}
                className={`text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2990C6] focus:ring-offset-2 rounded px-3 py-1.5 ${
                  isActive 
                    ? 'bg-[#2990C6] text-white' 
                    : 'text-[#000000] hover:text-[#2990C6]'
                }`}
                style={{ fontFamily: 'Open Sans', fontWeight: isActive ? 600 : 400 }}
              >
                {item.label}
              </button>
            );
          })}

          {/* Content Studio Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2990C6] focus:ring-offset-2 rounded px-3 py-1.5 flex items-center gap-1 ${
                  isContentStudioActive 
                    ? 'bg-[#2990C6] text-white' 
                    : 'text-[#000000] hover:text-[#2990C6]'
                }`}
                style={{ fontFamily: 'Open Sans', fontWeight: isContentStudioActive ? 600 : 400 }}
              >
                Content Studio
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {contentStudioItems.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => handleNavClick(item.page)}
                  className="cursor-pointer"
                  style={{ fontFamily: 'Open Sans' }}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Social Media Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2990C6] focus:ring-offset-2 rounded px-3 py-1.5 flex items-center gap-1 ${
                  isSocialMediaActive 
                    ? 'bg-[#2990C6] text-white' 
                    : 'text-[#000000] hover:text-[#2990C6]'
                }`}
                style={{ fontFamily: 'Open Sans', fontWeight: isSocialMediaActive ? 600 : 400 }}
              >
                Social Media
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {socialMediaItems.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => handleNavClick(item.page)}
                  className="cursor-pointer"
                  style={{ fontFamily: 'Open Sans' }}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Leads Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2990C6] focus:ring-offset-2 rounded px-3 py-1.5 flex items-center gap-1 ${
                  isLeadsActive 
                    ? 'bg-[#2990C6] text-white' 
                    : 'text-[#000000] hover:text-[#2990C6]'
                }`}
                style={{ fontFamily: 'Open Sans', fontWeight: isLeadsActive ? 600 : 400 }}
              >
                Leads
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {leadsItems.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => handleNavClick(item.page)}
                  className="cursor-pointer"
                  style={{ fontFamily: 'Open Sans' }}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Podcasts Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2990C6] focus:ring-offset-2 rounded px-3 py-1.5 flex items-center gap-1 ${
                  isPodcastActive 
                    ? 'bg-[#2990C6] text-white' 
                    : 'text-[#000000] hover:text-[#2990C6]'
                }`}
                style={{ fontFamily: 'Open Sans', fontWeight: isPodcastActive ? 600 : 400 }}
              >
                Podcasts
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {podcastItems.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => handleNavClick(item.page)}
                  className="cursor-pointer"
                  style={{ fontFamily: 'Open Sans' }}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Brand Ambassadors Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2990C6] focus:ring-offset-2 rounded px-3 py-1.5 flex items-center gap-1 ${
                  isAmbassadorActive 
                    ? 'bg-[#2990C6] text-white' 
                    : 'text-[#000000] hover:text-[#2990C6]'
                }`}
                style={{ fontFamily: 'Open Sans', fontWeight: isAmbassadorActive ? 600 : 400 }}
              >
                Brand Ambassadors
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {ambassadorItems.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => handleNavClick(item.page)}
                  className="cursor-pointer"
                  style={{ fontFamily: 'Open Sans' }}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* PMF Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2990C6] focus:ring-offset-2 rounded px-3 py-1.5 flex items-center gap-1 ${
                  isPMFActive 
                    ? 'bg-[#2990C6] text-white' 
                    : 'text-[#000000] hover:text-[#2990C6]'
                }`}
                style={{ fontFamily: 'Open Sans', fontWeight: isPMFActive ? 600 : 400 }}
              >
                PMF
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {pmfItems.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => handleNavClick(item.page)}
                  className="cursor-pointer"
                  style={{ fontFamily: 'Open Sans' }}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Side - Notification Bell, User Avatar, AI Coach */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative text-gray-600 hover:text-[#2990C6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2990C6] focus:ring-offset-2 rounded p-2">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#e84e1c] rounded-full"></span>
          </button>
          
          {/* User Avatar */}
          <Avatar className="h-10 w-10 border-2 border-[#2990C6]">
            <AvatarFallback className="bg-[#2990C6] text-white" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
              {initials}
            </AvatarFallback>
          </Avatar>
          
          {/* AI Coach Button */}
          <button className="bg-[#2990C6] hover:bg-[#2176AD] text-white px-4 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2990C6] focus:ring-offset-2" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            AI Coach
          </button>
        </div>
      </div>
    </nav>
  );
}