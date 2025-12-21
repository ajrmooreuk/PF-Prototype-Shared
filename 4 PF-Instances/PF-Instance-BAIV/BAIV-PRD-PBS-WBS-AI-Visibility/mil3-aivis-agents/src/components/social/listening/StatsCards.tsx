import { TrendingUp, Target, MessageSquare, Lightbulb } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    total_posts_scraped: number;
    high_priority_opportunities: number;
    engagement_alerts: number;
    content_ideas: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Posts Scraped */}
      <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-xl bg-[#E6F7F9] flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-[#02a4bf]" />
          </div>
        </div>
        <div className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', lineHeight: '1.2' }}>
          {stats.total_posts_scraped}
        </div>
        <div className="text-[#6B7280] mt-2" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Total Posts Scraped
        </div>
        <div className="text-[#10b981] mt-2" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
          ↑ 23 this week
        </div>
      </div>

      {/* High Priority Opportunities */}
      <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-xl bg-[#FEF2EE] flex items-center justify-center">
            <Target className="w-6 h-6 text-[#e84e1c]" />
          </div>
        </div>
        <div className="text-[#e84e1c]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', lineHeight: '1.2' }}>
          {stats.high_priority_opportunities}
        </div>
        <div className="text-[#6B7280] mt-2" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          High Priority Opportunities
        </div>
        <div className="text-[#e84e1c]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
          12 need action today
        </div>
      </div>

      {/* Engagement Alerts */}
      <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-[#3b82f6]" />
          </div>
        </div>
        <div className="text-[#3b82f6]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', lineHeight: '1.2' }}>
          {stats.engagement_alerts}
        </div>
        <div className="text-[#6B7280] mt-2" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Engagement Alerts
        </div>
        <div className="text-[#3b82f6]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
          18 new
        </div>
      </div>

      {/* Content Ideas */}
      <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-xl bg-[#E6F7F9] flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-[#02a4bf]" />
          </div>
        </div>
        <div className="text-[#02a4bf]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', lineHeight: '1.2' }}>
          {stats.content_ideas}
        </div>
        <div className="text-[#6B7280] mt-2" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Content Ideas
        </div>
        <div className="text-[#10b981]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
          ↑ 15% vs last week
        </div>
      </div>
    </div>
  );
}
