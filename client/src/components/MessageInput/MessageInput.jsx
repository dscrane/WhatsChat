/* IMPORTS */
import React from 'react';
/* ------ */


export const MessageInput = ({message, onSubmit, onChange}) => {
  return (
    <div className='chatroom__input'>
      <form className='w-75 ' onSubmit={onSubmit}>
        <div className='row '>
          <div className='col-10'>
            <input
              className='form-control w-100'
              placeholder='Message...'
              type='text'
              value={message}
              onChange={onChange}
            />
          </div>
          <div className='col-2'>
            <button className='chatroom__cta btn btn-md'>
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};


