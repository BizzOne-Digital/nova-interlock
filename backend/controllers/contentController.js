const asyncHandler = require('express-async-handler');
const SiteContent = require('../models/SiteContent');
const Statistics = require('../models/Statistics');

// GET /api/content
const getAllContent = asyncHandler(async (req, res) => {
  const content = await SiteContent.find();
  const map = {};
  content.forEach((c) => (map[c.section] = c.data));
  res.json({ success: true, data: map });
});

// GET /api/content/:section
const getContentSection = asyncHandler(async (req, res) => {
  const content = await SiteContent.findOne({ section: req.params.section });
  res.json({ success: true, data: content?.data || {} });
});

// PUT /api/content/:section (admin)
const updateContentSection = asyncHandler(async (req, res) => {
  const content = await SiteContent.findOneAndUpdate(
    { section: req.params.section },
    { data: req.body },
    { new: true, upsert: true }
  );
  res.json({ success: true, data: content.data });
});

// GET /api/content/statistics/data
const getStatistics = asyncHandler(async (req, res) => {
  let stats = await Statistics.findOne();
  if (!stats) stats = await Statistics.create({});
  res.json({ success: true, data: stats });
});

// PUT /api/content/statistics/data (admin)
const updateStatistics = asyncHandler(async (req, res) => {
  let stats = await Statistics.findOne();
  if (!stats) stats = new Statistics();
  Object.assign(stats, req.body);
  await stats.save();
  res.json({ success: true, data: stats });
});

module.exports = {
  getAllContent,
  getContentSection,
  updateContentSection,
  getStatistics,
  updateStatistics,
};
