import React from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Check,
  Building,
  GraduationCap,
  Home,
  Trophy,
  ShieldCheck,
  Calendar,
  Send,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { formatFeeRange, formatRating } from '../../utils/formatters';

const ComparisonTable = ({
  schools = [],
  onRemoveSchool,
  onEnquireSchool,
}) => {
  if (schools.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-subtle max-w-xl mx-auto my-12">
        <div className="w-16 h-16 rounded-full bg-navy-50 text-navy-800 mx-auto flex items-center justify-center mb-4">
          <Building className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-navy-950 mb-2">
          No Schools Selected for Comparison
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm mb-6 max-w-md mx-auto">
          Shortlist up to three premier institutions from our directory to compare their academic curricula, boarding amenities, and total fee schedules side-by-side.
        </p>
        <Link
          to="/schools"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-500 text-navy-950 font-bold text-xs shadow-md hover:scale-105 transition-all"
        >
          <span>Explore Schools Directory</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          {/* Header Row: School Image & Basic Info */}
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70">
              <th className="p-5 w-1/4 align-top text-xs font-bold uppercase tracking-wider text-slate-400">
                School Parameters
              </th>
              {schools.map((school) => (
                <th
                  key={school._id || school.slug}
                  className="p-5 w-1/4 align-top border-l border-slate-200/80 bg-white"
                >
                  <div className="relative group">
                    <button
                      onClick={() => onRemoveSchool(school._id || school.slug)}
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 border border-slate-200 flex items-center justify-center transition-colors shadow-sm"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-slate-100">
                      <img
                        src={school.heroImage}
                        alt={school.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <Link
                      to={`/schools/${school.slug || school._id}`}
                      className="block text-base font-bold font-serif text-navy-950 hover:text-gold-600 line-clamp-2 transition-colors mb-1"
                    >
                      {school.name}
                    </Link>

                    <p className="text-xs text-slate-500 font-medium mb-3">
                      {school.city}, {school.state}
                    </p>

                    <button
                      onClick={() => onEnquireSchool(school)}
                      className="w-full py-2 px-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Admission Enquiry</span>
                    </button>
                  </div>
                </th>
              ))}

              {/* Slot if less than 3 schools */}
              {schools.length < 3 && (
                <th className="p-5 w-1/4 align-middle border-l border-slate-200/80 bg-slate-50/40 text-center">
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-slate-300 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                      <Plus className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-slate-600 mb-2">
                      Add Another School
                    </p>
                    <Link
                      to="/schools"
                      className="px-3 py-1.5 rounded-lg bg-navy-900 text-white text-[11px] font-bold"
                    >
                      Browse Directory
                    </Link>
                  </div>
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {/* Location */}
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                Location & Pin
              </td>
              {schools.map((s) => (
                <td key={s._id} className="p-4 border-l border-slate-100 font-medium">
                  {s.city}, {s.state} {s.pincode ? `(${s.pincode})` : ''}
                </td>
              ))}
              {schools.length < 3 && <td className="p-4 border-l border-slate-100" />}
            </tr>

            {/* School Board / Curriculum */}
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                Curriculum Affiliations
              </td>
              {schools.map((s) => (
                <td key={s._id} className="p-4 border-l border-slate-100">
                  <div className="flex flex-wrap gap-1">
                    {s.curriculum?.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 rounded bg-slate-100 font-bold text-navy-900 border border-slate-200 text-[11px]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
              {schools.length < 3 && <td className="p-4 border-l border-slate-100" />}
            </tr>

            {/* Gender & Category */}
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                Gender Classification
              </td>
              {schools.map((s) => (
                <td key={s._id} className="p-4 border-l border-slate-100">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      s.gender === 'Girls Only'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : s.gender === 'Boys Only'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {s.gender}
                  </span>
                </td>
              ))}
              {schools.length < 3 && <td className="p-4 border-l border-slate-100" />}
            </tr>

            {/* Boarding Type */}
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                Boarding Accommodation
              </td>
              {schools.map((s) => (
                <td key={s._id} className="p-4 border-l border-slate-100 font-semibold text-navy-950">
                  {s.boardingType}
                </td>
              ))}
              {schools.length < 3 && <td className="p-4 border-l border-slate-100" />}
            </tr>

            {/* Annual Tuition & Boarding Fees */}
            <tr className="hover:bg-slate-50/50 transition-colors bg-gold-50/20">
              <td className="p-4 font-bold text-navy-900 bg-gold-50/40">
                Estimated Annual Fees
              </td>
              {schools.map((s) => (
                <td key={s._id} className="p-4 border-l border-slate-100">
                  <div className="font-extrabold text-navy-950 text-sm">
                    {formatFeeRange(s.annualFeesMin, s.annualFeesMax)}
                  </div>
                  {s.feeStructure?.annualTuitionBoarding && (
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {s.feeStructure.annualTuitionBoarding}
                    </p>
                  )}
                </td>
              ))}
              {schools.length < 3 && <td className="p-4 border-l border-slate-100" />}
            </tr>

            {/* Academic Facilities & Ratio */}
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                Academic Framework & Ratio
              </td>
              {schools.map((s) => (
                <td key={s._id} className="p-4 border-l border-slate-100 space-y-1.5">
                  <p>
                    Student-Teacher Ratio:{' '}
                    <strong>{s.academics?.studentTeacherRatio || '10:1'}</strong>
                  </p>
                  <p className="text-slate-500">
                    Streams: {s.academics?.streamOptions?.join(', ') || 'Science, Commerce, Arts'}
                  </p>
                </td>
              ))}
              {schools.length < 3 && <td className="p-4 border-l border-slate-100" />}
            </tr>

            {/* Hostel & Boarding Living */}
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                Hostel Facilities & Rooms
              </td>
              {schools.map((s) => (
                <td key={s._id} className="p-4 border-l border-slate-100 space-y-1">
                  <p className="font-medium text-slate-800">
                    {s.boardingFacilities?.roomSharing || '2-4 students per room'}
                  </p>
                  <div className="flex flex-wrap gap-1 text-[10px] text-slate-500 pt-1">
                    {s.boardingFacilities?.airConditioned && (
                      <span className="px-1.5 py-0.5 bg-slate-100 rounded">AC Dorms</span>
                    )}
                    {s.boardingFacilities?.medicalCare24x7 && (
                      <span className="px-1.5 py-0.5 bg-slate-100 rounded">24/7 Infirmary</span>
                    )}
                    {s.boardingFacilities?.laundryService && (
                      <span className="px-1.5 py-0.5 bg-slate-100 rounded">In-house Laundry</span>
                    )}
                  </div>
                </td>
              ))}
              {schools.length < 3 && <td className="p-4 border-l border-slate-100" />}
            </tr>

            {/* Sports Facilities */}
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                Sports Facilities
              </td>
              {schools.map((s) => (
                <td key={s._id} className="p-4 border-l border-slate-100">
                  <ul className="space-y-1 text-[11px] text-slate-600">
                    {s.sportsFacilities?.slice(0, 5).map((sp) => (
                      <li key={sp} className="flex items-start gap-1">
                        <Check className="w-3.5 h-3.5 text-gold-500 flex-shrink-0 mt-0.5" />
                        <span>{sp}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
              {schools.length < 3 && <td className="p-4 border-l border-slate-100" />}
            </tr>

            {/* Safety & Medical */}
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                Safety & Security
              </td>
              {schools.map((s) => (
                <td key={s._id} className="p-4 border-l border-slate-100">
                  <ul className="space-y-1 text-[11px] text-slate-600">
                    {s.safetyFeatures?.slice(0, 4).map((sf) => (
                      <li key={sf} className="flex items-start gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{sf}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
              {schools.length < 3 && <td className="p-4 border-l border-slate-100" />}
            </tr>

            {/* Admission Information */}
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="p-4 font-bold text-slate-900 bg-slate-50/50">
                Admission Cycle & Application
              </td>
              {schools.map((s) => (
                <td key={s._id} className="p-4 border-l border-slate-100 space-y-1">
                  <p className="font-semibold text-navy-950">
                    {s.admissionProcedure?.applicationDeadline || 'Rolling Admissions'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Eligibility: {s.admissionProcedure?.eligibility || 'Merit assessment'}
                  </p>
                </td>
              ))}
              {schools.length < 3 && <td className="p-4 border-l border-slate-100" />}
            </tr>

            {/* Direct Action Bottom Row */}
            <tr className="bg-slate-50/80">
              <td className="p-5 font-bold text-slate-900">
                Action
              </td>
              {schools.map((s) => (
                <td key={s._id} className="p-5 border-l border-slate-200">
                  <button
                    onClick={() => onEnquireSchool(s)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-navy-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enquire for {s.name.split(' ')[0]}</span>
                  </button>
                </td>
              ))}
              {schools.length < 3 && <td className="p-5 border-l border-slate-200" />}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
