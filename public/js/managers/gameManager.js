import EventEmitter from 'events';

import { SERVER_EVENTS } from 'constants/emitEvents';

import socketManager from 'managers/socketManager';

/**
 * Emitter for all game events
 */
export const gameEmitter = new EventEmitter();

/**
 *
 */
socketManager.on(SERVER_EVENTS.PLAYERS_CHANGED, handlePlayersChanged);
/**
 * handles players count changing
 *
 * @param {Object} data - from server
 */
function handlePlayersChanged(data = {}) {
  const { playerCount } = data;

  const canvas = document.getElementById('app-header');
  canvas.innerText = `${playerCount} connected player(s)`;
};
