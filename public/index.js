/*
  entry for client-side of the app
*/
import 'managers/eventManager';
import 'managers/gameManager';
import { initApp } from 'managers/pixiManager';

import './styles/main.css';

// set up pixi
initApp();
