import * as PIXI from 'pixi.js';

import TextComponent from 'components/TextComponent';

import { GAME_SIZE } from 'constants/sizes';

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
 * TODO this will easily get bloated, create a class to help with this or something
 */
const setupApp = () => {
  // player count
  const playerCountText = new TextComponent('n connected player(s)', {
    position: {
      x: app.screen.width / 2,
      y: 20,
    },
  });

  app.stage.addChild(playerCountText);

  // ...
};

// create singleton
const pixiManager = {
  app: app,
  setupApp: setupApp,
};

export default pixiManager;
