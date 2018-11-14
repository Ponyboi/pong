/*
  entry for client-side of the app
*/
import eventManager from 'managers/eventManager';
import gameManager from 'managers/gameManager';
import { onKeyDown, onKeyUp } from 'managers/inputManager';
import pixiManager from 'managers/pixiManager';

import './styles/main.css';

// add event listeners
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

// set up pixi
pixiManager.setupApp();
