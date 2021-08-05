import React from 'react';
import classNames from "classnames";
import { profileIcon, chatsIcon } from "../../icons/icons";

const IconButton = (props) => {
  const renderIcon = () => {
    if (props.icon === 'profile') {
      return profileIcon;
    }
    if (props.icon === 'chats') {
      return chatsIcon;
    }
  }
  return (
    <button
      className={classNames( 'nav__icon',
        'btn p-0',
        {
          'icon__button-active': props.icon === props.activeIcon,
          '': props.icon !== props.activeIcon
        }
      )}
      disabled={props.icon === props.activeIcon}
    >
      {renderIcon()}
    </button>
  )
}

export default IconButton;