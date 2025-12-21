import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowRight, MoreVertical, Eye, Edit2, Copy, Download, Trash2, ArrowUpDown } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface RecentCampaignsSectionProps {
  campaigns: any[];
  isLoading: boolean;
  onNavigate?: (page: string) => void;
}

export function RecentCampaignsSection({ campaigns, isLoading, onNavigate }: RecentCampaignsSectionProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getSourceIcon = (sourceType: string) => {
    const icons: { [key: string]: string } = {
      hunter_io: '🎯',
      google_maps: '📍',
      linkedin: '💼'
    };
    return icons[sourceType] || '📊';
  };

  const getSourceBadge = (sourceType: string) => {
    const badges: { [key: string]: { bg: string; text: string; label: string } } = {
      hunter_io: { bg: 'bg-[#f0fdff]', text: 'text-[#02a4bf]', label: 'Hunter.io' },
      google_maps: { bg: 'bg-[#d1fae5]', text: 'text-[#059669]', label: 'Google Maps' },
      linkedin: { bg: 'bg-[#e8f4f9]', text: 'text-[#0077b5]', label: 'LinkedIn' }
    };
    return badges[sourceType] || badges.hunter_io;
  };

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: { bg: string; text: string; icon: string } } = {
      processing: { bg: 'bg-[#fef3c7]', text: 'text-[#d97706]', icon: '⟳' },
      completed: { bg: 'bg-[#d1fae5]', text: 'text-[#059669]', icon: '✓' },
      failed: { bg: 'bg-[#fee2e2]', text: 'text-[#dc2626]', icon: '✗' },
      queued: { bg: 'bg-[#e0e7ff]', text: 'text-[#4f46e5]', icon: '⏸' }
    };
    return badges[status] || badges.queued;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return `${Math.floor(diffMs / (1000 * 60))} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-5">
          <Skeleton className="w-48 h-7" />
          <Skeleton className="w-96 h-10" />
        </div>
        <Card className="rounded-xl overflow-hidden">
          <div className="space-y-0">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-[72px] px-6 flex items-center gap-4 border-b">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <Skeleton className="w-64 h-5" />
                <Skeleton className="w-24 h-6 rounded-full" />
                <Skeleton className="w-20 h-6 rounded-full" />
                <Skeleton className="w-16 h-8" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mb-8 mt-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '22px' }}>
          Recent Campaigns
        </h2>

        {/* Filter Tabs */}
        <div className="inline-flex gap-2 bg-[#f3f4f6] rounded-lg p-1">
          {['All', 'Hunter.io', 'Google Maps', 'LinkedIn'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter.toLowerCase().replace('.', '_').replace(' ', '_'))}
              className={`px-4 py-2 rounded-md transition-all duration-150 ${
                activeFilter === filter.toLowerCase().replace('.', '_').replace(' ', '_')
                  ? 'bg-white text-[#02a4bf] shadow-sm font-bold'
                  : 'bg-transparent text-[#6b7280] hover:bg-white/50'
              }`}
              style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns Table */}
      <Card className="rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="bg-[#f9fafb] border-b-2 border-[#e5e7eb] px-6 h-14 flex items-center text-xs text-[#6b7280] uppercase tracking-wider" style={{ fontFamily: 'Open Sans', fontWeight: 700 }}>
          <div className="flex-[35%] flex items-center gap-2 cursor-pointer hover:text-[#02a4bf]">
            Campaign Name
            <ArrowUpDown className="h-3 w-3" />
          </div>
          <div className="flex-[12%]">Source</div>
          <div className="flex-[12%]">Status</div>
          <div className="flex-[12%]">Results</div>
          <div className="flex-[15%] flex items-center gap-2 cursor-pointer hover:text-[#02a4bf]">
            Created
            <ArrowUpDown className="h-3 w-3" />
          </div>
          <div className="flex-[14%] text-right">Actions</div>
        </div>

        {/* Table Rows */}
        <div>
          {campaigns.slice(0, rowsPerPage).map((campaign, idx) => {
            const sourceBadge = getSourceBadge(campaign.source_type);
            const statusBadge = getStatusBadge(campaign.status);

            return (
              <div
                key={campaign.id}
                className="px-6 h-[72px] flex items-center border-b border-[#f3f4f6] hover:bg-[#f9fafb] transition-colors cursor-pointer"
              >
                {/* Campaign Name */}
                <div className="flex-[35%] flex items-center gap-3">
                  <div className={`w-10 h-10 ${sourceBadge.bg} rounded-lg flex items-center justify-center border-2 ${sourceBadge.text.replace('text-', 'border-')}`}>
                    <span className="text-xl">{getSourceIcon(campaign.source_type)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div 
                      className="text-[#231f20] truncate hover:text-[#02a4bf] hover:underline"
                      style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '15px' }}
                    >
                      {campaign.name}
                    </div>
                    <div className="text-[#9ca3af] text-xs truncate" style={{ fontFamily: 'Open Sans' }}>
                      ID: {campaign.id}
                    </div>
                  </div>
                </div>

                {/* Source */}
                <div className="flex-[12%]">
                  <Badge className={`${sourceBadge.bg} ${sourceBadge.text} border-0 flex items-center gap-1.5`}>
                    <span>{getSourceIcon(campaign.source_type)}</span>
                    <span>{sourceBadge.label}</span>
                  </Badge>
                </div>

                {/* Status */}
                <div className="flex-[12%]">
                  <Badge className={`${statusBadge.bg} ${statusBadge.text} border-0 flex items-center gap-1.5`}>
                    <span className={campaign.status === 'processing' ? 'animate-spin' : ''}>
                      {statusBadge.icon}
                    </span>
                    <span className="capitalize">{campaign.status}</span>
                  </Badge>
                </div>

                {/* Results */}
                <div className="flex-[12%]">
                  <div>
                    <div className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}>
                      {campaign.total_results}
                    </div>
                    <div className="text-[#6b7280] text-xs" style={{ fontFamily: 'Open Sans' }}>
                      leads found
                    </div>
                  </div>
                </div>

                {/* Created */}
                <div className="flex-[15%]">
                  <div>
                    <div className="text-[#231f20]" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                      {formatDate(campaign.created_at)}
                    </div>
                    <div className="text-[#9ca3af] text-xs" style={{ fontFamily: 'Open Sans' }}>
                      {formatTime(campaign.created_at)}
                    </div>
                    <div className="text-[#6b7280] text-xs" style={{ fontFamily: 'Open Sans' }}>
                      {getRelativeTime(campaign.created_at)}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex-[14%] flex items-center justify-end gap-2">
                  <Button 
                    size="sm"
                    onClick={() => onNavigate?.('campaign-results')}
                    className="bg-[#02a4bf] hover:bg-[#028a9f] text-white shadow-sm h-9 px-5"
                    style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '13px' }}
                  >
                    View
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] hover:border-[#02a4bf] transition-colors">
                        <MoreVertical className="h-4 w-4 text-[#6b7280]" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-3" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit2 className="h-4 w-4 mr-3" />
                        Edit Campaign
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-3" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-3" />
                        Export Results
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-[#ef4444]">
                        <Trash2 className="h-4 w-4 mr-3" />
                        Delete Campaign
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })}
        </div>

        {/* Table Footer - Pagination */}
        <div className="bg-[#f9fafb] border-t border-[#e5e7eb] px-6 h-16 flex items-center justify-between">
          <div className="text-[#6b7280] text-sm" style={{ fontFamily: 'Open Sans' }}>
            Showing 1-{Math.min(rowsPerPage, campaigns.length)} of {campaigns.length} campaigns
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[#6b7280] text-sm" style={{ fontFamily: 'Open Sans' }}>
                Rows per page:
              </span>
              <Select value={rowsPerPage.toString()} onValueChange={(v) => setRowsPerPage(Number(v))}>
                <SelectTrigger className="w-20 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                className="h-9 px-4"
              >
                ← Previous
              </Button>

              <div className="flex gap-1">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-md text-sm transition-all ${
                      currentPage === page
                        ? 'bg-[#02a4bf] text-white shadow-sm font-bold'
                        : 'bg-white border border-[#e5e7eb] text-[#6b7280] hover:bg-[#f9fafb] hover:border-[#02a4bf]'
                    }`}
                    style={{ fontFamily: 'Open Sans' }}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4"
              >
                Next →
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
