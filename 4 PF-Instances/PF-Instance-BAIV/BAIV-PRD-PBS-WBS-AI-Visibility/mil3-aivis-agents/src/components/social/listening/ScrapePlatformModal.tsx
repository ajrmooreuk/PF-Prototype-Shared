import { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';

interface ScrapePlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: 'reddit' | 'bluesky' | 'youtube' | null;
  onStartScraping: (data: {
    source_type: string;
    keywords: string[];
    subreddits?: string[];
    duration: number;
  }) => void;
}

export function ScrapePlatformModal({
  isOpen,
  onClose,
  platform,
  onStartScraping,
}: ScrapePlatformModalProps) {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [subreddits, setSubreddits] = useState<string[]>([]);
  const [subredditInput, setSubredditInput] = useState('');
  const [duration, setDuration] = useState('7');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keywordInput.trim()) {
      e.preventDefault();
      if (keywords.length >= 10) {
        setErrors({ ...errors, keywords: 'Maximum 10 keywords allowed' });
        return;
      }
      if (keywordInput.trim().length < 2 || keywordInput.trim().length > 50) {
        setErrors({ ...errors, keywords: 'Keywords must be 2-50 characters' });
        return;
      }
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
      setErrors({ ...errors, keywords: '' });
    }
  };

  const handleSubredditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && subredditInput.trim()) {
      e.preventDefault();
      if (subreddits.length >= 5) {
        setErrors({ ...errors, subreddits: 'Maximum 5 subreddits allowed' });
        return;
      }
      const cleaned = subredditInput.trim().replace(/^r\//, '');
      setSubreddits([...subreddits, cleaned]);
      setSubredditInput('');
      setErrors({ ...errors, subreddits: '' });
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const removeSubreddit = (index: number) => {
    setSubreddits(subreddits.filter((_, i) => i !== index));
  };

  const handleStartScraping = () => {
    const newErrors: { [key: string]: string } = {};

    if (keywords.length === 0) {
      newErrors.keywords = 'Add at least one keyword';
    }

    const durationNum = parseInt(duration);
    if (durationNum < 1 || durationNum > 90) {
      newErrors.duration = 'Duration must be between 1-90 days';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data: any = {
      source_type: platform,
      keywords,
      duration: durationNum,
    };

    if (platform === 'reddit' && subreddits.length > 0) {
      data.subreddits = subreddits;
    }

    onStartScraping(data);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setKeywords([]);
    setKeywordInput('');
    setSubreddits([]);
    setSubredditInput('');
    setDuration('7');
    setErrors({});
  };

  const getPlatformTitle = () => {
    if (platform === 'reddit') return 'Scrape Reddit for Opportunities';
    if (platform === 'youtube') return 'Scrape YouTube for Opportunities';
    if (platform === 'bluesky') return 'Scrape Bluesky for Opportunities';
    return 'Scrape Platform';
  };

  const estimatedPosts = keywords.length * parseInt(duration) * (platform === 'reddit' ? 8 : 6);
  const estimatedTime = Math.ceil(estimatedPosts / 30);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px]">
        <DialogTitle className="sr-only">{getPlatformTitle()}</DialogTitle>
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-[#005260]"
            style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}
          >
            {getPlatformTitle()}
          </h2>
          <button
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#005260] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Keywords */}
          <div>
            <Label className="text-[#005260] mb-2" style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
              Keywords to monitor
            </Label>
            <Input
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeywordKeyDown}
              placeholder="Type keyword and press Enter"
              className="mb-2"
            />
            {errors.keywords && (
              <p className="text-[#e84e1c] text-sm mt-1">{errors.keywords}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#E6F7F9] text-[#02a4bf] rounded-full flex items-center gap-2"
                  style={{ fontFamily: 'Open Sans', fontSize: '12px' }}
                >
                  {keyword}
                  <button
                    onClick={() => removeKeyword(index)}
                    className="text-[#02a4bf] hover:text-[#005260]"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Subreddits (Reddit only) */}
          {platform === 'reddit' && (
            <div>
              <Label className="text-[#005260] mb-2" style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                Target subreddits (optional)
              </Label>
              <Input
                value={subredditInput}
                onChange={(e) => setSubredditInput(e.target.value)}
                onKeyDown={handleSubredditKeyDown}
                placeholder="r/entrepreneur, r/marketing"
                className="mb-2"
              />
              {errors.subreddits && (
                <p className="text-[#e84e1c] text-sm mt-1">{errors.subreddits}</p>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {subreddits.map((subreddit, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#FEF2EE] text-[#e84e1c] rounded-full flex items-center gap-2"
                    style={{ fontFamily: 'Open Sans', fontSize: '12px' }}
                  >
                    r/{subreddit}
                    <button
                      onClick={() => removeSubreddit(index)}
                      className="text-[#e84e1c] hover:text-[#d13d0f]"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Time Range */}
          <div>
            <Label className="text-[#005260] mb-2" style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
              Look back period
            </Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="14">Last 14 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
            {errors.duration && (
              <p className="text-[#e84e1c] text-sm mt-1">{errors.duration}</p>
            )}
          </div>

          {/* Preview */}
          <div className="bg-[#f5f7fa] rounded-xl p-4">
            <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Estimated posts: {estimatedPosts - 15}-{estimatedPosts}
            </p>
            <p className="text-[#6B7280] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Estimated time: {estimatedTime} minutes
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 mt-6">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 h-12 rounded-xl"
            style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleStartScraping}
            className="flex-1 h-12 rounded-xl bg-[#02a4bf] hover:bg-[#018a9f] text-white"
            style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500 }}
          >
            Start Scraping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
