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
const primaryPlayerScore = new ScoreComponent({
  position: PRIMARY_SCORE_POS,
  text: gameState.primaryPlayerScore,
});
// secondaryPlayerScore
const secondaryPlayerScore = new ScoreComponent({
  position: SECONDARY_SCORE_POS,
  text: gameState.secondaryPlayerScore,
});

/**
 * set up the components and elements that will show up on the screen
 *
 * todo: this will potentially grow to be unmaintainable, figure out a better solution
 */
const setupApp = () => {
  const stage = app.stage;

  // draw the field
  const fieldView = createFieldView();
  stage.addChild(fieldView);

  // draw scores
  stage.addChild(primaryPlayerScore.view);
  stage.addChild(secondaryPlayerScore.view);

  // opposing player
  stage.addChild(secondaryPlayer.view);

  // active player
  stage.addChild(primaryPlayer.view);

  // ball
  stage.addChild(ball.view);

  // after adding all the components, finally we can update
  appInitUpdate();
};
/**
 * add a constant ticker to update the game
 */
const appInitUpdate = () => {
  const updateableComponents = [primaryPlayer, secondaryPlayer, ball];

  app.ticker.add(function(delta) {
    // update player position
    const playerSpeed = 4.5 * delta;
    if (gameState.primaryPlayerState === 'left') {
      const nextPos = new PIXI.Point(gameState.primaryPlayerPos.x - playerSpeed, gameState.primaryPlayerPos.y);
      updatePrimaryPlayerPos(nextPos);
      primaryPlayer.position = nextPos;
    };
    if (gameState.primaryPlayerState === 'right') {
      const nextPos = new PIXI.Point(gameState.primaryPlayerPos.x + playerSpeed, gameState.primaryPlayerPos.y);
      updatePrimaryPlayerPos(nextPos);
      primaryPlayer.position = nextPos;
    };

    secondaryPlayer.position = gameState.secondaryPlayerPos;

    // call updates of each object
    ball.update();
    primaryPlayer.update();
    secondaryPlayer.update();
  });
};
// set up singleton
const pixiManager = {
  app: app,
  setupApp: setupApp,
};

export default pixiManager;
export {
  pixiManager,
};
