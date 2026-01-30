import type { Metadata } from 'next';
import { EventThemeProvider } from '@/components/EventThemeProvider';
import { events } from '@/lib/eventConfig';

export const metadata: Metadata = {
  title: 'Color Me Booth | Unique Debut Entertainment Manila',
  description: 'Make your debut unforgettable with creative guest entertainment. Transform debut moments into beautiful keepsake coloring pages. Perfect for 18th birthdays.',
  openGraph: {
    images: [
      {
        url: 'https://ph.colormephotobooth.com/imgs/og-image.v00002.png',
        width: 1200,
        height: 630,
        alt: 'Color Me Booth - Unique Debut Entertainment Manila',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://ph.colormephotobooth.com/imgs/og-image.v00002.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <EventThemeProvider event="debuts">
      {children}
    </EventThemeProvider>
  );
}
