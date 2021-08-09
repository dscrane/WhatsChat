/* IMPORTS */
import React from 'react';
/* ------ */


export const ChatroomHeading = ({ chatroomName }) => {
  return (
    <div className='chatroom__heading'>
      <h2 className='chatroom__title'>{chatroomName}</h2>
    </div>
  );
};


