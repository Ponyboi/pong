import express from 'express';
import path from 'path';

// Provide resources
const app = express();
app.use(express.static('build'));
app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, 'build/index.html'));
}).listen(666);
