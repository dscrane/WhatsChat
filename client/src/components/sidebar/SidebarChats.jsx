import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createChatRoom, displayChatRooms, closeChat } from "../../redux/actions/chat";
import { NewChatForm } from '../userForms';
import { profileIcon } from "../../icons/icons";

const SidebarChats = ({ auth, chatRooms, displayChatRooms, createChatRoom, closeChat }) => {
  const [ newRoomName, setNewRoomName ] = useState('');
  const numChats = Object.keys(chatRooms).length
  useEffect(() => {
    if (auth.token){
      displayChatRooms()
    }
  }, [numChats, auth.token, displayChatRooms])

  const onChange = (e) => {
    setNewRoomName(e.target.value)
  }

  const handleClose = (key) => {
    closeChat(key)
  }

  const handleForm = (e) => {
    e.preventDefault()
    if (newRoomName.length >= 5) {
      createChatRoom(newRoomName, auth._id)
      setNewRoomName('')
    }
  }

  const renderChatData = () => {
    if (chatRooms === {}) {
      return
    }
    return Object.keys(chatRooms).map(key => {
      return (
        <li key={chatRooms[key]._id} className='row justify-content-around' style={{width: '90%'}} >
          <div className='col-2 my-auto text-secondary' style={{fontSize: '50px', lineHeight: '50px'}} >
            {profileIcon}
          </div>
          <div className='col-8'>
          <Link
            className='d-flex flex-row justify-content-center align-items-center text-center text-white text-decoration-none'
            style={{height: '8vh', borderBottom: '1px solid white', outline:'none'}}
            to={{
              pathname: `/chats/${key}`
            }}
          >
            <div className='col text-center' >
              {chatRooms[key].name}
            </div>
          </Link>
          </div>
          <div className='d-flex flex-column justify-content-center'>
            <button onClick={() => handleClose(key)} className='p-0' style={{ background: 'none', outline: 'none', border: 'none', lineHeight: '20px'}}>
              <p className='chat__close m-auto' style={{ fontSize:'20px', color: '#909090'}}>&#128473;</p>
            </button>
          </div>
        </li>
      )
    })
  }

  const renderChats = () => {
    return (
      <ul className='list-unstyled d-flex flex-column align-items-center w-100'>
        <li className='row justify-content-center' style={{width: '90%'}}>
          <NewChatForm handleForm={handleForm} onChange={onChange} newRoomName={newRoomName} />
        </li>
        {renderChatData()}
      </ul>
    )
  }

  const chatDisplay = auth.isLoggedIn ? renderChats() : <div className='text-white'>Log in to see your profile</div>

  return (
    <div className='d-flex flex-column w-100 align-items-center my-3'>
      {chatDisplay}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    chatRooms: state.chatRooms
  }
}

export default connect(mapStateToProps, { createChatRoom, displayChatRooms, closeChat })(SidebarChats);