import { SECONDARY_PLAYER_DEFAULT_POS } from 'constants/positions';

import Point from '@studiomoniker/point';

/**
 * turns a primary player's position values into a secondary player
 *
 * @param {Point} pos
 * @returns {Point}
 */
export function convertPrimaryToSecondaryPos(pos) {
  return new Point(pos.x, SECONDARY_PLAYER_DEFAULT_POS.y);
};
