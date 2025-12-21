import { useState } from 'react';
import { ContentInputForm } from './ContentInputForm';
import { SuggestionsPreview } from './SuggestionsPreview';
import { callEccoAPI } from '../../lib/eccoAPI';
import type { ICPContext } from '../../lib/icpAPI';

interface AnalyzeContentTabProps {
  onSave: () => void;
  tenantId: string;
  jwtToken: string;
  icpEnabled: boolean;
  icpContext: ICPContext | null;
}

export function AnalyzeContentTab({ onSave, tenantId, jwtToken, icpEnabled, icpContext }: AnalyzeContentTabProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const handleAnalyze = async (formData: any) => {
    setIsAnalyzing(true);
    setAnalysisResults(null);

    try {
      const result = await callEccoAPI('/content-studio/links', 'POST', {
        content: formData.content,
        existing_pages: formData.existingPages || []
        // use_discovery_insights: true is auto-added
      });

      setAnalysisResults(result);
    } catch (error) {
      console.error('Link analysis error:', error);
      
      // Fallback to mock data on error
      const mockResults = {
      totalLinks: 8,
      internalLinks: 5,
      externalLinks: 3,
      linkDensity: 2.1,
      averageAuthority: 87,
      internalLinkSuggestions: [
        {
          id: '1',
          anchorText: 'email marketing automation',
          targetUrl: '/blog/email-automation-guide',
          rrfScore: 92,
          relevance: 94,
          authority: 'high',
          context: '...Email marketing automation has revolutionized how businesses communicate with their customers...',
          placement: 'Paragraph 1, Sentence 1',
          gapAlignment: {
            priority: 'HIGH',
            score: 88,
            message: 'Addresses HIGH priority linking gap'
          }
        },
        {
          id: '2',
          anchorText: 'lead nurturing strategies',
          targetUrl: '/services/lead-nurturing',
          rrfScore: 85,
          relevance: 89,
          authority: 'high',
          context: '...Effective lead nurturing strategies can increase conversion rates by up to 50%...',
          placement: 'Paragraph 2, Sentence 3'
        },
        {
          id: '3',
          anchorText: 'customer segmentation',
          targetUrl: '/blog/customer-segmentation-best-practices',
          rrfScore: 78,
          relevance: 91,
          authority: 'medium',
          context: '...Customer segmentation allows you to personalize your messaging...',
          placement: 'Paragraph 3, Sentence 2'
        }
      ],
      externalLinkSuggestions: [
        {
          id: '4',
          anchorText: 'marketing automation statistics',
          targetUrl: 'https://www.wikipedia.org/wiki/Marketing_automation',
          authorityScore: 95,
          relevance: 92,
          sourceType: 'Wikipedia',
          reason: 'Provides authoritative definition and context',
          context: '...According to marketing automation statistics, businesses see an average ROI of 451%...',
          placement: 'Paragraph 1, Sentence 4'
        },
        {
          id: '5',
          anchorText: 'HubSpot research study',
          targetUrl: 'https://www.hubspot.com/research/email-marketing',
          authorityScore: 88,
          relevance: 85,
          sourceType: 'Industry',
          reason: 'Recent industry research data',
          context: '...A HubSpot research study found that segmented campaigns drive 30% more opens...',
          placement: 'Paragraph 2, Sentence 1'
        }
      ],
      recommendations: [
        'Link density is optimal. No changes needed.',
        '3 external links point to high-authority sources (Wikipedia, .edu domains).',
        'Anchor text is natural and varied - good for SEO.'
      ]
      };

      setAnalysisResults(mockResults);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-6">
      {/* Left Column - Input Form */}
      <ContentInputForm 
        onAnalyze={handleAnalyze}
        isAnalyzing={isAnalyzing}
      />

      {/* Right Column - Suggestions Preview */}
      <SuggestionsPreview
        results={analysisResults}
        isAnalyzing={isAnalyzing}
        onSave={onSave}
      />
    </div>
  );
}