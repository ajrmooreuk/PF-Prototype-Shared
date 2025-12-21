import { useState, useEffect } from 'react';
import { Eye, Pencil, Trash2, Loader2, Linkedin, Facebook, Instagram } from 'lucide-react';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import { callEccoAPI } from '../../lib/eccoAPI';
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

interface Brief {
  id: string;
  topic: string;
  platforms: string[];
  status: 'completed' | 'generating' | 'failed' | 'pending';
  created_at: string;
  post_count: number;
}

interface RecentBriefsTableProps {
  tenantId: string;
  jwtToken: string;
  refreshTrigger: number;
  onViewPosts: (briefId: string) => void;
}

export function RecentBriefsTable({ tenantId, jwtToken, refreshTrigger, onViewPosts }: RecentBriefsTableProps) {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [briefToDelete, setBriefToDelete] = useState<string | null>(null);

  const limit = 10;

  const fetchBriefs = async () => {
    setIsLoading(true);
    try {
      const offset = (page - 1) * limit;
      const statusParam = activeFilter !== 'all' ? `&status=${activeFilter}` : '';

      const data = await callEccoAPI(`/api/social/briefs?limit=${limit}&offset=${offset}${statusParam}`, 'GET');
      setBriefs(data.briefs || []);
      setTotal(data.total || 0);
      setTotalPages(data.pages || 1);
    } catch (error) {
      console.error('Error fetching briefs:', error);
      toast.error('Failed to load briefs');
      
      // Show mock data on error
      const mockBriefs: Brief[] = [
        {
          id: '1',
          topic: 'AI Marketing Benefits',
          platforms: ['linkedin', 'facebook', 'instagram'],
          status: 'completed',
          created_at: '2024-11-08T14:30:00Z',
          post_count: 3
        },
        {
          id: '2',
          topic: 'Social Media Automation',
          platforms: ['linkedin'],
          status: 'generating',
          created_at: '2024-11-10T09:15:00Z',
          post_count: 0
        },
        {
          id: '3',
          topic: 'Content Strategy Tips',
          platforms: ['facebook', 'instagram'],
          status: 'completed',
          created_at: '2024-11-07T11:20:00Z',
          post_count: 2
        },
        {
          id: '4',
          topic: 'Digital Transformation',
          platforms: ['linkedin', 'facebook'],
          status: 'failed',
          created_at: '2024-11-06T16:45:00Z',
          post_count: 0
        },
        {
          id: '5',
          topic: 'Customer Engagement Strategies',
          platforms: ['linkedin', 'instagram'],
          status: 'completed',
          created_at: '2024-11-05T10:00:00Z',
          post_count: 2
        }
      ];
      
      let filtered = mockBriefs;
      if (activeFilter !== 'all') {
        filtered = mockBriefs.filter(b => b.status === activeFilter);
      }
      
      setBriefs(filtered);
      setTotal(filtered.length);
      setTotalPages(Math.ceil(filtered.length / limit));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBriefs();
  }, [tenantId, activeFilter, page, refreshTrigger]);

  const handleDelete = async () => {
    if (!briefToDelete) return;

    try {
      await callEccoAPI(`/api/social/briefs/${briefToDelete}`, 'DELETE');
      toast.success('Brief deleted');
      setBriefs(briefs.filter(b => b.id !== briefToDelete));
    } catch (error) {
      console.error('Error deleting brief:', error);
      toast.error('Failed to delete brief');
    } finally {
      setDeleteDialogOpen(false);
      setBriefToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className="h-4 w-4 text-[#0077B5]" />;
      case 'facebook':
        return <Facebook className="h-4 w-4 text-[#1877F2]" />;
      case 'instagram':
        return <Instagram className="h-4 w-4 text-[#E4405F]" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-[#10b981] hover:bg-[#10b981] text-white">
            Completed
          </Badge>
        );
      case 'generating':
        return (
          <Badge className="bg-[#3b82f6] hover:bg-[#3b82f6] text-white flex items-center gap-1">
            <Loader2 className="h-3 w-3 animate-spin" />
            Generating
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-[#e84e1c] hover:bg-[#e84e1c] text-white">
            Failed
          </Badge>
        );
      default:
        return (
          <Badge className="bg-[#6B7280] hover:bg-[#6B7280] text-white">
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-[#005260] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
        Recent Briefs
      </h2>

      {/* Filter Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-4">
        {['all', 'completed', 'generating', 'failed'].map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setActiveFilter(filter);
              setPage(1);
            }}
            className={`pb-2 text-sm capitalize transition-colors ${
              activeFilter === filter
                ? 'text-[#02a4bf] border-b-2 border-[#02a4bf]'
                : 'text-[#6B7280] hover:text-[#02a4bf]'
            }`}
            style={{ fontFamily: 'Open Sans', fontWeight: activeFilter === filter ? 600 : 400 }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 text-[#02a4bf] animate-spin" />
        </div>
      ) : briefs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-16 w-16 rounded-full bg-[#f9fafb] flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
            No posts generated yet
          </h3>
          <p className="text-[#6B7280] text-center max-w-md" style={{ fontFamily: 'Open Sans' }}>
            Create your first AI-powered social media post using the form above
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#005260] text-white">
                  <th className="text-left px-4 py-3 rounded-tl-lg" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                    Topic
                  </th>
                  <th className="text-left px-4 py-3" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                    Platforms
                  </th>
                  <th className="text-left px-4 py-3" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                    Status
                  </th>
                  <th className="text-left px-4 py-3" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                    Created
                  </th>
                  <th className="text-left px-4 py-3 rounded-tr-lg" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {briefs.map((brief, index) => (
                  <tr
                    key={brief.id}
                    className={`border-b border-gray-200 hover:bg-[#02a4bf]/10 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#f9fafb]'
                    }`}
                  >
                    <td className="px-4 py-3" style={{ fontFamily: 'Open Sans' }}>
                      {brief.topic}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {brief.platforms.map(platform => (
                          <div key={platform}>{getPlatformIcon(platform)}</div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(brief.status)}
                    </td>
                    <td className="px-4 py-3 text-[#6B7280]" style={{ fontFamily: 'Open Sans' }}>
                      {formatDate(brief.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onViewPosts(brief.id)}
                          disabled={brief.status !== 'completed'}
                          className="p-2 text-[#6B7280] hover:text-[#02a4bf] hover:bg-[#02a4bf]/10 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="View posts"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setBriefToDelete(brief.id);
                            setDeleteDialogOpen(true);
                          }}
                          className="p-2 text-[#6B7280] hover:text-[#e84e1c] hover:bg-[#e84e1c]/10 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-end gap-4 mt-4">
              <p className="text-sm text-[#6B7280]" style={{ fontFamily: 'Open Sans' }}>
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-[#02a4bf] hover:text-white hover:border-[#02a4bf] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-700"
                  style={{ fontFamily: 'Open Sans' }}
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1 text-sm border rounded transition-colors ${
                      page === pageNum
                        ? 'bg-[#02a4bf] text-white border-[#02a4bf]'
                        : 'border-gray-300 hover:bg-[#02a4bf] hover:text-white hover:border-[#02a4bf]'
                    }`}
                    style={{ fontFamily: 'Open Sans' }}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-[#02a4bf] hover:text-white hover:border-[#02a4bf] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-700"
                  style={{ fontFamily: 'Open Sans' }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this brief?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this brief and all generated posts. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-[#e84e1c] hover:bg-[#d44419]"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}