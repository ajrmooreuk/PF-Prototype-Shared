import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Card } from '../ui/card';
import { toast } from 'sonner@2.0.3';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Edit, 
  Plus,
  GripVertical,
  Rocket,
  Building2,
  Users,
  Globe,
  Target,
  TrendingUp,
  FileCheck,
  Sparkles,
  Lightbulb
} from 'lucide-react';
import { callEccoAPI, discoveryIntelligenceAPI } from '../../lib/eccoAPI';

interface OnboardingData {
  // Step 1
  brandName: string;
  industry: string;
  website: string;
  brandDescription: string;
  
  // Step 2
  targetCustomer: string;
  companySize: string;
  mainChallenges: string;
  searchPlatforms: string[];
  
  // Step 3
  activePlatforms: string[];
  contentTypes: string[];
  updateFrequency: string;
  brandVoice: string;
  
  // Step 4
  aiVisibilityScores: {
    chatgpt: number;
    claude: number;
    perplexity: number;
    gemini: number;
  };
  missingPlatforms: string[];
  quickWins: string[];
  customQuickWins: string[];
  
  // Step 5
  successVision: string;
  priorityPlatforms: string[];
  threeMonthGoals: string;
  sixMonthGoals: string;
  twelveMonthGoals: string;
  
  // Step 6
  confirmed: boolean;
}

interface VisibilityOnboardingFlowProps {
  tenantId: string;
  jwtToken: string;
  onComplete: () => void;
}

export function VisibilityOnboardingFlow({ tenantId, jwtToken, onComplete }: VisibilityOnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    brandName: '',
    industry: '',
    website: '',
    brandDescription: '',
    targetCustomer: '',
    companySize: '',
    mainChallenges: '',
    searchPlatforms: [],
    activePlatforms: [],
    contentTypes: [],
    updateFrequency: '',
    brandVoice: '',
    aiVisibilityScores: {
      chatgpt: 0,
      claude: 0,
      perplexity: 0,
      gemini: 0
    },
    missingPlatforms: [],
    quickWins: [],
    customQuickWins: [],
    successVision: '',
    priorityPlatforms: [],
    threeMonthGoals: '',
    sixMonthGoals: '',
    twelveMonthGoals: '',
    confirmed: false
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      // Try to load existing onboarding data or discovery intelligence
      const intelligence = await discoveryIntelligenceAPI.getPlatformVisibility().catch(() => null);
      
      if (intelligence) {
        // Pre-fill from discovery data
        const platforms = intelligence.platforms || {};
        
        setData(prev => ({
          ...prev,
          brandName: prev.brandName || 'Your Brand',
          website: prev.website || 'https://yourbrand.com',
          brandDescription: prev.brandDescription || 'AI-powered solutions for modern businesses',
          aiVisibilityScores: {
            chatgpt: platforms.ChatGPT?.citation_count || 0,
            claude: platforms.Claude?.citation_count || 0,
            perplexity: platforms.Perplexity?.citation_count || 0,
            gemini: platforms.Gemini?.citation_count || 0
          }
        }));
      }
    } catch (error) {
      console.error('Failed to load initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const autoSave = async (field: string, value: any) => {
    setSaving(true);
    try {
      // Auto-save to backend
      await new Promise(resolve => setTimeout(resolve, 500)); // Debounce
      console.log('Auto-saved:', field, value);
      // TODO: Implement actual API call when endpoint is ready
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
    autoSave(field, value);
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleComplete = async () => {
    if (!data.confirmed) {
      toast.error('Please confirm your information is accurate');
      return;
    }

    try {
      setSaving(true);
      // Save final onboarding data
      // TODO: Implement API call when endpoint is ready
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Onboarding complete! Welcome to BAIV 🚀');
      onComplete();
    } catch (error: any) {
      console.error('Failed to complete onboarding:', error);
      toast.error('Failed to complete onboarding');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066FF] mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: 'Open Sans' }}>Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
              Step {currentStep} of 6
            </span>
            <span className="text-sm text-gray-500" style={{ fontFamily: 'Open Sans' }}>
              {saving && '💾 Saving...'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#0066FF] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-white p-8 rounded-xl shadow-sm">
          {currentStep === 1 && (
            <Step1BrandFoundation 
              data={data} 
              updateField={updateField}
            />
          )}
          
          {currentStep === 2 && (
            <Step2IdealCustomer 
              data={data} 
              updateField={updateField}
            />
          )}
          
          {currentStep === 3 && (
            <Step3OnlinePresence 
              data={data} 
              updateField={updateField}
            />
          )}
          
          {currentStep === 4 && (
            <Step4AIVisibilityGaps 
              data={data} 
              updateField={updateField}
            />
          )}
          
          {currentStep === 5 && (
            <Step5Goals 
              data={data} 
              updateField={updateField}
            />
          )}
          
          {currentStep === 6 && (
            <Step6Confirmation 
              data={data} 
              updateField={updateField}
              onComplete={handleComplete}
              saving={saving}
            />
          )}
        </Card>

        {/* Navigation Buttons */}
        {currentStep < 6 && (
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-6"
            >
              {currentStep === 5 ? 'Review' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// STEP 1: Brand Foundation
function Step1BrandFoundation({ data, updateField }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#1a1a1a' }}>
          Let's start with the basics
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
          Tell us about your brand
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <Label htmlFor="brandName" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Brand Name
          </Label>
          <Input
            id="brandName"
            value={data.brandName}
            onChange={(e) => updateField('brandName', e.target.value)}
            placeholder="Enter your brand name"
            className="text-base"
            style={{ fontFamily: 'Open Sans' }}
          />
        </div>

        <div>
          <Label htmlFor="industry" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Industry
          </Label>
          <Select value={data.industry} onValueChange={(value) => updateField('industry', value)}>
            <SelectTrigger id="industry" className="text-base" style={{ fontFamily: 'Open Sans' }}>
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="consulting">Consulting</SelectItem>
              <SelectItem value="marketing">Marketing & Advertising</SelectItem>
              <SelectItem value="saas">SaaS</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="website" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Primary Website
          </Label>
          <Input
            id="website"
            type="url"
            value={data.website}
            onChange={(e) => updateField('website', e.target.value)}
            placeholder="https://yourbrand.com"
            className="text-base"
            style={{ fontFamily: 'Open Sans' }}
          />
        </div>

        <div>
          <Label htmlFor="brandDescription" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Brand Description
          </Label>
          <Textarea
            id="brandDescription"
            value={data.brandDescription}
            onChange={(e) => updateField('brandDescription', e.target.value)}
            placeholder="Describe what your brand does..."
            rows={4}
            className="text-base resize-none"
            style={{ fontFamily: 'Open Sans' }}
          />
          <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Open Sans' }}>
            AI-generated from your website. Edit as needed.
          </p>
        </div>
      </div>
    </div>
  );
}

// STEP 2: Ideal Customer
function Step2IdealCustomer({ data, updateField }: any) {
  const toggleSearchPlatform = (platform: string) => {
    const current = data.searchPlatforms || [];
    const updated = current.includes(platform)
      ? current.filter((p: string) => p !== platform)
      : [...current, platform];
    updateField('searchPlatforms', updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#1a1a1a' }}>
          Who do you serve?
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
          Help us understand your ideal customer
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <Label htmlFor="targetCustomer" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Who do you help?
          </Label>
          <Input
            id="targetCustomer"
            value={data.targetCustomer}
            onChange={(e) => updateField('targetCustomer', e.target.value)}
            placeholder="e.g., B2B Marketing Directors"
            className="text-base"
            style={{ fontFamily: 'Open Sans' }}
          />
        </div>

        <div>
          <Label htmlFor="companySize" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Company size they work at
          </Label>
          <Select value={data.companySize} onValueChange={(value) => updateField('companySize', value)}>
            <SelectTrigger id="companySize" className="text-base" style={{ fontFamily: 'Open Sans' }}>
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10 employees</SelectItem>
              <SelectItem value="11-50">11-50 employees</SelectItem>
              <SelectItem value="51-200">51-200 employees</SelectItem>
              <SelectItem value="201-500">201-500 employees</SelectItem>
              <SelectItem value="500+">500+ employees</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="mainChallenges" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Their main challenges
          </Label>
          <Textarea
            id="mainChallenges"
            value={data.mainChallenges}
            onChange={(e) => updateField('mainChallenges', e.target.value)}
            placeholder="What problems do they face?"
            rows={4}
            className="text-base resize-none"
            style={{ fontFamily: 'Open Sans' }}
          />
        </div>

        <div>
          <Label className="text-sm mb-3 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Where they search for solutions
          </Label>
          <div className="space-y-2">
            {['Google Search', 'ChatGPT', 'Claude', 'Perplexity', 'LinkedIn', 'Industry Forums', 'YouTube'].map(platform => (
              <div key={platform} className="flex items-center">
                <Checkbox
                  id={`search-${platform}`}
                  checked={(data.searchPlatforms || []).includes(platform)}
                  onCheckedChange={() => toggleSearchPlatform(platform)}
                />
                <label
                  htmlFor={`search-${platform}`}
                  className="ml-3 text-sm cursor-pointer"
                  style={{ fontFamily: 'Open Sans' }}
                >
                  {platform}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// STEP 3: Online Presence
function Step3OnlinePresence({ data, updateField }: any) {
  const togglePlatform = (platform: string) => {
    const current = data.activePlatforms || [];
    const updated = current.includes(platform)
      ? current.filter((p: string) => p !== platform)
      : [...current, platform];
    updateField('activePlatforms', updated);
  };

  const toggleContentType = (type: string) => {
    const current = data.contentTypes || [];
    const updated = current.includes(type)
      ? current.filter((t: string) => t !== type)
      : [...current, type];
    updateField('contentTypes', updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#1a1a1a' }}>
          Where are you active today?
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
          Tell us about your current online presence
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <Label className="text-sm mb-3 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Current Platforms
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {['Website', 'LinkedIn', 'Twitter/X', 'YouTube', 'Blog', 'Facebook', 'Instagram', 'TikTok'].map(platform => (
              <div
                key={platform}
                onClick={() => togglePlatform(platform)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  (data.activePlatforms || []).includes(platform)
                    ? 'border-[#0066FF] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                    {platform}
                  </span>
                  {(data.activePlatforms || []).includes(platform) && (
                    <CheckCircle2 className="w-5 h-5 text-[#0066FF]" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm mb-3 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Content Types You Create
          </Label>
          <div className="space-y-2">
            {['Blog posts', 'Videos', 'Podcasts', 'Social media', 'Whitepapers', 'Case studies', 'Webinars', 'Email newsletters'].map(type => (
              <div key={type} className="flex items-center">
                <Checkbox
                  id={`content-${type}`}
                  checked={(data.contentTypes || []).includes(type)}
                  onCheckedChange={() => toggleContentType(type)}
                />
                <label
                  htmlFor={`content-${type}`}
                  className="ml-3 text-sm cursor-pointer"
                  style={{ fontFamily: 'Open Sans' }}
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="updateFrequency" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Update Frequency
          </Label>
          <Select value={data.updateFrequency} onValueChange={(value) => updateField('updateFrequency', value)}>
            <SelectTrigger id="updateFrequency" className="text-base" style={{ fontFamily: 'Open Sans' }}>
              <SelectValue placeholder="How often do you publish?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="biweekly">Bi-weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="brandVoice" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Brand Voice/Tone
          </Label>
          <Select value={data.brandVoice} onValueChange={(value) => updateField('brandVoice', value)}>
            <SelectTrigger id="brandVoice" className="text-base" style={{ fontFamily: 'Open Sans' }}>
              <SelectValue placeholder="Select your brand voice" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="authoritative">Authoritative</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

// STEP 4: AI Visibility Gaps
function Step4AIVisibilityGaps({ data, updateField }: any) {
  const [newPlatform, setNewPlatform] = useState('');
  const [newQuickWin, setNewQuickWin] = useState('');

  const updateScore = (platform: keyof typeof data.aiVisibilityScores, value: number) => {
    updateField('aiVisibilityScores', {
      ...data.aiVisibilityScores,
      [platform]: value
    });
  };

  const toggleMissingPlatform = (platform: string) => {
    const current = data.missingPlatforms || [];
    const updated = current.includes(platform)
      ? current.filter((p: string) => p !== platform)
      : [...current, platform];
    updateField('missingPlatforms', updated);
  };

  const toggleQuickWin = (win: string) => {
    const current = data.quickWins || [];
    const updated = current.includes(win)
      ? current.filter((w: string) => w !== win)
      : [...current, win];
    updateField('quickWins', updated);
  };

  const addCustomQuickWin = () => {
    if (newQuickWin.trim()) {
      const current = data.customQuickWins || [];
      updateField('customQuickWins', [...current, newQuickWin.trim()]);
      setNewQuickWin('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#1a1a1a' }}>
          Your current AI visibility
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
          Let's identify gaps and opportunities
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-sm mb-3 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Where AI finds you today
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(['chatgpt', 'claude', 'perplexity', 'gemini'] as const).map(platform => (
              <Card key={platform} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="capitalize" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                    {platform === 'chatgpt' ? 'ChatGPT' : platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </span>
                  <span className="text-2xl" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                    {data.aiVisibilityScores[platform]}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={data.aiVisibilityScores[platform]}
                  onChange={(e) => updateScore(platform, parseInt(e.target.value))}
                  className="w-full"
                />
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm mb-3 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Where you're missing
          </Label>
          <div className="space-y-2">
            {[
              { name: 'SearchGPT', priority: 'High' },
              { name: 'Bing Copilot', priority: 'Medium' },
              { name: 'Google Gemini Advanced', priority: 'Medium' },
              { name: 'You.com', priority: 'Low' }
            ].map(({ name, priority }) => (
              <div key={name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <Checkbox
                    id={`missing-${name}`}
                    checked={(data.missingPlatforms || []).includes(name)}
                    onCheckedChange={() => toggleMissingPlatform(name)}
                  />
                  <label
                    htmlFor={`missing-${name}`}
                    className="ml-3 text-sm cursor-pointer"
                    style={{ fontFamily: 'Open Sans' }}
                  >
                    {name}
                  </label>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  priority === 'High' ? 'bg-red-100 text-red-700' :
                  priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`} style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  {priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm mb-3 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Quick Wins Identified
          </Label>
          <div className="space-y-2">
            {[
              { name: 'Add schema markup', impact: 'High' },
              { name: 'Create FAQ page', impact: 'High' },
              { name: 'Optimize content for citations', impact: 'Medium' },
              { name: 'Improve meta descriptions', impact: 'Medium' }
            ].map(({ name, impact }) => (
              <div key={name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <Checkbox
                    id={`quickwin-${name}`}
                    checked={(data.quickWins || []).includes(name)}
                    onCheckedChange={() => toggleQuickWin(name)}
                  />
                  <label
                    htmlFor={`quickwin-${name}`}
                    className="ml-3 text-sm cursor-pointer"
                    style={{ fontFamily: 'Open Sans' }}
                  >
                    {name}
                  </label>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  impact === 'High' ? 'bg-green-100 text-green-700' :
                  'bg-blue-100 text-blue-700'
                }`} style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  Impact: {impact}
                </span>
              </div>
            ))}
            
            {(data.customQuickWins || []).map((win: string, idx: number) => (
              <div key={idx} className="flex items-center p-3 border rounded-lg bg-blue-50">
                <CheckCircle2 className="w-4 h-4 text-[#0066FF] mr-3" />
                <span className="text-sm" style={{ fontFamily: 'Open Sans' }}>{win}</span>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2 mt-3">
            <Input
              value={newQuickWin}
              onChange={(e) => setNewQuickWin(e.target.value)}
              placeholder="Add your own quick win..."
              className="text-sm"
              style={{ fontFamily: 'Open Sans' }}
              onKeyPress={(e) => e.key === 'Enter' && addCustomQuickWin()}
            />
            <Button
              onClick={addCustomQuickWin}
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// STEP 5: Goals
function Step5Goals({ data, updateField }: any) {
  const [draggedPlatform, setDraggedPlatform] = useState<number | null>(null);
  
  const platforms = data.priorityPlatforms?.length > 0 
    ? data.priorityPlatforms 
    : ['ChatGPT', 'Perplexity', 'Claude'];

  const handleDragStart = (index: number) => {
    setDraggedPlatform(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedPlatform === null) return;
    
    const newPlatforms = [...platforms];
    const draggedItem = newPlatforms[draggedPlatform];
    newPlatforms.splice(draggedPlatform, 1);
    newPlatforms.splice(index, 0, draggedItem);
    
    updateField('priorityPlatforms', newPlatforms);
    setDraggedPlatform(index);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#1a1a1a' }}>
          What does success look like?
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
          Define your AI visibility goals
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <Label htmlFor="successVision" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            What success looks like for you
          </Label>
          <Textarea
            id="successVision"
            value={data.successVision}
            onChange={(e) => updateField('successVision', e.target.value)}
            placeholder="e.g., Increase AI-driven traffic by 50% in 6 months"
            rows={3}
            className="text-base resize-none"
            style={{ fontFamily: 'Open Sans' }}
          />
        </div>

        <div>
          <Label className="text-sm mb-3 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Priority Platforms (drag to reorder)
          </Label>
          <div className="space-y-2">
            {platforms.map((platform: string, index: number) => (
              <div
                key={platform}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                className="flex items-center gap-3 p-3 border rounded-lg bg-white cursor-move hover:bg-gray-50 transition-colors"
              >
                <GripVertical className="w-5 h-5 text-gray-400" />
                <span className="text-2xl mr-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                  {index + 1}
                </span>
                <span className="flex-1" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  {platform}
                </span>
                <Edit className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="threeMonthGoals" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
              3-Month Goals
            </Label>
            <Textarea
              id="threeMonthGoals"
              value={data.threeMonthGoals}
              onChange={(e) => updateField('threeMonthGoals', e.target.value)}
              placeholder="• Implement schema markup&#10;• Improve visibility score to 30+"
              rows={5}
              className="text-sm resize-none"
              style={{ fontFamily: 'Open Sans' }}
            />
          </div>

          <div>
            <Label htmlFor="sixMonthGoals" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
              6-Month Goals
            </Label>
            <Textarea
              id="sixMonthGoals"
              value={data.sixMonthGoals}
              onChange={(e) => updateField('sixMonthGoals', e.target.value)}
              placeholder="• Achieve 50+ visibility score&#10;• Get cited in top 5 queries"
              rows={5}
              className="text-sm resize-none"
              style={{ fontFamily: 'Open Sans' }}
            />
          </div>

          <div>
            <Label htmlFor="twelveMonthGoals" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
              12-Month Goals
            </Label>
            <Textarea
              id="twelveMonthGoals"
              value={data.twelveMonthGoals}
              onChange={(e) => updateField('twelveMonthGoals', e.target.value)}
              placeholder="• 80+ overall visibility&#10;• Consistent citations across platforms"
              rows={5}
              className="text-sm resize-none"
              style={{ fontFamily: 'Open Sans' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// STEP 6: Confirmation
function Step6Confirmation({ data, updateField, onComplete, saving }: any) {
  const renderEditableCard = (title: string, items: { label: string; value: any }[]) => (
    <Card className="p-5 mb-4">
      <h3 className="text-lg mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#1a1a1a' }}>
        {title}
      </h3>
      <div className="space-y-3">
        {items.map(({ label, value }) => (
          <div key={label} className="flex justify-between items-start">
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
              {label}:
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-right max-w-xs" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                {Array.isArray(value) ? value.join(', ') : value || '—'}
              </span>
              <Edit className="w-4 h-4 text-gray-400 cursor-pointer hover:text-[#0066FF]" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#1a1a1a' }}>
          Review your AI visibility profile
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
          Make sure everything looks good before we get started
        </p>
      </div>

      <div>
        {renderEditableCard('Brand Foundation', [
          { label: 'Brand Name', value: data.brandName },
          { label: 'Industry', value: data.industry },
          { label: 'Website', value: data.website },
          { label: 'Description', value: data.brandDescription }
        ])}

        {renderEditableCard('Ideal Customer', [
          { label: 'Target', value: data.targetCustomer },
          { label: 'Company Size', value: data.companySize },
          { label: 'Challenges', value: data.mainChallenges },
          { label: 'Search Platforms', value: data.searchPlatforms }
        ])}

        {renderEditableCard('Online Presence', [
          { label: 'Platforms', value: data.activePlatforms },
          { label: 'Content Types', value: data.contentTypes },
          { label: 'Frequency', value: data.updateFrequency },
          { label: 'Voice', value: data.brandVoice }
        ])}

        {renderEditableCard('AI Visibility', [
          { label: 'ChatGPT Score', value: `${data.aiVisibilityScores.chatgpt}/10` },
          { label: 'Claude Score', value: `${data.aiVisibilityScores.claude}/10` },
          { label: 'Perplexity Score', value: `${data.aiVisibilityScores.perplexity}/10` },
          { label: 'Missing Platforms', value: data.missingPlatforms }
        ])}

        {renderEditableCard('Goals', [
          { label: 'Success Vision', value: data.successVision },
          { label: 'Priority Platforms', value: data.priorityPlatforms },
          { label: '3-Month Goals', value: data.threeMonthGoals },
          { label: '6-Month Goals', value: data.sixMonthGoals }
        ])}
      </div>

      <div className="flex items-center p-4 bg-blue-50 rounded-lg">
        <Checkbox
          id="confirm"
          checked={data.confirmed}
          onCheckedChange={(checked) => updateField('confirmed', checked)}
        />
        <label
          htmlFor="confirm"
          className="ml-3 text-sm cursor-pointer"
          style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
        >
          I confirm this information is accurate
        </label>
      </div>

      <Button
        onClick={onComplete}
        disabled={!data.confirmed || saving}
        className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white py-6 text-lg"
        style={{ fontFamily: 'Poppins', fontWeight: 600 }}
      >
        {saving ? (
          'Starting your journey...'
        ) : (
          <>
            START MY AI VISIBILITY JOURNEY
            <Rocket className="w-5 h-5 ml-2" />
          </>
        )}
      </Button>
    </div>
  );
}