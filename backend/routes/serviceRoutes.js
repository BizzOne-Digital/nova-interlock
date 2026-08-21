const express = require('express');
const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');
const optionalAuth = require('../middleware/optionalAuth');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', optionalAuth, getServices);
router.get('/:id', getServiceById);
router.post('/', protect, upload.single('image'), createService);
router.put('/:id', protect, upload.single('image'), updateService);
router.delete('/:id', protect, deleteService);

module.exports = router;
