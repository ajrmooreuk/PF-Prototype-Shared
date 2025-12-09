import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Eye, Copy, Download, Trash2, MoreVertical, Grid3x3, List, Link2, Star, TrendingUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface SuggestionsLibraryProps {
  onAnalyzeNew: () => void;
}

export function SuggestionsLibrary({ onAnalyzeNew }: SuggestionsLibraryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data
  const mockAnalyses = [
    {
      id: 'analysis_1',
      linkType: 'both',
      densityStatus: 'optimal',
      contentPreview: 'Email marketing automation has revolutionized how businesses communicate with their customers. Learn the essential strategies...',
      keywords: ['email automation', 'marketing', 'customer engagement', 'conversions'],
      totalLinks: 8,
      internalLinks: 5,
      externalLinks: 3,
      avgRRF: 87,
      linkDensity: 2.1,
      client: 'Acme Corp',
      date: 'Nov 10'
    },
    {
      id: 'analysis_2',
      linkType: 'internal',
      densityStatus: 'optimal',
      contentPreview: 'SEO best practices continue to evolve as search engines become more sophisticated. Stay ahead with these proven tactics...',
      keywords: ['SEO', 'search engine optimization', 'rankings'],
      totalLinks: 6,
      internalLinks: 6,
      externalLinks: 0,
      avgRRF: 82,
      linkDensity: 1.8,
      client: 'TechStart Inc',
      date: 'Nov 9'
    },
    {
      id: 'analysis_3',
      linkType: 'both',
      densityStatus: 'optimal',
      contentPreview: 'Content marketing strategies that drive real results require careful planning and execution. Here\'s what works...',
      keywords: ['content marketing', 'strategy', 'ROI'],
      totalLinks: 7,
      internalLinks: 4,
      externalLinks: 3,
      avgRRF: 85,
      linkDensity: 2.3,
      client: 'Global Solutions',
      date: 'Nov 8'
    }
  ];

  const getLinkTypeColor = (type: string) => {
    if (type === 'both') return 'bg-[#02a4bf]';
    if (type === 'internal') return 'bg-[#3b82f6]';
    return 'bg-[#8b5cf6]';
  };

  const getDensityColor = (status: string) => {
    if (status === 'optimal') return 'bg-[#10b981]';
    if (status === 'under-linked') return 'bg-[#f59e0b]';
    return 'bg-[#ef4444]';
  };

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#02a4bf]/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <div className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}>
                23
              </div>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Total Analyses
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#8b5cf6]/10 rounded-full flex items-center justify-center">
              <Link2 className="h-6 w-6 text-[#8b5cf6]" />
            </div>
            <div>
              <div className="text-[#8b5cf6]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}>
                6.5
              </div>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Avg Links Suggested
              </p>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '11px' }}>
                per analysis
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#ffb615]/10 rounded-full flex items-center justify-center">
              <Star className="h-6 w-6 text-[#ffb615]" />
            </div>
            <div>
              <div className="text-[#ffb615]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}>
                89
              </div>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                High-RRF Links
              </p>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '11px' }}>
                RRF 85+
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
              placeholder="Search by content or keywords..."
              className="pl-10 rounded-lg"
              style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
            />
          </div>

          {/* Link Type Filter */}
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="both">Both (15)</SelectItem>
              <SelectItem value="internal">Internal Only (5)</SelectItem>
              <SelectItem value="external">External Only (3)</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select defaultValue="newest">
            <SelectTrigger className="w-[160px] rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="most-links">Most Links</SelectItem>
              <SelectItem value="highest-rrf">Highest RRF</SelectItem>
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

        <p className="text-[#6b7280] mt-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Showing {mockAnalyses.length} analyses
        </p>
      </Card>

      {/* Analyses Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' : 'space-y-4'}>
        {mockAnalyses.map((analysis) => (
          <Card 
            key={analysis.id}
            className="p-5 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <Badge 
                className={`${getLinkTypeColor(analysis.linkType)} text-white text-xs`}
              >
                {analysis.linkType === 'both' ? 'Both Links' : analysis.linkType === 'internal' ? 'Internal Only' : 'External Only'}
              </Badge>
              <div className="flex items-center gap-2">
                <Badge className={`${getDensityColor(analysis.densityStatus)} text-white text-xs`}>
                  {analysis.densityStatus === 'optimal' ? 'Optimal ✓' : analysis.densityStatus === 'under-linked' ? 'Under-linked' : 'Over-linked'}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy All Links
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Export HTML
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Re-analyze
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

            {/* Content Preview */}
            <p 
              className="text-[#231f20] mb-3 line-clamp-3"
              style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
            >
              {analysis.contentPreview}
            </p>

            {/* Keywords */}
            <div className="flex flex-wrap gap-1 mb-3">
              {analysis.keywords.slice(0, 4).map((keyword, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-1 bg-[#e6f7f9] text-[#02a4bf] rounded text-xs"
                >
                  {keyword}
                </span>
              ))}
              {analysis.keywords.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 text-[#6b7280] rounded text-xs">
                  +{analysis.keywords.length - 4} more
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-center">
                <Link2 className="h-4 w-4 mx-auto mb-1 text-gray-500" />
                <div className="text-xs font-bold">{analysis.totalLinks} links</div>
              </div>
              <div className="text-center">
                <Star className="h-4 w-4 mx-auto mb-1 text-[#ffb615]" />
                <div className="text-xs font-bold text-[#ffb615]">{analysis.avgRRF} RRF</div>
              </div>
              <div className="text-center">
                <TrendingUp className="h-4 w-4 mx-auto mb-1 text-[#10b981]" />
                <div className="text-xs font-bold text-[#10b981]">{analysis.linkDensity}%</div>
              </div>
            </div>

            {/* Link Breakdown Bar */}
            <div className="mb-3">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden flex">
                <div 
                  className="bg-[#02a4bf]" 
                  style={{ width: `${(analysis.internalLinks / analysis.totalLinks) * 100}%` }}
                />
                <div 
                  className="bg-[#8b5cf6]" 
                  style={{ width: `${(analysis.externalLinks / analysis.totalLinks) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-1 text-xs text-[#6b7280]">
                <span>{analysis.internalLinks} internal</span>
                <span>{analysis.externalLinks} external</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-[#6b7280] mb-3 pt-3 border-t border-gray-100">
              <span>{analysis.client}</span>
              <span>{analysis.date}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="flex-1 bg-[#02a4bf] hover:bg-[#018a9f] text-white h-9"
                style={{ fontSize: '13px' }}
              >
                <Eye className="h-3 w-3 mr-1" />
                View Report
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-[#02a4bf] text-[#02a4bf] hover:bg-[#02a4bf]/10 h-9"
                style={{ fontSize: '13px' }}
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy Links
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
