import { Card } from '../ui/card';
import { Progress } from '../ui/progress';

interface AuditScorecardProps {
  visibilityScore: number;
  citations: number;
  opportunities: number;
  platformsTested: number;
  queriesTested: number;
  sevenDayChange: number;
}

export function AuditScorecard({
  visibilityScore,
  citations,
  opportunities,
  platformsTested,
  queriesTested,
  sevenDayChange
}: AuditScorecardProps) {
  return (
    <Card className="bg-white rounded-2xl shadow-sm p-6">
      {/* Three Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Visibility Score */}
        <div className="text-center">
          <div className="mb-2">
            <span 
              className="text-[#02a4bf]" 
              style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '48px', lineHeight: '1' }}
            >
              {visibilityScore}
            </span>
            <span 
              className="text-gray-400 text-2xl ml-1" 
              style={{ fontFamily: 'Poppins', fontWeight: 700 }}
            >
              /100
            </span>
          </div>
          <p className="text-gray-500 text-sm" style={{ fontFamily: 'Open Sans' }}>
            Visibility Score
          </p>
        </div>

        {/* Citations */}
        <div className="text-center">
          <p 
            className="text-[#02a4bf] mb-2" 
            style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '48px', lineHeight: '1' }}
          >
            {citations}
          </p>
          <p className="text-gray-500 text-sm" style={{ fontFamily: 'Open Sans' }}>
            Citations
          </p>
          <p className="text-gray-400 text-xs mt-1" style={{ fontFamily: 'Open Sans' }}>
            Total Citations
          </p>
        </div>

        {/* Opportunities */}
        <div className="text-center">
          <p 
            className="text-[#e84e1c] mb-2" 
            style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '48px', lineHeight: '1' }}
          >
            {opportunities}
          </p>
          <p className="text-gray-500 text-sm" style={{ fontFamily: 'Open Sans' }}>
            Opportunities
          </p>
          <p className="text-gray-400 text-xs mt-1" style={{ fontFamily: 'Open Sans' }}>
            Content Gaps
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <Progress 
          value={visibilityScore} 
          className="h-3 bg-gray-200"
          style={{
            backgroundColor: '#e5e7eb'
          }}
        />
      </div>

      {/* Bottom Stats */}
      <div className="flex items-center justify-center gap-6 text-sm text-gray-500" style={{ fontFamily: 'Open Sans' }}>
        <span>📊 Platforms Tested: {platformsTested}</span>
        <span>|</span>
        <span>🎯 Queries: {queriesTested}</span>
        <span>|</span>
        <span className="text-green-600">🔄 7-Day: +{sevenDayChange}%</span>
      </div>
    </Card>
  );
}
