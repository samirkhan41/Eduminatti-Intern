import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Sparkles,
  Shield,
  GraduationCap,
  Globe2,
  Home,
  ArrowRight,
} from 'lucide-react';

const categories = [
  {
    title: 'Girls Boarding Schools',
    description: 'Empowering young women in safe, world-class residential environments with outstanding pastoral care and leadership training.',
    count: 'Top Premier Schools',
    icon: Sparkles,
    path: '/girls-boarding-schools',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80',
    highlight: true,
  },
  {
    title: 'Boarding Schools',
    description: 'Premier co-educational residential schools across India fostering character, independence, and holistic development.',
    count: 'Full & Weekly Boarding',
    icon: Home,
    path: '/schools?boardingType=Full+Boarding',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Boys Boarding Schools',
    description: 'Historic institutions with rich sporting heritage, military traditions, discipline, and distinguished alumni networks.',
    count: 'All-Boys Heritage',
    icon: Shield,
    path: '/schools?category=Boys+Boarding+Schools',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'International Schools',
    description: 'Institutions offering the International Baccalaureate (IB) Diploma and Cambridge (CAIE) IGCSE curricula with global university pathways.',
    count: 'IB & Cambridge Continuum',
    icon: Globe2,
    path: '/schools?category=International+Schools',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Day Schools',
    description: 'Award-winning experiential day schools with robust sports, arts, and STEM infrastructure in major metropolitan corridors.',
    count: 'CBSE & ICSE Metro Hubs',
    icon: Building2,
    path: '/schools?category=Day+Schools',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Residential Heritage Schools',
    description: 'Historic hill-station schools nestled in the Himalayas and Shivaliks with century-old traditions of excellence.',
    count: 'Sprawling Green Estates',
    icon: GraduationCap,
    path: '/schools?category=Residential+Schools',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80',
  },
];

const CategorySection = () => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-gold-600 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20">
              Curated Classifications
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-navy-950 mt-3">
              Explore by School Category
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Filter institutions by institutional structure, curriculum, and gender preferences to match your family's exact vision.
            </p>
          </div>
          <Link
            to="/schools"
            className="inline-flex items-center gap-2 text-sm font-bold text-navy-900 hover:text-gold-600 transition-colors"
          >
            <span>View All School Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.title}
                to={cat.path}
                className={`group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between ${
                  cat.highlight
                    ? 'bg-gradient-to-br from-navy-950 via-navy-900 to-navy-850 text-white shadow-xl hover:shadow-2xl border-2 border-gold-400/40'
                    : 'bg-white hover:bg-slate-50 text-navy-950 border border-slate-200/80 shadow-subtle hover:shadow-premium'
                }`}
              >
                {/* Background image preview with soft gradient */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        cat.highlight
                          ? 'bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 shadow-md'
                          : 'bg-navy-50 text-navy-900 border border-navy-100 group-hover:bg-navy-900 group-hover:text-white transition-colors'
                      }`}
                    >
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>

                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                        cat.highlight
                          ? 'bg-gold-400/20 text-gold-300 border border-gold-400/30'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </div>

                  <h3
                    className={`text-xl font-bold font-serif mb-2 group-hover:translate-x-0.5 transition-transform ${
                      cat.highlight ? 'text-white' : 'text-navy-950'
                    }`}
                  >
                    {cat.title}
                  </h3>

                  <p
                    className={`text-xs leading-relaxed line-clamp-3 ${
                      cat.highlight ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {cat.description}
                  </p>
                </div>

                <div className="relative z-10 mt-6 pt-4 border-t border-slate-100/20 flex items-center justify-between text-xs font-bold">
                  <span
                    className={
                      cat.highlight
                        ? 'text-gold-400 group-hover:text-gold-300'
                        : 'text-navy-900 group-hover:text-gold-600'
                    }
                  >
                    Explore Schools
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      cat.highlight
                        ? 'bg-white/10 text-white group-hover:bg-gold-400 group-hover:text-navy-950 group-hover:translate-x-1'
                        : 'bg-slate-100 text-navy-900 group-hover:bg-navy-900 group-hover:text-white group-hover:translate-x-1'
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
