import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../redux/actions/chat';
import { ChatDisplay } from "../components/chats";


const Chat = (props) => {
  const [ message, setMessage ] = useState('')

  const onChange = e => {
    setMessage(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault();
    props.sendMessage({
      message
      })
  }

  return (
    <div className='d-flex col-9 justify-content-center bg-secondary'>
      <div className='container bg-dark m-4 w-100' style={{borderRadius: '10px'}}>
        <ChatDisplay />
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
return {}
}

export default connect(mapStateToProps, { sendMessage })(Chat);