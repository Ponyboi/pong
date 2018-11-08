/**
 * sets component's anchor to given point, otherwise uses the center
 *
 * @type {PIXI.Container} component
 * @type {PIXI.Point || PIXI.ObservablePoint} [point]
 */
const setDefaultAnchor = (component, point = {}) => {
  component.anchor.x = point.x || 0.5;
  component.anchor.y = point.y || 0.5;
};
/**
 * @type {PIXI.Container} component
 * @type {PIXI.ObservablePoint} [point]
 */
const setDefaultPosition = (component, point = {}) => {
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
const setComponentDefaults = (component, options = {}) => {
  setDefaultAnchor(component, options.anchor);
  setDefaultPosition(component, options.position);
};

// export default setComponentDefaults;
export {
  setDefaultAnchor,
  setDefaultPosition,
  setComponentDefaults,
}
