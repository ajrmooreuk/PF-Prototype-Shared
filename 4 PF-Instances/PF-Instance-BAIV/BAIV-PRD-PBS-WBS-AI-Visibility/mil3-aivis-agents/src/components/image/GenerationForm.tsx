import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Slider } from '../ui/slider';
import { Sparkles, ChevronDown } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

interface GenerationFormProps {
  onGenerate: (data: any) => void;
  isGenerating: boolean;
}

const STYLE_PRESETS = [
  {
    id: 'photorealistic',
    name: 'Photorealistic',
    description: 'Professional photography quality',
    icon: '📸'
  },
  {
    id: 'illustrated',
    name: 'Illustrated',
    description: 'Hand-drawn, artistic style',
    icon: '🎨'
  },
  {
    id: 'abstract',
    name: 'Abstract',
    description: 'Modern, creative design',
    icon: '✨'
  },
  {
    id: 'technical',
    name: 'Technical/Diagram',
    description: 'Clean, professional diagrams',
    icon: '📊'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple, clean aesthetic',
    icon: '⚪'
  },
  {
    id: 'bold_graphics',
    name: 'Bold Graphics',
    description: 'Vibrant, poster-style',
    icon: '🎯'
  }
];

const DIMENSION_OPTIONS = [
  {
    id: 'square',
    dimensions: '1024x1024',
    ratio: '1:1 Square',
    useCase: 'Social media, profile images',
    preview: { width: 100, height: 100 }
  },
  {
    id: 'landscape',
    dimensions: '1792x1024',
    ratio: '16:9 Landscape',
    useCase: 'Blog headers, presentations',
    preview: { width: 120, height: 67 }
  },
  {
    id: 'portrait',
    dimensions: '1024x1792',
    ratio: '9:16 Portrait',
    useCase: 'Mobile, stories, Pinterest',
    preview: { width: 67, height: 120 }
  }
];

const QUICK_TEMPLATES = [
  'Professional workspace with modern technology, teal and gold accents, minimalist style',
  'Diverse business team collaborating, modern office, professional attire',
  'Analytics dashboard with charts and graphs, teal color scheme, clean design',
  'Professional product photography, white background, studio lighting',
  'Abstract geometric patterns, teal and gold colors, modern aesthetic',
  'Inspiring business concept, bold composition, minimalist design'
];

export function GenerationForm({ onGenerate, isGenerating }: GenerationFormProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('photorealistic');
  const [selectedDimension, setSelectedDimension] = useState('square');
  const [autoEnhance, setAutoEnhance] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [variations, setVariations] = useState(1);
  const [seed, setSeed] = useState('');
  const [credits] = useState(247);

  const isValid = () => {
    return prompt.trim().length >= 10 && credits >= variations;
  };

  const handleGenerate = () => {
    if (isValid()) {
      onGenerate({
        prompt,
        style: selectedStyle,
        dimensions: DIMENSION_OPTIONS.find(d => d.id === selectedDimension)?.dimensions,
        autoEnhance,
        variations,
        seed: seed || undefined
      });
    }
  };

  const insertTemplate = (template: string) => {
    setPrompt(template);
  };

  return (
    <Card className="p-6 rounded-2xl shadow-sm">
      {/* Section 1: Image Prompt */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🎨</span>
          <div>
            <h3 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
              Image Description
            </h3>
            <p className="text-[#6b7280] text-xs" style={{ fontFamily: 'Open Sans' }}>
              Describe the image you want to create
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your image in detail... (e.g., Professional B2B marketing team collaborating around a modern workspace with laptops and data dashboards, teal and gold color scheme)"
            rows={6}
            maxLength={2000}
            className="w-full text-base"
            style={{ fontFamily: 'Open Sans' }}
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-[#6b7280]">
              Be specific for better results. Brand colors will be automatically incorporated.
            </p>
            <span className="text-xs text-[#6b7280]">
              {prompt.length}/2000
            </span>
          </div>
        </div>

        {/* Quick Templates */}
        <div className="mt-4">
          <Label className="text-xs text-[#6b7280] mb-2 block">Quick Templates</Label>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {QUICK_TEMPLATES.map((template, idx) => (
              <button
                key={idx}
                onClick={() => insertTemplate(template)}
                className="px-3 py-2 bg-gray-100 hover:bg-[#e6f7f9] rounded-full text-xs whitespace-nowrap transition-colors"
                style={{ fontFamily: 'Open Sans' }}
              >
                {template.split(',')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Auto-enhance */}
        <div className="mt-3 flex items-center gap-2">
          <Checkbox 
            checked={autoEnhance}
            onCheckedChange={(checked) => setAutoEnhance(checked as boolean)}
          />
          <Label className="text-sm cursor-pointer">
            Auto-enhance prompt with brand voice
          </Label>
        </div>
        <p className="text-xs text-[#6b7280] ml-6 mt-1">
          Adds professional terminology and style guidance
        </p>
      </div>

      {/* Section 2: Style Presets */}
      <div className="border-t border-gray-200 pt-6 mb-6">
        <h4 className="text-[#231f20] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
          Visual Style
        </h4>
        <p className="text-xs text-[#6b7280] mb-4">Choose your artistic direction</p>

        <div className="grid grid-cols-2 gap-3">
          {STYLE_PRESETS.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer text-left ${
                selectedStyle === style.id
                  ? 'border-[#2990C6] bg-[#e6f7f9]'
                  : 'border-gray-200 bg-white hover:border-[#2990C6]/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">{style.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[#231f20] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                    {style.name}
                  </div>
                  <div className="text-xs text-[#6b7280]" style={{ fontFamily: 'Open Sans' }}>
                    {style.description}
                  </div>
                </div>
                <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mt-0.5 ${
                  selectedStyle === style.id
                    ? 'bg-[#2990C6] border-[#2990C6]'
                    : 'bg-white border-gray-300'
                }`}>
                  {selectedStyle === style.id && (
                    <svg className="w-full h-full text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Section 3: Dimensions */}
      <div className="border-t border-gray-200 pt-6 mb-6">
        <Label className="mb-4 block">Image Size & Ratio</Label>
        <div className="grid grid-cols-3 gap-3">
          {DIMENSION_OPTIONS.map((dim) => (
            <button
              key={dim.id}
              onClick={() => setSelectedDimension(dim.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedDimension === dim.id
                  ? 'border-[#02a4bf] bg-[#e6f7f9] text-[#02a4bf]'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center mb-3">
                <div 
                  className="bg-gray-300 rounded"
                  style={{ 
                    width: `${dim.preview.width}px`, 
                    height: `${dim.preview.height}px` 
                  }}
                />
              </div>
              <div className="text-sm font-bold mb-1">{dim.dimensions.split('x').join(' × ')}</div>
              <div className="text-xs text-[#6b7280] mb-1">{dim.ratio}</div>
              <div className="text-xs text-[#6b7280] italic">{dim.useCase}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Section 4: Brand Colors */}
      <div className="bg-[#e6f7f9] rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-xl">🎨</span>
          <div className="flex-1">
            <h5 className="text-[#231f20] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
              Brand Colors Included
            </h5>
            <p className="text-xs text-[#6b7280] mb-3">
              Your brand colors will be automatically incorporated into the image
            </p>
            <div className="flex gap-3">
              {[
                { color: '#34ACE2', name: 'Blue' },
                { color: '#000000', name: 'Black' },
                { color: '#FFFFFF', name: 'White' }
              ].map((item) => (
                <div key={item.color} className="text-center">
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white mb-1"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-[#6b7280]">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Advanced Options */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced} className="mb-6">
        <CollapsibleTrigger className="flex items-center gap-2 text-[#02a4bf] hover:text-[#018a9f]">
          <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          Show Advanced Options
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-4 space-y-4 border-t pt-4">
          {/* Variations */}
          <div>
            <Label className="mb-3 block">Generate Multiple Variations</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[variations]}
                onValueChange={(v) => setVariations(v[0])}
                min={1}
                max={4}
                step={1}
                className="flex-1"
              />
              <span className="text-2xl font-bold text-[#02a4bf] w-20 text-right">
                {variations} {variations === 1 ? 'image' : 'images'}
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-xs text-[#6b7280]">
                Generate up to 4 variations at once
              </p>
              <p className="text-xs text-[#e84e1c]">
                Cost: {variations} {variations === 1 ? 'credit' : 'credits'} per generation
              </p>
            </div>
          </div>

          {/* Seed */}
          <div>
            <Label className="mb-2 block">Seed (for reproducibility)</Label>
            <Input
              type="number"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              placeholder="Random"
              className="w-32"
            />
            <p className="text-xs text-[#6b7280] mt-1">
              Use same seed to recreate similar images
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Generate Button */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-[#6b7280]">{variations} {variations === 1 ? 'credit' : 'credits'}</p>
            <p className="text-xs text-[#6b7280]">Credits: {credits} remaining</p>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={!isValid() || isGenerating}
            className="bg-[#02a4bf] hover:bg-[#018a9f] text-white disabled:bg-gray-300 disabled:cursor-not-allowed px-8"
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', height: '52px', minWidth: '220px' }}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Image
              </>
            )}
          </Button>
        </div>
        {isGenerating && (
          <p className="text-center text-xs text-[#6b7280]">
            ~5-15 seconds per image
          </p>
        )}
      </div>
    </Card>
  );
}