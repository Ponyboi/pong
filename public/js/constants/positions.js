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
const PRIMARY_PLAYER_DEFAULT_POS = {
  x: gameHorizontalCenter,
  y: GAME_SIZE.height - paddleEdgeDistance,
};

// other player, top half
const SECONDARY_PLAYER_DEFAULT_POS = {
  x: gameHorizontalCenter,
  y: 0 + paddleEdgeDistance,
};

// ball
const BALL_DEFAULT_POS = {
  x: gameHorizontalCenter,
  y: gameVerticalCenter,
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

export {
  BALL_DEFAULT_POS,
  PRIMARY_PLAYER_DEFAULT_POS,
  SECONDARY_PLAYER_DEFAULT_POS,
  PRIMARY_SCORE_POS,
  SECONDARY_SCORE_POS,
};
