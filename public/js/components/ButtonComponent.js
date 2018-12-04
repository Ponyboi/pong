import * as PIXI from 'pixi.js';
import Point from '@studiomoniker/point';

// import TextComponent from 'components/TextComponent';

import { removeCustomProperties, setComponentProperties } from 'helpers/pixiComponentHelper';

/*
  extend the base PIXI.Sprite class to see if we can standardize it for our app

  http://pixijs.download/release/docs/PIXI.Sprite.html
*/
class ButtonComponent extends PIXI.Sprite {
  /** @override */
  constructor(options = {}) {
    // let PIXI do its thing
    super();

    // set button properties
    this.interactive = true;
    this.buttonMode = true;

    this.size = options.size || {width: 100, height: 40};
    this.height = this.size.height;
    this.width = this.size.width;

    this.position = options.position || new Point(0, 0);
    this.x = this.position.x;
    this.y = this.position.y;

    this.view = this.render();
    this.view.position = this.position;

    // add event listener
    this.on('pointerdown', this.handleOnClick);
  };
  /** @override */
  render() {
    let graphics = this.view;

    // instantiate the PIXI.Graphics primitive if it doesn't exist
    if (!graphics) {
      graphics = new PIXI.Graphics();

    // otherwise, erase so we can redraw
    } else {
      graphics.clear();
    };

    // draw rectangle - make sure current position always exists
    const { width, height } = this.size;

    graphics.beginFill(0xe6fb54);
    graphics.drawRect(0, 0, width, height);
    this.hitArea = new PIXI.Rectangle(0, 0, width, height);
    graphics.endFill();

    return graphics;
  };
  /**
   * @abstract
   */
  handleOnClick() {
    console.log('clicked111');
  }
};

export default ButtonComponent;
