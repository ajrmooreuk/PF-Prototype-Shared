import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ChevronDown, MoreVertical, FileText, Star, Edit2, Target, TrendingUp, Users, PlayCircle, Eye, Trash2, Copy, Download, Archive, Sparkles, Smile, Meh, Frown, Lightbulb, User, Loader2 } from 'lucide-react';
import { callEccoAPI } from '../../lib/eccoAPI';
import { toast } from 'sonner';

interface PMFKPIs {
  total_surveys: number;
  active_surveys: number;
  total_responses: number;
  avg_pmf_score: number;
  pmf_achieved: boolean;
}

interface Survey {
  id: string;
  title: string;
  survey_type: 'sean_ellis' | 'nps' | 'custom';
  status: 'active' | 'draft' | 'paused' | 'completed' | 'archived';
  response_count: number;
  latest_pmf_score?: number;
  pmf_achieved?: boolean;
  latest_nps_score?: number;
  promoters_count?: number;
  passives_count?: number;
  detractors_count?: number;
  created_at: string;
}

interface Interview {
  id: string;
  interview_title: string;
  interview_type: 'discovery' | 'validation' | 'follow-up' | 'churn';
  customer_name: string;
  customer_email?: string;
  customer_segment: string;
  sentiment_score: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  analysis_status: 'completed' | 'processing' | 'pending';
  interview_date: string;
  duration_minutes: number;
  pain_points_count?: number;
  feature_requests_count?: number;
  pmf_indicators?: {
    would_be_disappointed?: string;
  };
}

interface TrendDataPoint {
  date: string;
  pmf_score: number;
  nps_score: number;
  response_count: number;
}

interface PMFOverviewPageProps {
  onNavigate?: (page: string) => void;
}

export function PMFOverviewPage({ onNavigate }: PMFOverviewPageProps) {
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState<PMFKPIs | null>(null);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [trendData, setTrendData] = useState<TrendDataPoint[]>([]);
  const [trendPeriod, setTrendPeriod] = useState<30 | 60 | 90>(90);
  const [calculatingScoreFor, setCalculatingScoreFor] = useState<string | null>(null);
  const [deletingSurveyId, setDeleteSurveyId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedSurveyType, setSelectedSurveyType] = useState<'sean_ellis' | 'nps' | 'custom'>('sean_ellis');
  const [surveyTitle, setSurveyTitle] = useState('');
  const [surveyDescription, setSurveyDescription] = useState('');
  const [isCreatingSurvey, setIsCreatingSurvey] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    fetchTrendData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchDashboardData();
      fetchTrendData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchTrendData();
  }, [trendPeriod]);

  const fetchDashboardData = async () => {
    try {
      // NOTE: /pmf/dashboard endpoint not yet implemented in backend
      // Using default empty data to prevent 404 errors
      // TODO: Backend needs to implement GET /pmf/dashboard endpoint
      console.log('PMFOverviewPage: Using default empty dashboard data (endpoint not implemented)');
      
      setKpis({
        total_surveys: 0,
        active_surveys: 0,
        total_responses: 0,
        avg_pmf_score: 0,
        pmf_achieved: false
      });
      setSurveys([]);
      setInterviews([]);
    } catch (error) {
      console.error('Error fetching PMF dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendData = async () => {
    try {
      // NOTE: /pmf/dashboard/trends endpoint not yet implemented in backend
      // Using default empty data to prevent 404 errors
      // TODO: Backend needs to implement GET /pmf/dashboard/trends endpoint
      console.log('PMFOverviewPage: Using default empty trend data (endpoint not implemented)');
      
      setTrendData([]);
    } catch (error) {
      console.error('Error fetching trend data:', error);
    }
  };

  const handleCalculateScore = async (surveyId: string, responseCount: number) => {
    if (responseCount < 5) {
      toast.warning('Need at least 5 responses to calculate PMF score');
      return;
    }

    setCalculatingScoreFor(surveyId);
    
    try {
      const result = await callEccoAPI('/pmf/scores/calculate', 'POST', {
        survey_id: surveyId,
        segment: 'all',
        generate_insights: true
      });

      // Update survey in list
      setSurveys(surveys.map(s => 
        s.id === surveyId 
          ? {
              ...s,
              latest_pmf_score: result.sean_ellis_score,
              pmf_achieved: result.pmf_achieved,
              latest_nps_score: result.nps_score,
              promoters_count: result.promoters_count,
              passives_count: result.passives_count,
              detractors_count: result.detractors_count
            }
          : s
      ));

      // Show appropriate toast
      if (result.pmf_achieved) {
        toast.success(`🎉 PMF Achieved! Score: ${result.sean_ellis_score.toFixed(1)}%`, {
          duration: 5000
        });
      } else {
        toast.info(`PMF Score Updated: ${result.sean_ellis_score.toFixed(1)}%`, {
          description: 'Keep collecting responses to improve accuracy',
          duration: 5000
        });
      }

      // Refresh dashboard data
      fetchDashboardData();
      fetchTrendData();
    } catch (error) {
      console.error('Error calculating score:', error);
      toast.error('Failed to calculate score. Please try again.');
    } finally {
      setCalculatingScoreFor(null);
    }
  };

  const handleDeleteSurvey = async () => {
    if (!deletingSurveyId) return;

    try {
      await callEccoAPI(`/pmf/surveys/${deletingSurveyId}`, 'DELETE');
      
      setSurveys(surveys.filter(s => s.id !== deletingSurveyId));
      
      toast.success('Survey deleted successfully');
      fetchDashboardData();
    } catch (error) {
      console.error('Error deleting survey:', error);
      toast.error('Failed to delete survey');
    } finally {
      setShowDeleteDialog(false);
      setDeleteSurveyId(null);
    }
  };

  const handleDuplicateSurvey = async (surveyId: string) => {
    try {
      toast.info('Duplicating survey...');
      
      const result = await callEccoAPI(`/pmf/surveys/${surveyId}/duplicate`, 'POST');
      
      toast.success('Survey duplicated successfully', {
        action: {
          label: 'View',
          onClick: () => {
            // Navigation would go here
            console.log('Navigate to survey:', result.survey_id);
          }
        },
        duration: 5000
      });
      
      fetchDashboardData();
    } catch (error) {
      console.error('Error duplicating survey:', error);
      toast.error('Failed to duplicate survey');
    }
  };

  const handleExportResponses = async (surveyId: string, responseCount: number) => {
    try {
      toast.info('Preparing export...');
      
      await callEccoAPI(`/pmf/surveys/${surveyId}/responses/export?format=csv`, 'GET');
      
      toast.success(`${responseCount} responses exported`);
    } catch (error) {
      console.error('Error exporting responses:', error);
      toast.error('Failed to export responses');
    }
  };

  const handleArchiveSurvey = async (surveyId: string) => {
    try {
      await callEccoAPI(`/pmf/surveys/${surveyId}`, 'PATCH', { status: 'archived' });
      
      setSurveys(surveys.filter(s => s.id !== surveyId));
      
      toast.success('Survey archived');
      fetchDashboardData();
    } catch (error) {
      console.error('Error archiving survey:', error);
      toast.error('Failed to archive survey');
    }
  };

  const handleCreateSurvey = async () => {
    try {
      toast.info(`Creating ${selectedSurveyType === 'sean_ellis' ? 'Sean Ellis' : selectedSurveyType === 'nps' ? 'NPS' : 'Custom'} survey...`);
      
      const surveyTitle = selectedSurveyType === 'sean_ellis' 
        ? 'New Sean Ellis Survey'
        : selectedSurveyType === 'nps'
        ? 'New NPS Survey'
        : 'New Custom Survey';
      
      const result = await callEccoAPI('/pmf/surveys', 'POST', {
        title: surveyTitle,
        survey_type: selectedSurveyType,
        status: 'draft'
      });
      
      toast.success('Survey created successfully', {
        action: {
          label: 'View',
          onClick: () => {
            // Navigation would go here
            console.log('Navigate to survey:', result.survey_id);
          }
        },
        duration: 5000
      });
      
      fetchDashboardData();
    } catch (error) {
      console.error('Error creating survey:', error);
      toast.error('Failed to create survey');
    } finally {
      setIsCreatingSurvey(false);
      setShowCreateDialog(false);
    }
  };

  const handleViewSurveyDetails = (surveyId: string, surveyTitle: string) => {
    toast.info(`Opening survey: ${surveyTitle}`, {
      description: 'Survey detail page would open here',
      duration: 3000
    });
    console.log('Navigate to survey details:', surveyId);
  };

  const handleEditSurvey = (surveyId: string, surveyTitle: string) => {
    toast.info(`Editing survey: ${surveyTitle}`, {
      description: 'Survey editor would open here',
      duration: 3000
    });
    console.log('Navigate to survey editor:', surveyId);
  };

  const handleUploadInterview = () => {
    toast.info('Opening interview upload dialog...', {
      description: 'File upload dialog would open here',
      duration: 3000
    });
    console.log('Open interview upload dialog');
  };

  const handleViewAllSurveys = () => {
    toast.info('Navigating to all surveys...', {
      description: 'Full surveys page would open here',
      duration: 3000
    });
    console.log('Navigate to all surveys page');
  };

  const handleViewAllInterviews = () => {
    toast.info('Navigating to all interviews...', {
      description: 'Full interviews page would open here',
      duration: 3000
    });
    console.log('Navigate to all interviews page');
  };

  const handleViewInterviewAnalysis = (interviewId: string, interviewTitle: string) => {
    toast.info(`Opening analysis: ${interviewTitle}`, {
      description: 'Interview analysis page would open here',
      duration: 3000
    });
    console.log('Navigate to interview analysis:', interviewId);
  };

  const handleAnalyzeInterview = async (interviewId: string, interviewTitle: string) => {
    try {
      toast.info(`Starting AI analysis for: ${interviewTitle}`);
      
      await callEccoAPI(`/pmf/interviews/${interviewId}/analyze`, 'POST');
      
      toast.success('Analysis started successfully', {
        description: 'You will be notified when the analysis is complete',
        duration: 5000
      });
      
      fetchDashboardData();
    } catch (error) {
      console.error('Error analyzing interview:', error);
      toast.error('Failed to start analysis');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatChartDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  const getSurveyTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'sean_ellis': return 'bg-blue-500';
      case 'nps': return 'bg-green-500';
      case 'custom': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getSurveyTypeLabel = (type: string) => {
    switch (type) {
      case 'sean_ellis': return 'Sean Ellis';
      case 'nps': return 'NPS';
      case 'custom': return 'Custom';
      default: return type;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'draft': return 'bg-gray-500';
      case 'paused': return 'bg-yellow-500 text-gray-900';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getInterviewTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'discovery': return 'bg-blue-100 text-blue-700';
      case 'validation': return 'bg-green-100 text-green-700';
      case 'follow-up': return 'bg-purple-100 text-purple-700';
      case 'churn': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getInterviewTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getSentimentEmoji = (sentiment: string, score: number) => {
    if (sentiment === 'positive' || score >= 0.5) {
      return <Smile className="h-6 w-6 text-green-500" />;
    } else if (sentiment === 'neutral' || (score >= -0.5 && score < 0.5)) {
      return <Meh className="h-6 w-6 text-yellow-500" />;
    } else {
      return <Frown className="h-6 w-6 text-red-500" />;
    }
  };

  const getSentimentLabel = (sentiment: string, score: number) => {
    if (sentiment === 'positive' || score >= 0.5) {
      return 'Positive';
    } else if (sentiment === 'neutral' || (score >= -0.5 && score < 0.5)) {
      return 'Neutral';
    } else {
      return 'Negative';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] pb-12">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          {/* Breadcrumb Skeleton */}
          <Skeleton className="h-4 w-48 mb-6" />
          
          {/* Header Skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Skeleton className="h-8 w-96 mb-2" />
              <Skeleton className="h-5 w-64" />
            </div>
            <Skeleton className="h-11 w-44" />
          </div>

          {/* KPI Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-5">
                <Skeleton className="h-12 w-12 rounded-lg mb-3" />
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-3 w-24" />
              </Card>
            ))}
          </div>

          {/* Chart Skeleton */}
          <Card className="p-6 mb-8">
            <Skeleton className="h-6 w-48 mb-6" />
            <Skeleton className="h-80 w-full" />
          </Card>

          {/* Surveys Skeleton */}
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-5">
                <Skeleton className="h-6 w-64 mb-3" />
                <Skeleton className="h-4 w-48 mb-4" />
                <Skeleton className="h-20 w-full" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] pb-12">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <div className="mb-6" style={{ fontFamily: 'Open Sans' }}>
          <button 
            onClick={() => onNavigate?.('dashboard')}
            className="text-gray-500 hover:text-[#02a4bf] transition-colors"
          >
            Dashboard
          </button>
          <span className="text-gray-400 mx-2">&gt;</span>
          <span className="text-[#005260]" style={{ fontWeight: 600 }}>PMF</span>
          <span className="text-gray-400 mx-2">&gt;</span>
          <span className="text-[#005260]" style={{ fontWeight: 600 }}>Overview</span>
        </div>

        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}>
              Product-Market Fit Dashboard
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
              Monitor PMF scores, surveys, and customer insights
            </p>
          </div>

          {/* Create Survey Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                className="bg-[#02a4bf] hover:bg-[#028a9f] text-white h-11 px-6"
                style={{ fontFamily: 'Poppins', fontWeight: 500 }}
              >
                Create Survey
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem 
                className="cursor-pointer py-3" 
                style={{ fontFamily: 'Open Sans' }}
                onClick={() => {
                  setSelectedSurveyType('sean_ellis');
                  setSurveyTitle('New Sean Ellis Survey');
                  setSurveyDescription('');
                  setShowCreateDialog(true);
                }}
              >
                <FileText className="mr-3 h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-medium">Sean Ellis Survey</div>
                  <div className="text-xs text-gray-500">Measure disappointment if product disappeared</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer py-3" 
                style={{ fontFamily: 'Open Sans' }}
                onClick={() => {
                  setSelectedSurveyType('nps');
                  setSurveyTitle('New NPS Survey');
                  setSurveyDescription('');
                  setShowCreateDialog(true);
                }}
              >
                <Star className="mr-3 h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium">NPS Survey</div>
                  <div className="text-xs text-gray-500">Net Promoter Score from 0-10</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer py-3" 
                style={{ fontFamily: 'Open Sans' }}
                onClick={() => {
                  setSelectedSurveyType('custom');
                  setSurveyTitle('New Custom Survey');
                  setSurveyDescription('');
                  setShowCreateDialog(true);
                }}
              >
                <Edit2 className="mr-3 h-5 w-5 text-purple-500" />
                <div>
                  <div className="font-medium">Custom Survey</div>
                  <div className="text-xs text-gray-500">Build your own questions</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Surveys */}
          <Card className="p-5 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-[#02a4bf]" />
              </div>
            </div>
            <div className="text-[#005260] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}>
              {kpis?.total_surveys || 0}
            </div>
            <div className="text-gray-700 mb-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Total Surveys
            </div>
            <div className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
              {kpis?.active_surveys || 0} active
            </div>
          </Card>

          {/* Active Surveys */}
          <Card className="p-5 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <PlayCircle className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="text-blue-600 mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}>
              {kpis?.active_surveys || 0}
            </div>
            <div className="text-gray-700 mb-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Active Surveys
            </div>
            <div className="text-blue-600" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
              Collecting responses
            </div>
          </Card>

          {/* Total Responses */}
          <Card className="p-5 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="text-green-600 mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}>
              {kpis?.total_responses || 0}
            </div>
            <div className="text-gray-700 mb-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Total Responses
            </div>
            <div className="text-green-600 flex items-center gap-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
              <TrendingUp className="h-3 w-3" />
              23 this week
            </div>
          </Card>

          {/* Avg PMF Score */}
          <Card className="p-5 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                kpis?.pmf_achieved ? 'bg-teal-100' : 'bg-orange-100'
              }`}>
                <Target className={`h-6 w-6 ${kpis?.pmf_achieved ? 'text-[#02a4bf]' : 'text-[#e84e1c]'}`} />
              </div>
            </div>
            <div className={`mb-2 ${kpis?.pmf_achieved ? 'text-[#02a4bf]' : 'text-[#e84e1c]'}`} 
                 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}>
              {kpis?.avg_pmf_score ? `${kpis.avg_pmf_score.toFixed(1)}%` : 'N/A'}
            </div>
            <div className="text-gray-700 mb-2" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Avg PMF Score
            </div>
            {kpis?.avg_pmf_score !== undefined && (
              <Badge className={`${
                kpis.pmf_achieved 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-orange-500 hover:bg-orange-600'
              } text-white text-xs`}>
                {kpis.pmf_achieved ? '✅ PMF Achieved' : '⏳ In Progress'}
              </Badge>
            )}
            <div className="text-gray-500 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
              40% threshold
            </div>
          </Card>
        </div>

        {/* PMF Score Trend Chart */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
              PMF Score Trend
            </h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" style={{ fontFamily: 'Open Sans' }}>
                  Last {trendPeriod} Days
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTrendPeriod(30)}>Last 30 Days</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTrendPeriod(60)}>Last 60 Days</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTrendPeriod(90)}>Last 90 Days</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatChartDate}
                  style={{ fontFamily: 'Open Sans', fontSize: '12px' }}
                  stroke="#6B7280"
                />
                <YAxis 
                  domain={[0, 100]}
                  style={{ fontFamily: 'Open Sans', fontSize: '12px' }}
                  stroke="#6B7280"
                  label={{ value: 'Score (%)', angle: -90, position: 'insideLeft', style: { fontFamily: 'Open Sans' } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    fontFamily: 'Open Sans', 
                    borderRadius: '8px', 
                    border: '1px solid #02a4bf',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                />
                <ReferenceLine 
                  y={40} 
                  stroke="#ef4444" 
                  strokeDasharray="5 5" 
                  strokeWidth={2}
                  label={{ 
                    value: 'PMF Threshold (40%)', 
                    position: 'right',
                    style: { fontFamily: 'Open Sans', fontSize: '12px', fill: '#ef4444' }
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="pmf_score" 
                  name="PMF Score (%)"
                  stroke="#02a4bf" 
                  strokeWidth={3}
                  dot={{ fill: '#02a4bf', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="nps_score" 
                  name="NPS Score"
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <TrendingUp className="h-16 w-16 mb-4 opacity-30" />
              <p style={{ fontFamily: 'Open Sans', fontSize: '14px' }} className="mb-4">
                Calculate PMF scores to see trends
              </p>
              <Button 
                size="sm" 
                className="bg-[#02a4bf] hover:bg-[#028a9f] text-white"
                style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                disabled={surveys.length === 0}
              >
                Calculate Scores
              </Button>
            </div>
          )}
        </Card>

        {/* Recent Surveys Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}>
              Recent Surveys
            </h2>
            <button 
              className="text-[#02a4bf] hover:underline"
              style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
              onClick={handleViewAllSurveys}
            >
              View All
            </button>
          </div>

          {surveys.length > 0 ? (
            <div className="space-y-4">
              {surveys.slice(0, 3).map((survey) => (
                <Card key={survey.id} className="p-5 hover:shadow-lg transition-all duration-200">
                  {/* Survey Header */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-[#005260] flex-1" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px' }}>
                      {survey.title}
                    </h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-[#02a4bf]">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => handleViewSurveyDetails(survey.id, survey.title)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditSurvey(survey.id, survey.title)}>
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit Survey
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicateSurvey(survey.id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExportResponses(survey.id, survey.response_count)}>
                          <Download className="mr-2 h-4 w-4" />
                          Export Responses
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleArchiveSurvey(survey.id)}>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => {
                            setDeleteSurveyId(survey.id);
                            setShowDeleteDialog(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Survey Meta */}
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={`${getSurveyTypeBadgeColor(survey.survey_type)} text-white`}>
                      {getSurveyTypeLabel(survey.survey_type)}
                    </Badge>
                    <Badge className={`${getStatusBadgeColor(survey.status)} text-white`}>
                      {getStatusLabel(survey.status)}
                    </Badge>
                  </div>

                  {/* Response Count */}
                  <div className="flex items-center gap-2 mb-4 text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    <Edit2 className="h-4 w-4" />
                    {survey.response_count} responses
                  </div>

                  {/* Scores */}
                  <div className="flex gap-6 mb-4">
                    {survey.latest_pmf_score !== undefined && (
                      <div>
                        <div className="text-gray-500 mb-1" style={{ fontFamily: 'Open Sans', fontSize: '12px', fontWeight: 500 }}>
                          PMF Score
                        </div>
                        <div className={`${survey.pmf_achieved ? 'text-[#02a4bf]' : 'text-[#e84e1c]'}`}
                             style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
                          {survey.latest_pmf_score.toFixed(1)}%
                        </div>
                        <div className="text-xs mt-1">
                          {survey.pmf_achieved ? (
                            <span className="text-green-600">✓ PMF Achieved</span>
                          ) : (
                            <span className="text-orange-600">⏳ In Progress</span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {survey.latest_nps_score !== undefined && (
                      <div>
                        <div className="text-gray-500 mb-1" style={{ fontFamily: 'Open Sans', fontSize: '12px', fontWeight: 500 }}>
                          NPS Score
                        </div>
                        <div className="text-[#02a4bf]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
                          {survey.latest_nps_score}
                        </div>
                        {survey.promoters_count !== undefined && (
                          <div className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '11px' }}>
                            Promoters: {survey.promoters_count} | Passives: {survey.passives_count} | Det: {survey.detractors_count}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-gray-400 mb-4" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                    📅 Created {formatDate(survey.created_at)}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      className="bg-[#02a4bf] hover:bg-[#028a9f] text-white"
                      style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                      size="sm"
                      onClick={() => handleViewSurveyDetails(survey.id, survey.title)}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-[#02a4bf] text-[#02a4bf] hover:bg-[#02a4bf] hover:text-white"
                      style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                      size="sm"
                      disabled={survey.response_count < 5 || calculatingScoreFor === survey.id}
                      onClick={() => handleCalculateScore(survey.id, survey.response_count)}
                    >
                      {calculatingScoreFor === survey.id ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Calculating...
                        </>
                      ) : (
                        'Calculate Score'
                      )}
                    </Button>
                  </div>
                  
                  {survey.response_count < 5 && (
                    <div className="mt-2 text-xs text-gray-500" style={{ fontFamily: 'Open Sans' }}>
                      Need at least 5 responses to calculate score
                    </div>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center">
                <FileText className="h-20 w-20 text-gray-300 mb-4" />
                <h3 className="text-gray-800 mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
                  No Surveys Yet
                </h3>
                <p className="text-gray-600 mb-6" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
                  Create your first PMF survey to start measuring product-market fit
                </p>
                <Button 
                  className="bg-[#02a4bf] hover:bg-[#028a9f] text-white h-12 px-8"
                  style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                >
                  Create Survey
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Recent Interviews Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}>
              Recent Interviews
            </h2>
            <div className="flex gap-2">
              <Button 
                className="bg-[#02a4bf] hover:bg-[#028a9f] text-white"
                style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                size="sm"
                onClick={handleUploadInterview}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Upload Interview
              </Button>
              <button 
                className="text-[#02a4bf] hover:underline"
                style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                onClick={handleViewAllInterviews}
              >
                View All
              </button>
            </div>
          </div>

          {interviews.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {interviews.map((interview) => (
                <Card key={interview.id} className="p-5 hover:shadow-lg transition-all duration-200">
                  {/* Interview Header */}
                  <h3 className="text-[#005260] mb-3" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '14px' }}>
                    {interview.interview_title}
                  </h3>

                  {/* Interview Meta */}
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getInterviewTypeBadgeColor(interview.interview_type)}>
                      {getInterviewTypeLabel(interview.interview_type)}
                    </Badge>
                    <Badge className={
                      interview.analysis_status === 'completed' ? 'bg-green-500 text-white' :
                      interview.analysis_status === 'processing' ? 'bg-yellow-500 text-gray-900' :
                      'bg-gray-500 text-white'
                    }>
                      {interview.analysis_status === 'completed' ? '✓ Completed' :
                       interview.analysis_status === 'processing' ? '⏳ Processing' :
                       'Pending'}
                    </Badge>
                  </div>

                  {/* Customer Info */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                      <User className="h-4 w-4" />
                      {interview.customer_name} • {interview.customer_segment}
                    </div>
                    {interview.customer_email && (
                      <div className="text-gray-500 ml-6" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                        {interview.customer_email}
                      </div>
                    )}
                  </div>

                  {/* Sentiment */}
                  <div className="flex items-center gap-2 mb-3">
                    {getSentimentEmoji(interview.sentiment, interview.sentiment_score)}
                    <span className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                      {getSentimentLabel(interview.sentiment, interview.sentiment_score)}
                    </span>
                    <span className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                      ({interview.sentiment_score.toFixed(2)})
                    </span>
                  </div>

                  {/* Key Insights */}
                  {interview.analysis_status === 'completed' && (
                    <div className="flex items-center gap-2 mb-3 text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                      <Lightbulb className="h-4 w-4 text-[#02a4bf]" />
                      {interview.pain_points_count || 0} pain points • {interview.feature_requests_count || 0} feature requests • High PMF signals
                    </div>
                  )}

                  {interview.analysis_status === 'processing' && (
                    <div className="flex items-center gap-2 mb-3 text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                      <Lightbulb className="h-4 w-4" />
                      Analysis in progress...
                    </div>
                  )}

                  {/* Date */}
                  <div className="text-gray-400 mb-4" style={{ fontFamily: 'Open Sans', fontSize: '11px' }}>
                    Interviewed: {formatDate(interview.interview_date)} • {interview.duration_minutes} min
                  </div>

                  {/* Action Button */}
                  {interview.analysis_status === 'completed' && (
                    <Button 
                      className="w-full bg-[#02a4bf] hover:bg-[#028a9f] text-white"
                      style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                      size="sm"
                      onClick={() => handleViewInterviewAnalysis(interview.id, interview.interview_title)}
                    >
                      View Analysis
                    </Button>
                  )}
                  
                  {interview.analysis_status === 'pending' && (
                    <Button 
                      className="w-full bg-[#e84e1c] hover:bg-[#d04618] text-white"
                      style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                      size="sm"
                      onClick={() => handleAnalyzeInterview(interview.id, interview.interview_title)}
                    >
                      Analyze Now
                    </Button>
                  )}
                  
                  {interview.analysis_status === 'processing' && (
                    <Button 
                      className="w-full bg-gray-400 text-white cursor-not-allowed"
                      style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                      size="sm"
                      disabled
                    >
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center">
                <Sparkles className="h-20 w-20 text-gray-300 mb-4" />
                <h3 className="text-gray-800 mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
                  No Interviews Uploaded
                </h3>
                <p className="text-gray-600 mb-6" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
                  Upload customer interview transcripts to extract insights with AI
                </p>
                <Button 
                  className="bg-[#02a4bf] hover:bg-[#028a9f] text-white h-12 px-8"
                  style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                  onClick={handleUploadInterview}
                >
                  Upload Interview
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
              Delete Survey?
            </AlertDialogTitle>
            <AlertDialogDescription style={{ fontFamily: 'Open Sans' }}>
              Delete "{surveys.find(s => s.id === deletingSurveyId)?.title}"? This will permanently delete all responses and scores. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel style={{ fontFamily: 'Open Sans' }}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteSurvey}
              className="bg-red-600 hover:bg-red-700"
              style={{ fontFamily: 'Poppins', fontWeight: 500 }}
            >
              Delete Survey
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create Survey Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
              Create New Survey
            </DialogTitle>
            <DialogDescription style={{ fontFamily: 'Open Sans' }}>
              Set up a new Product-Market Fit survey to gather customer feedback.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Survey Type
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 h-10 px-4"
                    style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                  >
                    {selectedSurveyType === 'sean_ellis' ? 'Sean Ellis' :
                     selectedSurveyType === 'nps' ? 'NPS' :
                     'Custom'}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem 
                    className="cursor-pointer py-3" 
                    style={{ fontFamily: 'Open Sans' }}
                    onClick={() => setSelectedSurveyType('sean_ellis')}
                  >
                    <FileText className="mr-3 h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium">Sean Ellis Survey</div>
                      <div className="text-xs text-gray-500">Measure disappointment if product disappeared</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer py-3" 
                    style={{ fontFamily: 'Open Sans' }}
                    onClick={() => setSelectedSurveyType('nps')}
                  >
                    <Star className="mr-3 h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">NPS Survey</div>
                      <div className="text-xs text-gray-500">Net Promoter Score from 0-10</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer py-3" 
                    style={{ fontFamily: 'Open Sans' }}
                    onClick={() => setSelectedSurveyType('custom')}
                  >
                    <Edit2 className="mr-3 h-5 w-5 text-purple-500" />
                    <div>
                      <div className="font-medium">Custom Survey</div>
                      <div className="text-xs text-gray-500">Build your own questions</div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Survey Title
              </Label>
              <Input 
                className="border-gray-300 focus:border-[#02a4bf] focus:ring-[#02a4bf] focus:ring-1"
                style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                value={surveyTitle}
                onChange={(e) => setSurveyTitle(e.target.value)}
                placeholder="Enter survey title"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Survey Description (Optional)
              </Label>
              <Textarea 
                className="border-gray-300 focus:border-[#02a4bf] focus:ring-[#02a4bf] focus:ring-1"
                style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                value={surveyDescription}
                onChange={(e) => setSurveyDescription(e.target.value)}
                placeholder="Enter survey description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
              style={{ fontFamily: 'Open Sans' }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateSurvey}
              className="bg-[#02a4bf] hover:bg-[#028a9f] text-white"
              style={{ fontFamily: 'Poppins', fontWeight: 500 }}
              disabled={isCreatingSurvey || !surveyTitle.trim()}
            >
              {isCreatingSurvey ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Survey'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}