import { useState } from 'react';
import { Copy, Check, Eye, Sparkles, ChevronDown, ChevronUp, ChevronRight, Info, ExternalLink, Edit } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import { copyToClipboard } from '../../lib/clipboard';
import { LivePreviews } from './LivePreviews';

interface GenerationResultsProps {
  data: any;
  onGenerateAgain: () => void;
  onSave: () => void;
}

export function GenerationResults({ data, onGenerateAgain, onSave }: GenerationResultsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(data);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showDiscovery, setShowDiscovery] = useState(false);
  const [showVariations, setShowVariations] = useState(true);

  const handleCopyField = async (text: string, field: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedField(null), 2000);
    } else {
      toast.error('Failed to copy to clipboard');
    }
  };

  const copyAllHTML = async () => {
    const html = `<!-- SEO Meta Tags -->
<title>${editedData.generated_title}</title>
<meta name="description" content="${editedData.meta_description}">
<link rel="canonical" href="https://yourdomain.com/${editedData.slug}">

<!-- Open Graph -->
<meta property="og:title" content="${editedData.og_title}">
<meta property="og:description" content="${editedData.og_description}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://yourdomain.com/${editedData.slug}">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${editedData.twitter_title}">
<meta name="twitter:description" content="${editedData.twitter_description}">`;
    
    const success = await copyToClipboard(html);
    if (success) {
      setCopiedField('all');
      toast.success('All meta tags copied to clipboard!');
      setTimeout(() => setCopiedField(null), 2000);
    } else {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleSave = () => {
    toast.success('Meta tags saved to library!');
    onSave();
  };

  return (
    <div className="space-y-6">
      {/* Success Banner */}
      <Card className="p-4 bg-[#ecfdf5] border-[#a7f3d0] rounded-xl">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#10b981] flex items-center justify-center">
            <Check className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[#065f46]" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 600 }}>
              Meta tags generated successfully!
            </p>
          </div>
          <Badge className="bg-[#10b981] text-white">
            ✓ Valid
          </Badge>
        </div>
      </Card>

      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <Button
          onClick={onGenerateAgain}
          variant="outline"
          className="border-[#02a4bf] text-[#02a4bf] hover:bg-[#02a4bf]/10"
          style={{ fontFamily: 'Poppins', fontSize: '14px' }}
        >
          Generate Again
        </Button>
        <div className="flex items-center gap-3">
          <Button
            onClick={copyAllHTML}
            variant="outline"
            style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy All
          </Button>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="ghost"
            className="text-[#02a4bf]"
            style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#02a4bf] hover:bg-[#018a9f] text-white"
            style={{ fontFamily: 'Poppins', fontSize: '14px' }}
          >
            Save to Library
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[55fr_40fr] gap-8">
        {/* Left Column - Results */}
        <div className="space-y-6">
          {/* SEO Title & Description */}
          <Card className="p-6 rounded-2xl shadow-sm">
            <h3 className="text-[#231f20] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
              SEO (Primary)
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    Title Tag
                  </label>
                  <button
                    onClick={() => handleCopyField(editedData.generated_title, 'title')}
                    className="text-[#02a4bf] hover:text-[#018a9f]"
                  >
                    {copiedField === 'title' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                {isEditing ? (
                  <Input
                    value={editedData.generated_title}
                    onChange={(e) => setEditedData({...editedData, generated_title: e.target.value})}
                    maxLength={60}
                    className="rounded-lg"
                  />
                ) : (
                  <p className="text-[#231f20] bg-gray-50 p-3 rounded-lg" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    {editedData.generated_title}
                  </p>
                )}
                <div className="flex justify-between mt-1">
                  <span className="text-[#10b981] text-xs flex items-center gap-1">
                    <Check className="h-3 w-3" /> Optimal length
                  </span>
                  <span className="text-[#6b7280] text-xs">{editedData.generated_title.length}/60</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    Meta Description
                  </label>
                  <button
                    onClick={() => handleCopyField(editedData.meta_description, 'description')}
                    className="text-[#02a4bf] hover:text-[#018a9f]"
                  >
                    {copiedField === 'description' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                {isEditing ? (
                  <Textarea
                    value={editedData.meta_description}
                    onChange={(e) => setEditedData({...editedData, meta_description: e.target.value})}
                    maxLength={160}
                    rows={3}
                    className="rounded-lg"
                  />
                ) : (
                  <p className="text-[#231f20] bg-gray-50 p-3 rounded-lg" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    {editedData.meta_description}
                  </p>
                )}
                <div className="flex justify-between mt-1">
                  <span className="text-[#10b981] text-xs flex items-center gap-1">
                    <Check className="h-3 w-3" /> Optimal length
                  </span>
                  <span className="text-[#6b7280] text-xs">{editedData.meta_description.length}/160</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    URL Slug
                  </label>
                  <button
                    onClick={() => handleCopyField(editedData.slug, 'slug')}
                    className="text-[#02a4bf] hover:text-[#018a9f]"
                  >
                    {copiedField === 'slug' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                {isEditing ? (
                  <Input
                    value={editedData.slug}
                    onChange={(e) => setEditedData({...editedData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
                    className="rounded-lg"
                  />
                ) : (
                  <p className="text-[#231f20] bg-gray-50 p-3 rounded-lg font-mono text-sm">
                    {editedData.slug}
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Open Graph */}
          <Card className="p-6 rounded-2xl shadow-sm">
            <h3 className="text-[#231f20] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
              Open Graph
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    og:title
                  </label>
                  <button
                    onClick={() => handleCopyField(editedData.og_title, 'og_title')}
                    className="text-[#02a4bf] hover:text-[#018a9f]"
                  >
                    {copiedField === 'og_title' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                {isEditing ? (
                  <Input
                    value={editedData.og_title}
                    onChange={(e) => setEditedData({...editedData, og_title: e.target.value})}
                    maxLength={65}
                    className="rounded-lg"
                  />
                ) : (
                  <p className="text-[#231f20] bg-gray-50 p-3 rounded-lg" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    {editedData.og_title}
                  </p>
                )}
                <span className="text-[#6b7280] text-xs float-right mt-1">{editedData.og_title.length}/65</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    og:description
                  </label>
                  <button
                    onClick={() => handleCopyField(editedData.og_description, 'og_description')}
                    className="text-[#02a4bf] hover:text-[#018a9f]"
                  >
                    {copiedField === 'og_description' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                {isEditing ? (
                  <Textarea
                    value={editedData.og_description}
                    onChange={(e) => setEditedData({...editedData, og_description: e.target.value})}
                    maxLength={200}
                    rows={3}
                    className="rounded-lg"
                  />
                ) : (
                  <p className="text-[#231f20] bg-gray-50 p-3 rounded-lg" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    {editedData.og_description}
                  </p>
                )}
                <span className="text-[#6b7280] text-xs float-right mt-1">{editedData.og_description.length}/200</span>
              </div>
            </div>
          </Card>

          {/* Twitter Card */}
          <Card className="p-6 rounded-2xl shadow-sm">
            <h3 className="text-[#231f20] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
              Twitter Card
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    twitter:title
                  </label>
                  <button
                    onClick={() => handleCopyField(editedData.twitter_title, 'twitter_title')}
                    className="text-[#02a4bf] hover:text-[#018a9f]"
                  >
                    {copiedField === 'twitter_title' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                {isEditing ? (
                  <Input
                    value={editedData.twitter_title}
                    onChange={(e) => setEditedData({...editedData, twitter_title: e.target.value})}
                    maxLength={70}
                    className="rounded-lg"
                  />
                ) : (
                  <p className="text-[#231f20] bg-gray-50 p-3 rounded-lg" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    {editedData.twitter_title}
                  </p>
                )}
                <span className="text-[#6b7280] text-xs float-right mt-1">{editedData.twitter_title.length}/70</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    twitter:description
                  </label>
                  <button
                    onClick={() => handleCopyField(editedData.twitter_description, 'twitter_description')}
                    className="text-[#02a4bf] hover:text-[#018a9f]"
                  >
                    {copiedField === 'twitter_description' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                {isEditing ? (
                  <Textarea
                    value={editedData.twitter_description}
                    onChange={(e) => setEditedData({...editedData, twitter_description: e.target.value})}
                    maxLength={200}
                    rows={3}
                    className="rounded-lg"
                  />
                ) : (
                  <p className="text-[#231f20] bg-gray-50 p-3 rounded-lg" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    {editedData.twitter_description}
                  </p>
                )}
                <span className="text-[#6b7280] text-xs float-right mt-1">{editedData.twitter_description.length}/200</span>
              </div>
            </div>
          </Card>

          {/* Variations */}
          {editedData.variations && (
            <Card className="p-6 rounded-2xl shadow-sm">
              <button
                onClick={() => setShowVariations(!showVariations)}
                className="w-full flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-2">
                  {showVariations ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  <h3 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
                    Alternative Variations
                  </h3>
                </div>
              </button>
              
              {showVariations && (
                <div className="space-y-4">
                  <div>
                    <p className="text-[#6b7280] mb-2" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                      Title Variations
                    </p>
                    {editedData.variations.titles.map((title: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg mb-2">
                        <input type="radio" name="title-variation" className="text-[#02a4bf]" />
                        <span className="flex-1 text-sm">{title}</span>
                        <Button size="sm" variant="ghost" className="text-[#02a4bf] text-xs">
                          Use This
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="text-[#6b7280] mb-2" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                      Description Variations
                    </p>
                    {editedData.variations.descriptions.map((desc: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg mb-2">
                        <input type="radio" name="desc-variation" className="text-[#02a4bf]" />
                        <span className="flex-1 text-sm">{desc}</span>
                        <Button size="sm" variant="ghost" className="text-[#02a4bf] text-xs">
                          Use This
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Impact Analysis */}
          <Card className="p-6 rounded-2xl shadow-sm">
            <h3 className="text-[#231f20] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
              Optimization Impact
            </h3>
            
            <div className="text-center mb-6 p-4 bg-gradient-to-br from-[#10b981]/10 to-[#10b981]/5 rounded-lg">
              <div className="text-[#10b981]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}>
                +{data.predicted_ctr_improvement}%
              </div>
              <p className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}>
                Predicted CTR Improvement
              </p>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                vs. previous meta tags
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {data.impact_factors.map((factor: any, i: number) => (
                <div key={i} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#231f20] capitalize text-sm font-medium">
                      {factor.factor.replace('_', ' ')}
                    </span>
                    <span className={`font-bold ${factor.score > 80 ? 'text-[#10b981]' : factor.score > 60 ? 'text-[#f59e0b]' : 'text-[#6b7280]'}`}>
                      {factor.score}/100
                    </span>
                  </div>
                  <p className="text-[#6b7280] text-xs">{factor.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Recommendations */}
          {data.recommendations && data.recommendations.length > 0 && (
            <Card className="p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">💡</span>
                <h3 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
                  AI Recommendations
                </h3>
              </div>
              
              <ul className="space-y-2">
                {data.recommendations.map((rec: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#02a4bf] mt-1">•</span>
                    <span className="text-[#231f20]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                      {rec}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Discovery Metadata */}
          {data.discovery_enhanced && (
            <Card className="p-6 rounded-2xl shadow-sm">
              <button
                onClick={() => setShowDiscovery(!showDiscovery)}
                className="w-full flex items-center justify-between"
              >
                <span className="text-[#02a4bf]" style={{ fontFamily: 'Poppins', fontSize: '14px' }}>
                  View Discovery Insights
                </span>
                {showDiscovery ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              
              {showDiscovery && (
                <div className="mt-4 space-y-2 text-sm">
                  <p><span className="font-medium">Audit ID:</span> {data.discovery_audit_id}</p>
                  <p><span className="font-medium">Audit Date:</span> {new Date(data.discovery_audit_date).toLocaleDateString()}</p>
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Right Column - Live Previews with Generated Data */}
        <LivePreviews 
          title={editedData.generated_title}
          description={editedData.meta_description}
          generated={true}
          data={editedData}
        />
      </div>
    </div>
  );
}