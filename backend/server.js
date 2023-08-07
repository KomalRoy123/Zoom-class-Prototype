const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  // Add the event to handle resizing of the iframe
  socket.on('resizeIframe', (size) => {
    // Broadcast the size to all connected clients except the sender
    socket.broadcast.emit('resizeIframe', size);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
