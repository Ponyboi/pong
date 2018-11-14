import EventEmitter from 'events';
import KEY from 'constants/key';

const inputEmitter = new EventEmitter();

/**
 * when a key is down
 */
const onKeyDown = (key) => {
  const keycode = key.keyCode;

  // A Key is 65
  // Left arrow is 37
  if (keycode === KEY.A || keycode === KEY.LEFT) {
    inputEmitter.emit('leftDown');
  };

  // D Key is 68
  // Right arrow is 39
  if (keycode === KEY.D || keycode === KEY.RIGHT) {
    inputEmitter.emit('rightDown');
  };
};
/**
 * when a key is up
 */
const onKeyUp = (key) => {
  const keycode = key.keyCode;

  // A Key is 65
  // Left arrow is 37
  if (keycode === KEY.A || keycode === KEY.LEFT) {
    inputEmitter.emit('leftUp');
  };

  // D Key is 68
  // Right arrow is 39
  if (keycode === KEY.D || keycode === KEY.RIGHT) {
    inputEmitter.emit('rightUp');
  };
};

export default inputEmitter;

export {
  inputEmitter,
  onKeyDown,
  onKeyUp,
}
