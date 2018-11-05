import io from 'socket.io-client';

const client = io('http://localhost:666', {
  reconnectionAttempts: 3,
});

// this is not a good implementation, have to actually make this a proper class later

export default client;
