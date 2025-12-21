import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';

interface Step4Props {
  data: any;
  updateData: (updates: any) => void;
}

export function Step4Platforms({ data, updateData }: Step4Props) {
  const platforms = [
    { id: 'chatgpt', name: 'ChatGPT', provider: 'OpenAI', icon: '🤖' },
    { id: 'claude', name: 'Claude', provider: 'Anthropic', icon: '🧠' },
    { id: 'perplexity', name: 'Perplexity', provider: 'Perplexity AI', icon: '🔮' },
    { id: 'gemini', name: 'Gemini', provider: 'Google', icon: '✨' },
    { id: 'bing', name: 'Bing Copilot', provider: 'Microsoft', icon: '🔷' }
  ];

  const togglePlatform = (platformId: string) => {
    if (data.platforms.includes(platformId)) {
      updateData({
        platforms: data.platforms.filter((p: string) => p !== platformId)
      });
    } else {
      updateData({
        platforms: [...data.platforms, platformId]
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 
          className="text-[#111827] mb-2"
          style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}
        >
          Which AI platforms should we test?
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          We recommend testing all platforms for complete visibility
        </p>
      </div>

      {/* Platforms List */}
      <div className="space-y-3">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
              data.platforms.includes(platform.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={() => togglePlatform(platform.id)}
          >
            <div className="flex items-center gap-3">
              <Checkbox
                checked={data.platforms.includes(platform.id)}
                onCheckedChange={() => togglePlatform(platform.id)}
                className="w-5 h-5"
              />
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl">{platform.icon}</span>
                <div>
                  <p 
                    className="text-gray-900"
                    style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}
                  >
                    {platform.name}
                  </p>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
                    {platform.provider}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selection Counter */}
      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-green-900" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          ✓ {data.platforms.length} platform{data.platforms.length !== 1 ? 's' : ''} selected
        </p>
        <p className="text-xs text-green-700 mt-1" style={{ fontFamily: 'Open Sans' }}>
          Testing multiple platforms gives you the most comprehensive view of your AI visibility
        </p>
      </div>
    </div>
  );
}
