import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { autoscroll, formatTimestamp } from "../../utils";
import { MessageBubble } from "../MessageBubble";
import "./messagesDisplay.css";

const MessagesDisplay = ({ messages, auth }) => {
  const messageList = useRef(null);
  useEffect(() => autoscroll(messageList), [messages.length]);

  const renderMessages = () => {
    const messageKeysArray = Object.keys(messages);
    return messageKeysArray.map((messageKey) => {
      const timestamp = formatTimestamp(messages[messageKey].createdAt);
      if (messages[messageKey].author === "systemManager") {
        return (
          <MessageBubble
            key={messageKey}
            type="system"
            timestamp={timestamp}
            author={messages[messageKey].author}
            message={messages[messageKey].message}
          />
        );
      } else {
        return (
          <MessageBubble
            key={messageKey}
            type={messages[messageKey].userId !== auth._id ? "rec" : "sent"}
            timestamp={timestamp}
            author={messages[messageKey].author}
            message={messages[messageKey].message}
          />
        );
      }
    });
  };

  return (
    <div className="chatroom__content">
      <ul
        className="message__display message__display-scroll "
        ref={messageList}
      >
        {messages ? (
          renderMessages()
        ) : (
          <div className="text-white">Send a message!!</div>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(MessagesDisplay);
