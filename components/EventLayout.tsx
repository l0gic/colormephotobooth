'use client';

import { ReactNode } from 'react';
import { getEventConfig, EventId } from '@/lib/eventConfig';

interface EventLayoutProps {
  event: EventId;
  children: ReactNode;
}

export function EventLayout({ event, children }: EventLayoutProps) {
  const config = getEventConfig(event);

  if (!config) {
    return <>{children}</>;
  }

  // Apply CSS variables for dynamic theming
  const themeStyles = `
    :root {
      --event-primary: ${config.colors.primary};
      --event-secondary: ${config.colors.secondary};
      --event-accent: ${config.colors.accent};
      --event-background: ${config.colors.background};
      --event-gradient: ${config.colors.gradient};
    }
  `;

  return (
    <>
      <style jsx global>{themeStyles}</style>
      <div className="min-h-screen" style={{ backgroundColor: config.colors.background }}>
        {children}
      </div>
    </>
  );
}
