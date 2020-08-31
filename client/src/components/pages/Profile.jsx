import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserData, checkAuth } from '../../redux/actions';


const Profile = (props) => {
  const { user, auth, fetchUserData } = props;

  useEffect(() => {
    console.log('[PROFILE]: Re-rendered')
    // fetch the user data if there is an auth token
    if (auth.token) {
      fetchUserData()
    }
  }, [auth.token])

  // Return if no user is found
  if (!user[auth._id]) {
    return <div>No user found</div>
  }

  // Display user data
  const renderUserData = () => {
    return Object.keys(user[auth._id])
      .map(key => {
        return (
          <p className='text-left' key={key}><span className='font-weight-bold'>{key}: </span><span>{user[auth._id][key]}</span></p>
        )
    })
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>{user[auth._id].name}</h5>
        <hr />
        {renderUserData()}
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    auth: state.auth
  }
}

export default connect(mapStateToProps, { fetchUserData, checkAuth })(Profile);