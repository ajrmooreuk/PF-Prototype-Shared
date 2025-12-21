import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Play, Settings, Info, SkipForward, Send } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { toast } from 'sonner';

interface LinkedInQueueWidgetProps {
  queueStatus: any;
  isLoading: boolean;
}

export function LinkedInQueueWidget({ queueStatus, isLoading }: LinkedInQueueWidgetProps) {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleSendNextBatch = () => {
    toast.success('✓ Connection request sent');
  };

  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="w-64 h-7" />
          <Skeleton className="w-32 h-5" />
        </div>
        <Card className="p-7">
          <Skeleton className="w-full h-32 mb-6" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="w-full h-20" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  const progressPercent = (queueStatus?.rate_limit?.sent_this_week / queueStatus?.rate_limit?.weekly_limit) * 100;

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '22px' }}>
          LinkedIn Connection Queue
        </h2>
        <a 
          href="#" 
          className="text-[#02a4bf] hover:text-[#028a9f] hover:underline text-sm"
          style={{ fontFamily: 'Open Sans' }}
        >
          Manage queue →
        </a>
      </div>

      {/* Widget Container */}
      <Card className="p-7">
        {/* Queue Status Banner */}
        <div className="bg-gradient-to-r from-[#e8f4f9] to-[#d4ebf3] border-l-4 border-[#0077b5] rounded-lg p-5 mb-6 flex items-center justify-between">
          {/* Left Side - Stats */}
          <div className="flex items-center gap-8">
            {/* In Queue */}
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">⏳</span>
              <div className="text-[#231f20] text-center" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}>
                {queueStatus?.queue_count || 0}
              </div>
              <div className="text-[#6b7280] text-xs" style={{ fontFamily: 'Open Sans' }}>
                In Queue
              </div>
            </div>

            {/* Connected */}
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">✓</span>
              <div className="text-[#231f20] text-center" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}>
                {queueStatus?.connected_count || 0}
              </div>
              <div className="text-[#6b7280] text-xs" style={{ fontFamily: 'Open Sans' }}>
                Connected
              </div>
            </div>

            {/* Pending */}
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">⏸</span>
              <div className="text-[#231f20] text-center" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}>
                {queueStatus?.pending_count || 0}
              </div>
              <div className="text-[#6b7280] text-xs" style={{ fontFamily: 'Open Sans' }}>
                Pending
              </div>
            </div>
          </div>

          {/* Right Side - Rate Limit */}
          <div className="flex flex-col items-end gap-2">
            <div className="text-[#0077b5]" style={{ fontFamily: 'Open Sans', fontWeight: 700, fontSize: '14px' }}>
              {queueStatus?.rate_limit?.sent_this_week || 0} of {queueStatus?.rate_limit?.weekly_limit || 15} sent this week
            </div>
            <div className="w-[200px] h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#0077b5] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[#6b7280] text-xs" style={{ fontFamily: 'Open Sans' }}>
              Resets in {queueStatus?.rate_limit?.resets_in_days || 0} days
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3 mb-6">
          <Button 
            onClick={handleSendNextBatch}
            className="bg-[#0077b5] hover:bg-[#005885] text-white shadow-md h-11 px-6"
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '15px' }}
            disabled={progressPercent >= 100}
          >
            <Play className="h-4 w-4 mr-2" />
            Send Next Batch
          </Button>

          <Button 
            variant="outline"
            className="border-2 border-[#0077b5] text-[#0077b5] hover:bg-[#e8f4f9] h-11 px-6"
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '15px' }}
          >
            <Settings className="h-4 w-4 mr-2" />
            Manage Queue
          </Button>

          <Button 
            variant="ghost"
            size="sm"
            className="ml-auto bg-[#f3f4f6] hover:bg-[#e5e7eb] h-11 w-11 p-0"
          >
            <Info className="h-5 w-5 text-[#6b7280]" />
          </Button>
        </div>

        {/* Next 3 in Queue */}
        <div className="space-y-3">
          <h3 className="text-[#231f20] mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
            Next in Queue
          </h3>

          {queueStatus?.next_in_queue?.length > 0 ? (
            queueStatus.next_in_queue.map((item: any) => (
              <div
                key={item.id}
                className="bg-[#f9fafb] border border-[#e5e7eb] rounded-lg p-4 hover:bg-white hover:border-[#0077b5] hover:shadow-md transition-all duration-150 flex items-center gap-4"
              >
                {/* Profile Photo */}
                <Avatar className="h-12 w-12 border-2 border-[#0077b5]">
                  <AvatarImage src={item.lead.profile_photo_url} alt={item.lead.name} />
                  <AvatarFallback className="bg-[#0077b5] text-white" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                    {item.lead.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                {/* Profile Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-[#231f20] hover:text-[#0077b5] hover:underline cursor-pointer" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '15px' }}>
                    {item.lead.name}
                  </div>
                  <div className="text-[#6b7280] text-sm truncate" style={{ fontFamily: 'Open Sans' }}>
                    {item.lead.title} at {item.lead.company}
                  </div>
                  <div className="flex items-center gap-1.5 text-[#9ca3af] text-xs mt-1" style={{ fontFamily: 'Open Sans' }}>
                    <span>📅</span>
                    <span>Scheduled for {formatDateTime(item.scheduled_for)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 w-9 p-0 hover:border-[#f59e0b] group"
                    title="Skip this connection"
                  >
                    <SkipForward className="h-4 w-4 text-[#6b7280] group-hover:text-[#f59e0b]" />
                  </Button>

                  <Button
                    size="sm"
                    className="bg-[#0077b5] hover:bg-[#005885] text-white h-9 w-9 p-0 shadow-sm"
                    title="Send connection now"
                    onClick={handleSendNextBatch}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            // Empty Queue State
            <div className="flex flex-col items-center justify-center py-12">
              <span className="text-6xl mb-4">💼</span>
              <h4 className="text-[#231f20] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
                Queue is empty
              </h4>
              <p className="text-[#6b7280] mb-4 text-center" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Add LinkedIn profiles to start building connections
              </p>
              <Button 
                variant="outline"
                className="border-2 border-[#0077b5] text-[#0077b5] hover:bg-[#e8f4f9]"
              >
                Browse LinkedIn Campaigns
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
