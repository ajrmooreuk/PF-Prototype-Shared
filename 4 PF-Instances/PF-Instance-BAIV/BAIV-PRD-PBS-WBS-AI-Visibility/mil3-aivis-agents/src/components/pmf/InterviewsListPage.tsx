import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
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
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';
import { 
  Search, Upload, Video, Eye, Download, Trash2, 
  ChevronLeft, ChevronRight, RefreshCw, X, FileText,
  AlertCircle
} from 'lucide-react';
import { callEccoAPI } from '../../lib/eccoAPI';

interface Interview {
  id: string;
  interviewee_name: string | null;
  interviewee_email: string | null;
  interviewee_segment: string;
  interview_date: string;
  analysis_status: 'analyzed' | 'pending' | 'processing' | 'failed';
  sentiment_score: number | null;
  key_insights_count: number;
  created_at: string;
}

interface Stats {
  total_interviews: number;
  analyzed_count: number;
  pending_count: number;
  failed_count: number;
  average_sentiment: number;
}

export function InterviewsListPage({ onNavigate }: InterviewsListPageProps) {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [segments, setSegments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [segmentFilter, setSegmentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('interview_date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  // Modals
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedInterviewId, setSelectedInterviewId] = useState<string | null>(null);
  
  // Upload form
  const [intervieweeName, setIntervieweeName] = useState('');
  const [intervieweeEmail, setIntervieweeEmail] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('');
  const [interviewDate, setInterviewDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    loadInterviews();
    loadSegments();
  }, [statusFilter, segmentFilter, searchQuery, sortBy, sortOrder, currentPage, pageSize]);

  const loadInterviews = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: pageSize.toString(),
        sort_by: sortBy,
        sort_order: sortOrder
      });
      
      if (statusFilter !== 'all') queryParams.append('status', statusFilter);
      if (segmentFilter !== 'all') queryParams.append('segment', segmentFilter);
      if (searchQuery) queryParams.append('search', searchQuery);
      
      const response = await callEccoAPI(`/api/pmf/interviews?${queryParams.toString()}`, 'GET');
      
      setInterviews(response.interviews || []);
      setStats(response.stats);
      setTotalResults(response.total || 0);
      setTotalPages(response.total_pages || 0);
      if (response.available_segments) {
        setSegments(response.available_segments);
      }
    } catch (error) {
      console.error('Failed to load interviews:', error);
      toast.error('Failed to load interviews');
    } finally {
      setLoading(false);
    }
  };

  const loadSegments = async () => {
    try {
      const response = await callEccoAPI('/api/pmf/segments', 'GET');
      if (response.segments) {
        setSegments(response.segments);
      }
    } catch (error) {
      console.error('Failed to load segments:', error);
    }
  };

  const handleUpload = async () => {
    if (!selectedSegment || !selectedFile) {
      toast.error('Please fill in all required fields');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      if (intervieweeName) formData.append('interviewee_name', intervieweeName);
      if (intervieweeEmail) formData.append('interviewee_email', intervieweeEmail);
      formData.append('interviewee_segment', selectedSegment);
      formData.append('interview_date', interviewDate);
      if (notes) formData.append('notes', notes);
      formData.append('transcript_file', selectedFile);

      const response = await callEccoAPI('/api/pmf/interviews/upload', 'POST', {
        interviewee_name: intervieweeName || null,
        interviewee_email: intervieweeEmail || null,
        interviewee_segment: selectedSegment,
        interview_date: interviewDate,
        notes: notes || null
      });

      toast.success('Interview uploaded! Analysis in progress...');
      setUploadModalOpen(false);
      resetUploadForm();
      loadInterviews();
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedInterviewId) return;

    try {
      await callEccoAPI(`/api/pmf/interviews/${selectedInterviewId}`, 'DELETE');
      toast.success('Interview deleted successfully');
      setDeleteModalOpen(false);
      setSelectedInterviewId(null);
      loadInterviews();
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete interview');
    }
  };

  const handleDownload = async (interviewId: string) => {
    try {
      await callEccoAPI(`/api/pmf/interviews/${interviewId}/download`, 'GET');
      toast.success('Transcript downloaded');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download transcript');
    }
  };

  const handleRetryAnalysis = async (interviewId: string) => {
    try {
      await callEccoAPI(`/api/pmf/interviews/${interviewId}/retry-analysis`, 'POST');
      toast.info('Analysis restarted. This may take 2-3 minutes.');
      loadInterviews();
    } catch (error) {
      console.error('Retry failed:', error);
      toast.error('Failed to restart analysis');
    }
  };

  const resetUploadForm = () => {
    setIntervieweeName('');
    setIntervieweeEmail('');
    setSelectedSegment('');
    setInterviewDate(new Date().toISOString().split('T')[0]);
    setNotes('');
    setSelectedFile(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['.txt', '.doc', '.docx', '.pdf'];
    const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!validTypes.includes(fileExt)) {
      toast.error('Only .txt, .doc, .docx, and .pdf files are supported');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be under 10MB');
      return;
    }

    setSelectedFile(file);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getSentimentEmoji = (score: number | null) => {
    if (score === null) return '—';
    if (score >= 8) return '😊';
    if (score >= 6) return '🙂';
    if (score >= 4) return '😐';
    return '😟';
  };

  const getSentimentColor = (score: number | null) => {
    if (score === null) return 'text-gray-400';
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-blue-600';
    if (score >= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const clearFilters = () => {
    setStatusFilter('all');
    setSegmentFilter('all');
    setSearchQuery('');
  };

  const hasActiveFilters = statusFilter !== 'all' || segmentFilter !== 'all' || searchQuery !== '';

  return (
    <div className="min-h-screen bg-[#f5f7fa] p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', color: '#1a1a1a' }}>
              Customer Interviews
            </h1>
            <p className="text-[#6b7280] mt-2" style={{ fontFamily: 'Open Sans', fontSize: '15px', lineHeight: '1.6' }}>
              Upload and analyze customer interview transcripts to extract insights about product-market fit.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="bg-white border border-gray-200 hover:bg-gray-50"
              style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '15px' }}
            >
              <Video className="w-4 h-4 mr-2" />
              Import from Meetings
            </Button>
            <Button
              onClick={() => setUploadModalOpen(true)}
              className="bg-[#019587] hover:bg-[#017770] text-white"
              style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '15px' }}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Interview
            </Button>
          </div>
        </div>

        <div className="h-px bg-gray-200 my-6" />

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className="p-5">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                  Total Interviews
                </span>
                <span className="text-xl">📊</span>
              </div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', color: '#1a1a1a' }}>
                {stats.total_interviews}
              </div>
              <div className="text-green-600 mt-2" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                ↑ +3 this month
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                  Analyzed
                </span>
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">✅</span>
                </div>
              </div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', color: '#1a1a1a' }}>
                {stats.analyzed_count}
              </div>
              <div className="text-[#6b7280] mt-2" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                {Math.round((stats.analyzed_count / stats.total_interviews) * 100)}% of total
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                  Pending Analysis
                </span>
                <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">⏳</span>
                </div>
              </div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', color: '#1a1a1a' }}>
                {stats.pending_count}
              </div>
              <div className="text-[#6b7280] mt-2" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                Awaiting AI processing
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                  Avg Sentiment
                </span>
                <span className="text-xl">{getSentimentEmoji(stats.average_sentiment)}</span>
              </div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', color: '#1a1a1a' }}>
                {stats.average_sentiment.toFixed(1)}/10
              </div>
              <div className="text-[#6b7280] mt-2" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                Based on analyzed interviews
              </div>
            </Card>
          </div>
        )}

        {/* Filters & Search */}
        <Card className="p-5 mb-6">
          <div className="flex justify-between items-end">
            <div className="flex gap-4">
              <div className="w-[180px]">
                <Label className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
                  Status
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="analyzed">Analyzed</SelectItem>
                    <SelectItem value="pending">Pending Analysis</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-[200px]">
                <Label className="text-sm mb-2 block" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
                  Segment
                </Label>
                <Select value={segmentFilter} onValueChange={setSegmentFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Segments</SelectItem>
                    {segments.map(segment => (
                      <SelectItem key={segment} value={segment}>{segment}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="w-[320px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <div className="flex gap-2">
                {statusFilter !== 'all' && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">
                    Status: {statusFilter}
                    <button onClick={() => setStatusFilter('all')} className="hover:text-teal-900">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {segmentFilter !== 'all' && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">
                    Segment: {segmentFilter}
                    <button onClick={() => setSegmentFilter('all')} className="hover:text-teal-900">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {searchQuery && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-teal-900">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="text-teal-600 hover:text-teal-700 hover:underline text-sm"
                style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
              >
                Clear All
              </button>
            </div>
          )}
        </Card>

        {/* Interviews Table */}
        <Card className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
          ) : interviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">{hasActiveFilters ? '🔍' : '🎙️'}</div>
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '24px', color: '#1a1a1a' }}>
                {hasActiveFilters ? 'No Interviews Match Your Filters' : 'No Interviews Yet'}
              </h3>
              <p className="text-[#6b7280] mt-3 max-w-md mx-auto" style={{ fontFamily: 'Open Sans', fontSize: '15px', lineHeight: '1.6' }}>
                {hasActiveFilters 
                  ? 'Try adjusting your filters or search criteria.'
                  : 'Upload customer interview transcripts to extract PMF insights and identify pain points, feature requests, and willingness to pay indicators.'
                }
              </p>
              <Button
                onClick={hasActiveFilters ? clearFilters : () => setUploadModalOpen(true)}
                className="mt-6 bg-teal-600 hover:bg-teal-700 text-white"
                style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}
              >
                {hasActiveFilters ? 'Clear All Filters' : 'Upload Your First Interview'}
              </Button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th 
                        className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort('interviewee_name')}
                        style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}
                      >
                        INTERVIEWEE {sortBy === 'interviewee_name' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="text-left py-3 px-4" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        SEGMENT
                      </th>
                      <th 
                        className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort('interview_date')}
                        style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}
                      >
                        INTERVIEW DATE {sortBy === 'interview_date' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th 
                        className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort('analysis_status')}
                        style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}
                      >
                        ANALYSIS STATUS {sortBy === 'analysis_status' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th 
                        className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort('sentiment_score')}
                        style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}
                      >
                        SENTIMENT {sortBy === 'sentiment_score' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="text-left py-3 px-4" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        KEY INSIGHTS
                      </th>
                      <th className="text-right py-3 px-4" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {interviews.map((interview) => (
                      <tr 
                        key={interview.id} 
                        className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                        onClick={() => onNavigate('interview-details', interview.id)}
                      >
                        <td className="py-4 px-4">
                          <div style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '15px', color: '#1a1a1a' }}>
                            {interview.interviewee_name || <span className="italic text-gray-400">Anonymous</span>}
                          </div>
                          {interview.interviewee_email && (
                            <div className="text-[#6b7280] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                              {interview.interviewee_email}
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '12px' }}>
                            {interview.interviewee_segment}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#374151' }}>
                            {formatDate(interview.interview_date)}
                          </div>
                          <div className="text-[#9ca3af] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                            {getTimeAgo(interview.created_at)}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {interview.analysis_status === 'analyzed' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '12px' }}>
                              ✅ Analyzed
                            </span>
                          )}
                          {interview.analysis_status === 'pending' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-50 text-orange-600 rounded-full" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '12px' }}>
                              ⏳ Pending
                            </span>
                          )}
                          {interview.analysis_status === 'processing' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '12px' }}>
                              ⚙️ Processing...
                            </span>
                          )}
                          {interview.analysis_status === 'failed' && (
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded-full" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '12px' }}>
                                ❌ Failed
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRetryAnalysis(interview.id);
                                }}
                                className="text-teal-600 hover:text-teal-700"
                                title="Retry analysis"
                              >
                                <RefreshCw className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          {interview.sentiment_score !== null ? (
                            <div className="flex items-center gap-2">
                              <span className={getSentimentColor(interview.sentiment_score)} style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '15px' }}>
                                {interview.sentiment_score.toFixed(1)}/10
                              </span>
                              <span className="text-xl">{getSentimentEmoji(interview.sentiment_score)}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          {interview.key_insights_count > 0 ? (
                            <div className="flex items-center gap-1 text-teal-600" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
                              💡 {interview.key_insights_count}
                            </div>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onNavigate('interview-details', interview.id);
                              }}
                              className="p-2 text-gray-400 hover:text-teal-600"
                              title="View Analysis"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownload(interview.id);
                              }}
                              className="p-2 text-gray-400 hover:text-teal-600"
                              title="Download Transcript"
                            >
                              <Download className="w-5 h-5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedInterviewId(interview.id);
                                setDeleteModalOpen(true);
                              }}
                              className="p-2 text-gray-400 hover:text-red-600"
                              title="Delete Interview"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                <div className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  Showing {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, totalResults)} of {totalResults} interviews
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  {Array.from({ length: Math.min(7, totalPages) }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? 'bg-teal-600 text-white hover:bg-teal-700' : ''}
                    >
                      {page}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Show</span>
                  <Select value={pageSize.toString()} onValueChange={(val) => setPageSize(parseInt(val))}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>per page</span>
                </div>
              </div>
            </>
          )}
        </Card>

        {/* Upload Interview Modal */}
        <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
          <DialogContent className="max-w-[600px]">
            <DialogHeader>
              <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '24px' }}>
                Upload Customer Interview
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div>
                <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Interviewee Name <span className="text-gray-400">(Optional)</span>
                </Label>
                <p className="text-xs text-gray-500 mt-1">Leave blank for anonymous</p>
                <Input
                  value={intervieweeName}
                  onChange={(e) => setIntervieweeName(e.target.value)}
                  placeholder="e.g., Sarah Johnson"
                  className="mt-2"
                />
              </div>

              <div>
                <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Email Address <span className="text-gray-400">(Optional)</span>
                </Label>
                <p className="text-xs text-gray-500 mt-1">For future reference</p>
                <Input
                  type="email"
                  value={intervieweeEmail}
                  onChange={(e) => setIntervieweeEmail(e.target.value)}
                  placeholder="sarah@company.com"
                  className="mt-2"
                />
              </div>

              <div>
                <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Customer Segment <span className="text-red-500">*</span>
                </Label>
                <p className="text-xs text-gray-500 mt-1">Which customer segment does this person represent?</p>
                <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select segment" />
                  </SelectTrigger>
                  <SelectContent>
                    {segments.map(segment => (
                      <SelectItem key={segment} value={segment}>{segment}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Interview Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="mt-2"
                />
              </div>

              <div>
                <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Interview Transcript <span className="text-red-500">*</span>
                </Label>
                {!selectedFile ? (
                  <label className="mt-2 flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-teal-500 bg-gray-50">
                    <input
                      type="file"
                      accept=".txt,.doc,.docx,.pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <FileText className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '15px' }}>
                      Drop transcript file here or click to browse
                    </p>
                    <p className="text-[#9ca3af] mt-2" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                      Supports: .txt, .doc, .docx, .pdf (Max 10MB)
                    </p>
                  </label>
                ) : (
                  <div className="mt-2 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-teal-600" />
                      <div>
                        <p style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                          {selectedFile.name}
                        </p>
                        <p className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <Label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Internal Notes <span className="text-gray-400">(Optional)</span>
                </Label>
                <p className="text-xs text-gray-500 mt-1">Any context or observations</p>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any relevant context about this interview..."
                  className="mt-2"
                  maxLength={2000}
                  rows={4}
                />
                <p className="text-xs text-gray-400 text-right mt-1">{notes.length}/2000</p>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setUploadModalOpen(false);
                  resetUploadForm();
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!selectedSegment || !selectedFile || uploading}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                {uploading ? 'Uploading...' : 'Upload & Analyze'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
                This will permanently delete this interview and all associated analysis data. This action cannot be undone.
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
      </div>
    </div>
  );
}