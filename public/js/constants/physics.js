import Point from '@studiomoniker/point';

/**
 * contains numbers for physics(?)
 *
 * @typedef {Number} Speed - scalar that reprersents how fast an object increases velocity
 * @typedef {Point} Velocity - vector that determines how an object is moving in the two directions
 * @typedef {Point} Limits.Min - minimum that velocity should be
 * @typedef {Point} Limits.Max - maximum that a velocity can be (after Math.abs())
*/

// GAME level physics
export const GAME_SPEED_MAX = 8;
export const GAME_VELOCITY_LIMITS = {
  min: new Point(0, 0),
  max: new Point(GAME_SPEED_MAX, GAME_SPEED_MAX),
};

// player
export const DEFAULT_PLAYER_SPEED = 3;
export const PLAYER_VELOCITY_LIMITS = {
  min: new Point(0, 0),
  max: new Point(GAME_SPEED_MAX, GAME_SPEED_MAX),
};

// ball
export const DEFAULT_BALL_SPEED = 3;
export const BALL_VELOCITY_LIMITS = {
  min: new Point(DEFAULT_BALL_SPEED, DEFAULT_BALL_SPEED),
  max: new Point(GAME_SPEED_MAX, GAME_SPEED_MAX),
};
