import * as PIXI from 'pixi.js';

import Player from 'components/Player';
import Ball from 'components/Ball';
import TextComponent from 'components/TextComponent';

import { DASH_SIZE, GAME_SIZE, PADDLE_SIZE } from 'constants/sizes';
import { PRIMARY_PLAYER_DEFAULT_POS, SECONDARY_PLAYER_DEFAULT_POS } from 'constants/positions';

import { getCanvasContainer } from 'helpers/canvasHelper';

/*
  singleton for Pixi.js
    use this to do generic stuff
*/
// set up Application
const app = new PIXI.Application(GAME_SIZE);
app.renderer.backgroundColor = 0x080808;

// render it onto document
const canvas = getCanvasContainer();
canvas.appendChild(app.view);

var gameManager = null;
// active player
const primaryPlayer = new Player({position: PRIMARY_PLAYER_DEFAULT_POS});
// opposing player
const secondaryPlayer = new Player({position: SECONDARY_PLAYER_DEFAULT_POS});
// ball
const ball = new Ball({position: {x: 100, y: 100}});

/**
 * set up the components and elements that will show up on the screen
 *
 * todo: this will potentially grow to be unmaintainable, figure out a better solution
 */
const setupApp = (gm) => {
  gameManager = gm;
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);

  const stage = app.stage;

  // -- render starts here
  // draw the field and score
  drawField();
  drawScores();

  // opposing player
  stage.addChild(secondaryPlayer.view);

  // active player
  stage.addChild(primaryPlayer.view);

  appInitUpdate(gameManager);
};

const appInitUpdate = (gm) => {
  gameManager = gm;
  app.ticker.add(function(delta) {
    primaryPlayer.position.x += primaryPlayer.input.x * delta;
    primaryPlayer.view.position.x = primaryPlayer.position.x;
    app.render();
  });
  setInterval(function() {console.log(primaryPlayer.position.x)}, 100);
}
/**
 * draw some graphics for the playing field
 */
const drawField = () => {
  const stage = app.stage;
  const fieldGraphics = new PIXI.Graphics();

  const { width, height } = DASH_SIZE;
  const dashVerticalOffset = (PADDLE_SIZE.height / 2) + 15;
  const dashCount = (GAME_SIZE.width / width) / 2;

  for (let i = 0; i < dashCount; i ++) {
    const dashDistance = (width * 2) * i + (width / 2);
    // upper line
    fieldGraphics.beginFill(0x333333);
    fieldGraphics.drawRect(dashDistance, SECONDARY_PLAYER_DEFAULT_POS.y - dashVerticalOffset, width, height);

    // lower line
    fieldGraphics.drawRect(dashDistance, PRIMARY_PLAYER_DEFAULT_POS.y + dashVerticalOffset, width, height);

    // center line
    fieldGraphics.beginFill(0x6d6d6d);
    fieldGraphics.drawRect(dashDistance, app.screen.height / 2, width, height);
  };

  fieldGraphics.endFill();
  stage.addChild(fieldGraphics);
};
/**
 * draw the Scores
 */
const drawScores = () => {
  const stage = app.stage;
  const scoreStyles = {
    fill: 0x6d6d6d,
    fontSize: 36,
    fontWeight: 'bold',
  };

  const fieldVerticalCenter = app.screen.height / 2;
  const scoreOffset = {
    x: 35,
    y: 45,
  };

  // secondary player, score is above
  const secondaryPlayerScore = new TextComponent('0', {
    ...scoreStyles,
    position: {
      x: scoreOffset.x,
      y: fieldVerticalCenter - scoreOffset.y,
    },
  });
  stage.addChild(secondaryPlayerScore);

  // active player, score is below
  const primaryPlayerScore = new TextComponent('1', {
    ...scoreStyles,
    position: {
      x: scoreOffset.x,
      y: fieldVerticalCenter + scoreOffset.y,
    },
  });
  stage.addChild(primaryPlayerScore);
};
const onKeyDown = (key) => {
  // A Key is 65
  // Left arrow is 37
  if (key.keyCode === 65 || key.keyCode === 37) {
      primaryPlayer.input.x = -1;
  }

  // D Key is 68
  // Right arrow is 39
  if (key.keyCode === 68 || key.keyCode === 39) {
      primaryPlayer.input.x = 1;
  }
}
const onKeyUp = (key) => {
  // A Key is 65
  // Left arrow is 37
  if (key.keyCode === 65 || key.keyCode === 37) {
      primaryPlayer.input.x = 0;
  }

  // D Key is 68
  // Right arrow is 39
  if (key.keyCode === 68 || key.keyCode === 39) {
      primaryPlayer.input.x = 0;
  }
}

// set up singleton
const pixiManager = {
  app: app,
  setupApp: setupApp,
};

export default pixiManager;
