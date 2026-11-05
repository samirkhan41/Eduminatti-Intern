import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Building } from 'lucide-react';

const cities = [
  {
    name: 'Dehradun',
    state: 'Uttarakhand',
    title: 'The School Capital of India',
    description: 'Home to world-renowned residential institutions including Ecole Globale, Welham, and The Doon School in the Shivalik foothills.',
    schoolCount: '50+ Elite Schools',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80',
    slug: 'Dehradun',
  },
  {
    name: 'Mussoorie',
    state: 'Uttarakhand',
    title: 'Queen of the Hills',
    description: 'Pristine Himalayan air, historic international schools like Woodstock, and peaceful residential campus settings at 7,000 feet.',
    schoolCount: '15+ Mountain Campuses',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    slug: 'Mussoorie',
  },
  {
    name: 'Ajmer',
    state: 'Rajasthan',
    title: 'Princely Academic Traditions',
    description: 'Steeped in royal heritage, featuring Mayo College and Mayo College Girls School with iconic Indo-Saracenic campuses.',
    schoolCount: '20+ Heritage Schools',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=600&q=80',
    slug: 'Ajmer',
  },
  {
    name: 'Gwalior',
    state: 'Madhya Pradesh',
    title: 'Historic Fort & Cultural Hub',
    description: 'Renowned for Scindia Kanya Vidyalaya and The Scindia School, blending timeless Indian values with progressive curricula.',
    schoolCount: '18+ Top Schools',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80',
    slug: 'Gwalior',
  },
  {
    name: 'Kasauli',
    state: 'Himachal Pradesh',
    title: 'Pine-Clad Serene Heights',
    description: 'Featuring historic hill institutions like The Lawrence School Sanawar with rich cadet leadership and character building traditions.',
    schoolCount: '12+ Hill Schools',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
    slug: 'Kasauli',
  },
  {
    name: 'Bengaluru',
    state: 'Karnataka',
    title: 'Global IB & Tech Academies',
    description: 'Cutting-edge international day and weekly boarding schools like TISB with world-class STEM robotics and university placements.',
    schoolCount: '45+ International Schools',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
    slug: 'Bengaluru',
  },
];

const PopularCities = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-gold-600 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20">
              Major Education Hubs
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-navy-950 mt-3">
              Explore Popular Schooling Destinations
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              India's most sought-after education hubs renowned for high air quality, safe residential environments, and distinguished academic history.
            </p>
          </div>
          <Link
            to="/schools"
            className="inline-flex items-center gap-2 text-sm font-bold text-navy-900 hover:text-gold-600 transition-colors"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link
              key={city.name}
              to={`/schools?city=${city.slug}`}
              className="group relative overflow-hidden rounded-3xl aspect-[16/11] border border-slate-200 shadow-subtle hover:shadow-premium transition-all duration-300"
            >
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-black/20" />

              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-semibold text-gold-300 border border-white/10 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold-400" />
                    {city.state}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold text-white">
                    {city.schoolCount}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-1 group-hover:text-gold-300 transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-xs text-gold-400 font-medium mb-1.5">
                    {city.title}
                  </p>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {city.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCities;

