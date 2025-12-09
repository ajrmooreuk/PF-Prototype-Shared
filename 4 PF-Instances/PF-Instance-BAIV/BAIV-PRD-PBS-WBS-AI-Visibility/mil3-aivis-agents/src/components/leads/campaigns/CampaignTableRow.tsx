import React, { useState } from 'react';
import { Campaign } from '../CampaignsListPage';
import { toast } from 'sonner@2.0.3';

interface Props {
  campaign: Campaign;
  selected: boolean;
  onSelect: (selected: boolean) => void;
  onViewCampaign?: (campaignId: string) => void;
}

export function CampaignTableRow({ campaign, selected, onSelect, onViewCampaign }: Props) {
  const [showMenu, setShowMenu] = useState(false);

  const getSourceConfig = (source: Campaign['source_type']) => {
    switch (source) {
      case 'hunter_io':
        return { icon: '🎯', label: 'Hunter.io', bg: '#f0fdff', border: '#02a4bf', color: '#02a4bf' };
      case 'google_maps':
        return { icon: '📍', label: 'Google Maps', bg: '#d1fae5', border: '#10b981', color: '#059669' };
      case 'linkedin':
        return { icon: '💼', label: 'LinkedIn', bg: '#e8f4f9', border: '#0077b5', color: '#0077b5' };
    }
  };

  const getStatusConfig = (status: Campaign['status']) => {
    switch (status) {
      case 'processing':
        return { icon: '⟳', label: 'Processing', bg: '#fef3c7', color: '#d97706', spinning: true };
      case 'completed':
        return { icon: '✓', label: 'Completed', bg: '#d1fae5', color: '#059669', spinning: false };
      case 'failed':
        return { icon: '✗', label: 'Failed', bg: '#fee2e2', color: '#dc2626', spinning: false };
      case 'queued':
        return { icon: '⏸', label: 'Queued', bg: '#e0e7ff', color: '#4f46e5', spinning: false };
      case 'paused':
        return { icon: '⏸', label: 'Paused', bg: '#f3f4f6', color: '#6b7280', spinning: false };
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const getRelativeTime = (isoString: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(isoString).getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 120) return '1 minute ago';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 7200) return '1 hour ago';
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 172800) return 'yesterday';
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(campaign.id);
    toast.success('Campaign ID copied to clipboard');
  };

  const handleViewCampaign = () => {
    console.log('handleViewCampaign called, campaign.id:', campaign.id, 'onViewCampaign:', onViewCampaign);
    // TODO: Open campaign details modal or navigate to campaign details page
    toast.info(`Viewing campaign: ${campaign.name}`, {
      description: `Campaign ID: ${campaign.id} - ${campaign.total_results} leads found`
    });
    if (onViewCampaign) {
      console.log('Calling onViewCampaign with:', campaign.id);
      onViewCampaign(campaign.id);
    } else {
      console.log('onViewCampaign is not defined');
    }
  };

  const handleMenuAction = (action: string) => {
    setShowMenu(false);
    
    switch (action) {
      case 'view':
        handleViewCampaign();
        break;
      case 'edit':
        toast.info('Edit campaign modal (to be implemented)');
        break;
      case 'duplicate':
        toast.success('Duplicating campaign...');
        break;
      case 'pause':
        toast.success('Campaign paused');
        break;
      case 'resume':
        toast.success('Campaign resumed');
        break;
      case 'export':
        toast.success('Exporting campaign results...');
        break;
      case 'delete':
        toast.error('Delete confirmation (to be implemented)');
        break;
    }
  };

  const sourceConfig = getSourceConfig(campaign.source_type);
  const statusConfig = getStatusConfig(campaign.status);

  return (
    <tr 
      className={`hover:bg-gray-50 transition-colors cursor-pointer ${
        selected ? 'bg-[#f0fdff] border-l-4 border-l-[#02a4bf]' : ''
      }`}
      onClick={handleViewCampaign}
    >
      {/* Checkbox */}
      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => onSelect(e.target.checked)}
          className="w-5 h-5 text-[#02a4bf] border-gray-300 rounded focus:ring-[#02a4bf]"
        />
      </td>

      {/* Campaign Name */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-11 h-11 rounded-lg flex items-center justify-center border-2 flex-shrink-0"
            style={{ 
              backgroundColor: sourceConfig.bg, 
              borderColor: sourceConfig.border 
            }}
          >
            <span className="text-xl">{sourceConfig.icon}</span>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="text-[#231f20] truncate hover:text-[#02a4bf] transition-colors max-w-md">
              {campaign.name}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-400 font-mono">ID: {campaign.id}</span>
              <button
                onClick={handleCopyId}
                className="text-gray-400 hover:text-[#02a4bf] transition-colors"
                title="Copy ID"
              >
                <span className="text-xs">📋</span>
              </button>
            </div>
          </div>
        </div>
      </td>

      {/* Source */}
      <td className="px-6 py-4">
        <div className="flex justify-center">
          <span 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
            style={{ 
              backgroundColor: sourceConfig.bg, 
              color: sourceConfig.color 
            }}
          >
            <span>{sourceConfig.icon}</span>
            <span>{sourceConfig.label}</span>
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <div className="flex flex-col items-center gap-2">
          <span 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
            style={{ 
              backgroundColor: statusConfig.bg, 
              color: statusConfig.color 
            }}
          >
            <span className={statusConfig.spinning ? 'inline-block animate-spin' : ''}>
              {statusConfig.icon}
            </span>
            <span>{statusConfig.label}</span>
          </span>
          
          {campaign.status === 'processing' && campaign.progress !== undefined && (
            <div className="w-full max-w-[120px]">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${campaign.progress * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 mt-0.5 block text-center">
                {Math.round(campaign.progress * 100)}%
              </span>
            </div>
          )}
        </div>
      </td>

      {/* Results */}
      <td className="px-6 py-4 text-right">
        <div>
          <div className="text-xl text-[#231f20]">
            {campaign.total_results.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">
            {campaign.total_results === 0 ? 'no results' : 'leads'}
          </div>
        </div>
      </td>

      {/* Created */}
      <td className="px-6 py-4">
        <div>
          <div className="text-sm text-[#231f20]">{formatDate(campaign.created_at)}</div>
          <div className="text-xs text-gray-400">{formatTime(campaign.created_at)}</div>
          <div className="text-xs text-gray-500 mt-0.5">{getRelativeTime(campaign.created_at)}</div>
        </div>
      </td>

      {/* Created By */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#02a4bf] text-white flex items-center justify-center text-sm border-2 border-white shadow-sm">
            {campaign.created_by.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="text-sm text-[#231f20] hover:text-[#02a4bf] transition-colors truncate max-w-[120px]">
            {campaign.created_by.name}
          </div>
        </div>
      </td>

      {/* Last Updated */}
      <td className="px-6 py-4">
        <div>
          <div className="text-sm text-[#231f20]">{formatDate(campaign.updated_at)}</div>
          <div className="text-xs text-gray-400">{formatTime(campaign.updated_at)}</div>
          <div className="text-xs text-gray-500 mt-0.5">{getRelativeTime(campaign.updated_at)}</div>
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleViewCampaign}
            className="px-4 py-2 bg-[#02a4bf] text-white rounded-md hover:bg-[#028a9f] transition-all shadow-sm text-sm"
          >
            View
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-9 h-9 border border-gray-200 rounded-md hover:border-[#02a4bf] hover:bg-gray-50 transition-all flex items-center justify-center"
            >
              <span className="text-gray-600">⋮</span>
            </button>

            {showMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20">
                  <button
                    onClick={() => handleMenuAction('view')}
                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
                  >
                    <span>👁️</span>
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={() => handleMenuAction('edit')}
                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
                  >
                    <span>✏️</span>
                    <span>Edit Campaign</span>
                  </button>
                  <button
                    onClick={() => handleMenuAction('duplicate')}
                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
                  >
                    <span>📋</span>
                    <span>Duplicate Campaign</span>
                  </button>
                  
                  <div className="h-px bg-gray-200 my-2" />
                  
                  {campaign.status === 'processing' || campaign.status === 'queued' ? (
                    <button
                      onClick={() => handleMenuAction('pause')}
                      className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
                    >
                      <span>⏸</span>
                      <span>Pause Campaign</span>
                    </button>
                  ) : campaign.status === 'paused' ? (
                    <button
                      onClick={() => handleMenuAction('resume')}
                      className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
                    >
                      <span>▶️</span>
                      <span>Resume Campaign</span>
                    </button>
                  ) : null}
                  
                  <div className="h-px bg-gray-200 my-2" />
                  
                  <button
                    onClick={() => handleMenuAction('export')}
                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
                  >
                    <span>↓</span>
                    <span>Export Results</span>
                  </button>
                  
                  <div className="h-px bg-gray-200 my-2" />
                  
                  <button
                    onClick={() => handleMenuAction('delete')}
                    className="w-full px-4 py-2.5 text-left hover:bg-red-50 flex items-center gap-3 text-sm text-red-600"
                  >
                    <span>🗑️</span>
                    <span>Delete Campaign</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}