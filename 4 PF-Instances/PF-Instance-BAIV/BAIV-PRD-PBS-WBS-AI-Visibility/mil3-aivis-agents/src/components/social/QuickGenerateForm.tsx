import { useState, useEffect } from 'react';
import { Loader2, Linkedin, Facebook, Instagram, Upload, Image as ImageIcon, X } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Switch } from '../ui/switch';
import { toast } from 'sonner@2.0.3';
import { callEccoAPI } from '../../lib/eccoAPI';
import { GoogleDrivePickerModal } from '../GoogleDrivePickerModal';
import { checkGoogleDriveConnection } from '../../lib/googleDriveAPI';

interface QuickGenerateFormProps {
  tenantId: string;
  jwtToken: string;
  onBriefGenerated: () => void;
  onLoadFromDiscovery: () => void;
  prefilledData?: any;
  onDataUsed?: () => void;
}

export function QuickGenerateForm({ 
  tenantId, 
  jwtToken, 
  onBriefGenerated,
  onLoadFromDiscovery,
  prefilledData,
  onDataUsed
}: QuickGenerateFormProps) {
  const [topic, setTopic] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [contentAngle, setContentAngle] = useState('');
  const [keyMessage, setKeyMessage] = useState('');
  const [callToAction, setCallToAction] = useState('');
  const [platforms, setPlatforms] = useState({
    linkedin: true,
    facebook: true,
    instagram: true
  });
  const [generateImages, setGenerateImages] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attachedMedia, setAttachedMedia] = useState<any[]>([]);
  const [showDrivePicker, setShowDrivePicker] = useState(false);
  const [driveConnectionId, setDriveConnectionId] = useState<string | null>(null);
  const [driveConnectedEmail, setDriveConnectedEmail] = useState<string>('');

  // Load last settings from localStorage
  useEffect(() => {
    const lastSettings = localStorage.getItem('last_brief_settings');
    if (lastSettings) {
      const settings = JSON.parse(lastSettings);
      setPlatforms(settings.platforms || { linkedin: true, facebook: true, instagram: true });
      setGenerateImages(settings.generateImages ?? true);
    }
  }, []);

  // Prefill from discovery data
  useEffect(() => {
    if (prefilledData) {
      if (prefilledData.topic) setTopic(prefilledData.topic);
      if (prefilledData.targetAudience) setTargetAudience(prefilledData.targetAudience);
      if (prefilledData.contentAngle) setContentAngle(prefilledData.contentAngle);
      if (prefilledData.keyMessage) setKeyMessage(prefilledData.keyMessage);
      if (prefilledData.callToAction) setCallToAction(prefilledData.callToAction);
      onDataUsed?.();
    }
  }, [prefilledData, onDataUsed]);

  // Check Google Drive connection
  useEffect(() => {
    const checkConnection = async () => {
      const result = await checkGoogleDriveConnection({ tenantId, jwtToken });
      setDriveConnectionId(result.connectionId);
      setDriveConnectedEmail(result.userEmail || '');
    };
    checkConnection();
  }, [tenantId, jwtToken]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!topic.trim()) {
      newErrors.topic = "Please tell us what your post is about";
    } else if (topic.length > 100) {
      newErrors.topic = "Topic must be under 100 characters";
    }

    if (!platforms.linkedin && !platforms.facebook && !platforms.instagram) {
      newErrors.platforms = "Select at least one platform";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    setIsGenerating(true);
    
    try {
      // Save settings to localStorage
      localStorage.setItem('last_brief_settings', JSON.stringify({
        platforms,
        generateImages
      }));

      const selectedPlatforms = Object.entries(platforms)
        .filter(([_, enabled]) => enabled)
        .map(([platform, _]) => platform);

      // Step 1: Create brief
      setGenerationProgress('Analyzing your topic...');
      const brief = await callEccoAPI('/social/briefs', 'POST', {
        source_type: 'manual',
        topic: topic.trim(),
        target_audience: targetAudience.trim() || undefined,
        content_angle: contentAngle.trim() || undefined,
        key_message: keyMessage.trim() || undefined,
        call_to_action: callToAction.trim() || undefined,
        platforms: selectedPlatforms,
        generate_images: generateImages
        // use_discovery_insights: true is auto-added
      });

      // Step 2: Start generation
      setGenerationProgress('Optimizing for each platform...');
      const generateResult = await callEccoAPI(`/social/briefs/${brief.id}/generate`, 'POST', {
        platforms: selectedPlatforms,
        generate_images: generateImages
      });

      toast.info('Generation started, this may take up to 60 seconds');

      // Step 3: Poll for completion
      let attempts = 0;
      const maxAttempts = 30; // 90 seconds max
      const progressMessages = [
        'Creating AI images...',
        'Finalizing content...',
        'Almost done...'
      ];
      let progressIndex = 0;

      const pollStatus = setInterval(async () => {
        attempts++;
        
        // Update progress message
        if (attempts % 4 === 0 && progressIndex < progressMessages.length) {
          setGenerationProgress(progressMessages[progressIndex]);
          progressIndex++;
        }

        try {
          const status = await callEccoAPI(`/social/briefs/${brief.id}`, 'GET');

          if (status) {
            
            if (status.status === 'completed') {
              clearInterval(pollStatus);
              setIsGenerating(false);
              toast.success('Posts generated successfully!');
              
              // Clear form
              setTopic('');
              setTargetAudience('');
              setContentAngle('');
              setKeyMessage('');
              setCallToAction('');
              
              onBriefGenerated();
            } else if (status.status === 'failed') {
              clearInterval(pollStatus);
              setIsGenerating(false);
              toast.error('Generation failed. Please try again.');
            }
          }

          if (attempts >= maxAttempts) {
            clearInterval(pollStatus);
            setIsGenerating(false);
            toast.error('Generation is taking longer than expected. Please check the Recent Briefs table.');
          }
        } catch (error) {
          console.error('Polling error:', error);
        }
      }, 3000);

    } catch (error: any) {
      setIsGenerating(false);
      toast.error(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div id="quick-generate-form" className="bg-white rounded-2xl p-6 shadow-sm relative">
      <h2 className="text-[#000000] mb-6" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
        Quick Generate
      </h2>

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center z-10">
          <Loader2 className="h-16 w-16 text-[#2990C6] animate-spin mb-4" />
          <p className="text-[#000000] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
            Generating your posts...
          </p>
          <p className="text-[#6B7280] text-sm mb-4" style={{ fontFamily: 'Open Sans' }}>
            This takes 30-60 seconds
          </p>
          <p className="text-[#2990C6]" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
            {generationProgress}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {/* Topic Input */}
        <div>
          <label className="block text-[#374151] mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
            What's your post about? <span className="text-[#e84e1c]">*</span>
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Benefits of AI in modern marketing"
            maxLength={100}
            className={`w-full px-3 py-2 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#2990C6] ${
              errors.topic ? 'border-[#e84e1c]' : 'border-gray-300'
            }`}
            style={{ fontFamily: 'Open Sans' }}
          />
          <div className="flex items-center justify-between mt-1">
            {errors.topic && (
              <p className="text-[#e84e1c] text-xs" style={{ fontFamily: 'Open Sans' }}>
                {errors.topic}
              </p>
            )}
            <p className={`text-xs ml-auto ${errors.topic ? 'text-[#e84e1c]' : 'text-[#6B7280]'}`} style={{ fontFamily: 'Open Sans' }}>
              {topic.length}/100
            </p>
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-[#374151] mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
            Who are you talking to?
          </label>
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="e.g., Small business owners, Marketing directors"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#2990C6]"
            style={{ fontFamily: 'Open Sans' }}
          />
        </div>

        {/* Content Angle */}
        <div>
          <label className="block text-[#374151] mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
            What's your unique angle?
          </label>
          <input
            type="text"
            value={contentAngle}
            onChange={(e) => setContentAngle(e.target.value)}
            placeholder="e.g., Data-driven approach, Personal story"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#2990C6]"
            style={{ fontFamily: 'Open Sans' }}
          />
        </div>

        {/* Key Message */}
        <div>
          <label className="block text-[#374151] mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
            Main takeaway?
          </label>
          <textarea
            value={keyMessage}
            onChange={(e) => setKeyMessage(e.target.value)}
            placeholder="e.g., AI can save 10 hours per week"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#2990C6] resize-none"
            style={{ fontFamily: 'Open Sans' }}
          />
        </div>

        {/* Call to Action */}
        <div>
          <label className="block text-[#374151] mb-2" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
            What should readers do?
          </label>
          <input
            type="text"
            value={callToAction}
            onChange={(e) => setCallToAction(e.target.value)}
            placeholder="e.g., Learn more, Download guide, Book a demo"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#2990C6]"
            style={{ fontFamily: 'Open Sans' }}
          />
        </div>

        {/* Platform Selection */}
        <div>
          <label className="block text-[#374151] mb-3" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
            Select platforms <span className="text-[#e84e1c]">*</span>
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div
              onClick={() => setPlatforms(prev => ({ ...prev, linkedin: !prev.linkedin }))}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                platforms.linkedin ? 'border-[#0077B5] bg-[#0077B5]/5' : 'border-gray-300'
              }`}
            >
              <Linkedin className={`h-8 w-8 mb-2 ${platforms.linkedin ? 'text-[#0077B5]' : 'text-gray-400'}`} />
              <span className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: platforms.linkedin ? 600 : 400 }}>
                LinkedIn
              </span>
              <Checkbox
                checked={platforms.linkedin}
                className="mt-2"
              />
            </div>

            <div
              onClick={() => setPlatforms(prev => ({ ...prev, facebook: !prev.facebook }))}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                platforms.facebook ? 'border-[#1877F2] bg-[#1877F2]/5' : 'border-gray-300'
              }`}
            >
              <Facebook className={`h-8 w-8 mb-2 ${platforms.facebook ? 'text-[#1877F2]' : 'text-gray-400'}`} />
              <span className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: platforms.facebook ? 600 : 400 }}>
                Facebook
              </span>
              <Checkbox
                checked={platforms.facebook}
                className="mt-2"
              />
            </div>

            <div
              onClick={() => setPlatforms(prev => ({ ...prev, instagram: !prev.instagram }))}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                platforms.instagram ? 'border-[#E4405F] bg-[#E4405F]/5' : 'border-gray-300'
              }`}
            >
              <Instagram className={`h-8 w-8 mb-2 ${platforms.instagram ? 'text-[#E4405F]' : 'text-gray-400'}`} />
              <span className="text-sm" style={{ fontFamily: 'Open Sans', fontWeight: platforms.instagram ? 600 : 400 }}>
                Instagram
              </span>
              <Checkbox
                checked={platforms.instagram}
                className="mt-2"
              />
            </div>
          </div>
          {errors.platforms && (
            <p className="text-[#e84e1c] text-xs mt-2" style={{ fontFamily: 'Open Sans' }}>
              {errors.platforms}
            </p>
          )}
        </div>

        {/* Media Attachments Section */}
        <div className="border-t border-gray-200 pt-4">
          <label className="block text-[#374151] mb-3" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
            Add Media (Optional)
          </label>
          
          {/* Media Buttons */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*,video/*';
                input.multiple = true;
                input.onchange = (e: any) => {
                  const files = Array.from(e.target.files);
                  toast.success(`${files.length} file(s) uploaded`);
                  // In production, would upload files here
                };
                input.click();
              }}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}
            >
              <Upload className="w-4 h-4" />
              Upload from Computer
            </button>

            <button
              type="button"
              onClick={() => setShowDrivePicker(true)}
              disabled={!driveConnectionId}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all hover:scale-102 ${
                driveConnectionId
                  ? 'border-[#2990C6] text-[#2990C6] hover:bg-[#F0F9FA]'
                  : 'border-gray-300 text-gray-400 cursor-not-allowed'
              }`}
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}
              title={!driveConnectionId ? 'Connect Google Drive in Settings to use this feature' : ''}
            >
              {/* Google Drive Logo */}
              <svg width="16" height="16" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
                <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
                <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
                <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
                <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
              </svg>
              Add from Drive
            </button>
          </div>

          {/* Attached Media Preview */}
          {attachedMedia.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {attachedMedia.map((media, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    {media.thumbnailUrl ? (
                      <img src={media.thumbnailUrl} alt={media.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setAttachedMedia(attachedMedia.filter((_, i) => i !== index))}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-gray-600 mt-1 truncate" style={{ fontFamily: 'Open Sans' }}>
                    {media.name}
                  </p>
                </div>
              ))}
            </div>
          )}
          
          {attachedMedia.length > 0 && (
            <p className="text-xs text-gray-500 mt-2" style={{ fontFamily: 'Open Sans' }}>
              {attachedMedia.length}/{10} media files
            </p>
          )}
        </div>

        {/* Image Generation Toggle */}
        <div className="flex items-start justify-between py-3 border-t border-gray-200">
          <div>
            <p className="text-[#374151]" style={{ fontFamily: 'Open Sans', fontWeight: 500 }}>
              Generate AI images
            </p>
            <p className="text-xs text-[#6B7280] mt-1" style={{ fontFamily: 'Open Sans' }}>
              AI will create platform-optimized images
            </p>
          </div>
          <Switch
            checked={generateImages}
            onCheckedChange={setGenerateImages}
            className="data-[state=checked]:bg-[#02a4bf]"
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button
            onClick={handleSubmit}
            disabled={isGenerating}
            className="w-full bg-[#02a4bf] hover:bg-[#028a9f] text-white py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ fontFamily: 'Poppins', fontWeight: 500 }}
          >
            Generate Posts
          </button>
          <button
            onClick={onLoadFromDiscovery}
            disabled={isGenerating}
            className="w-full bg-white hover:bg-[#02a4bf]/5 text-[#02a4bf] border-2 border-[#02a4bf] py-2.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'Poppins', fontWeight: 500 }}
          >
            Load from Discovery
          </button>
        </div>
      </div>

      {/* Google Drive Picker Modal */}
      <GoogleDrivePickerModal
        isOpen={showDrivePicker}
        onClose={() => setShowDrivePicker(false)}
        onInsert={(files) => {
          setAttachedMedia([...attachedMedia, ...files].slice(0, 10));
        }}
        connectionId={driveConnectionId}
        connectedEmail={driveConnectedEmail}
        tenantId={tenantId}
        jwtToken={jwtToken}
        maxSelections={10 - attachedMedia.length}
        acceptedTypes={['image', 'video']}
      />
    </div>
  );
}