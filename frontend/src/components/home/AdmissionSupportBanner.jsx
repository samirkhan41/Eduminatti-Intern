import React from 'react';
import { Phone, Calendar, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const AdmissionSupportBanner = ({ onOpenEnquiry }) => {
  return (
    <section className="py-16 bg-navy-900 border-y border-navy-800 text-white relative overflow-hidden">
      <div className="absolute right-0 top-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-850 p-8 sm:p-12 rounded-3xl border border-gold-400/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20 inline-flex items-center gap-1.5 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Admission Helpline
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
              Unsure which school best fits your child's temperament & ambitions?
            </h3>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Our seasoned educational counsellors evaluate learning styles, sports interests, pastoral requirements, and budget constraints to curate your optimal shortlist.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% Free & Confidential
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Official School Representative
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Transparent Fee Schedules
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry(null)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-navy-950 font-bold text-sm shadow-lg hover:shadow-gold-400/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Advisory Call</span>
            </button>
            <a
              href="tel:+911352750000"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>+91 135 275 0000</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionSupportBanner;
