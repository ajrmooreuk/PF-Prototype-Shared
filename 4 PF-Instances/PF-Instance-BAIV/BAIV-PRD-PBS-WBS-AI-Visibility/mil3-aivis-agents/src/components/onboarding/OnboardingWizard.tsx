import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Check, ArrowLeft, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { Step1ClientAccount } from './Step1ClientAccount';
import { Step1CompanyBasics } from './Step1CompanyBasics';
import { Step2TargetAudience } from './Step2TargetAudience';
import { Step3Competitors } from './Step3Competitors';
import { Step4Platforms } from './Step4Platforms';
import { Step5BrandVoice } from './Step5BrandVoice';
import { Step6VoiceExamples } from './Step6VoiceExamples';
import { Step8Review } from './Step8Review';
import { SuccessScreen } from './SuccessScreen';
import { callEccoAPI } from '../../lib/eccoAPI';
import { toast } from 'sonner@2.0.3';

interface OnboardingData {
  // Step 1 - Client Account
  clientEmail: string;
  clientFirstName: string;
  clientLastName: string;
  clientRole: string;
  
  // Step 2 - Company Basics
  companyName: string;
  websiteUrl: string;
  industry: string;
  companyDescription: string;
  
  // Step 3 - Target Audience
  icpDescription: string;
  targetKeywords: string[];
  
  // Step 4 - Competitors
  competitors: string[];
  
  // Step 5 - Platforms
  platforms: string[];
  
  // Step 6 - Brand Voice
  brandVoiceDescription: string;
  formality: number;
  energy: number;
  professionalBio: string;
  expertiseAreas: string[];
  
  // Step 7 - Voice Examples
  emailExample: string;
  socialPostExample: string;
  blogExample: string;
}

interface ClientCredentials {
  email: string;
  temporary_password: string;
  first_name: string;
  last_name: string;
  company_name: string;
  dashboard_url: string;
}

interface OnboardingWizardProps {
  tenantId: string;
  jwtToken: string;
  onComplete: () => void;
}

export function OnboardingWizard({ tenantId, jwtToken, onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [clientCredentials, setClientCredentials] = useState<ClientCredentials | null>(null);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditStatus, setAuditStatus] = useState('');
  
  const [data, setData] = useState<OnboardingData>({
    clientEmail: '',
    clientFirstName: '',
    clientLastName: '',
    clientRole: '',
    companyName: '',
    websiteUrl: '',
    industry: '',
    companyDescription: '',
    icpDescription: '',
    targetKeywords: [],
    competitors: [],
    platforms: ['chatgpt', 'claude', 'perplexity', 'gemini', 'bing'],
    brandVoiceDescription: '',
    formality: 3,
    energy: 3,
    professionalBio: '',
    expertiseAreas: [],
    emailExample: '',
    socialPostExample: '',
    blogExample: ''
  });

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('baiv_onboarding_progress');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Merge saved data with default values to ensure all fields exist
        setData(prev => ({
          ...prev,
          ...parsed.data,
          // Ensure arrays are always arrays
          targetKeywords: parsed.data?.targetKeywords || [],
          competitors: parsed.data?.competitors || [],
          platforms: parsed.data?.platforms || ['chatgpt', 'claude', 'perplexity', 'gemini', 'bing'],
          expertiseAreas: parsed.data?.expertiseAreas || []
        }));
        setCurrentStep(parsed.step || 1);
      } catch (e) {
        console.error('Failed to load saved progress:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (currentStep < 8) {
      localStorage.setItem('baiv_onboarding_progress', JSON.stringify({
        step: currentStep,
        data
      }));
    }
  }, [currentStep, data]);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          data.clientEmail?.length >= 5 && 
          data.clientEmail?.length <= 100 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.clientEmail) &&
          data.clientFirstName?.length >= 2 &&
          data.clientFirstName?.length <= 50 &&
          data.clientLastName?.length >= 2 &&
          data.clientLastName?.length <= 50
        );
      case 2:
        return !!(
          data.companyName?.length >= 2 && 
          data.companyName?.length <= 100 &&
          data.websiteUrl?.startsWith('https://') &&
          data.industry
        );
      case 3:
        return !!(
          data.icpDescription?.length >= 100 && 
          data.icpDescription?.length <= 300 &&
          data.targetKeywords?.length >= 5 &&
          data.targetKeywords?.length <= 10
        );
      case 4:
        return data.competitors?.length >= 3 && data.competitors?.length <= 5;
      case 5:
        return data.platforms?.length > 0;
      case 6:
        return !!(
          data.brandVoiceDescription?.length >= 100 &&
          data.brandVoiceDescription?.length <= 500 &&
          data.professionalBio?.length >= 100 &&
          data.professionalBio?.length <= 300 &&
          data.expertiseAreas?.length >= 1 &&
          data.expertiseAreas?.length <= 3
        );
      case 7:
        return true; // Optional step
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (isStepValid(currentStep)) {
      setCurrentStep(prev => Math.min(8, prev + 1));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const pollAuditStatus = async () => {
    try {
      const status = await callEccoAPI(
        '/api/onboarding/status',
        'GET'
      );

      setAuditProgress(status.progress_percent || 0);
      setAuditStatus(status.current_step || 'Processing...');

      if (status.status === 'complete') {
        toast.success('Audit completed! Redirecting to dashboard...');
        localStorage.removeItem('baiv_onboarding_progress');
        setTimeout(onComplete, 2000);
        return true;
      } else if (status.status === 'failed') {
        throw new Error('Audit failed');
      }
      return false;
    } catch (error) {
      console.error('Status poll error:', error);
      return false;
    }
  };

  const handleLaunchAudit = async () => {
    setIsSubmitting(true);
    setAuditProgress(10);
    setAuditStatus('Creating client account...');

    try {
      // Complete Onboarding & Create Tenant + Trigger Audit
      const response = await callEccoAPI(
        '/api/onboarding/complete',
        'POST',
        {
          client_email: data.clientEmail,
          client_first_name: data.clientFirstName,
          client_last_name: data.clientLastName,
          client_role: data.clientRole || null,
          company_name: data.companyName,
          website_url: data.websiteUrl,
          industry: data.industry,
          company_description: data.companyDescription || null,
          icp_description: data.icpDescription,
          target_keywords: data.targetKeywords,
          competitors: data.competitors
        }
      );

      // Extract credentials from response
      if (response.client_credentials) {
        setClientCredentials(response.client_credentials);
      }

      setAuditProgress(60);
      setAuditStatus('Discovery audit launched successfully!');
      toast.success('Client onboarded successfully!');

      // Show success screen
      setShowSuccess(true);
      localStorage.removeItem('baiv_onboarding_progress');

      // Continue polling in background for audit completion
      const pollInterval = setInterval(async () => {
        setAuditProgress(prev => Math.min(95, prev + 5));
        setAuditStatus('Running AI platform citation tests...');
      }, 3000);

      // Stop simulated progress after 30 seconds
      setTimeout(() => {
        clearInterval(pollInterval);
        setAuditProgress(100);
        setAuditStatus('Audit completed!');
      }, 30000);

    } catch (error: any) {
      console.error('Onboarding failed:', error);
      const errorMessage = error?.response?.data?.detail || error?.message || 'Something went wrong. Please try again.';
      toast.error(errorMessage);
      setIsSubmitting(false);
      setAuditProgress(0);
      setAuditStatus('');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1ClientAccount data={data} updateData={updateData} />;
      case 2:
        return <Step1CompanyBasics data={data} updateData={updateData} />;
      case 3:
        return <Step2TargetAudience data={data} updateData={updateData} />;
      case 4:
        return <Step3Competitors data={data} updateData={updateData} />;
      case 5:
        return <Step4Platforms data={data} updateData={updateData} />;
      case 6:
        return <Step5BrandVoice data={data} updateData={updateData} />;
      case 7:
        return <Step6VoiceExamples data={data} updateData={updateData} />;
      case 8:
        return <Step8Review data={data} />;
      default:
        return null;
    }
  };

  const progressPercentage = (currentStep / 8) * 100;

  // Show success screen if we have credentials
  if (showSuccess && clientCredentials) {
    return (
      <SuccessScreen
        credentials={clientCredentials}
        auditProgress={auditProgress}
        auditStatus={auditStatus}
        onDone={onComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
              Step {currentStep} of 8
            </p>
            <p className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
              {Math.round(progressPercentage)}% Complete
            </p>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          
          {/* Step Indicators */}
          <div className="flex items-center justify-between mt-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    step < currentStep
                      ? 'bg-green-500 text-white'
                      : step === currentStep
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  style={{ fontFamily: 'Poppins', fontWeight: 600 }}
                >
                  {step < currentStep ? <Check className="w-4 h-4" /> : step}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Audit Progress (when submitting) */}
        {isSubmitting && (
          <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
              <div>
                <h3 
                  className="text-blue-900"
                  style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}
                >
                  {auditStatus}
                </h3>
                <p className="text-sm text-blue-700" style={{ fontFamily: 'Open Sans' }}>
                  {auditProgress}% complete
                </p>
              </div>
            </div>
            <Progress value={auditProgress} className="h-2" />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1 || isSubmitting}
            className="px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex gap-3">
            {currentStep === 6 && (
              <Button
                variant="ghost"
                onClick={handleNext}
                disabled={isSubmitting}
              >
                Skip
              </Button>
            )}

            {currentStep < 8 ? (
              <Button
                onClick={handleNext}
                disabled={!isStepValid(currentStep) || isSubmitting}
                className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-6"
                style={{ fontFamily: 'Poppins', fontWeight: 600 }}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleLaunchAudit}
                disabled={isSubmitting}
                className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-6 text-lg"
                style={{ fontFamily: 'Poppins', fontWeight: 700 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Launching...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Launch My First Audit
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}