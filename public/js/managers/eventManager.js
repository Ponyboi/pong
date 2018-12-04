import Point from '@studiomoniker/point';

import { gameEmitter } from 'managers/gameManager';
import { inputEmitter } from 'managers/inputManager';
import { resetBallToCenter } from 'managers/pixiManager';
import socketManager from 'managers/socketManager';

import gameState, {
  togglePauseState,
  updatePrimaryPlayerActionState,
  updateBallVelocityState,
  updateSecondaryPlayerPositionState,
  updatePrimaryPlayerScore,
  updateSecondaryPlayerScore,
} from 'data/gameState';

import GAME_EVENTS from 'constants/gameEvents';
import { CLIENT_EVENTS, SERVER_EVENTS } from 'constants/emitEvents';

import { convertPrimaryToSecondaryPos } from 'helpers/gamePositionHelper';

// handle input events
inputEmitter.on('leftDown', () => {
    updatePrimaryPlayerActionState('left');
});
inputEmitter.on('leftUp', () => {
  if (gameState.primaryPlayerState === 'left') {
    updatePrimaryPlayerActionState(null);
  }
});
inputEmitter.on('rightDown', () => {
  updatePrimaryPlayerActionState('right');
});
inputEmitter.on('rightUp', () => {
  if (gameState.primaryPlayerState === 'right') {
    updatePrimaryPlayerActionState(null);
  }
});
inputEmitter.on('pauseDown', () => {
  togglePauseState();
});

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
