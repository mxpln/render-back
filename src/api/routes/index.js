const express = require('express');
const jobRoutes = require('./jobs');

const router = express.Router();

router.use('/api/jobs', jobRoutes);

module.exports = router;