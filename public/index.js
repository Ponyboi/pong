import gameManager from 'managers/gameManager';
import pixiManager from 'managers/pixiManager';

import './styles/main.css';
console.log("env", process.env.NODE_ENV);

// entry for client-side of the app
pixiManager.setupApp(gameManager);
