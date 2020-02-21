const ioSocket = require('socket.io');

const init = (server, socketPath) => ioSocket(server, {
  path: socketPath,
  origins: '*:*',
  forceNew: true,
  timeout: 10000,
  transports: ['websocket'],
});

const socketListener = (io) => {
  io.on('connection', (socket) => {
    socket.on('notifications', (props) => console.log(props));
  });
};

module.exports = {
  init,
  socketListener,
};
