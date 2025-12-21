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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Search,
  Calendar as CalendarIcon,
  Plus,
  ChevronRight,
  MoreVertical,
  Eye,
  Edit,
  Copy,
  Trash2,
  CheckCircle2,
  Clock,
  Video,
  Users,
  Star,
  ExternalLink,
  Sparkles,
  Mail,
  TrendingUp,
  Scissors,
  Mic
} from 'lucide-react';
import { callEccoAPI } from '../../lib/eccoAPI';
import { toast } from 'sonner@2.0.3';

interface Booking {
  id: string;
  tenant_id: string;
  lead_id: string;
  booking_status: 'scheduled' | 'confirmed' | 'prep_in_progress' | 'ready_to_record' | 'recorded' | 'editing' | 'scheduled_to_publish' | 'published' | 'cancelled';
  scheduled_recording_date: string;
  actual_recording_date: string | null;
  duration_minutes: number;
  timezone: string;
  recording_platform: string;
  recording_url: string;
  meeting_password: string | null;
  calendar_event_id: string | null;
  episode_title: string;
  episode_number: number | null;
  talking_points: string[];
  preparation_notes: string;
  key_messages: string;
  host_prep_questions: string[];
  recording_completed_at: string | null;
  episode_url: string | null;
  episode_duration_minutes: number | null;
  episode_published_date: string | null;
  actual_publish_date: string | null;
  thank_you_sent: boolean;
  thank_you_sent_date: string | null;
  promotion_completed: boolean;
  check_for_citations: boolean;
  last_citation_check_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface Lead {
  id: string;
  podcast_name: string;
  host_name: string;
  host_email: string;
  host_linkedin: string | null;
}

// Mock lead data (in production, this would come from API)
const mockLeads: Record<string, Lead> = {
  'lead-001': { id: 'lead-001', podcast_name: 'Marketing Over Coffee', host_name: 'John Smith', host_email: 'john@marketingovercoffee.com', host_linkedin: 'https://linkedin.com/in/johnsmith' },
  'lead-002': { id: 'lead-002', podcast_name: 'SaaS Marketing Podcast', host_name: 'Sarah Johnson', host_email: 'sarah@saasmarketing.com', host_linkedin: 'https://linkedin.com/in/sarahjohnson' },
  'lead-003': { id: 'lead-003', podcast_name: 'B2B Growth Show', host_name: 'Michael Chen', host_email: 'michael@b2bgrowth.com', host_linkedin: 'https://linkedin.com/in/michaelchen' },
  'lead-004': { id: 'lead-004', podcast_name: 'AI Marketing Insights', host_name: 'Dr. Emily Parker', host_email: 'emily@aimarketing.com', host_linkedin: null },
  'lead-005': { id: 'lead-005', podcast_name: 'Digital Strategy Podcast', host_name: 'David Rodriguez', host_email: 'david@digitalstrategy.com', host_linkedin: 'https://linkedin.com/in/davidrodriguez' },
  'lead-006': { id: 'lead-006', podcast_name: 'Content Marketing Mastery', host_name: 'Lisa Thompson', host_email: 'lisa@contentmastery.com', host_linkedin: 'https://linkedin.com/in/lisathompson' },
  'lead-007': { id: 'lead-007', podcast_name: 'Revenue Growth Podcast', host_name: 'James Wilson', host_email: 'james@revenuegrowth.com', host_linkedin: 'https://linkedin.com/in/jameswilson' },
  'lead-008': { id: 'lead-008', podcast_name: 'Marketing Automation Show', host_name: 'Maria Garcia', host_email: 'maria@marketingautomation.com', host_linkedin: null },
  'lead-009': { id: 'lead-009', podcast_name: 'Future of Marketing', host_name: 'Robert Brown', host_email: 'robert@futuremarketing.com', host_linkedin: 'https://linkedin.com/in/robertbrown' },
  'lead-010': { id: 'lead-010', podcast_name: 'Marketing Fundamentals', host_name: 'Jennifer Lee', host_email: 'jennifer@marketingfundamentals.com', host_linkedin: 'https://linkedin.com/in/jenniferlee' }
};

interface CreateBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
}

function CreateBookingModal({ isOpen, onClose, onCreate }: CreateBookingModalProps) {
  const [formData, setFormData] = useState({
    lead_id: '',
    scheduled_recording_date: '',
    scheduled_recording_time: '14:00',
    duration_minutes: 60,
    timezone: 'America/Los_Angeles',
    recording_platform: 'Zoom',
    recording_url: '',
    meeting_password: '',
    episode_title: '',
    talking_points_input: '',
    talking_points: [] as string[],
    key_messages: '',
    preparation_notes: ''
  });

  const handleAddTalkingPoint = () => {
    if (formData.talking_points_input.trim() && formData.talking_points.length < 10) {
      setFormData({
        ...formData,
        talking_points: [...formData.talking_points, formData.talking_points_input.trim()],
        talking_points_input: ''
      });
    }
  };

  const handleRemoveTalkingPoint = (index: number) => {
    setFormData({
      ...formData,
      talking_points: formData.talking_points.filter((_, i) => i !== index)
    });
  };

  const handleCreate = async () => {
    if (!formData.lead_id || !formData.scheduled_recording_date) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const recordingDateTime = `${formData.scheduled_recording_date}T${formData.scheduled_recording_time}:00`;
      
      await callEccoAPI('/api/podcasts/bookings', 'POST', {
        lead_id: formData.lead_id,
        scheduled_recording_date: recordingDateTime,
        duration_minutes: formData.duration_minutes,
        timezone: formData.timezone,
        recording_platform: formData.recording_platform,
        recording_url: formData.recording_url,
        meeting_password: formData.meeting_password || null,
        episode_title: formData.episode_title,
        talking_points: formData.talking_points,
        key_messages: formData.key_messages,
        preparation_notes: formData.preparation_notes
      });

      toast.success('✓ Booking created successfully!');
      onCreate();
      onClose();
      
      // Reset form
      setFormData({
        lead_id: '',
        scheduled_recording_date: '',
        scheduled_recording_time: '14:00',
        duration_minutes: 60,
        timezone: 'America/Los_Angeles',
        recording_platform: 'Zoom',
        recording_url: '',
        meeting_password: '',
        episode_title: '',
        talking_points_input: '',
        talking_points: [],
        key_messages: '',
        preparation_notes: ''
      });
    } catch (error) {
      toast.error('Failed to create booking');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#005260]">Create Podcast Booking</DialogTitle>
          <DialogDescription>Schedule a confirmed interview</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Section 1: Select Podcast */}
          <div>
            <Label className="text-[#005260]">Podcast *</Label>
            <Select value={formData.lead_id} onValueChange={(value) => setFormData({ ...formData, lead_id: value })}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select a podcast..." />
              </SelectTrigger>
              <SelectContent>
                {Object.values(mockLeads).map((lead) => (
                  <SelectItem key={lead.id} value={lead.id}>
                    {lead.podcast_name} - {lead.host_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Section 2: Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-[#005260]">Recording Date *</Label>
              <Input
                type="date"
                value={formData.scheduled_recording_date}
                onChange={(e) => setFormData({ ...formData, scheduled_recording_date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-[#005260]">Recording Time *</Label>
              <Input
                type="time"
                value={formData.scheduled_recording_time}
                onChange={(e) => setFormData({ ...formData, scheduled_recording_time: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>

          {/* Section 3: Duration & Timezone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-[#005260]">Duration *</Label>
              <Select value={String(formData.duration_minutes)} onValueChange={(value) => setFormData({ ...formData, duration_minutes: Number(value) })}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                  <SelectItem value="120">120 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[#005260]">Timezone *</Label>
              <Select value={formData.timezone} onValueChange={(value) => setFormData({ ...formData, timezone: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Los_Angeles">Pacific (PST/PDT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain (MST/MDT)</SelectItem>
                  <SelectItem value="America/Chicago">Central (CST/CDT)</SelectItem>
                  <SelectItem value="America/New_York">Eastern (EST/EDT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Section 4: Recording Platform */}
          <div>
            <Label className="text-[#005260]">Recording Platform *</Label>
            <Select value={formData.recording_platform} onValueChange={(value) => setFormData({ ...formData, recording_platform: value })}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Zoom">Zoom</SelectItem>
                <SelectItem value="Riverside.fm">Riverside.fm</SelectItem>
                <SelectItem value="SquadCast">SquadCast</SelectItem>
                <SelectItem value="StreamYard">StreamYard</SelectItem>
                <SelectItem value="In-Person">In-Person</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Section 5: Recording Details */}
          <div>
            <Label className="text-[#005260]">Recording URL</Label>
            <Input
              type="url"
              placeholder="https://zoom.us/j/123456789"
              value={formData.recording_url}
              onChange={(e) => setFormData({ ...formData, recording_url: e.target.value })}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-[#005260]">Meeting Password (optional)</Label>
            <Input
              type="text"
              placeholder="Enter meeting password if needed"
              value={formData.meeting_password}
              onChange={(e) => setFormData({ ...formData, meeting_password: e.target.value })}
              className="mt-2"
            />
          </div>

          {/* Section 6: Episode Details */}
          <div>
            <Label className="text-[#005260]">Episode Title (optional)</Label>
            <Input
              type="text"
              placeholder="e.g., AI-Powered Marketing Strategies"
              maxLength={200}
              value={formData.episode_title}
              onChange={(e) => setFormData({ ...formData, episode_title: e.target.value })}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-[#005260]">Talking Points (optional)</Label>
            <div className="mt-2 space-y-2">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Add topic and press Enter"
                  value={formData.talking_points_input}
                  onChange={(e) => setFormData({ ...formData, talking_points_input: e.target.value })}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTalkingPoint();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTalkingPoint} disabled={formData.talking_points.length >= 10}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.talking_points.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.talking_points.map((point, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {point}
                      <button
                        type="button"
                        onClick={() => handleRemoveTalkingPoint(index)}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section 7: Preparation Notes */}
          <div>
            <Label className="text-[#005260]">Key Messages (optional)</Label>
            <Textarea
              rows={3}
              placeholder="Main points you want to convey"
              maxLength={500}
              value={formData.key_messages}
              onChange={(e) => setFormData({ ...formData, key_messages: e.target.value })}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-[#005260]">Prep Notes (optional)</Label>
            <Textarea
              rows={5}
              placeholder="Any special notes or preparation needed"
              maxLength={1000}
              value={formData.preparation_notes}
              onChange={(e) => setFormData({ ...formData, preparation_notes: e.target.value })}
              className="mt-2"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-[#02a4bf] hover:bg-[#018a9f]" onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Create Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface BookingDetailModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
  onDelete: (bookingId: string) => void;
}

function BookingDetailModal({ booking, isOpen, onClose, onUpdate, onDelete }: BookingDetailModalProps) {
  const [activeTab, setActiveTab] = useState('details');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (booking) {
      setFormData({
        episode_title: booking.episode_title,
        talking_points: booking.talking_points,
        key_messages: booking.key_messages,
        preparation_notes: booking.preparation_notes
      });
    }
  }, [booking]);

  if (!booking) return null;

  const lead = mockLeads[booking.lead_id];
  const statusConfig = getStatusConfig(booking.booking_status);

  const handleSave = async () => {
    try {
      await callEccoAPI(`/api/podcasts/bookings/${booking.id}`, 'PATCH', formData);
      toast.success('Booking updated successfully');
      setEditMode(false);
      onUpdate();
    } catch (error) {
      toast.error('Failed to update booking');
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      await callEccoAPI(`/api/podcasts/bookings/${booking.id}/status`, 'PATCH', {
        booking_status: newStatus
      });
      toast.success('Status updated successfully');
      onUpdate();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this booking?')) {
      try {
        await callEccoAPI(`/api/podcasts/bookings/${booking.id}`, 'DELETE');
        toast.success('Booking deleted');
        onDelete(booking.id);
        onClose();
      } catch (error) {
        toast.error('Failed to delete booking');
      }
    }
  };

  const formatDateTime = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (isoDate: string, timezone: string) => {
    const date = new Date(isoDate);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getDaysUntil = (isoDate: string) => {
    const target = new Date(isoDate);
    const now = new Date();
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `In ${diffDays} days`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[900px] max-h-[90vh] p-0">
        {/* Header with status color gradient */}
        <div 
          className="px-8 py-6 rounded-t-lg"
          style={{ background: `linear-gradient(135deg, ${statusConfig.color} 0%, ${statusConfig.color}dd 100%)` }}
        >
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-white text-2xl mb-2">
                  {lead?.podcast_name}
                </DialogTitle>
                <DialogDescription className="text-white/80 text-base">
                  with {lead?.host_name}
                </DialogDescription>
              </div>
              <Badge className="bg-white text-[#005260]">
                {statusConfig.label}
              </Badge>
            </div>
          </DialogHeader>
        </div>

        {/* Tabbed Body */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="border-b px-8">
            <TabsList className="bg-transparent">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="preparation">Preparation</TabsTrigger>
              {(booking.booking_status === 'recorded' || booking.booking_status === 'published') && (
                <TabsTrigger value="tracking">Episode Tracking</TabsTrigger>
              )}
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
          </div>

          <div className="px-8 py-6 overflow-y-auto max-h-[500px]">
            <TabsContent value="details" className="mt-0 space-y-6">
              {/* Recording Information */}
              <div>
                <h3 className="text-lg text-[#005260] mb-4">Recording Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-[#02a4bf]" />
                    <div>
                      <div className="text-[#005260]">{formatDateTime(booking.scheduled_recording_date)}</div>
                      <div className="text-sm text-[#6B7280]">
                        {formatTime(booking.scheduled_recording_date, booking.timezone)}
                      </div>
                    </div>
                    <Badge variant="secondary" className="ml-auto">
                      {getDaysUntil(booking.scheduled_recording_date)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#02a4bf]" />
                    <span className="text-[#005260]">{booking.duration_minutes} minutes</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-[#02a4bf]" />
                    <span className="text-[#005260]">{booking.recording_platform}</span>
                    {booking.recording_url && (
                      <a
                        href={booking.recording_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto"
                      >
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Join Meeting
                        </Button>
                      </a>
                    )}
                  </div>

                  {booking.meeting_password && (
                    <div className="p-3 bg-[#f5f7fa] rounded-lg">
                      <span className="text-sm text-[#6B7280]">Password: </span>
                      <span className="text-sm text-[#005260] font-mono">{booking.meeting_password}</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Episode Details */}
              <div>
                <h3 className="text-lg text-[#005260] mb-4">Episode Details</h3>
                <div className="space-y-4">
                  {editMode ? (
                    <>
                      <div>
                        <Label>Episode Title</Label>
                        <Input
                          value={formData.episode_title}
                          onChange={(e) => setFormData({ ...formData, episode_title: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Key Messages</Label>
                        <Textarea
                          rows={3}
                          value={formData.key_messages}
                          onChange={(e) => setFormData({ ...formData, key_messages: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {booking.episode_title && (
                        <div>
                          <Label className="text-[#6B7280]">Episode Title</Label>
                          <p className="text-[#005260] mt-1">{booking.episode_title}</p>
                        </div>
                      )}
                      {booking.episode_number && (
                        <div>
                          <Label className="text-[#6B7280]">Episode Number</Label>
                          <p className="text-[#005260] mt-1">#{booking.episode_number}</p>
                        </div>
                      )}
                      {booking.talking_points.length > 0 && (
                        <div>
                          <Label className="text-[#6B7280]">Topics to Discuss</Label>
                          <ul className="mt-2 space-y-2">
                            {booking.talking_points.map((point, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-[#02a4bf]">•</span>
                                <span className="text-[#005260]">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {booking.key_messages && (
                        <div>
                          <Label className="text-[#6B7280]">Key Messages</Label>
                          <p className="text-[#005260] mt-1">{booking.key_messages}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <Separator />

              {/* Contact Information */}
              <div>
                <h3 className="text-lg text-[#005260] mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-[#6B7280]">Host</Label>
                    <p className="text-[#005260] mt-1">{lead?.host_name}</p>
                  </div>
                  <div>
                    <Label className="text-[#6B7280]">Email</Label>
                    <a href={`mailto:${lead?.host_email}`} className="text-[#02a4bf] hover:underline mt-1 block">
                      {lead?.host_email}
                    </a>
                  </div>
                  {lead?.host_linkedin && (
                    <div>
                      <Label className="text-[#6B7280]">LinkedIn</Label>
                      <a href={lead.host_linkedin} target="_blank" rel="noopener noreferrer" className="text-[#02a4bf] hover:underline mt-1 block flex items-center gap-1">
                        View Profile <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preparation" className="mt-0 space-y-6">
              <div>
                <h3 className="text-lg text-[#005260] mb-4">Preparation Notes</h3>
                {editMode ? (
                  <Textarea
                    rows={8}
                    value={formData.preparation_notes}
                    onChange={(e) => setFormData({ ...formData, preparation_notes: e.target.value })}
                    placeholder="Add preparation notes..."
                  />
                ) : (
                  <div className="p-4 bg-[#f5f7fa] rounded-lg">
                    <p className="text-[#005260] whitespace-pre-wrap">
                      {booking.preparation_notes || 'No preparation notes added yet.'}
                    </p>
                  </div>
                )}
              </div>

              {booking.host_prep_questions.length > 0 && (
                <div>
                  <h3 className="text-lg text-[#005260] mb-4">Host Questions</h3>
                  <ul className="space-y-3">
                    {booking.host_prep_questions.map((question, index) => (
                      <li key={index} className="p-3 bg-[#E6F7F9] rounded-lg">
                        <p className="text-[#005260]">{question}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI Prep Notes
                </Button>
              </div>
            </TabsContent>

            {(booking.booking_status === 'recorded' || booking.booking_status === 'published') && (
              <TabsContent value="tracking" className="mt-0 space-y-6">
                {booking.booking_status === 'published' && (
                  <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700 mb-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-lg">Episode Published!</span>
                    </div>
                    {booking.episode_url && (
                      <a
                        href={booking.episode_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#02a4bf] hover:underline flex items-center gap-1 mt-2"
                      >
                        Listen to Episode <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <p className="text-sm text-[#6B7280] mt-2">
                      Published {booking.actual_publish_date && new Date(booking.actual_publish_date).toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="text-lg text-[#005260] mb-4">Thank You Email</h3>
                  {booking.thank_you_sent ? (
                    <div className="p-3 bg-green-50 rounded-lg text-green-700">
                      ✓ Sent on {booking.thank_you_sent_date && new Date(booking.thank_you_sent_date).toLocaleDateString()}
                    </div>
                  ) : (
                    <div>
                      <p className="text-[#e84e1c] mb-2">Not sent</p>
                      <Button className="bg-[#e84e1c] hover:bg-[#d43d0f]">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Thank You Email
                      </Button>
                    </div>
                  )}
                </div>

                {booking.check_for_citations && (
                  <div>
                    <h3 className="text-lg text-[#005260] mb-4">Citation Tracking</h3>
                    <div className="space-y-2">
                      <p className="text-sm text-[#6B7280]">
                        Last checked: {booking.last_citation_check_date ? new Date(booking.last_citation_check_date).toLocaleDateString() : 'Never'}
                      </p>
                      <Button className="bg-[#02a4bf] hover:bg-[#018a9f]">
                        Check for AI Citations
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            )}

            <TabsContent value="history" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-[#f5f7fa] rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-[#02a4bf] mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-[#005260]">Booking created</p>
                    <p className="text-xs text-[#9ca3af] mt-1">
                      {new Date(booking.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                {booking.updated_at !== booking.created_at && (
                  <div className="flex items-start gap-3 p-3 bg-[#f5f7fa] rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-[#005260]">Booking updated</p>
                      <p className="text-xs text-[#9ca3af] mt-1">
                        {new Date(booking.updated_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {booking.recording_completed_at && (
                  <div className="flex items-start gap-3 p-3 bg-[#f5f7fa] rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-[#005260]">Recording completed</p>
                      <p className="text-xs text-[#9ca3af] mt-1">
                        {new Date(booking.recording_completed_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {booking.actual_publish_date && (
                  <div className="flex items-start gap-3 p-3 bg-[#f5f7fa] rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-[#005260]">Episode published</p>
                      <p className="text-xs text-[#9ca3af] mt-1">
                        {new Date(booking.actual_publish_date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer */}
        <div className="border-t px-8 py-5 flex items-center justify-between bg-[#f5f7fa]">
          <Button
            variant="ghost"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Booking
          </Button>
          <div className="flex gap-3">
            {editMode ? (
              <>
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button className="bg-[#02a4bf] hover:bg-[#018a9f]" onClick={handleSave}>
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Select value={booking.booking_status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="prep_in_progress">Prep In Progress</SelectItem>
                    <SelectItem value="ready_to_record">Ready to Record</SelectItem>
                    <SelectItem value="recorded">Recorded</SelectItem>
                    <SelectItem value="editing">Editing</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-[#02a4bf] hover:bg-[#018a9f]" onClick={() => setEditMode(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Details
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const getStatusConfig = (status: string) => {
  const configs: Record<string, { label: string; color: string; bgColor: string; borderColor: string }> = {
    scheduled: { label: 'SCHEDULED', color: '#e84e1c', bgColor: 'rgba(232, 78, 28, 0.1)', borderColor: '#e84e1c' },
    confirmed: { label: 'CONFIRMED', color: '#e84e1c', bgColor: 'rgba(232, 78, 28, 0.1)', borderColor: '#e84e1c' },
    prep_in_progress: { label: 'PREP IN PROGRESS', color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3b82f6' },
    ready_to_record: { label: 'READY TO RECORD', color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.1)', borderColor: '#8b5cf6' },
    recorded: { label: 'RECORDED', color: '#fbbf24', bgColor: 'rgba(251, 191, 36, 0.1)', borderColor: '#fbbf24' },
    editing: { label: 'EDITING', color: '#fbbf24', bgColor: 'rgba(251, 191, 36, 0.1)', borderColor: '#fbbf24' },
    scheduled_to_publish: { label: 'SCHEDULED', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10b981' },
    published: { label: 'PUBLISHED', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10b981' },
    cancelled: { label: 'CANCELLED', color: '#9ca3af', bgColor: 'rgba(156, 163, 175, 0.1)', borderColor: '#9ca3af' }
  };
  return configs[status] || configs.scheduled;
};

export function PodcastBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'prep' | 'recorded' | 'published'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('soonest');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailModalBooking, setDetailModalBooking] = useState<Booking | null>(null);

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    filterAndSortBookings();
  }, [bookings, activeTab, searchQuery, sortBy, dateRange]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await callEccoAPI('/api/podcasts/bookings', 'GET');
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to load bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortBookings = () => {
    let filtered = [...bookings];

    // Tab filter
    if (activeTab === 'upcoming') {
      filtered = filtered.filter(b => {
        const date = new Date(b.scheduled_recording_date);
        return date > new Date() && ['scheduled', 'confirmed', 'prep_in_progress', 'ready_to_record'].includes(b.booking_status);
      });
    } else if (activeTab === 'prep') {
      filtered = filtered.filter(b => b.booking_status === 'prep_in_progress');
    } else if (activeTab === 'recorded') {
      filtered = filtered.filter(b => ['recorded', 'editing'].includes(b.booking_status));
    } else if (activeTab === 'published') {
      filtered = filtered.filter(b => b.booking_status === 'published');
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(b => {
        const lead = mockLeads[b.lead_id];
        return (
          lead?.podcast_name.toLowerCase().includes(query) ||
          lead?.host_name.toLowerCase().includes(query) ||
          b.episode_title.toLowerCase().includes(query)
        );
      });
    }

    // Date range filter
    if (dateRange !== 'all') {
      const now = new Date();
      filtered = filtered.filter(b => {
        const date = new Date(b.scheduled_recording_date);
        const diffDays = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        
        if (dateRange === 'next_30') return diffDays >= 0 && diffDays <= 30;
        if (dateRange === 'past_30') return diffDays < 0 && diffDays >= -30;
        return true;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.scheduled_recording_date).getTime();
      const dateB = new Date(b.scheduled_recording_date).getTime();
      
      switch (sortBy) {
        case 'soonest':
          return dateA - dateB;
        case 'latest':
          return dateB - dateA;
        case 'alphabetical':
          const leadA = mockLeads[a.lead_id];
          const leadB = mockLeads[b.lead_id];
          return (leadA?.podcast_name || '').localeCompare(leadB?.podcast_name || '');
        default:
          return 0;
      }
    });

    setFilteredBookings(filtered);
  };

  const getStats = () => {
    const total = bookings.length;
    const upcoming = bookings.filter(b => {
      const date = new Date(b.scheduled_recording_date);
      return date > new Date() && ['scheduled', 'confirmed', 'prep_in_progress', 'ready_to_record'].includes(b.booking_status);
    }).length;
    const recorded = bookings.filter(b => ['recorded', 'editing', 'scheduled_to_publish'].includes(b.booking_status)).length;
    const published = bookings.filter(b => b.booking_status === 'published').length;
    
    // Find next upcoming booking
    const upcomingBookings = bookings
      .filter(b => {
        const date = new Date(b.scheduled_recording_date);
        return date > new Date();
      })
      .sort((a, b) => new Date(a.scheduled_recording_date).getTime() - new Date(b.scheduled_recording_date).getTime());
    
    const nextBooking = upcomingBookings[0];
    const daysUntilNext = nextBooking ? Math.ceil((new Date(nextBooking.scheduled_recording_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0;

    return { total, upcoming, recorded, published, daysUntilNext };
  };

  const stats = getStats();

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getDaysUntil = (isoDate: string) => {
    const target = new Date(isoDate);
    const now = new Date();
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: `${Math.abs(diffDays)} days ago`, isPast: true };
    if (diffDays === 0) return { text: 'Today', isPast: false };
    if (diffDays === 1) return { text: 'Tomorrow', isPast: false };
    return { text: `In ${diffDays} days`, isPast: false };
  };

  const handleDeleteBooking = (bookingId: string) => {
    setBookings(bookings.filter(b => b.id !== bookingId));
    setFilteredBookings(filteredBookings.filter(b => b.id !== bookingId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7fa]">
        <div className="max-w-[1440px] mx-auto px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#02a4bf] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#6B7280]">Loading bookings...</p>
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
          <span className="text-[#005260]">Bookings</span>
        </div>

        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}>Podcast Bookings</h1>
            <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans' }}>Manage interview schedule and track episode publication</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-[#02a4bf] text-[#02a4bf]"
              onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {viewMode === 'list' ? 'Calendar View' : 'List View'}
            </Button>
            <Button
              className="bg-[#02a4bf] hover:bg-[#018a9f] text-white h-12"
              onClick={() => setCreateModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Booking
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#E6F7F9] rounded-xl flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-[#02a4bf]" />
              </div>
            </div>
            <div className="text-[#02a4bf] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', lineHeight: '1' }}>{stats.total}</div>
            <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Total Bookings</div>
            <div className="text-green-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>3 this month</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Mic className="w-6 h-6 text-[#e84e1c]" />
              </div>
            </div>
            <div className="text-[#e84e1c] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', lineHeight: '1' }}>{stats.upcoming}</div>
            <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Upcoming</div>
            <div className="text-[#e84e1c] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
              {stats.daysUntilNext > 0 ? `Next in ${stats.daysUntilNext} days` : 'None scheduled'}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <Scissors className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-purple-600 mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', lineHeight: '1' }}>{stats.recorded}</div>
            <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>In Editing</div>
            <div className="text-purple-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>Awaiting release</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-green-600 mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', lineHeight: '1' }}>{stats.published}</div>
            <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Published</div>
            <div className="text-green-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>Send thank-yous</div>
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
              All Bookings ({stats.total})
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-4 text-sm transition-colors ${
                activeTab === 'upcoming'
                  ? 'border-b-3 border-[#02a4bf] bg-[#02a4bf] text-white'
                  : 'text-[#6B7280] hover:text-[#005260]'
              }`}
            >
              Upcoming ({stats.upcoming})
            </button>
            <button
              onClick={() => setActiveTab('prep')}
              className={`px-6 py-4 text-sm transition-colors ${
                activeTab === 'prep'
                  ? 'border-b-3 border-[#02a4bf] bg-[#02a4bf] text-white'
                  : 'text-[#6B7280] hover:text-[#005260]'
              }`}
            >
              Prep In Progress ({bookings.filter(b => b.booking_status === 'prep_in_progress').length})
            </button>
            <button
              onClick={() => setActiveTab('recorded')}
              className={`px-6 py-4 text-sm transition-colors ${
                activeTab === 'recorded'
                  ? 'border-b-3 border-[#02a4bf] bg-[#02a4bf] text-white'
                  : 'text-[#6B7280] hover:text-[#005260]'
              }`}
            >
              Recorded ({stats.recorded})
            </button>
            <button
              onClick={() => setActiveTab('published')}
              className={`px-6 py-4 text-sm transition-colors ${
                activeTab === 'published'
                  ? 'border-b-3 border-[#02a4bf] bg-[#02a4bf] text-white'
                  : 'text-[#6B7280] hover:text-[#005260]'
              }`}
            >
              Published ({stats.published})
            </button>
          </div>

          {/* Filter Bar */}
          <div className="p-5 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
              <Input
                type="text"
                placeholder="Search by podcast name or host..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            <div className="flex gap-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="next_30">Next 30 Days</SelectItem>
                  <SelectItem value="past_30">Past 30 Days</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="soonest">Soonest First</SelectItem>
                  <SelectItem value="latest">Latest First</SelectItem>
                  <SelectItem value="alphabetical">A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-b-2xl p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-[#f5f7fa] rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="w-10 h-10 text-[#9ca3af]" />
            </div>
            <h3 className="text-xl text-[#005260] mb-2">No Bookings Yet</h3>
            <p className="text-[#6B7280] mb-6">
              {searchQuery || dateRange !== 'all'
                ? 'No bookings match your filters.'
                : 'Create your first booking when a podcast confirms your appearance'
              }
            </p>
            {!searchQuery && dateRange === 'all' && (
              <Button className="bg-[#02a4bf] hover:bg-[#018a9f]">
                Browse Leads
              </Button>
            )}
          </div>
        ) : (
          <div className="bg-[#f5f7fa] pb-8 space-y-4">
            {filteredBookings.map((booking) => {
              const lead = mockLeads[booking.lead_id];
              const statusConfig = getStatusConfig(booking.booking_status);
              const daysUntil = getDaysUntil(booking.scheduled_recording_date);

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
                  onClick={() => setDetailModalBooking(booking)}
                  style={{ borderLeft: `4px solid ${statusConfig.borderColor}` }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <Badge style={{ backgroundColor: statusConfig.color }} className="text-white text-xs px-3 py-1">
                      {statusConfig.label}
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
                          setDetailModalBooking(booking);
                        }}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          setDetailModalBooking(booking);
                        }}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Booking
                        </DropdownMenuItem>
                        {booking.recording_url && (
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(booking.recording_url);
                            toast.success('Recording link copied!');
                          }}>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Recording Link
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          Add to Calendar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {['scheduled', 'confirmed', 'prep_in_progress', 'ready_to_record'].includes(booking.booking_status) && (
                          <DropdownMenuItem>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Mark as Recorded
                          </DropdownMenuItem>
                        )}
                        {booking.booking_status === 'recorded' && (
                          <DropdownMenuItem>
                            <Star className="w-4 h-4 mr-2" />
                            Mark as Published
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBooking(booking.id);
                            toast.success('Booking deleted');
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Booking
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Podcast Info */}
                  <h3 className="text-[#005260] text-xl mb-2">{lead?.podcast_name}</h3>
                  <div className="flex items-center gap-2 text-[#6B7280] mb-4">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">with {lead?.host_name}</span>
                  </div>

                  {/* Recording Details */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-[#6B7280]" />
                      <div>
                        <div className="text-[#005260] text-sm">{formatDate(booking.scheduled_recording_date)}</div>
                        <div className="text-xs text-[#9ca3af]">{formatTime(booking.scheduled_recording_date)}</div>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={daysUntil.isPast ? 'bg-gray-100' : 'bg-orange-50 text-[#e84e1c]'}
                      >
                        {daysUntil.text}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#6B7280]" />
                      <span className="text-sm text-[#005260]">{booking.duration_minutes} minutes</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-[#6B7280]" />
                      <span className="text-sm text-[#005260]">{booking.recording_platform}</span>
                      {booking.recording_url && (
                        <a
                          href={booking.recording_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#02a4bf] hover:underline text-xs flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Join <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Episode Details */}
                  <div className="space-y-3">
                    {booking.episode_title && (
                      <div>
                        <Label className="text-xs text-[#9ca3af]">Episode Title</Label>
                        <p className="text-[#005260] mt-1">{booking.episode_title}</p>
                      </div>
                    )}

                    {booking.talking_points.length > 0 && (
                      <div>
                        <Label className="text-xs text-[#9ca3af]">Topics to Discuss</Label>
                        <ul className="mt-1 space-y-1">
                          {booking.talking_points.slice(0, 3).map((point, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="text-[#02a4bf]">•</span>
                              <span className="text-[#005260]">{point}</span>
                            </li>
                          ))}
                          {booking.talking_points.length > 3 && (
                            <li className="text-xs text-[#02a4bf] hover:underline cursor-pointer">
                              +{booking.talking_points.length - 3} more
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    {booking.key_messages && (
                      <div>
                        <Label className="text-xs text-[#9ca3af]">Key Messages</Label>
                        <p className="text-sm text-[#005260] mt-1">
                          {booking.key_messages.substring(0, 100)}
                          {booking.key_messages.length > 100 && '...'}
                          {booking.key_messages.length > 100 && (
                            <button className="text-[#02a4bf] hover:underline ml-1 text-xs">
                              View all
                            </button>
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Published Episode */}
                  {booking.booking_status === 'published' && (
                    <>
                      <Separator className="my-4" />
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700 mb-2">
                          <span className="text-xl">🎉</span>
                          <span className="text-sm">Episode Published!</span>
                        </div>
                        {booking.episode_url && (
                          <a
                            href={booking.episode_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#02a4bf] hover:underline text-sm flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Listen to Episode <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        <p className="text-xs text-[#6B7280] mt-1">
                          Published {booking.actual_publish_date && new Date(booking.actual_publish_date).toLocaleDateString()}
                        </p>
                        {booking.thank_you_sent ? (
                          <p className="text-xs text-green-600 mt-2">✅ Thank you email sent</p>
                        ) : (
                          <p className="text-xs text-[#e84e1c] mt-2">⚠️ Send thank you email</p>
                        )}
                      </div>
                    </>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    {['scheduled', 'confirmed', 'prep_in_progress', 'ready_to_record'].includes(booking.booking_status) && (
                      <>
                        <Button
                          variant="outline"
                          className="flex-1 border-[#02a4bf] text-[#02a4bf]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDetailModalBooking(booking);
                          }}
                        >
                          Edit Details
                        </Button>
                        <Button
                          className="flex-1 bg-[#02a4bf] hover:bg-[#018a9f]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDetailModalBooking(booking);
                          }}
                        >
                          View Prep Notes
                        </Button>
                      </>
                    )}
                    {['recorded', 'editing'].includes(booking.booking_status) && (
                      <>
                        <Button
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.info('Mark as Published feature coming soon');
                          }}
                        >
                          Mark as Published
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDetailModalBooking(booking);
                          }}
                        >
                          Edit Details
                        </Button>
                      </>
                    )}
                    {booking.booking_status === 'published' && (
                      <>
                        {!booking.thank_you_sent && (
                          <Button
                            className="flex-1 bg-[#e84e1c] hover:bg-[#d43d0f]"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.info('Send Thank You feature coming soon');
                            }}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Send Thank You
                          </Button>
                        )}
                        <Button
                          className="flex-1 bg-purple-600 hover:bg-purple-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (booking.episode_url) {
                              window.open(booking.episode_url, '_blank');
                            }
                          }}
                        >
                          View Episode
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.info('Track Citations feature coming soon');
                          }}
                        >
                          Track Citations
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
        <CreateBookingModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onCreate={loadBookings}
        />

        <BookingDetailModal
          booking={detailModalBooking}
          isOpen={!!detailModalBooking}
          onClose={() => setDetailModalBooking(null)}
          onUpdate={loadBookings}
          onDelete={handleDeleteBooking}
        />
      </div>
    </div>
  );
}
