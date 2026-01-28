'use client';

import { Instagram, Facebook } from 'lucide-react';

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/colorme.photobooth/',
    icon: Instagram,
    hoverBg: 'hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-500',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/coloringbookbooth',
    icon: Facebook,
    hoverBg: 'hover:bg-blue-600',
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-white pt-20 pb-10 relative overflow-hidden border-t border-gray-200">
      {/* Footer decorations */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      <div className="absolute top-10 right-10 text-6xl opacity-5">🎨</div>
      <div className="absolute bottom-10 left-10 text-6xl opacity-5">📸</div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 mb-20">
          <div>
            <h2 className="text-4xl font-bold mb-6 uppercase tracking-tighter leading-none text-gray-900">
              Let&apos;s Color <br /><span className="gradient-text">Your Event.</span>
            </h2>
            <p className="text-gray-700 mb-8 font-medium">
              We are currently accepting bookings for Q4 2026 and early 2027. Secure your date early to avoid missing out on Manila&apos;s most viral booth.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-white rounded-xl shadow-md border-2 border-gray-200 flex items-center justify-center hover:text-white hover:border-transparent transition-all bounce-hover ${social.hoverBg}`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact form is rendered separately in the page */}
        </div>

        <div className="border-t border-gray-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 uppercase tracking-widest">
          <p>&copy; 2026 Color Me Booth Manila. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-indigo-600 transition font-medium">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition font-medium">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
