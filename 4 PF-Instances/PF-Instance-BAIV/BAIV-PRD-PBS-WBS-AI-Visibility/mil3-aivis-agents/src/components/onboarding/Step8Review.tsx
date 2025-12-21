import { Card } from '../ui/card';
import { User, Building, Globe, Target, Users, Mic, MessageSquare, Mail } from 'lucide-react';

interface Step8Props {
  data: any;
}

export function Step8Review({ data }: Step8Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 
          className="text-[#111827] mb-2"
          style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}
        >
          Ready to launch their AI visibility audit?
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Review the information and start the audit
        </p>
      </div>

      {/* Comprehensive Summary */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-white border-blue-200">
        {/* Client Account Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-5 h-5 text-blue-600" />
            <h3 
              className="text-[#111827]"
              style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}
            >
              CLIENT ACCOUNT
            </h3>
          </div>
          <div className="pl-7 space-y-1">
            <p className="text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
              <span className="font-semibold">Name:</span> {data.clientFirstName} {data.clientLastName}
            </p>
            <p className="text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
              <span className="font-semibold">Email:</span> {data.clientEmail}
            </p>
            {data.clientRole && (
              <p className="text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                <span className="font-semibold">Role:</span> {data.clientRole}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        {/* Company Details Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Building className="w-5 h-5 text-purple-600" />
            <h3 
              className="text-[#111827]"
              style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}
            >
              COMPANY DETAILS
            </h3>
          </div>
          <div className="pl-7 space-y-1">
            <p className="text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
              <span className="font-semibold">Company:</span> {data.companyName}
            </p>
            <p className="text-sm text-gray-700 break-all" style={{ fontFamily: 'Open Sans' }}>
              <span className="font-semibold">Website:</span> {data.websiteUrl.replace('https://', '')}
            </p>
            <p className="text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
              <span className="font-semibold">Industry:</span> {data.industry}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        {/* Targeting Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-green-600" />
            <h3 
              className="text-[#111827]"
              style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}
            >
              TARGETING
            </h3>
          </div>
          <div className="pl-7 space-y-1">
            <p className="text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
              <span className="font-semibold">Keywords:</span> {data.targetKeywords.length} configured
            </p>
            <p className="text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
              <span className="font-semibold">Competitors:</span> {data.competitors.length} added
            </p>
            <p className="text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
              <span className="font-semibold">AI Platforms:</span> {data.platforms.length} selected
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        {/* Brand Voice Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Mic className="w-5 h-5 text-pink-600" />
            <h3 
              className="text-[#111827]"
              style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}
            >
              BRAND VOICE
            </h3>
          </div>
          <div className="pl-7 space-y-1">
            <p className="text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
              <span className="font-semibold">Formality:</span> {getFormalityLabel(data.formality)} ({data.formality}/5)
            </p>
            <p className="text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
              <span className="font-semibold">Energy:</span> {getEnergyLabel(data.energy)} ({data.energy}/5)
            </p>
            <p className="text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
              <span className="font-semibold">Expertise:</span> {data.expertiseAreas.length} areas defined
            </p>
          </div>
        </div>
      </Card>

      {/* Launch Message */}
      <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white">
        <h3 className="mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}>
          🚀 We'll create a new account and run their first AI visibility audit
        </h3>
        <p className="text-blue-100 mb-3" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          This typically takes 2-3 minutes. You'll receive their login credentials via email and see them on the success screen.
        </p>
        <div className="flex items-start gap-2 text-sm text-blue-100" style={{ fontFamily: 'Open Sans' }}>
          <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>Credentials will be sent to: milana@eccoai.ai</span>
        </div>
      </div>
    </div>
  );
}

function getFormalityLabel(value: number) {
  const labels = ['Casual & Friendly', 'Conversational', 'Professional', 'Formal', 'Very Formal'];
  return labels[value - 1] || 'Professional';
}

function getEnergyLabel(value: number) {
  const labels = ['Calm & Reserved', 'Steady', 'Balanced', 'Energetic', 'Very Enthusiastic'];
  return labels[value - 1] || 'Balanced';
}