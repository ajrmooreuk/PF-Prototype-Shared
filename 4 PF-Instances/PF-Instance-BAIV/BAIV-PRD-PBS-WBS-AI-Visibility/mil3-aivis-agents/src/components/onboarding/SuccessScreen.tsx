import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Check, Copy, Download, ExternalLink, Mail, User, Building, Globe, Key } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SuccessScreenProps {
  credentials: {
    email: string;
    temporary_password: string;
    first_name: string;
    last_name: string;
    company_name: string;
    dashboard_url: string;
  };
  auditProgress: number;
  auditStatus: string;
  onDone: () => void;
}

export function SuccessScreen({ credentials, auditProgress, auditStatus, onDone }: SuccessScreenProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const copyAllCredentials = () => {
    const allCreds = `
BAIV AI Visibility Platform - Client Login Credentials
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Client Name: ${credentials.first_name} ${credentials.last_name}
Company: ${credentials.company_name}

Login Email: ${credentials.email}
Temporary Password: ${credentials.temporary_password}

Dashboard URL: ${credentials.dashboard_url}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPORTANT: Client should change password on first login
    `.trim();
    
    navigator.clipboard.writeText(allCreds);
    toast.success('All credentials copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h1 
            className="text-green-700 mb-2"
            style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}
          >
            ✅ {credentials.company_name} Onboarded Successfully!
          </h1>
          <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
            Client account created and discovery audit is running
          </p>
        </div>

        {/* Credentials Card */}
        <Card className="mb-6 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-white">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 
                className="text-[#111827] flex items-center gap-2"
                style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}
              >
                <Key className="w-6 h-6 text-blue-600" />
                Client Login Credentials
              </h2>
              <Button
                onClick={copyAllCredentials}
                variant="outline"
                className="border-blue-500 text-blue-700 hover:bg-blue-50"
                style={{ fontFamily: 'Poppins', fontWeight: 600 }}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy All
              </Button>
            </div>

            <div className="space-y-4">
              {/* Client Name */}
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                <User className="w-5 h-5 text-gray-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-gray-600 mb-1" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                    Client Name
                  </p>
                  <p className="text-gray-900" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 600 }}>
                    {credentials.first_name} {credentials.last_name}
                  </p>
                </div>
              </div>

              {/* Company */}
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                <Building className="w-5 h-5 text-gray-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-gray-600 mb-1" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                    Company
                  </p>
                  <p className="text-gray-900" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 600 }}>
                    {credentials.company_name}
                  </p>
                </div>
              </div>

              {/* Login Email */}
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-gray-600 mb-1" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                    Login Email
                  </p>
                  <p className="text-gray-900 break-all" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 600 }}>
                    {credentials.email}
                  </p>
                </div>
                <Button
                  onClick={() => copyToClipboard(credentials.email, 'email')}
                  variant="ghost"
                  size="sm"
                  className="flex-shrink-0"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Temporary Password */}
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-300">
                <Key className="w-5 h-5 text-yellow-700 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-yellow-900 mb-1" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                    Temporary Password
                  </p>
                  <p className="text-yellow-900 font-mono break-all" style={{ fontSize: '16px', fontWeight: 700 }}>
                    {credentials.temporary_password}
                  </p>
                  <p className="text-xs text-yellow-700 mt-1" style={{ fontFamily: 'Open Sans' }}>
                    ⚠️ Client must change this on first login
                  </p>
                </div>
                <Button
                  onClick={() => copyToClipboard(credentials.temporary_password, 'password')}
                  variant="ghost"
                  size="sm"
                  className="flex-shrink-0"
                >
                  {copiedField === 'password' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Dashboard URL */}
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                <Globe className="w-5 h-5 text-gray-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-gray-600 mb-1" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                    Dashboard URL
                  </p>
                  <p className="text-blue-600 break-all" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 600 }}>
                    {credentials.dashboard_url}
                  </p>
                </div>
                <Button
                  onClick={() => copyToClipboard(credentials.dashboard_url, 'url')}
                  variant="ghost"
                  size="sm"
                  className="flex-shrink-0"
                >
                  {copiedField === 'url' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Email Confirmation */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900 flex items-center gap-2" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            <Mail className="w-4 h-4" />
            ✉️ These credentials have also been emailed to: <span className="font-mono">milana@eccoai.ai</span>
          </p>
        </div>

        {/* Audit Status */}
        <Card className="mb-6 bg-gradient-to-r from-purple-50 to-white border-purple-200">
          <div className="p-6">
            <h3 
              className="text-[#111827] mb-3 flex items-center gap-2"
              style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}
            >
              🔄 Discovery Audit Status: {auditProgress < 100 ? 'Running' : 'Completed'}
            </h3>
            <div className="mb-4">
              <Progress value={auditProgress} className="h-3 mb-2" />
              <p className="text-sm text-purple-700" style={{ fontFamily: 'Open Sans' }}>
                ⚡ {auditStatus}
              </p>
            </div>
            <p className="text-xs text-gray-600" style={{ fontFamily: 'Open Sans' }}>
              Estimated time remaining: {Math.max(0, Math.ceil((100 - auditProgress) / 10))} minutes
            </p>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="mb-6 bg-gradient-to-r from-green-50 to-white border-green-200">
          <div className="p-6">
            <h3 
              className="text-[#111827] mb-3"
              style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}
            >
              💡 Next Steps
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                <span className="text-green-600 flex-shrink-0">1.</span>
                <span>Copy these credentials (also sent to your email)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                <span className="text-green-600 flex-shrink-0">2.</span>
                <span>Send them to your client securely</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                <span className="text-green-600 flex-shrink-0">3.</span>
                <span>Their dashboard will show audit results in ~10 minutes</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                <span className="text-green-600 flex-shrink-0">4.</span>
                <span>They should change their password on first login</span>
              </li>
            </ul>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => window.open(credentials.dashboard_url, '_blank')}
            variant="outline"
            className="flex-1"
            style={{ fontFamily: 'Poppins', fontWeight: 600 }}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Dashboard
          </Button>
          <Button
            onClick={onDone}
            className="flex-1 bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
            style={{ fontFamily: 'Poppins', fontWeight: 600 }}
          >
            Done
          </Button>
        </div>
      </Card>
    </div>
  );
}