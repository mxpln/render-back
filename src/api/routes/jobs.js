const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const validateJob = require('../middleware/validateJob');

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJob);
router.post('/', validateJob, jobController.createJob);
router.put('/:id', validateJob, jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

module.exports = router;