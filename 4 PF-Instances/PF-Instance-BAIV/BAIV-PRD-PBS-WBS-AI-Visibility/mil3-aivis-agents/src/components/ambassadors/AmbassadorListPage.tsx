import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../ui/dialog';
import { Label } from '../ui/label';
import {
  Search,
  ChevronRight,
  MoreVertical,
  ExternalLink,
  Plus,
  Download,
  Mail,
  Target,
  Trash2,
  BarChart3,
  ChevronLeft,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { callEccoAPI } from '../../lib/eccoAPI';
import { toast } from 'sonner@2.0.3';
import { Skeleton } from '../ui/skeleton';

interface Ambassador {
  id: string;
  full_name: string;
  platform: string;
  platform_username: string;
  platform_url: string;
  profile_image_url: string;
  follower_count: number;
  avg_engagement_rate: number;
  icp_alignment_score: number | null;
  outreach_status: 'identified' | 'contacted' | 'responded' | 'negotiating' | 'active' | 'declined' | 'inactive';
  created_at: string;
}

interface Campaign {
  id: string;
  name: string;
  status: string;
  start_date: string;
  end_date: string;
}

interface ICPProfile {
  id: string;
  name: string;
  description: string;
}

const platformConfig: Record<string, { label: string; icon: string; color: string }> = {
  instagram: { label: 'IG', icon: '📷', color: '#E4405F' },
  youtube: { label: 'YT', icon: '▶️', color: '#FF0000' },
  tiktok: { label: 'TT', icon: '🎵', color: '#000000' },
  linkedin: { label: 'LI', icon: '💼', color: '#0A66C2' },
  twitter: { label: 'X', icon: '🐦', color: '#000000' }
};

const statusConfig: Record<string, { label: string; icon: string; color: string; bgColor: string }> = {
  identified: { label: 'Identified', icon: '👁️', color: '#ffffff', bgColor: '#9CA3AF' },
  contacted: { label: 'Contacted', icon: '✉️', color: '#ffffff', bgColor: '#3B82F6' },
  responded: { label: 'Responded', icon: '💬', color: '#ffffff', bgColor: '#8B5CF6' },
  negotiating: { label: 'Negotiating', icon: '🤝', color: '#ffffff', bgColor: '#F59E0B' },
  active: { label: 'Active', icon: '✅', color: '#ffffff', bgColor: '#10B981' },
  declined: { label: 'Declined', icon: '✗', color: '#ffffff', bgColor: '#EF4444' },
  inactive: { label: 'Inactive', icon: '⏸️', color: '#6B7280', bgColor: '#D1D5DB' }
};

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
}

function getICPScoreLabel(score: number | null): { label: string; emoji: string; color: string; bgColor: string } {
  if (score === null) return { label: 'Not Scored', emoji: '⚪', color: '#6B7280', bgColor: '#F3F4F6' };
  if (score >= 80) return { label: 'Excellent Match', emoji: '🟢', color: '#10B981', bgColor: '#D1FAE5' };
  if (score >= 60) return { label: 'Good Match', emoji: '🟡', color: '#F59E0B', bgColor: '#FEF3C7' };
  if (score >= 40) return { label: 'Fair Match', emoji: '🟠', color: '#F97316', bgColor: '#FFEDD5' };
  return { label: 'Low Match', emoji: '🔴', color: '#EF4444', bgColor: '#FEE2E2' };
}

function getEngagementColor(rate: number): string {
  if (rate >= 5) return '#10B981';
  if (rate >= 2) return '#02a4bf';
  return '#6B7280';
}

// Score with ICP Modal
interface ScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  ambassador: Ambassador | null;
  onScoreCalculated: () => void;
}

function ScoreWithICPModal({ isOpen, onClose, ambassador, onScoreCalculated }: ScoreModalProps) {
  const [icpProfiles, setIcpProfiles] = useState<ICPProfile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      loadProfiles();
      setResult(null);
    }
  }, [isOpen]);

  const loadProfiles = async () => {
    try {
      // NOTE: /api/v1/icp-profiles endpoint not yet implemented in backend
      // Using default data to prevent 404 errors
      // TODO: Backend needs to implement GET /api/v1/icp-profiles endpoint
      console.log('AmbassadorListPage: Using default ICP profiles (endpoint not implemented)');
      
      const defaultProfiles = [
        {
          id: 'icp_default_001',
          name: 'Default Profile',
          description: 'Default ICP profile'
        }
      ];
      
      setIcpProfiles(defaultProfiles);
      if (defaultProfiles.length > 0) {
        setSelectedProfile(defaultProfiles[0].id);
      }
    } catch (error) {
      console.error('Failed to load ICP profiles:', error);
    }
  };

  const calculateScore = async () => {
    if (!ambassador || !selectedProfile) return;

    setLoading(true);
    try {
      const data = await callEccoAPI('/api/v1/brand-ambassadors/score', 'POST', {
        ambassador_id: ambassador.id,
        icp_profile_id: selectedProfile
      });
      
      setResult(data);
      toast.success('ICP score calculated successfully');
      setTimeout(() => {
        onScoreCalculated();
      }, 2000);
    } catch (error) {
      toast.error('Failed to calculate ICP score');
    } finally {
      setLoading(false);
    }
  };

  if (!ambassador) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader className="bg-[#02a4bf] text-white p-6 -m-6 mb-6 rounded-t-lg">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6" />
            <DialogTitle className="text-white text-lg">Calculate ICP Score</DialogTitle>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2">
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Ambassador Info */}
          <div className="flex items-center gap-4">
            <img
              src={ambassador.profile_image_url}
              alt={ambassador.full_name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#02a4bf]"
            />
            <div className="flex-1">
              <h3 className="text-[#005260]">{ambassador.full_name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  style={{
                    backgroundColor: platformConfig[ambassador.platform]?.color,
                    color: '#ffffff'
                  }}
                  className="text-xs"
                >
                  {platformConfig[ambassador.platform]?.icon} {platformConfig[ambassador.platform]?.label}
                </Badge>
                <span className="text-sm text-[#6B7280]">@{ambassador.platform_username}</span>
              </div>
            </div>
          </div>

          {/* ICP Profile Selector */}
          {!result && (
            <div>
              <Label className="text-[#005260] mb-2 block">Score against ICP Profile</Label>
              <Select value={selectedProfile} onValueChange={setSelectedProfile}>
                <SelectTrigger>
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
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-12 h-12 border-4 border-[#02a4bf] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-[#6B7280] mb-1">Analyzing with Claude AI...</p>
              <p className="text-sm text-[#9ca3af]">This may take 10-15 seconds</p>
            </div>
          )}

          {/* Results Display */}
          {result && !loading && (
            <div className="space-y-6">
              {/* Large Score Badge */}
              <div className="flex flex-col items-center">
                <div
                  className="w-32 h-32 rounded-full flex flex-col items-center justify-center border-4"
                  style={{
                    backgroundColor: getICPScoreLabel(result.icp_alignment_score).bgColor,
                    borderColor: getICPScoreLabel(result.icp_alignment_score).color
                  }}
                >
                  <div className="text-5xl mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, color: getICPScoreLabel(result.icp_alignment_score).color }}>
                    {result.icp_alignment_score}
                  </div>
                  <div className="text-xs text-[#6B7280]">ICP Alignment</div>
                </div>
                <Badge
                  className="mt-4"
                  style={{
                    backgroundColor: result.recommended_priority === 'high' ? '#10B981' : result.recommended_priority === 'medium' ? '#F59E0B' : '#6B7280',
                    color: '#ffffff'
                  }}
                >
                  {result.recommended_priority?.charAt(0).toUpperCase() + result.recommended_priority?.slice(1)} Priority
                </Badge>
              </div>

              {/* Reasoning */}
              <div>
                <h4 className="text-[#005260] mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Why this score?</h4>
                <div className="space-y-2">
                  {result.match_signals && result.match_signals.map((signal: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#02a4bf] mt-2"></div>
                      <p className="text-[#6B7280] text-sm flex-1">{signal}</p>
                    </div>
                  ))}
                  {result.reasoning && (
                    <p className="text-[#6B7280] text-sm mt-3">{result.reasoning}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center">
          <Button variant="ghost" onClick={onClose} className="text-[#6B7280]">
            Close
          </Button>
          {!result && !loading && (
            <Button onClick={calculateScore} className="bg-[#02a4bf] hover:bg-[#018a9f]">
              Calculate Score
            </Button>
          )}
          {result && !loading && (
            <Button className="bg-[#02a4bf] hover:bg-[#018a9f]">
              View Full Analysis
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Add to Campaign Modal
interface AddToCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  ambassador: Ambassador | null;
  onAdded: () => void;
}

function AddToCampaignModal({ isOpen, onClose, ambassador, onAdded }: AddToCampaignModalProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  const [role, setRole] = useState('');
  const [postCount, setPostCount] = useState('');
  const [compensation, setCompensation] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadCampaigns();
    }
  }, [isOpen]);

  const loadCampaigns = async () => {
    try {
      // NOTE: /api/v1/brand-ambassadors/campaigns endpoint not yet implemented in backend
      // Using empty data to prevent 404 errors
      // TODO: Backend needs to implement GET /api/v1/brand-ambassadors/campaigns endpoint
      console.log('AmbassadorListPage: Using default empty campaigns list (endpoint not implemented)');
      
      setCampaigns([]);
    } catch (error) {
      console.error('Failed to load campaigns:', error);
    }
  };

  const handleAdd = async () => {
    if (!ambassador || !selectedCampaign) {
      toast.error('Please select a campaign');
      return;
    }

    setLoading(true);
    try {
      await callEccoAPI('/api/v1/brand-ambassadors/campaigns/members', 'POST', {
        campaign_id: selectedCampaign,
        ambassador_id: ambassador.id,
        role_in_campaign: role || undefined,
        agreed_post_count: postCount ? parseInt(postCount) : undefined,
        ambassador_compensation: compensation ? parseFloat(compensation) : undefined
      });

      toast.success('Ambassador added to campaign');
      onAdded();
      onClose();
    } catch (error) {
      toast.error('Failed to add ambassador to campaign');
    } finally {
      setLoading(false);
    }
  };

  if (!ambassador) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-[#005260] text-xl">Add to Campaign</DialogTitle>
          <DialogDescription className="text-[#6B7280]">
            {ambassador.full_name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Campaign Selector */}
          <div>
            <Label className="text-[#005260] mb-2 block">Select Campaign *</Label>
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a campaign..." />
              </SelectTrigger>
              <SelectContent>
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    <div className="flex items-center gap-2">
                      <span>{campaign.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {campaign.status}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
                <SelectItem value="new" className="text-[#02a4bf]">
                  + Create New Campaign
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Role Input */}
          <div>
            <Label className="text-[#005260] mb-2 block">Role in Campaign (Optional)</Label>
            <Input
              placeholder="e.g., Lead Influencer, Micro-Influencer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              maxLength={200}
            />
          </div>

          {/* Deliverables */}
          <div>
            <Label className="text-[#005260] mb-2 block">Agreed Post Count</Label>
            <Input
              type="number"
              placeholder="5"
              value={postCount}
              onChange={(e) => setPostCount(e.target.value)}
              min="0"
              max="100"
            />
          </div>

          {/* Compensation */}
          <div>
            <Label className="text-[#005260] mb-2 block">Compensation Amount ($)</Label>
            <Input
              type="number"
              placeholder="500"
              value={compensation}
              onChange={(e) => setCompensation(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} className="text-[#6B7280]">
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={loading} className="bg-[#02a4bf] hover:bg-[#018a9f]">
            {loading ? 'Adding...' : 'Add to Campaign'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AmbassadorListPage() {
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [scoreModalOpen, setScoreModalOpen] = useState(false);
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [selectedAmbassador, setSelectedAmbassador] = useState<Ambassador | null>(null);

  const pageSize = 20;

  useEffect(() => {
    loadAmbassadors();
  }, [currentPage, platformFilter, statusFilter, scoreFilter, sortField, sortDirection]);

  const loadAmbassadors = async () => {
    setLoading(true);
    try {
      // NOTE: /api/v1/brand-ambassadors endpoint not yet implemented in backend
      // Using empty data to prevent 404 errors
      // TODO: Backend needs to implement GET /api/v1/brand-ambassadors endpoint
      console.log('AmbassadorListPage: Using default empty list (endpoint not implemented)');
      
      setAmbassadors([]);
      setTotalCount(0);
      setTotalPages(1);
    } catch (error) {
      console.error('Failed to load ambassadors:', error);
      setAmbassadors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    loadAmbassadors();
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(ambassadors.map(a => a.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(i => i !== id));
    }
  };

  const handleBulkStatusUpdate = async (newStatus: string) => {
    try {
      const updates = selectedIds.map(id =>
        callEccoAPI(`/api/v1/brand-ambassadors/${id}`, 'PUT', { outreach_status: newStatus })
      );
      
      const results = await Promise.allSettled(updates);
      const successful = results.filter(r => r.status === 'fulfilled').length;
      
      toast.success(`Updated ${successful} ambassadors to ${newStatus}`);
      setSelectedIds([]);
      loadAmbassadors();
    } catch (error) {
      toast.error('Failed to update ambassadors');
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} ambassadors?`)) return;

    try {
      const deletes = selectedIds.map(id =>
        callEccoAPI(`/api/v1/brand-ambassadors/${id}`, 'DELETE')
      );
      
      await Promise.allSettled(deletes);
      toast.success(`Deleted ${selectedIds.length} ambassadors`);
      setSelectedIds([]);
      loadAmbassadors();
    } catch (error) {
      toast.error('Failed to delete ambassadors');
    }
  };

  const handleExport = async () => {
    try {
      const data = await callEccoAPI(`/api/v1/brand-ambassadors?page_size=1000`, 'GET');
      const ambassadors = data.ambassadors || [];
      
      const csv = [
        ['Name', 'Platform', 'Username', 'Followers', 'Engagement Rate', 'ICP Score', 'Status'].join(','),
        ...ambassadors.map((a: Ambassador) => [
          a.full_name,
          a.platform,
          a.platform_username,
          a.follower_count,
          a.avg_engagement_rate,
          a.icp_alignment_score || 'N/A',
          a.outreach_status
        ].join(','))
      ].join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ambassadors_${Date.now()}.csv`;
      a.click();
      
      toast.success('Export completed');
    } catch (error) {
      toast.error('Failed to export');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ambassador?')) return;

    try {
      await callEccoAPI(`/api/v1/brand-ambassadors/${id}`, 'DELETE');
      toast.success('Ambassador deleted');
      loadAmbassadors();
    } catch (error) {
      toast.error('Failed to delete ambassador');
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await callEccoAPI(`/api/v1/brand-ambassadors/${id}`, 'PUT', { outreach_status: newStatus });
      toast.success('Status updated');
      loadAmbassadors();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 text-[#9ca3af]" />;
    return sortDirection === 'asc' ? 
      <ArrowUp className="w-4 h-4 text-[#02a4bf]" /> : 
      <ArrowDown className="w-4 h-4 text-[#02a4bf]" />;
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-6">
          <span>Dashboard</span>
          <ChevronRight className="w-4 h-4" />
          <span>Brand Ambassadors</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#005260]">List</span>
        </div>

        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-[#005260] text-3xl" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                Brand Ambassadors
              </h1>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                ({totalCount})
              </Badge>
            </div>
            <p className="text-[#6B7280]">Manage your influencer relationships and partnerships</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport} className="w-[140px] h-11 border-[#02a4bf] text-[#02a4bf] hover:bg-[#02a4bf]/10">
              <Download className="w-4 h-4 mr-2" />
              Export List
            </Button>
            <Button className="w-[180px] h-11 bg-[#02a4bf] hover:bg-[#018a9f]">
              <Plus className="w-4 h-4 mr-2" />
              Add Ambassador
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
          {/* Search and Filters */}
          <div className="flex items-center justify-between mb-4">
            {/* Search Bar */}
            <div className="relative w-[380px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
              <Input
                placeholder="Search by name, platform, or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 pr-10 h-11 text-[15px]"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    handleSearch();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#02a4bf]"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex gap-2">
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-[160px] h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms ▼</SelectItem>
                  <SelectItem value="instagram">📷 Instagram</SelectItem>
                  <SelectItem value="youtube">▶️ YouTube</SelectItem>
                  <SelectItem value="tiktok">🎵 TikTok</SelectItem>
                  <SelectItem value="linkedin">💼 LinkedIn</SelectItem>
                  <SelectItem value="twitter">🐦 Twitter</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses ▼</SelectItem>
                  <SelectItem value="identified">👁️ Identified</SelectItem>
                  <SelectItem value="contacted">✉️ Contacted</SelectItem>
                  <SelectItem value="responded">💬 Responded</SelectItem>
                  <SelectItem value="negotiating">🤝 Negotiating</SelectItem>
                  <SelectItem value="active">✅ Active</SelectItem>
                  <SelectItem value="declined">✗ Declined</SelectItem>
                  <SelectItem value="inactive">⏸️ Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select value={scoreFilter} onValueChange={setScoreFilter}>
                <SelectTrigger className="w-[160px] h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Scores ▼</SelectItem>
                  <SelectItem value="excellent">🟢 Excellent (80+)</SelectItem>
                  <SelectItem value="good">🟡 Good (60-79)</SelectItem>
                  <SelectItem value="fair">🟠 Fair (40-59)</SelectItem>
                  <SelectItem value="low">🔴 Low (&lt;40)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bulk Actions Toolbar */}
          {selectedIds.length > 0 && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-3">
                <span className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                  {selectedIds.length} selected
                </span>
                <button
                  onClick={() => setSelectedIds([])}
                  className="text-[#02a4bf] text-sm hover:underline"
                >
                  Clear
                </button>
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-[140px] h-10">
                      Update Status ▼
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {Object.entries(statusConfig).map(([key, config]) => (
                      <DropdownMenuItem key={key} onClick={() => handleBulkStatusUpdate(key)}>
                        {config.icon} {config.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="outline" className="w-[140px] h-10">
                  Add to Campaign ▼
                </Button>

                <Button className="w-[140px] h-10 bg-[#e84e1c] hover:bg-[#d43d0f]">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Outreach
                </Button>

                <Button variant="outline" onClick={handleExport} className="h-10">
                  <Download className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  onClick={handleBulkDelete}
                  className="h-10 border-red-500 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 py-4">
                  <Skeleton className="w-5 h-5" />
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </div>
          ) : ambassadors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6">
              {searchTerm || platformFilter !== 'all' || statusFilter !== 'all' || scoreFilter !== 'all' ? (
                <>
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                    No Results Found
                  </h3>
                  <p className="text-[#6B7280] mb-4">Try adjusting your filters or search terms</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setPlatformFilter('all');
                      setStatusFilter('all');
                      setScoreFilter('all');
                      setCurrentPage(1);
                    }}
                    className="text-[#02a4bf] hover:underline"
                  >
                    Clear Filters
                  </button>
                </>
              ) : (
                <>
                  <div className="text-7xl mb-4">🎯</div>
                  <h3 className="text-2xl text-[#6B7280] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                    No Ambassadors Yet
                  </h3>
                  <p className="text-[#6B7280] mb-6">Add your first brand ambassador to start tracking relationships</p>
                  <div className="flex gap-3">
                    <Button className="h-13 bg-[#02a4bf] hover:bg-[#018a9f]">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Ambassador
                    </Button>
                    <Button variant="outline" className="h-13 border-[#02a4bf] text-[#02a4bf]">
                      Discover Influencers
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="bg-[#F9FAFB] px-5 py-3 border-b sticky top-0 z-10">
                <div className="grid grid-cols-[48px_280px_140px_120px_120px_140px_160px_60px] items-center gap-4">
                  <div className="flex justify-center">
                    <Checkbox
                      checked={selectedIds.length === ambassadors.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </div>
                  <button
                    onClick={() => handleSort('full_name')}
                    className="flex items-center gap-2 text-[#374151] hover:text-[#02a4bf]"
                    style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}
                  >
                    Name
                    <SortIcon field="full_name" />
                  </button>
                  <button
                    onClick={() => handleSort('platform')}
                    className="flex items-center gap-2 text-[#374151] hover:text-[#02a4bf]"
                    style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}
                  >
                    Platform
                    <SortIcon field="platform" />
                  </button>
                  <button
                    onClick={() => handleSort('follower_count')}
                    className="flex items-center gap-2 text-[#374151] hover:text-[#02a4bf] justify-end"
                    style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}
                  >
                    Followers
                    <SortIcon field="follower_count" />
                  </button>
                  <button
                    onClick={() => handleSort('avg_engagement_rate')}
                    className="flex items-center gap-2 text-[#374151] hover:text-[#02a4bf] justify-end"
                    style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}
                  >
                    Engagement
                    <SortIcon field="avg_engagement_rate" />
                  </button>
                  <button
                    onClick={() => handleSort('icp_alignment_score')}
                    className="flex items-center gap-2 text-[#374151] hover:text-[#02a4bf] justify-center"
                    style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}
                  >
                    ICP Score
                    <SortIcon field="icp_alignment_score" />
                  </button>
                  <div className="text-[#374151]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                    Status
                  </div>
                  <div className="text-center text-[#374151]">⋮</div>
                </div>
              </div>

              {/* Table Rows */}
              <div>
                {ambassadors.map((ambassador) => {
                  const isSelected = selectedIds.includes(ambassador.id);
                  const icpInfo = getICPScoreLabel(ambassador.icp_alignment_score);
                  const statusInfo = statusConfig[ambassador.outreach_status];
                  const platformInfo = platformConfig[ambassador.platform];

                  return (
                    <div
                      key={ambassador.id}
                      className={`grid grid-cols-[48px_280px_140px_120px_120px_140px_160px_60px] items-center gap-4 px-5 py-4 border-b hover:bg-[#F0F9FA] transition-colors ${
                        isSelected ? 'bg-[#F0F9FA] border-l-4 border-l-[#02a4bf]' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <div className="flex justify-center">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) => handleSelectOne(ambassador.id, checked as boolean)}
                        />
                      </div>

                      {/* Name */}
                      <div className="flex items-center gap-3">
                        <img
                          src={ambassador.profile_image_url}
                          alt={ambassador.full_name}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                          <div className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '15px' }}>
                            {ambassador.full_name}
                          </div>
                          <div className="text-[#6B7280] text-[13px]">
                            @{ambassador.platform_username}
                          </div>
                        </div>
                      </div>

                      {/* Platform */}
                      <div>
                        {platformInfo && (
                          <Badge
                            style={{
                              backgroundColor: platformInfo.color,
                              color: '#ffffff',
                              borderRadius: '999px'
                            }}
                            className="text-xs uppercase"
                          >
                            {platformInfo.icon} {platformInfo.label}
                          </Badge>
                        )}
                      </div>

                      {/* Followers */}
                      <div className="text-right text-[#374151]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '15px' }}>
                        {formatNumber(ambassador.follower_count)}
                      </div>

                      {/* Engagement */}
                      <div
                        className="text-right"
                        style={{
                          fontFamily: 'Poppins',
                          fontWeight: 600,
                          fontSize: '15px',
                          color: getEngagementColor(ambassador.avg_engagement_rate)
                        }}
                      >
                        {ambassador.avg_engagement_rate.toFixed(1)}%
                      </div>

                      {/* ICP Score */}
                      <div className="flex justify-center">
                        {ambassador.icp_alignment_score !== null ? (
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center relative group cursor-pointer"
                            style={{
                              backgroundColor: icpInfo.bgColor,
                              border: `2px solid ${icpInfo.color}`
                            }}
                          >
                            <span
                              className="text-sm"
                              style={{
                                fontFamily: 'Poppins',
                                fontWeight: 700,
                                color: icpInfo.color
                              }}
                            >
                              {ambassador.icp_alignment_score}
                            </span>
                            <span className="absolute right-0 top-0 text-xs">{icpInfo.emoji}</span>
                            
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-[#005260] text-white px-3 py-2 rounded text-xs whitespace-nowrap z-20">
                              {icpInfo.label}
                            </div>
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F3F4F6] text-[#9ca3af]">
                            <span className="text-xs">—</span>
                          </div>
                        )}
                      </div>

                      {/* Status */}
                      <div>
                        {statusInfo && (
                          <Badge
                            style={{
                              backgroundColor: statusInfo.bgColor,
                              color: statusInfo.color,
                              borderRadius: '999px'
                            }}
                            className="text-xs"
                          >
                            {statusInfo.icon} {statusInfo.label}
                          </Badge>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="text-[#9ca3af] hover:text-[#02a4bf] p-1">
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[220px]">
                            <DropdownMenuItem>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              Update Status ▶
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedAmbassador(ambassador);
                                setScoreModalOpen(true);
                              }}
                              className={ambassador.icp_alignment_score === null ? 'text-[#02a4bf]' : ''}
                            >
                              <Target className="w-4 h-4 mr-2" />
                              Score with ICP
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedAmbassador(ambassador);
                                setCampaignModalOpen(true);
                              }}
                            >
                              Add to Campaign
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-[#e84e1c]">
                              <Mail className="w-4 h-4 mr-2" />
                              Send Outreach
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <BarChart3 className="w-4 h-4 mr-2" />
                              View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(ambassador.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        {!loading && ambassadors.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-5">
            <div className="text-[#6B7280] text-sm mr-4">
              Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalCount)} of {totalCount}
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-[100px] h-9"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={i}
                  variant={currentPage === pageNum ? 'default' : 'outline'}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 ${
                    currentPage === pageNum
                      ? 'bg-[#02a4bf] text-white hover:bg-[#018a9f]'
                      : ''
                  }`}
                  style={currentPage === pageNum ? { fontFamily: 'Poppins', fontWeight: 600 } : {}}
                >
                  {pageNum}
                </Button>
              );
            })}

            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-[100px] h-9 bg-[#02a4bf] text-white hover:bg-[#018a9f] disabled:bg-gray-200"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      <ScoreWithICPModal
        isOpen={scoreModalOpen}
        onClose={() => {
          setScoreModalOpen(false);
          setSelectedAmbassador(null);
        }}
        ambassador={selectedAmbassador}
        onScoreCalculated={loadAmbassadors}
      />

      <AddToCampaignModal
        isOpen={campaignModalOpen}
        onClose={() => {
          setCampaignModalOpen(false);
          setSelectedAmbassador(null);
        }}
        ambassador={selectedAmbassador}
        onAdded={loadAmbassadors}
      />
    </div>
  );
}