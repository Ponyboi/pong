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

    var playerFuturePos = this.position.x + this.input.x * delta * PLAYER_TRAITS.speed;
    if (playerFuturePos >= PLAYER_LIMITS.rightEnd) {
      this.position.x = PLAYER_LIMITS.rightEnd;
      this.view.position.x = PLAYER_LIMITS.rightEnd;
    } else if (playerFuturePos <= PLAYER_LIMITS.leftEnd) {
      this.position.x = PLAYER_LIMITS.leftEnd;
      this.view.position.x = PLAYER_LIMITS.leftEnd;
    } else {
      this.position.x += this.input.x * delta * PLAYER_TRAITS.speed;
      var adjustedPos = this.getAdjustedPos(this.position, this.size);
      this.view.position = new PIXI_Point(adjustedPos.x, adjustedPos.y);
    }
  };
  /**
   * since graphics have no anchor, we're just going to adjust where the graphics are drawn to match it up
   */
  getAdjustedPos(position, size) {
    const { x, y } = position;
    const { width, height } = size;

    const adjustedPos = {
      x: x - (width / 2),
      y: y - (height / 2),
    };
    return adjustedPos;
  }
};

export default Player;
