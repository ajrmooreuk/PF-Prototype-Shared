import { useState } from 'react';
import { X, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { ScrollArea } from '../../ui/scroll-area';
import { Checkbox } from '../../ui/checkbox';

interface IdeaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  idea: any;
  onSave: (data: any) => void;
  onSchedule: () => void;
}

const themeConfig: any = {
  educate: { bg: '#3b82f6', icon: '📚', name: 'Educate' },
  engage: { bg: '#10b981', icon: '💬', name: 'Engage' },
  entertain: { bg: '#8b5cf6', icon: '🎉', name: 'Entertain' },
  empower: { bg: '#f59e0b', icon: '💪', name: 'Empower' },
};

const statusConfig: any = {
  draft: { text: 'Draft', bg: '#6b7280' },
  ready: { text: 'Ready', bg: '#10b981' },
  scheduled: { text: 'Scheduled', bg: '#f59e0b' },
  published: { text: 'Published', bg: '#3b82f6' },
};

const platforms = [
  { id: 'linkedin', icon: '💼', label: 'LinkedIn' },
  { id: 'twitter', icon: '🐦', label: 'Twitter' },
  { id: 'facebook', icon: '📘', label: 'Facebook' },
  { id: 'instagram', icon: '📷', label: 'Instagram' },
];

export function IdeaDetailModal({ isOpen, onClose, idea, onSave, onSchedule }: IdeaDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: idea?.title || '',
    description: idea?.description || '',
    content_preview: idea?.content_preview || '',
    priority: idea?.priority || 3,
    themes: idea?.themes || [],
    platforms: idea?.platforms || [],
  });

  if (!idea) return null;

  const theme = themeConfig[idea.category] || themeConfig.educate;
  const status = statusConfig[idea.status] || statusConfig.draft;

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const togglePlatform = (platformId: string) => {
    if (formData.platforms.includes(platformId)) {
      setFormData({ ...formData, platforms: formData.platforms.filter((p: string) => p !== platformId) });
    } else {
      setFormData({ ...formData, platforms: [...formData.platforms, platformId] });
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 cursor-pointer transition-colors ${isEditing ? '' : 'cursor-default'}`}
        fill={i < formData.priority ? '#ffb615' : 'none'}
        stroke={i < formData.priority ? '#ffb615' : '#d1d5db'}
        onClick={() => {
          if (isEditing) {
            setFormData({ ...formData, priority: i + 1 });
          }
        }}
      />
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] p-0 gap-0">
        <DialogTitle className="sr-only">Idea Details: {idea.title}</DialogTitle>
        <DialogDescription className="sr-only">
          View and edit content idea details including title, description, content preview, platforms, and metadata
        </DialogDescription>
        
        {/* Header */}
        <div className="p-6" style={{ backgroundColor: theme.bg }}>
          <div className="flex items-center justify-between mb-3">
            <span
              className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center gap-2"
              style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
            >
              <span>{theme.icon}</span>
              {theme.name}
            </span>
            <button onClick={onClose} className="text-white hover:bg-white/20 rounded-lg p-1">
              <X className="w-6 h-6" />
            </button>
          </div>
          <span
            className="px-4 py-1.5 rounded-full text-white inline-block"
            style={{ backgroundColor: status.bg, fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
          >
            {status.text}
          </span>
        </div>

        {/* Content */}
        <ScrollArea className="max-h-[60vh] p-6">
          <div className="space-y-6">
            {/* Title & Priority */}
            <div>
              <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                Title
              </Label>
              {isEditing ? (
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-2"
                  style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: 600 }}
                />
              ) : (
                <h3
                  className="text-[#231f20] mt-2"
                  style={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: 700 }}
                >
                  {idea.title}
                </h3>
              )}

              <div className="mt-4">
                <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                  Priority
                </Label>
                <div className="flex items-center gap-1 mt-2">{renderStars()}</div>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                Description
              </Label>
              {isEditing ? (
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="mt-2"
                />
              ) : (
                <p
                  className="text-[#6B7280] mt-2 bg-gray-50 p-4 rounded-lg"
                  style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                >
                  {idea.description}
                </p>
              )}
            </div>

            {/* Content Preview */}
            <div>
              <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                Post Preview
              </Label>
              {isEditing ? (
                <Textarea
                  value={formData.content_preview}
                  onChange={(e) => setFormData({ ...formData, content_preview: e.target.value })}
                  rows={6}
                  className="mt-2"
                />
              ) : (
                <div
                  className="bg-gray-50 rounded-lg p-4 mt-2 border-l-4"
                  style={{ borderLeftColor: theme.bg }}
                >
                  <p className="text-[#374151] whitespace-pre-wrap" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                    {idea.content_preview}
                  </p>
                </div>
              )}
            </div>

            {/* Platforms */}
            <div>
              <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                Target Platforms
              </Label>
              {isEditing ? (
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
              ) : (
                <div className="flex items-center gap-2 mt-2">
                  {idea.platforms?.map((platform: string) => {
                    const platformInfo = platforms.find(p => p.id === platform);
                    return platformInfo ? (
                      <span
                        key={platform}
                        className="px-3 py-2 bg-gray-100 rounded-lg flex items-center gap-2"
                        style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                      >
                        <span className="text-lg">{platformInfo.icon}</span>
                        {platformInfo.label}
                      </span>
                    ) : null;
                  })}
                </div>
              )}
            </div>

            {/* Metadata */}
            <div>
              <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                Metadata
              </Label>
              <div className="grid grid-cols-2 gap-4 mt-2 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-gray-500 text-xs">Created</p>
                  <p className="text-[#231f20] text-sm">
                    {new Date(idea.created_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Updated</p>
                  <p className="text-[#231f20] text-sm">
                    {new Date(idea.updated_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Source</p>
                  <p className="text-[#231f20] text-sm">
                    {idea.generated_by_ai ? '✨ AI Generated' : 'Manual'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Category</p>
                  <p className="text-[#231f20] text-sm flex items-center gap-1">
                    <span>{theme.icon}</span>
                    {theme.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-5 border-t border-gray-200 flex items-center justify-between">
          <div>
            {idea.status === 'scheduled' && (
              <Button variant="link" className="text-[#02a4bf]">
                View Scheduled Post
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="border-[#02a4bf] text-[#02a4bf]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-[#02a4bf] hover:bg-[#028a9f] text-white"
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                {idea.status === 'draft' && (
                  <Button
                    onClick={() => onSave({ status: 'ready' })}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    Mark as Ready
                  </Button>
                )}
                {(idea.status === 'draft' || idea.status === 'ready') && (
                  <Button
                    onClick={onSchedule}
                    className="bg-[#02a4bf] hover:bg-[#028a9f] text-white"
                  >
                    Schedule
                  </Button>
                )}
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-[#02a4bf] hover:bg-[#028a9f] text-white"
                >
                  Edit
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
