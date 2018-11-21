import _ from 'lodash';
import Point from '@studiomoniker/point';

import { Rectangle } from 'yy-intersects';

import { GAME_VELOCITY_LIMITS } from 'constants/physics';
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
  /**
   * @params {Object}
   */
  constructor(options = {}) {
    /** @type {Velocity} */
    this.velocity = options.velocity || new Point(0, 0);

    /** @type {VelocityLimits} */
    this.velocityLimits = options.velocityLimits || GAME_VELOCITY_LIMITS;

    /** @type {Point} */
    this.position = options.position || new Point(0, 0);

    /** @type {Size} */
    this.size = options.size || { height: 1, width: 1 };

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
   * get the next position this will ebe
   *  by adding velocity onto this position
   *
   * @returns {Point}
   */
  getNextPosition() {
    const currentPosition = this.position.clone();
    const currentVelocity = this.velocity.clone();

    return currentPosition.add(currentVelocity);
  };
  /**
   * handles doing the math on reducing velocity
   * todo - this function is yuck
   *
   */
  reduceVelocity() {
    const { x, y } = this.velocity;
    const { min, max } = this.velocityLimits;

    const xScalar = Math.abs(x);
    const yScalar = Math.abs(y);

    const xDirection = x < 0 ? -1 : 1;
    const yDirection = y < 0 ? -1 : 1;

    // velocity left
    if (x < 0) {
      // too slow
      if (x > (min.x * -1)) {
        this.velocity.x = (min.x * -1);
      }
      // too fast
      if (x < (max.x * -1)) {
        this.velocity.x = (max.x * -1);
      }
    }

    // velocity right
    if (x > 0) {
      // too slow
      if (x < min.x) {
        this.velocity.x = min.x;
      }
      // too fast
      if (x > max.x) {
        this.velocity.x = max.x;
      }
    }

    // velocity up
    if (y > 0) {
      // too slow
      if (y < min.y) {
        this.velocity.y = min.x;
      }
      // too fast
      if (y > max.y) {
        this.velocity.y = max.x;
      }
    }

    // velocity down
    if (y < 0) {
      // too slow
      if (y > (min.y * -1)) {
        this.velocity.y = (min.y * -1);
      }
      // too fast
      if (y < (max.y * -1)) {
        this.velocity.y = (max.y * -1);
      }
    }

    // -- if velocity is actually cahnging
    if (xScalar > min.x) {
      this.velocity.x = (xScalar * 0.9) * xDirection;
    }
    if (yScalar > min.y) {
      this.velocity.y = (yScalar * 0.9) * yDirection;
    }

    // -- set to zero if velocity gets small enough
    const closeToZero = 0.10;
    if (xScalar < closeToZero) {
      this.velocity.x = 0;
    };
    if (yScalar < closeToZero) {
      this.velocity.y = 0;
    };
  }
  /**
   * since graphics have no anchor, we're just going to adjust where the graphics are drawn to match it up
   *
   * @returns {Point}
   */
  getAdjustedPos() {
    const { x, y } = this.position;
    const { width, height } = this.size;

    return new Point(
      x - (width / 2),
      y - (height / 2),
    );
  }
  /**
   * returns rectangular bounds of where this component will be - given a position
   *
   * @param {Point | undefined} position
   * @returns {Bounds}
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
   * @returns {Edges}
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
