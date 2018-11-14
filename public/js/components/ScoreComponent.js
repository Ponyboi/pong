import { Point as PIXI_Point } from 'pixi.js';

import TextComponent from 'components/TextComponent';

const scoreStyles = {
  fill: 0x6d6d6d,
  fontSize: 36,
  fontWeight: 'bold',
};

class ScoreComponent {
  /** @default */
  constructor(options = {}) {
    const {
      position,
      size,
      text,
    } = options;

    /** @type {String} */
    this.text = text;
    /** @type {Point} */
    this.position = position || new PIXI_Point();
    /** @type {PIXI.Text} */
    this.view = this.render();
  };
  /**
   * @returns {PIXI.Text}
   */
  render() {
    return new TextComponent(this.text, {
      ...scoreStyles,
      position: this.position,
    })
  };
  /**
   *
   */
  update() {
    this.view.text = this.text;
  };
};

export default ScoreComponent;
