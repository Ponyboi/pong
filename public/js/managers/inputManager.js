// import eventEmitter from 'events';
import KEY from 'constants/key';

// this is the state of buttons being pressed
const inputState = {
  left: false,
  right: false,
};

const onKeyDown = (key) => {
  const keycode = key.keyCode;

  // A Key is 65
  // Left arrow is 37
  if (keycode === KEY.A || keycode === KEY.LEFT) {
      inputState.left = true;
  }

  // D Key is 68
  // Right arrow is 39
  if (keycode === KEY.D || keycode === KEY.RIGHT) {
      inputState.right = true;
  }

  // tell server
  // SocketClient.emit('playerInput', primaryPlayer.input);
};

const onKeyUp = (key) => {
  const keycode = key.keyCode;

  // A Key is 65
  // Left arrow is 37
  if (keycode === KEY.A || keycode === KEY.LEFT) {
      inputState.left = false;
  }

  // D Key is 68
  // Right arrow is 39
  if (keycode === KEY.D || keycode === KEY.RIGHT) {
      inputState.right = false;
  }

  // tell server
  // SocketClient.emit('playerInput', primaryPlayer.input);
};

export default inputState;

export {
  inputState,
  onKeyDown,
  onKeyUp,
}
