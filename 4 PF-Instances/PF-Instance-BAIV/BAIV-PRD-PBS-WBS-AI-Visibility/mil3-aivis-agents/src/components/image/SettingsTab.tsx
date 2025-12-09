import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Progress } from '../ui/progress';
import { toast } from 'sonner';

export function SettingsTab() {
  const [primaryColor, setPrimaryColor] = useState('#0099b1');
  const [secondaryColor, setSecondaryColor] = useState('#ffb615');
  const [accentColor, setAccentColor] = useState('#231f20');
  const [defaultStyle, setDefaultStyle] = useState('silk_screen');
  const [defaultDimension, setDefaultDimension] = useState('square');
  const [autoSave, setAutoSave] = useState(true);
  const [includeAltText, setIncludeAltText] = useState(true);

  const handleSaveBrandColors = () => {
    toast.success('Brand colors saved successfully!');
  };

  const handleSavePreferences = () => {
    toast.success('Preferences saved successfully!');
  };

  return (
    <div className="max-w-[800px] mx-auto space-y-6">
      {/* Brand Settings */}
      <Card className="p-6 rounded-2xl shadow-sm">
        <h3 className="text-[#231f20] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
          Brand Colors
        </h3>
        <p className="text-sm text-[#6b7280] mb-6">
          These colors are automatically incorporated into generated images
        </p>

        <div className="space-y-6">
          {/* Primary Color */}
          <div>
            <Label className="font-bold text-sm mb-3 block">Primary Color (Teal)</Label>
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-full border-2 border-gray-200 cursor-pointer"
                style={{ backgroundColor: primaryColor }}
                onClick={() => document.getElementById('primary-color')?.click()}
              />
              <div className="flex-1">
                <Input
                  id="primary-color"
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-32 h-10"
                />
              </div>
              <Input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-32"
                placeholder="#0099b1"
              />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setPrimaryColor('#0099b1')}
                className="text-xs"
              >
                Reset to Default
              </Button>
            </div>
          </div>

          {/* Secondary Color */}
          <div>
            <Label className="font-bold text-sm mb-3 block">Secondary Color (Gold)</Label>
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-full border-2 border-gray-200 cursor-pointer"
                style={{ backgroundColor: secondaryColor }}
                onClick={() => document.getElementById('secondary-color')?.click()}
              />
              <div className="flex-1">
                <Input
                  id="secondary-color"
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-32 h-10"
                />
              </div>
              <Input
                type="text"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-32"
                placeholder="#ffb615"
              />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSecondaryColor('#ffb615')}
                className="text-xs"
              >
                Reset to Default
              </Button>
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <Label className="font-bold text-sm mb-3 block">Accent Color (Navy)</Label>
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-full border-2 border-gray-200 cursor-pointer"
                style={{ backgroundColor: accentColor }}
                onClick={() => document.getElementById('accent-color')?.click()}
              />
              <div className="flex-1">
                <Input
                  id="accent-color"
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-32 h-10"
                />
              </div>
              <Input
                type="text"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-32"
                placeholder="#231f20"
              />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setAccentColor('#231f20')}
                className="text-xs"
              >
                Reset to Default
              </Button>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleSaveBrandColors}
          className="mt-6 bg-[#02a4bf] hover:bg-[#018a9f] text-white h-11"
        >
          Save Brand Colors
        </Button>
      </Card>

      {/* Generation Preferences */}
      <Card className="p-6 rounded-2xl shadow-sm">
        <h3 className="text-[#231f20] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
          Default Settings
        </h3>
        <p className="text-sm text-[#6b7280] mb-6">
          Set default values for new generations
        </p>

        <div className="space-y-6">
          {/* Default Style */}
          <div>
            <Label className="mb-3 block">Default Style</Label>
            <Select value={defaultStyle} onValueChange={setDefaultStyle}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="silk_screen">Silk Screen</SelectItem>
                <SelectItem value="photorealistic">Photorealistic</SelectItem>
                <SelectItem value="illustration">Illustration</SelectItem>
                <SelectItem value="abstract">Abstract</SelectItem>
                <SelectItem value="minimalist">Minimalist</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Default Dimensions */}
          <div>
            <Label className="mb-3 block">Default Dimensions</Label>
            <div className="flex gap-3">
              {[
                { id: 'square', label: 'Square (1:1)' },
                { id: 'landscape', label: 'Landscape (16:9)' },
                { id: 'portrait', label: 'Portrait (9:16)' }
              ].map((dim) => (
                <button
                  key={dim.id}
                  onClick={() => setDefaultDimension(dim.id)}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                    defaultDimension === dim.id
                      ? 'border-[#02a4bf] bg-[#e6f7f9] text-[#02a4bf]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-medium">{dim.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Auto-save */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="block mb-1">Automatically save generated images</Label>
              <p className="text-xs text-[#6b7280]">Save all generated images to gallery</p>
            </div>
            <Switch checked={autoSave} onCheckedChange={setAutoSave} />
          </div>

          {/* Include Alt Text */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="block mb-1">Auto-generate SEO alt text</Label>
              <p className="text-xs text-[#6b7280]">Include descriptive alt text for accessibility</p>
            </div>
            <Switch checked={includeAltText} onCheckedChange={setIncludeAltText} />
          </div>
        </div>

        <Button 
          onClick={handleSavePreferences}
          className="mt-6 bg-[#02a4bf] hover:bg-[#018a9f] text-white h-11"
        >
          Save Preferences
        </Button>
      </Card>

      {/* Storage Management */}
      <Card className="p-6 rounded-2xl shadow-sm">
        <h3 className="text-[#231f20] mb-6" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
          Storage
        </h3>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#6b7280]">1.8 GB of 50 GB used</span>
            <span className="text-sm font-semibold text-[#10b981]">3.6%</span>
          </div>
          <Progress value={3.6} className="h-3" />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            Clean Up Old Images
          </Button>
          <Button variant="outline" className="flex-1">
            View Storage Details
          </Button>
        </div>
      </Card>

      {/* API Settings */}
      <Card className="p-6 rounded-2xl shadow-sm">
        <h3 className="text-[#231f20] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
          API Configuration
        </h3>
        <p className="text-sm text-[#6b7280] mb-6">
          Nano Banana integration settings
        </p>

        {/* API Info */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-sm mb-2">
            Using Google Gemini 2.5 Flash Image (Nano Banana 🍌)
          </p>
          <p className="text-xs text-[#6b7280] mb-2">
            Model version: gemini-2.5-flash-image
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#10b981] font-semibold">✓ Connected</span>
          </div>
        </div>

        {/* API Key */}
        <div className="mb-6">
          <Label className="mb-2 block">Google API Key</Label>
          <div className="flex gap-2">
            <Input
              type="password"
              value="••••••••••••••••••••••••"
              readOnly
              className="flex-1"
            />
            <Button variant="outline">
              Reveal
            </Button>
          </div>
          <Button 
            variant="outline" 
            className="mt-3 border-[#02a4bf] text-[#02a4bf]"
          >
            Test Connection
          </Button>
        </div>

        {/* Credits Info */}
        <div className="border-t pt-6">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-xs text-[#6b7280] mb-1">Current Balance</p>
              <p className="text-2xl font-bold text-[#02a4bf]">247</p>
              <p className="text-xs text-[#6b7280]">credits</p>
            </div>
            <div>
              <p className="text-xs text-[#6b7280] mb-1">Monthly Allowance</p>
              <p className="text-2xl font-bold">500</p>
              <p className="text-xs text-[#6b7280]">credits</p>
            </div>
            <div>
              <p className="text-xs text-[#6b7280] mb-1">Resets</p>
              <p className="text-2xl font-bold">15</p>
              <p className="text-xs text-[#6b7280]">days</p>
            </div>
          </div>
          <Button 
            variant="outline"
            className="w-full border-[#ffb615] text-[#ffb615] hover:bg-[#ffb615]/10"
          >
            Purchase More Credits
          </Button>
        </div>
      </Card>
    </div>
  );
}
