import { inputEmitter } from 'managers/inputManager';

import gameState, {
  updatePrimaryPlayerActionState,
} from 'data/gameState';

// handle input events
inputEmitter.on('leftDown', () => {
    updatePrimaryPlayerActionState('left');
});
inputEmitter.on('leftUp', () => {
  if (gameState.primaryPlayerState === 'left') {
    updatePrimaryPlayerActionState(null);
  }
});
inputEmitter.on('rightDown', () => {
  updatePrimaryPlayerActionState('right');
});
inputEmitter.on('rightUp', () => {
  if (gameState.primaryPlayerState === 'right') {
    updatePrimaryPlayerActionState(null);
  }
});
