import React, { useState } from 'react';
import { Campaign } from '../CampaignsListPage';
import { CampaignTableRow } from './CampaignTableRow';

interface Props {
  campaigns: Campaign[];
  loading: boolean;
  selectedIds: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  onSort: (column: string) => void;
  currentPage: number;
  rowsPerPage: number;
  totalCampaigns: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onBulkDelete: () => void;
  onBulkExport: (format: 'csv' | 'json') => void;
  onBulkUpdateStatus: (status: 'paused' | 'resumed') => void;
  onViewCampaign?: (campaignId: string) => void;
}

export function CampaignsTable({
  campaigns,
  loading,
  selectedIds,
  onSelectionChange,
  sortColumn,
  sortDirection,
  onSort,
  currentPage,
  rowsPerPage,
  totalCampaigns,
  totalPages,
  onPageChange,
  onRowsPerPageChange,
  onBulkDelete,
  onBulkExport,
  onBulkUpdateStatus,
  onViewCampaign
}: Props) {
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showRowsPerPage, setShowRowsPerPage] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSelection = new Set(selectedIds);
      campaigns.forEach(c => newSelection.add(c.id));
      onSelectionChange(newSelection);
    } else {
      const newSelection = new Set(selectedIds);
      campaigns.forEach(c => newSelection.delete(c.id));
      onSelectionChange(newSelection);
    }
  };

  const allSelected = campaigns.length > 0 && campaigns.every(c => selectedIds.has(c.id));
  const someSelected = campaigns.some(c => selectedIds.has(c.id)) && !allSelected;

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return '⇅';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 3);
      let endPage = Math.min(totalPages, startPage + maxVisible - 1);
      
      if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-[#02a4bf] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-20 text-center">
        <div className="text-6xl mb-6 opacity-80">🔍</div>
        <h3 className="text-[#231f20] text-2xl mb-3">No campaigns found</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          No campaigns match your current filters. Try adjusting your search criteria.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-[#02a4bf] text-white rounded-lg hover:bg-[#028a9f] transition-all"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Toolbar */}
      {selectedIds.size > 0 && (
        <div className="h-15 px-6 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#231f20]">
              <span className="text-[#02a4bf]">☑</span>
              <span className="text-sm">{selectedIds.size} campaigns selected</span>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowBulkActions(!showBulkActions)}
                className="h-10 px-4 bg-[#02a4bf] text-white rounded-lg hover:bg-[#028a9f] transition-all flex items-center gap-2"
              >
                <span className="text-sm">Bulk Actions</span>
                <span className="text-xs">▼</span>
              </button>

              {showBulkActions && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowBulkActions(false)} />
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20">
                    <button
                      onClick={() => {
                        onBulkExport('csv');
                        setShowBulkActions(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
                    >
                      <span>📄</span>
                      <span>Export Selected (CSV)</span>
                    </button>
                    <button
                      onClick={() => {
                        onBulkExport('json');
                        setShowBulkActions(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
                    >
                      <span>📋</span>
                      <span>Export Selected (JSON)</span>
                    </button>
                    <div className="h-px bg-gray-200 my-2" />
                    <button
                      onClick={() => {
                        onBulkUpdateStatus('paused');
                        setShowBulkActions(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
                    >
                      <span>⏸</span>
                      <span>Pause Campaigns</span>
                    </button>
                    <button
                      onClick={() => {
                        onBulkUpdateStatus('resumed');
                        setShowBulkActions(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
                    >
                      <span>▶️</span>
                      <span>Resume Campaigns</span>
                    </button>
                    <div className="h-px bg-gray-200 my-2" />
                    <button
                      onClick={() => {
                        onBulkDelete();
                        setShowBulkActions(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-sm text-red-600"
                    >
                      <span>🗑️</span>
                      <span>Delete Campaigns</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => onSelectionChange(new Set())}
              className="text-sm text-gray-500 hover:text-red-500 hover:underline"
            >
              Deselect All
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">Show:</span>
            <div className="relative">
              <button
                onClick={() => setShowRowsPerPage(!showRowsPerPage)}
                className="w-20 h-9 border border-gray-200 rounded-md flex items-center justify-between px-3 hover:border-[#02a4bf] transition-all"
              >
                <span className="text-sm">{rowsPerPage}</span>
                <span className="text-xs">▼</span>
              </button>

              {showRowsPerPage && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowRowsPerPage(false)} />
                  <div className="absolute top-full right-0 mt-1 w-20 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20">
                    {[10, 25, 50, 100].map(num => (
                      <button
                        key={num}
                        onClick={() => {
                          onRowsPerPageChange(num);
                          setShowRowsPerPage(false);
                        }}
                        className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 ${
                          rowsPerPage === num ? 'bg-[#f0fdff] text-[#02a4bf]' : ''
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0">
            <tr>
              <th className="w-12 px-6 py-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={input => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-5 h-5 text-[#02a4bf] border-gray-300 rounded focus:ring-[#02a4bf]"
                />
              </th>
              
              <th 
                className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider cursor-pointer hover:text-[#02a4bf] transition-colors"
                onClick={() => onSort('name')}
              >
                <div className="flex items-center gap-2">
                  <span>Campaign Name</span>
                  <span className="text-sm">{getSortIcon('name')}</span>
                </div>
              </th>
              
              <th className="px-6 py-4 text-center text-xs text-gray-500 uppercase tracking-wider">
                Source
              </th>
              
              <th className="px-6 py-4 text-center text-xs text-gray-500 uppercase tracking-wider">
                Status
              </th>
              
              <th 
                className="px-6 py-4 text-right text-xs text-gray-500 uppercase tracking-wider cursor-pointer hover:text-[#02a4bf] transition-colors"
                onClick={() => onSort('results')}
              >
                <div className="flex items-center justify-end gap-2">
                  <span>Results</span>
                  <span className="text-sm">{getSortIcon('results')}</span>
                </div>
              </th>
              
              <th 
                className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider cursor-pointer hover:text-[#02a4bf] transition-colors"
                onClick={() => onSort('created_at')}
              >
                <div className="flex items-center gap-2">
                  <span>Created</span>
                  <span className="text-sm">{getSortIcon('created_at')}</span>
                </div>
              </th>
              
              <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider">
                Created By
              </th>
              
              <th 
                className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider cursor-pointer hover:text-[#02a4bf] transition-colors"
                onClick={() => onSort('updated_at')}
              >
                <div className="flex items-center gap-2">
                  <span>Last Updated</span>
                  <span className="text-sm">{getSortIcon('updated_at')}</span>
                </div>
              </th>
              
              <th className="px-6 py-4 text-center text-xs text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-100">
            {campaigns.map(campaign => (
              <CampaignTableRow
                key={campaign.id}
                campaign={campaign}
                selected={selectedIds.has(campaign.id)}
                onSelect={(selected) => {
                  const newSelection = new Set(selectedIds);
                  if (selected) {
                    newSelection.add(campaign.id);
                  } else {
                    newSelection.delete(campaign.id);
                  }
                  onSelectionChange(newSelection);
                }}
                onViewCampaign={onViewCampaign}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer - Pagination */}
      <div className="h-18 bg-gray-50 border-t border-gray-200 px-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-[#231f20]">
            Showing {(currentPage - 1) * rowsPerPage + 1}-{Math.min(currentPage * rowsPerPage, totalCampaigns)} of {totalCampaigns} campaigns
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* First Page */}
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="w-9 h-9 border border-gray-200 rounded-md flex items-center justify-center hover:border-[#02a4bf] hover:text-[#02a4bf] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            ⟪
          </button>

          {/* Previous */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-9 px-4 border border-gray-200 rounded-md flex items-center gap-2 hover:border-[#02a4bf] hover:text-[#02a4bf] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span>←</span>
            <span className="text-sm">Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {renderPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="w-9 h-9 flex items-center justify-center text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page as number)}
                  className={`w-9 h-9 rounded-md flex items-center justify-center text-sm transition-all ${
                    currentPage === page
                      ? 'bg-[#02a4bf] text-white shadow-md'
                      : 'border border-gray-200 hover:border-[#02a4bf] hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              )
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-9 px-4 border border-gray-200 rounded-md flex items-center gap-2 hover:border-[#02a4bf] hover:text-[#02a4bf] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span className="text-sm">Next</span>
            <span>→</span>
          </button>

          {/* Last Page */}
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="w-9 h-9 border border-gray-200 rounded-md flex items-center justify-center hover:border-[#02a4bf] hover:text-[#02a4bf] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            ⟫
          </button>
        </div>
      </div>
    </div>
  );
}