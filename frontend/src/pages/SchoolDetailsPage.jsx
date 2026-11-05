import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Star,
  ShieldCheck,
  Scale,
  Calendar,
  Building,
  GraduationCap,
  Heart,
  Trophy,
  Check,
  Send,
  Phone,
  Mail,
  Globe,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Lock,
  Layers,
  Share2,
} from 'lucide-react';
import schoolService from '../services/schoolService';
import EnquiryModal from '../components/common/EnquiryModal';
import { formatFeeRange, formatRating, formatCurrency } from '../utils/formatters';
import { useCompare } from '../context/CompareContext';
import { useToast } from '../context/ToastContext';

const SchoolDetailsPage = () => {
  const { slugOrId } = useParams();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'academics' | 'boarding' | 'sports' | 'admissions' | 'fees'

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const { isInCompare, toggleCompare } = useCompare();
  const { success } = useToast();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await schoolService.getSchoolBySlugOrId(slugOrId);
        if (res.success && res.data) {
          setSchool(res.data);
        }
      } catch (err) {
        console.error('Error fetching school profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slugOrId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-navy-900 border-t-gold-400 rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-600 font-serif">
            Loading School Profile & Verified Data...
          </p>
        </div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 max-w-xl mx-auto px-4 text-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-subtle">
          <Building className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-navy-950 mb-2">
            School Profile Not Found
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mb-6">
            The requested school profile may have been updated or moved.
          </p>
          <Link
            to="/schools"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Schools Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  const isCompared = isInCompare(school._id || school.slug);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: school.name,
        text: `Check out ${school.name} on Eduminatti`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200/80 py-3 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-navy-950 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/schools" className="hover:text-navy-950 transition-colors">
            Schools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-navy-900 truncate max-w-xs">
            {school.name}
          </span>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="bg-navy-950 text-white py-10 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-gold-400/20 text-gold-300 border border-gold-400/30">
                  {school.category}
                </span>
                <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20">
                  {school.boardingType}
                </span>
                <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20">
                  {school.gender}
                </span>
                {school.isVerified && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Institution
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-white">
                {school.name}
              </h1>
              {school.tagline && (
                <p className="mt-2 text-gold-300 text-sm sm:text-base font-serif italic">
                  "{school.tagline}"
                </p>
              )}

              {/* Location & Established */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gold-400" />
                  {school.address}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gold-400" />
                  Established {school.establishedYear}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <strong className="text-white text-sm">{formatRating(school.rating)}</strong>
                  <span className="text-slate-400">({school.reviewCount || 42} reviews)</span>
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap lg:flex-col gap-3 w-full lg:w-auto">
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="flex-1 lg:flex-initial px-6 py-3.5 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-navy-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span>Submit Admission Enquiry</span>
              </button>

              <div className="flex items-center gap-2 w-full">
                <button
                  onClick={() => toggleCompare(school)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                    isCompared
                      ? 'bg-gold-500/20 border-gold-400 text-gold-300'
                      : 'bg-white/10 hover:bg-white/15 border-white/20 text-white'
                  }`}
                >
                  {isCompared ? <Check className="w-3.5 h-3.5 text-gold-400" /> : <Scale className="w-3.5 h-3.5" />}
                  <span>{isCompared ? 'Compared' : 'Add to Compare'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white"
                  title="Share profile"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery Lightbox / Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Hero Photo */}
          <div className="lg:col-span-8 aspect-[16/10] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-subtle">
            <img
              src={school.gallery?.[activePhoto] || school.heroImage}
              alt={school.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Gallery Thumbnails List */}
          <div className="lg:col-span-4 grid grid-cols-4 lg:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto">
            {school.gallery?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhoto(idx)}
                className={`aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all relative ${
                  activePhoto === idx
                    ? 'border-gold-500 ring-2 ring-gold-400/50 scale-[0.98]'
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${school.name} photo ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-2 shadow-subtle flex items-center gap-2 overflow-x-auto text-xs font-bold">
          {[
            { id: 'overview', label: 'Overview & About' },
            { id: 'academics', label: 'Academics & Board' },
            { id: 'boarding', label: 'Hostel & Boarding' },
            { id: 'sports', label: 'Sports & Infrastructure' },
            { id: 'fees', label: 'Fee Structure' },
            { id: 'admissions', label: 'Admission Procedure' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-navy-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Left Content Body */}
          <div className="lg:col-span-8 space-y-8">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle">
                  <h3 className="text-xl font-bold font-serif text-navy-950 mb-3">
                    Institutional Overview
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    {school.overview}
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle">
                  <h3 className="text-xl font-bold font-serif text-navy-950 mb-3">
                    About the School
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    {school.about}
                  </p>
                </div>

                {/* Safety & Safeguarding Highlights */}
                {school.safetyFeatures && school.safetyFeatures.length > 0 && (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle">
                    <h3 className="text-xl font-bold font-serif text-navy-950 mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      Safety, Security & Medical Safeguards
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {school.safetyFeatures.map((sf) => (
                        <div key={sf} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium leading-relaxed">{sf}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ACADEMICS TAB */}
            {activeTab === 'academics' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle space-y-5">
                  <h3 className="text-xl font-bold font-serif text-navy-950">
                    Academic Philosophy & Pedagogy
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {school.academics?.description || 'Experiential and student-centered curriculum.'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 uppercase tracking-wider block font-bold text-[10px] mb-1">
                        Student-Teacher Ratio
                      </span>
                      <span className="text-lg font-bold text-navy-950">
                        {school.academics?.studentTeacherRatio || '8:1'}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 uppercase tracking-wider block font-bold text-[10px] mb-1">
                        Teaching Methodology
                      </span>
                      <span className="text-xs font-semibold text-slate-800">
                        {school.academics?.teachingMethodology || 'Inquiry-Based & Practical'}
                      </span>
                    </div>
                  </div>

                  {/* Curricula Offered */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-2">
                      Affiliated Boards & Curricula
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {school.curriculum?.map((board) => (
                        <span key={board} className="px-3 py-1.5 rounded-xl bg-navy-50 text-navy-900 font-bold border border-navy-100 text-xs">
                          {board}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages Offered */}
                  {school.academics?.languagesOffered && (
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-2">
                        Languages Taught
                      </h4>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {school.academics.languagesOffered.map((lang) => (
                          <span key={lang} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* BOARDING TAB */}
            {activeTab === 'boarding' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle space-y-6">
                  <h3 className="text-xl font-bold font-serif text-navy-950">
                    Hostel & Residential Life
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {school.boardingFacilities?.description || 'World-class boarding houses fostering lifelong camaraderie.'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                        Dormitory Room Allocation
                      </span>
                      <span className="text-xs font-semibold text-slate-800">
                        {school.boardingFacilities?.roomSharing || '2-3 students per room'}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                        Dining & Dietary Care
                      </span>
                      <span className="text-xs font-semibold text-slate-800">
                        {school.boardingFacilities?.messDietary || 'Nutritious Multi-Cuisine Dining'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-navy-50/70 border border-navy-100 text-xs">
                    <span className="text-navy-950 font-bold block mb-1">Pastoral Supervision:</span>
                    <p className="text-slate-700 leading-relaxed">
                      {school.boardingFacilities?.pastoralCare || 'Dedicated Housemistresses, tutors, and counselling psychologists on campus.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SPORTS TAB */}
            {activeTab === 'sports' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-navy-950 mb-3">
                      Sports Complexes & Coaching Arenas
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {school.sportsFacilities?.map((sp) => (
                        <div key={sp} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                          <Trophy className="w-4 h-4 text-gold-500 flex-shrink-0" />
                          <span>{sp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <h3 className="text-xl font-bold font-serif text-navy-950 mb-3">
                      Campus Infrastructure & Labs
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {school.infrastructure?.map((inf) => (
                        <div key={inf} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                          <Building className="w-4 h-4 text-navy-700 flex-shrink-0" />
                          <span>{inf}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FEES TAB */}
            {activeTab === 'fees' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-navy-950">
                      Transparent Fee Structure (Estimated)
                    </h3>
                    <p className="text-slate-500 text-xs mt-1">
                      Published schedules reflect complete tuition, hostel accommodation, meals, and laundry.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-gold-50/50 border border-gold-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs uppercase font-bold text-gold-800 tracking-wider block">
                        Estimated Annual Boarding & Tuition
                      </span>
                      <span className="text-2xl font-serif font-extrabold text-navy-950 mt-1 block">
                        {formatFeeRange(school.annualFeesMin, school.annualFeesMax)}
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-gold-400/20 text-gold-800 border border-gold-400/30 text-xs font-bold">
                      Session 2025-2026
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-600 font-medium">One-Time Registration Fee:</span>
                      <span className="font-bold text-navy-950">
                        {formatCurrency(school.feeStructure?.registrationFee || 25000)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-600 font-medium">One-Time Admission Fee:</span>
                      <span className="font-bold text-navy-950">
                        {formatCurrency(school.feeStructure?.admissionFee || 150000)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-600 font-medium">Refundable Security Deposit:</span>
                      <span className="font-bold text-navy-950">
                        {formatCurrency(school.feeStructure?.securityDepositRefundable || 200000)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ADMISSIONS TAB */}
            {activeTab === 'admissions' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-navy-950">
                      Admission Procedure & Timeline
                    </h3>
                    <p className="text-slate-500 text-xs mt-1">
                      Deadline: <strong>{school.admissionProcedure?.applicationDeadline}</strong>
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Step-by-Step Enrolment Journey
                    </h4>
                    <div className="space-y-3">
                      {school.admissionProcedure?.steps?.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                          <span className="w-6 h-6 rounded-lg bg-navy-900 text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-medium text-slate-700 leading-relaxed mt-0.5">
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setIsEnquiryOpen(true)}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-navy-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Start Application / Enquire for {school.name}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sticky Contact & Enquiry Card */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Quick Enquiry Card */}
            <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-850 text-white rounded-3xl p-6 border border-gold-400/30 shadow-xl space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 bg-gold-400/10 px-2.5 py-0.5 rounded-full border border-gold-400/20">
                Direct School Admissions
              </span>
              <h3 className="text-lg font-serif font-bold text-white leading-snug">
                Interested in admission at {school.name}?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with the admissions secretariat. Receive the registration brochure, fee breakdown, and campus tour invitation.
              </p>

              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-navy-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Admission Enquiry</span>
              </button>
            </div>

            {/* Official School Contact Details Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle space-y-4 text-xs">
              <h4 className="text-sm font-bold font-serif text-navy-950 pb-2 border-b border-slate-100">
                Official Contact Directory
              </h4>

              <div className="space-y-3 text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span>{school.address}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  <a href={`tel:${school.contactInfo?.phone}`} className="hover:text-navy-950 font-semibold">
                    {school.contactInfo?.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  <a href={`mailto:${school.contactInfo?.email}`} className="hover:text-navy-950 font-semibold truncate">
                    {school.contactInfo?.email}
                  </a>
                </div>

                {school.contactInfo?.website && (
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-gold-500 flex-shrink-0" />
                    <a
                      href={school.contactInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-navy-950 text-gold-600 font-bold truncate"
                    >
                      Visit Official Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admission Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        preselectedSchool={school}
      />
    </div>
  );
};

export default SchoolDetailsPage;
