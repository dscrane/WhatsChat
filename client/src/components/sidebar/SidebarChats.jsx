import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createChatRoom, displayChatRooms } from "../../redux/actions/chat";
import { profileIcon, plusIcon } from "../../icons/icons";

const SidebarChats = (props) => {
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

  return (
    <div className='d-flex flex-column w-100 align-items-center'>
      <ul className='list-unstyled d-flex flex-column align-items-center w-100'>
        {renderChats()}
        <li className='row justify-content-center' style={{width: '75%'}}>
          <div className='col-3 my-auto' style={{fontSize: '35px', lineHeight: '35px'}} >
            {plusIcon}
          </div>
          <div
            className='d-flex flex-row justify-content-center align-items-center text-center text-white w-75 text-decoration-none'
            style={{height: '8vh', borderBottom: '1px solid white'}}
            onClick={() => props.createChatRoom('other room')}
          >
            <div className='col text-center'>
              New Chat
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    chats: state.chat
  }
}

export default connect(mapStateToProps, { createChatRoom, displayChatRooms })(SidebarChats);