// import Point from '@studiomoniker/point';
import { Rectangle as Intersects_Rectangle } from 'yy-intersects';

import GameComponent from 'components/GameComponent';
import { BALL_SIZE } from 'constants/sizes';
import { BASE_BALL_VELOCITY } from 'constants/physics';
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
    this.reduceVelocity(BASE_BALL_VELOCITY);

    // set the view's position
    this.view.position = this.position;

    const hitbox = this.getHitbox();

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
