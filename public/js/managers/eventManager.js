import SocketClient from 'components/SocketClient';

import { updatePrimaryPlayerState, updateSecondaryPlayerPos } from 'data/gameState';

import { convertPrimaryToSecondaryPos } from 'helpers/gamePositionHelper';

import { handleNewPlayer } from 'managers/gameManager';
import inputEmitter from 'managers/inputManager';

/*
  attach event listeners onto our SocketClient, and handle what to do with it
*/

// this one's meant to be a very broad update event, handling new player specifically is just temporary
SocketClient.on('update', handleNewPlayer);

// receiving the game state from the other player
SocketClient.on('newGameStateUpdate', (newGameState) => {
  // the other player's position is the secondary player to us
  const secondaryPlayerPos = convertPrimaryToSecondaryPos(newGameState.primaryPlayerPos);
  updateSecondaryPlayerPos(secondaryPlayerPos);
});
// handle input events
inputEmitter.on('leftDown', () => {
  updatePrimaryPlayerState('left');
});
inputEmitter.on('leftUp', () => {
  updatePrimaryPlayerState(null);
});
inputEmitter.on('rightDown', () => {
  updatePrimaryPlayerState('right');
});
inputEmitter.on('rightUp', () => {
  updatePrimaryPlayerState(null);
});
