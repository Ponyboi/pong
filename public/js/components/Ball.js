import {
  DisplayObject as PIXI_DisplayObject,
  // ticker,
} from 'pixi.js';

import { removeCustomProperties, setComponentProperties } from 'helpers/pixiComponentHelper';

const BALL_RADIUS = 15; // radius

class Ball extends PIXI_DisplayObject {

  constructor(options, ...args) {
    super(options, removeCustomProperties(options), ...args);

    this.radius = BALL_RADIUS;

    this.view = this.getView();

    setComponentProperties(this.view, options);
    // this.ticker = new ticker.Ticker().add(this.update.bind(this));
  };

  getView() {
    const graphics = new PIXI.Graphics();

    graphics.beginFill(0xFFFFFF);

    graphics.drawCircle(0, 0, this.radius);

    graphics.endFill();

    return graphics;
  };

  update() {
    this.view.position.x += 1;
  }
};

export default Ball;
