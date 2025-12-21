import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Card } from '../../ui/card';
import { ScrollArea } from '../../ui/scroll-area';
import { Calendar, UserPlus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AddToQueueModalProps {
  leadIds: string[];
  leads: any[];
  onClose: () => void;
}

export function AddToQueueModal({ leadIds, leads, onClose }: AddToQueueModalProps) {
  const [message, setMessage] = useState('');
  const [template, setTemplate] = useState('');

  const weeklyStats = {
    used: 3,
    limit: 15,
    remaining: 12
  };

  const templates = {
    professional: "Hi [Name], I came across your profile and was impressed by your work in [Industry]. I'd love to connect and explore potential synergies.",
    mutual: "Hi [Name], I noticed we share several mutual connections. I'd love to expand my network and connect with you.",
    industry: "Hi [Name], I'm passionate about [Industry] and would love to connect with fellow professionals in the space."
  };

  const handleTemplateSelect = (value: string) => {
    setTemplate(value);
    if (value && templates[value as keyof typeof templates]) {
      setMessage(templates[value as keyof typeof templates]);
    }
  };

  const handleAddToQueue = () => {
    toast.success(`Added ${leadIds.length} lead${leadIds.length > 1 ? 's' : ''} to connection queue`);
    onClose();
  };

  // Generate schedule preview
  const getSchedulePreview = () => {
    const schedule = [];
    const now = new Date();
    let currentDate = new Date(now);
    currentDate.setDate(currentDate.getDate() + 1); // Start tomorrow
    
    for (let i = 0; i < Math.min(leadIds.length, 7); i++) {
      const time = i % 2 === 0 ? '9:00 AM' : '9:00 PM';
      schedule.push({
        date: new Date(currentDate),
        time: time
      });
      
      if (i % 2 === 1) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    
    return schedule;
  };

  const schedule = getSchedulePreview();
  const firstSend = schedule[0];
  const lastSend = schedule[schedule.length - 1];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[700px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
            Add Leads to Connection Queue
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6 py-4">
            {/* Summary Section */}
            <Card className="p-4 bg-[#eff6ff]">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#005260]" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
                    Adding to queue:
                  </span>
                  <span className="text-[#02a4bf]" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                    {leadIds.length} lead{leadIds.length > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#005260]" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
                    LinkedIn account:
                  </span>
                  <span style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
                    john@company.com
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#005260]" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
                    Weekly limit status:
                  </span>
                  <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
                    {weeklyStats.used} of {weeklyStats.limit} used ({weeklyStats.remaining} remaining)
                  </span>
                </div>
              </div>
            </Card>

            {/* Connection Message */}
            <div>
              <label className="block text-[#231f20] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                Connection request message (optional)
              </label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a personalized message to your connection request..."
                className="min-h-[120px] mb-2"
                maxLength={300}
                style={{ fontFamily: 'Open Sans' }}
              />
              <div className="flex justify-between items-center">
                <span className="text-[#6b7280] text-xs" style={{ fontFamily: 'Open Sans' }}>
                  {message.length} / 300
                </span>
              </div>

              {/* Templates Dropdown */}
              <div className="mt-3">
                <Select value={template} onValueChange={handleTemplateSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Use template..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional introduction</SelectItem>
                    <SelectItem value="mutual">Mutual connection</SelectItem>
                    <SelectItem value="industry">Industry interest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Scheduling Section */}
            <div>
              <h3 className="text-[#231f20] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
                Schedule sends
              </h3>
              <p className="text-[#6b7280] mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Connections will be sent 2 per day to stay within LinkedIn limits
              </p>
              
              {/* Schedule Info Card */}
              <Card className="p-4 bg-[#f0fdff] border-[#02a4bf]/20 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="h-5 w-5 text-[#02a4bf]" />
                  <div>
                    <div className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                      First send: {firstSend?.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {firstSend?.time}
                    </div>
                    <div className="text-[#6b7280] text-sm" style={{ fontFamily: 'Open Sans' }}>
                      Last send: {lastSend?.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {lastSend?.time}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Preview List */}
            <div>
              <h3 className="text-[#231f20] mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                Queue Preview ({leadIds.length} lead{leadIds.length > 1 ? 's' : ''})
              </h3>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {leads.slice(0, 5).map((lead, idx) => {
                  const scheduledTime = schedule[idx];
                  return (
                    <Card key={lead.id} className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#02a4bf] to-[#005260] flex items-center justify-center text-white flex-shrink-0" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                          {lead.full_name?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[#231f20] truncate" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                            {lead.full_name}
                          </div>
                          <div className="text-[#6b7280] text-xs truncate" style={{ fontFamily: 'Open Sans' }}>
                            Scheduled: {scheduledTime?.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} {scheduledTime?.time}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
                {leadIds.length > 5 && (
                  <div className="text-center text-[#6b7280] text-sm py-2" style={{ fontFamily: 'Open Sans' }}>
                    + {leadIds.length - 5} more lead{leadIds.length - 5 > 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            style={{ fontFamily: 'Open Sans', fontWeight: 500 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddToQueue}
            className="bg-[#02a4bf] hover:bg-[#028a9f] text-white h-12 px-8"
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add to Queue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
