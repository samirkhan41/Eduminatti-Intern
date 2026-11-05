import React, { useState, useEffect } from 'react';
import { X, Save, CheckCircle, Mail, Phone, Calendar, User, BookOpen } from 'lucide-react';
import enquiryService from '../../services/enquiryService';
import { useToast } from '../../context/ToastContext';

const EnquiryStatusModal = ({ isOpen, onClose, enquiry, onUpdated }) => {
  const { success, error: toastError } = useToast();
  const [status, setStatus] = useState('New');
  const [counselorNotes, setCounselorNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (enquiry) {
      setStatus(enquiry.status || 'New');
      setCounselorNotes(enquiry.counselorNotes || '');
    }
  }, [enquiry, isOpen]);

  if (!isOpen || !enquiry) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await enquiryService.updateEnquiryStatus(enquiry._id, {
        status,
        counselorNotes,
      });
      success('Enquiry status updated successfully!');
      if (onUpdated) onUpdated();
      onClose();
    } catch (err) {
      toastError(err.response?.data?.message || 'Failed to update enquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-navy-950 text-white p-6 flex items-center justify-between border-b border-navy-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 bg-gold-400/10 px-2.5 py-0.5 rounded-full border border-gold-400/20">
              Admission Case File
            </span>
            <h2 className="text-xl font-serif font-bold text-white mt-1">
              Enquiry from {enquiry.parentName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Target School:</span>
              <span className="font-bold text-navy-950">{enquiry.schoolName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Student Name:</span>
              <span className="font-semibold text-slate-800">{enquiry.studentName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Current Grade / Session:</span>
              <span className="font-semibold text-slate-800">
                {enquiry.currentClass} • {enquiry.preferredAdmissionYear}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Parent Contact:</span>
              <span className="font-semibold text-slate-800">
                {enquiry.phone} • {enquiry.email}
              </span>
            </div>
            {enquiry.message && (
              <div className="pt-2 border-t border-slate-200 mt-2">
                <span className="text-slate-500 block mb-0.5">Parent Message:</span>
                <p className="text-slate-700 italic bg-white p-2.5 rounded-xl border border-slate-200 leading-relaxed">
                  "{enquiry.message}"
                </p>
              </div>
            )}
          </div>

          {/* Status Selection */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Admission Enquiry Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white font-semibold text-xs focus:ring-2 focus:ring-navy-900"
            >
              <option value="New">New (Unassigned)</option>
              <option value="In Review">In Review</option>
              <option value="Contacted">Contacted Parent</option>
              <option value="Admission Offered">Admission Offered</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Counselor Internal Notes */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Internal Counsellor Notes & Activity Log
            </label>
            <textarea
              rows={4}
              value={counselorNotes}
              onChange={(e) => setCounselorNotes(e.target.value)}
              placeholder="e.g. Telephonic discussion completed. Parent requested campus visit on 14th Dec..."
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white focus:ring-2 focus:ring-navy-900 leading-relaxed"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold shadow-md flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Saving...' : 'Update Status'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryStatusModal;
