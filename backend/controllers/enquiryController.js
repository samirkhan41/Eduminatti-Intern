const Enquiry = require('../models/Enquiry');
const { getDBStatus } = require('../config/db');

// In-memory fallback enquiries
let inMemoryEnquiries = [
  {
    _id: 'mock-enq-1',
    parentName: 'Dr. Ananya Sen',
    email: 'parent@eduminatti.com',
    phone: '+91-9811223344',
    studentName: 'Aaradhya Sen',
    currentClass: 'Grade 6',
    preferredAdmissionYear: '2025-2026',
    schoolName: "Ecole Globale International Girls' School",
    message: 'Interested in Grade 7 boarding admission. Seeking details regarding equestrian facilities and pastoral care.',
    status: 'In Review',
    counselorNotes: 'Parent contacted via email. Campus visit scheduled for upcoming Saturday.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    _id: 'mock-enq-2',
    parentName: 'Vikramaditya Rathore',
    email: 'vikram.rathore@example.com',
    phone: '+91-9988776655',
    studentName: 'Devraj Rathore',
    currentClass: 'Grade 7',
    preferredAdmissionYear: '2025-2026',
    schoolName: 'The Doon School',
    message: 'Inquiring regarding Class 8 entrance test syllabus and registration deadline.',
    status: 'New',
    counselorNotes: 'Prospect sent admission handbook PDF.',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    _id: 'mock-enq-3',
    parentName: 'Meenakshi Sundaram',
    email: 'meenakshi.s@example.com',
    phone: '+91-9445566778',
    studentName: 'Tara Sundaram',
    currentClass: 'Grade 8',
    preferredAdmissionYear: '2025-2026',
    schoolName: "Welham Girls' School",
    message: 'Seeking fee structure details and ICSE board scholarship eligibility.',
    status: 'Contacted',
    counselorNotes: 'Telephonic counseling completed with parents.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

// @desc    Submit an admission enquiry
// @route   POST /api/enquiries
// @access  Public
const submitEnquiry = async (req, res) => {
  try {
    const {
      parentName,
      email,
      phone,
      studentName,
      currentClass,
      preferredAdmissionYear,
      school,
      schoolName,
      message,
    } = req.body;

    if (!parentName || !email || !phone || !studentName || !currentClass) {
      return res.status(400).json({
        success: false,
        message: 'Please provide parent name, email, phone number, student name, and class.',
      });
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    const isConnected = getDBStatus();
    const userId = req.user ? req.user._id : null;

    if (isConnected) {
      const enquiry = await Enquiry.create({
        parentName,
        email,
        phone,
        studentName,
        currentClass,
        preferredAdmissionYear: preferredAdmissionYear || '2025-2026',
        school: school || null,
        schoolName: schoolName || 'General Discovery Enquiry',
        message: message || '',
        user: userId,
        status: 'New',
      });

      return res.status(201).json({
        success: true,
        message: 'Your admission enquiry has been successfully submitted! An admission counsellor will contact you shortly.',
        data: enquiry,
      });
    } else {
      // In-memory fallback
      const newEnquiry = {
        _id: 'mock-enq-' + (inMemoryEnquiries.length + 1),
        parentName,
        email,
        phone,
        studentName,
        currentClass,
        preferredAdmissionYear: preferredAdmissionYear || '2025-2026',
        school: school || null,
        schoolName: schoolName || 'General Discovery Enquiry',
        message: message || '',
        status: 'New',
        counselorNotes: 'Online inquiry registered.',
        createdAt: new Date().toISOString(),
      };
      inMemoryEnquiries.unshift(newEnquiry);

      return res.status(201).json({
        success: true,
        message: 'Your admission enquiry has been submitted! (Demo Mode) An admission counsellor will reach out within 24 hours.',
        data: newEnquiry,
      });
    }
  } catch (error) {
    console.error('Enquiry submission error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit enquiry',
    });
  }
};

// @desc    Get user enquiries
// @route   GET /api/enquiries/my
// @access  Private
const getMyEnquiries = async (req, res) => {
  try {
    const isConnected = getDBStatus();
    if (isConnected && req.user) {
      const enquiries = await Enquiry.find({
        $or: [{ user: req.user._id }, { email: req.user.email }],
      })
        .populate('school', 'name slug city heroImage')
        .sort({ createdAt: -1 });

      return res.json({ success: true, count: enquiries.length, data: enquiries });
    } else {
      const userEmail = req.user ? req.user.email : 'parent@eduminatti.com';
      const userEnquiries = inMemoryEnquiries.filter(
        (e) => e.email.toLowerCase() === userEmail.toLowerCase()
      );
      return res.json({ success: true, count: userEnquiries.length, data: userEnquiries });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all enquiries (Admin)
// @route   GET /api/enquiries
// @access  Private/Admin
const getAllEnquiries = async (req, res) => {
  try {
    const isConnected = getDBStatus();
    const { status, search } = req.query;

    if (isConnected) {
      const filter = {};
      if (status && status !== 'All') {
        filter.status = status;
      }
      if (search) {
        const regex = new RegExp(search.trim(), 'i');
        filter.$or = [
          { parentName: regex },
          { studentName: regex },
          { email: regex },
          { phone: regex },
          { schoolName: regex },
        ];
      }

      const enquiries = await Enquiry.find(filter)
        .populate('school', 'name slug city')
        .sort({ createdAt: -1 });

      return res.json({
        success: true,
        count: enquiries.length,
        data: enquiries,
      });
    } else {
      let filtered = [...inMemoryEnquiries];
      if (status && status !== 'All') {
        filtered = filtered.filter((e) => e.status === status);
      }
      if (search) {
        const term = search.toLowerCase().trim();
        filtered = filtered.filter(
          (e) =>
            e.parentName.toLowerCase().includes(term) ||
            e.studentName.toLowerCase().includes(term) ||
            e.email.toLowerCase().includes(term) ||
            e.phone.includes(term) ||
            e.schoolName.toLowerCase().includes(term)
        );
      }

      return res.json({
        success: true,
        count: filtered.length,
        data: filtered,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update enquiry status & counselor notes (Admin)
// @route   PUT /api/enquiries/:id
// @access  Private/Admin
const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, counselorNotes } = req.body;
    const isConnected = getDBStatus();

    if (isConnected) {
      const enquiry = await Enquiry.findById(id);
      if (!enquiry) {
        return res.status(404).json({ success: false, message: 'Enquiry record not found' });
      }

      if (status) enquiry.status = status;
      if (counselorNotes !== undefined) enquiry.counselorNotes = counselorNotes;

      await enquiry.save();
      return res.json({
        success: true,
        message: 'Enquiry updated successfully',
        data: enquiry,
      });
    } else {
      const enquiry = inMemoryEnquiries.find((e) => e._id === id);
      if (!enquiry) {
        return res.status(404).json({ success: false, message: 'Enquiry record not found' });
      }

      if (status) enquiry.status = status;
      if (counselorNotes !== undefined) enquiry.counselorNotes = counselorNotes;

      return res.json({
        success: true,
        message: 'Enquiry updated successfully (Demo mode)',
        data: enquiry,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete enquiry (Admin)
// @route   DELETE /api/enquiries/:id
// @access  Private/Admin
const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const isConnected = getDBStatus();

    if (isConnected) {
      const enquiry = await Enquiry.findByIdAndDelete(id);
      if (!enquiry) {
        return res.status(404).json({ success: false, message: 'Enquiry not found' });
      }
      return res.json({ success: true, message: 'Enquiry deleted successfully' });
    } else {
      const idx = inMemoryEnquiries.findIndex((e) => e._id === id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Enquiry not found' });
      }
      inMemoryEnquiries.splice(idx, 1);
      return res.json({ success: true, message: 'Enquiry deleted successfully (Demo mode)' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get enquiry statistics for Admin Dashboard
// @route   GET /api/enquiries/stats
// @access  Private/Admin
const getEnquiryStats = async (req, res) => {
  try {
    const isConnected = getDBStatus();

    if (isConnected) {
      const totalEnquiries = await Enquiry.countDocuments();
      const newEnquiries = await Enquiry.countDocuments({ status: 'New' });
      const inReviewEnquiries = await Enquiry.countDocuments({ status: 'In Review' });
      const contactedEnquiries = await Enquiry.countDocuments({ status: 'Contacted' });
      const offeredEnquiries = await Enquiry.countDocuments({ status: 'Admission Offered' });

      return res.json({
        success: true,
        data: {
          totalEnquiries,
          newEnquiries,
          inReviewEnquiries,
          contactedEnquiries,
          offeredEnquiries,
        },
      });
    } else {
      return res.json({
        success: true,
        data: {
          totalEnquiries: inMemoryEnquiries.length,
          newEnquiries: inMemoryEnquiries.filter((e) => e.status === 'New').length,
          inReviewEnquiries: inMemoryEnquiries.filter((e) => e.status === 'In Review').length,
          contactedEnquiries: inMemoryEnquiries.filter((e) => e.status === 'Contacted').length,
          offeredEnquiries: inMemoryEnquiries.filter((e) => e.status === 'Admission Offered').length,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  submitEnquiry,
  getMyEnquiries,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
  getEnquiryStats,
};

