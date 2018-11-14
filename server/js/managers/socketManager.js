import socketIO from 'socket.io';

/** @type {Socket.IO-server} */
let socketServer;

/** @type {Object} */
let clients = {}; // map of clients based on their socket.id

// listen in on that server
function listen(server) {
  socketServer = socketIO(server);

  // Client connected to us!
  socketServer.on('connection', (socket) => {
    const clientId = socket.id;

    // add client
    clients[clientId] = socket;

    // server tells everyone there's an update on player count
    socketServer.emit('playerUpdate', {
      playerCount: getClientCount(),
    });

    // generic message from one player to broadcast to others
    socket.on('message', (...data) => {
      socket.broadcast.emit('message', ...data);
    });

    // event - client disconnected so remove them and then tell everyone else
    socket.on('disconnect', () => {
      delete clients[clientId];

      socketServer.emit('playerUpdate', {
        playerCount: getClientCount(),
      });
    });

    // event - one client wants to update the game state
    socket.on('gameStateUpdate', (...data) => {
      socket.broadcast.emit('newGameStateUpdate', ...data);
    });
  });
};
/**
 * @returns {Number}
 */
const getClientCount = () => (Object.keys(clients).length);

// export object
const socketManager = {
  get socketServer() {
    return socketServer;
  },
  get clients() {
    return clients;
  },
  listen: listen,
  getClientCount: getClientCount,
};

export default socketManager;
