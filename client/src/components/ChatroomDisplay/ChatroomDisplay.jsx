/* IMPORTS */
import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { MessagesDisplay } from "../MessagesDisplay";
import { MessageInput } from "../MessageInput";
import { connect } from "react-redux";
import { sendMessageEmitter } from "../../socket.io/emitters";
import { ChatroomHeading } from "../ChatroomHeading";
import "./chatroomDisplay.css";
/* ------ */

const ChatroomDisplay = ({ chatrooms, auth }) => {
  const [message, setMessage] = useState("");
  useEffect(() => {}, [auth.currentChatroom]);

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

  const displayChatroomContent = chatrooms[auth.currentChatroom] ? (
    <div className="chatroom__container">
      <ChatroomHeading chatroomName={auth.currentChatroom} />
      <MessagesDisplay messages={chatrooms[auth.currentChatroom].messages} />
      <MessageInput message={message} onSubmit={onSubmit} onChange={onChange} />
    </div>
  ) : (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );

  return <div className="chatroom__display">{displayChatroomContent}</div>;
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    chatrooms: state.chatrooms,
  };
};

export default connect(mapStateToProps, {})(ChatroomDisplay);
