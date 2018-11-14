import SocketClient from 'components/SocketClient';

import { updatePrimaryPlayerState } from 'data/gameState';

import { handleNewPlayer } from 'managers/gameManager';
import inputEmitter from 'managers/inputManager';

/*
  attach event listeners onto our SocketClient, and handle what to do with it
*/

// this one's meant to be a very broad update event, handling new player specifically is just temporary
SocketClient.on('update', handleNewPlayer);

// receiving the game state from the other player
SocketClient.on('newGameStateUpdate', (newGameState) => {
  console.log('received new game state');
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
