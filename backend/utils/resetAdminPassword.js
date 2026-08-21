require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');

(async () => {
  await connectDB();
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;
  const admin = await Admin.findOne({ email });
  if (!admin) {
    console.log('No admin found with that email, creating one.');
    await Admin.create({ name: 'Nova Admin', email, password, role: 'superadmin' });
  } else {
    admin.password = password;
    await admin.save();
    console.log('Password updated for', email);
  }
  await mongoose.connection.close();
  process.exit(0);
})();
