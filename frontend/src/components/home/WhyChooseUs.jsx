import React from 'react';
import {
  Compass,
  Scale,
  Headphones,
  HeartHandshake,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

const pillars = [
  {
    icon: Compass,
    title: 'Comprehensive School Discovery',
    description: 'Access thoroughly verified profiles of premier boarding, residential, and day institutions across India with detailed curriculum structures and hostel specifications.',
    features: ['100% verified institutional data', 'Direct insights into boarding culture', 'Annual fee schedules disclosed upfront'],
  },
  {
    icon: Scale,
    title: 'Intelligent Multi-School Comparison',
    description: 'Compare up to three schools simultaneously across academic affiliations, student-teacher ratios, hostel amenities, sports complexes, and total fee structures.',
    features: ['Side-by-side matrix breakdown', 'Compare boarding vs day options', 'Sports and pastoral care benchmarking'],
  },
  {
    icon: Headphones,
    title: 'Dedicated Admission Assistance',
    description: 'Our experienced educational advisors assist families from initial exploration to test prep guidelines, campus visits, and final registration confirmation.',
    features: ['Confidential 1-on-1 consultations', 'Assistance with scholarship eligibility', 'Streamlined direct admission enquiries'],
  },
  {
    icon: HeartHandshake,
    title: 'Parent-Centric Transparency',
    description: 'Built by parents and education specialists with zero bias. We provide authentic reviews, safety audit overviews, and objective clarity to empower your choice.',
    features: ['Impartial institutional profiles', 'Direct campus contact information', 'Detailed safety & medical protocols'],
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-navy-950 text-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-gold-400/10 px-3.5 py-1 rounded-full border border-gold-400/20">
            The Eduminatti Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white mt-4">
            Why Parents Trust Eduminatti
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Finding the ideal boarding or day school shapes your child's entire future. We replace marketing brochures with verified clarity and end-to-end support.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-navy-900/90 border border-navy-800 hover:border-gold-400/40 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-400/20 to-gold-600/20 text-gold-300 flex items-center justify-center border border-gold-400/30 mb-5">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-lg font-bold font-serif text-white mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-navy-800 space-y-2">
                  {item.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-[11px] text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

