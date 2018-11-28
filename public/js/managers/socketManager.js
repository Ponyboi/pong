import io from 'socket.io-client';

/**
 * start a connection to the server
 */
const serverUrl = 'http://localhost:666';
const socketManager = io(serverUrl, {
  reconnection: false,
});

export default socketManager;
