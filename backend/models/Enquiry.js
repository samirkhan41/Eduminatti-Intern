const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    parentName: {
      type: String,
      required: [true, 'Parent/Guardian name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Contact phone number is required'],
      trim: true,
    },
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    currentClass: {
      type: String,
      required: [true, 'Current grade or seeking admission grade is required'],
      trim: true,
    },
    preferredAdmissionYear: {
      type: String,
      required: [true, 'Preferred admission session year is required'],
      default: '2025-2026',
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      default: null,
    },
    schoolName: {
      type: String,
      default: 'General Discovery Inquiry',
      trim: true,
    },
    message: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'In Review', 'Contacted', 'Admission Offered', 'Closed'],
      default: 'New',
      index: true,
    },
    counselorNotes: {
      type: String,
      default: '',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Enquiry', enquirySchema);

