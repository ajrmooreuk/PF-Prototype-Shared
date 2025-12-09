import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import { Progress } from '../ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Search,
  ChevronRight,
  MoreVertical,
  ExternalLink,
  Plus,
  Users,
  Heart,
  BarChart3,
  Target,
  Check
} from 'lucide-react';
import { callEccoAPI } from '../../lib/eccoAPI';
import { toast } from 'sonner@2.0.3';

interface ICPProfile {
  id: string;
  name: string;
  description: string;
}

interface Ambassador {
  id: string;
  full_name: string;
  platform: string;
  platform_username: string;
  platform_url: string;
  follower_count: number;
  avg_engagement_rate: number;
  total_posts: number;
  bio: string;
  profile_image_url: string;
  icp_alignment_score: number;
  recommended_priority: string;
  match_signals: string[];
  already_in_list: boolean;
}

const platformOptions = [
  { value: 'instagram', label: 'Instagram', icon: '📷', color: '#E4405F' },
  { value: 'youtube', label: 'YouTube', icon: '▶️', color: '#FF0000' },
  { value: 'tiktok', label: 'TikTok', icon: '🎵', color: '#000000' }
];

const contentCategories = [
  'Tech',
  'Business', 
  'Marketing',
  'Lifestyle',
  'Education',
  'Entertainment'
];

function getScoreConfig(score: number) {
  if (score >= 80) {
    return {
      color: '#10B981',
      bgColor: '#D1FAE5',
      label: 'Excellent Match',
      icon: '🎯'
    };
  } else if (score >= 60) {
    return {
      color: '#F59E0B',
      bgColor: '#FEF3C7',
      label: 'Good Match',
      icon: '✓'
    };
  } else if (score >= 40) {
    return {
      color: '#F97316',
      bgColor: '#FFEDD5',
      label: 'Fair Match',
      icon: '~'
    };
  } else {
    return {
      color: '#EF4444',
      bgColor: '#FEE2E2',
      label: 'Poor Match',
      icon: '✗'
    };
  }
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
}

export function AmbassadorDiscoveryPage() {
  const [icpProfiles, setIcpProfiles] = useState<ICPProfile[]>([]);
  const [searchForm, setSearchForm] = useState({
    platform: '',
    icp_profile_id: '',
    search_keywords: [] as string[],
    keyword_input: '',
    min_followers: '',
    max_followers: '',
    content_categories: [] as string[],
    max_results: 20
  });
  const [searching, setSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [searchMessage, setSearchMessage] = useState('');
  const [results, setResults] = useState<Ambassador[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortBy, setSortBy] = useState('icp_score');
  const [minScoreFilter, setMinScoreFilter] = useState('all');
  const [addedAmbassadors, setAddedAmbassadors] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadICPProfiles();
  }, []);

  const loadICPProfiles = async () => {
    try {
      // NOTE: /api/v1/icp-profiles endpoint not yet implemented in backend
      // Using default data to prevent 404 errors
      // TODO: Backend needs to implement GET /api/v1/icp-profiles endpoint
      console.log('AmbassadorDiscoveryPage: Using default ICP profiles (endpoint not implemented)');
      
      const defaultProfiles: ICPProfile[] = [
        {
          id: 'icp_default_001',
          name: 'Default Profile',
          description: 'Default ICP profile for ambassador discovery'
        }
      ];
      
      setIcpProfiles(defaultProfiles);
      
      // Auto-select if only one profile
      if (defaultProfiles.length === 1) {
        setSearchForm(prev => ({ ...prev, icp_profile_id: defaultProfiles[0].id }));
      }
    } catch (error) {
      console.error('Failed to load ICP profiles:', error);
    }
  };

  const handleAddKeyword = () => {
    if (searchForm.keyword_input.trim() && searchForm.search_keywords.length < 5) {
      setSearchForm({
        ...searchForm,
        search_keywords: [...searchForm.search_keywords, searchForm.keyword_input.trim()],
        keyword_input: ''
      });
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setSearchForm({
      ...searchForm,
      search_keywords: searchForm.search_keywords.filter((_, i) => i !== index)
    });
  };

  const toggleCategory = (category: string) => {
    const categories = searchForm.content_categories;
    if (categories.includes(category)) {
      setSearchForm({
        ...searchForm,
        content_categories: categories.filter(c => c !== category)
      });
    } else {
      setSearchForm({
        ...searchForm,
        content_categories: [...categories, category]
      });
    }
  };

  const handleSearch = async () => {
    if (!searchForm.platform) {
      toast.error('Please select a platform');
      return;
    }
    if (!searchForm.icp_profile_id) {
      toast.error('Please select an ICP profile');
      return;
    }

    setSearching(true);
    setSearchProgress(0);
    setHasSearched(true);

    // Simulate progress
    const progressMessages = [
      { progress: 15, message: 'Finding profiles...' },
      { progress: 40, message: 'Analyzing engagement...' },
      { progress: 70, message: 'Calculating ICP scores...' },
      { progress: 95, message: 'Preparing results...' }
    ];

    let currentStep = 0;
    const progressInterval = setInterval(() => {
      if (currentStep < progressMessages.length) {
        setSearchProgress(progressMessages[currentStep].progress);
        setSearchMessage(progressMessages[currentStep].message);
        currentStep++;
      }
    }, 800);

    try {
      const searchData: any = {
        platform: searchForm.platform,
        icp_profile_id: searchForm.icp_profile_id,
        max_results: searchForm.max_results
      };

      if (searchForm.search_keywords.length > 0) {
        searchData.search_keywords = searchForm.search_keywords;
      }
      if (searchForm.min_followers) {
        searchData.min_followers = parseInt(searchForm.min_followers.replace(/,/g, ''));
      }
      if (searchForm.max_followers) {
        searchData.max_followers = parseInt(searchForm.max_followers.replace(/,/g, ''));
      }

      const data = await callEccoAPI('/api/v1/brand-ambassadors/discover', 'POST', searchData);
      
      clearInterval(progressInterval);
      setSearchProgress(100);
      setSearchMessage('Complete!');
      
      setTimeout(() => {
        setResults(data.ambassadors || []);
        setSearching(false);
        toast.success(`✓ Discovery Complete - Found ${data.ambassadors_found} ambassadors`);
      }, 500);
    } catch (error) {
      clearInterval(progressInterval);
      setSearching(false);
      toast.error('Search failed. Please try again.');
    }
  };

  const handleAddToList = async (ambassador: Ambassador) => {
    try {
      await callEccoAPI('/api/v1/brand-ambassadors', 'POST', ambassador);
      setAddedAmbassadors(new Set([...addedAmbassadors, ambassador.id]));
      toast.success(`✓ Added ${ambassador.full_name} to your list`);
    } catch (error: any) {
      if (error.message?.includes('already exists')) {
        toast.info('This ambassador is already in your list');
      } else {
        toast.error('Failed to add ambassador');
      }
    }
  };

  const getFilteredAndSortedResults = () => {
    let filtered = [...results];

    // Filter by min score
    if (minScoreFilter !== 'all') {
      const minScore = parseInt(minScoreFilter);
      filtered = filtered.filter(a => a.icp_alignment_score >= minScore);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'icp_score':
          return b.icp_alignment_score - a.icp_alignment_score;
        case 'followers':
          return b.follower_count - a.follower_count;
        case 'engagement':
          return b.avg_engagement_rate - a.avg_engagement_rate;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredResults = getFilteredAndSortedResults();
  const isFormValid = searchForm.platform && searchForm.icp_profile_id;

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-6">
          <span>Dashboard</span>
          <ChevronRight className="w-4 h-4" />
          <span>Brand Ambassadors</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#005260]">Discovery</span>
        </div>

        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[#005260] text-3xl mb-2">Influencer Discovery</h1>
            <p className="text-[#6B7280]">Find and score brand ambassadors aligned with your ICP</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${searching ? 'bg-[#e84e1c]' : 'bg-green-500'}`}></div>
            <span className="text-sm text-[#6B7280]">
              {searching ? 'Searching...' : 'Ready to Search'}
            </span>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Search Form Sidebar */}
          <div className="w-[340px] shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">
              <h3 className="text-[#005260] text-lg mb-6">Search Criteria</h3>

              {/* Platform Selection */}
              <div className="mb-6">
                <Label className="text-[#005260] mb-3 block">Platform</Label>
                <div className="space-y-3">
                  {platformOptions.map((platform) => (
                    <button
                      key={platform.value}
                      onClick={() => setSearchForm({ ...searchForm, platform: platform.value })}
                      className={`w-full h-20 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                        searchForm.platform === platform.value
                          ? 'border-[#02a4bf] bg-[#E6F7F9]'
                          : 'border-gray-200 bg-white hover:bg-[#f5f7fa]'
                      }`}
                    >
                      <span className="text-3xl">{platform.icon}</span>
                      <span className="text-sm">{platform.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ICP Profile */}
              <div className="mb-6">
                <Label className="text-[#005260] mb-2 block">
                  ICP Profile <span className="text-red-500">*</span>
                </Label>
                <Select value={searchForm.icp_profile_id} onValueChange={(value) => setSearchForm({ ...searchForm, icp_profile_id: value })}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select ICP Profile..." />
                  </SelectTrigger>
                  <SelectContent>
                    {icpProfiles.map((profile) => (
                      <SelectItem key={profile.id} value={profile.id}>
                        {profile.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Keywords */}
              <div className="mb-6">
                <Label className="text-[#005260] mb-2 block">Keywords (Optional)</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="e.g., SaaS, startup, marketing"
                    value={searchForm.keyword_input}
                    onChange={(e) => setSearchForm({ ...searchForm, keyword_input: e.target.value })}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddKeyword();
                      }
                    }}
                    disabled={searchForm.search_keywords.length >= 5}
                  />
                  <Button
                    size="sm"
                    onClick={handleAddKeyword}
                    disabled={searchForm.search_keywords.length >= 5}
                    className="bg-[#02a4bf] hover:bg-[#018a9f]"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {searchForm.search_keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {searchForm.search_keywords.map((keyword, index) => (
                      <Badge key={index} className="bg-[#E6F7F9] text-[#02a4bf] hover:bg-[#d0f0f5]">
                        {keyword}
                        <button
                          onClick={() => handleRemoveKeyword(index)}
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <p className="text-xs text-[#9ca3af]">Up to 5 keywords</p>
              </div>

              {/* Follower Range */}
              <div className="mb-6">
                <Label className="text-[#005260] mb-2 block">Follower Range</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="10,000"
                    value={searchForm.min_followers}
                    onChange={(e) => {
                      const value = e.target.value.replace(/,/g, '');
                      if (!isNaN(Number(value)) || value === '') {
                        setSearchForm({ ...searchForm, min_followers: value ? Number(value).toLocaleString() : '' });
                      }
                    }}
                    className="flex-1"
                  />
                  <span className="text-xs text-[#9ca3af]">to</span>
                  <Input
                    type="text"
                    placeholder="100,000"
                    value={searchForm.max_followers}
                    onChange={(e) => {
                      const value = e.target.value.replace(/,/g, '');
                      if (!isNaN(Number(value)) || value === '') {
                        setSearchForm({ ...searchForm, max_followers: value ? Number(value).toLocaleString() : '' });
                      }
                    }}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Content Categories */}
              <div className="mb-6">
                <Label className="text-[#005260] mb-3 block">Content Categories</Label>
                <div className="space-y-2">
                  {contentCategories.map((category) => (
                    <div key={category} className="flex items-center gap-2">
                      <Checkbox
                        id={category}
                        checked={searchForm.content_categories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label htmlFor={category} className="text-sm text-[#005260] cursor-pointer">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Max Results */}
              <div className="mb-6">
                <Label className="text-[#005260] mb-3 block">Max Results</Label>
                <div className="mb-2">
                  <span className="text-[#02a4bf] text-lg">{searchForm.max_results} results</span>
                </div>
                <Slider
                  value={[searchForm.max_results]}
                  onValueChange={(values) => setSearchForm({ ...searchForm, max_results: values[0] })}
                  min={10}
                  max={100}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                disabled={!isFormValid || searching}
                className="w-full h-13 bg-[#02a4bf] hover:bg-[#018a9f] disabled:bg-gray-300 text-white"
              >
                {searching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search Influencers
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1">
            {searching && (
              <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
                <Progress value={searchProgress} className="mb-4" />
                <p className="text-center text-[#6B7280] text-sm">
                  {searchProgress}% - {searchMessage}
                </p>
              </div>
            )}

            {!hasSearched && !searching && (
              <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
                <div className="text-8xl mb-6">🔍</div>
                <h3 className="text-2xl text-[#005260] mb-3">Ready to Discover Ambassadors</h3>
                <p className="text-[#6B7280] max-w-md mx-auto">
                  Select a platform and ICP profile, then click Search to find aligned influencers
                </p>
              </div>
            )}

            {hasSearched && !searching && results.length > 0 && (
              <>
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[#005260] text-lg">
                    Found {filteredResults.length} ambassadors
                  </h3>
                  <div className="flex gap-3">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Sort by..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="icp_score">ICP Score</SelectItem>
                        <SelectItem value="followers">Followers</SelectItem>
                        <SelectItem value="engagement">Engagement Rate</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={minScoreFilter} onValueChange={setMinScoreFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Min Score..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Scores</SelectItem>
                        <SelectItem value="80">80+ (Excellent)</SelectItem>
                        <SelectItem value="60">60+ (Good)</SelectItem>
                        <SelectItem value="40">40+ (Fair)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-2 gap-5">
                  {filteredResults.map((ambassador) => {
                    const scoreConfig = getScoreConfig(ambassador.icp_alignment_score);
                    const platform = platformOptions.find(p => p.value === ambassador.platform);
                    const isAdded = addedAmbassadors.has(ambassador.id) || ambassador.already_in_list;

                    return (
                      <div
                        key={ambassador.id}
                        className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Badge
                              style={{ backgroundColor: platform?.color }}
                              className="text-white text-xs px-2 py-1"
                            >
                              {platform?.icon} {platform?.label.substring(0, 2).toUpperCase()}
                            </Badge>
                            <span className="text-sm text-[#005260]">@{ambassador.platform_username}</span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="text-[#9ca3af] hover:text-[#02a4bf]">
                                <MoreVertical className="w-5 h-5" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => window.open(ambassador.platform_url, '_blank')}>
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* ICP Score */}
                        <div className="flex justify-center mb-4">
                          <div
                            className="px-6 py-3 rounded-full text-center"
                            style={{ backgroundColor: scoreConfig.bgColor }}
                          >
                            <div className="text-3xl mb-1" style={{ color: scoreConfig.color }}>
                              {ambassador.icp_alignment_score}
                            </div>
                            <div className="text-xs" style={{ color: scoreConfig.color }}>
                              ICP Match
                            </div>
                          </div>
                        </div>

                        <Progress
                          value={ambassador.icp_alignment_score}
                          className="h-1 mb-4"
                          style={{ backgroundColor: scoreConfig.bgColor }}
                        />

                        {/* Profile Details */}
                        <div className="mb-4">
                          <h4 className="text-[#005260] text-lg mb-1">{ambassador.full_name}</h4>
                          <p className="text-[#6B7280] text-sm line-clamp-2">{ambassador.bio}</p>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="text-center">
                            <Users className="w-4 h-4 text-[#9ca3af] mx-auto mb-1" />
                            <div className="text-[#005260] text-base">{formatNumber(ambassador.follower_count)}</div>
                            <div className="text-[#9ca3af] text-xs">Followers</div>
                          </div>
                          <div className="text-center">
                            <Heart className="w-4 h-4 text-[#9ca3af] mx-auto mb-1" />
                            <div className="text-[#005260] text-base">{ambassador.avg_engagement_rate}%</div>
                            <div className="text-[#9ca3af] text-xs">Engagement</div>
                          </div>
                          <div className="text-center">
                            <BarChart3 className="w-4 h-4 text-[#9ca3af] mx-auto mb-1" />
                            <div className="text-[#005260] text-base">{formatNumber(ambassador.total_posts)}</div>
                            <div className="text-[#9ca3af] text-xs">Posts</div>
                          </div>
                        </div>

                        {/* Match Signals */}
                        <div className="bg-[#E6F7F9] rounded-lg p-3 mb-4">
                          <p className="text-[#02a4bf] text-xs mb-2">Match Signals:</p>
                          <ul className="space-y-1">
                            {ambassador.match_signals.slice(0, 3).map((signal, index) => (
                              <li key={index} className="flex items-start gap-2 text-xs text-[#005260]">
                                <span className="text-[#02a4bf]">✓</span>
                                <span>{signal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          {isAdded ? (
                            <Button
                              disabled
                              className="flex-1 bg-gray-400 text-white cursor-not-allowed"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Already Added
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleAddToList(ambassador)}
                              className="flex-1 bg-[#02a4bf] hover:bg-[#018a9f] text-white"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add to List
                            </Button>
                          )}
                          <Button
                            onClick={() => window.open(ambassador.platform_url, '_blank')}
                            variant="outline"
                            className="flex-1 border-[#02a4bf] text-[#02a4bf]"
                          >
                            View Profile
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {hasSearched && !searching && filteredResults.length === 0 && results.length > 0 && (
              <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl text-[#005260] mb-2">No Results Found</h3>
                <p className="text-[#6B7280] mb-4">Try adjusting your filters or search terms</p>
                <Button
                  onClick={() => setMinScoreFilter('all')}
                  variant="outline"
                  className="text-[#02a4bf]"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}