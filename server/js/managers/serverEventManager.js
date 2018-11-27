import Point from '@studiomoniker/point';

export function attachServerEvents(socket) {
  //
  socket.on('ballEnd', () => {
    socket.broadcast.emit('resetBallFromServer', {
      ballVelocity: {x: -3, y: -3}
    })
  });


  // event - one client wants to update the game state
  socket.on('gameStateUpdate', (...data) => {
    socket.broadcast.emit('newGameStateUpdate', ...data);
  });
};

