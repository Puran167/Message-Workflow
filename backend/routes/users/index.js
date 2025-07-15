// routes/users/index.js
const express = require('express');
const router = express.Router();

router.use('/', require('./login'));

module.exports = router;
