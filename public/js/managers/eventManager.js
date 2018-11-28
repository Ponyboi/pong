import { inputEmitter } from 'managers/inputManager';

import {
  updatePrimaryPlayerActionState,
} from 'data/gameState';

// handle input events
inputEmitter.on('leftDown', () => {
  updatePrimaryPlayerActionState('left');
});
inputEmitter.on('leftUp', () => {
  updatePrimaryPlayerActionState(null);
});
inputEmitter.on('rightDown', () => {
  updatePrimaryPlayerActionState('right');
});
inputEmitter.on('rightUp', () => {
  updatePrimaryPlayerActionState(null);
});
