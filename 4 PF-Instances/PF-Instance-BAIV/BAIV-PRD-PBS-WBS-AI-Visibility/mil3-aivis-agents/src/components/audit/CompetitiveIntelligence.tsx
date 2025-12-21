import { Card } from '../ui/card';
import { Trophy } from 'lucide-react';

interface Competitor {
  name: string;
  citations: number;
  isYou?: boolean;
  isLeader?: boolean;
}

interface CompetitiveIntelligenceProps {
  competitors: Competitor[];
}

export function CompetitiveIntelligence({ competitors }: CompetitiveIntelligenceProps) {
  const maxCitations = Math.max(...competitors.map(c => c.citations));
  const youData = competitors.find(c => c.isYou);
  const leaderData = competitors.find(c => c.isLeader);
  const gap = leaderData && youData ? leaderData.citations - youData.citations : 0;

  return (
    <Card className="bg-white rounded-2xl shadow-sm p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 
          className="text-[#005260] mb-1" 
          style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}
        >
          📊 Competitive Intelligence
        </h2>
        <p className="text-gray-500 text-sm" style={{ fontFamily: 'Open Sans' }}>
          Your Brand vs. Competitors - Citation Count Comparison
        </p>
      </div>

      {/* Bar Chart */}
      <div className="space-y-3 mb-6">
        {competitors.map((competitor) => {
          const percentage = (competitor.citations / maxCitations) * 100;
          const isYou = competitor.isYou;
          const isLeader = competitor.isLeader;
          
          return (
            <div key={competitor.name} className="space-y-2">
              {/* Label */}
              <div className="flex items-center justify-between">
                <span 
                  className={isYou ? 'text-[#02a4bf]' : 'text-gray-700'}
                  style={{ 
                    fontFamily: 'Open Sans', 
                    fontWeight: isYou ? 700 : 400,
                    fontSize: '14px'
                  }}
                >
                  {competitor.name}
                </span>
                
                <div className="flex items-center gap-2">
                  <span 
                    className={isYou ? 'text-[#02a4bf]' : 'text-gray-700'}
                    style={{ 
                      fontFamily: 'Poppins', 
                      fontWeight: 700,
                      fontSize: '20px'
                    }}
                  >
                    {competitor.citations}
                  </span>
                  {isLeader && <Trophy className="h-5 w-5 text-yellow-500" />}
                </div>
              </div>

              {/* Bar */}
              <div className="w-full h-8 bg-gray-100 rounded-lg overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-lg ${
                    isYou ? 'bg-[#02a4bf]' : 'bg-gray-400'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Gap Analysis */}
      {gap > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <p className="text-gray-700 text-sm" style={{ fontFamily: 'Open Sans' }}>
            Gap Analysis: You are{' '}
            <span className="text-red-600" style={{ fontWeight: 700 }}>
              {gap} citations behind
            </span>{' '}
            {leaderData?.name}
          </p>
        </div>
      )}
    </Card>
  );
}
