import {
  Graphics as PIXI_Graphics,
} from 'pixi.js';

import gameState, { updatePrimaryPlayerPositionState } from 'data/gameState';

import { PADDLE_SIZE } from 'constants/sizes';
import { GAME_BOUNDS } from 'constants/positions';

import Point from '@studiomoniker/point';
import GameComponent from 'components/GameComponent';

/**
 * Player Game Object
 */
class Player extends GameComponent {
  /** @override */
  constructor(options = {}) {
    super({
      size: PADDLE_SIZE,
      ...options,
    });
  };
  /** @override */
  render() {
    let graphics = this.view;

    // instantiate the PIXI.Graphics primitive if it doesn't exist
    if (!graphics) {
      graphics = new PIXI_Graphics();

    // otherwise, erase so we can redraw
    } else {
      graphics.clear();
    };

    // draw rectangle - make sure current position always exists
    const { width, height } = this.size;

    graphics.beginFill(0xFFFFFF);
    graphics.drawRect(0, 0, width, height);
    graphics.endFill();

    return graphics;
  };
  /**
   * rectangle positions start at the top-left so we have to adjust for it
   *
   * @override
   * @returns {Point}
   */
  getPosition() {
    const { x, y } = this.position;
    const { width, height } = this.size;

    return new Point(
      x - (width / 2),
      y - (height / 2),
    );
  }
  /** @override */
  handleCollision() {
    const bounds = this.getBounds();

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

export default Player;
