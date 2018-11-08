import express from 'express';
import path from 'path';
import http from 'http';

import socketManager from 'managers/socketManager';
const PORT = 666;

// --- create web server
const app = express();
app.use(express.static('build'));
const server = http.Server(app)

server.listen(PORT, () => {
  console.log(`Server listening at - http://localhost:${PORT}`);
});

// Provide resources
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build/index.html'));
});

// Start listening with socket io
socketManager.listen(server);
