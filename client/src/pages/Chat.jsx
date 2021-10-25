import React, { useEffect } from "react";
import { connect } from "react-redux";
import { io } from "socket.io-client";
import { ChatroomDisplay } from "../components/ChatroomDisplay";
import {
  joinChatroomEmitter,
  fetchMessagesEmitter,
} from "../socket.io/emitters";
import { setChatroom, setSocket } from "../redux/actions/authActions";
import {
  createChatroom,
  renderNewMessage,
  renderMessages,
  closeChatroom,
  displayChatrooms,
} from "../redux/actions/chatActions";
import { log } from "../utils/log";

const Chat = ({
  auth,
  createChatroom,
  renderNewMessage,
  renderMessages,
  closeChatroom,
  setChatroom,
  setSocket,
  displayChatrooms,
}) => {
  useEffect(() => {
    if (!auth.socket) {
      const socket =
        process.env.NODE_ENV === "production"
          ? io()
          : io("http://localhost:5500", {autoConnect: false});
      socket.auth = {username: auth.data.username, userId: auth.data._id, token: auth.token};
      console.log(socket);
      setSocket(socket);
      socket.connect();
      return;
    }
    auth.socket.on("connect", async () => {
      console.log(auth.socket)
      await auth.socket.emit("fetch-initial-data", (ack) => log.ack(ack));
    });
    auth.socket.on("initial-data", async (chatrooms) => {
      await displayChatrooms(chatrooms);
      await joinChatroomEmitter(
        auth.currentChatroom,
        null,
        auth.data.name,
        auth.socket
      );
    });
    auth.socket.on("chatroom-created", async (chatroom) => {
      await createChatroom(chatroom, auth.socket);
      await setChatroom(chatroom.name);
    });
    auth.socket.on("fetch-messages", (chatroomName) => {
      fetchMessagesEmitter(chatroomName, auth.socket);
    });
    auth.socket.on("chatroom-left", async (chatroomName) => {
      await closeChatroom(chatroomName);
    });
    auth.socket.on("chatroom-deleted", async (chatroomName) => {
      await setChatroom("Buddies");
      await closeChatroom(chatroomName);
    });
    auth.socket.on("fetched-messages", async (chatroomName, messages) => {
      await renderMessages(chatroomName, messages);
    });
    auth.socket.on("return-message", async (chatroomName, message) => {
      await renderNewMessage(chatroomName, message);
    });

    return function cleanUp() {
      console.log('clean up ran')
      auth.socket.disconnect();
    }
  }, [
    auth.socket,
    createChatroom,
    setSocket,
    renderMessages,
    renderNewMessage,
    closeChatroom,
    displayChatrooms,
  ]);



  return <ChatroomDisplay />;
};

const mapsStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapsStateToProps, {
  createChatroom,
  renderNewMessage,
  renderMessages,
  closeChatroom,
  setChatroom,
  setSocket,
  displayChatrooms,
})(Chat);
