// import Point from '@studiomoniker/point';
import { Rectangle as Intersects_Rectangle } from 'yy-intersects';

import GameComponent from 'components/GameComponent';
import { BALL_SIZE } from 'constants/sizes';
import { GAME_EDGES } from 'constants/positions';

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
   * @override
   */
  update() {
    this.reduceVelocity();

    // set the view's position
    this.view.position = this.position;

    const hitbox = this.getHitbox();

    if (hitbox.collidesLine(GAME_EDGES.topEdge.p1, GAME_EDGES.topEdge.p2)) {
      this.velocity.y = -1 * this.velocity.y;
    };
    if (hitbox.collidesLine(GAME_EDGES.rightEdge.p1, GAME_EDGES.rightEdge.p2)) {
      this.velocity.x = -1 * this.velocity.x;
    };
    if (hitbox.collidesLine(GAME_EDGES.bottomEdge.p1, GAME_EDGES.bottomEdge.p2)) {
      this.velocity.y = -1 * this.velocity.y;
    };
    if (hitbox.collidesLine(GAME_EDGES.leftEdge.p1, GAME_EDGES.leftEdge.p2)) {
      this.velocity.x = -1 * this.velocity.x;
    };
  }
};

export default BallComponent;
