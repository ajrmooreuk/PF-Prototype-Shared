import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner@2.0.3';
import { ChevronRight, ChevronLeft, Check, AlertCircle, Lock, CheckCircle } from 'lucide-react';
import { callEccoAPI } from '../../lib/eccoAPI';

interface PublicSurveyPageProps {
  surveyId: string;
}

export function PublicSurveyPage({ surveyId }: PublicSurveyPageProps) {
  const [loading, setLoading] = useState(true);
  const [survey, setSurvey] = useState<any>(null);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    loadSurvey();
    checkDraft();
  }, [surveyId]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (!submitted && survey) {
      const interval = setInterval(() => {
        saveDraft();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [responses, submitted, survey]);

  const loadSurvey = async () => {
    setLoading(true);
    try {
      const response = await callEccoAPI(`/api/pmf/surveys/public/${surveyId}`, 'GET');
      setSurvey(response);
    } catch (error: any) {
      console.error('Failed to load survey:', error);
      if (error.status === 404) {
        toast.error('Survey not found or has been deleted');
      } else if (error.status === 410) {
        toast.error('This survey is no longer accepting responses');
      } else {
        toast.error('Failed to load survey');
      }
    } finally {
      setLoading(false);
    }
  };

  const saveDraft = () => {
    if (Object.keys(responses).length === 0) return;
    
    const draftData = {
      survey_id: surveyId,
      timestamp: Date.now(),
      responses: responses
    };
    localStorage.setItem(`survey_draft_${surveyId}`, JSON.stringify(draftData));
  };

  const checkDraft = () => {
    const draft = localStorage.getItem(`survey_draft_${surveyId}`);
    if (draft) {
      try {
        const data = JSON.parse(draft);
        const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        
        if (data.timestamp > sevenDaysAgo) {
          const shouldResume = window.confirm('You have a saved draft from ' + new Date(data.timestamp).toLocaleDateString() + '. Would you like to resume?');
          if (shouldResume) {
            setResponses(data.responses);
          }
        }
      } catch (e) {
        console.error('Failed to parse draft:', e);
      }
    }
  };

  const handleResponseChange = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[questionId];
      return newErrors;
    });
  };

  const validateQuestion = (question: any): boolean => {
    if (!question.required) return true;
    
    const response = responses[question.id];
    
    if (question.question_type === 'email') {
      if (!response) return !question.required;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(response)) {
        setErrors(prev => ({ ...prev, [question.id]: 'Please enter a valid email address' }));
        return false;
      }
    }
    
    if (!response || (Array.isArray(response) && response.length === 0) || response === '') {
      setErrors(prev => ({ ...prev, [question.id]: 'This question is required' }));
      return false;
    }
    
    return true;
  };

  const validateCurrentPage = (): boolean => {
    if (!survey) return false;
    
    const currentQuestions = survey.questions;
    let isValid = true;
    
    for (const question of currentQuestions) {
      if (!validateQuestion(question)) {
        isValid = false;
      }
    }
    
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateCurrentPage()) {
      toast.error('Please answer all required questions');
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        const element = document.getElementById(`question-${firstError}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setSubmitting(true);
    
    try {
      const completionTimeSeconds = Math.floor((Date.now() - startTime) / 1000);
      
      const submissionData = {
        responses: Object.entries(responses).map(([questionId, answer]) => ({
          question_id: questionId,
          answer: answer
        })),
        metadata: {
          completion_time_seconds: completionTimeSeconds,
          user_agent: navigator.userAgent,
          browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : navigator.userAgent.includes('Firefox') ? 'Firefox' : 'Other',
          device: window.innerWidth < 768 ? 'Mobile' : 'Desktop'
        }
      };

      const response = await callEccoAPI(`/api/pmf/surveys/public/${surveyId}/submit`, 'POST', submissionData);
      
      // Clear draft
      localStorage.removeItem(`survey_draft_${surveyId}`);
      
      setSubmitted(true);
      
      // Auto-redirect if URL provided
      if (response.redirect_url) {
        setTimeout(() => {
          window.location.href = response.redirect_url;
        }, 3000);
      }
    } catch (error: any) {
      console.error('Submission failed:', error);
      if (error.status === 409) {
        setSubmitted(true);
        toast.info('You have already submitted a response to this survey');
      } else {
        toast.error(error.message || 'Failed to submit survey. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const renderQuestion = (question: any) => {
    const hasError = !!errors[question.id];

    return (
      <div key={question.id} id={`question-${question.id}`} className="pb-6 border-b border-gray-100 last:border-0">
        {/* Question Header */}
        <div className="mb-3">
          <div className="text-teal-600 uppercase mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '13px' }}>
            Question {question.question_number}
            {question.required && <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">Required</span>}
          </div>
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a', lineHeight: '1.4' }}>
            {question.question_text}
          </h3>
          {question.help_text && (
            <p className="text-gray-400 italic mt-2" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              {question.help_text}
            </p>
          )}
        </div>

        {/* Question Input Based on Type */}
        <div className="mt-4">
          {question.question_type === 'multiple_choice_single' && (
            <div className="space-y-3">
              {question.options.map((option: any) => (
                <button
                  key={option.id}
                  onClick={() => handleResponseChange(question.id, option.text)}
                  className={`w-full border-2 rounded-xl p-4 text-left transition-all ${
                    responses[question.id] === option.text
                      ? 'border-teal-600 bg-teal-50'
                      : hasError
                      ? 'border-red-300'
                      : 'border-gray-200 hover:border-teal-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      responses[question.id] === option.text
                        ? 'border-teal-600 bg-teal-600'
                        : 'border-gray-300'
                    }`}>
                      {responses[question.id] === option.text && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span style={{ fontFamily: 'Open Sans', fontSize: '16px', color: '#1a1a1a' }}>
                      {option.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {question.question_type === 'multiple_choice_multi' && (
            <div className="space-y-3">
              {question.options.map((option: any) => {
                const isSelected = Array.isArray(responses[question.id]) && responses[question.id].includes(option.text);
                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      const current = responses[question.id] || [];
                      const newValue = isSelected
                        ? current.filter((v: string) => v !== option.text)
                        : [...current, option.text];
                      handleResponseChange(question.id, newValue);
                    }}
                    className={`w-full border-2 rounded-xl p-4 text-left transition-all ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50'
                        : 'border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        isSelected
                          ? 'border-teal-600 bg-teal-600'
                          : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span style={{ fontFamily: 'Open Sans', fontSize: '16px', color: '#1a1a1a' }}>
                        {option.text}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {question.question_type === 'text_short' && (
            <div>
              <Input
                value={responses[question.id] || ''}
                onChange={(e) => handleResponseChange(question.id, e.target.value)}
                placeholder={question.placeholder || 'Type your answer here...'}
                maxLength={question.max_length}
                className={`h-14 ${hasError ? 'border-red-300' : ''}`}
                style={{ fontFamily: 'Open Sans', fontSize: '16px' }}
              />
              {question.max_length && (
                <div className="text-right mt-1 text-xs text-gray-400">
                  {(responses[question.id] || '').length}/{question.max_length}
                </div>
              )}
            </div>
          )}

          {question.question_type === 'text_long' && (
            <div>
              <Textarea
                value={responses[question.id] || ''}
                onChange={(e) => handleResponseChange(question.id, e.target.value)}
                placeholder={question.placeholder || 'Share your thoughts in detail...'}
                maxLength={question.max_length}
                rows={5}
                className={hasError ? 'border-red-300' : ''}
                style={{ fontFamily: 'Open Sans', fontSize: '16px', lineHeight: '1.6' }}
              />
              {question.max_length && (
                <div className={`text-right mt-1 text-xs ${
                  (responses[question.id] || '').length / question.max_length > 0.9 ? 'text-orange-500' : 'text-gray-400'
                }`}>
                  {(responses[question.id] || '').length}/{question.max_length}
                </div>
              )}
            </div>
          )}

          {question.question_type === 'rating_scale' && question.scale_type === 'nps' && (
            <div>
              <div className="flex flex-wrap gap-2 justify-center">
                {Array.from({ length: question.scale_max - question.scale_min + 1 }, (_, i) => {
                  const value = question.scale_min + i;
                  const isSelected = responses[question.id] === value;
                  return (
                    <button
                      key={value}
                      onClick={() => handleResponseChange(question.id, value)}
                      className={`w-12 h-12 border-2 rounded-lg transition-all ${
                        isSelected
                          ? 'border-teal-600 bg-teal-600 text-white'
                          : hasError
                          ? 'border-red-300 text-gray-600'
                          : 'border-gray-200 text-gray-600 hover:border-teal-300 hover:bg-teal-50'
                      }`}
                      style={{ fontFamily: 'Open Sans', fontWeight: 700, fontSize: '18px' }}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-between mt-3 text-gray-400 text-xs" style={{ fontFamily: 'Open Sans' }}>
                <span>{question.scale_min_label}</span>
                <span>{question.scale_max_label}</span>
              </div>
            </div>
          )}

          {question.question_type === 'dropdown' && (
            <Select
              value={responses[question.id] || ''}
              onValueChange={(value) => handleResponseChange(question.id, value)}
            >
              <SelectTrigger className={`h-14 ${hasError ? 'border-red-300' : ''}`} style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
                <SelectValue placeholder="Select an option..." />
              </SelectTrigger>
              <SelectContent>
                {question.options.map((option: any) => (
                  <SelectItem key={option.id} value={option.text} style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
                    {option.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {question.question_type === 'email' && (
            <div>
              <div className="relative">
                <Input
                  type="email"
                  value={responses[question.id] || ''}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  placeholder="you@company.com"
                  className={`h-14 pl-10 ${hasError ? 'border-red-300' : ''}`}
                  style={{ fontFamily: 'Open Sans', fontSize: '16px' }}
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">✉️</span>
              </div>
              {question.help_text && (
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                  <Lock className="w-3 h-3" />
                  <span style={{ fontFamily: 'Open Sans' }}>{question.help_text}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Error Message */}
        {hasError && (
          <div className="flex items-center gap-2 mt-2 text-red-600" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
            <AlertCircle className="w-4 h-4" />
            {errors[question.id]}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: 'Open Sans' }}>Loading survey...</p>
        </div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-4">📋</div>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px', color: '#1a1a1a' }} className="mb-2">
            Survey Not Available
          </h1>
          <p className="text-gray-600 mb-6" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
            This survey does not exist or is no longer accepting responses.
          </p>
          <a
            href="mailto:support@ecco-ai.com"
            className="text-teal-600 hover:underline"
            style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
          >
            Contact Support
          </a>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', color: '#1a1a1a' }} className="mb-4">
            Thank You!
          </h1>
          <p className="text-gray-600 mb-6 max-w-md mx-auto" style={{ fontFamily: 'Open Sans', fontSize: '17px', lineHeight: '1.6' }}>
            {survey.settings.success_message || `Your feedback has been received and will help us improve ${survey.company_name}.`}
          </p>
          {survey.settings.redirect_url && (
            <p className="text-sm text-gray-400 mt-4" style={{ fontFamily: 'Open Sans' }}>
              Redirecting in 3 seconds...
            </p>
          )}
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(responses).length;
  const totalCount = survey.questions.length;
  const progress = (answeredCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      {survey.settings.show_progress && (
        <div className="sticky top-0 z-10 bg-teal-50">
          <div className="h-2 bg-gray-200">
            <div
              className="h-full bg-teal-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center py-2 text-teal-700" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '13px' }}>
            {answeredCount} of {totalCount} questions answered
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto p-6 py-8">
        {/* Branding Header */}
        <div className="text-center mb-8">
          {survey.brand_logo_url ? (
            <img src={survey.brand_logo_url} alt={survey.company_name} className="h-16 mx-auto mb-4" />
          ) : (
            <>
              <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px', color: '#1a1a1a' }}>
                {survey.company_name}
              </h1>
              <p className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '15px' }}>
                Product Feedback Survey
              </p>
            </>
          )}
        </div>

        <div className="h-px bg-gray-200 max-w-2xl mx-auto mb-8" />

        {/* Survey Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <h2 className="text-center mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '24px', color: '#1a1a1a', lineHeight: '1.3' }}>
            {survey.title}
          </h2>
          <p className="text-center text-gray-600 mb-6 max-w-xl mx-auto" style={{ fontFamily: 'Open Sans', fontSize: '16px', lineHeight: '1.6' }}>
            {survey.description}
          </p>
          <div className="flex justify-center items-center gap-4 text-gray-400 text-sm" style={{ fontFamily: 'Open Sans' }}>
            <span>📊 {survey.questions.length} questions</span>
            <span>•</span>
            <span>⏱️ ~{survey.settings.estimated_time_minutes} minutes</span>
          </div>
          <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 text-sm" style={{ fontFamily: 'Open Sans' }}>
            <Lock className="w-4 h-4" />
            <span>Your responses are confidential and will only be used to improve our product.</span>
          </div>
        </div>

        {/* Survey Form */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="space-y-8">
            {survey.questions.map((question: any) => renderQuestion(question))}
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg"
              style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Submit Survey
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
