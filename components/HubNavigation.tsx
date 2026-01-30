'use client';

import { useState, useEffect } from 'react';
import { Palette, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function HubNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // Event types for menu
  const eventTypes = [
    { id: 'kiddie-party', name: 'Kiddie Parties', icon: '🎂' },
    { id: 'weddings', name: 'Weddings', icon: '💒' },
    { id: 'debuts', name: 'Debuts', icon: '🌹' },
    { id: 'corporate-event', name: 'Corporate Events', icon: '🏢' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 bounce-hover">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-xl wiggle-hover">
            <Palette className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight leading-none">
              <span className="rainbow-text">COLORING</span>
            </span>
            <span className="text-lg font-bold tracking-widest text-gray-900 uppercase leading-none mt-0.5 logo-secondary">
              PHOTOBOOTH
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {eventTypes.map((event) => (
            <Link
              key={event.id}
              href={`/${event.id}`}
              className="font-semibold text-sm uppercase tracking-widest text-gray-800 hover:text-indigo-600 transition bounce-hover inline-flex items-center gap-2"
            >
              <span>{event.icon}</span>
              {event.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-6 shadow-lg">
          <div className="flex flex-col gap-4">
            {eventTypes.map((event) => (
              <Link
                key={event.id}
                href={`/${event.id}`}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-lg">{event.icon}</span>
                <span>{event.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
