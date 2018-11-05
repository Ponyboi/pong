import {
  Graphics as PIXI_Graphics,
  // Sprite as PIXI_Sprite,
  // RenderTexture,
} from 'pixi.js';

import { PRIMARY_PLAYER_DEFAULT_POS } from 'constants/positions';
import { PADDLE_SIZE } from 'constants/sizes';

import { setDefaultPosition } from 'helpers/pixiComponentHelper';

class PaddleComponent {
  /** @default */
  constructor(options = {}) {
    const graphic = this.hitbox = new PIXI_Graphics();

    // draw rectangle
    graphic.beginFill(0xFFFFFF);
    const { position = {} } = options;
    const { width, height } = PADDLE_SIZE;
    graphic.drawRect(position.x, position.y, width, height); // drawRect(x, y, width, height)
    graphic.endFill();

    // // use it as a texture
    // const texture = RenderTexture.create(width, height);

    // // make it a sprite
    // const sprite = this.component = new PIXI_Sprite(texture);
    // setDefaultPosition(sprite, options.position);
  };
};

class PlayerComponent {
  /** @default */
  constructor(options = {}) {
    const paddle = new PaddleComponent({
      position: PRIMARY_PLAYER_DEFAULT_POS,
    });
    const component = this.component = paddle.hitbox;
  };
};

export default PlayerComponent;
export {
  PaddleComponent,
  PlayerComponent,
}
