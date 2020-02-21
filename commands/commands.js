/* eslint-disable no-confusing-arrow */
/* eslint-disable no-console */
/* eslint-disable camelcase */
require('dotenv').config(); // Sets up dotenv as soon as our application starts

const path = require('path');
const chalk = require('chalk');
const axios = require('axios');
const rimraf = require('rimraf');
const { GET_ROOT_PATH } = require('../utils');

const { log } = console;

const chalkStates = {
  error: (message) => {
    log(chalk.inverse.red(message));
  },
  success: (message) => {
    log(chalk.inverse.green(message));
  },
};

module.exports = {
  chalkStates,

  fetchJoke: async () => {
    const API_URL = 'http://api.icndb.com/jokes/random';

    try {
      const response = await axios.get(API_URL);
      return chalkStates.success(response.data.value.joke);
    } catch (error) {
      return chalkStates.error(error);
    }
  },

  deleteUploadDirectory: () => rimraf(path.join(GET_ROOT_PATH('commands'), 'uploads'), (error) => {
    if (error) {
      return chalkStates.error(error);
    }
    return chalkStates.success('Uploads directory removed 🎳🎳🎳🎳');
  }),

  elasticPurge: async () => {
    try {
      await axios.delete('http://localhost:9200/documents/');
      return chalkStates.success('Elastic cluster purged 🧹🧹🧹🧹');
    } catch (error) {
      if (error.response.status === 404) {
        return chalkStates.error(
          'documents index is either deleted or never created',
        );
      }
      return chalkStates.error(error.response);
    }
  },
};
