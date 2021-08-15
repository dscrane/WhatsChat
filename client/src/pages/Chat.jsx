import React, { useEffect } from "react";
import { connect } from "react-redux";
import { io } from "socket.io-client";
import { ChatroomDisplay } from "../components/ChatroomDisplay";
import {
  joinChatroomEmitter,
  fetchMessagesEmitter,
} from "../socket.io/emitters";
import { setSocket } from "../redux/actions/authActions";
import {
  renderNewMessage,
  renderMessages,
  closeChatroom,
} from "../redux/actions/chatActions";

const Chat = ({
  auth,
  chatrooms,
  renderNewMessage,
  renderMessages,
  closeChatroom,
  setSocket,
}) => {
  useEffect(() => {
    if (!auth.socket) {
      const socket =
        process.env.NODE_ENV === "production"
          ? io()
          : io("http://localhost:5500");
      setSocket(socket);
      return;
    }
    auth.socket.on("connect", async () => {
      await joinChatroomEmitter(
        auth.currentChatroom,
        null,
        auth.data.name,
        auth.socket
      );
    });
    auth.socket.on("fetch-messages", (chatroomName) => {
      fetchMessagesEmitter(chatroomName, auth.socket);
    });
    auth.socket.on("chatroom-left", async (chatroomName) => {
      await closeChatroom(chatroomName);
    });
    auth.socket.on("chatroom-deleted", async (chatroomName) => {
      await closeChatroom(chatroomName);
    });
    auth.socket.on("fetched-messages", async (chatroomName, messages) => {
      await renderMessages(chatroomName, messages);
    });
    // auth.socket.on("system-message", async (chatroomName, message) => {
    //   await renderNewMessage(chatroomName, message);
    // });
    auth.socket.on("return-message", async (chatroomName, message) => {
      await renderNewMessage(chatroomName, message);
    });
    auth.socket.on("return-system-message", (chatroomName, message) => {});
  }, [auth.socket, setSocket, renderMessages, renderNewMessage, closeChatroom]);

  return <ChatroomDisplay />;
};

const mapsStateToProps = (state) => ({
  auth: state.auth,
  chatrooms: state.chatrooms,
});

export default connect(mapsStateToProps, {
  renderNewMessage,
  renderMessages,
  closeChatroom,
  setSocket,
})(Chat);
