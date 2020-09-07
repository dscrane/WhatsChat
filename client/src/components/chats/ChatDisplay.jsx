import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';


const ChatDisplay = (props) => {
  const formatTimestamp = (createdAt) => {
    return moment(createdAt).format('h:m A');
  }

  const renderMessages = () => {
    const messageKeysArray = Object.keys(props.messages) ;
    return messageKeysArray.map(messageKey => {
      const timestamp = formatTimestamp(props.messages[messageKey].createdAt)
      if (props.messages[messageKey].userId !== props.auth._id) {
        return (
          <div key={messageKey} className='row my-3 justify-content-start'>
            <div
              className='d-flex flex-row justify-content-around bg-light'
              style={{borderRadius: '10px', maxWidth: '45%', minWidth: '10%'}}
            >
              <div
                className='d-flex flex-column py-2 pl-3 mr-1 justify-content-end align-items-center'
              >
                {props.messages[messageKey].message}
              </div>
              <div
                className='d-flex flex-column pb-1 pr-2  ml-1 justify-content-end align-items-center'
                style={{fontSize: '10px', minWidth: '15%'}}
              >
                <div style={{ width: '100%'}}>{timestamp}</div>
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
            <div
              className='d-flex flex-column py-2 pl-3 mr-1 justify-content-end align-items-center'
            >
              {props.messages[messageKey].message}
            </div>
            <div
              className='d-flex flex-column py-1 pr-2 ml-1 justify-content-end align-items-center text-white'
              style={{fontSize: '10px', minWidth: '15%'}}
            >
              <div style={{ width: '100%'}}>{timestamp}</div>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
      <div className='row align-items-start p-2 ' style={{height: '90%'}}>
        <div className='d-flex flex-column m-2 px-4 w-100 h-100'>
          {props.messages ? renderMessages() : <div className='text-white'>Send a message!!</div>}
        </div>
      </div>

  )
}

 const mapStateToProps = (state, ownProps) => {
  return {
     auth: state.auth
   }
}

export default connect(mapStateToProps, {  })(ChatDisplay);
