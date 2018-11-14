import { DASH_SIZE, GAME_SIZE, PADDLE_SIZE } from 'constants/sizes';

  let players = {};
  let playerCount = 0;
  let ball = { x: GAME_SIZE.width /2, y: GAME_SIZE.height/2 };

  const updatePlayercount = () => (playerCount = Object.keys(players).length);


export default GameState;