import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface Opportunity {
  id: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  estimated_impact: string;
}

interface TopOpportunitiesProps {
  opportunities: Opportunity[];
}

export function TopOpportunities({ opportunities }: TopOpportunitiesProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-[#DC2626] text-white hover:bg-[#DC2626]';
      case 'MEDIUM':
        return 'bg-[#F59E0B] text-white hover:bg-[#F59E0B]';
      case 'LOW':
        return 'bg-[#3B82F6] text-white hover:bg-[#3B82F6]';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const displayOpportunities = opportunities.slice(0, 5);

  return (
    <Card className="p-6 bg-white rounded-2xl shadow-sm mt-6">
      <h2 
        className="text-[#000000] mb-1" 
        style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}
      >
        Top Opportunities
      </h2>
      <p className="text-gray-500 text-sm mb-6" style={{ fontFamily: 'Open Sans' }}>
        High-impact content gaps to address
      </p>

      <div className="space-y-0">
        {displayOpportunities.map((opportunity, index) => (
          <div 
            key={opportunity.id}
            className={`flex items-center gap-4 py-4 px-4 -mx-4 hover:bg-gray-50 transition-colors duration-200 ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
            }`}
          >
            {/* Priority Badge */}
            <Badge 
              className={`${getPriorityColor(opportunity.priority)} px-3 py-1 rounded-full`}
              style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '12px' }}
            >
              {opportunity.priority}
            </Badge>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p 
                className="text-[#000000] mb-1" 
                style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}
              >
                {opportunity.title}
              </p>
              <p className="text-gray-500 text-xs" style={{ fontFamily: 'Open Sans' }}>
                {opportunity.estimated_impact}
              </p>
            </div>

            {/* Action Button */}
            <Button
              size="sm"
              className="bg-[#2990C6] hover:bg-[#2176AD] text-white transition-all duration-200 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#2990C6] focus:ring-offset-2"
              style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
            >
              Generate Content
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}