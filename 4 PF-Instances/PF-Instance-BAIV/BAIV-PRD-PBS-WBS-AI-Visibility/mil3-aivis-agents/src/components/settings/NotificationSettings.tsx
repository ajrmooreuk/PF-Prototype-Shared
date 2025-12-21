import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { toast } from 'sonner@2.0.3';
import { Bell, Mail, Smartphone } from 'lucide-react';
import { callEccoAPI } from '../../lib/eccoAPI';

export function NotificationSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState<any>(null);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    setLoading(true);
    try {
      // NOTE: /notifications/preferences endpoint doesn't exist in backend yet
      // For now, use default notification preferences
      // TODO: Backend needs to implement GET /notifications/preferences endpoint
      
      // const response = await callEccoAPI('/notifications/preferences', 'GET');
      // setPreferences(response);
      
      // Use default preferences
      setPreferences({
        email_notifications: {
          discovery_audit_complete: true,
          new_citation_opportunities: true,
          social_alerts: true,
          weekly_summary: true,
          lead_notifications: false,
          team_updates: false
        },
        push_notifications: {
          discovery_audit_complete: false,
          new_citation_opportunities: false,
          social_alerts: false,
          lead_notifications: false
        },
        notification_email: '',
        notification_phone: ''
      });
    } catch (error: any) {
      console.error('Failed to load notification preferences:', error);
      // Use default preferences on error
      setPreferences({
        email_notifications: {
          discovery_audit_complete: true,
          new_citation_opportunities: true,
          social_alerts: true,
          weekly_summary: true,
          lead_notifications: false,
          team_updates: false
        },
        push_notifications: {
          discovery_audit_complete: false,
          new_citation_opportunities: false,
          social_alerts: false,
          lead_notifications: false
        },
        notification_email: '',
        notification_phone: ''
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await callEccoAPI('/notifications/preferences', 'PUT', preferences);
      toast.success('Notification preferences saved successfully');
    } catch (error: any) {
      console.error('Failed to save preferences:', error);
      toast.error(error.message || 'Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  const updateEmailNotification = (key: string, value: boolean) => {
    setPreferences({
      ...preferences,
      email_notifications: {
        ...preferences.email_notifications,
        [key]: value
      }
    });
  };

  const updateInAppNotification = (key: string, value: boolean) => {
    setPreferences({
      ...preferences,
      push_notifications: {
        ...preferences.push_notifications,
        [key]: value
      }
    });
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: 'Open Sans' }}>Loading notification settings...</p>
        </div>
      </div>
    );
  }

  const notificationTypes = [
    { key: 'discovery_audit_complete', label: 'Discovery Audits Complete', description: 'When AI visibility audits finish running' },
    { key: 'new_citation_opportunities', label: 'New Citation Opportunities', description: 'When new citation opportunities are discovered' },
    { key: 'social_alerts', label: 'Social Alerts', description: 'When social media mentions or interactions occur' },
    { key: 'weekly_summary', label: 'Weekly Summary', description: 'A weekly summary of your activity' },
    { key: 'lead_notifications', label: 'Lead Notifications', description: 'When new leads are generated' },
    { key: 'team_updates', label: 'Team Updates', description: 'When team members make changes' }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '24px', color: '#1a1a1a' }}>
          Notification Settings
        </h2>
        <p className="text-gray-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '15px' }}>
          Manage how and when you receive notifications
        </p>
      </div>

      <form onSubmit={handleSavePreferences} className="space-y-8">
        {/* Email Notifications */}
        <div className="pb-8 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-teal-600" />
            <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }}>
              Email Notifications
            </h3>
          </div>
          
          <div className="space-y-4">
            {notificationTypes.map((type) => (
              <div key={type.key} className="flex items-start justify-between py-3">
                <div className="flex-1">
                  <label htmlFor={`email-${type.key}`} className="cursor-pointer">
                    <div style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '15px', color: '#1a1a1a' }}>
                      {type.label}
                    </div>
                    <div className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: 'Open Sans' }}>
                      {type.description}
                    </div>
                  </label>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input
                    type="checkbox"
                    id={`email-${type.key}`}
                    checked={preferences?.email_notifications?.[type.key] || false}
                    onChange={(e) => updateEmailNotification(type.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* In-App Notifications */}
        <div className="pb-8 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="w-5 h-5 text-teal-600" />
            <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }}>
              In-App Notifications
            </h3>
          </div>
          
          <div className="space-y-4">
            {notificationTypes.map((type) => (
              <div key={type.key} className="flex items-start justify-between py-3">
                <div className="flex-1">
                  <label htmlFor={`inapp-${type.key}`} className="cursor-pointer">
                    <div style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '15px', color: '#1a1a1a' }}>
                      {type.label}
                    </div>
                    <div className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: 'Open Sans' }}>
                      {type.description}
                    </div>
                  </label>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input
                    type="checkbox"
                    id={`inapp-${type.key}`}
                    checked={preferences?.push_notifications?.[type.key] || false}
                    onChange={(e) => updateInAppNotification(type.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Frequency */}
        <div className="pb-8 border-b border-gray-200">
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }} className="mb-4">
            Notification Frequency
          </h3>
          
          <div className="space-y-3">
            {[
              { value: 'immediate', label: 'Immediate', description: 'Receive notifications as they happen' },
              { value: 'daily', label: 'Daily Digest', description: 'Once per day summary at 9:00 AM' },
              { value: 'weekly', label: 'Weekly Digest', description: 'Once per week on Monday mornings' },
              { value: 'never', label: 'Never', description: 'No email notifications (in-app only)' }
            ].map((freq) => (
              <label key={freq.value} className="flex items-start gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-teal-300 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="frequency"
                  value={freq.value}
                  checked={preferences?.frequency === freq.value}
                  onChange={(e) => setPreferences({ ...preferences, frequency: e.target.value })}
                  className="mt-1 text-teal-600 focus:ring-teal-500"
                />
                <div className="flex-1">
                  <div style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '15px', color: '#1a1a1a' }}>
                    {freq.label}
                  </div>
                  <div className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: 'Open Sans' }}>
                    {freq.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="pb-8">
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }} className="mb-4">
            Quiet Hours
          </h3>
          
          <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <div style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '15px', color: '#1a1a1a' }}>
                Enable Quiet Hours
              </div>
              <div className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: 'Open Sans' }}>
                Pause notifications during specific hours
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer ml-4">
              <input
                type="checkbox"
                checked={preferences?.quiet_hours?.enabled || false}
                onChange={(e) => setPreferences({
                  ...preferences,
                  quiet_hours: { ...preferences.quiet_hours, enabled: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>
          
          {preferences?.quiet_hours?.enabled && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="start_time" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                  Start Time
                </Label>
                <Input
                  id="start_time"
                  type="time"
                  value={preferences.quiet_hours.start_time || '22:00'}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    quiet_hours: { ...preferences.quiet_hours, start_time: e.target.value }
                  })}
                  className="mt-1"
                  style={{ fontFamily: 'Open Sans' }}
                />
              </div>
              <div>
                <Label htmlFor="end_time" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                  End Time
                </Label>
                <Input
                  id="end_time"
                  type="time"
                  value={preferences.quiet_hours.end_time || '08:00'}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    quiet_hours: { ...preferences.quiet_hours, end_time: e.target.value }
                  })}
                  className="mt-1"
                  style={{ fontFamily: 'Open Sans' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <Button
            type="submit"
            disabled={saving}
            className="bg-teal-600 hover:bg-teal-700 text-white"
            style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
          >
            {saving ? 'Saving...' : 'Save Preferences'}
          </Button>
        </div>
      </form>
    </div>
  );
}