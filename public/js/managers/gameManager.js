import SocketClient from 'components/SocketClient';
import pixiManager from 'pixiManager';

// functions
function handleUpdate(gameState) {
  console.log('handleNewPlayer');
  const { playerCount } = gameState.playerCount;
  const canvas = document.getElementById('app-header');
  canvas.innerText = `${playerCount} connected player(s)`;

  pixiManager.p
};

function updatePlayer(playerInput) {
  SocketClient.emit('updatePlayer', handleUpdate);
}


// events
SocketClient.on('update', handleUpdate);

// export object
const gameManager = {
  handleNewPlayer: handleUpdate,
};

export default gameManager;
