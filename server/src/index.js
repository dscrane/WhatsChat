/* ----   IMPORTS    ---- */
const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoutes');
const chatRoomRouter = require('./routes/chatRoomRoutes');
const messageRouter = require('./routes/messageRoutes')
const Message = require('./models/message');
/* ----   ****    ---- */

/* ----   DEFINE PORT    ---- */
const PORT = process.env.PORT || 5500;
/* ----   ****    ---- */

/* ----   INITIALIZE DATABASE    ---- */
require('./db/db');
/* ----   ****    ---- */

/* ----   CONFIGURE EXPRESS SERVER    ---- */
// Initialize the express server and the socketio connection
const app = express();
/* ----   CONFIGURE SOCKETIO    ---- */
const server = http.createServer(app);
const io = socketio(server);
io.origins();
// Connect middlewares
app.use(cors());
app.use(bodyParser.json());

// Connect routers
app.use(userRouter);
app.use(chatRoomRouter);
app.use(messageRouter);

// Connect static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Create root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})
/* ----   ****    ---- */



// Create new socketio connection
io.on('connection', socket => {
  console.info('new websocket connection', socket.id );
  // Define join event
  socket.on('join', ({ room, userName }) => {
    console.info(`${userName} joining room ${room}`)
    socket.join(room)
    socket.emit('system-welcome', { userName: userName, type: 'Welcome', chatRoomId: room })
    // socket.broadcast.to(room).emit('system-join', { userName: userName, type: 'joined' })
  })
  // Define leave event
  socket.on('leave', ({ room, userName }) => {
    socket.leave(room, () => {
      console.info(`${userName} leaving room ${room}`)
      // io.to(room).emit('system-leave', { userName: userName, type: 'left', chatRoomId: room })
    })
  })
  // Define message event
  socket.on('message', async (message) => {
    try {
      const newMsg = new Message(message)
      const returnMsg = { _id: newMsg._id,  ...message  }
      io.sockets.in(message.chatRoomId).emit('return-message', returnMsg)
      await newMsg.save();
    } catch (e) {
      console.log(e)
    }
  })
})
/* ----   ****    ---- */

/* ----   SPIN UP THE SERVER    ---- */
server.listen(PORT)
console.log(`[APP]: listening on ${PORT}`)
/* ----   ****    ---- */
