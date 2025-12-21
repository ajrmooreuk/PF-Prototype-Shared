import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  User, 
  DollarSign, 
  Target, 
  TrendingUp, 
  Home,
  Heart,
  AlertCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Baby,
  Users
} from 'lucide-react';

interface ICPDiscoveryPageProps {
  tenantId?: string;
  jwtToken?: string;
}

interface ICPProfile {
  id: string;
  title: string;
  icon: any;
  demographics: {
    age: string;
    income: string;
    home: string;
    additional?: string;
  };
  psychographics: {
    values: string[];
    painPoints: string[];
    currentBehavior: string[];
  };
  discoveryJourney: {
    awareness: string[];
    consideration: string[];
    decision: string[];
  };
  customerValue: {
    lifetimeValue: string;
    acquisitionCost: string;
    ltvcacRatio: string;
  };
  aiTargeting: {
    query: string;
    platforms: string;
    contentNeeded: string;
  }[];
}

const icpProfiles: ICPProfile[] = [
  {
    id: 'quality-homeowner',
    title: 'Quality-Focused Homeowner',
    icon: Home,
    demographics: {
      age: '28-45',
      income: '$75K-150K household',
      home: 'Own'
    },
    psychographics: {
      values: [
        'Quality over price',
        'Problem-solving products',
        'Design aesthetics matter',
        'Ethical consumption'
      ],
      painPoints: [
        'Frustrated with duvet inserts wadding up',
        'Hates making the bed (lifting mattress)',
        'Significant other complaints about bedding',
        'Wants luxury that actually works'
      ],
      currentBehavior: [
        'Reads Reddit r/BuyItForLife',
        'Researches before purchasing',
        'Willing to pay premium for solutions',
        'Asks AI tools for recommendations'
      ]
    },
    discoveryJourney: {
      awareness: [
        'Google: "duvet insert keeps wadding up"',
        'Reddit: "best bedding that stays in place"',
        'ChatGPT: "luxury sheets that don\'t come untucked"'
      ],
      consideration: [
        'Compares snap systems',
        'Reads reviews',
        'Checks materials/certifications'
      ],
      decision: [
        'Price objection: $350 seems high',
        'Needs ROI justification',
        'Influenced by guarantee/trial'
      ]
    },
    customerValue: {
      lifetimeValue: '$1,200',
      acquisitionCost: '$175',
      ltvcacRatio: '6.9x'
    },
    aiTargeting: [
      {
        query: 'duvet insert keeps wadding up',
        platforms: 'ChatGPT, Perplexity',
        contentNeeded: 'Problem-solution blog + FAQ'
      },
      {
        query: 'best bedding that stays in place',
        platforms: 'ChatGPT, Perplexity',
        contentNeeded: 'Problem-solution blog + FAQ'
      },
      {
        query: 'luxury sheets that don\'t come untucked',
        platforms: 'ChatGPT, Perplexity',
        contentNeeded: 'Problem-solution blog + FAQ'
      }
    ]
  },
  {
    id: 'independent-senior',
    title: 'The Independent Senior',
    icon: Heart,
    demographics: {
      age: '55-75',
      income: '$60K-120K',
      home: 'Own',
      additional: 'Reduced mobility'
    },
    psychographics: {
      values: [
        'Independence',
        'Comfort',
        'Easy maintenance',
        'Quality lasts'
      ],
      painPoints: [
        'Cannot lift heavy mattress',
        'Making bed is exhausting',
        'Fighting with bedding at night',
        'Safety concern: tripping on sheets'
      ],
      currentBehavior: [
        'Asks adult children for help',
        'Google searches for "easy bed making"',
        'Values practicality over trends'
      ]
    },
    discoveryJourney: {
      awareness: [
        'Google: "bedding for seniors easy to use"',
        'ChatGPT: "sheets that don\'t require tucking"',
        'Word of mouth from caregiver'
      ],
      consideration: [
        'Safety/ease of use primary',
        'Price less sensitive (fixed income aware)',
        'Organic materials matter (skin sensitivity)'
      ],
      decision: [
        'Needs demonstration of ease',
        'Adult children may purchase as gift',
        'Influenced by health benefits'
      ]
    },
    customerValue: {
      lifetimeValue: '$800',
      acquisitionCost: '$125',
      ltvcacRatio: '6.4x'
    },
    aiTargeting: [
      {
        query: 'bedding for seniors easy to use',
        platforms: 'ChatGPT, Perplexity',
        contentNeeded: 'Problem-solution blog + FAQ'
      },
      {
        query: 'sheets that don\'t require tucking',
        platforms: 'ChatGPT, Perplexity',
        contentNeeded: 'Problem-solution blog + FAQ'
      },
      {
        query: 'caregiver recommended bedding',
        platforms: 'ChatGPT, Perplexity',
        contentNeeded: 'Problem-solution blog + FAQ'
      }
    ]
  },
  {
    id: 'time-strapped-parent',
    title: 'Time-Strapped Parent',
    icon: Baby,
    demographics: {
      age: '28-38',
      income: '$80K-180K',
      home: 'Own or Rent',
      additional: '1-2 young children'
    },
    psychographics: {
      values: [
        'Time efficiency',
        'Sleep quality',
        'Organic/safe materials',
        'Products that "just work"'
      ],
      painPoints: [
        'No time for complex bed making',
        'Sleep deprived - every minute counts',
        'Wants nursery bedding to stay put',
        'Safety conscious (snaps safer than ties)'
      ],
      currentBehavior: [
        'Online shopping after kids sleep',
        'Reads parenting blogs/Reddit',
        'Influenced by other parents',
        'Uses ChatGPT for product research'
      ]
    },
    discoveryJourney: {
      awareness: [
        'Google: "time saving bedding"',
        'Reddit: r/Parenting "easiest bed sheets"',
        'ChatGPT: "organic bedding that\'s easy to make"'
      ],
      consideration: [
        'Time savings quantified',
        'Safety certifications important',
        'Ease of washing/maintenance'
      ],
      decision: [
        'ROI in time saved',
        'Organic materials justify price',
        'Will buy master bedroom + nursery if works'
      ]
    },
    customerValue: {
      lifetimeValue: '$1,800',
      acquisitionCost: '$200',
      ltvcacRatio: '9.0x'
    },
    aiTargeting: [
      {
        query: 'time saving bedding',
        platforms: 'ChatGPT, Perplexity',
        contentNeeded: 'Problem-solution blog + FAQ'
      },
      {
        query: 'easiest bed sheets for parents',
        platforms: 'ChatGPT, Perplexity',
        contentNeeded: 'Problem-solution blog + FAQ'
      },
      {
        query: 'organic bedding that\'s easy to make',
        platforms: 'ChatGPT, Perplexity',
        contentNeeded: 'Problem-solution blog + FAQ'
      }
    ]
  }
];

export function ICPDiscoveryPage() {
  const [expandedICP, setExpandedICP] = useState<string | null>(icpProfiles[0].id);

  const toggleICP = (id: string) => {
    setExpandedICP(expandedICP === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-[#34ACE2]" />
            <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', color: '#000000' }}>
              ICP Discovery
            </h1>
          </div>
          <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
            Detailed analysis of your ideal customer profiles derived from Reddit research, founder insights, and competitive analysis
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-[#34ACE2]" />
              </div>
              <div>
                <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  Total ICPs Identified
                </p>
                <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px', color: '#000000' }}>
                  3
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  Avg. Lifetime Value
                </p>
                <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px', color: '#000000' }}>
                  $1,267
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-purple-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  Avg. LTV:CAC Ratio
                </p>
                <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px', color: '#000000' }}>
                  7.4x
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* ICP Profiles */}
        <div className="space-y-6">
          {icpProfiles.map((icp) => {
            const Icon = icp.icon;
            const isExpanded = expandedICP === icp.id;

            return (
              <Card key={icp.id} className="overflow-hidden border-2 hover:border-[#34ACE2] transition-all">
                {/* Header */}
                <button
                  onClick={() => toggleICP(icp.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#34ACE2] bg-opacity-10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#34ACE2]" />
                    </div>
                    <div className="text-left">
                      <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px', color: '#000000' }}>
                        {icp.title}
                      </h2>
                      <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                        LTV: {icp.customerValue.lifetimeValue} • Ratio: {icp.customerValue.ltvcacRatio}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-6 h-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-white">
                    <div className="p-6 space-y-8">
                      {/* Demographics */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <User className="w-5 h-5 text-[#34ACE2]" />
                          <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#000000' }}>
                            Demographics
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-600 mb-1" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                              Age Range
                            </p>
                            <p style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', color: '#000000' }}>
                              {icp.demographics.age}
                            </p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-600 mb-1" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                              Income
                            </p>
                            <p style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', color: '#000000' }}>
                              {icp.demographics.income}
                            </p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-600 mb-1" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                              Home Status
                            </p>
                            <p style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', color: '#000000' }}>
                              {icp.demographics.home}
                            </p>
                          </div>
                          {icp.demographics.additional && (
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <p className="text-gray-600 mb-1" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                                Additional
                              </p>
                              <p style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', color: '#000000' }}>
                                {icp.demographics.additional}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Psychographics */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="w-5 h-5 text-[#34ACE2]" />
                          <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#000000' }}>
                            Psychographics
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Values */}
                          <div>
                            <p className="text-gray-700 mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                              Values
                            </p>
                            <ul className="space-y-2">
                              {icp.psychographics.values.map((value, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-green-500 mt-1">✓</span>
                                  <span className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                                    {value}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Pain Points */}
                          <div>
                            <p className="text-gray-700 mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                              Pain Points
                            </p>
                            <ul className="space-y-2">
                              {icp.psychographics.painPoints.map((pain, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <AlertCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                                  <span className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                                    {pain}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Current Behavior */}
                          <div>
                            <p className="text-gray-700 mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                              Current Behavior
                            </p>
                            <ul className="space-y-2">
                              {icp.psychographics.currentBehavior.map((behavior, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-[#34ACE2] mt-1">→</span>
                                  <span className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                                    {behavior}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Discovery Journey */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Search className="w-5 h-5 text-[#34ACE2]" />
                          <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#000000' }}>
                            Discovery Journey
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Awareness */}
                          <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
                            <Badge className="mb-3 bg-blue-600">Awareness Stage</Badge>
                            <ul className="space-y-2">
                              {icp.discoveryJourney.awareness.map((item, idx) => (
                                <li key={idx} className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Consideration */}
                          <div className="p-5 bg-purple-50 rounded-xl border border-purple-200">
                            <Badge className="mb-3 bg-purple-600">Consideration Stage</Badge>
                            <ul className="space-y-2">
                              {icp.discoveryJourney.consideration.map((item, idx) => (
                                <li key={idx} className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Decision */}
                          <div className="p-5 bg-green-50 rounded-xl border border-green-200">
                            <Badge className="mb-3 bg-green-600">Decision Stage</Badge>
                            <ul className="space-y-2">
                              {icp.discoveryJourney.decision.map((item, idx) => (
                                <li key={idx} className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Customer Value */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <DollarSign className="w-5 h-5 text-[#34ACE2]" />
                          <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#000000' }}>
                            Customer Value
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-5 bg-gradient-to-br from-green-50 to-white rounded-xl border-2 border-green-200">
                            <p className="text-gray-600 mb-1" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                              Lifetime Value
                            </p>
                            <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px', color: '#16a34a' }}>
                              {icp.customerValue.lifetimeValue}
                            </p>
                          </div>
                          <div className="p-5 bg-gradient-to-br from-orange-50 to-white rounded-xl border-2 border-orange-200">
                            <p className="text-gray-600 mb-1" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                              Acquisition Cost Target
                            </p>
                            <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px', color: '#ea580c' }}>
                              {icp.customerValue.acquisitionCost}
                            </p>
                          </div>
                          <div className="p-5 bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-200">
                            <p className="text-gray-600 mb-1" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                              LTV:CAC Ratio
                            </p>
                            <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px', color: '#2563eb' }}>
                              {icp.customerValue.ltvcacRatio}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* AI Targeting Strategy */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Target className="w-5 h-5 text-[#34ACE2]" />
                          <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#000000' }}>
                            AI Targeting Strategy
                          </h3>
                        </div>
                        <div className="space-y-4">
                          {icp.aiTargeting.map((target, idx) => (
                            <div key={idx} className="p-5 bg-gradient-to-r from-[#17BEBB] bg-opacity-5 to-white rounded-xl border border-[#17BEBB] border-opacity-30">
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div>
                                  <p className="text-gray-600 mb-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                                    Target Query
                                  </p>
                                  <p className="text-gray-900" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                                    "{target.query}"
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-600 mb-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                                    Platform Priority
                                  </p>
                                  <p className="text-gray-900" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                                    {target.platforms}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-600 mb-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                                    Content Needed
                                  </p>
                                  <p className="text-gray-900" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                                    {target.contentNeeded}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Methodology Note */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-white border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', color: '#000000' }} className="mb-2">
                Methodology
              </h3>
              <p className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                These ideal customer profiles were derived from comprehensive Reddit research, founder insights, 
                and competitive analysis. The data reflects real customer pain points, discovery patterns, and 
                purchase behaviors observed across multiple channels.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}