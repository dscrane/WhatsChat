import React, { useState } from 'react';
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/auth';
import { logoutUser } from '../../redux/actions/user';
import IconButton from './IconButton';


const Sidebar = ({ auth, logout, logoutUser }) => {
  const [ activeIcon, setActiveIcon ] = useState('profile')

  const icons = ['profile', 'messages', 'settings']

  const setCurrentIcon = (e) => {
    if (e.currentTarget.id === 'profile-cta') {
      setActiveIcon('profile');
    }
    if (e.currentTarget.id === 'messages-cta') {
      setActiveIcon('messages');
    }
    if (e.currentTarget.id === 'settings-cta') {
      setActiveIcon('settings');
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

  return (
    <div className='d-flex col-2 bg-dark'>
      <nav className='d-flex flex-column min-vh-100 w-100 align-items-around'>
        <div className='row justify-content-center py-4'>
          <h2 className='text-white'>WhatsChat</h2>
        </div>
        <div className='row justify-content-center'>
          <div style={{ width: '80%', borderBottom: '.5px solid white', borderRadius: '75%'}}></div>
        </div>
        <div className='row justify-content-around'>
          <ul className='list-unstyled d-flex flex-row w-100 justify-content-around components py-3 mb-0'>
            {renderIcons()}
          </ul>
        </div>
        <div className='row justify-content-center'>
          <div style={{ width: '80%', borderBottom: '.5px solid white', borderRadius: '75%'}}></div>
        </div>
      </nav>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {logout, logoutUser})(Sidebar)
