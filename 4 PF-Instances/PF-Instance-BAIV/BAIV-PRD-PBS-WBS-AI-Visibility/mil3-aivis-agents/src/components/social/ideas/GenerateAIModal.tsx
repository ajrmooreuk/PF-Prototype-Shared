import { useState } from 'react';
import { X, Sparkles, Bot } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Slider } from '../../ui/slider';
import { Checkbox } from '../../ui/checkbox';
import { Switch } from '../../ui/switch';

interface GenerateAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (data: any) => Promise<void>;
}

export function GenerateAIModal({ isOpen, onClose, onGenerate }: GenerateAIModalProps) {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState([10]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [useICP, setUseICP] = useState(true);
  const [useDiscovery, setUseDiscovery] = useState(true);
  const [customContext, setCustomContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const themes = [
    { id: 'educate', icon: '📚', label: 'Educate', color: '#3b82f6' },
    { id: 'engage', icon: '💬', label: 'Engage', color: '#10b981' },
    { id: 'entertain', icon: '🎉', label: 'Entertain', color: '#8b5cf6' },
    { id: 'empower', icon: '💪', label: 'Empower', color: '#f59e0b' },
  ];

  const platforms = [
    { id: 'linkedin', icon: '💼', label: 'LinkedIn' },
    { id: 'twitter', icon: '🐦', label: 'Twitter' },
    { id: 'facebook', icon: '📘', label: 'Facebook' },
    { id: 'instagram', icon: '📷', label: 'Instagram' },
  ];

  const toggleTheme = (themeId: string) => {
    if (selectedThemes.includes(themeId)) {
      setSelectedThemes(selectedThemes.filter(t => t !== themeId));
    } else {
      setSelectedThemes([...selectedThemes, themeId]);
    }
  };

  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    
    const messages = [
      'Analyzing your ICP profile...',
      'Gathering discovery insights...',
      'Generating creative ideas...',
      'Finalizing content...',
    ];

    let messageIndex = 0;
    setLoadingMessage(messages[0]);
    
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
    }, 3000);

    try {
      await onGenerate({
        topic,
        count: count[0],
        category: selectedThemes.length === 1 ? selectedThemes[0] : undefined,
        platforms: selectedPlatforms.length > 0 ? selectedPlatforms : undefined,
        use_icp_context: useICP,
        use_discovery_insights: useDiscovery,
        custom_context: customContext.trim() || undefined,
      });

      handleClose();
    } catch (error) {
      console.error('Failed to generate:', error);
    } finally {
      clearInterval(messageInterval);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTopic('');
    setCount([10]);
    setSelectedThemes([]);
    setSelectedPlatforms([]);
    setCustomContext('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[700px] p-0 gap-0">
        <DialogTitle className="sr-only">Generate Ideas with AI</DialogTitle>
        <DialogDescription className="sr-only">
          Create social media content ideas using AI powered by Claude with your ICP and discovery insights
        </DialogDescription>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#e6f7f9] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#02a4bf]" />
            </div>
            <h2 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '22px' }}>
              Generate Ideas with AI
            </h2>
            <button onClick={handleClose} className="ml-auto text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            Powered by Claude with your ICP and discovery insights
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-[#02a4bf] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#6B7280]" style={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
              {loadingMessage}
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
            {/* Topic */}
            <div>
              <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                What topic should we explore? <span className="text-orange-500">*</span>
              </Label>
              <Textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., B2B SaaS marketing strategies for early-stage startups"
                rows={3}
                className="mt-2"
                maxLength={500}
              />
              <div className="flex justify-between mt-1">
                <p className="text-gray-500 text-xs">Be specific for better results</p>
                <p className="text-gray-500 text-xs">{topic.length}/500</p>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                How many ideas? ({count[0]})
              </Label>
              <Slider
                value={count}
                onValueChange={setCount}
                min={5}
                max={30}
                step={5}
                className="mt-3"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
                <span>25</span>
                <span>30</span>
              </div>
            </div>

            {/* Themes */}
            <div>
              <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                Focus on specific themes (optional)
              </Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    onClick={() => toggleTheme(theme.id)}
                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedThemes.includes(theme.id)
                        ? 'border-[#02a4bf] bg-[#f0f9fb]'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Checkbox
                      checked={selectedThemes.includes(theme.id)}
                      onCheckedChange={() => toggleTheme(theme.id)}
                    />
                    <span className="text-lg">{theme.icon}</span>
                    <span style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>{theme.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Platforms */}
            <div>
              <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                Target platforms (optional)
              </Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedPlatforms.includes(platform.id)
                        ? 'border-[#02a4bf] bg-[#f0f9fb]'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Checkbox
                      checked={selectedPlatforms.includes(platform.id)}
                      onCheckedChange={() => togglePlatform(platform.id)}
                    />
                    <span className="text-lg">{platform.icon}</span>
                    <span style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>{platform.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Context Toggles */}
            <div>
              <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                AI Context Sources
              </Label>
              <div className="space-y-3 mt-2">
                <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Switch checked={useICP} onCheckedChange={setUseICP} />
                      <span style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                        Use ICP Profile
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Include target audience and pain points from your ICP
                    </p>
                  </div>
                </div>

                <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Switch checked={useDiscovery} onCheckedChange={setUseDiscovery} />
                      <span style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                        Use Discovery Insights
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Include trending topics from Reddit, YouTube, Bluesky
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Context */}
            <div>
              <Label style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 500 }}>
                Additional context or trending topics
              </Label>
              <Textarea
                value={customContext}
                onChange={(e) => setCustomContext(e.target.value)}
                placeholder="e.g., Focus on limited budgets, mention recent industry trends..."
                rows={3}
                className="mt-2"
                maxLength={1000}
              />
              <p className="text-gray-500 text-xs mt-1 text-right">{customContext.length}/1000</p>
            </div>

            {/* Preview */}
            <div className="bg-[#e6f7f9] rounded-lg p-4 flex items-start gap-3">
              <Bot className="w-5 h-5 text-[#02a4bf] flex-shrink-0 mt-0.5" />
              <p className="text-[#02a4bf]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                AI will generate {count[0]} ideas about "{topic || '[topic]'}" 
                {useICP && ' using your ICP profile'}
                {useICP && useDiscovery && ' and'}
                {useDiscovery && ' discovery insights'}
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        {!loading && (
          <div className="p-6 bg-[#02a4bf] flex items-center justify-between">
            <p className="text-white text-sm">Estimated time: ~30-60 seconds</p>
            <div className="flex gap-2">
              <Button
                onClick={handleClose}
                className="bg-white text-[#231f20] hover:bg-gray-100"
                style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={!topic.trim()}
                className="bg-[#02a4bf] hover:bg-[#028a9f] text-white border-2 border-white"
                style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Ideas
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
