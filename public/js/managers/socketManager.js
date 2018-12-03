import io from 'socket.io-client';

/**
 * start a connection to the server
 */
const serverUrl = (process.env.NODE_ENV === 'production') ? window.location.href + process.env.PORT : 'http://localhost:666';
const serverUrl = (!window.location.href.includes('localhost:666')) ? window.location.href : 'http://localhost:666';
const socketManager = io(serverUrl, {
  reconnection: false,
});

export default socketManager;
