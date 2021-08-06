import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { sendMessage, joinChatRoom, leaveChatRoom, fetchMessages, displayChatRooms } from '../redux/actions/chat';
import { checkAuth } from '../redux/actions/auth';
import { ChatDisplay } from "../components/chats";

const Chat = ({ chatRooms, auth, sendMessage, joinChatRoom, leaveChatRoom, fetchMessages }) => {
  const [ message, setMessage ] = useState('');
  const [ activeChatRoom, setActiveChatRoom] = useState(auth.currentChatRoom)


  // Update the current chatRoom
  useEffect(() => {
    console.log(auth.data.name)
    leaveChatRoom(activeChatRoom, auth.data.name);
    joinChatRoom(auth.currentChatRoom, auth.data.name)
    setActiveChatRoom(auth.currentChatRoom)
  }, [auth.data.name, activeChatRoom, auth.currentChatRoom, joinChatRoom])

  // fetch messages for current chatroom
  useEffect(() => {
    if (chatRooms[activeChatRoom].messages.length < 1) {
      fetchMessages(activeChatRoom)
    }
  }, [activeChatRoom])

  const onChange = e => {
    setMessage(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault();
    sendMessage({
      message,
      chatRoomId: auth.currentChatRoom,
      userId: auth._id,
      author: auth.data.username
    })
    setMessage('')
  }

  return (
    <div className='chatroom__display'>
      <div className='chatroom__container'>
        <div className='chatroom__heading'>
          <h2 className='chatroom__title'>{chatRooms[auth.currentChatRoom].name}</h2>
        </div>
        <ChatDisplay messages={chatRooms[activeChatRoom].messages} />
        <div className='chatroom__input mb-2 mx-auto justify-content-center'>
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