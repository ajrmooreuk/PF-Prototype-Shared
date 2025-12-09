import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface Step1Props {
  data: any;
  updateData: (updates: any) => void;
}

export function Step1ClientAccount({ data, updateData }: Step1Props) {
  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 
          className="text-[#111827] mb-2"
          style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}
        >
          Create Client Account
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Set up login credentials for your client
        </p>
      </div>

      {/* Client Email */}
      <div className="space-y-2">
        <Label htmlFor="clientEmail" className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          Client's Email Address <span className="text-red-500">*</span>
        </Label>
        <Input
          id="clientEmail"
          type="email"
          value={data.clientEmail}
          onChange={(e) => updateData({ clientEmail: e.target.value })}
          placeholder="sarah.mitchell@footscientific.com"
          className="text-base"
          style={{ fontFamily: 'Open Sans' }}
        />
        <p className="text-xs text-gray-500" style={{ fontFamily: 'Open Sans' }}>
          This will be their login email for the dashboard
        </p>
        {data.clientEmail && !isEmailValid(data.clientEmail) && (
          <p className="text-xs text-red-500" style={{ fontFamily: 'Open Sans' }}>
            Please enter a valid email address
          </p>
        )}
      </div>

      {/* Client First Name */}
      <div className="space-y-2">
        <Label htmlFor="clientFirstName" className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          First Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="clientFirstName"
          value={data.clientFirstName}
          onChange={(e) => updateData({ clientFirstName: e.target.value })}
          placeholder="Sarah"
          className="text-base"
          style={{ fontFamily: 'Open Sans' }}
        />
        {data.clientFirstName && (data.clientFirstName.length < 2 || data.clientFirstName.length > 50) && (
          <p className="text-xs text-red-500" style={{ fontFamily: 'Open Sans' }}>
            First name must be between 2 and 50 characters
          </p>
        )}
      </div>

      {/* Client Last Name */}
      <div className="space-y-2">
        <Label htmlFor="clientLastName" className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          Last Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="clientLastName"
          value={data.clientLastName}
          onChange={(e) => updateData({ clientLastName: e.target.value })}
          placeholder="Mitchell"
          className="text-base"
          style={{ fontFamily: 'Open Sans' }}
        />
        {data.clientLastName && (data.clientLastName.length < 2 || data.clientLastName.length > 50) && (
          <p className="text-xs text-red-500" style={{ fontFamily: 'Open Sans' }}>
            Last name must be between 2 and 50 characters
          </p>
        )}
      </div>

      {/* Client Role */}
      <div className="space-y-2">
        <Label htmlFor="clientRole" className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          Role/Title
        </Label>
        <Input
          id="clientRole"
          value={data.clientRole}
          onChange={(e) => updateData({ clientRole: e.target.value })}
          placeholder="CEO"
          maxLength={100}
          className="text-base"
          style={{ fontFamily: 'Open Sans' }}
        />
        <p className="text-xs text-gray-500" style={{ fontFamily: 'Open Sans' }}>
          Optional - their job title
        </p>
      </div>
    </div>
  );
}
