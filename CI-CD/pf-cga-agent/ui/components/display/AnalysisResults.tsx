'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  TrendingUp,
  Lightbulb,
  Target,
  ChevronDown,
  ChevronRight,
  BarChart3,
  CheckCircle,
  Clock,
  Zap,
} from 'lucide-react';
import type {
  GapAnalysisReport,
  IdentifiedGap,
  ThreatAssessment,
  OpportunityAssessment,
  Recommendation,
  Severity,
} from '@/types/analysis';

// ============================================================================
// Helper Components
// ============================================================================

function SeverityBadge({ severity }: { severity: Severity }) {
  const styles = {
    critical: 'bg-red-100 text-red-800 border-red-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${styles[severity]}`}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
}

function ConfidenceBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${
            value >= 0.8 ? 'bg-green-500' :
            value >= 0.6 ? 'bg-yellow-500' :
            'bg-red-500'
          }`}
          style={{ width: `${value * 100}%` }}
        />
      </div>
      <span className="text-xs text-gray-500">{Math.round(value * 100)}%</span>
    </div>
  );
}

function CollapsibleSection({
  title,
  icon: Icon,
  count,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-gray-500" />
          <span className="font-medium">{title}</span>
          <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">
            {count}
          </span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {isOpen && <div className="p-4 space-y-4">{children}</div>}
    </div>
  );
}

// ============================================================================
// Gap Card
// ============================================================================

function GapCard({ gap }: { gap: IdentifiedGap }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900">{gap.title}</h4>
        <SeverityBadge severity={gap.severity} />
      </div>
      <p className="text-sm text-gray-600 mb-3">{gap.description}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          Type: <span className="font-medium">{gap.gapType.replace('_', ' ')}</span>
        </span>
        <div className="w-32">
          <ConfidenceBar value={gap.confidence} />
        </div>
      </div>
      {gap.affectedEntities.length > 0 && (
        <div className="mt-3 pt-3 border-t">
          <span className="text-xs text-gray-500">Affected: </span>
          <span className="text-xs text-gray-700">
            {gap.affectedEntities.slice(0, 3).join(', ')}
            {gap.affectedEntities.length > 3 && ` +${gap.affectedEntities.length - 3} more`}
          </span>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Threat Card
// ============================================================================

function ThreatCard({ threat }: { threat: ThreatAssessment }) {
  const riskColor = threat.riskScore >= 0.7 ? 'text-red-600' :
                    threat.riskScore >= 0.4 ? 'text-orange-600' : 'text-yellow-600';

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900">{threat.title}</h4>
        <span className={`text-lg font-bold ${riskColor}`}>
          {Math.round(threat.riskScore * 100)}%
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{threat.description}</p>
      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
        <div>
          <span className="text-gray-500">Probability:</span>
          <ConfidenceBar value={threat.probability} />
        </div>
        <div>
          <span className="text-gray-500">Impact:</span>
          <ConfidenceBar value={threat.impact} />
        </div>
      </div>
      {threat.mitigationOptions.length > 0 && (
        <div className="mt-3 pt-3 border-t">
          <span className="text-xs font-medium text-gray-700">Mitigation Options:</span>
          <ul className="mt-1 space-y-1">
            {threat.mitigationOptions.slice(0, 2).map((option, i) => (
              <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-500" />
                {option.option} ({Math.round(option.effectiveness * 100)}% effective)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Opportunity Card
// ============================================================================

function OpportunityCard({ opportunity }: { opportunity: OpportunityAssessment }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900">{opportunity.title}</h4>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{opportunity.timeToValue || 'TBD'}</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-3">{opportunity.description}</p>
      <div className="mb-3">
        <span className="text-xs text-gray-500">Feasibility:</span>
        <ConfidenceBar value={opportunity.feasibility} />
      </div>
      {opportunity.bridgeConcepts.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {opportunity.bridgeConcepts.slice(0, 3).map((concept, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
            >
              {concept}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Recommendation Card
// ============================================================================

function RecommendationCard({ recommendation, rank }: { recommendation: Recommendation; rank: number }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
          {rank}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-gray-900">{recommendation.title}</h4>
            <SeverityBadge severity={recommendation.priority} />
          </div>
          <p className="text-sm text-gray-600 mb-3">{recommendation.description}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {recommendation.actionType}
            </span>
            {recommendation.implementationPhases.length > 0 && (
              <span>{recommendation.implementationPhases.length} phases</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Priority Matrix
// ============================================================================

function PriorityMatrixDisplay({ report }: { report: GapAnalysisReport }) {
  const matrix = report.priorityMatrix;
  if (!matrix) return null;

  const quadrants = [
    { key: 'quickWins', label: 'Quick Wins', items: matrix.quadrants.quickWins, color: 'bg-green-100 border-green-300' },
    { key: 'majorProjects', label: 'Major Projects', items: matrix.quadrants.majorProjects, color: 'bg-blue-100 border-blue-300' },
    { key: 'fillIns', label: 'Fill-Ins', items: matrix.quadrants.fillIns, color: 'bg-yellow-100 border-yellow-300' },
    { key: 'hardSlogs', label: 'Hard Slogs', items: matrix.quadrants.hardSlogs, color: 'bg-red-100 border-red-300' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {quadrants.map((quadrant) => (
        <div key={quadrant.key} className={`p-4 rounded-lg border-2 ${quadrant.color}`}>
          <h4 className="font-medium mb-2">{quadrant.label}</h4>
          <span className="text-2xl font-bold">{quadrant.items.length}</span>
          <span className="text-sm text-gray-600 ml-1">items</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Executive Summary
// ============================================================================

function ExecutiveSummaryDisplay({ report }: { report: GapAnalysisReport }) {
  const summary = report.executiveSummary;
  if (!summary) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100">
      <h3 className="text-lg font-semibold mb-4 text-indigo-900">Executive Summary</h3>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-3xl font-bold text-red-600">{summary.criticalGapsCount}</div>
          <div className="text-sm text-gray-600">Critical Gaps</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-3xl font-bold text-green-600">{summary.highPriorityOpportunities}</div>
          <div className="text-sm text-gray-600">High-Priority Opportunities</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-3xl font-bold text-blue-600">{report.recommendations.length}</div>
          <div className="text-sm text-gray-600">Recommendations</div>
        </div>
      </div>

      {summary.keyFindings.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-indigo-900 mb-2">Key Findings</h4>
          <ul className="space-y-1">
            {summary.keyFindings.map((finding, i) => (
              <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                <Target className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                {finding}
              </li>
            ))}
          </ul>
        </div>
      )}

      {summary.recommendedNextSteps.length > 0 && (
        <div>
          <h4 className="font-medium text-indigo-900 mb-2">Recommended Next Steps</h4>
          <ol className="space-y-1">
            {summary.recommendedNextSteps.map((step, i) => (
              <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-medium">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

interface AnalysisResultsProps {
  report: GapAnalysisReport;
}

export function AnalysisResults({ report }: AnalysisResultsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gap Analysis Report</h2>
            <p className="text-gray-500">
              {report.domainInstance} | {report.analysisType} | {new Date(report.dateCreated).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {report.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{report.entityCount}</div>
            <div className="text-xs text-gray-500">Entities Analyzed</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{report.identifiedGaps.length}</div>
            <div className="text-xs text-gray-500">Gaps Found</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{report.threats.length}</div>
            <div className="text-xs text-gray-500">Threats Identified</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{report.opportunities.length}</div>
            <div className="text-xs text-gray-500">Opportunities Found</div>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <ExecutiveSummaryDisplay report={report} />

      {/* Priority Matrix */}
      {report.priorityMatrix && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-gray-500" />
            Priority Matrix
          </h3>
          <PriorityMatrixDisplay report={report} />
        </div>
      )}

      {/* Recommendations */}
      {report.recommendations.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Strategic Recommendations
          </h3>
          <div className="space-y-4">
            {report.recommendations.map((rec, index) => (
              <RecommendationCard key={rec.recommendationId} recommendation={rec} rank={index + 1} />
            ))}
          </div>
        </div>
      )}

      {/* Detailed Findings */}
      <div className="space-y-4">
        <CollapsibleSection
          title="Identified Gaps"
          icon={Target}
          count={report.identifiedGaps.length}
          defaultOpen={true}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.identifiedGaps.map((gap) => (
              <GapCard key={gap.gapId} gap={gap} />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          title="Threat Assessments"
          icon={AlertTriangle}
          count={report.threats.length}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.threats.map((threat) => (
              <ThreatCard key={threat.threatId} threat={threat} />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          title="Opportunities"
          icon={TrendingUp}
          count={report.opportunities.length}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.opportunities.map((opp) => (
              <OpportunityCard key={opp.opportunityId} opportunity={opp} />
            ))}
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
