import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import { setChatRoom } from "../../redux/actions/auth";
import {
  createChatRoom,
  displayChatRooms,
  closeChat,
} from "../../redux/actions/chat";
import { SidebarForm } from "../SidebarForm";
import { SidebarChatItem } from "../SidebarChatItem";
import "./SidebarChats.css";

const SidebarChats = ({
  auth,
  chatRooms,
  displayChatRooms,
  createChatRoom,
  closeChat,
  setChatRoom,
}) => {
  const [newRoomName, setNewRoomName] = useState("");
  const numChats = Object.keys(chatRooms).length;
  useEffect(() => {
    if (auth.token) {
      displayChatRooms();
    }
  }, [numChats, auth.token, displayChatRooms]);

  const onChange = (e) => {
    setNewRoomName(e.target.value);
  };

  const handleClose = (key) => {
    closeChat(key);
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (newRoomName.length >= 5) {
      createChatRoom(newRoomName, auth._id);
      setNewRoomName("");
    }
  };

  const renderChatroomList = () => {
    if (chatRooms === {}) {
      return;
    }
    return Object.keys(chatRooms).map((key) => {
      return (
        <SidebarChatItem
          key={chatRooms[key]._id}
          chatRoomId={chatRooms[key]._id}
          chatRoomName={chatRooms[key].name}
          setChatRoom={setChatRoom}
          handleClose={handleClose}
        />
      );
    });
  };

  const renderChats = () => {
    return (
      <ListGroup className="chatroom__list">
        <ListGroup.Item className="list__item list__item-new">
          <SidebarForm
            handleForm={handleForm}
            onChange={onChange}
            newRoomName={newRoomName}
          />
        </ListGroup.Item>
        {renderChatroomList()}
      </ListGroup>
    );
  };

  const chatDisplay = auth.isLoggedIn ? (
    renderChats()
  ) : (
    <div className="text-white">Log in to see chatrooms</div>
  );

  return <div className="chatroom__list">{chatDisplay}</div>;
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    chatRooms: state.chatRooms,
  };
};

export default connect(mapStateToProps, {
  createChatRoom,
  displayChatRooms,
  closeChat,
  setChatRoom,
})(SidebarChats);
