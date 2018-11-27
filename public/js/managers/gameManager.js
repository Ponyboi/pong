import EventEmitter from 'events';

import SocketClient from 'common/SocketClient';

import GAME_EVENTS from 'constants/gameEvents';

import gameState from 'data/gameState';

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
};

/**
 * listen to when the ball hits the primaryPlayer (this player)
 *  and send out new game state
 */
gameEmitter.on(GAME_EVENTS.BALL_TO_END, () => {
  SocketClient.emit('ballEnd');
});
