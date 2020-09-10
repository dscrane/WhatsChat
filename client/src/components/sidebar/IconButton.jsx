import React from 'react';
import classNames from "classnames";
import { profileIcon, chatsIcon } from "../../icons/icons";

const IconButton = (props) => {
  const iconStyle = {fontSize: '30px', lineHeight: '30px'}
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
      className={classNames(
        'btn btn-outline-dark p-0',
        {
          'text-white': props.icon === props.activeIcon,
          'text-secondary': props.icon !== props.activeIcon
        }
      )}
      style={iconStyle}
      disabled={props.icon === props.activeIcon}
    >
      {renderIcon()}
    </button>
  )
}

export default IconButton;