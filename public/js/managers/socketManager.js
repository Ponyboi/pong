import io from 'socket.io-client';

const serverUrl = 'http://localhost:666';

// connect client
const client = io(serverUrl, {
  reconnection: false,
});

export default client;
