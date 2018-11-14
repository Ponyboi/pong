import socketIO from 'socket.io';
import gameState from 'components/gameState';

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
    gameState.players[clientId] = { x: 0, y: 0 };

    // server tells everyone there's an update on player count
    socketServer.emit('update', {
      gameState: gameState
    });

    // event - client disconnected so remove them and then tell everyone else
    socket.on('disconnect', () => {
      delete clients[clientId];
      delete gameState.players[clientId];
      gameState.updatePlayerCount();

      socketServer.emit('update', {
        gameState: gameState
      });
    });
    socket.on('update', () => {
      delete clients[clientId];
      delete gameState.players[clientId];
      gameState.updatePlayerCount();

      socketServer.emit('update', {
        gameState: gameState
      });
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
