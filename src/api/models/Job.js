const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  position: { type: String, required: true },
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  location: { type: String, required: true },
  contractType: { type: String, required: true },
  remoteWorkType: { type: String, required: true },
  salaryRange: { type: String, default: null },
  postedTime: { type: String, required: true },
  jobLink: { type: String, required: true },
  companyImage: { type: String, required: true },
  companyLogo: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);