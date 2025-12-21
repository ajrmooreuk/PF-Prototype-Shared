import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';

interface ConnectPlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  connectedPlatforms: string[];
  onConnect: (platform: string) => void;
}

const allPlatforms = [
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: '#0077b5' },
  { id: 'twitter', name: 'Twitter/X', icon: '🐦', color: '#000000' },
  { id: 'facebook', name: 'Facebook', icon: '📘', color: '#1877f2' },
  { id: 'instagram', name: 'Instagram', icon: '📷', color: '#e4405f' },
  { id: 'reddit', name: 'Reddit', icon: '🔴', color: '#ff4500' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', color: '#000000' },
  { id: 'pinterest', name: 'Pinterest', icon: '📌', color: '#e60023' },
  { id: 'threads', name: 'Threads', icon: '🧵', color: '#000000' },
  { id: 'discord', name: 'Discord', icon: '💬', color: '#5865f2' },
  { id: 'slack', name: 'Slack', icon: '💼', color: '#4a154b' },
  { id: 'mastodon', name: 'Mastodon', icon: '🐘', color: '#6364ff' },
  { id: 'bluesky', name: 'Bluesky', icon: '🦋', color: '#00a8ff' },
];

export function ConnectPlatformModal({
  isOpen,
  onClose,
  connectedPlatforms,
  onConnect,
}: ConnectPlatformModalProps) {
  const getConnectionCount = (platformId: string) => {
    return connectedPlatforms.filter(p => p === platformId).length;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px]">
        <DialogTitle className="sr-only">Connect Social Media Platform</DialogTitle>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
            Connect Social Media Platform
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {allPlatforms.map(platform => {
            const connectionCount = getConnectionCount(platform.id);
            const isConnected = connectionCount > 0;

            return (
              <div
                key={platform.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-[#f0f9fb] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{platform.icon}</span>
                  <span
                    className="text-[#231f20]"
                    style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
                  >
                    {platform.name}
                  </span>
                </div>

                {isConnected ? (
                  <div className="flex items-center gap-1 text-green-500">
                    <span className="text-sm">✓</span>
                    <span style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                      Connected ({connectionCount})
                    </span>
                  </div>
                ) : (
                  <Button
                    onClick={() => onConnect(platform.id)}
                    size="sm"
                    className="bg-[#0099b1] hover:bg-[#007a8c] text-white h-8 px-4"
                    style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 500 }}
                  >
                    Connect
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
