import socketIO from 'socket.io';

// socket.io server
let socketServer;

// client cache
let clients = [];

function listen(server) {
  socketServer = socketIO(server);

  io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });

};

// export object
const socketManager = {
  get io() {
    return io;
  },
  get clients() {
    return clients;
  },
  listen: listen,
};

export default socketManager;
