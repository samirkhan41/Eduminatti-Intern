const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect, admin);
router.route('/').get(getAllUsers);
router.route('/:id').delete(deleteUser);
router.route('/:id/role').put(updateUserRole);

module.exports = router;
