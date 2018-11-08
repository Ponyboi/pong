import gameManager from 'managers/gameManager';
import pixiManager from 'managers/pixiManager';

import './styles/main.css';

// entry for client-side of the app
pixiManager.setupApp();
pixiManager.globalTicker.start(); // start updates
