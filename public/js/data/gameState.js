// import * as PIXI from 'pixi.js';
import SocketClient from 'components/SocketClient';

import {
  BALL_DEFAULT_POS,
  PRIMARY_PLAYER_DEFAULT_POS,
  SECONDARY_PLAYER_DEFAULT_POS,
} from 'constants/positions';

// the base state of things
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

// clone default state to use as our default
const gameState = {...defaultState};

/**
 * @params {Point} newState
 */
export function updatePrimaryPlayerPositionState(newState) {
  if (gameState.primaryPlayerPos === newState) return; // no update if no change

  gameState.primaryPlayerPos = newState;

  // only tell the other player of changes when position changes
  SocketClient.emit('gameStateUpdate', gameState);
};
/**
 * @params {String} newState
 */
export function updatePrimaryPlayerActionState(newState) {
  if (gameState.primaryPlayerState === newState) return; // no update if no change

  gameState.primaryPlayerState = newState;
};
/**
 * @params {Point} newState
 */
export function updateBallPositionState(newState) {
  if (gameState.ballPos === newState) return; // no update if no change

  gameState.ballPos = newState;
};
/**
 * @params {Point} newState
 */
export function updateSecondaryPlayerPositionState(newState) {
  if (gameState.secondaryPlayerPos === newState) return; // no update if no change

  gameState.secondaryPlayerPos = newState;
};

export default gameState;
