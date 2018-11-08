import { GAME_SIZE } from 'constants/sizes';

/*
  default positions

  todo: what if screen is sized differently?
*/

const gameHorizontalCenter = GAME_SIZE.width / 2; // center of screen

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

export {
  PRIMARY_PLAYER_DEFAULT_POS,
  SECONDARY_PLAYER_DEFAULT_POS,
};
