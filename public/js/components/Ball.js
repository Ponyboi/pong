import { DisplayObject as PIXI_DisplayObject } from 'pixi.js';
import { Rectangle as Intersects_Rectangle } from 'yy-intersects';

import { WALL_LINES } from 'constants/positions';

import { removeCustomProperties, setComponentProperties } from 'helpers/pixiComponentHelper';

const BALL_RADIUS = 15; // radius

class Ball extends PIXI_DisplayObject {

  constructor(options, ...args) {
    super(options, removeCustomProperties(options), ...args);

    // default variables
    this.radius = BALL_RADIUS;
    this.view = this.getView();
    setComponentProperties(this.view, options);

    this.position = options.position || {x: 0, y: 0};
    this.velocity = {x: 1, y: 1};

    /** @type {Intersects.Rectangle} */
    this.shape = new Intersects_Rectangle(this.view, {
      width: 15,
      height: 15,
      center: this.position,
      noRotate: true,
    });
  };

  getView() {
    const graphics = new PIXI.Graphics();

    graphics.beginFill(0xFFFFFF);

    graphics.drawCircle(0, 0, this.radius);

    graphics.endFill();

    return graphics;
  };
  /**
   * constant update
   */
  update() {
    console.log("Ball Pos: ");
    // update our internal position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // set the view's position
    this.view.position = this.position;
    console.log("Ball Pos: ", this.position.x, this.position.y);

    // update collision detecter
    this.shape.update();
    this.shape.p
    if (this.shape.collidesLine(WALL_LINES.TOP.p1, WALL_LINES.TOP.p2)) {
      this.position.y = -1 * this.velocity.y;
      console.log('hit TOP wall');
    };
    if (this.shape.collidesLine(WALL_LINES.RIGHT.p1, WALL_LINES.RIGHT.p2)) {
      this.position.x = -1 * this.velocity.x;
      console.log('hit RIGHT wall');
    };
    if (this.shape.collidesLine(WALL_LINES.BOTTOM.p1, WALL_LINES.BOTTOM.p2)) {
      this.position.y = -1 * this.velocity.y;
      console.log('hit BOTTOM wall');
    };
    if (this.shape.collidesLine(WALL_LINES.LEFT.p1, WALL_LINES.LEFT.p2)) {
      this.position.x = -1 * this.velocity.x;
      console.log('hit LEFT wall');
    };
  }
};

export default Ball;
