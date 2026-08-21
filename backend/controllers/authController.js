const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');

// POST /api/auth/login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email: email?.toLowerCase() });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      success: true,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.admin });
});

module.exports = { loginAdmin, getMe };
