const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const optionalAuth = require('../middleware/optionalAuth');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', optionalAuth, getProducts);
router.get('/:id', getProductById);
router.post('/', protect, upload.array('images', 10), createProduct);
router.put('/:id', protect, upload.array('images', 10), updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
