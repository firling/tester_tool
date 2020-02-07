const socket = require('socket.io');

let io;
exports.initSocketServer = (server, { path }) => {
  io = socket(server, { path });
  io.on('connect', socket => {
    //nothing
  });
};

exports.ioEmit = (arg, msg) => {
  io.emit(arg);
};
