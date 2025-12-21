import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Checkbox } from '../../ui/checkbox';
import { Skeleton } from '../../ui/skeleton';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../../ui/dropdown-menu';
import { ArrowUpDown, Eye, Edit2, Download, Trash2, MoreVertical, Mail, UserPlus } from 'lucide-react';

interface TableViewProps {
  leads: any[];
  selectedLeads: string[];
  onSelectLead: (id: string) => void;
  onSelectAll: () => void;
  onViewDetail: (lead: any) => void;
  onEnrichEmail: (lead: any) => void;
  onAddToQueue: (lead: any) => void;
  isLoading: boolean;
  campaignType: 'hunter_io' | 'google_maps' | 'linkedin';
}

export function TableView({
  leads,
  selectedLeads,
  onSelectLead,
  onSelectAll,
  onViewDetail,
  onEnrichEmail,
  onAddToQueue,
  isLoading,
  campaignType
}: TableViewProps) {
  const getICPColor = (score: number) => {
    if (score >= 80) return 'text-[#059669]';
    if (score >= 50) return 'text-[#d97706]';
    return 'text-[#6b7280]';
  };

  const getICPDotColor = (score: number) => {
    if (score >= 80) return 'bg-[#059669]';
    if (score >= 50) return 'bg-[#d97706]';
    return 'bg-[#6b7280]';
  };

  const getSourceBadge = (source: string) => {
    const badges: any = {
      hunter_io: { icon: '🎯', label: 'Hunter', bg: 'bg-[#FFF4ED]', text: 'text-[#FF6B35]' },
      google_maps: { icon: '📍', label: 'Maps', bg: 'bg-[#FDEDED]', text: 'text-[#EA4335]' },
      linkedin: { icon: '💼', label: 'LinkedIn', bg: 'bg-[#E8F4F9]', text: 'text-[#0077B5]' }
    };
    return badges[source] || badges.hunter_io;
  };

  const getStatusBadge = (status: string) => {
    const badges: any = {
      new: { label: 'New', bg: 'bg-[#e0e7ff]', text: 'text-[#4f46e5]' },
      contacted: { label: 'Contacted', bg: 'bg-[#fef3c7]', text: 'text-[#d97706]' },
      replied: { label: 'Replied', bg: 'bg-[#d1fae5]', text: 'text-[#059669]' },
      archived: { label: 'Archived', bg: 'bg-[#f3f4f6]', text: 'text-[#6b7280]' },
      not_connected: { label: 'Not Connected', bg: 'bg-[#f3f4f6]', text: 'text-[#6b7280]' },
      pending: { label: 'Pending', bg: 'bg-[#fef3c7]', text: 'text-[#d97706]' },
      connected: { label: 'Connected', bg: 'bg-[#d1fae5]', text: 'text-[#059669]' }
    };
    return badges[status] || badges.new;
  };

  if (isLoading) {
    return (
      <Card className="rounded-xl overflow-hidden">
        <div className="space-y-0">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-14 px-5 flex items-center gap-4 border-b">
              <Skeleton className="w-5 h-5" />
              <Skeleton className="w-64 h-5" />
              <Skeleton className="w-32 h-5" />
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-16 h-8" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (leads.length === 0) {
    return (
      <Card className="rounded-xl p-20 text-center">
        <div className="flex flex-col items-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-[#231f20] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
            No Leads Found
          </h3>
          <p className="text-[#6b7280] mb-6" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
            Try adjusting your filters or run a new campaign
          </p>
          <Button className="bg-[#02a4bf] hover:bg-[#028a9f] text-white" style={{ height: '48px' }}>
            New Campaign
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl overflow-hidden">
      {/* Table Header */}
      <div className="bg-[#f9fafb] border-b-2 border-[#e5e7eb] px-5 h-12 flex items-center text-xs text-[#6b7280] uppercase tracking-wider" style={{ fontFamily: 'Open Sans', fontWeight: 700 }}>
        <div className="w-10 flex items-center">
          <Checkbox
            checked={selectedLeads.length === leads.length && leads.length > 0}
            onCheckedChange={onSelectAll}
          />
        </div>
        <div className="flex-[30%] flex items-center gap-2 cursor-pointer hover:text-[#02a4bf]">
          {campaignType === 'linkedin' ? 'Name / Headline' : 'Name / Company'}
          <ArrowUpDown className="h-3 w-3" />
        </div>
        <div className="flex-[25%]">{campaignType === 'linkedin' ? 'Profile URL' : 'Email'}</div>
        {campaignType !== 'linkedin' && <div className="flex-[15%]">Phone</div>}
        <div className="flex-[10%]">Source</div>
        <div className="flex-[10%] flex items-center gap-2 cursor-pointer hover:text-[#02a4bf]">
          ICP Score
          <ArrowUpDown className="h-3 w-3" />
        </div>
        <div className="flex-[10%] text-right">Actions</div>
      </div>

      {/* Table Body */}
      <div>
        {leads.map((lead) => {
          const sourceBadge = getSourceBadge(lead.source);
          const statusBadge = getStatusBadge(lead.status || lead.connection_status);

          return (
            <div
              key={lead.id}
              className="px-5 h-14 flex items-center border-b border-[#f3f4f6] hover:bg-[#f9fafb] transition-colors cursor-pointer"
              onClick={() => onViewDetail(lead)}
            >
              {/* Checkbox */}
              <div className="w-10 flex items-center" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedLeads.includes(lead.id)}
                  onCheckedChange={() => onSelectLead(lead.id)}
                />
              </div>

              {/* Name/Company */}
              <div className="flex-[30%] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#02a4bf] to-[#005260] flex items-center justify-center text-white" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '14px' }}>
                  {lead.full_name?.charAt(0) || 'A'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[#231f20] truncate hover:text-[#02a4bf]" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}>
                    {lead.full_name}
                  </div>
                  <div className="text-[#9ca3af] text-xs truncate" style={{ fontFamily: 'Open Sans' }}>
                    {campaignType === 'linkedin' ? lead.headline : (lead.title ? `${lead.title} • ${lead.organization_name}` : lead.organization_name)}
                  </div>
                </div>
              </div>

              {/* Email/Profile URL */}
              <div className="flex-[25%]">
                {campaignType === 'linkedin' ? (
                  <a 
                    href={lead.linkedin_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#02a4bf] hover:underline text-sm truncate block"
                    style={{ fontFamily: 'Open Sans' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Profile
                  </a>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-[#231f20] text-sm truncate" style={{ fontFamily: 'Open Sans' }}>
                      {lead.email}
                    </span>
                    {lead.verified && (
                      <Badge className="bg-[#d1fae5] text-[#059669] border-0 px-2 py-0.5 text-xs">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Phone */}
              {campaignType !== 'linkedin' && (
                <div className="flex-[15%] text-[#6b7280] text-sm" style={{ fontFamily: 'Open Sans' }}>
                  {lead.phone || '—'}
                </div>
              )}

              {/* Source */}
              <div className="flex-[10%]">
                <Badge className={`${sourceBadge.bg} ${sourceBadge.text} border-0 px-2 py-1 text-xs`}>
                  <span className="mr-1">{sourceBadge.icon}</span>
                  {sourceBadge.label}
                </Badge>
              </div>

              {/* ICP Score */}
              <div className="flex-[10%]">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getICPDotColor(lead.icp_score)}`} />
                  <span className={`${getICPColor(lead.icp_score)}`} style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px' }}>
                    {lead.icp_score}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex-[10%] flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                <Button
                  size="sm"
                  onClick={() => onViewDetail(lead)}
                  className="bg-[#02a4bf] hover:bg-[#028a9f] text-white h-8 px-4"
                  style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '12px' }}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] hover:border-[#02a4bf] transition-colors">
                      <MoreVertical className="h-4 w-4 text-[#6b7280]" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => onViewDetail(lead)}>
                      <Eye className="h-4 w-4 mr-3" />
                      View Details
                    </DropdownMenuItem>
                    {campaignType === 'google_maps' && (
                      <DropdownMenuItem onClick={() => onEnrichEmail(lead)}>
                        <Mail className="h-4 w-4 mr-3" />
                        Enrich Email
                      </DropdownMenuItem>
                    )}
                    {campaignType === 'linkedin' && (
                      <DropdownMenuItem onClick={() => onAddToQueue(lead)}>
                        <UserPlus className="h-4 w-4 mr-3" />
                        Add to Queue
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                      <Edit2 className="h-4 w-4 mr-3" />
                      Mark Contacted
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-[#ef4444]">
                      <Trash2 className="h-4 w-4 mr-3" />
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="bg-[#f9fafb] border-t border-[#e5e7eb] px-5 h-14 flex items-center justify-center gap-4">
        <div className="text-[#6b7280] text-sm" style={{ fontFamily: 'Open Sans' }}>
          Page 1 of {Math.ceil(leads.length / 50)}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled className="h-8">
            ← Previous
          </Button>
          <button className="w-8 h-8 rounded-md bg-[#02a4bf] text-white text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 700 }}>
            1
          </button>
          <button className="w-8 h-8 rounded-md border border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-[#f9fafb] text-sm" style={{ fontFamily: 'Open Sans' }}>
            2
          </button>
          <button className="w-8 h-8 rounded-md border border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-[#f9fafb] text-sm" style={{ fontFamily: 'Open Sans' }}>
            3
          </button>
          <Button variant="outline" size="sm" className="h-8">
            Next →
          </Button>
        </div>
      </div>
    </Card>
  );
}
