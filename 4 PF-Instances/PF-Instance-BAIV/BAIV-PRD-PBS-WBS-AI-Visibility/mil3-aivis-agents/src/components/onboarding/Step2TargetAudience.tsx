import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';

interface Step2Props {
  data: any;
  updateData: (updates: any) => void;
}

export function Step2TargetAudience({ data, updateData }: Step2Props) {
  const [keywordInput, setKeywordInput] = useState('');

  const handleKeywordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && keywordInput.trim()) {
      e.preventDefault();
      if (data.targetKeywords.length < 10 && !data.targetKeywords.includes(keywordInput.trim())) {
        updateData({
          targetKeywords: [...data.targetKeywords, keywordInput.trim()]
        });
        setKeywordInput('');
      }
    }
  };

  const removeKeyword = (keyword: string) => {
    updateData({
      targetKeywords: data.targetKeywords.filter((k: string) => k !== keyword)
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 
          className="text-[#111827] mb-2"
          style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}
        >
          Who are you trying to reach?
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Define your ideal customer and the keywords that matter most
        </p>
      </div>

      {/* ICP Description */}
      <div className="space-y-2">
        <Label htmlFor="icpDescription" className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          Describe your ideal customer <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="icpDescription"
          value={data.icpDescription}
          onChange={(e) => updateData({ icpDescription: e.target.value })}
          placeholder="People suffering from plantar fasciitis seeking evidence-based orthotic solutions"
          minLength={100}
          maxLength={300}
          rows={4}
          className="text-base resize-none"
          style={{ fontFamily: 'Open Sans' }}
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500" style={{ fontFamily: 'Open Sans' }}>
            2-3 sentences about who your ideal customers are
          </p>
          <p className={`text-xs ${
            data.icpDescription.length < 100 || data.icpDescription.length > 300 
              ? 'text-red-500' 
              : 'text-green-600'
          }`} style={{ fontFamily: 'Open Sans' }}>
            {data.icpDescription.length}/300 characters
          </p>
        </div>
        {data.icpDescription.length > 0 && data.icpDescription.length < 100 && (
          <p className="text-xs text-red-500" style={{ fontFamily: 'Open Sans' }}>
            Please write at least 100 characters
          </p>
        )}
      </div>

      {/* Target Keywords */}
      <div className="space-y-2">
        <Label htmlFor="targetKeywords" className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          What keywords should AI platforms know you for? <span className="text-red-500">*</span>
        </Label>
        <Input
          id="targetKeywords"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          onKeyDown={handleKeywordKeyDown}
          placeholder="Type a keyword and press Enter"
          disabled={data.targetKeywords.length >= 10}
          className="text-base"
          style={{ fontFamily: 'Open Sans' }}
        />
        <p className="text-xs text-gray-500" style={{ fontFamily: 'Open Sans' }}>
          Enter 5-10 keywords you want to rank for in AI search results ({data.targetKeywords.length}/10)
        </p>

        {/* Keyword Tags */}
        {data.targetKeywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {data.targetKeywords.map((keyword: string, index: number) => (
              <Badge
                key={index}
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 flex items-center gap-2"
                style={{ fontFamily: 'Open Sans' }}
              >
                {keyword}
                <button
                  onClick={() => removeKeyword(keyword)}
                  className="hover:bg-blue-300 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Example Tags */}
        {data.targetKeywords.length === 0 && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
              Example keywords:
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-gray-200 text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                plantar fasciitis
              </Badge>
              <Badge className="bg-gray-200 text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                orthotic inserts
              </Badge>
              <Badge className="bg-gray-200 text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                foot pain relief
              </Badge>
            </div>
          </div>
        )}

        {data.targetKeywords.length > 0 && data.targetKeywords.length < 5 && (
          <p className="text-xs text-red-500" style={{ fontFamily: 'Open Sans' }}>
            Please add at least 5 keywords
          </p>
        )}
      </div>
    </div>
  );
}
