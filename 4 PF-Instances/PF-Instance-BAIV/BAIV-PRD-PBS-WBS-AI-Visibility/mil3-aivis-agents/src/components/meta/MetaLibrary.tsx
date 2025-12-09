import { useState } from 'react';
import { Search, Filter, Copy, Download, Edit, Trash2, Star, Calendar, Eye, MoreVertical, Grid3x3, List } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';
import { copyToClipboard } from '../../lib/clipboard';
import { MetaDetailModal } from './MetaDetailModal';

interface MetaLibraryProps {
  onGenerateNew: () => void;
}

export function MetaLibrary({ onGenerateNew }: MetaLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [clientFilter, setClientFilter] = useState('all');
  const [discoveryFilter, setDiscoveryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedMeta, setSelectedMeta] = useState<any>(null);

  // Mock data
  const mockMetaTags = [
    {
      id: 'meta_1',
      client_name: 'Acme Corp',
      generated_title: 'Email Marketing Automation Guide: Boost ROI by 300% in 2025',
      meta_description: 'Learn how to implement email marketing automation that drives results. Comprehensive guide with strategies, tools, and best practices.',
      keywords: ['email marketing', 'automation', 'roi', 'marketing strategy'],
      rrf_impact_score: 87,
      discovery_enhanced: true,
      created_at: 'Nov 10',
      platform_scores: { chatgpt: 89, claude: 87, perplexity: 91, gemini: 85 }
    },
    {
      id: 'meta_2',
      client_name: 'TechStart Inc',
      generated_title: 'SaaS Product Development: Complete Roadmap 2025',
      meta_description: 'Build your SaaS product from concept to launch. Expert guidance on development, scaling, and go-to-market strategies.',
      keywords: ['saas', 'product development', 'startup', 'roadmap'],
      rrf_impact_score: 92,
      discovery_enhanced: true,
      created_at: 'Nov 9',
      platform_scores: { chatgpt: 88, claude: 90, perplexity: 94, gemini: 89 }
    },
    {
      id: 'meta_3',
      client_name: 'Global Solutions',
      generated_title: 'AI Content Strategy: Best Practices & Tools',
      meta_description: 'Master AI-powered content creation. Learn strategies, tools, and techniques for creating engaging content at scale.',
      keywords: ['ai content', 'content strategy', 'automation'],
      rrf_impact_score: 78,
      discovery_enhanced: false,
      created_at: 'Nov 8',
      platform_scores: { chatgpt: 75, claude: 78, perplexity: 80, gemini: 76 }
    }
  ];

  const getPlatformIcon = (score: number) => {
    if (score > 80) return <span className="text-[#10b981]">●</span>;
    if (score > 60) return <span className="text-[#f59e0b]">●</span>;
    return <span className="text-[#6b7280]">●</span>;
  };

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#02a4bf]/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏷️</span>
            </div>
            <div>
              <div className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}>
                27
              </div>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Total Meta Tags
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#8b5cf6]/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
            <div>
              <div className="text-[#8b5cf6]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}>
                19
              </div>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Discovery-Enhanced
              </p>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                70%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter Bar */}
      <Card className="p-5 rounded-2xl shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[240px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or keywords..."
              className="pl-10 rounded-lg"
              style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
            />
          </div>

          {/* Client Filter */}
          <Select value={clientFilter} onValueChange={setClientFilter}>
            <SelectTrigger className="w-[160px] rounded-lg">
              <SelectValue placeholder="Client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clients</SelectItem>
              <SelectItem value="acme">Acme Corp</SelectItem>
              <SelectItem value="techstart">TechStart Inc</SelectItem>
              <SelectItem value="global">Global Solutions</SelectItem>
            </SelectContent>
          </Select>

          {/* Discovery Filter */}
          <Select value={discoveryFilter} onValueChange={setDiscoveryFilter}>
            <SelectTrigger className="w-[160px] rounded-lg">
              <SelectValue placeholder="Discovery" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="enhanced">Enhanced</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px] rounded-lg">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="title">Title A-Z</SelectItem>
              <SelectItem value="rrf">RRF Score</SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
            >
              <Grid3x3 className={`h-4 w-4 ${viewMode === 'grid' ? 'text-[#02a4bf]' : 'text-gray-500'}`} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
            >
              <List className={`h-4 w-4 ${viewMode === 'list' ? 'text-[#02a4bf]' : 'text-gray-500'}`} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            Showing {mockMetaTags.length} meta tags
          </p>
          <Button
            variant="link"
            className="text-[#02a4bf] p-0"
            style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
          >
            Clear all
          </Button>
        </div>
      </Card>

      {/* Meta Tags Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' : 'space-y-4'}>
        {mockMetaTags.map((meta) => (
          <Card 
            key={meta.id}
            className="p-5 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
            onClick={() => setSelectedMeta(meta)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                {meta.discovery_enhanced && (
                  <Badge className="bg-[#8b5cf6]/10 text-[#8b5cf6] text-xs mb-2">
                    🔍 Discovery Enhanced
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-[#231f20] font-bold text-lg">
                    {meta.rrf_impact_score}
                  </div>
                  <div className="text-[#6b7280] text-xs">RRF</div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Export HTML
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-[#ef4444]">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Title */}
            <h3 
              className="text-[#231f20] mb-3 line-clamp-2"
              style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', lineHeight: '1.4' }}
            >
              {meta.generated_title}
            </h3>

            {/* Description */}
            <p 
              className="text-[#6b7280] mb-3 line-clamp-2 text-sm"
              style={{ fontFamily: 'Open Sans' }}
            >
              {meta.meta_description}
            </p>

            {/* Mini SERP Preview */}
            <div className="bg-gray-50 rounded-lg p-3 mb-3 text-xs">
              <div className="text-[#1a0dab] font-medium mb-1 truncate" style={{ fontSize: '12px' }}>
                {meta.generated_title}
              </div>
              <div className="text-[#006621] mb-1" style={{ fontSize: '11px' }}>
                yourdomain.com › slug
              </div>
              <div className="text-[#4d5156] line-clamp-2" style={{ fontSize: '11px' }}>
                {meta.meta_description}
              </div>
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {meta.keywords.slice(0, 4).map((keyword, i) => (
                <Badge 
                  key={i}
                  variant="secondary"
                  className="bg-[#e6f7f9] text-[#02a4bf] text-xs"
                >
                  {keyword}
                </Badge>
              ))}
              {meta.keywords.length > 4 && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                  +{meta.keywords.length - 4} more
                </Badge>
              )}
            </div>

            {/* Platform Scores */}
            <div className="flex items-center gap-2 mb-4">
              {Object.entries(meta.platform_scores).map(([platform, score]) => (
                <div key={platform} className="flex items-center gap-1" title={`${platform}: ${score}%`}>
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm text-xs font-bold">
                    {platform[0].toUpperCase()}
                  </div>
                  {getPlatformIcon(score as number)}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-[#6b7280] text-xs">{meta.client_name}</span>
              <span className="text-[#6b7280] text-xs">{meta.created_at}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3">
              <Button
                size="sm"
                className="flex-1 bg-[#02a4bf] hover:bg-[#018a9f] text-white h-9"
                style={{ fontSize: '13px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMeta(meta);
                }}
              >
                <Eye className="h-3 w-3 mr-1" />
                View Details
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-[#02a4bf] text-[#02a4bf] hover:bg-[#02a4bf]/10 h-9"
                style={{ fontSize: '13px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard('Meta tags copied!');
                }}
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {selectedMeta && (
        <MetaDetailModal
          meta={selectedMeta}
          isOpen={!!selectedMeta}
          onClose={() => setSelectedMeta(null)}
        />
      )}
    </div>
  );
}