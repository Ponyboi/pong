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

    /**
     * the actual point that the component is at - but it isn't necessarily accurate when rendered
     *  use `getPosition()` to get an adjusted position
     *  use and override `updatePosition()` to handle how `this.position` should be changed
     *
     * @private
     * @type {Point}
     */
    this.position = options.position || new Point(0, 0);

    /** @type {Size} */
    this.size = options.size || { height: 1, width: 1 };

    /** @type {PIXI.Graphic} */
    this.view = this.render();
  };
  /**
   * @abstract
   */
  render() {
  };
  /**
   * primary lifecycle handler
   *
   * todo: should be separated to outside the component
   */
  update() {
    this.reduceVelocity();

    this.updatePosition();

    this.handleCollision();

    this.updateView();

    this.updateState();
  };
  /**
   * check collisions and what to do when it happens
   *
   * @abstract
   */
  handleCollision() {
  };
  /**
   * move the player's position
   *
   * @abstract
   */
  updatePosition() {
    this.position = this.getNextPosition();
  };
  /**
   * handles doing the math on reducing velocity
   *
   * todo - this function is yuck
   */
  reduceVelocity() {
    const { min, max } = this.velocityLimits;
    const { x, y } = this.velocity;

    // Scalar is the speed ignoring the direction
    //  we're also going to clamp the values so at the very least they could be between min and max
    const xScalar = Math.min(Math.max(Math.abs(x), min.x), max.x);
    const yScalar = Math.min(Math.max(Math.abs(y), min.y), max.y);

    const xDirection = x < 0 ? -1 : 1;
    const yDirection = y < 0 ? -1 : 1;

    // -- horizontal is changing
    if (xScalar > min.x) {
      if (xScalar > 4) {
        this.velocity.x = Math.max((xScalar * 0.9), (xScalar - 0.05)) * xDirection;
      } else {
        this.velocity.x = xScalar * 0.9 * xDirection;
      }
    }

    // -- vertical is changing
    if (yScalar > min.y) {
      if (yScalar > 4) {
        this.velocity.y = Math.max((yScalar * 0.9), (yScalar - 0.05)) * yDirection;
      } else {
        this.velocity.y = yScalar * 0.9 * yDirection;
      }
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
   * set the view's position
   *
   * @abstract
   */
  updateView() {
    this.view.position = this.getPosition();
  };
  /**
   * override this so we update the game state
   *
   * @abstract
   */
  updateState() {
  };
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
      center: this.getPosition(),
      noRotate: true,
    });
  }
  /**
   * get the projected position this will be based on the velocity
   *
   * @returns {Point}
   */
  getNextPosition() {
    const currentPosition = this.position.clone();
    const currentVelocity = this.velocity.clone();

    return currentPosition.add(currentVelocity);
  };
  /**
   * access the position, important because PlayerComponent overrides this
   *
   * @returns {Point}
   */
  getPosition() {
    return this.position;
  }
  /**
   * returns rectangular bounds of where this component will be - given a position
   *
   * @returns {Bounds}
   */
  getBounds() {
    const { x, y } = this.position;
    const { width, height } = this.size;

    return {
      top: y - (height / 2),
      bottom: y + (height / 2),
      left: x - (width / 2),
      right: x + (width / 2),
    }
  }
  /**
   * returns the two point lines
   *
   * @returns {Edges}
   */
  getEdges() {
    const { width, height } = this.size;
    const { top, bottom, left, right } = this.getBounds();

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
