import { omit } from 'lodash';
import { Text as PIXI_Text } from 'pixi.js';

import { setComponentDefaults } from 'helpers/pixiComponentHelper';

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
  /** @default */
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
    setComponentDefaults(this, options);
  };
};

export default TextComponent;