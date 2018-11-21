import * as PIXI from 'pixi.js';

import { DASH_SIZE, GAME_SIZE, PADDLE_SIZE } from 'constants/sizes';
import {
  GAME_CENTER_POS,
  PRIMARY_PLAYER_DEFAULT_POS,
  SECONDARY_PLAYER_DEFAULT_POS,
} from 'constants/positions';

/**
 * draw some graphics for the playing field
 *
 * @returns {PIXI.View(?)}
 */
export function createFieldView() {
  const fieldGraphics = new PIXI.Graphics();

  const { width, height } = DASH_SIZE;
  const dashVerticalOffset = (PADDLE_SIZE.height / 2) + 15;
  const dashCount = (GAME_SIZE.width / width) / 2;

  for (let i = 0; i < dashCount; i ++) {
    const dashDistance = (width * 2) * i + (width / 2);
    // upper line
    fieldGraphics.beginFill(0x333333);
    fieldGraphics.drawRect(dashDistance, SECONDARY_PLAYER_DEFAULT_POS.y - dashVerticalOffset, width, height);

    // lower line
    fieldGraphics.drawRect(dashDistance, PRIMARY_PLAYER_DEFAULT_POS.y + dashVerticalOffset, width, height);

    // center line
    fieldGraphics.beginFill(0x6d6d6d);
    fieldGraphics.drawRect(dashDistance, GAME_CENTER_POS.y, width, height);
  };

  fieldGraphics.endFill();
  return fieldGraphics;
};
