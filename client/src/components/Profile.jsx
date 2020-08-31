import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserData, checkAuth } from '../redux/actions';


const Profile = (props) => {
  const { user, auth, fetchUserData } = props;

  useEffect(() => {
    console.log('profile rerendered')
    if (auth.token) {
      console.log('is token')
      fetchUserData()
    }
  }, [auth.token])

  const renderUserData = () => {
    if (!user[auth._id]) {
      return
    }
    console.log(user[auth._id].name)
    return Object.keys(user[auth._id])
      .map(key => {
        return (
          <p className='text-left' key={key}><span className='font-weight-bold'>{key}: </span><span>{user[auth._id][key]}</span></p>
        )
    })
  }

  const renderUserName = () => {
    if (!user[auth._id]) {
      return
    }

    console.log(user[auth._id.name])
    return <h5 className='card-title'>{user[auth._id].name}</h5>
  }

  return (
    <div className='card'>
      <div className='card-body'>
        {renderUserName()}
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