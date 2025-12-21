import { Card } from './ui/card';
import { CircularGauge } from './CircularGauge';
import { TrendingUp, TrendingDown, Bell } from 'lucide-react';

interface MetricsRowProps {
  visibilityScore: number;
  totalLeads: number;
  leadsTrend: number;
  socialAlerts: number;
  contentGaps: number;
}

export function MetricsRow({ 
  visibilityScore, 
  totalLeads, 
  leadsTrend,
  socialAlerts, 
  contentGaps 
}: MetricsRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* AI Visibility Score */}
      <Card className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex flex-col items-center">
          <CircularGauge value={visibilityScore} />
          <p className="text-gray-500 text-sm mt-4" style={{ fontFamily: 'Open Sans' }}>
            AI Visibility Score
          </p>
        </div>
      </Card>

      {/* Total Leads Found */}
      <Card className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex flex-col items-center">
          <p 
            className="text-[#2990C6] mb-2" 
            style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '48px', lineHeight: '1' }}
          >
            {totalLeads.toLocaleString()}
          </p>
          <p className="text-gray-500 text-sm mb-2" style={{ fontFamily: 'Open Sans' }}>
            Total Leads Found
          </p>
          <div className="flex items-center gap-1 text-green-600 text-xs" style={{ fontFamily: 'Open Sans' }}>
            <TrendingUp 
              className="text-[#2990C6] mb-2" 
              style={{ width: '40px', height: '40px' }} 
            />
            <span>+{leadsTrend} this month</span>
          </div>
          <button 
            className="text-[#2990C6] text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-[#2990C6] focus:ring-offset-2 rounded px-2 py-1 transition-transform duration-200 active:scale-95"
            style={{ fontFamily: 'Open Sans', fontWeight: 400 }}
          >
            View all leads →
          </button>
        </div>
      </Card>

      {/* Social Engagement Alerts */}
      <Card className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex flex-col items-center">
          <p 
            className="text-[#e84e1c] mb-2" 
            style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '48px', lineHeight: '1' }}
          >
            {socialAlerts}
          </p>
          <p className="text-gray-500 text-sm mb-3" style={{ fontFamily: 'Open Sans' }}>
            Engagement Alerts
          </p>
          <Bell 
            className="text-[#2990C6] mb-2" 
            style={{ width: '40px', height: '40px' }} 
          />
          <button 
            className="text-[#2990C6] text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-[#2990C6] focus:ring-offset-2 rounded px-2 py-1 transition-transform duration-200 active:scale-95"
            style={{ fontFamily: 'Open Sans', fontWeight: 400 }}
          >
            Check alerts →
          </button>
        </div>
      </Card>

      {/* Content Gaps Identified */}
      <Card className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex flex-col items-center">
          <p 
            className="text-[#2990C6] mb-2" 
            style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '48px', lineHeight: '1' }}
          >
            {contentGaps}
          </p>
          <p className="text-gray-500 text-sm mb-3" style={{ fontFamily: 'Open Sans' }}>
            Content Gaps
          </p>
          <button 
            className="text-[#2990C6] text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-[#2990C6] focus:ring-offset-2 rounded px-2 py-1 transition-transform duration-200 active:scale-95"
            style={{ fontFamily: 'Open Sans' }}
          >
            View Gaps
          </button>
        </div>
      </Card>
    </div>
  );
}