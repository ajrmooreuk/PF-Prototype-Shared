import { useState, useEffect } from 'react';
import { X, Copy, Download, Sparkles, Heart, MessageCircle, Share2, Clock, Loader2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { copyToClipboard } from '../../lib/clipboard';
import { callEccoAPI } from '../../lib/eccoAPI';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface Post {
  id: string;
  platform: 'linkedin' | 'facebook' | 'instagram';
  caption: string;
  hashtags: string[];
  image_url?: string;
  character_count: number;
  estimated_engagement_score: number;
}

interface ViewPostsModalProps {
  briefId: string;
  tenantId: string;
  jwtToken: string;
  onClose: () => void;
}

export function ViewPostsModal({ briefId, tenantId, jwtToken, onClose }: ViewPostsModalProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('linkedin');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await callEccoAPI(`/api/social/posts?brief_id=${briefId}`, 'GET');
        setPosts(data.posts || []);
        if (data.posts && data.posts.length > 0) {
          setActiveTab(data.posts[0].platform);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Failed to load posts');
        
        // Show mock data on error
        const mockPosts: Post[] = [
          {
            id: '1',
            platform: 'linkedin',
            caption: 'In today\'s fast-paced digital landscape, AI is transforming how we approach marketing. Here are 3 key benefits:\n\n1️⃣ Save 10+ hours per week on content creation\n2️⃣ Increase engagement by 45% with data-driven insights\n3️⃣ Personalize at scale with intelligent automation\n\nThe future of marketing is here, and it\'s powered by AI.\n\nWhat\'s your biggest marketing challenge? Let\'s discuss in the comments! 👇',
            hashtags: ['AI', 'Marketing', 'DigitalTransformation', 'ContentStrategy'],
            image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
            character_count: 450,
            estimated_engagement_score: 85
          },
          {
            id: '2',
            platform: 'facebook',
            caption: '🚀 Exciting news for marketers!\n\nAI is revolutionizing the way we connect with customers. Here\'s what we\'re seeing:\n\n✨ 10 hours saved per week\n📈 45% higher engagement rates\n🎯 Better personalization than ever\n\nWant to learn how AI can transform your marketing? Drop a comment below! 💬',
            hashtags: ['MarketingTips', 'AIMarketing', 'GrowthHacking'],
            image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
            character_count: 320,
            estimated_engagement_score: 78
          },
          {
            id: '3',
            platform: 'instagram',
            caption: 'AI + Marketing = 🔥\n\nSwipe to see how AI is changing the game:\n\n💡 Save 10+ hours/week\n📊 Boost engagement by 45%\n🎨 Create personalized experiences\n\nReady to level up your marketing? Link in bio! ✨',
            hashtags: ['AIMarketing', 'DigitalMarketing', 'MarketingStrategy', 'ContentCreation', 'SocialMediaMarketing'],
            image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
            character_count: 240,
            estimated_engagement_score: 82
          }
        ];
        setPosts(mockPosts);
        setActiveTab('linkedin');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [briefId, tenantId, jwtToken]);

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return '#0077B5';
      case 'facebook':
        return '#1877F2';
      case 'instagram':
        return '#E4405F';
      default:
        return '#02a4bf';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Sparkles className="h-5 w-5" />;
      case 'facebook':
        return <Heart className="h-5 w-5" />;
      case 'instagram':
        return <MessageCircle className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
            Generated Posts
          </DialogTitle>
          <DialogDescription style={{ fontFamily: 'Open Sans' }}>
            View and manage your AI-generated social media posts
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-[#02a4bf] animate-spin" />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              {posts.map(post => (
                <TabsTrigger
                  key={post.platform}
                  value={post.platform}
                  className="flex items-center gap-2 capitalize"
                  style={{ fontFamily: 'Open Sans' }}
                >
                  {getPlatformIcon(post.platform)}
                  {post.platform}
                </TabsTrigger>
              ))}
            </TabsList>

            {posts.map(post => (
              <TabsContent key={post.platform} value={post.platform} className="space-y-4 mt-4">
                {/* Post Preview */}
                <div className="border-2 rounded-xl overflow-hidden" style={{ borderColor: getPlatformColor(post.platform) }}>
                  {/* Image */}
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt="Post preview"
                      className="w-full h-64 object-cover"
                    />
                  )}

                  {/* Caption */}
                  <div className="p-6 bg-white">
                    <div className="whitespace-pre-wrap mb-4" style={{ fontFamily: 'Open Sans' }}>
                      {post.caption}
                    </div>

                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.hashtags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{
                            fontFamily: 'Open Sans',
                            backgroundColor: `${getPlatformColor(post.platform)}20`,
                            color: getPlatformColor(post.platform)
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex gap-6 text-sm text-[#6B7280]" style={{ fontFamily: 'Open Sans' }}>
                        <span>{post.character_count} characters</span>
                        <span>Engagement score: {post.estimated_engagement_score}/100</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={async () => {
                      const success = await copyToClipboard(`${post.caption}\n\n${post.hashtags.map(t => `#${t}`).join(' ')}`);
                      if (success) {
                        toast.success('Copied to clipboard!');
                      } else {
                        toast.error('Failed to copy to clipboard');
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#02a4bf] hover:bg-[#028a9f] text-white py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                  >
                    <Copy className="h-4 w-4" />
                    Copy Post
                  </button>
                  <button
                    onClick={() => {
                      toast.info('Schedule feature coming soon!');
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-[#02a4bf]/5 text-[#02a4bf] border-2 border-[#02a4bf] py-3 rounded-xl transition-all duration-200"
                    style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Schedule to Postiz
                  </button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}