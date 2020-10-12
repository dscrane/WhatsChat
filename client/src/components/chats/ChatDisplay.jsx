import React, { useRef, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';


const ChatDisplay = ({ messages, auth }) => {
  const messageList = useRef(null);

  const autoscroll = () => {
    // new message element
    const newMessage = messageList.current.lastElementChild;

    if (!newMessage) {return};

    // get the height of the newMessage
    const newMessageStyles = getComputedStyle(newMessage.lastElementChild);
    const newMessageMargin = parseInt(newMessageStyles.marginBottom);
    const newMessageHeight = messageList.current.offsetHeight + newMessageMargin;

    // get the visible height
    const visibleHeight = messageList.current.offsetHeight;

    // get the message container height
    const contentHeight = messageList.current.scrollHeight;

    // Current scroll location
    const scrollOffset = messageList.current.scrollTop + visibleHeight;

    if (contentHeight - newMessageHeight <= scrollOffset) {
      // this will set the scroll top position to the maximum scroll top value being the bottom of the page
      messageList.current.scrollTop = messageList.current.scrollHeight;
    }
  };

  useEffect(autoscroll, [messages.length])


  const formatTimestamp = (createdAt) => {
    return moment(createdAt).format('h:mm A');
  }

  const renderMessages = () => {
    const messageKeysArray = Object.keys(messages) ;

    return messageKeysArray.map(messageKey => {
      const timestamp = formatTimestamp(messages[messageKey].createdAt)
      if (messages[messageKey].author === 'systemManager') {
        return (
          <li key={Math.random()*1000} className='chat__message chat__message-system'>
            <div key={messageKey} className='text-white text-left'>{messages[messageKey].message}</div>
          </li>
        )
      }

      if (messages[messageKey].userId !== auth._id) {
        return (
          <li key={messageKey} className='chat__messages chat__messages-rec'>
            <div className="chat__bubble chat__bubble-rec">
              <div className={`chat__content px-2 py-1`}>
                <div className={`chat__area py-0 mr-1`}>
                  <p className='chat__text chat__text-author' >
                    {messages[messageKey].author}
                  </p>
                  <p className='chat__text chat__text-message'>{messages[messageKey].message}</p>
                </div>
                <div className={`chat__footer ml-1`}>
                  <div className='chat__timestamp'>
                    {timestamp}
                  </div>
                </div>
              </div>
            </div>
          </li>
        )
      }

      return (
        <li key={messageKey} className='chat__messages chat__messages-sent'>
          <div className="chat__bubble chat__bubble-sent">
            <div className={`chat__content px-2 py-1`}>
              <div className={`chat__area py-0 mr-1`}>
                <p className='chat__text chat__text-message'>{messages[messageKey].message}</p>
              </div>
              <div className={`chat__footer ml-1 text-white`}>
                <div className='chat__timestamp'>
                  {timestamp}
                </div>
              </div>
            </div>
          </div>
        </li>
      )
    })
  }

  return (
      <div className='chat__container'>
        <ul className='chat__display chat__display-scroll ' ref={messageList}>
          {messages ? renderMessages() : <div className='text-white'>Send a message!!</div>}
        </ul>
      </div>

  )
}

 const mapStateToProps = state => {
  return {
     auth: state.auth
   }
}

export default connect(mapStateToProps)(ChatDisplay);
