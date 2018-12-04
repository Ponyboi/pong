import EventEmitter from 'events';

import { SERVER_EVENTS } from 'constants/emitEvents';
import gameState, {
  togglePauseState,
} from 'data/gameState';

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

/**
 *
 */
const pauseBtn = document.getElementById('pause-btn');
pauseBtn.addEventListener('click', togglePause);
/**
 *
 */
function togglePause() {
  togglePauseState();

  const nowPaused = gameState.isPaused;
  if (nowPaused) {
    pauseBtn.innerText = 'Unpause';
  } else {
    pauseBtn.innerText = 'Pause';
  }
}
