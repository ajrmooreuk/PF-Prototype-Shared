import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { AlertCircle, Check, ChevronDown, FileText, Zap } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { callEccoAPI } from '../../lib/eccoAPI';

interface BriefCreationFormProps {
  onBriefCreated?: () => void;
}

export function BriefCreationForm({ onBriefCreated }: BriefCreationFormProps) {
  const [sourceType, setSourceType] = useState('manual');
  const [searchPhrase, setSearchPhrase] = useState('');
  const [citationOpportunity, setCitationOpportunity] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [contentAngle, setContentAngle] = useState('');
  const [requiredSubtopics, setRequiredSubtopics] = useState('');
  const [competitorAnalysis, setCompetitorAnalysis] = useState('');
  const [citationSources, setCitationSources] = useState('');
  const [toneConstraints, setToneConstraints] = useState('');
  const [avoidTopics, setAvoidTopics] = useState('');
  const [forbiddenTopics, setForbiddenTopics] = useState('');
  const [wordCount, setWordCount] = useState([2500]);
  const [style, setStyle] = useState('how-to-guide');
  const [generateImages, setGenerateImages] = useState(true);
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [contentStrategyOpen, setContentStrategyOpen] = useState(true);
  const [competitiveOpen, setCompetitiveOpen] = useState(false);
  const [constraintsOpen, setConstraintsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSaveDraft = async () => {
    if (!searchPhrase.trim()) {
      toast.error('Search phrase is required');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await callEccoAPI('/content-studio/blog/brief', 'POST', {
        source_type: sourceType,
        search_phrase: searchPhrase,
        citation_opportunity: citationOpportunity,
        target_audience: targetAudience,
        content_angle: contentAngle,
        required_subtopics: requiredSubtopics,
        competitor_analysis: competitorAnalysis,
        citation_sources: citationSources,
        tone_constraints: toneConstraints,
        avoid_topics: avoidTopics,
        forbidden_topics: forbiddenTopics,
        word_count: wordCount[0],
        style: style,
        generate_images: generateImages,
        status: 'draft'
        // use_discovery_insights: true is auto-added
      });
      
      toast.success('Brief saved as draft');
      
      if (onBriefCreated) {
        onBriefCreated();
      }
    } catch (error) {
      console.error('Save draft error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save brief');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateBlog = async () => {
    setShowGenerateDialog(false);
    setIsSubmitting(true);

    try {
      await callEccoAPI('/content-studio/blog/generate', 'POST', {
        source_type: sourceType,
        search_phrase: searchPhrase,
        citation_opportunity: citationOpportunity,
        target_audience: targetAudience,
        content_angle: contentAngle,
        required_subtopics: requiredSubtopics,
        competitor_analysis: competitorAnalysis,
        citation_sources: citationSources,
        tone_constraints: toneConstraints,
        avoid_topics: avoidTopics,
        forbidden_topics: forbiddenTopics,
        word_count: wordCount[0],
        style: style,
        generate_images: generateImages
        // use_discovery_insights: true is auto-added
      });
      
      toast.success('Blog generation started! Check the Manage Blogs tab.');
      
      if (onBriefCreated) {
        onBriefCreated();
      }
    } catch (error) {
      console.error('Blog generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
      {/* Main Form */}
      <div className="space-y-6">
        {/* Source Selector */}
        <Card className="p-6 rounded-2xl shadow-sm">
          <Label className="text-[#005260] mb-4 block" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
            Brief Source
          </Label>
          <RadioGroup value={sourceType} onValueChange={setSourceType} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="manual" id="manual" />
              <Label htmlFor="manual" className="cursor-pointer" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Manual Entry
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="reddit" id="reddit" />
              <Label htmlFor="reddit" className="cursor-pointer" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                From Reddit Post
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bluesky" id="bluesky" />
              <Label htmlFor="bluesky" className="cursor-pointer" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                From Bluesky Post
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gap_analysis" id="gap_analysis" />
              <Label htmlFor="gap_analysis" className="cursor-pointer" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                From Gap Analysis
              </Label>
            </div>
          </RadioGroup>
        </Card>

        {/* Required Section */}
        <Card className="p-6 rounded-2xl shadow-sm">
          <h3 className="text-[#005260] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
            Required Information
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="searchPhrase" className="text-[#005260]" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                Main Topic / Search Phrase*
              </Label>
              <Input
                id="searchPhrase"
                value={searchPhrase}
                onChange={(e) => setSearchPhrase(e.target.value)}
                placeholder="e.g., Email Marketing Automation for B2B SaaS"
                maxLength={200}
                className="mt-2 rounded-lg border-gray-300 focus:border-[#02a4bf] focus:ring-[#02a4bf]/10"
                style={{ fontFamily: 'Open Sans', fontSize: '14px', padding: '12px' }}
              />
              <div className="flex justify-between mt-1">
                <p className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  This is the primary topic your blog will cover
                </p>
                <span className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  {searchPhrase.length}/200
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Content Strategy Section */}
        <Collapsible open={contentStrategyOpen} onOpenChange={setContentStrategyOpen}>
          <Card className="p-6 rounded-2xl shadow-sm">
            <CollapsibleTrigger className="w-full flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity">
              <h3 className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
                Content Strategy
              </h3>
              <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${contentStrategyOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-4 space-y-4">
              <div>
                <Label htmlFor="citationOpportunity" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  AI Citation Opportunity
                </Label>
                <Textarea
                  id="citationOpportunity"
                  value={citationOpportunity}
                  onChange={(e) => setCitationOpportunity(e.target.value)}
                  placeholder="e.g., Target ChatGPT and Claude for 'email automation' queries"
                  className="mt-2 rounded-lg border-gray-300"
                  style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                  rows={3}
                />
                <p className="text-gray-500 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  Which AI platforms and queries should this blog target?
                </p>
              </div>

              <div>
                <Label htmlFor="targetAudience" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Target Audience
                </Label>
                <Textarea
                  id="targetAudience"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g., B2B marketing managers at SaaS companies with 10-50 employees"
                  className="mt-2 rounded-lg border-gray-300"
                  style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="contentAngle" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Content Angle / Unique Perspective
                </Label>
                <Textarea
                  id="contentAngle"
                  value={contentAngle}
                  onChange={(e) => setContentAngle(e.target.value)}
                  placeholder="e.g., Practical implementation guide with real-world case studies"
                  className="mt-2 rounded-lg border-gray-300"
                  style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="requiredSubtopics" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Required Subtopics
                </Label>
                <Textarea
                  id="requiredSubtopics"
                  value={requiredSubtopics}
                  onChange={(e) => setRequiredSubtopics(e.target.value)}
                  placeholder="e.g., Workflow automation examples, tool comparisons, ROI metrics, implementation timeline"
                  className="mt-2 rounded-lg border-gray-300"
                  style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                  rows={3}
                />
                <p className="text-gray-500 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  Comma-separated or line-separated list
                </p>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Competitive Intelligence Section */}
        <Collapsible open={competitiveOpen} onOpenChange={setCompetitiveOpen}>
          <Card className="p-6 rounded-2xl shadow-sm">
            <CollapsibleTrigger className="w-full flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity">
              <h3 className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
                Competitive Intelligence
              </h3>
              <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${competitiveOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-4 space-y-4">
              <div>
                <Label htmlFor="competitorAnalysis" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Competitor Analysis
                </Label>
                <Textarea
                  id="competitorAnalysis"
                  value={competitorAnalysis}
                  onChange={(e) => setCompetitorAnalysis(e.target.value)}
                  placeholder="e.g., Competitors focus on features, we'll focus on implementation and results"
                  className="mt-2 rounded-lg border-gray-300"
                  style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="citationSources" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Preferred Citation Sources
                </Label>
                <Textarea
                  id="citationSources"
                  value={citationSources}
                  onChange={(e) => setCitationSources(e.target.value)}
                  placeholder="e.g., Industry reports (Gartner, Forrester), original research, expert interviews"
                  className="mt-2 rounded-lg border-gray-300"
                  style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                  rows={2}
                />
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Content Constraints Section */}
        <Collapsible open={constraintsOpen} onOpenChange={setConstraintsOpen}>
          <Card className="p-6 rounded-2xl shadow-sm">
            <CollapsibleTrigger className="w-full flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity">
              <h3 className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
                Content Constraints
              </h3>
              <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${constraintsOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-4 space-y-4">
              <div>
                <Label htmlFor="toneConstraints" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Tone & Style Guidelines
                </Label>
                <Textarea
                  id="toneConstraints"
                  value={toneConstraints}
                  onChange={(e) => setToneConstraints(e.target.value)}
                  placeholder="e.g., Professional but approachable, data-driven, avoid jargon"
                  className="mt-2 rounded-lg border-gray-300"
                  style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="avoidTopics" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Topics to Avoid
                </Label>
                <Textarea
                  id="avoidTopics"
                  value={avoidTopics}
                  onChange={(e) => setAvoidTopics(e.target.value)}
                  placeholder="e.g., Overly technical API details, specific competitor names"
                  className="mt-2 rounded-lg border-gray-300"
                  style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="forbiddenTopics" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Forbidden Topics (Must NOT Mention)
                </Label>
                <Textarea
                  id="forbiddenTopics"
                  value={forbiddenTopics}
                  onChange={(e) => setForbiddenTopics(e.target.value)}
                  placeholder="e.g., Specific competitor product names, pricing comparisons"
                  className="mt-2 rounded-lg border-red-200 focus:border-red-400"
                  style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                  rows={2}
                />
                <div className="flex items-center gap-2 mt-1 text-[#e84e1c]">
                  <AlertCircle className="h-4 w-4" />
                  <span style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>Content mentioning these will be rejected</span>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Generation Settings Section */}
        <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
          <Card className="p-6 rounded-2xl shadow-sm">
            <CollapsibleTrigger className="w-full flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity">
              <h3 className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
                Generation Settings
              </h3>
              <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${settingsOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-4 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                    Target Word Count
                  </Label>
                  <span className="text-[#02a4bf]" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}>
                    {wordCount[0]} words
                  </span>
                </div>
                <Slider
                  value={wordCount}
                  onValueChange={setWordCount}
                  min={500}
                  max={10000}
                  step={100}
                  className="mt-4"
                />
                <div className="flex justify-between text-gray-500 mt-2" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  <span>500</span>
                  <span>1,000</span>
                  <span>2,500</span>
                  <span>5,000</span>
                  <span>10,000</span>
                </div>
              </div>

              <div>
                <Label htmlFor="style" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Blog Style
                </Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="mt-2 rounded-lg border-gray-300" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="how-to-guide">How-to Guide</SelectItem>
                    <SelectItem value="ultimate-guide">Ultimate Guide</SelectItem>
                    <SelectItem value="best-practices">Best Practices</SelectItem>
                    <SelectItem value="comparison">Comparison Guide</SelectItem>
                    <SelectItem value="case-study">Case Study</SelectItem>
                    <SelectItem value="thought-leadership">Thought Leadership</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Sticky Actions Bar */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 mt-6 shadow-[0_-2px_8px_rgba(0,0,0,0.1)] flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isSubmitting || !searchPhrase.trim()}
            className="border-[#02a4bf] text-[#02a4bf] hover:bg-[#02a4bf]/5"
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', padding: '12px 24px' }}
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => setShowGenerateDialog(true)}
            disabled={isSubmitting || !searchPhrase.trim()}
            className="bg-[#02a4bf] hover:bg-[#028a9f] text-white shadow-md hover:scale-105 transition-transform"
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', padding: '14px 32px' }}
          >
            Create Brief & Generate Blog
          </Button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-6">
        <Card className="p-6 rounded-2xl shadow-sm sticky top-20">
          <h3 
            className="text-[#005260] mb-4" 
            style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}
          >
            What Gets Generated
          </h3>
          
          <div className="space-y-3">
            {[
              '2500+ word comprehensive article',
              'Table of Contents with anchor links',
              'FAQ section with schema markup',
              'Internal link suggestions',
              'External authoritative links',
              'AI-generated images (optional)',
              'Meta title & description',
              'SEO-optimized slug',
              'JSON-LD schema markup',
              'Estimated reading time'
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#02a4bf] flex-shrink-0 mt-1" />
                <span className="text-[#374151]" style={{ fontFamily: 'Open Sans', fontSize: '14px', lineHeight: '1.8' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-[#e5e7eb]">
            <div className="flex items-center justify-between">
              <Label htmlFor="generateImages" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Include AI-generated images
              </Label>
              <Switch
                id="generateImages"
                checked={generateImages}
                onCheckedChange={setGenerateImages}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Generate Confirmation Dialog */}
      <AlertDialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}>
              Generate Blog Now?
            </AlertDialogTitle>
            <AlertDialogDescription style={{ fontFamily: 'Open Sans', fontSize: '14px', lineHeight: '1.6' }}>
              This will use AI credits to generate a comprehensive 2500+ word blog with all components. Continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel style={{ fontFamily: 'Poppins', fontSize: '14px' }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleGenerateBlog}
              className="bg-[#02a4bf] hover:bg-[#028a9f]"
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}
            >
              Generate Blog
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
