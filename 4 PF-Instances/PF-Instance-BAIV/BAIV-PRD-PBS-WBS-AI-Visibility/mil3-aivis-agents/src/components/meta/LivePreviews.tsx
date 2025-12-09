import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Check, AlertTriangle, X as XIcon } from 'lucide-react';

interface LivePreviewsProps {
  title: string;
  description: string;
  generated: boolean;
  data?: any;
}

export function LivePreviews({ title, description, generated, data }: LivePreviewsProps) {
  const [socialTab, setSocialTab] = useState('facebook');

  const truncate = (text: string, max: number) => {
    if (text.length <= max) return text;
    return text.substring(0, max) + '...';
  };

  const getValidationIcon = (current: number, min: number, max: number) => {
    if (current >= min && current <= max) {
      return <span className="text-[#10b981] flex items-center gap-1"><Check className="h-3 w-3" /> Optimal length</span>;
    }
    if (current < min) {
      return <span className="text-[#f59e0b] flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Too short</span>;
    }
    return <span className="text-[#ef4444] flex items-center gap-1"><XIcon className="h-3 w-3" /> Too long</span>;
  };

  return (
    <div className="space-y-5 lg:sticky lg:top-20">
      {/* Google SERP Preview */}
      <Card className="p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 flex items-center justify-center">
            <span className="text-lg">G</span>
          </div>
          <div>
            <h3 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
              Google Search Preview
            </h3>
            <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
              Desktop view
            </p>
          </div>
        </div>

        {/* SERP Preview Box */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 
                className="text-[#1a0dab] hover:underline cursor-pointer"
                style={{ fontFamily: 'Arial', fontSize: '20px', lineHeight: '1.3' }}
              >
                {truncate(title, 60)}
              </h4>
            </div>
            <div className="flex justify-end">
              <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '11px' }}>
                {title.length}/60
              </span>
            </div>
          </div>

          <p className="text-[#006621]" style={{ fontFamily: 'Arial', fontSize: '14px' }}>
            yourdomain.com › {title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30) : 'your-url-slug'}
          </p>

          <div>
            <p 
              className="text-[#4d5156] line-clamp-2"
              style={{ fontFamily: 'Arial', fontSize: '14px', lineHeight: '1.5' }}
            >
              {truncate(description, 160)}
            </p>
            <div className="flex items-center justify-between mt-1">
              <div className="text-xs">
                {getValidationIcon(description.length, 150, 160)}
              </div>
              <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '11px' }}>
                {description.length}/160
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Social Media Previews */}
      <Card className="p-6 rounded-2xl shadow-sm">
        <h3 className="text-[#231f20] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
          Social Media Previews
        </h3>

        <Tabs value={socialTab} onValueChange={setSocialTab}>
          <TabsList className="w-full bg-gray-100 p-1 rounded-lg mb-4">
            <TabsTrigger value="facebook" className="flex-1 data-[state=active]:bg-white rounded-md" style={{ fontSize: '13px' }}>
              Facebook
            </TabsTrigger>
            <TabsTrigger value="twitter" className="flex-1 data-[state=active]:bg-white rounded-md" style={{ fontSize: '13px' }}>
              Twitter
            </TabsTrigger>
            <TabsTrigger value="linkedin" className="flex-1 data-[state=active]:bg-white rounded-md" style={{ fontSize: '13px' }}>
              LinkedIn
            </TabsTrigger>
          </TabsList>

          <TabsContent value="facebook" className="mt-0">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-100 h-32 flex items-center justify-center">
                <span className="text-gray-400 text-4xl">🖼️</span>
              </div>
              <div className="p-3 bg-white">
                <h4 className="font-bold mb-1" style={{ fontSize: '18px' }}>
                  {truncate(title, 65)}
                </h4>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {truncate(description, 200)}
                </p>
                <p className="text-gray-500 text-xs mt-2">yourdomain.com</p>
              </div>
            </div>
            <div className="flex justify-end mt-1 text-xs text-gray-500">
              {title.length}/65 • {description.length}/200
            </div>
          </TabsContent>

          <TabsContent value="twitter" className="mt-0">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-100 h-32 flex items-center justify-center">
                <span className="text-gray-400 text-4xl">🖼️</span>
              </div>
              <div className="p-3 bg-white">
                <h4 className="font-bold mb-1" style={{ fontSize: '16px' }}>
                  {truncate(title, 70)}
                </h4>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {truncate(description, 200)}
                </p>
                <p className="text-gray-500 text-xs mt-2">yourdomain.com</p>
              </div>
            </div>
            <div className="flex justify-end mt-1 text-xs text-gray-500">
              {title.length}/70 • {description.length}/200
            </div>
          </TabsContent>

          <TabsContent value="linkedin" className="mt-0">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-100 h-32 flex items-center justify-center">
                <span className="text-gray-400 text-4xl">🖼️</span>
              </div>
              <div className="p-3 bg-white">
                <h4 className="font-bold mb-1" style={{ fontSize: '18px' }}>
                  {truncate(title, 65)}
                </h4>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {truncate(description, 200)}
                </p>
                <p className="text-gray-500 text-xs mt-2">yourdomain.com</p>
              </div>
            </div>
            <div className="flex justify-end mt-1 text-xs text-gray-500">
              {title.length}/65 • {description.length}/200
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* AI Platform Optimization */}
      <Card className="p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🤖</span>
          <h3 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
            AI Platform Optimization
          </h3>
        </div>
        <p className="text-[#6b7280] mb-4" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
          How your meta tags perform on AI platforms
        </p>

        {!generated || !data ? (
          <div className="py-12 text-center">
            <div className="text-gray-300 mb-3">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                <span className="text-3xl">📊</span>
              </div>
            </div>
            <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Generate meta tags to see optimization scores
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Platform Scores */}
            {Object.entries(data.platform_optimization).map(([platform, info]: [string, any]) => (
              <div key={platform} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-sm font-bold">{platform[0].toUpperCase()}</span>
                </div>
                <div className="flex-1">
                  <p className="capitalize" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}>
                    {platform}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {info.key_elements.map((element: string, i: number) => (
                      <Badge key={i} variant="secondary" className="bg-[#e6f7f9] text-[#02a4bf] text-xs">
                        {element}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className={`text-right ${info.confidence > 0.8 ? 'text-[#10b981]' : info.confidence > 0.6 ? 'text-[#f59e0b]' : 'text-[#6b7280]'}`}>
                  <span className="font-bold text-lg">{Math.round(info.confidence * 100)}%</span>
                </div>
              </div>
            ))}

            {/* RRF Impact Score */}
            <div className="mt-6 text-center p-4 bg-gradient-to-br from-[#02a4bf]/10 to-[#005260]/10 rounded-lg">
              <div className="text-[#02a4bf] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}>
                {data.rrf_impact_score}
              </div>
              <p className="text-[#231f20] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}>
                RRF Impact Score
              </p>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                Predicted visibility improvement
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
