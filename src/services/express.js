const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const configureExpress = (app) => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '10kb' }));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  });
  app.use(limiter);
};

module.exports = configureExpress;