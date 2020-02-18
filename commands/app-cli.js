/* eslint-disable no-unused-expressions */
require('dotenv').config();
const yargs = require('yargs');
const commandos = require('./commands');

yargs
  .version('1.0.0')
  .usage('Usage: nodejs-cli-app <command> [options]')
  .help('h')
  .command({
    command: 'joke',
    describe: 'Have a little fun :)',
    handler() {
      return commandos.fetchJoke();
    },
  })
  .command({
    command: 'es:purge',
    describe: 'Remove documents index from elasticsearch',
    handler() {
      return commandos.elasticPurge();
    },
  })
  .command({
    command: 'rm:uploads',
    describe: 'Delete uploads directory',
    handler() {
      return commandos.deleteUploadDirectory();
    },
  })
  .alias('h', 'help').argv;
