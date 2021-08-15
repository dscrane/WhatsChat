/* IMPORTS */
import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { SidebarContextMenu } from "../SidebarContextMenu";
import { profileIcon } from "../../icons/icons";
import "./sidebarChatItem.css";

/* ------ */

export const SidebarChatItem = ({
  chatroom,
  setChatroom,
  joinChatroomEmitter,
  rejoinChatroomEmitter,
  auth,
  handleClose,
  handleLeave,
  handleDelete,
}) => {
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
  return (
    <ListGroup.Item className="list__item">
      <div className="item__col">
        <Link
          onClick={() => handleClick()}
          className="item__link"
          to={{
            pathname: `/chats/${chatroom._id}`,
          }}
          disabled={chatroom.name === auth.currentChatroom}
        >
          <div className="link__icon">{profileIcon}</div>
          <div className="link__name">
            <div className="link__text">{chatroom.name}</div>
          </div>
        </Link>
      </div>

      <div className="item__col item__col-cta">
        <SidebarContextMenu
          chatroomId={chatroom._id}
          handleClose={handleClose}
          handleLeave={handleLeave}
          handleDelete={handleDelete}
        />
      </div>
    </ListGroup.Item>
  );
};
