import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Checkbox } from '../../ui/checkbox';
import { Label } from '../../ui/label';
import { Card } from '../../ui/card';
import { Download, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ExportModalProps {
  totalLeads: number;
  selectedOnly: boolean;
  selectedCount: number;
  onClose: () => void;
}

export function ExportModal({ totalLeads, selectedOnly, selectedCount, onClose }: ExportModalProps) {
  const [format, setFormat] = useState<'csv' | 'xlsx' | 'json' | 'sheets'>('csv');
  const [fields, setFields] = useState({
    name: true,
    email: true,
    phone: true,
    company: true,
    title: true,
    icp_score: true,
    source: true,
    address: false,
    linkedin_url: false
  });
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [selectedOnlyExport, setSelectedOnlyExport] = useState(selectedOnly);
  const [includeVerification, setIncludeVerification] = useState(true);

  const leadsToExport = selectedOnlyExport ? selectedCount : totalLeads;
  const estimatedSize = Math.round((leadsToExport * 0.3) * 10) / 10; // Rough estimate

  const handleExport = () => {
    const selectedFields = Object.keys(fields).filter(key => fields[key as keyof typeof fields]);
    
    toast.success(`Exporting ${leadsToExport} leads as ${format.toUpperCase()}...`);
    
    // Simulate download
    setTimeout(() => {
      toast.success('Export complete!');
      onClose();
    }, 1500);
  };

  const toggleAllFields = () => {
    const allSelected = Object.values(fields).every(v => v);
    const newFields = Object.keys(fields).reduce((acc, key) => ({
      ...acc,
      [key]: !allSelected
    }), {} as typeof fields);
    setFields(newFields);
  };

  const allFieldsSelected = Object.values(fields).every(v => v);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
            Export Leads
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Format Selection */}
          <div>
            <h3 className="text-[#231f20] mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
              Export Format
            </h3>
            <RadioGroup value={format} onValueChange={(v: any) => setFormat(v)}>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <RadioGroupItem value="csv" id="csv" className="mt-1" />
                  <div>
                    <Label 
                      htmlFor="csv" 
                      className="text-[#231f20] cursor-pointer"
                      style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}
                    >
                      CSV Format
                    </Label>
                    <p className="text-[#6b7280] text-sm" style={{ fontFamily: 'Open Sans' }}>
                      Standard CSV file for Excel/Sheets
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <RadioGroupItem value="xlsx" id="xlsx" className="mt-1" />
                  <div>
                    <Label 
                      htmlFor="xlsx" 
                      className="text-[#231f20] cursor-pointer"
                      style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}
                    >
                      Excel Format (.xlsx)
                    </Label>
                    <p className="text-[#6b7280] text-sm" style={{ fontFamily: 'Open Sans' }}>
                      Excel workbook with formatting
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <RadioGroupItem value="json" id="json" className="mt-1" />
                  <div>
                    <Label 
                      htmlFor="json" 
                      className="text-[#231f20] cursor-pointer"
                      style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}
                    >
                      JSON Format
                    </Label>
                    <p className="text-[#6b7280] text-sm" style={{ fontFamily: 'Open Sans' }}>
                      For developers and integrations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <RadioGroupItem value="sheets" id="sheets" className="mt-1" />
                  <div>
                    <Label 
                      htmlFor="sheets" 
                      className="text-[#231f20] cursor-pointer"
                      style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}
                    >
                      Google Sheets
                    </Label>
                    <p className="text-[#6b7280] text-sm" style={{ fontFamily: 'Open Sans' }}>
                      Create new sheet in your Google Drive
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Field Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                Fields to Include
              </h3>
              <button
                onClick={toggleAllFields}
                className="text-[#02a4bf] hover:underline text-sm"
                style={{ fontFamily: 'Open Sans', fontWeight: 500 }}
              >
                {allFieldsSelected ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="name"
                  checked={fields.name}
                  onCheckedChange={(checked: boolean) => setFields({ ...fields, name: checked })}
                />
                <Label htmlFor="name" className="text-[#231f20] cursor-pointer" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  Name
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="email"
                  checked={fields.email}
                  onCheckedChange={(checked: boolean) => setFields({ ...fields, email: checked })}
                />
                <Label htmlFor="email" className="text-[#231f20] cursor-pointer" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  Email
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="phone"
                  checked={fields.phone}
                  onCheckedChange={(checked: boolean) => setFields({ ...fields, phone: checked })}
                />
                <Label htmlFor="phone" className="text-[#231f20] cursor-pointer" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  Phone
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="company"
                  checked={fields.company}
                  onCheckedChange={(checked: boolean) => setFields({ ...fields, company: checked })}
                />
                <Label htmlFor="company" className="text-[#231f20] cursor-pointer" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  Company
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="title"
                  checked={fields.title}
                  onCheckedChange={(checked: boolean) => setFields({ ...fields, title: checked })}
                />
                <Label htmlFor="title" className="text-[#231f20] cursor-pointer" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  Title
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="icp_score"
                  checked={fields.icp_score}
                  onCheckedChange={(checked: boolean) => setFields({ ...fields, icp_score: checked })}
                />
                <Label htmlFor="icp_score" className="text-[#231f20] cursor-pointer" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  ICP Score
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="source"
                  checked={fields.source}
                  onCheckedChange={(checked: boolean) => setFields({ ...fields, source: checked })}
                />
                <Label htmlFor="source" className="text-[#231f20] cursor-pointer" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  Source
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="address"
                  checked={fields.address}
                  onCheckedChange={(checked: boolean) => setFields({ ...fields, address: checked })}
                />
                <Label htmlFor="address" className="text-[#231f20] cursor-pointer" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  Address
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="linkedin_url"
                  checked={fields.linkedin_url}
                  onCheckedChange={(checked: boolean) => setFields({ ...fields, linkedin_url: checked })}
                />
                <Label htmlFor="linkedin_url" className="text-[#231f20] cursor-pointer" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  LinkedIn URL
                </Label>
              </div>
            </div>
          </div>

          {/* Options */}
          <div>
            <h3 className="text-[#231f20] mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
              Export Options
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="headers"
                  checked={includeHeaders}
                  onCheckedChange={(checked: boolean) => setIncludeHeaders(checked)}
                />
                <Label htmlFor="headers" className="text-[#231f20] cursor-pointer" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  Include column headers
                </Label>
              </div>
              {selectedCount > 0 && (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="selectedOnly"
                    checked={selectedOnlyExport}
                    onCheckedChange={(checked: boolean) => setSelectedOnlyExport(checked)}
                  />
                  <Label htmlFor="selectedOnly" className="text-[#231f20] cursor-pointer" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    Include only selected leads ({selectedCount})
                  </Label>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="verification"
                  checked={includeVerification}
                  onCheckedChange={(checked: boolean) => setIncludeVerification(checked)}
                />
                <Label htmlFor="verification" className="text-[#231f20] cursor-pointer" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  Include verification status
                </Label>
              </div>
            </div>
          </div>

          {/* Preview */}
          <Card className="p-4 bg-[#f0fdff] border-[#02a4bf]/20">
            <div className="flex items-start gap-3">
              <FileSpreadsheet className="h-5 w-5 text-[#02a4bf] mt-0.5" />
              <div className="flex-1">
                <div className="text-[#005260] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                  Exporting {leadsToExport} lead{leadsToExport > 1 ? 's' : ''}
                </div>
                <div className="text-[#6b7280] text-sm" style={{ fontFamily: 'Open Sans' }}>
                  Estimated file size: ~{estimatedSize} KB
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            style={{ fontFamily: 'Open Sans', fontWeight: 500 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            className="bg-[#02a4bf] hover:bg-[#028a9f] text-white h-11 px-8"
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
