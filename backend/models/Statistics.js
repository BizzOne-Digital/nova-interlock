const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema(
  {
    projectsCompleted: { type: String, default: '100+' },
    yearsExperience: { type: String, default: '5+' },
    customerFocused: { type: String, default: '100%' },
    servingArea: { type: String, default: 'Ottawa' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Statistics', statisticsSchema);
