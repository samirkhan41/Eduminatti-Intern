import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Building,
  CheckCircle2,
  Calendar,
  User,
  Mail,
  Phone,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import enquiryService from '../../services/enquiryService';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

const EnquiryModal = ({ isOpen, onClose, preselectedSchool = null }) => {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();

  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    studentName: '',
    currentClass: 'Grade 6',
    preferredAdmissionYear: '2025-2026',
    schoolName: '',
    schoolId: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setFormErrors({});
      setFormData({
        parentName: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        studentName: '',
        currentClass: 'Grade 6',
        preferredAdmissionYear: '2025-2026',
        schoolName: preselectedSchool?.name || 'General Admission Advisory',
        schoolId: preselectedSchool?._id || '',
        message: '',
      });
    }
  }, [isOpen, preselectedSchool, user]);

  if (!isOpen) return null;

  const validate = () => {
    const errors = {};
    if (!formData.parentName.trim()) errors.parentName = 'Parent name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Contact number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      errors.phone = 'Please provide a valid phone number';
    }
    if (!formData.studentName.trim()) errors.studentName = 'Student name is required';
    if (!formData.currentClass) errors.currentClass = 'Class/Grade is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        parentName: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        studentName: formData.studentName,
        currentClass: formData.currentClass,
        preferredAdmissionYear: formData.preferredAdmissionYear,
        school: formData.schoolId || null,
        schoolName: formData.schoolName,
        message: formData.message,
      };

      const res = await enquiryService.submitEnquiry(payload);
      if (res.success) {
        setIsSubmitted(true);
        success('Admission enquiry submitted successfully!');
      }
    } catch (err) {
      toastError(err.response?.data?.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold-400" />
              Direct Admission Inquiry
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            {preselectedSchool ? preselectedSchool.name : 'School Admission Enquiry'}
          </h2>
          <p className="text-slate-300 text-xs mt-1">
            Fill in the details below. Our senior admissions counsellors will contact you within 24 hours.
          </p>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-navy-900 font-serif">
              Enquiry Submitted Successfully!
            </h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
              Thank you for reaching out, <strong>{formData.parentName}</strong>. Your enquiry for{' '}
              <strong>{formData.studentName}</strong> regarding{' '}
              <strong>{formData.schoolName}</strong> has been assigned to a dedicated educational counsellor.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 space-y-1">
              <p>We have sent a confirmation copy to: <strong>{formData.email}</strong></p>
              <p>Direct Admissions Helpline: <strong>+91 (135) 275-0000</strong></p>
            </div>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm shadow-md"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
            {preselectedSchool && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-navy-50/60 border border-navy-100">
                <Building className="w-5 h-5 text-navy-700 flex-shrink-0" />
                <div className="text-xs truncate">
                  <span className="text-slate-500 block">Selected School:</span>
                  <span className="font-bold text-navy-900">{preselectedSchool.name}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Parent Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Parent / Guardian Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) =>
                      setFormData({ ...formData, parentName: e.target.value })
                    }
                    placeholder="e.g. Dr. Ramesh Gupta"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-800 text-xs ${
                      formErrors.parentName ? 'border-red-400' : 'border-slate-300'
                    }`}
                  />
                </div>
                {formErrors.parentName && (
                  <p className="text-[11px] text-red-500 mt-0.5">{formErrors.parentName}</p>
                )}
              </div>

              {/* Student Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Name *
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) =>
                      setFormData({ ...formData, studentName: e.target.value })
                    }
                    placeholder="e.g. Aarav Gupta"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-800 text-xs ${
                      formErrors.studentName ? 'border-red-400' : 'border-slate-300'
                    }`}
                  />
                </div>
                {formErrors.studentName && (
                  <p className="text-[11px] text-red-500 mt-0.5">{formErrors.studentName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="parent@example.com"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-800 text-xs ${
                      formErrors.email ? 'border-red-400' : 'border-slate-300'
                    }`}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-[11px] text-red-500 mt-0.5">{formErrors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+91 9876543210"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-800 text-xs ${
                      formErrors.phone ? 'border-red-400' : 'border-slate-300'
                    }`}
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-[11px] text-red-500 mt-0.5">{formErrors.phone}</p>
                )}
              </div>

              {/* Current Class */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Seeking Admission In *
                </label>
                <select
                  value={formData.currentClass}
                  onChange={(e) =>
                    setFormData({ ...formData, currentClass: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-800 text-xs"
                >
                  <option value="Pre-Primary / Kindergarten">Pre-Primary / Kindergarten</option>
                  <option value="Grade 1">Grade 1</option>
                  <option value="Grade 2">Grade 2</option>
                  <option value="Grade 3">Grade 3</option>
                  <option value="Grade 4">Grade 4</option>
                  <option value="Grade 5">Grade 5</option>
                  <option value="Grade 6">Grade 6</option>
                  <option value="Grade 7">Grade 7</option>
                  <option value="Grade 8">Grade 8</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11 (Science)">Grade 11 (Science)</option>
                  <option value="Grade 11 (Commerce)">Grade 11 (Commerce)</option>
                  <option value="Grade 11 (Humanities)">Grade 11 (Humanities)</option>
                  <option value="Grade 12">Grade 12</option>
                </select>
              </div>

              {/* Admission Year */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Academic Session *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={formData.preferredAdmissionYear}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferredAdmissionYear: e.target.value,
                      })
                    }
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-800 text-xs"
                  >
                    <option value="2025-2026">2025 - 2026 (Immediate)</option>
                    <option value="2026-2027">2026 - 2027 (Next Academic Year)</option>
                    <option value="2027-2028">2027 - 2028</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Message / Specific Queries */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Specific Inquiries or Questions (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Ask about boarding facilities, fee waivers, entrance dates, sports facilities, or campus visit scheduling..."
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-800 text-xs leading-relaxed"
              ></textarea>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-navy-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 border-2 border-navy-950 border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Admission Enquiry</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;

