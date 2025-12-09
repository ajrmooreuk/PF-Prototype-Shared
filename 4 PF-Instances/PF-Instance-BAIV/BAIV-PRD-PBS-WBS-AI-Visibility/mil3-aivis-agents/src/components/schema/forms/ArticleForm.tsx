import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../ui/collapsible';
import { ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

interface ArticleFormProps {
  data: any;
  onChange: (data: any) => void;
}

export function ArticleForm({ data, onChange }: ArticleFormProps) {
  const [showAdditional, setShowAdditional] = useState(false);
  const [keywords, setKeywords] = useState<string[]>(data.keywords || []);
  const [keywordInput, setKeywordInput] = useState('');

  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const addKeyword = () => {
    if (keywordInput.trim() && keywords.length < 10) {
      const newKeywords = [...keywords, keywordInput.trim()];
      setKeywords(newKeywords);
      updateField('keywords', newKeywords);
      setKeywordInput('');
    }
  };

  const removeKeyword = (index: number) => {
    const newKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(newKeywords);
    updateField('keywords', newKeywords);
  };

  return (
    <div className="space-y-6">
      {/* Section 1: Basic Information */}
      <div>
        <h4 className="text-[#231f20] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
          Basic Information
        </h4>

        <div className="space-y-4">
          {/* Headline */}
          <div>
            <Label htmlFor="headline" className="flex items-center gap-1">
              Headline
              <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input
              id="headline"
              value={data.headline || ''}
              onChange={(e) => updateField('headline', e.target.value)}
              placeholder="The Ultimate Guide to..."
              maxLength={110}
              className="mt-2"
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-[#6b7280]">Your article title</p>
              <span className="text-xs text-[#6b7280]">{(data.headline || '').length}/110</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="flex items-center gap-1">
              Description
              <span className="text-[#e84e1c]">*</span>
            </Label>
            <Textarea
              id="description"
              value={data.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Brief summary of your article..."
              maxLength={300}
              rows={3}
              className="mt-2"
            />
            <span className="text-xs text-[#6b7280] float-right">{(data.description || '').length}/300</span>
          </div>

          {/* Image URL */}
          <div>
            <Label htmlFor="image" className="flex items-center gap-1">
              Image URL
              <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input
              id="image"
              type="url"
              value={data.image || ''}
              onChange={(e) => updateField('image', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="mt-2"
            />
            <p className="text-xs text-[#6b7280] mt-1">Featured image (recommended: 1200x630px)</p>
          </div>

          {/* Date Published */}
          <div>
            <Label htmlFor="datePublished" className="flex items-center gap-1">
              Date Published
              <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input
              id="datePublished"
              type="date"
              value={data.datePublished || new Date().toISOString().split('T')[0]}
              onChange={(e) => updateField('datePublished', e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Date Modified */}
          <div>
            <Label htmlFor="dateModified">Date Modified (Optional)</Label>
            <Input
              id="dateModified"
              type="date"
              value={data.dateModified || ''}
              onChange={(e) => updateField('dateModified', e.target.value)}
              placeholder="Leave empty to use current date"
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Author Information */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-[#231f20] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
          Author Information
        </h4>

        <div className="space-y-4">
          <div>
            <Label htmlFor="authorName" className="flex items-center gap-1">
              Author Name
              <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input
              id="authorName"
              value={data.author?.name || ''}
              onChange={(e) => updateField('author', { ...data.author, name: e.target.value })}
              placeholder="John Smith"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="authorUrl">Author URL (Optional)</Label>
            <Input
              id="authorUrl"
              type="url"
              value={data.author?.url || ''}
              onChange={(e) => updateField('author', { ...data.author, url: e.target.value })}
              placeholder="https://example.com/authors/john-smith"
              className="mt-2"
            />
            <p className="text-xs text-[#6b7280] mt-1">Link to author profile</p>
          </div>
        </div>
      </div>

      {/* Section 3: Publisher Information */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-[#231f20] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
          Publisher Information
        </h4>

        <div className="space-y-4">
          <div>
            <Label htmlFor="publisherName" className="flex items-center gap-1">
              Publisher Name
              <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input
              id="publisherName"
              value={data.publisher?.name || ''}
              onChange={(e) => updateField('publisher', { ...data.publisher, name: e.target.value })}
              placeholder="Your Company Name"
              className="mt-2"
            />
            <p className="text-xs text-[#6b7280] mt-1">Usually your organization name</p>
          </div>

          <div>
            <Label htmlFor="publisherLogo" className="flex items-center gap-1">
              Publisher Logo URL
              <span className="text-[#e84e1c]">*</span>
            </Label>
            <Input
              id="publisherLogo"
              type="url"
              value={data.publisher?.logo || ''}
              onChange={(e) => updateField('publisher', { ...data.publisher, logo: e.target.value })}
              placeholder="https://example.com/logo.png"
              className="mt-2"
            />
            <p className="text-xs text-[#6b7280] mt-1">Logo for search results (recommended: 600x60px)</p>
          </div>
        </div>
      </div>

      {/* Section 4: Additional Details (Collapsible) */}
      <Collapsible open={showAdditional} onOpenChange={setShowAdditional} className="border-t border-gray-200 pt-6">
        <CollapsibleTrigger className="flex items-center gap-2 text-[#02a4bf] hover:text-[#018a9f]">
          <ChevronDown className={`h-4 w-4 transition-transform ${showAdditional ? 'rotate-180' : ''}`} />
          Show Additional Fields
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-4 space-y-4">
          <div>
            <Label htmlFor="wordCount">Word Count (Optional)</Label>
            <Input
              id="wordCount"
              type="number"
              value={data.wordCount || ''}
              onChange={(e) => updateField('wordCount', parseInt(e.target.value))}
              placeholder="1500"
              className="mt-2"
            />
            <p className="text-xs text-[#6b7280] mt-1">Approximate article length</p>
          </div>

          <div>
            <Label>Keywords (Optional)</Label>
            <div className="border border-gray-300 rounded-lg p-3 mt-2 min-h-[48px] flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#e6f7f9] text-[#02a4bf]"
                  style={{ fontSize: '13px' }}
                >
                  {keyword}
                  <button onClick={() => removeKeyword(index)} className="hover:text-[#e84e1c]">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addKeyword();
                  }
                }}
                placeholder="Type keyword and press Enter"
                disabled={keywords.length >= 10}
                className="flex-1 min-w-[200px] outline-none bg-transparent"
                style={{ fontSize: '14px' }}
              />
            </div>
            <p className="text-xs text-[#6b7280] mt-1">Add up to 10 keywords</p>
          </div>

          <div>
            <Label htmlFor="articleSection">Article Section (Optional)</Label>
            <Input
              id="articleSection"
              value={data.articleSection || ''}
              onChange={(e) => updateField('articleSection', e.target.value)}
              placeholder="Technology, Business, etc."
              className="mt-2"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
