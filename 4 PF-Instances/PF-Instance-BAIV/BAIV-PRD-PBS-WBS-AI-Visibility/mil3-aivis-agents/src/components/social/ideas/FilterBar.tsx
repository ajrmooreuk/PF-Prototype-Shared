import { Search, Grid3x3, List } from 'lucide-react';
import { Input } from '../../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';

interface FilterBarProps {
  statusFilter: string;
  platformFilter: string;
  priorityFilter: string;
  searchQuery: string;
  sortBy: string;
  viewMode: 'grid' | 'list';
  resultsCount: number;
  onStatusChange: (value: string) => void;
  onPlatformChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export function FilterBar({
  statusFilter,
  platformFilter,
  priorityFilter,
  searchQuery,
  sortBy,
  viewMode,
  resultsCount,
  onStatusChange,
  onPlatformChange,
  onPriorityChange,
  onSearchChange,
  onSortChange,
  onViewModeChange,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        {/* Left: Filters */}
        <div className="flex items-center gap-3">
          <span className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
            Status:
          </span>
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <span className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
            Platform:
          </span>
          <Select value={platformFilter} onValueChange={onPlatformChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
            </SelectContent>
          </Select>

          <span className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
            Priority:
          </span>
          <Select value={priorityFilter} onValueChange={onPriorityChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High (4-5)</SelectItem>
              <SelectItem value="medium">Medium (2-3)</SelectItem>
              <SelectItem value="low">Low (0-1)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Right: Search & View */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search ideas..."
              className="pl-10 w-60"
            />
          </div>

          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="title">Title A-Z</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#02a4bf] text-white'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#02a4bf] text-white'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
        Showing {resultsCount} ideas
      </div>
    </div>
  );
}
