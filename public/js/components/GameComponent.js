import {
  Point as PIXI_Point,
} from 'pixi.js';

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
   * move position by velocity and then reduce velocity
   *
   * @abstract
   */
  applyVelocity() {
    // update position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // reduce velocity
    this.velocity.x = this.velocity.x * 0.9;
    this.velocity.y = this.velocity.y * 0.9;

    // set to zero if velocity gets small neough
    if (Math.abs(this.velocity.x) < 0.25) {
      this.velocity.x = 0;
    }
    if (Math.abs(this.velocity.y) < 0.25) {
      this.velocity.y = 0;
    }
  };
};

export default GameComponent;
