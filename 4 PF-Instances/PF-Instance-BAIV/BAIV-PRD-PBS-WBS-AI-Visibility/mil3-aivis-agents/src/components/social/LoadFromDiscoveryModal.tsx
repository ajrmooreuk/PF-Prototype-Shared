import { useEffect, useState } from 'react';
import { X, Loader2, TrendingUp, MessageCircle, Hash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner@2.0.3';
import { callEccoAPI } from '../../lib/eccoAPI';

interface Gap {
  id: string;
  topic: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface RedditPost {
  id: string;
  title: string;
  url: string;
  engagement_score: number;
}

interface BlueskyPost {
  id: string;
  text: string;
  engagement: number;
}

interface LoadFromDiscoveryModalProps {
  tenantId: string;
  jwtToken: string;
  onClose: () => void;
  onSelect: (data: any) => void;
}

export function LoadFromDiscoveryModal({ tenantId, jwtToken, onClose, onSelect }: LoadFromDiscoveryModalProps) {
  const [gaps, setGaps] = useState<Gap[]>([]);
  const [redditPosts, setRedditPosts] = useState<RedditPost[]>([]);
  const [blueskyPosts, setBlueskyPosts] = useState<BlueskyPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const data = await callEccoAPI('/api/social/briefs/discovery-sources', 'GET');
        setGaps(data.gaps || []);
        setRedditPosts(data.reddit_posts || []);
        setBlueskyPosts(data.bluesky_posts || []);
      } catch (error) {
        console.error('Error fetching discovery sources:', error);
        // Show mock data on error
        setGaps([
            {
              id: 'gap-1',
              topic: 'Citation gap on LinkedIn',
              description: 'Not appearing in AI results for marketing automation',
              priority: 'high'
            },
            {
              id: 'gap-2',
              topic: 'Missing from AI recommendations',
              description: 'Claude doesn\'t cite us for content strategy queries',
              priority: 'high'
            },
            {
              id: 'gap-3',
              topic: 'Competitor advantage',
              description: 'HubSpot mentioned 3x more than us in AI responses',
              priority: 'medium'
            }
          ]);

          setRedditPosts([
            {
              id: 'reddit-1',
              title: 'Best marketing tools for small business',
              url: 'https://reddit.com/r/marketing/comments/example1',
              engagement_score: 85
            },
            {
              id: 'reddit-2',
              title: 'How do you automate social media posting?',
              url: 'https://reddit.com/r/entrepreneur/comments/example2',
              engagement_score: 72
            }
          ]);

          setBlueskyPosts([
            {
              id: 'bluesky-1',
              text: 'Just discovered AI for content creation and it\'s a game changer! Any recommendations for tools?',
              engagement: 120
            },
            {
              id: 'bluesky-2',
              text: 'Looking for better ways to track brand mentions across AI platforms. What do you use?',
              engagement: 95
            }
          ]);
        toast.error('Failed to load discovery sources');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSources();
  }, [tenantId, jwtToken]);

  const handleSelectGap = (gap: Gap) => {
    onSelect({
      topic: gap.topic,
      keyMessage: gap.description,
      contentAngle: 'Address citation gap with data-driven content',
      callToAction: 'Learn more about our solution'
    });
  };

  const handleSelectReddit = (post: RedditPost) => {
    onSelect({
      topic: post.title,
      targetAudience: 'Reddit community members interested in marketing',
      contentAngle: 'Community-driven insights',
      callToAction: 'Join the conversation'
    });
  };

  const handleSelectBluesky = (post: BlueskyPost) => {
    onSelect({
      topic: post.text.substring(0, 100),
      targetAudience: 'Bluesky users exploring new tools',
      contentAngle: 'Respond to trending conversations',
      callToAction: 'Discover our platform'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-[#e84e1c] text-white';
      case 'medium':
        return 'bg-[#f59e0b] text-white';
      case 'low':
        return 'bg-[#6B7280] text-white';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
            Load from Discovery
          </DialogTitle>
          <DialogDescription style={{ fontFamily: 'Open Sans' }}>
            Select a discovery source to pre-fill your post brief
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-[#02a4bf] animate-spin" />
          </div>
        ) : (
          <Tabs defaultValue="gaps">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="gaps" style={{ fontFamily: 'Open Sans' }}>
                Citation Gaps ({gaps.length})
              </TabsTrigger>
              <TabsTrigger value="reddit" style={{ fontFamily: 'Open Sans' }}>
                Reddit ({redditPosts.length})
              </TabsTrigger>
              <TabsTrigger value="bluesky" style={{ fontFamily: 'Open Sans' }}>
                Bluesky ({blueskyPosts.length})
              </TabsTrigger>
            </TabsList>

            {/* Gaps Tab */}
            <TabsContent value="gaps" className="space-y-3 mt-4">
              {gaps.map(gap => (
                <div
                  key={gap.id}
                  onClick={() => handleSelectGap(gap)}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:border-[#02a4bf] hover:bg-[#02a4bf]/5 cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-[#005260] flex-1" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                      {gap.topic}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-xs capitalize ${getPriorityColor(gap.priority)}`} style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
                      {gap.priority}
                    </span>
                  </div>
                  <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans' }}>
                    {gap.description}
                  </p>
                </div>
              ))}
            </TabsContent>

            {/* Reddit Tab */}
            <TabsContent value="reddit" className="space-y-3 mt-4">
              {redditPosts.map(post => (
                <div
                  key={post.id}
                  onClick={() => handleSelectReddit(post)}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:border-[#02a4bf] hover:bg-[#02a4bf]/5 cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-[#005260] flex-1" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-1 text-[#02a4bf]">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                        {post.engagement_score}
                      </span>
                    </div>
                  </div>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#02a4bf] hover:underline text-sm"
                    style={{ fontFamily: 'Open Sans' }}
                  >
                    View on Reddit →
                  </a>
                </div>
              ))}
            </TabsContent>

            {/* Bluesky Tab */}
            <TabsContent value="bluesky" className="space-y-3 mt-4">
              {blueskyPosts.map(post => (
                <div
                  key={post.id}
                  onClick={() => handleSelectBluesky(post)}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:border-[#02a4bf] hover:bg-[#02a4bf]/5 cursor-pointer transition-all"
                >
                  <p className="text-[#374151] mb-2" style={{ fontFamily: 'Open Sans' }}>
                    {post.text}
                  </p>
                  <div className="flex items-center gap-1 text-[#6B7280] text-sm">
                    <MessageCircle className="h-4 w-4" />
                    <span style={{ fontFamily: 'Open Sans' }}>
                      {post.engagement} engagements
                    </span>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        )}

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-[#6B7280] text-center" style={{ fontFamily: 'Open Sans' }}>
            Click on any item to pre-fill the form with its content
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}