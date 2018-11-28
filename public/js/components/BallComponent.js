// import Point from '@studiomoniker/point';
import { Rectangle as Intersects_Rectangle } from 'yy-intersects';

import GameComponent from 'components/GameComponent';

import { BALL_SIZE } from 'constants/sizes';
import { GAME_BOUNDS } from 'constants/positions';

/**
 * Game Ball
 *  hopefully its possible to make multiple of these?
 */
class BallComponent extends GameComponent {
  /** @override */
  constructor(options = {}) {
    super({
      size: BALL_SIZE,
      ...options,
    });
  };
  /**
   * @override
   * @returns {PIXI.Graphic}
   */
  render() {
    const graphics = new PIXI.Graphics();

    graphics.beginFill(0xFFFFFF);

    // third param is radius so we'll divide by two since height is basically diameter
    graphics.drawCircle(0, 0, this.size.height / 2);

    graphics.endFill();

    return graphics;
  };
  /**
   * @override
   */
  handleCollision() {
    const bounds = this.getBounds();

    // top
    if (bounds.top < GAME_BOUNDS.top) {
      this.velocity.invertY();
    }

    // bottom
    if (bounds.bottom > GAME_BOUNDS.bottom) {
      this.velocity.invertY();
    }

    // right
    if (bounds.right > GAME_BOUNDS.right) {
      this.velocity.invertX();
    }

    // left
    if (bounds.left < GAME_BOUNDS.left) {
      this.velocity.invertX();
    }
  };
};

export default BallComponent;
