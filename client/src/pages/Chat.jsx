import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { sendMessage, joinChat, fetchMessages } from '../redux/actions/chat';
import { checkAuth } from '../redux/actions/auth';
import { ChatDisplay } from "../components/chats";


const Chat = ({ chats, auth, computedMatch, sendMessage, joinChat, fetchMessages },) => {
  const [ message, setMessage ] = useState('');
  const [ chatId, setChatId ] = useState(null)

  useEffect(() => {
    if (auth.token && (!chatId || chatId !== computedMatch.params.id)) {
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
      author: auth.data.name
    })
    setMessage('')
  }

  return (
    <div className='d-flex col-9 justify-content-center bg-secondary'>
      <div className='container m-4 w-100' style={{borderRadius: '10px', backgroundColor: '#262B33'}}>

        {chatId ? <ChatDisplay messages={chats[chatId].messages} /> : ''}
        <div className='d-flex flex-row justify-self-end align-items-center mb-2' style={{height: '10%'}}>
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
                <button className='btn btn-md btn-outline-success w-75'>
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
    chats: state.chat.chats
  }
}

export default connect(mapStateToProps, { sendMessage, checkAuth, joinChat, fetchMessages })(Chat);