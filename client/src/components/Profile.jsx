import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserData, checkAuth, logout } from '../redux/actions';
import history from '../history';

const Profile = (props) => {
  const { user, auth, fetchUserData, logout } = props;
  useEffect(() => {
    console.log('profile rerendered')
    if (auth.token) {
      console.log('is token')
      fetchUserData()
    }
  }, [auth.token])

  const renderUserData = () => {
    if (!user[auth._id]) {
      return ''
    }

    return Object.keys(user[auth._id])
      .map(key => {
        return (<div className='item' key={key}>
          <p>{key}: <span>{user[auth._id][key]}</span></p>
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