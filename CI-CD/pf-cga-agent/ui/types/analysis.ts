/**
 * TypeScript types for CGA Agent UI
 */

// ============================================================================
// Enums
// ============================================================================

export type GapType = 'structural_hole' | 'capability' | 'content' | 'competitive';
export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type ThreatType = 'competitive' | 'market' | 'capability' | 'technology';
export type OpportunityType = 'market' | 'capability' | 'content' | 'partnership';
export type AnalysisType = 'comparative' | 'structural' | 'competitive';
export type AnalysisStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'cancelled';

// ============================================================================
// Input Types
// ============================================================================

export interface Entity {
  id: string;
  type: string;
  name: string;
  attributes?: Record<string, unknown>;
}

export interface Competitor {
  id: string;
  name: string;
  description?: string;
  strengths?: string[];
  weaknesses?: string[];
}

export interface AnalysisRequest {
  sessionId?: string;
  domainType: string;
  analysisScope: string;
  analysisType: AnalysisType;
  targetEntities: Entity[];
  competitors: Competitor[];
  timeframe?: string;
  weightImpact: number;
  weightEffort: number;
  weightUrgency: number;
  weightAlignment: number;
  strategicObjectives: string[];
  linkedOkrs: string[];
}

// ============================================================================
// Output Types
// ============================================================================

export interface Evidence {
  source: string;
  metric: string;
  value: number;
  description?: string;
}

export interface BusinessImpact {
  revenueRisk: Severity;
  competitiveRisk: Severity;
  opportunityCost?: string;
}

export interface IdentifiedGap {
  gapId: string;
  gapType: GapType;
  title: string;
  description: string;
  severity: Severity;
  confidence: number;
  evidence: Evidence[];
  affectedEntities: string[];
  businessImpact?: BusinessImpact;
}

export interface MitigationOption {
  option: string;
  effort: Severity;
  effectiveness: number;
}

export interface ThreatAssessment {
  threatId: string;
  relatedGaps: string[];
  threatType: ThreatType;
  title: string;
  description: string;
  probability: number;
  impact: number;
  riskScore: number;
  mitigationOptions: MitigationOption[];
}

export interface PotentialValue {
  revenueImpact?: string;
  marketShareGain?: string;
  competitiveAdvantage?: string;
}

export interface OpportunityAssessment {
  opportunityId: string;
  relatedGaps: string[];
  opportunityType: OpportunityType;
  title: string;
  description: string;
  potentialValue?: PotentialValue;
  feasibility: number;
  timeToValue?: string;
  requiredCapabilities: string[];
  bridgeConcepts: string[];
}

export interface RankedItem {
  itemId: string;
  rank: number;
  compositeScore: number;
  rationale: string;
}

export interface PriorityQuadrants {
  quickWins: string[];
  majorProjects: string[];
  fillIns: string[];
  hardSlogs: string[];
}

export interface PriorityMatrix {
  dimensions: string[];
  quadrants: PriorityQuadrants;
  rankedList: RankedItem[];
}

export interface ImplementationPhase {
  phase: number;
  name: string;
  deliverables: string[];
  estimatedEffort?: string;
}

export interface Recommendation {
  recommendationId: string;
  addressesGaps: string[];
  addressesThreats: string[];
  enablesOpportunities: string[];
  title: string;
  description: string;
  actionType: string;
  priority: Severity;
  implementationPhases: ImplementationPhase[];
  dependencies: string[];
  risks: string[];
}

export interface ExecutiveSummary {
  keyFindings: string[];
  criticalGapsCount: number;
  highPriorityOpportunities: number;
  recommendedNextSteps: string[];
  estimatedTotalValue?: string;
}

export interface GapAnalysisReport {
  reportId: string;
  sessionId: string;
  analysisType: AnalysisType;
  domainInstance: string;
  dateCreated: string;
  status: AnalysisStatus;
  alignedObjectives: string[];
  linkedOkrs: string[];
  entityCount: number;
  relationshipCount: number;
  timeframe?: string;
  comparators: string[];
  identifiedGaps: IdentifiedGap[];
  threats: ThreatAssessment[];
  opportunities: OpportunityAssessment[];
  priorityMatrix?: PriorityMatrix;
  recommendations: Recommendation[];
  executiveSummary?: ExecutiveSummary;
}

// ============================================================================
// UI State Types
// ============================================================================

export interface AnalysisProgress {
  message: string;
  percentage: number;
  stage: string;
}

export interface AnalysisSession {
  id: string;
  status: AnalysisStatus;
  request: AnalysisRequest;
  report?: GapAnalysisReport;
  progress: AnalysisProgress;
  error?: string;
  createdAt: string;
  updatedAt: string;
}
