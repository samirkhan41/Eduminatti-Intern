import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Send,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  BookmarkCheck,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import enquiryService from '../services/enquiryService';

const UserProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { success, error: toastError } = useToast();
  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'enquiries'); // 'enquiries' | 'profile' | 'saved'
  const [enquiries, setEnquiries] = useState([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(true);

  // Profile form state
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [city, setCity] = useState(user?.city || '');
  const [password, setPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setCity(user.city || '');
    }
  }, [user]);

  useEffect(() => {
    const fetchMyEnquiries = async () => {
      try {
        const res = await enquiryService.getMyEnquiries();
        if (res.success && res.data) {
          setEnquiries(res.data);
        }
      } catch (err) {
        console.error('Error fetching user enquiries:', err);
      } finally {
        setLoadingEnquiries(false);
      }
    };

    fetchMyEnquiries();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const payload = { name, phone, city };
      if (password.trim()) payload.password = password;

      await updateProfile(payload);
      success('Profile details updated successfully!');
      setPassword('');
    } catch (err) {
      toastError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Review':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Contacted':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Admission Offered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Closed':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      <div className="bg-navy-950 text-white py-10 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gold-400/20 text-gold-300 border border-gold-400/30 flex items-center justify-center font-bold text-xl">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {user?.name || 'My Account'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gold-400 text-navy-950 uppercase tracking-wide">
                  {user?.role || 'Parent'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Sidebar */}
          <aside className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-3 shadow-subtle space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('enquiries')}
              className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${
                activeTab === 'enquiries'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                <span>My Admission Enquiries</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white">
                {enquiries.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-2 p-3 rounded-2xl transition-all ${
                activeTab === 'profile'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Personal Profile & Contact</span>
            </button>
          </aside>

          {/* Right Main Content */}
          <main className="lg:col-span-9 space-y-6">
            {/* TAB: MY ENQUIRIES */}
            {activeTab === 'enquiries' && (
              <div className="space-y-4">
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-serif font-bold text-navy-950">
                      Submitted Admission Enquiries
                    </h2>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Track the status of your applications and view direct counsellor feedback.
                    </p>
                  </div>
                  <Link
                    to="/schools"
                    className="px-4 py-2 rounded-xl bg-navy-900 text-white font-bold text-xs shadow-sm hover:bg-navy-800 transition-colors"
                  >
                    + Enquire to Another School
                  </Link>
                </div>

                {loadingEnquiries ? (
                  <div className="space-y-3">
                    {[1, 2].map((n) => (
                      <div key={n} className="h-36 bg-white rounded-3xl border border-slate-200 animate-pulse" />
                    ))}
                  </div>
                ) : enquiries.length > 0 ? (
                  <div className="space-y-4">
                    {enquiries.map((enq) => (
                      <div
                        key={enq._id}
                        className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                              Target Educational Institution
                            </span>
                            <h3 className="text-base font-bold font-serif text-navy-950">
                              {enq.schoolName}
                            </h3>
                          </div>
                          <span
                            className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                              enq.status
                            )}`}
                          >
                            Status: {enq.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600">
                          <div>
                            <span className="text-slate-400 block text-[10px] font-medium">Student:</span>
                            <span className="font-semibold text-slate-900">{enq.studentName}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px] font-medium">Seeking Class:</span>
                            <span className="font-semibold text-slate-900">{enq.currentClass}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px] font-medium">Session:</span>
                            <span className="font-semibold text-slate-900">{enq.preferredAdmissionYear}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px] font-medium">Submitted:</span>
                            <span className="font-semibold text-slate-900">
                              {new Date(enq.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {enq.message && (
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 italic">
                            "{enq.message}"
                          </div>
                        )}

                        {enq.counselorNotes && (
                          <div className="p-3 rounded-xl bg-gold-50/60 border border-gold-200 text-xs text-navy-950 space-y-1">
                            <span className="font-bold flex items-center gap-1.5 text-gold-800">
                              <Sparkles className="w-3.5 h-3.5" />
                              Counsellor Update / Action:
                            </span>
                            <p className="leading-relaxed">{enq.counselorNotes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-subtle">
                    <Send className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-navy-950 font-serif">
                      No Enquiries Submitted Yet
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                      Explore schools in our directory and submit admission requests to receive direct brochures and callbacks.
                    </p>
                    <Link
                      to="/schools"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-xs"
                    >
                      Browse Schools
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* TAB: PROFILE DETAILS */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-subtle space-y-6">
                <div>
                  <h2 className="text-lg font-serif font-bold text-navy-950">
                    Personal Profile Details
                  </h2>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Update your contact details so admission desks can reach you with application paperwork.
                  </p>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs max-w-lg">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Address (Read-only)</label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || ''}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-500 bg-slate-100 text-xs cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">City / Residential Location</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. New Delhi"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      New Password (leave blank to keep unchanged)
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white text-xs"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isUpdating ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

