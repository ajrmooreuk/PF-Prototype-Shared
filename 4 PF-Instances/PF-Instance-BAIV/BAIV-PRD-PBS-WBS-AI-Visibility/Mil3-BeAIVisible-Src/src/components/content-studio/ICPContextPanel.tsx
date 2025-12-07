import { useState, useEffect } from 'react';
import { Target, ChevronDown, ChevronUp, Info, Edit, Eye, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { loadICPContext, clearICPCache, type ICPContext } from '../../lib/icpAPI';
import { toast } from 'sonner@2.0.3';

interface ICPContextPanelProps {
  tenantId: string;
  jwtToken: string;
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  onICPLoaded?: (context: ICPContext) => void;
  variant?: 'sidebar' | 'top';
}

export function ICPContextPanel({
  tenantId,
  jwtToken,
  isEnabled,
  onToggle,
  onICPLoaded,
  variant = 'sidebar'
}: ICPContextPanelProps) {
  const [icpContext, setICPContext] = useState<ICPContext | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadICP();
  }, [tenantId, jwtToken]);

  const loadICP = async () => {
    try {
      setLoading(true);
      const context = await loadICPContext({ tenantId, jwtToken });
      setICPContext(context);
      if (onICPLoaded) {
        onICPLoaded(context);
      }
    } catch (error) {
      console.error('Failed to load ICP:', error);
      toast.error('Failed to load ICP context');
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handleToggleICP = () => {
    if (isEnabled) {
      // Turning off - show confirmation
      if (confirm('Generate without ICP context? Results will be less personalized.')) {
        onToggle(false);
      }
    } else {
      // Turning on
      onToggle(true);
    }
  };

  if (loading) {
    return (
      <div className={variant === 'sidebar' ? 'w-80 p-6' : 'w-full p-6'}>
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 className="w-8 h-8 text-[#2990C6] animate-spin mb-3" />
          <p className="text-sm text-gray-500" style={{ fontFamily: 'Open Sans' }}>
            Loading ICP context...
          </p>
        </div>
      </div>
    );
  }

  if (!icpContext?.has_icp) {
    return <ICPEmptyState />;
  }

  const { icp_profile, content_guidance } = icpContext;

  if (variant === 'sidebar') {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', color: '#000000' }}>
              ICP Context
            </h3>
            <button
              onClick={handleToggleICP}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                isEnabled
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-400 text-white'
              }`}
              style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
            >
              {isEnabled ? 'Using ICP' : 'Not using ICP'}
            </button>
          </div>
          <p className="text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>
            Content personalized for your ideal customer
          </p>
        </div>

        {isEnabled && (
          <>
            {/* ICP Summary */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-[#2990C6]" />
                <span style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', color: '#000000' }}>
                  {icp_profile?.name || 'Primary ICP'}
                </span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-600" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                    Active
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-2" style={{ fontFamily: 'Open Sans' }}>
                {showFullDescription
                  ? icp_profile?.icp_description
                  : `${icp_profile?.icp_description.slice(0, 120)}...`}
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-xs text-[#2990C6] hover:underline"
                style={{ fontFamily: 'Open Sans', fontWeight: 500 }}
              >
                {showFullDescription ? 'Show less' : 'Read more'}
              </button>
            </div>

            {/* Key Attributes */}
            <div className="mb-4">
              <button
                onClick={() => toggleSection('attributes')}
                className="w-full flex items-center justify-between py-2 text-left"
              >
                <span style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px', color: '#374151' }}>
                  Key Attributes
                </span>
                {expandedSections.has('attributes') ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {expandedSections.has('attributes') && (
                <div className="space-y-3 mt-2">
                  {/* Demographics */}
                  <AttributePillGroup
                    label="Demographics"
                    items={icp_profile?.icp_attributes.demographics || []}
                    color="teal"
                  />

                  {/* Pain Points */}
                  <AttributePillGroup
                    label="Pain Points"
                    items={icp_profile?.icp_attributes.pain_points || []}
                    color="red"
                  />

                  {/* Goals */}
                  <AttributePillGroup
                    label="Goals"
                    items={icp_profile?.icp_attributes.goals || []}
                    color="green"
                  />
                </div>
              )}
            </div>

            {/* Content Guidance */}
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-[#2990C6]" />
                <span style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '12px', color: '#374151' }}>
                  Content Guidance
                </span>
              </div>

              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#2990C6] rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>
                    <strong>Keywords:</strong> {content_guidance?.suggested_keywords.join(', ')}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#2990C6] rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>
                    <strong>Pain Point:</strong> {content_guidance?.primary_pain_point}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#2990C6] rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>
                    <strong>Audience:</strong> {content_guidance?.target_audience}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#2990C6] rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>
                    <strong>Tone:</strong> {content_guidance?.recommended_tone}
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full h-8 text-xs"
                onClick={() => window.open('/settings?tab=icp', '_blank')}
                style={{ fontFamily: 'Poppins', fontWeight: 500 }}
              >
                <Edit className="w-3 h-3 mr-2" />
                Edit ICP Profile
              </Button>
              <Button
                variant="outline"
                className="w-full h-8 text-xs"
                onClick={() => window.open('/settings?tab=icp', '_blank')}
                style={{ fontFamily: 'Poppins', fontWeight: 500 }}
              >
                <Eye className="w-3 h-3 mr-2" />
                View Full ICP
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Top variant (collapsible)
  return (
    <div className="w-full mb-6">
      <div className={`bg-blue-50 rounded-xl p-5 ${!expandedSections.has('top') ? 'cursor-pointer' : ''}`}>
        <div
          className="flex items-center justify-between"
          onClick={() => !expandedSections.has('top') && toggleSection('top')}
        >
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-[#2990C6]" />
            <div>
              <span style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px', color: '#000000' }}>
                Using ICP: {icp_profile?.icp_attributes.demographics[0]} ({icp_profile?.icp_attributes.demographics[2]})
              </span>
              <p className="text-xs text-gray-600 mt-0.5" style={{ fontFamily: 'Open Sans' }}>
                Targeting: {icp_profile?.icp_attributes.pain_points.slice(0, 2).join(', ')}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSection('top');
            }}
            className="text-[#2990C6] text-sm flex items-center gap-1"
            style={{ fontFamily: 'Open Sans', fontWeight: 500 }}
          >
            {expandedSections.has('top') ? 'Collapse' : 'Expand'}
            {expandedSections.has('top') ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {expandedSections.has('top') && (
          <div className="grid grid-cols-2 gap-6 mt-6 pt-6 border-t border-blue-200">
            <div>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px', color: '#000000' }} className="mb-3">
                ICP Summary
              </h4>
              <p className="text-sm text-gray-700 mb-4" style={{ fontFamily: 'Open Sans' }}>
                {icp_profile?.icp_description}
              </p>

              <div className="space-y-3">
                <AttributePillGroup
                  label="Demographics"
                  items={icp_profile?.icp_attributes.demographics || []}
                  color="teal"
                />
                <AttributePillGroup
                  label="Pain Points"
                  items={icp_profile?.icp_attributes.pain_points || []}
                  color="red"
                />
                <AttributePillGroup
                  label="Goals"
                  items={icp_profile?.icp_attributes.goals || []}
                  color="green"
                />
              </div>
            </div>

            <div>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px', color: '#000000' }} className="mb-3">
                Content Guidance
              </h4>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#2990C6] rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
                    <strong>Keywords:</strong> {content_guidance?.suggested_keywords.join(', ')}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#2990C6] rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
                    <strong>Pain Point:</strong> {content_guidance?.primary_pain_point}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#2990C6] rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
                    <strong>Audience:</strong> {content_guidance?.target_audience}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#2990C6] rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
                    <strong>Tone:</strong> {content_guidance?.recommended_tone}
                  </span>
                </li>
              </ul>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('/settings?tab=icp', '_blank')}
                  style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                >
                  <Edit className="w-3 h-3 mr-2" />
                  Edit ICP
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('/settings?tab=icp', '_blank')}
                  style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                >
                  <Eye className="w-3 h-3 mr-2" />
                  View Full ICP
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Attribute Pill Group Component
function AttributePillGroup({
  label,
  items,
  color
}: {
  label: string;
  items: string[];
  color: 'teal' | 'red' | 'green';
}) {
  const maxVisible = 3;
  const visibleItems = items.slice(0, maxVisible);
  const remaining = items.length - maxVisible;

  const colorClasses = {
    teal: 'bg-blue-50 text-blue-700',
    red: 'bg-red-50 text-red-700',
    green: 'bg-green-50 text-green-700'
  };

  return (
    <div>
      <div className="text-xs uppercase text-gray-500 mb-1.5" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {visibleItems.map((item, index) => (
          <span
            key={index}
            className={`px-2 py-1 rounded-full text-xs ${colorClasses[color]}`}
            style={{ fontFamily: 'Poppins', fontWeight: 500 }}
          >
            {item}
          </span>
        ))}
        {remaining > 0 && (
          <span
            className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
            style={{ fontFamily: 'Poppins', fontWeight: 500 }}
          >
            +{remaining} more
          </span>
        )}
      </div>
    </div>
  );
}

// Empty State Component
function ICPEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <div className="text-6xl mb-4">🎯</div>
      <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px', color: '#374151' }} className="mb-2">
        No ICP Profile Defined
      </h3>
      <p className="text-center text-gray-600 mb-6 max-w-md" style={{ fontFamily: 'Open Sans', fontSize: '15px' }}>
        Define your ideal customer profile to unlock:
      </p>
      <ul className="text-sm text-gray-600 mb-6 space-y-2" style={{ fontFamily: 'Open Sans' }}>
        <li className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#2990C6] rounded-full" />
          Personalized content generation
        </li>
        <li className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#2990C6] rounded-full" />
          Higher relevance scores
        </li>
        <li className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#2990C6] rounded-full" />
          Better discovery filtering
        </li>
      </ul>
      <Button
        onClick={() => (window.location.href = '/settings?tab=icp')}
        className="bg-[#2990C6] hover:bg-[#2176AD] text-white h-12"
        style={{ fontFamily: 'Poppins', fontWeight: 500 }}
      >
        Create ICP Profile
      </Button>
    </div>
  );
}
