import { useState } from 'react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Slider } from '../ui/slider';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';

interface Step5Props {
  data: any;
  updateData: (updates: any) => void;
}

export function Step5BrandVoice({ data, updateData }: Step5Props) {
  const [expertiseInput, setExpertiseInput] = useState('');

  const handleExpertiseKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && expertiseInput.trim()) {
      e.preventDefault();
      if (data.expertiseAreas.length < 3 && !data.expertiseAreas.includes(expertiseInput.trim())) {
        updateData({
          expertiseAreas: [...data.expertiseAreas, expertiseInput.trim()]
        });
        setExpertiseInput('');
      }
    }
  };

  const removeExpertise = (area: string) => {
    updateData({
      expertiseAreas: data.expertiseAreas.filter((a: string) => a !== area)
    });
  };

  const getFormalityLabel = (value: number) => {
    const labels = ['Casual & Friendly', 'Conversational', 'Professional', 'Formal', 'Very Formal'];
    return labels[value - 1];
  };

  const getEnergyLabel = (value: number) => {
    const labels = ['Calm & Reserved', 'Gentle', 'Balanced', 'Upbeat', 'Enthusiastic'];
    return labels[value - 1];
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 
          className="text-[#111827] mb-2"
          style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}
        >
          Tell us about your brand voice
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          This helps us generate content that sounds like your brand
        </p>
      </div>

      {/* Brand Voice Description */}
      <div className="space-y-2">
        <Label htmlFor="brandVoice" className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          How would you describe your brand's voice? <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="brandVoice"
          value={data.brandVoiceDescription}
          onChange={(e) => updateData({ brandVoiceDescription: e.target.value })}
          placeholder="We're professional yet approachable, using evidence-based language while remaining accessible to everyday consumers..."
          minLength={100}
          maxLength={500}
          rows={5}
          className="text-base resize-none"
          style={{ fontFamily: 'Open Sans' }}
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500" style={{ fontFamily: 'Open Sans' }}>
            Describe your tone, style, and how you communicate
          </p>
          <p className={`text-xs ${
            data.brandVoiceDescription.length < 100 || data.brandVoiceDescription.length > 500 
              ? 'text-red-500' 
              : 'text-green-600'
          }`} style={{ fontFamily: 'Open Sans' }}>
            {data.brandVoiceDescription.length}/500
          </p>
        </div>
      </div>

      {/* Formality Slider */}
      <div className="space-y-3">
        <Label className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          How formal is your communication? <span className="text-red-500">*</span>
        </Label>
        <div className="px-2">
          <Slider
            value={[data.formality]}
            onValueChange={(value) => updateData({ formality: value[0] })}
            min={1}
            max={5}
            step={1}
            className="w-full"
          />
        </div>
        <div className="flex items-center justify-between text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>
          <span>Casual</span>
          <span className="font-semibold text-blue-600">{getFormalityLabel(data.formality)}</span>
          <span>Very Formal</span>
        </div>
      </div>

      {/* Energy Slider */}
      <div className="space-y-3">
        <Label className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          What's your brand's energy level? <span className="text-red-500">*</span>
        </Label>
        <div className="px-2">
          <Slider
            value={[data.energy]}
            onValueChange={(value) => updateData({ energy: value[0] })}
            min={1}
            max={5}
            step={1}
            className="w-full"
          />
        </div>
        <div className="flex items-center justify-between text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>
          <span>Calm</span>
          <span className="font-semibold text-blue-600">{getEnergyLabel(data.energy)}</span>
          <span>Enthusiastic</span>
        </div>
      </div>

      {/* Professional Bio */}
      <div className="space-y-2">
        <Label htmlFor="professionalBio" className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          Tell us about your expertise <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="professionalBio"
          value={data.professionalBio}
          onChange={(e) => updateData({ professionalBio: e.target.value })}
          placeholder="I'm the founder and CEO of Foot Scientific. I've spent 15 years in podiatric research..."
          minLength={100}
          maxLength={300}
          rows={4}
          className="text-base resize-none"
          style={{ fontFamily: 'Open Sans' }}
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500" style={{ fontFamily: 'Open Sans' }}>
            This helps establish your authority in content
          </p>
          <p className={`text-xs ${
            data.professionalBio.length < 100 || data.professionalBio.length > 300 
              ? 'text-red-500' 
              : 'text-green-600'
          }`} style={{ fontFamily: 'Open Sans' }}>
            {data.professionalBio.length}/300
          </p>
        </div>
      </div>

      {/* Expertise Areas */}
      <div className="space-y-2">
        <Label htmlFor="expertise" className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          What are your main areas of expertise? <span className="text-red-500">*</span>
        </Label>
        <Input
          id="expertise"
          value={expertiseInput}
          onChange={(e) => setExpertiseInput(e.target.value)}
          onKeyDown={handleExpertiseKeyDown}
          placeholder="Type an area and press Enter"
          disabled={data.expertiseAreas.length >= 3}
          className="text-base"
          style={{ fontFamily: 'Open Sans' }}
        />
        <p className="text-xs text-gray-500" style={{ fontFamily: 'Open Sans' }}>
          Choose 1-3 areas where you're an expert ({data.expertiseAreas.length}/3)
        </p>

        {/* Expertise Tags */}
        {data.expertiseAreas.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {data.expertiseAreas.map((area: string, index: number) => (
              <Badge
                key={index}
                className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-3 py-1 flex items-center gap-2"
                style={{ fontFamily: 'Open Sans' }}
              >
                {area}
                <button
                  onClick={() => removeExpertise(area)}
                  className="hover:bg-purple-300 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Example */}
        {data.expertiseAreas.length === 0 && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
              Example areas:
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-gray-200 text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                podiatry
              </Badge>
              <Badge className="bg-gray-200 text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                biomechanics
              </Badge>
              <Badge className="bg-gray-200 text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                orthotic design
              </Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
