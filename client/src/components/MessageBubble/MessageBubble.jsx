/* IMPORTS */
import React from 'react';
import "./messageBubble.css"
/* ------ */


export const MessageBubble = ({ type, messageKey, timestamp, author, message }) => {
  return (
    <li key={messageKey} className={`message message__${type}`}>
      <div className={`message__container message__container-${type}`}>
        <div className={`message__content`}>
          <div className={`message__row message__row-body`}>
            <p className='message__text message__text-author' >
              {author !== "system" ? author : null}
            </p>
            <p className={`message__text ${author !== "system" ? "message__text-message" : "message__text-system"}`}>
              {message}
            </p>
          </div>
          <div className={`message__row message__row-footer`}>
            <div className='message__timestamp'>
              {timestamp}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};


