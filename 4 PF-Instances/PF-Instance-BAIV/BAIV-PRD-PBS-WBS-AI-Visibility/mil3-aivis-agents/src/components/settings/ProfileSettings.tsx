import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner@2.0.3';
import { User, Lock, Upload } from 'lucide-react';
import { callEccoAPI } from '../../lib/eccoAPI';

interface ProfileSettingsProps {
  userProfile: {
    user_id: string;
    role: string;
    full_name: string;
    email: string;
  };
}

export function ProfileSettings({ userProfile }: ProfileSettingsProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      // NOTE: /auth/me endpoint doesn't exist in backend yet
      // For now, use the userProfile prop directly instead of making API call
      // TODO: Backend needs to implement GET /auth/me endpoint
      
      // const response = await callEccoAPI('/auth/me', 'GET');
      // setProfile(response);
      
      // Use userProfile prop directly
      setProfile({
        user_id: userProfile.user_id,
        full_name: userProfile.full_name || 'Admin User',
        email: userProfile.email || 'admin@baiv.com',
        phone: '',
        job_title: userProfile.role || 'Administrator',
        department: '',
        timezone: 'UTC',
        language: 'en',
        avatar_url: null
      });
    } catch (error: any) {
      console.error('Failed to load profile:', error);
      // Set default profile on error
      setProfile({
        user_id: userProfile.user_id,
        full_name: userProfile.full_name || 'Admin User',
        email: userProfile.email || 'admin@baiv.com',
        phone: '',
        job_title: userProfile.role || 'Administrator',
        department: '',
        timezone: 'UTC',
        language: 'en',
        avatar_url: null
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Split full name into first and last
      const nameParts = profile.full_name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const updates = {
        first_name: firstName,
        last_name: lastName,
        email: profile.email,
        phone: profile.phone,
        job_title: profile.job_title,
        department: profile.department,
        timezone: profile.timezone,
        language: profile.language
      };

      await callEccoAPI(`/admin/team/members/${profile.user_id}`, 'PATCH', updates);
      
      // Update localStorage if email changed
      if (profile.email !== userProfile.email) {
        localStorage.setItem('user_email', profile.email);
      }
      
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Failed to save profile:', error);
      toast.error(error.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (passwordData.new_password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    
    setSaving(true);
    try {
      await callEccoAPI('/auth/change-password', 'POST', {
        current_password: passwordData.current_password,
        new_password: passwordData.new_password
      });
      
      toast.success('Password changed successfully');
      setShowPasswordForm(false);
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });
    } catch (error: any) {
      console.error('Failed to change password:', error);
      toast.error(error.message || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: 'Open Sans' }}>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '24px', color: '#1a1a1a' }}>
          Profile Settings
        </h2>
        <p className="text-gray-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '15px' }}>
          Manage your personal information and account settings
        </p>
      </div>

      {/* Profile Picture */}
      <div className="mb-8 pb-8 border-b border-gray-200">
        <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }} className="mb-4">
          Profile Picture
        </h3>
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.full_name} className="w-20 h-20 rounded-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-teal-600" />
            )}
          </div>
          <div>
            <Button variant="outline" className="mb-2">
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Open Sans' }}>
              JPG, PNG or GIF. Max size 5MB.
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <form onSubmit={handleSaveProfile} className="mb-8 pb-8 border-b border-gray-200">
        <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }} className="mb-4">
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="full_name" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
              Full Name
            </Label>
            <Input
              id="full_name"
              value={profile.full_name || ''}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              className="mt-1"
              style={{ fontFamily: 'Open Sans' }}
            />
          </div>
          
          <div>
            <Label htmlFor="email" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={profile.email || ''}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="mt-1"
              style={{ fontFamily: 'Open Sans' }}
            />
          </div>
          
          <div>
            <Label htmlFor="phone" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={profile.phone || ''}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="mt-1"
              style={{ fontFamily: 'Open Sans' }}
            />
          </div>
          
          <div>
            <Label htmlFor="job_title" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
              Job Title
            </Label>
            <Input
              id="job_title"
              value={profile.job_title || ''}
              onChange={(e) => setProfile({ ...profile, job_title: e.target.value })}
              placeholder="Head of Marketing"
              className="mt-1"
              style={{ fontFamily: 'Open Sans' }}
            />
          </div>
          
          <div>
            <Label htmlFor="department" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
              Department
            </Label>
            <Input
              id="department"
              value={profile.department || ''}
              onChange={(e) => setProfile({ ...profile, department: e.target.value })}
              placeholder="Marketing"
              className="mt-1"
              style={{ fontFamily: 'Open Sans' }}
            />
          </div>
          
          <div>
            <Label htmlFor="timezone" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
              Timezone
            </Label>
            <Select value={profile.timezone || ''} onValueChange={(value) => setProfile({ ...profile, timezone: value })}>
              <SelectTrigger className="mt-1" style={{ fontFamily: 'Open Sans' }}>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                <SelectItem value="Europe/London">London (GMT)</SelectItem>
                <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end">
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

      {/* Password */}
      <div>
        <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }} className="mb-4">
          Password
        </h3>
        
        {!showPasswordForm ? (
          <Button
            variant="outline"
            onClick={() => setShowPasswordForm(true)}
            className="mb-4"
          >
            <Lock className="w-4 h-4 mr-2" />
            Change Password
          </Button>
        ) : (
          <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
            <div>
              <Label htmlFor="current_password" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                Current Password
              </Label>
              <Input
                id="current_password"
                type="password"
                value={passwordData.current_password}
                onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                className="mt-1"
                required
                style={{ fontFamily: 'Open Sans' }}
              />
            </div>
            
            <div>
              <Label htmlFor="new_password" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                New Password
              </Label>
              <Input
                id="new_password"
                type="password"
                value={passwordData.new_password}
                onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                className="mt-1"
                required
                minLength={8}
                style={{ fontFamily: 'Open Sans' }}
              />
              <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Open Sans' }}>
                Minimum 8 characters, 1 uppercase, 1 number
              </p>
            </div>
            
            <div>
              <Label htmlFor="confirm_password" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                Confirm New Password
              </Label>
              <Input
                id="confirm_password"
                type="password"
                value={passwordData.confirm_password}
                onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                className="mt-1"
                required
                style={{ fontFamily: 'Open Sans' }}
              />
            </div>
            
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={saving}
                className="bg-teal-600 hover:bg-teal-700 text-white"
                style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
              >
                {saving ? 'Changing...' : 'Change Password'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowPasswordForm(false);
                  setPasswordData({ current_password: '', new_password: '', confirm_password: '' });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}