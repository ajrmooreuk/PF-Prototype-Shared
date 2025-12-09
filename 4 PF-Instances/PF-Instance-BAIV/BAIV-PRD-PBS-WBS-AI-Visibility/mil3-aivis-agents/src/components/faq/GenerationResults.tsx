import { useState } from 'react';
import { Copy, Check, Save, FileDown, Sparkles, Eye, EyeOff, ChevronDown, ChevronUp, Edit2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { toast } from 'sonner@2.0.3';
import { copyToClipboard } from '../../lib/clipboard';

interface GenerationResultsProps {
  faqs: any;
  onGenerateMore: () => void;
  onSave: () => void;
}

export function GenerationResults({ faqs, onGenerateMore, onSave }: GenerationResultsProps) {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);

  const handleCopySchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.questions.map((q: any) => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer
        }
      }))
    };
    
    copyToClipboard(JSON.stringify(schema, null, 2));
    toast.success('Schema copied to clipboard');
  };

  const handleExport = (format: string) => {
    toast.success(`Exporting as ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6">
      {/* Success Banner */}
      <Card className="p-4 bg-[#ecfdf5] border-[#a7f3d0] rounded-lg">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#10b981] flex items-center justify-center">
            <Check className="h-5 w-5 text-white" />
          </div>
          <p className="text-[#065f46]" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 600 }}>
            Generated {faqs.questions.length} FAQs successfully
          </p>
        </div>
      </Card>

      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            onClick={onGenerateMore}
            variant="outline"
            style={{ fontFamily: 'Poppins', fontSize: '14px' }}
          >
            Generate More
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleCopySchema}
            variant="ghost"
            style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Schema
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport('html')}>
                HTML
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('json')}>
                JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('markdown')}>
                Markdown
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={onSave}
            className="bg-[#02a4bf] hover:bg-[#028a9f]"
            style={{ fontFamily: 'Poppins', fontSize: '14px' }}
          >
            Save to Library
          </Button>
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.questions.map((faq: any, index: number) => {
          const isExpanded = expandedQuestion === faq.id;
          const isEditing = editingQuestion === faq.id;

          return (
            <Card 
              key={faq.id} 
              className="overflow-hidden border-l-2 border-l-[#02a4bf] shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Question Header */}
              <div 
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedQuestion(isExpanded ? null : faq.id)}
              >
                <div className="flex items-center gap-3 flex-1">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-[#02a4bf] transition-transform" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-[#02a4bf] transition-transform" />
                  )}
                  <span style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', color: '#111827' }}>
                    {faq.question}
                  </span>
                </div>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setEditingQuestion(faq.id)}
                    className="p-2 text-[#6b7280] hover:text-[#02a4bf] hover:bg-gray-100 rounded transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => toast.error('Delete functionality coming soon')}
                    className="p-2 text-[#6b7280] hover:text-[#ef4444] hover:bg-gray-100 rounded transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-5 pb-5 space-y-4">
                  {/* Answer */}
                  <div>
                    <p 
                      className="text-[#374151]"
                      style={{ fontFamily: 'Open Sans', fontSize: '14px', lineHeight: '1.8' }}
                    >
                      {faq.answer}
                    </p>
                  </div>

                  {/* Keywords */}
                  {faq.keywords && faq.keywords.length > 0 && (
                    <div>
                      <p className="text-[#6b7280] uppercase mb-2" style={{ fontFamily: 'Open Sans', fontSize: '12px', fontWeight: 700 }}>
                        Keywords
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {faq.keywords.map((keyword: string, i: number) => (
                          <Badge 
                            key={i}
                            variant="secondary"
                            className="bg-[#f3f4f6] text-[#374151]"
                            style={{ fontFamily: 'Open Sans', fontSize: '12px' }}
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Schema Preview */}
                  <div className="border-t border-gray-200 pt-4">
                    <details className="group">
                      <summary className="cursor-pointer text-[#6b7280] hover:text-[#02a4bf] flex items-center gap-2" style={{ fontFamily: 'Open Sans', fontSize: '13px', fontWeight: 600 }}>
                        <ChevronRight className="h-3 w-3 group-open:rotate-90 transition-transform" />
                        Schema Markup
                      </summary>
                      <div className="mt-3 relative">
                        <pre className="bg-[#1e293b] text-[#e2e8f0] p-3 rounded-lg overflow-x-auto text-xs" style={{ fontFamily: 'Roboto Mono', fontSize: '12px' }}>
{`{
  "@type": "Question",
  "name": "${faq.question}",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "${faq.answer.substring(0, 80)}..."
  }
}`}
                        </pre>
                        <button
                          onClick={async () => {
                            const success = await copyToClipboard(JSON.stringify({
                              "@type": "Question",
                              "name": faq.question,
                              "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                              }
                            }, null, 2));
                            if (success) {
                              toast.success('Schema copied');
                            } else {
                              toast.error('Failed to copy schema');
                            }
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 rounded text-white"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </details>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}