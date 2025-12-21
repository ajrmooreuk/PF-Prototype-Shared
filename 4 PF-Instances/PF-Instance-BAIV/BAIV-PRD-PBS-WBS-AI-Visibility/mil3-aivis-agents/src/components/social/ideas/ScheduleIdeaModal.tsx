import { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Checkbox } from '../../ui/checkbox';

interface ScheduleIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  idea: any;
  onSchedule: (data: any) => void;
}

const platforms = [
  { id: 'linkedin', icon: '💼', label: 'LinkedIn' },
  { id: 'twitter', icon: '🐦', label: 'Twitter' },
  { id: 'facebook', icon: '📘', label: 'Facebook' },
  { id: 'instagram', icon: '📷', label: 'Instagram' },
];

export function ScheduleIdeaModal({ isOpen, onClose, idea, onSchedule }: ScheduleIdeaModalProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(idea?.platforms || []);

  if (!idea) return null;

  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };

  const handleSchedule = () => {
    const scheduledFor = new Date(`${date}T${time}`).toISOString();
    onSchedule({
      scheduled_for: scheduledFor,
      platforms: selectedPlatforms,
    });
    onClose();
  };

  const isValid = date && selectedPlatforms.length > 0 && new Date(`${date}T${time}`) > new Date();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px]">
        <DialogTitle className="sr-only">Schedule Idea</DialogTitle>
        <DialogDescription className="sr-only">
          Schedule {idea.title} for publishing on selected social media platforms
        </DialogDescription>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
              Schedule Idea
            </h2>
            <p className="text-gray-500 mt-1 line-clamp-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              {idea.title}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Date & Time */}
          <div>
            <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
              When to publish
            </Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-10"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <p className="text-gray-500 text-xs mt-1">Timezone: PST</p>
          </div>

          {/* Platform Selection */}
          <div>
            <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
              Select platforms <span className="text-orange-500">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {platforms
                .filter(p => idea.platforms?.includes(p.id))
                .map((platform) => (
                  <div
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedPlatforms.includes(platform.id)
                        ? 'border-[#02a4bf] bg-[#f0f9fb]'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Checkbox
                      checked={selectedPlatforms.includes(platform.id)}
                      onCheckedChange={() => togglePlatform(platform.id)}
                    />
                    <span className="text-lg">{platform.icon}</span>
                    <span style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>{platform.label}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Preview */}
          {date && selectedPlatforms.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 text-xs mb-2">Preview</p>
              <div className="space-y-2">
                <p className="text-[#231f20] text-sm line-clamp-2">
                  {idea.content_preview?.substring(0, 100)}...
                </p>
                <div className="flex items-center gap-2">
                  {selectedPlatforms.map(platform => {
                    const platformInfo = platforms.find(p => p.id === platform);
                    return platformInfo ? (
                      <span key={platform} className="text-base">{platformInfo.icon}</span>
                    ) : null;
                  })}
                </div>
                <p className="text-gray-500 text-xs">
                  Scheduled for {new Date(`${date}T${time}`).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-6">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSchedule}
            disabled={!isValid}
            className="flex-1 bg-[#02a4bf] hover:bg-[#028a9f] text-white disabled:opacity-50"
          >
            Schedule Post
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
