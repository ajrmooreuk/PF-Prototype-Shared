import { X, ExternalLink, Lightbulb } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { ScrollArea } from '../../ui/scroll-area';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: any;
  onMarkAsUsed: () => void;
  onArchive: () => void;
  onEngageNow: () => void;
}

export function DetailModal({
  isOpen,
  onClose,
  result,
  onMarkAsUsed,
  onArchive,
  onEngageNow,
}: DetailModalProps) {
  if (!result) return null;

  const getPlatformIcon = () => {
    if (result.source_platform === 'reddit') return '🔴';
    if (result.source_platform === 'youtube') return '▶️';
    if (result.source_platform === 'bluesky') return '🦋';
    return '📱';
  };

  const getPlatformBadge = () => {
    if (result.source_platform === 'reddit') {
      return `r/${result.scraped_data.subreddit}`;
    } else if (result.source_platform === 'youtube') {
      return result.scraped_data.channel_name || 'YouTube';
    } else if (result.source_platform === 'bluesky') {
      return `@${result.scraped_data.author}`;
    }
    return result.source_platform;
  };

  const isEngagementAlert = result.workflow_type?.includes('engagement_alert');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">{item.title} - Content Details</DialogTitle>
        {/* Header */}
        <div className="bg-[#02a4bf] p-6 relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-white">
              <span className="text-2xl">{getPlatformIcon()}</span>
              <span style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}>
                {getPlatformBadge()}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <h2
            className="text-white"
            style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}
          >
            {result.scraped_data.title}
          </h2>
        </div>

        {/* Content */}
        <ScrollArea className="max-h-[70vh]">
          <div className="p-6 space-y-6">
            {/* Original Post */}
            <div>
              <h3
                className="text-[#005260] mb-3"
                style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}
              >
                Original Post
              </h3>
              <div className="bg-[#f5f7fa] rounded-xl p-4">
                <p
                  className="text-[#374151]"
                  style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                >
                  {result.scraped_data.body}
                </p>
              </div>
              <a
                href={result.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-[#02a4bf] hover:underline"
                style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
              >
                View on {result.source_platform.charAt(0).toUpperCase() + result.source_platform.slice(1)}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Questions Identified */}
            {result.processed_insights?.questions && result.processed_insights.questions.length > 0 && (
              <div>
                <h3
                  className="text-[#005260] mb-3"
                  style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}
                >
                  Questions Identified
                </h3>
                <ul className="space-y-2">
                  {result.processed_insights.questions.map((question: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-[#374151]"
                      style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                    >
                      <span className="text-[#02a4bf] mt-1">•</span>
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pain Points */}
            {result.processed_insights?.pain_points && result.processed_insights.pain_points.length > 0 && (
              <div>
                <h3
                  className="text-[#005260] mb-3"
                  style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}
                >
                  Pain Points
                </h3>
                <ul className="space-y-2">
                  {result.processed_insights.pain_points.map((point: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-[#374151]"
                      style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                    >
                      <span className="text-[#e84e1c] mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Content Opportunities */}
            {result.content_gaps && result.content_gaps.length > 0 && (
              <div>
                <h3
                  className="text-[#005260] mb-3"
                  style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}
                >
                  Content Opportunities
                </h3>
                <ul className="space-y-2">
                  {result.content_gaps.map((gap: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-[#374151]"
                      style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                    >
                      <span className="text-[#02a4bf] mt-1">•</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Topics */}
            {result.processed_insights?.keywords && result.processed_insights.keywords.length > 0 && (
              <div>
                <h3
                  className="text-[#005260] mb-3"
                  style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}
                >
                  Key Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.processed_insights.keywords.map((keyword: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#E6F7F9] text-[#02a4bf] rounded-2xl"
                      style={{ fontFamily: 'Open Sans', fontSize: '12px' }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Talking Points */}
            {result.processed_insights?.talking_points && result.processed_insights.talking_points.length > 0 && (
              <div>
                <h3
                  className="text-[#005260] mb-3"
                  style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}
                >
                  Suggested Talking Points
                </h3>
                <ul className="space-y-2">
                  {result.processed_insights.talking_points.map((point: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-[#374151]"
                      style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                    >
                      <span className="text-[#02a4bf] mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggested Action */}
            {result.processed_insights?.suggested_reply && (
              <div className="bg-[#E6F7F9] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-[#02a4bf] flex-shrink-0 mt-1" />
                  <div>
                    <h4
                      className="text-[#005260] mb-2"
                      style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}
                    >
                      {isEngagementAlert ? 'Suggested Reply:' : 'Suggested Content Title:'}
                    </h4>
                    <p
                      className="text-[#374151]"
                      style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                    >
                      {result.processed_insights.suggested_reply}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="bg-[#02a4bf] p-5 flex items-center justify-between">
          <Button
            onClick={() => {
              onMarkAsUsed();
              onClose();
            }}
            className="bg-white text-[#02a4bf] hover:bg-white/90 h-10 rounded-xl"
            style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
          >
            Mark as Used
          </Button>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                onEngageNow();
                onClose();
              }}
              className="bg-[#e84e1c] text-white hover:bg-[#d13d0f] h-10 rounded-xl"
              style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
            >
              {isEngagementAlert ? 'Engage Now' : 'Create Content'}
            </Button>
            <Button
              onClick={() => {
                onArchive();
                onClose();
              }}
              className="bg-[#6B7280] text-white hover:bg-[#4B5563] h-10 rounded-xl"
              style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
            >
              Archive
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
