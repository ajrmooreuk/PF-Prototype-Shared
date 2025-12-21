import React, { useState } from 'react';

interface Props {
  count: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function BulkDeleteModal({ count, onConfirm, onCancel }: Props) {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (confirmed) {
      onConfirm();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onCancel}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-7 border-b border-red-100">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
              <span className="text-5xl animate-pulse">⚠️</span>
            </div>
            <h2 className="text-center text-[#231f20] text-2xl mb-2">
              Delete {count} Campaign{count !== 1 ? 's' : ''}?
            </h2>
            <p className="text-center text-red-600 text-sm">
              This action cannot be undone
            </p>
          </div>

          {/* Body */}
          <div className="p-6 bg-red-50">
            {/* Impact Summary */}
            <div className="bg-white border border-red-200 rounded-lg p-4 mb-5">
              <p className="text-sm text-[#231f20] mb-3">
                <strong>What will be deleted:</strong>
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>{count} campaign{count !== 1 ? 's' : ''}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>All leads associated with {count === 1 ? 'this campaign' : 'these campaigns'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>Campaign history and logs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>All associated notes and tags</span>
                </li>
              </ul>
            </div>

            {/* Warning Message */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded mb-5">
              <div className="flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <p className="text-sm text-amber-900">
                  This will permanently delete all data associated with {count === 1 ? 'this campaign' : 'these campaigns'}. Exported data will not be affected.
                </p>
              </div>
            </div>

            {/* Confirmation Checkbox */}
            <label className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="w-5 h-5 text-red-600 border-red-300 rounded focus:ring-red-500 mt-0.5 flex-shrink-0"
              />
              <span className="text-sm text-[#231f20] select-none">
                I understand this action is permanent and cannot be undone
              </span>
            </label>
          </div>

          {/* Footer */}
          <div className="bg-white border-t border-gray-200 p-6 flex items-center justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-6 h-12 border-2 border-gray-200 rounded-lg text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            
            <button
              onClick={handleConfirm}
              disabled={!confirmed}
              className="px-6 h-12 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              Delete Campaign{count !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
