import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import enquiryService from '../services/enquiryService';
import { useToast } from '../context/ToastContext';

const ContactPage = () => {
  const { success, error: toastError } = useToast();
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    studentName: '',
    currentClass: 'General Inquiry',
    preferredAdmissionYear: '2025-2026',
    schoolName: 'Eduminatti Advisory Hub',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.parentName || !formData.email || !formData.phone) {
      toastError('Please fill in your name, email, and phone number.');
      return;
    }

    setLoading(true);
    try {
      await enquiryService.submitEnquiry({
        ...formData,
        studentName: formData.studentName || formData.parentName,
      });
      setSubmitted(true);
      success('Message sent! Our admissions team will reach out within 24 hours.');
    } catch (err) {
      toastError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      {/* Header */}
      <div className="bg-navy-950 text-white py-16 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20 inline-flex items-center gap-1.5 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Admissions Advisory Desk
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">
              Contact Eduminatti
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              Have questions regarding admissions deadlines, school rankings, or boarding pastoral care? Speak directly with our education consultants.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-subtle space-y-6">
              <h3 className="text-xl font-bold font-serif text-navy-950 pb-3 border-b border-slate-100">
                Admissions Headquarters
              </h3>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-gold-500" />
                  </div>
                  <div>
                    <strong className="text-navy-950 block mb-0.5">Physical Campus Address:</strong>
                    <span>Rajpur Road Education Corridor, Dehradun, Uttarakhand 248001, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-gold-500" />
                  </div>
                  <div>
                    <strong className="text-navy-950 block mb-0.5">Admissions Hotline:</strong>
                    <span>+91 (135) 275-0000 / +91 (955) 729-1888</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-gold-500" />
                  </div>
                  <div>
                    <strong className="text-navy-950 block mb-0.5">Email Inquiries:</strong>
                    <span>admissions@eduminatti.mock / counsel@eduminatti.mock</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-gold-500" />
                  </div>
                  <div>
                    <strong className="text-navy-950 block mb-0.5">Working Hours:</strong>
                    <span>Monday – Saturday: 9:00 AM – 6:30 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Helpline Banner */}
            <div className="bg-gradient-to-br from-navy-950 to-navy-900 text-white p-7 rounded-3xl border border-navy-800 shadow-premium">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400">
                Emergency Admission Support
              </span>
              <h4 className="text-base font-bold font-serif text-white mt-1 mb-2">
                Need urgent placement assistance?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with our Senior Pastoral Lead for mid-term transfer consultations and scholarship availability.
              </p>
            </div>
          </div>

          {/* Contact & Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-subtle">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-navy-950">
                  Message Dispatched Successfully!
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
                  Thank you for contacting Eduminatti. A dedicated education counsellor has been notified and will reach out to <strong>{formData.email}</strong> shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-xs"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <h3 className="text-xl font-bold font-serif text-navy-950 mb-1">
                    Send an Admission Inquiry
                  </h3>
                  <p className="text-slate-500 text-xs">
                    Please provide your contact details and message below.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.parentName}
                      onChange={(e) =>
                        setFormData({ ...formData, parentName: e.target.value })
                      }
                      placeholder="e.g. Vikramaditya Rathore"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Student Name
                    </label>
                    <input
                      type="text"
                      value={formData.studentName}
                      onChange={(e) =>
                        setFormData({ ...formData, studentName: e.target.value })
                      }
                      placeholder="e.g. Devraj Rathore"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="parent@example.com"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+91 9876543210"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Message / Query *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about the schools you are evaluating, seeking grade level, boarding preference, or specific fee questions..."
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white text-xs leading-relaxed"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 text-navy-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Transmitting Message...' : 'Send Admission Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
