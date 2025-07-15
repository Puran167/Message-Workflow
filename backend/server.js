const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route imports
const seedRoute = require('./routes/seedRoute');
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messageRoutes');
const noticeRoutes = require('./routes/noticeRoutes');


// Route usage
app.use('/api/seed', seedRoute); // ✅ Important
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/notices/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(process.env.PORT || 5000, () =>
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
  );
})
.catch((err) => console.error('❌ MongoDB connection error:', err));
