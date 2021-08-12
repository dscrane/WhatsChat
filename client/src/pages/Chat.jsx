import React, { useEffect } from "react";
import { connect } from "react-redux";
import { io } from "socket.io-client";
import { ChatroomDisplay } from "../components/ChatroomDisplay";
import { setSocket } from "../redux/actions/authActions";
import {
  renderNewMessage,
  renderMessages,
  closeChatroom,
} from "../redux/actions/chatActions";
import { joinChatroomEmitter } from "../socket.io/emitters";
import { log } from "../utils/log";

const Chat = ({
  auth,
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

    auth.socket.on("connect", () =>
      joinChatroomEmitter(auth.currentChatroom, auth.data.name, auth.socket)
    );

    auth.socket.on("chatroom-left", (chatroomId) => {
      closeChatroom(chatroomId);
    });

    auth.socket.on("chatroom-deleted", (chatroomId) => {
      closeChatroom(chatroomId);
    });

    auth.socket.on("fetched-messages", (chatroomId, messages) =>
      renderMessages(chatroomId, messages)
    );

    auth.socket.on("return-message", (chatroomId, message) =>
      renderNewMessage(chatroomId, message)
    );
  }, [
    auth.socket,
    auth.currentChatroom,
    auth.data.name,
    setSocket,
    renderMessages,
    renderNewMessage,
  ]);

  return <ChatroomDisplay />;
};

const mapsStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapsStateToProps, {
  renderNewMessage,
  renderMessages,
  closeChatroom,
  setSocket,
})(Chat);
