import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Building, Filter } from 'lucide-react';
import SchoolCard from '../common/SchoolCard';
import schoolService from '../../services/schoolService';

const FeaturedSchools = ({ onEnquire }) => {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await schoolService.getFeaturedSchools();
        if (res.success && res.data) {
          setSchools(res.data);
          setFilteredSchools(res.data);
        }
      } catch (err) {
        console.error('Error fetching featured schools:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'All') {
      setFilteredSchools(schools);
    } else if (tab === 'Girls Boarding') {
      setFilteredSchools(
        schools.filter(
          (s) =>
            s.category === 'Girls Boarding Schools' || s.gender === 'Girls Only'
        )
      );
    } else if (tab === 'Boys Boarding') {
      setFilteredSchools(
        schools.filter(
          (s) =>
            s.category === 'Boys Boarding Schools' || s.gender === 'Boys Only'
        )
      );
    } else if (tab === 'International') {
      setFilteredSchools(
        schools.filter(
          (s) =>
            s.category === 'International Schools' ||
            (s.curriculum && s.curriculum.includes('IB'))
        )
      );
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase font-bold tracking-widest text-gold-600 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                Featured Institutions
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-navy-950">
              India's Premier Recommended Schools
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Curated benchmarks of academic distinction, pastoral security, and state-of-the-art campus infrastructure.
            </p>
          </div>

          <Link
            to="/schools"
            className="inline-flex items-center gap-2 text-sm font-bold text-navy-900 hover:text-gold-600 transition-colors"
          >
            <span>Browse All Schools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-semibold">
          {['All', 'Girls Boarding', 'Boys Boarding', 'International'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab === 'All' ? 'All Featured' : tab}
            </button>
          ))}
        </div>

        {/* School Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-slate-50 rounded-2xl h-96 animate-pulse border border-slate-200"
              />
            ))}
          </div>
        ) : filteredSchools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSchools.map((school) => (
              <SchoolCard
                key={school._id || school.slug}
                school={school}
                onEnquire={onEnquire}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 p-8">
            <Building className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-semibold text-sm">
              No schools matched this category filter.
            </p>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
          <Link
            to="/schools"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
          >
            <span>Explore Complete School Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSchools;

