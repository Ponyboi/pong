import Point from '@studiomoniker/point';

/**
 * contains numbers for physics(?)
 *
 * @typedef {Number} Speed - scalar that reprersents how fast an object increases velocity
 *
 * @typedef {Point} Velocity - vector that determines how an object is moving in the two directions
 *
 * @typedef {Object} VelocityLimits
 * @property {Point} VelocityLimits.min - minimum that velocity should be
 * @property {Point} VelocityLimits.max - maximum that a velocity can be (after Math.abs())
*/

// game level physics
/** @type {Speed} */
export const GAME_SPEED_MAX = 10;
/** @type {VelocityLimits} */
export const GAME_VELOCITY_LIMITS = {
  min: new Point(0, 0),
  max: new Point(GAME_SPEED_MAX, GAME_SPEED_MAX),
};

// player
/** @type {Speed} */
export const DEFAULT_PLAYER_SPEED = 1;
export const DEFAULT_PLAYER_ACCELERATION = 0.6;
/** @type {VelocityLimits} */
export const PLAYER_VELOCITY_LIMITS = {
  min: new Point(0, 0),
  max: new Point(5, 5),
};

// ball
/** @type {Speed} */
export const DEFAULT_BALL_SPEED = 3;
/** @type {VelocityLimits} */
export const BALL_VELOCITY_LIMITS = {
  min: new Point(DEFAULT_BALL_SPEED, DEFAULT_BALL_SPEED),
  max: new Point(GAME_SPEED_MAX, GAME_SPEED_MAX),
};
