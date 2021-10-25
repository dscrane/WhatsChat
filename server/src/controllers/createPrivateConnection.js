import { Chatroom, User } from "../models/index.js";
import { joinChatroom } from "./joinChatroom.js";

export const createPrivateConnection = async (io, socket, username, cb) => {
  try {
    const connectedSockets = await io.fetchSockets();

    const socketToConnect = connectedSockets.find(
      (socket) => socket.data.username === username
    );

    const chat = new Chatroom({
      name: `${socket.data.username}_${socketToConnect.data.username}`,
      currentMembers: [socket.data.userId, socketToConnect.data.userId],
      createdBy: null,
      lastMessage: "",
      type: "private",
    });

    await chat.save();

    const currentUser = await User.findById(socket.data.userId);
    currentUser.currentRooms = [...currentUser.currentRooms, chat.name];

    const connectingUser = await User.findById(socketToConnect.data.userId);
    connectingUser.currentRooms = [...connectingUser.currentRooms, chat.name];

    await currentUser.save();
    await connectingUser.save();

    await socket.join(socketToConnect.id);
    cb(["private-connection-created", socketToConnect.id, "joining"]);
    socket.emit("private-connection-created", chat);

    // joinChatroom(
    //   socket,
    //   socketToConnect.id,
    //   null,
    //   socket.handshake.query.username,
    //   cb
    // );

    // joinChatroom(socketToConnect, socket.handshake.)
  } catch (e) {
    console.log(e);
  }
};
