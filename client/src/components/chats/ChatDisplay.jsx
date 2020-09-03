import React from 'react';

const ChatDisplay = () => {

  return (

      <div className='row align-items-start p-2 ' style={{height: '90%'}}>
        <div className='d-flex flex-column m-2 px-4 w-100 h-100'>
          <div className='row my-3 justify-content-start'>
            <p
              className=' bg-light py-1 px-2 my-auto'
              style={{borderRadius: '10px'}}
            >
              This is some solid chat text
            </p>
          </div>
          <div className='row my-3 justify-content-end'>
            <p
              className='bg-primary py-1 px-2 my-auto'
              style={{borderRadius: '10px'}}
            >
              This is a response to that
            </p>
          </div>
        </div>
      </div>

  )
}

export default ChatDisplay;