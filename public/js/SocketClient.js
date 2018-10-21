import io from 'socket.io-client';

const client = io('http://localhost:666');

client.on('connect', () => {
  console.log('connected');
})
