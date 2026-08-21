const asyncHandler = require('express-async-handler');
const SiteSettings = require('../models/SiteSettings');

const getSettings = asyncHandler(async (req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) settings = await SiteSettings.create({});
  res.json({ success: true, data: settings });
});

const updateSettings = asyncHandler(async (req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) settings = new SiteSettings();
  Object.assign(settings, req.body);
  await settings.save();
  res.json({ success: true, data: settings });
});

module.exports = { getSettings, updateSettings };
