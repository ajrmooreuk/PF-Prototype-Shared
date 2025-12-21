import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

interface QuickActionsSectionProps {
  onNavigate?: (page: string) => void;
}

export function QuickActionsSection({ onNavigate }: QuickActionsSectionProps) {
  const actions = [
    {
      id: 'hunter',
      title: 'Hunter.io B2B Search',
      description: 'Find verified business emails and company data across industries and locations',
      icon: '🎯',
      gradient: 'from-[#02a4bf] to-[#0292a6]',
      features: [
        'B2B company search',
        'Verified email addresses',
        'Industry & size filters'
      ],
      buttonText: 'Start B2B Search',
      buttonColor: 'bg-[#02a4bf] hover:bg-[#028a9f]'
    },
    {
      id: 'google_maps',
      title: 'Google Maps Businesses',
      description: 'Scrape local businesses from Google Maps with contact details, ratings, and business hours',
      icon: '📍',
      gradient: 'from-[#10b981] to-[#059669]',
      features: [
        'Location-based search',
        'Business contact info',
        'Ratings & reviews data'
      ],
      buttonText: 'Search Local Businesses',
      buttonColor: 'bg-[#10b981] hover:bg-[#059669]'
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Campaigns',
      description: 'Find prospects from post comments or profile searches, then automate connection requests',
      icon: '💼',
      gradient: 'from-[#0077b5] to-[#005885]',
      features: [
        'Post comment scraping',
        'Profile search results',
        'Auto connection queue'
      ],
      buttonText: 'Create LinkedIn Campaign',
      buttonColor: 'bg-[#0077b5] hover:bg-[#005885]'
    }
  ];

  return (
    <div className="mb-32">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}>
          Quick Actions
        </h2>
        <button
          onClick={() => onNavigate?.('campaigns-list')}
          className="text-[#02a4bf] hover:text-[#028a9f] hover:underline text-sm"
          style={{ fontFamily: 'Open Sans' }}
        >
          View all campaigns →
        </button>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {actions.map((action) => (
          <Card 
            key={action.id}
            className="p-6 flex flex-col hover:shadow-xl hover:-translate-y-1 hover:border-2 hover:border-[#02a4bf] transition-all duration-200 cursor-pointer"
          >
            {/* Icon Circle */}
            <div 
              className={`w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-full flex items-center justify-center mb-4 shadow-lg`}
            >
              <span className="text-2xl">{action.icon}</span>
            </div>

            {/* Title */}
            <h3 className="text-[#231f20] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '17px' }}>
              {action.title}
            </h3>

            {/* Description */}
            <p className="text-[#6b7280] mb-4 line-clamp-2" style={{ fontFamily: 'Open Sans', fontSize: '13px', lineHeight: '1.5' }}>
              {action.description}
            </p>

            {/* Features List */}
            <div className="space-y-1.5 mb-5 flex-1">
              {action.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-[#02a4bf] flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-[#6b7280] text-xs leading-relaxed" style={{ fontFamily: 'Open Sans' }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button 
              onClick={() => onNavigate?.('campaigns-list')}
              className={`w-full ${action.buttonColor} text-white shadow-md hover:shadow-lg transition-all duration-200 group`}
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', height: '42px' }}
            >
              {action.buttonText}
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
