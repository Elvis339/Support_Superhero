require('dotenv').config(); // Sets up dotenv as soon as our application starts
require('./db/database');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const { elastic } = require('./services/elasticsearch/Elasticsearch');
const routes = require('./routes/index.js');

const app = express();
const router = express.Router();

const environment = process.env.NODE_ENV; // development
const port = process.env.PORT || 3001;

// Middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cors())
app.use('/uploads', express.static('uploads'));

if (environment === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.use('/api/v1', routes(router));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.use(logger('dev'));
  app.use('/api/v1', routes(router));
}

elastic
  .ping()
  .then(() => app.listen(port, () => {
    console.log(`Server now listening at http://localhost:${port}`);
  }))
  .catch(() => {
    console.log('Elasticsearch server not responding...');
    process.exit(1);
  });

module.exports = app;
