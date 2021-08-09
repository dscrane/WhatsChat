/* IMPORTS */
import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { profileIcon } from "../../icons/icons";
import "./sidebarChatItem.css";
/* ------ */

export const SidebarChatItem = ({
  chatRoomId,
  chatRoomName,
  setChatRoom,
  handleClose,
}) => {
  console.log(chatRoomId, chatRoomName);
  return (
    <ListGroup.Item className="list__item">
      <div className="item__col">
        <Link
          onClick={() => setChatRoom(chatRoomId)}
          className="item__link"
          to={{
            pathname: `/chats/${chatRoomId}`,
          }}
        >
          <div className="link__icon">{profileIcon}</div>
          <div className="link__name">
            <div className="link__text">{chatRoomName}</div>
          </div>
        </Link>
      </div>

      <div className="item__col item__col-cta">
        <button onClick={() => handleClose(chatRoomId)} className="item__cta">
          &#128473;
        </button>
      </div>
    </ListGroup.Item>
  );
};
