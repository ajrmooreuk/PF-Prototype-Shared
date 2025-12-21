import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { StatsBar } from './StatsBar';
import { ActionBar } from './ActionBar';
import { FilterBar } from './FilterBar';
import { CompanyCard } from './CompanyCard';
import { SmartSyncModal } from './SmartSyncModal';
import { LinkedInManagerPanel } from './LinkedInManagerPanel';
import { loadCampaignResults, addToLinkedInQueue } from '../../lib/campaignAPI';
import { toast } from 'sonner@2.0.3';

interface CampaignResultsPageProps {
  campaignId: string;
  tenantId: string;
  jwtToken: string;
  onNavigate?: (page: string) => void;
}

export function CampaignResultsPage({
  campaignId,
  tenantId,
  jwtToken,
  onNavigate,
}: CampaignResultsPageProps) {
  const [campaign, setCampaign] = useState<any>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // UI State
  const [selectedCompanies, setSelectedCompanies] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSmartSync, setShowSmartSync] = useState(false);
  const [showLinkedInPanel, setShowLinkedInPanel] = useState(false);
  const [linkedInQueue, setLinkedInQueue] = useState<any[]>([]);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [icpScoreFilter, setICPScoreFilter] = useState('all');
  const [emailStatusFilter, setEmailStatusFilter] = useState('all');
  const [icpCategoryFilter, setICPCategoryFilter] = useState('all');

  // Load campaign data
  useEffect(() => {
    loadData();
  }, [campaignId]);

  // Apply filters
  useEffect(() => {
    applyFilters();
  }, [companies, searchQuery, icpScoreFilter, emailStatusFilter, icpCategoryFilter]);

  const loadData = async () => {
    setIsLoading(true);
    console.log('Loading campaign data for campaignId:', campaignId);
    try {
      const data = await loadCampaignResults(campaignId, { tenantId, jwtToken });
      console.log('Campaign data loaded:', data);
      setCampaign(data.campaign);
      setCompanies(data.companies || []);
      setStats(data.stats);
    } catch (error) {
      console.error('Failed to load campaign results:', error);
      toast.error('Failed to load campaign results');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...companies];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        company =>
          company.name.toLowerCase().includes(query) ||
          company.industry.toLowerCase().includes(query) ||
          company.contacts.some((c: any) =>
            c.name.toLowerCase().includes(query) || c.email?.toLowerCase().includes(query)
          )
      );
    }

    // ICP Score filter
    if (icpScoreFilter !== 'all') {
      filtered = filtered.filter(company => {
        if (icpScoreFilter === 'high') return company.icp_score >= 70;
        if (icpScoreFilter === 'medium') return company.icp_score >= 40 && company.icp_score < 70;
        if (icpScoreFilter === 'low') return company.icp_score < 40;
        return true;
      });
    }

    // Email Status filter
    if (emailStatusFilter !== 'all') {
      filtered = filtered.filter(company => {
        const hasEmail = company.contacts.some((c: any) => c.email);
        if (emailStatusFilter === 'has_email') return hasEmail;
        if (emailStatusFilter === 'needs_enrichment') return !hasEmail;
        if (emailStatusFilter === 'synced') return company.email_synced;
        return true;
      });
    }

    // ICP Category filter
    if (icpCategoryFilter !== 'all') {
      filtered = filtered.filter(company => company.icp_category === icpCategoryFilter);
    }

    setFilteredCompanies(filtered);
  };

  const handleSelectCompany = (id: string) => {
    const newSelected = new Set(selectedCompanies);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedCompanies(newSelected);
  };

  const handleEnrich = (companyId: string) => {
    toast.info('Email enrichment started for company');
    // TODO: Implement enrichment API call
  };

  const handleViewDetails = (companyId: string) => {
    toast.info('Opening company details...');
    // TODO: Navigate to company details page
  };

  const handleAddToQueue = async (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    if (!company) return;

    const contactsToQueue = company.contacts
      .filter((c: any) => c.has_linkedin)
      .map((c: any) => ({
        id: c.id,
        name: c.name,
        title: c.title,
        company: company.name,
        status: 'queued' as const,
        scheduled: 'Tomorrow 9am',
      }));

    setLinkedInQueue(prev => [...prev, ...contactsToQueue]);
    setShowLinkedInPanel(true);
    toast.success(`Added ${contactsToQueue.length} contacts to LinkedIn queue`);

    try {
      await addToLinkedInQueue(
        contactsToQueue.map(c => c.id),
        campaignId,
        { tenantId, jwtToken }
      );
    } catch (error) {
      console.error('Failed to add to LinkedIn queue:', error);
    }
  };

  const handleExport = (format: 'csv' | 'excel' | 'sheets') => {
    toast.success(`Exporting to ${format.toUpperCase()}...`);
    // TODO: Implement export functionality
  };

  // Calculate category counts
  const icpCategoryCounts = companies.reduce((acc, company) => {
    const category = company.icp_category || 'uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2990C6] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#6b7280]">Loading campaign results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <div className="max-w-[1440px] mx-auto px-6 py-6">
        {/* Back Button + Breadcrumb */}
        <div className="flex items-center gap-4 mb-4">
          {onNavigate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('campaigns-list')}
              className="text-[#6b7280] hover:text-[#1f2937] -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          )}
          <div className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            Dashboard {'>'} Leads {'>'} Campaigns {'>'} {campaign?.name || 'Campaign Results'}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[#000000] mb-6" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}>
          Campaign Results: {campaign?.name || 'Loading...'}
        </h1>

        {/* Stats Bar */}
        {stats && (
          <StatsBar
            totalLeads={stats.total_leads}
            totalContacts={stats.total_contacts}
            enrichedCount={stats.enriched_count}
            enrichedPercentage={stats.enriched_percentage}
            highICPCount={stats.high_icp_count}
            syncedCount={stats.synced_count}
            onSyncClick={() => setShowSmartSync(true)}
          />
        )}

        {/* Action Bar */}
        <ActionBar
          totalCompanies={filteredCompanies.length}
          totalContacts={filteredCompanies.reduce((sum, c) => sum + c.contacts.length, 0)}
          onSmartSync={() => setShowSmartSync(true)}
          onLinkedInQueue={() => setShowLinkedInPanel(true)}
          onExport={handleExport}
        />

        {/* Filter Bar */}
        <FilterBar
          onSearchChange={setSearchQuery}
          onICPScoreFilter={setICPScoreFilter}
          onEmailStatusFilter={setEmailStatusFilter}
          onICPCategoryFilter={setICPCategoryFilter}
          onViewModeChange={setViewMode}
          viewMode={viewMode}
          icpCategoryCounts={icpCategoryCounts}
        />

        {/* Results Grid */}
        {filteredCompanies.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
              No companies match your filters
            </p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-3 gap-5' : 'space-y-4'}>
            {filteredCompanies.map(company => (
              <CompanyCard
                key={company.id}
                company={company}
                selected={selectedCompanies.has(company.id)}
                onSelect={handleSelectCompany}
                onEnrich={handleEnrich}
                onViewDetails={handleViewDetails}
                onAddToQueue={handleAddToQueue}
              />
            ))}
          </div>
        )}
      </div>

      {/* Smart Sync Modal */}
      <SmartSyncModal
        isOpen={showSmartSync}
        onClose={() => setShowSmartSync(false)}
        campaignId={campaignId}
        tenantId={tenantId}
        jwtToken={jwtToken}
      />

      {/* LinkedIn Manager Panel */}
      <LinkedInManagerPanel
        isOpen={showLinkedInPanel}
        onClose={() => setShowLinkedInPanel(false)}
        queuedContacts={linkedInQueue}
      />
    </div>
  );
}