import {
  Graphics as PIXI_Graphics,
  Point as PIXI_Point,
} from 'pixi.js';
import { Rectangle as Intersects_Rectangle } from 'yy-intersects';

import gameState, { updatePrimaryPlayerPositionState } from 'data/gameState';
import { DASH_SIZE, GAME_SIZE, PADDLE_SIZE, PLAYER_LIMITS, PLAYER_TRAITS } from 'constants/sizes';
import GameComponent from 'components/GameComponent';

/*
  Player controller class
*/
class Player extends GameComponent {
  /** @default */
  constructor(options = {}) {
    super(options);
    const { position, size } = options;

    /** @type {Point} */
    this.position = position || {x: 0, y: 0};
    this.input = {x: 0, y: 0};

    /** @type {Object} */
    this.size = size || PADDLE_SIZE;

    /** @type {PIXI.Graphic} */
    this.view = this.render();

    /** @type {Intersects.Rectangle} */
    this.shape = new Intersects_Rectangle(this);
  };
  /**
   * @returns {PIXI.Graphic}
   */
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
   * update
   */
  update(delta) {
    this.reduceVelocity();

    const bounds = this.getBounds();

    if (bounds.right >= PLAYER_LIMITS.rightEnd) {
      this.velocity.x *= -1;

    } else if (bounds.left <= PLAYER_LIMITS.leftEnd) {
      this.velocity.x *= -1;

    } else {
      var adjustedPos = this.getAdjustedPos(this.position, this.size);
      this.view.position = new PIXI_Point(adjustedPos.x, adjustedPos.y);
    }
  };
};

export default Player;
