/* IMPORTS */
import React from 'react';
/* ------ */


export const MessageBubble = ({ type, messageKey, timestamp, author, message }) => {
  return (
    <li key={messageKey} className={`message message__${type}`}>
      <div className={`message__container message__container-${type}`}>
        <div className={`message__content px-2 py-1`}>
          <div className={`message__row message__row-body py-0 mr-1`}>
            <p className='message__text message__text-author' >
              {author}
            </p>
            <p className='message__text message__text-message'>
              {message}
            </p>
          </div>
          <div className={`message__row message__row-footer ml-1`}>
            <div className='message__timestamp'>
              {timestamp}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};


