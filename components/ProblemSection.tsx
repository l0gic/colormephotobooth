'use client';

import { useEventConfig } from '@/components/EventThemeProvider';

export default function ProblemSection() {
  const config = useEventConfig();

  return (
    <section className={`py-20 bg-gradient-to-r ${config.problem.gradient} text-white overflow-hidden relative`}>
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-2xl lg:text-4xl mb-8 leading-tight font-bold">
          {config.problem.question}
        </h2>
        <p className="text-indigo-100 text-lg mb-0">
          {config.problem.answer} <span className="text-yellow-300 font-bold">{config.problem.highlightText}</span> that guests take home and cherish.
        </p>
      </div>
    </section>
  );
}
