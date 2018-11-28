import Point from '@studiomoniker/point';

import { CLIENT_EVENTS, SERVER_EVENTS } from 'constants/emitEvents';
import {
  DEFAULT_BALL_SPEED,
} from 'constants/physics';

/**
 * adds some event listeners for events that are related to
 *
 * @parma {Socket} socket
 */
export function attachGameEventHandler(socket) {
  socket.on(CLIENT_EVENTS.BALL_TO_END, () => {
    handleBallToEnd(socket);
  });

  // one client wants to update the game state
  socket.on('gameStateUpdate', (...data) => {
    socket.broadcast.emit('newGameStateUpdate', ...data);
  });
};
/**
 * client has told us ball hit an end
 *  unfortunately the Point class doesn't get transmitted and will instead only be {x, y}
 *
 * @parma {Socket} socket
 */
function handleBallToEnd(socket) {
  const newBallVelocity = new Point(DEFAULT_BALL_SPEED, DEFAULT_BALL_SPEED);

  // randomize directions
  if (Math.round(Math.random())) {
    newBallVelocity.invertX();
  };
  if (Math.round(Math.random())) {
    newBallVelocity.invertY();
  };

  socket.emit(SERVER_EVENTS.BALL_RESET, newBallVelocity);
  socket.broadcast.emit(SERVER_EVENTS.BALL_RESET, newBallVelocity);
};
