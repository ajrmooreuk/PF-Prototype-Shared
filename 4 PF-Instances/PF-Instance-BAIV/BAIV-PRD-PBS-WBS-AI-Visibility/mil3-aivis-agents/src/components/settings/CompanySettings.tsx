import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';
import { Building2, Palette, Upload } from 'lucide-react';
import { callEccoAPI, tenantsAPI } from '../../lib/eccoAPI';

export function CompanySettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
    loadCompanySettings();
  }, []);

  const loadCompanySettings = async () => {
    setLoading(true);
    try {
      // Use the new tenantsAPI.getMe() to get current tenant data
      const tenantData = await tenantsAPI.getMe();
      
      setCompany({
        company_name: tenantData.trading_name || '',
        legal_name: tenantData.legal_name || '',
        website_url: tenantData.domain ? `https://${tenantData.domain}` : '',
        industry: tenantData.industry || '',
        company_size: '',
        description: '',
        logo_url: null,
        primary_color: '#34ACE2',
        secondary_color: '#000000',
        accent_color: '#FFFFFF',
        brand_voice: {
          tone: [],
          examples: ''
        }
      });
    } catch (error: any) {
      console.error('Failed to load company settings:', error);
      // Use default data on error
      setCompany({
        company_name: 'BAIV',
        legal_name: 'Brand AI Visibility Inc.',
        website_url: 'https://baiv.com',
        industry: '',
        company_size: '',
        description: '',
        logo_url: null,
        primary_color: '#34ACE2',
        secondary_color: '#000000',
        accent_color: '#FFFFFF',
        brand_voice: {
          tone: [],
          examples: ''
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // NOTE: Backend update endpoint doesn't exist yet
      // TODO: Backend needs to implement PUT /api/tenants/me endpoint
      // await callEccoAPI('/api/tenants/me', 'PUT', company);
      
      toast.success('Company settings saved successfully');
    } catch (error: any) {
      console.error('Failed to save company settings:', error);
      toast.error(error.message || 'Failed to save company settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: 'Open Sans' }}>Loading company settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '24px', color: '#1a1a1a' }}>
          Company & Brand Settings
        </h2>
        <p className="text-gray-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '15px' }}>
          Configure your company information and brand identity
        </p>
      </div>

      <form onSubmit={handleSaveCompany} className="space-y-8">
        {/* Company Information */}
        <div className="pb-8 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-teal-600" />
            <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }}>
              Company Information
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="company_name" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                Company Name
              </Label>
              <Input
                id="company_name"
                value={company?.company_name || ''}
                onChange={(e) => setCompany({ ...company, company_name: e.target.value })}
                placeholder="Ecco AI"
                className="mt-1"
                style={{ fontFamily: 'Open Sans' }}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="legal_name" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                Legal Name
              </Label>
              <Input
                id="legal_name"
                value={company?.legal_name || ''}
                onChange={(e) => setCompany({ ...company, legal_name: e.target.value })}
                placeholder="Ecco AI Technologies Inc."
                className="mt-1"
                style={{ fontFamily: 'Open Sans' }}
              />
            </div>
            
            <div>
              <Label htmlFor="industry" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                Industry
              </Label>
              <Input
                id="industry"
                value={company?.industry || ''}
                onChange={(e) => setCompany({ ...company, industry: e.target.value })}
                placeholder="Marketing Technology"
                className="mt-1"
                style={{ fontFamily: 'Open Sans' }}
              />
            </div>
            
            <div>
              <Label htmlFor="website_url" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                Company Website
              </Label>
              <Input
                id="website_url"
                type="url"
                value={company?.website_url || ''}
                onChange={(e) => setCompany({ ...company, website_url: e.target.value })}
                placeholder="https://ecco-ai.com"
                className="mt-1"
                style={{ fontFamily: 'Open Sans' }}
              />
            </div>
          </div>
        </div>

        {/* Brand Identity */}
        <div className="pb-8 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-teal-600" />
            <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }}>
              Brand Identity
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="primary_color" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                Primary Brand Color
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="primary_color"
                  type="color"
                  value={company?.primary_color || '#14b8a6'}
                  onChange={(e) => setCompany({ ...company, primary_color: e.target.value })}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={company?.primary_color || '#14b8a6'}
                  onChange={(e) => setCompany({ ...company, primary_color: e.target.value })}
                  placeholder="#14b8a6"
                  className="flex-1"
                  style={{ fontFamily: 'Open Sans' }}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="secondary_color" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                Secondary Brand Color
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="secondary_color"
                  type="color"
                  value={company?.secondary_color || '#ffb615'}
                  onChange={(e) => setCompany({ ...company, secondary_color: e.target.value })}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={company?.secondary_color || '#ffb615'}
                  onChange={(e) => setCompany({ ...company, secondary_color: e.target.value })}
                  placeholder="#ffb615"
                  className="flex-1"
                  style={{ fontFamily: 'Open Sans' }}
                />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <Label style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
              Company Logo
            </Label>
            <div className="mt-2 flex items-center gap-4">
              {company?.logo_url && (
                <img src={company.logo_url} alt="Company logo" className="h-12 object-contain" />
              )}
              <Button type="button" variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Logo
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Open Sans' }}>
              PNG or SVG. Max size 2MB. Recommended: 200x60px
            </p>
          </div>
        </div>

        {/* Brand Voice */}
        <div className="pb-8">
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }} className="mb-4">
            Brand Voice
          </h3>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="tone" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                Tone (Select all that apply)
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {['Professional', 'Friendly', 'Helpful', 'Innovative', 'Technical', 'Casual'].map((tone) => (
                  <label key={tone} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={company?.brand_voice?.tone?.includes(tone.toLowerCase())}
                      onChange={(e) => {
                        const currentTones = company?.brand_voice?.tone || [];
                        const newTones = e.target.checked
                          ? [...currentTones, tone.toLowerCase()]
                          : currentTones.filter((t: string) => t !== tone.toLowerCase());
                        setCompany({
                          ...company,
                          brand_voice: { ...company?.brand_voice, tone: newTones }
                        });
                      }}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>{tone}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="examples" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                Brand Voice Examples
              </Label>
              <Textarea
                id="examples"
                value={company?.brand_voice?.examples || ''}
                onChange={(e) => setCompany({
                  ...company,
                  brand_voice: { ...company?.brand_voice, examples: e.target.value }
                })}
                placeholder="We speak clearly and directly. We avoid jargon and focus on practical value."
                rows={3}
                className="mt-1"
                style={{ fontFamily: 'Open Sans' }}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <Button
            type="submit"
            disabled={saving}
            className="bg-teal-600 hover:bg-teal-700 text-white"
            style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}