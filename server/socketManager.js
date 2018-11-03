import socketIO from 'socket.io';

// socket.io server
let socketServer;

// client cache
let clients = [];

function listen(server) {
  socketServer = socketIO(server);

  socketServer.on('connection', function (socket) {
    // add client
    clients.push(socket);

    // tell client how many other players there are
    socket.emit('update', {players: clients.length});
  });

};

// export object
const socketManager = {
  get socketServer() {
    return socketServer;
  },
  get clients() {
    return clients;
  },
  listen: listen,
};

export default socketManager;
