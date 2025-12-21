import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

interface PersonFormProps {
  data: any;
  onChange: (data: any) => void;
}

export function PersonForm({ data, onChange }: PersonFormProps) {
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
              Name <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input id="name" value={data.name || ''} onChange={(e) => updateField('name', e.target.value)} placeholder="Full Name" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="jobTitle">Job Title (Optional)</Label>
            <Input id="jobTitle" value={data.jobTitle || ''} onChange={(e) => updateField('jobTitle', e.target.value)} placeholder="Marketing Director" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="url">URL (Optional)</Label>
            <Input id="url" type="url" value={data.url || ''} onChange={(e) => updateField('url', e.target.value)} placeholder="https://example.com/about/person" className="mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
