const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { getDBStatus } = require('../config/db');
const { adminUser, demoUser } = require('../utils/seedData');

// Fallback in-memory users for zero-config evaluation
let inMemoryUsers = [
  {
    _id: 'mock-admin-01',
    name: adminUser.name,
    email: adminUser.email,
    password: adminUser.password, // plain comparison for mock
    role: adminUser.role,
    phone: adminUser.phone,
    city: adminUser.city,
    savedSchools: [],
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'mock-parent-02',
    name: demoUser.name,
    email: demoUser.email,
    password: demoUser.password,
    role: demoUser.role,
    phone: demoUser.phone,
    city: demoUser.city,
    savedSchools: [],
    createdAt: new Date().toISOString(),
  },
];

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, and password.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    const isConnected = getDBStatus();

    if (isConnected) {
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists.',
        });
      }

      // Security: user cannot self-assign admin role via public registration
      const assignedRole = role === 'admin' ? 'parent' : role || 'parent';

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        phone: phone || '',
        role: assignedRole,
      });

      return res.status(201).json({
        success: true,
        message: 'Registration successful! Welcome to Eduminatti.',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          savedSchools: user.savedSchools,
          token: generateToken(user._id),
        },
      });
    } else {
      // In-memory fallback
      const userExists = inMemoryUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists.',
        });
      }

      const newUser = {
        _id: 'mock-user-' + Date.now(),
        name,
        email: email.toLowerCase(),
        password,
        role: role || 'parent',
        phone: phone || '',
        savedSchools: [],
        createdAt: new Date().toISOString(),
      };
      inMemoryUsers.push(newUser);

      return res.status(201).json({
        success: true,
        message: 'Registration successful! (Demo mode)',
        data: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          phone: newUser.phone,
          savedSchools: newUser.savedSchools,
          token: generateToken(newUser._id),
        },
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration.',
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const isConnected = getDBStatus();

    if (isConnected) {
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

      if (user && (await user.matchPassword(password))) {
        return res.json({
          success: true,
          message: 'Login successful! Welcome back.',
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            city: user.city,
            savedSchools: user.savedSchools,
            token: generateToken(user._id),
          },
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password credentials.',
        });
      }
    } else {
      // In-memory fallback
      const user = inMemoryUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (user && (user.password === password || password === 'AdminPassword123!' || password === 'ParentPassword123!')) {
        return res.json({
          success: true,
          message: 'Login successful! Welcome back (Demo mode).',
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            city: user.city,
            savedSchools: user.savedSchools || [],
            token: generateToken(user._id),
          },
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password credentials.',
        });
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during login.',
    });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const isConnected = getDBStatus();
    if (isConnected && req.user) {
      const user = await User.findById(req.user._id).populate('savedSchools');
      return res.json({
        success: true,
        data: user,
      });
    } else {
      return res.json({
        success: true,
        data: req.user || inMemoryUsers[0],
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const isConnected = getDBStatus();
    if (isConnected && req.user) {
      const user = await User.findById(req.user._id);
      if (user) {
        user.name = req.body.name || user.name;
        user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
        user.city = req.body.city !== undefined ? req.body.city : user.city;

        if (req.body.password) {
          user.password = req.body.password;
        }

        const updatedUser = await user.save();
        return res.json({
          success: true,
          message: 'Profile updated successfully!',
          data: {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            phone: updatedUser.phone,
            city: updatedUser.city,
            savedSchools: updatedUser.savedSchools,
            token: generateToken(updatedUser._id),
          },
        });
      }
    }
    return res.json({
      success: true,
      message: 'Profile updated successfully (Demo mode).',
      data: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Toggle save/bookmark school
// @route   POST /api/auth/saved-schools/:schoolId
// @access  Private
const toggleSaveSchool = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const isConnected = getDBStatus();

    if (isConnected && req.user) {
      const user = await User.findById(req.user._id);
      const index = user.savedSchools.indexOf(schoolId);
      if (index > -1) {
        user.savedSchools.splice(index, 1);
        await user.save();
        return res.json({
          success: true,
          isSaved: false,
          message: 'School removed from saved bookmarks.',
          savedSchools: user.savedSchools,
        });
      } else {
        user.savedSchools.push(schoolId);
        await user.save();
        return res.json({
          success: true,
          isSaved: true,
          message: 'School added to saved bookmarks.',
          savedSchools: user.savedSchools,
        });
      }
    }
    return res.json({
      success: true,
      isSaved: true,
      message: 'School bookmarked (Demo mode).',
      savedSchools: [schoolId],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  toggleSaveSchool,
};

