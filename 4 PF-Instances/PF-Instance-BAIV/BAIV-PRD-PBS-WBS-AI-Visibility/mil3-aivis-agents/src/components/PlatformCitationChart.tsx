import { Card } from './ui/card';

interface PlatformCitationChartProps {
  platformCitationRates?: {
    chatgpt: number;
    claude: number;
    perplexity: number;
    gemini: number;
  };
  visibilityScore?: number;
}

export function PlatformCitationChart({ platformCitationRates, visibilityScore }: PlatformCitationChartProps) {
  // Default values if data is undefined
  const rates = platformCitationRates || {
    chatgpt: 0,
    claude: 0,
    perplexity: 0,
    gemini: 0
  };

  const platforms = [
    { name: 'ChatGPT', rate: rates.chatgpt || 0, icon: '🤖' },
    { name: 'Claude', rate: rates.claude || 0, icon: '🧠' },
    { name: 'Perplexity', rate: rates.perplexity || 0, icon: '🔮' },
    { name: 'Gemini', rate: rates.gemini || 0, icon: '✨' }
  ];

  return (
    <Card className="p-6 bg-white rounded-2xl shadow-sm mt-6">
      <h3 
        className="text-[#000000] mb-1" 
        style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}
      >
        Citations by Platform
      </h3>
      <p className="text-gray-500 text-sm mb-6" style={{ fontFamily: 'Open Sans' }}>
        How often AI platforms cite your brand
      </p>

      <div className="space-y-2">
        {platforms.map((platform) => (
          <div key={platform.name} className="flex items-center gap-4">
            {/* Icon */}
            <div className="w-8 h-8 flex items-center justify-center text-xl">
              {platform.icon}
            </div>

            {/* Platform Name */}
            <div className="w-24">
              <p className="text-[#000000] text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                {platform.name}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 h-10 bg-gray-100 rounded-lg overflow-hidden relative">
              <div
                className="h-full bg-[#2990C6] transition-all duration-500 ease-out rounded-lg"
                style={{ width: `${platform.rate}%` }}
              />
            </div>

            {/* Percentage */}
            <div className="w-12 text-right">
              <span 
                className="text-[#000000]" 
                style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '16px' }}
              >
                {platform.rate}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}