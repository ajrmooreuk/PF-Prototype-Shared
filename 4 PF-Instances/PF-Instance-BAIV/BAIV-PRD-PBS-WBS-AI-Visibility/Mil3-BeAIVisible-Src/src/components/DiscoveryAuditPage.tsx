import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  Zap,
  Download,
  Filter,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  ArrowRight as ArrowStable,
  Trophy,
  Loader2,
  Play
} from 'lucide-react';
import { AuditScorecard } from './audit/AuditScorecard';
import { PlatformPerformanceGrid } from './audit/PlatformPerformanceGrid';
import { ICPRelevanceAnalysis } from './audit/ICPRelevanceAnalysis';
import { ContentGapsTable } from './audit/ContentGapsTable';
import { TargetKeywords } from './audit/TargetKeywords';
import { CompetitiveIntelligence } from './audit/CompetitiveIntelligence';
import {
  discoveryAuditAPI,
  transformAuditDataForUI,
  tenantsAPI,
  discoveryIntelligenceAPI,
  discoveryReportsAPI
} from '../lib/eccoAPI';
import { toast } from 'sonner';

interface DiscoveryAuditPageProps {
  tenantId?: string;
  jwtToken?: string;
  onNavigate?: (page: string) => void;
}

export function DiscoveryAuditPage({ tenantId = 'demo-tenant-id', jwtToken = 'demo-jwt-token', onNavigate }: DiscoveryAuditPageProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [auditData, setAuditData] = useState<any>(null);

  useEffect(() => {
    const fetchAuditData = async () => {
      try {
        // Use new discoveryAuditAPI.getLatest() - NO tenant_id query param needed
        // Backend extracts tenant_id from JWT token automatically
        const response = await discoveryAuditAPI.getLatest();

        if (response.status === 'completed') {
          // Use transformAuditDataForUI helper to map backend response to UI structure
          const transformedData = transformAuditDataForUI(response);
          setAuditData(transformedData);
          setIsLoading(false);
        } else {
          console.log('No completed audit found or audit not completed yet');
          setIsLoading(false);
        }

      } catch (error) {
        console.error('Failed to fetch audit data:', error);
        toast.error('Failed to fetch audit data. Please run your first audit.');
        setIsLoading(false);
      }
    };

    fetchAuditData();
  }, [tenantId]);

  const handleRunAudit = async () => {
    setIsRunning(true);
    setProgress(0);
    setStatusMessage('Initializing audit...');

    try {
      // Step 1: Create audit with required parameters
      setProgress(10);
      setStatusMessage('Creating audit...');

      // Fetch tenant data to get domain and keywords
      setStatusMessage('Fetching tenant data...');
      const tenantData = await tenantsAPI.getMe();

      console.log('Tenant data:', tenantData);

      // Use tenant data for audit creation
      // NOTE: client_id references a non-existent 'clients' table, so we set it to null
      const createParams = {
        client_id: null as any, // clients table doesn't exist yet
        domain: tenantData.domain || 'example.com',
        target_keywords: tenantData.target_keywords?.length > 0
          ? tenantData.target_keywords
          : ['AI visibility', 'brand discovery', 'AI search optimization'],
        platforms: ['chatgpt', 'claude', 'perplexity', 'gemini'],
        include_youtube_analysis: false,
        include_competitor_analysis: false,
        competitor_domains: []
      };

      // Use new discoveryAuditAPI.create() with proper parameters
      const createResponse = await discoveryAuditAPI.create(createParams);

      const auditId = createResponse.id;
      console.log('Audit created:', auditId);

      // Step 2: Trigger audit run
      setProgress(20);
      setStatusMessage('Starting audit run...');

      // Use new discoveryAuditAPI.run()
      await discoveryAuditAPI.run(auditId);

      toast.success('Discovery audit started!');

      // Step 3: Poll for latest results
      setProgress(30);
      setStatusMessage('Processing audit...');

      const maxAttempts = 60;
      const intervalMs = 5000;

      for (let i = 0; i < maxAttempts; i++) {
        // Use new discoveryAuditAPI.getLatest() - NO tenant_id query param
        const latestResponse = await discoveryAuditAPI.getLatest();

        // Update progress
        const currentProgress = 30 + Math.min(65, (i / maxAttempts) * 65);
        setProgress(Math.round(currentProgress));
        setStatusMessage(`Processing... (${Math.round(currentProgress)}%)`);

        if (latestResponse.status === 'completed') {
          // Step 4: Generate comprehensive report
          // ⚠️ CRITICAL: This populates keywords and social targets in tenant table
          setProgress(90);
          setStatusMessage('Generating intelligence report...');

          try {
            console.log('🤖 Generating discovery report...');
            const report = await discoveryReportsAPI.generate(latestResponse.id);
            console.log('✅ Report generated:', report.id);
            console.log('✅ Keywords and social targets saved to tenant');
          } catch (reportErr) {
            console.error('⚠️ Failed to generate report:', reportErr);
            // Don't fail the whole audit if report generation fails
            toast.warning('Audit completed but report generation failed');
          }

          // Step 5: Fetch intelligence data for dashboard sections
          setProgress(95);
          setStatusMessage('Loading intelligence data...');

          try {
            console.log('📊 Fetching discovery intelligence...');

            // Fetch all intelligence data in parallel
            const [opportunities, platforms, competitive, rrf] = await Promise.all([
              discoveryIntelligenceAPI.getOpportunities(20).catch(() => ({ items: [], total: 0 })),
              discoveryIntelligenceAPI.getPlatformVisibility().catch(() => ({ platforms: {} })),
              discoveryIntelligenceAPI.getCompetitiveAnalysis().catch(() => null),
              discoveryIntelligenceAPI.getRRFCoverage().catch(() => ({ items: [] }))
            ]);

            console.log('✅ Intelligence data loaded');
            console.log('  - Opportunities:', opportunities.total);
            console.log('  - Platforms:', Object.keys(platforms.platforms || {}).length);
            console.log('  - RRF Topics:', rrf.items?.length || 0);

            // Enhance transformed data with intelligence
            const transformedData = transformAuditDataForUI(latestResponse);
            transformedData.intelligence = {
              opportunities: opportunities.items || [],
              platformPerformance: platforms.platforms || {},
              competitiveAnalysis: competitive,
              rrfCoverage: rrf.items || []
            };

            setAuditData(transformedData);
          } catch (intelligenceErr) {
            console.error('⚠️ Failed to fetch intelligence data:', intelligenceErr);
            // Still show audit data even if intelligence fails
            const transformedData = transformAuditDataForUI(latestResponse);
            setAuditData(transformedData);
          }

          setProgress(100);
          setStatusMessage('Audit completed!');
          toast.success('Audit completed successfully!');
          break;
        }

        if (latestResponse.status === 'failed') {
          throw new Error(latestResponse.error_message || 'Audit failed');
        }

        // Wait before next poll
        await new Promise(resolve => setTimeout(resolve, intervalMs));
      }

    } catch (error: any) {
      console.error('Audit failed:', error);
      const errorMessage = error?.message || 'Audit failed. Please try again.';
      setStatusMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setTimeout(() => {
        setIsRunning(false);
        setProgress(0);
        setStatusMessage('');
      }, 2000);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-6 space-y-6">
      {/* Page Header */}
      <Card className="bg-white rounded-2xl shadow-sm p-6">
        <div className="mb-2">
          <p className="text-gray-500 text-sm" style={{ fontFamily: 'Open Sans' }}>
            Home &gt; Discovery Audit
          </p>
        </div>
        
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 
              className="text-[#005260] mb-2" 
              style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}
            >
              🔍 Discovery Audit Results
            </h1>
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Open Sans' }}>
              Last Audit: {auditData ? auditData.lastAudit : 'N/A'}
            </p>
          </div>
          
          <Button
            className="bg-[#02a4bf] hover:bg-[#028a9f] text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ fontFamily: 'Poppins', fontWeight: 600 }}
            onClick={handleRunAudit}
            disabled={isRunning}
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Running Audit
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Run New Audit
              </>
            )}
          </Button>
        </div>
        
        <Badge 
          className="bg-green-100 text-green-700 hover:bg-green-100 border-0 px-3 py-1"
          style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
        >
          ✅ Completed in {auditData ? auditData.completionTime : 'N/A'}
        </Badge>

        {/* Progress Indicator */}
        {isRunning && (
          <div className="mt-4 space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
              {statusMessage}
            </p>
          </div>
        )}
      </Card>

      {/* AI Visibility Scorecard */}
      {auditData && (
        <AuditScorecard 
          visibilityScore={auditData.visibilityScore}
          citations={auditData.citations}
          opportunities={auditData.opportunities}
          platformsTested={auditData.platformsTested}
          queriesTested={auditData.queriesTested}
          sevenDayChange={auditData.sevenDayChange}
        />
      )}

      {/* Platform Performance Grid */}
      {auditData && (
        <PlatformPerformanceGrid platforms={auditData.platforms} />
      )}

      {/* ICP Relevance Analysis */}
      {auditData && (
        <ICPRelevanceAnalysis platforms={auditData.platforms} />
      )}

      {/* Content Gaps Table */}
      {auditData && (
        <ContentGapsTable gaps={auditData.contentGaps} />
      )}

      {/* Target Keywords */}
      {auditData && (
        <TargetKeywords keywords={auditData.keywords} />
      )}

      {/* Competitive Intelligence */}
      {auditData && (
        <CompetitiveIntelligence competitors={auditData.competitors} />
      )}
    </div>
  );
}