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

const SchoolListItem = ({ school, onEnquire }) => {
  const { isInCompare, toggleCompare } = useCompare();
  const isCompared = isInCompare(school._id || school.slug);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-subtle hover:shadow-premium transition-all duration-300 p-4 sm:p-5 flex flex-col md:flex-row gap-5 items-stretch">
      {/* Thumbnail */}
      <div className="relative md:w-64 aspect-[16/10] md:aspect-auto rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
        <img
          src={school.heroImage}
          alt={school.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-navy-950/80 backdrop-blur-md text-white border border-white/20">
            {school.gender === 'Girls Only' ? 'Girls Boarding' : school.boardingType}
          </span>
        </div>
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-navy-950 shadow-sm">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{formatRating(school.rating)}</span>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                <MapPin className="w-3.5 h-3.5 text-gold-500" />
                {school.city}, {school.state}
              </span>
              {school.isVerified && (
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {school.curriculum?.map((board) => (
                <span
                  key={board}
                  className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-100 text-navy-800 border border-slate-200"
                >
                  {board}
                </span>
              ))}
            </div>
          </div>

          <Link
            to={`/schools/${school.slug || school._id}`}
            className="text-lg font-bold font-serif text-navy-900 group-hover:text-navy-700 transition-colors"
          >
            {school.name}
          </Link>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {school.overview}
          </p>

          {/* Quick tags */}
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-600">
            <span className="bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
              Ratio: <strong>{school.academics?.studentTeacherRatio || '10:1'}</strong>
            </span>
            <span className="bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
              Grades: <strong>{school.gradeLevels || 'Grade 1-12'}</strong>
            </span>
            <span className="bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
              Estd: <strong>{school.establishedYear}</strong>
            </span>
          </div>
        </div>

        {/* Footer info & CTA */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
              Annual Fees
            </span>
            <span className="font-bold text-navy-900 text-sm">
              {formatFeeRange(school.annualFeesMin, school.annualFeesMax)}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => toggleCompare(school)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                isCompared
                  ? 'bg-gold-500/10 border-gold-500 text-gold-700'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              {isCompared ? <Check className="w-3.5 h-3.5 text-gold-600" /> : <Scale className="w-3.5 h-3.5" />}
              <span>{isCompared ? 'Added' : 'Compare'}</span>
            </button>

            <Link
              to={`/schools/${school.slug || school._id}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-sm transition-all"
            >
              <span>View Profile</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolListItem;

