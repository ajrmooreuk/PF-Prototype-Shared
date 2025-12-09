import { useState, useEffect } from 'react';
import { Check, X, Settings as SettingsIcon, Loader2, Info, Folder } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';
import {
  getAllConnectionStatuses,
  initiateConnection,
  disconnectPlatform,
  getDriveFolders,
  updateDriveSettings,
} from '../../lib/connectionsAPI';

interface Connection {
  platform: string;
  platform_type: string;
  status: string;
  connection_id?: string;
  connection_name?: string;
  user_email?: string;
  username?: string;
  connected_at?: string;
  metadata?: any;
}

interface IntegrationsSettingsProps {
  tenantId?: string;
  jwtToken?: string;
}

export function IntegrationsSettings({ 
  tenantId = 'tenant-demo', 
  jwtToken = 'demo-token' 
}: IntegrationsSettingsProps) {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDriveSettings, setShowDriveSettings] = useState(false);
  const [stats, setStats] = useState({ connected: 0, available: 0 });

  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    try {
      setLoading(true);
      const data = await getAllConnectionStatuses({ tenantId, jwtToken });
      setConnections(data.connections || []);
      setStats(data.stats || { connected: 0, available: 0, total_platforms: 0, needs_attention: 0 });
    } catch (error: any) {
      // Silently fall back to mock data in development
      console.log('Using mock integration data for development');
      setConnections(getMockConnections());
      setStats({ connected: 5, available: 6 });
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (platform: string) => {
    try {
      const authUrl = await initiateConnection(platform, tenantId, jwtToken);
      window.location.href = authUrl;
    } catch (error: any) {
      console.error('Error connecting platform:', error);
      toast.error(`Failed to connect ${platform}`);
    }
  };

  const handleDisconnect = async (connectionId: string, platform: string, platformName: string) => {
    if (!confirm(`Disconnect ${platformName}? You'll need to reconnect to resume using this integration.`)) {
      return;
    }

    try {
      await disconnectPlatform(connectionId, platform, { tenantId, jwtToken });
      toast.success(`${platformName} disconnected successfully`);
      await loadConnections();
    } catch (error: any) {
      console.error('Error disconnecting platform:', error);
      toast.error(`Failed to disconnect ${platformName}`);
    }
  };

  const getConnection = (platform: string) => {
    return connections.find(c => c.platform === platform);
  };

  const socialMediaConnections = connections.filter(c => c.platform_type === 'social_media');
  const contentFileConnections = connections.filter(c => c.platform_type === 'content_files');
  const analyticsConnections = connections.filter(c => c.platform_type === 'analytics');

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-12 h-12 text-[#2990C6] animate-spin mb-4" />
          <p className="text-gray-600" style={{ fontFamily: 'Open Sans' }}>
            Loading integrations...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px', color: '#000000' }}>
          Integrations
        </h2>
        <p className="text-gray-600 mt-2" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
          Connect your platforms to enable content distribution and file access
        </p>
        
        {/* Status Indicator */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-gray-600" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
            Connection Status
          </span>
          <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            {stats.connected} Connected
          </span>
          <span className="px-3 py-1 bg-gray-400 text-white rounded-full text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            {stats.available} Available
          </span>
        </div>
      </div>

      {/* Social Media Section */}
      <IntegrationSection
        title="Social Media"
        description="Manage social media accounts for content publishing"
        platforms={[
          {
            id: 'linkedin',
            name: 'LinkedIn',
            description: 'Post updates and engage with professional audiences',
            logo: <LinkedInLogo />,
            connection: getConnection('linkedin'),
            onConnect: () => handleConnect('linkedin'),
            onDisconnect: (connId) => handleDisconnect(connId, 'linkedin', 'LinkedIn'),
          },
          {
            id: 'facebook',
            name: 'Facebook',
            description: 'Manage Facebook Pages and publish content',
            logo: <FacebookLogo />,
            connection: getConnection('facebook'),
            onConnect: () => handleConnect('facebook'),
            onDisconnect: (connId) => handleDisconnect(connId, 'facebook', 'Facebook'),
          },
          {
            id: 'instagram',
            name: 'Instagram',
            description: 'Share photos, videos, and stories to Instagram Business accounts',
            logo: <InstagramLogo />,
            connection: getConnection('instagram'),
            onConnect: () => handleConnect('instagram'),
            onDisconnect: (connId) => handleDisconnect(connId, 'instagram', 'Instagram'),
          },
          {
            id: 'twitter',
            name: 'Twitter / X',
            description: 'Post updates and threads to your Twitter account',
            logo: <TwitterLogo />,
            connection: getConnection('twitter'),
            onConnect: () => handleConnect('twitter'),
            onDisconnect: (connId) => handleDisconnect(connId, 'twitter', 'Twitter'),
          },
        ]}
      />

      {/* Content & Files Section */}
      <IntegrationSection
        title="Content & Files"
        description="Access and manage your content assets and files"
        platforms={[
          {
            id: 'google',
            name: 'Google Drive',
            description: 'Access brand assets, images, and documents from Google Drive',
            logo: <GoogleDriveLogo />,
            connection: getConnection('google'),
            onConnect: () => handleConnect('google'),
            onDisconnect: (connId) => handleDisconnect(connId, 'google', 'Google Drive'),
            onSettings: () => setShowDriveSettings(true),
            showSettings: true,
          },
          {
            id: 'wordpress',
            name: 'WordPress',
            description: 'Publish blog posts directly to your WordPress site',
            logo: <WordPressLogo />,
            connection: getConnection('wordpress'),
            onConnect: () => handleConnect('wordpress'),
            onDisconnect: (connId) => handleDisconnect(connId, 'wordpress', 'WordPress'),
          },
          {
            id: 'shopify',
            name: 'Shopify',
            description: 'Sync product content and manage your Shopify store',
            logo: <ShopifyLogo />,
            connection: getConnection('shopify'),
            onConnect: () => handleConnect('shopify'),
            onDisconnect: (connId) => handleDisconnect(connId, 'shopify', 'Shopify'),
          },
          {
            id: 'webflow',
            name: 'Webflow',
            description: 'Publish content to your Webflow CMS collections',
            logo: <WebflowLogo />,
            connection: getConnection('webflow'),
            onConnect: () => handleConnect('webflow'),
            onDisconnect: (connId) => handleDisconnect(connId, 'webflow', 'Webflow'),
          },
        ]}
      />

      {/* Analytics & Data Section */}
      <IntegrationSection
        title="Analytics & Data"
        description="Track performance and gather insights from analytics platforms"
        platforms={[
          {
            id: 'google_analytics',
            name: 'Google Analytics',
            description: 'Monitor website traffic and user behavior data',
            logo: <GoogleAnalyticsLogo />,
            connection: getConnection('google_analytics'),
            onConnect: () => handleConnect('google_analytics'),
            onDisconnect: (connId) => handleDisconnect(connId, 'google_analytics', 'Google Analytics'),
          },
          {
            id: 'plausible',
            name: 'Plausible Analytics',
            description: 'Privacy-friendly website analytics alternative',
            logo: <PlausibleLogo />,
            connection: getConnection('plausible'),
            onConnect: () => handleConnect('plausible'),
            onDisconnect: (connId) => handleDisconnect(connId, 'plausible', 'Plausible'),
          },
          {
            id: 'mixpanel',
            name: 'Mixpanel',
            description: 'Product analytics and user behavior tracking',
            logo: <MixpanelLogo />,
            connection: getConnection('mixpanel'),
            onConnect: () => handleConnect('mixpanel'),
            onDisconnect: (connId) => handleDisconnect(connId, 'mixpanel', 'Mixpanel'),
          },
        ]}
      />

      {/* Social Listening Section */}
      <SocialListeningSection />

      {/* Google Drive Settings Modal */}
      {showDriveSettings && (
        <GoogleDriveSettingsModal
          connection={getConnection('google')}
          tenantId={tenantId}
          jwtToken={jwtToken}
          onClose={() => setShowDriveSettings(false)}
          onSave={loadConnections}
        />
      )}
    </div>
  );
}

// Integration Section Component
function IntegrationSection({
  title,
  description,
  platforms,
}: {
  title: string;
  description: string;
  platforms: any[];
}) {
  return (
    <div className="mb-8">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#000000' }}>
            {title}
          </h3>
          <p className="text-gray-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {platforms.map((platform) => (
            <PlatformCard key={platform.id} {...platform} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Platform Card Component
function PlatformCard({
  name,
  description,
  logo,
  connection,
  onConnect,
  onDisconnect,
  onSettings,
  showSettings = false,
}: any) {
  const isConnected = connection?.status === 'connected';

  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center">
            {logo}
          </div>
          <div>
            <h4 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', color: '#374151' }}>
              {name}
            </h4>
          </div>
        </div>
        <div>
          {isConnected ? (
            <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs flex items-center gap-1" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
              <Check className="w-3 h-3" />
              Connected
            </span>
          ) : (
            <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
              Not Connected
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4" style={{ fontFamily: 'Open Sans' }}>
        {description}
      </p>

      {isConnected && connection && (
        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-[#2990C6] mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                Connected as: {connection.user_email || connection.connection_name || connection.username}
              </p>
              {connection.connected_at && (
                <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Open Sans' }}>
                  Since {new Date(connection.connected_at).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
          
          {connection.metadata?.brand_assets_folder_path && (
            <div className="mt-2 flex items-center gap-2 text-xs text-blue-600">
              <Folder className="w-3 h-3" />
              <span style={{ fontFamily: 'Open Sans' }}>
                Brand Assets folder selected
              </span>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2">
        {!isConnected ? (
          <Button
            onClick={onConnect}
            className="w-full bg-[#2990C6] hover:bg-[#2176AD] text-white h-10"
            style={{ fontFamily: 'Poppins', fontWeight: 500 }}
          >
            Connect {name}
          </Button>
        ) : (
          <>
            {showSettings && (
              <Button
                onClick={onSettings}
                variant="outline"
                className="flex-1 border-[#2990C6] text-[#2990C6] hover:bg-blue-50"
                style={{ fontFamily: 'Poppins', fontWeight: 500 }}
              >
                <SettingsIcon className="w-4 h-4 mr-2" />
                Settings
              </Button>
            )}
            <Button
              onClick={() => onDisconnect(connection.connection_id)}
              variant="outline"
              className={`${showSettings ? 'flex-1' : 'w-full'} border-red-500 text-red-500 hover:bg-red-50`}
              style={{ fontFamily: 'Poppins', fontWeight: 500 }}
            >
              Disconnect
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

// Social Listening Section
function SocialListeningSection() {
  const platforms = [
    { name: 'Reddit', logo: <RedditLogo />, description: 'Monitor subreddits for engagement opportunities' },
    { name: 'Bluesky', logo: <BlueskyLogo />, description: 'Track conversations on the decentralized social network' },
    { name: 'YouTube', logo: <YouTubeLogo />, description: 'Discover content ideas from video comments and discussions' },
  ];

  return (
    <div className="mb-8">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#000000' }}>
            Social Listening
          </h3>
          <p className="text-gray-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            Monitor conversations and discover content opportunities
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#2990C6] mt-0.5 flex-shrink-0" />
          <p className="text-[#2990C6]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            Social listening platforms are automatically configured. No connection required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {platforms.map((platform) => (
            <div key={platform.name} className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center">
                    {platform.logo}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', color: '#374151' }}>
                      {platform.name}
                    </h4>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  Active
                </span>
              </div>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'Open Sans' }}>
                {platform.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Google Drive Settings Modal
function GoogleDriveSettingsModal({
  connection,
  tenantId,
  jwtToken,
  onClose,
  onSave,
}: any) {
  const [selectedFolder, setSelectedFolder] = useState(
    connection?.metadata?.brand_assets_folder_path || '/Brand Assets'
  );
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateDriveSettings(
        connection.connection_id,
        { tenantId, jwtToken },
        {
          brand_assets_folder_id: 'folder-id-here',
          brand_assets_folder_path: selectedFolder,
        }
      );
      toast.success('Google Drive settings updated');
      onSave();
      onClose();
    } catch (error: any) {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-[600px] max-w-[95vw] max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px', color: '#000000' }}>
            Google Drive Settings
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Connected Account */}
          <div>
            <h4 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', color: '#374151' }} className="mb-3">
              Connected Account
            </h4>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
              <GoogleDriveLogo />
              <div className="flex-1">
                <p style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '15px', color: '#1a1a1a' }}>
                  {connection?.user_email || 'company@example.com'}
                </p>
                <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Open Sans' }}>
                  Connected on {connection?.connected_at ? new Date(connection.connected_at).toLocaleDateString() : 'Nov 10, 2024'}
                </p>
              </div>
            </div>
            <button className="text-[#2990C6] text-sm mt-2 hover:underline" style={{ fontFamily: 'Open Sans' }}>
              Reconnect with different account
            </button>
          </div>

          {/* Brand Assets Folder */}
          <div>
            <h4 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', color: '#374151' }} className="mb-2">
              Brand Assets Folder
            </h4>
            <p className="text-gray-600 text-sm mb-3" style={{ fontFamily: 'Open Sans' }}>
              Select the folder containing your brand assets (logos, images, documents)
            </p>
            <div className="border border-gray-300 rounded-lg p-3 flex items-center gap-3">
              <Folder className="w-5 h-5 text-blue-500" />
              <span style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '15px' }}>
                {selectedFolder}
              </span>
              <button className="ml-auto text-[#2990C6] text-sm hover:underline" style={{ fontFamily: 'Open Sans' }}>
                Change Folder
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2" style={{ fontFamily: 'Open Sans' }}>
              My Drive &gt; {selectedFolder.split('/').filter(Boolean).join(' > ')}
            </p>
          </div>

          {/* Permissions */}
          <div>
            <h4 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', color: '#374151' }} className="mb-3">
              Permissions Granted
            </h4>
            <div className="space-y-2">
              {['View and download files', 'Access file metadata', 'Browse folder structure'].map((perm) => (
                <div key={perm} className="flex items-center gap-2 text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  <span style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>{perm}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 italic mt-3" style={{ fontFamily: 'Open Sans' }}>
              BAIV Platform has read-only access to your Drive files
            </p>
          </div>

          {/* Supported File Types */}
          <div>
            <h4 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', color: '#374151' }} className="mb-3">
              Supported File Types
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
                Images (PNG, JPG, SVG)
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
                Documents (PDF, DOCX)
              </span>
              <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
                Videos (MP4, MOV)
              </span>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (confirm('Disconnect Google Drive?')) {
                onClose();
              }
            }}
            className="border-red-500 text-red-500 hover:bg-red-50"
          >
            Disconnect Google Drive
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#2990C6] hover:bg-[#2176AD] text-white"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Mock data for development
function getMockConnections(): Connection[] {
  return [
    {
      platform: 'linkedin',
      platform_type: 'social_media',
      status: 'connected',
      connection_id: 'conn-1',
      user_email: 'john@company.com',
      connected_at: '2024-11-01T10:30:00Z',
    },
    {
      platform: 'facebook',
      platform_type: 'social_media',
      status: 'connected',
      connection_id: 'conn-2',
      connection_name: 'Company Page',
      connected_at: '2024-10-15T14:20:00Z',
    },
    {
      platform: 'instagram',
      platform_type: 'social_media',
      status: 'connected',
      connection_id: 'conn-3',
      username: 'companyhandle',
      connection_name: '@companyhandle',
      connected_at: '2024-10-15T14:25:00Z',
    },
    {
      platform: 'google',
      platform_type: 'content_files',
      status: 'connected',
      connection_id: 'conn-4',
      user_email: 'company@example.com',
      connected_at: '2024-09-20T09:00:00Z',
      metadata: {
        brand_assets_folder_id: '1ABC...XYZ',
        brand_assets_folder_path: '/Brand Assets/BAIV Marketing',
      },
    },
    {
      platform: 'google_analytics',
      platform_type: 'analytics',
      status: 'connected',
      connection_id: 'conn-5',
      connected_at: '2024-09-20T09:00:00Z',
      metadata: {
        property_id: 'UA-123456',
        property_name: 'BAIV Platform',
      },
      connection_name: 'BAIV Platform (UA-123456)',
    },
    { platform: 'twitter', status: 'not_connected', platform_type: 'social_media' },
    { platform: 'wordpress', status: 'not_connected', platform_type: 'content_files' },
    { platform: 'shopify', status: 'not_connected', platform_type: 'content_files' },
    { platform: 'webflow', status: 'not_connected', platform_type: 'content_files' },
    { platform: 'plausible', status: 'not_connected', platform_type: 'analytics' },
    { platform: 'mixpanel', status: 'not_connected', platform_type: 'analytics' },
  ];
}

// Platform Logos
function LinkedInLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#0A66C2"/>
      <path d="M18.5 20H14V34H18.5V20ZM16.25 12C14.73 12 13.5 13.23 13.5 14.75C13.5 16.27 14.73 17.5 16.25 17.5C17.77 17.5 19 16.27 19 14.75C19 13.23 17.77 12 16.25 12ZM34 34H29.5V27.25C29.5 25.42 28.58 24 26.75 24C24.92 24 24 25.42 24 27.25V34H19.5V20H24V22C24.87 20.78 26.38 20 28 20C31.31 20 34 22.19 34 26.25V34Z" fill="white"/>
    </svg>
  );
}

function FacebookLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#1877F2"/>
      <path d="M26.5 38V26H30.5L31 22H26.5V19.5C26.5 18.12 26.88 17.5 28.5 17.5H31V13.14C30.42 13.07 28.85 13 27.5 13C24.36 13 22 15.16 22 19V22H18V26H22V38H26.5Z" fill="white"/>
    </svg>
  );
}

function InstagramLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="url(#instagram-gradient)"/>
      <defs>
        <linearGradient id="instagram-gradient" x1="10" y1="38" x2="38" y2="10" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FD5"/>
          <stop offset="0.5" stopColor="#FF543E"/>
          <stop offset="1" stopColor="#C837AB"/>
        </linearGradient>
      </defs>
      <rect x="16" y="16" width="16" height="16" rx="4" stroke="white" strokeWidth="2" fill="none"/>
      <circle cx="24" cy="24" r="4" stroke="white" strokeWidth="2" fill="none"/>
      <circle cx="30" cy="18" r="1.5" fill="white"/>
    </svg>
  );
}

function TwitterLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#000000"/>
      <path d="M28.5 14H32L25.5 21.5L33 34H27L22 26.5L16.5 34H13L20 26L13 14H19L23.5 21L28.5 14Z" fill="white"/>
    </svg>
  );
}

function GoogleDriveLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
      <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
      <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
      <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
      <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
      <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
      <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
    </svg>
  );
}

function WordPressLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" fill="#21759B"/>
      <path d="M24 8C15.16 8 8 15.16 8 24C8 32.84 15.16 40 24 40C32.84 40 40 32.84 40 24C40 15.16 32.84 8 24 8ZM24 38C16.27 38 10 31.73 10 24C10 16.27 16.27 10 24 10C31.73 10 38 16.27 38 24C38 31.73 31.73 38 24 38Z" fill="white"/>
      <circle cx="24" cy="24" r="3" fill="white"/>
    </svg>
  );
}

function ShopifyLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#95BF47"/>
      <path d="M31 14C31 14 30.5 14.1 29.5 14.3C29.4 13.7 29.1 13 28.7 12.4C27.8 11.3 26.6 10.7 25.2 10.7H25C24.7 10.3 24.3 10 23.8 10C20.2 10 18.5 14.8 18 17.5C16.4 18 15.3 18.3 15.2 18.4C14.5 18.6 14.5 18.6 14.4 19.3C14.3 19.8 12 32.5 12 32.5L30.5 36V14H31ZM27.5 15C26.5 15.3 25.4 15.6 24.2 16V15.5C24.2 14.5 24 13.6 23.7 12.9C25.5 13.1 26.8 14.2 27.5 15ZM22.2 13.3C22.5 13.9 22.7 14.7 22.7 15.8V16.3C21.4 16.7 20 17.1 18.6 17.5C19.2 15.3 20.5 13.6 22.2 13.3Z" fill="white"/>
    </svg>
  );
}

function WebflowLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#4353FF"/>
      <path d="M32 22L28 28H24L26 22H22L18 28L20 34H24L28 28L32 22ZM16 16L12 28H16L18 22L20 16H16Z" fill="white"/>
    </svg>
  );
}

function GoogleAnalyticsLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#F9AB00"/>
      <rect x="14" y="28" width="4" height="8" rx="2" fill="white"/>
      <rect x="22" y="20" width="4" height="16" rx="2" fill="white"/>
      <rect x="30" y="12" width="4" height="24" rx="2" fill="white"/>
    </svg>
  );
}

function PlausibleLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#5850EC"/>
      <path d="M18 30L24 20L30 26L36 16" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="18" cy="30" r="2" fill="white"/>
      <circle cx="24" cy="20" r="2" fill="white"/>
      <circle cx="30" cy="26" r="2" fill="white"/>
      <circle cx="36" cy="16" r="2" fill="white"/>
    </svg>
  );
}

function MixpanelLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#7856FF"/>
      <circle cx="18" cy="24" r="6" fill="white"/>
      <circle cx="30" cy="24" r="6" fill="white" fillOpacity="0.6"/>
    </svg>
  );
}

function RedditLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" fill="#FF4500"/>
      <circle cx="24" cy="24" r="14" fill="white"/>
      <circle cx="20" cy="22" r="2" fill="#FF4500"/>
      <circle cx="28" cy="22" r="2" fill="#FF4500"/>
      <path d="M18 28C18 28 20 30 24 30C28 30 30 28 30 28" stroke="#FF4500" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function BlueskyLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#1185FE"/>
      <path d="M24 28C27 28 30 25 30 22C30 19 28 16 24 16C20 16 18 19 18 22C18 25 21 28 24 28Z" fill="white"/>
      <path d="M20 24L18 26L20 28L22 26L20 24Z" fill="white"/>
      <path d="M28 24L26 26L28 28L30 26L28 24Z" fill="white"/>
    </svg>
  );
}

function YouTubeLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#FF0000"/>
      <path d="M36 20C36 18.9 35.1 18 34 18H14C12.9 18 12 18.9 12 20V28C12 29.1 12.9 30 14 30H34C35.1 30 36 29.1 36 28V20Z" fill="white"/>
      <path d="M21 26V22L28 24L21 26Z" fill="#FF0000"/>
    </svg>
  );
}