import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/auth';
import { logoutUser } from '../../redux/actions/user';

const Sidebar = ({ auth, logout, logoutUser }) => {

  // Display head with the buttons for a logged in user
  const renderLoggedInHeader = () => {
    return (
      <div className=''>
        <ul className='navbar-nav mr-auto d-flex flex-row justify-content-between'>
          <li className='nav-item'>
            <Link className='btn btn-md btn-secondary mx-2' to={'/chats'}>
              Chats
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='btn btn-md btn-secondary mx-2' to={`/profile/${auth._id}`}>
              Profile
            </Link>
          </li>
          <li className='nav-item'>
            <button className='btn btn-md btn-secondary mx-2' onClick={() => {
              logout();
              logoutUser();
            }}>
              Log Out
            </button>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <nav className='navbar d-flex justify-content-between fixed-top bg-dark'>
      <Link className='navbar-brand text-white' to={'/'}>Chat App</Link>
        {!auth.isLoggedIn
          ? <button className='btn btn-md btn-secondary'>Log In</button>
          : renderLoggedInHeader()
        }
    </nav>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {logout, logoutUser})(Sidebar)

