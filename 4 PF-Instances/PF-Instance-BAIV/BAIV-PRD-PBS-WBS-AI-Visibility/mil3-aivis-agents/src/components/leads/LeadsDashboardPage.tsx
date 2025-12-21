import { useState, useEffect } from 'react';
import { StatsCards } from './StatsCards';
import { QuickActionsSection } from './QuickActionsSection';
import { RecentCampaignsSection } from './RecentCampaignsSection';
import { LinkedInQueueWidget } from './LinkedInQueueWidget';

interface LeadsDashboardPageProps {
  onNavigate?: (page: string) => void;
}

export function LeadsDashboardPage({ onNavigate }: LeadsDashboardPageProps) {
  const [stats, setStats] = useState<any>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [queueStatus, setQueueStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setStats({
        total_leads: 2847,
        active_campaigns: 12,
        linkedin_connections: {
          total: 89,
          pending: 23,
          this_week: 3
        },
        email_enrichments: {
          total: 456,
          credits_used: 145,
          verification_rate: 0.94
        },
        trends: {
          leads_this_month: 248,
          leads_change_percent: 9.5
        },
        campaigns_by_status: {
          processing: 5,
          completed: 7,
          failed: 0
        }
      });

      setCampaigns([
        {
          id: 'camp_abc123',
          name: 'B2B SaaS Companies - San Francisco',
          source_type: 'hunter_io',
          status: 'completed',
          total_results: 247,
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'camp_def456',
          name: 'Coffee Shops - Downtown LA',
          source_type: 'google_maps',
          status: 'processing',
          total_results: 89,
          progress: 0.45,
          created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'camp_ghi789',
          name: 'Marketing Directors - Tech Industry',
          source_type: 'linkedin',
          status: 'completed',
          total_results: 156,
          created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'camp_jkl012',
          name: 'Real Estate Agencies - Miami',
          source_type: 'google_maps',
          status: 'processing',
          total_results: 34,
          progress: 0.25,
          created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
        },
        {
          id: 'camp_mno345',
          name: 'Enterprise Software CEOs',
          source_type: 'hunter_io',
          status: 'completed',
          total_results: 423,
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        }
      ]);

      setQueueStatus({
        queue_count: 23,
        connected_count: 89,
        pending_count: 12,
        rate_limit: {
          sent_this_week: 3,
          weekly_limit: 15,
          resets_in_days: 4
        },
        next_in_queue: [
          {
            id: 'queue_item_1',
            lead: {
              id: 'lead_1',
              name: 'John Doe',
              title: 'CEO',
              company: 'Acme Corp',
              profile_url: 'https://linkedin.com/in/johndoe',
              profile_photo_url: 'https://i.pravatar.cc/150?img=12'
            },
            scheduled_for: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            status: 'queued'
          },
          {
            id: 'queue_item_2',
            lead: {
              id: 'lead_2',
              name: 'Sarah Johnson',
              title: 'VP Marketing',
              company: 'TechStart Inc',
              profile_url: 'https://linkedin.com/in/sarahjohnson',
              profile_photo_url: 'https://i.pravatar.cc/150?img=5'
            },
            scheduled_for: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
            status: 'queued'
          },
          {
            id: 'queue_item_3',
            lead: {
              id: 'lead_3',
              name: 'Michael Chen',
              title: 'Product Director',
              company: 'Innovation Labs',
              profile_url: 'https://linkedin.com/in/michaelchen',
              profile_photo_url: 'https://i.pravatar.cc/150?img=33'
            },
            scheduled_for: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(),
            status: 'queued'
          }
        ]
      });

      setIsLoading(false);
    }, 1000);
  }, []);

  const handleNewCampaign = () => {
    // Navigate to campaign creation or open modal
    if (onNavigate) {
      onNavigate('campaigns-list');
    }
  };

  const handleViewAllCampaigns = () => {
    if (onNavigate) {
      onNavigate('campaigns-list');
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[#6b7280] mb-6" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
        <button 
          onClick={() => onNavigate?.('dashboard')}
          className="hover:text-[#02a4bf] cursor-pointer transition-colors"
        >
          Dashboard
        </button>
        <span>{'>'}</span>
        <span>Leads</span>
        <span>{'>'}</span>
        <span className="text-[#231f20]">Dashboard</span>
      </div>

      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[#231f20] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', lineHeight: '1.2' }}>
            Leads Dashboard
          </h1>
          <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '16px', lineHeight: '1.5' }}>
            Manage B2B leads, local businesses, and LinkedIn connections
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleNewCampaign}
            className="bg-[#02a4bf] text-white h-12 px-6 rounded-lg hover:bg-[#028a9f] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2" 
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
          >
            <span className="text-xl">🚀</span>
            New Campaign
          </button>
          <button 
            onClick={handleViewAllCampaigns}
            className="bg-white text-[#02a4bf] border-2 border-[#02a4bf] h-12 px-6 rounded-lg hover:bg-[#f0fdff] transition-all duration-200 flex items-center gap-2" 
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
          >
            <span className="text-xl">📋</span>
            View All Campaigns
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} isLoading={isLoading} />

      {/* Quick Actions */}
      <QuickActionsSection onNavigate={onNavigate} />

      {/* Recent Campaigns */}
      <RecentCampaignsSection campaigns={campaigns} isLoading={isLoading} onNavigate={onNavigate} />

      {/* LinkedIn Queue Widget */}
      <LinkedInQueueWidget queueStatus={queueStatus} isLoading={isLoading} />
    </div>
  );
}
