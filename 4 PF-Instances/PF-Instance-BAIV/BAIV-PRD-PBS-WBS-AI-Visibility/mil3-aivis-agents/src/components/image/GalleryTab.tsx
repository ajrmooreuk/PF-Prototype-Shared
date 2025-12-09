import { useState } from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, Grid3x3, List, Image as ImageIcon, Calendar, HardDrive, Sparkles } from 'lucide-react';
import { ImageCard } from './ImageCard';

interface GalleryTabProps {
  onGenerateNew: () => void;
}

export function GalleryTab({ onGenerateNew }: GalleryTabProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock gallery data
  const mockImages = Array.from({ length: 12 }, (_, i) => ({
    id: `img_${i}`,
    url: `https://picsum.photos/seed/${i}/400/400`,
    prompt: `Professional ${['workspace', 'team collaboration', 'data visualization', 'product showcase'][i % 4]} with modern technology`,
    altText: `AI-generated professional business image ${i + 1}`,
    style: ['silk_screen', 'photorealistic', 'illustration', 'abstract', 'minimalist'][i % 5],
    dimensions: ['1024x1024', '1792x1024', '1024x1792'][i % 3],
    fileSize: (Math.random() * 2 + 0.5).toFixed(1),
    date: `Nov ${10 - Math.floor(i / 3)}`,
    usedCount: Math.floor(Math.random() * 20)
  }));

  const getStyleColor = (style: string) => {
    const colors: { [key: string]: string } = {
      silk_screen: 'bg-[#e84e1c]',
      photorealistic: 'bg-[#10b981]',
      illustration: 'bg-[#8b5cf6]',
      abstract: 'bg-[#f59e0b]',
      minimalist: 'bg-[#02a4bf]'
    };
    return colors[style] || 'bg-gray-500';
  };

  const getStyleName = (style: string) => {
    return style.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card className="p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#02a4bf]/10 rounded-full flex items-center justify-center">
              <ImageIcon className="h-6 w-6 text-[#02a4bf]" />
            </div>
            <div>
              <div className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}>
                145
              </div>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Total Images
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#8b5cf6]/10 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-[#8b5cf6]" />
            </div>
            <div>
              <div className="text-[#8b5cf6]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}>
                23
              </div>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Generated This Month
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#e84e1c]/10 rounded-full flex items-center justify-center">
              <HardDrive className="h-6 w-6 text-[#e84e1c]" />
            </div>
            <div>
              <div className="text-[#e84e1c]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}>
                1.8 GB
              </div>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Total Storage Used
              </p>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '11px' }}>
                of 50 GB limit
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#ffb615]/10 rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-[#ffb615]" />
            </div>
            <div>
              <div className="text-[#ffb615]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}>
                253
              </div>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                Credits Used
              </p>
              <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '11px' }}>
                this month
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
              placeholder="Search by prompt or filename..."
              className="pl-10 rounded-lg"
              style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
            />
          </div>

          {/* Style Filter */}
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Styles</SelectItem>
              <SelectItem value="silk_screen">Silk Screen (45)</SelectItem>
              <SelectItem value="photorealistic">Photorealistic (32)</SelectItem>
              <SelectItem value="illustration">Illustration (28)</SelectItem>
              <SelectItem value="abstract">Abstract (24)</SelectItem>
              <SelectItem value="minimalist">Minimalist (16)</SelectItem>
            </SelectContent>
          </Select>

          {/* Dimension Filter */}
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              <SelectItem value="square">Square (1:1)</SelectItem>
              <SelectItem value="landscape">Landscape (16:9)</SelectItem>
              <SelectItem value="portrait">Portrait (9:16)</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select defaultValue="newest">
            <SelectTrigger className="w-[140px] rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="most-used">Most Used</SelectItem>
              <SelectItem value="file-size">File Size</SelectItem>
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
          Showing {mockImages.length} images
        </p>
      </Card>

      {/* Gallery Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-4'}>
        {mockImages.map((image) => (
          <ImageCard 
            key={image.id}
            image={image}
            viewMode={viewMode}
            styleColor={getStyleColor(image.style)}
            styleName={getStyleName(image.style)}
          />
        ))}
      </div>
    </div>
  );
}
