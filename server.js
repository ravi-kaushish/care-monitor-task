require('dotenv').config();
const server = require('express')();

// Setting port to run app, default to 8000
const port = process.env.PORT || 8001;

// Setting Active Version for the API Server
const apiVersion = process.env.API_VERSION || 'v1';

// Using bodyparser middleware
server.use(require('body-parser').json({limit: '50mb'}));

// Application health endpoint
server.get('/', (req, res) => {
  res.send('Hello, your app is up and running!')
});

// Service discovery map endpoint
server.use('/server', require('./routes/server'));

// Will ingest Multiple type of Clinical Datapoints
server.use(`/api/${apiVersion}/clinical-data`, require('./routes/clinical-data'));

// App starts from here
server.listen(port, () => {
  console.log(`Server is started on port ${port}`)
});

module.exports = server;