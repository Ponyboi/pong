import EventEmitter from 'events';

import SocketClient from 'common/SocketClient';

import { resetBallToCenter } from 'managers/pixiManager';

/**
 * Emitter for all game events
 */
export const gameEmitter = new EventEmitter();
/**
 * adds a new player
 *
 * @param {Object} message - from server
 */
export function handleNewPlayer(message = {}) {
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
