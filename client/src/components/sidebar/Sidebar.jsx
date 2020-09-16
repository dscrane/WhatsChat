import React, { useState } from 'react';
import { SidebarProfile, SidebarChats } from "../sidebar";
import IconButton from './IconButton';


const Sidebar = () => {
  const [ activeIcon, setActiveIcon ] = useState('chats')

  const icons = ['profile', 'chats']

  const setCurrentIcon = (e) => {
    if (e.currentTarget.id === 'profile-cta') {
      setActiveIcon('profile');
    }
    if (e.currentTarget.id === 'chats-cta') {
      setActiveIcon('chats');
    }
  }

  const renderIcons = () => {
    return icons.map(icon => {
      return (
        <li
          id={`${icon}-cta`}
          key={icon}
          className='nav-item'
          onClick={(e) => setCurrentIcon(e)}
        >
          <IconButton icon={icon} activeIcon={activeIcon} />
        </li>
      )
    })
  }

  const renderSidebarContent = () => {
    if (activeIcon === 'profile') {
      return <SidebarProfile />
    }
    if (activeIcon === 'chats') {
      return <SidebarChats />
    }
  }

  return (
    <div className='d-flex justify-content-center' style={{backgroundColor: '#262B33', width:'23%', minWidth: '325px'}}>
      <nav className='d-flex flex-column min-vh-100 align-items-around' style={{width: '90%'}}>
        <div className='row justify-content-center py-4'>
          <h2 className='text-white'>WhatsChat</h2>
        </div>
        <div className='row justify-content-center'>
          <div style={{ width: '80%', borderBottom: '.5px solid white', borderRadius: '75%'}}></div>
        </div>
        <div className='row justify-content-around'>
          <ul className='list-unstyled d-flex flex-row w-50 justify-content-around components py-3 mb-0'>
            {renderIcons()}
          </ul>
        </div>
        <div className='row justify-content-center'>
          <div style={{ width: '80%', borderBottom: '.5px solid white', borderRadius: '75%'}}></div>
        </div>
        <div className='row justify-content-center'>
          {renderSidebarContent()}
        </div>
      </nav>
    </div>
  )
}


export default Sidebar;
