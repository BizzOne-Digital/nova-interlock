const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    address: { type: String, trim: true },
    service: {
      type: String,
      enum: [
        'Interlock Driveway',
        'Patio',
        'Walkway',
        'Steps / Porch',
        'Retaining Wall',
        'Excavation',
        'Decorative Stone',
        'Landscape Design',
        'Other',
      ],
      required: true,
    },
    message: { type: String, trim: true },
    preferredContactMethod: { type: String, enum: ['Phone', 'Email', 'Either'], default: 'Either' },
    preferredContactTime: { type: String, trim: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Quoted', 'Won', 'Lost'],
      default: 'New',
    },
    notes: [{ text: String, createdAt: { type: Date, default: Date.now } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
