import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Plus, X } from 'lucide-react';

interface Step3Props {
  data: any;
  updateData: (updates: any) => void;
}

export function Step3Competitors({ data, updateData }: Step3Props) {
  const [newCompetitor, setNewCompetitor] = useState('');
  const [error, setError] = useState('');

  const addCompetitor = () => {
    setError('');
    
    if (!newCompetitor.trim()) {
      return;
    }

    // Validate URL
    try {
      const url = new URL(newCompetitor);
      if (!url.protocol.startsWith('http')) {
        setError('Must be a valid URL starting with http:// or https://');
        return;
      }
    } catch {
      setError('Must be a valid URL');
      return;
    }

    if (data.competitors.includes(newCompetitor)) {
      setError('This competitor is already added');
      return;
    }

    if (data.competitors.length >= 5) {
      setError('Maximum 5 competitors allowed');
      return;
    }

    updateData({
      competitors: [...data.competitors, newCompetitor]
    });
    setNewCompetitor('');
  };

  const removeCompetitor = (url: string) => {
    updateData({
      competitors: data.competitors.filter((c: string) => c !== url)
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCompetitor();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 
          className="text-[#111827] mb-2"
          style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}
        >
          Who are your main competitors?
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          We'll analyze how they perform in AI search results
        </p>
      </div>

      {/* Add Competitor Input */}
      <div className="space-y-2">
        <Label htmlFor="competitor" className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
          Enter 3-5 competitor websites <span className="text-red-500">*</span>
        </Label>
        <div className="flex gap-2">
          <Input
            id="competitor"
            type="url"
            value={newCompetitor}
            onChange={(e) => {
              setNewCompetitor(e.target.value);
              setError('');
            }}
            onKeyDown={handleKeyDown}
            placeholder="https://competitor.com"
            disabled={data.competitors.length >= 5}
            className="text-base flex-1"
            style={{ fontFamily: 'Open Sans' }}
          />
          <Button
            onClick={addCompetitor}
            disabled={data.competitors.length >= 5 || !newCompetitor.trim()}
            className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
            style={{ fontFamily: 'Poppins', fontWeight: 600 }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
        
        {error && (
          <p className="text-xs text-red-500" style={{ fontFamily: 'Open Sans' }}>
            {error}
          </p>
        )}
        
        <p className={`text-xs ${
          data.competitors.length >= 3 ? 'text-green-600' : 'text-gray-500'
        }`} style={{ fontFamily: 'Open Sans' }}>
          {data.competitors.length} of 5 competitors added {data.competitors.length < 3 && '(minimum 3 required)'}
        </p>
      </div>

      {/* Competitor List */}
      {data.competitors.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Your Competitors
          </Label>
          <div className="space-y-2">
            {data.competitors.map((competitor: string, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                    {competitor}
                  </p>
                </div>
                <button
                  onClick={() => removeCompetitor(competitor)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Example */}
      {data.competitors.length === 0 && (
        <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-900 mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
            Example competitors:
          </p>
          <div className="space-y-1">
            <p className="text-xs text-blue-700" style={{ fontFamily: 'Open Sans' }}>
              • https://drscholls.com
            </p>
            <p className="text-xs text-blue-700" style={{ fontFamily: 'Open Sans' }}>
              • https://superfeet.com
            </p>
            <p className="text-xs text-blue-700" style={{ fontFamily: 'Open Sans' }}>
              • https://vionicshoes.com
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
