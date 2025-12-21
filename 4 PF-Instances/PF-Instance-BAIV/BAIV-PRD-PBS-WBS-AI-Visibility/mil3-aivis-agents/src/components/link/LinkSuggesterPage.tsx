import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { AnalyzeContentTab } from './AnalyzeContentTab';
import { SuggestionsLibrary } from './SuggestionsLibrary';
import { ICPContextPanel } from '../content-studio/ICPContextPanel';
import type { ICPContext } from '../../lib/icpAPI';

interface LinkSuggesterPageProps {
  tenantId: string;
  jwtToken: string;
}

export function LinkSuggesterPage({ tenantId, jwtToken }: LinkSuggesterPageProps) {
  const [activeTab, setActiveTab] = useState('analyze');
  const [suggestionsCount, setSuggestionsCount] = useState(23);
  const [icpEnabled, setICPEnabled] = useState(true);
  const [icpContext, setICPContext] = useState<ICPContext | null>(null);

  return (
    <div className="flex min-h-screen bg-[#f3f4f6]">
      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          {/* Breadcrumb */}
          <div className="text-[#6B7280] mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            Dashboard {'>'} Content Studio {'>'} Link Suggester
          </div>

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 
                className="text-[#000000] mb-2" 
                style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}
              >
                Link Suggester
              </h1>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
                AI-powered internal and external link recommendations with RRF optimization
              </p>
            </div>
            
            <button 
              className="text-[#6b7280] hover:text-[#2990C6] transition-colors"
              title="Uses RRF scores from discovery audit to prioritize high-authority pages for internal linking"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-white rounded-2xl p-1 inline-flex mb-6">
              <TabsList className="bg-transparent p-0 h-auto gap-2">
                <TabsTrigger 
                  value="analyze" 
                  className="data-[state=active]:bg-[#2990C6] data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-[#6b7280] rounded-xl px-8 py-3.5 transition-all duration-200 hover:bg-[#f0f9fb] data-[state=inactive]:hover:bg-[#f0f9fb]"
                  style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', minWidth: '200px' }}
                >
                  Analyze Content
                </TabsTrigger>
                <TabsTrigger 
                  value="library" 
                  className="data-[state=active]:bg-[#2990C6] data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-[#6b7280] rounded-xl px-8 py-3.5 transition-all duration-200 hover:bg-[#f0f9fb] data-[state=inactive]:hover:bg-[#f0f9fb] flex items-center gap-2"
                  style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', minWidth: '200px' }}
                >
                  Suggestions Library
                  <Badge 
                    variant="secondary" 
                    className="bg-[#6b7280]/10 text-[#6b7280] data-[state=active]:bg-white/20 data-[state=active]:text-white"
                  >
                    {suggestionsCount}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="analyze" className="mt-0">
              <AnalyzeContentTab 
                onSave={() => setActiveTab('library')}
                tenantId={tenantId}
                jwtToken={jwtToken}
                icpEnabled={icpEnabled}
                icpContext={icpContext}
              />
            </TabsContent>

            <TabsContent value="library" className="mt-0">
              <SuggestionsLibrary onAnalyzeNew={() => setActiveTab('analyze')} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* ICP Context Panel - Right Sidebar */}
      <ICPContextPanel
        tenantId={tenantId}
        jwtToken={jwtToken}
        isEnabled={icpEnabled}
        onToggle={setICPEnabled}
        onICPLoaded={setICPContext}
        variant="sidebar"
      />
    </div>
  );
}