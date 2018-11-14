import * as PIXI from 'pixi.js';

import { BALL_DEFAULT_POS, PRIMARY_PLAYER_DEFAULT_POS, SECONDARY_PLAYER_DEFAULT_POS } from 'constants/positions';

// default state stuff
const defaultState = {
  /** @type {PIXI.Point} */
  ballPos: BALL_DEFAULT_POS,
  /** @type {PIXI.Point} */
  primaryPlayerPos: PRIMARY_PLAYER_DEFAULT_POS,
  /** @type {PIXI.Point} */
  primaryPlayerState: null,
  /** @type {PIXI.Point} */
  secondaryPlayerPos: SECONDARY_PLAYER_DEFAULT_POS,
};

// clone default state
const gameState = {...defaultState};
/**
 * @params {String} newState
 */
const updatePrimaryPlayerState = (newState) => {
  gameState.primaryPlayerState = newState;
};
/**
 * @params {PIXI.Point} newPos
 */
const updateBallPos = (newPos) => {
  gameState.ballPos = newPos;
};
/**
 * @params {PIXI.Point} newPos
 */
const updatePrimaryPlayerPos = (newPos) => {
  gameState.primaryPlayerPos = newPos;
};
/**
 * @params {PIXI.Point} newPos
 */
const updateSecondaryPlayerPos = (newPos) => {
  gameState.secondaryPlayerPos = newPos;
};

export default gameState;
export {
  updateBallPos,
  updatePrimaryPlayerPos,
  updatePrimaryPlayerState,
  updateSecondaryPlayerPos,
};
