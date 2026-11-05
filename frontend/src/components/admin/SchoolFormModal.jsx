import React, { useState, useEffect } from 'react';
import { X, Upload, Save, Building, Image, Plus, Trash2 } from 'lucide-react';
import schoolService from '../../services/schoolService';
import { useToast } from '../../context/ToastContext';

const SchoolFormModal = ({ isOpen, onClose, schoolToEdit = null, onSaved }) => {
  const { success, error: toastError } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    city: 'Dehradun',
    state: 'Uttarakhand',
    address: '',
    pincode: '',
    establishedYear: 2012,
    category: 'Girls Boarding Schools',
    gender: 'Girls Only',
    boardingType: 'Full Boarding',
    curriculum: ['CBSE'],
    gradeLevels: 'Grade 4 to 12',
    annualFeesMin: 700000,
    annualFeesMax: 900000,
    rating: 4.8,
    isVerified: true,
    isFeatured: true,
    heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    overview: '',
    about: '',
    contactPhone: '+91-135-2750000',
    contactEmail: 'admissions@school.mock',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [curriculumInput, setCurriculumInput] = useState('CBSE, CIE');

  useEffect(() => {
    if (schoolToEdit) {
      setFormData({
        name: schoolToEdit.name || '',
        tagline: schoolToEdit.tagline || '',
        city: schoolToEdit.city || 'Dehradun',
        state: schoolToEdit.state || 'Uttarakhand',
        address: schoolToEdit.address || '',
        pincode: schoolToEdit.pincode || '',
        establishedYear: schoolToEdit.establishedYear || 2012,
        category: schoolToEdit.category || 'Girls Boarding Schools',
        gender: schoolToEdit.gender || 'Girls Only',
        boardingType: schoolToEdit.boardingType || 'Full Boarding',
        curriculum: schoolToEdit.curriculum || ['CBSE'],
        gradeLevels: schoolToEdit.gradeLevels || 'Grade 4 to 12',
        annualFeesMin: schoolToEdit.annualFeesMin || 700000,
        annualFeesMax: schoolToEdit.annualFeesMax || 900000,
        rating: schoolToEdit.rating || 4.8,
        isVerified: schoolToEdit.isVerified !== undefined ? schoolToEdit.isVerified : true,
        isFeatured: schoolToEdit.isFeatured !== undefined ? schoolToEdit.isFeatured : true,
        heroImage: schoolToEdit.heroImage || '',
        overview: schoolToEdit.overview || '',
        about: schoolToEdit.about || '',
        contactPhone: schoolToEdit.contactInfo?.phone || '+91-135-2750000',
        contactEmail: schoolToEdit.contactInfo?.email || 'admissions@school.mock',
      });
      setCurriculumInput(schoolToEdit.curriculum ? schoolToEdit.curriculum.join(', ') : 'CBSE');
    } else {
      setFormData({
        name: '',
        tagline: '',
        city: 'Dehradun',
        state: 'Uttarakhand',
        address: '',
        pincode: '',
        establishedYear: 2012,
        category: 'Girls Boarding Schools',
        gender: 'Girls Only',
        boardingType: 'Full Boarding',
        curriculum: ['CBSE'],
        gradeLevels: 'Grade 4 to 12',
        annualFeesMin: 700000,
        annualFeesMax: 900000,
        rating: 4.8,
        isVerified: true,
        isFeatured: true,
        heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
        overview: '',
        about: '',
        contactPhone: '+91-135-2750000',
        contactEmail: 'admissions@school.mock',
      });
      setCurriculumInput('CBSE, CIE');
    }
  }, [schoolToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.city.trim() || !formData.address.trim()) {
      toastError('Please fill in school name, city, and address');
      return;
    }

    setIsSubmitting(true);
    try {
      const parsedCurriculum = curriculumInput
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        curriculum: parsedCurriculum.length > 0 ? parsedCurriculum : ['CBSE'],
        annualFeesMin: Number(formData.annualFeesMin),
        annualFeesMax: Number(formData.annualFeesMax),
        establishedYear: Number(formData.establishedYear),
        rating: Number(formData.rating),
        contactInfo: {
          phone: formData.contactPhone,
          email: formData.contactEmail,
        },
      };

      if (schoolToEdit) {
        await schoolService.updateSchool(schoolToEdit._id || schoolToEdit.slug, payload);
        success('School details updated successfully!');
      } else {
        await schoolService.createSchool(payload);
        success('New school created and published successfully!');
      }

      if (onSaved) onSaved();
      onClose();
    } catch (err) {
      toastError(err.response?.data?.message || 'Failed to save school');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-navy-950 text-white p-6 flex items-center justify-between border-b border-navy-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 bg-gold-400/10 px-2.5 py-0.5 rounded-full border border-gold-400/20">
              Administrative Control
            </span>
            <h2 className="text-xl font-serif font-bold text-white mt-1">
              {schoolToEdit ? `Edit ${schoolToEdit.name}` : 'Add New Educational Institution'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* School Name */}
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                Official School Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ecole Globale International Girls' School"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white"
              />
            </div>

            {/* Tagline */}
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                Motto / Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="e.g. Empowering Young Women to Lead with Grace and Resilience"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white"
              />
            </div>

            {/* City */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">City *</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white"
              />
            </div>

            {/* State */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">State *</label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white"
              />
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Address *</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Full street address"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white"
              >
                <option value="Girls Boarding Schools">Girls Boarding Schools</option>
                <option value="Boarding Schools">Boarding Schools</option>
                <option value="Boys Boarding Schools">Boys Boarding Schools</option>
                <option value="International Schools">International Schools</option>
                <option value="Day Schools">Day Schools</option>
                <option value="Residential Schools">Residential Schools</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Gender *</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white"
              >
                <option value="Girls Only">Girls Only</option>
                <option value="Boys Only">Boys Only</option>
                <option value="Co-Educational">Co-Educational</option>
              </select>
            </div>

            {/* Boarding Type */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Boarding Type *</label>
              <select
                value={formData.boardingType}
                onChange={(e) => setFormData({ ...formData, boardingType: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white"
              >
                <option value="Full Boarding">Full Boarding</option>
                <option value="Day Boarding">Day Boarding</option>
                <option value="Weekly Boarding">Weekly Boarding</option>
                <option value="Day School">Day School</option>
              </select>
            </div>

            {/* Curriculum */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Curricula (comma-separated) *
              </label>
              <input
                type="text"
                value={curriculumInput}
                onChange={(e) => setCurriculumInput(e.target.value)}
                placeholder="e.g. CBSE, ICSE, IB"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white"
              />
            </div>

            {/* Fees Range */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Min Annual Fees (INR) *
              </label>
              <input
                type="number"
                value={formData.annualFeesMin}
                onChange={(e) => setFormData({ ...formData, annualFeesMin: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Max Annual Fees (INR) *
              </label>
              <input
                type="number"
                value={formData.annualFeesMax}
                onChange={(e) => setFormData({ ...formData, annualFeesMax: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white"
              />
            </div>

            {/* Hero Image URL */}
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                Hero Image URL (Campus photo) *
              </label>
              <input
                type="url"
                value={formData.heroImage}
                onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white"
              />
            </div>

            {/* Overview */}
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Overview Summary *</label>
              <textarea
                rows={3}
                required
                value={formData.overview}
                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                placeholder="Brief introduction displayed on cards and hero..."
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white leading-relaxed"
              ></textarea>
            </div>

            {/* About */}
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">About the School *</label>
              <textarea
                rows={4}
                required
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                placeholder="Full educational philosophy, history, and achievements..."
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white leading-relaxed"
              ></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-md flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Saving...' : 'Save School'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolFormModal;
