import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Edit, Eye, Download, MoreVertical, FileText, Clock, MessageSquare } from 'lucide-react';
import { BlogEditorModal } from './BlogEditorModal';
import { BlogPreviewModal } from './BlogPreviewModal';
import { PublishModal } from './PublishModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface Blog {
  id: string;
  brief_id: string;
  title: string;
  slug: string;
  meta_description: string;
  featured_image_url?: string;
  word_count: number;
  estimated_reading_time: number;
  faqs_count: number;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  created_at: string;
  published_at?: string;
}

export function BlogManager() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);

  // Mock data
  const [blogs] = useState<Blog[]>([
    {
      id: 'blog-1',
      brief_id: '2',
      title: 'AI-Powered Content Optimization: The Complete 2025 Guide',
      slug: 'ai-powered-content-optimization-guide-2025',
      meta_description: 'Learn how to optimize your content for AI platforms like ChatGPT, Claude, and Perplexity with proven strategies and actionable tips.',
      featured_image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
      word_count: 3247,
      estimated_reading_time: 13,
      faqs_count: 8,
      status: 'published',
      created_at: '2025-01-14T14:20:00Z',
      published_at: '2025-01-15T09:00:00Z'
    },
    {
      id: 'blog-2',
      brief_id: '3',
      title: 'Remote Team Collaboration: Best Practices and Tools for 2025',
      slug: 'remote-team-collaboration-best-practices-2025',
      meta_description: 'Discover the best practices and essential tools for effective remote team collaboration in 2025.',
      featured_image_url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400',
      word_count: 2543,
      estimated_reading_time: 10,
      faqs_count: 6,
      status: 'draft',
      created_at: '2025-01-13T09:15:00Z'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const badges = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-700' },
      published: { label: 'Published', className: 'bg-green-100 text-green-700' },
      scheduled: { label: 'Scheduled', className: 'bg-blue-100 text-blue-700' },
      archived: { label: 'Archived', className: 'bg-orange-100 text-orange-700' }
    };
    const badge = badges[status as keyof typeof badges] || badges.draft;
    return <Badge className={`${badge.className} hover:${badge.className} border-0`}>{badge.label}</Badge>;
  };

  const filteredBlogs = blogs.filter(blog => {
    if (statusFilter !== 'all' && blog.status !== statusFilter) return false;
    if (searchQuery && !blog.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setEditorOpen(true);
  };

  const handlePreview = (blog: Blog) => {
    setSelectedBlog(blog);
    setPreviewOpen(true);
  };

  const handlePublish = (blog: Blog) => {
    setSelectedBlog(blog);
    setPublishOpen(true);
  };

  if (blogs.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="text-6xl mb-4">📄</div>
        <h3 
          className="text-[#005260] mb-2" 
          style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}
        >
          No Blogs Generated Yet
        </h3>
        <p className="text-gray-500 mb-6" style={{ fontFamily: 'Open Sans' }}>
          Create a brief and generate your first AI-optimized blog
        </p>
        <Button className="bg-[#02a4bf] hover:bg-[#028a9f]">
          <FileText className="h-4 w-4 mr-2" />
          View Briefs
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Input 
              placeholder="Search blogs..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBlogs.map((blog) => (
          <Card 
            key={blog.id} 
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Featured Image */}
            {blog.featured_image_url && (
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <img 
                  src={blog.featured_image_url} 
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6">
              {/* Title */}
              <h3 
                className="text-[#005260] mb-2 line-clamp-2" 
                style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}
              >
                {blog.title}
              </h3>

              {/* Meta Description */}
              <p 
                className="text-gray-600 text-sm mb-4 line-clamp-2" 
                style={{ fontFamily: 'Open Sans' }}
              >
                {blog.meta_description}
              </p>

              {/* Stats Row */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>{blog.word_count.toLocaleString()} words</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{blog.estimated_reading_time} min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{blog.faqs_count} FAQs</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  {getStatusBadge(blog.status)}
                  <span className="text-sm text-gray-500" style={{ fontFamily: 'Open Sans' }}>
                    {new Date(blog.created_at).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(blog)}
                    className="text-gray-600 hover:text-[#02a4bf]"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handlePreview(blog)}
                    className="text-gray-600 hover:text-[#02a4bf]"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {blog.status === 'draft' && (
                    <Button
                      size="sm"
                      onClick={() => handlePublish(blog)}
                      className="bg-[#02a4bf] hover:bg-[#028a9f] text-white"
                      style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
                    >
                      Publish
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-3 text-gray-600 hover:text-[#02a4bf]">
                      <MoreVertical className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modals */}
      {selectedBlog && (
        <>
          <BlogEditorModal 
            blog={selectedBlog}
            open={editorOpen}
            onOpenChange={setEditorOpen}
          />
          <BlogPreviewModal 
            blog={selectedBlog}
            open={previewOpen}
            onOpenChange={setPreviewOpen}
            onEdit={() => {
              setPreviewOpen(false);
              setEditorOpen(true);
            }}
            onPublish={() => {
              setPreviewOpen(false);
              setPublishOpen(true);
            }}
          />
          <PublishModal 
            blog={selectedBlog}
            open={publishOpen}
            onOpenChange={setPublishOpen}
          />
        </>
      )}
    </div>
  );
}
