import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Checkbox } from '../../ui/checkbox';

interface SchedulePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
  connectedPlatforms: string[];
  onSchedule: (data: any) => void;
}

const platformInfo: { [key: string]: { name: string; icon: string } } = {
  linkedin: { name: 'LinkedIn', icon: '💼' },
  twitter: { name: 'Twitter/X', icon: '🐦' },
  facebook: { name: 'Facebook', icon: '📘' },
  instagram: { name: 'Instagram', icon: '📷' },
};

export function SchedulePostModal({
  isOpen,
  onClose,
  selectedDate,
  connectedPlatforms,
  onSchedule,
}: SchedulePostModalProps) {
  const [date, setDate] = useState(
    selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  );
  const [time, setTime] = useState('10:00');
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [link, setLink] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handlePlatformToggle = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleHashtagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && hashtagInput.trim()) {
      e.preventDefault();
      if (hashtags.length >= 10) {
        setErrors({ ...errors, hashtags: 'Maximum 10 hashtags allowed' });
        return;
      }
      setHashtags([...hashtags, hashtagInput.trim().replace(/^#/, '')]);
      setHashtagInput('');
      setErrors({ ...errors, hashtags: '' });
    }
  };

  const removeHashtag = (index: number) => {
    setHashtags(hashtags.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!content.trim()) {
      newErrors.content = 'Content is required';
    } else if (content.length > 2200) {
      newErrors.content = 'Content exceeds maximum length';
    }

    if (selectedPlatforms.length === 0) {
      newErrors.platforms = 'Select at least one platform';
    }

    const scheduledDateTime = new Date(`${date}T${time}`);
    if (scheduledDateTime <= new Date()) {
      newErrors.datetime = 'Schedule time must be in the future';
    }

    if (link && !link.match(/^https?:\/\/.+/)) {
      newErrors.link = 'Invalid URL format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    const scheduleData = {
      content,
      platforms: selectedPlatforms,
      schedule_time: new Date(`${date}T${time}`).toISOString(),
      hashtags,
      link: link || undefined,
    };

    try {
      await onSchedule(scheduleData);
      handleClose();
    } catch (error) {
      setErrors({ submit: 'Failed to schedule post. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setContent('');
    setSelectedPlatforms([]);
    setHashtags([]);
    setHashtagInput('');
    setLink('');
    setErrors({});
    onClose();
  };

  const getCharacterLimit = () => {
    if (selectedPlatforms.includes('twitter')) return 280;
    if (selectedPlatforms.includes('instagram')) return 2200;
    if (selectedPlatforms.includes('linkedin')) return 3000;
    return 2200;
  };

  const characterLimit = getCharacterLimit();
  const characterCount = content.length;
  const isNearLimit = characterCount > characterLimit * 0.9;
  const isOverLimit = characterCount > characterLimit;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[800px] p-0 gap-0 max-h-[80vh] overflow-hidden flex flex-col">
        <DialogTitle className="sr-only">Schedule Post</DialogTitle>
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
                Schedule Post
              </h2>
              {selectedDate && (
                <p className="text-gray-500 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  For {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              )}
            </div>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Date & Time */}
          <div>
            <Label className="mb-2" style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
              When to publish
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-10"
              />
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="h-10"
              />
            </div>
            {errors.datetime && (
              <p className="text-orange-500 text-sm mt-1">{errors.datetime}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">Times are in your timezone (PST)</p>
          </div>

          {/* Platform Selection */}
          <div>
            <Label className="mb-2" style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
              Select platforms <span className="text-orange-500">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {connectedPlatforms.map(platform => {
                const info = platformInfo[platform];
                if (!info) return null;

                return (
                  <div
                    key={platform}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedPlatforms.includes(platform)
                        ? 'border-[#0099b1] bg-[#e6f7f9]'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => handlePlatformToggle(platform)}
                  >
                    <Checkbox
                      checked={selectedPlatforms.includes(platform)}
                      onCheckedChange={() => handlePlatformToggle(platform)}
                    />
                    <span className="text-lg">{info.icon}</span>
                    <span style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                      {info.name}
                    </span>
                  </div>
                );
              })}
            </div>
            {errors.platforms && (
              <p className="text-orange-500 text-sm mt-1">{errors.platforms}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <Label className="mb-2" style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
              Post content <span className="text-orange-500">*</span>
            </Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={5}
              className="resize-none"
            />
            <div className="flex justify-between items-center mt-1">
              {errors.content && (
                <p className="text-orange-500 text-sm">{errors.content}</p>
              )}
              <p
                className={`text-sm ml-auto ${
                  isOverLimit ? 'text-red-500' : isNearLimit ? 'text-orange-500' : 'text-gray-500'
                }`}
              >
                {characterCount} / {characterLimit}
              </p>
            </div>
          </div>

          {/* Hashtags */}
          <div>
            <Label className="mb-2" style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
              Hashtags (optional)
            </Label>
            <Input
              value={hashtagInput}
              onChange={(e) => setHashtagInput(e.target.value)}
              onKeyDown={handleHashtagKeyDown}
              placeholder="Type hashtag and press Enter"
              className="h-10"
            />
            {errors.hashtags && (
              <p className="text-orange-500 text-sm mt-1">{errors.hashtags}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#0099b1] text-white rounded-full flex items-center gap-2"
                  style={{ fontFamily: 'Open Sans', fontSize: '12px' }}
                >
                  #{tag}
                  <button onClick={() => removeHashtag(index)} className="hover:text-gray-200">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Link */}
          <div>
            <Label className="mb-2" style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
              Link (optional)
            </Label>
            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com/blog-post"
              className="h-10"
            />
            {errors.link && (
              <p className="text-orange-500 text-sm mt-1">{errors.link}</p>
            )}
          </div>

          {errors.submit && (
            <p className="text-red-500 text-sm">{errors.submit}</p>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-[#0099b1] flex items-center justify-between flex-shrink-0">
          <Button
            onClick={handleClose}
            className="bg-white text-[#231f20] hover:bg-gray-100 h-11"
            style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#0099b1] hover:bg-[#007a8c] text-white h-11 border-2 border-white"
            style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
          >
            {loading ? 'Scheduling...' : 'Schedule Post'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
