import * as PIXI from 'pixi.js';
import SocketClient from 'components/SocketClient';

import { BALL_DEFAULT_POS, PRIMARY_PLAYER_DEFAULT_POS, SECONDARY_PLAYER_DEFAULT_POS } from 'constants/positions';

import onChange from 'helpers/onChange';

// default state
const defaultState = {
  /** @type {Point} */
  ballPos: BALL_DEFAULT_POS,
  /** @type {Point} */
  primaryPlayerPos: PRIMARY_PLAYER_DEFAULT_POS,
  /** @type {Point} */
  primaryPlayerState: null,
  /** @type {Point} */
  secondaryPlayerPos: SECONDARY_PLAYER_DEFAULT_POS,

  /** @type {Number} */
  primaryPlayerScore: 0,
  /** @type {Number} */
  secondaryPlayerScore: 0,
};
// clone default state
const gameState = {...defaultState};
/**
 * @params {Point} newState
 */
const updatePrimaryPlayerPositionState = (newState) => {
  if (gameState.primaryPlayerPos === newState) return; // no update if no change

  gameState.primaryPlayerPos = newState;

  // only tell the other player of changes when position changes
  SocketClient.emit('gameStateUpdate', gameState);
};
/**
 * @params {String} newState
 */
const updatePrimaryPlayerActionState = (newState) => {
  if (gameState.primaryPlayerState === newState) return; // no update if no change

  gameState.primaryPlayerState = newState;
};
/**
 * @params {Point} newState
 */
const updateBallPositionState = (newState) => {
  if (gameState.ballPos === newState) return; // no update if no change

  gameState.ballPos = newState;
};
/**
 * @params {Point} newState
 */
const updateSecondaryPlayerPositionState = (newState) => {
  if (gameState.secondaryPlayerPos === newState) return; // no update if no change

  gameState.secondaryPlayerPos = newState;
};

export default gameState;
export {
  updatePrimaryPlayerPositionState,
  updatePrimaryPlayerActionState,
  updateBallPositionState,
  updateSecondaryPlayerPositionState,
};
