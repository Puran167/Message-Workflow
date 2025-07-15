const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const { sendWelcomeEmail } = require('../utils/sendEmail'); // ✅ Import email sender

const router = express.Router();

router.post('/add-user', authenticate, authorizeRoles('ceo', 'chairman'), async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email: normalizedEmail,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    // ✅ Send Welcome Email
    await sendWelcomeEmail(normalizedEmail, username);

    res.status(201).json({ message: '✅ User added and welcome email sent!' });
  } catch (err) {
    console.error('Error adding user:', err.message);
    res.status(500).json({ error: '❌ Server error. Try again.' });
  }
});

module.exports = router;
