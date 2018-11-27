/**
 * constants for events that gets sent from the client (to server)
 */
const CLIENT_EVENTS = {
  // ball went to an end zone
  BALL_TO_END: 'BALL_TO_END',
};

/**
 * constants for events sent out from the server (to client)
 */
const SERVER_EVENTS = {
  // the ball is reset
  BALL_RESET: 'BALL_RESET',
};

export {
  CLIENT_EVENTS,
  SERVER_EVENTS,
}
