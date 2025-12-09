interface PostPillProps {
  post: any;
  onClick: () => void;
}

const platformColors: { [key: string]: string } = {
  linkedin: '#0077b5',
  twitter: '#000000',
  facebook: '#1877f2',
  instagram: '#e4405f',
  reddit: '#ff4500',
  tiktok: '#000000',
  pinterest: '#e60023',
};

const platformIcons: { [key: string]: string } = {
  linkedin: '💼',
  twitter: '🐦',
  facebook: '📘',
  instagram: '📷',
  reddit: '🔴',
  tiktok: '🎵',
  pinterest: '📌',
};

export function PostPill({ post, onClick }: PostPillProps) {
  const getBackgroundColor = () => {
    if (post.platforms.length === 1) {
      return platformColors[post.platforms[0]] || '#0099b1';
    }
    return '#0099b1'; // Multi-platform: teal
  };

  const getTime = () => {
    return new Date(post.scheduled_for).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getPreview = () => {
    return post.content.substring(0, 30) + (post.content.length > 30 ? '...' : '');
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="h-7 rounded-md px-2 py-1.5 flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105"
      style={{
        backgroundColor: getBackgroundColor(),
        color: '#ffffff',
      }}
    >
      <div className="flex items-center gap-0.5 flex-shrink-0">
        {post.platforms.slice(0, 2).map((platform: string, index: number) => (
          <span key={index} className="text-xs">
            {platformIcons[platform] || '📱'}
          </span>
        ))}
      </div>
      <span className="text-[10px] truncate flex-1" style={{ fontFamily: 'Open Sans' }}>
        {getPreview()}
      </span>
      <span className="text-[10px] opacity-90 flex-shrink-0" style={{ fontFamily: 'Open Sans' }}>
        {getTime()}
      </span>
    </div>
  );
}
