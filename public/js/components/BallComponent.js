import {
  Point as PIXI_Point,
} from 'pixi.js';
import { Rectangle as Intersects_Rectangle } from 'yy-intersects';

import GameComponent from 'components/GameComponent';
import { BALL_SIZE } from 'constants/sizes';
import { WALL_LINES } from 'constants/positions';

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
    // set the view's position
    this.view.position = this.position;

    /** @type {Intersects.Rectangle} */
    const hitbox = new Intersects_Rectangle(this.view, {
      width: this.size.width,
      height: this.size.height,
      center: this.position,
      noRotate: true,
    });

    if (hitbox.collidesLine(WALL_LINES.TOP.p1, WALL_LINES.TOP.p2)) {
      this.velocity.y = -1 * this.velocity.y;
    };
    if (hitbox.collidesLine(WALL_LINES.RIGHT.p1, WALL_LINES.RIGHT.p2)) {
      this.velocity.x = -1 * this.velocity.x;
    };
    if (hitbox.collidesLine(WALL_LINES.BOTTOM.p1, WALL_LINES.BOTTOM.p2)) {
      this.velocity.y = -1 * this.velocity.y;
    };
    if (hitbox.collidesLine(WALL_LINES.LEFT.p1, WALL_LINES.LEFT.p2)) {
      this.velocity.x = -1 * this.velocity.x;
    };
  }
};

export default BallComponent;
