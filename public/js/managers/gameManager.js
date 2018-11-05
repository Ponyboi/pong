import SocketClient from 'components/SocketClient';

// functions
function handleNewPlayer(message) {
  const canvas = document.getElementById('canvas');
  // canvas.innerText = `currently ${message.players} players`;
};

// events
SocketClient.on('update', handleNewPlayer);

// export object
const gameManager = {
  handleNewPlayer
};

export default gameManager;
