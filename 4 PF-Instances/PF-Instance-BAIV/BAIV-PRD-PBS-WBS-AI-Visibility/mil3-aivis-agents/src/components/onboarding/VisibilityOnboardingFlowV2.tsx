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
  brandName: string;
  industry: string;
  website: string;
  brandDescription: string;
  targetCustomer: string;
  companySize: string;
  mainChallenges: string;
  searchPlatforms: string[];
  activePlatforms: string[];
  contentTypes: string[];
  updateFrequency: string;
  brandVoice: string;
  aiVisibilityScores: {
    chatgpt: number;
    claude: number;
    perplexity: number;
    gemini: number;
  };
  missingPlatforms: string[];
  quickWins: string[];
  customQuickWins: string[];
  successVision: string;
  priorityPlatforms: string[];
  threeMonthGoals: string;
  sixMonthGoals: string;
  twelveMonthGoals: string;
  confirmed: boolean;
}

interface VisibilityOnboardingFlowV2Props {
  tenantId: string;
  jwtToken: string;
  onComplete: () => void;
}

const STEPS = [
  { id: 1, label: 'Brand Foundation', icon: Building2 },
  { id: 2, label: 'Ideal Customer', icon: Users },
  { id: 3, label: 'Online Presence', icon: Globe },
  { id: 4, label: 'AI Visibility', icon: Target },
  { id: 5, label: 'Goals', icon: TrendingUp },
  { id: 6, label: 'Review & Save', icon: FileCheck },
];

export function VisibilityOnboardingFlowV2({ tenantId, jwtToken, onComplete }: VisibilityOnboardingFlowV2Props) {
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
      const intelligence = await discoveryIntelligenceAPI.getPlatformVisibility().catch(() => null);
      
      if (intelligence) {
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
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Auto-saved:', field, value);
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

  const getStepGuidance = () => {
    switch (currentStep) {
      case 1:
        return {
          title: 'Context & Scope',
          subtitle: 'Define scope and strategic alignment',
          steps: [
            'Start by selecting the business and <strong>Organization</strong>.',
            'Then apply context filters to characterize your organization\'s environment.',
            'This inherited context will guide all subsequent steps.'
          ]
        };
      case 2:
        return {
          title: 'Ideal Customer',
          subtitle: 'Understand who you serve',
          steps: [
            'Define your target customer profile.',
            'Identify company size and key challenges.',
            'Map out where they search for solutions.'
          ]
        };
      case 3:
        return {
          title: 'Online Presence',
          subtitle: 'Current digital footprint',
          steps: [
            'Select your active platforms.',
            'Define content types and frequency.',
            'Set your brand voice and tone.'
          ]
        };
      case 4:
        return {
          title: 'AI Visibility Gaps',
          subtitle: 'Identify opportunities',
          steps: [
            'Review current AI platform visibility.',
            'Identify missing platforms.',
            'Select quick wins for maximum impact.'
          ]
        };
      case 5:
        return {
          title: 'Goals',
          subtitle: 'Define success metrics',
          steps: [
            'Articulate your success vision.',
            'Prioritize target platforms.',
            'Set timeline-based goals.'
          ]
        };
      case 6:
        return {
          title: 'Review & Save',
          subtitle: 'Confirm your profile',
          steps: [
            'Review all collected information.',
            'Edit any fields as needed.',
            'Confirm and start your journey.'
          ]
        };
      default:
        return { title: '', subtitle: '', steps: [] };
    }
  };

  const guidance = getStepGuidance();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#17BEBB] mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: 'Open Sans' }}>Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
            AI Visibility Profile Setup
          </h1>
          <p className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
            Design compelling value propositions aligned with organizational strategy
          </p>
          <div className="flex gap-4 mt-3 text-xs" style={{ fontFamily: 'Open Sans' }}>
            <span className="text-gray-500">Org: <strong>BAIV</strong></span>
            <span className="text-gray-500">Product: <strong>AI Visibility MVP1</strong></span>
            <span className="text-gray-500">v1.0.0</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="border-b border-gray-200 bg-white px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
                Step {currentStep} of {STEPS.length}
              </span>
              <div className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                ✨ AI Help Available
              </div>
            </div>
            <span className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600, color: '#17BEBB' }}>
              {Math.round((currentStep / STEPS.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#17BEBB] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Navigation Tabs */}
      <div className="border-b border-gray-200 bg-gray-50 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-0 overflow-x-auto">
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'border-[#17BEBB] bg-white'
                      : isCompleted
                      ? 'border-transparent hover:bg-gray-100'
                      : 'border-transparent hover:bg-gray-100'
                  }`}
                  style={{ fontFamily: 'Open Sans' }}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#17BEBB]' : 'text-gray-400'}`} />
                  <span className={`text-sm ${isActive ? 'text-[#17BEBB] font-semibold' : 'text-gray-600'}`}>
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex gap-8">
          {/* Left - Main Form */}
          <div className="flex-1">
            <Card className="bg-white border border-gray-200 p-8">
              {currentStep === 1 && <Step1BrandFoundation data={data} updateField={updateField} />}
              {currentStep === 2 && <Step2IdealCustomer data={data} updateField={updateField} />}
              {currentStep === 3 && <Step3OnlinePresence data={data} updateField={updateField} />}
              {currentStep === 4 && <Step4AIVisibilityGaps data={data} updateField={updateField} />}
              {currentStep === 5 && <Step5Goals data={data} updateField={updateField} />}
              {currentStep === 6 && <Step6Confirmation data={data} updateField={updateField} onComplete={handleComplete} saving={saving} />}
            </Card>

            {/* Bottom Navigation */}
            {currentStep < 6 && (
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="px-6"
                  style={{ fontFamily: 'Open Sans' }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <Button
                  variant="outline"
                  className="px-6 border-orange-300 text-orange-700 hover:bg-orange-50"
                  style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Ask AI Assistant
                </Button>
                
                <Button
                  onClick={handleNext}
                  className="bg-[#17BEBB] hover:bg-[#139e9b] text-white px-8"
                  style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>

          {/* Right Sidebar - Step Guidance */}
          <div className="w-80 flex-shrink-0">
            <Card className="bg-white border border-gray-200 p-6 sticky top-8">
              <h3 className="text-sm mb-4" style={{ fontFamily: 'Open Sans', fontWeight: 600, color: '#6B7280' }}>
                Step Guidance
              </h3>

              {/* Current Step Badge */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#17BEBB] flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="px-2 py-0.5 bg-[#17BEBB] text-white rounded text-xs inline-block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                      Sweet!
                    </div>
                  </div>
                </div>
                <h4 className="text-base mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                  {guidance.title}
                </h4>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
                  {guidance.subtitle}
                </p>
              </div>

              {/* What to do */}
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <h5 className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                    What to do
                  </h5>
                </div>
                <div className="text-xs text-gray-700 space-y-1" style={{ fontFamily: 'Open Sans' }}>
                  {guidance.steps.map((step, idx) => (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: step }} />
                  ))}
                </div>
              </div>

              {/* All Steps */}
              <div>
                <h5 className="text-sm mb-3" style={{ fontFamily: 'Open Sans', fontWeight: 600, color: '#6B7280' }}>
                  All Steps
                </h5>
                <div className="space-y-1">
                  {STEPS.map((step) => {
                    const Icon = step.icon;
                    const isActive = currentStep === step.id;
                    
                    return (
                      <button
                        key={step.id}
                        onClick={() => setCurrentStep(step.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                          isActive
                            ? 'bg-[#17BEBB] text-white'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span className="text-xs" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                          {step.id}
                        </span>
                        <Icon className="w-4 h-4" />
                        <span className="text-sm flex-1" style={{ fontFamily: 'Open Sans' }}>
                          {step.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Tip */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h5 className="text-sm mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  Quick Tip
                </h5>
                <p className="text-xs text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                  Use the <strong>AI Assistant</strong> button to get contextual help at any step. The AI has full access to your current progress and can provide tailored guidance.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step Components
function Step1BrandFoundation({ data, updateField }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#1a1a1a' }}>
          Brand Foundation
        </h2>
        <p className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
          Define the scope and connect your value proposition to organizational strategy
        </p>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="brandName" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
              Brand Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="brandName"
              value={data.brandName}
              onChange={(e) => updateField('brandName', e.target.value)}
              placeholder="BAIV Solutions"
              className="text-sm"
              style={{ fontFamily: 'Open Sans' }}
            />
          </div>

          <div>
            <Label htmlFor="industry" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
              Organization <span className="text-red-500">*</span>
            </Label>
            <Select value={data.industry} onValueChange={(value) => updateField('industry', value)}>
              <SelectTrigger id="industry" className="text-sm" style={{ fontFamily: 'Open Sans' }}>
                <SelectValue placeholder="Select organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="saas">SaaS</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="website" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Value Proposition Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="website"
            value={data.website}
            onChange={(e) => updateField('website', e.target.value)}
            placeholder="e.g., Enterprise Security Platform – Financial Services"
            className="text-sm"
            style={{ fontFamily: 'Open Sans' }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="alignment" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
              Strategic Alignment
            </Label>
            <Select value={""} onValueChange={(value) => {}}>
              <SelectTrigger id="alignment" className="text-sm bg-gray-50" style={{ fontFamily: 'Open Sans' }}>
                <SelectValue placeholder="Select strategy (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="growth">Growth Strategy</SelectItem>
                <SelectItem value="market">Market Expansion</SelectItem>
                <SelectItem value="innovation">Innovation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="brand" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
              Brand (Optional)
            </Label>
            <Select value={""} onValueChange={(value) => {}}>
              <SelectTrigger id="brand" className="text-sm bg-gray-50" style={{ fontFamily: 'Open Sans' }}>
                <SelectValue placeholder="Select brand (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary Brand</SelectItem>
                <SelectItem value="secondary">Secondary Brand</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="productService" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Product/Service (Optional)
          </Label>
          <Select value={""} onValueChange={(value) => {}}>
            <SelectTrigger id="productService" className="text-sm bg-gray-50" style={{ fontFamily: 'Open Sans' }}>
              <SelectValue placeholder="Select product/service (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="platform">Platform</SelectItem>
              <SelectItem value="service">Service</SelectItem>
              <SelectItem value="product">Product</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

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
        <h2 className="text-2xl mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#1a1a1a' }}>
          Ideal Customer Profile
        </h2>
        <p className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
          Help us understand who you serve
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
            className="text-sm"
            style={{ fontFamily: 'Open Sans' }}
          />
        </div>

        <div>
          <Label htmlFor="companySize" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Company size they work at
          </Label>
          <Select value={data.companySize} onValueChange={(value) => updateField('companySize', value)}>
            <SelectTrigger id="companySize" className="text-sm" style={{ fontFamily: 'Open Sans' }}>
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
            className="text-sm resize-none"
            style={{ fontFamily: 'Open Sans' }}
          />
        </div>

        <div>
          <Label className="text-sm mb-3 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Where they search for solutions
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {['Google Search', 'ChatGPT', 'Claude', 'Perplexity', 'LinkedIn', 'Industry Forums', 'YouTube', 'Reddit'].map(platform => (
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
        <h2 className="text-2xl mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#1a1a1a' }}>
          Online Presence
        </h2>
        <p className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
          Tell us about your current digital footprint
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <Label className="text-sm mb-3 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Current Platforms
          </Label>
          <div className="grid grid-cols-3 gap-3">
            {['Website', 'LinkedIn', 'Twitter/X', 'YouTube', 'Blog', 'Facebook'].map(platform => (
              <div
                key={platform}
                onClick={() => togglePlatform(platform)}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                  (data.activePlatforms || []).includes(platform)
                    ? 'border-[#17BEBB] bg-teal-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  {platform}
                </span>
                {(data.activePlatforms || []).includes(platform) && (
                  <CheckCircle2 className="w-4 h-4 text-[#17BEBB] mx-auto mt-1" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm mb-3 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Content Types You Create
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {['Blog posts', 'Videos', 'Podcasts', 'Social media', 'Whitepapers', 'Case studies'].map(type => (
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="updateFrequency" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
              Update Frequency
            </Label>
            <Select value={data.updateFrequency} onValueChange={(value) => updateField('updateFrequency', value)}>
              <SelectTrigger id="updateFrequency" className="text-sm" style={{ fontFamily: 'Open Sans' }}>
                <SelectValue placeholder="How often?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="brandVoice" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
              Brand Voice/Tone
            </Label>
            <Select value={data.brandVoice} onValueChange={(value) => updateField('brandVoice', value)}>
              <SelectTrigger id="brandVoice" className="text-sm" style={{ fontFamily: 'Open Sans' }}>
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step4AIVisibilityGaps({ data, updateField }: any) {
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
        <h2 className="text-2xl mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#1a1a1a' }}>
          AI Visibility Analysis
        </h2>
        <p className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
          Identify gaps and opportunities in your AI visibility
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-sm mb-3 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Current AI Platform Visibility
          </Label>
          <div className="grid grid-cols-2 gap-4">
            {(['chatgpt', 'claude', 'perplexity', 'gemini'] as const).map(platform => (
              <div key={platform} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm capitalize" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                    {platform === 'chatgpt' ? 'ChatGPT' : platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </span>
                  <span className="text-xl" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
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
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm mb-3 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Missing Platforms (Select to prioritize)
          </Label>
          <div className="space-y-2">
            {[
              { name: 'SearchGPT', priority: 'High' },
              { name: 'Bing Copilot', priority: 'Medium' },
              { name: 'Google Gemini Advanced', priority: 'Medium' }
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
                  'bg-yellow-100 text-yellow-700'
                }`} style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  {priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm mb-3 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Quick Wins
          </Label>
          <div className="space-y-2">
            {[
              { name: 'Add schema markup', impact: 'High' },
              { name: 'Create FAQ page', impact: 'High' },
              { name: 'Optimize content for citations', impact: 'Medium' }
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
              <div key={idx} className="flex items-center p-3 border rounded-lg bg-teal-50">
                <CheckCircle2 className="w-4 h-4 text-[#17BEBB] mr-3" />
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
        <h2 className="text-2xl mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#1a1a1a' }}>
          Success Goals
        </h2>
        <p className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
          Define what success looks like for your AI visibility journey
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <Label htmlFor="successVision" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Success Vision
          </Label>
          <Textarea
            id="successVision"
            value={data.successVision}
            onChange={(e) => updateField('successVision', e.target.value)}
            placeholder="e.g., Increase AI-driven traffic by 50% in 6 months"
            rows={3}
            className="text-sm resize-none"
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
                <span className="text-lg mr-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                  {index + 1}
                </span>
                <span className="flex-1 text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  {platform}
                </span>
                <Edit className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="threeMonthGoals" className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
              3-Month Goals
            </Label>
            <Textarea
              id="threeMonthGoals"
              value={data.threeMonthGoals}
              onChange={(e) => updateField('threeMonthGoals', e.target.value)}
              placeholder="• Implement schema&#10;• Visibility 30+"
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
              placeholder="• Visibility 50+&#10;• Top 5 citations"
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
              placeholder="• Visibility 80+&#10;• Consistent citations"
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

function Step6Confirmation({ data, updateField, onComplete, saving }: any) {
  const renderEditableCard = (title: string, items: { label: string; value: any }[]) => (
    <Card className="p-5 mb-4 border border-gray-200">
      <h3 className="text-base mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#1a1a1a' }}>
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
              <Edit className="w-4 h-4 text-gray-400 cursor-pointer hover:text-[#17BEBB]" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#1a1a1a' }}>
          Review & Confirm
        </h2>
        <p className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
          Review all information before starting your journey
        </p>
      </div>

      <div>
        {renderEditableCard('Brand Foundation', [
          { label: 'Brand Name', value: data.brandName },
          { label: 'Industry', value: data.industry },
          { label: 'Website', value: data.website }
        ])}

        {renderEditableCard('Ideal Customer', [
          { label: 'Target', value: data.targetCustomer },
          { label: 'Company Size', value: data.companySize },
          { label: 'Search Platforms', value: data.searchPlatforms }
        ])}

        {renderEditableCard('Online Presence', [
          { label: 'Platforms', value: data.activePlatforms },
          { label: 'Content Types', value: data.contentTypes },
          { label: 'Frequency', value: data.updateFrequency }
        ])}

        {renderEditableCard('AI Visibility', [
          { label: 'ChatGPT Score', value: `${data.aiVisibilityScores.chatgpt}/10` },
          { label: 'Claude Score', value: `${data.aiVisibilityScores.claude}/10` },
          { label: 'Missing Platforms', value: data.missingPlatforms }
        ])}

        {renderEditableCard('Goals', [
          { label: 'Success Vision', value: data.successVision },
          { label: 'Priority Platforms', value: data.priorityPlatforms }
        ])}
      </div>

      <div className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
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

      <div className="flex gap-3">
        <Button
          onClick={onComplete}
          disabled={!data.confirmed || saving}
          className="flex-1 bg-[#17BEBB] hover:bg-[#139e9b] text-white py-6 text-base"
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
    </div>
  );
}
