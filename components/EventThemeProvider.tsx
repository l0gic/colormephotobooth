'use client';

import { createContext, useContext, ReactNode } from 'react';
import { EventConfig, EventId, getEventConfig } from '@/lib/eventConfig';

interface EventThemeContextValue {
  event: EventId;
  config: EventConfig;
}

const EventThemeContext = createContext<EventThemeContextValue | undefined>(undefined);

interface EventThemeProviderProps {
  event: EventId;
  children: ReactNode;
}

export function EventThemeProvider({ event, children }: EventThemeProviderProps) {
  const config = getEventConfig(event);

  if (!config) {
    throw new Error(`Invalid event ID: ${event}`);
  }

  return (
    <EventThemeContext.Provider value={{ event, config }}>
      {children}
    </EventThemeContext.Provider>
  );
}

export function useEventTheme(): EventThemeContextValue {
  const context = useContext(EventThemeContext);
  if (!context) {
    throw new Error('useEventTheme must be used within EventThemeProvider');
  }
  return context;
}

// Hook to get just the config
export function useEventConfig(): EventConfig {
  const { config } = useEventTheme();
  return config;
}

// Hook to get just the event ID
export function useEventId(): EventId {
  const { event } = useEventTheme();
  return event;
}
