const express = require('express');
const router = express.Router();
const {
  getSchools,
  getSchoolBySlugOrId,
  getFeaturedSchools,
  getGirlsBoardingSchools,
  compareSchools,
  createSchool,
  updateSchool,
  deleteSchool,
  getSchoolStats,
} = require('../controllers/schoolController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getSchools).post(protect, admin, createSchool);
router.get('/featured', getFeaturedSchools);
router.get('/girls-boarding', getGirlsBoardingSchools);
router.get('/compare', compareSchools);
router.get('/stats/overview', protect, admin, getSchoolStats);
router
  .route('/:slugOrId')
  .get(getSchoolBySlugOrId)
  .put(protect, admin, updateSchool)
  .delete(protect, admin, deleteSchool);

module.exports = router;

