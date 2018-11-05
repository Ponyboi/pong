import {
  Application as PixiApplication,
} from 'pixi.js';

import {GAME_SIZE} from 'constants/sizes';
import {getCanvasContainer} from 'helpers/canvasHelper';

/*
  singleton for Pixi
    use this to do generic stuff
*/

const app = new PixiApplication(GAME_SIZE);
app.renderer.backgroundColor = 0x1f1d1d;


/**
 * renders pixi's view onto the canvas
 * (currently also refreshes, but there might be an internal handler)
 *
 */
const renderApp = () => {
  const canvas = getCanvasContainer();

  // clear out old view
  if (canvas.firstChild) {
    canvas.firstChild.remove();
  };

  // add pixi's view to node
  canvas.appendChild(app.view);
};


// create singleton
const pixiManager = {
  app: app,
  renderApp: renderApp,
};

export default pixiManager;
