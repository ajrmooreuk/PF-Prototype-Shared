import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Checkbox } from '../../ui/checkbox';
import { Skeleton } from '../../ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { MoreVertical, Eye, Mail, UserPlus, Edit2, Trash2 } from 'lucide-react';

interface ListViewProps {
  leads: any[];
  selectedLeads: string[];
  onSelectLead: (id: string) => void;
  onViewDetail: (lead: any) => void;
  onEnrichEmail: (lead: any) => void;
  onAddToQueue: (lead: any) => void;
  isLoading: boolean;
  campaignType: 'hunter_io' | 'google_maps' | 'linkedin';
}

export function ListView({
  leads,
  selectedLeads,
  onSelectLead,
  onViewDetail,
  onEnrichEmail,
  onAddToQueue,
  isLoading,
  campaignType
}: ListViewProps) {
  const getICPColor = (score: number) => {
    if (score >= 80) return 'text-[#059669]';
    if (score >= 50) return 'text-[#d97706]';
    return 'text-[#6b7280]';
  };

  const getSourceBadge = (source: string) => {
    const badges: any = {
      hunter_io: { icon: '🎯', label: 'Hunter', bg: 'bg-[#FFF4ED]', text: 'text-[#FF6B35]' },
      google_maps: { icon: '📍', label: 'Maps', bg: 'bg-[#FDEDED]', text: 'text-[#EA4335]' },
      linkedin: { icon: '💼', label: 'LinkedIn', bg: 'bg-[#E8F4F9]', text: 'text-[#0077B5]' }
    };
    return badges[source] || badges.hunter_io;
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Card key={i} className="p-4">
            <Skeleton className="w-full h-16" />
          </Card>
        ))}
      </div>
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
          <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
            Try adjusting your filters or run a new campaign
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {leads.map((lead) => {
        const sourceBadge = getSourceBadge(lead.source);

        return (
          <Card
            key={lead.id}
            className="p-4 hover:bg-[#f9fafb] transition-colors cursor-pointer"
            onClick={() => onViewDetail(lead)}
          >
            <div className="flex items-center gap-4">
              {/* Checkbox */}
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedLeads.includes(lead.id)}
                  onCheckedChange={() => onSelectLead(lead.id)}
                />
              </div>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#02a4bf] to-[#005260] flex items-center justify-center text-white flex-shrink-0" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px' }}>
                {lead.full_name?.charAt(0) || 'A'}
              </div>

              {/* Info Section (60%) */}
              <div className="flex-[60%] min-w-0">
                <div className="text-[#231f20] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '14px' }}>
                  {lead.full_name}
                </div>
                <div className="text-[#6b7280] text-xs truncate mb-1" style={{ fontFamily: 'Open Sans' }}>
                  {campaignType === 'linkedin' 
                    ? lead.headline
                    : `${lead.title || 'Contact'} • ${lead.organization_name}`
                  }
                </div>
                {campaignType !== 'linkedin' && (
                  <div className="flex items-center gap-2 text-xs text-[#9ca3af]" style={{ fontFamily: 'Open Sans' }}>
                    <span className="truncate">{lead.email}</span>
                    {lead.verified && (
                      <Badge className="bg-[#d1fae5] text-[#059669] border-0 px-1.5 py-0 text-xs">
                        ✓
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Center Section (25%) */}
              <div className="flex-[25%] flex flex-col items-center gap-2">
                <Badge className={`${sourceBadge.bg} ${sourceBadge.text} border-0 px-2 py-1`}>
                  <span className="mr-1">{sourceBadge.icon}</span>
                  {sourceBadge.label}
                </Badge>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#6b7280]" style={{ fontFamily: 'Open Sans' }}>ICP:</span>
                  <span className={`${getICPColor(lead.icp_score)}`} style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}>
                    {lead.icp_score}
                  </span>
                </div>
              </div>

              {/* Right Section (15%) */}
              <div className="flex-[15%] flex items-center justify-end gap-2">
                {campaignType !== 'linkedin' && lead.phone && (
                  <div className="text-[#6b7280] text-sm text-right" style={{ fontFamily: 'Open Sans' }}>
                    {lead.phone}
                  </div>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <button className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-white border border-transparent hover:border-[#e5e7eb] transition-colors">
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
          </Card>
        );
      })}
    </div>
  );
}
