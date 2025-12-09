import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ChevronRight, ChevronDown, Check } from 'lucide-react';

export function LivePreview() {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(1);

  const sampleQuestions = [
    {
      id: 0,
      question: "What is AI visibility optimization?",
      answer: "AI visibility optimization refers to the strategic process of ensuring your brand, content, and expertise are discoverable and cited by AI platforms like ChatGPT, Claude, Perplexity, and Gemini. It works by analyzing how AI models respond to relevant queries in your industry and optimizing your digital presence to increase the likelihood of being referenced in AI-generated responses."
    },
    {
      id: 1,
      question: "How does AI citation tracking work?",
      answer: "AI citation tracking monitors when and how AI platforms reference your brand or content. It works by testing queries across ChatGPT, Claude, Perplexity, and other AI tools, then analyzing which brands appear in responses and how frequently. This helps you understand your visibility in the AI ecosystem and identify opportunities to improve your presence in AI-generated content."
    }
  ];

  return (
    <Card className="p-6 rounded-2xl shadow-sm sticky top-20">
      {/* Title */}
      <div className="mb-4">
        <h3 className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
          FAQ Preview
        </h3>
        <p className="text-[#6b7280] mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          How your FAQs will appear
        </p>
      </div>

      {/* Sample FAQ Accordion */}
      <div className="space-y-3 mb-6">
        {sampleQuestions.map((item) => {
          const isExpanded = expandedQuestion === item.id;
          
          return (
            <div 
              key={item.id}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                isExpanded ? 'border-[#02a4bf]' : 'border-[#e5e7eb]'
              }`}
            >
              {/* Question Header */}
              <button
                onClick={() => setExpandedQuestion(isExpanded ? null : item.id)}
                className={`w-full p-4 flex items-center gap-3 transition-colors ${
                  isExpanded ? 'bg-[#02a4bf]/5' : 'bg-white hover:bg-[#f9fafb]'
                }`}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 flex-shrink-0 text-[#02a4bf]" />
                ) : (
                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-[#6b7280]" />
                )}
                <span 
                  className={`text-left ${isExpanded ? 'font-bold' : ''}`}
                  style={{ fontFamily: 'Open Sans', fontSize: '15px', color: '#111827' }}
                >
                  {item.question}
                </span>
              </button>

              {/* Answer (Expanded) */}
              {isExpanded && (
                <div className="p-4 bg-white border-t border-[#e5e7eb]">
                  <p 
                    className="text-[#374151]"
                    style={{ fontFamily: 'Open Sans', fontSize: '14px', lineHeight: '1.7' }}
                  >
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Schema Ready Badge */}
      <div className="flex justify-center mb-6">
        <Badge 
          className="bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981]/20 border-0 px-4 py-1.5"
          style={{ fontFamily: 'Poppins', fontSize: '13px' }}
        >
          <Check className="h-3 w-3 mr-1" />
          Schema Ready
        </Badge>
      </div>

      {/* Divider */}
      <div className="border-t border-[#e5e7eb] mb-6" />

      {/* What You Get Section */}
      <div>
        <h4 className="text-[#005260] mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
          What You Get
        </h4>
        <div className="space-y-2.5">
          {[
            'Optimized questions based on real user queries',
            'Comprehensive answers (150-250 words each)',
            'FAQPage schema markup (JSON-LD)',
            'Individual Question schemas',
            'SEO-optimized formatting',
            'Copy-paste ready HTML',
            'Export options (HTML, JSON, Markdown)'
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-[#02a4bf] flex-shrink-0 mt-0.5" />
              <span className="text-[#374151]" style={{ fontFamily: 'Open Sans', fontSize: '14px', lineHeight: '1.6' }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
