const express = require('express');
const {
  getAllContent,
  getContentSection,
  updateContentSection,
  getStatistics,
  updateStatistics,
} = require('../controllers/contentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllContent);
router.get('/statistics/data', getStatistics);
router.put('/statistics/data', protect, updateStatistics);
router.get('/:section', getContentSection);
router.put('/:section', protect, updateContentSection);

module.exports = router;
