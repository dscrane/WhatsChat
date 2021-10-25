export const leaveChatroom = (chatroomId, username, cb, socket) => {
  socket.leave(chatroomId);

  socket.emit("chatroom-left", chatroomId)
}