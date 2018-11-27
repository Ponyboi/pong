import SocketClient from 'common/SocketClient';
import Point from '@studiomoniker/point';

import {
  // updateBallPositionState,
  updateBallVelocityState,
  updatePrimaryPlayerActionState,
  updateSecondaryPlayerPositionState,
} from 'data/gameState';

import { convertPrimaryToSecondaryPos } from 'helpers/gamePositionHelper';

import { handleNewPlayer } from 'managers/gameManager';
import { inputEmitter } from 'managers/inputManager';
import { resetBallToCenter } from 'managers/pixiManager';

/*
  I guess this just passes events around???
*/

// the other player(s) is telling us something
SocketClient.on('message', (message = {}) => {
  console.log('SocketClient message', message);
  const { action } = message;

  switch(action) {
    case 'resetBall':
      resetBallToCenter();
      break;
    default:
      break;
  }
});

// number of players has changed
SocketClient.on('playerUpdate', handleNewPlayer);

// receiving the game state from the other player
SocketClient.on('newGameStateUpdate', (newGameState = {}) => {
  const {
    ballPosition,
    ballVelocity,
    primaryPlayerPos,
  } = newGameState;

  // convert the other player's position is the secondary player to us
  const secondaryPlayerPos = convertPrimaryToSecondaryPos(primaryPlayerPos);
  updateSecondaryPlayerPositionState(secondaryPlayerPos);

  // receive the new ball velocity
  // updateBallVelocityState(new Point(ballVelocity.x, ballVelocity.y));
});

//
SocketClient.on('resetBallFromServer', () => {
  console.log('resetBallFromServer');
  resetBallToCenter();
});

// handle input events
inputEmitter.on('leftDown', () => {
  updatePrimaryPlayerActionState('left');
});
inputEmitter.on('leftUp', () => {
  updatePrimaryPlayerActionState(null);
});
inputEmitter.on('rightDown', () => {
  updatePrimaryPlayerActionState('right');
});
inputEmitter.on('rightUp', () => {
  updatePrimaryPlayerActionState(null);
});
