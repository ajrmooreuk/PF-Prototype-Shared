import { useState, useEffect } from 'react';
import { ChevronRight, RefreshCw, Check, X, Edit, Grid3x3, List, Clock, ExternalLink, Copy, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Skeleton } from '../ui/skeleton';
import { toast } from 'sonner@2.0.3';
import { callEccoAPI } from '../../lib/eccoAPI';

interface ContentItem {
  id: string;
  tenant_id: string;
  ambassador_id: string;
  ambassador_name: string;
  ambassador_profile_image: string;
  campaign_id: string;
  campaign_name: string;
  platform: string;
  content_type: string;
  content_url: string;
  content_title: string;
  content_caption: string;
  thumbnail_url: string;
  tracking_url: string;
  published_at: string | null;
  submitted_at: string;
  approval_status: string;
  review_notes: string | null;
  estimated_reach: number;
  expected_engagement_rate: number;
  created_at: string;
}

export function ContentApprovalQueue() {
  const [contentQueue, setContentQueue] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'queue' | 'list'>('queue');
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [ambassadorFilter, setAmbassadorFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  
  // Modal states
  const [revisionsModalOpen, setRevisionsModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [fullViewModalOpen, setFullViewModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  
  // Form states
  const [revisionNotes, setRevisionNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [revisionChecks, setRevisionChecks] = useState({
    caption: false,
    hashtags: false,
    branding: false,
    cta: false,
    other: false
  });
  const [rejectionChecks, setRejectionChecks] = useState({
    brandGuidelines: false,
    quality: false,
    offBrand: false,
    campaign: false,
    other: false
  });
  const [confirmReject, setConfirmReject] = useState(false);
  const [processingAction, setProcessingAction] = useState(false);
  
  // List view selection
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      // NOTE: /api/v1/brand-ambassadors/content endpoint not yet implemented in backend
      // Using empty data to prevent 404 errors
      // TODO: Backend needs to implement GET /api/v1/brand-ambassadors/content endpoint
      console.log('ContentApprovalQueue: Using default empty content queue (endpoint not implemented)');
      
      setContentQueue([]);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      // NOTE: /api/v1/brand-ambassadors/content endpoint not yet implemented in backend
      // Using empty data to prevent 404 errors
      console.log('ContentApprovalQueue: Refresh - Using default empty content queue (endpoint not implemented)');
      
      setContentQueue([]);
      toast.success('Queue refreshed');
    } catch (error) {
      console.error('Error refreshing:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleApprove = async (content: ContentItem) => {
    try {
      await callEccoAPI(`/api/v1/brand-ambassadors/content/${content.id}`, 'PUT', {
        approval_status: 'approved',
        review_notes: `Approved on ${new Date().toLocaleDateString()}`
      });
      
      // Remove from queue with animation
      setContentQueue(prev => prev.filter(c => c.id !== content.id));
      
      // Show success toast
      toast.success('Content Approved', {
        description: `${content.ambassador_name} has been notified`,
      });
    } catch (error) {
      console.error('Error approving content:', error);
      toast.error('Failed to approve content');
    }
  };

  const handleRequestRevisions = async () => {
    if (!revisionNotes.trim()) {
      toast.error('Please provide feedback for the ambassador');
      return;
    }

    if (revisionNotes.length > 1000) {
      toast.error('Review notes must be under 1000 characters');
      return;
    }

    try {
      setProcessingAction(true);
      await callEccoAPI(`/api/v1/brand-ambassadors/content/${selectedContent?.id}`, 'PUT', {
        approval_status: 'revision_requested',
        review_notes: revisionNotes
      });
      
      // Remove from pending queue
      setContentQueue(prev => prev.filter(c => c.id !== selectedContent?.id));
      
      toast('Revisions Requested', {
        description: 'Ambassador will be notified (manual email may be required)',
      });
      
      // Close modal and reset
      setRevisionsModalOpen(false);
      setRevisionNotes('');
      setRevisionChecks({
        caption: false,
        hashtags: false,
        branding: false,
        cta: false,
        other: false
      });
      setSelectedContent(null);
    } catch (error) {
      console.error('Error requesting revisions:', error);
      toast.error('Failed to request revisions');
    } finally {
      setProcessingAction(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error('Rejection reason is required');
      return;
    }

    if (!confirmReject) {
      toast.error('Please confirm rejection');
      return;
    }

    try {
      setProcessingAction(true);
      await callEccoAPI(`/api/v1/brand-ambassadors/content/${selectedContent?.id}`, 'PUT', {
        approval_status: 'rejected',
        review_notes: rejectionReason
      });
      
      // Remove from queue
      setContentQueue(prev => prev.filter(c => c.id !== selectedContent?.id));
      
      toast('Content Rejected', {
        description: 'Content has been removed from the queue',
      });
      
      // Close modal and reset
      setRejectModalOpen(false);
      setRejectionReason('');
      setRejectionChecks({
        brandGuidelines: false,
        quality: false,
        offBrand: false,
        campaign: false,
        other: false
      });
      setConfirmReject(false);
      setSelectedContent(null);
    } catch (error) {
      console.error('Error rejecting content:', error);
      toast.error('Failed to reject content');
    } finally {
      setProcessingAction(false);
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const submitted = new Date(timestamp);
    const diffMs = now.getTime() - submitted.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const getPlatformConfig = (platform: string) => {
    const configs: Record<string, { icon: string; label: string; color: string }> = {
      instagram: { icon: '📷', label: 'IG', color: '#E4405F' },
      youtube: { icon: '▶️', label: 'YT', color: '#FF0000' },
      tiktok: { icon: '🎵', label: 'TT', color: '#000000' },
      linkedin: { icon: '💼', label: 'LI', color: '#0077B5' },
      twitter: { icon: '🐦', label: 'TW', color: '#1DA1F2' }
    };
    return configs[platform.toLowerCase()] || { icon: '📱', label: platform.substring(0, 2).toUpperCase(), color: '#666' };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  // Filter content
  const filteredContent = contentQueue.filter(content => {
    if (campaignFilter !== 'all' && content.campaign_id !== campaignFilter) return false;
    if (ambassadorFilter !== 'all' && content.ambassador_id !== ambassadorFilter) return false;
    if (platformFilter !== 'all' && content.platform.toLowerCase() !== platformFilter.toLowerCase()) return false;
    return true;
  });

  // Get unique campaigns and ambassadors for filters
  const uniqueCampaigns = Array.from(new Set(contentQueue.map(c => c.campaign_id)));
  const uniqueAmbassadors = Array.from(new Set(contentQueue.map(c => c.ambassador_id)));
  const campaignCounts = contentQueue.reduce((acc, c) => {
    acc[c.campaign_id] = (acc[c.campaign_id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const ambassadorCounts = contentQueue.reduce((acc, c) => {
    acc[c.ambassador_id] = (acc[c.ambassador_id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-[#6B7280]" style={{ fontFamily: 'Open Sans' }}>
          <span>Dashboard</span>
          <ChevronRight className="w-4 h-4" />
          <span>Brand Ambassadors</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#005260]">Content Approval</span>
        </div>

        {/* Page Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}>
                Content Approval Queue
              </h1>
              <Badge 
                className="text-white px-4 py-1 animate-pulse" 
                style={{ 
                  backgroundColor: '#e84e1c',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: '18px'
                }}
              >
                {filteredContent.length} Pending
              </Badge>
            </div>
            <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
              Review and approve ambassador content submissions
            </p>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            size="icon"
            variant="outline"
            className="h-11 w-11 rounded-full"
            title="Refresh queue"
          >
            <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Campaign Filter */}
              <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                <SelectTrigger className="w-[200px] h-11" style={{ fontFamily: 'Open Sans' }}>
                  <SelectValue placeholder="All Campaigns" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  {uniqueCampaigns.map(campaignId => {
                    const campaign = contentQueue.find(c => c.campaign_id === campaignId);
                    return (
                      <SelectItem key={campaignId} value={campaignId}>
                        {campaign?.campaign_name} ({campaignCounts[campaignId] || 0})
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              {/* Ambassador Filter */}
              <Select value={ambassadorFilter} onValueChange={setAmbassadorFilter}>
                <SelectTrigger className="w-[200px] h-11" style={{ fontFamily: 'Open Sans' }}>
                  <SelectValue placeholder="All Ambassadors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ambassadors</SelectItem>
                  {uniqueAmbassadors.map(ambassadorId => {
                    const ambassador = contentQueue.find(c => c.ambassador_id === ambassadorId);
                    return (
                      <SelectItem key={ambassadorId} value={ambassadorId}>
                        {ambassador?.ambassador_name} ({ambassadorCounts[ambassadorId] || 0})
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              {/* Platform Filter */}
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-[160px] h-11" style={{ fontFamily: 'Open Sans' }}>
                  <SelectValue placeholder="All Platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="instagram">📷 Instagram</SelectItem>
                  <SelectItem value="youtube">▶️ YouTube</SelectItem>
                  <SelectItem value="tiktok">🎵 TikTok</SelectItem>
                  <SelectItem value="linkedin">💼 LinkedIn</SelectItem>
                  <SelectItem value="twitter">🐦 Twitter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('queue')}
                className={`px-4 py-2 flex items-center gap-2 transition-colors ${
                  viewMode === 'queue' 
                    ? 'bg-[#02a4bf] text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
              >
                <Grid3x3 className="h-4 w-4" />
                Queue View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 flex items-center gap-2 transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-[#02a4bf] text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
              >
                <List className="h-4 w-4" />
                List View
              </button>
            </div>
          </div>
        </div>

        {/* Content Display */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-6">
                <Skeleton className="h-12 w-full mb-4" />
                <Skeleton className="h-96 w-full mb-4" />
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
          </div>
        ) : filteredContent.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h2 className="text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}>
              All Caught Up!
            </h2>
            <p className="text-[#6B7280] mb-1" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
              No content awaiting approval
            </p>
            <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
              New submissions will appear here automatically
            </p>
          </div>
        ) : viewMode === 'queue' ? (
          <div className="max-w-[800px] mx-auto space-y-5">
            {filteredContent.map((content) => {
              const platformConfig = getPlatformConfig(content.platform);
              
              return (
                <div 
                  key={content.id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  id={`content-card-${content.id}`}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <img 
                        src={content.ambassador_profile_image} 
                        alt={content.ambassador_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
                            {content.ambassador_name}
                          </span>
                          <Badge 
                            className="px-2 py-0.5" 
                            style={{ 
                              backgroundColor: '#e84e1c',
                              color: 'white',
                              fontSize: '11px',
                              fontFamily: 'Open Sans',
                              fontWeight: 600
                            }}
                          >
                            {platformConfig.icon} {platformConfig.label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs">📋</span>
                          <span className="text-[#6B7280] text-sm" style={{ fontFamily: 'Open Sans' }}>
                            {content.campaign_name}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[#6B7280] text-sm" style={{ fontFamily: 'Open Sans' }}>
                      <Clock className="w-4 h-4" />
                      {getTimeAgo(content.submitted_at)}
                    </div>
                  </div>

                  {/* Content Preview */}
                  <div className="mb-5">
                    <Badge variant="outline" className="mb-4" style={{ fontSize: '11px' }}>
                      {content.content_type.charAt(0).toUpperCase() + content.content_type.slice(1)}
                    </Badge>
                    <div 
                      className="relative w-full h-96 rounded-xl overflow-hidden mb-4 cursor-pointer group"
                      onClick={() => {
                        setSelectedContent(content);
                        setFullViewModalOpen(true);
                      }}
                    >
                      <img 
                        src={content.thumbnail_url} 
                        alt={content.content_title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {(content.content_type === 'reel' || content.content_type === 'video' || content.content_type === 'short') && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <div className="w-16 h-16 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
                            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-gray-800 border-b-8 border-b-transparent ml-1"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <h3 
                      className="text-[#005260] mb-2 cursor-pointer hover:text-[#02a4bf]"
                      style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}
                      onClick={() => {
                        setSelectedContent(content);
                        setFullViewModalOpen(true);
                      }}
                    >
                      {content.content_title}
                    </h3>
                    <p className="text-[#6B7280] text-sm mb-2" style={{ fontFamily: 'Open Sans' }}>
                      {content.content_caption.length > 150 
                        ? content.content_caption.substring(0, 150) + '...' 
                        : content.content_caption}
                    </p>
                    <a 
                      href={content.content_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#02a4bf] text-sm inline-flex items-center gap-1 hover:underline"
                      style={{ fontFamily: 'Open Sans' }}
                    >
                      View on {content.platform.charAt(0).toUpperCase() + content.platform.slice(1)}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Tracking & Metrics */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600" style={{ fontFamily: 'Open Sans', fontWeight: 700 }}>
                        TRACKING URL:
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(content.tracking_url)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-700 mb-3 truncate" style={{ fontFamily: 'Open Sans' }}>
                      {content.tracking_url}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>
                      <span>Estimated reach: {content.estimated_reach.toLocaleString()} followers</span>
                      <span>•</span>
                      <span>Avg engagement: {content.expected_engagement_rate}%</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleApprove(content)}
                      className="w-full h-13 bg-green-600 hover:bg-green-700 text-white"
                      style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px' }}
                    >
                      <Check className="h-5 w-5 mr-2" />
                      Approve Content
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedContent(content);
                        setRevisionsModalOpen(true);
                      }}
                      className="w-full h-13 bg-[#F59E0B] hover:bg-[#D97706] text-white"
                      style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px' }}
                    >
                      <Edit className="h-5 w-5 mr-2" />
                      Request Revisions
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedContent(content);
                        setRejectModalOpen(true);
                      }}
                      variant="outline"
                      className="w-full h-13 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px' }}
                    >
                      <X className="h-5 w-5 mr-2" />
                      Reject Content
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // List View
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left w-12">
                      <Checkbox />
                    </th>
                    <th className="px-4 py-3 text-left w-20" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                      Preview
                    </th>
                    <th className="px-4 py-3 text-left" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                      Content
                    </th>
                    <th className="px-4 py-3 text-left" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                      Ambassador
                    </th>
                    <th className="px-4 py-3 text-left" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                      Campaign
                    </th>
                    <th className="px-4 py-3 text-left" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                      Submitted
                    </th>
                    <th className="px-4 py-3 text-left" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContent.map((content) => {
                    const platformConfig = getPlatformConfig(content.platform);
                    
                    return (
                      <tr key={content.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <Checkbox />
                        </td>
                        <td className="px-4 py-4">
                          <img 
                            src={content.thumbnail_url} 
                            alt={content.content_title}
                            className="w-16 h-16 rounded object-cover cursor-pointer"
                            onClick={() => {
                              setSelectedContent(content);
                              setFullViewModalOpen(true);
                            }}
                          />
                        </td>
                        <td className="px-4 py-4">
                          <div className="max-w-xs">
                            <p 
                              className="text-[#005260] mb-1 truncate cursor-pointer hover:text-[#02a4bf]"
                              style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}
                              onClick={() => {
                                setSelectedContent(content);
                                setFullViewModalOpen(true);
                              }}
                            >
                              {content.content_title}
                            </p>
                            <p className="text-gray-600 text-xs truncate" style={{ fontFamily: 'Open Sans' }}>
                              {content.content_caption}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <img 
                              src={content.ambassador_profile_image} 
                              alt={content.ambassador_name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                                {content.ambassador_name}
                              </p>
                              <Badge 
                                className="px-1.5 py-0" 
                                style={{ 
                                  backgroundColor: '#e84e1c',
                                  color: 'white',
                                  fontSize: '10px'
                                }}
                              >
                                {platformConfig.icon} {platformConfig.label}
                              </Badge>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                            {content.campaign_name}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
                            {getTimeAgo(content.submitted_at)}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleApprove(content)}
                              className="bg-green-600 hover:bg-green-700 text-white h-8"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedContent(content);
                                setRevisionsModalOpen(true);
                              }}
                              className="bg-[#F59E0B] hover:bg-[#D97706] text-white h-8"
                            >
                              Revisions
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedContent(content);
                                setRejectModalOpen(true);
                              }}
                              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white h-8"
                            >
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Request Revisions Modal */}
        <Dialog open={revisionsModalOpen} onOpenChange={setRevisionsModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader className="bg-[#F59E0B] text-white p-6 -m-6 mb-6 rounded-t-lg">
              <div className="flex items-center gap-2">
                <Edit className="h-6 w-6" />
                <div>
                  <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px', color: 'white' }}>
                    Request Revisions
                  </DialogTitle>
                  <DialogDescription className="text-white opacity-70">
                    for {selectedContent?.ambassador_name}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Content preview */}
              {selectedContent && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img 
                    src={selectedContent.thumbnail_url} 
                    alt={selectedContent.content_title}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                      {selectedContent.content_title}
                    </p>
                    <Badge variant="outline" style={{ fontSize: '10px' }}>
                      {getPlatformConfig(selectedContent.platform).icon} {selectedContent.platform}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Review notes */}
              <div>
                <Label htmlFor="revision-notes" className="mb-2 block" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                  What needs to be changed? <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="revision-notes"
                  value={revisionNotes}
                  onChange={(e) => setRevisionNotes(e.target.value)}
                  placeholder="Please explain what needs to be changed. Be specific so the ambassador can make the right adjustments..."
                  className="min-h-[200px]"
                  maxLength={1000}
                  style={{ fontFamily: 'Open Sans' }}
                />
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {revisionNotes.length} / 1000
                </p>
              </div>

              {/* Checklist */}
              <div>
                <Label className="mb-2 block" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                  Revision checklist (optional)
                </Label>
                <div className="space-y-2">
                  {[
                    { key: 'caption', label: 'Caption needs adjustment' },
                    { key: 'hashtags', label: 'Hashtags need changes' },
                    { key: 'branding', label: 'Branding not visible enough' },
                    { key: 'cta', label: 'Call-to-action unclear' },
                    { key: 'other', label: 'Other (specify above)' }
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`revision-${key}`}
                        checked={revisionChecks[key as keyof typeof revisionChecks]}
                        onCheckedChange={(checked) => 
                          setRevisionChecks(prev => ({ ...prev, [key]: checked as boolean }))
                        }
                      />
                      <Label 
                        htmlFor={`revision-${key}`}
                        className="cursor-pointer"
                        style={{ fontFamily: 'Open Sans', fontWeight: 400 }}
                      >
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning */}
              <div className="bg-orange-50 p-3 rounded-lg flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                  The ambassador will be notified via email. Manual follow-up may be required.
                </p>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setRevisionsModalOpen(false);
                  setRevisionNotes('');
                  setRevisionChecks({
                    caption: false,
                    hashtags: false,
                    branding: false,
                    cta: false,
                    other: false
                  });
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRequestRevisions}
                disabled={!revisionNotes.trim() || processingAction}
                className="bg-[#F59E0B] hover:bg-[#D97706]"
              >
                {processingAction ? 'Sending...' : 'Send Revision Request'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject Content Modal */}
        <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader className="bg-red-500 text-white p-6 -m-6 mb-6 rounded-t-lg">
              <div className="flex items-center gap-2">
                <X className="h-6 w-6" />
                <div>
                  <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px', color: 'white' }}>
                    Reject Content
                  </DialogTitle>
                  <DialogDescription className="text-white opacity-70">
                    for {selectedContent?.ambassador_name}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Content preview */}
              {selectedContent && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img 
                    src={selectedContent.thumbnail_url} 
                    alt={selectedContent.content_title}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                      {selectedContent.content_title}
                    </p>
                    <Badge variant="outline" style={{ fontSize: '10px' }}>
                      {getPlatformConfig(selectedContent.platform).icon} {selectedContent.platform}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Rejection reason */}
              <div>
                <Label htmlFor="rejection-reason" className="mb-2 block" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                  Why are you rejecting this content? <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="rejection-reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Please provide a clear reason for rejection. This helps the ambassador understand expectations..."
                  className="min-h-[200px]"
                  maxLength={1000}
                  style={{ fontFamily: 'Open Sans' }}
                />
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {rejectionReason.length} / 1000
                </p>
              </div>

              {/* Rejection categories */}
              <div>
                <Label className="mb-2 block" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                  Rejection categories
                </Label>
                <div className="space-y-2">
                  {[
                    { key: 'brandGuidelines', label: 'Does not align with brand guidelines' },
                    { key: 'quality', label: 'Quality does not meet standards' },
                    { key: 'offBrand', label: 'Content is off-brand' },
                    { key: 'campaign', label: 'Violates campaign requirements' },
                    { key: 'other', label: 'Other (explain above)' }
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`reject-${key}`}
                        checked={rejectionChecks[key as keyof typeof rejectionChecks]}
                        onCheckedChange={(checked) => 
                          setRejectionChecks(prev => ({ ...prev, [key]: checked as boolean }))
                        }
                      />
                      <Label 
                        htmlFor={`reject-${key}`}
                        className="cursor-pointer"
                        style={{ fontFamily: 'Open Sans', fontWeight: 400 }}
                      >
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning */}
              <div className="bg-red-50 p-3 rounded-lg flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-700" style={{ fontFamily: 'Open Sans', fontWeight: 700 }}>
                  This content will be marked as rejected and removed from the queue. This action cannot be undone.
                </p>
              </div>

              {/* Confirmation checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="confirm-reject"
                  checked={confirmReject}
                  onCheckedChange={(checked) => setConfirmReject(checked as boolean)}
                />
                <Label 
                  htmlFor="confirm-reject"
                  className="cursor-pointer"
                  style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
                >
                  I confirm rejection
                </Label>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setRejectModalOpen(false);
                  setRejectionReason('');
                  setRejectionChecks({
                    brandGuidelines: false,
                    quality: false,
                    offBrand: false,
                    campaign: false,
                    other: false
                  });
                  setConfirmReject(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleReject}
                disabled={!rejectionReason.trim() || !confirmReject || processingAction}
                className="bg-red-500 hover:bg-red-600"
              >
                {processingAction ? 'Rejecting...' : 'Confirm Rejection'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Full Content View Modal */}
        <Dialog open={fullViewModalOpen} onOpenChange={setFullViewModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedContent && (
              <>
                <DialogHeader className="bg-[#02a4bf] text-white p-6 -m-6 mb-6 rounded-t-lg">
                  <div className="flex items-center gap-2">
                    <Badge 
                      className="px-2 py-1" 
                      style={{ 
                        backgroundColor: '#e84e1c',
                        color: 'white'
                      }}
                    >
                      {getPlatformConfig(selectedContent.platform).icon} {getPlatformConfig(selectedContent.platform).label}
                    </Badge>
                    <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', color: 'white' }}>
                      {selectedContent.content_type.charAt(0).toUpperCase() + selectedContent.content_type.slice(1)} by {selectedContent.ambassador_name}
                    </DialogTitle>
                  </div>
                  <DialogDescription className="text-white opacity-70">
                    Review content details and take action
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Main content display */}
                  <div className="relative w-full max-h-[600px] rounded-xl overflow-hidden">
                    <img 
                      src={selectedContent.thumbnail_url} 
                      alt={selectedContent.content_title}
                      className="w-full h-full object-contain"
                    />
                    {(selectedContent.content_type === 'reel' || selectedContent.content_type === 'video' || selectedContent.content_type === 'short') && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white bg-opacity-90 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                          <div className="w-0 h-0 border-t-10 border-t-transparent border-l-16 border-l-gray-800 border-b-10 border-b-transparent ml-1"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                        Content Information
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm" style={{ fontFamily: 'Open Sans' }}>
                        <p><span className="font-semibold">Content Type:</span> {selectedContent.content_type}</p>
                        <p><span className="font-semibold">Submitted:</span> {new Date(selectedContent.submitted_at).toLocaleString()}</p>
                        <p><span className="font-semibold">Platform:</span> {selectedContent.platform}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                        Title
                      </h3>
                      <p className="text-[#005260] text-lg" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                        {selectedContent.content_title}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                        Caption
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm" style={{ fontFamily: 'Open Sans' }}>
                        {selectedContent.content_caption}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                        Tracking URL
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-50 p-3 rounded-lg text-sm text-gray-700 truncate" style={{ fontFamily: 'Open Sans' }}>
                          {selectedContent.tracking_url}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(selectedContent.tracking_url)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                        Expected Performance
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm" style={{ fontFamily: 'Open Sans' }}>
                        <p><span className="font-semibold">Estimated reach:</span> {selectedContent.estimated_reach.toLocaleString()} followers</p>
                        <p><span className="font-semibold">Expected engagement:</span> {selectedContent.expected_engagement_rate}%</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                        Campaign Context
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm" style={{ fontFamily: 'Open Sans' }}>
                        <p><span className="font-semibold">Campaign:</span> {selectedContent.campaign_name}</p>
                        <p><span className="font-semibold">Ambassador:</span> {selectedContent.ambassador_name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <Button
                      onClick={() => {
                        setFullViewModalOpen(false);
                        handleApprove(selectedContent);
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => {
                        setFullViewModalOpen(false);
                        setRevisionsModalOpen(true);
                      }}
                      className="flex-1 bg-[#F59E0B] hover:bg-[#D97706] text-white"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Request Revisions
                    </Button>
                    <Button
                      onClick={() => {
                        setFullViewModalOpen(false);
                        setRejectModalOpen(true);
                      }}
                      variant="outline"
                      className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}