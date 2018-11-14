import * as PIXI from 'pixi.js';

import gameState, { updatePrimaryPlayerPos } from 'data/gameState';

import Player from 'components/Player';
import Ball from 'components/Ball';
import ScoreComponent from 'components/ScoreComponent';

import { GAME_SIZE } from 'constants/sizes';
import { PRIMARY_SCORE_POS, SECONDARY_SCORE_POS } from 'constants/positions';

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
const primaryPlayer = new Player({position: gameState.primaryPlayerPos});
// opposing player
const secondaryPlayer = new Player({position: gameState.secondaryPlayerPos});
// ball
const ball = new Ball({position: gameState.ballPos});
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

  // after adding all the components, we can then start a ticker to update everything
  appInitUpdate();
};
/**
 * add a constant ticker to update the game
 */
const appInitUpdate = () => {
  const updateableComponents = [primaryPlayer, secondaryPlayer, ball];

  app.ticker.add((delta) => {
    // see if player is moving
    handlePlayerMovement(delta);

    // assign data from state the the components and update them
    ball.update(); // todo

    // active player
    primaryPlayer.position = gameState.primaryPlayerPos;
    primaryPlayer.update();

    // opposing player
    secondaryPlayer.position = gameState.secondaryPlayerPos;
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
 * look at the player's current action and do stuff according to it
 */
const handlePlayerMovement = (delta) => {
  // update player position
  const playerSpeed = 4.5 * delta;

  if (gameState.primaryPlayerState === 'left') {
    const nextPos = new PIXI.Point(gameState.primaryPlayerPos.x - playerSpeed, gameState.primaryPlayerPos.y);
    updatePrimaryPlayerPos(nextPos);
  };

  if (gameState.primaryPlayerState === 'right') {
    const nextPos = new PIXI.Point(gameState.primaryPlayerPos.x + playerSpeed, gameState.primaryPlayerPos.y);
    updatePrimaryPlayerPos(nextPos);
  };
};

export default app;
export {
  app,
  initApp,
};
