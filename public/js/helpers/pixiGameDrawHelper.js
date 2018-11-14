import * as PIXI from 'pixi.js';

import TextComponent from 'components/TextComponent';

import { DASH_SIZE, GAME_SIZE, PADDLE_SIZE } from 'constants/sizes';
import { BALL_DEFAULT_POS, PRIMARY_PLAYER_DEFAULT_POS, SECONDARY_PLAYER_DEFAULT_POS } from 'constants/positions';

const fieldVerticalCenter = GAME_SIZE.height / 2;

/**
 * draw some graphics for the playing field
 */
const drawField = (stage) => {
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
    fieldGraphics.drawRect(dashDistance, fieldVerticalCenter, width, height);
  };

  fieldGraphics.endFill();
  stage.addChild(fieldGraphics);
};
/**
 * draw the Scores
 */
const drawScores = (stage) => {
  const scoreStyles = {
    fill: 0x6d6d6d,
    fontSize: 36,
    fontWeight: 'bold',
  };

  const scoreOffset = {
    x: 35,
    y: 45,
  };

  // secondary player, score is above
  const secondaryPlayerScore = new TextComponent('0', {
    ...scoreStyles,
    position: {
      x: scoreOffset.x,
      y: fieldVerticalCenter - scoreOffset.y,
    },
  });
  stage.addChild(secondaryPlayerScore);

  // active player, score is below
  const primaryPlayerScore = new TextComponent('1', {
    ...scoreStyles,
    position: {
      x: scoreOffset.x,
      y: fieldVerticalCenter + scoreOffset.y,
    },
  });
  stage.addChild(primaryPlayerScore);
};

export {
  drawField,
  drawScores,
}
