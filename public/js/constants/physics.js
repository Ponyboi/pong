/**
 * base horizontal speed of the paddle
 */
const DEFAULT_PLAYER_SPEED = 4;
/**
 * base horizontal speed of the paddle
 */
const BASE_BALL_VELOCITY = {
  x: 3,
  y: 3,
};
/**
 * multiplier that reduces velocity
 */
const VELOCITY_DRAG = 0.9;
/**
 * minimum velocity breakpoint where it should be equivalent to zero
 */
const VELOCITY_MIN = 0.15;

export {
  BASE_BALL_VELOCITY,
  DEFAULT_PLAYER_SPEED,
  VELOCITY_DRAG,
  VELOCITY_MIN,
}
