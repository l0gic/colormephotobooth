import type { Metadata } from 'next';
import { EventThemeProvider } from '@/components/EventThemeProvider';
import { events } from '@/lib/eventConfig';

export const metadata: Metadata = {
  title: 'Color Me Booth | Premium Photo Booth for Kids Parties in Manila',
  description: "Manila's first roamer coloring booth for kids birthday parties. Transform party moments into custom coloring pages. The ultimate party favor experience.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <EventThemeProvider event="kiddie-party">
      {children}
    </EventThemeProvider>
  );
}
