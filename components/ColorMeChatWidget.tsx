'use client';

import { useEffect, useState, useTransition } from 'react';

// CSS import is safe here because this is a client component
// Next.js will handle it correctly during SSR/CSR
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

    // Inject ColorMe Booth themed CSS variables immediately
    const styleId = 'colorme-chat-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        :root {
          /* ColorMe Booth Brand Colors */
          --chat--color--primary: #6366f1;
          --chat--color--primary-shade-50: #5855d9;
          --chat--color--primary--shade-100: #4f46e5;
          --chat--color--secondary: #a855f7;
          --chat--color-secondary-shade-50: #9333ea;
          --chat--color--secondary-shade-100: #7c3aed;

          /* Light Colors - Matching pastel theme */
          --chat--color-white: #ffffff;
          --chat--color-light: #F8F9FF;
          --chat--color-light-shade-50: #e0e7ff;
          --chat--color-light-shade-100: #c7d2fe;
          --chat--color-medium: #a5b4fc;

          /* Dark Colors */
          --chat--color-dark: #171717;
          --chat--color-disabled: #d2d4d9;
          --chat--color-typing: #404040;

          /* Base Layout - Playful spacing */
          --chat--spacing: 1.25rem;
          --chat--border-radius: 1.5rem;
          --chat--transition-duration: 0.3s;
          --chat--font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

          /* Window Dimensions */
          --chat--window--width: 420px;
          --chat--window--height: 650px;
          --chat--window--bottom: var(--chat--spacing);
          --chat--window--right: var(--chat--spacing);
          --chat--window--z-index: 9999;
          --chat--window--border: 2px solid rgba(99, 102, 241, 0.2);
          --chat--window--border-radius: 2rem;
          --chat--window--margin-bottom: var(--chat--spacing);
          --chat--window--box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);

          /* Header Styles - Gradient background */
          --chat--header-height: auto;
          --chat--header--padding: 1.5rem;
          --chat--header--background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
          --chat--header--color: #ffffff;
          --chat--header--border-top: none;
          --chat--header--border-bottom: none;
          --chat--header--border-left: none;
          --chat--header--border-right: none;
          --chat--heading--font-size: 1.5rem;
          --chat--heading--font-family: 'Unbounded', cursive;
          --chat--subtitle--font-size: 0.9rem;
          --chat--subtitle--line-height: 1.6;
          --chat--subtitle--opacity: 0.95;

          /* Message Styles */
          --chat--message--font-size: 1rem;
          --chat--message--padding: 1rem 1.25rem;
          --chat--message--border-radius: 1.25rem;
          --chat--message-line-height: 1.6;
          --chat--message--margin-bottom: 1rem;
          --chat--message--bot--background: #ffffff;
          --chat--message--bot--color: #171717;
          --chat--message--bot--border: 2px solid #e0e7ff;
          --chat--message--user--background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          --chat--message--user--color: #ffffff;
          --chat--message--user--border: none;
          --chat--message--pre--background: rgba(99, 102, 241, 0.08);
          --chat--messages-list--padding: 1.25rem;

          /* Toggle Button - Playful circular design */
          --chat--toggle--size: 72px;
          --chat--toggle--width: var(--chat--toggle--size);
          --chat--toggle--height: var(--chat--toggle--size);
          --chat--toggle--border-radius: 50%;
          --chat--toggle--background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          --chat--toggle--hover--background: linear-gradient(135deg, #5855d9 0%, #9333ea 100%);
          --chat--toggle--active--background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          --chat--toggle--color: #ffffff;
          --chat--toggle--box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
          --chat--toggle--hover--box-shadow: 0 15px 40px rgba(99, 102, 241, 0.5);

          /* Input Area */
          --chat--textarea--height: 56px;
          --chat--textarea--max-height: 30rem;
          --chat--input--font-size: 1rem;
          --chat--input--border: 2px solid #e0e7ff;
          --chat--input--border-radius: 1.25rem;
          --chat--input--padding: 1rem 1.25rem;
          --chat--input--background: #ffffff;
          --chat--input--text-color: #171717;
          --chat--input--line-height: 1.5;
          --chat--input--placeholder--font-size: 0.95rem;
          --chat--input--placeholder--color: #a5b4fc;
          --chat--input--border-active: 2px solid #6366f1;
          --chat--input--focus--box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
          --chat--input--left--panel--width: 2.5rem;

          /* Button Styles - Playful bounce effect */
          --chat--button--padding: 0.875rem 1.5rem;
          --chat--button--border-radius: 1rem;
          --chat--button--font-size: 1rem;
          --chat--button--line-height: 1;
          --chat--button--font-family: 'Outfit', sans-serif;
          --chat--button--font-weight: 600;
          --chat--button--color--primary: #ffffff;
          --chat--button--background--primary: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          --chat--button--border--primary: none;
          --chat--button--color--primary--hover: #ffffff;
          --chat--button--background--primary--hover: linear-gradient(135deg, #5855d9 0%, #9333ea 100%);
          --chat--button--border--primary--hover: none;
          --chat--button--box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          --chat--button--hover--box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
          --chat--button--color--primary--disabled: #ffffff;
          --chat--button--background--primary--disabled: #a5b4fc;
          --chat--button--border--primary--disabled: none;
          --chat--button--color--secondary: #ffffff;
          --chat--button--background--secondary: #6366f1;
          --chat--button--border--secondary: none;
          --chat--button--color--secondary--hover: #ffffff;
          --chat--button--background--secondary--hover: #5855d9;
          --chat--button--border--secondary--hover: none;
          --chat--button--color--secondary--disabled: #ffffff;
          --chat--button--background--secondary--disabled: #a5b4fc;
          --chat--button--border--secondary--disabled: none;
          --chat--close--button--color-hover: #6366f1;

          /* Send and File Buttons */
          --chat--input--send--button--background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          --chat--input--send--button--color: #ffffff;
          --chat--input--send--button--background-hover: linear-gradient(135deg, #5855d9 0%, #9333ea 100%);
          --chat--input--send--button--color-hover: #ffffff;
          --chat--input--send--button--border-radius: 1rem;
          --chat--input--send--button--padding: 0.75rem;
          --chat--input--file--button--background: #ffffff;
          --chat--input--file--button--color: #6366f1;
          --chat--input--file--button--background-hover: #F8F9FF;
          --chat--input--file--button--color-hover: #4f46e5;
          --chat--files-spacing: 0.5rem;

          /* Body and Footer */
          --chat--body--background: linear-gradient(180deg, #F8F9FF 0%, #fef3c7 50%, #fce7f3 100%);
          --chat--footer--background: transparent;
          --chat--footer--color: #6366f1;
          --chat--footer--font-size: 0.85rem;
          --chat--footer--padding: 1rem;

          /* Typing Indicator */
          --chat--typing-indicator--dot-color: #6366f1;
          --chat--typing-indicator--dot-size: 8px;

          /* Scrollbar Styling */
          --chat--scrollbar--width: 8px;
          --chat--scrollbar--track-background: transparent;
          --chat--scrollbar--thumb-background: rgba(99, 102, 241, 0.3);
          --chat--scrollbar--thumb-hover-background: rgba(99, 102, 241, 0.5);
        }

        /* Custom scrollbar for chat messages */
        #n8n-chat *::-webkit-scrollbar {
          width: var(--chat--scrollbar--width, 8px);
        }

        #n8n-chat *::-webkit-scrollbar-track {
          background: var(--chat--scrollbar--track-background, transparent);
        }

        #n8n-chat *::-webkit-scrollbar-thumb {
          background: var(--chat--scrollbar--thumb-background, rgba(99, 102, 241, 0.3));
          border-radius: 4px;
        }

        #n8n-chat *::-webkit-scrollbar-thumb:hover {
          background: var(--chat--scrollbar--thumb-hover-background, rgba(99, 102, 241, 0.5));
        }
      `;
      document.head.appendChild(style);
    }

    const loadChat = async () => {
      try {
        console.log('[ColorMeChat] Starting chat widget initialization...');

        // Dynamically import the chat module (works in both dev and production)
        const { createChat } = await import('@n8n/chat');
        console.log('[ColorMeChat] Chat module imported successfully');

        // Check if webhook URL is accessible
        const webhookUrl = 'https://n8n.chatgenius24x7.com/webhook/0f12b47f-019a-4b8b-a208-98404ecc35c4/chat';
        console.log('[ColorMeChat] Webhook URL:', webhookUrl);

        // Initialize chat with error handling and listeners
        const chatInstance = createChat({
          webhookUrl: webhookUrl,
          mode: 'window',
          showWelcomeScreen: false,
          loadPreviousSession: false,
          initialMessages: [
            'Welcome to ColorMe Booth! 🎨',
            "I'm here to help you plan your perfect photo booth experience. Ask me about our packages, features, pricing, or availability!"
          ],
          i18n: {
            en: {
              title: 'ColorMe Booth Assistant',
              subtitle: 'Your expert guide to photo booth experiences',
              footer: 'Powered by ColorMe Booth',
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
