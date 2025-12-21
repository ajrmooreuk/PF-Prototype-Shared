import { Users, CheckCircle, Target, Mail } from 'lucide-react';
import { Button } from '../ui/button';

interface StatsBarProps {
  totalLeads: number;
  totalContacts: number;
  enrichedCount: number;
  enrichedPercentage: number;
  highICPCount: number;
  syncedCount: number;
  onSyncClick: () => void;
}

export function StatsBar({
  totalLeads,
  totalContacts,
  enrichedCount,
  enrichedPercentage,
  highICPCount,
  syncedCount,
  onSyncClick,
}: StatsBarProps) {
  return (
    <div className="bg-white rounded-xl p-4 mb-5">
      <div className="grid grid-cols-4 gap-4">
        {/* Total Leads */}
        <div className="flex items-start gap-3">
          <div className="bg-[#e0f2f7] p-3 rounded-lg">
            <Users className="w-6 h-6 text-[#2990C6]" />
          </div>
          <div>
            <div className="text-[#1f2937]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', lineHeight: '1' }}>
              {totalLeads}
            </div>
            <div className="text-[#6b7280] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Companies Found
            </div>
            <div className="text-[#9ca3af]" style={{ fontSize: '12px' }}>
              {totalContacts} contacts
            </div>
          </div>
        </div>

        {/* Enriched */}
        <div className="flex items-start gap-3">
          <div className="bg-[#d1fae5] p-3 rounded-lg">
            <CheckCircle className="w-6 h-6 text-[#10b981]" />
          </div>
          <div>
            <div className="text-[#10b981]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', lineHeight: '1' }}>
              {enrichedCount}
            </div>
            <div className="text-[#6b7280] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Emails Found
            </div>
            <div className="text-[#9ca3af]" style={{ fontSize: '12px' }}>
              {enrichedPercentage}%
            </div>
          </div>
        </div>

        {/* ICP Match */}
        <div className="flex items-start gap-3">
          <div className="bg-[#dbeafe] p-3 rounded-lg">
            <Target className="w-6 h-6 text-[#3b82f6]" />
          </div>
          <div>
            <div className="text-[#3b82f6]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', lineHeight: '1' }}>
              {highICPCount}
            </div>
            <div className="text-[#6b7280] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              High ICP Score
            </div>
            <div className="text-[#9ca3af]" style={{ fontSize: '12px' }}>
              Score ≥ 70
            </div>
          </div>
        </div>

        {/* Email Status */}
        <div className="flex items-start gap-3">
          <div className="bg-[#e9d5ff] p-3 rounded-lg">
            <Mail className="w-6 h-6 text-[#a855f7]" />
          </div>
          <div className="flex-1">
            <div className="text-[#6b7280]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', lineHeight: '1' }}>
              {syncedCount}
            </div>
            <div className="text-[#6b7280] mt-1 mb-2" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Synced to Email
            </div>
            <Button
              onClick={onSyncClick}
              className="bg-[#2990C6] text-white hover:bg-[#2380b0] h-8 px-4"
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}
            >
              Sync Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
