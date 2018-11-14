import * as PIXI from 'pixi.js';

import gameState from 'data/gameState';

import Player from 'components/Player';
import Ball from 'components/Ball';
import SocketClient from 'components/SocketClient';

import { GAME_SIZE } from 'constants/sizes';

import { getCanvasContainer } from 'helpers/canvasHelper';
import { drawField, drawScores } from 'helpers/pixiGameDrawHelper';

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

/**
 * set up the components and elements that will show up on the screen
 *
 * todo: this will potentially grow to be unmaintainable, figure out a better solution
 */
const setupApp = () => {
  const stage = app.stage;

  // -- render starts here
  // draw the field and score
  drawField(stage);
  drawScores(stage);

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
  app.ticker.add(function(delta) {
    // call updates of each object
    ball.update();

    if (gameState.primaryPlayerState === 'left') {
      primaryPlayer.position.x -= 5 * delta;
    };
    if (gameState.primaryPlayerState === 'right') {
      primaryPlayer.position.x += 5 * delta;
    };
    primaryPlayer.view.position.x = primaryPlayer.position.x;

    // secondaryPlayer.position.x += secondaryPlayer.input.x * delta;
    secondaryPlayer.view.position.x = secondaryPlayer.position.x;
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
