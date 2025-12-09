import { Button } from '../../ui/button';
import { Download, UserPlus, Archive, X } from 'lucide-react';

interface BulkActionsBarProps {
  selectedCount: number;
  onAddToQueue: () => void;
  onExport: () => void;
  onArchive: () => void;
  onClear: () => void;
  campaignType: 'hunter_io' | 'google_maps' | 'linkedin';
}

export function BulkActionsBar({
  selectedCount,
  onAddToQueue,
  onExport,
  onArchive,
  onClear,
  campaignType
}: BulkActionsBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#005260] text-white shadow-2xl z-50 animate-in slide-in-from-bottom duration-300">
      <div className="max-w-[1440px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px' }}>
              {selectedCount} {selectedCount === 1 ? 'lead' : 'leads'} selected
            </div>
            <div className="h-6 w-px bg-white/30" />
            <div className="flex items-center gap-2">
              {campaignType === 'linkedin' && (
                <Button
                  onClick={onAddToQueue}
                  className="bg-white text-[#005260] hover:bg-[#f0fdff] h-10"
                  style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add to Queue
                </Button>
              )}
              <Button
                onClick={onExport}
                className="bg-white text-[#005260] hover:bg-[#f0fdff] h-10"
                style={{ fontFamily: 'Poppins', fontWeight: 500 }}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button
                onClick={onArchive}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 h-10"
                style={{ fontFamily: 'Poppins', fontWeight: 500 }}
              >
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
            </div>
          </div>
          <Button
            onClick={onClear}
            variant="ghost"
            className="text-white hover:bg-white/10 h-10"
            style={{ fontFamily: 'Open Sans', fontWeight: 500 }}
          >
            <X className="h-4 w-4 mr-2" />
            Clear Selection
          </Button>
        </div>
      </div>
    </div>
  );
}
