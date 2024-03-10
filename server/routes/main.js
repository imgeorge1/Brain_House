const express = require('express');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/', authRoutes);

module.exports = router;
