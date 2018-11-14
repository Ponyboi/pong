import SocketClient from 'components/SocketClient';

import { updatePrimaryPlayerState } from 'data/gameState';

import { handleNewPlayer } from 'managers/gameManager';
import inputEmitter from 'managers/inputManager';
import { handleOtherPlayerInput } from 'managers/pixiManager';

/*
  attach event listeners onto our SocketClient, and handle what to do with it
*/

// this one's meant to be a very broad update event, handling new player specifically is just temporary
SocketClient.on('update', handleNewPlayer);

// received an event from the server indicating that another player made an input
// note this is not an ideal design choice but servers as an example
SocketClient.on('playerInput', handleOtherPlayerInput)

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
