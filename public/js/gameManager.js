let players = 0;

function handleNewPlayer() {
  players = players + 1;
  const canvas = document.getElementById('canvas');
  canvas.html(`currently ${players} players`)
};

const gameManager = {
  handleNewPlayer
};

export default gameManager;
