/* eslint-disable global-require */
const ENV = process.env.NODE_ENV;
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const app = require('./app');

const { production, development } = require('./config');
const { elastic } = require('./services/elasticsearch/Elasticsearch');

if (ENV === 'production') {
  const SSL = production.sslPath;

  const httpsOpts = {
    cert: fs.readFileSync(path.join(SSL, 'server.crt')),
    key: fs.readFileSync(path.join(SSL, 'server.key')),
  };

  const httpsServer = https.createServer(httpsOpts, app);

  elastic
    .ping()
    .then(() => httpsServer.listen(production.port, () => {
      process.stdout.write(`Server started at ${production.url}:${production.port}`);
    }))
    .catch(() => {
      process.stdout.write('ElasticSearch server is not responding...');
      process.exit(1);
    });

  global.io = require('socket.io').listen(httpsServer);

  const src = app;

  module.exports = src;
} else {
  const httpServer = http.createServer(app);

  elastic
    .ping()
    .then(() => httpServer.listen(development.port, () => {
      process.stdout.write(`Development server started at ${development.url}:${development.port}`);
    }))
    .catch(() => {
      process.stdout.write('ElasticSearch server is not responding...');
      process.exit(1);
    });

  global.io = require('socket.io').listen(httpServer);

  const src = app;

  module.exports = src;
}
