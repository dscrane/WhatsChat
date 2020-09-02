import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ProfileCard } from '../components/userProfile';
import { fetchUserData } from '../redux/actions/user';
import { checkAuth } from "../redux/actions/auth";


const Profile = (props) => {
  const { user, auth, fetchUserData } = props;

  useEffect(() => {
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
          <p className='text-left text-white' key={key}><span className='font-weight-bold'>{key}: </span><span>{user[auth._id][key]}</span></p>
        )
    })
  }

  return (
    <div className=''>
      <ProfileCard user={user} />
      {renderUserData()}
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