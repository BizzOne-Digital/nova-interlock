const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    location: { type: String, default: 'Ottawa, Ontario' },
    category: {
      type: String,
      enum: ['Driveways', 'Patios', 'Walkways', 'Steps', 'Retaining Walls', 'Landscaping'],
      required: true,
    },
    description: { type: String },
    coverImage: imageSchema,
    galleryImages: [imageSchema],
    beforeImage: imageSchema,
    afterImage: imageSchema,
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
