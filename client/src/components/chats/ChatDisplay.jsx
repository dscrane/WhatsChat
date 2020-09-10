import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';


const ChatDisplay = ({ messages, auth }) => {

  const formatTimestamp = (createdAt) => {
    return moment(createdAt).format('h:mm A');
  }

  const renderMessages = () => {
    const messageKeysArray = Object.keys(messages) ;

    return messageKeysArray.map(messageKey => {
      const timestamp = formatTimestamp(messages[messageKey].createdAt)

      if (messages[messageKey].userId !== auth._id) {
        return (
          <div key={messageKey} className='row my-3 justify-content-start'>
            <div
              className='d-flex flex-row justify-content-around bg-light'
              style={{borderRadius: '10px', maxWidth: '45%', minWidth: '10%'}}
            >
              <div className='d-flex flex-column align-items-end w-100 px-2 py-1'>
                <div
                  className='row justify-content-start pr-3 pt-1 w-100'
                  style={{fontSize: '12px'}}
                >
                  {messages[messageKey].author}
                </div>
                <div
                  className='d-flex flex-column py-2 pl-r mr-1 justify-content-end align-items-start text-left'
                >
                  {messages[messageKey].message}
                </div>
                <div
                  className='d-flex flex-column py-1 pr-1 ml-1 justify-content-end align-items-center'
                  style={{fontSize: '10px'}}
                >
                  <div style={{ width: '100%'}}>{timestamp}</div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      return (
        <div key={messageKey} className='row my-3 justify-content-end'>
          <div
            className='d-flex flex-row justify-content-around  bg-primary'
            style={{borderRadius: '10px', maxWidth: '45%', minWidth: '10%'}}
          >
            <div className='d-flex flex-column align-items-start w-100 px-2 py-1'>
              <div
                className='d-flex flex-column pl-3 mr-1 justify-content-end align-items-center text-left'
              >
                {messages[messageKey].message}
              </div>
              <div
                className='d-flex flex-column py-1 pr-1 ml-1 w-100 justify-content-end text-white'
                style={{fontSize: '10px'}}
              >
                <div style={{ width: '100%', textAlign: 'right'}}>{timestamp}</div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
      <div className='row align-items-start p-2 ' style={{height: '90%'}}>
        <div className='d-flex flex-column m-2 px-4 w-100 h-100'>
          {messages ? renderMessages() : <div className='text-white'>Send a message!!</div>}
        </div>
      </div>

  )
}

 const mapStateToProps = state => {
  return {
     auth: state.auth
   }
}

export default connect(mapStateToProps)(ChatDisplay);
