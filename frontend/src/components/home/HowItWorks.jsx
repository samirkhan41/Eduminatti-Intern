import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Scale,
  Building,
  Send,
  ArrowRight,
} from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Discover Schools',
    description: 'Search schools across India by location, curriculum (CBSE, ICSE, IB), boarding type, and fee range with intuitive filters.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Compare Options',
    description: 'Select up to 3 shortlisted schools to view a comprehensive side-by-side comparison of annual fees, facilities, and academic results.',
    icon: Scale,
  },
  {
    step: '03',
    title: 'Explore Facilities',
    description: 'Inspect detailed photo galleries, dorm living conditions, mess dietary plans, sports complexes, and 24/7 security safeguards.',
    icon: Building,
  },
  {
    step: '04',
    title: 'Submit Admission Enquiry',
    description: 'Connect directly with school admission offices and our counsellors with a single verified enquiry form to start your application.',
    icon: Send,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-600 bg-gold-400/10 px-3.5 py-1 rounded-full border border-gold-400/20">
            Simplified Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-navy-950 mt-3">
            How Eduminatti Works
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Four simple steps from initial curiosity to securing confirmed admission for your child.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle hover:shadow-premium transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold font-serif text-slate-200">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-900 border border-navy-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-serif text-navy-950 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-navy-800">
                  <span>Step {index + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/schools"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-navy-950 font-bold text-sm shadow-md transition-all hover:scale-105"
          >
            <span>Start Exploring Schools Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

