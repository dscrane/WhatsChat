/* IMPORTS */
import React from "react";
import "./messageInput.css";
/* ------ */

export const MessageInput = ({ message, onSubmit, onChange }) => {
  return (
    <div className="chatroom__message">
      <form className="new-message__form" onSubmit={onSubmit}>
        <div className="message-form__row">
          <div className="message-form__col message-form__col-input">
            <input
              className="message-form__input form-control"
              placeholder="Message..."
              type="text"
              value={message}
              onChange={onChange}
            />
          </div>
          <div className="message-form__col message-form__col-cta">
            <button className="message-form__cta button">Send</button>
          </div>
        </div>
      </form>
    </div>
  );
};
