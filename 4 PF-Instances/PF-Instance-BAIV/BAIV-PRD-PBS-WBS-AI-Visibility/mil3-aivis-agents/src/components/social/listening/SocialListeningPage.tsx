import { useState, useEffect } from 'react';
import { ChevronDown, RefreshCw, Search } from 'lucide-react';
import { StatsCards } from './StatsCards';
import { ResultCard } from './ResultCard';
import { DetailModal } from './DetailModal';
import { ScrapePlatformModal } from './ScrapePlatformModal';
import { FilterBar } from './FilterBar';
import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { toast } from 'sonner';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../ui/pagination';

export function SocialListeningPage() {
  const [stats, setStats] = useState({
    total_posts_scraped: 247,
    high_priority_opportunities: 34,
    engagement_alerts: 56,
    content_ideas: 191,
    by_platform: {
      reddit: 97,
      youtube: 85,
      bluesky: 65,
    },
    last_sync: new Date().toISOString(),
  });

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Filters
  const [activeTab, setActiveTab] = useState('all');
  const [timeRange, setTimeRange] = useState('7');
  const [priority, setPriority] = useState('all');
  const [actionType, setActionType] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modals
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [scrapePlatform, setScrapePlatform] = useState<'reddit' | 'youtube' | 'bluesky' | null>(null);
  const [scrapeModalOpen, setScrapeModalOpen] = useState(false);

  // Mock data for development
  const mockResults = [
    {
      id: '1',
      tenant_id: 'tenant-1',
      workflow_type: 'reddit_engagement_alert',
      source_platform: 'reddit',
      source_url: 'https://reddit.com/r/entrepreneur/comments/abc123',
      scraped_data: {
        title: 'How do I find my first customers as a startup?',
        body: "I've built an AI tool for content creators but struggling to get my first users. Any advice on cold outreach vs. content marketing?",
        subreddit: 'entrepreneur',
        score: 45,
        num_comments: 23,
        author: 'startup_founder_22',
      },
      processed_insights: {
        questions: [
          'What features matter most for first customers?',
          'How do I price my SaaS product?',
          'Should I focus on B2B or B2C?',
        ],
        pain_points: [
          'Struggling to get initial traction',
          'Uncertain about marketing channels',
          'Limited budget for paid ads',
        ],
        keywords: ['AI tools', 'startup', 'customer acquisition'],
        talking_points: [
          'Share your own customer acquisition story',
          'Recommend starting with one narrow niche',
          'Mention importance of founder-led sales',
        ],
        suggested_reply: "I've helped several startups with this exact challenge. The key is to start with founder-led sales in one narrow niche...",
      },
      content_gaps: [
        'Guide: Finding your first 10 customers without paid ads',
        'Case study: B2B SaaS pricing strategies',
        'Video: Low-cost marketing tactics for bootstrapped startups',
      ],
      priority_score: 85,
      relevance_score: 92,
      status: 'new',
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      time_ago: '2 hours ago',
    },
    {
      id: '2',
      tenant_id: 'tenant-1',
      workflow_type: 'bluesky_content_idea',
      source_platform: 'bluesky',
      source_url: 'https://bsky.app/profile/user/post/123',
      scraped_data: {
        title: 'The future of AI in content marketing is here',
        body: "Just discovered this amazing tool that generates entire content calendars using AI. The quality is insane! What AI tools are you using for content?",
        author: 'marketer_pro',
        like_count: 89,
        reply_count: 34,
      },
      processed_insights: {
        questions: [
          'What AI tools work best for content marketing?',
          'How do you maintain quality with AI content?',
        ],
        pain_points: [
          'Time-consuming content creation',
          'Maintaining consistency across platforms',
        ],
        keywords: ['AI', 'content marketing', 'automation'],
        talking_points: [
          'Discuss the balance between AI and human creativity',
          'Share best practices for AI content tools',
        ],
        suggested_reply: 'Consider creating a comprehensive guide on AI content marketing tools.',
      },
      content_gaps: [
        'Comparison: Top 10 AI content marketing tools',
        'Tutorial: How to build an AI-powered content calendar',
      ],
      priority_score: 72,
      relevance_score: 85,
      status: 'new',
      created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      time_ago: '5 hours ago',
    },
    {
      id: '3',
      tenant_id: 'tenant-1',
      workflow_type: 'youtube_engagement_alert',
      source_platform: 'youtube',
      source_url: 'https://youtube.com/watch?v=xyz789',
      scraped_data: {
        title: 'Why Most AI Startups Fail (And How to Avoid It)',
        body: "In this video, I break down the 5 biggest mistakes AI startups make and how to avoid them. Comment below with your biggest AI startup challenge!",
        channel_name: 'Tech Entrepreneur',
        view_count: 12500,
        comment_count: 156,
      },
      processed_insights: {
        questions: [
          'What are common pitfalls for AI startups?',
          'How do you validate an AI product idea?',
        ],
        pain_points: [
          'Unclear product-market fit',
          'Difficulty differentiating from competitors',
        ],
        keywords: ['AI startup', 'entrepreneurship', 'product validation'],
        talking_points: [
          'Share case studies of successful AI startups',
          'Discuss importance of early customer feedback',
        ],
        suggested_reply: 'Great insights! Consider engaging with comments about specific AI challenges.',
      },
      content_gaps: [
        'Article: AI Startup Validation Framework',
        'Video: Interview with successful AI founders',
      ],
      priority_score: 68,
      relevance_score: 78,
      status: 'new',
      created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      time_ago: '8 hours ago',
    },
    {
      id: '4',
      tenant_id: 'tenant-1',
      workflow_type: 'reddit_content_idea',
      source_platform: 'reddit',
      source_url: 'https://reddit.com/r/marketing/comments/def456',
      scraped_data: {
        title: 'Best practices for B2B SaaS content marketing in 2025',
        body: "Looking for modern strategies that actually work. SEO seems saturated, paid ads are expensive. What's working for you?",
        subreddit: 'marketing',
        score: 67,
        num_comments: 41,
        author: 'b2b_marketer',
      },
      processed_insights: {
        questions: [
          'What content strategies work for B2B SaaS?',
          'How to stand out in saturated markets?',
        ],
        pain_points: [
          'High customer acquisition costs',
          'Difficulty measuring content ROI',
        ],
        keywords: ['B2B SaaS', 'content marketing', 'SEO'],
        talking_points: [
          'Share unique distribution channels',
          'Discuss content repurposing strategies',
        ],
        suggested_reply: 'Consider creating a guide on modern B2B content distribution.',
      },
      content_gaps: [
        'Guide: Alternative B2B SaaS Marketing Channels',
        'Case study: How we reduced CAC by 40% with content',
      ],
      priority_score: 58,
      relevance_score: 71,
      status: 'new',
      created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      time_ago: '12 hours ago',
    },
  ];

  useEffect(() => {
    fetchResults();
  }, [activeTab, timeRange, priority, actionType, sortBy, currentPage]);

  const fetchResults = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      let filtered = [...mockResults];

      // Filter by platform
      if (activeTab !== 'all') {
        filtered = filtered.filter(r => r.source_platform === activeTab);
      }

      // Filter by priority
      if (priority === 'high') {
        filtered = filtered.filter(r => r.priority_score >= 70);
      } else if (priority === 'medium') {
        filtered = filtered.filter(r => r.priority_score >= 40 && r.priority_score < 70);
      } else if (priority === 'low') {
        filtered = filtered.filter(r => r.priority_score < 40);
      }

      // Filter by action type
      if (actionType === 'engage_now') {
        filtered = filtered.filter(r => r.workflow_type.includes('engagement_alert'));
      } else if (actionType === 'content_idea') {
        filtered = filtered.filter(r => r.workflow_type.includes('content_idea'));
      }

      // Sort
      if (sortBy === 'highest_priority') {
        filtered.sort((a, b) => b.priority_score - a.priority_score);
      } else if (sortBy === 'most_engagement') {
        filtered.sort((a, b) => {
          const aEng = a.scraped_data.score || a.scraped_data.like_count || a.scraped_data.view_count || 0;
          const bEng = b.scraped_data.score || b.scraped_data.like_count || b.scraped_data.view_count || 0;
          return bEng - aEng;
        });
      }

      setResults(filtered);
      setTotalPages(Math.ceil(filtered.length / 8));
      setLoading(false);
    }, 500);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      fetchResults();
      setRefreshing(false);
      toast.success('Data refreshed successfully');
    }, 1000);
  };

  const handleViewDetails = (result: any) => {
    setSelectedResult(result);
    setDetailModalOpen(true);
  };

  const handleMarkAsUsed = async (result: any) => {
    // Simulate API call
    toast.success('Marked as used');
    setResults(results.filter(r => r.id !== result.id));
  };

  const handleArchive = async (result: any) => {
    // Simulate API call
    toast.success('Archived successfully');
    setResults(results.filter(r => r.id !== result.id));
  };

  const handleEngageNow = (result: any) => {
    if (result.workflow_type.includes('engagement_alert')) {
      window.open(result.source_url, '_blank');
      handleMarkAsUsed(result);
    } else {
      // Navigate to content studio
      toast.success('Redirecting to Content Studio...');
    }
  };

  const handleStartScraping = async (data: any) => {
    // Simulate API call
    toast.success(`🔄 ${data.source_type.charAt(0).toUpperCase() + data.source_type.slice(1)} scraper started`, {
      description: `Estimated time: ${Math.ceil(data.keywords.length * data.duration / 5)} minutes`,
    });
    
    // Refresh data after a delay
    setTimeout(() => {
      handleRefresh();
    }, 3000);
  };

  const getLastSyncText = () => {
    const diff = Date.now() - new Date(stats.last_sync).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  const getPlatformCount = () => {
    if (activeTab === 'reddit') return stats.by_platform.reddit;
    if (activeTab === 'youtube') return stats.by_platform.youtube;
    if (activeTab === 'bluesky') return stats.by_platform.bluesky;
    return stats.total_posts_scraped;
  };

  const paginatedResults = results.slice((currentPage - 1) * 8, currentPage * 8);
  const leftColumn = paginatedResults.filter((_, i) => i % 2 === 0);
  const rightColumn = paginatedResults.filter((_, i) => i % 2 === 1);

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <div className="max-w-[1400px] mx-auto p-6">
        {/* Breadcrumb */}
        <div className="text-[#6B7280] mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Dashboard &gt; Social Media &gt; Content Discovery
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1
              className="text-[#005260] mb-2"
              style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}
            >
              Content Discovery
            </h1>
            <p
              className="text-[#6B7280] mb-2"
              style={{ fontFamily: 'Open Sans', fontSize: '16px' }}
            >
              AI-powered insights from Reddit, YouTube, and Bluesky
            </p>
            <div className="flex items-center gap-2">
              <span
                className="text-[#9ca3af]"
                style={{ fontFamily: 'Open Sans', fontSize: '12px' }}
              >
                Last synced: {getLastSyncText()}
              </span>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="text-[#02a4bf] hover:text-[#018a9f] transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="bg-[#02a4bf] hover:bg-[#018a9f] text-white h-11 px-6 rounded-xl inline-flex items-center justify-center" style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500, width: '180px' }}>
              Scrape Platform
              <ChevronDown className="ml-2 w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem
                onClick={() => {
                  setScrapePlatform('reddit');
                  setScrapeModalOpen(true);
                }}
                className="h-10"
              >
                <span className="text-[#FF4500] mr-2">●</span>
                Scrape Reddit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setScrapePlatform('bluesky');
                  setScrapeModalOpen(true);
                }}
                className="h-10"
              >
                <span className="text-[#1185fe] mr-2">●</span>
                Scrape Bluesky
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setScrapePlatform('youtube');
                  setScrapeModalOpen(true);
                }}
                className="h-10"
              >
                <span className="text-[#FF0000] mr-2">●</span>
                Scrape YouTube
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Platform Tabs */}
        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white rounded-t-2xl h-12 p-0 gap-0 w-full justify-start">
              <TabsTrigger
                value="all"
                className="h-12 px-8 rounded-none data-[state=active]:bg-[#02a4bf] data-[state=active]:text-white data-[state=active]:border-b-[3px] data-[state=active]:border-[#02a4bf]"
                style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500 }}
              >
                All Sources ({stats.total_posts_scraped})
              </TabsTrigger>
              <TabsTrigger
                value="reddit"
                className="h-12 px-8 rounded-none data-[state=active]:bg-[#02a4bf] data-[state=active]:text-white data-[state=active]:border-b-[3px] data-[state=active]:border-[#02a4bf]"
                style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500 }}
              >
                <span className="text-[#FF4500] mr-2">●</span>
                Reddit ({stats.by_platform.reddit})
              </TabsTrigger>
              <TabsTrigger
                value="bluesky"
                className="h-12 px-8 rounded-none data-[state=active]:bg-[#02a4bf] data-[state=active]:text-white data-[state=active]:border-b-[3px] data-[state=active]:border-[#02a4bf]"
                style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500 }}
              >
                <span className="text-[#1185fe] mr-2">●</span>
                Bluesky ({stats.by_platform.bluesky})
              </TabsTrigger>
              <TabsTrigger
                value="youtube"
                className="h-12 px-8 rounded-none data-[state=active]:bg-[#02a4bf] data-[state=active]:text-white data-[state=active]:border-b-[3px] data-[state=active]:border-[#02a4bf]"
                style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500 }}
              >
                <span className="text-[#FF0000] mr-2">●</span>
                YouTube ({stats.by_platform.youtube})
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Filter Bar */}
          <FilterBar
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            priority={priority}
            onPriorityChange={setPriority}
            actionType={actionType}
            onActionTypeChange={setActionType}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            resultsCount={results.length}
          />

          {/* Results Grid */}
          {loading ? (
            <div className="bg-white rounded-b-2xl p-6">
              <div className="grid grid-cols-2 gap-5">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-[#f5f7fa] rounded-2xl h-[400px] animate-pulse" />
                ))}
              </div>
              <div className="text-center mt-6 text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Loading results...
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="bg-white rounded-b-2xl p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3
                className="text-[#374151] mb-2"
                style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}
              >
                No Content Discovered Yet
              </h3>
              <p
                className="text-[#6B7280] mb-6"
                style={{ fontFamily: 'Open Sans', fontSize: '16px' }}
              >
                Run your first scraper to find engagement opportunities and content ideas
              </p>
              <Button
                onClick={() => setScrapeModalOpen(true)}
                className="bg-[#02a4bf] hover:bg-[#018a9f] text-white h-12 px-8 rounded-xl"
                style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500 }}
              >
                Scrape Social Media
              </Button>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-b-2xl p-6">
                <div className="grid grid-cols-2 gap-5">
                  {/* Left Column */}
                  <div className="space-y-5">
                    {leftColumn.map((result) => (
                      <ResultCard
                        key={result.id}
                        result={result}
                        onViewDetails={() => handleViewDetails(result)}
                        onMarkAsUsed={() => handleMarkAsUsed(result)}
                        onArchive={() => handleArchive(result)}
                        onEngageNow={() => handleEngageNow(result)}
                      />
                    ))}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-5">
                    {rightColumn.map((result) => (
                      <ResultCard
                        key={result.id}
                        result={result}
                        onViewDetails={() => handleViewDetails(result)}
                        onMarkAsUsed={() => handleMarkAsUsed(result)}
                        onArchive={() => handleArchive(result)}
                        onEngageNow={() => handleEngageNow(result)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        const page = i + 1;
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                  <span className="text-[#6B7280] ml-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <DetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        result={selectedResult}
        onMarkAsUsed={() => selectedResult && handleMarkAsUsed(selectedResult)}
        onArchive={() => selectedResult && handleArchive(selectedResult)}
        onEngageNow={() => selectedResult && handleEngageNow(selectedResult)}
      />

      <ScrapePlatformModal
        isOpen={scrapeModalOpen}
        onClose={() => setScrapeModalOpen(false)}
        platform={scrapePlatform}
        onStartScraping={handleStartScraping}
      />
    </div>
  );
}
