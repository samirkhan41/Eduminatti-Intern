import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';

const CompareFloatingBar = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (!compareList || compareList.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-3xl bg-navy-950/95 backdrop-blur-md text-white border border-navy-700/80 rounded-2xl p-3 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left Info & Badges */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-9 h-9 rounded-xl bg-gold-400/20 text-gold-300 flex items-center justify-center flex-shrink-0 border border-gold-400/30">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                School Comparison
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-400 text-navy-950">
                {compareList.length} of 3 selected
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Side-by-side analysis of fees, academics, boarding & sports
            </p>
          </div>
        </div>

        {/* Selected School Chips */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
          {compareList.map((school) => (
            <div
              key={school._id || school.slug}
              className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-xl bg-navy-800 border border-navy-700 text-xs font-medium text-slate-200 flex-shrink-0 max-w-[160px]"
            >
              <img
                src={school.heroImage}
                alt={school.name}
                className="w-5 h-5 rounded-md object-cover flex-shrink-0"
              />
              <span className="truncate text-[11px]">{school.name}</span>
              <button
                onClick={() => removeFromCompare(school._id || school.slug)}
                className="text-slate-400 hover:text-red-400 p-0.5 rounded transition-colors"
                title="Remove from comparison"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={clearCompare}
            className="p-2 text-slate-400 hover:text-red-400 transition-colors"
            title="Clear all selected"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <Link
            to="/compare"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-navy-950 text-xs font-bold shadow-md transition-all whitespace-nowrap"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompareFloatingBar;
