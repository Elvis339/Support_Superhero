const fs = require('fs');
const path = require('path');
const https = require('https');
const app = require('./app');

const { elastic } = require('./services/elasticsearch/Elasticsearch');

const SSL = path.join('');

const httpsOpts = {
  cert: fs.readFileSync(path.join(SSL, 'server.crt')),
  key: fs.readFileSync(path.join(SSL, 'server.key')),
};

elastic
  .ping()
  .then(() => https.createServer(httpsOpts, app).listen(443, () => console.log('running')))
  .catch(() => {
    console.log('ElasticSearch server is not responding...');
    process.exit(1);
  });
