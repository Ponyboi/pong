/*
  things that help determine what to do with the canvas
*/

/**
 * finds the location of where the Pixi canvas should be rendered
 *
 * @returns {Element}
 */
const getCanvasContainer = () => {
  return document.getElementById('pixi-canvas');
};

export {
  getCanvasContainer,
}
