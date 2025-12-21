import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { X, Sparkles } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { LivePreviews } from './LivePreviews';
import { GenerationResults } from './GenerationResults';
import { callEccoAPI } from '../../lib/eccoAPI';
import { calculateICPMatch, type ICPContext } from '../../lib/icpAPI';
import { ICPMatchBadge, ICPKeywordBadge } from '../content-studio/ICPMatchBadge';

interface GenerateTabProps {
  onSave: () => void;
  tenantId: string;
  jwtToken: string;
  icpEnabled: boolean;
  icpContext: ICPContext | null;
}

export function GenerateTab({ onSave, tenantId, jwtToken, icpEnabled, icpContext }: GenerateTabProps) {
  const [clientId, setClientId] = useState('');
  const [contentTitle, setContentTitle] = useState('');
  const [titleMatchScore, setTitleMatchScore] = useState<number | null>(null);
  const [contentExcerpt, setContentExcerpt] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [useDiscovery, setUseDiscovery] = useState(true);
  const [useICP, setUseICP] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<any>(null);

  // Mock clients
  const clients = [
    { id: 'client-1', name: 'Acme Corp' },
    { id: 'client-2', name: 'TechStart Inc' },
    { id: 'client-3', name: 'Global Solutions' }
  ];

  // Calculate ICP match for title with debounce
  useEffect(() => {
    if (!icpEnabled || !contentTitle.trim()) {
      setTitleMatchScore(null);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      try {
        const result = await calculateICPMatch(contentTitle, 'title', { tenantId, jwtToken });
        setTitleMatchScore(result.match_score);
      } catch (error) {
        console.error('Failed to calculate ICP match:', error);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [contentTitle, icpEnabled, tenantId, jwtToken]);

  const addKeyword = () => {
    if (keywordInput.trim() && keywords.length < 20) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    // Validation
    if (!clientId) {
      toast.error('Please select a client');
      return;
    }
    if (!contentTitle.trim()) {
      toast.error('Content title is required');
      return;
    }
    if (!contentExcerpt.trim()) {
      toast.error('Content summary is required');
      return;
    }
    if (keywords.length === 0) {
      toast.error('At least 1 keyword is required');
      return;
    }

    setIsGenerating(true);

    try {
      // Call Ecco API with discovery insights
      const result = await callEccoAPI('/content-studio/meta', 'POST', {
        content: `${contentTitle}\n\n${contentExcerpt}`,
        page_type: 'blog_post',
        target_keywords: keywords,
        // use_discovery_insights: true is automatically added by callEccoAPI
      });

      // Transform API response to match component format
      const transformedData = {
        id: result.id || 'meta_' + Date.now(),
        client_id: clientId,
        content_title: contentTitle,
        content_excerpt: contentExcerpt,
        keywords,
        generated_title: result.title || result.generated_title || contentTitle,
        meta_description: result.description || result.meta_description || contentExcerpt,
        slug: result.slug || contentTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        og_title: result.og_title || result.title || contentTitle,
        og_description: result.og_description || result.description || contentExcerpt,
        twitter_title: result.twitter_title || result.title || contentTitle,
        twitter_description: result.twitter_description || result.description || contentExcerpt,
        variations: result.variations || {
          titles: [],
          descriptions: []
        },
        validation_status: result.validation_status || 'valid',
        predicted_ctr_improvement: result.predicted_ctr_improvement || 0,
        rrf_impact_score: result.rrf_impact_score || 0,
        platform_optimization: result.platform_optimization || {},
        impact_factors: result.impact_factors || [],
        recommendations: result.recommendations || [],
        discovery_enhanced: useDiscovery,
        discovery_audit_id: result.discovery_audit_id || null,
        discovery_audit_date: result.discovery_audit_date || null,
        created_at: result.created_at || new Date().toISOString()
      };

      setGeneratedData(transformedData);
      toast.success('Meta tags generated successfully!');
    } catch (error) {
      console.error('Meta generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate meta tags');
    } finally {
      setIsGenerating(false);
    }
  };

  if (generatedData) {
    return (
      <GenerationResults 
        data={generatedData} 
        onGenerateAgain={() => setGeneratedData(null)}
        onSave={onSave}
      />
    );
  }

  const isFormValid = clientId && contentTitle.trim() && contentExcerpt.trim() && keywords.length > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[55fr_40fr] gap-8">
      {/* Left Column - Form */}
      <div className="space-y-6">
        {/* Content Details Card */}
        <Card className="p-6 rounded-2xl shadow-sm">
          <div className="mb-6">
            <h3 className="text-[#231f20] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
              Content Details
            </h3>
            <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Provide your content information
            </p>
          </div>

          <div className="space-y-5">
            {/* Client Selector */}
            <div>
              <Label htmlFor="client" className="text-[#231f20] mb-2 flex items-center gap-1" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                Select Client
                <span className="text-[#e84e1c]">*</span>
              </Label>
              <Select value={clientId} onValueChange={setClientId}>
                <SelectTrigger className="h-11 rounded-lg border-gray-300">
                  <SelectValue placeholder="Choose client..." />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-[#6b7280] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                Meta tags will use this client's ICP profile
              </p>
            </div>

            {/* Content Title */}
            <div>
              <Label htmlFor="title" className="text-[#231f20] mb-2 flex items-center gap-1" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                Content Title
                <span className="text-[#e84e1c]">*</span>
              </Label>
              <Input
                id="title"
                value={contentTitle}
                onChange={(e) => setContentTitle(e.target.value)}
                placeholder="e.g., The Ultimate Guide to Email Marketing Automation"
                maxLength={500}
                className="h-14 rounded-lg border-gray-300 focus:border-[#02a4bf] focus:ring-[#02a4bf]/10"
                style={{ fontFamily: 'Poppins', fontSize: '16px' }}
              />
              <div className="flex justify-end mt-1">
                <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  {contentTitle.length}/500
                </span>
              </div>
              {titleMatchScore !== null && (
                <ICPMatchBadge score={titleMatchScore} />
              )}
            </div>

            {/* Content Excerpt */}
            <div>
              <Label htmlFor="excerpt" className="text-[#231f20] mb-2 flex items-center gap-1" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                Content Summary
                <span className="text-[#e84e1c]">*</span>
              </Label>
              <Textarea
                id="excerpt"
                value={contentExcerpt}
                onChange={(e) => setContentExcerpt(e.target.value)}
                placeholder="Brief summary of your content... (e.g., Learn how to implement email marketing automation that drives results. This comprehensive guide covers strategies, tools, and best practices.)"
                maxLength={2000}
                rows={5}
                className="rounded-lg border-gray-300 focus:border-[#02a4bf] focus:ring-[#02a4bf]/10"
                style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
              />
              <div className="flex justify-between mt-1">
                <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  Provide enough context for AI to generate accurate meta tags
                </p>
                <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  {contentExcerpt.length}/2000
                </span>
              </div>
            </div>

            {/* Target Keywords */}
            <div>
              <Label className="text-[#231f20] mb-2 flex items-center gap-1" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                Target Keywords
                <span className="text-[#e84e1c]">*</span>
              </Label>
              <div className="border border-gray-300 rounded-lg p-3 min-h-[48px] flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#e6f7f9] text-[#02a4bf]"
                    style={{ fontFamily: 'Open Sans', fontSize: '13px' }}
                  >
                    {keyword}
                    <button
                      onClick={() => removeKeyword(index)}
                      className="hover:text-[#e84e1c] transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addKeyword();
                    }
                  }}
                  placeholder="Type keyword and press Enter..."
                  disabled={keywords.length >= 20}
                  className="flex-1 min-w-[200px] outline-none bg-transparent"
                  style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  Add 3-10 primary keywords for optimization
                </p>
                <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  {keywords.length}/20
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Discovery Enhancement Card */}
        <Card className="p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">🔍</span>
            <h3 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
              Discovery Enhancement
            </h3>
          </div>

          <div className="space-y-4">
            {/* Use Discovery Insights Toggle */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <Switch
                    id="discovery"
                    checked={useDiscovery}
                    onCheckedChange={setUseDiscovery}
                  />
                  <Label htmlFor="discovery" className="text-[#231f20] cursor-pointer" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                    Use Discovery Insights
                  </Label>
                </div>
                <p className="text-[#6b7280] mt-1 ml-11" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  Include citation patterns and RRF data from latest discovery audit
                </p>
                {useDiscovery && (
                  <p className="text-[#6b7280] mt-1 ml-11 italic" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                    Latest audit: Nov 8, 2025
                  </p>
                )}
              </div>
            </div>

            {/* Use ICP Profile Toggle */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <Switch
                    id="icp"
                    checked={useICP}
                    onCheckedChange={setUseICP}
                  />
                  <Label htmlFor="icp" className="text-[#231f20] cursor-pointer" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                    Use ICP Profile
                  </Label>
                </div>
                <p className="text-[#6b7280] mt-1 ml-11" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  Match language to your target audience's sophistication level
                </p>
                {useICP && (
                  <p className="text-[#10b981] mt-1 ml-11 flex items-center gap-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                    <span>✓</span> ICP profile loaded
                  </p>
                )}
              </div>
            </div>

            {/* Info Box */}
            {useDiscovery && useICP && (
              <div className="bg-[#e6f7f9] rounded-lg p-4 flex items-start gap-3 mt-4">
                <span className="text-xl">🤖</span>
                <p className="text-[#005260]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                  AI will optimize meta tags for discovery patterns and your ICP's language preferences
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!isFormValid || isGenerating}
          className="w-full h-[52px] bg-[#02a4bf] hover:bg-[#018a9f] text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
          style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 mr-2" />
              Generate Meta Tags
            </>
          )}
        </Button>
        {isGenerating && (
          <p className="text-center text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
            ~10-15 seconds
          </p>
        )}
      </div>

      {/* Right Column - Live Previews */}
      <LivePreviews 
        title={contentTitle || 'Your Title Here'}
        description={contentExcerpt || 'Your meta description will appear here...'}
        generated={false}
      />
    </div>
  );
}