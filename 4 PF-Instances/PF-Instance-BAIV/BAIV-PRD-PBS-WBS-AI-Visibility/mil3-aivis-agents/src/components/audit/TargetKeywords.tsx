import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowRight } from 'lucide-react';

interface Keyword {
  id: string;
  keyword: string;
  cited: boolean;
  citationCount: string;
  platforms: string[];
  bestPosition: string;
  opportunityScore: number;
}

interface TargetKeywordsProps {
  keywords: Keyword[];
}

export function TargetKeywords({ keywords }: TargetKeywordsProps) {
  const platformIcons: Record<string, string> = {
    chatgpt: '🤖',
    claude: '🧠',
    perplexity: '🔮',
    gemini: '✨'
  };

  const getOpportunityScoreColor = (score: number) => {
    if (score >= 75) return 'text-red-500';
    if (score >= 25) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <Card className="bg-white rounded-2xl shadow-sm p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 
            className="text-[#005260] mb-1" 
            style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}
          >
            🎯 Target Keywords Performance
          </h2>
          <p className="text-gray-500 text-sm" style={{ fontFamily: 'Open Sans' }}>
            Showing top 10 keywords by opportunity score
          </p>
        </div>
        
        <button 
          className="text-[#02a4bf] hover:text-[#028a9f] flex items-center gap-1 transition-colors"
          style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}
        >
          View All 25
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Keyword Cards */}
      <div className="space-y-3">
        {keywords.map((keyword) => (
          <div
            key={keyword.id}
            className="bg-[#fafafa] rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              {/* Keyword */}
              <div className="flex-1">
                <span 
                  className="text-[#005260]"
                  style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '16px' }}
                >
                  "{keyword.keyword}"
                </span>
              </div>

              {/* Citation Status and Platform Icons */}
              <div className="flex items-center gap-3">
                <Badge 
                  className={`${
                    keyword.cited 
                      ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                      : 'bg-red-100 text-red-700 hover:bg-red-100'
                  } border-0 px-3 py-1`}
                  style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
                >
                  {keyword.cited ? '🟢 Cited' : '🔴 No Citations'}
                </Badge>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                    {keyword.citationCount}
                  </span>
                  <div className="flex items-center gap-1">
                    {['chatgpt', 'claude', 'perplexity', 'gemini'].map((platform) => {
                      const isActive = keyword.platforms.includes(platform);
                      return (
                        <span 
                          key={platform}
                          className={`text-xl ${isActive ? 'opacity-100' : 'opacity-30 grayscale'}`}
                          title={platform}
                        >
                          {platformIcons[platform]}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm" style={{ fontFamily: 'Open Sans' }}>
                Best Position: <span style={{ fontWeight: 600 }}>{keyword.bestPosition}</span>
              </span>
              
              <div className="flex items-center gap-2">
                <span 
                  className={`${getOpportunityScoreColor(keyword.opportunityScore)}`}
                  style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}
                >
                  {keyword.opportunityScore}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
