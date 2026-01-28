import type { Metadata } from 'next';
import { EventThemeProvider } from '@/components/EventThemeProvider';
import { events } from '@/lib/eventConfig';

export const metadata: Metadata = {
  title: 'Color Me Booth | Elegant Wedding Entertainment Manila',
  description: 'Unique wedding entertainment and guest favors. Transform wedding moments into elegant keepsake coloring pages. Perfect for Philippine weddings.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <EventThemeProvider event="weddings">
      {children}
    </EventThemeProvider>
  );
}
