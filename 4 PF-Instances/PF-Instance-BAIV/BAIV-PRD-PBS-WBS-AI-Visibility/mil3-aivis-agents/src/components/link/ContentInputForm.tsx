import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import { X, ChevronDown, Link2, AlertCircle } from 'lucide-react';

interface ContentInputFormProps {
  onAnalyze: (data: any) => void;
  isAnalyzing: boolean;
}

export function ContentInputForm({ onAnalyze, isAnalyzing }: ContentInputFormProps) {
  const [inputSource, setInputSource] = useState<'paste' | 'url' | 'blog'>('paste');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [selectedBlog, setSelectedBlog] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [linkType, setLinkType] = useState<'both' | 'internal' | 'external'>('both');
  const [clientId, setClientId] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [linkDensity, setLinkDensity] = useState('optimal');
  const [authorityThreshold, setAuthorityThreshold] = useState(70);

  // Mock data
  const clients = [
    { id: 'client-1', name: 'Acme Corp' },
    { id: 'client-2', name: 'TechStart Inc' },
    { id: 'client-3', name: 'Global Solutions' }
  ];

  const mockBlogs = [
    { id: 'blog-1', title: 'The Ultimate Guide to Email Marketing', excerpt: 'Learn the essential strategies...', wordCount: 1500, date: 'Nov 10, 2025' },
    { id: 'blog-2', title: 'SEO Best Practices for 2025', excerpt: 'Stay ahead with these SEO tips...', wordCount: 1200, date: 'Nov 8, 2025' }
  ];

  const addKeyword = () => {
    if (keywordInput.trim() && keywords.length < 20) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const isValid = () => {
    const hasContent = content.length >= 100 || selectedBlog || url;
    const hasKeywords = keywords.length > 0;
    const hasClient = clientId !== '';
    return hasContent && hasKeywords && hasClient;
  };

  const handleAnalyze = () => {
    if (isValid()) {
      onAnalyze({
        content,
        url,
        blogId: selectedBlog,
        keywords,
        linkType,
        clientId,
        linkDensity,
        authorityThreshold
      });
    }
  };

  return (
    <Card className="p-6 rounded-2xl shadow-sm">
      {/* Section 1: Content Input */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📝</span>
          <div>
            <h3 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
              Content to Analyze
            </h3>
            <p className="text-[#6b7280] text-xs" style={{ fontFamily: 'Open Sans' }}>
              Paste your content or select from existing blogs
            </p>
          </div>
        </div>

        {/* Input Source Tabs */}
        <Tabs value={inputSource} onValueChange={(v: any) => setInputSource(v)} className="mb-4">
          <TabsList className="bg-gray-100 p-1 rounded-lg">
            <TabsTrigger 
              value="paste" 
              className="data-[state=active]:bg-white data-[state=active]:text-[#02a4bf] data-[state=active]:border-b-2 data-[state=active]:border-[#02a4bf]"
              style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px', width: '120px' }}
            >
              Paste Text
            </TabsTrigger>
            <TabsTrigger 
              value="url"
              className="data-[state=active]:bg-white data-[state=active]:text-[#02a4bf] data-[state=active]:border-b-2 data-[state=active]:border-[#02a4bf]"
              style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px', width: '120px' }}
            >
              Enter URL
            </TabsTrigger>
            <TabsTrigger 
              value="blog"
              className="data-[state=active]:bg-white data-[state=active]:text-[#02a4bf] data-[state=active]:border-b-2 data-[state=active]:border-[#02a4bf]"
              style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px', width: '120px' }}
            >
              Select Blog
            </TabsTrigger>
          </TabsList>

          <TabsContent value="paste" className="mt-4">
            <div>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your article content here... (minimum 100 characters for accurate analysis)"
                rows={10}
                maxLength={10000}
                className="w-full"
                style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-[#6b7280]">
                  {getWordCount(content)} words
                </span>
                <span className="text-xs text-[#6b7280]">
                  {content.length}/10,000
                </span>
              </div>
              <p className="text-xs text-[#6b7280] mt-1">
                Longer content provides more link opportunities
              </p>
            </div>
          </TabsContent>

          <TabsContent value="url" className="mt-4">
            <div>
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourdomain.com/blog/article"
                className="w-full"
              />
              <p className="text-xs text-[#6b7280] mt-2">
                We'll fetch and analyze the content from this URL
              </p>
            </div>
          </TabsContent>

          <TabsContent value="blog" className="mt-4">
            <div>
              <Label className="text-xs text-[#6b7280]">Choose existing blog post</Label>
              <Select value={selectedBlog} onValueChange={setSelectedBlog}>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Select a blog..." />
                </SelectTrigger>
                <SelectContent>
                  {mockBlogs.map(blog => (
                    <SelectItem key={blog.id} value={blog.id}>
                      {blog.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedBlog && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-sm">
                    {mockBlogs.find(b => b.id === selectedBlog)?.title}
                  </p>
                  <p className="text-xs text-[#6b7280] mt-1">
                    {mockBlogs.find(b => b.id === selectedBlog)?.wordCount} words
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Section 2: Keywords & Configuration */}
      <div className="border-t border-gray-200 pt-6 mb-6">
        <h4 className="text-[#231f20] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
          Optimization Settings
        </h4>

        {/* Target Keywords */}
        <div className="mb-4">
          <Label className="flex items-center gap-1 mb-2">
            Target Keywords
            <span className="text-[#e84e1c]">*</span>
          </Label>
          <div className="border border-gray-300 rounded-lg p-3 min-h-[60px] flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <span 
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#e6f7f9] text-[#02a4bf]"
                style={{ fontSize: '13px' }}
              >
                {keyword}
                <button onClick={() => removeKeyword(index)} className="hover:text-[#e84e1c]">
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
              style={{ fontSize: '14px' }}
            />
          </div>
          <p className="text-xs text-[#6b7280] mt-1">
            {keywords.length}/20 keywords • Keywords help identify relevant link opportunities
          </p>
        </div>

        {/* Link Type Selector */}
        <div className="mb-4">
          <Label className="mb-2 block">Link Types to Suggest</Label>
          <div className="flex gap-2">
            {(['both', 'internal', 'external'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setLinkType(type)}
                className={`px-6 py-2 rounded-full transition-all ${
                  linkType === type
                    ? 'bg-[#02a4bf] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{ fontFamily: 'Open Sans', fontSize: '14px', minWidth: '140px' }}
              >
                {type === 'both' ? 'Both' : type === 'internal' ? 'Internal Only' : 'External Only'}
              </button>
            ))}
          </div>
        </div>

        {/* Client Selector */}
        <div>
          <Label className="flex items-center gap-1 mb-2">
            Client
            <span className="text-[#e84e1c]">*</span>
          </Label>
          <Select value={clientId} onValueChange={setClientId}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select client..." />
            </SelectTrigger>
            <SelectContent>
              {clients.map(client => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Section 3: Discovery Integration */}
      <div className="bg-[#e6f7f9] rounded-lg p-4 mb-6 flex gap-3">
        <span className="text-xl">🔍</span>
        <div className="flex-1">
          <h5 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
            RRF-Powered Suggestions
          </h5>
          <p className="text-xs text-[#6b7280] mt-1" style={{ fontFamily: 'Open Sans' }}>
            Using discovery audit data to prioritize high-authority internal pages and identify link gaps
          </p>
          <p className="text-xs text-[#10b981] mt-2">
            ✓ Latest audit: Nov 8, 2025
          </p>
        </div>
      </div>

      {/* Section 4: Advanced Options */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced} className="mb-6">
        <CollapsibleTrigger className="flex items-center gap-2 text-[#02a4bf] hover:text-[#018a9f]">
          <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          Show Advanced Options
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-4 space-y-4">
          {/* Link Density */}
          <div>
            <Label className="mb-2 block">Target Link Density</Label>
            <Select value={linkDensity} onValueChange={setLinkDensity}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="optimal">Optimal (1-3%)</SelectItem>
                <SelectItem value="conservative">Conservative (&lt;1%)</SelectItem>
                <SelectItem value="aggressive">Aggressive (3-5%)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-[#6b7280] mt-1">
              How many links relative to content length
            </p>
          </div>

          {/* Internal Links Priority */}
          <div>
            <Label className="mb-2 block">Prioritize internal links to:</Label>
            <div className="space-y-2">
              {['High RRF pages', 'Underlinked pages', 'Service pages', 'Blog posts'].map((option) => (
                <div key={option} className="flex items-center gap-2">
                  <Checkbox defaultChecked={option === 'High RRF pages'} />
                  <span className="text-sm">{option}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Authority Threshold */}
          <div>
            <Label className="mb-2 block">Minimum external authority score</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[authorityThreshold]}
                onValueChange={(v) => setAuthorityThreshold(v[0])}
                min={0}
                max={100}
                step={5}
                className="flex-1"
              />
              <span className="text-2xl font-bold text-[#02a4bf] w-12 text-right">
                {authorityThreshold}
              </span>
            </div>
            <p className="text-xs text-[#6b7280] mt-1">
              Higher scores = more authoritative sources
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Analyze Button */}
      <Button
        onClick={handleAnalyze}
        disabled={!isValid() || isAnalyzing}
        className="w-full h-[52px] bg-[#02a4bf] hover:bg-[#018a9f] text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
        style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
      >
        {isAnalyzing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            Analyzing content...
          </>
        ) : (
          <>
            <Link2 className="h-5 w-5 mr-2" />
            Analyze & Suggest Links
          </>
        )}
      </Button>

      {isAnalyzing && (
        <p className="text-center text-xs text-[#6b7280] mt-2">
          ~15-30 seconds
        </p>
      )}
    </Card>
  );
}
