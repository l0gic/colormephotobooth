import type { Metadata } from 'next';
import { EventThemeProvider } from '@/components/EventThemeProvider';
import { events } from '@/lib/eventConfig';

export const metadata: Metadata = {
  title: 'Color Me Booth | Corporate Event Entertainment & Brand Activation Manila',
  description: 'Professional corporate event entertainment with full branding options. Team building, brand activation, and premium corporate giveaways in the Philippines.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <EventThemeProvider event="corporate">
      {children}
    </EventThemeProvider>
  );
}
