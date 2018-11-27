import * as PIXI from 'pixi.js';

import { GAME_SIZE } from 'constants/sizes';

import Point from '@studiomoniker/point';

/**
 * positions for the game stage and objects
 *  most of which are just the default position
 * (todo: what if screen is sized differently/dynamically?)
 *
 * @typedef {Object} Edge - defined by two points
 * @property {Point} Edge.p1
 * @property {Point} Edge.p2
 *
 * @typedef {Object} Edges - edge that define a side
 * @property {Edge} Edges.topEdge
 * @property {Edge} Edges.bottomEdge
 * @property {Edge} Edges.leftEdge
 * @property {Edge} Edges.rightEdge
 *
 * @typedef {Object} Bounds - position of each side
 * @property {Point} Bounds.top
 * @property {Point} Bounds.bottom
 * @property {Point} Bounds.left
 * @property {Point} Bounds.right
 */

/** @type {Point} */
export const GAME_CENTER_POS = new Point(
  GAME_SIZE.width / 2,
  GAME_SIZE.height / 2,
);
/** @type {Bounds} */
export const GAME_BOUNDS = {
  top: 0,
  bottom: GAME_SIZE.height,
  left: 0,
  right: GAME_SIZE.width,
};

/** @type {Edge} */
export const TOP_WALL_LINE = {
  p1: new Point(0, 0),
  p2: new Point(GAME_SIZE.width, 0),
};
/** @type {Edge} */
export const BOTTOM_WALL_LINE = {
  p1: new Point(0, GAME_SIZE.height),
  p2: new Point(GAME_SIZE.width, GAME_SIZE.height),
};
/** @type {Edge} */
export const LEFT_WALL_LINE = {
  p1: new Point(0, 0),
  p2: new Point(0, GAME_SIZE.height),
};
/** @type {Edge} */
export const RIGHT_WALL_LINE = {
  p1: new Point(GAME_SIZE.width, 0),
  p2: new Point(GAME_SIZE.width, GAME_SIZE.height),
};
/**
 * these are the edges that make up the wall
 *
 * @type {Edges}
 */
export const GAME_EDGES = {
  topEdge: TOP_WALL_LINE,
  bottomEdge: BOTTOM_WALL_LINE,
  leftEdge: LEFT_WALL_LINE,
  rightEdge: RIGHT_WALL_LINE,
};

/**
 * ball - starts in the middle
 *
 * @type {Point}
 */
export const BALL_DEFAULT_POS = new Point(GAME_CENTER_POS.x, GAME_CENTER_POS.y);

// how many pixels a paddle is from the edge of a screen
const paddleEdgeDistance = 45;
/**
 * primary player - starts on the bottom half of screen
 *
 * @type {Point}
 */
export const PRIMARY_PLAYER_DEFAULT_POS = new Point(
  GAME_CENTER_POS.x,
  GAME_BOUNDS.bottom - paddleEdgeDistance,
);
/**
 * secondary player - starts on the top half of screen
 *
 * @type {Point}
 */
export const SECONDARY_PLAYER_DEFAULT_POS = new Point(
  GAME_CENTER_POS.x,
  GAME_BOUNDS.top + paddleEdgeDistance,
);

// scores
const scoreOffset = {
  x: 35,
  y: 45,
};
/** @type {Point} */
export const PRIMARY_SCORE_POS = {
  x: GAME_BOUNDS.left + scoreOffset.x,
  y: GAME_CENTER_POS.y + scoreOffset.y,
};
/** @type {Point} */
export const SECONDARY_SCORE_POS = {
  x: GAME_BOUNDS.left + scoreOffset.x,
  y: GAME_CENTER_POS.y - scoreOffset.y,
};

