// import Point from '@studiomoniker/point';

/**
 * adds some event listeners for events that are related to
 *
 * @parma {Socket} socket
 */
export function attachGameEventHandler(socket) {
  //
  socket.on('ballEnd', () => {
    socket.broadcast.emit('resetBallFromServer', {
      ballVelocity: {x: -3, y: -3}
    })
  });

  // one client wants to update the game state
  socket.on('gameStateUpdate', (...data) => {
    socket.broadcast.emit('newGameStateUpdate', ...data);
  });
};
