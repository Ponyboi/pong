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

    // since graphics have no anchor, we're just going to adjust where the graphics are drawn to match it up
    var playerFuturePos = { x: this.position.x + this.input.x * delta * PLAYER_TRAITS.speed, y: this.position.y };
    var adjustedPos = this.getAdjustedPos(playerFuturePos, this.size);
    if (this.position.x >= PLAYER_LIMITS.rightEnd) {
      this.position.x = PLAYER_LIMITS.rightEnd;
      adjustedPos = this.getAdjustedPos(this.position, this.size);
    } else if (this.position.x <= PLAYER_LIMITS.leftEnd) {
      this.position.x = PLAYER_LIMITS.leftEnd;
      adjustedPos = this.getAdjustedPos(this.position, this.size);
    } else {
      this.position = playerFuturePos;
    }
    this.view.position = new PIXI_Point(adjustedPos.x, adjustedPos.y);

    // console.log('player pos: ', this.position.x);
    // console.log('player apos: ', adjustedPos.x);
    // console.log('player limits: ', PLAYER_LIMITS.leftEnd, PLAYER_LIMITS.rightEnd);
    
  };
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
