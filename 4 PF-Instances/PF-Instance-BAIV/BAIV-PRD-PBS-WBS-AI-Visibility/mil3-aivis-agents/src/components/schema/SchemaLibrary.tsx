import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Eye, Copy, Download, Trash2, MoreVertical, Grid3x3, List } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { SCHEMA_TYPES } from './schemaTypes';

interface SchemaLibraryProps {
  onGenerateNew: () => void;
}

export function SchemaLibrary({ onGenerateNew }: SchemaLibraryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data
  const mockSchemas = [
    {
      id: 'schema_1',
      type: 'Article',
      name: 'The Ultimate Guide to Email Marketing',
      client: 'Acme Corp',
      status: 'valid',
      created: 'Nov 10',
      preview: '{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  ...'
    },
    {
      id: 'schema_2',
      type: 'Product',
      name: 'Premium Wireless Headphones',
      client: 'TechStart Inc',
      status: 'valid',
      created: 'Nov 9',
      preview: '{\n  "@context": "https://schema.org",\n  "@type": "Product",\n  ...'
    },
    {
      id: 'schema_3',
      type: 'FAQPage',
      name: 'Frequently Asked Questions',
      client: 'Global Solutions',
      status: 'valid',
      created: 'Nov 8',
      preview: '{\n  "@context": "https://schema.org",\n  "@type": "FAQPage",\n  ...'
    }
  ];

  const getSchemaConfig = (type: string) => {
    return SCHEMA_TYPES.find(t => t.id === type);
  };

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#02a4bf]/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <div className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}>
                15
              </div>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Total Schemas
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#10b981]/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">✓</span>
            </div>
            <div>
              <div className="text-[#10b981]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}>
                14
              </div>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Valid & Ready
              </p>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                93%
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
              placeholder="Search schemas..."
              className="pl-10 rounded-lg"
              style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
            />
          </div>

          {/* Type Filter */}
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {SCHEMA_TYPES.map(type => (
                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
              ))}
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
              <SelectItem value="type">Type A-Z</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
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
          Showing {mockSchemas.length} schemas
        </p>
      </Card>

      {/* Schemas Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' : 'space-y-4'}>
        {mockSchemas.map((schema) => {
          const config = getSchemaConfig(schema.type);
          
          return (
            <Card 
              key={schema.id}
              className="p-5 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{config?.icon}</span>
                  <Badge 
                    className="text-white text-xs"
                    style={{ backgroundColor: config?.color }}
                  >
                    {config?.name}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#10b981] text-white text-xs">
                    Valid ✓
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
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Download JSON
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

              {/* Name */}
              <h3 
                className="text-[#231f20] mb-3 line-clamp-2"
                style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}
              >
                {schema.name}
              </h3>

              {/* Preview */}
              <div className="bg-[#f9fafb] rounded-lg p-3 mb-3">
                <pre className="text-xs text-gray-600 overflow-hidden" style={{ fontFamily: 'Roboto Mono', lineHeight: '1.4' }}>
                  {schema.preview}
                </pre>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-[#6b7280] mb-3 pt-3 border-t border-gray-100">
                <span>{schema.client}</span>
                <span>{schema.created}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-[#02a4bf] hover:bg-[#018a9f] text-white h-9"
                  style={{ fontSize: '13px' }}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View JSON
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-[#02a4bf] text-[#02a4bf] hover:bg-[#02a4bf]/10 h-9"
                  style={{ fontSize: '13px' }}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
