import * as PIXI from 'pixi.js';
import SocketClient from 'components/SocketClient';

import { BALL_DEFAULT_POS, PRIMARY_PLAYER_DEFAULT_POS, SECONDARY_PLAYER_DEFAULT_POS } from 'constants/positions';

import onChange from 'helpers/onChange';

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

  /** @type {Number} */
  primaryPlayerScore: 0,
  /** @type {Number} */
  secondaryPlayerScore: 0,
};

// clone default state
const gameState = {...defaultState};
/**
 * @params {PIXI.Point} newPos
 */
const updatePrimaryPlayerPos = (newPos) => {
  if (gameState.primaryPlayerPos === newPos) return; // no update if no change

  gameState.primaryPlayerPos = newPos;

  // only tell the other player of changes when position changes
  SocketClient.emit('gameStateUpdate', gameState);
};
/**
 * @params {String} newState
 */
const updatePrimaryPlayerState = (newState) => {
  if (gameState.primaryPlayerState === newState) return; // no update if no change

  gameState.primaryPlayerState = newState;
};
/**
 * @params {PIXI.Point} newPos
 */
const updateBallPos = (newPos) => {
  if (gameState.ballPos === newPos) return; // no update if no change

  gameState.ballPos = newPos;
};
/**
 * @params {PIXI.Point} newPos
 */
const updateSecondaryPlayerPos = (newPos) => {
  if (gameState.secondaryPlayerPos === newPos) return; // no update if no change

  gameState.secondaryPlayerPos = newPos;
};

export default gameState;
export {
  updatePrimaryPlayerPos,
  updatePrimaryPlayerState,
  updateBallPos,
  updateSecondaryPlayerPos,
};
