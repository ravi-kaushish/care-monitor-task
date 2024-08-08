require('dotenv').config();
const server = require('express')();

// Setting port to run app, default to 8000
const port = process.env.PORT || 8000;

// Setting Active Version for the API Server
const apiVersion = process.env.API_VERSION || 'v1';

// Using bodyparser middleware
server.use(require('body-parser').json({ limit: `${ process.env.REQUEST_MAX_BODY_SIZE_MB || 5 }mb` }));

// Application health endpoint
server.get('/', (req, res) => {
  res.send('Hello, your app is up and running!');
});

// Service discovery map endpoint
server.use(`/api/${apiVersion}/server`, require('./routes/server'));

// Will ingest Multiple type of Clinical Datapoints
server.use(`/api/${apiVersion}/clinical-data`, require('./routes/clinical-data'));

// App starts from here
server.listen(port, () => {
  console.log(`---- Server is started on port ${port} ----`);
  if(process.env.ENABLE_SCHEMA_MIGRATION){
    require('./utils/db-migrations').RunSchemaMigrations()
  }
});

module.exports = server;
