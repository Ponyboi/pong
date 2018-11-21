import * as PIXI from 'pixi.js';

import { GAME_SIZE } from 'constants/sizes';

/*
  default positions

  todo: what if screen is sized differently?
*/

const gameHorizontalCenter = GAME_SIZE.width / 2; // center of screen
const gameVerticalCenter = GAME_SIZE.height / 2; // center of screen

// for paddles
const paddleEdgeDistance = 45; // how many pixels respectively from the edge of the screen?

// player controller, bottom half of screen
const PRIMARY_PLAYER_DEFAULT_POS = new PIXI.Point(
  gameHorizontalCenter,
  GAME_SIZE.height - paddleEdgeDistance
);

// other player, top half
const SECONDARY_PLAYER_DEFAULT_POS = new PIXI.Point(
  gameHorizontalCenter,
  0 + paddleEdgeDistance
);

// ball
const BALL_DEFAULT_POS = new PIXI.Point(gameHorizontalCenter, gameVerticalCenter);

// define the two points that make up a line for the wall
const TOP_WALL_LINE = {
  p1: new PIXI.Point(0, 0),
  p2: new PIXI.Point(GAME_SIZE.width, 0),
};
const RIGHT_WALL_LINE = {
  p1: new PIXI.Point(GAME_SIZE.width, 0),
  p2: new PIXI.Point(GAME_SIZE.width, GAME_SIZE.height),
};
const BOTTOM_WALL_LINE = {
  p1: new PIXI.Point(0, GAME_SIZE.height),
  p2: new PIXI.Point(GAME_SIZE.width, GAME_SIZE.height),
};
const LEFT_WALL_LINE = {
  p1: new PIXI.Point(0, 0),
  p2: new PIXI.Point(0, GAME_SIZE.height),
};

// scores
const scoreOffset = {
  x: 35,
  y: 45,
};
const PRIMARY_SCORE_POS = {
  x: scoreOffset.x,
  y: gameVerticalCenter + scoreOffset.y,
};
const SECONDARY_SCORE_POS = {
  x: scoreOffset.x,
  y: gameVerticalCenter - scoreOffset.y,
};

// these are the points that make up the wall
const WALL_LINES = {
  TOP: TOP_WALL_LINE,
  RIGHT: RIGHT_WALL_LINE,
  BOTTOM: BOTTOM_WALL_LINE,
  LEFT: LEFT_WALL_LINE,
};

export {
  BALL_DEFAULT_POS,
  PRIMARY_PLAYER_DEFAULT_POS,
  SECONDARY_PLAYER_DEFAULT_POS,
  WALL_LINES,
  PRIMARY_SCORE_POS,
  SECONDARY_SCORE_POS,
};
