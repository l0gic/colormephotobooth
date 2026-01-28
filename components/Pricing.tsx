'use client';

import { Clock, User, Printer, Palette, Users, Gift, Layout, Cloud, Sparkles, Building, Heart, type LucideIcon } from 'lucide-react';
import { useEventConfig } from '@/components/EventThemeProvider';
import { useState } from 'react';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Clock,
  User,
  Printer,
  Palette,
  Users,
  Gift,
  Layout,
  Cloud,
  Building,
  Heart,
};

export default function Pricing() {
  const config = useEventConfig();
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-50 -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-br from-pink-100 to-orange-100 rounded-full blur-3xl opacity-50 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 uppercase tracking-tighter">
            <span className="gradient-text">{config.pricing.title}</span>
          </h2>
          <p className="text-gray-700 font-medium">{config.pricing.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {config.pricing.packages.map((plan) => (
            <div
              key={plan.id}
              className={`border-2 rounded-[2rem] p-8 transition group relative card-playful bg-white shadow-md ${plan.borderColor} ${plan.colorfulBorder ? 'colorful-border' : ''}`}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.badgePosition === 'top' ? (
                <div className={`absolute top-0 right-0 ${plan.badgeBg} px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-bl-xl flex items-center gap-2`}>
                  <Sparkles className="w-4 h-4" />
                  {plan.badge}
                </div>
              ) : (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 ${plan.badgeBg} px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full border`}>
                  {plan.badge}
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2 mt-4 text-gray-900">{plan.title}</h3>
              <p className={`mb-6 italic text-sm font-medium ${plan.descriptionColor || 'text-gray-600'}`}>
                {plan.description}
              </p>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, index) => {
                  const Icon = iconMap[feature.icon] || Clock;
                  return (
                    <li key={index} className="flex items-center gap-3 text-sm">
                      <div className={`w-8 h-8 ${plan.colorfulBorder ? 'bg-gradient-to-br from-indigo-100 to-purple-100' : 'bg-indigo-100'} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-indigo-600" />
                      </div>
                      <span className={feature.bold ? 'font-bold text-indigo-900' : ''}>
                        {feature.text}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <a
                href="#contact"
                className={`block w-full text-center py-4 rounded-2xl font-bold transition btn-playful ${plan.buttonClass}`}
              >
                {plan.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
