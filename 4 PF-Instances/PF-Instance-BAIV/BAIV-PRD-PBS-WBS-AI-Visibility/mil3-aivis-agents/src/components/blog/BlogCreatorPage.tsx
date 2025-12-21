import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BriefCreationForm } from './BriefCreationForm';
import { BriefLibrary } from './BriefLibrary';
import { BlogManager } from './BlogManager';

export function BlogCreatorPage() {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-6">
      {/* Breadcrumb */}
      <div className="text-[#6B7280] mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
        Dashboard &gt; Content Studio &gt; Blog Creator
      </div>

      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 
            className="text-[#005260] mb-2" 
            style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}
          >
            Blog Creator
          </h1>
          <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
            Generate comprehensive 2500+ word AI-optimized blogs
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-400" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
            Last updated: 2 hours ago
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white border-b border-gray-200 p-0 mb-6 h-auto w-full justify-start rounded-none">
          <TabsTrigger 
            value="create" 
            className="data-[state=active]:bg-[#02a4bf] data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-[#6b7280] data-[state=inactive]:border-b rounded-none px-6 py-3 transition-all duration-200"
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
          >
            Create Blog
          </TabsTrigger>
          <TabsTrigger 
            value="briefs" 
            className="data-[state=active]:bg-[#02a4bf] data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-[#6b7280] data-[state=inactive]:border-b rounded-none px-6 py-3 transition-all duration-200"
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
          >
            Blog Library
          </TabsTrigger>
          <TabsTrigger 
            value="blogs" 
            className="data-[state=active]:bg-[#02a4bf] data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-[#6b7280] data-[state=inactive]:border-b rounded-none px-6 py-3 transition-all duration-200"
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
          >
            Published Blogs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <BriefCreationForm onBriefCreated={() => setActiveTab('briefs')} />
        </TabsContent>

        <TabsContent value="briefs">
          <BriefLibrary onGenerateSuccess={() => setActiveTab('blogs')} />
        </TabsContent>

        <TabsContent value="blogs">
          <BlogManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
