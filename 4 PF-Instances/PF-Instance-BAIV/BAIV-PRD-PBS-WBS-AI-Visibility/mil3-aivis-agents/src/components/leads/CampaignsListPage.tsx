import React, { useState, useEffect } from 'react';
import { CampaignFilters } from './campaigns/CampaignFilters';
import { CampaignsTable } from './campaigns/CampaignsTable';
import { NewCampaignModal } from './campaigns/NewCampaignModal';
import { BulkDeleteModal } from './campaigns/BulkDeleteModal';
import { toast } from 'sonner@2.0.3';

// Types
export interface Campaign {
  id: string;
  name: string;
  source_type: 'hunter_io' | 'google_maps' | 'linkedin';
  status: 'processing' | 'completed' | 'failed' | 'queued' | 'paused';
  total_results: number;
  progress?: number;
  created_at: string;
  updated_at: string;
  created_by: {
    id: string;
    name: string;
    email: string;
    avatar_url?: string;
  };
  search_params: Record<string, any>;
}

export interface FilterState {
  source_type: string | null;
  status: string[];
  date_from: string | null;
  date_to: string | null;
  results_min: number | null;
  results_max: number | null;
  created_by_user_id: string[];
  search: string | null;
}

// Mock data
const generateMockCampaigns = (): Campaign[] => {
  const sources = ['hunter_io', 'google_maps', 'linkedin'] as const;
  const statuses = ['processing', 'completed', 'failed', 'queued', 'paused'] as const;
  const users = [
    { id: 'user_1', name: 'Sarah Johnson', email: 'sarah@company.com' },
    { id: 'user_2', name: 'Michael Chen', email: 'michael@company.com' },
    { id: 'user_3', name: 'Emily Rodriguez', email: 'emily@company.com' },
    { id: 'user_4', name: 'David Kim', email: 'david@company.com' }
  ];

  const campaigns: Campaign[] = [];
  const campaignNames = [
    'B2B SaaS Companies - San Francisco',
    'Tech Startups - New York',
    'Enterprise Software - Austin',
    'Marketing Agencies - Los Angeles',
    'E-commerce Retailers - Seattle',
    'Financial Services - Chicago',
    'Healthcare Providers - Boston',
    'Real Estate Agents - Miami',
    'Restaurants - Portland',
    'Fitness Centers - Denver'
  ];

  for (let i = 0; i < 47; i++) {
    const source = sources[i % sources.length];
    const status = i < 5 ? 'processing' : i < 43 ? 'completed' : i < 45 ? 'failed' : 'queued';
    const user = users[i % users.length];
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);

    campaigns.push({
      id: `camp_${i + 1}`,
      name: `${campaignNames[i % campaignNames.length]} ${i > 9 ? `(${Math.floor(i / 10)})` : ''}`,
      source_type: source,
      status: status as any,
      total_results: status === 'failed' ? 0 : Math.floor(Math.random() * 500) + 10,
      progress: status === 'processing' ? Math.random() * 0.8 + 0.2 : 1,
      created_at: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000 - hoursAgo * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - Math.random() * 60 * 60 * 1000).toISOString(),
      created_by: user,
      search_params: source === 'hunter_io' 
        ? { industry: 'Technology', location: 'San Francisco' }
        : source === 'google_maps'
        ? { location: 'San Francisco, CA', query: 'restaurants' }
        : { type: 'Profile Search', keyword: 'marketing manager' }
    });
  }

  return campaigns;
};

interface CampaignsListPageProps {
  onNavigate?: (page: string) => void;
  onSelectCampaign?: (campaignId: string) => void;
}

export function CampaignsListPage({ onNavigate, onSelectCampaign }: CampaignsListPageProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  
  // Sorting
  const [sortColumn, setSortColumn] = useState<string>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  // Modals
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  
  // Filters
  const [filters, setFilters] = useState<FilterState>({
    source_type: null,
    status: [],
    date_from: null,
    date_to: null,
    results_min: null,
    results_max: null,
    created_by_user_id: [],
    search: null
  });

  // Load campaigns on mount
  useEffect(() => {
    loadCampaigns();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    applyFiltersAndSort();
  }, [campaigns, filters, sortColumn, sortDirection]);

  const loadCampaigns = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockCampaigns = generateMockCampaigns();
      setCampaigns(mockCampaigns);
      setLastUpdated(new Date());
      setLoading(false);
    }, 800);
  };

  const applyFiltersAndSort = () => {
    let filtered = [...campaigns];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchLower) ||
        c.id.toLowerCase().includes(searchLower) ||
        JSON.stringify(c.search_params).toLowerCase().includes(searchLower)
      );
    }

    // Apply source filter
    if (filters.source_type) {
      filtered = filtered.filter(c => c.source_type === filters.source_type);
    }

    // Apply status filter
    if (filters.status.length > 0) {
      filtered = filtered.filter(c => filters.status.includes(c.status));
    }

    // Apply date range filter
    if (filters.date_from) {
      filtered = filtered.filter(c => new Date(c.created_at) >= new Date(filters.date_from!));
    }
    if (filters.date_to) {
      filtered = filtered.filter(c => new Date(c.created_at) <= new Date(filters.date_to!));
    }

    // Apply results range filter
    if (filters.results_min !== null) {
      filtered = filtered.filter(c => c.total_results >= filters.results_min!);
    }
    if (filters.results_max !== null) {
      filtered = filtered.filter(c => c.total_results <= filters.results_max!);
    }

    // Apply created by filter
    if (filters.created_by_user_id.length > 0) {
      filtered = filtered.filter(c => filters.created_by_user_id.includes(c.created_by.id));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal: any, bVal: any;

      switch (sortColumn) {
        case 'name':
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case 'results':
          aVal = a.total_results;
          bVal = b.total_results;
          break;
        case 'created_at':
          aVal = new Date(a.created_at).getTime();
          bVal = new Date(b.created_at).getTime();
          break;
        case 'updated_at':
          aVal = new Date(a.updated_at).getTime();
          bVal = new Date(b.updated_at).getTime();
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredCampaigns(filtered);
  };

  const handleRefresh = () => {
    loadCampaigns();
    toast.success('Campaigns refreshed');
  };

  const handleExport = (format: 'csv' | 'json') => {
    toast.success(`Exporting campaigns as ${format.toUpperCase()}...`);
    // Implement export logic
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const handleBulkDelete = async () => {
    setShowBulkDeleteModal(false);
    
    // Simulate API call
    toast.success(`Deleting ${selectedIds.size} campaigns...`);
    
    setTimeout(() => {
      setCampaigns(prev => prev.filter(c => !selectedIds.has(c.id)));
      setSelectedIds(new Set());
      toast.success(`Successfully deleted ${selectedIds.size} campaigns`);
    }, 1000);
  };

  const handleBulkExport = (format: 'csv' | 'json') => {
    toast.success(`Exporting ${selectedIds.size} campaigns as ${format.toUpperCase()}...`);
  };

  const handleBulkUpdateStatus = (status: 'paused' | 'resumed') => {
    toast.success(`${status === 'paused' ? 'Pausing' : 'Resuming'} ${selectedIds.size} campaigns...`);
    
    setTimeout(() => {
      setCampaigns(prev => prev.map(c => 
        selectedIds.has(c.id) 
          ? { ...c, status: status === 'paused' ? 'paused' : 'processing' }
          : c
      ));
      setSelectedIds(new Set());
      toast.success(`Successfully ${status === 'paused' ? 'paused' : 'resumed'} campaigns`);
    }, 500);
  };

  // Get paginated campaigns
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredCampaigns.length / rowsPerPage);

  const getRelativeTime = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 120) return '1 minute ago';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 7200) return '1 hour ago';
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 172800) return 'yesterday';
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <div className="max-w-[1600px] mx-auto p-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-6 text-sm" style={{ fontFamily: 'Open Sans' }}>
        <button 
          onClick={() => onNavigate?.('dashboard')}
          className="text-gray-500 hover:text-[#02a4bf] hover:underline transition-colors"
        >
          Dashboard
        </button>
        <span className="text-gray-400">›</span>
        <button 
          onClick={() => onNavigate?.('leads-dashboard')}
          className="text-gray-500 hover:text-[#02a4bf] hover:underline transition-colors"
        >
          Leads
        </button>
        <span className="text-gray-400">›</span>
        <span className="text-[#231f20]">Campaigns</span>
      </nav>

        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[#231f20] mb-2">Lead Generation Campaigns</h1>
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <span className="text-lg">📊</span>
              <span>Showing {filteredCampaigns.length} campaigns</span>
            </div>
            <div className="text-sm text-gray-400">
              Last updated: {getRelativeTime(lastUpdated)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="w-11 h-11 border-2 border-gray-200 rounded-lg flex items-center justify-center hover:border-[#02a4bf] hover:text-[#02a4bf] transition-all"
              title="Refresh campaigns"
            >
              <span className="text-xl">⟳</span>
            </button>

            {/* Export Button */}
            <div className="relative group">
              <button className="h-11 px-4 border-2 border-gray-200 rounded-lg flex items-center gap-2 hover:border-[#02a4bf] hover:text-[#02a4bf] hover:bg-[#f0fdff] transition-all">
                <span>↓</span>
                <span>Export</span>
              </button>
              
              {/* Export Dropdown */}
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <button
                  onClick={() => handleExport('csv')}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
                >
                  <span>📄</span>
                  <span>Export All Campaigns (CSV)</span>
                </button>
                <button
                  onClick={() => handleExport('json')}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
                >
                  <span>📋</span>
                  <span>Export All Campaigns (JSON)</span>
                </button>
              </div>
            </div>

            {/* New Campaign Button */}
            <button
              onClick={() => setShowNewCampaignModal(true)}
              className="h-11 px-6 bg-[#02a4bf] text-white rounded-lg flex items-center gap-2 hover:bg-[#028a9f] shadow-md hover:shadow-lg transition-all"
            >
              <span className="text-lg">➕</span>
              <span>New Campaign</span>
            </button>
          </div>
        </div>

      {/* Filters */}
      <CampaignFilters
        filters={filters}
        onFiltersChange={setFilters}
        totalCampaigns={campaigns.length}
        campaigns={campaigns}
      />

      {/* Table */}
      <CampaignsTable
        campaigns={paginatedCampaigns}
        loading={loading}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalCampaigns={filteredCampaigns.length}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={(value) => {
          setRowsPerPage(value);
          setCurrentPage(1);
        }}
        onBulkDelete={() => setShowBulkDeleteModal(true)}
        onBulkExport={handleBulkExport}
        onBulkUpdateStatus={handleBulkUpdateStatus}
        onViewCampaign={onSelectCampaign}
      />

      {/* Modals */}
      {showNewCampaignModal && (
        <NewCampaignModal
          onClose={() => setShowNewCampaignModal(false)}
          onSuccess={(campaign) => {
            setCampaigns(prev => [campaign, ...prev]);
            setShowNewCampaignModal(false);
            toast.success('Campaign created successfully');
          }}
        />
      )}

      {showBulkDeleteModal && (
        <BulkDeleteModal
          count={selectedIds.size}
          onConfirm={handleBulkDelete}
          onCancel={() => setShowBulkDeleteModal(false)}
        />
      )}
    </div>
  );
}