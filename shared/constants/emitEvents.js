/**
 * constants for events that gets sent from the client (to server)
 */
const CLIENT_EVENTS = {
  // sending user's current gameState
  GAMESTATE_SEND: 'GAMESTATE_SEND',

  // ball went to an end zone
  BALL_TO_END: 'BALL_TO_END',

  // ball went to primary player's end zone
  BALL_TO_PRIMARY_END: 'BALL_TO_PRIMARY_END',

  // ball went to secondary player's end zone
  BALL_TO_SECONDARY_END: 'BALL_TO_SECONDARY_END',
  PAUSE_STATE_TOGGLE: 'PAUSE_STATE_TOGGLE',
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

  // increase primary player's score
  SCORE_PRIMARY_INCREMENT: 'SCORE_PRIMARY_INCREMENT',

  // increase secondary player's score
  SCORE_SECONDARY_INCREMENT: 'SCORE_SECONDARY_INCREMENT',
  PAUSE_STATE_TOGGLE: 'PAUSE_STATE_TOGGLE',
};

export {
  CLIENT_EVENTS,
  SERVER_EVENTS,
}
