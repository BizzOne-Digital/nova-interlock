const asyncHandler = require('express-async-handler');
const Lead = require('../models/Lead');
const Service = require('../models/Service');
const Project = require('../models/Project');
const Gallery = require('../models/Gallery');
const Product = require('../models/Product');
const Testimonial = require('../models/Testimonial');

const getDashboardSummary = asyncHandler(async (req, res) => {
  const [totalLeads, newLeads, services, projects, galleryImages, products, testimonials, recentLeads] =
    await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'New' }),
      Service.countDocuments(),
      Project.countDocuments(),
      Gallery.countDocuments(),
      Product.countDocuments(),
      Testimonial.countDocuments(),
      Lead.find().sort({ createdAt: -1 }).limit(8),
    ]);

  res.json({
    success: true,
    data: {
      totalLeads,
      newLeads,
      services,
      projects,
      galleryImages,
      products,
      testimonials,
      recentLeads,
    },
  });
});

module.exports = { getDashboardSummary };
