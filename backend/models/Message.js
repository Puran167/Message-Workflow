const mongoose = require('mongoose');

// Sub-schema for each approval step
const approvalSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ['hod', 'director', 'vp', 'ceo', 'chairman'],
  },
  approved: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Main Message schema
const messageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  submittedBy: {
    type: String, // employee email
    required: true,
  },
  recipient: {
    type: String,
    required: true,
    enum: ['hod', 'director', 'vp', 'ceo', 'chairman'],
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  approvals: {
    type: [approvalSchema],
    default: [], // ensures field always exists
  },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
