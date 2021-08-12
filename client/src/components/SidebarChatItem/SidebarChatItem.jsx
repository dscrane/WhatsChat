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
  joinChatroom,
  auth,
  handleClose,
}) => {
  const handleClick = async () => {
    setChatroom(chatroom._id);
    joinChatroom(chatroom._id, auth.data.name, auth.socket);
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
        >
          <div className="link__icon">{profileIcon}</div>
          <div className="link__name">
            <div className="link__text">{chatroom.name}</div>
          </div>
        </Link>
      </div>

      <div className="item__col item__col-cta">
        <SidebarContextMenu
          handleClose={handleClose}
          chatroomId={chatroom._id}
        />
      </div>
    </ListGroup.Item>
  );
};
