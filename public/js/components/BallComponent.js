import {
  Point as PIXI_Point,
} from 'pixi.js';

import GameComponent from 'components/GameComponent';
import { BALL_SIZE } from 'constants/sizes';

class BallComponent extends GameComponent {
  /** @default */
  constructor(options = {}) {
    super({
      size: BALL_SIZE,
      ...options,
    });
  };
  /**
   * @returns {PIXI.Graphic}
   */
  render() {
    const graphics = new PIXI.Graphics();

    graphics.beginFill(0xFFFFFF);

    graphics.drawCircle(0, 0, this.size.height);

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

export default BallComponent;
