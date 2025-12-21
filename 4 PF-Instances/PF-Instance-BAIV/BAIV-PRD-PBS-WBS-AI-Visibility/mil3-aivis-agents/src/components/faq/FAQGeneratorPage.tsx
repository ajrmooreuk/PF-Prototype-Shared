import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { GenerateTab } from './GenerateTab';
import { FAQLibrary } from './FAQLibrary';
import { ICPContextPanel } from '../content-studio/ICPContextPanel';
import type { ICPContext } from '../../lib/icpAPI';

interface FAQGeneratorPageProps {
  tenantId: string;
  jwtToken: string;
}

export function FAQGeneratorPage({ tenantId, jwtToken }: FAQGeneratorPageProps) {
  const [activeTab, setActiveTab] = useState('generate');
  const [icpEnabled, setICPEnabled] = useState(true);
  const [icpContext, setICPContext] = useState<ICPContext | null>(null);

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 max-w-[1440px] mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <div className="text-[#6B7280] mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Dashboard {'>'} Content Studio {'>'} FAQ Generator
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 
            className="text-[#000000] mb-2" 
            style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}
          >
            FAQ Generator
          </h1>
          <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
            Generate AI-optimized FAQ sections with schema markup
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white border-b border-gray-200 p-0 mb-6 h-auto w-full justify-start rounded-none">
            <TabsTrigger 
              value="generate" 
              className="data-[state=active]:bg-[#2990C6] data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-[#6b7280] data-[state=inactive]:border-b rounded-none px-6 py-3 transition-all duration-200 hover:bg-[#2990C6]/10"
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
            >
              Generate
            </TabsTrigger>
            <TabsTrigger 
              value="library" 
              className="data-[state=active]:bg-[#2990C6] data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-[#6b7280] data-[state=inactive]:border-b rounded-none px-6 py-3 transition-all duration-200 hover:bg-[#2990C6]/10"
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
            >
              FAQ Library
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <GenerateTab 
              onSuccess={() => setActiveTab('library')} 
              tenantId={tenantId}
              jwtToken={jwtToken}
              icpEnabled={icpEnabled}
              icpContext={icpContext}
            />
          </TabsContent>

          <TabsContent value="library">
            <FAQLibrary onGenerateNew={() => setActiveTab('generate')} />
          </TabsContent>
        </Tabs>
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