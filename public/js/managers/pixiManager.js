import * as PIXI from 'pixi.js';
import Intersects from 'yy-intersects';

import gameState, { updateBallPositionState, updatePrimaryPlayerPositionState } from 'data/gameState';

import Player from 'components/Player';
import BallComponent from 'components/BallComponent';
import ScoreComponent from 'components/ScoreComponent';

import { GAME_SIZE } from 'constants/sizes';
import { DEFAULT_PLAYER_SPEED } from 'constants/physics';
import { PRIMARY_SCORE_POS, SECONDARY_SCORE_POS, BALL_DEFAULT_POS } from 'constants/positions';

import { getCanvasContainer } from 'helpers/canvasHelper';
import { createFieldView, drawScores } from 'helpers/pixiGameDrawHelper';

/*
  singleton for Pixi.js
    use this to draw and update the view
*/

// set up Application
const app = new PIXI.Application(GAME_SIZE);
app.renderer.backgroundColor = 0x080808;
// render it onto document
const canvas = getCanvasContainer();
canvas.appendChild(app.view);

// active player
const primaryPlayer = new Player({
  position: gameState.primaryPlayerPos,
});
// opposing player
const secondaryPlayer = new Player({
  position: gameState.secondaryPlayerPos,
});
// ball
const ball = new BallComponent({
  position: gameState.ballPos,
});
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
const initApp = () => {
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
const resetBallToCenter = () => {
  updateBallPositionState(BALL_DEFAULT_POS);
  ball.position = gameState.ballPos;

  // then reset the velocity
  const startRight = Math.round(Math.random());
  const startUp = Math.round(Math.random());

  ball.velocity = new PIXI.Point(
    startRight ? 3 : -3,
    startUp ? 3 : -3,
  );
};
/**
 * add a constant ticker to update the game
 */
const appInitUpdate = () => {
  app.ticker.add((delta) => {
    // see if player is moving
    handleUpdateGameState(delta);

    // assign data from state the the components and update them
    ball.position = gameState.ballPos;
    ball.update();

    // active player
    primaryPlayer.position = gameState.primaryPlayerPos;
    primaryPlayer.update(delta);

    // opposing player
    secondaryPlayer.position = gameState.secondaryPlayerPos;
    secondaryPlayer.update(delta);

    // active player's score
    primaryScoreComponent.text = gameState.primaryPlayerScore;
    primaryScoreComponent.update();

    // opposing player's score
    secondaryScoreComponent.text = gameState.secondaryPlayerScore;
    secondaryScoreComponent.update();
  });
};
/**
 * look at the player's current action and do stuff according to it
 */
const handleUpdateGameState = (delta) => {

  // update ball's position
  const ballVelocityDelta = new PIXI.Point(ball.velocity.x, ball.velocity.y);
  const ballNextPosition = ball.getNextPosition();
  updateBallPositionState(ballNextPosition);

  // update player position
  const playerSpeedDelta = DEFAULT_PLAYER_SPEED * delta;
  if (gameState.primaryPlayerState === 'left') {
    primaryPlayer.velocity.x = -playerSpeedDelta;
  };
  if (gameState.primaryPlayerState === 'right') {
    primaryPlayer.velocity.x = playerSpeedDelta;
  };

  // always update player position state
  const primaryPlayerNextPosition = primaryPlayer.getNextPosition();
  updatePrimaryPlayerPositionState(primaryPlayerNextPosition);
};

export default app;
export {
  app,
  initApp,
  resetBallToCenter,
};
