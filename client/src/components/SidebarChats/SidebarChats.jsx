import React, { useState } from "react";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import { setChatroom } from "../../redux/actions/authActions";
import { closeChatroom } from "../../redux/actions/chatActions";
import { createChatroomEmitter } from "../../socket.io/emitters";
import { SidebarForm } from "../SidebarForm";
import { SidebarChatItem } from "../SidebarChatItem";
import "./SidebarChats.css";

const SidebarChats = ({ auth, chatrooms, closeChatroom, setChatroom }) => {
  const [newRoomName, setNewRoomName] = useState("");

  const onChange = (e) => {
    setNewRoomName(e.target.value);
  };

  const handleClose = (chatroomId) => {
    closeChatroom(chatroomId);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (newRoomName.length >= 5) {
      await createChatroomEmitter(newRoomName, auth._id, auth.socket);
    }
    await setNewRoomName("");
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
    chatrooms: state.chatrooms,
  };
};

export default connect(mapStateToProps, {
  closeChatroom,
  setChatroom,
})(SidebarChats);
