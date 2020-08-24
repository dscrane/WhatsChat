const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

// Initialize the express server and the socketio connection
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Define port location
const PORT = process.env.PORT || 5500;

// Create a new connection and set up what happens next
io.on('connection', socket => {
  console.log('new websocket connection');
  socket.on('message', (message, callback) => {
    console.log(message)
  })
})

// Spin up the server on the defined PORT
server.listen(PORT, () => console.log(`[APP]: listening on http://localhost:5500`))