import * as PIXI from 'pixi.js';

import Player from 'components/Player';
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

/**
 * set up the components and elements that will show up on the screen
 *
 * todo: this will potentially grow to be unmaintainable, figure out a better solution
 */
const setupApp = () => {
  const stage = app.stage;

  // draw the field and score
  drawField();
  drawScores();

  // opposing player
  const secondaryPlayer = new Player({position: SECONDARY_PLAYER_DEFAULT_POS});
  stage.addChild(secondaryPlayer.view);

  // active player
  const primaryPlayer = new Player({position: PRIMARY_PLAYER_DEFAULT_POS});
  stage.addChild(primaryPlayer.view);
};
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

// set up singleton
const pixiManager = {
  app: app,
  setupApp: setupApp,
};

export default pixiManager;
