import React, { useState } from 'react';
import { Campaign } from '../CampaignsListPage';

interface Props {
  onClose: () => void;
  onSuccess: (campaign: Campaign) => void;
}

type SourceType = 'hunter_io' | 'google_maps' | 'linkedin' | null;
type Step = 'source' | 'details';

export function NewCampaignModal({ onClose, onSuccess }: Props) {
  const [step, setStep] = useState<Step>('source');
  const [selectedSource, setSelectedSource] = useState<SourceType>(null);
  const [campaignName, setCampaignName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSourceSelect = (source: SourceType) => {
    setSelectedSource(source);
  };

  const handleContinue = () => {
    if (selectedSource) {
      setStep('details');
    }
  };

  const handleBack = () => {
    setStep('source');
  };

  const handleCreate = async () => {
    if (!campaignName.trim() || !selectedSource) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newCampaign: Campaign = {
        id: `camp_${Date.now()}`,
        name: campaignName,
        source_type: selectedSource,
        status: 'queued',
        total_results: 0,
        progress: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: {
          id: 'user_1',
          name: 'Current User',
          email: 'user@company.com'
        },
        search_params: {}
      };

      onSuccess(newCampaign);
      setLoading(false);
    }, 800);
  };

  const getSourceConfig = (source: 'hunter_io' | 'google_maps' | 'linkedin') => {
    switch (source) {
      case 'hunter_io':
        return {
          icon: '🎯',
          title: 'Hunter.io B2B Search',
          description: 'Find verified business emails and company data across industries',
          features: ['B2B company search', 'Verified emails', 'Industry filters'],
          gradient: 'from-[#02a4bf] to-[#0292a6]'
        };
      case 'google_maps':
        return {
          icon: '📍',
          title: 'Google Maps Businesses',
          description: 'Scrape local businesses with contact info and ratings',
          features: ['Location search', 'Business details', 'Ratings & reviews'],
          gradient: 'from-[#10b981] to-[#059669]'
        };
      case 'linkedin':
        return {
          icon: '💼',
          title: 'LinkedIn Campaigns',
          description: 'Find prospects from posts or profile searches',
          features: ['Post comments', 'Profile search', 'Auto connections'],
          gradient: 'from-[#0077b5] to-[#005885]'
        };
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#02a4bf] to-[#028a9f] text-white p-6 relative">
            <h2 className="text-2xl mb-1">Create New Campaign</h2>
            <p className="text-white/90 text-sm">
              {step === 'source' ? 'Choose a lead source to get started' : 'Configure your campaign'}
            </p>
            
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
            >
              <span className="text-white text-xl">✕</span>
            </button>
          </div>

          {/* Body */}
          <div className="p-8 max-h-[calc(90vh-200px)] overflow-y-auto">
            {step === 'source' ? (
              <div>
                <h3 className="text-lg text-[#231f20] mb-5">Select Lead Source</h3>
                
                <div className="space-y-4">
                  {(['hunter_io', 'google_maps', 'linkedin'] as const).map(source => {
                    const config = getSourceConfig(source);
                    const isSelected = selectedSource === source;
                    
                    return (
                      <button
                        key={source}
                        onClick={() => handleSourceSelect(source)}
                        className={`w-full p-6 rounded-xl border-2 transition-all text-left flex items-center gap-5 ${
                          isSelected
                            ? 'border-[#02a4bf] bg-[#f0fdff] shadow-lg'
                            : 'border-gray-200 hover:border-[#02a4bf] hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}>
                          <span className="text-3xl">{config.icon}</span>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-[#231f20] mb-1">{config.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{config.description}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            {config.features.map(feature => (
                              <span key={feature} className="inline-flex items-center gap-1.5 text-xs text-gray-600">
                                <span className="text-[#02a4bf]">✓</span>
                                <span>{feature}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#02a4bf] mb-6 transition-colors"
                >
                  <span>←</span>
                  <span className="text-sm">Back to Source Selection</span>
                </button>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-[#231f20] mb-2">
                      Campaign Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      placeholder="e.g., B2B SaaS Companies - San Francisco"
                      className="w-full h-11 px-4 border-2 border-gray-200 rounded-lg focus:border-[#02a4bf] focus:outline-none focus:ring-3 focus:ring-[#02a4bf]/10 transition-all"
                      maxLength={100}
                    />
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">
                        {campaignName.length === 0 && 'Minimum 3 characters'}
                      </span>
                      <span className="text-xs text-gray-400">{campaignName.length}/100</span>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💡</span>
                      <div>
                        <p className="text-sm text-amber-900 mb-1">Advanced configuration available</p>
                        <p className="text-xs text-amber-700">
                          After creating this campaign, you'll be taken to the full configuration page where you can set up search parameters, filters, and other advanced options.
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedSource && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getSourceConfig(selectedSource).icon}</span>
                        <span className="text-sm text-[#231f20]">Selected Source: {getSourceConfig(selectedSource).title}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-between">
            <a 
              href="#" 
              className="text-sm text-gray-500 hover:text-[#02a4bf] hover:underline"
            >
              Need help? View guide →
            </a>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-6 h-11 border-2 border-gray-200 rounded-lg text-gray-600 hover:border-gray-400 transition-all"
              >
                Cancel
              </button>
              
              {step === 'source' ? (
                <button
                  onClick={handleContinue}
                  disabled={!selectedSource}
                  className="px-6 h-11 bg-[#02a4bf] text-white rounded-lg hover:bg-[#028a9f] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center gap-2"
                >
                  <span>Continue</span>
                  <span>→</span>
                </button>
              ) : (
                <button
                  onClick={handleCreate}
                  disabled={!campaignName.trim() || campaignName.length < 3 || loading}
                  className="px-6 h-11 bg-[#02a4bf] text-white rounded-lg hover:bg-[#028a9f] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Campaign</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
