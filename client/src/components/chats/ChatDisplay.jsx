import React, { useEffect } from 'react';
import { connect } from 'react-redux';


const ChatDisplay = (props) => {


  const renderMessages = () => {
    const messageKeysArray = Object.keys(props.messages) ;
    return messageKeysArray.map(messageKey => {
      if (props.messages[messageKey].userId !== props.auth._id) {
        return (
          <div key={messageKey} className='row my-3 justify-content-start'>
            <p
              className=' bg-light py-1 px-2 my-auto'
              style={{borderRadius: '10px'}}
            >
              {props.messages[messageKey].message}
            </p>
          </div>
        )
      }
      return (
        <div key={messageKey} className='row my-3 justify-content-end'>
          <p
            className='bg-primary py-1 px-2 my-auto'
            style={{borderRadius: '10px'}}
          >
            {props.messages[messageKey].message}
          </p>
        </div>
      )
    })
  }

  return (
      <div className='row align-items-start p-2 ' style={{height: '90%'}}>
        <div className='d-flex flex-column m-2 px-4 w-100 h-100'>
          {props.messages ? renderMessages() : ''}
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
