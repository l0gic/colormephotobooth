import type { Metadata } from "next";
import { Unbounded, Outfit } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
