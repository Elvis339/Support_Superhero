const httpServer = require('http').createServer();
const server = require('./app');

const ENV = process.env.NODE_ENV || 'development';
const { socket } = require('./config');

global.io = require('socket.io').listen(httpServer);

httpServer.listen(socket.socketServerPort, socket.socketServerUrl, () => {
  console.info(`Socket server started on ${socket.socketServerPort}:${socket.socketServerUrl} (${ENV})`);
});

const src = server;

module.exports = src;
