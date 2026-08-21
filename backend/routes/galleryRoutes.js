const express = require('express');
const {
  getGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');
const optionalAuth = require('../middleware/optionalAuth');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', optionalAuth, getGalleryImages);
router.post('/', protect, upload.single('image'), createGalleryImage);
router.put('/:id', protect, upload.single('image'), updateGalleryImage);
router.delete('/:id', protect, deleteGalleryImage);

module.exports = router;
