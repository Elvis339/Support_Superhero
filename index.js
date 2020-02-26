const httpServer = require('http').createServer();
const server = require('./app');

const ENV = process.env.NODE_ENV || 'development';
const CONFIG = require('./config');

global.io = require('socket.io').listen(httpServer);

httpServer.listen(CONFIG[ENV].socketPort, CONFIG[ENV].socketUrl, () => {
  console.info(`Socket server started on ${CONFIG[ENV].socketUrl}:${CONFIG[ENV].socketPort} (${ENV})`);
});

const src = server;

module.exports = src;
