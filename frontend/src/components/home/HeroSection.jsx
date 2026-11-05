import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Building,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  Users,
} from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.append('search', searchTerm.trim());
    if (selectedCity && selectedCity !== 'All Cities') params.append('city', selectedCity);
    if (selectedCategory && selectedCategory !== 'All Categories') params.append('category', selectedCategory);

    navigate(`/schools?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 bg-navy-950 overflow-hidden">
      {/* Background Campus Photo with Elegant Multi-layered Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=85"
          alt="Historic Indian School Campus"
          className="w-full h-full object-cover object-center opacity-30 scale-105 animate-pulse duration-1000"
          style={{ animationDuration: '10s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900/90 border border-gold-400/30 text-gold-300 text-xs font-semibold mb-6 shadow-xl backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          <span>India's Most Trusted School Admission & Discovery Network</span>
          <span className="hidden sm:inline-block text-gold-400/40">•</span>
          <span className="hidden sm:inline-block text-slate-300 font-normal">2025 Admissions Open</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Discover the Right School for Your Child
        </h1>

        {/* Hero Description */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Explore India's finest schools, compare facilities and make confident admission decisions with verified insights and transparent fees.
        </p>

        {/* Hero Search Box Card */}
        <div className="mt-10 max-w-4xl mx-auto bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-2xl border border-white/20 text-left">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* School Keyword Input */}
            <div className="md:col-span-5 relative">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">
                School Name or Keyword
              </label>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g. Ecole Globale, Welham, Doon..."
                  className="w-full pl-10 pr-3 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* City Selector */}
            <div className="md:col-span-3 relative">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">
                Location
              </label>
              <div className="relative flex items-center">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 transition-all appearance-none cursor-pointer"
                >
                  <option value="">All Cities</option>
                  <option value="Dehradun">Dehradun</option>
                  <option value="Mussoorie">Mussoorie</option>
                  <option value="Ajmer">Ajmer</option>
                  <option value="Gwalior">Gwalior</option>
                  <option value="Kasauli">Kasauli</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Gurugram">Gurugram</option>
                  <option value="Delhi-NCR">Delhi-NCR</option>
                </select>
              </div>
            </div>

            {/* School Category Selector */}
            <div className="md:col-span-4 relative flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">
                  Category
                </label>
                <div className="relative flex items-center">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-8 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">All Categories</option>
                    <option value="Girls Boarding Schools">Girls Boarding Schools</option>
                    <option value="Boarding Schools">Boarding Schools</option>
                    <option value="Boys Boarding Schools">Boys Boarding Schools</option>
                    <option value="International Schools">International Schools</option>
                    <option value="Day Schools">Day Schools</option>
                    <option value="Residential Schools">Residential Schools</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="sm:self-end pt-1 sm:pt-0">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-navy-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:gap-3 cursor-pointer"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </form>

          {/* Quick tags below search bar */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Quick Searches:</span>
            <Link
              to="/girls-boarding-schools"
              className="px-2.5 py-1 rounded-lg bg-gold-400/10 text-gold-800 hover:bg-gold-400/20 font-medium transition-colors"
            >
              Girls Boarding Schools
            </Link>
            <Link
              to="/schools?city=Dehradun"
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              Dehradun Boarding Schools
            </Link>
            <Link
              to="/schools?curriculum=IB"
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              IB World Schools
            </Link>
            <Link
              to="/compare"
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              Compare Top Schools
            </Link>
          </div>
        </div>

        {/* Trust Badges Row */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-navy-800/60 max-w-4xl mx-auto text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">100% Verified</p>
              <p className="text-slate-400 text-xs">Authentic accreditation data</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold-400 flex-shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Premier Campuses</p>
              <p className="text-slate-400 text-xs">Boarding & day institutions</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold-400 flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Clear Fee Schedules</p>
              <p className="text-slate-400 text-xs">Transparent tuition breakdowns</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold-400 flex-shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Expert Counsellors</p>
              <p className="text-slate-400 text-xs">Direct admission assistance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

