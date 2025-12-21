import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface Step1Props {
  data: any;
  updateData: (updates: any) => void;
}

export function Step1CompanyBasics({ data, updateData }: Step1Props) {
  const industries = [
    'Health & Wellness',
    'Technology',
    'E-commerce',
    'Professional Services',
    'Education',
    'Financial Services',
    'Real Estate',
    'Manufacturing',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 
          className="text-[#111827] mb-2"
          style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}
        >
          Tell us about your company
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Help us understand your business so we can optimize your AI visibility
        </p>
      </div>

      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="companyName" className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          Company Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="companyName"
          value={data.companyName}
          onChange={(e) => updateData({ companyName: e.target.value })}
          placeholder="Foot Scientific"
          className="text-base"
          style={{ fontFamily: 'Open Sans' }}
        />
        {data.companyName && (data.companyName.length < 2 || data.companyName.length > 100) && (
          <p className="text-xs text-red-500" style={{ fontFamily: 'Open Sans' }}>
            Company name must be between 2 and 100 characters
          </p>
        )}
      </div>

      {/* Website URL */}
      <div className="space-y-2">
        <Label htmlFor="websiteUrl" className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          Website URL <span className="text-red-500">*</span>
        </Label>
        <Input
          id="websiteUrl"
          type="url"
          value={data.websiteUrl}
          onChange={(e) => updateData({ websiteUrl: e.target.value })}
          placeholder="https://footscientific.com"
          className="text-base"
          style={{ fontFamily: 'Open Sans' }}
        />
        {data.websiteUrl && !data.websiteUrl.startsWith('https://') && (
          <p className="text-xs text-red-500" style={{ fontFamily: 'Open Sans' }}>
            URL must start with https://
          </p>
        )}
      </div>

      {/* Industry */}
      <div className="space-y-2">
        <Label htmlFor="industry" className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          Industry <span className="text-red-500">*</span>
        </Label>
        <Select value={data.industry} onValueChange={(value) => updateData({ industry: value })}>
          <SelectTrigger className="text-base" style={{ fontFamily: 'Open Sans' }}>
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry} style={{ fontFamily: 'Open Sans' }}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Company Description */}
      <div className="space-y-2">
        <Label htmlFor="companyDescription" className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          Company Description (Optional)
        </Label>
        <Textarea
          id="companyDescription"
          value={data.companyDescription}
          onChange={(e) => updateData({ companyDescription: e.target.value })}
          placeholder="Brief description of what your company does..."
          maxLength={500}
          rows={4}
          className="text-base resize-none"
          style={{ fontFamily: 'Open Sans' }}
        />
        <p className="text-xs text-gray-500" style={{ fontFamily: 'Open Sans' }}>
          {data.companyDescription.length}/500 characters
        </p>
      </div>
    </div>
  );
}
