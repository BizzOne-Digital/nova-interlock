const express = require('express');
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getLeadStats,
} = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

const leadFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many submissions. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post(
  '/',
  leadFormLimiter,
  [
    body('fullName').trim().notEmpty().withMessage('Full name is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('email').optional({ checkFalsy: true }).isEmail().withMessage('Invalid email'),
    body('service').notEmpty().withMessage('Service is required'),
  ],
  validate,
  createLead
);

router.get('/', protect, getLeads);
router.get('/stats', protect, getLeadStats);
router.get('/:id', protect, getLeadById);
router.put('/:id', protect, updateLead);
router.delete('/:id', protect, deleteLead);

module.exports = router;
