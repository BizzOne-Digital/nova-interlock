const asyncHandler = require('express-async-handler');
const Testimonial = require('../models/Testimonial');

const getTestimonials = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' && req.admin ? {} : { published: true };
  const testimonials = await Testimonial.find(filter).sort({ featured: -1, createdAt: -1 });
  res.json({ success: true, count: testimonials.length, data: testimonials });
});

const createTestimonial = asyncHandler(async (req, res) => {
  const { clientName, review, projectType, rating, featured, published } = req.body;
  const testimonial = await Testimonial.create({
    clientName,
    review,
    projectType,
    rating,
    featured,
    published,
  });
  res.status(201).json({ success: true, data: testimonial });
});

const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }

  Object.assign(testimonial, req.body);
  await testimonial.save();
  res.json({ success: true, data: testimonial });
});

const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }
  await testimonial.deleteOne();
  res.json({ success: true, message: 'Testimonial deleted' });
});

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
