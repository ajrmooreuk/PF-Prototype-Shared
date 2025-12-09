import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';

interface HowToFormProps {
  data: any;
  onChange: (data: any) => void;
}

export function HowToForm({ data, onChange }: HowToFormProps) {
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
            <Input id="name" value={data.name || ''} onChange={(e) => updateField('name', e.target.value)} placeholder="How to..." maxLength={150} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="description" className="flex items-center gap-1">
              Description <span className="text-[#e84e1c]">*</span>
            </Label>
            <Textarea id="description" value={data.description || ''} onChange={(e) => updateField('description', e.target.value)} placeholder="Brief description of the process..." rows={3} className="mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
