import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Download, Save, FileText, Copy, RefreshCw, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { toast } from 'sonner';

interface ImagePreviewProps {
  images: any[];
  isGenerating: boolean;
  onSave: () => void;
}

const LOADING_MESSAGES = [
  'Analyzing prompt...',
  'Applying style preset...',
  'Incorporating brand colors...',
  'Rendering final image...'
];

export function ImagePreview({ images, isGenerating, onSave }: ImagePreviewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [altText, setAltText] = useState('');
  const [filename, setFilename] = useState('');
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const currentImage = images[selectedImageIndex];

  // Rotate loading messages
  useState(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  });

  // Update alt text and filename when image changes
  useState(() => {
    if (currentImage) {
      setAltText(currentImage.altText);
      setFilename(currentImage.filename);
    }
  });

  const handleDownload = (format: string = 'png') => {
    toast.success(`Downloading as ${format.toUpperCase()}...`);
  };

  const handleSaveToGallery = () => {
    toast.success('Saved to gallery!');
    onSave();
  };

  const handleCopyPrompt = () => {
    if (currentImage) {
      navigator.clipboard.writeText(currentImage.prompt);
      toast.success('Prompt copied to clipboard!');
    }
  };

  if (!images.length && !isGenerating) {
    return (
      <Card className="p-6 rounded-2xl shadow-sm h-fit sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
            Preview
          </h3>
          <Badge className="bg-[#ffb615] text-white text-xs">
            Nano Banana 🍌
          </Badge>
        </div>

        <div className="flex flex-col items-center justify-center py-32">
          <span className="text-8xl mb-4">🖼️</span>
          <p className="text-sm text-[#6b7280]">
            Your generated image will appear here
          </p>
          <div className="mt-8 w-full max-w-sm aspect-square border-2 border-dashed border-gray-300 rounded-lg" />
        </div>
      </Card>
    );
  }

  if (isGenerating) {
    return (
      <Card className="p-6 rounded-2xl shadow-sm h-fit sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
            Preview
          </h3>
          <Badge className="bg-[#ffb615] text-white text-xs">
            Nano Banana 🍌
          </Badge>
        </div>

        <div className="flex flex-col items-center justify-center py-32">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#02a4bf] mb-6" />
          <p className="text-sm text-[#6b7280] font-medium">
            {LOADING_MESSAGES[loadingMessageIndex]}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 rounded-2xl shadow-sm h-fit sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
          Preview
        </h3>
        <Badge className="bg-[#ffb615] text-white text-xs">
          Nano Banana 🍌
        </Badge>
      </div>

      {/* Image Display */}
      {images.length === 1 ? (
        <div className="mb-4">
          <img 
            src={currentImage.url} 
            alt={currentImage.altText}
            className="w-full rounded-lg shadow-md"
            style={{ maxHeight: '600px', objectFit: 'contain' }}
          />
        </div>
      ) : (
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-3">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative rounded-lg overflow-hidden ${
                  selectedImageIndex === idx ? 'ring-3 ring-[#02a4bf]' : ''
                }`}
              >
                <img 
                  src={img.url} 
                  alt={img.altText}
                  className="w-full h-full object-cover aspect-square"
                />
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-[#6b7280] mt-2">
            Click to select • {selectedImageIndex + 1} of {images.length}
          </p>
        </div>
      )}

      {/* Metadata */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[#6b7280]">Generation time:</span>
            <span className="ml-1 font-semibold">{currentImage.generationTime}s</span>
          </div>
          <div>
            <span className="text-[#6b7280]">Quality score:</span>
            <span className="ml-1 font-semibold text-[#10b981]">{currentImage.qualityScore}%</span>
          </div>
          <div>
            <span className="text-[#6b7280]">File size:</span>
            <span className="ml-1 font-semibold">{currentImage.fileSize} MB</span>
          </div>
          <div>
            <span className="text-[#6b7280]">Format:</span>
            <span className="ml-1 font-semibold">PNG</span>
          </div>
          <div>
            <span className="text-[#6b7280]">Dimensions:</span>
            <span className="ml-1 font-semibold">{currentImage.dimensions.split('x').join(' × ')}</span>
          </div>
          <div>
            <span className="text-[#6b7280]">Model:</span>
            <span className="ml-1 font-semibold text-xs">Gemini 2.5</span>
          </div>
        </div>
      </div>

      {/* Alt Text */}
      <div className="mb-4">
        <Label className="text-xs font-bold mb-2 block">SEO Alt Text</Label>
        <Textarea
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          rows={3}
          maxLength={150}
          className="text-sm"
        />
        <div className="flex justify-between mt-1">
          <p className="text-xs text-[#6b7280]">Edit for better SEO</p>
          <span className="text-xs text-[#6b7280]">{altText.length}/150</span>
        </div>
      </div>

      {/* Filename */}
      <div className="mb-4">
        <Label className="text-xs font-bold mb-2 block">Filename</Label>
        <Input
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          className="text-sm"
        />
      </div>

      {/* Detected Colors */}
      <div className="mb-4">
        <Label className="text-xs font-bold mb-2 block">Detected Colors</Label>
        <div className="flex gap-2">
          {currentImage.detectedColors.map((color: string, idx: number) => (
            <div key={idx} className="group relative">
              <div 
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm cursor-pointer"
                style={{ backgroundColor: color }}
                title={color}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full bg-[#02a4bf] hover:bg-[#018a9f] text-white h-11">
              <Download className="h-4 w-4 mr-2" />
              Download Image
              <ChevronDown className="h-4 w-4 ml-auto" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => handleDownload('png')}>
              Download PNG (recommended)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownload('jpeg')}>
              Download JPEG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownload('webp')}>
              Download WebP
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          onClick={handleSaveToGallery}
          variant="outline" 
          className="w-full border-[#02a4bf] text-[#02a4bf] hover:bg-[#02a4bf]/10 h-11"
        >
          <Save className="h-4 w-4 mr-2" />
          Save to Gallery
        </Button>

        <Button 
          variant="outline" 
          className="w-full border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6]/10 h-11"
        >
          <FileText className="h-4 w-4 mr-2" />
          Insert into Blog
        </Button>

        <Button 
          onClick={handleCopyPrompt}
          variant="outline" 
          className="w-full h-11"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Prompt
        </Button>
      </div>

      {/* Regenerate Options */}
      <div className="border-t border-gray-200 mt-6 pt-4">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 border-[#02a4bf] text-[#02a4bf] text-xs h-9"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Regenerate
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 text-xs h-9"
          >
            <Sparkles className="h-3 w-3 mr-1" />
            Generate Variation
          </Button>
        </div>
      </div>
    </Card>
  );
}
