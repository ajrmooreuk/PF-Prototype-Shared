import { useState } from 'react';
import { QuickGenerateForm } from './QuickGenerateForm';
import { RecentBriefsTable } from './RecentBriefsTable';
import { GenerationStats } from './GenerationStats';
import { PlatformFeatures } from './PlatformFeatures';
import { QuickActionsCard } from './QuickActionsCard';
import { ViewPostsModal } from './ViewPostsModal';
import { LoadFromDiscoveryModal } from './LoadFromDiscoveryModal';

interface SocialMediaPostCreatorPageProps {
  tenantId: string;
  jwtToken: string;
}

export function SocialMediaPostCreatorPage({ tenantId, jwtToken }: SocialMediaPostCreatorPageProps) {
  const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null);
  const [showPostsModal, setShowPostsModal] = useState(false);
  const [showDiscoveryModal, setShowDiscoveryModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [prefilledData, setPrefilledData] = useState<any>(null);

  const handleBriefGenerated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleViewPosts = (briefId: string) => {
    setSelectedBriefId(briefId);
    setShowPostsModal(true);
  };

  const handleLoadFromDiscovery = () => {
    setShowDiscoveryModal(true);
  };

  const handleDiscoverySourceSelected = (data: any) => {
    setPrefilledData(data);
    setShowDiscoveryModal(false);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Breadcrumb */}
          <div className="mb-3" style={{ fontFamily: 'Open Sans' }}>
            <span className="text-[#6B7280]">Dashboard &gt; Social Media &gt; Post Creator</span>
          </div>

          {/* Title Row */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-[#000000] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                Social Media Post Creator
              </h1>
              <p className="text-[#6B7280] mb-2" style={{ fontFamily: 'Open Sans' }}>
                Generate AI-optimized posts for LinkedIn, Facebook, and Instagram from a single brief
              </p>
              <p className="text-[#6B7280] text-xs" style={{ fontFamily: 'Open Sans' }}>
                Last generated: 2 hours ago
              </p>
            </div>
            <button
              onClick={() => {
                // Scroll to Quick Generate form
                const form = document.getElementById('quick-generate-form');
                form?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="bg-[#2990C6] hover:bg-[#2176AD] text-white px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
              style={{ fontFamily: 'Poppins', fontWeight: 500 }}
            >
              Generate New Posts
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* Left Column */}
          <div className="space-y-8">
            <QuickGenerateForm
              tenantId={tenantId}
              jwtToken={jwtToken}
              onBriefGenerated={handleBriefGenerated}
              onLoadFromDiscovery={handleLoadFromDiscovery}
              prefilledData={prefilledData}
              onDataUsed={() => setPrefilledData(null)}
            />
            
            <RecentBriefsTable
              tenantId={tenantId}
              jwtToken={jwtToken}
              refreshTrigger={refreshTrigger}
              onViewPosts={handleViewPosts}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <GenerationStats tenantId={tenantId} jwtToken={jwtToken} />
            <PlatformFeatures />
            <QuickActionsCard />
          </div>
        </div>
      </div>

      {/* Modals */}
      {showPostsModal && selectedBriefId && (
        <ViewPostsModal
          briefId={selectedBriefId}
          tenantId={tenantId}
          jwtToken={jwtToken}
          onClose={() => {
            setShowPostsModal(false);
            setSelectedBriefId(null);
          }}
        />
      )}

      {showDiscoveryModal && (
        <LoadFromDiscoveryModal
          tenantId={tenantId}
          jwtToken={jwtToken}
          onClose={() => setShowDiscoveryModal(false)}
          onSelect={handleDiscoverySourceSelected}
        />
      )}
    </div>
  );
}