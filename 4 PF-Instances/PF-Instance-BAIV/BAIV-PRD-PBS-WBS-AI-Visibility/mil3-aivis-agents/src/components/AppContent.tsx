import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { callEccoAPI, discoveryAuditAPI, discoveryIntelligenceAPI } from '../lib/eccoAPI';
import { getStoredTenantId, getStoredUserEmail, getSession, getTenantId } from '../lib/supabase';
import { AppLayout } from './AppLayout';
import { DiscoveryAuditPage } from './DiscoveryAuditPage';
import { VisibilityOnboardingFlow } from './onboarding/VisibilityOnboardingFlow';
import { VisibilityOnboardingFlowV2 } from './onboarding/VisibilityOnboardingFlowV2';
import { LoadingOverlay } from './LoadingOverlay';
import { EmptyState } from './EmptyState';
import { MetricsRow } from './MetricsRow';
import { PlatformCitationChart } from './PlatformCitationChart';
import { ActivityFeed } from './ActivityFeed';
import { QuickActions } from './QuickActions';
import { TopOpportunities } from './TopOpportunities';
import { BlogCreatorPage } from './blog/BlogCreatorPage';
import { FAQGeneratorPage } from './faq/FAQGeneratorPage';
import { MetaGeneratorPage } from './meta/MetaGeneratorPage';
import { SchemaGeneratorPage } from './schema/SchemaGeneratorPage';
import { LinkSuggesterPage } from './link/LinkSuggesterPage';
import { ImageGeneratorPage } from './image/ImageGeneratorPage';
import { SocialMediaPostCreatorPage } from './social/SocialMediaPostCreatorPage';
import { SocialListeningPage } from './social/listening/SocialListeningPage';
import { PublishingCalendarPage } from './social/calendar/PublishingCalendarPage';
import { IdeasLibraryPage } from './social/ideas/IdeasLibraryPage';
import { LeadsDashboardPage } from './leads/LeadsDashboardPage';
import { CampaignsListPage } from './leads/CampaignsListPage';
import { CampaignResultsPage } from './campaign-results/CampaignResultsPage';
import { NewCampaignPage } from './leads/NewCampaignPage';
import { PodcastOverviewPage } from './podcasts/PodcastOverviewPage';
import { PodcastCampaignsPage } from './podcasts/PodcastCampaignsPage';
import { PodcastLeadsPage } from './podcasts/PodcastLeadsPage';
import { PodcastOutreachPage } from './podcasts/PodcastOutreachPage';
import { PodcastBookingsPage } from './podcasts/PodcastBookingsPage';
import { AmbassadorDiscoveryPage } from './ambassadors/AmbassadorDiscoveryPage';
import { AmbassadorListPage } from './ambassadors/AmbassadorListPage';
import { AmbassadorCampaignsPage } from './ambassadors/AmbassadorCampaignsPage';
import { ContentApprovalQueue } from './ambassadors/ContentApprovalQueue';
import { PMFOverviewPage } from './pmf/PMFOverviewPage';
import { SurveysListPage } from './pmf/SurveysListPage';
import { CreateSurveyPage } from './pmf/CreateSurveyPage';
import { SurveyDetailsPage } from './pmf/SurveyDetailsPage';
import { InterviewsListPage } from './pmf/InterviewsListPage';
import { InterviewAnalysisPage } from './pmf/InterviewAnalysisPage';
import { SettingsPage } from './settings/SettingsPage';
import { ICPDiscoveryPage } from './icp/ICPDiscoveryPage';
// import { useAuth } from './auth/AuthContext';

interface DashboardData {
  has_data: boolean;
  audit_in_progress: boolean;
  scores: {
    visibility_score: number;
  };
  metrics: {
    total_leads: number;
    social_alerts: number;
    content_gaps: number;
    leads_trend: number;
    platform_citation_rates: {
      chatgpt: number;
      claude: number;
      perplexity: number;
      gemini: number;
    };
  };
  activity_feed: Array<{
    id: string;
    title: string;
    description: string;
    timestamp: string;
    status: 'completed' | 'in-progress';
  }>;
  top_opportunities: Array<{
    id: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    title: string;
    estimated_impact: string;
  }>;
}

export function AppContent({ onLogout }: { onLogout?: () => void }) {
  // const { user, session, tenantId } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'discovery-audit' | 'content-studio' | 'faq-generator' | 'meta-generator' | 'schema-generator' | 'link-suggester' | 'image-generator' | 'social-media' | 'social-listening' | 'publishing-calendar' | 'ideas-library' | 'leads-dashboard' | 'campaigns-list' | 'campaign-results' | 'new-campaign' | 'podcast-overview' | 'podcast-campaigns' | 'podcast-leads' | 'podcast-outreach' | 'podcast-bookings' | 'ambassador-discovery' | 'ambassador-list' | 'ambassador-campaigns' | 'content-approval' | 'pmf-overview' | 'pmf-surveys' | 'pmf-create-survey' | 'pmf-survey-details' | 'pmf-interviews' | 'interview-details' | 'settings' | 'icp-discovery'>('dashboard');
  const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null);
  const [selectedInterviewId, setSelectedInterviewId] = useState<string | null>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>('camp_123');
  const [authChecking, setAuthChecking] = useState(true);
  const [tenantId, setTenantId] = useState<string | null>(null);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      setAuthChecking(true);
      
      // First check localStorage
      let storedTenantId = getStoredTenantId();
      const storedEmail = getStoredUserEmail();
      
      // If no tenant_id in localStorage, check if there's a Supabase session
      if (!storedTenantId) {
        console.log('No tenant_id in localStorage, checking Supabase session...');
        const session = await getSession();
        
        if (session?.user) {
          console.log('Supabase session found, fetching tenant_id for user:', session.user.id);
          
          // Fetch tenant_id from database
          const fetchedTenantId = await getTenantId(session.user.id);
          
          if (fetchedTenantId) {
            console.log('Tenant ID fetched:', fetchedTenantId);
            // Store it in localStorage for future use
            localStorage.setItem('tenant_id', fetchedTenantId);
            localStorage.setItem('user_email', session.user.email || '');
            storedTenantId = fetchedTenantId;
          } else {
            // User is logged in but no tenant_id in database - use email-based tenant
            console.log('No tenant_id in database, using email-based fallback');
            const emailBasedTenant = `tenant_${session.user.email?.split('@')[0] || session.user.id}`;
            localStorage.setItem('tenant_id', emailBasedTenant);
            localStorage.setItem('user_email', session.user.email || '');
            storedTenantId = emailBasedTenant;
          }
          
          // Also store the JWT token for API calls
          if (session.access_token) {
            localStorage.setItem('jwt_token', session.access_token);
          }
        } else {
          console.log('No Supabase session found, using default tenant');
          // No session at all - use default for development
          storedTenantId = 'baiv-tenant';
          localStorage.setItem('tenant_id', storedTenantId);
        }
      }
      
      setTenantId(storedTenantId);
      setAuthChecking(false);
    };
    
    checkAuth();
  }, []);

  // Get real authentication values from state/localStorage
  const storedEmail = getStoredUserEmail();
  const userName = storedEmail || 'User';
  const jwtToken = localStorage.getItem('jwt_token') || '';

  const fetchDashboardData = async () => {
    if (!tenantId) return; // Don't fetch if no tenant

    setLoading(true);
    setError(null);

    try {
      // ✅ Use discovery-intelligence endpoints (aggregated, dashboard-optimized data)
      console.log('Dashboard: Fetching discovery intelligence...');

      // Fetch all intelligence data in parallel
      const [platformData, opportunities, rrfHealth] = await Promise.all([
        discoveryIntelligenceAPI.getPlatformVisibility().catch(() => ({ platforms: {}, overall_score: 0 })),
        discoveryIntelligenceAPI.getOpportunities(5).catch(() => ({ items: [], total: 0 })),
        discoveryIntelligenceAPI.getRRFHealth().catch(() => ({ score: 0 }))
      ]);

      console.log('Dashboard: Platform data:', platformData);
      console.log('Dashboard: Opportunities:', opportunities);
      console.log('Dashboard: RRF Health:', rrfHealth);

      // Check if any data exists
      const hasData = platformData.platforms && Object.keys(platformData.platforms).length > 0;

      if (!hasData) {
        // No audit data yet - show onboarding state
        console.log('Dashboard: No discovery audit found - showing onboarding state');
        setData({
          has_data: false,
          audit_in_progress: false,
          scores: { visibility_score: 0 },
          metrics: {
            total_leads: 0,
            social_alerts: 0,
            content_gaps: 0,
            leads_trend: 0,
            platform_citation_rates: {
              chatgpt: 0,
              claude: 0,
              perplexity: 0,
              gemini: 0
            }
          },
          activity_feed: [],
          top_opportunities: []
        });
        setLoading(false);
        return;
      }

      // Transform platform data to citation rates format
      const platformCitationRates: any = {};
      Object.entries(platformData.platforms).forEach(([name, data]: [string, any]) => {
        platformCitationRates[name] = data.citation_count || 0;
      });

      // Transform opportunities to dashboard format
      const topOpportunities = (opportunities.items || []).map((item: any) => ({
        id: item.id || Math.random().toString(),
        priority: item.priority_level || 'MEDIUM',
        title: item.topic || item.gap_description || 'Content Gap',
        estimated_impact: item.estimated_impact || 'Improve visibility'
      }));

      // Create activity feed (TODO: fetch from actual activities)
      const activityFeed = [
        {
          id: 'latest-audit',
          title: 'Discovery Intelligence Updated',
          description: `Found ${opportunities.total || 0} content opportunities`,
          timestamp: new Date().toISOString(),
          status: 'completed' as const
        }
      ];

      // Set dashboard data
      setData({
        has_data: true,
        audit_in_progress: false,
        scores: {
          visibility_score: platformData.overall_score || rrfHealth.score || 0
        },
        metrics: {
          total_leads: 0, // TODO: Fetch from leads API
          social_alerts: 0, // TODO: Fetch from social listening API
          content_gaps: opportunities.total || 0,
          leads_trend: 0, // TODO: Calculate trend
          platform_citation_rates: platformCitationRates
        },
        activity_feed: activityFeed,
        top_opportunities: topOpportunities
      });

      console.log('Dashboard: Intelligence data loaded successfully');

    } catch (err: any) {
      console.error('Dashboard: Error fetching intelligence data:', err);

      // If 404 or "No discovery audit found", show onboarding state
      if (
        err.message?.includes('404') ||
        err.message?.includes('not found') ||
        err.message?.includes('No discovery audit found')
      ) {
        console.log('Dashboard: No audit found - showing onboarding state');
        setData({
          has_data: false,
          audit_in_progress: false,
          scores: { visibility_score: 0 },
          metrics: {
            total_leads: 0,
            social_alerts: 0,
            content_gaps: 0,
            leads_trend: 0,
            platform_citation_rates: {
              chatgpt: 0,
              claude: 0,
              perplexity: 0,
              gemini: 0
            }
          },
          activity_feed: [],
          top_opportunities: []
        });
      } else {
        // Other errors
        setError(`Failed to load dashboard data: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Auto-refresh every 5 minutes
    const refreshInterval = setInterval(() => {
      fetchDashboardData();
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(refreshInterval);
  }, [tenantId]); // Re-run when tenantId changes

  // Poll for audit status if audit is in progress
  useEffect(() => {
    if (!data?.audit_in_progress) return;
    
    const pollInterval = setInterval(async () => {
      console.log('Polling audit status...');
      await fetchDashboardData();
    }, 5000); // Poll every 5 seconds when audit is running
    
    return () => clearInterval(pollInterval);
  }, [data?.audit_in_progress]);

  const handleOnboardingComplete = () => {
    setNeedsOnboarding(false);
    fetchDashboardData(); // Reload dashboard with real data
  };

  // Show loading while checking authentication - AFTER all hooks
  if (authChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2990C6] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If no tenant_id, user is not authenticated - AFTER all hooks
  if (!tenantId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">
            Please log in to access the BAIV AI Visibility Platform.
          </p>
          <div className="text-sm text-gray-500 mt-4 p-4 bg-gray-50 rounded">
            <p className="mb-2"><strong>For Milana:</strong></p>
            <p>You should already be logged in via Supabase.</p>
            <p className="mt-2">If you see this message, check:</p>
            <ul className="text-left mt-2 ml-4 list-disc">
              <li>Supabase session is active</li>
              <li>tenant_id exists in tenant_users table</li>
              <li>You're logged in to the correct account</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Show onboarding wizard if needed
  if (needsOnboarding) {
    return (
      <VisibilityOnboardingFlowV2 
        tenantId={tenantId}
        jwtToken={jwtToken}
        onComplete={handleOnboardingComplete}
      />
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        if (loading) {
          return <LoadingOverlay message="Loading your dashboard..." />;
        }

        if (!data?.has_data) {
          return <EmptyState onRunAudit={() => setNeedsOnboarding(true)} />;
        }

        return (
          <>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-4"
                    onClick={fetchDashboardData}
                  >
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {data.audit_in_progress && (
              <LoadingOverlay 
                message="Discovery audit in progress..." 
                progress={45}
              />
            )}

            <MetricsRow 
              visibilityScore={data.scores.visibility_score}
              totalLeads={data.metrics.total_leads}
              socialAlerts={data.metrics.social_alerts}
              contentGaps={data.metrics.content_gaps}
              leadsTrend={data.metrics.leads_trend}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <PlatformCitationChart 
                  platformCitationRates={data.metrics.platform_citation_rates}
                  visibilityScore={data.scores.visibility_score}
                />
              </div>
              <div>
                <ActivityFeed activities={data.activity_feed} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <QuickActions onNavigate={setCurrentPage} />
              </div>
              <div className="lg:col-span-2">
                <TopOpportunities opportunities={data.top_opportunities} />
              </div>
            </div>
          </>
        );

      case 'discovery-audit':
        return <VisibilityOnboardingFlowV2 
          tenantId={tenantId} 
          jwtToken={jwtToken} 
          onComplete={() => {
            setCurrentPage('dashboard');
            fetchDashboardData();
          }}
        />; 
      
      case 'icp-discovery':
        return <ICPDiscoveryPage tenantId={tenantId} jwtToken={jwtToken} />;
      
      case 'content-studio':
        return <BlogCreatorPage />;
      
      case 'faq-generator':
        return <FAQGeneratorPage tenantId={tenantId} jwtToken={jwtToken} />;
      
      case 'meta-generator':
        return <MetaGeneratorPage tenantId={tenantId} jwtToken={jwtToken} />;
      
      case 'schema-generator':
        return <SchemaGeneratorPage tenantId={tenantId} jwtToken={jwtToken} />;
      
      case 'link-suggester':
        return <LinkSuggesterPage tenantId={tenantId} jwtToken={jwtToken} />;
      
      case 'image-generator':
        return <ImageGeneratorPage tenantId={tenantId} jwtToken={jwtToken} />;
      
      case 'social-media':
        return <SocialMediaPostCreatorPage />;
      
      case 'social-listening':
        return <SocialListeningPage />;
      
      case 'publishing-calendar':
        return <PublishingCalendarPage />;
      
      case 'ideas-library':
        return <IdeasLibraryPage />;
      
      case 'leads-dashboard':
        return <LeadsDashboardPage onNavigate={setCurrentPage} />;
      
      case 'campaigns-list':
        return (
          <CampaignsListPage 
            onNavigate={setCurrentPage}
            onSelectCampaign={(campaignId) => {
              setSelectedCampaignId(campaignId);
              setCurrentPage('campaign-results');
            }}
          />
        );
      
      case 'campaign-results':
        return (
          <CampaignResultsPage 
            campaignId={selectedCampaignId || 'camp_123'} 
            tenantId={tenantId} 
            jwtToken={jwtToken}
            onNavigate={setCurrentPage}
          />
        );
      
      case 'new-campaign':
        return <NewCampaignPage onNavigate={setCurrentPage} />;
      
      case 'podcast-overview':
        return <PodcastOverviewPage onNavigate={setCurrentPage} />;
      
      case 'podcast-campaigns':
        return <PodcastCampaignsPage onNavigate={setCurrentPage} />;
      
      case 'podcast-leads':
        return <PodcastLeadsPage />;
      
      case 'podcast-outreach':
        return <PodcastOutreachPage />;
      
      case 'podcast-bookings':
        return <PodcastBookingsPage />;
      
      case 'ambassador-discovery':
        return <AmbassadorDiscoveryPage onNavigate={setCurrentPage} />;
      
      case 'ambassador-list':
        return <AmbassadorListPage onNavigate={setCurrentPage} />;
      
      case 'ambassador-campaigns':
        return <AmbassadorCampaignsPage onNavigate={setCurrentPage} />;
      
      case 'content-approval':
        return <ContentApprovalQueue onNavigate={setCurrentPage} />;
      
      case 'pmf-overview':
        return <PMFOverviewPage onNavigate={setCurrentPage} />;
      
      case 'pmf-surveys':
        return <SurveysListPage 
          onNavigate={setCurrentPage}
          onSelectSurvey={(id) => {
            setSelectedSurveyId(id);
            setCurrentPage('pmf-survey-details');
          }}
        />;
      
      case 'pmf-create-survey':
        return <CreateSurveyPage onNavigate={setCurrentPage} />;
      
      case 'pmf-survey-details':
        return <SurveyDetailsPage 
          surveyId={selectedSurveyId || 'survey_001'}
          onNavigate={setCurrentPage}
        />;
      
      case 'pmf-interviews':
        return <InterviewsListPage 
          onNavigate={setCurrentPage}
          onSelectInterview={(id) => {
            setSelectedInterviewId(id);
            setCurrentPage('interview-details');
          }}
        />;
      
      case 'interview-details':
        return <InterviewAnalysisPage 
          interviewId={selectedInterviewId || 'int_001'}
          onNavigate={setCurrentPage}
        />;
      
      case 'settings':
        return <SettingsPage 
          tenantId={tenantId}
          jwtToken={jwtToken}
        />;
      
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <AppLayout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      userName={userName}
      jwtToken={jwtToken}
      tenantId={tenantId}
      onLogout={onLogout}
    >
      {renderPage()}
    </AppLayout>
  );
}

// Helper function to format timestamps
const formatTimestamp = (timestamp: string | undefined): string => {
  if (!timestamp) return 'Recently';
  
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  } catch (e) {
    return timestamp;
  }
};