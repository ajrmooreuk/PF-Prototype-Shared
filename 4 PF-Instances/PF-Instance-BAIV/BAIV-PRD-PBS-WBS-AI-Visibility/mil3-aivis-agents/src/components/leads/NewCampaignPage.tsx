import { useState } from 'react';
import { Target, MapPin, Linkedin, Info, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { callEccoAPI } from '../../lib/eccoAPI';

type TabType = 'hunter' | 'google' | 'linkedin';
type LinkedInSubTab = 'post-comments' | 'profile-search';

interface FormData {
  hunter: {
    campaignName: string;
    query: string;
    location: string;
    industryTags: string[];
    companySizes: string[];
    maxResults: number;
  };
  google: {
    campaignName: string;
    businessType: string;
    location: string;
    radius: number;
    maxResults: number;
    minRating: number;
    minReviews: number;
    openNow: boolean;
  };
  linkedin: {
    post: {
      campaignName: string;
      postUrl: string;
      maxComments: number;
      commentTypes: string[];
    };
    profile: {
      campaignName: string;
      keywords: string;
      location: string;
      industry: string;
      company: string;
      maxResults: number;
      connectionLevels: string[];
    };
  };
}

export function NewCampaignPage() {
  const [activeTab, setActiveTab] = useState<TabType>('hunter');
  const [linkedInSubTab, setLinkedInSubTab] = useState<LinkedInSubTab>('post-comments');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [currentTag, setCurrentTag] = useState('');

  const [formData, setFormData] = useState<FormData>({
    hunter: {
      campaignName: '',
      query: '',
      location: '',
      industryTags: [],
      companySizes: [],
      maxResults: 100,
    },
    google: {
      campaignName: '',
      businessType: '',
      location: '',
      radius: 25,
      maxResults: 25,
      minRating: 0,
      minReviews: 0,
      openNow: false,
    },
    linkedin: {
      post: {
        campaignName: '',
        postUrl: '',
        maxComments: 100,
        commentTypes: ['questions', 'interested'],
      },
      profile: {
        campaignName: '',
        keywords: '',
        location: '',
        industry: '',
        company: '',
        maxResults: 100,
        connectionLevels: ['all'],
      },
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const industryOptions = ['Healthcare', 'Technology', 'Finance', 'Real Estate', 'Professional Services', 'Manufacturing', 'Retail'];
  const businessTypeExamples = ['Restaurants', 'Dental offices', 'Auto repair', 'Real estate agencies', 'Law firms', 'Gyms'];

  const companySizeOptions = [
    { label: '1-10 employees', value: '1-10' },
    { label: '11-50 employees', value: '11-50' },
    { label: '51-200 employees', value: '51-200' },
    { label: '201+ employees', value: '201+' },
  ];

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (formData.hunter.industryTags.length < 10 && !formData.hunter.industryTags.includes(currentTag.trim())) {
        setFormData({
          ...formData,
          hunter: {
            ...formData.hunter,
            industryTags: [...formData.hunter.industryTags, currentTag.trim()],
          },
        });
        setCurrentTag('');
      }
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      hunter: {
        ...formData.hunter,
        industryTags: formData.hunter.industryTags.filter(t => t !== tag),
      },
    });
  };

  const addQuickTag = (tag: string) => {
    if (formData.hunter.industryTags.length < 10 && !formData.hunter.industryTags.includes(tag)) {
      setFormData({
        ...formData,
        hunter: {
          ...formData.hunter,
          industryTags: [...formData.hunter.industryTags, tag],
        },
      });
    }
  };

  const validateHunterForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.hunter.campaignName.trim() || formData.hunter.campaignName.length < 3) {
      newErrors.hunterCampaignName = 'Campaign name must be at least 3 characters';
    }
    
    if (!formData.hunter.query.trim()) {
      newErrors.hunterQuery = 'Target query is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateGoogleForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.google.campaignName.trim() || formData.google.campaignName.length < 3) {
      newErrors.googleCampaignName = 'Campaign name must be at least 3 characters';
    }
    
    if (!formData.google.businessType.trim()) {
      newErrors.googleBusinessType = 'Business type is required';
    }
    
    if (!formData.google.location.trim()) {
      newErrors.googleLocation = 'Location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLinkedInPostForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.linkedin.post.campaignName.trim() || formData.linkedin.post.campaignName.length < 3) {
      newErrors.linkedinPostCampaignName = 'Campaign name must be at least 3 characters';
    }
    
    if (!formData.linkedin.post.postUrl.trim()) {
      newErrors.linkedinPostUrl = 'LinkedIn post URL is required';
    } else if (!formData.linkedin.post.postUrl.startsWith('https://www.linkedin.com/posts/')) {
      newErrors.linkedinPostUrl = 'Please enter a valid LinkedIn post URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLinkedInProfileForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.linkedin.profile.campaignName.trim() || formData.linkedin.profile.campaignName.length < 3) {
      newErrors.linkedinProfileCampaignName = 'Campaign name must be at least 3 characters';
    }
    
    if (!formData.linkedin.profile.keywords.trim()) {
      newErrors.linkedinProfileKeywords = 'Search keywords are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    let isValid = false;
    
    if (activeTab === 'hunter') {
      isValid = validateHunterForm();
    } else if (activeTab === 'google') {
      isValid = validateGoogleForm();
    } else if (activeTab === 'linkedin') {
      if (linkedInSubTab === 'post-comments') {
        isValid = validateLinkedInPostForm();
      } else {
        isValid = validateLinkedInProfileForm();
      }
    }

    if (!isValid) return;

    setIsLoading(true);
    setLoadingStep('Creating campaign...');

    try {
      let campaignResult;
      
      if (activeTab === 'hunter') {
        // Create Hunter.io campaign
        const campaign = await callEccoAPI('/api/leads/campaigns', 'POST', {
          campaign_name: formData.hunter.campaignName,
          search_provider: 'hunter_io',
          query: formData.hunter.query,
          location: formData.hunter.location || undefined,
          industry: formData.hunter.industryTags,
          company_size_min: formData.hunter.companySizes.length > 0 ? 1 : undefined,
          company_size_max: formData.hunter.companySizes.length > 0 ? 200 : undefined,
          max_results: formData.hunter.maxResults
        });
        
        setLoadingStep('Connecting to Hunter.io...');
        
        // Start the search
        campaignResult = await callEccoAPI(`/api/leads/campaigns/${campaign.id}/search?wait=false`, 'POST', {});
        
      } else if (activeTab === 'google') {
        // Create Google Maps campaign
        const campaign = await callEccoAPI('/api/leads/campaigns', 'POST', {
          campaign_name: formData.google.campaignName,
          search_provider: 'google_maps',
          google_maps_query: formData.google.businessType,
          google_maps_location: formData.google.location,
          max_results: formData.google.maxResults,
          min_rating: formData.google.minRating || undefined,
          min_reviews: formData.google.minReviews || undefined,
          radius_miles: formData.google.radius
        });
        
        setLoadingStep('Connecting to Google Maps...');
        
        // Start the search
        campaignResult = await callEccoAPI(`/api/leads/campaigns/${campaign.id}/search-google-maps?wait=false`, 'POST', {});
        
      } else if (activeTab === 'linkedin') {
        if (linkedInSubTab === 'post-comments') {
          // LinkedIn Post Comments campaign
          setLoadingStep('Connecting to LinkedIn...');
          
          campaignResult = await callEccoAPI('/api/linkedin/campaigns/scrape-post', 'POST', {
            campaign_name: formData.linkedin.post.campaignName,
            post_url: formData.linkedin.post.postUrl,
            max_comments: formData.linkedin.post.maxComments
          });
          
        } else {
          // LinkedIn Profile Search campaign
          setLoadingStep('Connecting to LinkedIn...');
          
          campaignResult = await callEccoAPI('/api/linkedin/campaigns/search-profiles', 'POST', {
            campaign_name: formData.linkedin.profile.campaignName,
            search_query: formData.linkedin.profile.keywords,
            location: formData.linkedin.profile.location || undefined,
            industry: formData.linkedin.profile.industry || undefined,
            company: formData.linkedin.profile.company || undefined,
            max_results: formData.linkedin.profile.maxResults
          });
        }
      }

      setLoadingStep('Processing results...');
      
      toast.success('Campaign created successfully! Finding leads...');
      
      // TODO: Redirect to campaign results page with campaign_id
      // window.location.href = `/leads/campaigns/${campaignResult.campaign_id}/results`;
      
    } catch (error) {
      console.error('Campaign creation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create campaign. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderHunterTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
          Configure Hunter.io Search
        </h2>
        <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Find B2B companies and verified email contacts
        </p>
      </div>

      {/* Campaign Name */}
      <div className="space-y-2">
        <Label htmlFor="hunter-name" className="flex items-center gap-1" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Campaign Name<span className="text-[#e84e1c]">*</span>
        </Label>
        <Input
          id="hunter-name"
          value={formData.hunter.campaignName}
          onChange={(e) => setFormData({ ...formData, hunter: { ...formData.hunter, campaignName: e.target.value } })}
          placeholder="e.g., Dallas Podiatry Clinics"
          className={`h-12 ${errors.hunterCampaignName ? 'border-red-500' : ''}`}
        />
        {errors.hunterCampaignName && (
          <p className="text-red-500 text-xs" style={{ fontFamily: 'Open Sans' }}>{errors.hunterCampaignName}</p>
        )}
        <p className="text-[#6B7280] text-xs" style={{ fontFamily: 'Open Sans' }}>Give your campaign a memorable name</p>
      </div>

      {/* Target Query */}
      <div className="space-y-2">
        <Label htmlFor="hunter-query" className="flex items-center gap-2" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Target Query<span className="text-[#e84e1c]">*</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                  Hunter.io searches company names and descriptions. Use OR for multiple terms.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <Textarea
          id="hunter-query"
          value={formData.hunter.query}
          onChange={(e) => setFormData({ ...formData, hunter: { ...formData.hunter, query: e.target.value } })}
          placeholder="e.g., Podiatry clinic OR Foot clinic OR Foot doctor"
          className={`min-h-[80px] ${errors.hunterQuery ? 'border-red-500' : ''}`}
          maxLength={200}
        />
        {errors.hunterQuery && (
          <p className="text-red-500 text-xs" style={{ fontFamily: 'Open Sans' }}>{errors.hunterQuery}</p>
        )}
        <div className="flex justify-between items-center">
          <p className="text-[#6B7280] text-xs" style={{ fontFamily: 'Open Sans' }}>Use OR for multiple terms, be specific</p>
          <span className="text-[#6B7280] text-xs" style={{ fontFamily: 'Open Sans' }}>{formData.hunter.query.length} / 200</span>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="hunter-location" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Location (optional)
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="hunter-location"
            value={formData.hunter.location}
            onChange={(e) => setFormData({ ...formData, hunter: { ...formData.hunter, location: e.target.value } })}
            placeholder="e.g., Dallas, TX or United States"
            className="h-12 pl-10"
          />
        </div>
        <p className="text-[#6B7280] text-xs" style={{ fontFamily: 'Open Sans' }}>City, state, or country to narrow results</p>
      </div>

      {/* Industry Tags */}
      <div className="space-y-2">
        <Label htmlFor="hunter-tags" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Industry Tags (optional)
        </Label>
        <Input
          id="hunter-tags"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder="Type and press Enter to add"
          className="h-12"
        />
        {formData.hunter.industryTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.hunter.industryTags.map((tag) => (
              <Badge
                key={tag}
                className="bg-[#E6F7F9] text-[#02a4bf] hover:bg-[#D0F0F5] cursor-pointer px-3 py-1"
                onClick={() => removeTag(tag)}
              >
                {tag} ×
              </Badge>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {industryOptions.filter(opt => !formData.hunter.industryTags.includes(opt)).map((option) => (
            <Badge
              key={option}
              variant="outline"
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => addQuickTag(option)}
            >
              + {option}
            </Badge>
          ))}
        </div>
        <p className="text-[#6B7280] text-xs" style={{ fontFamily: 'Open Sans' }}>Max 10 tags • {formData.hunter.industryTags.length}/10</p>
      </div>

      {/* Company Size */}
      <div className="space-y-3">
        <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Company Size (optional)
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {companySizeOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${option.value}`}
                checked={formData.hunter.companySizes.includes(option.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFormData({
                      ...formData,
                      hunter: {
                        ...formData.hunter,
                        companySizes: [...formData.hunter.companySizes, option.value],
                      },
                    });
                  } else {
                    setFormData({
                      ...formData,
                      hunter: {
                        ...formData.hunter,
                        companySizes: formData.hunter.companySizes.filter(s => s !== option.value),
                      },
                    });
                  }
                }}
              />
              <label
                htmlFor={`size-${option.value}`}
                className="text-sm cursor-pointer"
                style={{ fontFamily: 'Open Sans' }}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Max Results */}
      <div className="space-y-3">
        <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Maximum Results
        </Label>
        <div className="text-center mb-2">
          <span className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}>
            {formData.hunter.maxResults} companies
          </span>
        </div>
        <Slider
          value={[formData.hunter.maxResults]}
          onValueChange={([value]) => setFormData({ ...formData, hunter: { ...formData.hunter, maxResults: value } })}
          min={10}
          max={500}
          step={10}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>10</span>
          <span>50</span>
          <span>100</span>
          <span>250</span>
          <span>500</span>
        </div>
        <p className="text-[#6B7280] text-xs" style={{ fontFamily: 'Open Sans' }}>More results = more credits used</p>
      </div>

      {/* Preview Card */}
      <Card className="bg-blue-50 border-blue-200 p-4">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-blue-900" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
              Estimated Cost
            </h3>
            <div className="text-sm space-y-0.5" style={{ fontFamily: 'Open Sans', fontSize: '13px', color: '#1e3a8a' }}>
              <p>Credits needed: ~75-100</p>
              <p>Estimated results: 80-100 companies</p>
              <p>Estimated emails: 200-300 contacts</p>
              <p className="text-green-700 font-medium mt-2">Available credits: 1,247</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderGoogleTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
          Configure Google Maps Search
        </h2>
        <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Find local businesses with contact information
        </p>
      </div>

      {/* Campaign Name */}
      <div className="space-y-2">
        <Label htmlFor="google-name" className="flex items-center gap-1" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Campaign Name<span className="text-[#e84e1c]">*</span>
        </Label>
        <Input
          id="google-name"
          value={formData.google.campaignName}
          onChange={(e) => setFormData({ ...formData, google: { ...formData.google, campaignName: e.target.value } })}
          placeholder="e.g., Dallas PT Offices"
          className={`h-12 ${errors.googleCampaignName ? 'border-red-500' : ''}`}
        />
        {errors.googleCampaignName && (
          <p className="text-red-500 text-xs" style={{ fontFamily: 'Open Sans' }}>{errors.googleCampaignName}</p>
        )}
      </div>

      {/* Business Type */}
      <div className="space-y-2">
        <Label htmlFor="google-business" className="flex items-center gap-1" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Business Type<span className="text-[#e84e1c]">*</span>
        </Label>
        <Input
          id="google-business"
          value={formData.google.businessType}
          onChange={(e) => setFormData({ ...formData, google: { ...formData.google, businessType: e.target.value } })}
          placeholder="e.g., Podiatry clinics, Physical therapy offices"
          className={`h-12 ${errors.googleBusinessType ? 'border-red-500' : ''}`}
        />
        {errors.googleBusinessType && (
          <p className="text-red-500 text-xs" style={{ fontFamily: 'Open Sans' }}>{errors.googleBusinessType}</p>
        )}
        <p className="text-[#6B7280] text-xs" style={{ fontFamily: 'Open Sans' }}>What type of business are you looking for?</p>
        <div className="flex flex-wrap gap-2">
          {businessTypeExamples.map((example) => (
            <Badge
              key={example}
              variant="outline"
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => setFormData({ ...formData, google: { ...formData.google, businessType: example } })}
            >
              {example}
            </Badge>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="google-location" className="flex items-center gap-1" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Location<span className="text-[#e84e1c]">*</span>
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="google-location"
            value={formData.google.location}
            onChange={(e) => setFormData({ ...formData, google: { ...formData.google, location: e.target.value } })}
            placeholder="e.g., Dallas, TX"
            className={`h-12 pl-10 ${errors.googleLocation ? 'border-red-500' : ''}`}
          />
        </div>
        {errors.googleLocation && (
          <p className="text-red-500 text-xs" style={{ fontFamily: 'Open Sans' }}>{errors.googleLocation}</p>
        )}
        <p className="text-[#6B7280] text-xs" style={{ fontFamily: 'Open Sans' }}>City and state for best results</p>
      </div>

      {/* Search Radius */}
      <div className="space-y-3">
        <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Search Radius
        </Label>
        <div className="text-center mb-2">
          <span className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}>
            {formData.google.radius} miles
          </span>
        </div>
        <Slider
          value={[formData.google.radius]}
          onValueChange={([value]) => setFormData({ ...formData, google: { ...formData.google, radius: value } })}
          min={5}
          max={50}
          step={5}
          className="w-full"
        />
        <p className="text-[#6B7280] text-xs" style={{ fontFamily: 'Open Sans' }}>Distance from location center</p>
      </div>

      {/* Max Results */}
      <div className="space-y-3">
        <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Maximum Results
        </Label>
        <div className="text-center mb-2">
          <span className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}>
            {formData.google.maxResults} businesses
          </span>
        </div>
        <Slider
          value={[formData.google.maxResults]}
          onValueChange={([value]) => setFormData({ ...formData, google: { ...formData.google, maxResults: value } })}
          min={10}
          max={200}
          step={5}
          className="w-full"
        />
        <p className="text-[#6B7280] text-xs" style={{ fontFamily: 'Open Sans' }}>More results = longer processing time</p>
      </div>

      {/* Preview Card */}
      <Card className="bg-blue-50 border-blue-200 p-4">
        <div className="flex gap-3">
          <MapPin className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-blue-900" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
              Estimated Results
            </h3>
            <div className="text-sm space-y-0.5" style={{ fontFamily: 'Open Sans', fontSize: '13px', color: '#1e3a8a' }}>
              <p>Estimated time: 2-3 minutes</p>
              <p>Processing via Google Maps API</p>
              <p>Results include: Name, address, phone, rating, hours</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderLinkedInPostTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
          Scrape LinkedIn Post Comments
        </h2>
        <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Find engaged prospects who commented on a LinkedIn post
        </p>
      </div>

      {/* Campaign Name */}
      <div className="space-y-2">
        <Label htmlFor="linkedin-post-name" className="flex items-center gap-1" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Campaign Name<span className="text-[#e84e1c]">*</span>
        </Label>
        <Input
          id="linkedin-post-name"
          value={formData.linkedin.post.campaignName}
          onChange={(e) => setFormData({ ...formData, linkedin: { ...formData.linkedin, post: { ...formData.linkedin.post, campaignName: e.target.value } } })}
          placeholder="e.g., AI Healthcare Post Comments"
          className={`h-12 ${errors.linkedinPostCampaignName ? 'border-red-500' : ''}`}
        />
        {errors.linkedinPostCampaignName && (
          <p className="text-red-500 text-xs" style={{ fontFamily: 'Open Sans' }}>{errors.linkedinPostCampaignName}</p>
        )}
      </div>

      {/* Post URL */}
      <div className="space-y-2">
        <Label htmlFor="linkedin-post-url" className="flex items-center gap-1" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          LinkedIn Post URL<span className="text-[#e84e1c]">*</span>
        </Label>
        <div className="relative">
          <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0077B5]" />
          <Input
            id="linkedin-post-url"
            value={formData.linkedin.post.postUrl}
            onChange={(e) => setFormData({ ...formData, linkedin: { ...formData.linkedin, post: { ...formData.linkedin.post, postUrl: e.target.value } } })}
            placeholder="https://www.linkedin.com/posts/..."
            className={`h-12 pl-10 ${errors.linkedinPostUrl ? 'border-red-500' : ''}`}
          />
          {formData.linkedin.post.postUrl.startsWith('https://www.linkedin.com/posts/') && (
            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-600" />
          )}
        </div>
        {errors.linkedinPostUrl && (
          <p className="text-red-500 text-xs" style={{ fontFamily: 'Open Sans' }}>{errors.linkedinPostUrl}</p>
        )}
        <p className="text-[#6B7280] text-xs" style={{ fontFamily: 'Open Sans' }}>Paste the full URL of any public LinkedIn post</p>
      </div>

      {/* Max Comments */}
      <div className="space-y-3">
        <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Maximum Comments to Scrape
        </Label>
        <div className="text-center mb-2">
          <span className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}>
            {formData.linkedin.post.maxComments} comments
          </span>
        </div>
        <Slider
          value={[formData.linkedin.post.maxComments]}
          onValueChange={([value]) => setFormData({ ...formData, linkedin: { ...formData.linkedin, post: { ...formData.linkedin.post, maxComments: value } } })}
          min={10}
          max={500}
          step={10}
          className="w-full"
        />
        <p className="text-[#6B7280] text-xs" style={{ fontFamily: 'Open Sans' }}>More comments = longer processing time</p>
      </div>

      {/* Comment Type Filters */}
      <div className="space-y-3">
        <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Target Comment Types (optional)
        </Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="comment-questions"
              checked={formData.linkedin.post.commentTypes.includes('questions')}
              onCheckedChange={(checked) => {
                const types = checked
                  ? [...formData.linkedin.post.commentTypes, 'questions']
                  : formData.linkedin.post.commentTypes.filter(t => t !== 'questions');
                setFormData({ ...formData, linkedin: { ...formData.linkedin, post: { ...formData.linkedin.post, commentTypes: types } } });
              }}
            />
            <label htmlFor="comment-questions" className="text-sm cursor-pointer" style={{ fontFamily: 'Open Sans' }}>
              Questions (people asking for advice)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="comment-interested"
              checked={formData.linkedin.post.commentTypes.includes('interested')}
              onCheckedChange={(checked) => {
                const types = checked
                  ? [...formData.linkedin.post.commentTypes, 'interested']
                  : formData.linkedin.post.commentTypes.filter(t => t !== 'interested');
                setFormData({ ...formData, linkedin: { ...formData.linkedin, post: { ...formData.linkedin.post, commentTypes: types } } });
              }}
            />
            <label htmlFor="comment-interested" className="text-sm cursor-pointer" style={{ fontFamily: 'Open Sans' }}>
              Interested (showing interest in the topic)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="comment-pain"
              checked={formData.linkedin.post.commentTypes.includes('pain-points')}
              onCheckedChange={(checked) => {
                const types = checked
                  ? [...formData.linkedin.post.commentTypes, 'pain-points']
                  : formData.linkedin.post.commentTypes.filter(t => t !== 'pain-points');
                setFormData({ ...formData, linkedin: { ...formData.linkedin, post: { ...formData.linkedin.post, commentTypes: types } } });
              }}
            />
            <label htmlFor="comment-pain" className="text-sm cursor-pointer" style={{ fontFamily: 'Open Sans' }}>
              Pain Points (expressing challenges)
            </label>
          </div>
        </div>
        <p className="text-[#6B7280] text-xs" style={{ fontFamily: 'Open Sans' }}>AI will identify these comment types</p>
      </div>

      {/* Preview Card */}
      <Card className="bg-blue-50 border-blue-200 p-4">
        <div className="flex gap-3">
          <Linkedin className="h-5 w-5 text-[#0077B5] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-blue-900" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
              What You'll Get
            </h3>
            <div className="text-sm space-y-0.5" style={{ fontFamily: 'Open Sans', fontSize: '13px', color: '#1e3a8a' }}>
              <p>Commenters with profile links</p>
              <p>Connection status checking</p>
              <p>Profile data (name, title, company)</p>
              <p>Comment text for context</p>
              <p className="mt-2">Estimated time: 1-2 minutes</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderLinkedInProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
          Search LinkedIn Profiles
        </h2>
        <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Find prospects by industry, title, location, and more
        </p>
      </div>

      {/* Campaign Name */}
      <div className="space-y-2">
        <Label htmlFor="linkedin-profile-name" className="flex items-center gap-1" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Campaign Name<span className="text-[#e84e1c]">*</span>
        </Label>
        <Input
          id="linkedin-profile-name"
          value={formData.linkedin.profile.campaignName}
          onChange={(e) => setFormData({ ...formData, linkedin: { ...formData.linkedin, profile: { ...formData.linkedin.profile, campaignName: e.target.value } } })}
          placeholder="e.g., Texas Physical Therapists"
          className={`h-12 ${errors.linkedinProfileCampaignName ? 'border-red-500' : ''}`}
        />
        {errors.linkedinProfileCampaignName && (
          <p className="text-red-500 text-xs" style={{ fontFamily: 'Open Sans' }}>{errors.linkedinProfileCampaignName}</p>
        )}
      </div>

      {/* Search Keywords */}
      <div className="space-y-2">
        <Label htmlFor="linkedin-keywords" className="flex items-center gap-1" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Search Keywords<span className="text-[#e84e1c]">*</span>
        </Label>
        <Input
          id="linkedin-keywords"
          value={formData.linkedin.profile.keywords}
          onChange={(e) => setFormData({ ...formData, linkedin: { ...formData.linkedin, profile: { ...formData.linkedin.profile, keywords: e.target.value } } })}
          placeholder="e.g., physical therapist, PT, physiotherapist"
          className={`h-12 ${errors.linkedinProfileKeywords ? 'border-red-500' : ''}`}
        />
        {errors.linkedinProfileKeywords && (
          <p className="text-red-500 text-xs" style={{ fontFamily: 'Open Sans' }}>{errors.linkedinProfileKeywords}</p>
        )}
        <p className="text-[#6B7280] text-xs" style={{ fontFamily: 'Open Sans' }}>Job titles, roles, or skills to search for</p>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="linkedin-location" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Location (optional)
        </Label>
        <Input
          id="linkedin-location"
          value={formData.linkedin.profile.location}
          onChange={(e) => setFormData({ ...formData, linkedin: { ...formData.linkedin, profile: { ...formData.linkedin.profile, location: e.target.value } } })}
          placeholder="e.g., Texas, United States"
          className="h-12"
        />
        <p className="text-[#6B7280] text-xs" style={{ fontFamily: 'Open Sans' }}>Geographic area to search</p>
      </div>

      {/* Industry */}
      <div className="space-y-2">
        <Label htmlFor="linkedin-industry" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Industry (optional)
        </Label>
        <Select
          value={formData.linkedin.profile.industry}
          onValueChange={(value) => setFormData({ ...formData, linkedin: { ...formData.linkedin, profile: { ...formData.linkedin.profile, industry: value } } })}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Any Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Industry</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="financial">Financial Services</SelectItem>
            <SelectItem value="realestate">Real Estate</SelectItem>
            <SelectItem value="professional">Professional Services</SelectItem>
            <SelectItem value="manufacturing">Manufacturing</SelectItem>
            <SelectItem value="retail">Retail</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Company */}
      <div className="space-y-2">
        <Label htmlFor="linkedin-company" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Company (optional)
        </Label>
        <Input
          id="linkedin-company"
          value={formData.linkedin.profile.company}
          onChange={(e) => setFormData({ ...formData, linkedin: { ...formData.linkedin, profile: { ...formData.linkedin.profile, company: e.target.value } } })}
          placeholder="e.g., Acme Corp"
          className="h-12"
        />
        <p className="text-[#6B7280] text-xs" style={{ fontFamily: 'Open Sans' }}>Search within a specific company</p>
      </div>

      {/* Max Results */}
      <div className="space-y-3">
        <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
          Maximum Profiles
        </Label>
        <div className="text-center mb-2">
          <span className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}>
            {formData.linkedin.profile.maxResults} profiles
          </span>
        </div>
        <Slider
          value={[formData.linkedin.profile.maxResults]}
          onValueChange={([value]) => setFormData({ ...formData, linkedin: { ...formData.linkedin, profile: { ...formData.linkedin.profile, maxResults: value } } })}
          min={10}
          max={500}
          step={10}
          className="w-full"
        />
      </div>

      {/* Preview Card */}
      <Card className="bg-blue-50 border-blue-200 p-4">
        <div className="flex gap-3">
          <Linkedin className="h-5 w-5 text-[#0077B5] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-blue-900" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
              What You'll Get
            </h3>
            <div className="text-sm space-y-0.5" style={{ fontFamily: 'Open Sans', fontSize: '13px', color: '#1e3a8a' }}>
              <p>Profile names and URLs</p>
              <p>Current job titles</p>
              <p>Company information</p>
              <p>Connection status</p>
              <p>Ready for outreach</p>
              <p className="mt-2">Estimated time: 2-4 minutes</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <div className="max-w-[1200px] mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <div className="mb-4">
          <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            Dashboard {' > '} Leads {' > '} New Campaign
          </p>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}>
            Create New Lead Campaign
          </h1>
          <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
            Choose your lead source and configure search criteria
          </p>
        </div>

        {/* Main Tabs */}
        <Card className="mb-6">
          <div className="grid grid-cols-3 border-b">
            <button
              onClick={() => setActiveTab('hunter')}
              className={`flex flex-col items-center justify-center gap-2 p-4 transition-colors relative ${
                activeTab === 'hunter'
                  ? 'bg-[#02a4bf] text-white'
                  : 'text-[#6B7280] hover:bg-[#F0F9FA]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                <span style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}>Hunter.io Search</span>
              </div>
              <span className="text-xs" style={{ fontFamily: 'Open Sans', fontSize: '11px' }}>
                B2B companies + verified emails
              </span>
              {activeTab === 'hunter' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#02a4bf]" />}
            </button>

            <button
              onClick={() => setActiveTab('google')}
              className={`flex flex-col items-center justify-center gap-2 p-4 transition-colors relative border-l ${
                activeTab === 'google'
                  ? 'bg-[#02a4bf] text-white'
                  : 'text-[#6B7280] hover:bg-[#F0F9FA]'
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}>Google Maps</span>
              </div>
              <span className="text-xs" style={{ fontFamily: 'Open Sans', fontSize: '11px' }}>
                Local businesses + contact info
              </span>
              {activeTab === 'google' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#02a4bf]" />}
            </button>

            <button
              onClick={() => setActiveTab('linkedin')}
              className={`flex flex-col items-center justify-center gap-2 p-4 transition-colors relative border-l ${
                activeTab === 'linkedin'
                  ? 'bg-[#02a4bf] text-white'
                  : 'text-[#6B7280] hover:bg-[#F0F9FA]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Linkedin className="h-5 w-5" />
                <span style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}>LinkedIn</span>
              </div>
              <span className="text-xs" style={{ fontFamily: 'Open Sans', fontSize: '11px' }}>
                Post scrapers + profile search
              </span>
              {activeTab === 'linkedin' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#02a4bf]" />}
            </button>
          </div>
        </Card>

        {/* LinkedIn Sub-tabs */}
        {activeTab === 'linkedin' && (
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setLinkedInSubTab('post-comments')}
              className={`pb-2 transition-colors ${
                linkedInSubTab === 'post-comments'
                  ? 'text-[#02a4bf] border-b-2 border-[#02a4bf]'
                  : 'text-[#6B7280] hover:text-[#02a4bf]'
              }`}
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '15px' }}
            >
              Post Comments
            </button>
            <button
              onClick={() => setLinkedInSubTab('profile-search')}
              className={`pb-2 transition-colors ${
                linkedInSubTab === 'profile-search'
                  ? 'text-[#02a4bf] border-b-2 border-[#02a4bf]'
                  : 'text-[#6B7280] hover:text-[#02a4bf]'
              }`}
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '15px' }}
            >
              Profile Search
            </button>
          </div>
        )}

        {/* Form Content */}
        <Card className="p-6">
          {activeTab === 'hunter' && renderHunterTab()}
          {activeTab === 'google' && renderGoogleTab()}
          {activeTab === 'linkedin' && (
            <>
              {linkedInSubTab === 'post-comments' && renderLinkedInPostTab()}
              {linkedInSubTab === 'profile-search' && renderLinkedInProfileTab()}
            </>
          )}

          {/* Form Actions */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              className="h-11 px-8"
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="h-11 px-8 bg-[#02a4bf] hover:bg-[#028a9f] text-white"
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {activeTab === 'linkedin' ? 'Starting Scrape...' : 'Starting Search...'}
                </>
              ) : (
                activeTab === 'linkedin' ? 'Start Scraping' : 'Start Search'
              )}
            </Button>
          </div>
        </Card>
      </div>

      {/* Loading Modal */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-[400px] p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Loader2 className="h-16 w-16 text-[#02a4bf] animate-spin" />
              <h3 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}>
                Starting Your Campaign
              </h3>
              <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                {loadingStep}
              </p>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-[#02a4bf] animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}