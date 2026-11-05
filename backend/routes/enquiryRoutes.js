const express = require('express');
const router = express.Router();
const {
  submitEnquiry,
  getMyEnquiries,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
  getEnquiryStats,
} = require('../controllers/enquiryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(submitEnquiry).get(protect, admin, getAllEnquiries);
router.get('/my', protect, getMyEnquiries);
router.get('/stats', protect, admin, getEnquiryStats);
router
  .route('/:id')
  .put(protect, admin, updateEnquiryStatus)
  .delete(protect, admin, deleteEnquiry);

module.exports = router;
