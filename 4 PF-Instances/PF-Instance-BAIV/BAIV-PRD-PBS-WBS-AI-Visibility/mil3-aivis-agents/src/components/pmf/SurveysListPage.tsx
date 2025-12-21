import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { 
  ChevronDown, 
  MoreVertical, 
  Search, 
  FileText, 
  Star, 
  Edit2, 
  Eye,
  Copy,
  Download,
  Archive,
  Trash2,
  Link2,
  PlayCircle,
  FileQuestion,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { callEccoAPI } from '../../lib/eccoAPI';
import { toast } from 'sonner';

interface Survey {
  id: string;
  tenant_id: string;
  title: string;
  description?: string;
  survey_type: 'sean_ellis' | 'nps' | 'custom';
  status: 'active' | 'draft' | 'paused' | 'completed' | 'archived';
  response_count: number;
  latest_pmf_score?: number;
  pmf_achieved?: boolean;
  latest_nps_score?: number;
  promoters_count?: number;
  passives_count?: number;
  detractors_count?: number;
  very_disappointed_count?: number;
  somewhat_disappointed_count?: number;
  not_disappointed_count?: number;
  created_at: string;
  updated_at: string;
  public_link?: string;
}

interface SurveysResponse {
  surveys: Survey[];
  total: number;
  limit: number;
  offset: number;
  has_next: boolean;
  has_prev: boolean;
}

type StatusTab = 'all' | 'active' | 'draft' | 'paused' | 'completed';
type SurveyTypeFilter = 'all' | 'sean_ellis' | 'nps' | 'custom';
type SortOption = 'created_at' | 'updated_at' | 'response_count' | 'pmf_score';

interface SurveysListPageProps {
  onNavigate?: (page: 'pmf-survey-details' | 'pmf-create-survey', surveyId?: string) => void;
}

export function SurveysListPage({ onNavigate }: SurveysListPageProps) {
  const [loading, setLoading] = useState(true);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [total, setTotal] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  
  // Filters and sorting
  const [activeTab, setActiveTab] = useState<StatusTab>('all');
  const [surveyTypeFilter, setSurveyTypeFilter] = useState<SurveyTypeFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;
  
  // UI states
  const [calculatingScoreFor, setCalculatingScoreFor] = useState<string | null>(null);
  const [deletingSurveyId, setDeleteSurveyId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [surveyToDelete, setSurveyToDelete] = useState<Survey | null>(null);
  
  // Status counts
  const [statusCounts, setStatusCounts] = useState({
    all: 0,
    active: 0,
    draft: 0,
    paused: 0,
    completed: 0
  });

  useEffect(() => {
    fetchSurveys();
    
    // Auto-refresh every 60 seconds if on Active tab
    if (activeTab === 'active') {
      const interval = setInterval(fetchSurveys, 60000);
      return () => clearInterval(interval);
    }
  }, [activeTab, surveyTypeFilter, sortBy, sortOrder, currentPage]);

  const fetchSurveys = async () => {
    try {
      setLoading(true);
      
      // NOTE: /pmf/surveys endpoint not yet implemented in backend
      // Using default empty data to prevent 404 errors
      // TODO: Backend needs to implement GET /pmf/surveys endpoint
      console.log('SurveysListPage: Using default empty surveys list (endpoint not implemented)');
      
      setSurveys([]);
      setTotal(0);
      setHasNext(false);
      setHasPrev(false);
      
      // Update status counts
      updateStatusCounts([]);
    } catch (error) {
      console.error('Error fetching surveys:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatusCounts = (allSurveys: Survey[]) => {
    // This is a simplified version - in production, you'd get counts from API
    if (!allSurveys || !Array.isArray(allSurveys)) {
      return;
    }
    
    const counts = {
      all: total,
      active: allSurveys.filter(s => s.status === 'active').length,
      draft: allSurveys.filter(s => s.status === 'draft').length,
      paused: allSurveys.filter(s => s.status === 'paused').length,
      completed: allSurveys.filter(s => s.status === 'completed').length
    };
    setStatusCounts(counts);
  };

  const handleTabChange = (tab: StatusTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSortChange = (option: string) => {
    const sortMap: Record<string, { sort: SortOption; order: 'asc' | 'desc' }> = {
      'newest': { sort: 'created_at', order: 'desc' },
      'oldest': { sort: 'created_at', order: 'asc' },
      'most_responses': { sort: 'response_count', order: 'desc' },
      'highest_pmf': { sort: 'pmf_score', order: 'desc' },
      'recently_updated': { sort: 'updated_at', order: 'desc' }
    };
    
    const { sort, order } = sortMap[option];
    setSortBy(sort);
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handleCalculateScore = async (survey: Survey) => {
    if (survey.response_count < 5) {
      toast.warning('Need at least 5 responses to calculate PMF score');
      return;
    }

    setCalculatingScoreFor(survey.id);
    
    try {
      const result = await callEccoAPI('/pmf/scores/calculate', 'POST', {
        survey_id: survey.id,
        segment: 'all',
        generate_insights: true
      });

      // Update survey in list
      setSurveys(surveys.map(s => 
        s.id === survey.id 
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
        toast.info(`Score calculated: ${result.sean_ellis_score.toFixed(1)}%`, {
          description: 'Below 40% threshold',
          duration: 5000
        });
      }
    } catch (error) {
      console.error('Error calculating score:', error);
      toast.error('Failed to calculate score. Please try again.');
    } finally {
      setCalculatingScoreFor(null);
    }
  };

  const handleDuplicateSurvey = async (survey: Survey) => {
    try {
      toast.info('Duplicating survey...');
      
      const result = await callEccoAPI(`/pmf/surveys/${survey.id}/duplicate`, 'POST');
      
      toast.success('Survey duplicated successfully', {
        action: {
          label: 'Edit Copy',
          onClick: () => {
            console.log('Navigate to survey:', result.survey_id);
          }
        },
        duration: 5000
      });
      
      fetchSurveys();
    } catch (error) {
      console.error('Error duplicating survey:', error);
      toast.error('Failed to duplicate survey');
    }
  };

  const handleExportResponses = async (survey: Survey) => {
    if (survey.response_count === 0) {
      toast.warning('No responses to export');
      return;
    }

    try {
      toast.info('Preparing export...');
      
      await callEccoAPI(`/pmf/surveys/${survey.id}/responses/export?format=csv`, 'GET');
      
      toast.success(`${survey.response_count} responses exported`);
    } catch (error) {
      console.error('Error exporting responses:', error);
      toast.error('Failed to export responses');
    }
  };

  const handleCopyLink = (survey: Survey) => {
    if (survey.public_link) {
      navigator.clipboard.writeText(survey.public_link);
      toast.success('Survey link copied to clipboard', {
        duration: 2000
      });
    } else {
      toast.error('No public link available');
    }
  };

  const handleArchiveSurvey = async (survey: Survey) => {
    try {
      await callEccoAPI(`/pmf/surveys/${survey.id}`, 'PATCH', { status: 'archived' });
      
      toast.success('Survey archived');
      fetchSurveys();
    } catch (error) {
      console.error('Error archiving survey:', error);
      toast.error('Failed to archive survey');
    }
  };

  const handleDeleteClick = (survey: Survey) => {
    setSurveyToDelete(survey);
    setDeleteSurveyId(survey.id);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingSurveyId) return;

    try {
      await callEccoAPI(`/pmf/surveys/${deletingSurveyId}`, 'DELETE');
      
      setSurveys(surveys.filter(s => s.id !== deletingSurveyId));
      
      toast.success('Survey deleted successfully');
      fetchSurveys();
    } catch (error) {
      console.error('Error deleting survey:', error);
      toast.error('Failed to delete survey');
    } finally {
      setShowDeleteDialog(false);
      setDeleteSurveyId(null);
      setSurveyToDelete(null);
    }
  };

  const handleViewDetails = (surveyId: string) => {
    if (onNavigate) {
      onNavigate('pmf-survey-details', surveyId);
    } else {
      console.log('Navigate to survey details:', surveyId);
      toast.info('Survey details page would open here');
    }
  };

  const handleEditSurvey = (surveyId: string) => {
    console.log('Navigate to survey editor:', surveyId);
    toast.info('Survey editor would open here');
  };

  const handleCreateSurvey = (type: 'sean_ellis' | 'nps' | 'custom') => {
    if (onNavigate) {
      onNavigate('pmf-create-survey', type);
    } else {
      console.log('Navigate to create survey:', type);
      toast.info(`Creating ${type} survey...`);
    }
  };

  const getSurveyTypeBadge = (type: string) => {
    const badges = {
      sean_ellis: { label: 'Sean Ellis', className: 'bg-blue-500 text-white' },
      nps: { label: 'NPS', className: 'bg-green-500 text-white' },
      custom: { label: 'Custom', className: 'bg-purple-500 text-white' }
    };
    return badges[type as keyof typeof badges] || badges.custom;
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: { label: 'Active', icon: PlayCircle, className: 'bg-green-500 text-white' },
      draft: { label: 'Draft', icon: FileText, className: 'bg-gray-500 text-white' },
      paused: { label: 'Paused', icon: AlertTriangle, className: 'bg-yellow-500 text-gray-900' },
      completed: { label: 'Completed', icon: Star, className: 'bg-blue-500 text-white' },
      archived: { label: 'Archived', icon: Archive, className: 'bg-gray-300 text-gray-700' }
    };
    return badges[status as keyof typeof badges] || badges.draft;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const getSortLabel = () => {
    if (sortBy === 'created_at' && sortOrder === 'desc') return 'Newest First';
    if (sortBy === 'created_at' && sortOrder === 'asc') return 'Oldest First';
    if (sortBy === 'response_count') return 'Most Responses';
    if (sortBy === 'pmf_score') return 'Highest PMF Score';
    if (sortBy === 'updated_at') return 'Recently Updated';
    return 'Newest First';
  };

  const getTypeFilterLabel = () => {
    if (surveyTypeFilter === 'all') return 'All Types';
    if (surveyTypeFilter === 'sean_ellis') return 'Sean Ellis';
    if (surveyTypeFilter === 'nps') return 'NPS';
    if (surveyTypeFilter === 'custom') return 'Custom';
    return 'All Types';
  };

  const filteredSurveys = (surveys || []).filter(survey => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      survey.title.toLowerCase().includes(query) ||
      survey.description?.toLowerCase().includes(query)
    );
  });

  if (loading && surveys.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] pb-12">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          {/* Breadcrumb Skeleton */}
          <Skeleton className="h-4 w-48 mb-6" />
          
          {/* Header Skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-5 w-96" />
            </div>
            <Skeleton className="h-11 w-44" />
          </div>

          {/* Tabs Skeleton */}
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12 w-32" />
            ))}
          </div>

          {/* Filter Bar Skeleton */}
          <Card className="p-5 mb-6">
            <div className="flex justify-between">
              <div className="flex gap-3">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-40" />
              </div>
              <Skeleton className="h-10 w-64" />
            </div>
          </Card>

          {/* Table Skeleton */}
          <Card className="p-6">
            <Skeleton className="h-64 w-full" />
          </Card>
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
            onClick={() => onNavigate?.('dashboard', undefined)}
            className="text-gray-500 hover:text-[#02a4bf] transition-colors"
          >
            Dashboard
          </button>
          <span className="text-gray-400 mx-2">&gt;</span>
          <button 
            onClick={() => onNavigate?.('pmf-overview', undefined)}
            className="text-gray-500 hover:text-[#02a4bf] transition-colors"
          >
            PMF
          </button>
          <span className="text-gray-400 mx-2">&gt;</span>
          <span className="text-[#005260]" style={{ fontWeight: 600 }}>Surveys</span>
        </div>

        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}>
              Surveys
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
              Manage PMF and NPS surveys to measure product-market fit
            </p>
          </div>

          {/* Create Survey Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                className="bg-[#02a4bf] hover:bg-[#028a9f] text-white h-11 px-6"
                style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', width: '180px' }}
              >
                Create Survey
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem 
                className="cursor-pointer py-4" 
                style={{ fontFamily: 'Open Sans' }}
                onClick={() => handleCreateSurvey('sean_ellis')}
              >
                <FileText className="mr-3 h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-medium">Sean Ellis Survey</div>
                  <div className="text-xs text-gray-500">Measure disappointment if product disappeared</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer py-4" 
                style={{ fontFamily: 'Open Sans' }}
                onClick={() => handleCreateSurvey('nps')}
              >
                <Star className="mr-3 h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium">NPS Survey</div>
                  <div className="text-xs text-gray-500">Net Promoter Score from 0-10</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer py-4" 
                style={{ fontFamily: 'Open Sans' }}
                onClick={() => handleCreateSurvey('custom')}
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

        {/* Status Tabs */}
        <div className="bg-white rounded-t-2xl mb-0">
          <div className="flex gap-0 border-b border-gray-200">
            {[
              { key: 'all', label: 'All Surveys', count: total },
              { key: 'active', label: 'Active', count: statusCounts.active },
              { key: 'draft', label: 'Draft', count: statusCounts.draft },
              { key: 'paused', label: 'Paused', count: statusCounts.paused },
              { key: 'completed', label: 'Completed', count: statusCounts.completed }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key as StatusTab)}
                className={`px-6 py-3 transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-[#02a4bf] text-white border-b-4 border-[#02a4bf]'
                    : 'text-gray-600 hover:bg-[#F0F9FA]'
                }`}
                style={{ 
                  fontFamily: 'Poppins', 
                  fontWeight: 500, 
                  fontSize: '15px',
                  minWidth: '140px',
                  height: '48px'
                }}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <Card className="rounded-t-none rounded-b-2xl p-5 mb-0 border-t-0">
          <div className="flex items-center justify-between">
            {/* Left side - Filters */}
            <div className="flex items-center gap-4">
              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <span className="text-gray-700" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Type:
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-white"
                      style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                    >
                      {getTypeFilterLabel()}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSurveyTypeFilter('all')}>All Types</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSurveyTypeFilter('sean_ellis')}>Sean Ellis</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSurveyTypeFilter('nps')}>NPS</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSurveyTypeFilter('custom')}>Custom</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Sort Filter */}
              <div className="flex items-center gap-2">
                <span className="text-gray-700" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Sort by:
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-white"
                      style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                    >
                      {getSortLabel()}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleSortChange('newest')}>Newest First</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortChange('oldest')}>Oldest First</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortChange('most_responses')}>Most Responses</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortChange('highest_pmf')}>Highest PMF Score</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortChange('recently_updated')}>Recently Updated</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Right side - Search */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search surveys..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-72 h-10 border-gray-300 focus:border-[#02a4bf]"
                  style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                />
              </div>
              <span className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Showing {filteredSurveys.length} surveys
              </span>
            </div>
          </div>
        </Card>

        {/* Table */}
        <Card className="rounded-t-none rounded-b-2xl mt-0 border-t-0">
          {filteredSurveys.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-[#f9fafb]">
                  <TableHead className="w-[35%]" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                    Survey
                  </TableHead>
                  <TableHead className="w-[10%] text-center" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                    Type
                  </TableHead>
                  <TableHead className="w-[10%] text-center" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                    Status
                  </TableHead>
                  <TableHead className="w-[10%] text-center" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                    Responses
                  </TableHead>
                  <TableHead className="w-[15%] text-center" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                    PMF Score
                  </TableHead>
                  <TableHead className="w-[12%] text-center" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                    Created
                  </TableHead>
                  <TableHead className="w-[8%] text-right" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSurveys.map((survey) => {
                  const typeBadge = getSurveyTypeBadge(survey.survey_type);
                  const statusBadge = getStatusBadge(survey.status);
                  const StatusIcon = statusBadge.icon;

                  return (
                    <TableRow key={survey.id} className="h-20 hover:bg-[#f9fafb] transition-colors">
                      {/* Survey Title & Description */}
                      <TableCell className="py-4">
                        <button
                          onClick={() => handleViewDetails(survey.id)}
                          className="text-left hover:underline"
                        >
                          <div 
                            className="text-[#005260] mb-1 line-clamp-1"
                            style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '15px' }}
                          >
                            {survey.title}
                          </div>
                          {survey.description && (
                            <div 
                              className="text-gray-600 line-clamp-1"
                              style={{ fontFamily: 'Open Sans', fontSize: '13px' }}
                            >
                              {survey.description}
                            </div>
                          )}
                        </button>
                      </TableCell>

                      {/* Type Badge */}
                      <TableCell className="text-center">
                        <Badge 
                          className={`${typeBadge.className} rounded-full px-3 py-1`}
                          style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '12px' }}
                        >
                          {typeBadge.label}
                        </Badge>
                      </TableCell>

                      {/* Status Badge */}
                      <TableCell className="text-center">
                        <Badge 
                          className={`${statusBadge.className} rounded-full px-3 py-1 uppercase flex items-center justify-center gap-1 w-fit mx-auto`}
                          style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '12px' }}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {statusBadge.label}
                        </Badge>
                      </TableCell>

                      {/* Responses */}
                      <TableCell className="text-center">
                        <div 
                          className={`${survey.response_count === 0 ? 'text-gray-400' : 'text-[#005260]'}`}
                          style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}
                        >
                          {survey.response_count}
                        </div>
                        <div 
                          className="text-gray-500"
                          style={{ fontFamily: 'Open Sans', fontSize: '11px' }}
                        >
                          responses
                        </div>
                      </TableCell>

                      {/* PMF Score */}
                      <TableCell className="text-center">
                        {survey.survey_type === 'sean_ellis' && survey.latest_pmf_score !== undefined ? (
                          <div>
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <span 
                                className="text-gray-500"
                                style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '11px' }}
                              >
                                PMF:
                              </span>
                              <span 
                                className={survey.pmf_achieved ? 'text-[#02a4bf]' : 'text-[#e84e1c]'}
                                style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px' }}
                              >
                                {survey.latest_pmf_score.toFixed(1)}%
                              </span>
                              <span>{survey.pmf_achieved ? '✅' : '⏳'}</span>
                            </div>
                            {survey.latest_nps_score !== undefined && (
                              <div className="flex items-center justify-center gap-1">
                                <span 
                                  className="text-gray-500"
                                  style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '11px' }}
                                >
                                  NPS:
                                </span>
                                <span 
                                  className="text-[#02a4bf]"
                                  style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}
                                >
                                  {survey.latest_nps_score}
                                </span>
                              </div>
                            )}
                          </div>
                        ) : survey.survey_type === 'nps' && survey.latest_nps_score !== undefined ? (
                          <div>
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <span 
                                className="text-gray-500"
                                style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '11px' }}
                              >
                                NPS:
                              </span>
                              <span 
                                className="text-[#02a4bf]"
                                style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px' }}
                              >
                                {survey.latest_nps_score}
                              </span>
                            </div>
                            <div 
                              className="text-gray-400"
                              style={{ fontFamily: 'Open Sans', fontSize: '11px' }}
                            >
                              P:{survey.promoters_count} | Pa:{survey.passives_count} | D:{survey.detractors_count}
                            </div>
                          </div>
                        ) : survey.survey_type === 'custom' ? (
                          <div 
                            className="text-gray-500"
                            style={{ fontFamily: 'Open Sans', fontSize: '13px' }}
                          >
                            Custom survey
                          </div>
                        ) : (
                          <div>
                            <div 
                              className="text-gray-500 mb-1"
                              style={{ fontFamily: 'Open Sans', fontSize: '13px' }}
                            >
                              Not calculated
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-[#02a4bf] hover:text-[#028a9f] h-7"
                              style={{ fontFamily: 'Open Sans', fontSize: '12px' }}
                              onClick={() => handleCalculateScore(survey)}
                              disabled={calculatingScoreFor === survey.id || survey.response_count < 5}
                            >
                              {calculatingScoreFor === survey.id ? (
                                <>
                                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                  Calculating...
                                </>
                              ) : (
                                'Calculate'
                              )}
                            </Button>
                          </div>
                        )}
                      </TableCell>

                      {/* Created Date */}
                      <TableCell className="text-center">
                        <div 
                          className="text-gray-700"
                          style={{ fontFamily: 'Open Sans', fontSize: '13px' }}
                        >
                          {formatDate(survey.created_at)}
                        </div>
                        <div 
                          className="text-gray-400 mt-1"
                          style={{ fontFamily: 'Open Sans', fontSize: '11px' }}
                        >
                          {formatTime(survey.created_at)}
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-gray-500 hover:text-[#02a4bf]"
                            >
                              <MoreVertical className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => handleViewDetails(survey.id)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => handleEditSurvey(survey.id)}
                            >
                              <Edit2 className="mr-2 h-4 w-4" />
                              Edit Survey
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              disabled={survey.response_count < 5}
                              onClick={() => handleCalculateScore(survey)}
                            >
                              <FileQuestion className="mr-2 h-4 w-4" />
                              Calculate Score
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => handleDuplicateSurvey(survey)}
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              disabled={survey.response_count === 0}
                              onClick={() => handleExportResponses(survey)}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Export Responses
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => handleCopyLink(survey)}
                            >
                              <Link2 className="mr-2 h-4 w-4" />
                              Copy Survey Link
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => handleArchiveSurvey(survey)}
                            >
                              <Archive className="mr-2 h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer text-red-600"
                              onClick={() => handleDeleteClick(survey)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <FileText className="h-20 w-20 text-gray-300 mb-4" />
              <h3 
                className="text-gray-800 mb-2"
                style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}
              >
                {searchQuery ? 'No surveys found' : 'No Surveys Yet'}
              </h3>
              <p 
                className="text-gray-600 mb-6 max-w-md text-center"
                style={{ fontFamily: 'Open Sans', fontSize: '16px' }}
              >
                {searchQuery 
                  ? 'Try adjusting your filters or search terms'
                  : 'Create your first PMF survey to start measuring product-market fit'
                }
              </p>
              {searchQuery ? (
                <Button 
                  variant="outline"
                  className="text-[#02a4bf] border-[#02a4bf] hover:bg-[#02a4bf] hover:text-white"
                  onClick={() => setSearchQuery('')}
                  style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                >
                  Clear Filters
                </Button>
              ) : (
                <Button 
                  className="bg-[#02a4bf] hover:bg-[#028a9f] text-white h-12 px-8"
                  style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                  onClick={() => handleCreateSurvey('sean_ellis')}
                >
                  Create Your First Survey
                </Button>
              )}
            </div>
          )}

          {/* Pagination */}
          {filteredSurveys.length > 0 && total > pageSize && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div 
                className="text-gray-600"
                style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
              >
                Showing {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, total)} of {total} surveys
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!hasPrev}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="w-24"
                  style={{ fontFamily: 'Open Sans' }}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!hasNext}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="w-24"
                  style={{ fontFamily: 'Open Sans' }}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <AlertDialogTitle 
                className="text-gray-900"
                style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}
              >
                Delete Survey?
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription style={{ fontFamily: 'Open Sans' }}>
              <div className="space-y-3">
                <p>
                  Delete "<span className="font-semibold">{surveyToDelete?.title}</span>"?
                </p>
                <p className="font-medium text-gray-700">This will permanently delete:</p>
                <ul className="space-y-1 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>All survey questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>All {surveyToDelete?.response_count} responses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>All calculated PMF scores</span>
                  </li>
                </ul>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-red-800 font-semibold text-sm">
                    This action cannot be undone.
                  </span>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-gray-100 hover:bg-gray-200"
              style={{ fontFamily: 'Open Sans' }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
              style={{ fontFamily: 'Poppins', fontWeight: 600 }}
            >
              Delete Survey
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}