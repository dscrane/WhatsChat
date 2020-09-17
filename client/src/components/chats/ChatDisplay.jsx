import React, { useRef, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import './chatStyles.css';

const ChatDisplay = ({ messages, auth }) => {
  const messageList = useRef(null);

  const chatBubbleClass = 'd-flex flex-row justify-content-around';
  const chatBubbleStyle = {borderRadius: '10px', maxWidth: '45%', minWidth: '10%'};
  const timeStampClass = 'd-flex flex-column py-0 pr-1 ml-1 w-100 justify-content-end';
  const timeStampStyle = { color:'#bdbdbd', width: '100%', textAlign: 'right'};
  const chatContentClass = 'd-flex flex-column align-items-start w-100 px-2 py-1';
  const chatTextClass = 'd-flex flex-column py-0 mr-1 justify-content-end align-items-start text-left text-white';


  const autoscroll = () => {
    console.log(messageList)
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
          <div key={messageKey} className='text-white text-left'>{messages[messageKey].message}</div>
        )
      }

      if (messages[messageKey].userId !== auth._id) {
        return (
          <li key={messageKey} className='row mb-1 justify-content-start'>
            <div
              className={chatBubbleClass}
              style={{...chatBubbleStyle, backgroundColor:'#757575'}}
            >
              <div className={chatContentClass}>
                <div className={chatTextClass}>
                  <p className='m-0 p-0' style={{fontSize: '12px', color:'#bdbdbd'}}>
                    {messages[messageKey].author}
                  </p>
                  <p style={{fontSize: '15px', marginBottom:'0px'}}>{messages[messageKey].message}</p>
                </div>
                <div className={timeStampClass} style={{fontSize: '10px'}}>
                  <div style={timeStampStyle}>
                    {timestamp}
                  </div>
                </div>
              </div>
            </div>
          </li>
        )
      }

      return (
        <li key={messageKey} className='row mb-1 justify-content-end'>
          <div
            className={chatBubbleClass}
            style={{...chatBubbleStyle, backgroundColor:'#1565c0'}}
          >
            <div className={chatContentClass}>
              <div className={chatTextClass}>
                <p style={{fontSize: '15px', marginBottom:'0px'}}>{messages[messageKey].message}</p>
              </div>
              <div className={`${timeStampClass} text-white`} style={{fontSize: '10px'}}>
                <div style={timeStampStyle}>
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
      <div className='row align-items-start p-2 ' style={{height: '85%'}}>
        <ul className='chat__display chat__display-scroll d-flex flex-column m-2 px-4 w-100 h-100' ref={messageList}>
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
