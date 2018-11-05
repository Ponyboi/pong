import { omit } from 'lodash';
import { Text as PIXI_Text } from 'pixi.js';

// default style of this component for our app
const baseStyles = {
  fontFamily: 'Roboto',
  fontSize: 16,
  fill: '#ffffff',
};

/*
  extend the base PIXI.Text class to see if we can standardize it for our app

  http://pixijs.download/release/docs/PIXI.Text.html
*/
class TextComponent extends PIXI_Text {
  /**
   * @default
   */
  constructor(text, options, ...args) {
    // remove custom attributes from the options and leave only the styles
    const stylesToPass = omit(options, [
      'anchor',
      'position',
    ]);

    // apply base styles and then use styles from options
    const combinedStyles = {
      ...baseStyles,
      ...stylesToPass,
    };

    // let PIXI do its thing
    super(text, combinedStyles, ...args);

    // set default stuff
    this.setDefaults(options);
  };
  /**
   * set typical things such as anchor and position
   * feels like setting the anchor to the center of a component is typical
   *
   * @type {PIXI.Point || PIXI.ObservablePoint} [options.anchor]
   * @type {PIXI.ObservablePoint} [options.position]
   */
  setDefaults(options = {}) {
    const {
      anchor = {},
      position = {},
    } = options;

    // set anchor, default is in the center
    this.anchor.x = anchor.x || 0.5;
    this.anchor.y = anchor.y || 0.5;

    // set position
    this.position.x = position.x || 0;
    this.position.y = position.y || 0;
  };

};

export default TextComponent;
