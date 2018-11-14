import { DisplayObject as PIXI_DisplayObject } from 'pixi.js';

import { removeCustomProperties, setComponentProperties } from 'helpers/pixiComponentHelper';

const BALL_RADIUS = 15; // radius

class Ball extends PIXI_DisplayObject {

  constructor(options, ...args) {
    super(options, removeCustomProperties(options), ...args);

    // default variables
    this.radius = BALL_RADIUS;
    this.view = this.getView();
    setComponentProperties(this.view, options);

    this.position = options.position || {x: 0, y: 0};
    this.velocity = {x: 1, y: 1};
  };

  getView() {
    const graphics = new PIXI.Graphics();

    graphics.beginFill(0xFFFFFF);

    graphics.drawCircle(0, 0, this.radius);

    graphics.endFill();

    return graphics;
  };
  /**
   * update
   */
  update() {
    // update our internal position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // set the view's position
    this.view.position = this.position;
  }
};

export default Ball;
