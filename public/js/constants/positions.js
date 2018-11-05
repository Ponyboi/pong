import { GAME_SIZE } from 'constants/sizes';

/*
  default positions

  todo: what if screen is sized differently?
*/

const verticalFromEdge = 50; // how many pixels respectively from the edge of the screen?

const horizontalCenter = GAME_SIZE.width / 2; // center of screen

// player controller, bottom half of screen
const PRIMARY_PLAYER_DEFAULT_POS = {
  x: horizontalCenter,
  y: GAME_SIZE.height - verticalFromEdge,
};

// other player, top half
const SECONDARY_PLAYER_DEFAULT_POS = {
  x: horizontalCenter,
  y: 0 + verticalFromEdge,
};

export {
  PRIMARY_PLAYER_DEFAULT_POS,
  SECONDARY_PLAYER_DEFAULT_POS,
}
