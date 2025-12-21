import { useState } from 'react';
import { Search, Grid3x3, List } from 'lucide-react';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface FilterBarProps {
  onSearchChange: (query: string) => void;
  onICPScoreFilter: (filter: string) => void;
  onEmailStatusFilter: (filter: string) => void;
  onICPCategoryFilter: (category: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  viewMode: 'grid' | 'list';
  icpCategoryCounts?: Record<string, number>;
}

export function FilterBar({
  onSearchChange,
  onICPScoreFilter,
  onEmailStatusFilter,
  onICPCategoryFilter,
  onViewModeChange,
  viewMode,
  icpCategoryCounts = {},
}: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <div className="bg-white rounded-xl p-4 mb-4">
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative" style={{ width: '300px' }}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
          <Input
            placeholder="Search companies, contacts, emails..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 h-10"
            style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
          />
        </div>

        {/* ICP Score Filter */}
        <Select onValueChange={onICPScoreFilter} defaultValue="all">
          <SelectTrigger className="w-[180px] h-10" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            <SelectValue placeholder="All ICP Scores" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ICP Scores</SelectItem>
            <SelectItem value="high">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#10b981] rounded-full" />
                High (70-100)
              </div>
            </SelectItem>
            <SelectItem value="medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#fbbf24] rounded-full" />
                Medium (40-69)
              </div>
            </SelectItem>
            <SelectItem value="low">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#ef4444] rounded-full" />
                Low (0-39)
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Email Status Filter */}
        <Select onValueChange={onEmailStatusFilter} defaultValue="all">
          <SelectTrigger className="w-[180px] h-10" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="has_email">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#10b981] rounded-full" />
                Has Email
              </div>
            </SelectItem>
            <SelectItem value="needs_enrichment">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#f59e0b] rounded-full" />
                Needs Enrichment
              </div>
            </SelectItem>
            <SelectItem value="synced">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#3b82f6] rounded-full" />
                Synced to MailerLite
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* ICP Category Filter */}
        <Select onValueChange={onICPCategoryFilter} defaultValue="all">
          <SelectTrigger className="w-[200px] h-10" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="orthopedics">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#2990C6] rounded-full" />
                Orthopedics {icpCategoryCounts.orthopedics ? `(${icpCategoryCounts.orthopedics})` : ''}
              </div>
            </SelectItem>
            <SelectItem value="physical_therapy">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#3b82f6] rounded-full" />
                Physical Therapy {icpCategoryCounts.physical_therapy ? `(${icpCategoryCounts.physical_therapy})` : ''}
              </div>
            </SelectItem>
            <SelectItem value="chiropractic">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#a855f7] rounded-full" />
                Chiropractic {icpCategoryCounts.chiropractic ? `(${icpCategoryCounts.chiropractic})` : ''}
              </div>
            </SelectItem>
            <SelectItem value="podiatry">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#10b981] rounded-full" />
                Podiatry {icpCategoryCounts.podiatry ? `(${icpCategoryCounts.podiatry})` : ''}
              </div>
            </SelectItem>
            <SelectItem value="uncategorized">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#6b7280] rounded-full" />
                Uncategorized {icpCategoryCounts.uncategorized ? `(${icpCategoryCounts.uncategorized})` : ''}
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* View Toggle */}
        <div className="ml-auto flex items-center gap-1 bg-[#f3f4f6] p-1 rounded-lg">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded ${
              viewMode === 'grid' ? 'bg-[#2990C6] text-white' : 'text-[#6b7280] hover:bg-[#e5e7eb]'
            } transition-colors`}
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded ${
              viewMode === 'list' ? 'bg-[#2990C6] text-white' : 'text-[#6b7280] hover:bg-[#e5e7eb]'
            } transition-colors`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
