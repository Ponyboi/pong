import {
  Graphics as PIXI_Graphics,
} from 'pixi.js';

import { PADDLE_SIZE } from 'constants/sizes';
/*
  Player controller class
*/
class Player {
  /** @default */
  constructor(options = {}) {
    const { position, size } = options;

    /** @type {Point} */
    this.position = position || {x: 0, y: 0};

    /** @type {Object} */
    this.size = size || PADDLE_SIZE;

    /** @type {PIXI.Graphic} */
    this.view = this.render();
  };
  /**
   * draw the rectangle, temporary implementation
   *
   * @returns {PIXI.Graphic}
   */
  render() {
    let graphics = this.view;

    // instantiate the PIXI.Graphics primitive if it doesn't exist
    if (!graphics) {
      graphics = new PIXI_Graphics();

    // otherwise, erase so we can redraw
    } else {
      graphics.clear();
    };

    // draw rectangle - make sure current position always exists
    const { x, y } = this.position;
    const { width, height } = this.size;

    // since graphics have no anchor, we're just going to adjust where the graphics are drawn to match it up
    const adjustedPos = {
      x: (x - width / 2),
      y: (y - height / 2),
    };

    graphics.beginFill(0xFFFFFF);
    graphics.drawRect(adjustedPos.x, adjustedPos.y, width, height);
    graphics.endFill();

    return graphics;
  };
};

export default Player;
