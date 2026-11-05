const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide school name'],
      unique: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    tagline: {
      type: String,
      trim: true,
      default: '',
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
      index: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
      index: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
    },
    establishedYear: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Boarding Schools',
        'Girls Boarding Schools',
        'Boys Boarding Schools',
        'Day Schools',
        'International Schools',
        'Residential Schools',
      ],
      index: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Girls Only', 'Boys Only', 'Co-Educational'],
      index: true,
    },
    boardingType: {
      type: String,
      required: true,
      enum: ['Full Boarding', 'Day Boarding', 'Weekly Boarding', 'Day School'],
      index: true,
    },
    curriculum: {
      type: [String],
      required: true,
      validate: [v => Array.isArray(v) && v.length > 0, 'At least one curriculum required'],
      index: true,
    },
    gradeLevels: {
      type: String,
      default: 'Grade 1 to 12',
    },
    annualFeesMin: {
      type: Number,
      required: true,
      index: true,
    },
    annualFeesMax: {
      type: Number,
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 1.0,
      max: 5.0,
    },
    reviewCount: {
      type: Number,
      default: 42,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    heroImage: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      default: '',
    },
    gallery: {
      type: [String],
      default: [],
    },
    overview: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    academics: {
      description: { type: String, default: '' },
      studentTeacherRatio: { type: String, default: '10:1' },
      streamOptions: { type: [String], default: ['Science', 'Commerce', 'Humanities'] },
      teachingMethodology: { type: String, default: 'Experiential & Inquiry-Based Learning' },
      languagesOffered: { type: [String], default: ['English', 'Hindi', 'French', 'German', 'Sanskrit'] },
    },
    boardingFacilities: {
      description: { type: String, default: '' },
      roomSharing: { type: String, default: '2-3 students per room with ensuite bathrooms' },
      messDietary: { type: String, default: 'Nutritious Multi-Cuisine (Vegetarian & Non-Vegetarian options)' },
      airConditioned: { type: Boolean, default: true },
      laundryService: { type: Boolean, default: true },
      medicalCare24x7: { type: Boolean, default: true },
      pastoralCare: { type: String, default: 'Resident Housemistresses, Tutors, and Clinical Psychologists on campus' },
    },
    sportsFacilities: {
      type: [String],
      default: [
        'Olympic Size Swimming Pool',
        'Horse Riding / Equestrian Arena',
        'Indoor Badminton Courts',
        'Synthetic Lawn Tennis Courts',
        'Squash Courts',
        'Athletic Track & Football Ground',
        'Shooting Range',
        'Yoga & Aerobics Studio',
      ],
    },
    infrastructure: {
      type: [String],
      default: [
        'Modern STEM & Robotics Laboratories',
        'State-of-the-Art Performing Arts Auditorium',
        'Central Digital Library & Research Centre',
        'Smart Interactive Classrooms',
        'High-Speed Wi-Fi Enabled Eco Campus',
        'Fine Arts & Sculpture Studios',
      ],
    },
    safetyFeatures: {
      type: [String],
      default: [
        'Round-the-clock 24x7 CCTV Surveillance',
        'Strict Female Security Guards & Matrons',
        'Biometric Access Control at All Dormitory Gates',
        'Full-Time Resident Doctors & 10-Bed Infirmary',
        'Gated Perimeter with Strict Visitor Authorization',
      ],
    },
    feeStructure: {
      registrationFee: { type: Number, default: 25000 },
      admissionFee: { type: Number, default: 100000 },
      securityDepositRefundable: { type: Number, default: 150000 },
      annualTuitionBoarding: { type: String, default: '' },
    },
    admissionProcedure: {
      eligibility: { type: String, default: 'Age-appropriate assessment and previous academic merit records' },
      steps: {
        type: [String],
        default: [
          'Online Registration & Inquiry Submission',
          'Aptitude Assessment & Interactive Session',
          'Campus Visit & Principal Interaction',
          'Document Verification & Provisional Offer',
          'Fee Remittance & Enrolment Confirmation',
        ],
      },
      applicationDeadline: { type: String, default: 'Rolling admissions for Academic Session 2025-2026' },
      applicationFee: { type: Number, default: 5000 },
    },
    contactInfo: {
      phone: { type: String, default: '+91-135-2750000' },
      email: { type: String, default: 'admissions@eduminatti.mock' },
      website: { type: String, default: 'https://eduminatti.mock' },
      counsellorName: { type: String, default: 'Senior Admissions Counsellor' },
      counsellorContact: { type: String, default: '+91-9876543210' },
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug before save
schoolSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  next();
});

module.exports = mongoose.model('School', schoolSchema);

