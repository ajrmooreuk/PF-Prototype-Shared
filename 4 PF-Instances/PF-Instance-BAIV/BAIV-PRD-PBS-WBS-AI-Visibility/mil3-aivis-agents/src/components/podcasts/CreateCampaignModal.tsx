import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { callEccoAPI } from '../../lib/eccoAPI';
import { toast } from 'sonner@2.0.3';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (campaignId: string) => void;
}

const PODCAST_CATEGORIES = [
  'Business',
  'Marketing',
  'Technology',
  'Entrepreneurship',
  'B2B',
  'SaaS',
  'Sales',
  'Leadership',
  'Innovation',
  'AI & Machine Learning',
  'Content Strategy',
  'Growth Hacking'
];

export function CreateCampaignModal({ isOpen, onClose, onSuccess }: CreateCampaignModalProps) {
  const [campaignName, setCampaignName] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [audienceSize, setAudienceSize] = useState<string>('any');
  const [language, setLanguage] = useState('English');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keywordInput.trim()) {
      e.preventDefault();
      if (!keywords.includes(keywordInput.trim())) {
        setKeywords([...keywords, keywordInput.trim()]);
        setKeywordInput('');
        setErrors({ ...errors, keywords: '' });
      }
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (campaignName.length < 3) {
      newErrors.campaignName = 'Campaign name must be at least 3 characters';
    }

    if (keywords.length === 0) {
      newErrors.keywords = 'Add at least one keyword';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Create campaign
      const campaignData = {
        name: campaignName,
        keywords: keywords,
        categories: selectedCategories,
        audience_size: audienceSize === 'any' ? null : audienceSize,
        language: language
      };

      const result = await callEccoAPI('/api/podcasts/campaigns', 'POST', campaignData);

      // Auto-start podcast search
      await callEccoAPI(`/api/podcasts/campaigns/${result.id}/search`, 'POST', {
        max_results: 20,
        min_relevance_score: 6.0
      });

      toast.success('🔍 Searching for podcasts... (~2 minutes)');
      onSuccess(result.id);
    } catch (error) {
      console.error('Failed to create campaign:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create campaign');
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-start justify-between">
          <div>
            <h2 className="text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>Create New Campaign</h2>
            <p className="text-gray-600" style={{ fontFamily: 'Open Sans' }}>Search for relevant podcasts to pitch</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#02a4bf] transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          {/* Campaign Name */}
          <div>
            <Label htmlFor="campaignName" className="text-gray-700 mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
              Campaign Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="campaignName"
              value={campaignName}
              onChange={(e) => {
                setCampaignName(e.target.value);
                setErrors({ ...errors, campaignName: '' });
              }}
              placeholder="e.g., Q4 2025 B2B Marketing Outreach"
              className={errors.campaignName ? 'border-red-500' : ''}
              style={{ fontFamily: 'Open Sans' }}
            />
            {errors.campaignName && (
              <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Open Sans' }}>{errors.campaignName}</p>
            )}
          </div>

          {/* Keywords */}
          <div>
            <Label htmlFor="keywords" className="text-gray-700 mb-2 block">
              Keywords <span className="text-red-500">*</span>
            </Label>
            <div className={`border rounded-lg p-2 ${errors.keywords ? 'border-red-500' : 'border-gray-300'}`}>
              {/* Selected Keywords */}
              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#E6F7F9] text-[#02a4bf] rounded-full text-sm"
                    >
                      {keyword}
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="hover:text-[#005260]"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              
              {/* Input */}
              <Input
                id="keywords"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeywordKeyDown}
                placeholder="Type keyword and press Enter"
                className="border-0 focus-visible:ring-0 p-0"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Add 3-5 keywords related to your expertise (e.g., "B2B marketing", "content strategy")
            </p>
            {errors.keywords && (
              <p className="text-red-500 text-sm mt-1">{errors.keywords}</p>
            )}
          </div>

          {/* Categories */}
          <div>
            <Label className="text-gray-700 mb-2 block">
              Podcast Categories
            </Label>
            <div className="border border-gray-300 rounded-lg p-4 max-h-48 overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                {PODCAST_CATEGORIES.map((category) => (
                  <div key={category} className="flex items-center gap-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedCategories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Audience Size */}
          <div>
            <Label className="text-gray-700 mb-3 block">
              Target Audience Size
            </Label>
            <RadioGroup value={audienceSize} onValueChange={setAudienceSize}>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="any" id="any" />
                  <label htmlFor="any" className="text-sm text-gray-700 cursor-pointer">
                    Any Size
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="small" id="small" />
                  <label htmlFor="small" className="text-sm text-gray-700 cursor-pointer">
                    Small (&lt; 1K)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <label htmlFor="medium" className="text-sm text-gray-700 cursor-pointer">
                    Medium (1K-10K)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="large" id="large" />
                  <label htmlFor="large" className="text-sm text-gray-700 cursor-pointer">
                    Large (10K-50K)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="very_large" id="very_large" />
                  <label htmlFor="very_large" className="text-sm text-gray-700 cursor-pointer">
                    Very Large (&gt; 50K)
                  </label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Language */}
          <div>
            <Label htmlFor="language" className="text-gray-700 mb-2 block">
              Language
            </Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
                <SelectItem value="German">German</SelectItem>
                <SelectItem value="Portuguese">Portuguese</SelectItem>
                <SelectItem value="Italian">Italian</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-8 py-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#02a4bf] hover:bg-[#018a9f] text-white min-w-[180px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              'Create & Search'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}