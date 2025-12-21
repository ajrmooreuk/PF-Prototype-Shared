import React, { useState, useEffect } from 'react';
import { Plus, TrendingUp, Mail, Calendar, CheckCircle, Podcast, Users, Sparkles, Target, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { CreateCampaignModal } from './CreateCampaignModal';
import { callEccoAPI } from '../../lib/eccoAPI';
import { toast } from 'sonner@2.0.3';

interface OverviewStats {
  total_podcasts_found: number;
  outreach_sent: number;
  responses_received: number;
  bookings_scheduled: number;
  episodes_published: number;
  by_status: {
    not_contacted: number;
    contacted: number;
    responded: number;
    scheduled: number;
    completed: number;
  };
  avg_relevance_score: number;
  avg_icp_alignment: number;
}

interface Activity {
  id: string;
  type: 'outreach_sent' | 'response_received' | 'booking_confirmed' | 'episode_published';
  show_title: string;
  timestamp: string;
  details: string;
}

interface Booking {
  id: string;
  show_title: string;
  host_name: string;
  scheduled_date: string;
  status: 'confirmed' | 'prep_in_progress' | 'ready_to_record';
  days_until: number;
}

export function PodcastOverviewPage() {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCampaignModal, setShowCampaignModal] = useState(false);

  useEffect(() => {
    loadPageData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadPageData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadPageData = async () => {
    try {
      setError(null);
      
      // Load all data in parallel
      const [statsData, activityData, bookingsData] = await Promise.all([
        callEccoAPI('/api/podcasts/overview/stats'),
        callEccoAPI('/api/podcasts/overview/recent-activity?limit=10'),
        callEccoAPI('/api/podcasts/overview/upcoming-interviews?limit=5')
      ]);

      setStats(statsData);
      setActivities(activityData.activities || []);
      setBookings(bookingsData.bookings || []);
    } catch (err) {
      console.error('Failed to load overview data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp: string): string => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffMs = now.getTime() - activityTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return activityTime.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatScheduledDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getActivityConfig = (type: Activity['type']) => {
    const configs = {
      outreach_sent: {
        icon: <Mail className="h-5 w-5" />,
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.1)',
        label: 'Outreach sent to'
      },
      response_received: {
        icon: <span className="text-xl">💬</span>,
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.1)',
        label: 'Response from'
      },
      booking_confirmed: {
        icon: <Calendar className="h-5 w-5" />,
        color: '#e84e1c',
        bgColor: 'rgba(232, 78, 28, 0.1)',
        label: 'Booking confirmed with'
      },
      episode_published: {
        icon: <CheckCircle className="h-5 w-5" />,
        color: '#10b981',
        bgColor: 'rgba(16, 185, 129, 0.1)',
        label: 'Episode published on'
      }
    };
    return configs[type];
  };

  const getStatusConfig = (status: Booking['status']) => {
    const configs = {
      confirmed: {
        label: 'Confirmed',
        color: '#10b981',
        bgColor: 'rgba(16, 185, 129, 0.1)'
      },
      prep_in_progress: {
        label: 'Prep In Progress',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.1)'
      },
      ready_to_record: {
        label: 'Ready to Record',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.1)'
      }
    };
    return configs[status];
  };

  const calculateConversionRate = (numerator: number, denominator: number): string => {
    if (denominator === 0) return '0%';
    return Math.round((numerator / denominator) * 100) + '%';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f3f4f6]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#02a4bf]" />
          <p className="text-gray-600" style={{ fontFamily: 'Open Sans' }}>Loading overview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription style={{ fontFamily: 'Open Sans' }}>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Breadcrumb */}
          <div className="mb-3" style={{ fontFamily: 'Open Sans' }}>
            <span className="text-[#6B7280] text-sm">Dashboard &gt; Podcasts &gt; Overview</span>
          </div>

          {/* Title Row */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-[32px] text-black mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                Podcast Outreach Overview
              </h1>
              <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans' }}>
                Track your podcast guest appearance pipeline
              </p>
            </div>
            <Button
              onClick={() => setShowCampaignModal(true)}
              className="bg-[#02a4bf] hover:bg-[#018a9f] text-white h-11 px-6"
              style={{ fontFamily: 'Poppins', fontWeight: 500 }}
            >
              <Plus className="h-5 w-5 mr-2" />
              New Campaign
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-5 mb-8">
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-[#E6F7F9] flex items-center justify-center flex-shrink-0">
                <Podcast className="h-6 w-6 text-[#02a4bf]" />
              </div>
            </div>
            <div className="text-black mb-1" style={{ fontSize: '36px', fontFamily: 'Poppins', fontWeight: 700, lineHeight: '1' }}>
              {stats.total_podcasts_found}
            </div>
            <div className="text-gray-600 mb-3" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Podcasts Found</div>
            <div className="text-sm text-green-600" style={{ fontFamily: 'Open Sans' }}>
              +12 this month
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="text-black mb-1" style={{ fontSize: '36px', fontFamily: 'Poppins', fontWeight: 700, lineHeight: '1' }}>
              {stats.outreach_sent}
            </div>
            <div className="text-gray-600 mb-3" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Outreach Sent</div>
            <div className="text-sm text-[#e84e1c]" style={{ fontFamily: 'Open Sans' }}>
              {stats.outreach_sent - stats.responses_received} pending reply
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="text-black mb-1" style={{ fontSize: '36px', fontFamily: 'Poppins', fontWeight: 700, lineHeight: '1' }}>
              {stats.bookings_scheduled}
            </div>
            <div className="text-gray-600 mb-3" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Bookings Scheduled</div>
            <div className="text-sm text-green-600" style={{ fontFamily: 'Open Sans' }}>2 this week</div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="text-black mb-1" style={{ fontSize: '36px', fontFamily: 'Poppins', fontWeight: 700, lineHeight: '1' }}>
              {stats.episodes_published}
            </div>
            <div className="text-gray-600 mb-3" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Episodes Published</div>
            <div className="text-sm text-[#02a4bf]" style={{ fontFamily: 'Open Sans' }}>✓ 94% verified</div>
          </Card>
        </div>

        {/* Pipeline Funnel */}
        <div className="mb-8">
          <h2 className="text-black text-xl mb-4" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>Outreach Pipeline</h2>
          <Card className="p-8 bg-white">
            <div className="flex items-center justify-between">
              {/* Not Contacted */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                  <span className="text-gray-700" style={{ fontSize: '24px' }}>{stats.by_status.not_contacted}</span>
                </div>
                <div className="text-sm text-gray-600">Not Contacted</div>
              </div>

              <div className="flex-1 h-0.5 bg-gray-300 mx-4 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs text-gray-500">
                  {calculateConversionRate(stats.by_status.contacted, stats.total_podcasts_found)} contacted
                </div>
              </div>

              {/* Contacted */}
              <div className="flex flex-col items-center">
                <div className="w-[70px] h-[70px] rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <span className="text-blue-700" style={{ fontSize: '24px' }}>{stats.by_status.contacted}</span>
                </div>
                <div className="text-sm text-gray-600">Contacted</div>
              </div>

              <div className="flex-1 h-0.5 bg-gray-300 mx-4 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs text-gray-500">
                  {calculateConversionRate(stats.by_status.responded, stats.by_status.contacted)} response
                </div>
              </div>

              {/* Responded */}
              <div className="flex flex-col items-center">
                <div className="w-[60px] h-[60px] rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <span className="text-purple-700" style={{ fontSize: '24px' }}>{stats.by_status.responded}</span>
                </div>
                <div className="text-sm text-gray-600">Responded</div>
              </div>

              <div className="flex-1 h-0.5 bg-gray-300 mx-4 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs text-gray-500">
                  {calculateConversionRate(stats.by_status.scheduled, stats.by_status.responded)} booked
                </div>
              </div>

              {/* Scheduled */}
              <div className="flex flex-col items-center">
                <div className="w-[50px] h-[50px] rounded-full bg-orange-100 flex items-center justify-center mb-3">
                  <span className="text-orange-700" style={{ fontSize: '20px' }}>{stats.by_status.scheduled}</span>
                </div>
                <div className="text-sm text-gray-600">Scheduled</div>
              </div>

              <div className="flex-1 h-0.5 bg-gray-300 mx-4 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs text-gray-500">
                  {calculateConversionRate(stats.by_status.completed, stats.by_status.scheduled)} published
                </div>
              </div>

              {/* Completed */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <span className="text-green-700" style={{ fontSize: '18px' }}>{stats.by_status.completed}</span>
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Activity Feed and Upcoming Interviews */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Recent Activity - 2/3 width */}
          <div className="col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-black text-xl" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>Recent Activity</h2>
              <a href="/podcasts/overview/activity" className="text-sm text-[#02a4bf] hover:underline">
                View All
              </a>
            </div>
            <Card className="p-6 bg-white max-h-[500px] overflow-y-auto">
              {activities.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <div className="text-gray-600 mb-2" style={{ fontFamily: 'Open Sans' }}>No recent activity</div>
                  <div className="text-sm text-gray-500" style={{ fontFamily: 'Open Sans' }}>Activity will appear here as you engage with podcasts</div>
                </div>
              ) : (
                <div className="space-y-4">
                  {activities.map((activity) => {
                    const config = getActivityConfig(activity.type);
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#F0F9FA] cursor-pointer transition-colors"
                        onClick={() => window.location.href = `/podcasts/leads/${activity.id}`}
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: config.bgColor, color: config.color }}
                        >
                          {config.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-gray-900 mb-1" style={{ fontFamily: 'Open Sans' }}>
                            {config.label}{' '}
                            <a
                              href={`/podcasts/leads/${activity.id}`}
                              className="text-[#02a4bf] hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {activity.show_title}
                            </a>
                          </div>
                          <div className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Open Sans' }}>{activity.details}</div>
                          <div className="text-xs text-gray-400" style={{ fontFamily: 'Open Sans' }}>{formatTimestamp(activity.timestamp)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>

          {/* Upcoming Interviews - 1/3 width */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-black text-xl" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>Upcoming Interviews</h2>
              <a href="/podcasts/bookings" className="text-sm text-[#02a4bf] hover:underline">
                View All
              </a>
            </div>
            <Card className="p-6 bg-white">
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <div className="text-gray-600 mb-2" style={{ fontFamily: 'Open Sans' }}>No upcoming interviews</div>
                  <div className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'Open Sans' }}>Book your first podcast appearance to see it here</div>
                  <Button className="bg-[#02a4bf] hover:bg-[#018a9f] text-white" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                    Browse Leads
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => {
                    const statusConfig = getStatusConfig(booking.status);
                    return (
                      <div
                        key={booking.id}
                        className="relative p-5 rounded-xl bg-[#F0F9FA] border border-[#02a4bf] hover:scale-[1.02] transition-transform cursor-pointer"
                        onClick={() => window.location.href = `/podcasts/bookings/${booking.id}`}
                      >
                        <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-[#e84e1c] text-white text-xs">
                          {booking.days_until} days
                        </div>
                        <h3 className="text-[#005260] mb-2 pr-16">{booking.show_title}</h3>
                        <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          with {booking.host_name}
                        </div>
                        <div className="text-sm text-gray-900 mb-3 flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatScheduledDate(booking.scheduled_date)}
                        </div>
                        <div className="flex items-center justify-between">
                          <span
                            className="px-3 py-1 rounded-full text-xs"
                            style={{ backgroundColor: statusConfig.bgColor, color: statusConfig.color }}
                          >
                            {statusConfig.label}
                          </span>
                          <a
                            href={`/podcasts/bookings/${booking.id}`}
                            className="text-sm text-[#02a4bf] hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Details
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-black text-xl" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>Quick Actions</h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <Card className="p-6 bg-white">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#02a4bf] flex items-center justify-center flex-shrink-0">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-black mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>Start New Campaign</h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Search for podcasts and begin outreach
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Define target criteria</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>AI-powered discovery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Relevance scoring</span>
                </div>
              </div>
              <Button
                onClick={() => setShowCampaignModal(true)}
                className="w-full bg-[#02a4bf] hover:bg-[#018a9f] text-white"
                style={{ fontFamily: 'Poppins', fontWeight: 500 }}
              >
                Start Campaign
              </Button>
            </Card>

            <Card className="p-6 bg-white">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-black mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>Browse Podcast Leads</h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                View discovered podcasts and manage pipeline
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>View all leads</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Filter by status</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Track engagement</span>
                </div>
              </div>
              <Button
                onClick={() => window.location.href = '/podcasts/leads'}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                style={{ fontFamily: 'Poppins', fontWeight: 500 }}
              >
                View Leads
              </Button>
            </Card>

            <Card className="p-6 bg-white">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#3b82f6] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-black mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>Generate AI Pitch</h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Create AI-powered outreach emails
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Personalized pitches</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Auto follow-ups</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Response tracking</span>
                </div>
              </div>
              <Button
                onClick={() => window.location.href = '/podcasts/outreach'}
                className="w-full bg-[#3b82f6] hover:bg-blue-700 text-white"
                style={{ fontFamily: 'Poppins', fontWeight: 500 }}
              >
                Create Pitch
              </Button>
            </Card>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="mb-8">
          <h2 className="text-black text-xl mb-4" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>Performance Insights</h2>
          <Card className="p-8 bg-white">
            <div className="grid grid-cols-2 gap-8">
              {/* Relevance Score */}
              <div className="text-center">
                <h3 className="text-gray-900 mb-6" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Average Relevance Score</h3>
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#02a4bf"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(stats.avg_relevance_score / 10) * 352} 352`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute">
                    <span className="text-[#005260]" style={{ fontSize: '28px' }}>
                      {stats.avg_relevance_score.toFixed(1)}/10
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4" style={{ fontFamily: 'Open Sans' }}>Podcasts align well with your ICP</p>
              </div>

              {/* ICP Alignment */}
              <div className="text-center">
                <h3 className="text-gray-900 mb-6" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Average ICP Alignment</h3>
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#8b5cf6"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(stats.avg_icp_alignment / 100) * 352} 352`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute">
                    <span className="text-purple-600" style={{ fontSize: '28px' }}>
                      {stats.avg_icp_alignment.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4" style={{ fontFamily: 'Open Sans' }}>Strong audience fit across leads</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCampaignModal && (
        <CreateCampaignModal
          isOpen={showCampaignModal}
          onClose={() => setShowCampaignModal(false)}
          onSuccess={(campaignId) => {
            setShowCampaignModal(false);
            toast.success('✓ Campaign created successfully!');
            window.location.href = `/podcasts/campaigns/${campaignId}`;
          }}
        />
      )}
    </div>
  );
}
