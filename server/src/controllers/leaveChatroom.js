export const leaveChatroom = (chatroomId, username, cb, socket) => {
  console.log('leave room hit');
  // socket.leave(room, () => {
  //   console.info(`${userName} leaving room ${room}`);
  // });

  socket.emit("chatroom-left", chatroomId)
}