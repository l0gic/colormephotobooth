import { Heart, Gift, Coffee, Instagram, CheckCircle2 } from 'lucide-react';

const benefitCards = [
  {
    icon: Heart,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    hoverBorder: 'hover:border-pink-300',
    title: 'Main Character Energy',
    description: 'Every child becomes the hero of their own coloring book.',
  },
  {
    icon: Gift,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    hoverBorder: 'hover:border-indigo-300',
    title: 'Two-in-One',
    description: 'Entertainment during the party + the loot bag giveaway.',
    marginTop: true,
  },
  {
    icon: Coffee,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-700',
    hoverBorder: 'hover:border-yellow-300',
    title: 'Low-Stimulation',
    description: 'Gives parents a 15-minute break while kids focus quietly.',
  },
  {
    icon: Instagram,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    hoverBorder: 'hover:border-purple-300',
    title: 'Reel Ready',
    description: 'Process videos of kids coloring are perfect for social media.',
    marginTop: true,
  },
];

const checklistItems = [
  'Reduces host planning stress',
  'Works for toddlers, titas, and yayas',
  'Premium Roamer tech (No bulky lines)',
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-24 bg-pastel relative overflow-hidden">
      {/* Confetti decorations */}
      <div className="absolute top-10 left-10 text-4xl opacity-20">🎉</div>
      <div className="absolute top-20 right-20 text-4xl opacity-20">🎨</div>
      <div className="absolute bottom-10 left-1/4 text-4xl opacity-20">✨</div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            {benefitCards.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-3xl shadow-md border-2 border-gray-100 card-playful ${benefit.hoverBorder} ${benefit.marginTop ? 'mt-8' : ''}`}
                >
                  <div className={`w-12 h-12 ${benefit.iconBg} rounded-2xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${benefit.iconColor}`} />
                  </div>
                  <h4 className="font-bold mb-2 text-sm text-gray-900">{benefit.title}</h4>
                  <p className="text-xs text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Metro Manila&apos;s Elite Hosts Choose Us</h2>
            <p className="text-gray-700 mb-8 font-medium">
              Most booths are forgotten by the time the car arrives. Our &quot;Color Me&quot; pages end up on refrigerators, in frames, and in memory boxes for years.
            </p>
            <ul className="space-y-4">
              {checklistItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-md card-playful">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-green-600 w-5 h-5" />
                  </div>
                  <span className="font-semibold text-gray-900">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
