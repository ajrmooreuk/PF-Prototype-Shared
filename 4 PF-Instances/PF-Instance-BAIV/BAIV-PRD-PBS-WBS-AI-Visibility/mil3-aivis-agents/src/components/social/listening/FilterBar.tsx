import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';

interface FilterBarProps {
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
  priority: string;
  onPriorityChange: (value: string) => void;
  actionType: string;
  onActionTypeChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  resultsCount: number;
}

export function FilterBar({
  timeRange,
  onTimeRangeChange,
  priority,
  onPriorityChange,
  actionType,
  onActionTypeChange,
  sortBy,
  onSortByChange,
  resultsCount,
}: FilterBarProps) {
  return (
    <div className="bg-white p-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Time Range */}
        <div className="flex items-center gap-2">
          <span className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
            Time:
          </span>
          <Select value={timeRange} onValueChange={onTimeRangeChange}>
            <SelectTrigger className="w-[140px] h-9 bg-[#f5f7fa] border-0 rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Priority */}
        <div className="flex items-center gap-2">
          <span className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
            Priority:
          </span>
          <Select value={priority} onValueChange={onPriorityChange}>
            <SelectTrigger className="w-[150px] h-9 bg-[#f5f7fa] border-0 rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High (≥7)</SelectItem>
              <SelectItem value="medium">Medium (4-6)</SelectItem>
              <SelectItem value="low">Low (&lt;4)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Type */}
        <div className="flex items-center gap-2">
          <span className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
            Action:
          </span>
          <Select value={actionType} onValueChange={onActionTypeChange}>
            <SelectTrigger className="w-[140px] h-9 bg-[#f5f7fa] border-0 rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="engage_now">Engage Now</SelectItem>
              <SelectItem value="content_idea">Content Ideas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <Select value={sortBy} onValueChange={onSortByChange}>
          <SelectTrigger className="w-[160px] h-9 bg-[#f5f7fa] border-0 rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Sort by: Latest</SelectItem>
            <SelectItem value="highest_priority">Highest Priority</SelectItem>
            <SelectItem value="most_engagement">Most Engagement</SelectItem>
          </SelectContent>
        </Select>

        <span className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Showing {resultsCount} results
        </span>
      </div>
    </div>
  );
}
