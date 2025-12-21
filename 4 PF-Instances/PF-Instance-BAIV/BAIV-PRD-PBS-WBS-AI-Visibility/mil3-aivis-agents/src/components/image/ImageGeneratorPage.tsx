import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { GenerateTab } from './GenerateTab';
import { GalleryTab } from './GalleryTab';
import { SettingsTab } from './SettingsTab';
import { ICPContextPanel } from '../content-studio/ICPContextPanel';
import type { ICPContext } from '../../lib/icpAPI';

interface ImageGeneratorPageProps {
  tenantId: string;
  jwtToken: string;
}

export function ImageGeneratorPage({ tenantId, jwtToken }: ImageGeneratorPageProps) {
  const [activeTab, setActiveTab] = useState('generate');
  const [galleryCount, setGalleryCount] = useState(145);
  const [icpEnabled, setICPEnabled] = useState(true);
  const [icpContext, setICPContext] = useState<ICPContext | null>(null);

  return (
    <div className="flex min-h-screen bg-[#f3f4f6]">
      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          {/* Breadcrumb */}
          <div className="text-[#6B7280] mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            Dashboard {'>'} Content Studio {'>'} Image Generator
          </div>

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 
                className="text-[#000000] mb-2" 
                style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}
              >
                Image Generator
              </h1>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
                AI-powered image creation using Nano Banana (Gemini 2.5 Flash Image)
              </p>
            </div>
            
            <button 
              className="text-[#6b7280] hover:text-[#2990C6] transition-colors"
              title="Generates brand-consistent images with your primary color (#2990C6) palette"
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
                  value="generate" 
                  className="data-[state=active]:bg-[#2990C6] data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-[#6b7280] rounded-xl px-8 py-3.5 transition-all duration-200 hover:bg-[#f0f9fb] data-[state=inactive]:hover:bg-[#f0f9fb]"
                  style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', minWidth: '160px' }}
                >
                  Generate
                </TabsTrigger>
                <TabsTrigger 
                  value="gallery" 
                  className="data-[state=active]:bg-[#2990C6] data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-[#6b7280] rounded-xl px-8 py-3.5 transition-all duration-200 hover:bg-[#f0f9fb] data-[state=inactive]:hover:bg-[#f0f9fb] flex items-center gap-2"
                  style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', minWidth: '160px' }}
                >
                  Gallery
                  <Badge 
                    variant="secondary" 
                    className="bg-[#6b7280]/10 text-[#6b7280] data-[state=active]:bg-white/20 data-[state=active]:text-white"
                  >
                    {galleryCount}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="data-[state=active]:bg-[#2990C6] data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-[#6b7280] rounded-xl px-8 py-3.5 transition-all duration-200 hover:bg-[#f0f9fb] data-[state=inactive]:hover:bg-[#f0f9fb]"
                  style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', minWidth: '160px' }}
                >
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="generate" className="mt-0">
              <GenerateTab 
                onImageGenerated={() => setActiveTab('gallery')}
                tenantId={tenantId}
                jwtToken={jwtToken}
                icpEnabled={icpEnabled}
                icpContext={icpContext}
              />
            </TabsContent>

            <TabsContent value="gallery" className="mt-0">
              <GalleryTab onGenerateNew={() => setActiveTab('generate')} />
            </TabsContent>

            <TabsContent value="settings" className="mt-0">
              <SettingsTab />
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