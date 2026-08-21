const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await Admin.findById(decoded.id).select('-password');
      if (admin) req.admin = admin;
    } catch (error) {
      // ignore invalid token for optional auth
    }
  }
  next();
};

module.exports = optionalAuth;
