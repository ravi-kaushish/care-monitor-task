require('dotenv').config();
const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
// const { CORS_CONFIG } = require('./utils/server/cors');
// const { Logger } = require('./middlewares/server/logger');
// const { RateLimiter } = require('./middlewares/server/rate-limiter');

// Initializing app
const app = express();

// Setting port to run app
const port = process.env.PORT || 8001;

// Using bodyparser middleware
app.use(parser.json());

app.use(cors());

// Root URL Giving user info about the application map
app.get('/', (req, res) => {
  res.send('Hello, your app is up and running!');
});

// App starts from here
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;