import React, { useState, useEffect } from 'react';
import { Plus, Search, Grid3x3, List, MoreVertical, TrendingUp, Mail, Calendar, CheckCircle, Podcast, Play, Pause, Archive, Trash2, Eye, Users, Loader2, AlertCircle, Target } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { CreateCampaignModal } from './CreateCampaignModal';
import { callEccoAPI } from '../../lib/eccoAPI';
import { toast } from 'sonner@2.0.3';

interface Campaign {
  id: string;
  tenant_id: string;
  name: string;
  search_criteria: {
    keywords: string[];
    categories: string[];
    audience_size: string;
    language: string;
    use_icp_context: boolean;
  };
  podcasts_found: number;
  high_value_count: number;
  outreach_sent: number;
  responses_received: number;
  bookings_confirmed: number;
  status: 'active' | 'paused' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
}

type ViewMode = 'grid' | 'list';
type StatusFilter = 'all' | 'active' | 'paused' | 'completed';
type SortOption = 'newest' | 'oldest' | 'podcasts' | 'bookings';

export function PodcastCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadCampaigns();
  }, []);

  useEffect(() => {
    filterAndSortCampaigns();
  }, [campaigns, statusFilter, searchTerm, sortBy]);

  const loadCampaigns = async () => {
    try {
      setError(null);
      setIsLoading(true);
      
      const data = await callEccoAPI('/api/podcasts/campaigns', 'GET');
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setCampaigns(data);
      } else if (data && typeof data === 'object' && Array.isArray(data.campaigns)) {
        setCampaigns(data.campaigns);
      } else {
        console.warn('API returned unexpected data format:', data);
        setCampaigns([]);
      }
    } catch (err) {
      console.error('Failed to load campaigns:', err);
      setError(err instanceof Error ? err.message : 'Failed to load campaigns');
      setCampaigns([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortCampaigns = () => {
    let filtered = [...campaigns];

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(term) ||
        c.search_criteria.keywords.some(k => k.toLowerCase().includes(term))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'podcasts':
          return b.podcasts_found - a.podcasts_found;
        case 'bookings':
          return b.bookings_confirmed - a.bookings_confirmed;
        default:
          return 0;
      }
    });

    setFilteredCampaigns(filtered);
  };

  const updateCampaignStatus = async (campaignId: string, newStatus: Campaign['status']) => {
    try {
      await callEccoAPI(`/api/podcasts/campaigns/${campaignId}?status=${newStatus}`, 'PATCH');

      setCampaigns(prev => prev.map(c => 
        c.id === campaignId ? { ...c, status: newStatus, updated_at: new Date().toISOString() } : c
      ));

      toast.success(`Campaign ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update campaign status');
      console.error(err);
    }
  };

  const deleteCampaign = async (campaignId: string) => {
    if (!confirm('Delete this campaign and all its leads?')) return;

    try {
      await callEccoAPI(`/api/podcasts/campaigns/${campaignId}`, 'DELETE');

      setCampaigns(prev => prev.filter(c => c.id !== campaignId));
      toast.success('Campaign deleted');
    } catch (err) {
      toast.error('Failed to delete campaign');
      console.error(err);
    }
  };

  const searchMorePodcasts = async (campaignId: string) => {
    try {
      await callEccoAPI(`/api/podcasts/campaigns/${campaignId}/search`, 'POST', { max_results: 20, min_relevance_score: 6.0 });

      toast.success('🔍 Searching for podcasts... (~2 minutes)');
      
      // Reload campaigns after a delay
      setTimeout(() => loadCampaigns(), 3000);
    } catch (err) {
      toast.error('Failed to start podcast search');
      console.error(err);
    }
  };

  const calculateBookingRate = (campaign: Campaign): string => {
    if (campaign.outreach_sent === 0) return '0%';
    return Math.round((campaign.bookings_confirmed / campaign.outreach_sent) * 100) + '%';
  };

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusConfig = (status: Campaign['status']) => {
    const configs = {
      active: { label: 'ACTIVE', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' },
      paused: { label: 'PAUSED', color: '#fbbf24', bgColor: 'rgba(251, 191, 36, 0.1)' },
      completed: { label: 'COMPLETED', color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)' },
      archived: { label: 'ARCHIVED', color: '#9ca3af', bgColor: 'rgba(156, 163, 175, 0.1)' }
    };
    return configs[status];
  };

  const getStatusCounts = () => {
    // Ensure campaigns is an array before filtering
    const campaignsArray = Array.isArray(campaigns) ? campaigns : [];
    return {
      all: campaignsArray.length,
      active: campaignsArray.filter(c => c.status === 'active').length,
      paused: campaignsArray.filter(c => c.status === 'paused').length,
      completed: campaignsArray.filter(c => c.status === 'completed').length
    };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f3f4f6]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#02a4bf]" />
          <p className="text-gray-600" style={{ fontFamily: 'Open Sans' }}>Loading campaigns...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription style={{ fontFamily: 'Open Sans' }}>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Breadcrumb */}
          <div className="mb-3" style={{ fontFamily: 'Open Sans' }}>
            <span className="text-[#6B7280] text-sm">Dashboard &gt; Podcasts &gt; Campaigns</span>
          </div>

          {/* Title Row */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-[32px] text-black mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                Podcast Campaigns
              </h1>
              <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans' }}>
                Manage your podcast discovery campaigns
              </p>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-[#02a4bf] hover:bg-[#018a9f] text-white h-11 px-6"
              style={{ fontFamily: 'Poppins', fontWeight: 500 }}
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        
        {/* Tabs and Filters Card */}
        <Card className="mb-6 bg-white overflow-hidden">
          {/* Status Tabs */}
          <div className="flex border-b border-gray-200">
            {[
              { key: 'all', label: 'All Campaigns', count: statusCounts.all },
              { key: 'active', label: 'Active', count: statusCounts.active },
              { key: 'paused', label: 'Paused', count: statusCounts.paused },
              { key: 'completed', label: 'Completed', count: statusCounts.completed }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key as StatusFilter)}
                className={`px-6 py-4 transition-all ${
                  statusFilter === tab.key
                    ? 'bg-[#02a4bf] text-white border-b-4 border-[#02a4bf]'
                    : 'text-[#6B7280] hover:bg-[#F0F9FA]'
                }`}
                style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="p-5 flex items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11"
                style={{ fontFamily: 'Open Sans' }}
              />
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>Sort by:</span>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-[180px] h-11" style={{ fontFamily: 'Open Sans' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="podcasts">Most Podcasts</SelectItem>
                    <SelectItem value="bookings">Most Bookings</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-[#02a4bf] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid3x3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-[#02a4bf] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Empty State */}
        {filteredCampaigns.length === 0 && !isLoading && (
          <Card className="p-16 bg-white text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <Target className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-black text-xl mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                {searchTerm ? 'No campaigns found' : 'No Campaigns Yet'}
              </h3>
              <p className="text-gray-600 mb-6" style={{ fontFamily: 'Open Sans' }}>
                {searchTerm 
                  ? 'Try adjusting your search or filters'
                  : 'Create your first campaign to discover relevant podcasts'}
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-[#02a4bf] hover:bg-[#018a9f] text-white h-12 px-6"
                  style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create First Campaign
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && filteredCampaigns.length > 0 && (
          <div className="grid grid-cols-3 gap-6">
            {filteredCampaigns.map(campaign => {
              const statusConfig = getStatusConfig(campaign.status);
              const bookingRate = calculateBookingRate(campaign);
              
              return (
                <Card key={campaign.id} className="p-6 bg-white hover:shadow-lg transition-all">
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 
                      className="text-black flex-1 cursor-pointer hover:text-[#02a4bf] line-clamp-2"
                      style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}
                      onClick={() => window.location.href = `/podcasts/campaigns/${campaign.id}`}
                    >
                      {campaign.name}
                    </h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-gray-400 hover:text-[#02a4bf] p-1">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem onClick={() => window.location.href = `/podcasts/campaigns/${campaign.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.location.href = `/podcasts/leads?campaign_id=${campaign.id}`}>
                          <Users className="h-4 w-4 mr-2" />
                          View Leads
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => searchMorePodcasts(campaign.id)}>
                          <Search className="h-4 w-4 mr-2" />
                          Search More Podcasts
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {campaign.status === 'active' ? (
                          <DropdownMenuItem onClick={() => updateCampaignStatus(campaign.id, 'paused')}>
                            <Pause className="h-4 w-4 mr-2" />
                            Pause Campaign
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => updateCampaignStatus(campaign.id, 'active')}>
                            <Play className="h-4 w-4 mr-2" />
                            Resume Campaign
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => updateCampaignStatus(campaign.id, 'archived')}>
                          <Archive className="h-4 w-4 mr-2" />
                          Archive Campaign
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => deleteCampaign(campaign.id)} className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Campaign
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs uppercase"
                      style={{ 
                        backgroundColor: statusConfig.bgColor, 
                        color: statusConfig.color,
                        fontFamily: 'Poppins',
                        fontWeight: 500
                      }}
                    >
                      {statusConfig.label}
                    </span>
                  </div>

                  {/* Created Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4" style={{ fontFamily: 'Open Sans' }}>
                    <Calendar className="h-4 w-4" />
                    Created {formatDate(campaign.created_at)}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-4" />

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-[#02a4bf] mb-1" style={{ fontSize: '24px', fontFamily: 'Poppins', fontWeight: 700 }}>
                        {campaign.podcasts_found}
                      </div>
                      <div className="text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>Podcasts Found</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#e84e1c] mb-1" style={{ fontSize: '24px', fontFamily: 'Poppins', fontWeight: 700 }}>
                        {campaign.high_value_count}
                      </div>
                      <div className="text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>High Value</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#3b82f6] mb-1" style={{ fontSize: '24px', fontFamily: 'Poppins', fontWeight: 700 }}>
                        {campaign.outreach_sent}
                      </div>
                      <div className="text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>Outreach Sent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#8b5cf6] mb-1" style={{ fontSize: '24px', fontFamily: 'Poppins', fontWeight: 700 }}>
                        {campaign.responses_received}
                      </div>
                      <div className="text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>Responses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#10b981] mb-1" style={{ fontSize: '24px', fontFamily: 'Poppins', fontWeight: 700 }}>
                        {campaign.bookings_confirmed}
                      </div>
                      <div className="text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>Bookings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#10b981] mb-1" style={{ fontSize: '24px', fontFamily: 'Poppins', fontWeight: 700 }}>
                        {bookingRate}
                      </div>
                      <div className="text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>Booking Rate</div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-4" />

                  {/* Keywords Preview */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-600 mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>Target Keywords</div>
                    <div className="flex flex-wrap gap-2">
                      {campaign.search_criteria.keywords.slice(0, 3).map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-[#E6F7F9] text-[#02a4bf] rounded-full text-xs"
                          style={{ fontFamily: 'Open Sans' }}
                        >
                          {keyword}
                        </span>
                      ))}
                      {campaign.search_criteria.keywords.length > 3 && (
                        <span className="px-2 py-1 text-gray-500 text-xs" style={{ fontFamily: 'Open Sans' }}>
                          +{campaign.search_criteria.keywords.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Button
                    onClick={() => window.location.href = `/podcasts/campaigns/${campaign.id}`}
                    className="w-full bg-[#02a4bf] hover:bg-[#018a9f] text-white"
                    style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                  >
                    View Details
                  </Button>
                </Card>
              );
            })}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && filteredCampaigns.length > 0 && (
          <div className="space-y-4">
            {filteredCampaigns.map(campaign => {
              const statusConfig = getStatusConfig(campaign.status);
              const bookingRate = calculateBookingRate(campaign);
              const bookingRateNum = parseInt(bookingRate);
              
              return (
                <Card key={campaign.id} className="p-5 bg-white hover:bg-[#F0F9FA] transition-all">
                  <div className="flex items-center justify-between gap-6">
                    {/* Left Section */}
                    <div className="flex items-center gap-6 flex-1">
                      {/* Campaign Info */}
                      <div className="min-w-[280px]">
                        <h3 
                          className="text-black mb-1 cursor-pointer hover:text-[#02a4bf]"
                          style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}
                          onClick={() => window.location.href = `/podcasts/campaigns/${campaign.id}`}
                        >
                          {campaign.name}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-400" style={{ fontFamily: 'Open Sans' }}>
                            {formatDate(campaign.created_at)}
                          </span>
                          <span
                            className="px-2 py-1 rounded-full text-xs uppercase"
                            style={{ 
                              backgroundColor: statusConfig.bgColor, 
                              color: statusConfig.color,
                              fontFamily: 'Poppins',
                              fontWeight: 500
                            }}
                          >
                            {statusConfig.label}
                          </span>
                        </div>
                      </div>

                      {/* Keywords Preview */}
                      <div className="flex flex-wrap gap-2 min-w-[200px]">
                        {campaign.search_criteria.keywords.slice(0, 3).map((keyword, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-[#E6F7F9] text-[#02a4bf] rounded-full text-xs"
                            style={{ fontFamily: 'Open Sans' }}
                          >
                            {keyword}
                          </span>
                        ))}
                        {campaign.search_criteria.keywords.length > 3 && (
                          <span className="text-gray-500 text-xs py-1" style={{ fontFamily: 'Open Sans' }}>
                            +{campaign.search_criteria.keywords.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6">
                        <div className="text-center min-w-[70px]">
                          <div className="text-[#02a4bf]" style={{ fontSize: '20px', fontFamily: 'Poppins', fontWeight: 700 }}>
                            {campaign.podcasts_found}
                          </div>
                          <div className="text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>Podcasts</div>
                        </div>
                        <div className="text-center min-w-[70px]">
                          <div className="text-[#e84e1c]" style={{ fontSize: '20px', fontFamily: 'Poppins', fontWeight: 700 }}>
                            {campaign.high_value_count}
                          </div>
                          <div className="text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>High Value</div>
                        </div>
                        <div className="text-center min-w-[70px]">
                          <div className="text-[#3b82f6]" style={{ fontSize: '20px', fontFamily: 'Poppins', fontWeight: 700 }}>
                            {campaign.outreach_sent}
                          </div>
                          <div className="text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>Outreach</div>
                        </div>
                        <div className="text-center min-w-[70px]">
                          <div className="text-[#8b5cf6]" style={{ fontSize: '20px', fontFamily: 'Poppins', fontWeight: 700 }}>
                            {campaign.responses_received}
                          </div>
                          <div className="text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>Responses</div>
                        </div>
                        <div className="text-center min-w-[70px]">
                          <div className="text-[#10b981]" style={{ fontSize: '20px', fontFamily: 'Poppins', fontWeight: 700 }}>
                            {campaign.bookings_confirmed}
                          </div>
                          <div className="text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>Bookings</div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                      {/* Performance Circle */}
                      <div className="relative flex items-center justify-center">
                        <svg className="w-12 h-12 transform -rotate-90">
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="#e5e7eb"
                            strokeWidth="4"
                            fill="none"
                          />
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke={bookingRateNum > 20 ? '#10b981' : bookingRateNum > 10 ? '#e84e1c' : '#9ca3af'}
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={`${(bookingRateNum / 100) * 125.6} 125.6`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute text-xs" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                          {bookingRate}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => window.location.href = `/podcasts/campaigns/${campaign.id}`}
                          className="bg-[#02a4bf] hover:bg-[#018a9f] text-white"
                          style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                        >
                          View Details
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="text-gray-400 hover:text-[#02a4bf] p-2">
                              <MoreVertical className="h-5 w-5" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem onClick={() => window.location.href = `/podcasts/campaigns/${campaign.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.location.href = `/podcasts/leads?campaign_id=${campaign.id}`}>
                              <Users className="h-4 w-4 mr-2" />
                              View Leads
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => searchMorePodcasts(campaign.id)}>
                              <Search className="h-4 w-4 mr-2" />
                              Search More Podcasts
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {campaign.status === 'active' ? (
                              <DropdownMenuItem onClick={() => updateCampaignStatus(campaign.id, 'paused')}>
                                <Pause className="h-4 w-4 mr-2" />
                                Pause Campaign
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => updateCampaignStatus(campaign.id, 'active')}>
                                <Play className="h-4 w-4 mr-2" />
                                Resume Campaign
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => updateCampaignStatus(campaign.id, 'archived')}>
                              <Archive className="h-4 w-4 mr-2" />
                              Archive Campaign
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => deleteCampaign(campaign.id)} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Campaign
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <CreateCampaignModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={(campaignId) => {
            setShowCreateModal(false);
            toast.success('✓ Campaign created successfully!');
            window.location.href = `/podcasts/campaigns/${campaignId}`;
          }}
        />
      )}
    </div>
  );
}