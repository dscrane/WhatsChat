import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import { setChatRoom } from "../../redux/actions/auth";
import { createChatRoom, displayChatRooms, closeChat } from "../../redux/actions/chat";
import { NewChatForm } from '../userForms';
import { profileIcon } from "../../icons/icons";

const SidebarChats = ({ auth, chatRooms, displayChatRooms, createChatRoom, closeChat, setChatRoom }) => {
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

  const renderChatroomList = () => {
    if (chatRooms === {}) {
      return
    }
    return Object.keys(chatRooms).map(key => {
      return (
        <ListGroup.Item key={chatRooms[key]._id} className='chatroom__item' >
          <Link
            onClick={() => setChatRoom(key)}
            className='chatroom__link'
            to={{
              pathname: `/chats/${key}`
            }}
          >
            <div className='chatroom__icon my-auto'>
              {profileIcon}
            </div>
            <div className='chatroom__name'>
                <div className='chatroom__link_text col text-center' >
                  {chatRooms[key].name}
                </div>
            </div>
          </Link>
          <div className='chatroom__cta-col'>
            <button onClick={() => handleClose(key)} className='chatroom__cta-close p-0'>
              <p className='chatroom__close'>&#128473;</p>
            </button>
          </div>
        </ListGroup.Item>
      )
    })
  }

  const renderChats = () => {
    return (
      <ListGroup className='chatroom__list'>
        <ListGroup.Item className='chatroom__item chatroom__item-new'>
          <NewChatForm handleForm={handleForm} onChange={onChange} newRoomName={newRoomName} />
        </ListGroup.Item>
        {renderChatroomList()}
      </ListGroup>
    )
  }

  const chatDisplay = auth.isLoggedIn ? renderChats() : <div className='text-white'>Log in to see your profile</div>

  return (
    <div className='chatroom__list my-3'>
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

export default connect(mapStateToProps, { createChatRoom, displayChatRooms, closeChat, setChatRoom })(SidebarChats);