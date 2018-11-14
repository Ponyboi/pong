import * as PIXI from 'pixi.js';

import { SECONDARY_PLAYER_DEFAULT_POS } from 'constants/positions';

/**
 * turns a primary player's position values into a secondary player
 *
 * @param {PIXI.Point} pos
 * @returns {PIXI.Point}
 */
const convertPrimaryToSecondaryPos = (pos) => {
  return new PIXI.Point(pos.x, SECONDARY_PLAYER_DEFAULT_POS.y);
};

export {
  convertPrimaryToSecondaryPos,
};
