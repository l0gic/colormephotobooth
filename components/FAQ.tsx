const faqs = [
  {
    question: 'Is it messy?',
    answer: 'Not at all. We use high-quality, wax-based non-toxic crayons that are designed not to smudge or stain expensive party clothes.',
    bgColor: 'from-indigo-50/50',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
  {
    question: 'How long does the conversion take?',
    answer: 'Our AI engine is optimized for speed. It takes less than 10 seconds to convert a photo into high-resolution line art.',
    bgColor: 'from-pink-50/50',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
  },
  {
    question: 'Which areas do you cover?',
    answer: 'We primarily serve Metro Manila (Makati, BGC, Alabang, QC). We are also available for destination parties in Tagaytay or Batangas with a minimal travel fee.',
    bgColor: 'from-purple-50/50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
];

export default function FAQ() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center uppercase tracking-tighter">
          <span className="gradient-text">Common Questions</span>
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-2 border-gray-200 pb-6 card-playful bg-gradient-to-r from-white ${faq.bgColor} rounded-2xl p-6 shadow-sm`}
            >
              <h4 className="font-bold mb-2 flex items-center gap-3 text-gray-900">
                <span className={`w-8 h-8 ${faq.iconBg} rounded-lg flex items-center justify-center ${faq.iconColor} font-bold text-sm`}>
                  ?
                </span>
                {faq.question}
              </h4>
              <p className="text-gray-700 text-sm font-medium">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
