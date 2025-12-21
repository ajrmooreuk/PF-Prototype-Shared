import { useState, useEffect } from 'react';
import { FilterBar } from './FilterBar';
import { TableView } from './TableView';
import { GridView } from './GridView';
import { ListView } from './ListView';
import { ConnectionManagerPanel } from './ConnectionManagerPanel';
import { LeadDetailModal } from './LeadDetailModal';
import { EmailEnrichmentModal } from './EmailEnrichmentModal';
import { AddToQueueModal } from './AddToQueueModal';
import { ExportModal } from './ExportModal';
import { BulkActionsBar } from './BulkActionsBar';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Download, UserPlus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CampaignResultsPageProps {
  campaignId?: string;
  campaignName?: string;
  campaignType?: 'hunter_io' | 'google_maps' | 'linkedin';
  onNavigate?: (page: string) => void;
}

export function CampaignResultsPage({ 
  campaignId = 'camp_abc123',
  campaignName = 'B2B SaaS Companies - San Francisco',
  campaignType = 'hunter_io',
  onNavigate 
}: CampaignResultsPageProps) {
  const [viewMode, setViewMode] = useState<'table' | 'grid' | 'list'>('table');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [totalLeads, setTotalLeads] = useState(147);
  const [isLoading, setIsLoading] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  // Modal states
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [enrichmentModalOpen, setEnrichmentModalOpen] = useState(false);
  const [queueModalOpen, setQueueModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  // Filter states
  const [filters, setFilters] = useState({
    source: 'all',
    icpScore: 'all',
    status: 'all',
    search: '',
    sort: 'latest'
  });

  useEffect(() => {
    loadLeads();
  }, [filters]);

  const loadLeads = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockLeads = generateMockLeads(campaignType);
      setLeads(mockLeads);
      setTotalLeads(mockLeads.length);
      setIsLoading(false);
    }, 800);
  };

  const generateMockLeads = (type: string) => {
    const baseLeads = [];
    const count = type === 'linkedin' ? 147 : 89;
    
    for (let i = 0; i < count; i++) {
      if (type === 'linkedin') {
        baseLeads.push({
          id: `lead_${i}`,
          type: 'linkedin',
          full_name: ['John Doe', 'Sarah Johnson', 'Michael Chen', 'Emily Davis', 'Robert Martinez'][i % 5],
          headline: ['CEO at TechCorp', 'Marketing Director', 'VP of Sales', 'Product Manager', 'Growth Lead'][i % 5],
          company: ['TechCorp', 'SaaS Inc', 'DataFlow', 'CloudBase', 'AI Solutions'][i % 5],
          profile_image_url: `https://i.pravatar.cc/150?img=${i + 1}`,
          linkedin_url: 'https://linkedin.com/in/johndoe',
          icp_score: 60 + Math.floor(Math.random() * 40),
          connection_status: ['not_connected', 'pending', 'connected'][Math.floor(Math.random() * 3)],
          source: 'linkedin'
        });
      } else {
        baseLeads.push({
          id: `lead_${i}`,
          type: 'company',
          organization_name: ['Acme Corp', 'Tech Innovations', 'Global Solutions', 'Digital Dynamics', 'Future Systems'][i % 5],
          full_name: ['John Doe', 'Sarah Johnson', 'Michael Chen', 'Emily Davis', 'Robert Martinez'][i % 5],
          email: ['john@acme.com', 'sarah@tech.com', 'michael@global.com', 'emily@digital.com', 'robert@future.com'][i % 5],
          phone: '(555) 123-4567',
          title: ['CEO', 'Marketing Director', 'VP Sales', 'Product Manager', 'CTO'][i % 5],
          domain: ['acme.com', 'techinnovations.com', 'globalsolutions.com', 'digitaldy.com', 'futuresys.com'][i % 5],
          icp_score: 60 + Math.floor(Math.random() * 40),
          verified: Math.random() > 0.5,
          source: type,
          status: ['new', 'contacted', 'replied'][Math.floor(Math.random() * 3)]
        });
      }
    }
    return baseLeads;
  };

  const handleSelectLead = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map(l => l.id));
    }
  };

  const handleViewDetail = (lead: any) => {
    setSelectedLead(lead);
    setDetailModalOpen(true);
  };

  const handleEnrichEmail = (lead: any) => {
    setSelectedLead(lead);
    setEnrichmentModalOpen(true);
  };

  const handleAddToQueue = () => {
    if (selectedLeads.length === 0) {
      toast.error('Please select leads to add to queue');
      return;
    }
    setQueueModalOpen(true);
  };

  const handleExport = () => {
    setExportModalOpen(true);
  };

  const handleBulkArchive = () => {
    toast.success(`${selectedLeads.length} leads archived`);
    setSelectedLeads([]);
  };

  const getCampaignBadge = () => {
    const badges = {
      hunter_io: { label: 'Hunter.io', bg: 'bg-[#FFF4ED]', text: 'text-[#FF6B35]' },
      google_maps: { label: 'Google Maps', bg: 'bg-[#FDEDED]', text: 'text-[#EA4335]' },
      linkedin: { label: 'LinkedIn', bg: 'bg-[#E8F4F9]', text: 'text-[#0077B5]' }
    };
    return badges[campaignType];
  };

  const badge = getCampaignBadge();
  const readyToContact = leads.filter(l => l.icp_score >= 70).length;

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <div className="max-w-[1440px] mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[#6b7280] mb-6" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          <button 
            onClick={() => onNavigate?.('dashboard')}
            className="hover:text-[#02a4bf] transition-colors"
          >
            Dashboard
          </button>
          <span>{'>'}</span>
          <button 
            onClick={() => onNavigate?.('leads-dashboard')}
            className="hover:text-[#02a4bf] transition-colors"
          >
            Leads
          </button>
          <span>{'>'}</span>
          <span className="text-[#231f20]">Campaign Results</span>
        </div>

        {/* Page Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}>
                {campaignName} Results
              </h1>
              <Badge className={`${badge.bg} ${badge.text} border-0`} style={{ fontSize: '12px', padding: '6px 12px' }}>
                {badge.label}
              </Badge>
            </div>
            <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
              {totalLeads} leads found • {readyToContact} ready to contact
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleExport}
              variant="outline"
              className="border-2 border-[#02a4bf] text-[#02a4bf] hover:bg-[#f0fdff] h-11"
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            {campaignType === 'linkedin' && (
              <Button
                onClick={handleAddToQueue}
                className="bg-[#02a4bf] hover:bg-[#028a9f] text-white h-11"
                style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add to Queue
              </Button>
            )}
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          filters={filters}
          onFiltersChange={setFilters}
          totalResults={leads.length}
          campaignType={campaignType}
        />

        {/* Main Content Area */}
        <div className="flex gap-6">
          {/* Results Area */}
          <div className={isPanelOpen ? 'flex-1' : 'w-full'}>
            {viewMode === 'table' && (
              <TableView
                leads={leads}
                selectedLeads={selectedLeads}
                onSelectLead={handleSelectLead}
                onSelectAll={handleSelectAll}
                onViewDetail={handleViewDetail}
                onEnrichEmail={handleEnrichEmail}
                onAddToQueue={() => setQueueModalOpen(true)}
                isLoading={isLoading}
                campaignType={campaignType}
              />
            )}
            {viewMode === 'grid' && (
              <GridView
                leads={leads}
                selectedLeads={selectedLeads}
                onSelectLead={handleSelectLead}
                onViewDetail={handleViewDetail}
                onEnrichEmail={handleEnrichEmail}
                onAddToQueue={() => setQueueModalOpen(true)}
                isLoading={isLoading}
                campaignType={campaignType}
              />
            )}
            {viewMode === 'list' && (
              <ListView
                leads={leads}
                selectedLeads={selectedLeads}
                onSelectLead={handleSelectLead}
                onViewDetail={handleViewDetail}
                onEnrichEmail={handleEnrichEmail}
                onAddToQueue={() => setQueueModalOpen(true)}
                isLoading={isLoading}
                campaignType={campaignType}
              />
            )}
          </div>

          {/* Connection Manager Panel */}
          {campaignType === 'linkedin' && (
            <ConnectionManagerPanel
              isOpen={isPanelOpen}
              onToggle={() => setIsPanelOpen(!isPanelOpen)}
              selectedLeadIds={selectedLeads}
              onClearSelection={() => setSelectedLeads([])}
            />
          )}
        </div>

        {/* Bulk Actions Bar */}
        {selectedLeads.length > 0 && (
          <BulkActionsBar
            selectedCount={selectedLeads.length}
            onAddToQueue={handleAddToQueue}
            onExport={handleExport}
            onArchive={handleBulkArchive}
            onClear={() => setSelectedLeads([])}
            campaignType={campaignType}
          />
        )}

        {/* Modals */}
        {detailModalOpen && selectedLead && (
          <LeadDetailModal
            lead={selectedLead}
            onClose={() => setDetailModalOpen(false)}
            onAddToQueue={() => {
              setDetailModalOpen(false);
              setQueueModalOpen(true);
            }}
            onEnrichEmail={() => {
              setDetailModalOpen(false);
              setEnrichmentModalOpen(true);
            }}
            campaignType={campaignType}
          />
        )}

        {enrichmentModalOpen && selectedLead && (
          <EmailEnrichmentModal
            lead={selectedLead}
            onClose={() => setEnrichmentModalOpen(false)}
          />
        )}

        {queueModalOpen && (
          <AddToQueueModal
            leadIds={selectedLeads.length > 0 ? selectedLeads : selectedLead ? [selectedLead.id] : []}
            leads={selectedLeads.length > 0 ? leads.filter(l => selectedLeads.includes(l.id)) : selectedLead ? [selectedLead] : []}
            onClose={() => setQueueModalOpen(false)}
          />
        )}

        {exportModalOpen && (
          <ExportModal
            totalLeads={totalLeads}
            selectedOnly={selectedLeads.length > 0}
            selectedCount={selectedLeads.length}
            onClose={() => setExportModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
