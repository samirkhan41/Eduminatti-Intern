const User = require('../models/User');
const { getDBStatus } = require('../config/db');

// @desc    Get all users (Admin)
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const isConnected = getDBStatus();
    if (isConnected) {
      const users = await User.find({}).select('-password').sort({ createdAt: -1 });
      return res.json({ success: true, count: users.length, data: users });
    } else {
      return res.json({
        success: true,
        count: 2,
        data: [
          {
            _id: 'mock-admin-01',
            name: 'Eduminatti Lead Administrator',
            email: 'admin@eduminatti.com',
            role: 'admin',
            phone: '+91-9876543210',
            city: 'Dehradun',
            createdAt: new Date().toISOString(),
          },
          {
            _id: 'mock-parent-02',
            name: 'Dr. Ananya Sen',
            email: 'parent@eduminatti.com',
            role: 'parent',
            phone: '+91-9811223344',
            city: 'New Delhi',
            createdAt: new Date().toISOString(),
          },
        ],
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user role (Admin)
// @route   PUT /api/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const isConnected = getDBStatus();

    if (!['parent', 'student', 'admin', 'counsellor'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role specified' });
    }

    if (isConnected) {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      user.role = role;
      await user.save();
      return res.json({ success: true, message: 'User role updated successfully', data: user });
    } else {
      return res.json({ success: true, message: 'User role updated (Demo mode)' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete user account (Admin)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const isConnected = getDBStatus();

    if (isConnected) {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      return res.json({ success: true, message: 'User account removed successfully' });
    } else {
      return res.json({ success: true, message: 'User account removed (Demo mode)' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  deleteUser,
};

