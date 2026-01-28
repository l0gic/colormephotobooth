'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useEventConfig } from '@/components/EventThemeProvider';

const SLIDE_INTERVAL = 3500; // 3.5 seconds per slide

export default function Hero() {
  const config = useEventConfig();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = config.hero.slides;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <>
      {/* Floating Balloons - visible on large screens */}
      <div className="fixed top-20 right-10 z-20 pointer-events-none hidden lg:block">
        <div className="balloon"></div>
        <div className="balloon"></div>
        <div className="balloon"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 hero-pattern gradient-hero overflow-hidden">
        {/* Floating Stars */}
        <div className="star text-yellow-400 top-20 left-[10%]">★</div>
        <div className="star text-pink-400 top-40 left-[25%]">✦</div>
        <div className="star text-purple-400 top-60 left-[5%]">★</div>
        <div className="star text-blue-400 top-32 right-[20%]">✦</div>
        <div className="star text-green-400 top-52 right-[5%]">★</div>

        {/* Confetti Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="confetti falling-confetti"></div>
          <div className="confetti falling-confetti"></div>
          <div className="confetti falling-confetti"></div>
          <div className="confetti falling-confetti"></div>
          <div className="confetti falling-confetti"></div>
          <div className="confetti falling-confetti"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className={`inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-white ${config.colors.badgeBg} backdrop-blur rounded-full uppercase shadow-lg wiggle-hover`}
              >
                {config.hero.badgeText}
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 text-white text-shadow-strong">
                {config.hero.title}<span className="gradient-text"> {config.hero.titleHighlight}</span>
              </h1>
              <p className="text-lg text-gray-900 mb-8 max-w-lg font-medium text-shadow-subtle bg-white/60 backdrop-blur-sm p-4 rounded-2xl">
                {config.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#pricing"
                  className={`btn-playful bg-gradient-to-r ${config.colors.gradient} text-white px-8 py-4 rounded-2xl font-bold text-center shadow-xl inline-flex items-center justify-center gap-2`}
                >
                  <Sparkles className="w-5 h-5" />
                  {config.hero.ctaText}
                </a>
                <div className="flex items-center gap-3 px-4 py-2 bg-white/90 backdrop-blur rounded-2xl shadow-md border border-white/50">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white">JC</div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-indigo-400 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">SM</div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white">AL</div>
                  </div>
                  <span className="text-xs text-gray-800 font-semibold">{config.hero.socialProof}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl slide-shake relative z-10 pulse-glow">
                <div className="slideshow-container aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-100">
                  {/* Slides */}
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className={`slide ${index === currentSlide ? 'active' : ''}`}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ))}

                  {/* Slide Indicators */}
                  <div className="slide-indicators">
                    {slides.map((_, index) => (
                      <div
                        key={index}
                        className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            goToSlide(index);
                          }
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full blur-3xl opacity-60 float-animation"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-indigo-300 to-purple-400 rounded-full blur-3xl opacity-60 float-animation" style={{ animationDelay: '1s' }}></div>
              <div className="absolute -top-5 -left-5 w-20 h-20 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full blur-2xl opacity-50 float-animation" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator z-20">
          <div className="flex flex-col items-center text-gray-800">
            <span className="text-xs uppercase tracking-widest mb-2 font-semibold text-shadow-subtle">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </section>
    </>
  );
}
