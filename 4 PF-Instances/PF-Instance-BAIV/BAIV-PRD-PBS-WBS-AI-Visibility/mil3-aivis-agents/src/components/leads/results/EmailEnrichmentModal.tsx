import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Checkbox } from '../../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Label } from '../../ui/label';
import { Card } from '../../ui/card';
import { Loader2, Search } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EmailEnrichmentModalProps {
  lead: any;
  onClose: () => void;
}

export function EmailEnrichmentModal({ lead, onClose }: EmailEnrichmentModalProps) {
  const [method, setMethod] = useState<'hunter' | 'manual'>('hunter');
  const [manualEmail, setManualEmail] = useState('');
  const [markVerified, setMarkVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');

  const currentCredits = 247;

  const handleEnrich = async () => {
    if (method === 'manual' && !manualEmail) {
      toast.error('Please enter an email address');
      return;
    }

    setIsLoading(true);
    
    if (method === 'hunter') {
      setLoadingStep('Searching Hunter.io database...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLoadingStep('Verifying email addresses...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLoadingStep('Saving results...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Found 3 verified emails!');
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Email added successfully!');
    }

    setIsLoading(false);
    onClose();
  };

  if (isLoading) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-[600px]">
          <DialogTitle className="sr-only">Enriching Email</DialogTitle>
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-16 w-16 text-[#02a4bf] animate-spin mb-6" />
            <h3 className="text-[#231f20] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
              Finding Emails...
            </h3>
            <p className="text-[#6b7280] mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              {loadingStep}
            </p>
            <div className="flex flex-col gap-2 w-full max-w-sm">
              <div className={`flex items-center gap-2 transition-opacity ${loadingStep.includes('Searching') ? 'opacity-100' : 'opacity-50'}`}>
                <div className="w-2 h-2 rounded-full bg-[#02a4bf]" />
                <span className="text-sm text-[#6b7280]" style={{ fontFamily: 'Open Sans' }}>Searching Hunter.io database...</span>
              </div>
              <div className={`flex items-center gap-2 transition-opacity ${loadingStep.includes('Verifying') ? 'opacity-100' : 'opacity-50'}`}>
                <div className="w-2 h-2 rounded-full bg-[#02a4bf]" />
                <span className="text-sm text-[#6b7280]" style={{ fontFamily: 'Open Sans' }}>Verifying email addresses...</span>
              </div>
              <div className={`flex items-center gap-2 transition-opacity ${loadingStep.includes('Saving') ? 'opacity-100' : 'opacity-50'}`}>
                <div className="w-2 h-2 rounded-full bg-[#02a4bf]" />
                <span className="text-sm text-[#6b7280]" style={{ fontFamily: 'Open Sans' }}>Saving results...</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
            Enrich Email for {lead.full_name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Company Info Display */}
          <Card className="p-4 bg-[#f9fafb]">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Business Name:</span>
                <span style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>{lead.organization_name}</span>
              </div>
              {lead.domain && (
                <div className="flex justify-between">
                  <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Domain:</span>
                  <span style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>{lead.domain}</span>
                </div>
              )}
              {lead.phone && (
                <div className="flex justify-between">
                  <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Phone:</span>
                  <span style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>{lead.phone}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Method Selection */}
          <RadioGroup value={method} onValueChange={(v: any) => setMethod(v)}>
            <div className="space-y-4">
              {/* Hunter.io Option */}
              <div className="flex items-start gap-3">
                <RadioGroupItem value="hunter" id="hunter" className="mt-1" />
                <div className="flex-1">
                  <Label 
                    htmlFor="hunter" 
                    className="text-[#231f20] cursor-pointer"
                    style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '15px' }}
                  >
                    Use Hunter.io to find verified emails
                  </Label>
                  <p className="text-[#6b7280] text-sm mt-1" style={{ fontFamily: 'Open Sans' }}>
                    This will use 1 Hunter credit • Estimated results: ~2-5 emails
                  </p>
                </div>
              </div>

              {/* Manual Option */}
              <div className="flex items-start gap-3">
                <RadioGroupItem value="manual" id="manual" className="mt-1" />
                <div className="flex-1">
                  <Label 
                    htmlFor="manual" 
                    className="text-[#231f20] cursor-pointer"
                    style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '15px' }}
                  >
                    Enter email manually
                  </Label>
                  {method === 'manual' && (
                    <div className="mt-3 space-y-3">
                      <Input
                        type="email"
                        placeholder="email@company.com"
                        value={manualEmail}
                        onChange={(e) => setManualEmail(e.target.value)}
                        style={{ fontFamily: 'Open Sans' }}
                      />
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="verified"
                          checked={markVerified}
                          onCheckedChange={(checked: boolean) => setMarkVerified(checked)}
                        />
                        <Label 
                          htmlFor="verified" 
                          className="text-[#6b7280] cursor-pointer"
                          style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                        >
                          Mark as verified
                        </Label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </RadioGroup>

          {/* Preview Section */}
          {method === 'hunter' && (
            <Card className="p-4 bg-[#f0fdff] border-[#02a4bf]/20">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#005260]" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                    Current Hunter credits:
                  </span>
                  <span className="text-[#02a4bf]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '14px' }}>
                    {currentCredits}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#005260]" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                    Credits remaining after:
                  </span>
                  <span className="text-[#02a4bf]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '14px' }}>
                    {currentCredits - 1}
                  </span>
                </div>
              </div>
            </Card>
          )}
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
            onClick={handleEnrich}
            className="bg-[#02a4bf] hover:bg-[#028a9f] text-white h-12 px-8"
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
          >
            <Search className="h-4 w-4 mr-2" />
            {method === 'hunter' ? 'Find Emails' : 'Add Email'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
