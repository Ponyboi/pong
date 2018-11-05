import {
  Graphics as PIXI_Graphics,
} from 'pixi.js';

import { PADDLE_SIZE } from 'constants/sizes';

class PaddleComponent {
  /** @default */
  constructor(options = {}) {
    const { position = {}, color } = options;
    const { width, height } = PADDLE_SIZE;

    // draw rectangle
    const graphic = this.graphic = new PIXI_Graphics();
    graphic.beginFill(color || 0xFFFFFF);
    graphic.drawRect(position.x, position.y, width, height); // drawRect(x, y, width, height)
    graphic.endFill();

    // note: we're returning the graphic when constructed, not the component itself!
    return graphic;
  };
};

export default PaddleComponent;
export {
  PaddleComponent,
}
