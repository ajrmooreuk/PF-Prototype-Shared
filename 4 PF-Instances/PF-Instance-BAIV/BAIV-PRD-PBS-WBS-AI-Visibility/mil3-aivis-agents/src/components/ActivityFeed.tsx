import { Card } from './ui/card';
import { CheckCircle, Clock } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'in-progress';
}

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const displayActivities = activities.slice(0, 10);

  return (
    <Card className="p-6 bg-white rounded-2xl shadow-sm">
      <h3 
        className="text-[#000000] mb-6" 
        style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}
      >
        Recent Activity
      </h3>

      <div className="space-y-0">
        {displayActivities.map((item, index) => (
          <div key={item.id}>
            <div className="flex items-start gap-4 py-4 hover:bg-[#2990C6]/5 -mx-4 px-4 rounded-lg transition-colors duration-200 cursor-pointer">
              {/* Status Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.status === 'completed' 
                    ? 'text-[#2990C6]' 
                    : 'text-gray-400'
                }`}
              >
                {item.status === 'completed' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <Clock className="h-5 w-5" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p 
                  className="text-[#000000] mb-1" 
                  style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}
                >
                  {item.title}
                </p>
                <p className="text-gray-500 text-sm" style={{ fontFamily: 'Open Sans' }}>
                  {item.description}
                </p>
              </div>

              {/* Timestamp */}
              <div className="text-gray-400 text-xs whitespace-nowrap" style={{ fontFamily: 'Open Sans' }}>
                {item.timestamp}
              </div>
            </div>
            {index < displayActivities.length - 1 && (
              <div className="border-b border-gray-100" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button 
          className="text-[#2990C6] text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-[#2990C6] focus:ring-offset-2 rounded px-3 py-1 transition-transform duration-200 active:scale-95"
          style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
        >
          View All Activity
        </button>
      </div>
    </Card>
  );
}