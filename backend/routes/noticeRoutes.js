const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Notice = require('../models/Notice');

const router = express.Router();

// 📁 Ensure 'uploads' folder exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 📂 Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// 🔹 POST /api/notices → Create a new notice with optional file
router.post('/', upload.single('attachment'), async (req, res) => {
  try {
    const { title, content, postedBy, category } = req.body;
    const attachment = req.file ? req.file.filename : null;

    if (!title || !content || !postedBy || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const notice = new Notice({
      title,
      content,
      postedBy,
      category,
      attachment,
    });

    await notice.save();
    res.status(201).json({ message: 'Notice posted successfully with file', notice });
  } catch (err) {
    console.error('❌ Error posting notice:', err);
    res.status(500).json({ message: 'Server error while posting notice' });
  }
});

// 🔹 GET /api/notices → Fetch all notices
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    console.error('Error fetching notices:', err);
    res.status(500).json({ message: 'Server error while fetching notices' });
  }
});

// 🔹 DELETE /api/notices/:id → Delete a notice
router.delete('/:id', async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    // Optional: delete attached file if exists
    if (notice.attachment) {
      const filePath = path.join(uploadDir, notice.attachment);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(200).json({ message: 'Notice deleted successfully' });
  } catch (err) {
    console.error('Error deleting notice:', err);
    res.status(500).json({ message: 'Server error while deleting notice' });
  }
});

// 🔹 Serve uploaded files publicly
router.use('/uploads', express.static(uploadDir));

module.exports = router;
