/* IMPORTS */
import React, { useState } from "react";
import { MessagesDisplay } from "../MessagesDisplay";
import { MessageInput } from "../MessageInput";
import { connect } from "react-redux";
import { sendMessageEmitter } from "../../socket.io/emitters";
import { ChatroomHeading } from "../ChatroomHeading";
import "./chatroomDisplay.css";
/* ------ */

const ChatroomDisplay = ({ chatrooms, auth }) => {
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessageEmitter(
      {
        message,
        chatroomName: auth.currentChatroom,
        userId: auth._id,
        author: auth.data.username,
      },
      auth.socket
    );
    setMessage("");
  };

  return (
    <div className="chatroom__display">
      <div className="chatroom__container">
        <ChatroomHeading chatroomName={chatrooms[auth.currentChatroom].name} />
        <MessagesDisplay messages={chatrooms[auth.currentChatroom].messages} />
        <MessageInput
          message={message}
          onSubmit={onSubmit}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    chatrooms: state.chatrooms,
  };
};

export default connect(mapStateToProps, {})(ChatroomDisplay);
