import SocketClient from 'components/SocketClient';

import { handleNewPlayer } from 'managers/gameManager';
import { handleOtherPlayerInput } from 'managers/pixiManager';

/*
  attach event listeners onto our SocketClient, and handle what to do with it
*/

// this one's meant to be a very broad update event, handling new player is just temporary
SocketClient.on('update', handleNewPlayer);

// received an event from the server indicating that another player made an input
// note this is not an ideal design choice but servers as an example
SocketClient.on('playerInput', handleOtherPlayerInput)
