const Job = require('../models/Job');

exports.getAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const filter = {};
    if (req.query.contractType) filter.contractType = req.query.contractType;
    if (req.query.remoteWorkType) filter.remoteWorkType = req.query.remoteWorkType;
    
    const jobs = await Job.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
      
    const total = await Job.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: jobs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid job ID'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    
    res.status(201).json({
      success: true,
      data: job
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        errors: messages
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        errors: messages
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};