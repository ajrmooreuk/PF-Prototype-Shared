import { Calendar, Check, FileText } from 'lucide-react';

interface MonthlyStatsSidebarProps {
  stats: {
    scheduled: number;
    published: number;
    drafts: number;
    by_platform?: {
      [key: string]: number;
    };
  };
}

const platformInfo: { [key: string]: { name: string; color: string } } = {
  linkedin: { name: 'LinkedIn', color: '#0077b5' },
  twitter: { name: 'Twitter', color: '#000000' },
  facebook: { name: 'Facebook', color: '#1877f2' },
  instagram: { name: 'Instagram', color: '#e4405f' },
};

export function MonthlyStatsSidebar({ stats }: MonthlyStatsSidebarProps) {
  const totalPosts = stats.by_platform
    ? Object.values(stats.by_platform).reduce((sum, count) => sum + count, 0)
    : stats.scheduled + stats.published;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h3 className="text-[#231f20] mb-6" style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: 600 }}>
        This Month
      </h3>

      {/* Metrics */}
      <div className="space-y-6 mb-6">
        {/* Scheduled */}
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <div
              className="text-orange-500"
              style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', lineHeight: '1' }}
            >
              {stats.scheduled}
            </div>
            <div className="text-gray-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Scheduled
            </div>
          </div>
        </div>

        {/* Published */}
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
            <Check className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <div
              className="text-green-500"
              style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', lineHeight: '1' }}
            >
              {stats.published}
            </div>
            <div className="text-gray-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Published
            </div>
          </div>
        </div>

        {/* Drafts */}
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <div
              className="text-gray-500"
              style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', lineHeight: '1' }}
            >
              {stats.drafts}
            </div>
            <div className="text-gray-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Drafts
            </div>
          </div>
        </div>
      </div>

      {/* Platform Breakdown */}
      {stats.by_platform && Object.keys(stats.by_platform).length > 0 && (
        <div className="pt-6 border-t border-gray-200">
          <div
            className="text-gray-500 uppercase mb-4"
            style={{ fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }}
          >
            By Platform
          </div>
          <div className="space-y-3">
            {Object.entries(stats.by_platform).map(([platform, count]) => {
              const info = platformInfo[platform] || { name: platform, color: '#6b7280' };
              const percentage = totalPosts > 0 ? (count / totalPosts) * 100 : 0;

              return (
                <div key={platform}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                      {info.name}
                    </span>
                    <span
                      className="text-[#231f20]"
                      style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 600 }}
                    >
                      {count}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: info.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
