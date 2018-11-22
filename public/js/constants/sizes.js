/**
 * global default sizes for components
 *  modern phones are 18:9, but I think most common is 16:9
 *
 * @typedef {Object} Size
 * @property {Number} Size.width
 * @property {Number} Size.height
 */

/** @type {Size} */
export const GAME_SIZE = {
  width: 340,
  height: 600,
};

/** @type {Size} */
export const PADDLE_SIZE = {
  width: 85,
  height: 13,
};

/** @type {Size} */
export const DASH_SIZE = {
  width: 10,
  height: 3,
};

/** @type {Size} */
export const BALL_SIZE = {
  width: 20,
  height: 20,
};

/** @type {Object} */
export const PLAYER_LIMITS = {
  rightEnd: GAME_SIZE.width,
  leftEnd: 0,
};
