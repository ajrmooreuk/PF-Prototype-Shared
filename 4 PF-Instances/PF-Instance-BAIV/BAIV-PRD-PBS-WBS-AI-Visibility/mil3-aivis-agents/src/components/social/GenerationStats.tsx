import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { callEccoAPI } from '../../lib/eccoAPI';

interface StatsData {
  total_posts: number;
  total_posts_trend: string;
  this_month: number;
  month_trend: string;
  success_rate: number;
  success_rate_trend: string;
}

interface GenerationStatsProps {
  tenantId: string;
  jwtToken: string;
}

export function GenerationStats({ tenantId, jwtToken }: GenerationStatsProps) {
  const [stats, setStats] = useState<StatsData>({
    total_posts: 247,
    total_posts_trend: '+12',
    this_month: 45,
    month_trend: '+8',
    success_rate: 94,
    success_rate_trend: 'stable'
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await callEccoAPI('/api/social/analytics/stats', 'GET');
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [tenantId, jwtToken]);

  const getTrendIcon = (trend: string) => {
    if (trend.startsWith('+')) {
      return <TrendingUp className="h-4 w-4" />;
    } else if (trend.startsWith('-')) {
      return <TrendingDown className="h-4 w-4" />;
    } else {
      return <Minus className="h-4 w-4" />;
    }
  };

  const getTrendColor = (trend: string) => {
    if (trend.startsWith('+')) {
      return 'text-[#10b981]';
    } else if (trend.startsWith('-')) {
      return 'text-[#e84e1c]';
    } else {
      return 'text-[#6B7280]';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-[#005260] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
        Generation Stats
      </h3>

      <div className="space-y-4">
        {/* Total Posts */}
        <div className="p-4 bg-[#f9fafb] rounded-xl">
          <div className="text-[#02a4bf] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}>
            {stats.total_posts}
          </div>
          <div className="text-[#6B7280] mb-2" style={{ fontFamily: 'Open Sans' }}>
            Total posts
          </div>
          <div className={`flex items-center gap-1 text-xs ${getTrendColor(stats.total_posts_trend)}`} style={{ fontFamily: 'Open Sans' }}>
            {getTrendIcon(stats.total_posts_trend)}
            <span>{stats.total_posts_trend}% this week</span>
          </div>
        </div>

        {/* This Month */}
        <div className="p-4 bg-[#f9fafb] rounded-xl">
          <div className="text-[#02a4bf] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}>
            {stats.this_month}
          </div>
          <div className="text-[#6B7280] mb-2" style={{ fontFamily: 'Open Sans' }}>
            This month
          </div>
          <div className={`flex items-center gap-1 text-xs ${getTrendColor(stats.month_trend)}`} style={{ fontFamily: 'Open Sans' }}>
            {getTrendIcon(stats.month_trend)}
            <span>{stats.month_trend}% vs last month</span>
          </div>
        </div>

        {/* Success Rate */}
        <div className="p-4 bg-[#f9fafb] rounded-xl">
          <div className="text-[#02a4bf] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}>
            {stats.success_rate}%
          </div>
          <div className="text-[#6B7280] mb-2" style={{ fontFamily: 'Open Sans' }}>
            Success rate
          </div>
          <div className={`flex items-center gap-1 text-xs ${getTrendColor(stats.success_rate_trend)}`} style={{ fontFamily: 'Open Sans' }}>
            {getTrendIcon(stats.success_rate_trend)}
            <span>{stats.success_rate_trend === 'stable' ? 'Stable' : `${stats.success_rate_trend}%`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}