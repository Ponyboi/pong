import * as PIXI from 'pixi.js';

import Player from 'components/Player';
import TextComponent from 'components/TextComponent';

import { GAME_SIZE } from 'constants/sizes';
import { PRIMARY_PLAYER_DEFAULT_POS, SECONDARY_PLAYER_DEFAULT_POS } from 'constants/positions';

import { getCanvasContainer } from 'helpers/canvasHelper';

/*
  singleton for Pixi
    use this to do generic stuff
*/

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

  // player count label
  const playerCountText = new TextComponent('n connected player(s)', {
    position: {
      x: app.screen.width / 2,
      y: 20,
    },
  });
  stage.addChild(playerCountText);

  // opposing player
  const secondaryPlayer = new Player({position: SECONDARY_PLAYER_DEFAULT_POS});
  stage.addChild(secondaryPlayer.view);

  // active player
  const primaryPlayer = new Player({position: PRIMARY_PLAYER_DEFAULT_POS});
  stage.addChild(primaryPlayer.view);
};

// set up singleton
const pixiManager = {
  app: app,
  setupApp: setupApp,
};

export default pixiManager;
