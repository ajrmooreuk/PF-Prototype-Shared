import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';

interface VideoObjectFormProps {
  data: any;
  onChange: (data: any) => void;
}

export function VideoObjectForm({ data, onChange }: VideoObjectFormProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-[#231f20] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
          Video Information
        </h4>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="flex items-center gap-1">
              Name <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input id="name" value={data.name || ''} onChange={(e) => updateField('name', e.target.value)} placeholder="Video Title" maxLength={150} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="description" className="flex items-center gap-1">
              Description <span className="text-[#e84e1c]">*</span>
            </Label>
            <Textarea id="description" value={data.description || ''} onChange={(e) => updateField('description', e.target.value)} placeholder="Video description..." rows={3} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="thumbnailUrl" className="flex items-center gap-1">
              Thumbnail URL <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input id="thumbnailUrl" type="url" value={data.thumbnailUrl || ''} onChange={(e) => updateField('thumbnailUrl', e.target.value)} placeholder="https://example.com/thumbnail.jpg" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="uploadDate" className="flex items-center gap-1">
              Upload Date <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input id="uploadDate" type="date" value={data.uploadDate || new Date().toISOString().split('T')[0]} onChange={(e) => updateField('uploadDate', e.target.value)} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="contentUrl" className="flex items-center gap-1">
              Content URL <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input id="contentUrl" type="url" value={data.contentUrl || ''} onChange={(e) => updateField('contentUrl', e.target.value)} placeholder="https://example.com/video.mp4" className="mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
