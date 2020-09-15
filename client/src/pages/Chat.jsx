import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { sendMessage, joinChat, fetchMessages, displayChatRooms } from '../redux/actions/chat';
import { checkAuth } from '../redux/actions/auth';
import { ChatDisplay } from "../components/chats";


const Chat = ({ chats, defaultChat, auth, computedMatch, sendMessage, joinChat, fetchMessages, displayChatRooms }) => {
  const [ message, setMessage ] = useState('');
  const [ chatId, setChatId ] = useState(defaultChat)

  useEffect(() => {
    if (chats === {}) {
      return displayChatRooms()
    }
    if (auth.token && (chatId !== computedMatch.params.id)) {
      joinChat(computedMatch.params.id, auth.data.name)
      fetchMessages(computedMatch.params.id)
      setChatId(computedMatch.params.id)
      return
    }
    joinChat(chatId, auth.data.name)
    fetchMessages(chatId)
  }, [auth.token, computedMatch.params.id])

  const onChange = e => {
    setMessage(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault();
    console.log(auth.name)
    sendMessage({
      chatId,
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
          <h2 className='text-white'>{chats[chatId].name}</h2>
        </div>
        <ChatDisplay messages={chats[chatId].messages} />
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
    defaultChat: state.chat.defaultChat,
    chats: state.chat.chats
  }
}

export default connect(mapStateToProps, { sendMessage, checkAuth, joinChat, fetchMessages, displayChatRooms })(Chat);