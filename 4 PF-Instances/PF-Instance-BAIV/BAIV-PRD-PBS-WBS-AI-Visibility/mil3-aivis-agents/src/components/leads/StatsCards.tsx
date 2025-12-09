import { Card } from '../ui/card';
import { Users, Activity, Briefcase, Mail } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface StatsCardsProps {
  stats: any;
  isLoading: boolean;
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6 h-[140px]">
            <Skeleton className="w-14 h-14 rounded-full mb-4" />
            <Skeleton className="w-24 h-9 mb-2" />
            <Skeleton className="w-32 h-4" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {/* Card 1: Total Leads */}
      <Card className="p-6 h-[140px] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer relative">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#f0fdff] rounded-full flex items-center justify-center">
            <Users className="h-8 w-8 text-[#02a4bf]" />
          </div>
          <div>
            <div className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', letterSpacing: '-0.5px' }}>
              {stats?.total_leads?.toLocaleString() || '0'}
            </div>
            <p className="text-[#6b7280] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Total Leads
            </p>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-[#d1fae5] text-[#10b981] px-2 py-1 rounded-xl text-xs" style={{ fontFamily: 'Open Sans' }}>
          <span>↑</span>
          <span>+{stats?.trends?.leads_this_month || 0} this month</span>
        </div>
      </Card>

      {/* Card 2: Active Campaigns */}
      <Card className="p-6 h-[140px] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-[#dbeafe] rounded-full flex items-center justify-center">
            <Activity className="h-8 w-8 text-[#3b82f6]" />
          </div>
          <div>
            <div className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', letterSpacing: '-0.5px' }}>
              {stats?.active_campaigns || '0'}
            </div>
            <p className="text-[#6b7280] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Active Campaigns
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-[#9ca3af] text-xs" style={{ fontFamily: 'Open Sans' }}>
            {stats?.campaigns_by_status?.processing || 0} processing, {stats?.campaigns_by_status?.completed || 0} completed
          </p>
          <div className="w-full h-1.5 bg-[#f3f4f6] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] rounded-full"
              style={{ 
                width: `${((stats?.campaigns_by_status?.processing || 0) / (stats?.active_campaigns || 1)) * 100}%` 
              }}
            />
          </div>
        </div>
      </Card>

      {/* Card 3: LinkedIn Connections */}
      <Card className="p-6 h-[140px] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#e8f4f9] rounded-full flex items-center justify-center">
            <Briefcase className="h-8 w-8 text-[#0077b5]" />
          </div>
          <div>
            <div className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', letterSpacing: '-0.5px' }}>
              {stats?.linkedin_connections?.total || '0'}
            </div>
            <p className="text-[#6b7280] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              LinkedIn Connections
            </p>
          </div>
        </div>
        <div className="mt-2">
          <span className="inline-block bg-[#fef3c7] text-[#f59e0b] px-2 py-1 rounded-lg text-xs" style={{ fontFamily: 'Open Sans' }}>
            {stats?.linkedin_connections?.pending || 0} pending
          </span>
        </div>
        {stats?.linkedin_connections?.this_week >= 12 && (
          <div className="flex items-center gap-1 mt-2 text-[#f59e0b] text-xs" style={{ fontFamily: 'Open Sans' }}>
            <span>⚠️</span>
            <span>{stats.linkedin_connections.this_week} of 15 used this week</span>
          </div>
        )}
      </Card>

      {/* Card 4: Email Enrichments */}
      <Card className="p-6 h-[140px] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer relative">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 bg-[#f3e8ff] rounded-full flex items-center justify-center">
            <Mail className="h-8 w-8 text-[#8b5cf6]" />
          </div>
          <div>
            <div className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', letterSpacing: '-0.5px' }}>
              {stats?.email_enrichments?.total || '0'}
            </div>
            <p className="text-[#6b7280] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Emails Enriched
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-[#f9fafb] px-2.5 py-1 rounded-lg text-[#6b7280] text-xs" style={{ fontFamily: 'Open Sans' }}>
            <span>💎</span>
            <span>{stats?.email_enrichments?.credits_used || 0} credits used</span>
          </div>
          <div className="flex items-center gap-1 text-[#10b981] text-xs font-bold" style={{ fontFamily: 'Open Sans' }}>
            <span>✓</span>
            <span>{Math.round((stats?.email_enrichments?.verification_rate || 0) * 100)}% verified</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
