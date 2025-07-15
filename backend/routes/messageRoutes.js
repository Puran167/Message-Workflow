const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Approval flow order
const approvalFlow = ['hod', 'director', 'vp', 'ceo', 'chairman'];

// 🔹 POST /api/messages → Submit a new message
router.post('/', async (req, res) => {
  try {
    const { title, content, recipient, submittedByEmail } = req.body;

    if (!title || !content || !recipient || !submittedByEmail) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMessage = new Message({
      title,
      content,
      recipient,
      submittedBy: submittedByEmail,
      status: 'pending',
      approvals: [],
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message submitted successfully' });
  } catch (err) {
    console.error('Error submitting message:', err);
    res.status(500).json({ message: 'Server error during submission' });
  }
});

// 🔹 GET /api/messages → Get all messages (optional email filter)
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    const filter = email ? { submittedBy: email } : {};
    const messages = await Message.find(filter).sort({ createdAt: -1 });

    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// 🔹 PUT /api/messages/:id/approve → Approve/Reject by current role
router.put('/:id/approve', async (req, res) => {
  const { role, decision } = req.body;
  const messageId = req.params.id;

  try {
    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    const currentStep = message.approvals.length;
    const expectedRole = approvalFlow[currentStep];

    if (role !== expectedRole) {
      return res.status(403).json({
        message: `Only ${expectedRole.toUpperCase()} can approve at this step.`,
      });
    }

    const alreadyApproved = message.approvals.some(a => a.role === role);
    if (alreadyApproved) {
      return res.status(400).json({ message: `${role} has already approved/rejected this.` });
    }

    message.approvals.push({
      role,
      approved: decision === 'approve',
      date: new Date(),
    });

    if (decision === 'reject') {
      message.status = 'rejected';
    } else if (message.approvals.length === approvalFlow.length) {
      message.status = 'approved';
    }

    await message.save();
    res.json({ message: 'Decision recorded', status: message.status });
  } catch (err) {
    console.error('Error during approval:', err);
    res.status(500).json({ message: 'Server error during approval' });
  }
});

module.exports = router;
