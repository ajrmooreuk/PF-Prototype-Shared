import React, { useState } from 'react';
import { FilterState, Campaign } from '../CampaignsListPage';

interface Props {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  totalCampaigns: number;
  campaigns: Campaign[];
}

export function CampaignFilters({ filters, onFiltersChange, totalCampaigns, campaigns }: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

  // Calculate counts by source
  const hunterCount = campaigns.filter(c => c.source_type === 'hunter_io').length;
  const mapsCount = campaigns.filter(c => c.source_type === 'google_maps').length;
  const linkedinCount = campaigns.filter(c => c.source_type === 'linkedin').length;

  // Calculate counts by status
  const processingCount = campaigns.filter(c => c.status === 'processing').length;
  const completedCount = campaigns.filter(c => c.status === 'completed').length;
  const failedCount = campaigns.filter(c => c.status === 'failed').length;
  const queuedCount = campaigns.filter(c => c.status === 'queued').length;
  const pausedCount = campaigns.filter(c => c.status === 'paused').length;

  const handleSearch = (value: string) => {
    setSearchValue(value);
    
    if (searchTimeout) clearTimeout(searchTimeout);
    
    const timeout = setTimeout(() => {
      onFiltersChange({ ...filters, search: value || null });
    }, 500);
    
    setSearchTimeout(timeout);
  };

  const handleQuickFilter = (source: string | null) => {
    setActiveTab(source || 'all');
    onFiltersChange({ ...filters, source_type: source });
  };

  const removeFilter = (key: keyof FilterState) => {
    onFiltersChange({ ...filters, [key]: Array.isArray(filters[key]) ? [] : null });
  };

  const clearAllFilters = () => {
    setSearchValue('');
    setActiveTab('all');
    onFiltersChange({
      source_type: null,
      status: [],
      date_from: null,
      date_to: null,
      results_min: null,
      results_max: null,
      created_by_user_id: [],
      search: null
    });
  };

  const activeFilterCount = 
    (filters.status.length > 0 ? 1 : 0) +
    (filters.source_type ? 1 : 0) +
    (filters.date_from || filters.date_to ? 1 : 0) +
    (filters.results_min || filters.results_max ? 1 : 0) +
    (filters.created_by_user_id.length > 0 ? 1 : 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      {/* Top Row - Quick Filters & Search */}
      <div className="flex items-center justify-between gap-4 mb-5">
        {/* Quick Filter Tabs */}
        <div className="inline-flex gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => handleQuickFilter(null)}
            className={`px-5 py-2.5 rounded-md flex items-center gap-2 transition-all ${
              activeTab === 'all'
                ? 'bg-white text-[#02a4bf] shadow-sm'
                : 'text-gray-600 hover:bg-white/60'
            }`}
          >
            <span className="text-base">📊</span>
            <span className="text-sm">All ({totalCampaigns})</span>
          </button>
          
          <button
            onClick={() => handleQuickFilter('hunter_io')}
            className={`px-5 py-2.5 rounded-md flex items-center gap-2 transition-all ${
              activeTab === 'hunter_io'
                ? 'bg-white text-[#02a4bf] shadow-sm'
                : 'text-gray-600 hover:bg-white/60'
            }`}
          >
            <span className="text-base">🎯</span>
            <span className="text-sm">Hunter.io ({hunterCount})</span>
          </button>
          
          <button
            onClick={() => handleQuickFilter('google_maps')}
            className={`px-5 py-2.5 rounded-md flex items-center gap-2 transition-all ${
              activeTab === 'google_maps'
                ? 'bg-white text-[#10b981] shadow-sm'
                : 'text-gray-600 hover:bg-white/60'
            }`}
          >
            <span className="text-base">📍</span>
            <span className="text-sm">Google Maps ({mapsCount})</span>
          </button>
          
          <button
            onClick={() => handleQuickFilter('linkedin')}
            className={`px-5 py-2.5 rounded-md flex items-center gap-2 transition-all ${
              activeTab === 'linkedin'
                ? 'bg-white text-[#0077b5] shadow-sm'
                : 'text-gray-600 hover:bg-white/60'
            }`}
          >
            <span className="text-base">💼</span>
            <span className="text-sm">LinkedIn ({linkedinCount})</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-96">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
            🔍
          </span>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search campaigns by name, ID, or search terms..."
            className="w-full h-11 pl-10 pr-10 border-2 border-gray-200 rounded-lg focus:border-[#02a4bf] focus:outline-none focus:ring-3 focus:ring-[#02a4bf]/10 transition-all"
          />
          {searchValue && (
            <button
              onClick={() => handleSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Bottom Row - Advanced Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filter */}
        <StatusFilterDropdown
          selected={filters.status}
          onChange={(status) => onFiltersChange({ ...filters, status })}
          counts={{ processing: processingCount, completed: completedCount, failed: failedCount, queued: queuedCount, paused: pausedCount }}
        />

        {/* Date Range Filter */}
        <DateRangeFilter
          dateFrom={filters.date_from}
          dateTo={filters.date_to}
          onChange={(dateFrom, dateTo) => onFiltersChange({ ...filters, date_from: dateFrom, date_to: dateTo })}
        />

        {/* Results Range Filter */}
        <ResultsRangeFilter
          min={filters.results_min}
          max={filters.results_max}
          onChange={(min, max) => onFiltersChange({ ...filters, results_min: min, results_max: max })}
        />
      </div>

      {/* Active Filters Pills */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-gray-200">
          <span className="text-xs text-gray-500 mr-2">{activeFilterCount} filters active</span>
          
          {filters.status.map(status => (
            <FilterPill
              key={status}
              label={`Status: ${status}`}
              onRemove={() => onFiltersChange({ ...filters, status: filters.status.filter(s => s !== status) })}
            />
          ))}
          
          {filters.source_type && (
            <FilterPill
              label={`Source: ${filters.source_type.replace('_', ' ')}`}
              onRemove={() => removeFilter('source_type')}
            />
          )}
          
          {(filters.date_from || filters.date_to) && (
            <FilterPill
              label={`Date: ${filters.date_from || 'Any'} to ${filters.date_to || 'Any'}`}
              onRemove={() => {
                onFiltersChange({ ...filters, date_from: null, date_to: null });
              }}
            />
          )}
          
          {(filters.results_min || filters.results_max) && (
            <FilterPill
              label={`Results: ${filters.results_min || '0'}-${filters.results_max || '∞'}`}
              onRemove={() => {
                onFiltersChange({ ...filters, results_min: null, results_max: null });
              }}
            />
          )}
          
          <button
            onClick={clearAllFilters}
            className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1 ml-2"
          >
            <span>🗑️</span>
            <span>Clear all filters</span>
          </button>
        </div>
      )}
    </div>
  );
}

// Filter Pill Component
function FilterPill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div className="inline-flex items-center gap-2 bg-[#f0fdff] border border-[#02a4bf] rounded-full px-3 py-1.5 text-xs text-[#02a4bf] transition-all hover:bg-[#d1f4f9]">
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="hover:text-red-500 hover:scale-110 transition-all"
      >
        ✕
      </button>
    </div>
  );
}

// Status Filter Dropdown
function StatusFilterDropdown({ selected, onChange, counts }: { 
  selected: string[]; 
  onChange: (statuses: string[]) => void;
  counts: { processing: number; completed: number; failed: number; queued: number; paused: number };
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleStatus = (status: string) => {
    if (selected.includes(status)) {
      onChange(selected.filter(s => s !== status));
    } else {
      onChange([...selected, status]);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-10 px-4 border rounded-lg flex items-center justify-between gap-3 transition-all ${
          selected.length > 0
            ? 'border-[#02a4bf] bg-[#f0fdff] text-[#02a4bf]'
            : 'border-gray-200 hover:border-[#02a4bf] hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-2">
          <span>🟢</span>
          <span className="text-sm">Status {selected.length > 0 && `(${selected.length})`}</span>
        </div>
        <span className={`text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-20">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <span className="text-sm">Filter by Status</span>
              {selected.length > 0 && (
                <button
                  onClick={() => onChange([])}
                  className="text-xs text-gray-500 hover:text-[#02a4bf]"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="space-y-1">
              {[
                { value: 'processing', label: 'Processing', dot: '🟠', count: counts.processing },
                { value: 'completed', label: 'Completed', dot: '🟢', count: counts.completed },
                { value: 'failed', label: 'Failed', dot: '🔴', count: counts.failed },
                { value: 'queued', label: 'Queued', dot: '🔵', count: counts.queued },
                { value: 'paused', label: 'Paused', dot: '⚪', count: counts.paused }
              ].map(status => (
                <label
                  key={status.value}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(status.value)}
                    onChange={() => toggleStatus(status.value)}
                    className="w-4 h-4 text-[#02a4bf] border-gray-300 rounded focus:ring-[#02a4bf]"
                  />
                  <span className="text-sm">{status.dot}</span>
                  <span className="text-sm flex-1">{status.label}</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{status.count}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Date Range Filter
function DateRangeFilter({ dateFrom, dateTo, onChange }: {
  dateFrom: string | null;
  dateTo: string | null;
  onChange: (from: string | null, to: string | null) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSelection = dateFrom || dateTo;

  const quickRanges = [
    { label: 'Today', days: 0 },
    { label: 'Last 7 Days', days: 7 },
    { label: 'Last 30 Days', days: 30 },
    { label: 'Last 90 Days', days: 90 }
  ];

  const applyQuickRange = (days: number) => {
    const to = new Date().toISOString().split('T')[0];
    const from = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    onChange(from, to);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-10 px-4 border rounded-lg flex items-center justify-between gap-3 transition-all ${
          hasSelection
            ? 'border-[#02a4bf] bg-[#f0fdff] text-[#02a4bf]'
            : 'border-gray-200 hover:border-[#02a4bf] hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span className="text-sm">
            {hasSelection ? `${dateFrom || 'Any'} to ${dateTo || 'Any'}` : 'Date Range'}
          </span>
        </div>
        <span className={`text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-20">
            <div className="mb-4">
              <span className="text-sm">Quick Ranges</span>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {quickRanges.map(range => (
                  <button
                    key={range.label}
                    onClick={() => applyQuickRange(range.days)}
                    className="px-3 py-2 text-xs border border-gray-200 rounded-md hover:border-[#02a4bf] hover:bg-[#f0fdff] hover:text-[#02a4bf] transition-all"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  onChange(null, null);
                  setIsOpen(false);
                }}
                className="w-full py-2 text-sm text-gray-500 hover:text-red-500"
              >
                Clear Date Filter
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Results Range Filter
function ResultsRangeFilter({ min, max, onChange }: {
  min: number | null;
  max: number | null;
  onChange: (min: number | null, max: number | null) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSelection = min !== null || max !== null;

  const presetRanges = [
    { label: '1-50 leads', min: 1, max: 50 },
    { label: '51-200 leads', min: 51, max: 200 },
    { label: '201-500 leads', min: 201, max: 500 },
    { label: '500+ leads', min: 500, max: null }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-10 px-4 border rounded-lg flex items-center justify-between gap-3 transition-all ${
          hasSelection
            ? 'border-[#02a4bf] bg-[#f0fdff] text-[#02a4bf]'
            : 'border-gray-200 hover:border-[#02a4bf] hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-2">
          <span>📈</span>
          <span className="text-sm">
            {hasSelection ? `${min || 0}-${max || '∞'} leads` : 'Results'}
          </span>
        </div>
        <span className={`text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-20">
            <div className="mb-4">
              <span className="text-sm">Preset Ranges</span>
              <div className="space-y-1 mt-2">
                {presetRanges.map(range => (
                  <button
                    key={range.label}
                    onClick={() => {
                      onChange(range.min, range.max);
                      setIsOpen(false);
                    }}
                    className="w-full px-3 py-2 text-sm text-left border border-gray-200 rounded-md hover:border-[#02a4bf] hover:bg-[#f0fdff] hover:text-[#02a4bf] transition-all"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  onChange(null, null);
                  setIsOpen(false);
                }}
                className="w-full py-2 text-sm text-gray-500 hover:text-red-500"
              >
                Clear Results Filter
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
