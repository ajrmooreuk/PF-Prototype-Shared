import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

interface LocalBusinessFormProps {
  data: any;
  onChange: (data: any) => void;
}

export function LocalBusinessForm({ data, onChange }: LocalBusinessFormProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateAddress = (field: string, value: string) => {
    updateField('address', { ...data.address, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-[#231f20] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
          Business Information
        </h4>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="flex items-center gap-1">
              Business Name <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input id="name" value={data.name || ''} onChange={(e) => updateField('name', e.target.value)} placeholder="Business Name" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="telephone" className="flex items-center gap-1">
              Telephone <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input id="telephone" type="tel" value={data.telephone || ''} onChange={(e) => updateField('telephone', e.target.value)} placeholder="+1-555-123-4567" className="mt-2" />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-[#231f20] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
          Location
        </h4>
        <div className="space-y-4">
          <div>
            <Label htmlFor="streetAddress" className="flex items-center gap-1">
              Street Address <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input id="streetAddress" value={data.address?.streetAddress || ''} onChange={(e) => updateAddress('streetAddress', e.target.value)} placeholder="123 Main Street" className="mt-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city" className="flex items-center gap-1">
                City <span className="text-[#e84e1c]">*</span>
              </Label>
              <Input id="city" value={data.address?.city || ''} onChange={(e) => updateAddress('city', e.target.value)} placeholder="San Francisco" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="state" className="flex items-center gap-1">
                State <span className="text-[#e84e1c]">*</span>
              </Label>
              <Input id="state" value={data.address?.state || ''} onChange={(e) => updateAddress('state', e.target.value)} placeholder="CA" className="mt-2" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="postalCode" className="flex items-center gap-1">
                Postal Code <span className="text-[#e84e1c]">*</span>
              </Label>
              <Input id="postalCode" value={data.address?.postalCode || ''} onChange={(e) => updateAddress('postalCode', e.target.value)} placeholder="94102" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="country" className="flex items-center gap-1">
                Country <span className="text-[#e84e1c]">*</span>
              </Label>
              <Input id="country" value={data.address?.country || 'US'} onChange={(e) => updateAddress('country', e.target.value)} placeholder="US" className="mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
