import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  LayoutGrid,
  List,
  SlidersHorizontal,
  ArrowUpDown,
  Building,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import SchoolCard from '../components/common/SchoolCard';
import SchoolListItem from '../components/schools/SchoolListItem';
import FilterSidebar from '../components/schools/FilterSidebar';
import EnquiryModal from '../components/common/EnquiryModal';
import schoolService from '../services/schoolService';

const SchoolsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [schools, setSchools] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Enquiry modal state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedSchoolForEnquiry, setSelectedSchoolForEnquiry] = useState(null);

  // Read filters from URL search params
  const search = searchParams.get('search') || '';
  const city = searchParams.get('city') || '';
  const category = searchParams.get('category') || '';
  const gender = searchParams.get('gender') || '';
  const boardingType = searchParams.get('boardingType') || '';
  const curriculum = searchParams.get('curriculum') || '';
  const minFees = searchParams.get('minFees') || '';
  const maxFees = searchParams.get('maxFees') || '';
  const sort = searchParams.get('sort') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const filters = {
    search,
    city,
    category,
    gender,
    boardingType,
    curriculum,
    minFees,
    maxFees,
    sort,
    page,
  };

  useEffect(() => {
    const fetchSchools = async () => {
      setLoading(true);
      try {
        const queryParams = {};
        if (search) queryParams.search = search;
        if (city && city !== 'All Cities') queryParams.city = city;
        if (category && category !== 'All Categories') queryParams.category = category;
        if (gender && gender !== 'All') queryParams.gender = gender;
        if (boardingType && boardingType !== 'All') queryParams.boardingType = boardingType;
        if (curriculum) queryParams.curriculum = curriculum;
        if (minFees) queryParams.minFees = minFees;
        if (maxFees) queryParams.maxFees = maxFees;
        if (sort) queryParams.sort = sort;
        queryParams.page = page;
        queryParams.limit = 9;

        const res = await schoolService.getSchools(queryParams);
        if (res.success) {
          setSchools(res.data);
          setTotal(res.total);
          setTotalPages(res.pages);
        }
      } catch (err) {
        console.error('Error fetching schools:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams]);

  const updateFilters = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'All' && value !== 'All Cities' && value !== 'All Categories') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1'); // Reset to page 1 on filter change
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
  };

  const handleOpenEnquiry = (school) => {
    setSelectedSchoolForEnquiry(school);
    setIsEnquiryOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      {/* Page Header Banner */}
      <div className="bg-navy-950 text-white py-12 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20 inline-flex items-center gap-1.5 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Comprehensive Directory
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white">
              Discover Premier Schools in India
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              Explore verified school profiles, examine hostel amenities, compare academic curricula, and connect directly with admission desks.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="mt-8 max-w-2xl relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => updateFilters('search', e.target.value)}
              placeholder="Search by school name, city, board or keyword..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 text-sm font-medium border border-slate-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>
        </div>
      </div>

      {/* Main Listing Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-28">
            <FilterSidebar
              filters={filters}
              onFilterChange={updateFilters}
              onResetFilters={handleResetFilters}
              totalResults={total}
            />
          </aside>

          {/* Mobile Filter Drawer */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden bg-navy-950/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
              <div className="w-full max-w-xs bg-white h-full shadow-2xl p-4 overflow-y-auto animate-in slide-in-from-right duration-200">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={updateFilters}
                  onResetFilters={handleResetFilters}
                  totalResults={total}
                  isMobile={true}
                  onCloseMobile={() => setIsMobileFilterOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Right School List & Controls */}
          <main className="flex-1 w-full">
            {/* Top Toolbar */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-subtle mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-900 text-white text-xs font-bold"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                </button>

                <p className="text-xs font-medium text-slate-500">
                  Showing <strong className="text-navy-950">{schools.length}</strong> of{' '}
                  <strong className="text-navy-950">{total}</strong> schools
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Sorting Select */}
                <div className="flex items-center gap-1.5 text-xs">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={sort}
                    onChange={(e) => updateFilters('sort', e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-navy-900 cursor-pointer"
                  >
                    <option value="">Featured / Popular</option>
                    <option value="fees_asc">Fees: Low to High</option>
                    <option value="fees_desc">Fees: High to Low</option>
                    <option value="name_asc">Name: A to Z</option>
                    <option value="name_desc">Name: Z to A</option>
                    <option value="rating_desc">Highest Rated</option>
                  </select>
                </div>

                {/* View Mode Toggle: Grid vs List */}
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden p-0.5 bg-slate-50">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-white text-navy-950 shadow-sm'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-white text-navy-950 shadow-sm'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* School Cards or List View */}
            {loading ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="bg-white rounded-2xl h-80 animate-pulse border border-slate-200"
                  />
                ))}
              </div>
            ) : schools.length > 0 ? (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {schools.map((school) => (
                      <SchoolCard
                        key={school._id || school.slug}
                        school={school}
                        onEnquire={handleOpenEnquiry}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {schools.map((school) => (
                      <SchoolListItem
                        key={school._id || school.slug}
                        school={school}
                        onEnquire={handleOpenEnquiry}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handlePageChange(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="p-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {[...Array(totalPages)].map((_, i) => {
                      const p = i + 1;
                      return (
                        <button
                          key={p}
                          onClick={() => handlePageChange(p)}
                          className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                            page === p
                              ? 'bg-navy-900 text-white shadow-md'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="p-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-subtle my-8">
                <Building className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold font-serif text-navy-950 mb-2">
                  No Institutions Matched Your Criteria
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto mb-6">
                  Try adjusting your fee limits, choosing "All Cities", or clearing the search keyword to browse the wider directory.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-navy-900 text-white text-xs font-bold shadow-md hover:bg-navy-800 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </main>
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

export default SchoolsPage;
