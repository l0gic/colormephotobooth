'use client';

import { useEffect, useState, useTransition } from 'react';
import '@n8n/chat/style.css';

export default function ColorMeChatWidget() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Prevent multiple initializations
    if (isLoaded) return;

    console.log('[ColorMeChat] Component mounted, initializing...');

    // Add global error handler for chat-related errors
    const handleError = (event: ErrorEvent) => {
      if (event.message && (
        event.message.includes('n8n') ||
        event.message.includes('chat') ||
        event.filename?.includes('n8n')
      )) {
        console.error('[ColorMeChat] Global error caught:', event.error);
        setIsError(true);
        event.preventDefault(); // Prevent error from propagating
      }
    };

    window.addEventListener('error', handleError);
    console.log('[ColorMeChat] Error handler registered');

    // Note: Chat widget CSS variables are now defined in globals.css
    // for reliable loading in production environments

    const loadChat = async () => {
      try {
        console.log('[ColorMeChat] Starting chat widget initialization...');

        // Dynamically import the chat module (works in both dev and production)
        const { createChat } = await import('@n8n/chat');
        console.log('[ColorMeChat] Chat module imported successfully');

        // Check if webhook URL is accessible
        const webhookUrl = 'https://n8n.chatgenius24x7.com/webhook/4091fa09-fb9a-4039-9411-7104d213f601/chat';
        console.log('[ColorMeChat] Webhook URL:', webhookUrl);

        // Initialize chat with error handling and listeners
        const chatInstance = createChat({
          webhookUrl: webhookUrl,
          mode: 'window',
          showWelcomeScreen: false,
          loadPreviousSession: false,
          initialMessages: [
            'Welcome to Coloring Photobooth! 🎨',
            "I'm here to help you plan your perfect photo booth experience. Ask me about our packages, features, pricing, or availability!"
          ],
          i18n: {
            en: {
              title: 'Coloring Photobooth Assistant',
              subtitle: 'Your expert guide to photo booth experiences',
              footer: 'Powered by Coloring Photobooth',
              getStarted: 'Start New Chat',
              inputPlaceholder: 'Ask about packages, pricing, availability...',
              closeButtonTooltip: 'Close chat',
            },
          },
        });

        console.log('[ColorMeChat] Chat instance created:', chatInstance);

        startTransition(() => {
          setIsLoaded(true);
          console.log('[ColorMeChat] Chat widget loaded successfully');
        });
      } catch (error) {
        console.error('[ColorMeChat] Failed to load chat widget:', error);
        setIsError(true);
        // Don't set isLoaded, allowing retries or showing fallback UI
      }
    };

    loadChat();

    // Cleanup function
    return () => {
      window.removeEventListener('error', handleError);
      console.log('[ColorMeChat] Cleanup completed');
    };
  }, [isLoaded]);

  // Always render the container - even if there's an error, keep the component mounted
  return (
    <>
      <div id="n8n-chat" />
      {isError && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9998,
            padding: '12px 16px',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            color: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '14px',
            cursor: 'pointer',
          }}
          onClick={() => {
            setIsError(false);
            window.location.reload();
          }}
        >
          Chat unavailable. Click to retry.
        </div>
      )}
    </>
  );
}
