require('dotenv').config(); // Sets up dotenv as soon as our application starts
require('./db/database');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const routes = require('./routes/index.js');

const app = express();
const router = express.Router();

const ENV = process.env.NODE_ENV;

// Middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cors());
app.use('/uploads', express.static('uploads'));

if (ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.use('/api/v1', routes(router));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.use(logger('dev'));
  app.use('/api/v1', routes(router));
}

module.exports = app;
