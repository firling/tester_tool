const socket = require('socket.io');

let io;
exports.initSocketServer = (server, { path }) => {
  io = socket(server, { path });
  io.on('connect', socket => {
    console.log('new socket connected');
  });
};

exports.ioEmit = (arg, msg) => {
  console.log('send socket event :', arg);
  io.emit(arg);
};
