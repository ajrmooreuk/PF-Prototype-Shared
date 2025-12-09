import { useState, useEffect } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Progress } from '../../ui/progress';
import { X, Clock, Edit, ChevronLeft } from 'lucide-react';
import { ScrollArea } from '../../ui/scroll-area';

interface ConnectionManagerPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedLeadIds: string[];
  onClearSelection: () => void;
}

export function ConnectionManagerPanel({
  isOpen,
  onToggle,
  selectedLeadIds,
  onClearSelection
}: ConnectionManagerPanelProps) {
  const [queueItems, setQueueItems] = useState<any[]>([]);

  useEffect(() => {
    // Load queue items
    const mockQueue = [
      {
        id: 'q1',
        lead: {
          id: 'lead_1',
          name: 'John Doe',
          title: 'CEO',
          company: 'Acme Corp',
          profile_image_url: 'https://i.pravatar.cc/150?img=12'
        },
        scheduled_for: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        status: 'queued'
      },
      {
        id: 'q2',
        lead: {
          id: 'lead_2',
          name: 'Sarah Johnson',
          title: 'VP Marketing',
          company: 'TechStart Inc',
          profile_image_url: 'https://i.pravatar.cc/150?img=5'
        },
        scheduled_for: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
        status: 'queued'
      },
      {
        id: 'q3',
        lead: {
          id: 'lead_3',
          name: 'Michael Chen',
          title: 'Product Director',
          company: 'Innovation Labs',
          profile_image_url: 'https://i.pravatar.cc/150?img=33'
        },
        scheduled_for: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(),
        status: 'sent'
      }
    ];
    setQueueItems(mockQueue);
  }, []);

  const formatScheduledTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    if (diffDays === 1) return 'Tomorrow ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const getStatusBadge = (status: string) => {
    const badges: any = {
      queued: { label: 'Queued', bg: 'bg-[#f3f4f6]', text: 'text-[#6b7280]' },
      sending: { label: 'Sending...', bg: 'bg-[#e0e7ff]', text: 'text-[#4f46e5]' },
      sent: { label: 'Sent ✓', bg: 'bg-[#d1fae5]', text: 'text-[#059669]' },
      failed: { label: 'Failed ✗', bg: 'bg-[#fee2e2]', text: 'text-[#dc2626]' }
    };
    return badges[status] || badges.queued;
  };

  const weeklyStats = {
    sent: 3,
    limit: 15,
    remaining: 12
  };

  // Toggle button when panel is closed
  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#02a4bf] text-white rounded-l-xl shadow-xl hover:bg-[#028a9f] transition-all z-40"
        style={{ 
          writingMode: 'vertical-rl',
          padding: '24px 12px',
          fontFamily: 'Poppins',
          fontWeight: 500,
          fontSize: '14px',
          letterSpacing: '0.5px'
        }}
      >
        Connection Queue ({queueItems.length})
      </button>
    );
  }

  return (
    <div className="fixed right-0 top-0 bottom-0 w-[400px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="bg-[#02a4bf] text-white p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}>
              LinkedIn Connection Queue
            </h2>
            <p style={{ fontFamily: 'Open Sans', fontSize: '13px', opacity: 0.9 }}>
              2 per day • {queueItems.length} queued
            </p>
          </div>
          <button
            onClick={onToggle}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Account Selector */}
      <div className="p-5 border-b">
        <Select defaultValue="account1">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="account1">
              <div className="flex items-center gap-2">
                <span>💼</span>
                <span>john@company.com</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Queue Status Bar */}
      <div className="bg-[#E6F7F9] p-4 border-b">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4 text-[#02a4bf]" />
          <span className="text-[#005260]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
            Next send: Tomorrow 9:00 AM
          </span>
        </div>
        <div className="mb-2" style={{ fontFamily: 'Open Sans', fontSize: '12px', color: '#6b7280' }}>
          Weekly limit: {weeklyStats.sent} of {weeklyStats.limit} used
        </div>
        <Progress value={(weeklyStats.sent / weeklyStats.limit) * 100} className="h-2" />
      </div>

      {/* Queue List */}
      <ScrollArea className="flex-1 p-4">
        {queueItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Clock className="h-16 w-16 text-[#9ca3af] mb-4" />
            <h3 className="text-[#231f20] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px' }}>
              No Connections Queued
            </h3>
            <p className="text-[#6b7280] px-8" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Select leads from the table and click 'Add to Queue'
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {queueItems.map((item) => {
              const statusBadge = getStatusBadge(item.status);
              
              return (
                <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#02a4bf] to-[#005260] flex items-center justify-center text-white flex-shrink-0" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                      {item.lead.name.charAt(0)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-[#005260] truncate" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '14px' }}>
                          {item.lead.name}
                        </h4>
                        <button className="w-5 h-5 flex items-center justify-center text-[#6b7280] hover:text-[#02a4bf]">
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-[#6b7280] text-xs mb-1 truncate" style={{ fontFamily: 'Open Sans' }}>
                        {item.lead.title}
                      </p>
                      <p className="text-[#9ca3af] text-xs mb-2 truncate" style={{ fontFamily: 'Open Sans' }}>
                        {item.lead.company}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#9ca3af] text-xs" style={{ fontFamily: 'Open Sans' }}>
                          {formatScheduledTime(item.scheduled_for)}
                        </span>
                        <span className={`${statusBadge.bg} ${statusBadge.text} px-2 py-0.5 rounded-full text-xs`} style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
                          {statusBadge.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="p-5 border-t bg-white">
        <Button
          disabled={selectedLeadIds.length === 0}
          className="w-full bg-[#02a4bf] hover:bg-[#028a9f] text-white h-11"
          style={{ fontFamily: 'Poppins', fontWeight: 500 }}
        >
          {selectedLeadIds.length > 0 ? `Add ${selectedLeadIds.length} Lead${selectedLeadIds.length > 1 ? 's' : ''}` : 'Add Selected Leads'}
        </Button>
      </div>
    </div>
  );
}
