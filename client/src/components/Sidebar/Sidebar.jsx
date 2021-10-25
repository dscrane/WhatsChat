import React, { useState, useEffect } from "react";
import { SidebarProfile } from "../SidebarProfile";
import { SidebarChats } from "../SidebarChats";
import { mapSidebarIcons } from "../../utils";
import "./sidebar.css";
const Sidebar = ({ auth }) => {
  const [activeIcon, setActiveIcon] = useState("chats");
  const icons = ["chats", "profile"];

  useEffect(() => {
    return () => {
      setActiveIcon("chats");
    };
  }, [auth]);

  const setCurrentIcon = (e) =>
    e.currentTarget.id === "profile-cta"
      ? setActiveIcon("profile")
      : setActiveIcon("chats");

  const renderSidebarContent =
    activeIcon === "chats" ? <SidebarChats /> : <SidebarProfile />;

  return (
    <div className="sidebar">
      <nav className="sidebar__nav">
        <ul className="nav__list list-unstyled components">
          {mapSidebarIcons({ icons, setCurrentIcon, activeIcon })}
        </ul>
      </nav>
      <div className="sidebar__content">
        <div className="sidebar__row py-4">
          <h2 className="sidebar__title">{activeIcon === "chats" ? "WhatsChat" : "Profile"}</h2>
        </div>
        <div className="sidebar__row">{renderSidebarContent}</div>
      </div>
    </div>
  );
};

export default Sidebar;
