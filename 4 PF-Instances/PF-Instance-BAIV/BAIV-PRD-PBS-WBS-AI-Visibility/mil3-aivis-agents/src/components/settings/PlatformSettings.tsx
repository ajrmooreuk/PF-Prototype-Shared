import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';

export function PlatformSettings() {
  return (
    <div className="p-8 space-y-6">
      {/* Page Header */}
      <div>
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px', color: '#000000' }}>
          Platform Configuration
        </h2>
        <p className="text-gray-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '15px' }}>
          Advanced platform settings and testing tools
        </p>
      </div>

      {/* Data Reset Section */}
      <Card className="p-6 border-orange-200 bg-gradient-to-r from-orange-50 to-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
            <RefreshCw className="w-6 h-6 text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#000000' }} className="mb-2">
              Reset Platform Data
            </h3>
            <p className="text-gray-600 mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Clear all cached data and reset the platform to initial state. This will trigger the onboarding flow on next page load.
            </p>
            <Button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              variant="outline"
              className="border-orange-500 text-orange-700 hover:bg-orange-50"
              style={{ fontFamily: 'Poppins', fontWeight: 600 }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear All Data
            </Button>
          </div>
        </div>
      </Card>

      {/* Warning Section */}
      <Card className="p-6 border-gray-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-gray-600" />
          </div>
          <div className="flex-1">
            <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#000000' }} className="mb-2">
              Development Mode
            </h3>
            <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              These settings are for testing and development purposes only. In production, users will automatically see the onboarding wizard on first login if they haven't completed setup.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}