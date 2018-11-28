// import * as PIXI from 'pixi.js';
import Point from '@studiomoniker/point';

import socketManager from 'managers/socketManager';

import {
  DEFAULT_BALL_SPEED,
  DEFAULT_PLAYER_SPEED,
} from 'constants/physics';
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
  ballVelocity: new Point(DEFAULT_BALL_SPEED, DEFAULT_BALL_SPEED),

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
  socketManager.emit('GAMESTATE_SEND', { primaryPlayerPos: gameState.primaryPlayerPos });
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
export function updateBallVelocityState(newState) {
  if (gameState.ballVelocity === newState) return; // no update if no change

  gameState.ballVelocity = newState;
};
/**
 * @params {Point} newState
 */
export function updateSecondaryPlayerPositionState(newState) {
  if (gameState.secondaryPlayerPos === newState) return; // no update if no change

  gameState.secondaryPlayerPos = newState;
};
/**
 * @params {Number} newState
 */
export function updatePrimaryPlayerScore(newState) {
  gameState.primaryPlayerScore = gameState.primaryPlayerScore + 1;
};
/**
 * @params {Number} newState
 */
export function updateSecondaryPlayerScore(newState) {
  gameState.secondaryPlayerScore = gameState.secondaryPlayerScore + 1;
};

export default gameState;
