import SocketClient from 'components/SocketClient';

import { resetBallToCenter } from 'managers/pixiManager';

/*
  singleton of functions to handle the game
*/
const gameManager = {
  handleNewPlayer: handleNewPlayer,
};
/**
 * adds a new player
 *
 * @param {Object} message - from server
 */
const handleNewPlayer = (message = {}) => {
  const { playerCount } = message;

  const canvas = document.getElementById('app-header');
  canvas.innerText = `${playerCount} connected player(s)`;

  // reset the ball when a new player joins... or leaves
  if (playerCount > 1) {
    SocketClient.emit('message', {
      action: 'resetBall',
    });
    resetBallToCenter();
  }
};

export default gameManager;
export {
  handleNewPlayer,
};
