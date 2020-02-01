const socket_io = require('socket.io');
let io = null;

exports.io = () => io

exports.init = server => {
    return io = socket_io(server)
}
