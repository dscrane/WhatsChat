import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../redux/actions/user';
import { checkAuth } from "../redux/actions/auth";


const Profile = (props) => {
  const { auth, fetchUserData } = props;

  useEffect(() => {
    // fetch the user data if there is an auth token
    if (auth.token) {
      fetchUserData()
    }
  }, [auth.token])


  // Return if no user is found
  if (!auth._id) {
    return <div>No user found</div>
  }



  return (
    <div className=''>
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