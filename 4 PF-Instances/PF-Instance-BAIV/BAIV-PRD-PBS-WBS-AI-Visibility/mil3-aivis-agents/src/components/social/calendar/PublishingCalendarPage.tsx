import { useState, useEffect } from 'react';
import { RefreshCw, Calendar as CalendarIcon, List, ExternalLink, Plus } from 'lucide-react';
import { CalendarGrid } from './CalendarGrid';
import { ListView } from './ListView';
import { ConnectedPlatformsSidebar } from './ConnectedPlatformsSidebar';
import { MonthlyStatsSidebar } from './MonthlyStatsSidebar';
import { SchedulePostModal } from './SchedulePostModal';
import { PostDetailsModal } from './PostDetailsModal';
import { ConnectPlatformModal } from './ConnectPlatformModal';
import { Button } from '../../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { toast } from 'sonner';

export function PublishingCalendarPage() {
  const [viewMode, setViewMode] = useState<'month' | 'list' | 'postiz'>('month');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [posts, setPosts] = useState<any[]>([]);
  const [stats, setStats] = useState({
    scheduled: 12,
    published: 45,
    drafts: 3,
    by_platform: {
      linkedin: 20,
      twitter: 18,
      facebook: 14,
      instagram: 16,
    },
  });
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Modals
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [connectModalOpen, setConnectModalOpen] = useState(false);

  // Mock data
  const mockPosts = [
    {
      id: '1',
      content: 'Check out our new blog post on AI visibility strategies for 2025! 🚀 Link in bio.',
      platforms: ['linkedin', 'twitter'],
      scheduled_for: '2025-11-15T10:00:00Z',
      published_at: null,
      status: 'pending',
      postiz_post_id: 'post_abc123',
    },
    {
      id: '2',
      content: 'Join us for a webinar on content marketing best practices! 📅',
      platforms: ['facebook', 'instagram'],
      scheduled_for: '2025-11-18T14:00:00Z',
      published_at: null,
      status: 'pending',
      postiz_post_id: 'post_def456',
    },
    {
      id: '3',
      content: 'Happy Monday! Start your week with these productivity tips... 💡',
      platforms: ['linkedin'],
      scheduled_for: '2025-11-11T09:00:00Z',
      published_at: '2025-11-11T09:00:00Z',
      status: 'published',
      postiz_post_id: 'post_ghi789',
    },
  ];

  const mockConnections = [
    {
      id: '1',
      platform: 'linkedin',
      connection_name: "John's LinkedIn",
      status: 'connected',
      profile: {
        name: 'John Doe',
        username: 'johndoe',
        avatar: null,
      },
    },
    {
      id: '2',
      platform: 'linkedin',
      connection_name: 'Company Page',
      status: 'connected',
      profile: {
        name: 'Ecco AI',
        username: 'ecco-ai',
        avatar: null,
      },
    },
    {
      id: '3',
      platform: 'facebook',
      connection_name: 'Personal Facebook',
      status: 'connected',
      profile: {
        name: 'John Doe',
        username: 'john.doe.123',
        avatar: null,
      },
    },
  ];

  useEffect(() => {
    fetchCalendarData();
  }, [currentMonth, currentYear]);

  const fetchCalendarData = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPosts(mockPosts);
      setConnections(mockConnections);
      setLoading(false);
    }, 500);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchCalendarData();
      setRefreshing(false);
      toast.success('Calendar refreshed');
    }, 1000);
  };

  const handleMonthChange = (month: number, year: number) => {
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setScheduleModalOpen(true);
  };

  const handleSchedulePost = () => {
    setSelectedDate(undefined);
    setScheduleModalOpen(true);
  };

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    setDetailsModalOpen(true);
  };

  const handleScheduleSubmit = async (data: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPost = {
      id: Math.random().toString(),
      ...data,
      scheduled_for: data.schedule_time,
      status: 'pending',
      postiz_post_id: `post_${Math.random().toString(36).substr(2, 9)}`,
    };

    setPosts([...posts, newPost]);
    toast.success(`✓ Post scheduled for ${new Date(data.schedule_time).toLocaleString()}`);
  };

  const handleDeletePost = async (post: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setPosts(posts.filter(p => p.id !== post.id));
    toast.success('Post deleted');
  };

  const handleEditPost = (post: any) => {
    setSelectedPost(post);
    setDetailsModalOpen(false);
    setScheduleModalOpen(true);
  };

  const handleConnectPlatform = async (platform: string) => {
    // Simulate OAuth flow
    toast.success(`Redirecting to ${platform} OAuth...`);
    
    // In real implementation, this would open OAuth window
    setTimeout(() => {
      const newConnection = {
        id: Math.random().toString(),
        platform,
        connection_name: `My ${platform}`,
        status: 'connected',
        profile: {
          name: 'User Name',
          username: 'username',
          avatar: null,
        },
      };
      setConnections([...connections, newConnection]);
      toast.success(`✓ ${platform} connected successfully`);
      setConnectModalOpen(false);
    }, 2000);
  };

  const getLastUpdated = () => {
    return '2 minutes ago';
  };

  const connectedPlatformsList = [...new Set(connections.map(c => c.platform))];

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <div className="max-w-[1600px] mx-auto p-6">
        {/* Breadcrumb */}
        <div className="text-[#6B7280] mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Dashboard &gt; Social Media &gt; Publishing Calendar
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-[#231f20] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}>
              Publishing Calendar
            </h1>
            <p className="text-[#6B7280] mb-2" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
              Schedule and manage your social media posts
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[#9ca3af]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                Last updated: {getLastUpdated()}
              </span>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="text-[#0099b1] hover:text-[#007a8c] transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* View Mode Tabs */}
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
            <TabsList className="bg-white">
              <TabsTrigger
                value="month"
                className="data-[state=active]:bg-[#0099b1] data-[state=active]:text-white"
                style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                Month View
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="data-[state=active]:bg-[#0099b1] data-[state=active]:text-white"
                style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
              >
                <List className="w-4 h-4 mr-2" />
                List View
              </TabsTrigger>
              <TabsTrigger
                value="postiz"
                className="data-[state=active]:bg-[#0099b1] data-[state=active]:text-white"
                style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Postiz Calendar
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Schedule Post Button (for Month/List view) */}
        {viewMode !== 'postiz' && (
          <div className="flex justify-end mb-4">
            <Button
              onClick={handleSchedulePost}
              className="bg-[#0099b1] hover:bg-[#007a8c] text-white h-11"
              style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500 }}
            >
              <Plus className="w-5 h-5 mr-2" />
              Schedule Post
            </Button>
          </div>
        )}

        {/* Main Content */}
        {viewMode === 'postiz' ? (
          /* Postiz Iframe */
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 250px)' }}>
            <iframe
              src="https://social.eccoai.ai/calendar"
              className="w-full h-full border-0"
              title="Postiz Calendar"
            />
          </div>
        ) : (
          <div className="grid grid-cols-[1fr_350px] gap-6">
            {/* Left: Calendar/List */}
            <div>
              {loading ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0099b1] mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading calendar...</p>
                </div>
              ) : viewMode === 'month' ? (
                <CalendarGrid
                  currentMonth={currentMonth}
                  currentYear={currentYear}
                  posts={posts}
                  onDateClick={handleDateClick}
                  onPostClick={handlePostClick}
                  onMonthChange={handleMonthChange}
                />
              ) : (
                <ListView
                  posts={posts}
                  onViewDetails={handlePostClick}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                />
              )}
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-6">
              <ConnectedPlatformsSidebar
                connections={connections}
                onConnectPlatform={() => setConnectModalOpen(true)}
              />
              <MonthlyStatsSidebar stats={stats} />
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <SchedulePostModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        selectedDate={selectedDate}
        connectedPlatforms={connectedPlatformsList}
        onSchedule={handleScheduleSubmit}
      />

      <PostDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        post={selectedPost}
        onDelete={() => handleDeletePost(selectedPost)}
        onEdit={() => handleEditPost(selectedPost)}
      />

      <ConnectPlatformModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
        connectedPlatforms={connectedPlatformsList}
        onConnect={handleConnectPlatform}
      />
    </div>
  );
}
