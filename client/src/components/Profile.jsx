import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserData, checkAuth, logout } from '../redux/actions';

const Profile = ({ user, auth }) => {
  console.log(user)
  console.log(auth)
  const { fetchUserData } = user;
  const { logout } = auth;

  console.log('[USER]:', user)
  useEffect(() => {
    checkAuth()
    if (user.token) {
      fetchUserData()
    }
  }, [user.token])

  const renderUserData = () => {
    return Object.keys(user.attributes)
      .map(key => {
        return (<div className='item' key={key}>
          <p>{key}: <span>{user.attributes[key]}</span></p>
        </div>)
    })
  }
  return (
    <div className='ui container'>
      {renderUserData()}
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    auth: state.auth
  }
}

export default connect(mapStateToProps, { fetchUserData, checkAuth, logout })(Profile);