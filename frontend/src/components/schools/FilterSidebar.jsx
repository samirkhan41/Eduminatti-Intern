import React from 'react';
import {
  RotateCcw,
  SlidersHorizontal,
  X,
  Filter,
  Check,
} from 'lucide-react';

const categories = [
  'All Categories',
  'Girls Boarding Schools',
  'Boarding Schools',
  'Boys Boarding Schools',
  'International Schools',
  'Day Schools',
  'Residential Schools',
];

const genders = ['All', 'Girls Only', 'Boys Only', 'Co-Educational'];

const boardingTypes = [
  'All',
  'Full Boarding',
  'Day Boarding',
  'Weekly Boarding',
  'Day School',
];

const curricula = ['CBSE', 'ICSE', 'ISC', 'IB', 'CIE'];

const cities = [
  'All Cities',
  'Dehradun',
  'Mussoorie',
  'Ajmer',
  'Gwalior',
  'Kasauli',
  'Bengaluru',
  'Gurugram',
];

const FilterSidebar = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  isMobile = false,
  onCloseMobile,
}) => {
  const handleCurriculumToggle = (curr) => {
    let current = filters.curriculum ? filters.curriculum.split(',') : [];
    if (current.includes(curr)) {
      current = current.filter((c) => c !== curr);
    } else {
      current.push(curr);
    }
    onFilterChange('curriculum', current.join(','));
  };

  return (
    <div
      className={`bg-white rounded-3xl border border-slate-200/80 p-6 shadow-subtle ${
        isMobile ? 'h-full overflow-y-auto' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-navy-900" />
          <h3 className="text-base font-bold text-navy-950 font-serif">
            Filters
          </h3>
          {totalResults !== undefined && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {totalResults} found
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs font-semibold text-gold-600 hover:text-gold-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          {isMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6 text-xs">
        {/* City Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
            City / Region
          </label>
          <select
            value={filters.city || 'All Cities'}
            onChange={(e) => onFilterChange('city', e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 font-medium"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
            School Category
          </label>
          <div className="space-y-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onFilterChange('category', cat)}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                  (filters.category || 'All Categories') === cat
                    ? 'bg-navy-900 text-white font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{cat}</span>
                {(filters.category || 'All Categories') === cat && (
                  <Check className="w-3.5 h-3.5" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Gender Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
            Gender Classification
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {genders.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => onFilterChange('gender', g)}
                className={`px-3 py-2 rounded-xl text-center transition-all ${
                  (filters.gender || 'All') === g
                    ? 'bg-navy-900 text-white font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Boarding Type Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
            Boarding Accommodation
          </label>
          <div className="space-y-1.5">
            {boardingTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onFilterChange('boardingType', type)}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                  (filters.boardingType || 'All') === type
                    ? 'bg-navy-900 text-white font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{type}</span>
                {(filters.boardingType || 'All') === type && (
                  <Check className="w-3.5 h-3.5" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Curriculum Checkboxes */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
            Board & Curriculum
          </label>
          <div className="flex flex-wrap gap-1.5">
            {curricula.map((curr) => {
              const selectedList = filters.curriculum
                ? filters.curriculum.split(',')
                : [];
              const isSelected = selectedList.includes(curr);
              return (
                <button
                  key={curr}
                  type="button"
                  onClick={() => handleCurriculumToggle(curr)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all border ${
                    isSelected
                      ? 'bg-gold-500 border-gold-600 text-navy-950 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {curr}
                </button>
              );
            })}
          </div>
        </div>

        {/* Annual Fee Budget Range */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
            Annual Fees (INR Lakhs)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-slate-400 block mb-1">Min (INR)</span>
              <input
                type="number"
                placeholder="e.g. 300000"
                value={filters.minFees || ''}
                onChange={(e) => onFilterChange('minFees', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 bg-slate-50 focus:bg-white text-xs"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block mb-1">Max (INR)</span>
              <input
                type="number"
                placeholder="e.g. 1500000"
                value={filters.maxFees || ''}
                onChange={(e) => onFilterChange('maxFees', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 bg-slate-50 focus:bg-white text-xs"
              />
            </div>
          </div>
        </div>

        {isMobile && (
          <div className="pt-4">
            <button
              onClick={onCloseMobile}
              className="w-full py-3 rounded-xl bg-navy-900 text-white font-bold text-xs shadow-md"
            >
              Apply Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
