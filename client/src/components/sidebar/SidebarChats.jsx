import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createChatRoom, displayChatRooms } from "../../redux/actions/chat/chatActions";
import { profileIcon, plusIcon } from "../../icons/icons";

const SidebarChats = (props) => {
  const [ newRoomName, setNewRoomName ] = useState('');
  useEffect(() => {
    props.displayChatRooms()
  }, [])

  const renderChats = () => {
    if (props.chats === {}) {
      return
    }
    return Object.keys(props.chats).map(key => {
      return (
        <li key={props.chats[key]._id} className='row justify-content-center' style={{width: '90%'}}>
          <div className='col-3 my-auto' style={{fontSize: '50px', lineHeight: '50px'}} >
            {profileIcon}
          </div>
          <Link
            className='d-flex flex-row justify-content-center align-items-center text-center text-white w-75 text-decoration-none'
            style={{height: '8vh', borderBottom: '1px solid white'}}
            to={`/chats/${key}`}
          >
            <div className='col text-center'>
              {props.chats[key].name}
            </div>
          </Link>
        </li>
      )
    })
  }

  const onChange = (e) => {
    setNewRoomName(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    props.createChatRoom(newRoomName)
    console.log(newRoomName)
    setNewRoomName('')

  }

  return (
    <div className='d-flex flex-column w-100 align-items-center'>
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
        {renderChats()}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    chats: state.chat.chats
  }
}

export default connect(mapStateToProps, { createChatRoom, displayChatRooms })(SidebarChats);