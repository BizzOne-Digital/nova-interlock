const express = require('express');
const { body } = require('express-validator');
const { loginAdmin, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

router.post(
  '/login',
  [body('email').isEmail().withMessage('Valid email required'), body('password').notEmpty()],
  validate,
  loginAdmin
);
router.get('/me', protect, getMe);

module.exports = router;
