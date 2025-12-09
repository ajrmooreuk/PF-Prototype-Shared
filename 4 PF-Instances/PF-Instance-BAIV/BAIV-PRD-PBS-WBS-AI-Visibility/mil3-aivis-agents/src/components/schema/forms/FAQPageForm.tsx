import { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Card } from '../../ui/card';
import { Plus, Trash2, ChevronDown, ChevronRight, GripVertical } from 'lucide-react';

interface FAQPageFormProps {
  data: any;
  onChange: (data: any) => void;
}

export function FAQPageForm({ data, onChange }: FAQPageFormProps) {
  const [faqItems, setFaqItems] = useState(data.mainEntity || [{ question: '', answer: '' }]);
  const [expandedItems, setExpandedItems] = useState<number[]>([0]);

  const updateFaqItems = (items: any[]) => {
    setFaqItems(items);
    onChange({ ...data, mainEntity: items });
  };

  const addQuestion = () => {
    if (faqItems.length < 50) {
      updateFaqItems([...faqItems, { question: '', answer: '' }]);
    }
  };

  const removeQuestion = (index: number) => {
    updateFaqItems(faqItems.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: string, value: string) => {
    const updated = faqItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    updateFaqItems(updated);
  };

  const toggleExpand = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-[#231f20] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
          Page Information
        </h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <Label className="flex items-center gap-1">
              Questions & Answers
              <span className="text-[#e84e1c]">*</span>
            </Label>
            <Button
              onClick={addQuestion}
              disabled={faqItems.length >= 50}
              className="bg-[#02a4bf] hover:bg-[#018a9f] h-10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>

          {faqItems.map((item, index) => {
            const isExpanded = expandedItems.includes(index);

            return (
              <Card key={index} className="p-4 bg-gray-50 border border-gray-200">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                    <button
                      onClick={() => toggleExpand(index)}
                      className="flex items-center gap-2"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      <span className="font-semibold">Question {index + 1}</span>
                    </button>
                  </div>
                  <button
                    onClick={() => removeQuestion(index)}
                    className="text-[#ef4444] hover:text-[#dc2626]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Content */}
                {isExpanded && (
                  <div className="space-y-3 mt-3">
                    <div>
                      <Label htmlFor={`question-${index}`} className="flex items-center gap-1">
                        Question
                        <span className="text-[#e84e1c]">*</span>
                      </Label>
                      <Input
                        id={`question-${index}`}
                        value={item.question}
                        onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                        placeholder="What is...?"
                        maxLength={200}
                        className="mt-2"
                      />
                      <span className="text-xs text-[#6b7280] float-right">{item.question.length}/200</span>
                    </div>

                    <div>
                      <Label htmlFor={`answer-${index}`} className="flex items-center gap-1">
                        Answer
                        <span className="text-[#e84e1c]">*</span>
                      </Label>
                      <Textarea
                        id={`answer-${index}`}
                        value={item.answer}
                        onChange={(e) => updateQuestion(index, 'answer', e.target.value)}
                        placeholder="Detailed answer..."
                        maxLength={1000}
                        rows={5}
                        className="mt-2"
                      />
                      <span className="text-xs text-[#6b7280] float-right">{item.answer.length}/1000</span>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}

          <Button
            onClick={addQuestion}
            disabled={faqItems.length >= 50}
            variant="outline"
            className="w-full border-[#02a4bf] text-[#02a4bf] hover:bg-[#02a4bf]/10"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>

          <p className="text-xs text-[#6b7280]">
            {faqItems.length} / 50 questions • Minimum 1 required
          </p>
        </div>
      </div>
    </div>
  );
}
