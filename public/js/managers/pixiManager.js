import * as PIXI from 'pixi.js';
import Intersects from 'yy-intersects';

import gameState, { updateBallPositionState, updatePrimaryPlayerPositionState } from 'data/gameState';

import Point from '@studiomoniker/point';
import PlayerComponent from 'components/PlayerComponent';
import BallComponent from 'components/BallComponent';
import ScoreComponent from 'components/ScoreComponent';

import { GAME_SIZE } from 'constants/sizes';

import {
  DEFAULT_BALL_SPEED,
  DEFAULT_PLAYER_SPEED,
  BALL_VELOCITY_LIMITS,
} from 'constants/physics';

import {
  PRIMARY_SCORE_POS,
  SECONDARY_SCORE_POS,
  BALL_DEFAULT_POS,
} from 'constants/positions';

import { getCanvasContainer } from 'helpers/canvasHelper';
import { createFieldView, drawScores } from 'helpers/pixiGameDrawHelper';

/**
 * singleton for Pixi.js
 *use this to draw and update the view
 *
 */

// set up Application
const app = new PIXI.Application(GAME_SIZE);
app.renderer.backgroundColor = 0x080808;

// render it onto document
const canvas = getCanvasContainer();
canvas.appendChild(app.view);

// ball
const ball = new BallComponent({
  position: gameState.ballPos,
  velocity: new Point(DEFAULT_BALL_SPEED, DEFAULT_BALL_SPEED),
  velocityLimits: BALL_VELOCITY_LIMITS,
});
ball.updateState = () => {
  // ball.position = gameState.ballPos;
  updateBallPositionState(ball.position);
};

// active player
const primaryPlayer = new PlayerComponent({
  position: gameState.primaryPlayerPos,
});
primaryPlayer.updateState = () => {
  // primaryPlayer.position = gameState.primaryPlayerPos;
  updatePrimaryPlayerPositionState(primaryPlayer.position);
};

// opposing player
const secondaryPlayer = new PlayerComponent({
  position: gameState.secondaryPlayerPos,
});
secondaryPlayer.updateState = () => {
  // secondaryPlayer.position = gameState.secondaryPlayerPos;
};

// primaryPlayerScore
const primaryScoreComponent = new ScoreComponent({
  position: PRIMARY_SCORE_POS,
  text: gameState.primaryScoreComponent,
});
// secondaryPlayerScore
const secondaryScoreComponent = new ScoreComponent({
  position: SECONDARY_SCORE_POS,
  text: gameState.secondaryPlayerScore,
});

/**
 * set up the components and elements that will show up on the screen
 *
 * todo: this will potentially grow to be unmaintainable, figure out a better solution
 */
function initApp() {
  const stage = app.stage;

  // draw the field
  const fieldView = createFieldView();
  stage.addChild(fieldView);

  // draw scores
  stage.addChild(primaryScoreComponent.view);
  stage.addChild(secondaryScoreComponent.view);

  // active player
  stage.addChild(primaryPlayer.view);

  // opposing player
  stage.addChild(secondaryPlayer.view);

  // ball
  stage.addChild(ball.view);
  resetBallToCenter();

  // after adding all the components, we can then start a ticker to update everything
  appInitUpdate();
};
/**
 * puts the ball back in the middle and pushes it in a random direction
 */
function resetBallToCenter() {
  updateBallPositionState(BALL_DEFAULT_POS);

  // then reset the velocity
  ball.velocity = new Point(DEFAULT_BALL_SPEED, DEFAULT_BALL_SPEED);

  // randomly some direction changes
  if (Math.round(Math.random())) {
    ball.velocity.x *= -1;
  }
  if (Math.round(Math.random())) {
    // ball.velocity.y *= -1;
  }
};
/**
 * add a ticker to constantly update the game
 */
function appInitUpdate() {
  app.ticker.add((delta) => {
    // handle state changes
    handleUpdateGameState(delta);

    // ball
    ball.update();

    // active player
    primaryPlayer.update();

    // opposing player
    secondaryPlayer.update();

    // active player's score
    primaryScoreComponent.text = gameState.primaryPlayerScore;
    primaryScoreComponent.update();

    // opposing player's score
    secondaryScoreComponent.text = gameState.secondaryPlayerScore;
    secondaryScoreComponent.update();
  });
};
/**
 * update everything related to the game state
 *
 * @param {Number} delta - I think it's how much time has elapsed since the last update?
 */
function handleUpdateGameState(delta) {
  const primaryPlayerCollisions = ball.getCollisionSide(primaryPlayer);
  const secondaryPlayerCollisions = ball.getCollisionSide(secondaryPlayer);

  // if paddle's left side hit the ball
  if (primaryPlayerCollisions.left || secondaryPlayerCollisions.left) {
    if (ball.velocity.x > 0) {
      ball.velocity.x *= -1;
    }
    // ball.velocity.x *= 1.2;
  };

  // if paddle's right side hit the ball
  if (primaryPlayerCollisions.right || secondaryPlayerCollisions.right) {
    if (ball.velocity.x < 0) {
      ball.velocity.x *= -1;
    }
    // ball.velocity.x *= 1.2;
  };

  // if ball collides with any player, flip the velocity to go the other direction
  if (primaryPlayerCollisions.top || secondaryPlayerCollisions.bottom) {
    ball.velocity.y *= -1;

    const yDirection =  ball.velocity.y < 0 ? -1 : 1;
    ball.velocity.y = (ball.velocity.y * 1.5) + (3.5 * yDirection);
  };

  // update player position
  const playerSpeedDelta = DEFAULT_PLAYER_SPEED * delta;
  if (gameState.primaryPlayerState === 'left') {
    primaryPlayer.velocity.x = -playerSpeedDelta;
  };
  if (gameState.primaryPlayerState === 'right') {
    primaryPlayer.velocity.x = playerSpeedDelta;
  };
};

export default app;
export {
  initApp,
  resetBallToCenter,
};
