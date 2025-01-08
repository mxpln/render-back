require('dotenv').config();
const express = require('express');
const connectDB = require('./services/database');
const configureExpress = require('./services/express');
const errorHandler = require('./api/middleware/errorHandler');
const routes = require('./api/routes');

const app = express();
app.set('trust proxy', 1 /* number of proxies between user and server */)
app.get('/ip', (request, response) => response.send(request.ip))

const port = process.env.PORT || 3010;

// Configure Express
configureExpress(app);

// Routes
app.use('/', routes);

// Error handling
app.use(errorHandler);

// Connect to database and start server
const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

startServer().catch(console.error);