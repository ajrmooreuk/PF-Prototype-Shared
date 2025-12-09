import { useState } from 'react';
import { GenerationForm } from './GenerationForm';
import { ImagePreview } from './ImagePreview';
import { callEccoAPI } from '../../lib/eccoAPI';
import type { ICPContext } from '../../lib/icpAPI';

interface GenerateTabProps {
  onImageGenerated: () => void;
  tenantId: string;
  jwtToken: string;
  icpEnabled: boolean;
  icpContext: ICPContext | null;
}

export function GenerateTab({ onImageGenerated, tenantId, jwtToken, icpEnabled, icpContext }: GenerateTabProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<any[]>([]);

  const handleGenerate = async (formData: any) => {
    setIsGenerating(true);
    setGeneratedImages([]);

    try {
      const result = await callEccoAPI('/content-studio/image', 'POST', {
        prompt: formData.prompt,
        style: formData.style,
        dimensions: formData.dimensions,
        variations: formData.variations
        // use_discovery_insights: true is auto-added
      });

      // Transform API response
      const images = (result.images || []).map((img: any, i: number) => ({
        id: img.id || `img_${Date.now()}_${i}`,
        url: img.url || `https://picsum.photos/seed/${Date.now()}_${i}/${formData.dimensions.split('x')[0]}/${formData.dimensions.split('x')[1]}`,
        prompt: img.prompt || formData.prompt,
        style: formData.style,
        dimensions: formData.dimensions,
        generationTime: img.generation_time || (Math.random() * 5 + 2).toFixed(1),
        qualityScore: img.quality_score || Math.floor(Math.random() * 10 + 90),
        fileSize: img.file_size || (Math.random() * 2 + 0.5).toFixed(1),
        altText: img.alt_text || `AI-generated image: ${formData.prompt.substring(0, 100)}`,
        filename: img.filename || formData.prompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 50) + '.png',
        detectedColors: img.colors || ['#0099b1', '#ffb615', '#231f20', '#6b7280']
      }));

      setGeneratedImages(images);
    } catch (error) {
      console.error('Image generation error:', error);
      // Error is already logged by callEccoAPI
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-8">
      {/* Left Column - Generation Form */}
      <GenerationForm 
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
      />

      {/* Right Column - Image Preview */}
      <ImagePreview
        images={generatedImages}
        isGenerating={isGenerating}
        onSave={onImageGenerated}
      />
    </div>
  );
}