import type { Metadata } from 'next';
import { EventThemeProvider } from '@/components/EventThemeProvider';
import { events } from '@/lib/eventConfig';

export const metadata: Metadata = {
  title: 'Color Me Booth | Unique Debut Entertainment Manila',
  description: 'Make your debut unforgettable with creative guest entertainment. Transform debut moments into beautiful keepsake coloring pages. Perfect for 18th birthdays.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <EventThemeProvider event="debuts">
      {children}
    </EventThemeProvider>
  );
}
