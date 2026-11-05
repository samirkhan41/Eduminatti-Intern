const School = require('../models/School');
const { getDBStatus } = require('../config/db');
const { schoolsData } = require('../utils/seedData');

// In-memory schools initialized with seedData for zero-config fallback
let inMemorySchools = schoolsData.map((s, idx) => ({
  ...s,
  _id: 'mock-school-' + (idx + 1),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

// Helper to filter in-memory schools
const filterInMemorySchools = (schools, query) => {
  let result = [...schools];

  // Search keyword (name, city, address, curriculum)
  if (query.search) {
    const term = query.search.toLowerCase().trim();
    result = result.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.city.toLowerCase().includes(term) ||
        s.overview.toLowerCase().includes(term) ||
        (s.curriculum && s.curriculum.some((c) => c.toLowerCase().includes(term)))
    );
  }

  // City filter
  if (query.city && query.city !== 'All Cities') {
    result = result.filter(
      (s) => s.city.toLowerCase() === query.city.toLowerCase()
    );
  }

  // Category filter
  if (query.category && query.category !== 'All Categories') {
    result = result.filter((s) => s.category === query.category);
  }

  // Gender filter
  if (query.gender && query.gender !== 'All') {
    result = result.filter((s) => s.gender === query.gender);
  }

  // Boarding Type filter
  if (query.boardingType && query.boardingType !== 'All') {
    result = result.filter((s) => s.boardingType === query.boardingType);
  }

  // Curriculum filter
  if (query.curriculum) {
    const curricula = Array.isArray(query.curriculum)
      ? query.curriculum
      : query.curriculum.split(',');
    result = result.filter(
      (s) =>
        s.curriculum &&
        curricula.some((c) => s.curriculum.includes(c.trim()))
    );
  }

  // Fee range filter
  if (query.minFees) {
    const min = Number(query.minFees);
    if (!isNaN(min)) {
      result = result.filter((s) => s.annualFeesMax >= min);
    }
  }
  if (query.maxFees) {
    const max = Number(query.maxFees);
    if (!isNaN(max)) {
      result = result.filter((s) => s.annualFeesMin <= max);
    }
  }

  // Sorting
  if (query.sort) {
    switch (query.sort) {
      case 'fees_asc':
        result.sort((a, b) => a.annualFeesMin - b.annualFeesMin);
        break;
      case 'fees_desc':
        result.sort((a, b) => b.annualFeesMax - a.annualFeesMax);
        break;
      case 'name_asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating_desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }
  }

  return result;
};

// @desc    Get all schools with search, filter, sort & pagination
// @route   GET /api/schools
// @access  Public
const getSchools = async (req, res) => {
  try {
    const isConnected = getDBStatus();
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 9;
    const skip = (page - 1) * limit;

    if (isConnected) {
      const filter = {};

      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search.trim(), 'i');
        filter.$or = [
          { name: searchRegex },
          { city: searchRegex },
          { overview: searchRegex },
          { curriculum: searchRegex },
        ];
      }

      if (req.query.city && req.query.city !== 'All Cities') {
        filter.city = new RegExp(`^${req.query.city.trim()}$`, 'i');
      }

      if (req.query.category && req.query.category !== 'All Categories') {
        filter.category = req.query.category;
      }

      if (req.query.gender && req.query.gender !== 'All') {
        filter.gender = req.query.gender;
      }

      if (req.query.boardingType && req.query.boardingType !== 'All') {
        filter.boardingType = req.query.boardingType;
      }

      if (req.query.curriculum) {
        const curricula = Array.isArray(req.query.curriculum)
          ? req.query.curriculum
          : req.query.curriculum.split(',').map((c) => c.trim());
        filter.curriculum = { $in: curricula };
      }

      if (req.query.minFees || req.query.maxFees) {
        filter.annualFeesMin = {};
        if (req.query.minFees) filter.annualFeesMin.$gte = Number(req.query.minFees);
        if (req.query.maxFees) filter.annualFeesMin.$lte = Number(req.query.maxFees);
      }

      let sortOptions = { isFeatured: -1, rating: -1, createdAt: -1 };
      if (req.query.sort) {
        switch (req.query.sort) {
          case 'fees_asc':
            sortOptions = { annualFeesMin: 1 };
            break;
          case 'fees_desc':
            sortOptions = { annualFeesMax: -1 };
            break;
          case 'name_asc':
            sortOptions = { name: 1 };
            break;
          case 'name_desc':
            sortOptions = { name: -1 };
            break;
          case 'rating_desc':
            sortOptions = { rating: -1 };
            break;
        }
      }

      const total = await School.countDocuments(filter);
      const schools = await School.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);

      return res.json({
        success: true,
        count: schools.length,
        total,
        page,
        pages: Math.ceil(total / limit) || 1,
        data: schools,
      });
    } else {
      // In-memory fallback
      const filtered = filterInMemorySchools(inMemorySchools, req.query);
      const total = filtered.length;
      const paginated = filtered.slice(skip, skip + limit);

      return res.json({
        success: true,
        count: paginated.length,
        total,
        page,
        pages: Math.ceil(total / limit) || 1,
        data: paginated,
      });
    }
  } catch (error) {
    console.error('Error fetching schools:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch schools',
    });
  }
};

// @desc    Get single school by slug or ID
// @route   GET /api/schools/:slugOrId
// @access  Public
const getSchoolBySlugOrId = async (req, res) => {
  try {
    const { slugOrId } = req.params;
    const isConnected = getDBStatus();

    if (isConnected) {
      let school;
      if (slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
        school = await School.findById(slugOrId);
      } else {
        school = await School.findOne({ slug: slugOrId });
      }

      if (!school) {
        return res.status(404).json({
          success: false,
          message: 'School profile not found',
        });
      }

      return res.json({
        success: true,
        data: school,
      });
    } else {
      // In-memory fallback
      const school = inMemorySchools.find(
        (s) => s.slug === slugOrId || s._id === slugOrId
      );

      if (!school) {
        return res.status(404).json({
          success: false,
          message: 'School profile not found',
        });
      }

      return res.json({
        success: true,
        data: school,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get featured schools for homepage
// @route   GET /api/schools/featured
// @access  Public
const getFeaturedSchools = async (req, res) => {
  try {
    const isConnected = getDBStatus();
    if (isConnected) {
      const schools = await School.find({ isFeatured: true }).limit(6);
      return res.json({ success: true, count: schools.length, data: schools });
    } else {
      const schools = inMemorySchools.filter((s) => s.isFeatured).slice(0, 6);
      return res.json({ success: true, count: schools.length, data: schools });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get girls boarding schools
// @route   GET /api/schools/girls-boarding
// @access  Public
const getGirlsBoardingSchools = async (req, res) => {
  try {
    const isConnected = getDBStatus();
    if (isConnected) {
      const schools = await School.find({
        $or: [
          { category: 'Girls Boarding Schools' },
          { gender: 'Girls Only', boardingType: { $in: ['Full Boarding', 'Weekly Boarding'] } },
        ],
      }).sort({ rating: -1 });

      return res.json({ success: true, count: schools.length, data: schools });
    } else {
      const schools = inMemorySchools.filter(
        (s) =>
          s.category === 'Girls Boarding Schools' ||
          (s.gender === 'Girls Only' &&
            ['Full Boarding', 'Weekly Boarding'].includes(s.boardingType))
      );
      return res.json({ success: true, count: schools.length, data: schools });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Compare multiple schools (up to 3)
// @route   GET /api/schools/compare
// @access  Public
const compareSchools = async (req, res) => {
  try {
    const { ids } = req.query;
    if (!ids) {
      return res.status(400).json({
        success: false,
        message: 'Please provide comma-separated school IDs to compare (e.g., ?ids=id1,id2,id3)',
      });
    }

    const schoolIds = ids.split(',').slice(0, 3); // Max 3
    const isConnected = getDBStatus();

    if (isConnected) {
      const schools = await School.find({
        $or: [
          { _id: { $in: schoolIds.filter((id) => id.match(/^[0-9a-fA-F]{24}$/)) } },
          { slug: { $in: schoolIds } },
        ],
      });

      return res.json({
        success: true,
        count: schools.length,
        data: schools,
      });
    } else {
      const schools = inMemorySchools.filter(
        (s) => schoolIds.includes(s._id) || schoolIds.includes(s.slug)
      );

      return res.json({
        success: true,
        count: schools.length,
        data: schools,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new school (Admin)
// @route   POST /api/schools
// @access  Private/Admin
const createSchool = async (req, res) => {
  try {
    const isConnected = getDBStatus();
    const schoolData = req.body;

    if (!schoolData.name || !schoolData.city || !schoolData.state) {
      return res.status(400).json({
        success: false,
        message: 'Name, City, and State are required fields',
      });
    }

    // Auto calculate slug
    schoolData.slug = schoolData.name
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');

    if (isConnected) {
      const existing = await School.findOne({ name: schoolData.name });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'A school with this name already exists',
        });
      }

      const school = await School.create(schoolData);
      return res.status(201).json({
        success: true,
        message: 'School successfully created and published!',
        data: school,
      });
    } else {
      const newSchool = {
        ...schoolData,
        _id: 'mock-school-' + (inMemorySchools.length + 1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      inMemorySchools.unshift(newSchool);

      return res.status(201).json({
        success: true,
        message: 'School created successfully (Demo mode)!',
        data: newSchool,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update school details (Admin)
// @route   PUT /api/schools/:id
// @access  Private/Admin
const updateSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const isConnected = getDBStatus();

    if (isConnected) {
      const school = await School.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!school) {
        return res.status(404).json({ success: false, message: 'School not found' });
      }

      return res.json({
        success: true,
        message: 'School details updated successfully!',
        data: school,
      });
    } else {
      const idx = inMemorySchools.findIndex((s) => s._id === id || s.slug === id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'School not found' });
      }

      inMemorySchools[idx] = {
        ...inMemorySchools[idx],
        ...req.body,
        updatedAt: new Date().toISOString(),
      };

      return res.json({
        success: true,
        message: 'School details updated successfully (Demo mode)!',
        data: inMemorySchools[idx],
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete school (Admin)
// @route   DELETE /api/schools/:id
// @access  Private/Admin
const deleteSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const isConnected = getDBStatus();

    if (isConnected) {
      const school = await School.findByIdAndDelete(id);
      if (!school) {
        return res.status(404).json({ success: false, message: 'School not found' });
      }
      return res.json({
        success: true,
        message: 'School record deleted successfully',
      });
    } else {
      const idx = inMemorySchools.findIndex((s) => s._id === id || s.slug === id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'School not found' });
      }
      inMemorySchools.splice(idx, 1);
      return res.json({
        success: true,
        message: 'School record deleted successfully (Demo mode)',
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get school overview metrics for Admin Dashboard
// @route   GET /api/schools/stats/overview
// @access  Private/Admin
const getSchoolStats = async (req, res) => {
  try {
    const isConnected = getDBStatus();
    if (isConnected) {
      const totalSchools = await School.countDocuments();
      const girlsBoardingCount = await School.countDocuments({
        category: 'Girls Boarding Schools',
      });
      const boardingCount = await School.countDocuments({
        boardingType: { $in: ['Full Boarding', 'Weekly Boarding'] },
      });
      const verifiedCount = await School.countDocuments({ isVerified: true });

      return res.json({
        success: true,
        data: {
          totalSchools,
          girlsBoardingCount,
          boardingCount,
          verifiedCount,
        },
      });
    } else {
      return res.json({
        success: true,
        data: {
          totalSchools: inMemorySchools.length,
          girlsBoardingCount: inMemorySchools.filter(
            (s) => s.category === 'Girls Boarding Schools'
          ).length,
          boardingCount: inMemorySchools.filter((s) =>
            ['Full Boarding', 'Weekly Boarding'].includes(s.boardingType)
          ).length,
          verifiedCount: inMemorySchools.filter((s) => s.isVerified).length,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getSchools,
  getSchoolBySlugOrId,
  getFeaturedSchools,
  getGirlsBoardingSchools,
  compareSchools,
  createSchool,
  updateSchool,
  deleteSchool,
  getSchoolStats,
};

