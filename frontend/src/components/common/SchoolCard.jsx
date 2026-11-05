import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Star,
  ShieldCheck,
  Scale,
  Check,
  Building,
  GraduationCap,
  Calendar,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { formatFeeRange, formatRating } from '../../utils/formatters';
import { useCompare } from '../../context/CompareContext';

const SchoolCard = ({ school, onEnquire }) => {
  const { isInCompare, toggleCompare } = useCompare();
  const isCompared = isInCompare(school._id || school.slug);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-subtle hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      {/* Top Media Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={school.heroImage}
          alt={school.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          {/* Category / Gender Badge */}
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-navy-950/80 backdrop-blur-md text-white border border-white/20 shadow-sm flex items-center gap-1">
            <Building className="w-3 h-3 text-gold-400" />
            {school.gender === 'Girls Only' ? 'Girls Boarding' : school.boardingType}
          </span>

          {/* Rating Badge */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-navy-950 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{formatRating(school.rating)}</span>
            <span className="text-slate-400 text-[10px]">({school.reviewCount || 42})</span>
          </div>
        </div>

        {/* Bottom overlay: Location & Verified Pill */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-100 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
            <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
            <span className="truncate max-w-[180px]">
              {school.city}, {school.state}
            </span>
          </div>

          {school.isVerified && (
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/90 text-white shadow-sm"
              title="Verified Educational Institution"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified
            </span>
          )}
        </div>
      </div>

      {/* Middle Body Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Curriculum Pills */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            {school.curriculum?.map((board) => (
              <span
                key={board}
                className="px-2 py-0.5 text-[11px] font-semibold rounded bg-slate-100 text-navy-800 border border-slate-200"
              >
                {board}
              </span>
            ))}
            <span className="text-[11px] text-slate-400 font-medium ml-auto flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Estd {school.establishedYear}
            </span>
          </div>

          {/* School Name */}
          <Link
            to={`/schools/${school.slug || school._id}`}
            className="block text-lg font-bold text-navy-900 group-hover:text-navy-700 transition-colors line-clamp-1 font-serif"
          >
            {school.name}
          </Link>

          {/* Overview / Tagline */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {school.tagline || school.overview}
          </p>
        </div>

        {/* Key Attributes Grid */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-medium">
              Annual Fees
            </span>
            <span className="font-bold text-navy-900 text-sm">
              {formatFeeRange(school.annualFeesMin, school.annualFeesMax)}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-medium">
              Grades Offered
            </span>
            <span className="font-semibold text-slate-700 truncate block">
              {school.gradeLevels || 'Grade 1 to 12'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
          {/* Compare Checkbox Button */}
          <button
            onClick={() => toggleCompare(school)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
              isCompared
                ? 'bg-gold-500/10 border-gold-500 text-gold-700'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
            title="Add to school comparison table"
          >
            {isCompared ? (
              <>
                <Check className="w-3.5 h-3.5 text-gold-600" />
                <span>Compared</span>
              </>
            ) : (
              <>
                <Scale className="w-3.5 h-3.5 text-slate-500" />
                <span>Compare</span>
              </>
            )}
          </button>

          {/* View Details Link */}
          <Link
            to={`/schools/${school.slug || school._id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-navy-900 hover:bg-navy-800 text-white shadow-sm transition-all hover:gap-2"
          >
            <span>View Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;

