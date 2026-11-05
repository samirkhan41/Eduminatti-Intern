import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    parentName: 'Mrs. Suman Agarwal',
    location: 'New Delhi',
    schoolName: "Ecole Globale International Girls' School",
    role: 'Parent of Grade 9 Student',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    content:
      'Finding the right all-girls residential school seemed daunting until we used Eduminatti. The side-by-side comparison between Ecole Globale and Welham gave us total clarity on the equestrian facilities and pastoral care. Our daughter has thrived tremendously.',
    rating: 5,
  },
  {
    parentName: 'Col. Rajeshwardas Singhania',
    location: 'Mumbai',
    schoolName: 'The Doon School',
    role: 'Parent of Class 8 Student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content:
      'The fee breakdown and entrance assessment guidance provided on Eduminatti was far more transparent than any brochure. The counsellor connected us with the admissions office seamlessly, demystifying the whole process.',
    rating: 5,
  },
  {
    parentName: 'Dr. Priya & Rohit Venkat',
    location: 'Bengaluru',
    schoolName: 'The International School Bangalore (TISB)',
    role: 'Parents of IBDP Student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    content:
      'As working professionals seeking a weekly boarding option, we needed rigorous IB academics without compromising family weekends. Eduminatti allowed us to filter specifically for weekly boarding in Karnataka.',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-600 bg-gold-400/10 px-3.5 py-1 rounded-full border border-gold-400/20">
            Parent Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-navy-950 mt-3">
            Trusted by Thousands of Families Across India
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Real stories from parents who found the right academic ecosystem for their daughters and sons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.parentName}
              className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-subtle hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Icon */}
                <p className="text-xs text-slate-600 leading-relaxed italic mb-6">
                  "{t.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.parentName}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-navy-950 flex items-center gap-1.5">
                    {t.parentName}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </h4>
                  <p className="text-[11px] text-slate-500">{t.role} • {t.location}</p>
                  <p className="text-[11px] font-semibold text-gold-600 truncate max-w-[200px]">
                    {t.schoolName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

