import socketIO from 'socket.io';

/** @type {Socket.IO-server} */
let socketServer;

/** @type {Object} */
let clients = {}; // map of clients based on their socket.id

function listen(server) {
  socketServer = socketIO(server);

  // Client connected to us!
  socketServer.on('connection', (socket) => {
    const clientId = socket.id;

    // add client
    clients[clientId] = socket;

    // tell client how many other players there are
    socket.emit('update', {players: Object.keys(clients).length});

    // event - client disconnected, remove them
    socket.on('disconnect', () => {
      clients[clientId] = null;
    });
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
