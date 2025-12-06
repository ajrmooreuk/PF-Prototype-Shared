'use client';

import React, { useState, useCallback } from 'react';
import { AnalysisRequestForm } from '@/components/forms/AnalysisRequestForm';
import { AnalysisProgress } from '@/components/display/AnalysisProgress';
import { AnalysisResults } from '@/components/display/AnalysisResults';
import type { AnalysisRequest, AnalysisProgress as ProgressType, GapAnalysisReport } from '@/types/analysis';

// Mock API call - in production, this would call the actual API
async function runAnalysis(
  request: AnalysisRequest,
  onProgress: (progress: ProgressType) => void
): Promise<GapAnalysisReport> {
  // Simulate analysis stages
  const stages = [
    { message: 'Initializing analysis...', percentage: 0.05 },
    { message: 'Building knowledge graph...', percentage: 0.15 },
    { message: 'Detecting structural gaps...', percentage: 0.30 },
    { message: 'Analyzing threats...', percentage: 0.45 },
    { message: 'Identifying opportunities...', percentage: 0.60 },
    { message: 'Finding bridge concepts...', percentage: 0.75 },
    { message: 'Building priority matrix...', percentage: 0.85 },
    { message: 'Generating recommendations...', percentage: 0.95 },
    { message: 'Analysis complete!', percentage: 1.0 },
  ];

  for (const stage of stages) {
    await new Promise(resolve => setTimeout(resolve, 800));
    onProgress({ ...stage, stage: stage.message });
  }

  // Return mock report
  return {
    reportId: crypto.randomUUID(),
    sessionId: request.sessionId || crypto.randomUUID(),
    analysisType: request.analysisType,
    domainInstance: request.domainType,
    dateCreated: new Date().toISOString(),
    status: 'completed',
    alignedObjectives: request.strategicObjectives,
    linkedOkrs: request.linkedOkrs,
    entityCount: request.targetEntities.length,
    relationshipCount: Math.floor(request.targetEntities.length * 1.5),
    timeframe: request.timeframe,
    comparators: request.competitors.map(c => c.name),
    identifiedGaps: [
      {
        gapId: crypto.randomUUID(),
        gapType: 'structural_hole',
        title: 'Content Gap: AI Platform Coverage',
        description: 'Limited presence in emerging AI assistant platforms. Content optimized for traditional search may not surface in AI-generated responses.',
        severity: 'high',
        confidence: 0.85,
        evidence: [{ source: 'Analysis', metric: 'visibility_score', value: 0.35, description: 'Low visibility in AI responses' }],
        affectedEntities: request.targetEntities.slice(0, 2).map(e => e.id),
      },
      {
        gapId: crypto.randomUUID(),
        gapType: 'competitive',
        title: 'Competitive Gap: Market Positioning',
        description: 'Competitors have established stronger presence in key topic areas. This gap is widening as competitors invest in content strategy.',
        severity: 'medium',
        confidence: 0.78,
        evidence: [{ source: 'Competitor Analysis', metric: 'market_share', value: 0.22, description: 'Relative market share' }],
        affectedEntities: request.targetEntities.slice(0, 3).map(e => e.id),
      },
      {
        gapId: crypto.randomUUID(),
        gapType: 'capability',
        title: 'Capability Gap: Technical Integration',
        description: 'Missing technical capabilities for seamless integration with AI platforms and automated content optimization.',
        severity: 'medium',
        confidence: 0.72,
        evidence: [{ source: 'Technical Assessment', metric: 'integration_score', value: 0.45, description: 'Integration capability score' }],
        affectedEntities: [request.targetEntities[0]?.id].filter(Boolean),
      },
    ],
    threats: [
      {
        threatId: crypto.randomUUID(),
        relatedGaps: [],
        threatType: 'competitive',
        title: 'Competitor Content Surge',
        description: 'Major competitors are rapidly expanding AI-optimized content, threatening market position.',
        probability: 0.75,
        impact: 0.80,
        riskScore: 0.60,
        mitigationOptions: [
          { option: 'Accelerate content production', effort: 'high', effectiveness: 0.75 },
          { option: 'Partner with AI platforms', effort: 'medium', effectiveness: 0.70 },
        ],
      },
      {
        threatId: crypto.randomUUID(),
        relatedGaps: [],
        threatType: 'technology',
        title: 'Platform Algorithm Changes',
        description: 'AI platforms may change algorithms, impacting current optimization strategies.',
        probability: 0.60,
        impact: 0.65,
        riskScore: 0.39,
        mitigationOptions: [
          { option: 'Diversify platform presence', effort: 'medium', effectiveness: 0.80 },
        ],
      },
    ],
    opportunities: [
      {
        opportunityId: crypto.randomUUID(),
        relatedGaps: [],
        opportunityType: 'content',
        title: 'AI-Native Content Strategy',
        description: 'Develop content specifically optimized for AI assistant responses, capturing emerging traffic.',
        potentialValue: { revenueImpact: 'Significant ($100K+)', marketShareGain: '5-10%', competitiveAdvantage: 'First-mover in AI optimization' },
        feasibility: 0.82,
        timeToValue: '3-6 months',
        requiredCapabilities: ['AI Content Optimization', 'Schema Markup'],
        bridgeConcepts: ['conversational content', 'structured data', 'entity optimization'],
      },
      {
        opportunityId: crypto.randomUUID(),
        relatedGaps: [],
        opportunityType: 'partnership',
        title: 'AI Platform Partnership',
        description: 'Strategic partnership with AI platform providers for preferred content visibility.',
        potentialValue: { revenueImpact: 'Moderate ($50K-$100K)', competitiveAdvantage: 'Exclusive platform access' },
        feasibility: 0.65,
        timeToValue: '6-12 months',
        requiredCapabilities: ['Business Development', 'Technical Integration'],
        bridgeConcepts: ['platform integration', 'API development'],
      },
    ],
    priorityMatrix: {
      dimensions: ['impact', 'effort', 'urgency', 'alignment'],
      quadrants: {
        quickWins: [crypto.randomUUID()],
        majorProjects: [crypto.randomUUID()],
        fillIns: [],
        hardSlogs: [],
      },
      rankedList: [],
    },
    recommendations: [
      {
        recommendationId: crypto.randomUUID(),
        addressesGaps: [],
        addressesThreats: [],
        enablesOpportunities: [],
        title: 'Launch AI Content Optimization Initiative',
        description: 'Develop and implement a comprehensive AI-optimized content strategy targeting major AI platforms including Claude, GPT, and Perplexity.',
        actionType: 'content',
        priority: 'high',
        implementationPhases: [
          { phase: 1, name: 'Content Audit', deliverables: ['Gap analysis', 'Opportunity map'], estimatedEffort: '2 weeks' },
          { phase: 2, name: 'Strategy Development', deliverables: ['Content calendar', 'Optimization guidelines'], estimatedEffort: '3 weeks' },
          { phase: 3, name: 'Implementation', deliverables: ['New content', 'Optimized existing content'], estimatedEffort: '8 weeks' },
        ],
        dependencies: ['Content team capacity', 'AI platform access'],
        risks: ['Resource constraints', 'Platform changes'],
      },
      {
        recommendationId: crypto.randomUUID(),
        addressesGaps: [],
        addressesThreats: [],
        enablesOpportunities: [],
        title: 'Establish Competitive Monitoring System',
        description: 'Implement continuous monitoring of competitor AI visibility to identify threats and opportunities early.',
        actionType: 'process',
        priority: 'medium',
        implementationPhases: [
          { phase: 1, name: 'Tool Selection', deliverables: ['Tool evaluation', 'Vendor selection'], estimatedEffort: '1 week' },
          { phase: 2, name: 'Setup & Configuration', deliverables: ['Monitoring dashboards', 'Alert systems'], estimatedEffort: '2 weeks' },
        ],
        dependencies: ['Budget approval', 'Tool access'],
        risks: ['Tool limitations'],
      },
    ],
    executiveSummary: {
      keyFindings: [
        'Identified 3 critical gaps in AI platform visibility',
        'Detected 2 competitive threats requiring immediate attention',
        'Found 2 high-feasibility opportunities for market expansion',
      ],
      criticalGapsCount: 1,
      highPriorityOpportunities: 2,
      recommendedNextSteps: [
        'Review and prioritize critical content gaps',
        'Initiate AI content optimization pilot',
        'Establish competitive monitoring',
        'Explore platform partnership opportunities',
      ],
      estimatedTotalValue: '$150K-$250K potential impact',
    },
  };
}

export default function HomePage() {
  const [analysisState, setAnalysisState] = useState<'idle' | 'running' | 'complete'>('idle');
  const [progress, setProgress] = useState<ProgressType>({ message: '', percentage: 0, stage: '' });
  const [report, setReport] = useState<GapAnalysisReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (request: AnalysisRequest) => {
    setAnalysisState('running');
    setError(null);
    setProgress({ message: 'Starting analysis...', percentage: 0, stage: 'init' });

    try {
      const result = await runAnalysis(request, setProgress);
      setReport(result);
      setAnalysisState('complete');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      setAnalysisState('idle');
    }
  }, []);

  const handleReset = useCallback(() => {
    setAnalysisState('idle');
    setReport(null);
    setProgress({ message: '', percentage: 0, stage: '' });
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">CGA Agent</h1>
              <p className="text-sm text-gray-500">Comparative Gap Analysis</p>
            </div>
            {analysisState === 'complete' && (
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                New Analysis
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {analysisState === 'idle' && (
          <AnalysisRequestForm onSubmit={handleSubmit} />
        )}

        {analysisState === 'running' && (
          <div className="max-w-xl mx-auto">
            <AnalysisProgress progress={progress} error={error || undefined} />
          </div>
        )}

        {analysisState === 'complete' && report && (
          <AnalysisResults report={report} />
        )}
      </main>
    </div>
  );
}
