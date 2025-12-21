import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Slider } from '../ui/slider';
import { Progress } from '../ui/progress';
import { Skeleton } from '../ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  ChevronRight,
  Plus,
  MoreVertical,
  BarChart3,
  Users,
  Eye,
  TrendingUp,
  Pause,
  CheckCircle2,
  Calendar,
  DollarSign,
  Target,
  ArrowLeft,
  FileText,
  ChevronDown,
  ExternalLink,
  PlayCircle
} from 'lucide-react';
import { callEccoAPI } from '../../lib/eccoAPI';
import { toast } from 'sonner@2.0.3';

interface Campaign {
  id: string;
  name: string;
  description: string;
  campaign_type: string;
  status: 'active' | 'planning' | 'completed' | 'paused';
  total_budget: number;
  budget_spent: number;
  start_date: string;
  end_date: string;
  target_impressions: number;
  actual_impressions: number;
  target_conversions?: number;
  actual_conversions?: number;
  target_roi: number;
  actual_roi: number;
  ambassador_count: number;
  total_posts: number;
  target_posts: number;
  created_at: string;
  updated_at: string;
}

interface CampaignMember {
  id: string;
  campaign_id: string;
  ambassador_id: string;
  ambassador_name: string;
  ambassador_platform: string;
  ambassador_profile_image: string;
  role_in_campaign?: string;
  agreed_post_count: number;
  posts_delivered: number;
  total_impressions: number;
  ambassador_compensation: number;
  joined_at: string;
}

interface CampaignContent {
  id: string;
  campaign_id: string;
  ambassador_id: string;
  platform: string;
  content_type: string;
  thumbnail_url: string;
  approval_status: string;
  published_at: string;
  view_count: number;
}

interface ICPProfile {
  id: string;
  name: string;
  description: string;
}

interface Ambassador {
  id: string;
  full_name: string;
  platform: string;
  profile_image_url: string;
  follower_count: number;
  icp_alignment_score: number | null;
}

const campaignTypeConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  product_launch: { label: 'Product Launch', color: '#02a4bf', bgColor: '#E6F7F9' },
  seasonal: { label: 'Seasonal', color: '#F59E0B', bgColor: '#FEF3C7' },
  ongoing: { label: 'Ongoing', color: '#10B981', bgColor: '#D1FAE5' },
  event: { label: 'Event', color: '#8B5CF6', bgColor: '#EDE9FE' },
  awareness: { label: 'Awareness', color: '#3B82F6', bgColor: '#DBEAFE' }
};

const platformIcons: Record<string, string> = {
  instagram: '📷',
  youtube: '▶️',
  tiktok: '🎵',
  linkedin: '💼',
  twitter: '🐦'
};

function formatCurrency(amount: number): string {
  if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
  return `$${amount.toFixed(0)}`;
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getDaysRemaining(endDate: string): number {
  const end = new Date(endDate);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// New Campaign Modal
interface NewCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
}

function NewCampaignModal({ isOpen, onClose, onCreate }: NewCampaignModalProps) {
  const [icpProfiles, setIcpProfiles] = useState<ICPProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    campaign_type: 'product_launch',
    icp_profile_id: '',
    target_platforms: [] as string[],
    min_follower_count: '',
    min_engagement_rate: '',
    min_icp_score: 70,
    total_budget: '',
    start_date: '',
    end_date: '',
    target_impressions: '',
    target_conversions: '',
    target_roi: ''
  });

  useEffect(() => {
    if (isOpen) {
      loadProfiles();
    }
  }, [isOpen]);

  const loadProfiles = async () => {
    try {
      // NOTE: /api/v1/icp-profiles endpoint not yet implemented in backend
      // Using default data to prevent 404 errors
      // TODO: Backend needs to implement GET /api/v1/icp-profiles endpoint
      console.log('AmbassadorCampaignsPage: Using default ICP profiles (endpoint not implemented)');
      
      const defaultProfiles = [
        {
          id: 'icp_default_001',
          name: 'Default Profile',
          description: 'Default ICP profile'
        }
      ];
      
      setIcpProfiles(defaultProfiles);
    } catch (error) {
      console.error('Failed to load ICP profiles:', error);
    }
  };

  const togglePlatform = (platform: string) => {
    if (formData.target_platforms.includes(platform)) {
      setFormData({
        ...formData,
        target_platforms: formData.target_platforms.filter(p => p !== platform)
      });
    } else {
      setFormData({
        ...formData,
        target_platforms: [...formData.target_platforms, platform]
      });
    }
  };

  const handleCreate = async () => {
    if (!formData.name || !formData.start_date || !formData.end_date) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (new Date(formData.start_date) > new Date(formData.end_date)) {
      toast.error('End date must be after start date');
      return;
    }

    setLoading(true);
    try {
      const campaignData: any = {
        name: formData.name,
        description: formData.description,
        campaign_type: formData.campaign_type,
        start_date: formData.start_date,
        end_date: formData.end_date,
        status: 'planning'
      };

      if (formData.icp_profile_id) campaignData.icp_profile_id = formData.icp_profile_id;
      if (formData.target_platforms.length > 0) campaignData.target_platforms = formData.target_platforms;
      if (formData.min_follower_count) campaignData.min_follower_count = parseInt(formData.min_follower_count);
      if (formData.min_engagement_rate) campaignData.min_engagement_rate = parseFloat(formData.min_engagement_rate);
      campaignData.min_icp_score = formData.min_icp_score;
      if (formData.total_budget) campaignData.total_budget = parseFloat(formData.total_budget);
      if (formData.target_impressions) campaignData.target_impressions = parseInt(formData.target_impressions);
      if (formData.target_conversions) campaignData.target_conversions = parseInt(formData.target_conversions);
      if (formData.target_roi) campaignData.target_roi = parseFloat(formData.target_roi);

      await callEccoAPI('/api/v1/brand-ambassadors/campaigns', 'POST', campaignData);
      toast.success(`Campaign created: ${formData.name}`);
      onCreate();
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        campaign_type: 'product_launch',
        icp_profile_id: '',
        target_platforms: [],
        min_follower_count: '',
        min_engagement_rate: '',
        min_icp_score: 70,
        total_budget: '',
        start_date: '',
        end_date: '',
        target_impressions: '',
        target_conversions: '',
        target_roi: ''
      });
    } catch (error) {
      toast.error('Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="bg-[#02a4bf] text-white p-6 -m-6 mb-6 rounded-t-lg">
          <DialogTitle className="text-white text-xl" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
            Create New Campaign
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-[#005260] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
              Basic Information
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                  Campaign Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Q2 Product Launch"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2 h-11"
                />
              </div>

              <div>
                <Label className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                  Description (Optional)
                </Label>
                <Textarea
                  placeholder="Describe campaign goals..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  maxLength={2000}
                  className="mt-2"
                />
                <div className="text-xs text-[#9ca3af] text-right mt-1">
                  {formData.description.length} / 2000
                </div>
              </div>

              <div>
                <Label className="text-[#005260] mb-3 block" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                  Campaign Type
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(campaignTypeConfig).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => setFormData({ ...formData, campaign_type: key })}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        formData.campaign_type === key
                          ? 'bg-[#02a4bf] text-white'
                          : 'bg-white border border-gray-200 text-[#6B7280] hover:border-[#02a4bf]'
                      }`}
                      style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                    >
                      {config.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Target Criteria */}
          <div>
            <h3 className="text-[#005260] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
              Target Criteria
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                  ICP Profile (Optional)
                </Label>
                <Select value={formData.icp_profile_id} onValueChange={(value) => setFormData({ ...formData, icp_profile_id: value })}>
                  <SelectTrigger className="mt-2">
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

              <div>
                <Label className="text-[#005260] mb-3 block" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                  Target Platforms
                </Label>
                <div className="space-y-2">
                  {[
                    { key: 'instagram', label: '📷 Instagram' },
                    { key: 'youtube', label: '▶️ YouTube' },
                    { key: 'tiktok', label: '🎵 TikTok' },
                    { key: 'linkedin', label: '💼 LinkedIn' },
                    { key: 'twitter', label: '🐦 Twitter' }
                  ].map((platform) => (
                    <div key={platform.key} className="flex items-center gap-2">
                      <Checkbox
                        id={platform.key}
                        checked={formData.target_platforms.includes(platform.key)}
                        onCheckedChange={() => togglePlatform(platform.key)}
                      />
                      <label htmlFor={platform.key} className="text-sm text-[#005260] cursor-pointer">
                        {platform.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                    Minimum Followers
                  </Label>
                  <Input
                    type="number"
                    placeholder="10,000"
                    value={formData.min_follower_count}
                    onChange={(e) => setFormData({ ...formData, min_follower_count: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                    Min Engagement Rate (%)
                  </Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="2.5"
                    value={formData.min_engagement_rate}
                    onChange={(e) => setFormData({ ...formData, min_engagement_rate: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label className="text-[#005260] mb-3 block" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                  Minimum ICP Score: <span className="text-[#02a4bf]">{formData.min_icp_score}</span>
                </Label>
                <Slider
                  value={[formData.min_icp_score]}
                  onValueChange={(values) => setFormData({ ...formData, min_icp_score: values[0] })}
                  min={0}
                  max={100}
                  step={5}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-[#9ca3af] mt-2">
                  <span>Fair Match</span>
                  <span>Good Match</span>
                  <span>Excellent Match</span>
                </div>
              </div>
            </div>
          </div>

          {/* Budget & Timeline */}
          <div>
            <h3 className="text-[#005260] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
              Budget & Timeline
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                  Total Budget ($)
                </Label>
                <Input
                  type="number"
                  placeholder="50,000"
                  value={formData.total_budget}
                  onChange={(e) => setFormData({ ...formData, total_budget: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                    Start Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                    End Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Goals */}
          <div>
            <h3 className="text-[#005260] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
              Goals (Optional)
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                  Target Impressions
                </Label>
                <Input
                  type="number"
                  placeholder="1,000,000"
                  value={formData.target_impressions}
                  onChange={(e) => setFormData({ ...formData, target_impressions: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                  Target Conversions
                </Label>
                <Input
                  type="number"
                  placeholder="100"
                  value={formData.target_conversions}
                  onChange={(e) => setFormData({ ...formData, target_conversions: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                  Target ROI (%)
                </Label>
                <Input
                  type="number"
                  placeholder="200"
                  value={formData.target_roi}
                  onChange={(e) => setFormData({ ...formData, target_roi: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="bg-[#02a4bf] p-5 -m-6 mt-6 rounded-b-lg flex justify-between items-center">
          <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/20">
            Cancel
          </Button>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/20">
              Save as Draft
            </Button>
            <Button 
              onClick={handleCreate} 
              disabled={loading}
              className="bg-[#e84e1c] hover:bg-[#d43d0f] text-white"
            >
              {loading ? 'Creating...' : 'Create Campaign'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Campaign Card Component
interface CampaignCardProps {
  campaign: Campaign;
  onView: () => void;
  onUpdateStatus: (newStatus: string) => void;
  onDelete: () => void;
}

function CampaignCard({ campaign, onView, onUpdateStatus, onDelete }: CampaignCardProps) {
  const typeConfig = campaignTypeConfig[campaign.campaign_type];
  const budgetPercentage = campaign.total_budget > 0 ? (campaign.budget_spent / campaign.total_budget) * 100 : 0;
  const postsPercentage = campaign.target_posts > 0 ? (campaign.total_posts / campaign.target_posts) * 100 : 0;
  const impressionsPercentage = campaign.target_impressions > 0 ? (campaign.actual_impressions / campaign.target_impressions) * 100 : 0;

  const statusConfig = {
    active: { label: 'Active', emoji: '🟢', bgColor: '#D1FAE5', color: '#10B981' },
    planning: { label: 'Planning', emoji: '🟡', bgColor: '#FEF3C7', color: '#F59E0B' },
    completed: { label: 'Completed', emoji: '⚫', bgColor: '#F3F4F6', color: '#6B7280' },
    paused: { label: 'Paused', emoji: '⏸️', bgColor: '#FEE2E2', color: '#EF4444' }
  };

  const status = statusConfig[campaign.status];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:scale-[1.01] cursor-pointer">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 
          className="text-[#005260] text-lg flex-1 pr-4" 
          style={{ fontFamily: 'Poppins', fontWeight: 700 }}
          onClick={onView}
        >
          {campaign.name}
        </h3>
        <div className="flex items-center gap-2">
          <Badge
            style={{
              backgroundColor: status.bgColor,
              color: status.color
            }}
            className="text-xs px-2 py-1"
          >
            {status.emoji} {status.label}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-[#9ca3af] hover:text-[#02a4bf] p-1">
                <MoreVertical className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onView}>
                <ExternalLink className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              {campaign.status === 'planning' && (
                <DropdownMenuItem onClick={() => onUpdateStatus('active')}>
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Launch Campaign
                </DropdownMenuItem>
              )}
              {campaign.status === 'active' && (
                <DropdownMenuItem onClick={() => onUpdateStatus('paused')}>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause Campaign
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onUpdateStatus('completed')}>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Mark as Completed
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                Delete Campaign
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Date Range */}
      <div className="flex items-center gap-2 text-[#6B7280] text-sm mb-2">
        <Calendar className="w-4 h-4" />
        <span>{formatDate(campaign.start_date)} - {formatDate(campaign.end_date)}</span>
      </div>

      {/* Type Badge */}
      {typeConfig && (
        <Badge
          style={{
            backgroundColor: typeConfig.bgColor,
            color: typeConfig.color
          }}
          className="text-xs mb-5"
        >
          {typeConfig.label}
        </Badge>
      )}

      {/* Metrics Row */}
      {campaign.status !== 'planning' && (
        <div className="grid grid-cols-4 gap-4 mb-5 pb-5 border-b">
          {/* Budget */}
          <div>
            <div className="text-xs text-[#9ca3af] uppercase mb-2">Budget</div>
            <div className="text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
              {formatCurrency(campaign.budget_spent)} / {formatCurrency(campaign.total_budget)}
            </div>
            <Progress value={budgetPercentage} className="h-2" />
            <div className="text-xs text-[#02a4bf] mt-1">{Math.round(budgetPercentage)}%</div>
          </div>

          {/* Posts */}
          <div>
            <div className="text-xs text-[#9ca3af] uppercase mb-2">Posts</div>
            <div className="text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
              {campaign.total_posts} / {campaign.target_posts}
            </div>
            <Progress value={postsPercentage} className="h-2" />
            <div className="text-xs text-[#F59E0B] mt-1">{Math.round(postsPercentage)}%</div>
          </div>

          {/* Impressions */}
          <div>
            <div className="text-xs text-[#9ca3af] uppercase mb-2">👁️ Impressions</div>
            <div 
              className="mb-2" 
              style={{ 
                fontFamily: 'Poppins', 
                fontWeight: 600,
                color: campaign.actual_impressions >= campaign.target_impressions ? '#10B981' : '#005260'
              }}
            >
              {formatNumber(campaign.actual_impressions)} / {formatNumber(campaign.target_impressions)}
            </div>
            {campaign.actual_impressions >= campaign.target_impressions && (
              <div className="text-xs text-green-600">↑ {Math.round(impressionsPercentage)}%</div>
            )}
          </div>

          {/* ROI */}
          <div>
            <div className="text-xs text-[#9ca3af] uppercase mb-2">📈 ROI</div>
            <div 
              className="text-2xl mb-1" 
              style={{ 
                fontFamily: 'Poppins', 
                fontWeight: 700,
                color: campaign.actual_roi >= campaign.target_roi ? '#10B981' : '#6B7280'
              }}
            >
              {campaign.actual_roi}%
            </div>
          </div>
        </div>
      )}

      {/* Planning Campaign Info */}
      {campaign.status === 'planning' && (
        <div className="mb-5 pb-5 border-b">
          <div className="text-sm text-[#6B7280] mb-2">
            {campaign.ambassador_count} ambassadors selected
          </div>
          <div className="text-sm text-[#02a4bf]">
            Starts: {formatDate(campaign.start_date)}
          </div>
        </div>
      )}

      {/* Ambassadors */}
      <div className="mb-4">
        <div className="text-sm text-[#6B7280] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
          Ambassadors ({campaign.ambassador_count})
        </div>
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].slice(0, Math.min(5, campaign.ambassador_count)).map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-[#02a4bf] to-[#005260] border-2 border-white flex items-center justify-center text-white text-xs"
                style={{ fontFamily: 'Poppins', fontWeight: 600 }}
              >
                A{i}
              </div>
            ))}
          </div>
          {campaign.ambassador_count > 5 && (
            <div className="ml-2 text-xs text-[#6B7280]">
              +{campaign.ambassador_count - 5} more
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {campaign.status === 'planning' ? (
          <>
            <Button 
              onClick={() => onUpdateStatus('active')}
              className="flex-1 bg-[#10B981] hover:bg-green-700 h-10"
            >
              Launch Campaign
            </Button>
            <Button 
              variant="outline" 
              onClick={onView}
              className="flex-1 h-10"
            >
              Edit
            </Button>
          </>
        ) : (
          <>
            <Button 
              onClick={onView}
              className="flex-1 bg-[#02a4bf] hover:bg-[#018a9f] h-10"
            >
              View Campaign →
            </Button>
            <Button 
              variant="outline" 
              className="h-10"
            >
              <BarChart3 className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

// Main Component
export function AmbassadorCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [members, setMembers] = useState<CampaignMember[]>([]);
  const [content, setContent] = useState<CampaignContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'planning' | 'completed'>('active');
  const [newCampaignModalOpen, setNewCampaignModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    loadCampaigns();
  }, []);

  useEffect(() => {
    if (selectedCampaign) {
      loadCampaignDetails(selectedCampaign.id);
    }
  }, [selectedCampaign]);

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      // NOTE: /api/v1/brand-ambassadors/campaigns endpoint not yet implemented in backend
      // Using empty data to prevent 404 errors
      // TODO: Backend needs to implement GET /api/v1/brand-ambassadors/campaigns endpoint
      console.log('AmbassadorCampaignsPage: Using default empty campaigns list (endpoint not implemented)');
      
      setCampaigns([]);
    } catch (error) {
      console.error('Failed to load campaigns:', error);
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCampaignDetails = async (campaignId: string) => {
    try {
      // NOTE: /api/v1/brand-ambassadors endpoints not yet implemented in backend
      // Using empty data to prevent 404 errors
      // TODO: Backend needs to implement campaign members and content endpoints
      console.log('AmbassadorCampaignsPage: Using default empty campaign details (endpoints not implemented)');
      
      setMembers([]);
      setContent([]);
    } catch (error) {
      console.error('Failed to load campaign details:', error);
    }
  };

  const activeCampaigns = campaigns.filter(c => c.status === 'active');
  const planningCampaigns = campaigns.filter(c => c.status === 'planning');
  const completedCampaigns = campaigns.filter(c => c.status === 'completed');

  const handleUpdateStatus = async (campaignId: string, newStatus: string) => {
    try {
      await callEccoAPI(`/api/v1/brand-ambassadors/campaigns/${campaignId}`, 'PUT', { status: newStatus });
      toast.success('Campaign status updated');
      loadCampaigns();
      if (selectedCampaign && selectedCampaign.id === campaignId) {
        setSelectedCampaign({ ...selectedCampaign, status: newStatus as any });
      }
    } catch (error) {
      toast.error('Failed to update campaign');
    }
  };

  const handleDeleteCampaign = async (campaignId: string) => {
    if (!confirm('Delete this campaign? This cannot be undone.')) return;

    try {
      await callEccoAPI(`/api/v1/brand-ambassadors/campaigns/${campaignId}`, 'DELETE');
      toast.success('Campaign deleted');
      loadCampaigns();
      if (selectedCampaign && selectedCampaign.id === campaignId) {
        setSelectedCampaign(null);
      }
    } catch (error) {
      toast.error('Failed to delete campaign');
    }
  };

  // Detail View
  if (selectedCampaign) {
    const daysRemaining = getDaysRemaining(selectedCampaign.end_date);
    const budgetPercentage = selectedCampaign.total_budget > 0 
      ? (selectedCampaign.budget_spent / selectedCampaign.total_budget) * 100 
      : 0;
    const postsPercentage = selectedCampaign.target_posts > 0 
      ? (selectedCampaign.total_posts / selectedCampaign.target_posts) * 100 
      : 0;
    const approvedContent = content.filter(c => c.approval_status === 'approved').length;
    const pendingContent = content.filter(c => c.approval_status === 'pending').length;

    return (
      <div className="min-h-screen bg-[#f5f7fa]">
        <div className="max-w-[1440px] mx-auto px-6 py-8">
          {/* Back Button */}
          <button
            onClick={() => setSelectedCampaign(null)}
            className="flex items-center gap-2 text-[#02a4bf] hover:underline mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Campaigns
          </button>

          {/* Campaign Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 
                  className="text-[#005260] text-3xl" 
                  style={{ fontFamily: 'Poppins', fontWeight: 700 }}
                >
                  {selectedCampaign.name}
                </h1>
                <Badge
                  className="text-sm px-3 py-1 h-6"
                  style={{
                    backgroundColor: selectedCampaign.status === 'active' ? '#10B981' :
                                   selectedCampaign.status === 'planning' ? '#F59E0B' : '#9CA3AF',
                    color: '#ffffff'
                  }}
                >
                  {selectedCampaign.status.charAt(0).toUpperCase() + selectedCampaign.status.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-[#6B7280]">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedCampaign.start_date)} - {formatDate(selectedCampaign.end_date)}
                </span>
                {daysRemaining > 0 && (
                  <Badge variant="secondary" className="text-[#e84e1c] bg-orange-50">
                    {daysRemaining} days left
                  </Badge>
                )}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-[#9ca3af] hover:text-[#02a4bf] p-2">
                  <MoreVertical className="w-6 h-6" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => handleDeleteCampaign(selectedCampaign.id)} 
                  className="text-red-600"
                >
                  Delete Campaign
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Overview Metrics */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <h3 
              className="text-[#005260] text-xs uppercase tracking-wider mb-6" 
              style={{ fontFamily: 'Poppins', fontWeight: 700, letterSpacing: '1px' }}
            >
              OVERVIEW
            </h3>
            <div className="grid grid-cols-4 gap-6">
              {/* Budget Card */}
              <div className="text-center">
                <div className="relative w-30 h-30 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#f5f7fa"
                      strokeWidth="8"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#02a4bf"
                      strokeWidth="8"
                      strokeDasharray={`${budgetPercentage * 3.14} 314`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-xl text-[#02a4bf]" 
                      style={{ fontFamily: 'Poppins', fontWeight: 700 }}
                    >
                      {Math.round(budgetPercentage)}%
                    </span>
                  </div>
                </div>
                <div 
                  className="text-3xl text-[#005260] mb-1" 
                  style={{ fontFamily: 'Poppins', fontWeight: 700 }}
                >
                  {formatCurrency(selectedCampaign.budget_spent)}
                </div>
                <div className="text-sm text-[#6B7280]">
                  of {formatCurrency(selectedCampaign.total_budget)} budget
                </div>
                <div className="text-xs text-green-600 mt-1">
                  ↑ {formatCurrency(selectedCampaign.budget_spent / 7)} this week
                </div>
              </div>

              {/* Posts Card */}
              <div className="text-center">
                <div className="text-4xl mb-2">📄</div>
                <div 
                  className="text-3xl text-[#005260] mb-1" 
                  style={{ fontFamily: 'Poppins', fontWeight: 700 }}
                >
                  {selectedCampaign.total_posts}
                </div>
                <div className="text-sm text-[#6B7280]">
                  of {selectedCampaign.target_posts} posts
                </div>
                <div className="text-xs text-[#F59E0B] mt-1">
                  {pendingContent} pending approval
                </div>
              </div>

              {/* Impressions Card */}
              <div className="text-center">
                <div className="text-4xl mb-2">👁️</div>
                <div 
                  className="text-3xl mb-1" 
                  style={{ 
                    fontFamily: 'Poppins', 
                    fontWeight: 700,
                    color: selectedCampaign.actual_impressions >= selectedCampaign.target_impressions ? '#10B981' : '#005260'
                  }}
                >
                  {formatNumber(selectedCampaign.actual_impressions)}
                </div>
                <div className="text-sm text-[#6B7280]">
                  of {formatNumber(selectedCampaign.target_impressions)} target
                </div>
                {selectedCampaign.actual_impressions >= selectedCampaign.target_impressions && (
                  <Badge className="bg-green-100 text-green-700 mt-2">Target exceeded!</Badge>
                )}
              </div>

              {/* ROI Card */}
              <div className="text-center">
                <div className="text-4xl mb-2">📈</div>
                <div 
                  className="text-4xl mb-1" 
                  style={{ 
                    fontFamily: 'Poppins', 
                    fontWeight: 700,
                    color: selectedCampaign.actual_roi >= selectedCampaign.target_roi ? '#10B981' : '#6B7280'
                  }}
                >
                  {selectedCampaign.actual_roi}%
                </div>
                <div className="text-sm text-[#6B7280]">Return on Investment</div>
                <div className="text-xs text-green-600 mt-1">↑ 12% vs last campaign</div>
              </div>
            </div>
          </div>

          {/* Ambassadors & Content Section */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Ambassadors */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 
                  className="text-[#005260] text-xs uppercase tracking-wider" 
                  style={{ fontFamily: 'Poppins', fontWeight: 700 }}
                >
                  AMBASSADORS ({members.length})
                </h3>
                <Button size="sm" className="bg-[#02a4bf] hover:bg-[#018a9f] h-8">
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
              <div className="space-y-3">
                {members.slice(0, 5).map((member) => (
                  <div key={member.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.ambassador_profile_image}
                        alt={member.ambassador_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div 
                          className="text-[#005260]" 
                          style={{ fontFamily: 'Poppins', fontWeight: 600 }}
                        >
                          {member.ambassador_name}
                        </div>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {platformIcons[member.ambassador_platform]} {member.ambassador_platform.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right text-sm text-[#6B7280]">
                      <div>{member.posts_delivered} posts</div>
                      <div>{formatNumber(member.total_impressions)} impr</div>
                    </div>
                  </div>
                ))}
                {members.length > 5 && (
                  <button className="text-[#02a4bf] text-sm hover:underline w-full text-center pt-2">
                    View All ({members.length}) ▼
                  </button>
                )}
                {members.length === 0 && (
                  <p className="text-[#6B7280] text-center py-8">No ambassadors yet</p>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 
                  className="text-[#005260] text-xs uppercase tracking-wider" 
                  style={{ fontFamily: 'Poppins', fontWeight: 700 }}
                >
                  CONTENT ({content.length})
                </h3>
                <div className="flex gap-2">
                  <Badge className="bg-green-100 text-green-700 text-xs cursor-pointer">
                    Approved: {approvedContent}
                  </Badge>
                  <Badge className="bg-orange-100 text-orange-700 text-xs cursor-pointer">
                    Pending: {pendingContent}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {content.slice(0, 8).map((item) => (
                  <div
                    key={item.id}
                    className="relative aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                  >
                    <img
                      src={item.thumbnail_url}
                      alt="Content"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 right-1">
                      <Badge variant="secondary" className="text-xs">
                        {platformIcons[item.platform]}
                      </Badge>
                    </div>
                    <div className="absolute bottom-1 left-1 right-1">
                      <Badge 
                        className="w-full text-xs"
                        style={{
                          backgroundColor: item.approval_status === 'approved' ? '#10B981' : '#F59E0B',
                          color: '#ffffff'
                        }}
                      >
                        {item.approval_status === 'approved' ? '✓' : '⏰'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              {content.length > 8 && (
                <button className="text-[#02a4bf] text-sm hover:underline w-full text-center pt-3">
                  View All Content →
                </button>
              )}
              {content.length === 0 && (
                <p className="text-[#6B7280] text-center py-8">No content yet</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <Button className="bg-[#02a4bf] hover:bg-[#018a9f] h-11">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
            <div className="flex gap-3">
              {selectedCampaign.status === 'active' && (
                <Button 
                  className="bg-[#F59E0B] hover:bg-[#d97706] h-11" 
                  onClick={() => handleUpdateStatus(selectedCampaign.id, 'paused')}
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Pause Campaign
                </Button>
              )}
              {selectedCampaign.status !== 'completed' && (
                <Button 
                  className="bg-green-600 hover:bg-green-700 h-11" 
                  onClick={() => handleUpdateStatus(selectedCampaign.id, 'completed')}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Complete Campaign
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-6">
          <span>Dashboard</span>
          <ChevronRight className="w-4 h-4" />
          <span>Brand Ambassadors</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#005260]">Campaigns</span>
        </div>

        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 
              className="text-[#005260] text-3xl mb-2" 
              style={{ fontFamily: 'Poppins', fontWeight: 700 }}
            >
              Campaigns
            </h1>
            <p className="text-[#6B7280]">Organize and track influencer campaigns</p>
          </div>
          <Button
            onClick={() => setNewCampaignModalOpen(true)}
            className="bg-[#02a4bf] hover:bg-[#018a9f] w-40 h-12"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-6">
          <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-12 p-0 gap-2">
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-[#02a4bf] data-[state=active]:text-white rounded-t-lg h-12 px-6 data-[state=active]:shadow-none"
              style={{ fontFamily: 'Poppins', fontWeight: 500 }}
            >
              Active
              <Badge className="ml-2 bg-[#10B981] text-white">
                {activeCampaigns.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="planning"
              className="data-[state=active]:bg-[#02a4bf] data-[state=active]:text-white rounded-t-lg h-12 px-6 data-[state=active]:shadow-none"
              style={{ fontFamily: 'Poppins', fontWeight: 500 }}
            >
              Planning
              <Badge className="ml-2 bg-[#F59E0B] text-white">
                {planningCampaigns.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-[#02a4bf] data-[state=active]:text-white rounded-t-lg h-12 px-6 data-[state=active]:shadow-none"
              style={{ fontFamily: 'Poppins', fontWeight: 500 }}
            >
              Completed
              <Badge className="ml-2 bg-[#9CA3AF] text-white">
                {completedCampaigns.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Active Tab Content */}
          <TabsContent value="active" className="mt-6">
            {loading ? (
              <div className="grid grid-cols-2 gap-5">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-80 rounded-2xl" />
                ))}
              </div>
            ) : activeCampaigns.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📋</div>
                <h3 
                  className="text-xl text-[#6B7280] mb-4" 
                  style={{ fontFamily: 'Poppins', fontWeight: 700 }}
                >
                  No Active Campaigns
                </h3>
                <button 
                  onClick={() => setActiveTab('planning')}
                  className="text-[#02a4bf] hover:underline"
                >
                  View Planning Campaigns →
                </button>
              </div>
            ) : (
              <>
                <h2 
                  className="text-[#005260] text-lg mb-4" 
                  style={{ fontFamily: 'Poppins', fontWeight: 600 }}
                >
                  Active Campaigns ({activeCampaigns.length})
                </h2>
                <div className="grid grid-cols-2 gap-5">
                  {activeCampaigns.map((campaign) => (
                    <CampaignCard
                      key={campaign.id}
                      campaign={campaign}
                      onView={() => setSelectedCampaign(campaign)}
                      onUpdateStatus={(status) => handleUpdateStatus(campaign.id, status)}
                      onDelete={() => handleDeleteCampaign(campaign.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          {/* Planning Tab Content */}
          <TabsContent value="planning" className="mt-6">
            {loading ? (
              <div className="grid grid-cols-2 gap-5">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-80 rounded-2xl" />
                ))}
              </div>
            ) : planningCampaigns.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📋</div>
                <h3 
                  className="text-xl text-[#6B7280] mb-4" 
                  style={{ fontFamily: 'Poppins', fontWeight: 700 }}
                >
                  No Campaigns in Planning
                </h3>
                <Button
                  onClick={() => setNewCampaignModalOpen(true)}
                  className="bg-[#02a4bf] hover:bg-[#018a9f]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Campaign
                </Button>
              </div>
            ) : (
              <>
                <h2 
                  className="text-[#6B7280] text-lg mb-4" 
                  style={{ fontFamily: 'Poppins', fontWeight: 600 }}
                >
                  Planning ({planningCampaigns.length})
                </h2>
                <div className="grid grid-cols-2 gap-5">
                  {planningCampaigns.map((campaign) => (
                    <CampaignCard
                      key={campaign.id}
                      campaign={campaign}
                      onView={() => setSelectedCampaign(campaign)}
                      onUpdateStatus={(status) => handleUpdateStatus(campaign.id, status)}
                      onDelete={() => handleDeleteCampaign(campaign.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          {/* Completed Tab Content */}
          <TabsContent value="completed" className="mt-6">
            {loading ? (
              <div className="grid grid-cols-2 gap-5">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-80 rounded-2xl" />
                ))}
              </div>
            ) : completedCampaigns.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">✅</div>
                <h3 
                  className="text-xl text-[#6B7280] mb-4" 
                  style={{ fontFamily: 'Poppins', fontWeight: 700 }}
                >
                  No Completed Campaigns Yet
                </h3>
                <p className="text-[#9ca3af]">Campaigns will appear here once completed</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 
                    className="text-[#6B7280] text-lg" 
                    style={{ fontFamily: 'Poppins', fontWeight: 600 }}
                  >
                    Completed ({completedCampaigns.length})
                  </h2>
                  <button
                    onClick={() => setShowCompleted(!showCompleted)}
                    className="text-[#02a4bf] text-sm hover:underline flex items-center gap-1"
                  >
                    {showCompleted ? 'Hide' : 'Show'} Completed
                    <ChevronDown className={`w-4 h-4 transition-transform ${showCompleted ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {showCompleted && (
                  <div className="grid grid-cols-2 gap-5">
                    {completedCampaigns.map((campaign) => (
                      <CampaignCard
                        key={campaign.id}
                        campaign={campaign}
                        onView={() => setSelectedCampaign(campaign)}
                        onUpdateStatus={(status) => handleUpdateStatus(campaign.id, status)}
                        onDelete={() => handleDeleteCampaign(campaign.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>

        {/* Empty State - No Campaigns at All */}
        {!loading && campaigns.length === 0 && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">📋</div>
            <h2 
              className="text-2xl text-[#6B7280] mb-3" 
              style={{ fontFamily: 'Poppins', fontWeight: 700 }}
            >
              No Campaigns Yet
            </h2>
            <p className="text-[#9ca3af] mb-6">
              Create your first campaign to organize influencer partnerships
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => setNewCampaignModalOpen(true)}
                className="bg-[#02a4bf] hover:bg-[#018a9f] h-13"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Campaign
              </Button>
              <Button variant="outline" className="h-13 border-[#02a4bf] text-[#02a4bf]">
                Discover Influencers
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* New Campaign Modal */}
      <NewCampaignModal
        isOpen={newCampaignModalOpen}
        onClose={() => setNewCampaignModalOpen(false)}
        onCreate={loadCampaigns}
      />
    </div>
  );
}