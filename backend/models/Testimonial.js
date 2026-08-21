const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true },
    review: { type: String, required: true },
    projectType: { type: String, trim: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
