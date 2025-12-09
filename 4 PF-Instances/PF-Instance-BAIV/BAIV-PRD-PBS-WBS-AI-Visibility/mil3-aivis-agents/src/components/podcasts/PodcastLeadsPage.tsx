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
import { Progress } from '../ui/progress';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  Search,
  Download,
  Sparkles,
  Mic,
  Target,
  Mail,
  BarChart3,
  ChevronDown,
  X,
  MoreVertical,
  ExternalLink,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Globe,
  Users,
  Calendar,
  TrendingUp,
  Filter
} from 'lucide-react';
import { callEccoAPI } from '../../lib/eccoAPI';
import { toast } from 'sonner@2.0.3';

interface PodcastLead {
  id: string;
  campaign_id: string;
  podcast_name: string;
  podcast_description: string;
  podcast_website: string;
  apple_podcasts_url: string;
  spotify_url: string;
  listen_notes_url: string;
  listen_notes_id: string;
  category: string;
  language: string;
  total_episodes: number;
  latest_episode_date: string;
  estimated_audience_size: 'small' | 'medium' | 'large' | 'very_large';
  relevance_score: number;
  relevance_reasoning: {
    relevance_score: number;
    opportunity_score: number;
    icp_alignment_score: number;
    reasoning: string;
    key_topics: string[];
    audience_fit: string;
    recommended_pitch_angle: string;
  };
  opportunity_score: number;
  icp_alignment_score: number;
  host_name: string;
  host_email: string;
  host_linkedin: string;
  outreach_status: 'new' | 'researching' | 'ready_to_pitch' | 'contacted' | 'pitched' | 'follow_up_sent' | 'responded' | 'booked' | 'appeared' | 'rejected';
  priority_level: 'low' | 'medium' | 'high' | 'critical';
  notes: string;
  created_at: string;
  updated_at: string;
}

interface Campaign {
  id: string;
  name: string;
}

interface LeadDetailModalProps {
  lead: PodcastLead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (leadId: string) => void;
  onDelete: (leadId: string) => void;
  onGeneratePitch: (lead: PodcastLead) => void;
}

function LeadDetailModal({ lead, isOpen, onClose, onUpdate, onDelete, onGeneratePitch }: LeadDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    host_name: '',
    host_email: '',
    host_linkedin: '',
    booking_contact_email: '',
    booking_instructions: '',
    notes: '',
    priority_level: 'medium' as 'low' | 'medium' | 'high' | 'critical'
  });
  const [showFullReasoning, setShowFullReasoning] = useState(false);

  useEffect(() => {
    if (lead) {
      setFormData({
        host_name: lead.host_name || '',
        host_email: lead.host_email || '',
        host_linkedin: lead.host_linkedin || '',
        booking_contact_email: '',
        booking_instructions: '',
        notes: lead.notes || '',
        priority_level: lead.priority_level
      });
    }
  }, [lead]);

  if (!lead) return null;

  const handleSave = async () => {
    try {
      await callEccoAPI(`/api/podcasts/leads/${lead.id}`, 'PATCH', formData);
      toast.success('Lead updated successfully');
      setIsEditing(false);
      onUpdate(lead.id);
    } catch (error) {
      toast.error('Failed to update lead');
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      await callEccoAPI(`/api/podcasts/leads/${lead.id}/status`, 'PATCH', {
        outreach_status: newStatus
      });
      toast.success('Status updated');
      onUpdate(lead.id);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this lead?')) {
      try {
        await callEccoAPI(`/api/podcasts/leads/${lead.id}`, 'DELETE');
        toast.success('Lead deleted');
        onDelete(lead.id);
        onClose();
      } catch (error) {
        toast.error('Failed to delete lead');
      }
    }
  };

  const formatDate = (dateString: string) => {
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

  const getScoreColor = (score: number) => {
    if (score >= 8.0) return 'text-[#10b981]';
    if (score >= 6.0) return 'text-[#02a4bf]';
    if (score >= 4.0) return 'text-[#fbbf24]';
    return 'text-[#9ca3af]';
  };

  const getAudienceLabel = (size: string) => {
    const labels = {
      small: 'Small (<1K)',
      medium: 'Medium (1K-10K)',
      large: 'Large (10K-50K)',
      very_large: 'Very Large (>50K)'
    };
    return labels[size as keyof typeof labels] || size;
  };

  const statusOptions = [
    'new', 'researching', 'ready_to_pitch', 'contacted', 'pitched', 
    'follow_up_sent', 'responded', 'booked', 'appeared', 'rejected'
  ];

  const statusSteps = [
    { key: 'new', label: 'New', icon: AlertCircle },
    { key: 'researching', label: 'Researching', icon: Search },
    { key: 'pitched', label: 'Pitched', icon: Mail },
    { key: 'responded', label: 'Responded', icon: CheckCircle2 },
    { key: 'booked', label: 'Booked', icon: Calendar }
  ];

  const currentStepIndex = statusSteps.findIndex(s => s.key === lead.outreach_status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[900px] max-h-[90vh] overflow-y-auto p-0">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#02a4bf] to-[#018a9f] px-8 py-6 rounded-t-lg">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">{lead.podcast_name}</DialogTitle>
            <DialogDescription className="text-white/80 text-base mt-2">
              {lead.host_name}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="px-8 py-6 space-y-8">
          {/* Podcast Details */}
          <div>
            <h3 className="text-lg mb-4 text-[#005260]">Podcast Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-[#6B7280]">Website</Label>
                  <a 
                    href={lead.podcast_website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#02a4bf] hover:underline mt-1"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">{lead.podcast_website}</span>
                  </a>
                </div>
                <div>
                  <Label className="text-sm text-[#6B7280]">Apple Podcasts</Label>
                  <a 
                    href={lead.apple_podcasts_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#02a4bf] hover:underline mt-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">View on Apple Podcasts</span>
                  </a>
                </div>
                <div>
                  <Label className="text-sm text-[#6B7280]">Spotify</Label>
                  <a 
                    href={lead.spotify_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#02a4bf] hover:underline mt-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">View on Spotify</span>
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-[#6B7280]">Category</Label>
                  <p className="text-sm mt-1">{lead.category}</p>
                </div>
                <div>
                  <Label className="text-sm text-[#6B7280]">Total Episodes</Label>
                  <p className="text-sm mt-1">{lead.total_episodes} episodes</p>
                </div>
                <div>
                  <Label className="text-sm text-[#6B7280]">Audience Size</Label>
                  <p className="text-sm mt-1">{getAudienceLabel(lead.estimated_audience_size)}</p>
                </div>
                <div>
                  <Label className="text-sm text-[#6B7280]">Latest Episode</Label>
                  <p className="text-sm mt-1">{formatDate(lead.latest_episode_date)}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <Label className="text-sm text-[#6B7280] mb-2 block">About This Podcast</Label>
            <p className="text-sm leading-relaxed">{lead.podcast_description}</p>
          </div>

          <Separator />

          {/* AI Scoring */}
          <div>
            <h3 className="text-lg mb-4 text-[#005260]">AI Scoring & Analysis</h3>
            <div className="grid grid-cols-3 gap-4">
              {/* Relevance Score */}
              <div className="border-2 border-[#02a4bf] bg-[#E6F7F9] rounded-xl p-5 text-center">
                <div className="w-20 h-20 mx-auto rounded-full border-4 border-[#02a4bf] flex items-center justify-center mb-2">
                  <span className={`text-2xl ${getScoreColor(lead.relevance_score)}`}>
                    {lead.relevance_score.toFixed(1)}
                  </span>
                </div>
                <p className="text-xs uppercase tracking-wide text-[#6B7280]">Relevance</p>
                <p className="text-xs text-[#6B7280] mt-2">Strong topic alignment with your expertise</p>
              </div>

              {/* ICP Alignment */}
              <div className="border-2 border-[#8b5cf6] bg-purple-50 rounded-xl p-5 text-center">
                <div className="w-20 h-20 mx-auto rounded-full border-4 border-[#8b5cf6] flex items-center justify-center mb-2">
                  <span className="text-2xl text-[#8b5cf6]">
                    {Math.round(lead.icp_alignment_score)}%
                  </span>
                </div>
                <p className="text-xs uppercase tracking-wide text-[#6B7280]">ICP Fit</p>
                <p className="text-xs text-[#6B7280] mt-2">
                  {lead.relevance_reasoning.audience_fit}
                </p>
              </div>

              {/* Opportunity Score */}
              <div className="border-2 border-[#e84e1c] bg-orange-50 rounded-xl p-5 text-center">
                <div className="w-20 h-20 mx-auto rounded-full border-4 border-[#e84e1c] flex items-center justify-center mb-2">
                  <span className={`text-2xl ${getScoreColor(lead.opportunity_score)}`}>
                    {lead.opportunity_score.toFixed(1)}
                  </span>
                </div>
                <p className="text-xs uppercase tracking-wide text-[#6B7280]">Opportunity</p>
                <p className="text-xs text-[#6B7280] mt-2">High engagement potential</p>
              </div>
            </div>

            {/* AI Reasoning */}
            <div className="mt-4 p-4 bg-[#f5f7fa] rounded-lg">
              <button
                onClick={() => setShowFullReasoning(!showFullReasoning)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm text-[#005260]">View Full Analysis</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFullReasoning ? 'rotate-180' : ''}`} />
              </button>
              {showFullReasoning && (
                <div className="mt-3 space-y-3">
                  <p className="text-sm text-[#6B7280]">{lead.relevance_reasoning.reasoning}</p>
                  <div>
                    <Label className="text-xs text-[#6B7280] mb-2 block">Key Topics</Label>
                    <div className="flex flex-wrap gap-2">
                      {lead.relevance_reasoning.key_topics.map((topic, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{topic}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#6B7280] mb-1 block">Recommended Pitch Angle</Label>
                    <p className="text-sm text-[#005260]">{lead.relevance_reasoning.recommended_pitch_angle}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div>
            <h3 className="text-lg mb-4 text-[#005260]">Contact Information</h3>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label>Host Name</Label>
                  <Input
                    value={formData.host_name}
                    onChange={(e) => setFormData({ ...formData, host_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Host Email</Label>
                  <Input
                    type="email"
                    value={formData.host_email}
                    onChange={(e) => setFormData({ ...formData, host_email: e.target.value })}
                  />
                </div>
                <div>
                  <Label>LinkedIn URL</Label>
                  <Input
                    value={formData.host_linkedin}
                    onChange={(e) => setFormData({ ...formData, host_linkedin: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Booking Contact Email (if different)</Label>
                  <Input
                    type="email"
                    value={formData.booking_contact_email}
                    onChange={(e) => setFormData({ ...formData, booking_contact_email: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Booking Instructions</Label>
                  <Textarea
                    rows={3}
                    value={formData.booking_instructions}
                    onChange={(e) => setFormData({ ...formData, booking_instructions: e.target.value })}
                    placeholder="Special instructions for booking this podcast..."
                  />
                </div>
                <Button onClick={handleSave} className="w-full bg-[#02a4bf] hover:bg-[#018a9f]">
                  Save Contact Info
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-3 flex-1">
                    <div>
                      <Label className="text-sm text-[#6B7280]">Host Name</Label>
                      <p className="text-sm mt-1">{lead.host_name}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-[#6B7280]">Host Email</Label>
                      <p className="text-sm mt-1">{lead.host_email}</p>
                    </div>
                    {lead.host_linkedin && (
                      <div>
                        <Label className="text-sm text-[#6B7280]">LinkedIn</Label>
                        <a 
                          href={lead.host_linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[#02a4bf] hover:underline mt-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm">View Profile</span>
                        </a>
                      </div>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Notes & Priority */}
          <div>
            <h3 className="text-lg mb-4 text-[#005260]">Notes & Priority</h3>
            <div className="space-y-4">
              <div>
                <Label>Notes</Label>
                <Textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add notes about this podcast lead..."
                />
              </div>
              <div>
                <Label>Priority Level</Label>
                <Select 
                  value={formData.priority_level}
                  onValueChange={(value: any) => setFormData({ ...formData, priority_level: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleSave}
                className="w-full bg-[#02a4bf] hover:bg-[#018a9f]"
              >
                Save Notes & Priority
              </Button>
            </div>
          </div>

          <Separator />

          {/* Outreach Status */}
          <div>
            <h3 className="text-lg mb-4 text-[#005260]">Outreach Status</h3>
            
            {/* Status Timeline */}
            <div className="flex items-center justify-between mb-6">
              {statusSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                
                return (
                  <div key={step.key} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isActive ? 'bg-[#02a4bf] text-white' : 'bg-gray-200 text-gray-400'
                      } ${isCurrent ? 'ring-4 ring-[#E6F7F9]' : ''}`}>
                        {isActive ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </div>
                      <span className={`text-xs mt-2 text-center ${isActive ? 'text-[#005260]' : 'text-gray-400'}`}>
                        {step.label}
                      </span>
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div className={`h-0.5 flex-1 mx-2 ${isActive ? 'bg-[#02a4bf]' : 'bg-gray-200'}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Status Dropdown */}
            <div>
              <Label>Change Status</Label>
              <Select 
                value={lead.outreach_status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-8 py-5 flex items-center justify-between bg-[#f5f7fa]">
          <Button
            variant="ghost"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Lead
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              className="bg-[#02a4bf] hover:bg-[#018a9f]"
              onClick={() => {
                onGeneratePitch(lead);
                onClose();
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Pitch
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface PitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLeads: PodcastLead[];
  isBulk: boolean;
}

function PitchModal({ isOpen, onClose, selectedLeads, isBulk }: PitchModalProps) {
  const [formData, setFormData] = useState({
    guest_bio: '',
    topics: [] as string[],
    unique_angle: '',
    tone: 'friendly',
    custom_context: ''
  });
  const [topicInput, setTopicInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedCount, setGeneratedCount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddTopic = () => {
    if (topicInput.trim() && formData.topics.length < 5) {
      setFormData({ ...formData, topics: [...formData.topics, topicInput.trim()] });
      setTopicInput('');
    }
  };

  const handleRemoveTopic = (index: number) => {
    setFormData({ ...formData, topics: formData.topics.filter((_, i) => i !== index) });
  };

  const handleGenerate = async () => {
    // Validation
    if (formData.guest_bio.length < 10 || formData.guest_bio.length > 1000) {
      toast.error('Guest bio must be 10-1000 characters');
      return;
    }
    if (formData.topics.length === 0 || formData.topics.length > 5) {
      toast.error('Add 1-5 topics');
      return;
    }
    if (formData.unique_angle.length < 10 || formData.unique_angle.length > 500) {
      toast.error('Unique angle must be 10-500 characters');
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setGeneratedCount(0);

    try {
      if (isBulk) {
        // Bulk generation
        const showIds = selectedLeads.map(lead => lead.id);
        
        // Simulate progress
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 90) return 90;
            return prev + 10;
          });
          setGeneratedCount(prev => {
            if (prev >= selectedLeads.length - 1) return prev;
            return prev + 1;
          });
        }, 1500);

        await callEccoAPI('/api/podcasts/outreach/generate', 'POST', {
          show_ids: showIds,
          guest_bio: formData.guest_bio,
          topics: formData.topics,
          unique_angle: formData.unique_angle,
          tone: formData.tone,
          custom_context: formData.custom_context
        });

        clearInterval(progressInterval);
        setProgress(100);
        setGeneratedCount(selectedLeads.length);
        
        toast.success(`Successfully generated ${selectedLeads.length} pitches!`);
        setIsSuccess(true);
      } else {
        // Single pitch
        await callEccoAPI(`/api/podcasts/leads/${selectedLeads[0].id}/pitch`, 'POST', {
          guest_bio: formData.guest_bio,
          custom_context: formData.custom_context
        });
        
        toast.success('Pitch generated successfully!');
        setIsSuccess(true);
      }
    } catch (error) {
      toast.error('Failed to generate pitch');
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    setFormData({
      guest_bio: '',
      topics: [],
      unique_angle: '',
      tone: 'friendly',
      custom_context: ''
    });
    setIsGenerating(false);
    setProgress(0);
    setGeneratedCount(0);
    setIsSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#005260]">
            {isBulk ? 'Generate Personalized Pitches' : 'Generate Single Pitch'}
          </DialogTitle>
          <DialogDescription>
            {isBulk 
              ? `Creating pitches for ${selectedLeads.length} selected podcasts`
              : `Creating pitch for ${selectedLeads[0]?.podcast_name}`
            }
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
            <h3 className="text-xl text-[#005260]">
              ✅ Successfully generated {isBulk ? `${selectedLeads.length} pitches` : 'pitch'}!
            </h3>
            <div className="flex gap-3 justify-center">
              <Button 
                variant="outline"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button 
                className="bg-[#02a4bf] hover:bg-[#018a9f]"
                onClick={() => toast.info('Outreach page navigation coming soon')}
              >
                View Outreach
              </Button>
            </div>
          </div>
        ) : isGenerating ? (
          <div className="py-8 space-y-4">
            <Progress value={progress} className="w-full" />
            <p className="text-center text-sm text-[#6B7280]">
              Generating pitch {generatedCount + 1} of {selectedLeads.length}...
            </p>
            <p className="text-center text-xs text-[#9ca3af]">
              Estimated time remaining: ~{Math.max(1, Math.ceil((selectedLeads.length - generatedCount) * 6 / 60))} minute(s)
            </p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {selectedLeads.map((lead, idx) => (
                <div key={lead.id} className="flex items-center gap-2 text-sm">
                  {idx < generatedCount ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : idx === generatedCount ? (
                    <Clock className="w-4 h-4 text-[#02a4bf] animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                  )}
                  <span className={idx <= generatedCount ? 'text-[#005260]' : 'text-gray-400'}>
                    {lead.podcast_name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-h-[60vh] overflow-y-auto py-4">
            {/* Guest Bio */}
            <div>
              <Label>Your Guest Bio *</Label>
              <p className="text-xs text-[#6B7280] mb-2">
                Describe your expertise, background, and what makes you a great guest
              </p>
              <Textarea
                rows={5}
                value={formData.guest_bio}
                onChange={(e) => setFormData({ ...formData, guest_bio: e.target.value })}
                placeholder="I'm a marketing director with 10 years of experience in B2B SaaS..."
                maxLength={1000}
              />
              <p className="text-xs text-right text-[#9ca3af] mt-1">
                {formData.guest_bio.length} / 1000
              </p>
            </div>

            {/* Topics */}
            <div>
              <Label>Key Topics *</Label>
              <p className="text-xs text-[#6B7280] mb-2">
                Add 1-5 topics you can speak about
              </p>
              <div className="flex gap-2">
                <Input
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTopic()}
                  placeholder="Type topic and press Enter"
                  disabled={formData.topics.length >= 5}
                />
                <Button 
                  type="button"
                  onClick={handleAddTopic}
                  disabled={formData.topics.length >= 5}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.topics.map((topic, idx) => (
                  <Badge key={idx} className="bg-[#E6F7F9] text-[#005260] hover:bg-[#d0f0f5]">
                    {topic}
                    <button
                      onClick={() => handleRemoveTopic(idx)}
                      className="ml-2 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-[#9ca3af] mt-1">
                {formData.topics.length} / 5 topics
              </p>
            </div>

            {/* Unique Angle */}
            <div>
              <Label>Your Unique Value *</Label>
              <p className="text-xs text-[#6B7280] mb-2">
                What makes your perspective unique?
              </p>
              <Textarea
                rows={3}
                value={formData.unique_angle}
                onChange={(e) => setFormData({ ...formData, unique_angle: e.target.value })}
                placeholder="Helped 50+ B2B companies 10x their organic traffic using AI-first strategies"
                maxLength={500}
              />
              <p className="text-xs text-right text-[#9ca3af] mt-1">
                {formData.unique_angle.length} / 500
              </p>
            </div>

            {/* Tone */}
            <div>
              <Label>Email Tone</Label>
              <RadioGroup 
                value={formData.tone}
                onValueChange={(value) => setFormData({ ...formData, tone: value })}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="professional" id="professional" />
                  <Label htmlFor="professional" className="cursor-pointer">Professional and Formal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friendly" id="friendly" />
                  <Label htmlFor="friendly" className="cursor-pointer">Friendly and Enthusiastic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="casual" id="casual" />
                  <Label htmlFor="casual" className="cursor-pointer">Casual and Conversational</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Custom Context */}
            <div>
              <Label>Personal Touch (Optional)</Label>
              <p className="text-xs text-[#6B7280] mb-2">
                Mention specific episodes or show details to increase response rates
              </p>
              <Textarea
                rows={3}
                value={formData.custom_context}
                onChange={(e) => setFormData({ ...formData, custom_context: e.target.value })}
                placeholder="I loved your recent episode #145 about AI in marketing..."
                maxLength={1000}
              />
            </div>
          </div>
        )}

        {!isSuccess && !isGenerating && (
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              className="bg-[#02a4bf] hover:bg-[#018a9f]"
              onClick={handleGenerate}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate {isBulk ? `${selectedLeads.length} Pitches` : 'Pitch'}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function PodcastLeadsPage() {
  const [leads, setLeads] = useState<PodcastLead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<PodcastLead[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [minScore, setMinScore] = useState<string>('any');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedAudience, setSelectedAudience] = useState<string>('any');
  const [sortBy, setSortBy] = useState('relevance');
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedLeadIds, setSelectedLeadIds] = useState<Set<string>>(new Set());
  const [detailModalLead, setDetailModalLead] = useState<PodcastLead | null>(null);
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
  const [pitchModalLeads, setPitchModalLeads] = useState<PodcastLead[]>([]);

  useEffect(() => {
    loadData();
  }, [selectedCampaign, selectedStatus, minScore, selectedPriority]);

  useEffect(() => {
    filterAndSortLeads();
  }, [leads, searchQuery, sortBy]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Build query params
      const params = new URLSearchParams();
      if (selectedCampaign !== 'all') params.append('campaign_id', selectedCampaign);
      if (selectedStatus !== 'all') params.append('outreach_status', selectedStatus);
      if (minScore !== 'any') params.append('min_relevance_score', minScore);
      if (selectedPriority !== 'all') params.append('priority_level', selectedPriority);
      params.append('limit', '100');

      const queryString = params.toString();
      const endpoint = `/api/podcasts/leads${queryString ? `?${queryString}` : ''}`;

      const [leadsData, campaignsData] = await Promise.all([
        callEccoAPI(endpoint, 'GET'),
        callEccoAPI('/api/podcasts/campaigns', 'GET')
      ]);

      setLeads(Array.isArray(leadsData) ? leadsData : []);
      setCampaigns(campaignsData.campaigns || []);
    } catch (error) {
      toast.error('Failed to load podcast leads');
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortLeads = () => {
    let filtered = [...leads];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(lead =>
        lead.podcast_name.toLowerCase().includes(query) ||
        lead.host_name.toLowerCase().includes(query) ||
        lead.podcast_description.toLowerCase().includes(query)
      );
    }

    // Audience size filter
    if (selectedAudience !== 'any') {
      filtered = filtered.filter(lead => lead.estimated_audience_size === selectedAudience);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          return b.relevance_score - a.relevance_score;
        case 'audience':
          const sizeOrder = { very_large: 4, large: 3, medium: 2, small: 1 };
          return (sizeOrder[b.estimated_audience_size] || 0) - (sizeOrder[a.estimated_audience_size] || 0);
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'alphabetical':
          return a.podcast_name.localeCompare(b.podcast_name);
        default:
          return 0;
      }
    });

    setFilteredLeads(filtered);
  };

  const getStats = () => {
    const total = leads.length;
    const highValue = leads.filter(l => l.relevance_score >= 8.0).length;
    const notContacted = leads.filter(l => 
      ['new', 'researching', 'ready_to_pitch'].includes(l.outreach_status)
    ).length;
    const pitched = leads.filter(l => l.outreach_status === 'pitched').length;
    const responded = leads.filter(l => l.outreach_status === 'responded').length;
    const responseRate = pitched > 0 ? Math.round((responded / pitched) * 100) : 0;

    return { total, highValue, notContacted, pitched, responded, responseRate };
  };

  const stats = getStats();

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      new: { label: 'NEW', className: 'bg-blue-500 text-white' },
      researching: { label: 'RESEARCHING', className: 'bg-purple-500 text-white' },
      ready_to_pitch: { label: 'READY', className: 'bg-teal-500 text-white' },
      contacted: { label: 'CONTACTED', className: 'bg-yellow-500 text-white' },
      pitched: { label: 'PITCHED', className: 'bg-[#e84e1c] text-white' },
      follow_up_sent: { label: 'FOLLOW-UP', className: 'bg-orange-500 text-white' },
      responded: { label: 'RESPONDED', className: 'bg-green-500 text-white' },
      booked: { label: 'BOOKED', className: 'bg-purple-600 text-white' },
      appeared: { label: 'APPEARED', className: 'bg-gray-700 text-white' },
      rejected: { label: 'REJECTED', className: 'bg-red-500 text-white' }
    };
    return statusMap[status] || statusMap.new;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityMap: Record<string, { label: string; className: string }> = {
      low: { label: 'LOW', className: 'bg-gray-500 text-white' },
      medium: { label: 'MEDIUM', className: 'bg-yellow-500 text-gray-900' },
      high: { label: 'HIGH', className: 'bg-[#e84e1c] text-white' },
      critical: { label: 'CRITICAL', className: 'bg-red-600 text-white' }
    };
    return priorityMap[priority] || priorityMap.medium;
  };

  const getAudienceLabel = (size: string) => {
    const labels = {
      small: 'Small (<1K)',
      medium: 'Medium (1K-10K)',
      large: 'Large (10K-50K)',
      very_large: 'Very Large (>50K)'
    };
    return labels[size as keyof typeof labels] || size;
  };

  const formatDate = (dateString: string) => {
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

  const getScoreColor = (score: number) => {
    if (score >= 8.0) return 'text-[#10b981] border-[#10b981]';
    if (score >= 6.0) return 'text-[#02a4bf] border-[#02a4bf]';
    if (score >= 4.0) return 'text-[#fbbf24] border-[#fbbf24]';
    return 'text-[#9ca3af] border-[#9ca3af]';
  };

  const toggleLeadSelection = (leadId: string) => {
    const newSelected = new Set(selectedLeadIds);
    if (newSelected.has(leadId)) {
      newSelected.delete(leadId);
    } else {
      newSelected.add(leadId);
    }
    setSelectedLeadIds(newSelected);
  };

  const selectAll = () => {
    setSelectedLeadIds(new Set(filteredLeads.map(l => l.id)));
  };

  const deselectAll = () => {
    setSelectedLeadIds(new Set());
  };

  const handleBulkStatusChange = async (newStatus: string) => {
    try {
      await Promise.all(
        Array.from(selectedLeadIds).map(leadId =>
          callEccoAPI(`/api/podcasts/leads/${leadId}/status`, 'PATCH', {
            outreach_status: newStatus
          })
        )
      );
      toast.success(`Updated ${selectedLeadIds.size} leads`);
      loadData();
      setSelectedLeadIds(new Set());
    } catch (error) {
      toast.error('Failed to update leads');
    }
  };

  const handleBulkPriorityChange = async (newPriority: string) => {
    try {
      await Promise.all(
        Array.from(selectedLeadIds).map(leadId =>
          callEccoAPI(`/api/podcasts/leads/${leadId}`, 'PATCH', {
            priority_level: newPriority
          })
        )
      );
      toast.success(`Updated ${selectedLeadIds.size} leads`);
      loadData();
      setSelectedLeadIds(new Set());
    } catch (error) {
      toast.error('Failed to update leads');
    }
  };

  const handleBulkDelete = async () => {
    if (confirm(`Are you sure you want to delete ${selectedLeadIds.size} leads?`)) {
      try {
        await Promise.all(
          Array.from(selectedLeadIds).map(leadId =>
            callEccoAPI(`/api/podcasts/leads/${leadId}`, 'DELETE')
          )
        );
        toast.success(`Deleted ${selectedLeadIds.size} leads`);
        loadData();
        setSelectedLeadIds(new Set());
      } catch (error) {
        toast.error('Failed to delete leads');
      }
    }
  };

  const handleExportCSV = () => {
    // Create CSV content
    const headers = ['Podcast Name', 'Host', 'Category', 'Status', 'Priority', 'Relevance Score', 'Email'];
    const rows = filteredLeads.map(lead => [
      lead.podcast_name,
      lead.host_name,
      lead.category,
      lead.outreach_status,
      lead.priority_level,
      lead.relevance_score,
      lead.host_email
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `podcast-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('CSV exported successfully');
  };

  const handleGeneratePitches = () => {
    const selected = filteredLeads.filter(lead => selectedLeadIds.has(lead.id));
    if (selected.length === 0) {
      toast.error('Please select at least one lead');
      return;
    }
    setPitchModalLeads(selected);
    setIsPitchModalOpen(true);
  };

  const handleSinglePitch = (lead: PodcastLead) => {
    setPitchModalLeads([lead]);
    setIsPitchModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7fa]">
        <div className="max-w-[1440px] mx-auto px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#02a4bf] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#6B7280]">Loading podcast leads...</p>
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
          <span className="text-[#005260]">Leads</span>
        </div>

        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}>
              Podcast Leads
            </h1>
            <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans' }}>Manage discovered podcasts and track outreach</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-[#02a4bf] text-[#02a4bf] hover:bg-[#E6F7F9] h-11"
              onClick={handleExportCSV}
            >
              <Download className="w-4 h-4 mr-2" />
              Export to CSV
            </Button>
            <Button
              className="bg-[#02a4bf] hover:bg-[#018a9f] text-white h-12"
              onClick={handleGeneratePitches}
              disabled={selectedLeadIds.size === 0}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Pitches
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#E6F7F9] rounded-xl flex items-center justify-center">
                <Mic className="w-6 h-6 text-[#02a4bf]" />
              </div>
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-0">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12 this month
              </Badge>
            </div>
            <div className="text-[#02a4bf] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', lineHeight: '1' }}>{stats.total}</div>
            <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Total Leads</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-[#e84e1c]" />
              </div>
            </div>
            <div className="text-[#e84e1c] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', lineHeight: '1' }}>{stats.highValue}</div>
            <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>High Value</div>
            <div className="text-[#9ca3af] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>{Math.round((stats.highValue / stats.total) * 100)}% of total</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-blue-600 mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', lineHeight: '1' }}>{stats.notContacted}</div>
            <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Not Contacted</div>
            <div className="text-blue-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>Ready to pitch</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-purple-600 mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', lineHeight: '1' }}>{stats.responseRate}%</div>
            <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Response Rate</div>
            <div className="text-[#9ca3af] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>{stats.responded} of {stats.pitched} pitched</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
              <Input
                type="text"
                placeholder="Search by podcast name, host, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 h-11"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#005260]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className={isMultiSelectMode ? 'border-[#02a4bf] bg-[#E6F7F9] text-[#02a4bf]' : ''}
                onClick={() => {
                  setIsMultiSelectMode(!isMultiSelectMode);
                  if (isMultiSelectMode) setSelectedLeadIds(new Set());
                }}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Select Multiple
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Sort: Relevance (High to Low)</SelectItem>
                  <SelectItem value="audience">Sort: Audience Size</SelectItem>
                  <SelectItem value="newest">Sort: Newest First</SelectItem>
                  <SelectItem value="alphabetical">Sort: A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm text-[#6B7280]">Campaign:</Label>
              <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                <SelectTrigger className="w-48">
                  <SelectValue />
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
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-sm text-[#6B7280]">Status:</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="researching">Researching</SelectItem>
                  <SelectItem value="ready_to_pitch">Ready to Pitch</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="pitched">Pitched</SelectItem>
                  <SelectItem value="follow_up_sent">Follow-up Sent</SelectItem>
                  <SelectItem value="responded">Responded</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                  <SelectItem value="appeared">Appeared</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-sm text-[#6B7280]">Min Score:</Label>
              <Select value={minScore} onValueChange={setMinScore}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Score</SelectItem>
                  <SelectItem value="7.0">7.0+</SelectItem>
                  <SelectItem value="8.0">8.0+</SelectItem>
                  <SelectItem value="9.0">9.0+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-sm text-[#6B7280]">Priority:</Label>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-sm text-[#6B7280]">Audience:</Label>
              <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Size</SelectItem>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="very_large">Very Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-[#6B7280] text-right">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
        </div>

        {/* Leads Grid */}
        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-[#f5f7fa] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-[#9ca3af]" />
            </div>
            <h3 className="text-xl text-[#005260] mb-2">No Podcast Leads Yet</h3>
            <p className="text-[#6B7280] mb-6">
              {searchQuery || selectedCampaign !== 'all' || selectedStatus !== 'all'
                ? 'No leads match your filters. Try adjusting your search criteria.'
                : 'Create a campaign and search for podcasts to get started'
              }
            </p>
            {!searchQuery && selectedCampaign === 'all' && selectedStatus === 'all' && (
              <Button className="bg-[#02a4bf] hover:bg-[#018a9f]">
                Create Campaign
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {filteredLeads.map((lead) => {
              const statusBadge = getStatusBadge(lead.outreach_status);
              const priorityBadge = getPriorityBadge(lead.priority_level);
              const isSelected = selectedLeadIds.has(lead.id);

              return (
                <div
                  key={lead.id}
                  className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer relative ${
                    isSelected ? 'ring-4 ring-[#02a4bf]' : ''
                  }`}
                  onClick={() => {
                    if (isMultiSelectMode) {
                      toggleLeadSelection(lead.id);
                    } else {
                      setDetailModalLead(lead);
                    }
                  }}
                >
                  {/* Multi-select checkbox */}
                  {isMultiSelectMode && (
                    <div className="absolute top-4 left-4 z-10">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleLeadSelection(lead.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}

                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-[#E6F7F9] rounded-full flex items-center justify-center">
                      <Mic className="w-5 h-5 text-[#02a4bf]" />
                    </div>
                    <button 
                      className="text-[#9ca3af] hover:text-[#005260]"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Podcast Name */}
                  <h3 className="text-[#005260] text-lg mb-1 line-clamp-2 min-h-[3.5rem]">
                    {lead.podcast_name}
                  </h3>

                  {/* Host */}
                  <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-2">
                    <Users className="w-4 h-4" />
                    <span className="line-clamp-1">with {lead.host_name}</span>
                  </div>

                  {/* Category Badge */}
                  <Badge variant="secondary" className="text-xs mb-4">
                    {lead.category.split(',')[0].trim().toUpperCase()}
                  </Badge>

                  <Separator className="my-4" />

                  {/* Description */}
                  <p className="text-sm text-[#6B7280] line-clamp-3 mb-4 min-h-[4rem]">
                    {lead.podcast_description}
                  </p>

                  {/* Podcast Details */}
                  <div className="flex flex-wrap gap-3 text-xs text-[#9ca3af] mb-4">
                    <span>{lead.total_episodes} episodes</span>
                    <span>•</span>
                    <span>{getAudienceLabel(lead.estimated_audience_size)}</span>
                    <span>•</span>
                    <span>{formatDate(lead.latest_episode_date)}</span>
                  </div>

                  <Separator className="my-4" />

                  {/* AI Scores */}
                  <div className="flex gap-3 mb-4">
                    <div className="flex-1">
                      <div className={`w-14 h-14 mx-auto rounded-full border-4 flex items-center justify-center mb-1 ${getScoreColor(lead.relevance_score)}`}>
                        <span className={`text-lg ${getScoreColor(lead.relevance_score)}`}>
                          {lead.relevance_score.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-center text-xs text-[#9ca3af]">Relevance</p>
                    </div>
                    <div className="flex-1">
                      <div className="w-14 h-14 mx-auto rounded-full border-4 border-purple-500 flex items-center justify-center mb-1">
                        <span className="text-lg text-purple-500">
                          {Math.round(lead.icp_alignment_score)}%
                        </span>
                      </div>
                      <p className="text-center text-xs text-[#9ca3af]">ICP Fit</p>
                    </div>
                    <div className="flex-1">
                      <div className={`w-14 h-14 mx-auto rounded-full border-4 border-[#e84e1c] flex items-center justify-center mb-1`}>
                        <span className={`text-lg ${getScoreColor(lead.opportunity_score)}`}>
                          {lead.opportunity_score.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-center text-xs text-[#9ca3af]">Opportunity</p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Status & Priority */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`${statusBadge.className} text-xs px-3 py-1`}>
                      {statusBadge.label}
                    </Badge>
                    <Badge className={`${priorityBadge.className} text-xs px-3 py-1`}>
                      {priorityBadge.label}
                    </Badge>
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full bg-[#02a4bf] hover:bg-[#018a9f] text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSinglePitch(lead);
                    }}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Pitch
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        {/* Multi-select Toolbar */}
        {isMultiSelectMode && selectedLeadIds.size > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#005260] shadow-lg z-50">
            <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-white">
                  {selectedLeadIds.size} podcasts selected
                </span>
                <button
                  onClick={selectedLeadIds.size === filteredLeads.length ? deselectAll : selectAll}
                  className="text-white underline text-sm hover:text-[#E6F7F9]"
                >
                  {selectedLeadIds.size === filteredLeads.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
              <div className="flex gap-3">
                <Select onValueChange={handleBulkStatusChange}>
                  <SelectTrigger className="w-48 bg-white">
                    <SelectValue placeholder="Change Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="researching">Researching</SelectItem>
                    <SelectItem value="ready_to_pitch">Ready to Pitch</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="pitched">Pitched</SelectItem>
                    <SelectItem value="responded">Responded</SelectItem>
                    <SelectItem value="booked">Booked</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={handleBulkPriorityChange}>
                  <SelectTrigger className="w-48 bg-white">
                    <SelectValue placeholder="Change Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  className="bg-[#e84e1c] hover:bg-[#d43d0f] text-white"
                  onClick={handleGeneratePitches}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Pitches
                </Button>

                <Button
                  variant="destructive"
                  onClick={handleBulkDelete}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        <LeadDetailModal
          lead={detailModalLead}
          isOpen={!!detailModalLead}
          onClose={() => setDetailModalLead(null)}
          onUpdate={loadData}
          onDelete={loadData}
          onGeneratePitch={handleSinglePitch}
        />

        <PitchModal
          isOpen={isPitchModalOpen}
          onClose={() => {
            setIsPitchModalOpen(false);
            setPitchModalLeads([]);
            if (pitchModalLeads.length > 1) {
              setIsMultiSelectMode(false);
              setSelectedLeadIds(new Set());
            }
          }}
          selectedLeads={pitchModalLeads}
          isBulk={pitchModalLeads.length > 1}
        />
      </div>
    </div>
  );
}
