import SocketClient from 'components/SocketClient';

import { handleNewPlayer } from 'managers/gameManager';

/*
  attach event listeners onto our SocketClient, and handle what to do with it
*/

// this one's meant to be a very broad update event, handling new player is just temporary
SocketClient.on('update', handleNewPlayer);
