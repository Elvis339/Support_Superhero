const pingPong = (req, res) => {
  res.writeHead(200);
  res.end('Hello, World!');
};

const httpServer = require('http').createServer(pingPong);
const app = require('./app');

const { elastic } = require('./services/elasticsearch/Elasticsearch');

const ENV = process.env.NODE_ENV || 'development';
const CONFIG = require('./config');
const { socket } = require('./config');

elastic
  .ping()
  .then(() => app.listen(CONFIG[ENV].port, () => {
    console.log(`Server now listening at ${CONFIG[ENV].url}:${CONFIG[ENV].port}`);
  }))
  .catch(() => {
    console.log('Elasticsearch server not responding...');
    process.exit(1);
  });

httpServer.listen(socket.socketServerPort, socket.socketServerUrl, () => {
  console.info(`Socket server started on ${socket.socketServerUrl}:${socket.socketServerPort} (${ENV})`);
});

global.io = require('socket.io').listen(httpServer);

const src = app;

module.exports = src;
