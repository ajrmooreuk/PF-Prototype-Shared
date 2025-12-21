import { Card } from '../ui/card';
import { Check, Building, Globe, Target, Users, Mic, MessageSquare } from 'lucide-react';

interface Step7Props {
  data: any;
}

export function Step7Review({ data }: Step7Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 
          className="text-[#111827] mb-2"
          style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}
        >
          Ready to launch your AI visibility audit?
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Review your information and launch your first discovery audit
        </p>
      </div>

      {/* Summary Cards */}
      <div className="space-y-3">
        {/* Company Info */}
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-white border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Building className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                Company
              </h3>
              <p className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 600 }}>
                {data.companyName}
              </p>
              <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Open Sans' }}>
                {data.industry}
              </p>
            </div>
            <Check className="w-5 h-5 text-green-500" />
          </div>
        </Card>

        {/* Website */}
        <Card className="p-4 bg-gradient-to-r from-purple-50 to-white border-purple-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                Website
              </h3>
              <p className="text-gray-700 break-all" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                {data.websiteUrl}
              </p>
            </div>
            <Check className="w-5 h-5 text-green-500" />
          </div>
        </Card>

        {/* Keywords */}
        <Card className="p-4 bg-gradient-to-r from-green-50 to-white border-green-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                Target Keywords
              </h3>
              <p className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 600 }}>
                {data.targetKeywords.length} keywords configured
              </p>
              <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Open Sans' }}>
                {data.targetKeywords.slice(0, 3).join(', ')}
                {data.targetKeywords.length > 3 && ` +${data.targetKeywords.length - 3} more`}
              </p>
            </div>
            <Check className="w-5 h-5 text-green-500" />
          </div>
        </Card>

        {/* Competitors */}
        <Card className="p-4 bg-gradient-to-r from-orange-50 to-white border-orange-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                Competitors
              </h3>
              <p className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 600 }}>
                {data.competitors.length} competitors added
              </p>
              <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Open Sans' }}>
                Ready for competitive analysis
              </p>
            </div>
            <Check className="w-5 h-5 text-green-500" />
          </div>
        </Card>

        {/* Platforms */}
        <Card className="p-4 bg-gradient-to-r from-indigo-50 to-white border-indigo-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                AI Platforms
              </h3>
              <p className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 600 }}>
                {data.platforms.length} platforms selected
              </p>
              <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Open Sans' }}>
                {data.platforms.map((p: string) => p.charAt(0).toUpperCase() + p.slice(1)).join(', ')}
              </p>
            </div>
            <Check className="w-5 h-5 text-green-500" />
          </div>
        </Card>

        {/* Brand Voice */}
        <Card className="p-4 bg-gradient-to-r from-pink-50 to-white border-pink-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
              <Mic className="w-5 h-5 text-pink-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                Brand Voice
              </h3>
              <p className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 600 }}>
                AI voice profile configured
              </p>
              <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Open Sans' }}>
                {data.expertiseAreas.length} expertise area{data.expertiseAreas.length !== 1 ? 's' : ''} • {
                  data.emailExample || data.socialPostExample || data.blogExample 
                    ? 'Voice examples provided' 
                    : 'Ready to generate'
                }
              </p>
            </div>
            <Check className="w-5 h-5 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Launch Message */}
      <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white">
        <h3 className="mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}>
          🚀 We'll now run your first AI visibility audit
        </h3>
        <p className="text-blue-100" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          This typically takes 2-3 minutes. You'll see real-time progress updates as we analyze your visibility across all selected AI platforms.
        </p>
      </div>
    </div>
  );
}
