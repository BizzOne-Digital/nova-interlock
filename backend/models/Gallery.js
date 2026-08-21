const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    category: { type: String, trim: true },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySchema);
