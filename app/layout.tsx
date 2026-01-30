import type { Metadata } from "next";
import { Unbounded, Outfit } from "next/font/google";
import "./globals.css";
import ColorMeChatWidget from "@/components/ColorMeChatWidget";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "Color Me Booth | Premium Photo Booth Rental Manila",
  description: "Manila's first roamer coloring booth. Transform your child's favorite party moments into custom-made coloring pages on the spot.",
  openGraph: {
    images: [
      {
        url: 'https://ph.colormephotobooth.com/imgs/og-image.v00002.png',
        width: 1200,
        height: 630,
        alt: 'Color Me Booth - Premium Photo Booth Rental Manila',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://ph.colormephotobooth.com/imgs/og-image.v00002.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${unbounded.variable} ${outfit.variable} font-outfit antialiased bg-white text-gray-900`}
      >
        <ColorMeChatWidget />
        {children}
      </body>
    </html>
  );
}
