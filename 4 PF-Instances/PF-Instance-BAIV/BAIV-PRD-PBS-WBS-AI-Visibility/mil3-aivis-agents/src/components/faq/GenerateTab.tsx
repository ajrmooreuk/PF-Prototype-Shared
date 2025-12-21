import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { ChevronDown, X, Plus, Upload, Search } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { LivePreview } from './LivePreview';
import { GenerationResults } from './GenerationResults';
import { callEccoAPI } from '../../lib/eccoAPI';
import { calculateICPMatch, type ICPContext } from '../../lib/icpAPI';
import { ICPMatchBadge, ICPKeywordBadge } from '../content-studio/ICPMatchBadge';

interface GenerateTabProps {
  onSuccess?: () => void;
  tenantId: string;
  jwtToken: string;
  icpEnabled: boolean;
  icpContext: ICPContext | null;
}

export function GenerateTab({ onSuccess, tenantId, jwtToken, icpEnabled, icpContext }: GenerateTabProps) {
  const [topic, setTopic] = useState('');
  const [topicMatchScore, setTopicMatchScore] = useState<number | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [quantity, setQuantity] = useState([10]);
  const [competitorUrls, setCompetitorUrls] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [useDiscovery, setUseDiscovery] = useState(true);
  const [tone, setTone] = useState('professional');
  const [answerLength, setAnswerLength] = useState('standard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFAQs, setGeneratedFAQs] = useState<any>(null);
  
  const [contextOpen, setContextOpen] = useState(true);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // Calculate ICP match for topic with debounce
  useEffect(() => {
    if (!icpEnabled || !topic.trim()) {
      setTopicMatchScore(null);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      try {
        const result = await calculateICPMatch(topic, 'keyword', { tenantId, jwtToken });
        setTopicMatchScore(result.match_score);
      } catch (error) {
        console.error('Failed to calculate ICP match:', error);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [topic, icpEnabled, tenantId, jwtToken]);

  const addKeyword = () => {
    if (keywordInput.trim() && keywords.length < 10) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const addUrl = () => {
    if (urlInput.trim() && competitorUrls.length < 5) {
      try {
        new URL(urlInput);
        setCompetitorUrls([...competitorUrls, urlInput.trim()]);
        setUrlInput('');
      } catch {
        toast.error('Please enter a valid URL');
      }
    }
  };

  const removeUrl = (index: number) => {
    setCompetitorUrls(competitorUrls.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    setIsGenerating(true);

    try {
      // Call Ecco API with discovery insights
      const result = await callEccoAPI('/content-studio/faq', 'POST', {
        topic: topic.trim(),
        keywords: keywords,
        quantity: quantity[0],
        competitor_urls: competitorUrls,
        tone: tone,
        answer_length: answerLength,
        // use_discovery_insights: true is automatically added by callEccoAPI
      });

      // Transform API response to match component format
      const transformedFAQs = {
        id: result.id || 'faq_' + Date.now(),
        topic: result.topic || topic,
        questions: result.questions || result.faqs || []
      };

      setGeneratedFAQs(transformedFAQs);
      toast.success(`Generated ${transformedFAQs.questions.length} FAQs successfully`);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('FAQ Generation Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate FAQs');
    } finally {
      setIsGenerating(false);
    }
  };

  if (generatedFAQs) {
    return (
      <GenerationResults 
        faqs={generatedFAQs} 
        onGenerateMore={() => setGeneratedFAQs(null)}
        onSave={() => {
          toast.success('FAQs saved to library');
          if (onSuccess) onSuccess();
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[65fr_35fr] gap-6">
      {/* Left Column - Form */}
      <div className="space-y-6">
        {/* Topic Section */}
        <Card className="p-6 rounded-2xl shadow-sm">
          <div className="space-y-4">
            <div>
              <Label htmlFor="topic" className="text-[#005260]" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                Main Topic*
              </Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., AI Visibility Optimization"
                maxLength={255}
                className="mt-2 rounded-lg border-gray-300 focus:border-[#02a4bf] focus:ring-[#02a4bf]/10"
                style={{ fontFamily: 'Open Sans', fontSize: '14px', padding: '12px' }}
              />
              <div className="flex justify-between mt-1">
                <p className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  Main topic for FAQ generation
                </p>
                <span className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  {topic.length}/255
                </span>
              </div>
              {topicMatchScore !== null && (
                <ICPMatchBadge score={topicMatchScore} />
              )}
            </div>

            {/* Keywords Tag Input */}
            <div>
              <Label className="text-[#005260]" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                Target Keywords
              </Label>
              <div className="mt-2 border border-gray-300 rounded-lg p-3 min-h-[48px] flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#02a4bf]/10 text-[#02a4bf]"
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
                  placeholder="Type keyword and press Enter"
                  disabled={keywords.length >= 10}
                  className="flex-1 min-w-[200px] outline-none bg-transparent"
                  style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                />
              </div>
              <p className="text-gray-500 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                Add 1-10 keywords to focus FAQ generation
              </p>
              {/* ICP Keyword Suggestions */}
              {icpEnabled && icpContext?.content_guidance?.suggested_keywords && (
                <div className="mt-2">
                  <p className="text-xs text-gray-600 mb-1" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                    Suggested from ICP:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {icpContext.content_guidance.suggested_keywords.map((keyword, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (!keywords.includes(keyword) && keywords.length < 10) {
                            setKeywords([...keywords, keyword]);
                          }
                        }}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs transition-colors"
                        style={{ fontFamily: 'Open Sans', fontWeight: 500 }}
                      >
                        {keyword}
                        <ICPKeywordBadge isICPMatch={true} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Number of FAQs to Generate
                </Label>
                <span className="text-[#02a4bf]" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}>
                  {quantity[0]} questions
                </span>
              </div>
              <Slider
                value={quantity}
                onValueChange={setQuantity}
                min={1}
                max={50}
                step={1}
                className="mt-4"
              />
              <div className="flex justify-between text-gray-500 mt-2" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                <span>1</span>
                <span>10</span>
                <span>25</span>
                <span>50</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Context Sources Section */}
        <Collapsible open={contextOpen} onOpenChange={setContextOpen}>
          <Card className="p-6 rounded-2xl shadow-sm">
            <CollapsibleTrigger className="w-full flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity">
              <h3 className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
                Additional Context
              </h3>
              <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${contextOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>

            <CollapsibleContent className="mt-4 space-y-4">
              {/* Competitor URLs */}
              <div>
                <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Analyze Competitor FAQs (optional)
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://competitor.com/faq"
                    className="flex-[70] rounded-lg"
                    style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                  />
                  <Button
                    onClick={addUrl}
                    disabled={competitorUrls.length >= 5}
                    variant="outline"
                    className="flex-[28]"
                    style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add URL
                  </Button>
                </div>

                {/* URL List */}
                <div className="mt-3 space-y-2">
                  {competitorUrls.length === 0 ? (
                    <p className="text-gray-400 text-center py-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                      No competitor URLs added
                    </p>
                  ) : (
                    competitorUrls.map((url, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 truncate flex-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                          {url}
                        </span>
                        <button
                          onClick={() => removeUrl(index)}
                          className="ml-2 text-gray-500 hover:text-[#e84e1c]"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <p className="text-gray-500 mt-2" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  We'll analyze these FAQ pages to generate better questions
                </p>
              </div>

              {/* Upload Document */}
              <div>
                <Label className="block mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Upload Reference Document
                </Label>
                <input
                  type="file"
                  id="file-upload"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => document.getElementById('file-upload')?.click()}
                  variant="outline"
                  className="w-full"
                  style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File (.pdf, .docx, .txt)
                </Button>
                {uploadedFile && (
                  <div className="mt-3 flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>📄</span>
                      <div>
                        <p className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                          {uploadedFile.name}
                        </p>
                        <p className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="text-gray-500 hover:text-[#e84e1c]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                <p className="text-gray-500 mt-2" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  Optional: Upload a document to extract FAQ context
                </p>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Discovery Integration */}
        <Card className="p-4 rounded-lg bg-[#eff6ff] border border-[#bfdbfe]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔍</span>
            <p className="flex-1 text-[#1e40af]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              We'll automatically use insights from your Discovery Audit and Gap Analysis to generate relevant FAQs
            </p>
            <div className="flex items-center gap-2">
              <Label htmlFor="use-discovery" className="text-[#1e40af]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                Use Discovery Insights
              </Label>
              <Switch
                id="use-discovery"
                checked={useDiscovery}
                onCheckedChange={setUseDiscovery}
              />
            </div>
          </div>
        </Card>

        {/* Advanced Options */}
        <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
          <Card className="p-6 rounded-2xl shadow-sm">
            <CollapsibleTrigger className="w-full flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity">
              <h3 className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
                Advanced Settings
              </h3>
              <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${advancedOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>

            <CollapsibleContent className="mt-4 space-y-4">
              <div>
                <Label htmlFor="tone" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Answer Tone
                </Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="mt-2 w-[200px] rounded-lg" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="beginner-friendly">Beginner-Friendly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="answer-length" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Answer Length
                </Label>
                <Select value={answerLength} onValueChange={setAnswerLength}>
                  <SelectTrigger className="mt-2 w-[200px] rounded-lg" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concise">Concise (50-100 words)</SelectItem>
                    <SelectItem value="standard">Standard (100-150 words)</SelectItem>
                    <SelectItem value="detailed">Detailed (150-250 words)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Generate Button */}
        <div className="space-y-2">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !topic.trim()}
            className="w-full bg-[#02a4bf] hover:bg-[#028a9f] text-white shadow-md hover:scale-105 transition-transform"
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', padding: '16px' }}
          >
            {isGenerating ? 'Generating FAQs...' : 'Generate FAQs'}
          </Button>
          <p className="text-center text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
            Uses 1 AI credit per 10 FAQs
          </p>
        </div>
      </div>

      {/* Right Column - Preview */}
      <LivePreview />
    </div>
  );
}