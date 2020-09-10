import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createChatRoom, displayChatRooms, closeChat } from "../../redux/actions/chat";
import { profileIcon, plusIcon } from "../../icons/icons";

const SidebarChats = ({ auth, chats, displayChatRooms, createChatRoom, closeChat }) => {
  const [ newRoomName, setNewRoomName ] = useState('');
  useEffect(() => {
    displayChatRooms()
  }, [])

  const onChange = (e) => {
    setNewRoomName(e.target.value)
  }

  const handleClose = (key) => {
    console.log(key)
    closeChat(key)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    createChatRoom(newRoomName, auth._id)
    console.log(newRoomName)
    setNewRoomName('')
  }

  const renderChatData = () => {
    if (chats === {}) {
      return
    }
    return Object.keys(chats).map(key => {
      return (
        <li key={chats[key]._id} className='row justify-content-between' style={{width: '90%'}}>
          <div className='col-3 my-auto text-secondary' style={{fontSize: '50px', lineHeight: '50px'}} >
            {profileIcon}
          </div>
          <div className='col-8'>
          <Link
            className='d-flex flex-row justify-content-center align-items-center text-center text-white w-100 text-decoration-none'
            style={{height: '8vh', borderBottom: '1px solid white'}}
            to={{
              pathname: `/chats/${key}`
            }}
          >
            <div className='col text-center' >
              {chats[key].name}
            </div>
          </Link>
          </div>
          <div onClick={() => handleClose(key)} className='col-1 text-white my-auto text-center' style={{fontSize:'24px'}}>
            &times;
          </div>
        </li>
      )
    })
  }

  const renderChats = () => {
    return (
      <ul className='list-unstyled d-flex flex-column align-items-center w-100'>
        <li className='row justify-content-center' style={{width: '90%'}}>
          <form className='w-100' onSubmit={onSubmit}>
            <div
              className='d-flex flex-row justify-content-center align-items-center text-center text-white w-100 text-decoration-none'
              style={{height: '8vh', borderBottom: '1px solid white'}}
            >
              <div className='d-flex justify-content-end col-3  mx-auto'>
                <button
                  className='btn p-0'
                  style={{background: 'none', border: 'none', borderStyle: 'none'}}
                >
                  <div className='d-flex align-items-center text-secondary'  style={{fontSize: '35px'}}>
                    {plusIcon}
                  </div>
                </button>
              </div>
              <div className='col-9'>
                <input
                  className='form-control'
                  onChange={onChange}
                  value={newRoomName}
                  placeholder={'Create Chat Room....'}
                />
              </div>
            </div>
          </form>
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
    chats: state.chat.chats
  }
}

export default connect(mapStateToProps, { createChatRoom, displayChatRooms, closeChat })(SidebarChats);