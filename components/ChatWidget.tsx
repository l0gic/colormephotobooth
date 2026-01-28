'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Minimize2, Maximize2, Send, Loader2, User, Bot } from 'lucide-react';
import { n8nClient, sendChatMessage, getChatSessionId, extractEventTypeFromPath, isChatbotConfigured } from '@/lib/n8nClient';
import type { ChatMessage, ChatWidgetState, LeadData } from '@/lib/chatTypes';

interface ChatWidgetProps {
  autoOpenDelay?: number; // milliseconds, 0 to disable
  position?: 'bottom-right' | 'bottom-left';
  eventType?: string;
}

export default function ChatWidget({
  autoOpenDelay = 30000, // 30 seconds
  position = 'bottom-right',
  eventType: propEventType,
}: ChatWidgetProps) {
  // State
  const [widgetState, setWidgetState] = useState<ChatWidgetState>('closed');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLeadCaptureMode, setIsLeadCaptureMode] = useState(false);
  const [leadFormData, setLeadFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
  });
  const [leadErrors, setLeadErrors] = useState<Record<string, string>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionIdRef = useRef<string>('');

  // Derived values
  const positionClasses = position === 'bottom-right'
    ? 'bottom-6 right-6'
    : 'bottom-6 left-6';

  const eventType = propEventType || extractEventTypeFromPath();

  // Initialize session
  useEffect(() => {
    if (!isInitialized && typeof window !== 'undefined') {
      sessionIdRef.current = getChatSessionId();
      setIsInitialized(true);

      // Auto-open after delay
      if (autoOpenDelay > 0 && isChatbotConfigured()) {
        const timer = setTimeout(() => {
          if (widgetState === 'closed') {
            setWidgetState('minimized');
          }
        }, autoOpenDelay);
        return () => clearTimeout(timer);
      }
    }
  }, [isInitialized, autoOpenDelay, widgetState]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Welcome message
  useEffect(() => {
    if (widgetState === 'open' && messages.length === 0 && isChatbotConfigured()) {
      const welcomeMessage: ChatMessage = {
        role: 'assistant',
        content: getWelcomeMessage(eventType),
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  }, [widgetState, messages.length, eventType]);

  // Focus input when opened
  useEffect(() => {
    if (widgetState === 'open' && !isLeadCaptureMode) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [widgetState, isLeadCaptureMode]);

  function getWelcomeMessage(evtType: string): string {
    const eventNames: Record<string, string> = {
      'kiddie-party': 'kiddie party',
      weddings: 'wedding',
      debuts: 'debut',
      'corporate-event': 'corporate event',
    };

    const eventName = eventNames[evtType] || 'event';

    return `Hi there! 👋 Welcome to ColorMe Booth! I'm here to help you plan an unforgettable ${eventName}. What would you like to know?`;
  }

  function handleToggleWidget() {
    if (widgetState === 'closed') {
      setWidgetState('open');
    } else if (widgetState === 'minimized') {
      setWidgetState('open');
    } else {
      setWidgetState('minimized');
    }
  }

  function handleCloseWidget() {
    setWidgetState('closed');
  }

  async function handleSendMessage() {
    const message = inputValue.trim();
    if (!message || isTyping) return;

    // Add user message
    const userMessage: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await sendChatMessage({
        session_id: sessionIdRef.current,
        message,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        event_type: eventType as any,
        conversation_history: messages,
      });

      // Add assistant response
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Check if we should capture lead
      if (response.should_capture_lead || response.lead_capture_prompt) {
        setIsLeadCaptureMode(true);
      }

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting right now. Please try again or fill out the contact form below!',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate
    const errors: Record<string, string> = {};
    if (!leadFormData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!leadFormData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadFormData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (Object.keys(errors).length > 0) {
      setLeadErrors(errors);
      return;
    }

    // Submit lead
    const leadData: LeadData = {
      source: 'chatbot',
      event_type: eventType as any,
      name: leadFormData.name,
      email: leadFormData.email,
      phone: leadFormData.phone || undefined,
      event_date: leadFormData.eventDate || undefined,
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: new Date().toISOString(),
    };

    try {
      // Using the webhook URL directly for lead capture
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_LEAD_WEBHOOK_URL
        || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData),
        });
      }

      // Add success message
      const successMessage: ChatMessage = {
        role: 'assistant',
        content: `Thank you ${leadFormData.name}! We've received your information and someone from our team will reach out within 24-48 hours. Is there anything else you'd like to know in the meantime?`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, successMessage]);
      setIsLeadCaptureMode(false);
      setLeadFormData({ name: '', email: '', phone: '', eventDate: '' });

    } catch (error) {
      console.error('Lead submission error:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, there was an error submitting your information. Please try again or use the contact form on the page.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isLeadCaptureMode) {
        handleLeadSubmit(e);
      } else {
        handleSendMessage();
      }
    }
  }

  function handleSuggestedQuestion(question: string) {
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 100);
  }

  // Suggested questions based on event type
  const suggestedQuestions = [
    'How much does it cost?',
    'What areas do you serve?',
    'How do I book?',
  ];

  // Don't render if chatbot is not configured
  if (isInitialized && !isChatbotConfigured()) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      {widgetState === 'closed' && (
        <button
          onClick={handleToggleWidget}
          className={`fixed ${positionClasses} z-50 w-16 h-16 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group`}
          aria-label="Open chat"
        >
          <MessageCircle className="w-7 h-7 group-hover:animate-pulse" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
        </button>
      )}

      {/* Minimized Header */}
      {widgetState === 'minimized' && (
        <div
          className={`fixed ${positionClasses} z-50 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden`}
        >
          <button
            onClick={handleToggleWidget}
            className="w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white px-4 py-3 flex items-center justify-between hover:opacity-90 transition-opacity cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="font-semibold">Chat with ColorMe Booth</span>
            </div>
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Full Chat Widget */}
      {widgetState === 'open' && (
        <div
          className={`fixed ${positionClasses} z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Chat with ColorMe Booth</p>
                <p className="text-xs opacity-80">Usually replies instantly</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setWidgetState('minimized')}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Minimize"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleCloseWidget}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white'
                        : 'bg-gradient-to-br from-pink-400 to-purple-400 text-white'
                    }`}
                  >
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-md'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-tl-md shadow-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-400 to-purple-400 text-white">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-4 py-3 bg-white border border-gray-200 rounded-2xl rounded-tl-md shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {!isLeadCaptureMode && messages.length <= 2 && widgetState === 'open' && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestedQuestion(q)}
                    className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lead Capture Form */}
          {isLeadCaptureMode ? (
            <div className="p-4 bg-white border-t border-gray-200 shrink-0">
              <p className="text-sm font-medium text-gray-900 mb-3">
                Leave your details and we'll get back to you!
              </p>
              <form onSubmit={handleLeadSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={leadFormData.name}
                  onChange={(e) => setLeadFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${
                    leadErrors.name ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={leadFormData.email}
                  onChange={(e) => setLeadFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${
                    leadErrors.email ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                <input
                  type="tel"
                  placeholder="Phone Number (optional)"
                  value={leadFormData.phone}
                  onChange={(e) => setLeadFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Event Date (optional)"
                  value={leadFormData.eventDate}
                  onChange={(e) => setLeadFormData((prev) => ({ ...prev, eventDate: e.target.value }))}
                  onFocus={(e) => (e.target.type = 'date')}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send My Details
                </button>
                <button
                  type="button"
                  onClick={() => setIsLeadCaptureMode(false)}
                  className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </form>
            </div>
          ) : (
            /* Input Area */
            <div className="p-4 bg-white border-t border-gray-200 shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isTyping}
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                  aria-label="Send message"
                >
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
