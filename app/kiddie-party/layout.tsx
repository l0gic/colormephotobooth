import type { Metadata } from 'next';
import { EventThemeProvider } from '@/components/EventThemeProvider';
import { events } from '@/lib/eventConfig';

export const metadata: Metadata = {
  title: 'Color Me Booth | Premium Photo Booth for Kids Parties in Manila',
  description: "Manila's first roamer coloring booth for kids birthday parties. Transform party moments into custom coloring pages. The ultimate party favor experience.",
  openGraph: {
    images: [
      {
        url: 'https://ph.colormephotobooth.com/imgs/og-image.v00002.png',
        width: 1200,
        height: 630,
        alt: 'Color Me Booth - Premium Photo Booth for Kids Parties in Manila',
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
    <EventThemeProvider event="kiddie-party">
      {children}
    </EventThemeProvider>
  );
}
