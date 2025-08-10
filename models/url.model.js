const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  visits: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  // Mongoose will automatically add createdAt and updatedAt fields
  timestamps: true,
});

module.exports = mongoose.model('Url', urlSchema);