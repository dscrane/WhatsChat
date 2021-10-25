/* IMPORTS */
import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { SidebarContextMenu } from "../SidebarContextMenu";
import { ConfirmationModal } from "../ConfirmationModal";
import {
  joinChatroomEmitter,
  rejoinChatroomEmitter,
  leaveChatroomEmitter,
  deleteChatroomEmitter,
} from "../../socket.io/emitters";
import { profileIcon } from "../../icons/icons";
import "./sidebarChatItem.css";

/* ------ */

export const SidebarChatItem = ({
                                  chatroom,
                                  setChatroom,
                                  auth,
                                  handleClose,
                                }) => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const deleteChatroomModalConfig = {
    title: "Delete Chatroom",
    message: "Are you sure you would like to delete this chat room?",
    btnText: "Delete",
    btnStyle: "danger",
  };
  const sampleUserDeleteModalConfig = {
    title: "Delete Chatroom",
    message: "The Sample User profile is unable to delete chatrooms",
    btnText: "Return",
    btnStyle: "warning",
  }

  const handleLeave = () => {
    leaveChatroomEmitter(chatroom.name, auth.data.name, auth.socket);
  };

  const handleClick = async () => {
    setChatroom(chatroom.name);
    if (chatroom.messages.length !== 0) {
      rejoinChatroomEmitter(
        chatroom.name,
        auth.currentChatroom,
        auth.data.name,
        auth.socket
      );
    } else {
      joinChatroomEmitter(
        chatroom.name,
        auth.currentChatroom,
        auth.data.name,
        auth.socket
      );
    }
  };

  const onDelete = () => {
    if (auth.data.username === 'sampleuser') {
      setModalDisplay(false);
    }

    deleteChatroomEmitter(chatroom.name, auth.socket);

  };

  return (
    <ListGroup.Item
      className={`list__item ${
        chatroom.name === auth.currentChatroom ? "list__item-active" : ""
      }`}
      disabled={chatroom.name === auth.currentChatroom}
    >
      <div className="item__col">
        <Link
          onClick={() => handleClick()}
          className="item__link"
          to={{
            pathname: `/chats/${chatroom._id}`,
          }}
        >
          <div className="link__icon">{profileIcon}</div>
          <div className="link__name">
            <div className="link__text">{chatroom.name}</div>
          </div>
        </Link>
      </div>

      <div className="item__col item__col-cta">
        <SidebarContextMenu
          chatroomName={chatroom.name}
          handleClose={handleClose}
          handleLeave={handleLeave}
          displayDelete={auth._id === chatroom.createdBy}
          setModalDisplay={setModalDisplay}
        />
      </div>
      <ConfirmationModal
        modalConfig={auth.data.username === 'sampleuser' ? sampleUserDeleteModalConfig : deleteChatroomModalConfig }
        setModalDisplay={setModalDisplay}
        modalDisplay={modalDisplay}
        fnHandler={onDelete}
      />
    </ListGroup.Item>
  );
};