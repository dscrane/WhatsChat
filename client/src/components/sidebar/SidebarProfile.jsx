import React from 'react';
import { connect } from 'react-redux';
import { logout } from "../../redux/actions/auth";


const SidebarProfile = ({ auth, logout }) => {

  const renderUserData = () => {
    return Object.keys(auth.data)
      .map(key => {
        return (
          <p className='text-left text-white' key={key}><span className='font-weight-bold'>{key}: </span><span>{auth.data[key]}</span></p>
        )
      })
  }

  const renderUserProfile = () => {
    return (
      <>
        <div className='text-center'>
          <img
            className='rounded-circle img-thumbnail'
            src='http://ssl.gstatic.com/accounts/ui/avatar_2x.png'
            height='150'
            width='150'
            alt='avatar'
          />
        </div>
        <div className='row justify-content-center my-3'>
          <div style={{ width: '80%', borderBottom: '.5px solid white' }}>
            {renderUserData()}
          </div>
        </div>
        <div className='row justify-content-center my-3'>
          <button onClick={() => logout() } className='btn btn-secondary'>
            Log Out
          </button>
        </div>
      </>
    )
  }

  const profileDisplay = auth.isLoggedIn ? renderUserProfile() : <div className='text-white'>Log in to see your profile</div>

  return (
    <div className='d-flex flex-column my-3'>
      {profileDisplay}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}


export default connect(mapStateToProps, { logout })(SidebarProfile);