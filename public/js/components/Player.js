import {
  Graphics as PIXI_Graphics,
} from 'pixi.js';

import { PADDLE_SIZE } from 'constants/sizes';

class Player {
  /** @default */
  constructor(options = {}) {
    const { position, size } = options;

    /** @type {Point} */
    this.position = position || {x: 0, y: 0};
    /** @type {Object} */
    this.size = size || PADDLE_SIZE;

    /** @type {} */
    this.view = this.drawHitbox(this.position, this.size);
  };
  /**
   * draw the rectangle, temporary implementation
   *
   * @param
   * @param
   * @returns
   */
  drawHitbox(position = {}, size = {}) {
    let graphics = this.graphics;

    // instantiate the PIXI.Graphics primitive if it doesn't exist
    if (!graphics) {
      graphics = new PIXI_Graphics();

    // otherwise, erase so we can redraw
    } else {
      graphics.clear();
    };

    // draw rectangle
    const { x, y } = position;
    const { width, height } = size;

    // since graphics have no anchor, we're just going to adjust where the graphics are drawn to match it up
    const adjustedPosition = {
      x: (x - width / 2),
      y: (y - height / 2),
    };

    graphics.beginFill(0xFFFFFF);
    graphics.drawRect(adjustedPosition.x, adjustedPosition.y, width, height);
    graphics.endFill();

    return graphics;
  };
};

export default Player;
