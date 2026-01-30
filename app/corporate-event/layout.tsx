import type { Metadata } from 'next';
import { EventThemeProvider } from '@/components/EventThemeProvider';
import { events } from '@/lib/eventConfig';

export const metadata: Metadata = {
  title: 'Color Me Booth | Corporate Event Entertainment & Brand Activation Manila',
  description: 'Professional corporate event entertainment with full branding options. Team building, brand activation, and premium corporate giveaways in the Philippines.',
  openGraph: {
    images: [
      {
        url: 'https://ph.colormephotobooth.com/imgs/og-image.v00002.png',
        width: 1200,
        height: 630,
        alt: 'Color Me Booth - Corporate Event Entertainment & Brand Activation Manila',
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
    <EventThemeProvider event="corporate-event">
      {children}
    </EventThemeProvider>
  );
}
