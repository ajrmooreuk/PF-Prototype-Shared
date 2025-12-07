import { Sparkles, Mail, Linkedin, Download } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface ActionBarProps {
  totalCompanies: number;
  totalContacts: number;
  onSmartSync: () => void;
  onLinkedInQueue: () => void;
  onExport: (format: 'csv' | 'excel' | 'sheets') => void;
}

export function ActionBar({
  totalCompanies,
  totalContacts,
  onSmartSync,
  onLinkedInQueue,
  onExport,
}: ActionBarProps) {
  return (
    <div className="bg-white rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="text-[#1f2937]" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}>
          Viewing {totalCompanies} companies, {totalContacts} contacts
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Smart Sync Button */}
          <div className="relative">
            <Button
              onClick={onSmartSync}
              className="bg-[#2990C6] text-white hover:bg-[#2380b0] h-11 px-6 gap-2"
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', width: '160px' }}
            >
              <Sparkles className="w-5 h-5" />
              <Mail className="w-5 h-5" />
              Smart Sync
            </Button>
            <div 
              className="absolute -top-1 -right-1 bg-[#f59e0b] text-white px-1.5 py-0.5 rounded-full text-[10px]"
              style={{ fontFamily: 'Poppins', fontWeight: 600 }}
            >
              ICP
            </div>
          </div>

          {/* LinkedIn Queue Button */}
          <Button
            onClick={onLinkedInQueue}
            variant="outline"
            className="border-[#2990C6] text-[#2990C6] hover:bg-[#e0f2f7] h-11 px-6 gap-2"
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', width: '180px' }}
          >
            <Linkedin className="w-5 h-5" />
            Add to Queue
          </Button>

          {/* Export Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-[#d1d5db] text-[#6b7280] hover:bg-[#f9fafb] h-11 px-6 gap-2"
                style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
              >
                <Download className="w-5 h-5" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onExport('csv')}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('excel')}>
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('sheets')}>
                Export to Google Sheets
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
