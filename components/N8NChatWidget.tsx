'use client';

import { useEffect, useState } from 'react';
import '@n8n/chat/style.css';

export default function N8NChatWidget() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) return;

    const loadChat = async () => {
      try {
        const { createChat } = await import('@n8n/chat');

        createChat({
          webhookUrl: 'https://n8n.chatgenius24x7.com/webhook/0f12b47f-019a-4b8b-a208-98404ecc35c4/chat',
          mode: 'window',
          showWelcomeScreen: false,
          loadPreviousSession: false, // Disable session loading to avoid CORS issues during development
          initialMessages: [
            'Hi there! 👋',
            "Welcome to ColorMe! How can I help you today?"
          ],
          i18n: {
            en: {
              title: 'ColorMe Assistant',
              subtitle: 'Ask me anything about our services!',
              footer: '',
              getStarted: 'New Conversation',
              inputPlaceholder: 'Type your question...',
            },
          },
        });

        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to load N8N chat widget:', error);
      }
    };

    loadChat();
  }, [isLoaded]);

  // Return a div that serves as the target for the chat widget
  // The widget will be embedded into this element
  return <div id="n8n-chat" />;
}
