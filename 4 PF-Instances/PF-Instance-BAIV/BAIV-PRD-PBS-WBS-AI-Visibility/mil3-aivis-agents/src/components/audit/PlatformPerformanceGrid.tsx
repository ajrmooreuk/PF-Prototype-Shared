import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { TrendingUp, TrendingDown, ArrowRight as ArrowStable, ArrowRight } from 'lucide-react';

interface Platform {
  name: string;
  icon: string;
  citationRate: number;
  avgPosition: number;
  totalCitations: number;
  trend: number;
  trendDirection: 'up' | 'down' | 'stable';
}

interface PlatformPerformanceGridProps {
  platforms: Platform[];
}

export function PlatformPerformanceGrid({ platforms }: PlatformPerformanceGridProps) {
  const getCitationRateColor = (rate: number) => {
    if (rate >= 60) return 'text-green-500';
    if (rate >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up':
        return TrendingUp;
      case 'down':
        return TrendingDown;
      default:
        return ArrowStable;
    }
  };

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div>
      <h2 
        className="text-[#005260] mb-4" 
        style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}
      >
        Platform Performance
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((platform) => {
          const TrendIcon = getTrendIcon(platform.trendDirection);
          
          return (
            <Card 
              key={platform.name}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{platform.icon}</span>
                <h3 
                  className="text-[#005260]" 
                  style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}
                >
                  {platform.name}
                </h3>
              </div>

              {/* Metrics */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm" style={{ fontFamily: 'Open Sans' }}>
                    Citation Rate
                  </span>
                  <span 
                    className={`${getCitationRateColor(platform.citationRate)}`}
                    style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}
                  >
                    {platform.citationRate}%
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm" style={{ fontFamily: 'Open Sans' }}>
                    Avg Position
                  </span>
                  <span 
                    className="text-[#02a4bf]"
                    style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}
                  >
                    {platform.avgPosition}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm" style={{ fontFamily: 'Open Sans' }}>
                    Total Citations
                  </span>
                  <span 
                    className="text-[#02a4bf]"
                    style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}
                  >
                    {platform.totalCitations}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-gray-600 text-sm" style={{ fontFamily: 'Open Sans' }}>
                    7-Day Trend
                  </span>
                  <div className={`flex items-center gap-1 ${getTrendColor(platform.trendDirection)}`}>
                    <TrendIcon className="h-4 w-4" />
                    <span style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                      {platform.trend > 0 ? '+' : ''}{platform.trend}%
                    </span>
                  </div>
                </div>
              </div>

              {/* View Details Button */}
              <Button
                variant="ghost"
                className="w-full text-[#02a4bf] hover:text-[#028a9f] hover:bg-[#02a4bf]/5 justify-center"
                style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
              >
                View Details
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
