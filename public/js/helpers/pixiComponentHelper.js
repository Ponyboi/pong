import { omit } from 'lodash';

/**
 * sets component's anchor to given point, otherwise uses the center
 *
 * @type {PIXI.Container} component
 * @type {PIXI.Point || PIXI.ObservablePoint} [point]
 */
const setDefaultAnchor = (component, point = {}) => {
  if (!component.anchor) return;

  component.anchor.x = point.x || 0.5;
  component.anchor.y = point.y || 0.5;
};
/**
 * @type {PIXI.Container} component
 * @type {PIXI.ObservablePoint} [point]
 */
const setDefaultPosition = (component, point = {}) => {
  if (!component.position) return;

  component.position.x = point.x || 0;
  component.position.y = point.y || 0;
};
/**
 * set typical things such as anchor and position
 * feels like setting the anchor to the center of a component is typical
 *
 * @type {PIXI.Container} component
 * @type {Object} [options.anchor]
 * @type {Object} [options.position]
 */
const setComponentProperties = (component, options = {}) => {
  setDefaultAnchor(component, options.anchor);
  setDefaultPosition(component, options.position);
};
/**
 * removes properties from given options
 */
const removeCustomProperties = (options = {}) => {
  // remove custom attributes from the options and leave only the styles
  return omit(options, [
    'anchor',
    'position',
  ]);
};

// export default setComponentProperties;
export {
  setDefaultAnchor,
  setDefaultPosition,
  setComponentProperties,
  removeCustomProperties,
}
