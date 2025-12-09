import { Check } from 'lucide-react';

export function PlatformFeatures() {
  const features = [
    'Platform-specific optimization',
    'Auto hashtag generation',
    'AI image creation',
    'Engagement scoring',
    'Discovery intelligence',
    'ICP targeting',
    'Brand voice matching'
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-[#005260] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
        AI Features
      </h3>

      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#02a4bf]/10 flex items-center justify-center mt-0.5">
              <Check className="h-3 w-3 text-[#02a4bf]" />
            </div>
            <span className="text-[#374151]" style={{ fontFamily: 'Open Sans' }}>
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
