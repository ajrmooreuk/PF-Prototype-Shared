import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { Button } from '../../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';

interface ConnectedPlatformsSidebarProps {
  connections: any[];
  onConnectPlatform: () => void;
}

const platformInfo: { [key: string]: { name: string; color: string; icon: string } } = {
  linkedin: { name: 'LinkedIn', color: '#0077b5', icon: '💼' },
  twitter: { name: 'Twitter/X', color: '#000000', icon: '🐦' },
  facebook: { name: 'Facebook', color: '#1877f2', icon: '📘' },
  instagram: { name: 'Instagram', color: '#e4405f', icon: '📷' },
  reddit: { name: 'Reddit', color: '#ff4500', icon: '🔴' },
  tiktok: { name: 'TikTok', color: '#000000', icon: '🎵' },
  pinterest: { name: 'Pinterest', color: '#e60023', icon: '📌' },
  threads: { name: 'Threads', color: '#000000', icon: '🧵' },
  discord: { name: 'Discord', color: '#5865f2', icon: '💬' },
  slack: { name: 'Slack', color: '#4a154b', icon: '💼' },
  mastodon: { name: 'Mastodon', color: '#6364ff', icon: '🐘' },
  bluesky: { name: 'Bluesky', color: '#00a8ff', icon: '🦋' },
};

export function ConnectedPlatformsSidebar({ connections, onConnectPlatform }: ConnectedPlatformsSidebarProps) {
  const [expandedPlatforms, setExpandedPlatforms] = useState<string[]>(['linkedin', 'facebook']);
  const [filter, setFilter] = useState('all');

  const groupedConnections = connections.reduce((acc, conn) => {
    if (!acc[conn.platform]) {
      acc[conn.platform] = [];
    }
    acc[conn.platform].push(conn);
    return acc;
  }, {} as { [key: string]: any[] });

  const togglePlatform = (platform: string) => {
    if (expandedPlatforms.includes(platform)) {
      setExpandedPlatforms(expandedPlatforms.filter(p => p !== platform));
    } else {
      setExpandedPlatforms([...expandedPlatforms, platform]);
    }
  };

  const allPlatforms = Object.keys(platformInfo);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h3 className="text-[#231f20] mb-4" style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: 600 }}>
        Connected Accounts
      </h3>

      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="All Platforms" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Platforms</SelectItem>
          {allPlatforms.map(platform => (
            <SelectItem key={platform} value={platform}>
              {platformInfo[platform].name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto">
        {allPlatforms.map(platform => {
          const platformConns = groupedConnections[platform] || [];
          const isExpanded = expandedPlatforms.includes(platform);
          const info = platformInfo[platform];

          if (filter !== 'all' && filter !== platform) {
            return null;
          }

          return (
            <div key={platform} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => togglePlatform(platform)}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{info.icon}</span>
                  <span
                    className="text-[#231f20]"
                    style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
                  >
                    {info.name} ({platformConns.length})
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
              </button>

              {isExpanded && (
                <div className="pl-3 pb-2">
                  {platformConns.length === 0 ? (
                    <div className="px-3 py-2 text-gray-400 italic" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                      Not connected
                    </div>
                  ) : (
                    platformConns.map(conn => (
                      <div
                        key={conn.id}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {conn.profile?.avatar ? (
                            <img src={conn.profile.avatar} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-sm">{info.icon}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className="text-[#231f20] truncate"
                            style={{ fontFamily: 'Open Sans', fontSize: '13px', fontWeight: 500 }}
                          >
                            {conn.connection_name}
                          </div>
                          <div
                            className="text-gray-500 truncate"
                            style={{ fontFamily: 'Open Sans', fontSize: '12px' }}
                          >
                            @{conn.profile?.username || 'unknown'}
                          </div>
                        </div>
                        <div className="text-green-500 flex-shrink-0">✓</div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Button
        onClick={onConnectPlatform}
        className="w-full h-11 bg-[#0099b1] hover:bg-[#007a8c] text-white"
        style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
      >
        <Plus className="w-4 h-4 mr-2" />
        Connect Platform
      </Button>
    </div>
  );
}
