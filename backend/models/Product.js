const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: [
        'Interlock Pavers',
        'Patio Stones',
        'Retaining Wall Blocks',
        'Steps & Coping',
        'River Rock',
        'Decorative Stone',
        'Landscape Materials',
      ],
      required: true,
    },
    images: [
      {
        url: { type: String },
        publicId: { type: String },
      },
    ],
    description: { type: String },
    colors: [{ type: String }],
    style: { type: String },
    manufacturer: { type: String },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
