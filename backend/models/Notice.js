// models/Notice.js
const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postedBy: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'General', // ✅ default to 'General'
  },
  attachment: {
    type: String, // ✅ for file (image or PDF)
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);
