/* IMPORTS */
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { threeDotIcon } from "../../icons/icons";
import "./sidebarContextMenu.css";
/* ------ */

export const SidebarContextMenu = ({
  handleClose,
  handleLeave,
  displayDelete,
  setModalDisplay,
  chatroomId,
}) => {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      className="item__cta"
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      {threeDotIcon}
    </a>
  ));

  const toggleDeleteCTA = displayDelete ? (
    <>
      <Dropdown.Divider className="dropdown__divider" />
      <Dropdown.Item
        className="dropdown__item"
        onClick={() => setModalDisplay(true)}
      >
        Delete Chatroom
      </Dropdown.Item>
    </>
  ) : null;

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />
      <Dropdown.Menu className="dropdown__content" variant="dark">
        <Dropdown.Item
          className="dropdown__item"
          onClick={() => handleClose(chatroomId)}
        >
          Close Chatroom
        </Dropdown.Item>
        <Dropdown.Divider className="dropdown__divider" />
        <Dropdown.Item
          className="dropdown__item"
          onClick={() => handleLeave(chatroomId)}
        >
          Leave Chatroom
        </Dropdown.Item>
        {toggleDeleteCTA}
      </Dropdown.Menu>
    </Dropdown>
  );
};
