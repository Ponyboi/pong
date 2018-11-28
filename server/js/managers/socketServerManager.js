import socketIO from 'socket.io';

import SocketClient from 'common/SocketClient';

import { SERVER_EVENTS } from 'constants/emitEvents';

/** @type {Socket.IO-server} */
let socketServer;

/** @type {Object} */
let clients = {}; // map of clients based on their socket.id

/**
 * attach this socket server manager to the server
 *
 * @param {HTTP Server}
 */
function listen(server) {
  socketServer = socketIO(server);

  socketServer.use(handshake);

  // Client connected to us!
  socketServer.on('connection', (socket) => {
    const socketId = socket.id;

    // server tells everyone there's an update on player count
    socketServer.emit(SERVER_EVENTS.PLAYERS_CHANGED, {
      playerCount: getClientCount(),
    });

    // event - client disconnected so remove them and then tell everyone else
    socket.on('disconnect', () => {
      delete clients[socketId];

      socketServer.emit('playerUpdate', {
        playerCount: getClientCount(),
      });
    });
  });
};
/**
 * intercepts new connections to keep track of them in cache
 *
 * @param {Socket} socket
 * @param {Function} next
 */
function handshake(socket, next) {
  // add client to our cache
  clients[socket.id] = new SocketClient(socket);

  return next();
}
/**
 * @returns {Number}
 */
function getClientCount() {
  return Object.keys(clients).length;
};
/**
 * primary singleton object
 */
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
