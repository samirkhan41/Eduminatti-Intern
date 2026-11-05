import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Compass,
  HeartHandshake,
  Users,
  Target,
  Award,
  ArrowRight,
} from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      {/* Header */}
      <div className="bg-navy-950 text-white py-16 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20 inline-flex items-center gap-1.5 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Our Core Mission
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">
              About Eduminatti
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              Empowering parents and students across India with verified school discovery, impartial comparison frameworks, and bespoke admission guidance.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Story Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-subtle grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase font-bold text-gold-600 tracking-wider">
              Our Genesis
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-950">
              Transforming How Families Navigate Boarding Admissions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              For decades, selecting a residential or day boarding school in India was clouded by opaque fee structures, marketing hype, and fragmented information. Parents were forced to travel hundreds of kilometres across Dehradun, Mussoorie, or Ajmer just to uncover fundamental syllabus nuances.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              <strong>EDUMINATTI</strong> was established to restore absolute transparency to the education discovery process. We curate verified data directly from institutional disclosures, standardizing fees, safety audits, sports infrastructure, and pastoral models into clean, side-by-side comparative matrices.
            </p>
          </div>
          <div className="lg:col-span-5 aspect-[4/3] rounded-3xl overflow-hidden shadow-premium">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80"
              alt="Historic Indian School Architecture"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Guiding Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-subtle space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-900 border border-navy-100 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-lg font-bold font-serif text-navy-950">
              Uncompromising Accuracy
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We never fabricate accreditations, affiliations, or artificially inflated reviews. Every school is classified against verified public academic guidelines.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-subtle space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gold-50 text-gold-600 border border-gold-100 flex items-center justify-center">
              <Compass className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-lg font-bold font-serif text-navy-950">
              Empowering Girl Education
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dedicated benchmarks for all-girls boarding environments highlighting 24/7 security safeguards, female medical infirmaries, and pastoral care.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-subtle space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-lg font-bold font-serif text-navy-950">
              Parent-First Philosophy
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Zero fees for parents. Our independent advisory desk ensures families receive unbiased, personalized recommendations tailored to each child's strengths.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-navy-800 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Ready to find the ideal boarding school for your child?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Search our curated directory or speak directly with an admissions counsellor today.
          </p>
          <div className="pt-2">
            <Link
              to="/schools"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 text-navy-950 font-bold text-xs shadow-md transition-all hover:scale-105"
            >
              <span>Explore All Schools</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
