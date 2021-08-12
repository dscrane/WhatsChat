import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import { setChatroom } from "../../redux/actions/authActions";
import {
  createChatroom,
  displayChatrooms,
  closeChatroom,
} from "../../redux/actions/chatActions";
import {
  joinChatroomEmitter,
  leaveChatroomEmitter,
  deleteChatroomEmitter,
} from "../../socket.io/emitters";
import { SidebarForm } from "../SidebarForm";
import { SidebarChatItem } from "../SidebarChatItem";
import "./SidebarChats.css";

const SidebarChats = ({
  auth,
  chatrooms,
  displayChatrooms,
  createChatroom,
  closeChatroom,
  setChatroom,
}) => {
  const [newRoomName, setNewRoomName] = useState("");
  const numChats = Object.keys(chatrooms).length;
  useEffect(() => {
    if (auth.token) {
      displayChatrooms();
    }
  }, [numChats, auth.token, displayChatrooms, closeChatroom]);

  const onChange = (e) => {
    setNewRoomName(e.target.value);
  };

  const handleClose = (key) => {
    closeChatroom(key);
  };
  const handleLeave = (key) => {
    leaveChatroomEmitter(key);
  };
  const handleDelete = (key) => {
    deleteChatroomEmitter(key);
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (newRoomName.length >= 5) {
      createChatroom(newRoomName, auth._id);
      setNewRoomName("");
    }
  };

  const renderChatroomList = () => {
    if (chatrooms === {}) {
      return;
    }
    return Object.keys(chatrooms).map((key) => {
      return (
        <SidebarChatItem
          key={chatrooms[key]._id}
          auth={auth}
          chatroom={chatrooms[key]}
          setChatroom={setChatroom}
          joinChatroom={joinChatroomEmitter}
          handleClose={handleClose}
          handleLeave={handleLeave}
          handleDelete={handleDelete}
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
    chatrooms: state.chatrooms,
  };
};

export default connect(mapStateToProps, {
  createChatroom,
  displayChatrooms,
  closeChatroom,
  setChatroom,
})(SidebarChats);
