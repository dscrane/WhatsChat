import React, { useState, useEffect } from 'react';
import { SidebarProfile, SidebarChats } from "../sidebar";
import IconButton from './IconButton';


const Sidebar = ({ auth }) => {
  const [ activeIcon, setActiveIcon ] = useState('chats')
  const icons = ['profile', 'chats']

  useEffect(() => {
    return () => {
      setActiveIcon("chats");
    };
  }, [auth]);

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
          className={`nav__item ${activeIcon === icon ? 'nav__item-active' : ''} nav-item`}
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
    <div className='sidebar'>
      <nav className='sidebar__nav'>
        <ul className='nav__list list-unstyled components py-3 mb-0'>
          {renderIcons()}
        </ul>
      </nav>
    <div className='sidebar__content'>
        <div className='sidebar__row py-4'>
          <h2 className='sidebar__title'>WhatsChat</h2>
        </div>
        <div className='sidebar__row'>
          {renderSidebarContent()}
        </div>
    </div>
    </div>
  )
}


export default Sidebar;
