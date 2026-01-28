import HubNavigation from '@/components/HubNavigation';
import { getAllEvents } from '@/lib/eventConfig';
import { Sparkles, ArrowRight, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import ChatWidget from '@/components/ChatWidget';
import Confetti from '@/components/Confetti';

export default function Home() {
  const events = getAllEvents();

  const eventCardData = [
    {
      eventId: 'kiddie-party' as const,
      title: 'Kiddie Parties',
      description: 'Transform birthday moments into custom coloring pages that kids love and parents appreciate.',
      icon: '🎂',
      gradient: 'from-indigo-600 via-purple-500 to-pink-500',
      features: ['Low-stimulation activity', 'Replaces loot bags', 'Toddlers to grandparents'],
    },
    {
      eventId: 'weddings' as const,
      title: 'Weddings',
      description: 'Elegant guest entertainment with sophisticated keepsakes that celebrate your special day.',
      icon: '💒',
      gradient: 'from-amber-600 via-yellow-500 to-amber-400',
      features: ['Elegant keepsakes', 'Guest favor alternative', 'All ages welcome'],
    },
    {
      eventId: 'debuts' as const,
      title: 'Debuts',
      description: 'Make your 18th birthday unforgettable with creative guest engagement and treasured memories.',
      icon: '🌹',
      gradient: 'from-rose-400 via-pink-400 to-rose-300',
      features: ['18 Roses theme', 'Rose gold crayon sets', 'Bonding activity'],
    },
    {
      eventId: 'corporate-event' as const,
      title: 'Corporate Events',
      description: 'Innovative team building and brand activation with professional keepsakes featuring your logo.',
      icon: '🏢',
      gradient: 'from-blue-700 via-blue-600 to-blue-500',
      features: ['Full branding options', 'Team building', 'Professional service'],
    },
  ];

  return (
    <>
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <HubNavigation />
      <Confetti />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-16 h-16 text-yellow-300 opacity-30">★</div>
        <div className="absolute top-40 right-20 w-20 h-20 text-pink-300 opacity-30">✦</div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 text-purple-300 opacity-30">★</div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-white bg-indigo-600/90 backdrop-blur rounded-full uppercase shadow-lg">
            Manila's Premier Coloring Booth Experience
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900">
            Choose Your Perfect{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Event Experience
            </span>
          </h1>
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            From birthday celebrations to corporate galas, we transform your special moments into
            beautiful, personalized coloring pages that guests treasure forever.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 max-w-xl mx-auto mb-16">
            <div className="text-center">
              <p className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">4</p>
              <p className="text-sm text-gray-600 uppercase tracking-widest">Event Types</p>
            </div>
            <div className="text-center">
              <p className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">100%</p>
              <p className="text-sm text-gray-600 uppercase tracking-widest">Memorable</p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Cards Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4 text-gray-900">
            Select Your <span className="gradient-text">Event Type</span>
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Each event type is customized with unique themes, pricing packages, and features designed specifically for your celebration.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {eventCardData.map((event) => (
              <Link
                key={event.eventId}
                href={`/${event.eventId}`}
                className="group bg-white rounded-[2rem] p-8 shadow-lg hover:shadow-2xl transition-all duration-300 card-playful border-2 border-gray-100 hover:border-transparent"
              >
                <div className={`absolute top-6 right-6 text-4xl opacity-50 group-hover:scale-110 transition-transform`}>
                  {event.icon}
                </div>
                <div className={`w-16 h-16 bg-gradient-to-br ${event.gradient} rounded-2xl flex items-center justify-center text-white text-2xl mb-6 shadow-lg`}>
                  {event.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{event.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>
                <ul className="space-y-2 mb-6">
                  {event.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${event.gradient} flex items-center justify-center`}>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className={`flex items-center gap-2 font-bold bg-gradient-to-r ${event.gradient} bg-clip-text text-transparent group-hover:gap-4 transition-all`}>
                  <span>Explore {event.title}</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            How <span className="gradient-text">Color Me Booth</span> Works
          </h2>
          <p className="text-gray-600 mb-16">Three simple steps to unforgettable memories</p>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-3xl flex items-center justify-center mx-auto mb-4 text-indigo-700 text-3xl shadow-lg">
                📸
              </div>
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mx-auto -mt-8 mb-4 shadow-lg">
                1
              </div>
              <h3 className="font-bold text-lg mb-2">SNAP!</h3>
              <p className="text-gray-600 text-sm">Our roamer finds your guests. No lines, no waiting.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl flex items-center justify-center mx-auto mb-4 text-pink-700 text-3xl shadow-lg">
                ✨
              </div>
              <div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold mx-auto -mt-8 mb-4 shadow-lg">
                2
              </div>
              <h3 className="font-bold text-lg mb-2">SKETCH!</h3>
              <p className="text-gray-600 text-sm">AI instantly converts photos into beautiful line art.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-3xl flex items-center justify-center mx-auto mb-4 text-orange-700 text-3xl shadow-lg">
                🎨
              </div>
              <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mx-auto -mt-8 mb-4 shadow-lg">
                3
              </div>
              <h3 className="font-bold text-lg mb-2">STYLE!</h3>
              <p className="text-gray-600 text-sm">Guests color their custom pages with premium crayons.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Create Unforgettable Memories?</h2>
          <p className="text-gray-400 mb-8">
            Select your event type above or contact us directly for custom packages.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <a
              href="https://www.instagram.com/colorme.photobooth/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-500 transition-all bounce-hover"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/coloringbookbooth"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all bounce-hover"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; 2026 Color Me Booth Manila. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
    <ChatWidget />
    </>
  );
}
