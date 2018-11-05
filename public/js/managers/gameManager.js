import SocketClient from 'components/SocketClient';

// functions
function handleNewPlayer(message = {}) {
  console.log('handleNewPlayer');
  const { playerCount } = message;

  const canvas = document.getElementById('app-header');
  canvas.innerText = `${playerCount} connected player(s)`;
};

// events
SocketClient.on('update', handleNewPlayer);

// export object
const gameManager = {
  handleNewPlayer: handleNewPlayer,
};

export default gameManager;
