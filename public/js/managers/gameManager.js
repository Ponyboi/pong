import EventEmitter from 'events';
import Point from '@studiomoniker/point';

import GAME_EVENTS from 'constants/gameEvents';
import { CLIENT_EVENTS, SERVER_EVENTS } from 'constants/emitEvents';

import {
  // updateBallPositionState,
  updateBallVelocityState,
  updateSecondaryPlayerPositionState,
  updatePrimaryPlayerScore,
  updateSecondaryPlayerScore,
} from 'data/gameState';

import { convertPrimaryToSecondaryPos } from 'helpers/gamePositionHelper';

import socketManager from 'managers/socketManager';
import { resetBallToCenter } from 'managers/pixiManager';

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
 * receiving the game state from the other player
 */
socketManager.on(SERVER_EVENTS.GAMESTATE_CHANGED, (newGameState = {}) => {
  const {
    secondaryPlayerPos,
  } = newGameState;

  // convert the other player's position is the secondary player to us
  const newSecondaryPlayerPos = convertPrimaryToSecondaryPos(secondaryPlayerPos);
  updateSecondaryPlayerPositionState(newSecondaryPlayerPos);
});
/**
 * server told us ball is resetting
 */
socketManager.on(SERVER_EVENTS.BALL_RESET, (newBallVelocity) => {
  const ballVelocity = new Point(newBallVelocity.x, newBallVelocity.y);
  updateBallVelocityState(ballVelocity);
  resetBallToCenter();
});
/**
 * server told us we scored!!
 */
socketManager.on(SERVER_EVENTS.SCORE_PRIMARY_INCREMENT, () => {
  updatePrimaryPlayerScore();
});
/**
 * server told us the other player scored :()
 */
socketManager.on(SERVER_EVENTS.SCORE_SECONDARY_INCREMENT, () => {
  updateSecondaryPlayerScore();
});
/**
 * listen to when the ball has gone to this player's end zone, and let the player know they scored
 */
gameEmitter.on(GAME_EVENTS.BALL_TO_PRIMARY_END, () => {
  socketManager.emit(CLIENT_EVENTS.BALL_TO_PRIMARY_END);
});


