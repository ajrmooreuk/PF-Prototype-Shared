import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';

interface OrganizationFormProps {
  data: any;
  onChange: (data: any) => void;
}

export function OrganizationForm({ data, onChange }: OrganizationFormProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-[#231f20] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
          Basic Information
        </h4>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="flex items-center gap-1">
              Organization Name <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input id="name" value={data.name || ''} onChange={(e) => updateField('name', e.target.value)} placeholder="Company Name" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="url" className="flex items-center gap-1">
              URL <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input id="url" type="url" value={data.url || ''} onChange={(e) => updateField('url', e.target.value)} placeholder="https://example.com" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="logo" className="flex items-center gap-1">
              Logo URL <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input id="logo" type="url" value={data.logo || ''} onChange={(e) => updateField('logo', e.target.value)} placeholder="https://example.com/logo.png" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea id="description" value={data.description || ''} onChange={(e) => updateField('description', e.target.value)} placeholder="Brief company description..." rows={3} className="mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
