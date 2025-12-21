import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
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
  DialogDescription,
} from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Search,
  MessageCircle,
  Send,
  Copy,
  ExternalLink,
  RefreshCw,
  Edit,
  CheckCircle2,
  MoreVertical,
  Clock,
  ChevronRight,
  Linkedin,
  AlertCircle,
  Trash2,
  Loader2,
  Plus,
  Calendar,
  Hourglass,
  Info,
  Shield,
  Sparkles,
  X,
  ChevronDown,
} from 'lucide-react';
import { callEccoAPI } from '../../lib/eccoAPI';
import { toast } from 'sonner@2.0.3';

interface LinkedInLead {
  id: string;
  lead_id: string;
  campaign_id: string;
  status: 'not_connected' | 'send_connection' | 'pending' | 'connected';
  scheduled_for?: string;
  connection_message?: string;
  sent_at?: string;
  connected_at?: string;
  lead: {
    full_name: string;
    headline: string;
    company?: string;
    linkedin_url: string;
    profile_image_url: string;
  };
  campaign: {
    campaign_name: string;
  };
  context?: string;
}

interface LinkedInDM {
  id: string;
  lead_id: string;
  campaign_id: string;
  message_text: string;
  dm_context: string;
  dm_tone: string;
  status: 'pending' | 'copied' | 'sent';
  generated_at: string;
  copied_at: string | null;
  sent_at: string | null;
  lead: {
    full_name: string;
    headline: string;
    company?: string;
    linkedin_url: string;
    profile_image_url: string;
    connection_status: string;
  };
  campaign: {
    campaign_name: string;
  };
}

interface Stats {
  connections_this_week: number;
  weekly_limit: number;
  queued_connections: number;
  pending_connections: number;
  total_connected: number;
  dms_pending: number;
}

interface UnipileAccount {
  id: string;
  email: string;
  is_active: boolean;
  connections_this_week: number;
  weekly_limit: number;
}

export function LinkedInDMPage() {
  const [activeTab, setActiveTab] = useState<'connections' | 'dms'>('connections');
  const [connectionQueue, setConnectionQueue] = useState<LinkedInLead[]>([]);
  const [dms, setDMs] = useState<LinkedInDM[]>([]);
  const [stats, setStats] = useState<Stats>({
    connections_this_week: 3,
    weekly_limit: 15,
    queued_connections: 12,
    pending_connections: 8,
    total_connected: 87,
    dms_pending: 23,
  });
  const [unipileAccount, setUnipileAccount] = useState<UnipileAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  
  // Filters
  const [connectionStatusFilter, setConnectionStatusFilter] = useState('all');
  const [dmStatusFilter, setDMStatusFilter] = useState('all');
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [connectUnipileModalOpen, setConnectUnipileModalOpen] = useState(false);
  const [addFromCampaignModalOpen, setAddFromCampaignModalOpen] = useState(false);
  const [sendConnectionModalOpen, setSendConnectionModalOpen] = useState(false);
  const [checkStatusModalOpen, setCheckStatusModalOpen] = useState(false);
  const [generateDMModalOpen, setGenerateDMModalOpen] = useState(false);
  const [bulkGenerateDMModalOpen, setBulkGenerateDMModalOpen] = useState(false);
  
  const [selectedLead, setSelectedLead] = useState<LinkedInLead | null>(null);
  const [selectedDM, setSelectedDM] = useState<LinkedInDM | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedMessage, setEditedMessage] = useState('');

  // Form states
  const [connectionMessage, setConnectionMessage] = useState('');
  const [messageTone, setMessageTone] = useState('professional_friendly');
  const [additionalContext, setAdditionalContext] = useState('');
  const [maxLength, setMaxLength] = useState([250]);
  const [addLeadsMode, setAddLeadsMode] = useState('not_connected');

  const tenantId = 'demo-tenant-123';

  useEffect(() => {
    loadData();
  }, [activeTab, connectionStatusFilter, dmStatusFilter, campaignFilter]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [accountData, queueData, statsData, dmsData] = await Promise.all([
        callEccoAPI('/api/linkedin/accounts', 'GET'),
        callEccoAPI(`/api/linkedin/connections/queue?status=${connectionStatusFilter}`, 'GET'),
        callEccoAPI('/api/linkedin/connections/stats', 'GET'),
        callEccoAPI(`/api/linkedin/dms?status=${dmStatusFilter}`, 'GET'),
      ]);

      setUnipileAccount(accountData.accounts?.[0] || null);
      setConnectionQueue(queueData.queue || []);
      setStats(statsData);
      setDMs(dmsData.dms || []);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleConnectUnipile = () => {
    // In production, this would open Unipile OAuth flow
    window.open('https://unipile.com/oauth/authorize', '_blank');
    toast.info('Opening Unipile connection flow...');
    setConnectUnipileModalOpen(false);
  };

  const handleSendConnection = async (lead: LinkedInLead) => {
    try {
      await callEccoAPI('/api/linkedin/connections/send', 'POST', {
        lead_id: lead.lead_id,
        message: connectionMessage,
        unipile_account_id: unipileAccount?.id,
      });
      
      toast.success(`✓ Connection request sent to ${lead.lead.full_name}`);
      setSendConnectionModalOpen(false);
      setConnectionMessage('');
      loadData();
    } catch (error) {
      toast.error('Failed to send connection request');
    }
  };

  const handleCheckStatus = async () => {
    setCheckStatusModalOpen(true);
    try {
      const leadIds = selectedLeads.length > 0 
        ? selectedLeads 
        : connectionQueue.filter(l => l.status === 'pending').map(l => l.lead_id);

      const response = await callEccoAPI(
        '/api/linkedin/connections/check-status',
        'POST',
        {
          lead_ids: leadIds,
          unipile_account_id: unipileAccount?.id,
        }
      );

      setTimeout(() => {
        toast.success(`✓ ${response.connected.length} connections accepted!`);
        setCheckStatusModalOpen(false);
        loadData();
      }, 2000);
    } catch (error) {
      toast.error('Failed to check status');
      setCheckStatusModalOpen(false);
    }
  };

  const handleBulkSendConnections = async () => {
    if (selectedLeads.length === 0) return;

    try {
      for (const leadId of selectedLeads) {
        const lead = connectionQueue.find(l => l.id === leadId);
        if (lead) {
          await callEccoAPI('/api/linkedin/connections/send', 'POST', {
            lead_id: lead.lead_id,
            unipile_account_id: unipileAccount?.id,
          });
        }
      }
      
      toast.success(`✓ ${selectedLeads.length} connection requests sent`);
      setSelectedLeads([]);
      loadData();
    } catch (error) {
      toast.error('Failed to send connection requests');
    }
  };

  const handleRemoveFromQueue = async (leadId: string) => {
    try {
      await callEccoAPI(`/api/linkedin/connections/queue/${leadId}`, 'DELETE');
      toast.success('✓ Removed from queue');
      loadData();
    } catch (error) {
      toast.error('Failed to remove from queue');
    }
  };

  const handleGenerateDM = async (lead: LinkedInLead) => {
    try {
      await callEccoAPI('/api/linkedin/dms/generate', 'POST', {
        lead_ids: [lead.lead_id],
        context: additionalContext,
        tone: messageTone,
        max_length: maxLength[0],
      });

      toast.success('✓ DM generated successfully!');
      setGenerateDMModalOpen(false);
      setActiveTab('dms');
      loadData();
    } catch (error) {
      toast.error('Failed to generate DM');
    }
  };

  const handleCopyDM = async (dm: LinkedInDM) => {
    try {
      await navigator.clipboard.writeText(dm.message_text);
      await callEccoAPI(`/api/linkedin/dms/${dm.id}/copied`, 'PATCH');
      toast.success('✓ Message copied to clipboard');
      loadData();
    } catch (error) {
      toast.error('Failed to copy message');
    }
  };

  const handleMarkDMSent = async (dm: LinkedInDM) => {
    try {
      await callEccoAPI(`/api/linkedin/dms/${dm.id}/sent`, 'PATCH');
      toast.success('✓ Marked as sent');
      loadData();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const toggleLeadSelection = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      not_connected: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Not Connected' },
      send_connection: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Send Connection Request' },
      pending: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Pending' },
      connected: { bg: 'bg-green-100', text: 'text-green-700', label: 'Connected' },
    };
    const badge = badges[status as keyof typeof badges] || badges.not_connected;
    return (
      <Badge className={`${badge.bg} ${badge.text} border-0`} style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
        {badge.label}
      </Badge>
    );
  };

  const getDMStatusBadge = (status: string) => {
    const badges = {
      pending: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Pending' },
      copied: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Copied' },
      sent: { bg: 'bg-green-100', text: 'text-green-700', label: 'Sent' },
    };
    const badge = badges[status as keyof typeof badges] || badges.pending;
    return (
      <Badge className={`${badge.bg} ${badge.text} border-0`} style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
        {badge.label}
      </Badge>
    );
  };

  const getCharacterColor = (length: number) => {
    if (length < 250) return 'text-green-600';
    if (length <= 280) return 'text-orange-500';
    return 'text-red-600';
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] p-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-[#02a4bf] animate-spin mx-auto mb-4" />
              <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans' }}>Loading LinkedIn manager...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] p-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Home</span>
          <ChevronRight className="w-4 h-4 text-[#6B7280]" />
          <span className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Lead Generator</span>
          <ChevronRight className="w-4 h-4 text-[#6B7280]" />
          <span className="text-[#1f2937]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>LinkedIn Manager</span>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-[#1f2937] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}>
            LinkedIn Connection & DM Manager
          </h1>
          <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
            Automate outreach while staying within LinkedIn's limits
          </p>
        </div>

        {/* Unipile Connection Banner */}
        {!unipileAccount ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 mb-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-[#f59e0b] flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-[#92400e] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}>
                ⚠️ LinkedIn Account Not Connected
              </h3>
              <p className="text-[#92400e] mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Connect your LinkedIn account via Unipile to enable automated connection requests and DM management.
              </p>
              <Button 
                onClick={() => setConnectUnipileModalOpen(true)}
                className="bg-[#02a4bf] hover:bg-[#018a9f] text-white"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                <span style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}>Connect LinkedIn Account</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="text-blue-900" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                  📱 Smart Scheduling Active
                </h4>
                <p className="text-blue-800" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                  We automatically space connections to stay under LinkedIn's 15/week limit. Current schedule: 2 connections per day, every 12 hours.
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-900" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                Connected as: {unipileAccount.email}
              </p>
              <button className="text-red-600 underline" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                Disconnect
              </button>
            </div>
          </div>
        )}

        {/* Stats Banner */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <div className="grid grid-cols-4 gap-6">
            {/* This Week */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-[#1f2937] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px', lineHeight: '1' }}>
                {stats.connections_this_week} / {stats.weekly_limit}
              </div>
              <div className="text-[#6B7280] mb-2" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Connections Used</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#02a4bf] h-2 rounded-full transition-all"
                  style={{ width: `${(stats.connections_this_week / stats.weekly_limit) * 100}%` }}
                />
              </div>
            </div>

            {/* Queue Status */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#f59e0b]" />
                </div>
              </div>
              <div className="text-[#1f2937] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px', lineHeight: '1' }}>
                {stats.queued_connections}
              </div>
              <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Queued Connections</div>
              <div className="text-[#9ca3af] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                Next: Tomorrow 9am
              </div>
            </div>

            {/* Pending */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Hourglass className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="text-[#1f2937] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px', lineHeight: '1' }}>
                {stats.pending_connections}
              </div>
              <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Awaiting Response</div>
              <div className="text-[#9ca3af] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                Avg response: 2-3 days
              </div>
            </div>

            {/* Connected */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#059669]" />
                </div>
              </div>
              <div className="text-[#059669] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px', lineHeight: '1' }}>
                {stats.total_connected}
              </div>
              <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Total Connected</div>
              <div className="text-green-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                ↑ 12 this week
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-t-2xl shadow-sm">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('connections')}
              className={`flex items-center gap-2 px-6 py-4 transition-colors relative ${
                activeTab === 'connections'
                  ? 'text-[#02a4bf] border-b-2 border-[#02a4bf]'
                  : 'text-[#6B7280] hover:text-[#02a4bf]'
              }`}
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
            >
              <Send className="w-5 h-5" />
              Connection Queue
              <span className={`${activeTab === 'connections' && stats.queued_connections > 0 ? 'text-[#02a4bf]' : 'text-[#9ca3af]'}`}>
                ({stats.queued_connections})
              </span>
            </button>
            <button
              onClick={() => setActiveTab('dms')}
              className={`flex items-center gap-2 px-6 py-4 transition-colors relative ${
                activeTab === 'dms'
                  ? 'text-[#02a4bf] border-b-2 border-[#02a4bf]'
                  : 'text-[#6B7280] hover:text-[#02a4bf]'
              }`}
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
            >
              <MessageCircle className="w-5 h-5" />
              DM Queue
              <span className={`${activeTab === 'dms' && stats.dms_pending > 0 ? 'text-[#02a4bf]' : 'text-[#9ca3af]'}`}>
                ({stats.dms_pending})
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-2xl shadow-sm p-6">
          {activeTab === 'connections' ? (
            <>
              {/* Filter Bar */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Select value={connectionStatusFilter} onValueChange={setConnectionStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="send_connection">🟡 Send Connection</SelectItem>
                      <SelectItem value="pending">🟣 Pending</SelectItem>
                      <SelectItem value="connected">🟢 Connected</SelectItem>
                      <SelectItem value="not_connected">🔴 Not Connected</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Campaigns" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Campaigns</SelectItem>
                      <SelectItem value="campaign1">AI Healthcare Post (87)</SelectItem>
                      <SelectItem value="campaign2">Tech Leaders (45)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                    <Input
                      placeholder="Search by name or company..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    onClick={() => setAddFromCampaignModalOpen(true)}
                    variant="outline"
                    className="border-[#02a4bf] text-[#02a4bf] hover:bg-[#E6F7F9]"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add from Campaign
                  </Button>
                </div>
              </div>

              {/* Connection Cards */}
              <div className="space-y-3">
                {connectionQueue.length === 0 ? (
                  <div className="text-center py-16">
                    <Send className="w-20 h-20 text-gray-300 mx-auto mb-4 transform -rotate-45" />
                    <h3 className="text-[#1f2937] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
                      No connections queued
                    </h3>
                    <p className="text-[#6B7280] mb-6" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
                      Add leads from a campaign to start building connections
                    </p>
                    <Button
                      onClick={() => setAddFromCampaignModalOpen(true)}
                      className="bg-[#02a4bf] hover:bg-[#018a9f] text-white h-12"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add from Campaign
                    </Button>
                  </div>
                ) : (
                  connectionQueue.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all"
                    >
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-3">
                        <Checkbox
                          checked={selectedLeads.includes(lead.id)}
                          onCheckedChange={() => toggleLeadSelection(lead.id)}
                          className="mt-1"
                        />
                        <img
                          src={lead.lead.profile_image_url || `https://api.dicebear.com/7.x/initials/svg?seed=${lead.lead.full_name}`}
                          alt={lead.lead.full_name}
                          className="w-14 h-14 rounded-full"
                        />
                        <div className="flex-1">
                          <h3 className="text-[#1f2937] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px' }}>
                            {lead.lead.full_name}
                          </h3>
                          <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                            {lead.lead.headline}
                          </p>
                          {lead.lead.company && (
                            <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                              {lead.lead.company}
                            </p>
                          )}
                          <a
                            href={lead.lead.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#02a4bf] hover:underline flex items-center gap-1 mt-1"
                            style={{ fontFamily: 'Open Sans', fontSize: '12px' }}
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                            View Profile
                          </a>
                        </div>
                        {getStatusBadge(lead.status)}
                      </div>

                      {/* Campaign Tag */}
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-0 mb-3" style={{ fontSize: '11px' }}>
                        {lead.campaign.campaign_name}
                      </Badge>

                      <div className="border-t border-gray-100 my-3" />

                      {/* Context */}
                      {lead.context && (
                        <div className="mb-3">
                          <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '12px' }}>
                            Context:
                          </p>
                          <p className="text-[#6B7280] italic" style={{ fontFamily: 'Open Sans', fontSize: '11px' }}>
                            {lead.context}
                          </p>
                        </div>
                      )}

                      {/* Schedule Info */}
                      {lead.scheduled_for && (
                        <div className="flex items-center gap-2 mb-3 text-[#02a4bf]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                          <Clock className="w-4 h-4" />
                          <span>Scheduled for: {new Date(lead.scheduled_for).toLocaleString()}</span>
                        </div>
                      )}

                      {/* Connection Message Preview */}
                      {lead.connection_message && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                              Connection Message:
                            </p>
                            <button className="text-[#02a4bf]" style={{ fontSize: '12px' }}>Edit</button>
                          </div>
                          <div className="bg-[#f9fafb] rounded-lg p-3">
                            <p className="text-[#374151] line-clamp-2" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                              {lead.connection_message}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        {lead.status === 'not_connected' || lead.status === 'send_connection' ? (
                          <Button
                            onClick={() => {
                              setSelectedLead(lead);
                              setSendConnectionModalOpen(true);
                            }}
                            className="bg-[#fbbf24] hover:bg-[#f59e0b] text-white flex-1"
                            disabled={!unipileAccount}
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Send Connection Request
                          </Button>
                        ) : lead.status === 'pending' ? (
                          <Button
                            onClick={handleCheckStatus}
                            variant="outline"
                            className="border-blue-500 text-blue-600 hover:bg-blue-50 flex-1"
                          >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Check Status
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              setSelectedLead(lead);
                              setGenerateDMModalOpen(true);
                            }}
                            className="bg-[#02a4bf] hover:bg-[#018a9f] text-white flex-1"
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate DM
                          </Button>
                        )}
                        
                        <Button
                          variant="outline"
                          onClick={() => window.open(lead.lead.linkedin_url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View on LinkedIn
                        </Button>
                        
                        <Button
                          variant="outline"
                          onClick={() => handleRemoveFromQueue(lead.id)}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Smart Scheduling Info Card */}
              {unipileAccount && (
                <div className="bg-blue-50 rounded-xl p-4 mt-6">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-blue-900 mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                        📱 Smart Scheduling Active
                      </h4>
                      <div className="space-y-1" style={{ fontFamily: 'Open Sans', fontSize: '13px', color: '#1e3a8a' }}>
                        <p>We automatically space connections to stay under LinkedIn's 15/week limit.</p>
                        <p>Current schedule: 2 connections per day, every 12 hours.</p>
                        <p className="mt-2">Weekly usage: {stats.connections_this_week} of {stats.weekly_limit} connections used</p>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2 mt-3">
                        <div 
                          className="bg-[#02a4bf] h-2 rounded-full transition-all"
                          style={{ width: `${(stats.connections_this_week / stats.weekly_limit) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* DM Queue Filter Bar */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Select value={dmStatusFilter} onValueChange={setDMStatusFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="copied">Copied</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Campaigns" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Campaigns</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative w-[300px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                  <Input
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* DM Cards */}
              <div className="space-y-4">
                {dms.length === 0 ? (
                  <div className="text-center py-16">
                    <MessageCircle className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-[#1f2937] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
                      No messages generated
                    </h3>
                    <p className="text-[#6B7280] mb-6" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
                      Connect with leads first, then generate DMs
                    </p>
                    <Button
                      onClick={() => setActiveTab('connections')}
                      className="bg-[#02a4bf] hover:bg-[#018a9f] text-white h-12"
                    >
                      Go to Connection Queue
                    </Button>
                  </div>
                ) : (
                  dms.map((dm) => (
                    <div
                      key={dm.id}
                      className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={dm.lead.profile_image_url || `https://api.dicebear.com/7.x/initials/svg?seed=${dm.lead.full_name}`}
                            alt={dm.lead.full_name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <h3 className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px' }}>
                              {dm.lead.full_name}
                            </h3>
                            <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                              {dm.lead.headline}
                            </p>
                            {dm.lead.company && (
                              <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                                {dm.lead.company}
                              </p>
                            )}
                          </div>
                        </div>
                        {getDMStatusBadge(dm.status)}
                      </div>

                      {/* Campaign Tag */}
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-0 mb-3" style={{ fontSize: '11px' }}>
                        {dm.campaign.campaign_name}
                      </Badge>

                      <div className="border-t border-gray-100 my-3" />

                      {/* Message */}
                      <div>
                        <p className="text-[#6B7280] mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                          Message:
                        </p>
                        <div className="bg-[#f9fafb] rounded-lg p-3">
                          <p className="text-[#374151]" style={{ fontFamily: 'Open Sans', fontSize: '14px', lineHeight: '1.6' }}>
                            {dm.message_text}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className={`${getCharacterColor(dm.message_text.length)}`} style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                            {dm.message_text.length} characters
                          </p>
                          {dm.dm_context && (
                            <p className="text-[#6B7280] italic" style={{ fontFamily: 'Open Sans', fontSize: '11px' }}>
                              Context: {dm.dm_context}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Timestamp */}
                      <div className="flex items-center gap-1 mt-2 text-[#9ca3af]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                        <Clock className="w-3.5 h-3.5" />
                        <span>Generated {formatTimeAgo(dm.generated_at)}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 mt-4">
                        <Button
                          onClick={() => handleCopyDM(dm)}
                          className="bg-[#02a4bf] hover:bg-[#018a9f] text-white flex-1"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Message
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => window.open(dm.lead.linkedin_url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleMarkDMSent(dm)}
                          className="border-green-300 text-green-600 hover:bg-green-50"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        {/* Action Bar (when leads selected) */}
        {selectedLeads.length > 0 && activeTab === 'connections' && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#005260] text-white p-4 shadow-lg animate-in slide-in-from-bottom">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between">
              <span style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}>
                {selectedLeads.length} leads selected
              </span>
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleBulkSendConnections}
                  className="bg-[#02a4bf] hover:bg-[#018a9f] text-white"
                  disabled={!unipileAccount}
                >
                  Send Connection Requests
                </Button>
                <Button
                  onClick={() => {
                    selectedLeads.forEach(id => handleRemoveFromQueue(id));
                    setSelectedLeads([]);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Remove from Queue
                </Button>
                <button
                  onClick={() => setSelectedLeads([])}
                  className="text-white underline"
                  style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      
      {/* Connect Unipile Modal */}
      <Dialog open={connectUnipileModalOpen} onOpenChange={setConnectUnipileModalOpen}>
        <DialogContent className="max-w-[600px]">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
              Connect LinkedIn via Unipile
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <h4 className="text-[#1f2937] mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
                What you'll need:
              </h4>
              <ul className="space-y-2" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                <li>• Unipile account (we'll help you create one)</li>
                <li>• LinkedIn credentials</li>
                <li>• Authorization to connect</li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#1f2937] mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
                Setup instructions:
              </h4>
              <ol className="space-y-2" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                <li>1. Click "Connect with Unipile" below</li>
                <li>2. Log in to Unipile (or create account)</li>
                <li>3. Authorize Ecco AI to manage connections</li>
                <li>4. Log in to your LinkedIn account</li>
                <li>5. Return here to start automating</li>
              </ol>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#f59e0b] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[#92400e]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                  LinkedIn Rate Limits
                </h4>
                <p className="text-[#92400e] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                  Free accounts: 15 connections/week
                </p>
                <p className="text-[#92400e]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                  We'll automatically stay within limits
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setConnectUnipileModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConnectUnipile} className="bg-[#02a4bf] hover:bg-[#018a9f] text-white h-12">
              <Linkedin className="w-5 h-5 mr-2" />
              Connect with Unipile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Connection Modal */}
      <Dialog open={sendConnectionModalOpen} onOpenChange={setSendConnectionModalOpen}>
        <DialogContent className="max-w-[500px]">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}>
              Send Connection Request?
            </DialogTitle>
          </DialogHeader>

          {selectedLead && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedLead.lead.profile_image_url || `https://api.dicebear.com/7.x/initials/svg?seed=${selectedLead.lead.full_name}`}
                  alt={selectedLead.lead.full_name}
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px' }}>
                    {selectedLead.lead.full_name}
                  </h3>
                  <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    {selectedLead.lead.headline}
                  </p>
                  <a
                    href={selectedLead.lead.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#02a4bf] hover:underline text-sm"
                  >
                    View on LinkedIn
                  </a>
                </div>
              </div>

              <div>
                <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Connection Message (optional)
                </Label>
                <Textarea
                  rows={3}
                  value={connectionMessage}
                  onChange={(e) => setConnectionMessage(e.target.value)}
                  placeholder="Hi! I'd like to connect..."
                  maxLength={300}
                  className="mt-1.5"
                />
                <p className="text-[#9ca3af] text-right mt-1" style={{ fontSize: '12px' }}>
                  {connectionMessage.length} / 300
                </p>
              </div>

              {stats.connections_this_week >= 13 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-[#92400e]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                    You've used {stats.connections_this_week} of {stats.weekly_limit} weekly connections.
                  </p>
                  <p className="text-[#92400e]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                    Sending this will leave {stats.weekly_limit - stats.connections_this_week - 1} remaining.
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSendConnectionModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => selectedLead && handleSendConnection(selectedLead)}
              className="bg-[#fbbf24] hover:bg-[#f59e0b] text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Connection Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Check Status Modal */}
      <Dialog open={checkStatusModalOpen} onOpenChange={() => {}}>
        <DialogContent className="max-w-[500px]" onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="sr-only">Checking Connection Status</DialogTitle>
            <DialogDescription className="sr-only">
              Please wait while we verify connection statuses with LinkedIn via Unipile
            </DialogDescription>
          </DialogHeader>
          <div className="py-8 text-center space-y-4">
            <Loader2 className="w-12 h-12 text-[#02a4bf] animate-spin mx-auto" />
            <h3 className="text-[#1f2937]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}>
              Checking Connection Status...
            </h3>
            <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Checking with LinkedIn via Unipile...
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Generate DM Modal */}
      <Dialog open={generateDMModalOpen} onOpenChange={setGenerateDMModalOpen}>
        <DialogContent className="max-w-[700px]">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
              Generate DM for {selectedLead?.lead.full_name}
            </DialogTitle>
          </DialogHeader>

          {selectedLead && (
            <div className="space-y-4 py-4">
              {/* Lead Preview */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={selectedLead.lead.profile_image_url || `https://api.dicebear.com/7.x/initials/svg?seed=${selectedLead.lead.full_name}`}
                  alt={selectedLead.lead.full_name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px' }}>
                    {selectedLead.lead.full_name}
                  </h3>
                  <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    {selectedLead.lead.headline}
                  </p>
                  <p className="text-green-600" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                    Connected {selectedLead.connected_at ? formatTimeAgo(selectedLead.connected_at) : 'recently'}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div>
                <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>Message Tone</Label>
                <Select value={messageTone} onValueChange={setMessageTone}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional_friendly">Professional and Friendly</SelectItem>
                    <SelectItem value="casual">Casual and Conversational</SelectItem>
                    <SelectItem value="professional_direct">Professional and Direct</SelectItem>
                    <SelectItem value="warm_personal">Warm and Personal</SelectItem>
                    <SelectItem value="industry_expert">Industry Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Additional Context (optional)
                </Label>
                <Textarea
                  rows={3}
                  placeholder="We discussed AI trends..."
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  className="mt-1.5"
                  maxLength={500}
                />
                <p className="text-[#9ca3af] text-right mt-1" style={{ fontSize: '11px' }}>
                  {additionalContext.length} / 500
                </p>
              </div>

              <div>
                <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>Max Message Length</Label>
                <div className="mt-1.5">
                  <div className="text-[#02a4bf] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px' }}>
                    {maxLength[0]} characters
                  </div>
                  <Slider
                    value={maxLength}
                    onValueChange={setMaxLength}
                    min={100}
                    max={300}
                    step={10}
                    className="w-full"
                  />
                  <p className="text-[#6B7280] mt-2" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                    LinkedIn DM limit is 300 characters
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-[#374151]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                  This will use <strong>1 Claude API credit</strong>
                </p>
                <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  Current balance: 1,247 credits
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setGenerateDMModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => selectedLead && handleGenerateDM(selectedLead)}
              className="bg-[#02a4bf] hover:bg-[#018a9f] text-white"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add from Campaign Modal */}
      <Dialog open={addFromCampaignModalOpen} onOpenChange={setAddFromCampaignModalOpen}>
        <DialogContent className="max-w-[700px]">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
              Add Leads to Connection Queue
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>Select Campaign</Label>
              <Select>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Choose a campaign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="campaign1">AI Healthcare Post (87 leads)</SelectItem>
                  <SelectItem value="campaign2">Tech Leaders (45 leads)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>Lead Status Filter</Label>
              <RadioGroup value={addLeadsMode} onValueChange={setAddLeadsMode} className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all-leads" />
                  <Label htmlFor="all-leads" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    All leads from campaign
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not_connected" id="not-connected" />
                  <Label htmlFor="not-connected" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    Only not connected (recommended)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="selected" id="selected-leads" />
                  <Label htmlFor="selected-leads" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    Selected leads only
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-blue-900 mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                Preview
              </h4>
              <div className="space-y-1" style={{ fontFamily: 'Open Sans', fontSize: '13px', color: '#1e3a8a' }}>
                <p>Leads to add: <strong>34</strong></p>
                <p>Already connected: <strong>12</strong> (will skip)</p>
                <p>Already in queue: <strong>5</strong> (will skip)</p>
                <p className="text-green-700 font-semibold">New additions: <strong>17</strong></p>
              </div>
            </div>

            <div>
              <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                Connection Request Message (optional)
              </Label>
              <Textarea
                rows={3}
                placeholder="Hi! I'd like to connect..."
                maxLength={300}
                className="mt-1.5"
              />
              <p className="text-[#9ca3af] text-right mt-1" style={{ fontSize: '12px' }}>
                0 / 300 characters
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-[#1f2937] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '15px' }}>
                Schedule Preview
              </h4>
              <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                First send: <strong>Tomorrow 9:00 AM</strong>
              </p>
              <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                Last send: <strong>Nov 17, 9:00 PM</strong>
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddFromCampaignModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast.success('✓ 17 leads added to queue');
                setAddFromCampaignModalOpen(false);
                loadData();
              }}
              className="bg-[#02a4bf] hover:bg-[#018a9f] text-white h-12"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add to Queue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}