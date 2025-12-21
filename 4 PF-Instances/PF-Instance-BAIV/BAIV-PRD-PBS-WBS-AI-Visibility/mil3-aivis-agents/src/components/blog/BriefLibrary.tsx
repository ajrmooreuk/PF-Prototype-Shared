import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Edit, Trash2, Eye, Zap, FileText } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
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
  source_type: 'manual' | 'reddit' | 'bluesky' | 'gap_analysis';
  search_phrase: string;
  target_audience: string;
  word_count: number;
  status: 'pending' | 'completed' | 'failed';
  used: boolean;
  blog_id?: string;
  created_at: string;
}

interface BriefLibraryProps {
  onGenerateSuccess?: () => void;
}

export function BriefLibrary({ onGenerateSuccess }: BriefLibraryProps) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [usedFilter, setUsedFilter] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBrief, setSelectedBrief] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  // Mock data
  const [briefs] = useState<Brief[]>([
    {
      id: '1',
      source_type: 'manual',
      search_phrase: 'Email Marketing Automation for B2B SaaS',
      target_audience: 'B2B marketing managers at SaaS companies',
      word_count: 2500,
      status: 'pending',
      used: false,
      created_at: '2025-01-15T10:30:00Z'
    },
    {
      id: '2',
      source_type: 'gap_analysis',
      search_phrase: 'AI-Powered Content Optimization Strategies',
      target_audience: 'Content marketers and SEO specialists',
      word_count: 3000,
      status: 'completed',
      used: true,
      blog_id: 'blog-1',
      created_at: '2025-01-14T14:20:00Z'
    },
    {
      id: '3',
      source_type: 'reddit',
      search_phrase: 'Best Practices for Remote Team Collaboration',
      target_audience: 'Remote team managers and leaders',
      word_count: 2000,
      status: 'completed',
      used: true,
      blog_id: 'blog-2',
      created_at: '2025-01-13T09:15:00Z'
    },
    {
      id: '4',
      source_type: 'manual',
      search_phrase: 'Comprehensive Guide to Marketing Attribution Models',
      target_audience: 'Marketing analytics professionals',
      word_count: 4000,
      status: 'failed',
      used: false,
      created_at: '2025-01-12T16:45:00Z'
    }
  ]);

  const getSourceBadge = (source: string) => {
    const badges = {
      manual: { label: 'Manual', className: 'bg-gray-100 text-gray-700' },
      reddit: { label: 'Reddit', className: 'bg-orange-100 text-orange-700' },
      bluesky: { label: 'Bluesky', className: 'bg-blue-100 text-blue-700' },
      gap_analysis: { label: 'Gap', className: 'bg-[#e84e1c]/10 text-[#e84e1c]' }
    };
    const badge = badges[source as keyof typeof badges] || badges.manual;
    return <Badge className={`${badge.className} hover:${badge.className} border-0`}>{badge.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { label: 'Pending', className: 'bg-gray-100 text-gray-700', icon: null },
      completed: { label: 'Blog Generated', className: 'bg-green-100 text-green-700', icon: '✓' },
      failed: { label: 'Failed', className: 'bg-red-100 text-red-700', icon: null }
    };
    const badge = badges[status as keyof typeof badges] || badges.pending;
    return (
      <Badge className={`${badge.className} hover:${badge.className} border-0`}>
        {badge.icon && <span className="mr-1">{badge.icon}</span>}
        {badge.label}
      </Badge>
    );
  };

  const handleGenerateBlog = async (briefId: string) => {
    setIsGenerating(briefId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Blog generation started! Check the Manage Blogs tab.');
    setIsGenerating(null);
    
    if (onGenerateSuccess) {
      onGenerateSuccess();
    }
  };

  const handleDelete = async () => {
    if (!selectedBrief) return;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast.success('Brief deleted successfully');
    setDeleteDialogOpen(false);
    setSelectedBrief(null);
  };

  const filteredBriefs = briefs.filter(brief => {
    if (statusFilter !== 'all' && brief.status !== statusFilter) return false;
    if (sourceFilter !== 'all' && brief.source_type !== sourceFilter) return false;
    if (usedFilter === 'used' && !brief.used) return false;
    if (usedFilter === 'unused' && brief.used) return false;
    return true;
  });

  const truncate = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (briefs.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 
          className="text-[#005260] mb-2" 
          style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}
        >
          No Blog Briefs Yet
        </h3>
        <p className="text-gray-500 mb-6" style={{ fontFamily: 'Open Sans' }}>
          Create your first brief to start generating comprehensive blogs
        </p>
        <Button className="bg-[#02a4bf] hover:bg-[#028a9f]">
          <FileText className="h-4 w-4 mr-2" />
          Create Brief
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="reddit">Reddit</SelectItem>
                <SelectItem value="bluesky">Bluesky</SelectItem>
                <SelectItem value="gap_analysis">Gap Analysis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={usedFilter} onValueChange={setUsedFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Usage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="used">Used</SelectItem>
                <SelectItem value="unused">Unused</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Input placeholder="Search briefs..." />
          </div>
        </div>
      </Card>

      {/* Briefs Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f9fafb] border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600 text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  Source
                </th>
                <th className="text-left py-3 px-4 text-gray-600 text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  Search Phrase
                </th>
                <th className="text-left py-3 px-4 text-gray-600 text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  Target Audience
                </th>
                <th className="text-left py-3 px-4 text-gray-600 text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  Word Count
                </th>
                <th className="text-left py-3 px-4 text-gray-600 text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  Status
                </th>
                <th className="text-right py-3 px-4 text-gray-600 text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBriefs.map((brief, index) => (
                <tr 
                  key={brief.id}
                  className={`border-b border-gray-100 hover:bg-[#f0f9fa] transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'
                  }`}
                >
                  <td className="py-4 px-4">
                    {getSourceBadge(brief.source_type)}
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[#005260]" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                      {truncate(brief.search_phrase, 50)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-600 text-sm" style={{ fontFamily: 'Open Sans' }}>
                      {brief.target_audience ? truncate(brief.target_audience, 30) : '—'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-600 text-sm" style={{ fontFamily: 'Open Sans' }}>
                      {brief.word_count.toLocaleString()} words
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(brief.status)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      {brief.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleGenerateBlog(brief.id)}
                          disabled={isGenerating === brief.id}
                          className="bg-[#02a4bf] hover:bg-[#028a9f] text-white"
                          style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
                        >
                          {isGenerating === brief.id ? (
                            <>Generating...</>
                          ) : (
                            <>
                              <Zap className="h-4 w-4 mr-1" />
                              Generate Blog
                            </>
                          )}
                        </Button>
                      )}
                      {brief.status === 'completed' && brief.blog_id && (
                        <>
                          <Button
                            size="sm"
                            className="bg-[#02a4bf] hover:bg-[#028a9f] text-white"
                            style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Blog
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-600 hover:text-[#02a4bf]"
                          >
                            Regenerate
                          </Button>
                        </>
                      )}
                      {brief.status === 'failed' && (
                        <Button
                          size="sm"
                          onClick={() => handleGenerateBlog(brief.id)}
                          disabled={isGenerating === brief.id}
                          className="bg-[#e84e1c] hover:bg-[#d44419] text-white"
                          style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
                        >
                          Retry
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-600 hover:text-[#02a4bf] p-2"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedBrief(brief.id);
                          setDeleteDialogOpen(true);
                        }}
                        className="text-gray-600 hover:text-red-600 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
            Showing {filteredBriefs.length} of {briefs.length} briefs
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-[#02a4bf] text-white border-[#02a4bf]">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
              Delete Brief?
            </AlertDialogTitle>
            <AlertDialogDescription style={{ fontFamily: 'Open Sans' }}>
              This action cannot be undone. The brief will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel style={{ fontFamily: 'Open Sans' }}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              style={{ fontFamily: 'Poppins', fontWeight: 600 }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
