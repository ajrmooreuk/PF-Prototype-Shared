import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { toast } from 'sonner@2.0.3';
import {
  ArrowLeft, Download, RefreshCw, Trash2, Mail, Calendar,
  AlertCircle, Copy, Lightbulb, Target, AlertTriangle,
  DollarSign, Users, Clock, CreditCard, User, Zap
} from 'lucide-react';
import { callEccoAPI } from '../../lib/eccoAPI';

interface InterviewAnalysisPageProps {
  interviewId: string;
  onNavigate: (page: string) => void;
}

export function InterviewAnalysisPage({ interviewId, onNavigate }: InterviewAnalysisPageProps) {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'analysis' | 'transcript' | 'details'>('analysis');
  const [interview, setInterview] = useState<any>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadInterviewData();
  }, [interviewId]);

  const loadInterviewData = async () => {
    setLoading(true);
    try {
      const response = await callEccoAPI(`/api/pmf/interviews/${interviewId}`, 'GET');
      setInterview(response);
      setNotes(response.notes || '');
    } catch (error) {
      console.error('Failed to load interview:', error);
      toast.error('Interview not found');
      onNavigate('pmf-interviews');
    } finally {
      setLoading(false);
    }
  };

  const handleRetryAnalysis = async () => {
    try {
      await callEccoAPI(`/api/pmf/interviews/${interviewId}/retry-analysis`, 'POST');
      toast.info('Analysis restarted. This may take 2-3 minutes.');
      loadInterviewData();
    } catch (error) {
      console.error('Retry failed:', error);
      toast.error('Failed to restart analysis');
    }
  };

  const handleDownload = async () => {
    try {
      await callEccoAPI(`/api/pmf/interviews/${interviewId}/download`, 'GET');
      toast.success('Transcript downloaded');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download transcript');
    }
  };

  const handleDelete = async () => {
    try {
      await callEccoAPI(`/api/pmf/interviews/${interviewId}`, 'DELETE');
      toast.success('Interview deleted successfully');
      onNavigate('pmf-interviews');
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete interview');
    }
  };

  const handleSaveNotes = async () => {
    try {
      await callEccoAPI(`/api/pmf/interviews/${interviewId}`, 'PATCH', { notes });
      toast.success('Notes saved');
      setNotesModalOpen(false);
      loadInterviewData();
    } catch (error) {
      console.error('Save failed:', error);
      toast.error('Failed to save notes');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getSentimentEmoji = (score: number) => {
    if (score >= 8) return '😊';
    if (score >= 6) return '🙂';
    if (score >= 4) return '😐';
    return '😟';
  };

  const getSentimentColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-blue-600';
    if (score >= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  const getSentimentDescription = (score: number) => {
    if (score >= 8) return 'Highly positive. Strong PMF indicators detected.';
    if (score >= 6) return 'Generally positive with some concerns.';
    if (score >= 4) return 'Mixed sentiment. Identifies both strengths and weaknesses.';
    return 'Concerning feedback. Major pain points identified.';
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'product_insight': return { icon: Lightbulb, color: 'text-teal-600', label: 'Product Insight' };
      case 'feature_request': return { icon: Target, color: 'text-blue-600', label: 'Feature Request' };
      case 'pain_point': return { icon: AlertTriangle, color: 'text-orange-600', label: 'Pain Point' };
      case 'willingness_to_pay': return { icon: DollarSign, color: 'text-green-600', label: 'Willingness to Pay' };
      case 'competitive': return { icon: Zap, color: 'text-purple-600', label: 'Competitive Mention' };
      default: return { icon: Lightbulb, color: 'text-teal-600', label: 'Insight' };
    }
  };

  const getConfidenceBadge = (confidence: string) => {
    const styles = {
      high: 'bg-green-100 text-green-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-gray-100 text-gray-700'
    };
    return styles[confidence as keyof typeof styles] || styles.medium;
  };

  const getSeverityColor = (severity: number) => {
    if (severity >= 8) return 'border-l-red-500';
    if (severity >= 5) return 'border-l-orange-500';
    return 'border-l-yellow-500';
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-orange-100 text-orange-700',
      low: 'bg-gray-100 text-gray-700'
    };
    return styles[priority as keyof typeof styles] || styles.medium;
  };

  const getSentimentTag = (sentiment: string) => {
    const styles = {
      positive: 'bg-green-100 text-green-700',
      negative: 'bg-red-100 text-red-700',
      neutral: 'bg-gray-100 text-gray-700',
      switched_from: 'bg-orange-100 text-orange-700',
      considering: 'bg-yellow-100 text-yellow-700'
    };
    return styles[sentiment as keyof typeof styles] || styles.neutral;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] p-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!interview) {
    return null;
  }

  const analysis = interview.ai_analysis;

  return (
    <div className="min-h-screen bg-[#f5f7fa] p-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Back Navigation */}
        <button
          onClick={() => onNavigate('pmf-interviews')}
          className="flex items-center gap-2 text-[#6b7280] hover:text-teal-600 hover:underline mb-4"
          style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Interviews
        </button>

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px', color: '#1a1a1a' }}>
              Interview with {interview.interviewee_name || 'Anonymous'}
            </h1>
            <div className="flex items-center gap-3 mt-4">
              <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '12px' }}>
                {interview.interviewee_segment}
              </span>
              <span className="flex items-center gap-1 text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                <Calendar className="w-4 h-4" />
                {formatDate(interview.interview_date)}
              </span>
              {interview.interviewee_email && (
                <a
                  href={`mailto:${interview.interviewee_email}`}
                  className="flex items-center gap-1 text-[#6b7280] hover:text-teal-600"
                  style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                >
                  <Mail className="w-4 h-4" />
                  {interview.interviewee_email}
                </a>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleDownload}
              style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            {interview.analysis_status === 'failed' && (
              <Button
                onClick={handleRetryAnalysis}
                className="bg-teal-600 hover:bg-teal-700 text-white"
                style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Re-run Analysis
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(true)}
              className="text-red-600 hover:bg-red-50 border-red-200"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="h-px bg-gray-200 my-6" />

        {/* Tabs */}
        <div className="border-b-2 border-gray-200 mb-6">
          <div className="flex gap-8">
            {['analysis', 'transcript', 'details'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-3 transition-colors ${
                  activeTab === tab
                    ? 'text-teal-600 border-b-2 border-teal-600 -mb-0.5'
                    : 'text-[#6b7280] hover:text-[#374151]'
                }`}
                style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '15px', textTransform: 'capitalize' }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Analysis Status Banner */}
        {interview.analysis_status === 'processing' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-yellow-700 animate-spin" />
            <span className="text-yellow-800" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
              Analysis in progress... This usually takes 2-3 minutes.
            </span>
          </div>
        )}

        {interview.analysis_status === 'failed' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-700" />
              <span className="text-red-800" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                Analysis failed. Please try again.
              </span>
            </div>
            <Button
              onClick={handleRetryAnalysis}
              className="bg-red-600 hover:bg-red-700 text-white"
              size="sm"
            >
              Retry Analysis
            </Button>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'analysis' && interview.analysis_status === 'analyzed' && (
          <div className="space-y-6">
            {/* Sentiment Overview Card */}
            <Card className="p-6">
              <div className="flex gap-6">
                <div className="flex-1">
                  <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }}>
                    Overall Sentiment
                  </h2>
                  <div className="flex items-center gap-4 mt-5">
                    <span className="text-5xl">{getSentimentEmoji(analysis.sentiment.overall_score)}</span>
                    <span className={`${getSentimentColor(analysis.sentiment.overall_score)}`} style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px' }}>
                      {analysis.sentiment.overall_score.toFixed(1)}/10
                    </span>
                  </div>
                  <p className="text-[#6b7280] mt-4" style={{ fontFamily: 'Open Sans', fontSize: '15px', lineHeight: '1.6' }}>
                    {analysis.sentiment.description}
                  </p>
                </div>
                <div className="w-px bg-gray-200" />
                <div className="w-64 space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '13px' }}>
                        Product
                      </span>
                      <span style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '16px' }}>
                        {analysis.sentiment.product_score.toFixed(1)}/10
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-600 rounded-full" style={{ width: `${(analysis.sentiment.product_score / 10) * 100}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '13px' }}>
                        Features
                      </span>
                      <span style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '16px' }}>
                        {analysis.sentiment.feature_score.toFixed(1)}/10
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-600 rounded-full" style={{ width: `${(analysis.sentiment.feature_score / 10) * 100}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '13px' }}>
                        Willingness to Pay
                      </span>
                      <span style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '16px' }}>
                        {analysis.sentiment.willingness_to_pay_score.toFixed(1)}/10
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-600 rounded-full" style={{ width: `${(analysis.sentiment.willingness_to_pay_score / 10) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Key Insights */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }}>
                  Key Insights
                </h2>
                <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '12px' }}>
                  {analysis.key_insights.length}
                </span>
              </div>
              <div className="space-y-3">
                {analysis.key_insights.map((insight: any, idx: number) => {
                  const { icon: Icon, color, label } = getInsightIcon(insight.type);
                  return (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className={`flex items-center gap-2 ${color}`}>
                          <Icon className="w-4 h-4" />
                          <span style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                            {label}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${getConfidenceBadge(insight.confidence)}`} style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '11px' }}>
                          {insight.confidence} Confidence
                        </span>
                      </div>
                      <p className="text-[#1a1a1a] mb-3" style={{ fontFamily: 'Open Sans', fontSize: '15px', lineHeight: '1.6' }}>
                        {insight.text}
                      </p>
                      {insight.supporting_quote && (
                        <div className="bg-gray-50 border-l-4 border-teal-500 rounded p-3 mb-3">
                          <p className="text-[#6b7280] italic" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                            "{insight.supporting_quote}"
                          </p>
                        </div>
                      )}
                      <div className="flex gap-2 flex-wrap">
                        {insight.tags.map((tag: string, tagIdx: number) => (
                          <span key={tagIdx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs" style={{ fontFamily: 'Open Sans', fontSize: '11px' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Pain Points */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }}>
                  Pain Points Identified
                </h2>
                <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '12px' }}>
                  {analysis.pain_points.length}
                </span>
              </div>
              <div className="space-y-3">
                {analysis.pain_points.map((point: any, idx: number) => (
                  <div key={idx} className={`border-l-4 ${getSeverityColor(point.severity)} border border-gray-200 rounded-lg p-4`}>
                    <div className="flex justify-between items-start mb-3">
                      <h3 style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '15px', color: '#1a1a1a' }}>
                        {point.problem}
                      </h3>
                      <span style={{ fontFamily: 'Open Sans', fontWeight: 700, fontSize: '14px', color: point.severity >= 8 ? '#dc2626' : point.severity >= 5 ? '#f59e0b' : '#eab308' }}>
                        {point.severity}/10
                      </span>
                    </div>
                    {point.current_solution && (
                      <div className="mb-2">
                        <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '13px' }}>
                          Current Solution:{' '}
                        </span>
                        <span className="text-[#374151]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                          {point.current_solution}
                        </span>
                      </div>
                    )}
                    {point.impact && (
                      <div className="mb-3">
                        <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '13px' }}>
                          Impact:{' '}
                        </span>
                        <span className="text-[#374151]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                          {point.impact}
                        </span>
                      </div>
                    )}
                    {point.supporting_quote && (
                      <div className="bg-gray-50 border-l-4 border-orange-500 rounded p-3">
                        <p className="text-[#6b7280] italic" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                          "{point.supporting_quote}"
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Willingness to Pay */}
            <Card className="p-6">
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }} className="mb-5">
                Willingness to Pay Indicators
              </h2>
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#10b981"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(analysis.willingness_to_pay.score / 10) * 351.86} 351.86`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', color: '#1a1a1a' }}>
                      {analysis.willingness_to_pay.score}
                    </span>
                    <span className="text-green-600" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '15px' }}>
                      {analysis.willingness_to_pay.interpretation}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-6 h-6 text-green-600" />
                    <span style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px', color: '#6b7280' }}>
                      Budget Mentioned
                    </span>
                  </div>
                  <span style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '15px', color: '#1a1a1a' }}>
                    {analysis.willingness_to_pay.indicators.has_budget ? `Yes - ${analysis.willingness_to_pay.indicators.budget_amount}` : 'Not discussed'}
                  </span>
                </div>
                <div className={`${analysis.willingness_to_pay.indicators.authority_level === 'Decision Maker' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'} border rounded-lg p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-6 h-6 text-gray-600" />
                    <span style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px', color: '#6b7280' }}>
                      Decision Authority
                    </span>
                  </div>
                  <span style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '15px', color: '#1a1a1a' }}>
                    {analysis.willingness_to_pay.indicators.authority_level}
                  </span>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-6 h-6 text-green-600" />
                    <span style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px', color: '#6b7280' }}>
                      Purchase Timeline
                    </span>
                  </div>
                  <span style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '15px', color: '#1a1a1a' }}>
                    {analysis.willingness_to_pay.indicators.timeline}
                  </span>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-6 h-6 text-gray-600" />
                    <span style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px', color: '#6b7280' }}>
                      Current Solution Cost
                    </span>
                  </div>
                  <span style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '15px', color: '#1a1a1a' }}>
                    {analysis.willingness_to_pay.indicators.current_spend}
                  </span>
                </div>
              </div>
            </Card>

            {/* Feature Requests */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }}>
                  Feature Requests & Suggestions
                </h2>
                <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '12px' }}>
                  {analysis.feature_requests.length}
                </span>
              </div>
              <div className="space-y-3">
                {analysis.feature_requests.map((request: any, idx: number) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '15px', color: '#1a1a1a' }}>
                        {request.feature}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs ${getPriorityBadge(request.priority)}`} style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '11px' }}>
                        {request.priority} Priority
                      </span>
                    </div>
                    <p className="text-[#6b7280] mb-3" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                      {request.context}
                    </p>
                    {request.supporting_quote && (
                      <div className="bg-white border-l-4 border-blue-500 rounded p-3 mb-3">
                        <p className="text-[#6b7280] italic" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                          "{request.supporting_quote}"
                        </p>
                      </div>
                    )}
                    <Button size="sm" variant="outline" className="text-teal-600 border-teal-200 hover:bg-teal-50">
                      <Target className="w-3 h-3 mr-2" />
                      Add to Roadmap
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Competitive Intelligence */}
            <Card className="p-6">
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }} className="mb-5">
                Competitive Mentions
              </h2>
              {analysis.competitive_mentions.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <span className="text-4xl mb-2 block">🤷</span>
                  <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    No competitors mentioned in this interview.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {analysis.competitive_mentions.map((mention: any, idx: number) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <h3 style={{ fontFamily: 'Open Sans', fontWeight: 700, fontSize: '16px', color: '#1a1a1a' }} className="mb-2">
                        {mention.competitor}
                      </h3>
                      <p className="text-[#374151] mb-3" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                        {mention.context}
                      </p>
                      <div className="flex gap-2 mb-3 flex-wrap">
                        <span className={`px-2 py-1 rounded text-xs ${getSentimentTag(mention.sentiment)}`} style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                          {mention.sentiment}
                        </span>
                        {mention.tags.map((tag: string, tagIdx: number) => (
                          <span key={tagIdx} className={`px-2 py-1 rounded text-xs ${getSentimentTag(tag)}`} style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                            {tag.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                      <div className="bg-gray-50 border-l-4 border-purple-500 rounded p-3">
                        <p className="text-[#6b7280] italic" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                          "{mention.quote}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Discovery Alignment */}
            <Card className="p-6">
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }}>
                Discovery Audit Alignment
              </h2>
              <p className="text-[#6b7280] mt-1 mb-5" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                How this interview aligns with your Discovery Audit findings
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className={`${analysis.discovery_alignment.icp_match_score > 7 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'} border rounded-lg p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-6 h-6 text-teal-600" />
                    <span style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px', color: '#6b7280' }}>
                      ICP Match Score
                    </span>
                  </div>
                  <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px', color: '#1a1a1a' }} className="mb-1">
                    {analysis.discovery_alignment.icp_match_score}/10
                  </div>
                  <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                    Matches {analysis.discovery_alignment.matched_icp_attributes} of {analysis.discovery_alignment.total_icp_attributes} ICP attributes
                  </p>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-6 h-6 text-teal-600" />
                    <span style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px', color: '#6b7280' }}>
                      Query Theme Coverage
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {analysis.discovery_alignment.query_themes_covered.map((theme: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-xs" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                    <span style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px', color: '#6b7280' }}>
                      Pain Points Validated
                    </span>
                  </div>
                  <p style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px', color: '#1a1a1a' }}>
                    {analysis.discovery_alignment.pain_points_validated} of {analysis.discovery_alignment.total_pain_points_in_discovery} pain points validated
                  </p>
                  <div className="h-2 bg-orange-100 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(analysis.discovery_alignment.pain_points_validated / analysis.discovery_alignment.total_pain_points_in_discovery) * 100}%` }} />
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">✅</span>
                    <span style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px', color: '#6b7280' }}>
                      Value Propositions Mentioned
                    </span>
                  </div>
                  <div className="space-y-1 mt-2">
                    {analysis.discovery_alignment.value_props_mentioned.map((prop: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span className="text-[#374151]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                          {prop}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'transcript' && (
          <Card className="p-6">
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }}>
              Interview Transcript
            </h2>
            <div className="flex items-center gap-4 text-[#6b7280] mt-4 mb-4" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
              <span style={{ fontWeight: 500 }}>
                {interview.transcript_filename}
              </span>
              <span>•</span>
              <span>{interview.transcript_file_size}</span>
              <span>•</span>
              <span>Uploaded {formatDate(interview.created_at)}</span>
              <button
                onClick={handleDownload}
                className="ml-auto text-teal-600 hover:text-teal-700 hover:underline"
              >
                Download Original
              </button>
            </div>
            <div className="h-px bg-gray-200 mb-4" />
            <div className="mb-4">
              <div className="relative">
                <Input
                  placeholder="Search transcript..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Copy className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-50 rounded-lg p-6 max-h-[600px] overflow-y-auto" style={{ fontFamily: 'Monaco, Courier New, monospace', fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                {interview.transcript_text}
              </div>
              <button
                onClick={() => copyToClipboard(interview.transcript_text)}
                className="absolute top-4 right-4 p-2 bg-white border border-gray-200 rounded hover:bg-gray-50"
                title="Copy transcript"
              >
                <Copy className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </Card>
        )}

        {activeTab === 'details' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }} className="mb-5">
                Interview Details
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'Interview ID', value: interview.id, mono: true },
                  { label: 'Interviewee Name', value: interview.interviewee_name || 'Anonymous' },
                  { label: 'Email Address', value: interview.interviewee_email || 'Not provided', link: interview.interviewee_email ? `mailto:${interview.interviewee_email}` : null },
                  { label: 'Customer Segment', value: interview.interviewee_segment, badge: true },
                  { label: 'Interview Date', value: formatDate(interview.interview_date) },
                  { label: 'Uploaded By', value: interview.uploaded_by ? `${interview.uploaded_by.name} (${interview.uploaded_by.email})` : 'Unknown' },
                  { label: 'Upload Date & Time', value: formatDateTime(interview.created_at) },
                  { label: 'Analysis Status', value: interview.analysis_status, statusBadge: true },
                  ...(interview.analysis_duration_seconds ? [{ label: 'Analysis Duration', value: `${Math.floor(interview.analysis_duration_seconds / 60)} minutes ${interview.analysis_duration_seconds % 60} seconds` }] : []),
                  { label: 'Original File', value: `${interview.transcript_filename} (${interview.transcript_file_size})`, download: true }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                      {item.label}
                    </span>
                    <span className={`${item.mono ? 'font-mono' : ''}`} style={{ fontFamily: item.mono ? 'monospace' : 'Open Sans', fontSize: '14px', color: '#1a1a1a' }}>
                      {item.badge ? (
                        <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '12px' }}>
                          {item.value}
                        </span>
                      ) : item.statusBadge ? (
                        <span className={`inline-flex px-3 py-1 rounded-full ${
                          item.value === 'analyzed' ? 'bg-green-50 text-green-700' :
                          item.value === 'processing' ? 'bg-blue-50 text-blue-700' :
                          item.value === 'failed' ? 'bg-red-50 text-red-700' :
                          'bg-yellow-50 text-yellow-700'
                        }`} style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '12px' }}>
                          {item.value}
                        </span>
                      ) : item.link ? (
                        <a href={item.link} className="text-teal-600 hover:underline">{item.value}</a>
                      ) : item.download ? (
                        <button onClick={handleDownload} className="text-teal-600 hover:underline">
                          {item.value}
                        </button>
                      ) : (
                        item.value
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <div className="h-px bg-gray-200" />

            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', color: '#1a1a1a' }}>
                  Internal Notes
                </h3>
                <Button size="sm" variant="outline" onClick={() => setNotesModalOpen(true)} className="text-teal-600">
                  {interview.notes ? 'Edit Notes' : 'Add Notes'}
                </Button>
              </div>
              {interview.notes ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#1a1a1a', lineHeight: '1.6' }}>
                    {interview.notes}
                  </p>
                </div>
              ) : (
                <p className="text-[#6b7280] italic" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  No notes added
                </p>
              )}
            </Card>

            <div className="h-px bg-gray-200" />

            <Card className="p-6 bg-red-50 border-red-200">
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }} className="text-red-700 mb-2">
                Danger Zone
              </h3>
              <p className="text-[#6b7280] mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Delete this interview and all associated analysis data. This action cannot be undone.
              </p>
              <Button
                onClick={() => setDeleteModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Interview
              </Button>
            </Card>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent className="max-w-[480px]">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <DialogTitle className="text-center mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}>
                Delete Interview?
              </DialogTitle>
              <DialogDescription className="text-center" style={{ fontFamily: 'Open Sans', fontSize: '15px', lineHeight: '1.6', color: '#6b7280' }}>
                This will permanently delete the interview with {interview.interviewee_name || 'this person'} and all associated analysis data. This action cannot be undone.
              </DialogDescription>
            </div>
            <DialogFooter className="flex justify-center gap-3 mt-6">
              <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete Interview
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Notes Edit Modal */}
        <Dialog open={notesModalOpen} onOpenChange={setNotesModalOpen}>
          <DialogContent className="max-w-[600px]">
            <DialogHeader>
              <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}>
                Edit Internal Notes
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                Notes
              </Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any relevant context or follow-up actions..."
                className="mt-2"
                rows={6}
                maxLength={2000}
              />
              <p className="text-xs text-gray-400 text-right mt-1">{notes.length}/2000</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNotesModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSaveNotes}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                Save Notes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
