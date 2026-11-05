import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Scale,
  Sparkles,
  Plus,
  Trash2,
  Building,
  ArrowRight,
} from 'lucide-react';
import ComparisonTable from '../components/comparison/ComparisonTable';
import EnquiryModal from '../components/common/EnquiryModal';
import { useCompare } from '../context/CompareContext';
import schoolService from '../services/schoolService';

const ComparePage = () => {
  const { compareList, removeFromCompare, addToCompare, clearCompare } = useCompare();
  const [allSchools, setAllSchools] = useState([]);
  const [selectedSchoolToAdd, setSelectedSchoolToAdd] = useState('');
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedSchoolForEnquiry, setSelectedSchoolForEnquiry] = useState(null);

  useEffect(() => {
    const fetchAllSchools = async () => {
      try {
        const res = await schoolService.getSchools({ limit: 50 });
        if (res.success && res.data) {
          setAllSchools(res.data);
        }
      } catch (err) {
        console.error('Error fetching schools for comparison selector:', err);
      }
    };
    fetchAllSchools();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAddFromDropdown = (e) => {
    const schoolId = e.target.value;
    if (!schoolId) return;
    const found = allSchools.find((s) => s._id === schoolId || s.slug === schoolId);
    if (found) {
      addToCompare(found);
      setSelectedSchoolToAdd('');
    }
  };

  const handleOpenEnquiry = (school) => {
    setSelectedSchoolForEnquiry(school);
    setIsEnquiryOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      {/* Header */}
      <div className="bg-navy-950 text-white py-12 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Side-by-Side Evaluation</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white">
                School Comparison Matrix
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                Analyze academic credentials, pastoral security, hostel living standards, and annual tuition schedules across up to three shortlisted institutions.
              </p>
            </div>

            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-red-500/20 hover:text-red-300 border border-white/20 text-white text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear Comparison</span>
              </button>
            )}
          </div>

          {/* Quick Add School Bar if < 3 schools */}
          {compareList.length < 3 && allSchools.length > 0 && (
            <div className="mt-8 max-w-md bg-navy-900/80 p-3 rounded-2xl border border-navy-800 flex items-center gap-2">
              <Plus className="w-4 h-4 text-gold-400 flex-shrink-0 ml-1" />
              <select
                value={selectedSchoolToAdd}
                onChange={handleAddFromDropdown}
                className="w-full bg-transparent text-slate-200 text-xs font-medium focus:outline-none cursor-pointer"
              >
                <option value="" className="bg-navy-950 text-slate-400">
                  + Add another school to comparison...
                </option>
                {allSchools
                  .filter((s) => !compareList.some((c) => c._id === s._id || c.slug === s.slug))
                  .map((school) => (
                    <option
                      key={school._id}
                      value={school._id}
                      className="bg-navy-950 text-white"
                    >
                      {school.name} ({school.city})
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Main Table Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <ComparisonTable
          schools={compareList}
          onRemoveSchool={removeFromCompare}
          onEnquireSchool={handleOpenEnquiry}
        />
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

export default ComparePage;
