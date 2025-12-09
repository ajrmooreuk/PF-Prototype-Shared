import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Checkbox } from '../../ui/checkbox';
import { Skeleton } from '../../ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { MoreVertical, Mail, Phone, Target, Eye, UserPlus, Edit2, Trash2 } from 'lucide-react';

interface GridViewProps {
  leads: any[];
  selectedLeads: string[];
  onSelectLead: (id: string) => void;
  onViewDetail: (lead: any) => void;
  onEnrichEmail: (lead: any) => void;
  onAddToQueue: (lead: any) => void;
  isLoading: boolean;
  campaignType: 'hunter_io' | 'google_maps' | 'linkedin';
}

export function GridView({
  leads,
  selectedLeads,
  onSelectLead,
  onViewDetail,
  onEnrichEmail,
  onAddToQueue,
  isLoading,
  campaignType
}: GridViewProps) {
  const getICPColor = (score: number) => {
    if (score >= 80) return 'text-[#059669]';
    if (score >= 50) return 'text-[#d97706]';
    return 'text-[#6b7280]';
  };

  const getSourceBadge = (source: string) => {
    const badges: any = {
      hunter_io: { icon: '🎯', label: 'Hunter.io', bg: 'bg-[#FFF4ED]', text: 'text-[#FF6B35]' },
      google_maps: { icon: '📍', label: 'Google Maps', bg: 'bg-[#FDEDED]', text: 'text-[#EA4335]' },
      linkedin: { icon: '💼', label: 'LinkedIn', bg: 'bg-[#E8F4F9]', text: 'text-[#0077B5]' }
    };
    return badges[source] || badges.hunter_io;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="p-5">
            <Skeleton className="w-full h-40" />
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {leads.map((lead) => {
        const sourceBadge = getSourceBadge(lead.source);

        return (
          <Card
            key={lead.id}
            className="p-5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            onClick={() => onViewDetail(lead)}
          >
            {/* Header Row */}
            <div className="flex items-center justify-between mb-4">
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedLeads.includes(lead.id)}
                  onCheckedChange={() => onSelectLead(lead.id)}
                />
              </div>
              <Badge className={`${sourceBadge.bg} ${sourceBadge.text} border-0 px-3 py-1`}>
                <span className="mr-1">{sourceBadge.icon}</span>
                {sourceBadge.label}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <button className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-[#f3f4f6] transition-colors">
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

            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#02a4bf] to-[#005260] flex items-center justify-center text-white mb-3" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}>
                {lead.full_name?.charAt(0) || 'A'}
              </div>
              <div className="text-center">
                <h3 className="text-[#005260] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px' }}>
                  {lead.full_name}
                </h3>
                <p className="text-[#6b7280] text-sm mb-1" style={{ fontFamily: 'Open Sans' }}>
                  {campaignType === 'linkedin' ? lead.headline : lead.title}
                </p>
                {campaignType !== 'linkedin' && (
                  <p className="text-[#9ca3af] text-xs" style={{ fontFamily: 'Open Sans' }}>
                    {lead.organization_name}
                  </p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#e5e7eb] mb-4" />

            {/* Info Rows */}
            <div className="space-y-3 mb-4">
              {campaignType === 'linkedin' ? (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-[#9ca3af]" />
                  <a 
                    href={lead.linkedin_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#02a4bf] hover:underline truncate"
                    style={{ fontFamily: 'Open Sans' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View LinkedIn Profile
                  </a>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-[#9ca3af]" />
                    <span className="text-[#231f20] truncate flex-1" style={{ fontFamily: 'Open Sans' }}>
                      {lead.email}
                    </span>
                    {lead.verified && (
                      <Badge className="bg-[#d1fae5] text-[#059669] border-0 px-2 py-0.5 text-xs">
                        ✓
                      </Badge>
                    )}
                  </div>
                  {lead.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-[#9ca3af]" />
                      <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans' }}>
                        {lead.phone}
                      </span>
                    </div>
                  )}
                </>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-[#9ca3af]" />
                <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans' }}>
                  ICP Score:
                </span>
                <span className={`${getICPColor(lead.icp_score)}`} style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                  {lead.icp_score}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <Button
                onClick={() => onViewDetail(lead)}
                variant="outline"
                className="flex-1 border-2 border-[#02a4bf] text-[#02a4bf] hover:bg-[#f0fdff] h-9"
                style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '13px' }}
              >
                <Eye className="h-3.5 w-3.5 mr-1.5" />
                View Details
              </Button>
              {campaignType === 'google_maps' && (
                <Button
                  onClick={() => onEnrichEmail(lead)}
                  className="flex-1 bg-[#02a4bf] hover:bg-[#028a9f] text-white h-9"
                  style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '13px' }}
                >
                  <Mail className="h-3.5 w-3.5 mr-1.5" />
                  Enrich
                </Button>
              )}
              {campaignType === 'linkedin' && (
                <Button
                  onClick={() => onAddToQueue(lead)}
                  className="flex-1 bg-[#02a4bf] hover:bg-[#028a9f] text-white h-9"
                  style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '13px' }}
                >
                  <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                  Add to Queue
                </Button>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
