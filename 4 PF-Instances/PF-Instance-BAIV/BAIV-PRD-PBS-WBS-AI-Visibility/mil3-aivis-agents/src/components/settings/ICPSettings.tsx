import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';
import { Target, Plus, X, Info, Save } from 'lucide-react';
import { callEccoAPI } from '../../lib/eccoAPI';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface ICPProfile {
  icp_id: string;
  name: string;
  description: string;
  industries: string[];
  company_sizes: string[];
  target_roles: string[];
  pain_points: string[];
  goals: string[];
  keywords: string[];
  match_threshold: number;
  created_at: string;
  updated_at: string;
}

export function ICPSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [icpProfile, setIcpProfile] = useState<ICPProfile>({
    icp_id: '',
    name: '',
    description: '',
    industries: [],
    company_sizes: [],
    target_roles: [],
    pain_points: [],
    goals: [],
    keywords: [],
    match_threshold: 70,
    created_at: '',
    updated_at: ''
  });
  
  const [newPainPoint, setNewPainPoint] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [newKeyword, setNewKeyword] = useState('');

  useEffect(() => {
    loadICPProfile();
  }, []);

  const loadICPProfile = async () => {
    setLoading(true);
    try {
      // NOTE: /settings/icp-profile endpoint doesn't exist in backend yet
      // For now, use default ICP profile data
      // TODO: Backend needs to implement GET /settings/icp-profile endpoint
      
      // const response = await callEccoAPI('/settings/icp-profile', 'GET');
      // if (response && response.icp_profile) {
      //   setIcpProfile(response.icp_profile);
      // }
      
      // Use default ICP profile with empty state for user to fill in
      setIcpProfile({
        icp_id: 'default-icp',
        name: 'Default ICP',
        description: '',
        industries: [],
        company_sizes: [],
        target_roles: [],
        pain_points: [],
        goals: [],
        keywords: [],
        match_threshold: 70,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    } catch (error: any) {
      console.error('Failed to load ICP profile:', error);
      // Use default empty profile
      setIcpProfile({
        icp_id: 'default-icp',
        name: 'Default ICP',
        description: '',
        industries: [],
        company_sizes: [],
        target_roles: [],
        pain_points: [],
        goals: [],
        keywords: [],
        match_threshold: 70,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!icpProfile.name.trim()) {
      toast.error('Please provide an ICP name');
      return;
    }
    
    if (!icpProfile.description.trim()) {
      toast.error('Please provide an ICP description');
      return;
    }

    setSaving(true);
    try {
      const endpoint = icpProfile.icp_id 
        ? `/settings/icp-profile/${icpProfile.icp_id}` 
        : '/settings/icp-profile';
      const method = icpProfile.icp_id ? 'PUT' : 'POST';
      
      const response = await callEccoAPI(endpoint, method, {
        name: icpProfile.name,
        description: icpProfile.description,
        industries: icpProfile.industries,
        company_sizes: icpProfile.company_sizes,
        target_roles: icpProfile.target_roles,
        pain_points: icpProfile.pain_points,
        goals: icpProfile.goals,
        keywords: icpProfile.keywords,
        match_threshold: icpProfile.match_threshold
      });
      
      if (response && response.icp_profile) {
        setIcpProfile(response.icp_profile);
      }
      
      toast.success('ICP profile saved successfully');
    } catch (error: any) {
      console.error('Failed to save ICP profile:', error);
      toast.error(error.message || 'Failed to save ICP profile');
    } finally {
      setSaving(false);
    }
  };

  const addPainPoint = () => {
    if (newPainPoint.trim()) {
      setIcpProfile({
        ...icpProfile,
        pain_points: [...icpProfile.pain_points, newPainPoint.trim()]
      });
      setNewPainPoint('');
    }
  };

  const removePainPoint = (index: number) => {
    setIcpProfile({
      ...icpProfile,
      pain_points: icpProfile.pain_points.filter((_, i) => i !== index)
    });
  };

  const addGoal = () => {
    if (newGoal.trim()) {
      setIcpProfile({
        ...icpProfile,
        goals: [...icpProfile.goals, newGoal.trim()]
      });
      setNewGoal('');
    }
  };

  const removeGoal = (index: number) => {
    setIcpProfile({
      ...icpProfile,
      goals: icpProfile.goals.filter((_, i) => i !== index)
    });
  };

  const addKeyword = () => {
    if (newKeyword.trim()) {
      setIcpProfile({
        ...icpProfile,
        keywords: [...icpProfile.keywords, newKeyword.trim()]
      });
      setNewKeyword('');
    }
  };

  const removeKeyword = (index: number) => {
    setIcpProfile({
      ...icpProfile,
      keywords: icpProfile.keywords.filter((_, i) => i !== index)
    });
  };

  const toggleIndustry = (industry: string) => {
    setIcpProfile({
      ...icpProfile,
      industries: icpProfile.industries.includes(industry)
        ? icpProfile.industries.filter(i => i !== industry)
        : [...icpProfile.industries, industry]
    });
  };

  const toggleCompanySize = (size: string) => {
    setIcpProfile({
      ...icpProfile,
      company_sizes: icpProfile.company_sizes.includes(size)
        ? icpProfile.company_sizes.filter(s => s !== size)
        : [...icpProfile.company_sizes, size]
    });
  };

  const toggleTargetRole = (role: string) => {
    setIcpProfile({
      ...icpProfile,
      target_roles: icpProfile.target_roles.includes(role)
        ? icpProfile.target_roles.filter(r => r !== role)
        : [...icpProfile.target_roles, role]
    });
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2990C6] mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: 'Open Sans' }}>Loading ICP profile...</p>
        </div>
      </div>
    );
  }

  const industryOptions = [
    'Healthcare & Medical',
    'Technology & Software',
    'Financial Services',
    'E-commerce & Retail',
    'Manufacturing',
    'Professional Services',
    'Education',
    'Real Estate',
    'Marketing & Advertising',
    'Legal',
    'Other'
  ];

  const companySizeOptions = [
    'Solo Practitioner',
    '2-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '500+ employees'
  ];

  const targetRoleOptions = [
    'CEO / Founder',
    'CMO / Marketing Director',
    'CTO / Technical Director',
    'VP of Sales',
    'Operations Manager',
    'Product Manager',
    'Business Owner',
    'Marketing Manager',
    'Sales Manager'
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Target className="w-5 h-5 text-[#2990C6]" />
          </div>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '24px', color: '#1a1a1a' }}>
            Ideal Customer Profile (ICP)
          </h2>
        </div>
        <p className="text-gray-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '15px' }}>
          Define your ideal customer to improve relevance scoring in Discovery Audit results
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#1a1a1a' }}>
            Your ICP definition is used to calculate relevance scores in the Discovery Audit feature. 
            The more detailed your profile, the better we can match queries to your ideal customers.
          </p>
        </div>
      </div>

      <form onSubmit={handleSaveProfile}>
        {/* Basic Information */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }} className="mb-4">
            Basic Information
          </h3>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="icp_name" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                ICP Name
              </Label>
              <Input
                id="icp_name"
                value={icpProfile.name}
                onChange={(e) => setIcpProfile({ ...icpProfile, name: e.target.value })}
                placeholder="e.g., Small Business Healthcare Providers"
                className="mt-2"
                style={{ fontFamily: 'Open Sans' }}
              />
            </div>

            <div>
              <Label htmlFor="description" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                Description
              </Label>
              <Textarea
                id="description"
                value={icpProfile.description}
                onChange={(e) => setIcpProfile({ ...icpProfile, description: e.target.value })}
                placeholder="Describe your ideal customer in detail. Who are they? What challenges do they face? What are they looking for?"
                rows={5}
                className="mt-2"
                style={{ fontFamily: 'Open Sans' }}
              />
              <p className="text-gray-500 text-sm mt-2" style={{ fontFamily: 'Open Sans' }}>
                Be specific about demographics, firmographics, and characteristics of your ideal customer.
              </p>
            </div>
          </div>
        </div>

        {/* Industries */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }} className="mb-2">
            Industries
          </h3>
          <p className="text-gray-600 mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            Select the industries your ideal customers operate in
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {industryOptions.map((industry) => (
              <button
                key={industry}
                type="button"
                onClick={() => toggleIndustry(industry)}
                className={`px-4 py-3 rounded-lg border-2 transition-all text-left ${
                  icpProfile.industries.includes(industry)
                    ? 'border-[#2990C6] bg-blue-50 text-blue-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <span style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: icpProfile.industries.includes(industry) ? 600 : 400 }}>
                  {industry}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Company Size */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }} className="mb-2">
            Company Size
          </h3>
          <p className="text-gray-600 mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            Select the company sizes that match your ideal customers
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {companySizeOptions.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleCompanySize(size)}
                className={`px-4 py-3 rounded-lg border-2 transition-all text-left ${
                  icpProfile.company_sizes.includes(size)
                    ? 'border-[#2990C6] bg-blue-50 text-blue-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <span style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: icpProfile.company_sizes.includes(size) ? 600 : 400 }}>
                  {size}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Target Roles */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }} className="mb-2">
            Target Roles & Titles
          </h3>
          <p className="text-gray-600 mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            Select the job titles or roles of your ideal customers
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {targetRoleOptions.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => toggleTargetRole(role)}
                className={`px-4 py-3 rounded-lg border-2 transition-all text-left ${
                  icpProfile.target_roles.includes(role)
                    ? 'border-[#2990C6] bg-blue-50 text-blue-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <span style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: icpProfile.target_roles.includes(role) ? 600 : 400 }}>
                  {role}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Pain Points */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }} className="mb-2">
            Pain Points
          </h3>
          <p className="text-gray-600 mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            What challenges or problems does your ideal customer face?
          </p>
          
          <div className="flex gap-2 mb-4">
            <Input
              value={newPainPoint}
              onChange={(e) => setNewPainPoint(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPainPoint())}
              placeholder="e.g., Struggling to attract new patients"
              style={{ fontFamily: 'Open Sans' }}
            />
            <Button
              type="button"
              onClick={addPainPoint}
              className="bg-[#2990C6] hover:bg-[#2176AD] text-white flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {icpProfile.pain_points.length > 0 && (
            <div className="space-y-2">
              {icpProfile.pain_points.map((painPoint, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200"
                >
                  <span style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#1a1a1a' }}>
                    {painPoint}
                  </span>
                  <button
                    type="button"
                    onClick={() => removePainPoint(index)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Goals */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }} className="mb-2">
            Goals & Objectives
          </h3>
          <p className="text-gray-600 mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            What is your ideal customer trying to achieve?
          </p>
          
          <div className="flex gap-2 mb-4">
            <Input
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGoal())}
              placeholder="e.g., Increase patient acquisition by 30%"
              style={{ fontFamily: 'Open Sans' }}
            />
            <Button
              type="button"
              onClick={addGoal}
              className="bg-[#2990C6] hover:bg-[#2176AD] text-white flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {icpProfile.goals.length > 0 && (
            <div className="space-y-2">
              {icpProfile.goals.map((goal, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200"
                >
                  <span style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#1a1a1a' }}>
                    {goal}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeGoal(index)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Keywords */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }} className="mb-2">
            Keywords & Topics
          </h3>
          <p className="text-gray-600 mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            What keywords or topics are relevant to your ideal customer?
          </p>
          
          <div className="flex gap-2 mb-4">
            <Input
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
              placeholder="e.g., patient retention, medical marketing"
              style={{ fontFamily: 'Open Sans' }}
            />
            <Button
              type="button"
              onClick={addKeyword}
              className="bg-[#2990C6] hover:bg-[#2176AD] text-white flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {icpProfile.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {icpProfile.keywords.map((keyword, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-blue-50 text-blue-900 rounded-full px-4 py-2 border border-blue-200"
                >
                  <span style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                    {keyword}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeKeyword(index)}
                    className="text-[#2990C6] hover:text-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Match Threshold */}
        <div className="mb-8">
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }} className="mb-2">
            Match Threshold
          </h3>
          <p className="text-gray-600 mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            Minimum relevance score (0-100%) required for a query to be considered a match
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#666' }}>
                Current Threshold
              </span>
              <span style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '24px', color: '#2990C6' }}>
                {icpProfile.match_threshold}%
              </span>
            </div>
            
            <input
              type="range"
              min="0"
              max="100"
              value={icpProfile.match_threshold}
              onChange={(e) => setIcpProfile({ ...icpProfile, match_threshold: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                accentColor: '#2990C6'
              }}
            />
            
            <div className="flex justify-between mt-2">
              <span style={{ fontFamily: 'Open Sans', fontSize: '12px', color: '#999' }}>
                0% (Show all)
              </span>
              <span style={{ fontFamily: 'Open Sans', fontSize: '12px', color: '#999' }}>
                100% (Perfect match only)
              </span>
            </div>
            
            <div className="mt-4 p-3 bg-white rounded border border-gray-200">
              <p style={{ fontFamily: 'Open Sans', fontSize: '13px', color: '#666' }}>
                {icpProfile.match_threshold < 30 && "Very broad matching - includes queries with minimal relevance"}
                {icpProfile.match_threshold >= 30 && icpProfile.match_threshold < 50 && "Moderate matching - includes queries with some relevance"}
                {icpProfile.match_threshold >= 50 && icpProfile.match_threshold < 70 && "Balanced matching - good mix of relevance and volume"}
                {icpProfile.match_threshold >= 70 && icpProfile.match_threshold < 90 && "Strict matching - only highly relevant queries"}
                {icpProfile.match_threshold >= 90 && "Very strict matching - only near-perfect ICP matches"}
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={loadICPProfile}
            disabled={saving}
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={saving}
            className="bg-[#2990C6] hover:bg-[#2176AD] text-white"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save ICP Profile
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}