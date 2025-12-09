import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Search,
  Sparkles,
  Mail,
  CheckCircle2,
  MessageCircle,
  Clock,
  ChevronRight,
  MoreVertical,
  Eye,
  Edit,
  Copy,
  Trash2,
  Send,
  AlertCircle,
  TrendingUp,
  Users,
  ExternalLink
} from 'lucide-react';
import { callEccoAPI } from '../../lib/eccoAPI';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  tenant_id: string;
  lead_id: string;
  message_type: 'initial_pitch' | 'follow_up' | 'booking_confirmation' | 'thank_you' | 'custom';
  subject: string;
  message_body: string;
  status: 'draft' | 'ready' | 'sent' | 'bounced' | 'opened' | 'clicked' | 'replied';
  recipient_email: string;
  recipient_name: string;
  sent_at: string | null;
  opened_at: string | null;
  replied_at: string | null;
  response_received: boolean;
  response_sentiment: string | null;
  response_content: string | null;
  notes: string | null;
  personalization_context: {
    podcast_name: string;
    host_name: string;
    episode_reference: string | null;
  };
  created_at: string;
  updated_at: string;
}

interface Campaign {
  id: string;
  name: string;
}

interface MessageDetailModalProps {
  message: Message | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
  onDelete: (messageId: string) => void;
  onSend: (message: Message) => void;
}

function MessageDetailModal({ message, isOpen, onClose, onUpdate, onDelete, onSend }: MessageDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    recipient_email: '',
    recipient_name: '',
    subject: '',
    message_body: '',
    status: 'draft' as 'draft' | 'ready'
  });
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    if (message) {
      setFormData({
        recipient_email: message.recipient_email,
        recipient_name: message.recipient_name,
        subject: message.subject,
        message_body: message.message_body,
        status: message.status === 'ready' || message.status === 'draft' ? message.status : 'draft'
      });
      setIsEditing(message.status === 'draft' || message.status === 'ready');
    }
  }, [message]);

  if (!message) return null;

  const canEdit = message.status === 'draft' || message.status === 'ready';

  const handleSave = async () => {
    try {
      await callEccoAPI(`/api/podcasts/messages/${message.id}`, 'PATCH', formData);
      toast.success('Message updated successfully');
      onUpdate();
      onClose();
    } catch (error) {
      toast.error('Failed to update message');
    }
  };

  const handleSaveAndSend = async () => {
    try {
      // First save changes
      await callEccoAPI(`/api/podcasts/messages/${message.id}`, 'PATCH', {
        ...formData,
        status: 'ready'
      });
      
      // Then send
      const updatedMessage = { ...message, ...formData, status: 'ready' as const };
      onSend(updatedMessage);
      onClose();
    } catch (error) {
      toast.error('Failed to save and send message');
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await callEccoAPI(`/api/podcasts/messages/${message.id}`, 'DELETE');
        toast.success('Message deleted');
        onDelete(message.id);
        onClose();
      } catch (error) {
        toast.error('Failed to delete message');
      }
    }
  };

  const handleCopy = () => {
    const text = `Subject: ${formData.subject}\n\nTo: ${formData.recipient_email}\n\n${formData.message_body}`;
    navigator.clipboard.writeText(text);
    toast.success('Message copied to clipboard');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto p-0">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#02a4bf] to-[#018a9f] px-8 py-6 rounded-t-lg">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">
              {isEditing ? 'Edit Message' : 'View Message'}
            </DialogTitle>
            <DialogDescription className="text-white/80 text-base mt-2">
              {message.personalization_context.podcast_name}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="px-8 py-6 space-y-6">
          {/* Section 1: Recipient */}
          <div>
            <h3 className="text-lg mb-4 text-[#005260]">Send To</h3>
            <div className="space-y-4">
              <div>
                <Label>Recipient Email</Label>
                <Input
                  type="email"
                  value={formData.recipient_email}
                  onChange={(e) => setFormData({ ...formData, recipient_email: e.target.value })}
                  disabled={!canEdit}
                />
              </div>
              <div>
                <Label>Recipient Name</Label>
                <Input
                  value={formData.recipient_name}
                  onChange={(e) => setFormData({ ...formData, recipient_name: e.target.value })}
                  disabled={!canEdit}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Section 2: Subject Line */}
          <div>
            <h3 className="text-lg mb-4 text-[#005260]">Subject Line</h3>
            <Input
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              disabled={!canEdit}
              maxLength={200}
              placeholder="Enter subject line..."
            />
            <p className="text-xs text-[#9ca3af] mt-1 text-right">
              {formData.subject.length} / 200 characters
            </p>
          </div>

          <Separator />

          {/* Section 3: Message Body */}
          <div>
            <h3 className="text-lg mb-4 text-[#005260]">Message</h3>
            <Textarea
              rows={12}
              value={formData.message_body}
              onChange={(e) => setFormData({ ...formData, message_body: e.target.value })}
              disabled={!canEdit}
              maxLength={5000}
              placeholder="Enter your message..."
              className="font-mono text-sm"
            />
            <p className="text-xs text-[#9ca3af] mt-1 text-right">
              {formData.message_body.length} / 5000 characters
            </p>
          </div>

          {/* Personalization Tips */}
          {canEdit && (
            <div className="bg-[#E6F7F9] rounded-lg p-4">
              <button
                onClick={() => setShowTips(!showTips)}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  <span className="text-sm text-[#005260]">Personalization Tips</span>
                </div>
                <ChevronRight className={`w-4 h-4 text-[#005260] transition-transform ${showTips ? 'rotate-90' : ''}`} />
              </button>
              {showTips && (
                <ul className="mt-3 space-y-2 text-sm text-[#6B7280]">
                  <li>• Mention specific episodes you enjoyed</li>
                  <li>• Reference recent topics they covered</li>
                  <li>• Be authentic and specific about your expertise</li>
                  <li>• Keep it concise (150-200 words is ideal)</li>
                </ul>
              )}
            </div>
          )}

          <Separator />

          {/* Section 4: Status */}
          {canEdit && (
            <div>
              <h3 className="text-lg mb-4 text-[#005260]">Message Status</h3>
              <Select 
                value={formData.status}
                onValueChange={(value: 'draft' | 'ready') => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="ready">Ready to Send</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-[#6B7280] mt-2">
                Set to 'Ready' when you're satisfied with the message
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-8 py-5 flex items-center justify-between bg-[#f5f7fa]">
          <div className="flex gap-3">
            {canEdit && (
              <Button
                variant="ghost"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleCopy}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {canEdit && (
              <>
                <Button 
                  className="bg-[#02a4bf] hover:bg-[#018a9f]"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
                <Button 
                  className="bg-[#e84e1c] hover:bg-[#d43d0f]"
                  onClick={handleSaveAndSend}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Save & Send
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface FollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalMessage: Message | null;
  onGenerate: () => void;
}

function FollowUpModal({ isOpen, onClose, originalMessage, onGenerate }: FollowUpModalProps) {
  const [followUpAngle, setFollowUpAngle] = useState('gentle_reminder');
  const [additionalContext, setAdditionalContext] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFollowUp, setGeneratedFollowUp] = useState<any>(null);

  if (!originalMessage) return null;

  const daysSinceSent = originalMessage.sent_at 
    ? Math.floor((Date.now() - new Date(originalMessage.sent_at).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await callEccoAPI('/api/podcasts/outreach/follow-up/generate', 'POST', {
        original_message_id: originalMessage.id,
        days_since_sent: daysSinceSent,
        follow_up_angle: followUpAngle,
        additional_context: additionalContext
      });
      
      setGeneratedFollowUp(result);
      toast.success('Follow-up generated successfully!');
    } catch (error) {
      toast.error('Failed to generate follow-up');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveAsDraft = () => {
    toast.success('Follow-up saved as draft');
    onGenerate();
    handleReset();
  };

  const handleReset = () => {
    setFollowUpAngle('gentle_reminder');
    setAdditionalContext('');
    setGeneratedFollowUp(null);
    setIsGenerating(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleReset}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#005260]">Generate Follow-up Email</DialogTitle>
          <DialogDescription>
            AI will create a contextual follow-up based on your original pitch
          </DialogDescription>
        </DialogHeader>

        {!generatedFollowUp ? (
          <div className="space-y-6 py-4">
            {/* Days Since Original */}
            <div>
              <Label>Days since original pitch was sent</Label>
              <div className="mt-2 p-3 bg-[#f5f7fa] rounded-lg">
                <p className="text-sm text-[#005260]">
                  Sent {daysSinceSent} days ago on{' '}
                  {new Date(originalMessage.sent_at || '').toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Follow-up Strategy */}
            <div>
              <Label>Follow-up Approach *</Label>
              <RadioGroup value={followUpAngle} onValueChange={setFollowUpAngle} className="mt-3 space-y-4">
                <div className="flex items-start space-x-3 p-4 border rounded-lg hover:border-[#02a4bf] cursor-pointer">
                  <RadioGroupItem value="gentle_reminder" id="gentle" />
                  <div className="flex-1">
                    <Label htmlFor="gentle" className="cursor-pointer">
                      <div className="text-sm text-[#005260]">Gentle Reminder (Recommended for 5-10 days)</div>
                      <div className="text-xs text-[#6B7280] mt-1">
                        Brief, friendly check-in (2-3 sentences)
                      </div>
                      <div className="text-xs text-[#9ca3af] mt-1">
                        Best for: Early follow-up, respects recipient's time
                      </div>
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border rounded-lg hover:border-[#02a4bf] cursor-pointer">
                  <RadioGroupItem value="value_add" id="value" />
                  <div className="flex-1">
                    <Label htmlFor="value" className="cursor-pointer">
                      <div className="text-sm text-[#005260]">Value Add (Recommended for 11-21 days)</div>
                      <div className="text-xs text-[#6B7280] mt-1">
                        Share a relevant article or insight
                      </div>
                      <div className="text-xs text-[#9ca3af] mt-1">
                        Best for: Mid-timeline, shows continued interest
                      </div>
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border rounded-lg hover:border-[#02a4bf] cursor-pointer">
                  <RadioGroupItem value="new_angle" id="new" />
                  <div className="flex-1">
                    <Label htmlFor="new" className="cursor-pointer">
                      <div className="text-sm text-[#005260]">New Angle (Recommended for 21+ days)</div>
                      <div className="text-xs text-[#6B7280] mt-1">
                        Introduce a new topic not in original
                      </div>
                      <div className="text-xs text-[#9ca3af] mt-1">
                        Best for: Final attempt, different value proposition
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Additional Context */}
            <div>
              <Label>Additional Notes (Optional)</Label>
              <Textarea
                rows={3}
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                placeholder="Any new developments or context to mention?"
                maxLength={500}
                className="mt-2"
              />
              <p className="text-xs text-[#9ca3af] mt-1 text-right">
                {additionalContext.length} / 500
              </p>
            </div>

            {isGenerating && (
              <div className="flex items-center justify-center py-4">
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 border-4 border-[#02a4bf] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-sm text-[#6B7280]">AI is crafting your follow-up...</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-700 mb-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm">Follow-up generated successfully!</span>
              </div>
            </div>

            <div>
              <Label>Subject</Label>
              <div className="mt-2 p-3 bg-[#f5f7fa] rounded-lg">
                <p className="text-sm text-[#005260]">{generatedFollowUp.subject}</p>
              </div>
            </div>

            <div>
              <Label>Message Body</Label>
              <div className="mt-2 p-4 bg-[#f5f7fa] rounded-lg">
                <p className="text-sm text-[#005260] whitespace-pre-wrap">{generatedFollowUp.message_body}</p>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          {!generatedFollowUp ? (
            <>
              <Button variant="outline" onClick={handleReset}>
                Cancel
              </Button>
              <Button 
                className="bg-[#e84e1c] hover:bg-[#d43d0f]"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Follow-up
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setGeneratedFollowUp(null)}>
                Regenerate
              </Button>
              <Button variant="outline" onClick={handleSaveAsDraft}>
                Save as Draft
              </Button>
              <Button 
                className="bg-[#02a4bf] hover:bg-[#018a9f]"
                onClick={() => {
                  toast.info('Edit & Send feature coming soon');
                  handleReset();
                }}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit & Send
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function PodcastOutreachPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'draft' | 'ready' | 'sent' | 'replied'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<string>('all');
  const [selectedMessageType, setSelectedMessageType] = useState<string>('all');
  const [sortBy, setSortBy] = useState('newest');
  const [detailModalMessage, setDetailModalMessage] = useState<Message | null>(null);
  const [followUpModalMessage, setFollowUpModalMessage] = useState<Message | null>(null);
  const [sendConfirmMessage, setSendConfirmMessage] = useState<Message | null>(null);

  useEffect(() => {
    loadData();
  }, [activeTab, selectedCampaign, selectedMessageType]);

  useEffect(() => {
    filterAndSortMessages();
  }, [messages, searchQuery, sortBy]);

  const loadData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeTab === 'replied') {
        params.append('response_received', 'true');
      } else if (activeTab !== 'all') {
        params.append('status', activeTab);
      }
      if (selectedCampaign !== 'all') params.append('campaign_id', selectedCampaign);
      if (selectedMessageType !== 'all') params.append('message_type', selectedMessageType);
      params.append('limit', '100');

      const queryString = params.toString();
      const endpoint = `/api/podcasts/messages${queryString ? `?${queryString}` : ''}`;

      const [messagesData, campaignsData] = await Promise.all([
        callEccoAPI(endpoint, 'GET'),
        callEccoAPI('/api/podcasts/campaigns', 'GET')
      ]);

      setMessages(Array.isArray(messagesData) ? messagesData : []);
      setCampaigns(campaignsData.campaigns || []);
    } catch (error) {
      toast.error('Failed to load messages');
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortMessages = () => {
    let filtered = [...messages];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(msg =>
        msg.subject.toLowerCase().includes(query) ||
        msg.personalization_context.podcast_name.toLowerCase().includes(query) ||
        msg.personalization_context.host_name.toLowerCase().includes(query) ||
        msg.recipient_email.toLowerCase().includes(query)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'alphabetical':
          return a.personalization_context.podcast_name.localeCompare(b.personalization_context.podcast_name);
        default:
          return 0;
      }
    });

    setFilteredMessages(filtered);
  };

  const getStats = () => {
    const total = messages.length;
    const draft = messages.filter(m => m.status === 'draft').length;
    const ready = messages.filter(m => m.status === 'ready').length;
    const sent = messages.filter(m => m.status === 'sent').length;
    const replied = messages.filter(m => m.response_received).length;
    const responseRate = sent > 0 ? Math.round((replied / sent) * 100) : 0;

    const now = new Date();
    const followUpsNeeded = messages.filter(m => {
      if (m.status !== 'sent' || m.response_received || !m.sent_at) return false;
      const daysSince = (now.getTime() - new Date(m.sent_at).getTime()) / (1000 * 60 * 60 * 24);
      return daysSince >= 7;
    }).length;

    return { total, draft, ready, sent, replied, responseRate, followUpsNeeded };
  };

  const stats = getStats();

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      draft: { label: 'DRAFT', className: 'bg-blue-500 text-white' },
      ready: { label: 'READY', className: 'bg-green-500 text-white' },
      sent: { label: 'SENT', className: 'bg-purple-500 text-white' },
      replied: { label: 'REPLIED', className: 'bg-[#e84e1c] text-white' }
    };
    return statusMap[status] || statusMap.draft;
  };

  const getMessageTypeBadge = (type: string) => {
    const typeMap: Record<string, string> = {
      initial_pitch: 'INITIAL PITCH',
      follow_up: 'FOLLOW-UP',
      booking_confirmation: 'BOOKING CONFIRMATION',
      thank_you: 'THANK YOU',
      custom: 'CUSTOM'
    };
    return typeMap[type] || type.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatRelativeTime = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const handleSendMessage = async (message: Message) => {
    try {
      // Step 1: Generate mailto link
      const mailtoData = await callEccoAPI(`/api/podcasts/messages/${message.id}/send`, 'POST');
      
      // Step 2: Open email client
      window.open(mailtoData.mailto_url);
      
      // Step 3: Show confirmation dialog
      setSendConfirmMessage(message);
    } catch (error) {
      toast.error('Failed to generate email');
    }
  };

  const handleConfirmSent = async () => {
    if (!sendConfirmMessage) return;
    
    try {
      await callEccoAPI(`/api/podcasts/messages/${sendConfirmMessage.id}/sent`, 'PATCH');
      toast.success('✓ Message marked as sent');
      setSendConfirmMessage(null);
      loadData();
    } catch (error) {
      toast.error('Failed to mark message as sent');
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter(m => m.id !== messageId));
    setFilteredMessages(filteredMessages.filter(m => m.id !== messageId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7fa]">
        <div className="max-w-[1440px] mx-auto px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#02a4bf] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#6B7280]">Loading outreach messages...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-6">
          <span>Dashboard</span>
          <ChevronRight className="w-4 h-4" />
          <span>Podcasts</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#005260]">Outreach</span>
        </div>

        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}>Outreach Messages</h1>
            <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans' }}>Manage pitch emails and track responses</p>
          </div>
          <Button
            className="bg-[#02a4bf] hover:bg-[#018a9f] text-white h-12"
            onClick={() => toast.info('Navigate to Leads page feature coming soon')}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Pitches
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#E6F7F9] rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#02a4bf]" />
              </div>
            </div>
            <div className="text-[#02a4bf] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', lineHeight: '1' }}>{stats.total}</div>
            <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Total Messages</div>
            <div className="text-[#9ca3af] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
              {stats.draft} draft, {stats.sent} sent
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-green-600 mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', lineHeight: '1' }}>{stats.ready}</div>
            <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Ready to Send</div>
            <div className="text-green-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>Review and send</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-purple-600 mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', lineHeight: '1' }}>{stats.replied}</div>
            <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Responses</div>
            <div className="text-[#9ca3af] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
              {stats.responseRate}% response rate
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#e84e1c]" />
              </div>
            </div>
            <div className="text-[#e84e1c] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', lineHeight: '1' }}>{stats.followUpsNeeded}</div>
            <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Need Follow-up</div>
            <div className="text-[#e84e1c] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>7+ days old</div>
          </div>
        </div>

        {/* Tabs & Filters */}
        <div className="bg-white rounded-t-2xl shadow-sm">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-4 text-sm transition-colors ${
                activeTab === 'all'
                  ? 'border-b-3 border-[#02a4bf] bg-[#02a4bf] text-white'
                  : 'text-[#6B7280] hover:text-[#005260]'
              }`}
            >
              All Messages ({stats.total})
            </button>
            <button
              onClick={() => setActiveTab('draft')}
              className={`px-6 py-4 text-sm transition-colors ${
                activeTab === 'draft'
                  ? 'border-b-3 border-[#02a4bf] bg-[#02a4bf] text-white'
                  : 'text-[#6B7280] hover:text-[#005260]'
              }`}
            >
              Draft ({stats.draft})
            </button>
            <button
              onClick={() => setActiveTab('ready')}
              className={`px-6 py-4 text-sm transition-colors ${
                activeTab === 'ready'
                  ? 'border-b-3 border-[#02a4bf] bg-[#02a4bf] text-white'
                  : 'text-[#6B7280] hover:text-[#005260]'
              }`}
            >
              Ready ({stats.ready})
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`px-6 py-4 text-sm transition-colors ${
                activeTab === 'sent'
                  ? 'border-b-3 border-[#02a4bf] bg-[#02a4bf] text-white'
                  : 'text-[#6B7280] hover:text-[#005260]'
              }`}
            >
              Sent ({stats.sent})
            </button>
            <button
              onClick={() => setActiveTab('replied')}
              className={`px-6 py-4 text-sm transition-colors ${
                activeTab === 'replied'
                  ? 'border-b-3 border-[#02a4bf] bg-[#02a4bf] text-white'
                  : 'text-[#6B7280] hover:text-[#005260]'
              }`}
            >
              Replied ({stats.replied})
            </button>
          </div>

          {/* Filter Bar */}
          <div className="p-5 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
              <Input
                type="text"
                placeholder="Search by podcast, host, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            <div className="flex gap-3">
              <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Campaign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  {campaigns.map(campaign => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedMessageType} onValueChange={setSelectedMessageType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Message Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="initial_pitch">Initial Pitch</SelectItem>
                  <SelectItem value="follow_up">Follow-up</SelectItem>
                  <SelectItem value="booking_confirmation">Booking Confirmation</SelectItem>
                  <SelectItem value="thank_you">Thank You</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="alphabetical">A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Messages List */}
        {filteredMessages.length === 0 ? (
          <div className="bg-white rounded-b-2xl p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-[#f5f7fa] rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-10 h-10 text-[#9ca3af]" />
            </div>
            <h3 className="text-xl text-[#005260] mb-2">No Outreach Messages Yet</h3>
            <p className="text-[#6B7280] mb-6">
              {searchQuery || selectedCampaign !== 'all'
                ? 'No messages match your filters.'
                : 'Generate pitches from your podcast leads to get started'
              }
            </p>
            {!searchQuery && selectedCampaign === 'all' && (
              <Button className="bg-[#02a4bf] hover:bg-[#018a9f]">
                Go to Leads
              </Button>
            )}
          </div>
        ) : (
          <div className="bg-[#f5f7fa] pb-8 space-y-4">
            {filteredMessages.map((message) => {
              const statusBadge = getStatusBadge(message.status);
              const daysSinceSent = message.sent_at
                ? Math.floor((Date.now() - new Date(message.sent_at).getTime()) / (1000 * 60 * 60 * 24))
                : 0;
              const needsFollowUp = message.status === 'sent' && !message.response_received && daysSinceSent >= 7;

              return (
                <div
                  key={message.id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:bg-[#F0F9FA] transition-colors cursor-pointer"
                  onClick={() => setDetailModalMessage(message)}
                >
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={`${statusBadge.className} text-xs px-3 py-1`}>
                      {statusBadge.label}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <button className="text-[#9ca3af] hover:text-[#005260]">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          setDetailModalMessage(message);
                        }}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Full Message
                        </DropdownMenuItem>
                        {(message.status === 'draft' || message.status === 'ready') && (
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            setDetailModalMessage(message);
                          }}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Message
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(message.message_body);
                          toast.success('Message copied to clipboard');
                        }}>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy to Clipboard
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {message.status === 'sent' && !message.response_received && (
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            setFollowUpModalMessage(message);
                          }}>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate Follow-up
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMessage(message.id);
                            toast.success('Message deleted');
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Message
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Podcast & Host Info */}
                  <h3 className="text-[#005260] text-lg mb-1">
                    {message.personalization_context.podcast_name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-2">
                    <Users className="w-4 h-4" />
                    <span>To: {message.recipient_email}</span>
                  </div>

                  {/* Message Type Badge */}
                  <Badge variant="secondary" className="text-xs mb-4">
                    {getMessageTypeBadge(message.message_type)}
                  </Badge>

                  <Separator className="my-4" />

                  {/* Subject Line */}
                  <div className="mb-2">
                    <p className="text-[#1f2937]">{message.subject}</p>
                  </div>

                  {/* Message Preview */}
                  <div className="mb-3">
                    <p className="text-sm text-[#6B7280] line-clamp-2">
                      {message.message_body.substring(0, 150)}...
                    </p>
                    <button 
                      className="text-sm text-[#02a4bf] hover:underline mt-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDetailModalMessage(message);
                      }}
                    >
                      View Full Message
                    </button>
                  </div>

                  {/* Timestamps */}
                  <div className="flex gap-4 text-xs text-[#9ca3af] mb-3">
                    <span>Created: {formatDate(message.created_at)}</span>
                    {message.sent_at && (
                      <span>Sent: {formatDate(message.sent_at)}</span>
                    )}
                    {message.replied_at && (
                      <span className="text-green-600">
                        Replied: {formatDate(message.replied_at)}
                      </span>
                    )}
                  </div>

                  {/* Response Indicator */}
                  {message.response_received && (
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-700">
                          Host responded - {message.response_sentiment || 'Positive'} sentiment
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Follow-up Needed Indicator */}
                  {needsFollowUp && (
                    <div className="bg-orange-50 border-2 border-[#e84e1c] rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#e84e1c]" />
                        <span className="text-sm text-[#e84e1c]">
                          Sent {daysSinceSent} days ago - Consider sending follow-up
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {message.status === 'draft' && (
                      <>
                        <Button
                          variant="outline"
                          className="flex-1 border-[#02a4bf] text-[#02a4bf] hover:bg-[#E6F7F9]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDetailModalMessage(message);
                          }}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Message
                        </Button>
                        <Button
                          className="flex-1 bg-[#02a4bf] hover:bg-[#018a9f]"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSendMessage(message);
                          }}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send Now
                        </Button>
                      </>
                    )}
                    {message.status === 'ready' && (
                      <>
                        <Button
                          variant="outline"
                          className="flex-1 border-[#02a4bf] text-[#02a4bf]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDetailModalMessage(message);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          className="flex-1 bg-[#02a4bf] hover:bg-[#018a9f]"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSendMessage(message);
                          }}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send Now
                        </Button>
                      </>
                    )}
                    {message.status === 'sent' && !message.response_received && (
                      <>
                        <Button
                          className="flex-1 bg-[#e84e1c] hover:bg-[#d43d0f]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFollowUpModalMessage(message);
                          }}
                        >
                          Send Follow-up
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-green-500 text-green-600 hover:bg-green-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.info('Mark as Replied feature coming soon');
                          }}
                        >
                          Mark as Replied
                        </Button>
                      </>
                    )}
                    {message.response_received && (
                      <>
                        <Button
                          className="flex-1 bg-purple-600 hover:bg-purple-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.info('View Response feature coming soon');
                          }}
                        >
                          View Response
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.info('View Lead feature coming soon');
                          }}
                        >
                          View Lead
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modals */}
        <MessageDetailModal
          message={detailModalMessage}
          isOpen={!!detailModalMessage}
          onClose={() => setDetailModalMessage(null)}
          onUpdate={loadData}
          onDelete={handleDeleteMessage}
          onSend={handleSendMessage}
        />

        <FollowUpModal
          isOpen={!!followUpModalMessage}
          onClose={() => setFollowUpModalMessage(null)}
          originalMessage={followUpModalMessage}
          onGenerate={loadData}
        />

        {/* Send Confirmation Dialog */}
        <Dialog open={!!sendConfirmMessage} onOpenChange={() => setSendConfirmMessage(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Did you send the email?</DialogTitle>
              <DialogDescription>
                Please confirm after you've sent the email from your email client
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-[#6B7280]">
                We opened your email client with the pre-filled message. Once you've sent it, please confirm below.
              </p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSendConfirmMessage(null)}
              >
                Not Yet
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleConfirmSent}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Yes, I Sent It
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
