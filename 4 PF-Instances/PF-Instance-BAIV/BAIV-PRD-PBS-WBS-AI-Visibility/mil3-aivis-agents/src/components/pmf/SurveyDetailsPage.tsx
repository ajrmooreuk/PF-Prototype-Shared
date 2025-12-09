import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { ArrowLeft, Calendar, Edit, BarChart3, MoreVertical, Copy, QrCode, Mail, Eye, Search, Download, CheckCircle, X } from 'lucide-react';
import { callEccoAPI } from '../../lib/eccoAPI';
import { toast } from 'sonner@2.0.3';
import confetti from 'canvas-confetti';

type TabType = 'overview' | 'responses' | 'questions';
type SurveyType = 'sean_ellis' | 'nps' | 'custom';

interface SurveyDetails {
  id: string;
  title: string;
  description: string;
  survey_type: SurveyType;
  status: string;
  product_name: string;
  target_segment: string;
  response_count: number;
  completion_rate: number;
  avg_completion_time_seconds: number;
  latest_response_at: string;
  created_at: string;
  public_link: string;
  score_details?: {
    calculation_date: string;
    sean_ellis_score: number;
    pmf_achieved: boolean;
    total_responses: number;
    very_disappointed_count: number;
    somewhat_disappointed_count: number;
    not_disappointed_count: number;
    nps_score: number;
    promoters_count: number;
    passives_count: number;
    detractors_count: number;
    recommendations: string[];
  };
  questions: Array<{
    id: string;
    question_text: string;
    question_type: string;
    options?: string[];
    is_required: boolean;
    display_order: number;
    response_count: number;
  }>;
  discovery_comparison?: {
    has_comparison: boolean;
    new_pain_points: string[];
    alignment_score: number;
  };
}

interface Response {
  id: string;
  customer_email: string;
  customer_name: string;
  customer_segment: string;
  answers: Record<string, { answer: string; score?: number }>;
  completion_time_seconds: number;
  completed_at: string;
  ip_address: string;
  user_agent: string;
  referrer_url: string;
}

interface SurveyDetailsPageProps {
  onNavigate?: (page: string) => void;
}

export function SurveyDetailsPage({ onNavigate }: SurveyDetailsPageProps) {
  // Using default survey ID for demo - in production this would come from routing
  const surveyId = '550e8400-e29b-41d4-a716-446655440000';
  
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [survey, setSurvey] = useState<SurveyDetails | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);
  const [filteredResponses, setFilteredResponses] = useState<Response[]>([]);
  const [selectedResponse, setSelectedResponse] = useState<Response | null>(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Filters
  const [segmentFilter, setSegmentFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [pmfAnswerFilter, setPmfAnswerFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadSurveyDetails();
  }, [surveyId]);

  useEffect(() => {
    if (activeTab === 'responses' && responses.length === 0) {
      loadResponses();
    }
  }, [activeTab]);

  useEffect(() => {
    filterResponses();
  }, [responses, segmentFilter, dateFilter, pmfAnswerFilter, searchQuery]);

  const loadSurveyDetails = async () => {
    try {
      setLoading(true);
      const data = await callEccoAPI(`/pmf/surveys/${surveyId}`, 'GET');
      setSurvey(data);
    } catch (error) {
      toast.error('Failed to load survey details');
    } finally {
      setLoading(false);
    }
  };

  const loadResponses = async () => {
    try {
      const data = await callEccoAPI(`/pmf/surveys/${surveyId}/responses`, 'GET');
      setResponses(data.responses || []);
    } catch (error) {
      toast.error('Failed to load responses');
    }
  };

  const filterResponses = () => {
    let filtered = [...responses];

    if (segmentFilter !== 'all') {
      filtered = filtered.filter(r => r.customer_segment === segmentFilter);
    }

    if (pmfAnswerFilter !== 'all') {
      filtered = filtered.filter(r => {
        const pmfAnswer = Object.values(r.answers).find(a => 
          ['Very disappointed', 'Somewhat disappointed', 'Not disappointed'].includes(a.answer)
        );
        return pmfAnswer?.answer === pmfAnswerFilter;
      });
    }

    if (searchQuery) {
      filtered = filtered.filter(r =>
        r.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredResponses(filtered);
  };

  const handleCalculateScore = async () => {
    if (!survey || survey.response_count < 5) {
      toast.error('Need at least 5 responses to calculate score');
      return;
    }

    try {
      setCalculating(true);
      const scoreData = await callEccoAPI('/pmf/scores/calculate', 'POST', {
        survey_id: surveyId,
        segment: 'all',
        generate_insights: true
      });

      // Update survey with new score
      setSurvey(prev => prev ? {
        ...prev,
        score_details: {
          calculation_date: scoreData.calculation_date,
          sean_ellis_score: scoreData.sean_ellis_score,
          pmf_achieved: scoreData.pmf_achieved,
          total_responses: scoreData.total_responses,
          very_disappointed_count: scoreData.very_disappointed_count,
          somewhat_disappointed_count: scoreData.somewhat_disappointed_count,
          not_disappointed_count: scoreData.not_disappointed_count,
          nps_score: scoreData.nps_score,
          promoters_count: scoreData.promoters_count,
          passives_count: scoreData.passives_count,
          detractors_count: scoreData.detractors_count,
          recommendations: scoreData.recommendations
        }
      } : null);

      if (scoreData.pmf_achieved) {
        toast.success(`🎉 PMF Achieved! Score: ${scoreData.sean_ellis_score.toFixed(1)}%`);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        toast.success(`Score calculated: ${scoreData.sean_ellis_score.toFixed(1)}%`, {
          description: 'Below 40% threshold'
        });
      }
    } catch (error) {
      toast.error('Failed to calculate score');
    } finally {
      setCalculating(false);
    }
  };

  const handleCopyLink = () => {
    if (survey?.public_link) {
      navigator.clipboard.writeText(survey.public_link);
      toast.success('Survey link copied to clipboard');
    }
  };

  const handleExportResponses = async () => {
    try {
      await callEccoAPI(`/pmf/surveys/${surveyId}/responses/export?format=csv`, 'GET');
      toast.success(`${survey?.response_count || 0} responses exported`);
    } catch (error) {
      toast.error('Failed to export responses');
    }
  };

  const handleDeleteSurvey = async () => {
    try {
      await callEccoAPI(`/pmf/surveys/${surveyId}`, 'DELETE');
      toast.success('Survey deleted successfully');
      // Would navigate back to surveys list
      if (onNavigate) {
        onNavigate('/pmf/surveys');
      } else {
        window.location.href = '/pmf/surveys';
      }
    } catch (error) {
      toast.error('Failed to delete survey');
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  const formatSeconds = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const getEmojiForPMFAnswer = (answer: string) => {
    if (answer === 'Very disappointed') return '😢';
    if (answer === 'Somewhat disappointed') return '😐';
    if (answer === 'Not disappointed') return '😊';
    return '';
  };

  const getQuestionTypeBadge = (type: string) => {
    const types: Record<string, { bg: string; text: string }> = {
      multiple_choice: { bg: 'bg-blue-500', text: 'Multiple Choice' },
      long_text: { bg: 'bg-purple-500', text: 'Long Text' },
      short_text: { bg: 'bg-green-500', text: 'Short Text' },
      rating_scale: { bg: 'bg-orange-500', text: 'Rating Scale' },
    };
    return types[type] || { bg: 'bg-gray-500', text: type };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] p-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-white rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] p-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <p style={{ fontFamily: 'Open Sans' }}>Survey not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Back Navigation */}
        <button
          onClick={() => onNavigate?.('pmf-surveys')}
          className="flex items-center gap-2 text-[#02a4bf] hover:underline mb-2"
          style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Surveys
        </button>

        {/* Breadcrumb */}
        <div className="mb-6" style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#6B7280' }}>
          <button 
            onClick={() => onNavigate?.('dashboard')}
            className="text-gray-500 hover:text-[#02a4bf] transition-colors"
          >
            Dashboard
          </button>
          <span className="mx-2">&gt;</span>
          <button 
            onClick={() => onNavigate?.('pmf-overview')}
            className="text-gray-500 hover:text-[#02a4bf] transition-colors"
          >
            PMF
          </button>
          <span className="mx-2">&gt;</span>
          <button 
            onClick={() => onNavigate?.('pmf-surveys')}
            className="text-gray-500 hover:text-[#02a4bf] transition-colors"
          >
            Surveys
          </button>
          <span className="mx-2">&gt;</span>
          <span className="text-[#005260]" style={{ fontWeight: 600 }}>Survey Details</span>
        </div>

        {/* Survey Header */}
        <Card className="p-6 mb-6 shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
                {survey.title}
              </h1>
              <div className="flex items-center gap-4">
                <Badge className="bg-blue-500 text-white" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                  {survey.survey_type === 'sean_ellis' ? 'Sean Ellis' : survey.survey_type === 'nps' ? 'NPS' : 'Custom'}
                </Badge>
                <Badge className="bg-green-500 text-white" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                  ▶️ {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                </Badge>
                <div className="flex items-center gap-2 text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  <Calendar className="h-4 w-4" />
                  Created {formatDate(survey.created_at)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="border-2 border-[#02a4bf] text-[#02a4bf] hover:bg-[#02a4bf]/10"
                style={{ fontFamily: 'Poppins', fontWeight: 500, height: '40px' }}
                onClick={() => {/* Would navigate to edit page */}}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Survey
              </Button>

              <Button
                className="bg-[#02a4bf] text-white hover:bg-[#028a9e]"
                style={{ fontFamily: 'Poppins', fontWeight: 500, height: '40px' }}
                onClick={handleCalculateScore}
                disabled={calculating || (survey.response_count < 5)}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                {calculating ? 'Calculating...' : 'Calculate Score'}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {}}>Duplicate Survey</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportResponses}>Export Responses</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCopyLink}>Copy Survey Link</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {}}>Archive Survey</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-red-600">
                    Delete Survey
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Card>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-t-2xl flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-6 py-4 transition-all ${
              activeTab === 'overview'
                ? 'bg-[#02a4bf] text-white border-b-2 border-[#02a4bf]'
                : 'text-gray-600 hover:bg-[#F0F9FA]'
            }`}
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', minWidth: '180px' }}
          >
            <BarChart3 className="h-5 w-5" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('responses')}
            className={`flex items-center gap-2 px-6 py-4 transition-all ${
              activeTab === 'responses'
                ? 'bg-[#02a4bf] text-white border-b-2 border-[#02a4bf]'
                : 'text-gray-600 hover:bg-[#F0F9FA]'
            }`}
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', minWidth: '180px' }}
          >
            <Edit className="h-5 w-5" />
            Responses
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`flex items-center gap-2 px-6 py-4 transition-all ${
              activeTab === 'questions'
                ? 'bg-[#02a4bf] text-white border-b-2 border-[#02a4bf]'
                : 'text-gray-600 hover:bg-[#F0F9FA]'
            }`}
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', minWidth: '180px' }}
          >
            ❓ Questions
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-2xl p-6">
          {activeTab === 'overview' && (
            <OverviewTab survey={survey} formatSeconds={formatSeconds} formatTimeAgo={formatTimeAgo} handleCopyLink={handleCopyLink} />
          )}

          {activeTab === 'responses' && (
            <ResponsesTab
              responses={filteredResponses}
              survey={survey}
              segmentFilter={segmentFilter}
              setSegmentFilter={setSegmentFilter}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
              pmfAnswerFilter={pmfAnswerFilter}
              setPmfAnswerFilter={setPmfAnswerFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleExportResponses={handleExportResponses}
              formatDate={formatDate}
              formatTime={formatTime}
              formatSeconds={formatSeconds}
              getEmojiForPMFAnswer={getEmojiForPMFAnswer}
              onViewResponse={(response) => {
                setSelectedResponse(response);
                setShowResponseModal(true);
              }}
            />
          )}

          {activeTab === 'questions' && (
            <QuestionsTab questions={survey.questions} getQuestionTypeBadge={getQuestionTypeBadge} />
          )}
        </div>
      </div>

      {/* Response Detail Modal */}
      {showResponseModal && selectedResponse && (
        <Dialog open={showResponseModal} onOpenChange={setShowResponseModal}>
          <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                    {selectedResponse.customer_email}
                  </DialogTitle>
                  <DialogDescription style={{ fontFamily: 'Open Sans' }}>
                    {selectedResponse.customer_name}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              {/* Response Summary */}
              <div>
                <h3 className="mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>Response Summary</h3>
                <div className="flex gap-4 flex-wrap">
                  <Badge className="bg-blue-500 text-white">
                    {selectedResponse.customer_segment}
                  </Badge>
                  <span className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    Submitted: {formatDate(selectedResponse.completed_at)} at {formatTime(selectedResponse.completed_at)}
                  </span>
                  <span className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    Completion: {formatSeconds(selectedResponse.completion_time_seconds)}
                  </span>
                </div>
                <p className="text-gray-500 mt-2" style={{ fontFamily: 'Open Sans', fontSize: '11px' }}>
                  IP: {selectedResponse.ip_address}
                </p>
              </div>

              {/* Answers */}
              <div>
                <h3 className="mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>Answers</h3>
                <div className="space-y-4">
                  {survey.questions.map((q, idx) => {
                    const answer = selectedResponse.answers[q.id];
                    if (!answer) return null;
                    return (
                      <div key={q.id} className="bg-gray-50 p-3 rounded-lg">
                        <p className="mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '15px' }}>
                          Q{idx + 1}: {q.question_text}
                        </p>
                        <p style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#374151' }}>
                          A: {answer.answer}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowResponseModal(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Survey?</DialogTitle>
            <DialogDescription>
              Delete "{survey.title}"? This will permanently delete all {survey.response_count} responses. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                setShowDeleteDialog(false);
                handleDeleteSurvey();
              }}
            >
              Delete Survey
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({
  survey,
  formatSeconds,
  formatTimeAgo,
  handleCopyLink
}: {
  survey: SurveyDetails;
  formatSeconds: (s: number) => string;
  formatTimeAgo: (d: string) => string;
  handleCopyLink: () => void;
}) {
  const scoreDetails = survey.score_details;

  return (
    <div className="space-y-6">
      {/* PMF Score Section */}
      {scoreDetails && survey.survey_type === 'sean_ellis' && (
        <div
          className={`border-2 rounded-2xl p-8 ${
            scoreDetails.pmf_achieved ? 'bg-[#E6F7F9] border-[#02a4bf]' : 'bg-orange-50 border-[#e84e1c]'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}>Current PMF Score</h2>
            <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
              Calculated {formatDate(scoreDetails.calculation_date)} at {formatTime(scoreDetails.calculation_date)}
            </p>
          </div>

          <div className="text-center mb-8">
            <div
              className={scoreDetails.pmf_achieved ? 'text-[#02a4bf]' : 'text-[#e84e1c]'}
              style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '64px' }}
            >
              {scoreDetails.sean_ellis_score.toFixed(1)}%
            </div>
            <Badge
              className={`mt-4 text-white ${scoreDetails.pmf_achieved ? 'bg-green-500' : 'bg-orange-500'}`}
              style={{ fontFamily: 'Poppins', padding: '8px 16px', fontSize: '14px' }}
            >
              {scoreDetails.pmf_achieved ? '✅ PMF Achieved!' : '⏳ Below Threshold'}
            </Badge>
            <p className="mt-2 text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              40% threshold for product-market fit
            </p>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-4xl mb-2">😢</div>
              <p className="text-gray-600 mb-1" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                {scoreDetails.very_disappointed_count} responses
              </p>
              <p className="text-[#02a4bf]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
                {scoreDetails.sean_ellis_score.toFixed(1)}%
              </p>
              <p className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>Very disappointed</p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#02a4bf]" style={{ width: `${scoreDetails.sean_ellis_score}%` }}></div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-2">😐</div>
              <p className="text-gray-600 mb-1" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                {scoreDetails.somewhat_disappointed_count} responses
              </p>
              <p className="text-gray-700" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
                {((scoreDetails.somewhat_disappointed_count / scoreDetails.total_responses) * 100).toFixed(1)}%
              </p>
              <p className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>Somewhat disappointed</p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gray-400" style={{ width: `${(scoreDetails.somewhat_disappointed_count / scoreDetails.total_responses) * 100}%` }}></div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-2">😊</div>
              <p className="text-gray-600 mb-1" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                {scoreDetails.not_disappointed_count} responses
              </p>
              <p className="text-gray-700" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
                {((scoreDetails.not_disappointed_count / scoreDetails.total_responses) * 100).toFixed(1)}%
              </p>
              <p className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>Not disappointed</p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gray-400" style={{ width: `${(scoreDetails.not_disappointed_count / scoreDetails.total_responses) * 100}%` }}></div>
              </div>
            </div>
          </div>

          <p className="text-center mt-6" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
            Total: {scoreDetails.total_responses} responses
          </p>
        </div>
      )}

      {/* NPS Score */}
      {scoreDetails && scoreDetails.nps_score !== undefined && (
        <Card className="p-6 border">
          <h3 className="mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
            Net Promoter Score
          </h3>
          <div className="flex items-center gap-8">
            <div>
              <div className="text-[#02a4bf]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '48px' }}>
                {scoreDetails.nps_score}
              </div>
              <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>NPS Score</p>
            </div>

            <div className="flex-1 grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">😊</span>
                  <span className="text-green-600" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
                    {scoreDetails.promoters_count}
                  </span>
                </div>
                <p style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Promoters (9-10)</p>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${(scoreDetails.promoters_count / scoreDetails.total_responses) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">😐</span>
                  <span className="text-yellow-600" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
                    {scoreDetails.passives_count}
                  </span>
                </div>
                <p style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Passives (7-8)</p>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: `${(scoreDetails.passives_count / scoreDetails.total_responses) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">😞</span>
                  <span className="text-red-600" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
                    {scoreDetails.detractors_count}
                  </span>
                </div>
                <p style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Detractors (0-6)</p>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: `${(scoreDetails.detractors_count / scoreDetails.total_responses) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Response Statistics */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
            Response Statistics
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Edit className="h-5 w-5 text-[#02a4bf]" />
              <div>
                <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
                  {survey.response_count}
                </p>
                <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Total responses</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-blue-500">⏱️</div>
              <div>
                <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
                  {formatSeconds(survey.avg_completion_time_seconds)}
                </p>
                <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Avg completion time</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
                  {survey.completion_rate}%
                </p>
                <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Completion rate</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  {formatTimeAgo(survey.latest_response_at)}
                </p>
                <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Most recent response</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Public Survey Link */}
        <Card className="p-6 bg-gray-50">
          <h3 className="mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
            Public Survey Link
          </h3>
          <p className="text-green-600 mb-4" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
            Active and accepting responses
          </p>

          <div className="bg-white border rounded-lg p-4 mb-4 flex items-center justify-between">
            <code className="text-[#02a4bf] text-sm overflow-hidden text-ellipsis" style={{ fontFamily: 'monospace' }}>
              {survey.public_link}
            </code>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={handleCopyLink}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <QrCode className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 border-[#02a4bf] text-[#02a4bf]">
              <Mail className="h-4 w-4 mr-2" />
              Email Survey
            </Button>
            <Button className="flex-1 bg-[#02a4bf] text-white">
              <Eye className="h-4 w-4 mr-2" />
              View Public Page
            </Button>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      {scoreDetails && (
        <Card className={`p-6 ${scoreDetails.pmf_achieved ? 'bg-blue-50' : 'bg-orange-50'}`}>
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <h3 className="mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
                AI Recommendations
              </h3>
              <ul className="space-y-2">
                {scoreDetails.recommendations.map((rec, idx) => (
                  <li key={idx} style={{ fontFamily: 'Open Sans', fontSize: '14px', lineHeight: '1.6' }}>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Discovery Comparison */}
      {survey.discovery_comparison?.has_comparison && (
        <Card className="p-6 border">
          <h3 className="mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
            Discovery Audit Alignment
          </h3>
          <Badge className="bg-green-500 text-white mb-3">High coverage</Badge>
          <p className="mb-3" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            New pain points discovered: {survey.discovery_comparison.new_pain_points.length}
          </p>
          <ul className="space-y-2 mb-4">
            {survey.discovery_comparison.new_pain_points.map((point, idx) => (
              <li key={idx} style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                🆕 {point}
              </li>
            ))}
          </ul>
          <a href="/discovery-audit" className="text-[#02a4bf] hover:underline" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            View Full Discovery Audit →
          </a>
        </Card>
      )}
    </div>
  );
}

// Format helper functions at component level
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

// Responses Tab Component
function ResponsesTab({
  responses,
  survey,
  segmentFilter,
  setSegmentFilter,
  dateFilter,
  setDateFilter,
  pmfAnswerFilter,
  setPmfAnswerFilter,
  searchQuery,
  setSearchQuery,
  handleExportResponses,
  formatDate,
  formatTime,
  formatSeconds,
  getEmojiForPMFAnswer,
  onViewResponse
}: any) {
  if (responses.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}>
          No Responses Yet
        </h3>
        <p className="text-gray-600 mb-6" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Share your survey link to start collecting responses
        </p>
        <Button className="bg-[#02a4bf] text-white h-12">
          Copy Survey Link
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-3">
          <Select value={segmentFilter} onValueChange={setSegmentFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Segments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Segments</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
              <SelectItem value="SMB">SMB</SelectItem>
              <SelectItem value="Free Trial">Free Trial</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>

          {survey.survey_type === 'sean_ellis' && (
            <Select value={pmfAnswerFilter} onValueChange={setPmfAnswerFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Answers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Answers</SelectItem>
                <SelectItem value="Very disappointed">Very Disappointed</SelectItem>
                <SelectItem value="Somewhat disappointed">Somewhat</SelectItem>
                <SelectItem value="Not disappointed">Not Disappointed</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search responses..."
              className="pl-10 w-[280px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button variant="outline" onClick={handleExportResponses}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="text-right text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
        Showing {responses.length} responses
      </div>

      {/* Responses Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>Respondent</th>
              <th className="text-left px-4 py-3" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>Segment</th>
              <th className="text-left px-4 py-3" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>PMF Answer</th>
              <th className="text-left px-4 py-3" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>Submitted</th>
              <th className="text-left px-4 py-3" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>Time</th>
              <th className="text-left px-4 py-3" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response: Response) => {
              const pmfAnswer = Object.values(response.answers).find(a =>
                ['Very disappointed', 'Somewhat disappointed', 'Not disappointed'].includes(a.answer)
              );
              const emoji = pmfAnswer ? getEmojiForPMFAnswer(pmfAnswer.answer) : '';

              return (
                <tr key={response.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div>
                      <p style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                        {response.customer_email}
                      </p>
                      <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                        {response.customer_name}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge className={`${
                      response.customer_segment === 'Enterprise' ? 'bg-blue-500' :
                      response.customer_segment === 'SMB' ? 'bg-green-500' :
                      'bg-yellow-500'
                    } text-white`}>
                      {response.customer_segment}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-[#02a4bf]" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                        {emoji} {pmfAnswer?.answer}
                      </p>
                      {survey.questions[1] && response.answers[survey.questions[1].id] && (
                        <p className="text-gray-600 italic" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                          {response.answers[survey.questions[1].id].answer.substring(0, 60)}...
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                        {formatDate(response.completed_at)}
                      </p>
                      <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                        {formatTime(response.completed_at)}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <p style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                      {formatSeconds(response.completion_time_seconds)}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <Button
                      size="sm"
                      className="bg-[#02a4bf] text-white h-8"
                      onClick={() => onViewResponse(response)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Questions Tab Component
function QuestionsTab({
  questions,
  getQuestionTypeBadge
}: {
  questions: any[];
  getQuestionTypeBadge: (type: string) => { bg: string; text: string };
}) {
  return (
    <div className="space-y-4">
      {questions.map((q, idx) => {
        const typeBadge = getQuestionTypeBadge(q.question_type);

        return (
          <Card key={q.id} className="p-5 hover:bg-gray-50 border">
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-[#02a4bf]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                Question {idx + 1}
              </h4>
              <Badge className={`${typeBadge.bg} text-white`} style={{ fontFamily: 'Poppins', fontSize: '12px' }}>
                {typeBadge.text}
              </Badge>
            </div>

            <p className="mb-3 text-gray-900" style={{ fontFamily: 'Open Sans', fontSize: '15px', lineHeight: '1.6' }}>
              {q.question_text}
            </p>

            {q.options && (
              <div className="mb-3">
                <p className="text-gray-600 mb-2" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>Options:</p>
                <ul className="space-y-1">
                  {q.options.map((opt: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-gray-400">•</span>
                      <span style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>{opt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {q.is_required && (
              <Badge className="bg-red-500 text-white mb-3" style={{ fontSize: '11px' }}>
                Required
              </Badge>
            )}

            <div className="bg-[#E6F7F9] px-4 py-3 rounded-lg flex items-center justify-between">
              <span style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                {q.response_count} responses
              </span>
              <a href="#" className="text-[#02a4bf] hover:underline" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                View responses →
              </a>
            </div>
          </Card>
        );
      })}
    </div>
  );
}