import { Dialog, DialogContent, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Textarea } from '../../ui/textarea';
import { Card } from '../../ui/card';
import { X, Mail, Phone, MapPin, Building2, Globe, UserPlus, Archive } from 'lucide-react';
import { Progress } from '../../ui/progress';

interface LeadDetailModalProps {
  lead: any;
  onClose: () => void;
  onAddToQueue: () => void;
  onEnrichEmail: () => void;
  campaignType: 'hunter_io' | 'google_maps' | 'linkedin';
}

export function LeadDetailModal({ lead, onClose, onAddToQueue, onEnrichEmail, campaignType }: LeadDetailModalProps) {
  const icpBreakdown = {
    industry_match: 90,
    title_relevance: 85,
    company_size: 80,
    location_fit: 75
  };

  const getICPColor = (score: number) => {
    if (score >= 80) return 'text-[#059669]';
    if (score >= 50) return 'text-[#d97706]';
    return 'text-[#6b7280]';
  };

  const engagementHistory = [
    { action: 'Lead added', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    { action: 'Email verified', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
  ];

  if (campaignType === 'linkedin') {
    engagementHistory.push({ action: 'Connection sent', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000) });
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] max-h-[80vh] p-0 gap-0">
        <DialogTitle className="sr-only">{lead.full_name} - Lead Details</DialogTitle>
        {/* Header */}
        <div className="bg-[#02a4bf] text-white p-6 rounded-t-lg">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
              {lead.full_name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1">
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
                {lead.full_name}
              </h2>
              <p style={{ fontFamily: 'Open Sans', fontSize: '16px', opacity: 0.9 }}>
                {campaignType === 'linkedin' ? lead.headline : `${lead.title || 'Contact'} at ${lead.organization_name}`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-200px)]">
          {/* Contact Information */}
          <Card className="p-4 mb-4">
            <h3 className="text-[#005260] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
              Contact Information
            </h3>
            <div className="space-y-3">
              {campaignType !== 'linkedin' && (
                <>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#6b7280]" />
                    <div className="flex-1">
                      <div className="text-sm text-[#6b7280]" style={{ fontFamily: 'Open Sans' }}>Email</div>
                      <div className="flex items-center gap-2">
                        <div style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>{lead.email}</div>
                        {lead.verified && (
                          <Badge className="bg-[#d1fae5] text-[#059669] border-0 px-2 py-0.5 text-xs">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  {lead.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-[#6b7280]" />
                      <div className="flex-1">
                        <div className="text-sm text-[#6b7280]" style={{ fontFamily: 'Open Sans' }}>Phone</div>
                        <div style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>{lead.phone}</div>
                      </div>
                    </div>
                  )}
                </>
              )}
              {campaignType === 'linkedin' && (
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-[#6b7280]" />
                  <div className="flex-1">
                    <div className="text-sm text-[#6b7280]" style={{ fontFamily: 'Open Sans' }}>LinkedIn Profile</div>
                    <a 
                      href={lead.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#02a4bf] hover:underline"
                      style={{ fontFamily: 'Open Sans', fontWeight: 500 }}
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Company Details */}
          {campaignType !== 'linkedin' && (
            <Card className="p-4 mb-4">
              <h3 className="text-[#005260] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
                Company Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-[#6b7280]" />
                  <div className="flex-1">
                    <div className="text-sm text-[#6b7280]" style={{ fontFamily: 'Open Sans' }}>Company</div>
                    <div style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>{lead.organization_name}</div>
                  </div>
                </div>
                {lead.domain && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-[#6b7280]" />
                    <div className="flex-1">
                      <div className="text-sm text-[#6b7280]" style={{ fontFamily: 'Open Sans' }}>Domain</div>
                      <a 
                        href={`https://${lead.domain}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#02a4bf] hover:underline"
                        style={{ fontFamily: 'Open Sans', fontWeight: 500 }}
                      >
                        {lead.domain}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* ICP Analysis */}
          <Card className="p-4 mb-4 bg-[#E6F7F9] border-[#02a4bf]/20">
            <h3 className="text-[#005260] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
              ICP Analysis
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className={`${getICPColor(lead.icp_score)}`} style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '48px' }}>
                {lead.icp_score}
              </div>
              <div className="flex-1">
                <div className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                  Overall ICP Score
                </div>
                <div className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                  {lead.icp_score >= 80 ? 'Excellent match' : lead.icp_score >= 50 ? 'Good match' : 'Fair match'}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {Object.entries(icpBreakdown).map(([key, score]) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#005260] text-sm capitalize" style={{ fontFamily: 'Open Sans' }}>
                      {key.replace('_', ' ')}
                    </span>
                    <span className={`${getICPColor(score)}`} style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '14px' }}>
                      {score}/100
                    </span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          {/* Engagement History */}
          <Card className="p-4 mb-4">
            <h3 className="text-[#005260] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
              Engagement History
            </h3>
            <div className="space-y-3">
              {engagementHistory.map((event, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#02a4bf] mt-2" />
                  <div className="flex-1">
                    <div style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                      {event.action}
                    </div>
                    <div className="text-[#6b7280] text-xs" style={{ fontFamily: 'Open Sans' }}>
                      {event.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {event.timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-4">
            <h3 className="text-[#005260] mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
              Notes
            </h3>
            <Textarea
              placeholder="Add notes about this lead..."
              className="min-h-[100px] mb-3"
              style={{ fontFamily: 'Open Sans' }}
            />
            <Button
              variant="outline"
              className="border-[#02a4bf] text-[#02a4bf] hover:bg-[#f0fdff]"
              style={{ fontFamily: 'Open Sans', fontWeight: 500 }}
            >
              Save Notes
            </Button>
          </Card>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-[#f9fafb]">
          <Button
            variant="outline"
            className="text-[#6b7280] border-[#e5e7eb]"
            style={{ fontFamily: 'Open Sans', fontWeight: 500 }}
          >
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </Button>
          <div className="flex gap-3">
            {campaignType === 'google_maps' && (
              <Button
                onClick={onEnrichEmail}
                className="bg-[#02a4bf] hover:bg-[#028a9f] text-white"
                style={{ fontFamily: 'Poppins', fontWeight: 500 }}
              >
                <Mail className="h-4 w-4 mr-2" />
                Enrich Email
              </Button>
            )}
            {campaignType === 'linkedin' && (
              <Button
                onClick={onAddToQueue}
                className="bg-[#02a4bf] hover:bg-[#028a9f] text-white"
                style={{ fontFamily: 'Poppins', fontWeight: 500 }}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add to Queue
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
