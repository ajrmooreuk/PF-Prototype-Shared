import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import {
  Search,
  Target,
  DollarSign,
  Info,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  Eye,
  Trash2,
  Download,
  FileText,
  Lightbulb,
  TrendingUp,
  Loader2,
} from 'lucide-react';
import { callEccoAPI } from '../../lib/eccoAPI';
import { toast } from 'sonner@2.0.3';

interface ICPAnalysisData {
  audit_id: string;
  audit_date: string;
  tenant_id: string;
  icp_profile: {
    id: string;
    description: string;
    match_threshold: number;
  } | null;
  summary: {
    total_queries_analyzed: number;
    icp_matched_queries: number;
    icp_match_rate: number;
    filtered_queries: number;
    estimated_cost_savings_percent: number;
    estimated_cost_savings_dollars: number;
    trend_vs_last_audit: {
      match_rate_change: number;
      direction: 'up' | 'down';
    };
  };
  match_distribution: {
    high_match: { count: number; percentage: number; range: string };
    medium_match: { count: number; percentage: number; range: string };
    low_match: { count: number; percentage: number; range: string };
  };
  match_score_breakdown: Record<string, number>;
  top_matched_pain_points: Array<{
    pain_point: string;
    query_count: number;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    example_queries: string[];
  }>;
  icp_attributes_detected: {
    demographics: Array<{ attribute: string; query_count: number; percentage: number }>;
    pain_points: Array<{ attribute: string; query_count: number; percentage: number }>;
    goals: Array<{ attribute: string; query_count: number; percentage: number }>;
  };
  filtered_queries: Array<{
    id: string;
    query: string;
    relevance_score: number;
    filter_reason: string;
    platform: string;
    discovered_at: string;
    why_filtered: string;
  }>;
  attribute_match_breakdown: Array<{
    attribute_type: string;
    queries_matched: number;
    match_rate: number;
    top_examples: string[];
  }>;
  trend_history: Array<{
    audit_date: string;
    match_rate: number;
    total_queries: number;
  }>;
  recommendations: Array<{
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    title: string;
    description: string;
    action_url: string | null;
    estimated_impact: string;
  }>;
}

export function ICPRelevanceAnalysis() {
  const [data, setData] = useState<ICPAnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilteredQueries, setShowFilteredQueries] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [filteredQueriesPage, setFilteredQueriesPage] = useState(1);

  const tenantId = 'demo-tenant-123';

  useEffect(() => {
    loadICPAnalysis();
  }, []);

  const loadICPAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use mock data for demo purposes
      const mockData: ICPAnalysisData = {
        audit_id: 'audit-123',
        audit_date: '2025-11-10T14:30:00Z',
        tenant_id: 'demo-tenant-123',
        icp_profile: {
          id: 'icp-123',
          description: 'We target podiatry clinics and foot care practices serving diabetic patients',
          match_threshold: 75,
        },
        summary: {
          total_queries_analyzed: 342,
          icp_matched_queries: 229,
          icp_match_rate: 67,
          filtered_queries: 112,
          estimated_cost_savings_percent: 48,
          estimated_cost_savings_dollars: 127,
          trend_vs_last_audit: {
            match_rate_change: 5,
            direction: 'up',
          },
        },
        match_distribution: {
          high_match: { count: 229, percentage: 67, range: '80-100%' },
          medium_match: { count: 78, percentage: 23, range: '50-79%' },
          low_match: { count: 35, percentage: 10, range: '0-49%' },
        },
        match_score_breakdown: {
          '90-100': 89,
          '80-89': 76,
          '70-79': 64,
          '50-69': 78,
          '0-49': 35,
        },
        top_matched_pain_points: [
          {
            pain_point: 'Need better AI visibility across platforms',
            query_count: 89,
            priority: 'HIGH',
            example_queries: ['how to get featured in ChatGPT', 'improve AI search rankings'],
          },
          {
            pain_point: 'Patient education materials outdated',
            query_count: 67,
            priority: 'HIGH',
            example_queries: ['digital patient education tools'],
          },
          {
            pain_point: 'Declining organic search traffic',
            query_count: 56,
            priority: 'MEDIUM',
            example_queries: ['recover lost Google rankings'],
          },
          {
            pain_point: 'Content not getting cited by AI',
            query_count: 43,
            priority: 'MEDIUM',
            example_queries: [],
          },
          {
            pain_point: 'Uncertain about AI platform strategies',
            query_count: 38,
            priority: 'LOW',
            example_queries: [],
          },
        ],
        icp_attributes_detected: {
          demographics: [
            { attribute: 'Healthcare', query_count: 89, percentage: 26 },
            { attribute: 'Medical Practices', query_count: 67, percentage: 20 },
            { attribute: 'Small Business', query_count: 45, percentage: 13 },
          ],
          pain_points: [
            { attribute: 'Patient Education', query_count: 78, percentage: 23 },
            { attribute: 'Low AI Visibility', query_count: 56, percentage: 16 },
            { attribute: 'Content Discovery', query_count: 43, percentage: 13 },
          ],
          goals: [
            { attribute: 'Increase AI Citations', query_count: 92, percentage: 27 },
            { attribute: 'Improve Patient Outcomes', query_count: 71, percentage: 21 },
            { attribute: 'Streamline Education', query_count: 54, percentage: 16 },
          ],
        },
        filtered_queries: [
          {
            id: 'q1',
            query: 'best CRM for real estate agents',
            relevance_score: 23,
            filter_reason: 'Industry mismatch (real estate vs healthcare)',
            platform: 'ChatGPT',
            discovered_at: '2025-11-10T10:15:00Z',
            why_filtered: 'Query targets real estate industry',
          },
          {
            id: 'q2',
            query: 'enterprise HR software comparison',
            relevance_score: 18,
            filter_reason: 'Not relevant to medical practices or patient care',
            platform: 'Perplexity',
            discovered_at: '2025-11-10T10:20:00Z',
            why_filtered: 'HR software has no connection to patient education',
          },
        ],
        attribute_match_breakdown: [
          {
            attribute_type: 'Demographics',
            queries_matched: 234,
            match_rate: 68,
            top_examples: ['Healthcare (89)', 'Medical Practices (67)', 'Small Business (45)'],
          },
        ],
        trend_history: [
          { audit_date: '2025-08-15T00:00:00Z', match_rate: 59, total_queries: 287 },
          { audit_date: '2025-09-12T00:00:00Z', match_rate: 61, total_queries: 312 },
          { audit_date: '2025-10-10T00:00:00Z', match_rate: 64, total_queries: 329 },
          { audit_date: '2025-11-10T00:00:00Z', match_rate: 67, total_queries: 342 },
        ],
        recommendations: [
          {
            priority: 'HIGH',
            title: 'Address Top 3 Pain Points',
            description: 'Create content targeting: Patient education, Wound prevention, Treatment options',
            action_url: '/content-studio?source=icp_analysis',
            estimated_impact: 'Could capture 212 additional queries (62% of total)',
          },
          {
            priority: 'MEDIUM',
            title: 'Review Filtered Queries',
            description: '12 queries scored 45-50% (borderline). Consider lowering threshold to 70%?',
            action_url: null,
            estimated_impact: 'Would include 12 additional queries',
          },
          {
            priority: 'LOW',
            title: 'Update ICP Definition',
            description: "Consider adding 'orthopedic care' based on 34 related queries",
            action_url: '/settings?tab=icp',
            estimated_impact: 'Could improve match rate by 3-5%',
          },
        ],
      };
      
      setData(mockData);
      
      // Commented out real API call for now
      /*
      const response = await callEccoAPI(
        `/api/discovery-intelligence/icp-analysis?include_filtered=true`,
        'GET',
        undefined,
        { 'X-Tenant-ID': tenantId }
      );
      setData(response);
      */
    } catch (err: any) {
      if (err.error_code === 'NO_ICP_PROFILE') {
        setError('no_icp');
      } else if (err.error_code === 'NO_AUDIT_DATA') {
        setError('no_audit');
      } else {
        setError('general');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFilteredQuery = async (queryId: string) => {
    try {
      await callEccoAPI(
        `/api/discovery-intelligence/icp-analysis/filtered-queries/${queryId}`,
        'DELETE',
        undefined,
        { 'X-Tenant-ID': tenantId }
      );
      toast.success('Query permanently removed');
      loadICPAnalysis();
    } catch (err) {
      toast.error('Failed to remove query');
    }
  };

  const handleExportReport = async () => {
    try {
      // Get base URL and token (same as callEccoAPI)
      const baseURL = import.meta.env.VITE_API_BASE_URL || '';
      const token = localStorage.getItem('jwt_token') || '';

      const response = await fetch(
        `${baseURL}/api/discovery-intelligence/icp-analysis/export?format=pdf`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Export failed: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `icp-analysis-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('📥 Report downloaded successfully');
    } catch (err) {
      console.error('Export error:', err);
      toast.error('Failed to export report');
    }
  };

  const getPriorityColor = (priority: 'HIGH' | 'MEDIUM' | 'LOW') => {
    switch (priority) {
      case 'HIGH':
        return '#e84e1c';
      case 'MEDIUM':
        return '#fbbf24';
      case 'LOW':
        return '#9ca3af';
    }
  };

  const getPriorityBgColor = (priority: 'HIGH' | 'MEDIUM' | 'LOW') => {
    switch (priority) {
      case 'HIGH':
        return '#fed7d7';
      case 'MEDIUM':
        return '#fef3c7';
      case 'LOW':
        return '#f3f4f6';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#02a4bf] animate-spin mr-3" />
          <span className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            Loading ICP analysis...
          </span>
        </div>
      </div>
    );
  }

  if (error === 'no_icp') {
    return (
      <Card className="p-12 text-center">
        <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-[#1f2937] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
          Define an ICP to see relevance analysis
        </h3>
        <p className="text-[#6B7280] mb-6" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Set up your Ideal Customer Profile in Settings to filter and analyze queries
        </p>
        <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '13px', fontStyle: 'italic' }}>
          Navigate to Settings → ICP Definition to get started
        </p>
      </Card>
    );
  }

  if (error === 'no_audit') {
    return (
      <Card className="p-12 text-center">
        <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-[#1f2937] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
          No ICP analysis available yet
        </h3>
        <p className="text-[#6B7280] mb-6" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Complete a discovery audit with an ICP profile to see analysis
        </p>
        <Button className="bg-[#02a4bf] hover:bg-[#018a9f] text-white">Start Discovery Audit</Button>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="p-12 text-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-[#1f2937] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
          Failed to load ICP analysis
        </h3>
        <p className="text-[#6B7280] mb-6" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Please refresh the page or contact support
        </p>
        <Button onClick={loadICPAnalysis} className="bg-[#02a4bf] hover:bg-[#018a9f] text-white">
          Retry
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}>
              ICP Relevance Analysis
            </h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-[#9ca3af] cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                    ICP filtering saves 40-60% in API costs by focusing on relevant queries
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-[#6B7280] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            How well discovered queries match your ideal customer profile
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Card 1: Queries Analyzed */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-[#E6F7F9] rounded-xl flex items-center justify-center">
              <Search className="w-6 h-6 text-[#02a4bf]" />
            </div>
          </div>
          <div className="text-[#005260] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', lineHeight: '1' }}>
            {data.summary.total_queries_analyzed}
          </div>
          <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            Queries Analyzed
          </div>
          <div className="text-[#9ca3af] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
            Total queries scored against ICP
          </div>
        </Card>

        {/* Card 2: ICP Match Rate */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-[#10b981]" />
            </div>
          </div>
          <div className="text-[#10b981] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', lineHeight: '1' }}>
            {data.summary.icp_match_rate}%
          </div>
          <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            ICP Match Rate
          </div>
          <div className="flex items-center gap-1 text-green-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
            <TrendingUp className="w-3 h-3" />
            <span>↑ {data.summary.trend_vs_last_audit.match_rate_change}% vs last audit</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="bg-[#10b981] h-2 rounded-full transition-all"
              style={{ width: `${data.summary.icp_match_rate}%` }}
            />
          </div>
        </Card>

        {/* Card 3: API Cost Savings */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#e84e1c]" />
            </div>
          </div>
          <div className="text-[#e84e1c] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', lineHeight: '1' }}>
            {data.summary.estimated_cost_savings_percent}%
          </div>
          <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            Estimated Cost Savings
          </div>
          <div className="text-[#9ca3af] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
            By filtering low-relevance queries
          </div>
          <Badge className="bg-[#e84e1c] text-white border-0 mt-2" style={{ fontSize: '11px' }}>
            ~${data.summary.estimated_cost_savings_dollars} saved
          </Badge>
        </Card>
      </div>

      {/* ICP-Matched Insights */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-[#e84e1c]" />
          <h3 className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
            Top ICP-Matched Pain Points Discovered
          </h3>
        </div>

        <div className="space-y-3">
          {data.top_matched_pain_points.slice(0, 5).map((point, index) => (
            <div key={index}>
              <div className="flex items-center gap-3">
                {/* Number Badge */}
                <div
                  className="w-7 h-7 rounded-full bg-[#02a4bf] flex items-center justify-center flex-shrink-0"
                  style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '14px', color: 'white' }}
                >
                  {index + 1}
                </div>

                {/* Pain Point Text */}
                <div className="flex-1 text-[#374151]" style={{ fontFamily: 'Open Sans', fontSize: '15px' }}>
                  {point.pain_point}
                </div>

                {/* Query Count Badge */}
                <Badge
                  variant="secondary"
                  className="bg-[#E6F7F9] text-[#02a4bf] border-0"
                  style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '12px' }}
                >
                  {point.query_count} queries
                </Badge>

                {/* Priority Indicator */}
                <div
                  className="w-1 h-6 rounded-full"
                  style={{ backgroundColor: getPriorityColor(point.priority) }}
                />
              </div>
              {index < 4 && <div className="border-t border-gray-100 my-3" />}
            </div>
          ))}
        </div>

        {data.top_matched_pain_points.length > 5 && (
          <button
            className="text-[#02a4bf] hover:underline mt-4"
            style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
          >
            View All {data.top_matched_pain_points.length} Pain Points
          </button>
        )}
      </Card>

      {/* ICP Coverage Breakdown */}
      <div className="grid grid-cols-[60%_40%] gap-5">
        {/* Left: Match Distribution */}
        <Card className="p-6">
          <h3 className="text-[#1f2937] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
            Query Match Distribution
          </h3>

          {/* Simple visual representation - in production, use a charting library */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                  <span style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    High Match (80-100%)
                  </span>
                </div>
                <span style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                  {data.match_distribution.high_match.percentage}% ({data.match_distribution.high_match.count} queries)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-[#10b981] h-3 rounded-full"
                  style={{ width: `${data.match_distribution.high_match.percentage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#fbbf24]" />
                  <span style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    Medium Match (50-79%)
                  </span>
                </div>
                <span style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                  {data.match_distribution.medium_match.percentage}% ({data.match_distribution.medium_match.count} queries)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-[#fbbf24] h-3 rounded-full"
                  style={{ width: `${data.match_distribution.medium_match.percentage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                  <span style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    Low Match (0-49%)
                  </span>
                </div>
                <span style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                  {data.match_distribution.low_match.percentage}% ({data.match_distribution.low_match.count} queries)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-[#ef4444] h-3 rounded-full"
                  style={{ width: `${data.match_distribution.low_match.percentage}%` }}
                />
              </div>
            </div>

            <div className="text-center pt-4 border-t">
              <div className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
                {data.summary.total_queries_analyzed}
              </div>
              <div className="text-[#9ca3af]" style={{ fontFamily: 'Open Sans', fontSize: '11px' }}>
                Total Queries
              </div>
            </div>
          </div>
        </Card>

        {/* Right: ICP Attributes */}
        <Card className="p-6">
          <h3 className="text-[#1f2937] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
            ICP Attributes Detected in Queries
          </h3>

          <div className="space-y-4 max-h-[280px] overflow-y-auto">
            {/* Demographics */}
            <div>
              <p className="text-[#6B7280] mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                Demographics
              </p>
              <div className="flex flex-wrap gap-2">
                {data.icp_attributes_detected.demographics.map((attr, idx) => (
                  <Badge
                    key={idx}
                    className="bg-[#E6F7F9] text-[#02a4bf] border-0"
                    style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '12px' }}
                  >
                    {attr.attribute} ({attr.query_count})
                  </Badge>
                ))}
              </div>
            </div>

            {/* Pain Points */}
            <div>
              <p className="text-[#6B7280] mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                Pain Points
              </p>
              <div className="flex flex-wrap gap-2">
                {data.icp_attributes_detected.pain_points.map((attr, idx) => (
                  <Badge
                    key={idx}
                    className="bg-[#E6F7F9] text-[#02a4bf] border-0"
                    style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '12px' }}
                  >
                    {attr.attribute} ({attr.query_count})
                  </Badge>
                ))}
              </div>
            </div>

            {/* Goals */}
            <div>
              <p className="text-[#6B7280] mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                Goals
              </p>
              <div className="flex flex-wrap gap-2">
                {data.icp_attributes_detected.goals.map((attr, idx) => (
                  <Badge
                    key={idx}
                    className="bg-[#E6F7F9] text-[#02a4bf] border-0"
                    style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '12px' }}
                  >
                    {attr.attribute} ({attr.query_count})
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filtered Queries Section */}
      {data.filtered_queries && data.filtered_queries.length > 0 && (
        <Card className="p-6">
          <button
            onClick={() => setShowFilteredQueries(!showFilteredQueries)}
            className="flex items-center gap-2 w-full text-left hover:text-[#02a4bf] transition-colors"
          >
            {showFilteredQueries ? (
              <ChevronDown className="w-5 h-5 text-[#6B7280]" />
            ) : (
              <ChevronRight className="w-5 h-5 text-[#6B7280]" />
            )}
            <span className="text-[#6B7280] flex-1" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '15px' }}>
              View Filtered Low-Relevance Queries ({data.summary.filtered_queries} queries removed)
            </span>
            <Badge className="bg-[#e84e1c] text-white border-0">
              Saved ${data.summary.estimated_cost_savings_dollars} API costs
            </Badge>
          </button>

          {showFilteredQueries && (
            <div className="mt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f9fafb]">
                    <tr>
                      <th
                        className="text-left p-3"
                        style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px', color: '#6B7280' }}
                      >
                        Query
                      </th>
                      <th
                        className="text-left p-3"
                        style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px', color: '#6B7280' }}
                      >
                        Relevance Score
                      </th>
                      <th
                        className="text-left p-3"
                        style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px', color: '#6B7280' }}
                      >
                        Reason
                      </th>
                      <th
                        className="text-center p-3"
                        style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px', color: '#6B7280' }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.filtered_queries.slice(0, 20).map((query, idx) => (
                      <tr key={query.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                          {query.query}
                        </td>
                        <td className="p-3">
                          <span
                            className="text-red-600"
                            style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '13px' }}
                          >
                            {query.relevance_score}%
                          </span>
                          <div className="w-20 bg-gray-200 rounded-full h-1.5 mt-1">
                            <div
                              className="bg-red-500 h-1.5 rounded-full"
                              style={{ width: `${query.relevance_score}%` }}
                            />
                          </div>
                        </td>
                        <td className="p-3">
                          <span
                            className="text-[#6B7280] italic"
                            style={{ fontFamily: 'Open Sans', fontSize: '13px' }}
                          >
                            {query.filter_reason}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center justify-center gap-2">
                            <button className="text-[#6B7280] hover:text-[#02a4bf]">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteFilteredQuery(query.id)}
                              className="text-[#6B7280] hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {data.filtered_queries.length > 20 && (
                <div className="mt-4 text-center text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                  Showing 1-20 of {data.filtered_queries.length}
                </div>
              )}
            </div>
          )}
        </Card>
      )}

      {/* View Full Analysis Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => setModalOpen(true)}
          variant="outline"
          className="border-2 border-[#02a4bf] text-[#02a4bf] hover:bg-[#02a4bf] hover:text-white transition-all"
          style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '15px', width: '220px', height: '44px' }}
        >
          <FileText className="w-5 h-5 mr-2" />
          View Full ICP Analysis Report
        </Button>
      </div>

      {/* Full Analysis Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-[900px] max-h-[80vh] overflow-y-auto">
          <DialogHeader className="bg-[#02a4bf] text-white p-6 -m-6 mb-6 rounded-t-lg">
            <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '22px', color: 'white' }}>
              Complete ICP Relevance Analysis
            </DialogTitle>
            <DialogDescription className="text-white opacity-90" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Discovery Audit - {new Date(data.audit_date).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 p-6">
            {/* Executive Summary */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-[#02a4bf]" />
                <h3 className="text-[#1f2937]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
                  Executive Summary
                </h3>
              </div>
              <p className="text-[#374151] leading-relaxed" style={{ fontFamily: 'Open Sans', fontSize: '14px', lineHeight: '1.6' }}>
                Your discovery audit analyzed {data.summary.total_queries_analyzed} queries across AI platforms.{' '}
                {data.summary.icp_match_rate}% matched your ICP profile, resulting in{' '}
                {data.summary.estimated_cost_savings_percent}% API cost savings.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                    Total Queries
                  </div>
                  <div className="text-[#1f2937]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
                    {data.summary.total_queries_analyzed}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                    ICP Matches
                  </div>
                  <div className="text-[#10b981]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
                    {data.summary.icp_matched_queries} ({data.summary.icp_match_rate}%)
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                    Cost Savings
                  </div>
                  <div className="text-[#e84e1c]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
                    ${data.summary.estimated_cost_savings_dollars} ({data.summary.estimated_cost_savings_percent}%)
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                    New Pain Points
                  </div>
                  <div className="text-[#1f2937]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
                    {data.top_matched_pain_points.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-[#fbbf24]" />
                <h3 className="text-[#1f2937]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
                  Recommended Actions
                </h3>
              </div>

              <div className="space-y-3">
                {data.recommendations.map((rec, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Badge
                        className="border-0"
                        style={{
                          backgroundColor: getPriorityBgColor(rec.priority),
                          color: getPriorityColor(rec.priority),
                          fontFamily: 'Poppins',
                          fontWeight: 600,
                          fontSize: '11px',
                        }}
                      >
                        {rec.priority} PRIORITY
                      </Badge>
                      <div className="flex-1">
                        <h4 className="text-[#1f2937] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                          {rec.title}
                        </h4>
                        <p className="text-[#6B7280] mb-2" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                          {rec.description}
                        </p>
                        {rec.action_url && (
                          <Button size="sm" variant="outline" className="border-[#02a4bf] text-[#02a4bf]">
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="bg-[#02a4bf] p-5 -m-6 mt-6 rounded-b-lg">
            <Button
              onClick={handleExportReport}
              variant="outline"
              className="bg-white text-[#02a4bf] hover:bg-gray-100"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button onClick={() => setModalOpen(false)} className="bg-white text-[#02a4bf] hover:bg-gray-100">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}