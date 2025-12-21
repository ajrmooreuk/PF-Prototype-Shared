import { useState } from 'react';
import { X, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Checkbox } from '../../ui/checkbox';
import { ScrollArea } from '../../ui/scroll-area';

interface NewIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

const themes = [
  { id: 'educate', icon: '📚', label: 'Educate' },
  { id: 'engage', icon: '💬', label: 'Engage' },
  { id: 'entertain', icon: '🎉', label: 'Entertain' },
  { id: 'empower', icon: '💪', label: 'Empower' },
];

const platforms = [
  { id: 'linkedin', icon: '💼', label: 'LinkedIn' },
  { id: 'twitter', icon: '🐦', label: 'Twitter' },
  { id: 'facebook', icon: '📘', label: 'Facebook' },
  { id: 'instagram', icon: '📷', label: 'Instagram' },
];

export function NewIdeaModal({ isOpen, onClose, onCreate }: NewIdeaModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'educate',
    description: '',
    content_preview: '',
    priority: 3,
    themes: [] as string[],
    platforms: [] as string[],
  });

  const togglePlatform = (platformId: string) => {
    if (formData.platforms.includes(platformId)) {
      setFormData({ ...formData, platforms: formData.platforms.filter(p => p !== platformId) });
    } else {
      setFormData({ ...formData, platforms: [...formData.platforms, platformId] });
    }
  };

  const handleCreate = (status: 'draft' | 'ready') => {
    onCreate({
      ...formData,
      status,
      source_type: 'manual',
    });
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      category: 'educate',
      description: '',
      content_preview: '',
      priority: 3,
      themes: [],
      platforms: [],
    });
    onClose();
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className="w-6 h-6 cursor-pointer transition-colors"
        fill={i < formData.priority ? '#ffb615' : 'none'}
        stroke={i < formData.priority ? '#ffb615' : '#d1d5db'}
        onClick={() => setFormData({ ...formData, priority: i + 1 })}
      />
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[700px] p-0 gap-0">
        <DialogTitle className="sr-only">Create New Idea</DialogTitle>
        <DialogDescription className="sr-only">
          Create a new social media content idea with title, theme, description, and target platforms
        </DialogDescription>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
              Create New Idea
            </h2>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="max-h-[60vh] p-6">
          <div className="space-y-5">
            {/* Title */}
            <div>
              <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                Title <span className="text-orange-500">*</span>
              </Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., 5 Marketing Metrics Every B2B Should Track"
                className="mt-2"
              />
            </div>

            {/* Theme Selection */}
            <div>
              <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                Theme <span className="text-orange-500">*</span>
              </Label>
              <RadioGroup
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                className="grid grid-cols-2 gap-3 mt-2"
              >
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.category === theme.id
                        ? 'border-[#02a4bf] bg-[#f0f9fb]'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <RadioGroupItem value={theme.id} id={theme.id} />
                    <label htmlFor={theme.id} className="flex items-center gap-2 cursor-pointer flex-1">
                      <span className="text-lg">{theme.icon}</span>
                      <span style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>{theme.label}</span>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Description */}
            <div>
              <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                Description
              </Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief overview of what this idea covers..."
                rows={3}
                className="mt-2"
              />
            </div>

            {/* Content Preview */}
            <div>
              <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                Post Preview
              </Label>
              <Textarea
                value={formData.content_preview}
                onChange={(e) => setFormData({ ...formData, content_preview: e.target.value })}
                placeholder="Write the actual post content that will be published..."
                rows={5}
                className="mt-2"
              />
            </div>

            {/* Priority */}
            <div>
              <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                Priority
              </Label>
              <div className="flex items-center gap-1 mt-2">{renderStars()}</div>
            </div>

            {/* Platforms */}
            <div>
              <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                Target Platforms
              </Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.platforms.includes(platform.id)
                        ? 'border-[#02a4bf] bg-[#f0f9fb]'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Checkbox
                      checked={formData.platforms.includes(platform.id)}
                      onCheckedChange={() => togglePlatform(platform.id)}
                    />
                    <span className="text-lg">{platform.icon}</span>
                    <span style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>{platform.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex gap-2">
          <Button
            onClick={handleClose}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleCreate('draft')}
            disabled={!formData.title.trim()}
            variant="outline"
            className="flex-1 border-[#02a4bf] text-[#02a4bf] hover:bg-[#f0f9fb]"
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => handleCreate('ready')}
            disabled={!formData.title.trim()}
            className="flex-1 bg-[#02a4bf] hover:bg-[#028a9f] text-white"
          >
            Mark as Ready
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
