import { MoreVertical, Lightbulb, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';

interface ResultCardProps {
  result: any;
  onViewDetails: () => void;
  onMarkAsUsed: () => void;
  onArchive: () => void;
  onEngageNow: () => void;
}

export function ResultCard({
  result,
  onViewDetails,
  onMarkAsUsed,
  onArchive,
  onEngageNow,
}: ResultCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getPriorityBadge = () => {
    const score = result.priority_score;
    if (score >= 70) {
      return { label: 'HIGH', color: '#e84e1c', bg: '#FEF2EE' };
    } else if (score >= 40) {
      return { label: 'MEDIUM', color: '#78350f', bg: '#fef3c7' };
    } else {
      return { label: 'LOW', color: '#ffffff', bg: '#9ca3af' };
    }
  };

  const getICPFitBadge = () => {
    const score = result.relevance_score;
    if (score >= 80) {
      return { label: 'High Match', color: '#ffffff', bg: '#10b981' };
    } else if (score >= 50) {
      return { label: 'Medium Fit', color: '#78350f', bg: '#fef3c7' };
    } else {
      return { label: 'Low Fit', color: '#ffffff', bg: '#9ca3af' };
    }
  };

  const getPlatformBadge = () => {
    if (result.source_platform === 'reddit') {
      return {
        text: `r/${result.scraped_data.subreddit}`,
        color: '#FF4500',
      };
    } else if (result.source_platform === 'youtube') {
      return {
        text: result.scraped_data.channel_name || 'YouTube',
        color: '#FF0000',
      };
    } else if (result.source_platform === 'bluesky') {
      return {
        text: `@${result.scraped_data.author}`,
        color: '#1185fe',
      };
    }
    return { text: '', color: '#6B7280' };
  };

  const getEngagementMetrics = () => {
    if (result.source_platform === 'reddit') {
      return `${result.scraped_data.score} upvotes • ${result.scraped_data.num_comments} comments`;
    } else if (result.source_platform === 'youtube') {
      return `${result.scraped_data.view_count?.toLocaleString() || 0} views • ${result.scraped_data.comment_count || 0} comments`;
    } else if (result.source_platform === 'bluesky') {
      return `${result.scraped_data.like_count || 0} likes • ${result.scraped_data.reply_count || 0} replies`;
    }
    return '';
  };

  const isEngagementAlert = result.workflow_type?.includes('engagement_alert');
  const priority = getPriorityBadge();
  const icpFit = getICPFitBadge();
  const platform = getPlatformBadge();

  return (
    <div
      className="bg-white rounded-2xl p-5 shadow-sm transition-all duration-200 cursor-pointer"
      style={{
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onViewDetails}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: platform.color }}
          />
          <span
            className="text-[#6B7280]"
            style={{ fontFamily: 'Open Sans', fontSize: '12px' }}
          >
            {platform.text}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <button className="text-[#6B7280] hover:text-[#02a4bf] transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[140px]">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onMarkAsUsed(); }}>
              Mark as Used
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onArchive(); }}>
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onViewDetails(); }}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-[#6B7280]">
              Report Issue
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Priority & ICP Badges */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="px-3 py-1 rounded-full"
          style={{
            backgroundColor: priority.bg,
            color: priority.color,
            fontFamily: 'Poppins',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          {priority.label}
        </div>
        <div
          className="px-3 py-1 rounded-full"
          style={{
            backgroundColor: icpFit.bg,
            color: icpFit.color,
            fontFamily: 'Poppins',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          {icpFit.label}
        </div>
      </div>

      {/* Title */}
      <h3
        className="text-[#005260] mb-2 line-clamp-2"
        style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px' }}
      >
        {result.scraped_data.title}
      </h3>

      {/* Preview Text */}
      <p
        className="text-[#6B7280] mb-4 line-clamp-2"
        style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
      >
        {result.scraped_data.body}
      </p>

      {/* Engagement Metrics */}
      <div
        className="text-[#6B7280] mb-2"
        style={{ fontFamily: 'Open Sans', fontSize: '12px' }}
      >
        {getEngagementMetrics()}
      </div>

      {/* Tags */}
      {result.processed_insights?.keywords && (
        <div className="flex flex-wrap gap-2 mb-4">
          {result.processed_insights.keywords.slice(0, 3).map((tag: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-[#E6F7F9] text-[#02a4bf] rounded-2xl"
              style={{ fontFamily: 'Open Sans', fontSize: '12px' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Insight Preview */}
      {result.processed_insights?.questions?.[0] && (
        <div className="flex items-start gap-2 mb-4">
          <Lightbulb className="w-4 h-4 text-[#02a4bf] mt-0.5 flex-shrink-0" />
          <p
            className="text-[#374151] italic line-clamp-1"
            style={{ fontFamily: 'Open Sans', fontSize: '13px' }}
          >
            Question: {result.processed_insights.questions[0]}
          </p>
        </div>
      )}

      {/* Timestamp */}
      <div
        className="text-[#9ca3af] mb-4"
        style={{ fontFamily: 'Open Sans', fontSize: '12px' }}
      >
        {result.time_ago || new Date(result.created_at).toLocaleString()}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
        <Button
          onClick={onEngageNow}
          className="flex-1 h-9 rounded-xl"
          style={{
            backgroundColor: isEngagementAlert ? '#02a4bf' : '#e84e1c',
            color: '#ffffff',
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          {isEngagementAlert ? 'Engage Now' : 'Create Content'}
        </Button>
        <Button
          onClick={onViewDetails}
          variant="outline"
          className="flex-1 h-9 rounded-xl border-[#02a4bf] text-[#02a4bf] hover:bg-[#E6F7F9]"
          style={{
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}
