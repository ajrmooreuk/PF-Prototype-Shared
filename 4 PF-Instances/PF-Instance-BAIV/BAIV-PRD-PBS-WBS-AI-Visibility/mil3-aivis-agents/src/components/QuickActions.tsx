import { Card } from './ui/card';
import { Search, Users, PenTool, Ear, Mic, BarChart3 } from 'lucide-react';

export function QuickActions() {
  const actions = [
    { 
      icon: Search, 
      label: 'Run Discovery Audit',
      onClick: () => console.log('Navigate to Discovery Audit')
    },
    { 
      icon: Users, 
      label: 'Find New Leads',
      onClick: () => console.log('Navigate to Leads')
    },
    { 
      icon: PenTool, 
      label: 'Generate Content',
      onClick: () => console.log('Navigate to Content Studio')
    },
    { 
      icon: Ear, 
      label: 'Check Social Listening',
      onClick: () => console.log('Navigate to Social Listening')
    },
    { 
      icon: Mic, 
      label: 'Find Podcasts',
      onClick: () => console.log('Navigate to Podcasts')
    },
    { 
      icon: BarChart3, 
      label: 'Review PMF Scores',
      onClick: () => console.log('Navigate to PMF Analysis')
    }
  ];

  return (
    <Card className="p-6 bg-white rounded-2xl shadow-sm">
      <h3 
        className="text-[#000000] mb-6" 
        style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}
      >
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="bg-[#2990C6] hover:bg-[#2176AD] text-white p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#2990C6] focus:ring-offset-2 min-h-[100px]"
          >
            <action.icon className="h-6 w-6" />
            <span 
              className="text-sm text-center" 
              style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
            >
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}