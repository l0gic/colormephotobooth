import { Camera, Wand2, Pencil } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Camera,
    iconBg: 'from-indigo-100 to-indigo-200',
    iconColor: 'text-indigo-700',
    numberBg: 'bg-indigo-600',
    title: 'SNAP!',
    description: 'Our Roamer Booth finds your guests. No lines, no waiting. Just natural, happy smiles anywhere in the venue.',
  },
  {
    number: 2,
    icon: Wand2,
    iconBg: 'from-pink-100 to-pink-200',
    iconColor: 'text-pink-700',
    numberBg: 'bg-pink-500',
    title: 'SKETCH!',
    description: 'Our AI instantly converts the photo into high-definition line art. The transformation is mesmerizing to watch!',
    animationDelay: '0.2s',
    floatDelay: '0.5s',
  },
  {
    number: 3,
    icon: Pencil,
    iconBg: 'from-yellow-100 to-orange-200',
    iconColor: 'text-orange-700',
    numberBg: 'bg-orange-500',
    title: 'STYLE!',
    description: 'We hand them their custom coloring page and a premium mini-crayon set to start their masterpiece immediately.',
    animationDelay: '0.4s',
    floatDelay: '1s',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-16 h-16 text-yellow-300 opacity-30">★</div>
      <div className="absolute bottom-20 right-10 w-20 h-20 text-pink-300 opacity-30">✦</div>
      <div className="absolute top-40 right-20 w-12 h-12 text-purple-300 opacity-30">★</div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 uppercase tracking-tighter">
            <span className="rainbow-text">The 3-Step Magic</span>
          </h2>
          <p className="text-gray-500">How we create &quot;Main Character&quot; moments in seconds.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="text-center card-playful"
                style={step.animationDelay ? { animationDelay: step.animationDelay } as React.CSSProperties : undefined}
              >
                <div
                  className={`w-24 h-24 bg-gradient-to-br ${step.iconBg} rounded-3xl flex items-center justify-center mx-auto mb-6 ${step.iconColor} shadow-lg float-animation`}
                  style={step.floatDelay ? { animationDelay: step.floatDelay } as React.CSSProperties : undefined}
                >
                  <Icon className="w-12 h-12" />
                </div>
                <div className={`${step.numberBg} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto -mt-8 mb-4 shadow-lg`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-700 font-medium">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
