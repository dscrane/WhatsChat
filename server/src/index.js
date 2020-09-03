const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');

// Initialize connection to the database
require('./db/db');

// Initialize the express server and the socketio connection
const app = express();
const server = http.createServer(app);
const io = socketio(server);



// Set up middlewares for express server
app.use(bodyParser.json());
app.use(cookieParser())
app.use(helmet());
// app.use(cors());

// Connect routers to app
app.use(userRouter);

// Define port location
const PORT = process.env.PORT || 5500;

// Create new socketio connection
io.on('connection', socket => {
  console.log(socket.id)
  console.log('=============')
  console.log('new websocket connection');
  console.log('=============')

  socket.on('test', (testMessage) => {
    console.log(testMessage)
  })
})


// Spin up the server on the defined PORT
io.listen(PORT)
console.log(`[APP]: listening on http://localhost:5500`)