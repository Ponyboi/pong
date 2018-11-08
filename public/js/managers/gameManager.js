/*
  singleton of functions to handle the game
*/
const gameManager = {
  handleNewPlayer: handleNewPlayer,
};

/**
 * adds a new player
 *
 * @param {Object} message - from server
 */
const handleNewPlayer = (message = {}) => {
  const { playerCount } = message;

  const canvas = document.getElementById('app-header');
  canvas.innerText = `${playerCount} connected player(s)`;
};

export default gameManager;
export {
  handleNewPlayer,
};
