import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { sendMessage, joinChatRoom, leaveChatRoom, fetchMessages, displayChatRooms } from '../redux/actions/chat';
import { checkAuth } from '../redux/actions/auth';
import { ChatDisplay } from "../components/chats";


const Chat = ({ chatRooms, auth, computedMatch, sendMessage, joinChatRoom, leaveChatRoom, fetchMessages }) => {
  const [ message, setMessage ] = useState('');
  const [ chatRoomId, setChatRoomId] = useState(computedMatch.params.id)
  // Initial message fetch for all open chat rooms
  useEffect(() => {
    Object.keys(chatRooms).forEach((chatRoom) => {
      fetchMessages(chatRoom)
    })
  }, [])

  // Update the current chatRoom
  useEffect(() => {
    leaveChatRoom(chatRoomId, auth.data.name);
    joinChatRoom(computedMatch.params.id, auth.data.name)
    setChatRoomId(computedMatch.params.id)
  }, [computedMatch.params.id, auth.data.name, chatRoomId, leaveChatRoom, joinChatRoom])

  const onChange = e => {
    setMessage(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault();
    sendMessage({
      chatRoomId,
      message,
      userId: auth._id,
      author: auth.data.username
    })
    setMessage('')
  }

  return (
    <div className='d-flex col justify-content-center bg-secondary' style={{width:'77%'}}>
      <div className='container m-4' style={{borderRadius: '10px', backgroundColor: '#262B33', width: '70%', minWidth: '675px'}}>
        <div className='d-flex flex-row justify-content-center' style={{height: '5%'}}>
          <h2 className='text-white'>{chatRooms[chatRoomId].name}</h2>
        </div>
        <ChatDisplay messages={chatRooms[chatRoomId].messages} />
        <div className='d-flex flex-row align-items-center mb-2 mx-auto' style={{height: '10%', width: '90%'}}>
          <form className='w-100' onSubmit={onSubmit}>
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
                <button className='btn btn-md btn-outline-success '>
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    defaultChatRoom: state.chatRooms.defaultChatRoom,
    chatRooms: state.chatRooms,
  }
}

export default connect(mapStateToProps, { sendMessage, checkAuth, joinChatRoom, leaveChatRoom, fetchMessages, displayChatRooms })(Chat);