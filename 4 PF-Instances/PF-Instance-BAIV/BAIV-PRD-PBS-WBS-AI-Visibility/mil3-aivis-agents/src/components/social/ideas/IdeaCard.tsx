import { MoreVertical, Star } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Button } from '../../ui/button';

interface IdeaCardProps {
  idea: any;
  onView: () => void;
  onEdit: () => void;
  onSchedule: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  isHighlighted?: boolean;
}

const themeConfig: any = {
  educate: { bg: '#3b82f6', icon: '📚', name: 'Educate', borderColor: '#3b82f6' },
  engage: { bg: '#10b981', icon: '💬', name: 'Engage', borderColor: '#10b981' },
  entertain: { bg: '#8b5cf6', icon: '🎉', name: 'Entertain', borderColor: '#8b5cf6' },
  empower: { bg: '#f59e0b', icon: '💪', name: 'Empower', borderColor: '#f59e0b' },
};

const statusConfig: any = {
  draft: { bg: '#6b7280', text: 'Draft' },
  ready: { bg: '#10b981', text: 'Ready' },
  scheduled: { bg: '#f59e0b', text: 'Scheduled' },
  published: { bg: '#3b82f6', text: 'Published' },
  archived: { bg: '#d1d5db', text: 'Archived', color: '#374151' },
};

const platformIcons: any = {
  linkedin: '💼',
  twitter: '🐦',
  facebook: '📘',
  instagram: '📷',
};

export function IdeaCard({ idea, onView, onEdit, onSchedule, onDuplicate, onDelete, isHighlighted }: IdeaCardProps) {
  const theme = themeConfig[idea.category] || themeConfig.educate;
  const status = statusConfig[idea.status] || statusConfig.draft;

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className="w-4 h-4"
        fill={i < count ? '#ffb615' : 'none'}
        stroke={i < count ? '#ffb615' : '#d1d5db'}
      />
    ));
  };

  return (
    <div
      onClick={onView}
      className={`bg-white rounded-2xl p-5 shadow-sm hover:scale-[1.02] transition-all duration-200 cursor-pointer ${
        isHighlighted ? 'ring-2 ring-[#ffb615]' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="px-3 py-1.5 rounded-full text-white flex items-center gap-1.5"
          style={{ backgroundColor: theme.bg, fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }}
        >
          <span>{theme.icon}</span>
          {theme.name}
        </span>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">{renderStars(idea.priority)}</div>
          
          <DropdownMenu>
            <DropdownMenuTrigger
              onClick={(e) => e.stopPropagation()}
              className="text-gray-500 hover:text-[#02a4bf] transition-colors p-1"
            >
              <MoreVertical className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={onDuplicate}>Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-red-500 focus:text-red-500">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Title */}
      <h3
        className="text-[#231f20] mb-2 line-clamp-2"
        style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 700 }}
      >
        {idea.title}
      </h3>

      {/* Description */}
      <p
        className="text-[#6B7280] mb-4 line-clamp-3"
        style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
      >
        {idea.description}
      </p>

      {/* Content Preview */}
      <div
        className="bg-[#f9fafb] rounded-lg p-3 mb-4 border-l-[3px]"
        style={{ borderLeftColor: theme.borderColor }}
      >
        <p
          className="text-[#374151] line-clamp-2"
          style={{ fontFamily: 'Open Sans', fontSize: '13px' }}
        >
          {idea.content_preview}
        </p>
      </div>

      {/* Themes */}
      <div className="flex flex-wrap gap-2 mb-3">
        {idea.themes?.slice(0, 3).map((tag: string, index: number) => (
          <span
            key={index}
            className="px-2 py-1 bg-[#e6f7f9] text-[#02a4bf] rounded-full"
            style={{ fontFamily: 'Open Sans', fontSize: '11px' }}
          >
            {tag}
          </span>
        ))}
        {idea.themes?.length > 3 && (
          <span
            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
            style={{ fontFamily: 'Open Sans', fontSize: '11px' }}
          >
            +{idea.themes.length - 3} more
          </span>
        )}
      </div>

      {/* Platform Icons */}
      <div className="flex items-center gap-1 mb-4">
        {idea.platforms?.slice(0, 4).map((platform: string, index: number) => (
          <span key={index} className="text-lg">
            {platformIcons[platform] || '📱'}
          </span>
        ))}
        {idea.platforms?.length > 4 && (
          <span className="text-xs text-gray-500 ml-1">+{idea.platforms.length - 4}</span>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span
          className="px-3 py-1 rounded-full"
          style={{
            backgroundColor: status.bg,
            color: status.color || '#ffffff',
            fontFamily: 'Poppins',
            fontSize: '12px',
            fontWeight: 500,
          }}
        >
          {status.text}
        </span>

        <div className="text-right">
          {idea.generated_by_ai && (
            <div className="text-purple-500 mb-1" style={{ fontFamily: 'Open Sans', fontSize: '11px' }}>
              ✨ AI Generated
            </div>
          )}
          <div className="text-gray-400" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
            {new Date(idea.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
        <Button
          onClick={onSchedule}
          className="bg-[#02a4bf] hover:bg-[#028a9f] text-white h-9"
          style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
        >
          Schedule
        </Button>
        <Button
          onClick={onEdit}
          variant="outline"
          className="border-[#02a4bf] text-[#02a4bf] hover:bg-[#f0f9fb] h-9"
          style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
