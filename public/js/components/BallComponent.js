import {
  Point as PIXI_Point,
} from 'pixi.js';

import GameComponent from 'components/GameComponent';
import { BALL_SIZE } from 'constants/sizes';
import { Rectangle as Intersects_Rectangle } from 'yy-intersects';
import { WALL_LINES, BALL_DEFAULT_POS } from 'constants/positions';

class BallComponent extends GameComponent {
  /** @default */
  constructor(options = {}) {
    super({
      size: BALL_SIZE,
      ...options,
    });

    /** @type {Intersects.Rectangle} */
    this.shape = new Intersects_Rectangle(this.view);
    console.log('shape:', this.shape);
  };
  /**
   * @returns {PIXI.Graphic}
   */
  render() {
    const graphics = new PIXI.Graphics();

    graphics.beginFill(0xFFFFFF);

    graphics.drawCircle(BALL_DEFAULT_POS.x, BALL_DEFAULT_POS.y, this.size.height);

    graphics.endFill();

    return graphics;
  };
  /**
   * update
   */
  update() {
    // console.log('update');
    console.log('shape:', this.shape);
    console.log('pos:', this.position.x, this.position.y);

    // set the view's position
    this.view.position = this.position;

    // update collision detecter
    this.shape.update();
    if (this.shape.collidesLine(WALL_LINES.TOP.p1, WALL_LINES.TOP.p2)) {
      this.velocity.y = -1 * this.velocity.y;
      console.log('hit TOP wall');
    console.log('shape:', this.shape);

    };
    if (this.shape.collidesLine(WALL_LINES.RIGHT.p1, WALL_LINES.RIGHT.p2)) {
      this.velocity.x = -1 * this.velocity.x;
      console.log('hit RIGHT wall');
    console.log('shape:', this.shape);
  };
    if (this.shape.collidesLine(WALL_LINES.BOTTOM.p1, WALL_LINES.BOTTOM.p2)) {
      this.velocity.y = -1 * this.velocity.y;
      console.log('hit BOTTOM wall');
    console.log('shape:', this.shape);
  };
    if (this.shape.collidesLine(WALL_LINES.LEFT.p1, WALL_LINES.LEFT.p2)) {
      this.velocity.x = -1 * this.velocity.x;
      console.log('hit LEFT wall');
    console.log('shape:', this.shape);
  };
  }
};

export default BallComponent;
