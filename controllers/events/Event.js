/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const { EventEmitter } = require('events');

const myEmitter = new EventEmitter();

['App', 'SlackWebhook', 'CrispWebhook', 'HelpScoutWebhook'].map((value, cb) => myEmitter.on(value, (cb) => cb));

exports.myEmitter = myEmitter;
