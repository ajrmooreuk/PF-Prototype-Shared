import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface Step6Props {
  data: any;
  updateData: (updates: any) => void;
}

export function Step6VoiceExamples({ data, updateData }: Step6Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 
          className="text-[#111827] mb-2"
          style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}
        >
          Show us your writing style
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          These examples help our AI match your voice (optional but recommended)
        </p>
      </div>

      {/* Email Example */}
      <div className="space-y-2">
        <Label htmlFor="emailExample" className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          Sample email to a customer
        </Label>
        <Textarea
          id="emailExample"
          value={data.emailExample}
          onChange={(e) => updateData({ emailExample: e.target.value })}
          placeholder="Paste a typical email you'd send to customers..."
          maxLength={500}
          rows={5}
          className="text-base resize-none"
          style={{ fontFamily: 'Open Sans' }}
        />
        <p className="text-xs text-gray-500" style={{ fontFamily: 'Open Sans' }}>
          {data.emailExample.length}/500 characters
        </p>
      </div>

      {/* Social Post Example */}
      <div className="space-y-2">
        <Label htmlFor="socialPost" className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          Sample social media post
        </Label>
        <Textarea
          id="socialPost"
          value={data.socialPostExample}
          onChange={(e) => updateData({ socialPostExample: e.target.value })}
          placeholder="Paste a typical LinkedIn or Twitter post..."
          maxLength={280}
          rows={4}
          className="text-base resize-none"
          style={{ fontFamily: 'Open Sans' }}
        />
        <p className="text-xs text-gray-500" style={{ fontFamily: 'Open Sans' }}>
          {data.socialPostExample.length}/280 characters
        </p>
      </div>

      {/* Blog Example */}
      <div className="space-y-2">
        <Label htmlFor="blogExample" className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          Sample blog introduction
        </Label>
        <Textarea
          id="blogExample"
          value={data.blogExample}
          onChange={(e) => updateData({ blogExample: e.target.value })}
          placeholder="Paste the opening paragraph from a blog post..."
          maxLength={500}
          rows={5}
          className="text-base resize-none"
          style={{ fontFamily: 'Open Sans' }}
        />
        <p className="text-xs text-gray-500" style={{ fontFamily: 'Open Sans' }}>
          {data.blogExample.length}/500 characters
        </p>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          💡 Pro Tip
        </p>
        <p className="text-xs text-blue-700 mt-1" style={{ fontFamily: 'Open Sans' }}>
          The more examples you provide, the better we can match your unique voice and style. This step is optional, but highly recommended for best results.
        </p>
      </div>
    </div>
  );
}
