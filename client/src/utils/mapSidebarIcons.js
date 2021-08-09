import { IconButton } from "../components/IconButton";
import React from "react";

export const mapSidebarIcons = ({ icons, setCurrentIcon, activeIcon }) =>
  icons.map((icon) => {
    return (
      <li
        id={`${icon}-cta`}
        key={icon}
        className={`nav__item ${
          activeIcon === icon ? "nav__item-active" : ""
        } nav-item`}
        onClick={(e) => setCurrentIcon(e)}
      >
        <IconButton icon={icon} activeIcon={activeIcon} />
      </li>
    );
  });
