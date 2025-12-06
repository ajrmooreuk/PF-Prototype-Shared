'use client';

import React from 'react';
import {
  CheckCircle,
  Circle,
  Loader2,
  AlertCircle,
  FileSearch,
  Network,
  Shield,
  Lightbulb,
  GitBranch,
  LayoutGrid,
  FileText
} from 'lucide-react';
import type { AnalysisProgress as ProgressType } from '@/types/analysis';

// ============================================================================
// Types
// ============================================================================

interface AnalysisProgressProps {
  progress: ProgressType;
  error?: string;
}

interface Stage {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  threshold: number;
}

// ============================================================================
// Constants
// ============================================================================

const STAGES: Stage[] = [
  { key: 'init', label: 'Initializing', icon: FileSearch, threshold: 0 },
  { key: 'graph', label: 'Building Graph', icon: Network, threshold: 0.10 },
  { key: 'gaps', label: 'Detecting Gaps', icon: Circle, threshold: 0.20 },
  { key: 'threats', label: 'Analyzing Threats', icon: Shield, threshold: 0.35 },
  { key: 'opportunities', label: 'Finding Opportunities', icon: Lightbulb, threshold: 0.50 },
  { key: 'bridges', label: 'Finding Bridges', icon: GitBranch, threshold: 0.65 },
  { key: 'priority', label: 'Building Priority Matrix', icon: LayoutGrid, threshold: 0.80 },
  { key: 'recommendations', label: 'Generating Recommendations', icon: FileText, threshold: 0.90 },
  { key: 'complete', label: 'Complete', icon: CheckCircle, threshold: 1.0 },
];

// ============================================================================
// Component
// ============================================================================

export function AnalysisProgress({ progress, error }: AnalysisProgressProps) {
  const currentStageIndex = STAGES.findIndex(
    (stage, index) =>
      progress.percentage >= stage.threshold &&
      (index === STAGES.length - 1 || progress.percentage < STAGES[index + 1].threshold)
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4">Analysis Progress</h3>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{progress.message}</span>
          <span>{Math.round(progress.percentage * 100)}%</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              error ? 'bg-red-500' : progress.percentage >= 1 ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progress.percentage * 100}%` }}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-800">Analysis Failed</p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Stages */}
      <div className="space-y-3">
        {STAGES.map((stage, index) => {
          const Icon = stage.icon;
          const isComplete = progress.percentage > stage.threshold;
          const isCurrent = index === currentStageIndex;
          const isPending = !isComplete && !isCurrent;

          return (
            <div
              key={stage.key}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                isCurrent ? 'bg-blue-50 border border-blue-200' :
                isComplete ? 'bg-green-50' :
                'bg-gray-50'
              }`}
            >
              <div className={`flex-shrink-0 ${
                isComplete ? 'text-green-500' :
                isCurrent ? 'text-blue-500' :
                'text-gray-400'
              }`}>
                {isCurrent && !error ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isComplete ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <span className={`text-sm ${
                isComplete ? 'text-green-700' :
                isCurrent ? 'text-blue-700 font-medium' :
                'text-gray-500'
              }`}>
                {stage.label}
              </span>
              {isCurrent && !error && (
                <span className="ml-auto text-xs text-blue-500">In Progress</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
