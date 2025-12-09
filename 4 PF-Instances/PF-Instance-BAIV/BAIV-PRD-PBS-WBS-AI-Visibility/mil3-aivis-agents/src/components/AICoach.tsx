import { useState, useRef, useEffect } from 'react';
import { X, Minimize2, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import magnifyGuyLogo from 'figma:asset/0ce0ea9e61323cab775fc4badd5a1b590d0a9fb7.png';
import { callEccoAPI } from '../lib/eccoAPI';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AICoachProps {
  jwtToken: string;
  tenantId: string;
}

export function AICoach({ jwtToken, tenantId }: AICoachProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your BAIV AI Coach. I'm here to help you maximize your AI visibility. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getPageContext = () => {
    const path = window.location.pathname;
    const featureMap: Record<string, string> = {
      '/discovery-audit': 'discovery_audit',
      '/content-studio': 'content_studio',
      '/faq-generator': 'faq_generator',
      '/meta-generator': 'meta_generator',
      '/schema-generator': 'schema_generator',
      '/link-suggester': 'link_suggester',
      '/image-generator': 'image_generator',
      '/social-media': 'social_media',
      '/leads-dashboard': 'leads_dashboard',
      '/podcast-overview': 'podcast_system',
      '/pmf-overview': 'pmf',
      '/settings': 'settings'
    };

    return {
      url: window.location.href,
      title: document.title,
      path: path,
      metadata: {
        feature: featureMap[path] || 'dashboard'
      }
    };
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      // Prepare messages for API (last 10 messages)
      const conversationHistory = [...messages, userMessage]
        .slice(-10)
        .map(({ role, content }) => ({ role, content }));

      const data = await callEccoAPI('/api/ai-coach/chat', 'POST', {
        messages: conversationHistory,
        page_context: getPageContext(),
        max_tokens: 4000,
        temperature: 0.7
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || data.message || 'I apologize, but I encountered an issue. Please try again.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('AI Coach error:', err);
      setError('Failed to get response. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed z-50 rounded-full bg-white shadow-lg overflow-hidden"
        style={{
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          border: '2px solid #00A7B5'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Coach"
      >
        <img 
          src={magnifyGuyLogo} 
          alt="BAIV AI Coach" 
          className="w-full h-full object-cover"
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 bg-white rounded-lg shadow-2xl flex flex-col"
            style={{
              bottom: '100px',
              right: '24px',
              width: 'min(400px, calc(100vw - 48px))',
              height: 'min(600px, calc(100vh - 150px))'
            }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-4 border-b border-gray-200"
              style={{ backgroundColor: '#00A7B5' }}
            >
              <div className="flex items-center gap-3">
                <img 
                  src={magnifyGuyLogo} 
                  alt="BAIV" 
                  className="w-8 h-8 rounded-full bg-white p-1"
                />
                <h3 
                  className="text-white"
                  style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px' }}
                >
                  BAIV AI Coach
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  aria-label="Minimize"
                >
                  <Minimize2 className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-[#FF5722] text-white'
                        : 'bg-[#00A7B5] text-white'
                    }`}
                  >
                    <p 
                      className="text-sm whitespace-pre-wrap"
                      style={{ fontFamily: 'Open Sans' }}
                    >
                      {message.content}
                    </p>
                    <p 
                      className="text-xs mt-1 opacity-70"
                      style={{ fontFamily: 'Open Sans' }}
                    >
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#00A7B5] text-white rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm" style={{ fontFamily: 'Open Sans' }}>
                        Typing...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="flex justify-center">
                  <div className="bg-red-100 text-red-700 rounded-lg p-3 text-sm max-w-[80%]">
                    <p style={{ fontFamily: 'Open Sans' }}>{error}</p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A7B5] focus:border-transparent disabled:opacity-50"
                  style={{ fontFamily: 'Open Sans' }}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="px-4 py-2 bg-[#00A7B5] text-white rounded-lg hover:bg-[#008A96] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}