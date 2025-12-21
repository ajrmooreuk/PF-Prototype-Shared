import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import {
  FileText,
  Star,
  Edit2,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  X,
  Plus,
  GripVertical,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Info,
  AlertCircle,
  Copy,
  Download,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { callEccoAPI } from '../../lib/eccoAPI';

type SurveyType = 'sean_ellis' | 'nps' | 'custom' | null;
type Step = 1 | 2 | 3;
type QuestionType = 'multiple_choice' | 'short_text' | 'long_text' | 'rating_scale_5' | 'rating_scale_10' | 'yes_no' | 'email_capture';

interface Question {
  id: string;
  question_text: string;
  question_type: QuestionType;
  options?: string[];
  is_required: boolean;
  display_order: number;
}

interface CreateSurveyPageProps {
  onNavigate?: (page: string) => void;
}

export function CreateSurveyPage({ onNavigate }: CreateSurveyPageProps) {
  // Step management
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedType, setSelectedType] = useState<SurveyType>(null);

  // Form data
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [productName, setProductName] = useState('');
  const [targetAudience, setTargetAudience] = useState('');

  // Sean Ellis settings
  const [includeEmailCapture, setIncludeEmailCapture] = useState(true);

  // NPS settings
  const [includeFeedbackQuestion, setIncludeFeedbackQuestion] = useState(true);

  // Custom survey questions
  const [questions, setQuestions] = useState<Question[]>([]);
  const [nextQuestionId, setNextQuestionId] = useState(1);

  // Distribution settings
  const [surveyStatus, setSurveyStatus] = useState<'draft' | 'active' | 'paused'>('draft');
  const [isPublic, setIsPublic] = useState(true);
  const [requireEmail, setRequireEmail] = useState(true);
  const [allowAnonymous, setAllowAnonymous] = useState(false);
  const [maxResponses, setMaxResponses] = useState('');
  const [responsesPerUser, setResponsesPerUser] = useState('1');

  // Email distribution
  const [showEmailDistribution, setShowEmailDistribution] = useState(false);
  const [sendMethod, setSendMethod] = useState<'link' | 'email'>('link');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [brevoListId, setBrevoListId] = useState('');

  // Scheduling
  const [showScheduling, setShowScheduling] = useState(false);
  const [scheduledSendDate, setScheduledSendDate] = useState('');
  const [closeDate, setCloseDate] = useState('');

  // UI states
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdSurvey, setCreatedSurvey] = useState<any>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [formDirty, setFormDirty] = useState(false);

  // Mark form as dirty when any field changes
  useEffect(() => {
    if (selectedType || title || productName || questions.length > 0) {
      setFormDirty(true);
    }
  }, [selectedType, title, productName, questions]);

  const handleTypeSelect = (type: SurveyType) => {
    setSelectedType(type);
    setErrors({});
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !selectedType) {
      toast.error('Please select a survey type');
      return;
    }

    if (currentStep === 2) {
      if (!validateStep2()) {
        return;
      }
    }

    setCurrentStep((prev) => Math.min(3, prev + 1) as Step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1) as Step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (selectedType === 'custom') {
      if (!title.trim()) {
        newErrors.title = 'Survey title is required';
      } else if (title.length > 500) {
        newErrors.title = 'Title must be 500 characters or less';
      }

      if (questions.length === 0) {
        toast.error('Add at least one question before continuing');
        return false;
      }

      // Validate questions
      questions.forEach((q, index) => {
        if (!q.question_text.trim()) {
          newErrors[`question_${index}_text`] = 'Question text is required';
        }
        if (q.question_type === 'multiple_choice' && (!q.options || q.options.length < 2)) {
          newErrors[`question_${index}_options`] = 'Multiple choice questions need at least 2 options';
        }
      });
    } else {
      // Sean Ellis or NPS
      if (!productName.trim()) {
        newErrors.productName = 'Product name is required';
      } else if (productName.length > 200) {
        newErrors.productName = 'Product name must be 200 characters or less';
      }
    }

    if (targetAudience.length > 100) {
      newErrors.targetAudience = 'Target audience must be 100 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (sendMethod === 'email') {
      if (!emailSubject.trim()) {
        newErrors.emailSubject = 'Email subject is required';
      }
      if (!emailBody.trim()) {
        newErrors.emailBody = 'Email body is required';
      }
    }

    if (scheduledSendDate && closeDate) {
      if (new Date(closeDate) <= new Date(scheduledSendDate)) {
        newErrors.closeDate = 'Close date must be after send date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: `q${nextQuestionId}`,
      question_text: '',
      question_type: 'short_text',
      is_required: false,
      display_order: questions.length + 1,
    };
    setQuestions([...questions, newQuestion]);
    setNextQuestionId(nextQuestionId + 1);
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id).map((q, index) => ({
      ...q,
      display_order: index + 1
    })));
  };

  const handleQuestionChange = (id: string, field: string, value: any) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        if (field === 'question_type' && value === 'multiple_choice' && !q.options) {
          return { ...q, [field]: value, options: ['', ''] };
        }
        return { ...q, [field]: value };
      }
      return q;
    }));
  };

  const handleAddOption = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return { ...q, options: [...(q.options || []), ''] };
      }
      return q;
    }));
  };

  const handleOptionChange = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const handleDeleteOption = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        return { ...q, options: q.options.filter((_, i) => i !== optionIndex) };
      }
      return q;
    }));
  };

  const handleSaveAsDraft = async () => {
    await handleSubmit('draft');
  };

  const handleCreateAndActivate = async () => {
    if (currentStep === 3) {
      if (!validateStep3()) {
        return;
      }
      await handleSubmit('active');
    } else {
      // If not on step 3, just advance
      handleNextStep();
    }
  };

  const handleSubmit = async (status: 'draft' | 'active') => {
    try {
      setLoading(true);
      setErrors({});

      let response;

      if (selectedType === 'sean_ellis') {
        response = await callEccoAPI('/pmf/surveys/sean-ellis', 'POST', {
          product_name: productName,
          target_segment: targetAudience || 'all',
          include_email_capture: includeEmailCapture,
        });
      } else if (selectedType === 'nps') {
        response = await callEccoAPI('/pmf/surveys/nps', 'POST', {
          product_name: productName,
          target_segment: targetAudience || 'all',
          include_feedback_question: includeFeedbackQuestion,
        });
      } else if (selectedType === 'custom') {
        const requestBody: any = {
          survey_type: 'custom',
          title,
          description: description || undefined,
          target_segment: targetAudience || undefined,
          send_method: sendMethod,
          is_public: isPublic,
          require_email: requireEmail,
          allow_anonymous: allowAnonymous,
          max_responses: maxResponses ? parseInt(maxResponses) : null,
          response_limit_per_user: parseInt(responsesPerUser),
          scheduled_send_date: scheduledSendDate || null,
          close_date: closeDate || null,
          status,
          questions: questions.map(q => ({
            question_text: q.question_text,
            question_type: q.question_type,
            options: q.options,
            is_required: q.is_required,
            display_order: q.display_order,
          })),
        };

        if (sendMethod === 'email') {
          requestBody.email_subject = emailSubject;
          requestBody.email_body = emailBody;
          if (brevoListId) {
            requestBody.brevo_list_id = parseInt(brevoListId);
          }
        }

        response = await callEccoAPI('/pmf/surveys', 'POST', requestBody);
      }

      setCreatedSurvey(response);
      setShowSuccessModal(true);
      setFormDirty(false);

      toast.success(
        status === 'draft' 
          ? 'Survey saved as draft' 
          : 'Survey created successfully!'
      );
    } catch (error: any) {
      console.error('Error creating survey:', error);
      
      if (error.detail) {
        if (typeof error.detail === 'string') {
          toast.error(error.detail);
        } else if (Array.isArray(error.detail)) {
          // Validation errors
          const newErrors: Record<string, string> = {};
          error.detail.forEach((err: any) => {
            const fieldName = err.loc[err.loc.length - 1];
            newErrors[fieldName] = err.msg;
          });
          setErrors(newErrors);
          toast.error('Please fix the errors in the form');
        }
      } else {
        toast.error('Failed to create survey. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (formDirty) {
      setShowCancelDialog(true);
    } else {
      onNavigate?.('pmf-surveys');
    }
  };

  const handleCopyLink = () => {
    if (createdSurvey?.public_link) {
      navigator.clipboard.writeText(createdSurvey.public_link);
      toast.success('Survey link copied to clipboard');
    }
  };

  const getCharacterCount = (text: string, max: number) => {
    const count = text.length;
    const percentage = (count / max) * 100;
    let color = 'text-gray-500';
    if (percentage >= 100) color = 'text-red-600';
    else if (percentage >= 90) color = 'text-orange-500';
    
    return (
      <span className={`${color}`} style={{ fontFamily: 'Open Sans', fontSize: '11px' }}>
        {count}/{max}
      </span>
    );
  };

  const getSurveyTypeInfo = (type: SurveyType) => {
    const types = {
      sean_ellis: {
        icon: '📊',
        iconBg: 'bg-blue-100',
        title: 'Sean Ellis Survey',
        badge: { text: 'Recommended', className: 'bg-[#02a4bf] text-white' },
        description: 'Measure how disappointed customers would be if your product disappeared. The gold standard for PMF.',
        features: ['Pre-built questions', '40% PMF threshold', 'Automatic scoring'],
        bestFor: { text: 'Best for: B2B & SaaS products', bg: 'bg-blue-50', color: 'text-blue-700' }
      },
      nps: {
        icon: '⭐',
        iconBg: 'bg-green-100',
        title: 'NPS Survey',
        badge: null,
        description: 'Track customer satisfaction with Net Promoter Score. Measure how likely customers are to recommend you.',
        features: ['0-10 rating scale', 'Promoter/Detractor analysis', 'Industry benchmarks'],
        bestFor: { text: 'Best for: All business types', bg: 'bg-green-50', color: 'text-green-700' }
      },
      custom: {
        icon: '📝',
        iconBg: 'bg-purple-100',
        title: 'Custom Survey',
        badge: { text: 'Advanced', className: 'bg-purple-500 text-white' },
        description: 'Build your own survey with custom questions. Full flexibility for specific research needs.',
        features: ['Custom question types', 'Conditional logic', 'Advanced analytics'],
        bestFor: { text: 'Best for: Custom research', bg: 'bg-purple-50', color: 'text-purple-700' }
      }
    };
    return types[type as keyof typeof types];
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] pb-12">
      <div className="max-w-[900px] mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <div className="mb-6" style={{ fontFamily: 'Open Sans' }}>
          <button 
            onClick={() => onNavigate?.('dashboard')}
            className="text-gray-500 hover:text-[#02a4bf] transition-colors"
          >
            Dashboard
          </button>
          <span className="text-gray-400 mx-2">&gt;</span>
          <button 
            onClick={() => onNavigate?.('pmf-overview')}
            className="text-gray-500 hover:text-[#02a4bf] transition-colors"
          >
            PMF
          </button>
          <span className="text-gray-400 mx-2">&gt;</span>
          <button 
            onClick={() => onNavigate?.('pmf-surveys')}
            className="text-gray-500 hover:text-[#02a4bf] transition-colors"
          >
            Surveys
          </button>
          <span className="text-gray-400 mx-2">&gt;</span>
          <span className="text-[#005260]" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>Create Survey</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px' }}>
            Create Survey
          </h1>
          <p className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
            Choose a template or build your own questions
          </p>
        </div>

        {/* Progress Indicator */}
        <Card className="mb-8 p-5">
          <div className="flex items-center justify-between max-w-[600px] mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                currentStep > 1 
                  ? 'bg-[#02a4bf]' 
                  : currentStep === 1 
                    ? 'bg-[#02a4bf]' 
                    : 'bg-gray-300'
              }`}>
                {currentStep > 1 ? (
                  <CheckCircle className="h-6 w-6 text-white" />
                ) : (
                  <span className="text-white" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}>1</span>
                )}
              </div>
              <span 
                className={`mt-2 ${currentStep >= 1 ? 'text-[#02a4bf]' : 'text-gray-500'}`}
                style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '13px' }}
              >
                Choose Type
              </span>
            </div>

            {/* Line 1-2 */}
            <div className={`flex-1 h-0.5 mx-4 ${currentStep > 1 ? 'bg-[#02a4bf]' : 'bg-gray-300'}`} />

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                currentStep > 2 
                  ? 'bg-[#02a4bf]' 
                  : currentStep === 2 
                    ? 'bg-[#02a4bf]' 
                    : 'bg-gray-300'
              }`}>
                {currentStep > 2 ? (
                  <CheckCircle className="h-6 w-6 text-white" />
                ) : (
                  <span className="text-white" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}>2</span>
                )}
              </div>
              <span 
                className={`mt-2 ${currentStep >= 2 ? 'text-[#02a4bf]' : 'text-gray-500'}`}
                style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '13px' }}
              >
                Survey Details
              </span>
            </div>

            {/* Line 2-3 */}
            <div className={`flex-1 h-0.5 mx-4 ${currentStep > 2 ? 'bg-[#02a4bf]' : 'bg-gray-300'}`} />

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                currentStep === 3 ? 'bg-[#02a4bf]' : 'bg-gray-300'
              }`}>
                <span className="text-white" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}>3</span>
              </div>
              <span 
                className={`mt-2 ${currentStep === 3 ? 'text-[#02a4bf]' : 'text-gray-500'}`}
                style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '13px' }}
              >
                Distribution
              </span>
            </div>
          </div>
        </Card>

        {/* Step 1: Choose Survey Type */}
        {currentStep === 1 && (
          <Card className="p-6">
            <h2 className="text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}>
              Select Survey Type
            </h2>
            <p className="text-gray-600 mb-6" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Choose a template that matches your goal
            </p>

            <div className="grid grid-cols-3 gap-4">
              {(['sean_ellis', 'nps', 'custom'] as SurveyType[]).map((type) => {
                if (!type) return null;
                const info = getSurveyTypeInfo(type);
                const isSelected = selectedType === type;

                return (
                  <div
                    key={type}
                    className={`border-2 rounded-2xl p-6 cursor-pointer transition-all hover:scale-102 hover:shadow-md bg-white ${
                      isSelected 
                        ? 'border-[#02a4bf] shadow-lg' 
                        : 'border-gray-200 hover:border-[#02a4bf]'
                    }`}
                    style={{ minHeight: '460px', display: 'flex', flexDirection: 'column' }}
                    onClick={() => handleTypeSelect(type)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-full ${info.iconBg} flex items-center justify-center text-2xl flex-shrink-0`}>
                        {info.icon}
                      </div>
                      {info.badge && (
                        <Badge className={`${info.badge.className} text-xs px-2 py-0.5`} style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                          {info.badge.text}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-gray-900 mb-3" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}>
                      {info.title}
                    </h3>

                    <p className="text-gray-600 mb-4" style={{ fontFamily: 'Open Sans', fontSize: '14px', lineHeight: '1.6' }}>
                      {info.description}
                    </p>

                    {/* Features in bordered box */}
                    <div className="border border-gray-200 rounded-lg p-3 mb-4 bg-gray-50">
                      <ul className="space-y-2">
                        {info.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-[#02a4bf] flex-shrink-0" style={{ fontSize: '14px', marginTop: '2px' }}>✓</span>
                            <span className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '13px', lineHeight: '1.5' }}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto">
                      <div className={`${info.bestFor.bg} ${info.bestFor.color} px-3 py-2 rounded-full text-center mb-4`} style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '12px' }}>
                        {info.bestFor.text}
                      </div>

                      <Button 
                        className={`w-full ${isSelected ? 'bg-white text-[#02a4bf] border-2 border-[#02a4bf]' : 'bg-[#02a4bf] text-white'}`}
                        style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', height: '40px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTypeSelect(type);
                        }}
                      >
                        {isSelected ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Selected
                          </>
                        ) : (
                          'Select'
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Step 2: Survey Details */}
        {currentStep === 2 && selectedType && (
          <Card className="p-6">
            {currentStep > 1 && (
              <button
                onClick={handlePrevStep}
                className="flex items-center gap-2 text-[#02a4bf] hover:underline mb-4"
                style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Choose Type
              </button>
            )}

            <h2 className="text-[#005260] mb-6" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}>
              {getSurveyTypeInfo(selectedType).title} Details
            </h2>

            <div className="space-y-6">
              {/* Common Fields for Sean Ellis & NPS */}
              {(selectedType === 'sean_ellis' || selectedType === 'nps') && (
                <>
                  {/* Product Name */}
                  <div>
                    <label className="block mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                      Product/Service Name <span className="text-red-600">*</span>
                    </label>
                    <Input
                      placeholder="e.g., Ecco AI Platform"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      maxLength={200}
                      className={`h-12 ${errors.productName ? 'border-red-500' : ''}`}
                      style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                    />
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-1">
                        {errors.productName && (
                          <span className="text-red-600 flex items-center gap-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                            <AlertCircle className="h-3 w-3" />
                            {errors.productName}
                          </span>
                        )}
                        {!errors.productName && (
                          <span className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                            This will be used in survey questions
                          </span>
                        )}
                      </div>
                      {getCharacterCount(productName, 200)}
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div>
                    <label className="block mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                      Target Audience (Segment)
                    </label>
                    <Input
                      placeholder="e.g., Enterprise customers, Free trial users, All customers"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      maxLength={100}
                      className="h-12"
                      style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                        Leave blank for all customers
                      </span>
                      {getCharacterCount(targetAudience, 100)}
                    </div>
                  </div>
                </>
              )}

              {/* Sean Ellis Specific */}
              {selectedType === 'sean_ellis' && (
                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                  <h3 className="text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
                    Sean Ellis Settings
                  </h3>

                  {/* Email Capture Toggle */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <label className="block" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                        Collect Respondent Emails
                      </label>
                      <span className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                        Recommended for follow-up analysis
                      </span>
                    </div>
                    <Switch checked={includeEmailCapture} onCheckedChange={setIncludeEmailCapture} />
                  </div>

                  {/* Question Preview */}
                  <div className="bg-[#E6F7F9] border border-[#02a4bf] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">📊</span>
                      <span className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '14px' }}>
                        Pre-configured Questions:
                      </span>
                    </div>
                    <div className="space-y-3 text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                      <div>
                        <div style={{ fontFamily: 'Poppins', fontWeight: 700 }}>1. How would you feel if you could no longer use {productName || '[Product Name]'}?</div>
                        <div className="ml-4 mt-1 space-y-1">
                          <div>• Very disappointed</div>
                          <div>• Somewhat disappointed</div>
                          <div>• Not disappointed</div>
                        </div>
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Poppins', fontWeight: 700 }}>2. What is the main benefit you receive from {productName || '[Product Name]'}?</div>
                        <div className="ml-4 mt-1 text-gray-500">[Text response]</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Poppins', fontWeight: 700 }}>3. What type of person do you think would most benefit from {productName || '[Product Name]'}?</div>
                        <div className="ml-4 mt-1 text-gray-500">[Text response]</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Poppins', fontWeight: 700 }}>4. How can we improve {productName || '[Product Name]'} for you?</div>
                        <div className="ml-4 mt-1 text-gray-500">[Text response]</div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#02a4bf]/20">
                        <CheckCircle className="h-4 w-4 text-[#02a4bf]" />
                        <span className="text-[#005260]" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                          Responses automatically calculate PMF score (40% threshold)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* NPS Specific */}
              {selectedType === 'nps' && (
                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                  <h3 className="text-gray-900 mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
                    NPS Settings
                  </h3>

                  {/* Feedback Toggle */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <label className="block" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                        Ask Why They Gave That Score
                      </label>
                      <span className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                        Provides context for the rating
                      </span>
                    </div>
                    <Switch checked={includeFeedbackQuestion} onCheckedChange={setIncludeFeedbackQuestion} />
                  </div>

                  {/* Question Preview */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">⭐</span>
                      <span className="text-green-900" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '14px' }}>
                        NPS Question:
                      </span>
                    </div>
                    <div className="space-y-3 text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                      <div>
                        <div style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                          On a scale of 0-10, how likely are you to recommend {productName || '[Product Name]'} to a friend or colleague?
                        </div>
                        <div className="flex items-center gap-2 mt-3 text-xs">
                          <span className="text-gray-500">Not at all likely</span>
                          <div className="flex gap-1">
                            {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
                              <div key={n} className="w-8 h-8 border-2 border-gray-300 rounded flex items-center justify-center bg-white font-semibold">
                                {n}
                              </div>
                            ))}
                          </div>
                          <span className="text-gray-500">Extremely likely</span>
                        </div>
                      </div>
                      {includeFeedbackQuestion && (
                        <div className="pt-3 border-t border-green-200">
                          <div style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>Optional Follow-up:</div>
                          <div className="mt-1">What is the primary reason for your score?</div>
                          <div className="ml-4 mt-1 text-gray-500">[Text response]</div>
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-green-200">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-900" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                          Automatically calculates NPS score and categorizes respondents
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Custom Survey */}
              {selectedType === 'custom' && (
                <>
                  {/* Title */}
                  <div>
                    <label className="block mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                      Survey Title <span className="text-red-600">*</span>
                    </label>
                    <Input
                      placeholder="e.g., Q4 2025 Product-Market Fit Survey"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={500}
                      className={`h-12 ${errors.title ? 'border-red-500' : ''}`}
                      style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                    />
                    <div className="flex justify-between mt-1">
                      {errors.title && (
                        <span className="text-red-600 flex items-center gap-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                          <AlertCircle className="h-3 w-3" />
                          {errors.title}
                        </span>
                      )}
                      {!errors.title && (
                        <span className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                          Give your survey a descriptive title
                        </span>
                      )}
                      {getCharacterCount(title, 500)}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                      Internal Description
                    </label>
                    <Textarea
                      placeholder="Internal notes about this survey (not shown to respondents)"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      maxLength={5000}
                      className="min-h-[80px]"
                      style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                        For your reference only
                      </span>
                      {getCharacterCount(description, 5000)}
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div>
                    <label className="block mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                      Target Audience (Segment)
                    </label>
                    <Input
                      placeholder="e.g., Enterprise customers, Free trial users"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      maxLength={100}
                      className="h-12"
                      style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                        Leave blank for all customers
                      </span>
                      {getCharacterCount(targetAudience, 100)}
                    </div>
                  </div>

                  {/* Question Builder */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-900" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}>
                        Questions
                      </h3>
                      <Button
                        onClick={handleAddQuestion}
                        className="bg-[#02a4bf] hover:bg-[#028a9f] text-white"
                        style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Question
                      </Button>
                    </div>

                    {questions.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                        <span className="text-6xl mb-3">📝</span>
                        <h4 className="text-gray-900 mb-1" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
                          No questions added yet
                        </h4>
                        <p className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                          Click "+ Add Question" to start building your survey
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {questions.map((question, index) => (
                          <div key={question.id} className="border border-gray-200 rounded-xl p-5 bg-white">
                            <div className="flex items-start gap-3">
                              <GripVertical className="h-5 w-5 text-gray-400 mt-2 cursor-move" />
                              
                              <div className="flex-1 space-y-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '12px' }}>
                                    Question {index + 1}
                                  </span>
                                  <button
                                    onClick={() => handleDeleteQuestion(question.id)}
                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>

                                <div>
                                  <Textarea
                                    placeholder="Enter your question"
                                    value={question.question_text}
                                    onChange={(e) => handleQuestionChange(question.id, 'question_text', e.target.value)}
                                    maxLength={500}
                                    className="min-h-[60px]"
                                    style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                                  />
                                  {errors[`question_${index}_text`] && (
                                    <span className="text-red-600 flex items-center gap-1 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                                      <AlertCircle className="h-3 w-3" />
                                      {errors[`question_${index}_text`]}
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-4">
                                  <div className="flex-1">
                                    <label className="block mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '13px' }}>
                                      Type
                                    </label>
                                    <Select
                                      value={question.question_type}
                                      onValueChange={(value) => handleQuestionChange(question.id, 'question_type', value)}
                                    >
                                      <SelectTrigger className="h-10">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                                        <SelectItem value="short_text">Short Text</SelectItem>
                                        <SelectItem value="long_text">Long Text</SelectItem>
                                        <SelectItem value="rating_scale_5">Rating Scale (1-5)</SelectItem>
                                        <SelectItem value="rating_scale_10">Rating Scale (1-10)</SelectItem>
                                        <SelectItem value="yes_no">Yes/No</SelectItem>
                                        <SelectItem value="email_capture">Email Capture</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="flex items-center gap-2 mt-6">
                                    <Switch
                                      checked={question.is_required}
                                      onCheckedChange={(checked) => handleQuestionChange(question.id, 'is_required', checked)}
                                    />
                                    <label style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>Required</label>
                                  </div>
                                </div>

                                {question.question_type === 'multiple_choice' && (
                                  <div>
                                    <div className="flex items-center justify-between mb-2">
                                      <label style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '13px' }}>
                                        Options
                                      </label>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleAddOption(question.id)}
                                        className="text-[#02a4bf] h-7"
                                        style={{ fontFamily: 'Open Sans', fontSize: '12px' }}
                                      >
                                        <Plus className="h-3 w-3 mr-1" />
                                        Add option
                                      </Button>
                                    </div>
                                    <div className="space-y-2">
                                      {question.options?.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center gap-2">
                                          <Input
                                            placeholder={`Option ${optionIndex + 1}`}
                                            value={option}
                                            onChange={(e) => handleOptionChange(question.id, optionIndex, e.target.value)}
                                            className="h-9"
                                            style={{ fontFamily: 'Open Sans', fontSize: '13px' }}
                                          />
                                          {(question.options?.length || 0) > 2 && (
                                            <button
                                              onClick={() => handleDeleteOption(question.id, optionIndex)}
                                              className="text-gray-400 hover:text-red-600"
                                            >
                                              <X className="h-4 w-4" />
                                            </button>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                    {errors[`question_${index}_options`] && (
                                      <span className="text-red-600 flex items-center gap-1 mt-2" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                                        <AlertCircle className="h-3 w-3" />
                                        {errors[`question_${index}_options`]}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </Card>
        )}

        {/* Step 3: Distribution */}
        {currentStep === 3 && (
          <Card className="p-6">
            <button
              onClick={handlePrevStep}
              className="flex items-center gap-2 text-[#02a4bf] hover:underline mb-4"
              style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Survey Details
            </button>

            <h2 className="text-[#005260] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}>
              Distribution & Access
            </h2>
            <p className="text-gray-600 mb-6" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Configure how respondents will access and complete your survey
            </p>

            <div className="space-y-6">
              {/* Survey Status */}
              <div>
                <label className="block mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                  Initial Status
                </label>
                <Select value={surveyStatus} onValueChange={(value: any) => setSurveyStatus(value)}>
                  <SelectTrigger className="h-12 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-gray-500 text-white">Draft</Badge>
                        <span>- Not accessible to respondents</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="active">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500 text-white">Active</Badge>
                        <span>- Ready to accept responses</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="paused">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-yellow-500 text-gray-900">Paused</Badge>
                        <span>- Temporarily stopped</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-gray-500 mt-1 block" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  You can change this later
                </span>
              </div>

              {/* Public Link Toggle */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <label className="block" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                    Public Survey Link
                  </label>
                  <span className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                    Anyone with the link can respond
                  </span>
                </div>
                <Switch checked={isPublic} onCheckedChange={setIsPublic} />
              </div>

              {/* Require Email Toggle */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <label className="block" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                    Require Respondent Email
                  </label>
                  <span className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                    Collect email addresses from all respondents
                  </span>
                </div>
                <Switch 
                  checked={requireEmail} 
                  onCheckedChange={(checked) => {
                    setRequireEmail(checked);
                    if (checked) setAllowAnonymous(false);
                  }} 
                />
              </div>

              {/* Allow Anonymous Toggle */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <label className="block" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                    Allow Anonymous Responses
                  </label>
                  <span className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                    Let users respond without providing email
                  </span>
                </div>
                <Switch 
                  checked={allowAnonymous} 
                  onCheckedChange={setAllowAnonymous}
                  disabled={requireEmail}
                />
              </div>

              {/* Response Limits */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                    Response Limit
                  </label>
                  <Input
                    type="number"
                    placeholder="Unlimited"
                    value={maxResponses}
                    onChange={(e) => setMaxResponses(e.target.value)}
                    min="1"
                    max="100000"
                    className="h-12"
                    style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                  />
                  <span className="text-gray-500 mt-1 block" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                    Leave blank for unlimited responses
                  </span>
                </div>

                <div>
                  <label className="block mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                    Responses Per User
                  </label>
                  <Input
                    type="number"
                    value={responsesPerUser}
                    onChange={(e) => setResponsesPerUser(e.target.value)}
                    min="1"
                    max="10"
                    className="h-12"
                    style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                  />
                  <span className="text-gray-500 mt-1 block" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                    How many times can the same user respond
                  </span>
                </div>
              </div>

              {/* Email Distribution (Expandable) */}
              {selectedType === 'custom' && (
                <div className="border border-gray-200 rounded-xl">
                  <button
                    onClick={() => setShowEmailDistribution(!showEmailDistribution)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-900" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}>
                      Email Distribution
                    </span>
                    <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${showEmailDistribution ? 'rotate-180' : ''}`} />
                  </button>

                  {showEmailDistribution && (
                    <div className="p-4 pt-0 space-y-4">
                      {/* Send Method */}
                      <div>
                        <label className="block mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                          Send Method
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="sendMethod"
                              value="link"
                              checked={sendMethod === 'link'}
                              onChange={(e) => setSendMethod(e.target.value as 'link')}
                              className="w-4 h-4 text-[#02a4bf]"
                            />
                            <span style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Link Only</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="sendMethod"
                              value="email"
                              checked={sendMethod === 'email'}
                              onChange={(e) => setSendMethod(e.target.value as 'email')}
                              className="w-4 h-4 text-[#02a4bf]"
                            />
                            <span style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>Send via Email</span>
                          </label>
                        </div>
                      </div>

                      {sendMethod === 'email' && (
                        <>
                          {/* Email Subject */}
                          <div>
                            <label className="block mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                              Email Subject <span className="text-red-600">*</span>
                            </label>
                            <Input
                              placeholder="Subject line"
                              value={emailSubject}
                              onChange={(e) => setEmailSubject(e.target.value)}
                              maxLength={500}
                              className={`h-12 ${errors.emailSubject ? 'border-red-500' : ''}`}
                              style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                            />
                            {errors.emailSubject && (
                              <span className="text-red-600 flex items-center gap-1 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                                <AlertCircle className="h-3 w-3" />
                                {errors.emailSubject}
                              </span>
                            )}
                          </div>

                          {/* Email Body */}
                          <div>
                            <label className="block mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                              Email Body <span className="text-red-600">*</span>
                            </label>
                            <Textarea
                              placeholder="Compose your email invitation... Use {survey_link} to insert the survey URL"
                              value={emailBody}
                              onChange={(e) => setEmailBody(e.target.value)}
                              maxLength={10000}
                              className={`min-h-[120px] ${errors.emailBody ? 'border-red-500' : ''}`}
                              style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                            />
                            <div className="flex justify-between mt-1">
                              {errors.emailBody ? (
                                <span className="text-red-600 flex items-center gap-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                                  <AlertCircle className="h-3 w-3" />
                                  {errors.emailBody}
                                </span>
                              ) : (
                                <span className="text-gray-500" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                                  Variables: {'{survey_link}'}, {'{product_name}'}, {'{recipient_name}'}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Brevo List ID */}
                          <div>
                            <label className="block mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                              Brevo List ID (Optional)
                            </label>
                            <Input
                              type="number"
                              placeholder="Your email list ID from Brevo"
                              value={brevoListId}
                              onChange={(e) => setBrevoListId(e.target.value)}
                              className="h-12"
                              style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                            />
                            <a 
                              href="https://app.brevo.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[#02a4bf] hover:underline mt-1 inline-block"
                              style={{ fontFamily: 'Open Sans', fontSize: '12px' }}
                            >
                              Find in Brevo →
                            </a>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Scheduling (Expandable) */}
              {selectedType === 'custom' && (
                <div className="border border-gray-200 rounded-xl">
                  <button
                    onClick={() => setShowScheduling(!showScheduling)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-900" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}>
                      Schedule
                    </span>
                    <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${showScheduling ? 'rotate-180' : ''}`} />
                  </button>

                  {showScheduling && (
                    <div className="p-4 pt-0 space-y-4">
                      {/* Send Date */}
                      <div>
                        <label className="block mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                          Schedule Send Date
                        </label>
                        <Input
                          type="datetime-local"
                          value={scheduledSendDate}
                          onChange={(e) => setScheduledSendDate(e.target.value)}
                          className="h-12"
                          style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                        />
                        <span className="text-gray-500 mt-1 block" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                          When to send survey invitations (leave blank to send immediately)
                        </span>
                      </div>

                      {/* Close Date */}
                      <div>
                        <label className="block mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}>
                          Survey Close Date
                        </label>
                        <Input
                          type="datetime-local"
                          value={closeDate}
                          onChange={(e) => setCloseDate(e.target.value)}
                          className={`h-12 ${errors.closeDate ? 'border-red-500' : ''}`}
                          style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                        />
                        {errors.closeDate ? (
                          <span className="text-red-600 flex items-center gap-1 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                            <AlertCircle className="h-3 w-3" />
                            {errors.closeDate}
                          </span>
                        ) : (
                          <span className="text-gray-500 mt-1 block" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                            When to stop accepting responses (leave blank for no expiration)
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 py-5 mt-8 -mx-6 px-6">
          <div className="flex items-center justify-between max-w-[900px] mx-auto">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
              className="h-12 px-8 bg-gray-100 hover:bg-gray-200 border-0"
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', width: '140px' }}
            >
              Cancel
            </Button>

            <div className="flex items-center gap-3">
              {currentStep === 3 && (
                <Button
                  variant="outline"
                  onClick={handleSaveAsDraft}
                  disabled={loading}
                  className="h-12 px-6 border-2 border-[#02a4bf] text-[#02a4bf] hover:bg-[#02a4bf]/5"
                  style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', width: '160px' }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      💾 Save as Draft
                    </>
                  )}
                </Button>
              )}

              <Button
                onClick={currentStep === 3 ? handleCreateAndActivate : handleNextStep}
                disabled={loading || (currentStep === 1 && !selectedType)}
                className="h-12 px-6 bg-[#02a4bf] hover:bg-[#028a9f] text-white"
                style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', width: currentStep === 3 ? '180px' : '160px' }}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : currentStep === 3 ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Create & Activate
                  </>
                ) : (
                  <>
                    Next Step
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AlertDialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <AlertDialogContent className="max-w-[600px]">
          <AlertDialogHeader>
            <div className="flex flex-col items-center text-center mb-4">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <AlertDialogTitle className="text-gray-900 mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
                Survey Created Successfully!
              </AlertDialogTitle>
              <AlertDialogDescription style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
                {surveyStatus === 'draft' 
                  ? 'Your survey has been saved as a draft' 
                  : 'Your survey is now live and accepting responses'}
              </AlertDialogDescription>
            </div>

            {createdSurvey?.public_link && (
              <div className="space-y-3">
                <label className="block" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>
                  Public Survey Link
                </label>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <code className="flex-1 text-sm text-gray-700 break-all" style={{ fontFamily: 'monospace' }}>
                    {createdSurvey.public_link}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyLink}
                    className="flex-shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowSuccessModal(false);
                onNavigate?.('pmf-surveys');
              }}
              className="w-full"
              style={{ fontFamily: 'Poppins', fontWeight: 500 }}
            >
              View All Surveys
            </Button>
            <Button
              onClick={() => {
                setShowSuccessModal(false);
                // Reset form
                setSelectedType(null);
                setCurrentStep(1);
                setTitle('');
                setProductName('');
                setQuestions([]);
                setFormDirty(false);
              }}
              className="w-full bg-[#02a4bf] hover:bg-[#028a9f] text-white"
              style={{ fontFamily: 'Poppins', fontWeight: 500 }}
            >
              Create Another Survey
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
              Discard Changes?
            </AlertDialogTitle>
            <AlertDialogDescription style={{ fontFamily: 'Open Sans' }}>
              You have unsaved changes. Are you sure you want to leave? All changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel style={{ fontFamily: 'Open Sans' }}>
              Continue Editing
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowCancelDialog(false);
                onNavigate?.('pmf-surveys');
              }}
              className="bg-red-600 hover:bg-red-700"
              style={{ fontFamily: 'Poppins', fontWeight: 600 }}
            >
              Discard Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
