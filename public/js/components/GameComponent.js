import _ from 'lodash';
import Point from '@studiomoniker/point';

import { Rectangle } from 'yy-intersects';

// import { VELOCITY_DRAG, 0.15 } from 'constants/physics';
import { PLAYER_LIMITS } from 'constants/sizes';

/**
 * base component for a game object
 *  for the most part, everything is considered to be a recntagle
 *
 * most components will include the following
 *  which can be passed in through the options
 * - position
 * - size
 * - view
 */
class GameComponent {
  /** @override */
  constructor(options = {}) {
    /** @type {Point} */
    this.velocity = options.velocity || new Point(0, 0);

    /** @type {Point} */
    this.position = options.position || new Point(0, 0);

    /** @type {Size} */
    this.size = options.size || {height: 1, width: 1};

    /** @type {PIXI.Graphic} */
    this.view = this.render();
  };
  /**
   * @abstract
   */
  render() {};
  /**
   * @abstract
   */
  update() {};
  /**
   * returns this object's hitbox
   *  by default it uses a rectangle
   *
   * @returns {Intersects.Shape}
   */
  getHitbox() {
    return new Rectangle(this.view, {
      width: this.size.width,
      height: this.size.height,
      center: this.position,
      noRotate: true,
    });
  }
  /**
   * get the next position this will end up being in according to
   * - velocity
   *
   * @returns {Point}
   */
  getNextPosition() {
    const currentPosition = {...this.position}; // copy position
    const currentVelocity = {...this.velocity}; // copy velocity

    const nextPosition = new Point(
      currentPosition.x + currentVelocity.x,
      currentPosition.y + currentVelocity.y,
    );

    return nextPosition;
  };
  /**
   * handles doing the math on reducing velocity
   * - you can pass in param to reduce it to
   *
   * @param {Object} [reduceTo]
   */
  reduceVelocity(reduceTo = {}) {
    const { x: minXVelocity, y: minYVelocity } = reduceTo;

    this.velocity.x = this.velocity.x * 0.9;
    this.velocity.y = this.velocity.y * 0.9;

    // set to given min or zero if velocity gets small enough
    if (Math.abs(this.velocity.x) < minXVelocity || 0.15) {
      this.velocity.x = minXVelocity || 0;
    }
    if (Math.abs(this.velocity.y) < minYVelocity || 0.15) {
      this.velocity.y = minYVelocity || 0;
    }
  }
  /**
   * since graphics have no anchor, we're just going to adjust where the graphics are drawn to match it up
   *
   * @returns {Object}
   */
  getAdjustedPos() {
    const { x, y } = this.position;
    const { width, height } = this.size;

    const adjustedPos = new Point(
      x - (width / 2),
      y - (height / 2),
    );

    return adjustedPos;
  }
  /**
   * returns rectangular bounds of where this component will be - given a position
   *
   * @param {Point | undefined} position
   * @returns {Object}
   */
  getBounds(position) {
    const { x, y } = position || this.position;
    const { width, height } = this.size;

    return {
      top: y - height / 2,
      bottom: y + height / 2,
      left: x - width / 2,
      right: x + width / 2,
    }
  }
  /**
   * returns the two point lines
   *
   * @param {Point | undefined} position
   * @returns {Object}
   */
  getEdges(position) {
    const { x, y } = position || this.position;
    const { width, height } = this.size;
    const { top, bottom, left, right } = this.getBounds(position);

    const topLeftPoint = new Point(left, top);
    const topRightPoint = new Point(right, top);
    const bottomLeftPoint = new Point(left, bottom);
    const bottomRightPoint = new Point(right, bottom);

    return {
      topEdge: {p1: topLeftPoint, p2: topRightPoint},
      bottomEdge: {p1: bottomLeftPoint, p2: bottomRightPoint},
      leftEdge: {p1: topLeftPoint, p2: bottomLeftPoint},
      rightEdge: {p1: topRightPoint, p2: bottomRightPoint},
    }
  }
  /**
   * checks if this object collides with another
   *
   * @param {GameComponent} collider
   * @returns {Boolean}
   */
  isColliding(collider) {
    if (!collider) {
      return false;
    }

    return this.getHitbox().collides(collider.getHitbox());
  }
  /**
   * returns which direction this collided with
   *  returns false if colliding with nothing
   *
   * @param {GameComponent} collider
   * @returns {Object}
   */
  getCollisionSide(collider) {
    if (!collider) {
      return {
        top: false,
        bottom: false,
        left: false,
        right: false,
      };
    }

    const hitbox = this.getHitbox();
    const { topEdge, bottomEdge, leftEdge, rightEdge } = collider.getEdges();

    return {
      top: hitbox.collidesLine(topEdge.p1, topEdge.p2),
      bottom: hitbox.collidesLine(bottomEdge.p1, bottomEdge.p2),
      left: hitbox.collidesLine(leftEdge.p1, leftEdge.p2),
      right: hitbox.collidesLine(rightEdge.p1, rightEdge.p2),
    }
  }
};

export default GameComponent;
