import * as PIXI from 'pixi.js';

import { BALL_DEFAULT_POS, PRIMARY_PLAYER_DEFAULT_POS, SECONDARY_PLAYER_DEFAULT_POS } from 'constants/positions';

// default state stuff
const defaultState = {
  /** @type {PIXI.Point} */
  ballPos: BALL_DEFAULT_POS,
  /** @type {PIXI.Point} */
  primaryPlayerPos: PRIMARY_PLAYER_DEFAULT_POS,
  /** @type {PIXI.Point} */
  secondaryPlayerPos: SECONDARY_PLAYER_DEFAULT_POS,
};

// clone default state
const gameState = {...defaultState};

export default gameState;
