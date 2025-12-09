import { useState } from 'react';
import { Card } from '../../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { LayoutGrid, List, Table2, Search } from 'lucide-react';

interface FilterBarProps {
  viewMode: 'table' | 'grid' | 'list';
  onViewModeChange: (mode: 'table' | 'grid' | 'list') => void;
  filters: {
    source: string;
    icpScore: string;
    status: string;
    search: string;
    sort: string;
  };
  onFiltersChange: (filters: any) => void;
  totalResults: number;
  campaignType: 'hunter_io' | 'google_maps' | 'linkedin';
}

export function FilterBar({ 
  viewMode, 
  onViewModeChange, 
  filters, 
  onFiltersChange, 
  totalResults,
  campaignType 
}: FilterBarProps) {
  const viewButtons = [
    { mode: 'table' as const, icon: Table2, label: 'Table' },
    { mode: 'grid' as const, icon: LayoutGrid, label: 'Grid' },
    { mode: 'list' as const, icon: List, label: 'List' }
  ];

  return (
    <Card className="p-5 mb-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side Filters */}
        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <div className="flex gap-2">
            {viewButtons.map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  viewMode === mode
                    ? 'bg-[#02a4bf] text-white shadow-md'
                    : 'bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb]'
                }`}
                title={label}
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>

          {/* Source Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
              Source:
            </span>
            <Select value={filters.source} onValueChange={(v) => onFiltersChange({ ...filters, source: v })}>
              <SelectTrigger className="w-[180px] h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="hunter_io">🎯 Hunter.io</SelectItem>
                <SelectItem value="google_maps">📍 Google Maps</SelectItem>
                <SelectItem value="linkedin">💼 LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ICP Score Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
              ICP Score:
            </span>
            <Select value={filters.icpScore} onValueChange={(v) => onFiltersChange({ ...filters, icpScore: v })}>
              <SelectTrigger className="w-[180px] h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Scores</SelectItem>
                <SelectItem value="high">High (80+)</SelectItem>
                <SelectItem value="medium">Medium (50-79)</SelectItem>
                <SelectItem value="low">Low (&lt;50)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          {campaignType !== 'linkedin' && (
            <div className="flex items-center gap-2">
              <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                Status:
              </span>
              <Select value={filters.status} onValueChange={(v) => onFiltersChange({ ...filters, status: v })}>
                <SelectTrigger className="w-[180px] h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Connection Status Filter for LinkedIn */}
          {campaignType === 'linkedin' && (
            <div className="flex items-center gap-2">
              <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                Status:
              </span>
              <Select value={filters.status} onValueChange={(v) => onFiltersChange({ ...filters, status: v })}>
                <SelectTrigger className="w-[180px] h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="not_connected">Not Connected</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="connected">Connected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ca3af]" />
            <input
              type="text"
              placeholder="Search leads..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="w-[300px] h-10 pl-10 pr-4 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02a4bf] focus:border-transparent"
              style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <Select value={filters.sort} onValueChange={(v) => onFiltersChange({ ...filters, sort: v })}>
              <SelectTrigger className="w-[160px] h-10">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="icp_desc">Highest ICP</SelectItem>
                <SelectItem value="icp_asc">Lowest ICP</SelectItem>
                <SelectItem value="name_asc">Name A-Z</SelectItem>
                <SelectItem value="name_desc">Name Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            Showing {totalResults} results
          </div>
        </div>
      </div>
    </Card>
  );
}
