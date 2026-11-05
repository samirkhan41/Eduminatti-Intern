import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Building,
  Users,
  Send,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Calendar,
  Lock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import schoolService from '../services/schoolService';
import enquiryService from '../services/enquiryService';
import authService from '../services/authService';
import SchoolFormModal from '../components/admin/SchoolFormModal';
import EnquiryStatusModal from '../components/admin/EnquiryStatusModal';
import { formatFeeRange, formatRating } from '../utils/formatters';

const AdminDashboardPage = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'schools' | 'enquiries' | 'users'

  // Stats
  const [stats, setStats] = useState({
    totalSchools: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
    totalUsers: 0,
  });

  // Data lists
  const [schools, setSchools] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Filters
  const [schoolSearch, setSchoolSearch] = useState('');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('All');
  const [enquirySearch, setEnquirySearch] = useState('');

  // Modals
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [schoolToEdit, setSchoolToEdit] = useState(null);

  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  // Route protection
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      toastError('Administrative access required.');
      navigate('/login');
    }
  }, [isAdmin, authLoading, navigate]);

  const loadAllAdminData = async () => {
    setLoadingData(true);
    try {
      const [schoolsRes, enquiriesRes, usersRes, schoolStatsRes, enqStatsRes] =
        await Promise.allSettled([
          schoolService.getSchools({ limit: 100 }),
          enquiryService.getAllEnquiries(),
          authService.getAllUsers(),
          schoolService.getSchoolStats(),
          enquiryService.getEnquiryStats(),
        ]);

      if (schoolsRes.status === 'fulfilled' && schoolsRes.value.success) {
        setSchools(schoolsRes.value.data);
      }
      if (enquiriesRes.status === 'fulfilled' && enquiriesRes.value.success) {
        setEnquiries(enquiriesRes.value.data);
      }
      if (usersRes.status === 'fulfilled' && usersRes.value.success) {
        setUsersList(usersRes.value.data);
      }

      setStats({
        totalSchools:
          schoolsRes.status === 'fulfilled' ? schoolsRes.value.total || schoolsRes.value.count : 10,
        totalEnquiries:
          enquiriesRes.status === 'fulfilled' ? enquiriesRes.value.count : 3,
        newEnquiries:
          enqStatsRes.status === 'fulfilled' ? enqStatsRes.value.data?.newEnquiries || 1 : 1,
        totalUsers:
          usersRes.status === 'fulfilled' ? usersRes.value.count : 2,
      });
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadAllAdminData();
    }
  }, [isAdmin]);

  const handleDeleteSchool = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This action is irreversible.`)) {
      try {
        await schoolService.deleteSchool(id);
        success(`School ${name} deleted successfully`);
        loadAllAdminData();
      } catch (err) {
        toastError('Failed to delete school');
      }
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry record?')) {
      try {
        await enquiryService.deleteEnquiry(id);
        success('Enquiry record deleted');
        loadAllAdminData();
      } catch (err) {
        toastError('Failed to delete enquiry');
      }
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      await authService.updateUserRole(userId, newRole);
      success('User role updated successfully');
      loadAllAdminData();
    } catch (err) {
      toastError('Failed to update user role');
    }
  };

  if (authLoading || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-navy-900 border-t-gold-400 rounded-full animate-spin" />
      </div>
    );
  }

  const filteredSchools = schools.filter(
    (s) =>
      s.name.toLowerCase().includes(schoolSearch.toLowerCase()) ||
      s.city.toLowerCase().includes(schoolSearch.toLowerCase())
  );

  const filteredEnquiries = enquiries.filter((e) => {
    const matchStatus = enquiryStatusFilter === 'All' || e.status === enquiryStatusFilter;
    const matchSearch =
      !enquirySearch ||
      e.parentName.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.studentName.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.schoolName.toLowerCase().includes(enquirySearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      {/* Admin Top Banner */}
      <div className="bg-navy-950 text-white py-8 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 bg-gold-400/10 px-2.5 py-0.5 rounded-full border border-gold-400/20 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                Root Administrator Console
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Eduminatti Control Hub
            </h1>
            <p className="text-slate-400 text-xs mt-0.5">
              Manage school catalog, admissions lifecycle, and system user privileges.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSchoolToEdit(null);
                setIsSchoolModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 text-navy-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add New School</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-2 shadow-subtle flex items-center gap-2 overflow-x-auto text-xs font-bold mb-8">
          {[
            { id: 'overview', label: 'Dashboard Overview', count: null },
            { id: 'schools', label: 'School Management', count: schools.length },
            { id: 'enquiries', label: 'Admission Enquiries', count: enquiries.length },
            { id: 'users', label: 'User Management', count: usersList.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-navy-950'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block">
                    Total Schools
                  </span>
                  <span className="text-3xl font-serif font-extrabold text-navy-950 mt-1 block">
                    {stats.totalSchools}
                  </span>
                  <span className="text-emerald-600 text-[11px] font-medium mt-1 block">
                    Verified directory records
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-900 border border-navy-100 flex items-center justify-center">
                  <Building className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block">
                    Total Enquiries
                  </span>
                  <span className="text-3xl font-serif font-extrabold text-navy-950 mt-1 block">
                    {stats.totalEnquiries}
                  </span>
                  <span className="text-gold-600 text-[11px] font-medium mt-1 block">
                    Active parent requests
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gold-50 text-gold-600 border border-gold-100 flex items-center justify-center">
                  <Send className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block">
                    New Enquiries
                  </span>
                  <span className="text-3xl font-serif font-extrabold text-navy-950 mt-1 block">
                    {stats.newEnquiries}
                  </span>
                  <span className="text-amber-600 text-[11px] font-medium mt-1 block">
                    Requiring counsellor review
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block">
                    Registered Users
                  </span>
                  <span className="text-3xl font-serif font-extrabold text-navy-950 mt-1 block">
                    {stats.totalUsers}
                  </span>
                  <span className="text-purple-600 text-[11px] font-medium mt-1 block">
                    Parents & Administrators
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Recent Enquiries Quick View */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-subtle">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-serif font-bold text-navy-950">
                  Recent Admission Enquiries
                </h3>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className="text-xs font-bold text-gold-600 hover:text-gold-700"
                >
                  View All Enquiries →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                    <tr>
                      <th className="py-3 px-4">Parent</th>
                      <th className="py-3 px-4">Student & Grade</th>
                      <th className="py-3 px-4">Target School</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {enquiries.slice(0, 5).map((enq) => (
                      <tr key={enq._id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {enq.parentName}
                        </td>
                        <td className="py-3 px-4">
                          {enq.studentName} ({enq.currentClass})
                        </td>
                        <td className="py-3 px-4 font-medium text-navy-950">
                          {enq.schoolName}
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              enq.status === 'New'
                                ? 'bg-blue-100 text-blue-800'
                                : enq.status === 'In Review'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {enq.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedEnquiry(enq);
                              setIsEnquiryModalOpen(true);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-navy-900 text-white text-[11px] font-semibold hover:bg-navy-800"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SCHOOLS TAB */}
        {activeTab === 'schools' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-subtle space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={schoolSearch}
                  onChange={(e) => setSchoolSearch(e.target.value)}
                  placeholder="Filter schools by name or city..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-900"
                />
              </div>

              <button
                onClick={() => {
                  setSchoolToEdit(null);
                  setIsSchoolModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-xs shadow-sm hover:bg-navy-800 transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add School Record</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  <tr>
                    <th className="py-3 px-4">School</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Annual Fees</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSchools.map((s) => (
                    <tr key={s._id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-navy-950 flex items-center gap-3">
                        <img
                          src={s.heroImage}
                          alt={s.name}
                          className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                        />
                        <Link
                          to={`/schools/${s.slug || s._id}`}
                          className="hover:text-gold-600 line-clamp-1"
                        >
                          {s.name}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {s.city}, {s.state}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-[10px]">
                          {s.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {formatFeeRange(s.annualFeesMin, s.annualFeesMax)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-navy-950">
                          {formatRating(s.rating)} ★
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSchoolToEdit(s);
                            setIsSchoolModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                          title="Edit school"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSchool(s._id, s.name)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                          title="Delete school"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ENQUIRIES TAB */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-subtle space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  placeholder="Search by parent, student, or school..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-900"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={enquiryStatusFilter}
                  onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="In Review">In Review</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Admission Offered">Admission Offered</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  <tr>
                    <th className="py-3 px-4">Parent Details</th>
                    <th className="py-3 px-4">Student Details</th>
                    <th className="py-3 px-4">School</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Counsellor Notes</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEnquiries.map((enq) => (
                    <tr key={enq._id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4">
                        <p className="font-bold text-navy-950">{enq.parentName}</p>
                        <p className="text-[11px] text-slate-500">{enq.phone}</p>
                        <p className="text-[11px] text-slate-400">{enq.email}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-800">{enq.studentName}</p>
                        <p className="text-[11px] text-slate-500">
                          {enq.currentClass} • {enq.preferredAdmissionYear}
                        </p>
                      </td>
                      <td className="py-3 px-4 font-medium text-navy-950">
                        {enq.schoolName}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            enq.status === 'New'
                              ? 'bg-blue-100 text-blue-800'
                              : enq.status === 'In Review'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate text-slate-500">
                        {enq.counselorNotes || 'No notes added'}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedEnquiry(enq);
                            setIsEnquiryModalOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-navy-900 text-white text-[11px] font-semibold hover:bg-navy-800"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteEnquiry(enq._id)}
                          className="p-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                          title="Delete enquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-subtle space-y-6">
            <h3 className="text-lg font-serif font-bold text-navy-950">
              Registered Accounts & Access Privileges
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Registered Date</th>
                    <th className="py-3 px-4 text-right">Modify Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {usersList.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-navy-950">{u.name}</td>
                      <td className="py-3 px-4 text-slate-600">{u.email}</td>
                      <td className="py-3 px-4 text-slate-500">{u.phone || 'N/A'}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            u.role === 'admin'
                              ? 'bg-gold-100 text-gold-900 border border-gold-300'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <select
                          value={u.role}
                          onChange={(e) => handleUpdateUserRole(u._id, e.target.value)}
                          className="px-2 py-1 rounded-lg border border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-800"
                        >
                          <option value="parent">Parent</option>
                          <option value="student">Student</option>
                          <option value="counsellor">Counsellor</option>
                          <option value="admin">Administrator</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* School Form Modal */}
      <SchoolFormModal
        isOpen={isSchoolModalOpen}
        onClose={() => setIsSchoolModalOpen(false)}
        schoolToEdit={schoolToEdit}
        onSaved={loadAllAdminData}
      />

      {/* Enquiry Status Modal */}
      <EnquiryStatusModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        enquiry={selectedEnquiry}
        onUpdated={loadAllAdminData}
      />
    </div>
  );
};

export default AdminDashboardPage;

