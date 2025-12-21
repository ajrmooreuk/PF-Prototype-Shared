import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Target, Loader2, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { previewICPDistribution, syncWithICPRouting, type ICPDistribution, type SyncResult } from '../../lib/campaignAPI';

interface SmartSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId: string;
  tenantId: string;
  jwtToken: string;
}

type SyncState = 'setup' | 'syncing' | 'complete';

export function SmartSyncModal({
  isOpen,
  onClose,
  campaignId,
  tenantId,
  jwtToken,
}: SmartSyncModalProps) {
  const [connectionId, setConnectionId] = useState('conn_ml_001');
  const [distribution, setDistribution] = useState<ICPDistribution | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [syncState, setSyncState] = useState<SyncState>('setup');
  const [syncProgress, setSyncProgress] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('');
  const [syncResults, setSyncResults] = useState<SyncResult | null>(null);
  
  // Sync options
  const [storeCategory, setStoreCategory] = useState(true);
  const [markSubscribed, setMarkSubscribed] = useState(true);
  const [sendWelcome, setSendWelcome] = useState(false);

  // Load distribution preview
  useEffect(() => {
    if (isOpen && connectionId) {
      loadPreview();
    }
  }, [isOpen, connectionId]);

  const loadPreview = async () => {
    setIsLoadingPreview(true);
    try {
      const preview = await previewICPDistribution(campaignId, connectionId, {
        tenantId,
        jwtToken,
      });
      setDistribution(preview);
    } catch (error) {
      console.error('Failed to load preview:', error);
    } finally {
      setIsLoadingPreview(false);
    }
  };

  const handleSync = async () => {
    setSyncState('syncing');
    setSyncProgress(0);

    try {
      // Simulate progress for each category
      if (distribution) {
        const categories = Object.keys(distribution.categorized);
        const totalContacts = Object.values(distribution.categorized).reduce(
          (sum, cat) => sum + cat.contacts,
          0
        );
        let syncedSoFar = 0;

        for (let i = 0; i < categories.length; i++) {
          const category = categories[i];
          const categoryData = distribution.categorized[category];
          setCurrentCategory(categoryData.list_name);

          // Simulate syncing this category
          await new Promise(resolve => setTimeout(resolve, 1500));

          syncedSoFar += categoryData.contacts;
          setSyncProgress(Math.round((syncedSoFar / totalContacts) * 100));
        }
      }

      // Perform actual sync
      const result = await syncWithICPRouting(
        campaignId,
        connectionId,
        {
          store_category: storeCategory,
          status: markSubscribed ? 'subscribed' : 'unsubscribed',
          send_welcome: sendWelcome,
        },
        { tenantId, jwtToken }
      );

      setSyncResults(result);
      setSyncState('complete');

      // Auto-close after 3 seconds
      setTimeout(() => {
        onClose();
        resetModal();
      }, 3000);
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncState('setup');
    }
  };

  const resetModal = () => {
    setSyncState('setup');
    setSyncProgress(0);
    setCurrentCategory('');
    setSyncResults(null);
  };

  const handleClose = () => {
    if (syncState !== 'syncing') {
      onClose();
      setTimeout(resetModal, 300);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.8) return 'text-[#10b981]';
    if (confidence > 0.6) return 'text-[#fbbf24]';
    return 'text-[#f59e0b]';
  };

  const getCategoryLabel = (key: string) => {
    const labels: Record<string, string> = {
      orthopedics: 'Orthopedics',
      physical_therapy: 'Physical Therapy',
      chiropractic: 'Chiropractic',
      podiatry: 'Podiatry',
    };
    return labels[key] || key;
  };

  const totalReadyContacts = distribution
    ? Object.values(distribution.categorized).reduce((sum, cat) => sum + cat.contacts, 0)
    : 0;

  const totalReadyCompanies = distribution
    ? Object.values(distribution.categorized).reduce((sum, cat) => sum + cat.companies, 0)
    : 0;

  const avgConfidence = distribution
    ? Object.values(distribution.categorized).reduce((sum, cat) => sum + cat.avg_confidence, 0) /
      Object.keys(distribution.categorized).length
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[900px] max-h-[90vh] overflow-y-auto">
        {syncState === 'setup' && (
          <>
            <DialogHeader>
              <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
                Smart Sync to MailerLite
              </DialogTitle>
              <DialogDescription className="text-[#6b7280] mt-2" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                AI will automatically route leads to the correct email list based on ICP analysis
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              {/* Step 1: Select Connection */}
              <div>
                <label className="text-[#1f2937] mb-2 block" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                  Step 1: Select Connection
                </label>
                <Select value={connectionId} onValueChange={setConnectionId}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conn_ml_001">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#10b981] rounded-full" />
                        MailerLite (john@footscientific.com)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Step 2: ICP Distribution Preview */}
              <div>
                <label className="text-[#1f2937] mb-3 block" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                  Step 2: ICP Distribution Preview
                </label>

                <div className="border-2 border-[#dbeafe] bg-white rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-[#3b82f6]" />
                    <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
                      Intelligent Distribution Preview
                    </h3>
                  </div>

                  {isLoadingPreview ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-[#2990C6]" />
                      <span className="ml-2 text-[#6b7280]">Analyzing leads...</span>
                    </div>
                  ) : distribution ? (
                    <>
                      {/* Distribution Table */}
                      <div className="overflow-x-auto mb-4">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-[#f3f4f6]">
                              <th className="text-left py-2 px-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '13px' }}>
                                ICP Category
                              </th>
                              <th className="text-left py-2 px-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '13px' }}>
                                Leads
                              </th>
                              <th className="text-left py-2 px-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '13px' }}>
                                Contacts
                              </th>
                              <th className="text-left py-2 px-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '13px' }}>
                                MailerLite List
                              </th>
                              <th className="text-left py-2 px-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '13px' }}>
                                Confidence
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(distribution.categorized).map(([key, data]) => (
                              <tr key={key} className="border-t border-[#e5e7eb]">
                                <td className="py-2 px-3" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                                  {getCategoryLabel(key)}
                                </td>
                                <td className="py-2 px-3" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                                  {data.companies} companies
                                </td>
                                <td className="py-2 px-3" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                                  {data.contacts} contacts
                                </td>
                                <td className="py-2 px-3" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                                  {data.list_name}
                                </td>
                                <td className={`py-2 px-3 ${getConfidenceColor(data.avg_confidence)}`} style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                                  {Math.round(data.avg_confidence * 100)}% avg
                                </td>
                              </tr>
                            ))}
                            {distribution.uncategorized.companies > 0 && (
                              <tr className="border-t border-[#e5e7eb] bg-[#fffbeb]">
                                <td className="py-2 px-3" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                                  Uncategorized
                                </td>
                                <td className="py-2 px-3" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                                  {distribution.uncategorized.companies} companies
                                </td>
                                <td className="py-2 px-3" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                                  {distribution.uncategorized.contacts} contacts
                                </td>
                                <td className="py-2 px-3 text-[#f59e0b]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                                  ⚠️ Will not sync
                                </td>
                                <td className="py-2 px-3 text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                                  —
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Info Cards */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#f0fdf4] border border-[#86efac] rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-[#10b981] flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-[#1f2937] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                                Ready to Sync
                              </div>
                              <div className="text-[#6b7280] space-y-0.5" style={{ fontSize: '13px' }}>
                                <div>{totalReadyCompanies} companies ({totalReadyContacts} contacts)</div>
                                <div>Will sync to {Object.keys(distribution.categorized).length} different lists</div>
                                <div>Average confidence: {Math.round(avgConfidence * 100)}%</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {distribution.uncategorized.companies > 0 && (
                          <div className="bg-[#fffbeb] border border-[#fcd34d] rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="w-6 h-6 text-[#f59e0b] flex-shrink-0 mt-0.5" />
                              <div>
                                <div className="text-[#1f2937] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                                  Needs Review
                                </div>
                                <div className="text-[#6b7280] space-y-0.5" style={{ fontSize: '13px' }}>
                                  <div>{distribution.uncategorized.companies} companies ({distribution.uncategorized.contacts} contacts)</div>
                                  <div>No ICP category match</div>
                                  <a href="#" className="text-[#2990C6] hover:underline">
                                    View uncategorized leads →
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Step 3: Sync Options */}
              <div>
                <label className="text-[#1f2937] mb-3 block" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                  Step 3: Sync Options
                </label>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="store-category"
                      checked={storeCategory}
                      onCheckedChange={(checked) => setStoreCategory(checked as boolean)}
                    />
                    <label
                      htmlFor="store-category"
                      className="text-[#1f2937]"
                      style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                    >
                      Store ICP category in contact custom fields
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="mark-subscribed"
                      checked={markSubscribed}
                      onCheckedChange={(checked) => setMarkSubscribed(checked as boolean)}
                    />
                    <label
                      htmlFor="mark-subscribed"
                      className="text-[#1f2937]"
                      style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                    >
                      Mark contacts as 'subscribed' status
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="send-welcome"
                      checked={sendWelcome}
                      onCheckedChange={(checked) => setSendWelcome(checked as boolean)}
                    />
                    <label
                      htmlFor="send-welcome"
                      className="text-[#1f2937]"
                      style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                    >
                      Send welcome email (if enabled in MailerLite)
                    </label>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="h-11"
                  style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}
                >
                  Cancel
                </Button>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={loadPreview}
                    className="h-11"
                    style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}
                  >
                    Preview Distribution
                  </Button>
                  <Button
                    onClick={handleSync}
                    disabled={isLoadingPreview || !distribution}
                    className="bg-[#2990C6] text-white hover:bg-[#2380b0] h-12 px-6"
                    style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
                  >
                    Confirm Smart Sync
                    {distribution && (
                      <span className="ml-2 opacity-90">
                        ({totalReadyContacts} contacts to {Object.keys(distribution.categorized).length} lists)
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        {syncState === 'syncing' && (
          <>
            <DialogHeader className="sr-only">
              <DialogTitle>Syncing in Progress</DialogTitle>
              <DialogDescription>Your leads are being synced to MailerLite</DialogDescription>
            </DialogHeader>
            <div className="py-12 text-center">
              <Loader2 className="w-16 h-16 animate-spin text-[#2990C6] mx-auto mb-6" />
              <h3 className="text-[#1f2937] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
                Syncing...
              </h3>
              <p className="text-[#6b7280] mb-6" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
                Syncing {syncProgress}% complete
              </p>
              {currentCategory && (
                <p className="text-[#2990C6]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  Currently syncing to {currentCategory}...
                </p>
              )}
              <div className="w-full max-w-md mx-auto mt-6 bg-[#e5e7eb] rounded-full h-2">
                <div
                  className="bg-[#2990C6] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${syncProgress}%` }}
                />
              </div>
            </div>
          </>
        )}

        {syncState === 'complete' && syncResults && (
          <>
            <DialogHeader className="sr-only">
              <DialogTitle>Sync Complete</DialogTitle>
              <DialogDescription>Your leads have been successfully synced to MailerLite</DialogDescription>
            </DialogHeader>
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-[#d1fae5] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-[#10b981]" />
              </div>
              <h3 className="text-[#1f2937] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
                Smart Sync Complete!
              </h3>
              <p className="text-[#6b7280] mb-8" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
                {syncResults.total_synced} contacts successfully synced
              </p>

              <div className="max-w-md mx-auto text-left space-y-2 mb-8">
                {Object.entries(syncResults.distribution).map(([key, data]) => (
                  <div key={key} className="flex items-center gap-2 text-[#10b981]">
                    <CheckCircle className="w-4 h-4" />
                    <span style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                      {getCategoryLabel(key)}: {data.synced} contacts synced
                    </span>
                  </div>
                ))}
                {syncResults.uncategorized > 0 && (
                  <div className="flex items-center gap-2 text-[#f59e0b]">
                    <AlertTriangle className="w-4 h-4" />
                    <span style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                      Uncategorized: {syncResults.uncategorized} contacts not synced
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-3">
                <a
                  href="https://app.mailerlite.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2990C6] hover:underline"
                  style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}
                >
                  View in MailerLite
                </a>
                <Button
                  onClick={handleClose}
                  className="bg-[#2990C6] text-white hover:bg-[#2380b0] h-11"
                  style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}
                >
                  Done
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}