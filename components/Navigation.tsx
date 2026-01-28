'use client';

import { useState, useEffect } from 'react';
import { Palette, ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEventConfig, useEventId } from '@/components/EventThemeProvider';

export default function Navigation() {
  const config = useEventConfig();
  const eventId = useEventId();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);

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

  // Event types for dropdown
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
        <Link href="/" className="flex items-center gap-2 bounce-hover">
          <div className={`w-10 h-10 bg-gradient-to-br ${config.colors.gradient} rounded-xl flex items-center justify-center text-white shadow-lg wiggle-hover`}>
            <Palette className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-gray-900">
            COLOR ME <span className="rainbow-text">BOOTH</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/* Events Dropdown */}
          <div className="relative">
            <button
              className="font-semibold text-sm uppercase tracking-widest text-gray-800 hover:text-indigo-600 transition flex items-center gap-1 bounce-hover"
              onClick={() => setEventsDropdownOpen(!eventsDropdownOpen)}
              onMouseEnter={() => setEventsDropdownOpen(true)}
            >
              Events
              <ChevronDown className={`w-4 h-4 transition-transform ${eventsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {eventsDropdownOpen && (
              <div
                className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[200px]"
                onMouseLeave={() => setEventsDropdownOpen(false)}
              >
                {eventTypes.map((event) => (
                  <Link
                    key={event.id}
                    href={`/${event.id}`}
                    className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition ${
                      eventId === event.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'
                    }`}
                    onClick={() => setEventsDropdownOpen(false)}
                  >
                    <span className="text-lg">{event.icon}</span>
                    <span className="font-medium text-sm">{event.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <a
            href="#how-it-works"
            onClick={(e) => smoothScroll(e, '#how-it-works')}
            className="font-semibold text-sm uppercase tracking-widest text-gray-800 hover:text-indigo-600 transition bounce-hover inline-block"
          >
            Process
          </a>
          <a
            href="#benefits"
            onClick={(e) => smoothScroll(e, '#benefits')}
            className="font-semibold text-sm uppercase tracking-widest text-gray-800 hover:text-indigo-600 transition bounce-hover inline-block"
          >
            Benefits
          </a>
          <a
            href="#pricing"
            onClick={(e) => smoothScroll(e, '#pricing')}
            className="font-semibold text-sm uppercase tracking-widest text-gray-800 hover:text-indigo-600 transition bounce-hover inline-block"
          >
            Pricing
          </a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => smoothScroll(e, '#contact')}
            className={`btn-playful bg-gradient-to-r ${config.colors.gradient} text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-indigo-300 inline-flex items-center gap-2`}
          >
            Book Now
          </a>
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
            <div className="border-b border-gray-100 pb-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Events</p>
              {eventTypes.map((event) => (
                <Link
                  key={event.id}
                  href={`/${event.id}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition ${
                    eventId === event.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-lg">{event.icon}</span>
                  <span className="font-medium">{event.name}</span>
                </Link>
              ))}
            </div>
            <a
              href="#how-it-works"
              onClick={(e) => smoothScroll(e, '#how-it-works')}
              className="font-semibold text-gray-800 hover:text-indigo-600 transition"
            >
              Process
            </a>
            <a
              href="#benefits"
              onClick={(e) => smoothScroll(e, '#benefits')}
              className="font-semibold text-gray-800 hover:text-indigo-600 transition"
            >
              Benefits
            </a>
            <a
              href="#pricing"
              onClick={(e) => smoothScroll(e, '#pricing')}
              className="font-semibold text-gray-800 hover:text-indigo-600 transition"
            >
              Pricing
            </a>
            <a
              href="#contact"
              onClick={(e) => smoothScroll(e, '#contact')}
              className={`btn-playful bg-gradient-to-r ${config.colors.gradient} text-white px-6 py-3 rounded-full font-bold text-center shadow-lg`}
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
