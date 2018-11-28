/**
 * constants for events that happen in the game that will be captured by the `gameEmitter` in `gameManager.js`
 *
 */
const GAME_EVENTS = {
  // the ball has collided with a wall
  BALL_HIT_WALL: 'BALL_HIT_WALL',

  // the ball has collided with any player
  BALL_HIT_PLAYER: 'BALL_HIT_PLAYER',

  // the ball has collided with the current player
  BALL_HIT_PRIMARY_PLAYER: 'BALL_HIT_PRIMARY_PLAYER',

  // the ball has collided with the other player
  BALL_HIT_SECONDARY_PLAYER: 'BALL_HIT_SECONDARY_PLAYER',

  // ball went to an end zone
  BALL_TO_END: 'BALL_TO_END',
};

export default GAME_EVENTS;
