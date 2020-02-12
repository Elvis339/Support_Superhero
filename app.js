require('dotenv').config(); // Sets up dotenv as soon as our application starts

const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const { elastic } = require('./services/elasticsearch/Elasticsearch')
const bodyParser = require('body-parser')
const logger = require('morgan')
const routes = require('./routes/index.js');

const app = express();
const router = express.Router();

const server = http.createServer(app)

// INIT SOCKER SERVICE
const io = socketio(server)
let emitter = require('./controllers/events/Event')
let saveEmitter = emitter.myEmitter;

io.on('connect', socket => {
    saveEmitter.on('notification', prop => {
        socket.emit('notifications', prop)
    })
})
process.nextTick(() => saveEmitter.removeAllListeners('notification'))


const environment = process.env.NODE_ENV; // development
const port = process.env.PORT || 3001

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

if (environment === 'production') {
    app.use('/api/v1', routes(router))
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
} else {
    app.use(logger('dev'));
    app.use('/api/v1', routes(router))
}


elastic.ping().then(() => {
    return server.listen(port, () => {
        console.log(`Server now listening at http://localhost:${port}`);
    });
}).catch(() => {
    console.log("Elasticsearch server not responding...")
    process.exit(1);
})

module.exports = app;
