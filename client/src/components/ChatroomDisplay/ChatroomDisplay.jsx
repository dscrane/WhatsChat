/* IMPORTS */
import React, { useEffect, useState } from "react";
import { MessagesDisplay } from "../MessagesDisplay";
import { MessageInput } from "../MessageInput";
import { connect } from "react-redux";
import {
  displayChatRooms,
  fetchMessages,
  joinChatRoom,
  leaveChatRoom,
  sendMessage,
} from "../../redux/actions/chat";
import { checkAuth } from "../../redux/actions/auth";
import { ChatroomHeading } from "../ChatroomHeading";
import "./chatroomDisplay.css";
/* ------ */

const ChatroomDisplay = ({
  chatRooms,
  auth,
  sendMessage,
  joinChatRoom,
  leaveChatRoom,
  fetchMessages,
}) => {
  const [message, setMessage] = useState("");
  const [activeChatRoom, setActiveChatRoom] = useState(auth.currentChatRoom);

  // Update the current chatRoom
  useEffect(() => {
    console.log(auth.data.name);
    leaveChatRoom(activeChatRoom, auth.data.name);
    joinChatRoom(auth.currentChatRoom, auth.data.name);
    setActiveChatRoom(auth.currentChatRoom);
  }, [auth.data.name, activeChatRoom, auth.currentChatRoom, joinChatRoom]);

  // fetch messages for current chatroom
  useEffect(() => {
    if (chatRooms[activeChatRoom].messages.length < 1) {
      fetchMessages(activeChatRoom);
    }
  }, [activeChatRoom]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage({
      message,
      chatRoomId: auth.currentChatRoom,
      userId: auth._id,
      author: auth.data.username,
    });
    setMessage("");
  };

  return (
    <div className="chatroom__display">
      <div className="chatroom__container">
        <ChatroomHeading chatroomName={chatRooms[activeChatRoom].name} />
        <MessagesDisplay messages={chatRooms[activeChatRoom].messages} />
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
    defaultChatRoom: state.chatRooms.defaultChatRoom,
    chatRooms: state.chatRooms,
  };
};

export default connect(mapStateToProps, {
  sendMessage,
  checkAuth,
  joinChatRoom,
  leaveChatRoom,
  fetchMessages,
  displayChatRooms,
})(ChatroomDisplay);
