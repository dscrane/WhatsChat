export const deleteChatroom = async (io, chatroomName, cb) => {
  await io.sockets.in(chatroomName).emit("chatroom-deleted", chatroomName);
  await io.socketsLeave(chatroomName);
  cb("%cdelete-chatroom complete");
};
