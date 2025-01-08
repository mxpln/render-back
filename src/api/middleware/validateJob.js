const validateJob = (req, res, next) => {
  const { companyName, jobTitle, location, contractType, remoteWorkType, jobLink, companyLogo } = req.body;
  
  const errors = [];
  
  if (!companyName) errors.push('Company name is required');
  if (!jobTitle) errors.push('Job title is required');
  if (!location) errors.push('Location is required');
  if (!contractType) errors.push('Contract type is required');
  if (!remoteWorkType) errors.push('Remote work type is required');
  if (!jobLink) errors.push('Job link is required');
  if (!companyLogo) errors.push('Company logo is required');
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }
  
  next();
}

module.exports = validateJob;