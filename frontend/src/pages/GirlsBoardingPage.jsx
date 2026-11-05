import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Building,
  Heart,
  Scale,
  Award,
  Search,
  CheckCircle,
  MapPin,
  Calendar,
  Lock,
  ChevronRight,
  Eye,
  Send,
} from 'lucide-react';
import SchoolCard from '../components/common/SchoolCard';
import EnquiryModal from '../components/common/EnquiryModal';
import schoolService from '../services/schoolService';
import { useCompare } from '../context/CompareContext';

const safetyHighlights = [
  {
    title: 'Multi-Tiered Campus Security',
    desc: '24/7 monitored high-definition perimeter CCTV surveillance with controlled biometrics at all dormitory wings.',
    icon: ShieldCheck,
  },
  {
    title: 'Female-Led Pastoral Care',
    desc: 'Dedicated full-time resident Housemistresses, senior matrons, and registered clinical psychologists residing on campus.',
    icon: Heart,
  },
  {
    title: 'Full-Time Medical Infirmary',
    desc: 'Round-the-clock female resident doctors, pediatric nurses, and stationed emergency ambulances on call.',
    icon: Award,
  },
  {
    title: 'Anti-Bullying & POSH Safeguards',
    desc: 'Rigid zero-tolerance disciplinary frameworks, peer mentorship councils, and regular external safeguarding audits.',
    icon: Lock,
  },
];

const GirlsBoardingPage = () => {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedBoard, setSelectedBoard] = useState('All');

  // Enquiry modal
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedSchoolForEnquiry, setSelectedSchoolForEnquiry] = useState(null);

  useEffect(() => {
    const fetchGirlsSchools = async () => {
      try {
        const res = await schoolService.getGirlsBoardingSchools();
        if (res.success && res.data) {
          setSchools(res.data);
          setFilteredSchools(res.data);
        }
      } catch (err) {
        console.error('Error fetching girls boarding schools:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGirlsSchools();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    let result = [...schools];
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(term) ||
          s.city.toLowerCase().includes(term) ||
          s.overview.toLowerCase().includes(term)
      );
    }
    if (selectedCity !== 'All') {
      result = result.filter((s) => s.city.toLowerCase() === selectedCity.toLowerCase());
    }
    if (selectedBoard !== 'All') {
      result = result.filter(
        (s) => s.curriculum && s.curriculum.includes(selectedBoard)
      );
    }
    setFilteredSchools(result);
  }, [searchTerm, selectedCity, selectedBoard, schools]);

  const handleOpenEnquiry = (school) => {
    setSelectedSchoolForEnquiry(school);
    setIsEnquiryOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative bg-navy-950 text-white py-16 sm:py-24 border-b border-navy-800 overflow-hidden">
        {/* Background image preview */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=85"
            alt="Girls Boarding School Campus"
            className="w-full h-full object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Specialized Girls Boarding Showcase</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight leading-tight">
              India's Premier Girls' Boarding Schools
            </h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Empowering young women through intellectual excellence, equestrian and Olympic sports, world-class pastoral security, and transformative sisterhood bonds.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => handleOpenEnquiry(null)}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-navy-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span>Enquire with Girls Boarding Expert</span>
              </button>
              <Link
                to="/compare"
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs transition-colors flex items-center gap-2"
              >
                <Scale className="w-4 h-4 text-gold-400" />
                <span>Compare Girls Schools</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Safety & Pastoral Care Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {safetyHighlights.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-premium flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 border border-navy-100 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold font-serif text-navy-950 mb-1">
                    {s.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by school name or keyword..."
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-navy-900"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {/* City Filter */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Cities</option>
              <option value="Dehradun">Dehradun</option>
              <option value="Ajmer">Ajmer</option>
              <option value="Gwalior">Gwalior</option>
            </select>

            {/* Board Filter */}
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Boards</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE / ISC</option>
              <option value="CIE">Cambridge (CIE)</option>
            </select>
          </div>
        </div>

        {/* School Cards Grid */}
        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-2xl h-96 animate-pulse border border-slate-200"
                />
              ))}
            </div>
          ) : filteredSchools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSchools.map((school) => (
                <SchoolCard
                  key={school._id || school.slug}
                  school={school}
                  onEnquire={handleOpenEnquiry}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8">
              <Building className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-semibold text-sm">
                No girls boarding schools matched your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Advisory Spotlight Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-850 text-white rounded-3xl p-8 sm:p-12 border border-gold-400/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20">
              Girls Boarding Admission Advisory
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-2">
              Choosing Between Ecole Globale, Welham & Mayo College Girls?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              Our female education counsellors understand the nuances of all-girls pastoral care, entrance exam standards, and dormitory acclimatization.
            </p>
          </div>
          <button
            onClick={() => handleOpenEnquiry(null)}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-navy-950 font-bold text-xs shadow-md transition-all whitespace-nowrap"
          >
            Schedule 1-on-1 Parent Consultation
          </button>
        </div>
      </div>

      {/* Admission Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        preselectedSchool={selectedSchoolForEnquiry}
      />
    </div>
  );
};

export default GirlsBoardingPage;
