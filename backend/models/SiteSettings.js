const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    businessName: { type: String, default: 'Nova Hardscapes' },
    phone: { type: String, default: '613-213-8000' },
    serviceArea: { type: String, default: 'Ottawa, Ontario' },
    serviceAreas: [{ type: String }],
    specialOffer: { type: String, default: 'Neighbourhood Discounts Available' },
    tagline: { type: String, default: "Ottawa's Interlock & Landscaping Experts" },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
