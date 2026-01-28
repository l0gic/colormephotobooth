'use client';

import { Quote, Star } from 'lucide-react';
import { useEventConfig } from '@/components/EventThemeProvider';

export default function Testimonials() {
  const config = useEventConfig();
  const { featured, grid } = config.testimonials;

  return (
    <section className="py-24 bg-pastel overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-5xl opacity-10">&quot;</div>
      <div className="absolute bottom-10 right-10 text-5xl opacity-10">&quot;</div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 uppercase tracking-tighter">
            <span className="gradient-text">Happy {config.name} Clients</span>
          </h2>
          <p className="text-gray-700 font-medium">Real reviews from those who made their events unforgettable.</p>
        </div>

        {/* Featured Testimonial */}
        <div className={`bg-white rounded-[3rem] p-10 lg:p-16 relative shadow-xl border-2 ${featured.border} mb-12 card-playful`}>
          <Quote className="text-indigo-100 w-24 h-24 absolute top-8 left-8" />
          <div className="relative z-10">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="fill-yellow-400 text-yellow-400 w-5 h-5" />
              ))}
            </div>
            <p className="text-xl lg:text-2xl font-medium mb-6 leading-relaxed italic text-gray-700">
              {featured.quote}
            </p>
            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 bg-gradient-to-br ${featured.gradient} rounded-full flex items-center justify-center text-white text-lg font-bold`}>
                {featured.initials}
              </div>
              <div>
                <p className="font-bold">{featured.name}</p>
                <p className="text-gray-500 text-sm">{featured.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grid.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl p-8 shadow-md border-2 ${testimonial.border} card-playful`}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-yellow-400 text-yellow-400 w-4 h-4" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold`}>
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-bold text-sm">{testimonial.name}</p>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow-lg border-2 border-indigo-100">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-pink-400 to-pink-500"></div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-indigo-400 to-indigo-500"></div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-purple-500"></div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-green-400 to-green-500"></div>
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900">500+ Happy Clients</p>
              <p className="text-xs text-gray-500">Across Metro Manila &amp; Beyond</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
