import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Link2, Home, Globe, MapPin } from 'lucide-react';

interface SuggestionsPreviewProps {
  results: any;
  isAnalyzing: boolean;
  onSave: () => void;
}

export function SuggestionsPreview({ results, isAnalyzing, onSave }: SuggestionsPreviewProps) {
  if (!results && !isAnalyzing) {
    return (
      <Card className="p-6 rounded-2xl shadow-sm h-fit sticky top-20">
        <div>
          <h3 className="text-[#231f20] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
            Link Suggestions Preview
          </h3>
          <p className="text-xs text-[#6b7280]">Results will appear here</p>
        </div>

        <div className="flex flex-col items-center justify-center py-20">
          <span className="text-6xl mb-4">🔗</span>
          <p className="text-sm text-[#6b7280]">
            Analyze content to see link suggestions
          </p>
        </div>
      </Card>
    );
  }

  if (isAnalyzing) {
    return (
      <Card className="p-6 rounded-2xl shadow-sm h-fit sticky top-20">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#02a4bf] mb-4" />
          <p className="text-sm text-[#6b7280]">
            Finding best link opportunities...
          </p>
        </div>
      </Card>
    );
  }

  const getDensityColor = (density: number) => {
    if (density >= 1 && density <= 3) return 'text-[#10b981]';
    if (density < 1) return 'text-[#f59e0b]';
    return 'text-[#ef4444]';
  };

  const getDensityLabel = (density: number) => {
    if (density >= 1 && density <= 3) return 'Optimal';
    if (density < 1) return 'Under-linked';
    return 'Over-linked';
  };

  const getRRFColor = (score: number) => {
    if (score > 85) return '#ffb615';
    if (score >= 70) return '#02a4bf';
    return '#6b7280';
  };

  return (
    <Card className="p-6 rounded-2xl shadow-sm h-fit sticky top-20">
      <div className="mb-4">
        <h3 className="text-[#231f20] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
          Link Suggestions Preview
        </h3>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Link2 className="h-4 w-4 text-gray-500" />
          </div>
          <div className="font-bold text-xl">{results.totalLinks}</div>
          <div className="text-xs text-[#6b7280]">Total</div>
        </div>
        <div className="bg-[#e6f7f9] rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Home className="h-4 w-4 text-[#02a4bf]" />
          </div>
          <div className="font-bold text-xl text-[#02a4bf]">{results.internalLinks}</div>
          <div className="text-xs text-[#6b7280]">Internal</div>
        </div>
        <div className="bg-[#f3f0ff] rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Globe className="h-4 w-4 text-[#8b5cf6]" />
          </div>
          <div className="font-bold text-xl text-[#8b5cf6]">{results.externalLinks}</div>
          <div className="text-xs text-[#6b7280]">External</div>
        </div>
      </div>

      {/* Link Density */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-semibold ${getDensityColor(results.linkDensity)}`}>
            Link Density: {results.linkDensity}% ({getDensityLabel(results.linkDensity)})
          </span>
        </div>
        <Progress 
          value={results.linkDensity * 10} 
          className="h-2"
        />
        <p className="text-xs text-[#6b7280] mt-1">
          {results.totalLinks} links per 1,250 words
        </p>
      </div>

      {/* Internal Links */}
      {results.internalLinkSuggestions && results.internalLinkSuggestions.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-sm">Internal Links ({results.internalLinkSuggestions.length})</h4>
            <Badge className="bg-[#02a4bf] text-white text-xs">RRF-Optimized</Badge>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {results.internalLinkSuggestions.map((link: any) => (
              <div key={link.id} className="bg-[#f0f9fb] rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-semibold text-sm text-[#02a4bf]">
                    {link.anchorText}
                  </span>
                  <div className="text-right">
                    <div className="font-bold text-base" style={{ color: getRRFColor(link.rrfScore) }}>
                      {link.rrfScore}
                    </div>
                    <div className="text-[9px] text-[#6b7280]">RRF</div>
                  </div>
                </div>

                <p className="text-xs text-[#6b7280] truncate mb-2">
                  {link.targetUrl}
                </p>

                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    className={`text-xs ${
                      link.authority === 'high' ? 'bg-[#10b981]' :
                      link.authority === 'medium' ? 'bg-[#f59e0b]' : 'bg-[#6b7280]'
                    } text-white`}
                  >
                    {link.authority === 'high' ? 'High' : link.authority === 'medium' ? 'Medium' : 'Low'} Authority
                  </Badge>
                  <span className="text-xs text-[#6b7280]">
                    {link.relevance}% relevant
                  </span>
                </div>

                <div className="bg-gray-100 rounded p-2 mb-2">
                  <p className="text-xs text-gray-700 line-clamp-2">
                    {link.context}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs text-[#6b7280] italic">
                  <MapPin className="h-3 w-3" />
                  {link.placement}
                </div>

                {link.gapAlignment && (
                  <div className="bg-blue-50 rounded p-2 mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-xs">⚠️</span>
                      <span className="text-xs text-blue-700">
                        {link.gapAlignment.message}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-blue-700">
                      {link.gapAlignment.score}/100
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* External Links */}
      {results.externalLinkSuggestions && results.externalLinkSuggestions.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-sm">External Links ({results.externalLinkSuggestions.length})</h4>
            <Badge className="bg-[#8b5cf6] text-white text-xs">High Authority Sources</Badge>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {results.externalLinkSuggestions.map((link: any) => (
              <div key={link.id} className="bg-[#f3f0ff] rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-semibold text-sm text-[#8b5cf6]">
                    {link.anchorText}
                  </span>
                  <div className="text-right">
                    <div className="font-bold text-base text-[#8b5cf6]">
                      {link.authorityScore}
                    </div>
                    <div className="text-[9px] text-[#6b7280]">Authority</div>
                  </div>
                </div>

                <p className="text-xs text-[#6b7280] truncate mb-2">
                  {link.targetUrl}
                </p>

                <Badge className="bg-blue-500 text-white text-xs mb-2">
                  {link.sourceType}
                </Badge>

                <p className="text-xs text-[#6b7280] mb-2">
                  {link.reason}
                </p>

                <div className="bg-gray-100 rounded p-2">
                  <p className="text-xs text-gray-700 line-clamp-2">
                    {link.context}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <Button
        onClick={onSave}
        className="w-full bg-[#02a4bf] hover:bg-[#018a9f] text-white"
      >
        View Full Report
      </Button>
    </Card>
  );
}
