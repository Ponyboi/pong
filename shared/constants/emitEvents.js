/**
 * constants for events that gets sent from the client (to server)
 */
const CLIENT_EVENTS = {
  // sending user's current gameState
  GAMESTATE_SEND: 'GAMESTATE_SEND',

  // ball went to an end zone
  BALL_TO_END: 'BALL_TO_END',
};

/**
 * constants for events sent out from the server (to client)
 */
const SERVER_EVENTS = {
  // number of players changed
  PLAYERS_CHANGED: 'PLAYERS_CHANGED',

  // server has the updated gamestate for client
  GAMESTATE_CHANGED: 'GAMESTATE_CHANGED',

  // the ball is reset
  BALL_RESET: 'BALL_RESET',
};

export {
  CLIENT_EVENTS,
  SERVER_EVENTS,
}
