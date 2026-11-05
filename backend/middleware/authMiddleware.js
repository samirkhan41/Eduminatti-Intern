const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getDBStatus } = require('../config/db');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'eduminatti_super_secret_jwt_key_2025'
      );

      const isConnected = getDBStatus();
      if (isConnected) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        // Fallback for in-memory evaluation
        if (decoded.id === 'mock-admin-01') {
          req.user = {
            _id: 'mock-admin-01',
            name: 'Eduminatti Lead Administrator',
            email: 'admin@eduminatti.com',
            role: 'admin',
          };
        } else {
          req.user = {
            _id: decoded.id || 'mock-parent-02',
            name: 'Dr. Ananya Sen',
            email: 'parent@eduminatti.com',
            role: 'parent',
          };
        }
      }

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User belonging to this token no longer exists.',
        });
      }

      next();
    } catch (error) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token invalid or expired',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, access token missing',
    });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied: Administrative privileges required',
    });
  }
};

module.exports = { protect, admin };
