import {
  Point as PIXI_Point,
} from 'pixi.js';

import { VELOCITY_DRAG, VELOCITY_MIN } from 'constants/physics';

/**
 * base component for a game object
 * because most of them should include
 * - position
 * - size
 * - view
 *
 */
class GameComponent {
  /** @default */
  constructor(options = {}) {
    const { position, size, velocity } = options;

    /** @type {Point} */
    this.velocity = velocity || new PIXI_Point();
    /** @type {Point} */
    this.position = position || new PIXI_Point();
    /** @type {Object} */
    this.size = size || {height: 1, width: 1};
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
   * get the next position this will end up being in according to
   * - velocity
   *
   * @returns {PIXI.Point}
   */
  getNextPosition() {
    const currentPosition = {...this.position}; // copy position

    const nextPosition = new PIXI_Point(
      currentPosition.x + this.velocity.x,
      currentPosition.y + this.velocity.y,
    );

    return nextPosition;
  };
  /**
   * handles doing the math on reducing velocity
   */
  reduceVelocity() {
    this.velocity.x = this.velocity.x * VELOCITY_DRAG;
    this.velocity.y = this.velocity.y * VELOCITY_DRAG;

    // set to zero if velocity gets small enough
    if (Math.abs(this.velocity.x) < VELOCITY_MIN) {
      this.velocity.x = 0;
    }
    if (Math.abs(this.velocity.y) < VELOCITY_MIN) {
      this.velocity.y = 0;
    }
  };
};

export default GameComponent;
