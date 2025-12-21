import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Download, Eye, Share2, MoreVertical, FileText, Copy, RefreshCw, Trash2 } from 'lucide-react';

interface ImageCardProps {
  image: any;
  viewMode: 'grid' | 'list';
  styleColor: string;
  styleName: string;
}

export function ImageCard({ image, viewMode, styleColor, styleName }: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (viewMode === 'list') {
    return (
      <Card className="p-3 hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-4">
          {/* Thumbnail */}
          <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
            <img 
              src={image.url} 
              alt={image.altText}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Prompt */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{image.prompt}</p>
            <p className="text-xs text-[#6b7280] truncate">{image.altText}</p>
          </div>

          {/* Style */}
          <Badge className={`${styleColor} text-white text-xs`}>
            {styleName}
          </Badge>

          {/* Size */}
          <div className="text-sm text-[#6b7280] w-24">
            {image.dimensions.split('x').join(' × ')}
          </div>

          {/* Date */}
          <div className="text-sm text-[#6b7280] w-20">
            {image.date}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-200 rounded">
              <Download className="h-4 w-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded">
              <Eye className="h-4 w-4 text-gray-600" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-gray-200 rounded">
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  Use in Blog
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Prompt
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate Similar
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
      </Card>
    );
  }

  return (
    <Card 
      className="rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-200 overflow-hidden">
        <img 
          src={image.url} 
          alt={image.altText}
          className="w-full h-full object-cover"
        />

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-between p-4 transition-opacity">
            {/* Style Badge */}
            <div className="w-full flex justify-start">
              <Badge className={`${styleColor} text-white text-xs`}>
                {styleName}
              </Badge>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Download className="h-5 w-5 text-gray-700" />
              </button>
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Eye className="h-5 w-5 text-gray-700" />
              </button>
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Share2 className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            {/* Metadata */}
            <div className="w-full flex justify-between items-center">
              <Badge variant="secondary" className="bg-white/90 text-black text-xs">
                {image.dimensions.split('x').join('×')}
              </Badge>
              <span className="text-white text-xs">{image.date}</span>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="p-3 bg-white">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate mb-1">
              {image.prompt}
            </p>
            <p className="text-xs text-[#6b7280] truncate">
              {image.altText}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 hover:bg-gray-100 rounded flex-shrink-0">
                <MoreVertical className="h-4 w-4 text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                Use in Blog
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Copy Prompt
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate Similar
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
    </Card>
  );
}
